
import React from 'react';
import merge from 'lodash/merge';
import isObject from 'lodash/isObject';

import PureComponentWithStaticProps from './../../classes/pureComponentWithStaticProps';
import {mapHighcontrastDashstyle} from './../../utils/highcontrastPatterns';
import {
  createCartesianCustomLegendData,
  plotNullDataLayerToAxis
} from './../../utils/chartOptionsHelpers';



const BASE_LINE_CHARTCONFIG = {
  chart: {
    type: 'line',
    height: 280,
    events: {},
  },
  title: {
    text: ''
  },
  subtitle: {
    text: '',
  },
  plotOptions: {
    line: {
      marker: {
        radius: 4,
      }
    },
    series: {
      stickyTracking: true,
      lineWidth: 4,
      animation: false,
      marker: {
        enabled: true,
      },
      point: {
        events: {}
      },
      states: {
        hover: {
          brightness: -.2,
        },
        select: { // required because can be selected programatically
          enabled: false
        }
      },
      allowPointSelect: false,
    },
  },
  tooltip: {
    enabled: false,
    shared: true,
    crosshairs: true,
  },
  xAxis: {
    // type: 'datetime', // todo - format x labels to datetime
    // Format 24 hour time to AM/PM
    // dateTimeLabelFormats: {
    //   hour: '%I:%M %P',
    //   minute: '%I %M'
    // },
    // labels: {
    //   formatter: function() {
    //     return Highcharts.dateFormat('%I:%M %P', this.value);
    //   }
    // }
  },
  yAxis: {
    title: {
      text: null
    },
  }
};


const withLine = Composed => {

  return class extends PureComponentWithStaticProps {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;
    }

    // create
    componentDidMount() {
      // console.log('withLine componentDidMount');

      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);
      // draw chart for first time
      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps) {
      // console.log('withColumn componentWillUpdate');

      if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {

        const config = this.makeInstanceConfig(this._baseChartConfig, nextProps);
        // redraw chart
        this.props.redraw(config);
      }
    }

    // destroy
    componentWillUnmount() {
      // console.log('withLine componentWillUnmount');

      this.props.destroy();
      this._chart = null;
      this._baseChartConfig = null;
      this.static = null;
    }


    createBaseConfig() {

      const setStatic = this.setStatic;

      // only create it once
      if (this._baseChartConfig) {
        return this._baseChartConfig;
      }


      const config = merge({}, BASE_LINE_CHARTCONFIG);

      config.chart.renderTo = this._chart;

      if (this.props.chartDescription) {
        config.chart.description = this.props.chartDescription;
      }

      // bind events to config
      config.chart.events = {
        // load: function() {
        // },
        render: function() {
          config.xAxis = plotNullDataLayerToAxis(this.xAxis, this.series, setStatic);

          setStatic({'customLegendData': createCartesianCustomLegendData(this.series)});

          // todo - extract
          // select nothing then..
          this.series.forEach(s => {
            s.data.filter((d,idx,arr) => {
              return idx === arr.length - 1;
            }).map(d => {
              d.setState('');
              return d;
            });
          });

          // in 400ms "select" the last line
          this.series.forEach(s => {
            s.data.filter((d,idx,arr) => {
              return idx === arr.length - 1;
            }).map(d => {
              d.setState('hover');
              return d;
            });
          });

        },
      };

      config.plotOptions.series.point.events = {
        mouseOver: function(e) {
          setStatic({'customLegendData': createCartesianCustomLegendData(this.series.chart.series, this.index)});

          // todo - extract
          this.series.chart.series.forEach(s => {
            s.data.filter((d,idx) => {
              return this.index === idx;
            }).map(d => {
              d.setState && d.setState('hover');
              return d;
            });
          });
        },
        mouseOut: function() {
          // todo - extract
          this.series.chart.series.forEach(s => {
            s.data.map(d => {
              d.setState && d.setState('');
              return d;
            });
          });
        }
      };

      this._baseChartConfig = config;

      return config;
    }

    makeInstanceConfig(config, passedProps) {
      const {series, xAxis, yAxis} = passedProps;

      let instanceConfig = merge({}, config, {
        xAxis,
        series,
        yAxis,
      });

      // markers
      instanceConfig.series = instanceConfig.series.map(s => {
        if (isObject(s.data[0])) {
          s.data = s.data.forEach(d => {
            d.marker = {
              enabled: false,
            }
          })
        } else {
          s.data = s.data.map(y => {
            return {
              y,
              marker: { // disable markers on line chart (by point), but not in legend
                enabled: false
              }
            }
          });
        }
        return s;
      });

      instanceConfig = mapHighcontrastDashstyle(instanceConfig, passedProps.displayHighContrast);

      return instanceConfig;
    }

    render() {
      // console.log('withLine render');

      const customLegendData = this.getStatic('customLegendData');
      const {displayHighContrast} = this.props;

      return (
        <Composed {...this.props}
                  customLegendData={customLegendData} displayHighContrast={displayHighContrast}>
          <div ref={el => this._chart = el} />
        </Composed>
      );
    }
  }
};

export default withLine;

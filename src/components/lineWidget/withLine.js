
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';
import isObject from 'lodash/isObject';

import {createHighcontrastFillSeriesIteratee} from './../../utils/highcontrastPatterns';
import {
  createCartesianCustomLegendData,
  plotNullDataLayerToAxis
} from './../../utils/chartOptionsHelpers';



const BASE_LINE_CHARTCONFIG = {
  chart: {
    type: 'line',
    height: 300,
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
        radius: 2,
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
    enabled: true,
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
  return class extends PureComponent {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;
      this._highcontrastSeriesIteratee = createHighcontrastFillSeriesIteratee();

      this.state = {
        customLegendData: null,
      }
    }

    // create
    componentDidMount() {
      console.log('withLine componentDidMount');

      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps, nextState) {
      console.log('withLine componentWillUpdate');

      const config = this.makeInstanceConfig(this._baseChartConfig, nextProps);

      // diff nextProps, nextState - intersection or decide what I should pass to update? currently update all

      let propNamesChanged = [];

      // todo check for change on chart as well


      if (this.props.displayHighContrast !== nextProps.displayHighContrast) {
        this.props.update(this._transformForHighContrast(config), ['series']);
        return;
      }

      if (JSON.stringify(nextProps.series) !== JSON.stringify(this.props.series)) {
        propNamesChanged = [...propNamesChanged, 'series'];
      }

      if (JSON.stringify(nextProps.yAxis) !== JSON.stringify(this.props.yAxis)) {
        propNamesChanged = [...propNamesChanged, 'yAxis'];
      }

      if (JSON.stringify(nextProps.xAxis) !== JSON.stringify(this.props.xAxis)) {
        propNamesChanged = [...propNamesChanged, 'xAxis'];
      }

      // update by type
      this.props.update(config, propNamesChanged);
    }

    // destroy
    componentWillUnmount() {
      console.log('withLine componentWillUnmount');

      this.props.destroy();
      this._chart = null;
      this._baseChartConfig = null;
    }


    createBaseConfig() {

      // only create it once
      if (this._baseChartConfig) {
        return this._baseChartConfig;
      }


      const config = merge({}, BASE_LINE_CHARTCONFIG);

      const broadcastSetState = this.setState.bind(this);

      config.chart.renderTo = this._chart;

      // bind events to config
      config.chart.events = {
        load: function() {
          console.log('line load');
        },
        render: function() {
          console.log('line render');

          config.xAxis = plotNullDataLayerToAxis(this.xAxis, this.series, broadcastSetState);

          broadcastSetState({'customLegendData': createCartesianCustomLegendData(this.series)});

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
          broadcastSetState({'customLegendData': createCartesianCustomLegendData(this.series.chart.series, this.index)});

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
      const {series, xAxis, yAxis, displayHighContrast} = passedProps;

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

      instanceConfig = this._transformForHighContrast(displayHighContrast, instanceConfig);

      return instanceConfig;
    }

    _transformForHighContrast(should, config) {
      if (should) {
        config.series = config.series.map(this._highcontrastSeriesIteratee);
      }
      return config;
    }

    render() {
      console.log('withLine render');

      const {customLegendData} = this.state;
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

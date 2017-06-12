
import React from 'react';
import merge from 'lodash/merge';
import last from 'lodash/last';

import PureComponentWithStaticProps from './../../classes/pureComponentWithStaticProps';


const BASE_SPARKLINE_CHARTCONFIG = {
  chart: {
    type: 'spline',
    height: 140,
  },
  title: {
    text: ''
  },
  subtitle: {
    text: '',
  },
  yAxis: {
    visible: false,
    endOnTick: false,
    startOnTick: false,
  },
  xAxis: {
    visible: false,
  },
  plotOptions: {
    spline: {
      animation: false,
    },
    series: {
      lineWidth: 4,
      animation: false,
      stickyTracking: false,
      enableMouseTracking: false,
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false,
          },
          select: {
            // enabled: false
          },
        }
      },
      states: {
        hover: {
          enabled: false,
        },
      },
      events: {},
    },
  },
  tooltip: {
    enabled: false
  },
};


const withSparkline = Composed => {

  return class extends PureComponentWithStaticProps {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;

      const colorProps = props.getColorProps(props.widgetIndex, props.cid);
      this.colorset = colorProps.colorset;
    }

    // create
    componentDidMount() {
      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps) {
      if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {

        const config = this.makeInstanceConfig(this._baseChartConfig, nextProps);
        // redraw chart
        this.props.redraw(config);
      }
    }

    // destroy
    componentWillUnmount() {
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


      const config = merge({}, BASE_SPARKLINE_CHARTCONFIG);

      config.colors  = this.colorset;
      config.chart.renderTo = this._chart;

      if (this.props.chartDescription) {
        config.chart.description = this.props.chartDescription;
      }

      // bind events to config
      config.chart.events = {
        render: function() {
          setStatic({
            countValue: last(this.series[0].data).y,
            countUnits: this.series[0].options.units,
          });

          if (this.series[0].data.length >= 2) {
            setStatic({'trendLegendData': this.series[0].data});
          }

          // todo - extract
          // select nothing then..
          this.series.forEach(s => {
            s.data.filter((d,idx,arr) => {
              return idx === arr.length - 1;
            }).forEach(d => {
              d.setState('');
            });
          });

          // in 400ms "select" the last column
          this.series.forEach(s => {
            s.data.filter((d,idx,arr) => {
              return idx === arr.length - 1;
            }).forEach(d => {
              d.setState('hover');
            });
          });
        },
      };

      this._baseChartConfig = config;

      return config;
    }

    makeInstanceConfig(config, passedProps) {
      const {series} = passedProps;
      const instanceConfig = merge({}, config, {
        series,
      });

      if (instanceConfig.yAxis && instanceConfig.yAxis.min) {
        delete instanceConfig.yAxis.min;
      }
      return instanceConfig;
    }

    render() {
      const countValue = this.getStatic('countValue');
      const countUnits = this.getStatic('countUnits');
      const trendLegendData = this.getStatic('trendLegendData');

      return (
        <Composed {...this.props}
                  countValue={countValue} countUnits={countUnits}
                  trendLegendData={trendLegendData}>
          <div ref={el => this._chart = el} />
        </Composed>
      );
    }
  }
};

export default withSparkline;

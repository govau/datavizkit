
import React, {PureComponent} from 'react';
import last from 'lodash/last';
import merge from 'lodash/merge';

import Count from './count/count.js';
import TrendLegend from './trendLegend.js';


// render a sparkline chart and manage sparkline chart stuff
const withSparklineChart = (ComposedComponent) => {

  return class extends PureComponent {

    constructor(props) {
      super(props);

      this._chartEl = null;
      this._chartConfig = null;

      this.state = {
        trendLegend: null,
      }
    }

    componentDidMount() {
      this._chartConfig = this.createConfig();
      this.props.renderChart(this._chartConfig);
    }

    componentWillUnmount() {
      this.props.destroyChart();
      this._chartEl = null;
      this._chartConfig = null;
    }

    createConfig() {
      const {
        chartConfig,
      } = this.props;

      const broadcastSetState = this.setState.bind(this);


      const baseConfig = {
        chart: {
          type: 'spline',
          height: 140,
          events: {

            load: function() {  // equivalent to constructor callback

              broadcastSetState({'count': {
                value: last(this.series[0].data).y,
                units: this.series[0].options.units,
              }});

              if (this.series[0].data.length >= 2) {
                broadcastSetState({'trendLegend': this.series[0].data});
              }

              // "select" the last column
              const lastCol = last(this.series[0].data);
              if (lastCol) {
                lastCol.select();
              }
            },
          },
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
                }
              }
            },
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
        tooltip: {
          enabled: false
        },
      };

      const instanceConfig = {
        chart: {
          renderTo: this._chartEl
        },
        xAxis: chartConfig.xAxis,
        // yAxis: chartConfig.yAxis,
        series: chartConfig.series,
      };

      if (instanceConfig.yAxis && instanceConfig.yAxis.min) {
        delete instanceConfig.yAxis.min;
      }

      const config = merge({}, baseConfig, instanceConfig);

      return config;
    }

    render() {
      const {trendLegend, count} = this.state;
      return (
        <ComposedComponent {...this.props}>
          {count && <Count value={count.value} units={count.units} />}
          <div ref={el => this._chartEl = el} />
          {trendLegend && trendLegend.length > 0 && <TrendLegend data={trendLegend} />}
        </ComposedComponent>
      )
    }
  }
};

export default withSparklineChart;

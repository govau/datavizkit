
import React, {PureComponent} from 'react';
import {compose} from 'recompose';
import last from 'lodash/last';

import TrendLegend from './trendLegend.js';
// todo - export "Highcharts" related config ops to withHighcharts or as utils


// render a sparkline chart and manage sparkline chart stuff
const withSparklineChart = (ComposedComponent) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.chartEl = null;
      this.state = {
        trendLegend: null,
      }
    }
    componentDidMount() {
      this.props.renderChart(this.getBaseConfig(), this.getInstanceConfig());
    }
    componentWillUnmount() {
      this.props.destroyChart(this.chart);
    }
    getBaseConfig() {
      const {
        title,
        dateLastUpdated,
      } = this.props;

      const boundSetState = this.setState.bind(this);

      return {
        chart: {
          type: 'spline',
          margin: [150, 0, 0, 0],
          events: {
            load: function() {  // equivalent to constructor callback

              var latestValue = last(this.series[0].data).y;
              this.renderer.text(latestValue)
                .attr({
                  zIndex: 6,
                  x: '50%',
                  y: '35%'
                })
                .css({
                  fontSize: '700%',
                  textAnchor: 'middle'
                })
                .add();

              if (this.series[0].data.length >= 2) {
                boundSetState({'trendLegend': this.series[0].data});
              }
            },
          },
        },
        title: {
          text: title,
        },
        subtitle: {
          useHTML: true,
          text: `<span>Last updated <time dateTime="${dateLastUpdated}">${dateLastUpdated}</time></span>`,
        },
        yAxis: {
          visible: false
        },
        xAxis: {
          visible: false
        },
        plotOptions: {
          line: {
            animation: false,
            allowPointSelect: false,
            stickyTracking: true
          },
          series: {
            animation: false,
            marker: {
              enabled: false
            },
            states: {
              select: { // required because can be selected programatically
                enabled: false
              }
            },
            allowPointSelect: false,
          },
        },
        tooltip: {
          enabled: false
        },
      };
    }
    getInstanceConfig() {
      const {
        chartConfig,
      } = this.props;
      return {
        chart: {
          renderTo: this.chartEl
        },
        xAxis: chartConfig.xAxis,
        series: chartConfig.series,
      };
    }
    render() {
      const {trendLegend} = this.state;
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this.chartEl = el} />
          {trendLegend && trendLegend.length && <TrendLegend data={trendLegend} />}
        </ComposedComponent>
      )
    }
  }
};

export default withSparklineChart;

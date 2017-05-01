
import React, {PureComponent} from 'react';
import last from 'lodash/last';
import merge from 'lodash/merge';
import get from 'lodash/get';
import TrendLegend from './trendLegend.js';
import {unitFormats, dateFormats} from './../utils/displayFormats';


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
        title,
        dateLastUpdated,
        chartConfig,
      } = this.props;

      const broadcastSetState = this.setState.bind(this);


      const baseConfig = {
        chart: {
          type: 'spline',
          margin: [150, 0, 0, 0],
          events: {

            load: function() {  // equivalent to constructor callback
              var latestValue = last(this.series[0].data).y;
              var unitFormat = unitFormats[this.series[0].options.units];
              var unitSymbol = get(unitFormat, 'symbol') || '';
              var valueSpan = `<span style="font-size:700%;">${latestValue}</span>`;
              var unitSpan = `<span style="font-size:200%; baseline-shift: super;">${unitSymbol}</span>`;
              var splineHtml = '';

              if (get(unitFormat, 'prefix')) {
                splineHtml = `${unitSpan} ${valueSpan}`;
              }
              else {
                splineHtml = `${valueSpan} ${unitSpan}`;
              }

              this.renderer.text(splineHtml)
                .attr({
                  zIndex: 6,
                  x: '50%',
                  y: '35%'
                })
                .css({
                  textAnchor: 'middle'
                })
                .add();

              if (this.series[0].data.length >= 2) {
                broadcastSetState({'trendLegend': this.series[0].data});
              }
            },
          },
        },
        title: {
          useHTML: true,
          text: `<span>${title}</span>`,
        },
        subtitle: {
          useHTML: true,
          text: `<span>Last updated <time dateTime="${dateFormats.dateTime(dateLastUpdated)}">${dateFormats.dayMonthYear(dateLastUpdated)}</time></span>`,
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
          },
          series: {
            marker: {
              enabled: false
            },
            states: {
              hover: {
                enabled: false,
                marker: {
                  enabled: false,
                }
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
        series: chartConfig.series,
      };

      const config = merge({}, baseConfig, instanceConfig);

      return config;
    }

    render() {
      const {trendLegend} = this.state;
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this._chartEl = el} />
          {trendLegend && trendLegend.length && <TrendLegend data={trendLegend} />}
        </ComposedComponent>
      )
    }
  }
};

export default withSparklineChart;

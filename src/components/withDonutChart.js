
import React, {PureComponent} from 'react';

import Legend from './customLegend.js';
import {makeHighContrastFill} from './../utils/highContrastMode';

// todo - export "Highcharts" related config ops to withHighcharts or as utils


// render a donut chart and manage donut chart stuff
const withDonutChart = (ComposedComponent) => {

  return class extends PureComponent {

    constructor(props) {
      super(props);
      this.chartEl = null;
      this.highContrast = makeHighContrastFill();
      this.state = {
        customLegend: null,
      }
    }
    componentDidMount() {
      this.props.definePatterns(this.highContrast.getOptions());
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
          type: 'pie',
          events: {
            load: function() {  // equivalent to constructor callback

              const customLegendData = this.series[0].data.map(d => {
                return {
                  key: d.name,
                  y: d.percentage + '%',
                  // y: Highcharts.numberFormat(d.percentage, 2) + '%',
                  color: d.color
                }
              });
              boundSetState({'customLegend': customLegendData});
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
        plotOptions: {
          pie: {
            animation: false,
            dataLabels: {
              enabled: false
            },
            showInLegend: true,
            states: {
              hover: {
                brightness: -.2,
                halo: {
                  size: 0,
                }
              },
              select: { // required because can be selected programmatically
                enabled: false
              }
            }
          },
        },
        tooltip: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: null
          },
        }
      };
    }
    getInstanceConfig() {

      const {
        chartConfig,
        displayHighContrast,
      } = this.props;

      const config = {
        chart: {
          renderTo: this.chartEl
        },
        series: chartConfig.series,
      };

      config.series = config.series.map((s, idx) => {
        return {
          ...s,
          colorByPoint: true,
          innerSize: '50%',
        }
      });

      if (displayHighContrast) {
        config.series[0].data = config.series[0].data.map(this.highContrast.mapProps);
      }


      return config;
    }
    render() {
      const {customLegend} = this.state;
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this.chartEl = el} />
          {customLegend && customLegend.length && <Legend data={customLegend} />}
        </ComposedComponent>
      )
    }
  }
};

export default withDonutChart;

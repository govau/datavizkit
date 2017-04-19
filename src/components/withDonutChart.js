
import React, {PureComponent} from 'react';

import Legend from './customLegend.js';
// todo - export "Highcharts" related config ops to withHighcharts or as utils


// render a donut chart and manage donut chart stuff
const withDonutChart = (ComposedComponent) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.chartEl = null;
      this.state = {
        customLegend: null,
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
      } = this.props;

      const conf = {
        chart: {
          renderTo: this.chartEl
        },
        series: chartConfig.series,
      };

      conf.series = conf.series.map(s => {
        return {
          ...s,
          colorByPoint: true,
          innerSize: '50%',
        }
      });
      return conf;
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


import React, {PureComponent} from 'react';
import merge from 'lodash/merge';

import {createHighcontrastDashSeriesIteratee} from './../utils/highcontrastPatterns';
import {symbolChars, valueFormats} from './../utils/displayFormats';


const withHeroChart = (ComposedComponent) => {

  return class extends PureComponent {

    constructor(props) {
      super(props);
      this._chartEl = null;
      this._chartConfig = null;
      this._highcontrastSeriesIteratee = createHighcontrastDashSeriesIteratee();
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
        displayHighContrast,
        chartConfig,
      } = this.props;

      const baseConfig = {
        chart: {
          type: 'spline',
        },
        title: {
          text: ''
        },
        subtitle: {
          text: '',
        },
        legend: {
          enabled: true,
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal'
        },
        plotOptions: {
          line: {},
          series: { // todo
            lineWidth: 4,
            animation: false,
            marker: {
              enabled: false, // Can't figure out a way to hide markers on lines yet show on legend :(
              states: {
                hover: {
                  enabled: true
                }
              }
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
          borderRadius: 8,
          headerFormat: '<small>{point.key}</small><table>',
          pointFormatter: function() {
            // this refers tp "Point"
            const {units} = this.series.options;
            const key = symbolChars[this.series.symbol];
            const value = `${units === '$' ? '$' : ''}${this.y}${units === '%' ? '%' : ''}`;

            return `<tr>
                      <td style="color: ${this.series.color}"><span style="font-size:20px;">&#${key}</span></td>
                      <td style="text-align: right;"><strong>${value}</strong></td>
                    </tr>`;
          },
          footerFormat: '</table>',
          useHTML: true
        },
        xAxis: {
          crosshair: {
            width: 40,
            color: 'rgba(204,214,235,0.25)'
          }

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
        }
      };

      const instanceConfig = {
        chart: {
          renderTo: this._chartEl,
        },
        xAxis: chartConfig.xAxis,
        yAxis: chartConfig.yAxis,
        series: chartConfig.series
      };

      const config = merge({}, baseConfig, instanceConfig);

      return this._transformForHighContrast(displayHighContrast, config);
    }

    _transformForHighContrast(should, config) {
      if (should) {
        config.series = config.series.map(this._highcontrastSeriesIteratee);
      }
      return config;
    }

    _transformPartitionedForHighContrast(should, config) {
      if (should) {
        const series = config.series.map(this._highcontrastSeriesIteratee);
        return {series};
      }
      return {};
    }

    render() {
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this._chartEl = el} />
        </ComposedComponent>
      )
    }
  }
};

export default withHeroChart;

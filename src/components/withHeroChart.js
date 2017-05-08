
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';
import isObject from 'lodash/isObject';

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
          height: 360,
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
          spline: {
          },
          series: {
            lineWidth: 4,
            animation: false,
            marker: {
              enabled: true,  // must be enabled for display symbols in the legend
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
                      <td><span style="font-size:20px; color: ${this.series.color}">&#${key}</span></td>
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
          },
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
      };

      const instanceConfig = {
        chart: {
          renderTo: this._chartEl,
        },
        xAxis: chartConfig.xAxis,
        yAxis: chartConfig.yAxis,
        series: chartConfig.series.map(s => {
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
        }),
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

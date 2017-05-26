
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';
import isObject from 'lodash/isObject';
import jsxToString from 'jsx-to-string';

import {createHighcontrastDashSeriesIteratee} from './../utils/highcontrastPatterns';
import {rawMarker} from './marker/marker.js';

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

    componentWillUpdate(nextProps) {
      let partition = {};

      if (this.props.displayHighContrast !== nextProps.displayHighContrast) {
        partition = {...this._transformPartitionedForHighContrast(true, this._chartConfig)};
      }

      if (Object.keys(partition).length) {
        // keep _chartConfig in sync
        merge(this._chartConfig, partition);

        this.props.updateChart(partition);
      }
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
          events: {
            click: function(e) { 
              if (this.tooltip && this.tooltip.label) {
                switch(this.tooltip.label.attr('visibility')) {
                case 'hidden':
                  this.tooltip.label.show();
                  break;
                
                case 'visible':
                  this.tooltip.label.hide();
                  break;
                }
              }
            }
          }
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
          layout: 'horizontal',
          symbolWidth: 52
        },
        plotOptions: {
          spline: {
          },
          series: {
            lineWidth: 4,
            animation: false,
            marker: {
              radius: 8,
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
          formatter: function() {
            const label = this.points[0].series.chart.options.xCategories[this.points[0].x]

            const rows = this.points.map(function(point) {
              const {units} = point.series.options;
              const value = `${units === '$' ? '$' : ''}${point.y}${units === '%' ? '%' : ''}`;
              const marker = rawMarker(point.series.symbol, point.series.color, true);
              const markerHtml = jsxToString(marker).replace('xlinkHref', 'xlink:href');
              
              return `<tr>
                        <td>
                          ${markerHtml}
                        </td>
                        <td style="text-align: right;"><strong>${value}</strong></td>
                      </tr>`;
            });

            return `<small>${label}</small>
              <table style="width:100%">
                ${rows.join('')}
              </table>`;
          },
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
        xAxis: {
          labels: {
            formatter: function () {
              return chartConfig.xAxis.categories[this.value];
            }
          }          
        },
        xCategories: chartConfig.xAxis.categories,
        yAxis: chartConfig.yAxis,
        series: chartConfig.series.map(s => {
          if (isObject(s.data[0])) {
            s.data = s.data.forEach(d => {
              d.marker = {
                enabled: false,
                radius: 4
              }
            })
          } else {
            s.data = s.data.map(y => {
              return {
                y,
                marker: { // disable markers on line chart (by point), but not in legend
                  enabled: false, 
                  radius: 4
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

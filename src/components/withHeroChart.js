
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';
import isObject from 'lodash/isObject';

import {createHighcontrastDashSeriesIteratee} from './../utils/highcontrastPatterns';
import {symbolChars} from './../utils/displayFormats';


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
              console.log("Hello");
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
          headerFormat: '<small>{point.key}</small><table>',
          pointFormatter: function() {
            // this refers tp "Point"
            const {units} = this.series.options;
            const symbol = symbolChars[this.series.symbol];
            const value = `${units === '$' ? '$' : ''}${this.y}${units === '%' ? '%' : ''}`;

            return `<tr>
                      <td>
                        <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <g id="WOG-2015-?4" transform="translate(-596.000000, -1032.000000)" fill="#CF7E33">
                                  <g id="Group-44" transform="translate(590.000000, 946.000000)">
                                      <g id="TT_UserSatisfaction" transform="translate(6.000000, 87.000000)">
                                          <g id="Group-22" transform="translate(0.000000, 4.000000)">
                                              <rect id="Rectangle-15" x="0" y="0" width="25" height="3" rx="1.5"></rect>
                                          </g>
                                          <circle id="Oval-5" stroke="#FFFFFF" cx="12.5" cy="5.5" r="5.5"></circle>
                                      </g>
                                  </g>
                              </g>
                          </g>
                      </svg>
                      <!--<span style="font-size:20px; color: ${this.series.color}">${symbol}</span>-->
                      </td>
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
        xAxis: {
          labels: {
            formatter: function () {
              return chartConfig.xAxis.categories[this.value];
            }
          }
        },
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

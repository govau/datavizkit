
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';
import isObject from 'lodash/isObject';

import Legend from './customLegend/customLegend.js';
import {createHighcontrastDashSeriesIteratee} from './../utils/highcontrastPatterns';
import {
  createCartesianCustomLegendData,
  plotNullDataLayerToAxis
} from './../utils/chartOptionsHelpers';


// render a line chart and manage line chart stuff
const withLineChart = (ComposedComponent) => {

  return class extends PureComponent {

    constructor(props) {
      super(props);

      this._chartEl = null;
      this._chartConfig = null;
      this._highcontrastSeriesIteratee = createHighcontrastDashSeriesIteratee();

      this.state = {
        customLegend: null,
      }
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
      this._highcontrastSeriesIteratee = null;
    }

    createConfig() {
      const {
        displayHighContrast,
        chartConfig,
      } = this.props;

      const broadcastSetState = this.setState.bind(this);

      const baseConfig = {
        chart: {
          type: 'line',
          height: 300,
          events: {

            load: function() {  // equivalent to constructor callback

              this.xAxis = plotNullDataLayerToAxis(this.xAxis, this.series, broadcastSetState);

              broadcastSetState({'customLegend': createCartesianCustomLegendData(this.series)});

              // todo - extract to setHighchartsSeriesDataState
              this.series.forEach(s => {
                s.data.filter((d,idx,arr) => {
                  return idx === arr.length - 1;
                }).map(d => {
                  d.setState('hover');
                });
              });
            },

            redraw: function() {
              broadcastSetState({'customLegend': createCartesianCustomLegendData(this.series)});
            }

          },
        },
        title: {
          text: ''
        },
        subtitle: {
          text: '',
        },
        plotOptions: {
          line: {
            marker: {
              radius: 2,
            }
          },
          series: {
            stickyTracking: true,
            lineWidth: 4,
            animation: false,
            marker: {
              enabled: true,
            },
            point: {
              events: {

                mouseOver: function(e) {
                  broadcastSetState({'customLegend': createCartesianCustomLegendData(this.series.chart.series, this.index)});

                  // todo - extract to setHighchartsSeriesDataState
                  this.series.chart.series.forEach(s => {
                    s.data.filter((d,idx) => {
                      return this.index === idx;
                    }).map(d => {
                      d.setState && d.setState('hover');
                    });
                  });
                },

                mouseOut: function() {
                  // todo - extract to setHighchartsSeriesDataState
                  this.series.chart.series.forEach(s => {
                    s.data.map(d => {
                      d.setState && d.setState('');
                    });
                  });
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
          enabled: false,
          shared: true,
          crosshairs: true,
        },
        xAxis: {
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
        yAxis: {
          title: {
            text: null
          },
        }
      };

      const instanceConfig = {
        chart: {
          renderTo: this._chartEl
        },
        yAxis: chartConfig.yAxis,
        xAxis: chartConfig.xAxis,
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
      const {customLegend} = this.state;
      const {displayHighContrast} = this.props;
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this._chartEl = el} />
          {customLegend && customLegend.length > 0 && <Legend data={customLegend} displayHighContrast={displayHighContrast} />}
        </ComposedComponent>
      )
    }
  }
};

export default withLineChart;


import React, {PureComponent} from 'react';
import merge from 'lodash/merge';

import Legend from './customLegend.js';
import {createHighcontrastFillSeriesIteratee} from './../utils/highcontrastPatterns';
import {
  createCartesianCustomLegendData,
  plotNullDataLayerToAxis
} from './../utils/chartOptionsHelpers';
import {dateFormats} from './../utils/displayFormats';


// render a stackedColumn chart and manage stackedColumn chart stuff
const withStackedColumnChart = (ComposedComponent) => {

  return class extends PureComponent {
    constructor(props) {
      super(props);

      this._chartEl = null;
      this._chartConfig = null;
      this._highcontrastSeriesIteratee = createHighcontrastFillSeriesIteratee();

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
        title,
        dateLastUpdated,
        stackingType,
        chartConfig,
        minimumValue,
        displayHighContrast,
      } = this.props;

      const broadcastSetState = this.setState.bind(this);


      const baseConfig = {
        chart: {
          type: 'column',
          events: {

            load: function() {  // equivalent to constructor callback

              this.xAxis = plotNullDataLayerToAxis(this.xAxis, this.series, broadcastSetState);

              broadcastSetState({'customLegend': createCartesianCustomLegendData(this.series)});

              // todo - extract to setHighchartsSeriesDataState
              this.series.forEach(s => {
                s.data.filter((d,idx,arr) => {
                  return idx == arr.length - 1;
                }).map(d => {
                  d.setState('hover');
                });
              });

            },

            // fired when update is called with redraw
            redraw: function(e) {
              broadcastSetState({'customLegend': createCartesianCustomLegendData(this.series)});
            }

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
        plotOptions: {
          column: {
            stacking: stackingType
          },
          series: {
            animation: false,
            point: {
              events: {

                mouseOver: function() {
                  broadcastSetState({'customLegend': createCartesianCustomLegendData(this.series.chart.series, this.index)});

                  // todo - extract to setHighchartsSeriesDataState
                  this.series.chart.series.forEach(s => {
                    s.data.filter((d,idx) => {
                      return this.index === idx;
                    }).map(d => {
                      d.setState('hover');
                    });
                  });
                },

                mouseOut: function() {
                  // todo - extract to setHighchartsSeriesDataState
                  this.series.chart.series.forEach(s => {
                    s.data.filter((d,idx) => {
                      return this.index === idx;
                    }).map(d => {
                      d.setState('');
                    });
                  });
                }

              }
            },
            states: {
              hover: {
                brightness: -.2,
              },
              select: { // required because it can be selected programatically
                enabled: false
              }
            },
            allowPointSelect: false
          },
        },
        tooltip: {
          // shared: true,
          enabled: false,
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
        xAxis: chartConfig.xAxis,
        series: chartConfig.series,
      };
      if (stackingType === 'normal' && minimumValue) {
        instanceConfig.yAxis.min = minimumValue;
      }

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
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this._chartEl = el} />
          {customLegend && customLegend.length > 0 && <Legend data={customLegend} />}
        </ComposedComponent>
      )
    }
  }
};

export default withStackedColumnChart;

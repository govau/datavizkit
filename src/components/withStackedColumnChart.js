
import React, {PureComponent} from 'react';
import last from 'lodash/last';
import merge from 'lodash/merge';

import Legend from './customLegend.js';
import {createHighcontrastFillSeriesIteratee} from './../utils/highcontrastPatterns';
import {createCartesianCustomLegendData} from './../utils/chartOptionsHelpers';


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

      console.log('componentWillUpdate')

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
      console.log('componentWillUnmount')
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
              var seriesData = this.series[0].data;//this is series data
              seriesData.forEach((d, idx) => {
                if (d.y === null) { //find null value in series
                  // adds plot band
                  this.xAxis[0].addPlotBand({
                    from: idx -.5,  // point back
                    to: idx + .5,   // point after
                    color: 'url(#null-data-layer)', // this color represents the null value region
                  });
                }
              });

              broadcastSetState({'customLegend': createCartesianCustomLegendData(this.series)});

              // "hover" over the last stackedColumn
              const lastCol = last(this.series[0].data);
              if (lastCol) {
                lastCol.onMouseOver && lastCol.onMouseOver();
              }
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
          text: `<span>Last updated <time dateTime="${dateLastUpdated}">${dateLastUpdated}</time></span>`,
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
                },

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
          {customLegend && customLegend.length && <Legend data={customLegend} />}
        </ComposedComponent>
      )
    }
  }
};

export default withStackedColumnChart;

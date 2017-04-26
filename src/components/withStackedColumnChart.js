
import React, {PureComponent} from 'react';
import last from 'lodash/last';
import merge from 'lodash/merge';

import Legend from './customLegend.js';
import {makeHighContrastFill} from './../utils/highContrastMode';


// render a stackedColumn chart and manage stackedColumn chart stuff
const withStackedColumnChart = (ComposedComponent) => {

  return class extends PureComponent {
    constructor(props) {
      super(props);

      this._chartEl = null;
      this._chartConfig = null;

      const highcontrast = this._createHighContrastIteratees();
      this.highcontrastSeriesIteratee = highcontrast.seriesIteratee;

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
      this.highcontrastSeriesIteratee = null;
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

              let customLegendData = this.series.map(s => {
                const lastData = last(s.data);
                return {
                  // key: lastData.category,
                  key: s.name,
                  y: lastData.y,
                  color: lastData.color,
                }
              });
              broadcastSetState({'customLegend': customLegendData});

              // "hover" over the last stackedColumn
              const lastCol = last(this.series[0].data);
              if (lastCol) {
                lastCol.onMouseOver && lastCol.onMouseOver();
              }
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
          column: {
            stacking: stackingType
          },
          series: {
            animation: false,
            point: {
              events: {
                mouseOver: function() {
                  const sliceIdx = this.index;
                  const chartSeries = this.series.chart.series;
                  const customLegendData = chartSeries.map((s, i) => {
                    const sliceData = s.data[sliceIdx];
                    sliceData.setState('hover');
                    return {
                      key: s.name,
                      y: sliceData.y,
                      color: sliceData.color
                    }
                  });
                  broadcastSetState({'customLegend': customLegendData});
                },
                mouseOut: function() {
                  // todo - something weird going on here
                  const sliceIdx = this.index;
                  this.series.chart.series.forEach((s, i) => {
                    s.data[sliceIdx].setState('');
                  });
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
        config.series = config.series.map(this.highcontrastSeriesIteratee);
      }
      return config;
    }

    _transformPartitionedForHighContrast(should, config) {
      if (should) {
        const series = config.series.map(this.highcontrastSeriesIteratee);
        return {series};
      }
      return {};
    }

    _createHighContrastIteratees() {
      const highcontrast = makeHighContrastFill();
      this.props.definePatterns(highcontrast.getOptions());
      return highcontrast;
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

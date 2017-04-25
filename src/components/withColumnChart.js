
import React, {PureComponent} from 'react';
import last from 'lodash/last';
import merge from 'lodash/merge';

import {makeHighContrastFill} from './../utils/highContrastMode';
import Legend from './customLegend.js';



// todo - extract

const transformXAxisForNullDataLayer = (xAxis, series) => {

  const _xAxis = [...xAxis];

  // todo - various data permutations
  series[0].data.forEach((d, idx) => {
    if (d.y === null) { //find null value in series
      // adds plot band
      _xAxis[0].addPlotBand({
        from: idx -.5,  // point back
        to: idx + .5,   // point after
        color: 'url(#null-data-layer)', // this color represents the null value region
      });
    }
  });

  return _xAxis;
};

const generateCustomLegend = (series, index) => {
  return series.map(s => {
    let data;
    if (index) {
      data = s.data[index];
    } else {
      data = last(s.data);
    }
    return {
      key: s.name,
      y: data.y,
      color: data.color,
    }
  });
};


/**
 * A HOC to render a Column Chart, manage it's operations and internal state
 *
 * 2 important paradigms - creation and updating
 *
 */

// render a column chart and manage column chart stuff
// and manages *all state*
const withColumnChart = (ComposedComponent) => {

  return class extends PureComponent {

    constructor(props) {
      super(props);

      this._chartEl = null;
      this._chartConfig = null;

      const highcontrast = this._createHighContrastIteratees();
      this.highcontrastSeriesIteratee = highcontrast.seriesIteratee;

      this.state = {
        customLegend: null,
      };

    }

    // create the chart
    // do this here because we need the destined chart node before we can render chart
    componentDidMount() {
      this._chartConfig = this.createConfig();
      this.props.renderChart(this._chartConfig);
    }

    // shouldComponentUpdate() {
    //    todo - perf: ignore change to customLegend
    // }

    // update
    // state has changed. purely mitigate updates to our highcharts node and trigger redraw
    // *can not* call setState here
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
    }

    createConfig() {
      const {
        title,
        dateLastUpdated,
        minimumValue,
        displayHighContrast,
        chartConfig,
      } = this.props;

      const broadcastSetState = this.setState.bind(this);


      const baseConfig = {
        chart: {
          type: 'column',
          events: {

            // equivalent to constructor callback
            // hence, called only on creation, not on updates
            load: function() {
              this.xAxis = transformXAxisForNullDataLayer(this.xAxis, this.series);

              broadcastSetState({'customLegend': generateCustomLegend(this.series)});

              // "hover" over the last column
              const lastCol = last(this.series[0].data);
              if (lastCol) {
                lastCol.onMouseOver && lastCol.onMouseOver();
              }
            },

            // fired when update is called with redraw
            redraw: function(e) {
              broadcastSetState({'customLegend': generateCustomLegend(this.series)});
            }

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
          column: {},
          series: {
            animation: false,
            point: {
              events: {

                mouseOver: function() {
                  broadcastSetState({'customLegend': generateCustomLegend(this.series.chart.series, this.index)});
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
          renderTo: this._chartEl,
        },
        yAxis: {
          min: minimumValue || 0,
        },
        xAxis: chartConfig.xAxis,
        series: chartConfig.series,
      };

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

export default withColumnChart;

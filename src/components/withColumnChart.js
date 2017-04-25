
import React, {PureComponent} from 'react';
import last from 'lodash/last';
import merge from 'lodash/merge';

import Legend from './customLegend.js';
import {makeHighContrastFill} from './../utils/highContrastMode';



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


// render a column chart and manage column chart stuff
// and manages *all state*
const withColumnChart = (ComposedComponent) => {

  // we don't want highcharts props to belong to state, because we don't
  // want changes to them to impact React's Lifecycle
  let _chartEl = null;
  let _chartConfig = null;


  return class extends PureComponent {

    constructor(props) {
      super(props);

      this.seriesIterateeHighcontrast = this._createHighContrastIteratee();
      this.state = {
        customLegend: null,
      };
    }

    // create the chart
    // we now have access to chart node because component has been rendered
    // so we can find chart.renderTo
    componentDidMount() {
      console.log('componentDidMount')
      _chartConfig = this.createConfig();
      this.props.renderChart(_chartConfig);
    }

    // update
    // props of component changed, need to *transform* the data
    // once I update state, it will trigger a rerender
    // todo
    // componentWillReceiveProps(nextProps) {
    //   console.log('componentWillReceiveProps')
    // }

    // only rerender if state has changed, ignore props changes
    // ignore change to customLegend
    // shouldComponentUpdate() {
    // }

    // todo
    // state has changed and we need to emit change to highcharts and trigger a reflow
    componentWillUpdate(nextProps, nextState) {
    // componentDidUpdate() { or this
      console.log('componentWillUpdate');

      let partition = {};

      if (this.props.displayHighContrast !== nextProps.displayHighContrast) {
        partition.series = this._transformPartitionedForHighContrast(true, _chartConfig).series;
      }

      if (Object.keys(partition).length) {
        this.props.updateChart(partition);

        // keep _chartConfig in sync
        merge(_chartConfig, partition);
      }
    }

    componentWillUnmount() {
      console.log('componentWillUnmount')
      this.props.destroyChart();
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
                  broadcastSetState({'customLegend': generateCustomLegend(this.series, this.index)});
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
          renderTo: _chartEl,
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
        config.series = config.series.map(this.seriesIterateeHighcontrast);
      }
      return config;
    }

    _transformPartitionedForHighContrast(should, config) {
      if (should) {
        const series = config.series.map(this.seriesIterateeHighcontrast);
        return {series};
      }
      return {};
    }

    _createHighContrastIteratee() {
      const highcontrast = makeHighContrastFill();
      this.props.definePatterns(highcontrast.getOptions());
      return highcontrast.seriesIteratee;
    }

    render() {
      const {customLegend} = this.state;
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => _chartEl = el} />
          {customLegend && customLegend.length && <Legend data={customLegend} />}
        </ComposedComponent>
      )
    }
  }
};

export default withColumnChart;

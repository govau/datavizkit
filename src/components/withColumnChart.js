
import React, {PureComponent} from 'react';
import last from 'lodash/last';
import merge from 'lodash/merge';

import Legend from './customLegend.js';
import {makeHighContrastFill} from './../utils/highContrastMode';


// render a column chart and manage column chart stuff
// and manages *all state*
const withColumnChart = (ComposedComponent) => {

  return class extends PureComponent {

    constructor(props) {
      super(props);
      this.chartEl = null;

      this.state = {
        chartConfig: null,
        seriesIterateeHighcontrast: this.createHighContrast(),
        customLegend: null,
      };
    }

    createHighContrast() {
      const highcontrast = makeHighContrastFill();
      this.props.definePatterns(highcontrast.getOptions());
      return highcontrast.seriesIteratee;
    }

    // create the chart
    // we now have access to chart node because component has been rendered
    componentDidMount() {
      console.log('componentDidMount')
      const chartConfig = this.createConfig();
      this.setState({chartConfig});
      this.props.renderChart(chartConfig);
    }

    // update
    // props of component changed, need to *transform* the data
    // once I update state, it will trigger a rerender
    componentWillReceiveProps(nextProps) {
      console.log('componentWillReceiveProps')
      const {chartConfig} = this.state;
      this.setState({chartConfig})
    }

    // only rerender if state has changed, ignore props changes
    // ignore change to customLegend
    // shouldComponentUpdate() {
    // }

    // update highcharts
    // todo
    // state has changed and we need to emit change to highcharts and trigger a reflow
    componentWillUpdate(nextProps, nextState) {
    // componentDidUpdate() { or this
      console.log('componentWillUpdate');

      const {chartConfig} = this.state;
      let partition = {};

      if (this.props.displayHighContrast !== nextProps.displayHighContrast) {
        partition.series = this._transformPartitionedForHighContrast(true, chartConfig).series;
      }

      if (Object.keys(partition).length) {
        this.props.updateChart(partition);
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
        chartConfig,
        minimumValue,
        displayHighContrast,
      } = this.props;
      const boundSetState = this.setState.bind(this);

      const baseConfig = {
        chart: {
          type: 'column',
          events: {
            load: function() {  // equivalent to constructor callback

              var seriesData = this.series[0].data;//this is series data  // todo - this will be different for differnt dimensions of data
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
                  key: s.name,
                  y: lastData.y,
                  color: lastData.color,
                }
              });
              boundSetState({'customLegend': customLegendData});

              // "hover" over the last column
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
          column: {},
          series: {
            animation: false,
            point: {
              events: {
                mouseOver: function() {
                  const sliceIdx = this.index;
                  // todo - verify this works for all data permutations
                  const customLegendData = this.series.chart.series.map(s => {
                    const sliceData = s.data[sliceIdx];
                    return {
                      key: s.name,
                      y: sliceData.y,
                      color: sliceData.color
                    }
                  });
                  boundSetState({'customLegend': customLegendData});
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
          renderTo: this.chartEl
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
        const {seriesIterateeHighcontrast} = this.state;
        config.series = config.series.map(seriesIterateeHighcontrast);
      }
      return config;
    }

    _transformPartitionedForHighContrast(should, config) {
      if (should) {
        const {seriesIterateeHighcontrast} = this.state;
        const series = config.series.map(seriesIterateeHighcontrast);
        return {series};
      }
      return {};
    }

    render() {
      const {customLegend} = this.state;
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this.chartEl = el} />
          {customLegend && customLegend.length && <Legend data={customLegend} />}
        </ComposedComponent>
      )
    }
  }
};

export default withColumnChart;

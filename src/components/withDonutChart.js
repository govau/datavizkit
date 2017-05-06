
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';

import Legend from './customLegend.js';
import {createHighcontrastFillSeriesIteratee} from './../utils/highcontrastPatterns';
import {valueFormats, dateFormats} from './../utils/displayFormats'
import {createPolarCustomLegendData} from './../utils/chartOptionsHelpers';


// render a donut chart and manage donut chart stuff
const withDonutChart = (ComposedComponent) => {

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
      this.props.destroyChart(this.chart);
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
          type: 'pie',
          height: 300,
          events: {

            load: function() {  // equivalent to constructor callback
              broadcastSetState({'customLegend': createPolarCustomLegendData(this.series)});
            },

            redraw: function() {
              broadcastSetState({'customLegend': createPolarCustomLegendData(this.series)});
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
          pie: {
            size: '60%',
            animation: false,
            dataLabels: {
              enabled: false
            },
            showInLegend: true,
            states: {
              hover: {
                enabled: false,
              },
              select: { // required because can be selected programmatically
                enabled: false
              }
            }
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
        series: chartConfig.series,
      };

      const config = merge({}, baseConfig, instanceConfig);

      config.series = config.series.map(s => {
        return {
          ...s,
          colorByPoint: true,
          innerSize: '50%',
        }
      });

      return this._transformForHighContrast(displayHighContrast, config);
    }

    _transformForHighContrast(should, config) {
      if (should) {
        config.series = config.series.map(s => {
          s.data = s.data.map(this._highcontrastSeriesIteratee);
          return s;
        });
      }
      return config;
    }

    _transformPartitionedForHighContrast(should, config) {
      if (should) {
        const series = config.series.map(s => {
          s.data = s.data.map(this._highcontrastSeriesIteratee);
          return s;
        });
        return {series}
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

export default withDonutChart;

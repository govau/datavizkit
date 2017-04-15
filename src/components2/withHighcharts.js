
import React, {PureComponent} from 'react';
import Highcharts from 'highcharts';
import merge from 'lodash/merge';

import {onNextFrame} from './../utils/DOM';


const BASE_HIGHCHARTS_CONFIG = {
  title: {
    text: null,
  },
  yAxis: {
    title: {
      text: null
    }
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false
  },
  tooltip: {
    // enabled: false,
  }
};

// abstract methods from the Highcharts api
const withHighcharts = (ComposedComponent) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.renderChart = this.renderChart.bind(this);
      this.destroyChart = this.destroyChart.bind(this);
    }
    renderChart(chartOptions, instanceOptions) {
      const options = merge(BASE_HIGHCHARTS_CONFIG, chartOptions, instanceOptions);
      if (!options.chart && !options.chart.renderTo) {
        throw new Error('Must provide chart.renderTo on options.');
      }
      onNextFrame(() => {
        new Highcharts.chart(options);
      });
    }
    destroyChart(el) {
      return el.destroy();
    }
    render() {
      return <ComposedComponent {...this.props} renderChart={this.renderChart} destroyChart={this.destroyChart} />
    }
  }
};

export default withHighcharts;

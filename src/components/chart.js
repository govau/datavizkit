
import React, {PureComponent} from 'react';
import Highcharts from 'highcharts';

import {onNextFrame} from './../utils/DOM';


const BASE_CHART_OPTIONS = {
  title: {
    text: null
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

/**
 * Factory ensures that Highcharts stays private and prevents it
 * from being extended or modified. Makes sure our customisations
 * stay consistent across instances.
 *
 */
const ChartFactory = (_Highcharts) => {

  _Highcharts.setOptions({
    colors: [
      '#4892C0',  /* light blue */
      '#75A370',  /* dark green */
      '#F5D900',  /* yellow */
      '#7066A5',  /* light purple */
      '#F8BBD0',  /* pink */
      '#47BCAC',  /* turquoise */
      '#5345AD',  /* purple */
      '#AFA545',  /* olive */
      '#CB6935',  /* orange */
    ],
    chart: {
      style: {
        fontFamily: 'Open Sans,sans-serif'
      }
    }
  });

  class Chart extends PureComponent {
    constructor(props) {
      super(props);
      this.chart = null;
      this.el = null;
      this.Highcharts = _Highcharts;
    }

    componentDidMount() {
      const chartOptions = {...BASE_CHART_OPTIONS, ...this.props.options};
      chartOptions.chart.renderTo = this.el;
      this.chart = onNextFrame(() => this.renderChart(chartOptions, this.props.callback));
    }

    renderChart(options, callback) {
      return new Highcharts.chart(options, callback);
    }

    getChart() {
      if (!this.chart) {
        throw new Error(`Can't access chart before it exists`);
      }
      return this.chart;
    }

    componentWillUnmount() {
      this.chart.destroy();
    }

    render() {
      return <div ref={el => this.el = el} />
    }
  }

  Chart.defaultProps = {
    callback: () => {}
  };

  return Chart;

};

// export Composed
export default ChartFactory(Highcharts);

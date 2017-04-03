
/*

todo:

* handle chart updates after render: http://stackoverflow.com/questions/42848218/using-chart-update-on-a-chart-using-renderto/42850049#42850049

 */

import React, {PureComponent, PropTypes} from 'react';
import Highcharts from 'highcharts';

import {onNextFrame} from './../../utils/DOM';
import Theme from './theme';



const BASE_CHART_OPTIONS = {
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

/**
 * Factory ensures that Highcharts stays private and prevents it
 * from being extended or modified. Makes sure our customisations
 * stay consistent across instances.
 *
 */
const ChartFactory = (_Highcharts) => {

  _Highcharts.setOptions({
    ...Theme
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
      onNextFrame(() => {
        this.chart = this.renderChart(
          chartOptions,
          this.props.callback
        );
      });
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
      return (
        <div className="dvk-chart">
          <div ref={el => this.el = el} />
          {this.props.children}
        </div>
      );
    }
  }

  Chart.defaultProps = {
    callback: () => {},
  };

  Chart.propTypes = {
    children: PropTypes.element,
  };

  return Chart;

};

// export Composed
export default ChartFactory(Highcharts);

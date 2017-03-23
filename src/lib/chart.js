
import React, {PureComponent, PropTypes} from 'react';
import Highcharts from 'highcharts';
import {onNextFrame} from './../utils/DOM';


class Chart extends PureComponent {

  componentDidMount() {
    this.createChart(this.props.chartConfig, this.props.chartOptions);
  }

  createChart(chartConfig, chartOptions) {
    this.chart = new Highcharts.Chart({
      chart: {
        renderTo: this.el,
        ...chartConfig
      },
      ...chartOptions
    });
  }

  updateChart() {
    onNextFrame(this.chart.reflow);
  }

  componentWillUpdate(nextProps) {
    this.updateChart(nextProps.chartConfig, nextProps.chartOptions);
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return <div ref={el => this.el = el} />
  }

}

Chart.propTypes = {
  chartConfig: PropTypes.shape({
    type: PropTypes.string.isRequired
  }).isRequired,
  chartOptions: PropTypes.object.isRequired
};

export default Chart;

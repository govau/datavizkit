
import React, {PureComponent} from 'react';
import {compose} from 'recompose';


// render a column chart and manage column chart stuff
const withColumnChart = (ComposedComponent) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.chartEl = null;
      this.state = {
        customLegend: null,
      }
    }
    componentDidMount() {
      this.props.renderChart(this.getBaseConfig(), this.getInstanceConfig());
    }
    componentWillUnmount() {
      this.props.destroyChart(this.chart);
    }
    getBaseConfig() {
      return {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Monthly Average Rainfall'
        },
        xAxis: {
          categories: [
            'Oct',
            'Nov',
            'Dec'
          ],
        },
        series: [{
          name: 'Tokyo',
          data: [49.9, 71.5, 106.4]

        }, {
          name: 'New York',
          data: [83.6, 78.8, 98.5]
        }]
      };
    }
    getInstanceConfig() {
      return {
        chart: {
          renderTo: this.chartEl
        },
        xAxis: this.props.chartConfig.xAxis,
        series: this.props.chartConfig.series,
      };
    }
    render() {
      const {customLegend} = this.state;
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this.chartEl = el} />
          {customLegend && <div>Custom Legend</div>}
        </ComposedComponent>
      )
    }
  }
};

export default withColumnChart;

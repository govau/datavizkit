
import React, {PureComponent} from 'react';
import Highcharts from 'highcharts';
import merge from 'lodash/merge';


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
      this.renderInDOM = this.renderInDOM.bind(this);
    }
    renderInDOM(chartOptions, instanceOptions) {
      const options = merge(BASE_HIGHCHARTS_CONFIG, chartOptions, instanceOptions);
      if (!options.chart && !options.chart.renderTo) {
        throw new Error('Must provide chart.renderTo on options.');
      }
      new Highcharts.chart(options);
    }
    render() {
      return <ComposedComponent {...this.props} renderInDOM={this.renderInDOM} />
    }
  }
};

export default withHighcharts;

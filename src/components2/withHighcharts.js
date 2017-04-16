
import React, {PureComponent} from 'react';
import Highcharts from 'highcharts';
import merge from 'lodash/merge';


const THEME = {
  /*eslint-disable */
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
  },
  title: {
    style: {
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: 1.5,
      marginTop: 0,
      marginBottom: '4px',
    }
  },
  subtitle: {
    style: {
      fontSize: '14px',
      lineHeight: 1.5,
      fontWeight: 300,
      marginBottom: 0,
      color: '#6c7783',
    }
  }
  /*eslint-enable */
};

const BASE_HIGHCHARTS_CONFIG = {
  title: {
    text: null,
    align: 'left',
  },
  subtitle: {
    align: 'left',
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


Highcharts.setOptions({
  ...THEME
});

// abstract methods from the Highcharts api
const withHighcharts = (ComposedComponent) => {
  console.log('outside withHighcharts')
  return class extends PureComponent {
    constructor(props) {
      console.log('inside withHighcharts')
      super(props);
      this.renderChart = this.renderChart.bind(this);
      this.destroyChart = this.destroyChart.bind(this);
    }
    renderChart(chartOptions, instanceOptions) {
      const options = merge(BASE_HIGHCHARTS_CONFIG, chartOptions, instanceOptions);
      if (!options.chart && !options.chart.renderTo) {
        throw new Error('Must provide chart.renderTo on options.');
      }
      new Highcharts.chart(options);
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

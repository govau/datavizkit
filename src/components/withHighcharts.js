
// https://gist.github.com/mulhoon/63b5d5a98ef0ab8c2b89#file-Highcharts%20Cheat%20Sheet

import React, {PureComponent} from 'react';
import Highcharts from 'highcharts';
import merge from 'lodash/merge';

import ProvidePatternFill from './../vendor/pattern-fill-v2';


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
      fontFamily: 'Open Sans,sans-serif',
      marginBottom: '8px'
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

  let instance;


  return class extends PureComponent {

    constructor(props) {
      super(props);
      this.definePatterns = this.definePatterns.bind(this);
      this.renderChart = this.renderChart.bind(this);
      this.destroyChart = this.destroyChart.bind(this);
      this.redrawChart = this.redrawChart.bind(this);
    }

    // provide unique unique to chart
    // will render defs for each chart
    definePatterns(options) {
      ProvidePatternFill(Highcharts, options);
    }

    renderChart(instanceConfig) {
      const config = merge({}, BASE_HIGHCHARTS_CONFIG, instanceConfig);
      if (!config.chart && !config.chart.renderTo) {
        throw new Error('Must provide chart.renderTo on config.');
      }
      instance = new Highcharts.chart(config);
    }

    destroyChart() {
      return instance && instance.destroy();
    }

    updateChart(options) {
      const redraw = true;
      return instance && instance.update(options, redraw);
    }

    redrawChart() {
      return instance.redraw();
    }

    render() {
      return <ComposedComponent {...this.props}
                                renderChart={this.renderChart}
                                destroyChart={this.destroyChart}
                                definePatterns={this.definePatterns}
                                redrawChart={this.redrawChart}
                                updateChart={this.updateChart} />
    }
  }
};

export default withHighcharts;

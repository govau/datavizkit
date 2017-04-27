
// https://gist.github.com/mulhoon/63b5d5a98ef0ab8c2b89#file-Highcharts%20Cheat%20Sheet

import React, {PureComponent} from 'react';
import Highcharts from 'highcharts';
import merge from 'lodash/merge';

import makeHighcontrastPatterns from './../utils/highcontrastPatterns';


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


/**
 * Exposes a charting API on top of Highcharts without exposing Highcharts primitives
 *
 * This way we can include different charting libraries or none with the same
 * abstractions
 *
 */

// expose this Component as a public component
export const HighcontrastPatterns = makeHighcontrastPatterns(Highcharts);


// abstract methods from the Highcharts api
const withHighcharts = (ComposedComponent) => {

  return class extends PureComponent {

    constructor(props) {
      super(props);
      this._instance = null;
      this.renderChart = this.renderChart.bind(this);
      this.destroyChart = this.destroyChart.bind(this);
      this.updateChart = this.updateChart.bind(this);
    }

    renderChart(instanceConfig) {
      const config = merge({}, BASE_HIGHCHARTS_CONFIG, instanceConfig);
      if (!config.chart && !config.chart.renderTo) {
        throw new Error('Must provide chart.renderTo on config.');
      }
      this._instance = new Highcharts.chart(config);
      return this._instance;
    }

    destroyChart() {
      if (this._instance) {
        this._instance.destroy();
        this._instance = null;
      }
    }

    updateChart(options) {
      const redraw = true;
      return this._instance && this._instance.update(options, redraw);
    }

    render() {
      return <ComposedComponent {...this.props}
                                renderChart={this.renderChart}
                                destroyChart={this.destroyChart}
                                updateChart={this.updateChart}
                                HighcontrastPatterns={HighcontrastPatterns} />
    }
  }
};


export default withHighcharts;


import React, {PureComponent} from 'react';
import Highcharts from 'highcharts';
import merge from 'lodash/merge';

// todo - switch back to module
// import ProvidePatternFill from 'highcharts-pattern-fill';
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

// ProvidePatternFill(Highcharts, {fillTypes:[0,1,2,3,4,5,6,7,8]});

ProvidePatternFill(Highcharts, {
  fillTypes: [4,5,2,6,7,3,8],
  fillNamespace: 'highcharts-high-contrast-pattern'
});

// abstract methods from the Highcharts api
const withHighcharts = (ComposedComponent) => {

  return class extends PureComponent {

    constructor(props) {
      super(props);

      this.definePatterns = this.definePatterns.bind(this);
      this.renderChart = this.renderChart.bind(this);
      this.destroyChart = this.destroyChart.bind(this);
    }

    // provide unique unique to chart
    // will render defs for each chart
    // todo if (isHighContrastMode) {
    definePatterns(options) {
      ProvidePatternFill(Highcharts, options);
    }

    renderChart(chartOptions, instanceOptions) {
      const options = merge({}, BASE_HIGHCHARTS_CONFIG, chartOptions, instanceOptions);
      if (!options.chart && !options.chart.renderTo) {
        throw new Error('Must provide chart.renderTo on options.');
      }
      new Highcharts.chart(options);
    }

    destroyChart(el) {
      return el.destroy();
    }

    render() {
      return <ComposedComponent {...this.props}
                                renderChart={this.renderChart}
                                destroyChart={this.destroyChart}
                                definePatterns={this.definePatterns}
                                _Highcharts={Highcharts} />
    }
  }
};

export default withHighcharts;

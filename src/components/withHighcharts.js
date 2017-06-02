
import React, {PureComponent} from 'react';
import Highcharts from 'highcharts';
import merge from 'lodash/merge';
import includes from 'lodash/includes';

import makeHighcontrastPatterns from './../utils/highcontrastPatterns';

import './highcharts.css';

// This fixes the "thin lines at top & bottom of chart" bug
Highcharts.wrap(Highcharts.Chart.prototype, 'setChartSize', function (proceed) {
	proceed.apply(this, [].slice.call(arguments, 1));
  if (includes(['line','spline'], get(this, 'options.chart.type'))) {
    this.clipBox.height += 6;
    this.clipBox.y -= 3;
  }
});


const BASE_CHARTCONFIG = {
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
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      // day: '%e of %b',
      // month: '%b \'%y',
    },
    crosshair: true,
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
      lineHeight: 1.25,
      marginTop: 0,
      marginBottom: 0,// todo - dont think this does anything
      width: '100%',
      display: 'block',
    }
  },
  subtitle: {
    style: {
      display: 'block',
      right: 0,
      // width: '100%; !important',
      marginBottom: '20px',
      fontSize: '12px',
      lineHeight: 1.5,
      fontWeight: 300,
      color: '#596371',
    }
  }
  /*eslint-enable */
};

Highcharts.setOptions({
  ...THEME
});

export const HighcontrastPatterns = makeHighcontrastPatterns(Highcharts);


const withHighcharts = Composed => {
  return class extends PureComponent {

    constructor(props) {
      super(props);
      this.create = this.create.bind(this);
      this.redraw = this.redraw.bind(this);
      this.destroy = this.destroy.bind(this);

      this._instance = null;
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (__DEV__) {
        if (JSON.stringify(nextState) !== this.state) {
          throw new Error('Highcharts components are not allowed to use state, use static instead.')
        }
      }
    }

    // save this._instance
    create(instanceConfig) {
      // console.log('withHighcharts create');

      const config = merge({}, BASE_CHARTCONFIG, instanceConfig);
      if (!config.chart && !config.chart.renderTo) {
        throw new Error('Must provide chart.renderTo on config.');
      }
      this._instance = new Highcharts.chart(config);

      // ====================================================
      // make Highcharts opinionated about re-rendering React
      // ====================================================
      this.forceUpdate();


      return this._instance;
    }

    // "update" by recreating the chart instance
    redraw(instanceConfig) {
      // console.log('withHighcharts redraw');

      this.destroy();
      this.create(instanceConfig);
      return this._instance;
    }

    // delete this._instance
    destroy() {
      // console.log('withHighcharts destroy');

      if (this._instance) {
        this._instance.destroy();
        this._instance = null;
      }
    }

    render() {
      // console.log('withHighcharts render');
      return (
        <Composed {...this.props}
                  create={this.create}
                  redraw={this.redraw}
                  destroy={this.destroy}
                  HighcontrastPatterns={HighcontrastPatterns} />
      )
    }
  }
};

export default withHighcharts;

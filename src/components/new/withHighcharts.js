
import React, {PureComponent} from 'react';
import Highcharts from 'highcharts';
import merge from 'lodash/merge';

import makeHighcontrastPatterns from './../../utils/highcontrastPatterns';

import './../highcharts.css';


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
      this.update = this.update.bind(this);
      this.destroy = this.destroy.bind(this);

      this.redraw = true;
      this._instance = null;
    }

    // save this._instance
    create(instanceConfig) {
      console.log('withHighcharts create');

      const config = merge({}, BASE_CHARTCONFIG, instanceConfig);
      if (!config.chart && !config.chart.renderTo) {
        throw new Error('Must provide chart.renderTo on config.');
      }
      this._instance = new Highcharts.chart(config);
      return this._instance;
    }

    // update this._instance
    update(config, propNamesChanged) {
      console.log('withHighcharts update');

      if (!this._instance) {
        return null;
      }

      propNamesChanged.map(propName => {
        if (propName === 'chart') {
          this._updateChart(config);
        }
        if (propName === 'series') {
          this._updateSeries(config.series);
        }
        if (propName === 'xAxis') {
          this._updateXAxes(config.xAxis);
        }
        if (propName === 'yAxis') {
          this._updateYAxes(config.yAxis);
        }
      });
      this.redraw && this._instance.redraw();
    }

    // can update any element of the chart other than xAxis, yAxis or series.
    _updateChart(config) {
      return this._instance.update(config, false);
    }

    _updateSeries(series) {
      return this._instance.series.map((s, idx) => {
        return s.setData(series[idx].data);
      });
    }

    _updateXAxes(xAxes) {
      this._instance.xAxis.map((axis, idx) => {
        return axis.update(xAxes[idx]);
      });
    }

    _updateYAxes(yAxes) {
      this._instance.yAxis.map((axis, idx) => {
        return axis.update(yAxes[idx]);
      });
    }


    // delete this._instance
    destroy() {
      console.log('withHighcharts destroy');

      if (this._instance) {
        this._instance.destroy();
        this._instance = null;
      }
    }

    render() {
      console.log('withHighcharts render');
      return (
        <div style={{border: '1px solid red', padding: '10px'}}>
          <h1>withHighcharts</h1>
          <Composed {...this.props}
                    create={this.create}
                    update={this.update}
                    destroy={this.destroy}
                    HighcontrastPatterns={HighcontrastPatterns} />
        </div>
      )
    }
  }
};

export default withHighcharts;

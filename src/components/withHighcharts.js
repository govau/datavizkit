
import React, {PureComponent} from 'react';
import Highcharts from 'highcharts';
import merge from 'lodash/merge';
import get from 'lodash/get';
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
      this.updateData = this.updateData.bind(this);
      this.destroy = this.destroy.bind(this);
      this.updateSeriesByProp = this.updateSeriesByProp.bind(this);

      this.redraw = false;
      this._instance = null;
    }

    // save this._instance
    create(instanceConfig) {
      // console.log('withHighcharts create');

      const config = merge({}, BASE_CHARTCONFIG, instanceConfig);
      if (!config.chart && !config.chart.renderTo) {
        throw new Error('Must provide chart.renderTo on config.');
      }
      this._instance = new Highcharts.chart(config);
      return this._instance;
    }

    updateSeriesByProp(propBySeries, propname) {
      if (!this._instance) {
        return null;
      }
      this._instance.series.forEach((s, idx) => {
        if (propBySeries[idx] === s[propname]) {
          return;
        }
        return s.update({
          [propname]: propBySeries[idx] || null,
        })
      });
    }

    // // todo - bugs in Highcharts prevents us from doing this! :(
    // updateSeriesPointsByProp(propBySeriesPoint, propname) {
    //   if (!this._instance) {
    //     return null;
    //   }
    //   this._instance.series.forEach(s => {
    //     s.data.forEach((point, idx) => {
    //       point.update({
    //         [propname]: propBySeriesPoint[idx] || null,
    //       });
    //
    //       // todo - this is a dirty dirty hack for donuts and needs fix
    //       // if (typeof propBySeriesPoint[idx] === 'undefined') {
    //       //   point.update({
    //       //     [propname]: point.color || null,
    //       //   });
    //       // } else {
    //       //   point.graphic.attr("fill", propBySeriesPoint[idx]);
    //       // }
    //     });
    //   });
    // }

    // update supplied data props on this._instance
    updateData(config, propNamesChanged) {
      // console.log('withHighcharts update');

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

      // DON'T REDRAW!
      return this._instance;
    }

    // caution! use this at your peril!
    // It will redraw the whole chart! and is super expensive but we need it
    // to support highcontrast mode for donuts.
    // prefer updating by partition instead
    _updateChart(config) {
      return this._instance.update(config, true); // must be true so it redraws - behaves different to other updates
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
                  updateSeriesByProp={this.updateSeriesByProp}
                  updateData={this.updateData}
                  destroy={this.destroy}
                  HighcontrastPatterns={HighcontrastPatterns} />
      )
    }
  }
};

export default withHighcharts;

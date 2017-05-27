
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';
import isObject from 'lodash/isObject';

import {createHighcontrastDashStyleSetSeriesIteratee} from './../../utils/highcontrastPatterns';
import {tooltipMarker} from './../../utils/displayFormats';


const BASE_HERO_CHARTCONFIG = {
  chart: {
    type: 'spline',
    height: 360,
  },
  title: {
    text: ''
  },
  subtitle: {
    text: '',
  },
  legend: {
    enabled: true,
    align: 'center',
    verticalAlign: 'bottom',
    layout: 'horizontal',
    symbolWidth: 52
  },
  plotOptions: {
    spline: {
    },
    series: {
      lineWidth: 4,
      animation: false,
      marker: {
        radius: 8,
        enabled: true,  // must be enabled for display symbols in the legend
      },
      states: {
        hover: {
          brightness: -.2,
        },
        select: { // required because can be selected programatically
          enabled: false
        }
      },
      allowPointSelect: false,
    },
  },
  tooltip: {
    enabled: true,
    shared: true,
    crosshairs: true,
    borderRadius: 8,
    formatter: function() {
      const label = this.x;
      const rows = this.points.map(function(point) {
        const {units} = point.series.options;
        const value = `${units === '$' ? '$' : ''}${point.y}${units === '%' ? '%' : ''}`;
        const marker = tooltipMarker(point.series.symbol, point.series.color);

        return `<tr>
                  <td>
                    ${marker}
                  </td>
                  <td style="text-align: right;"><strong>${value}</strong></td>
                </tr>`;
      });

      return `<small>${label}</small>
              <table style="width:100%">
                ${rows.join('')}
              </table>`;
    },
    useHTML: true
  },
  xAxis: {
    crosshair: {
      width: 40,
      color: 'rgba(204,214,235,0.25)'
    },
    // type: 'datetime', // todo - format x labels to datetime
    // Format 24 hour time to AM/PM
    // dateTimeLabelFormats: {
    //   hour: '%I:%M %P',
    //   minute: '%I %M'
    // },
    // labels: {
    //   formatter: function() {
    //     return Highcharts.dateFormat('%I:%M %P', this.value);
    //   }
    // }
  },
};


const withHero = Composed => {
  return class extends PureComponent {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;
      this._highcontrastOnSeriesIteratee = createHighcontrastDashStyleSetSeriesIteratee(true);
      this._highcontrastOffSeriesIteratee = createHighcontrastDashStyleSetSeriesIteratee(false);

      this.state = {
        customLegendData: null,
      }
    }

    // create
    componentDidMount() {
      // console.log('withHero componentDidMount');

      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      this.props.create(config);

      // map highcontrast to series
      if (this.props.displayHighContrast) {
        this.props.updateSeriesByProp(this._getHighcontrastPropsMap(config, this.props.displayHighContrast), 'dashStyle');
      }
    }

    // update
    componentWillUpdate(nextProps, nextState) {
      // console.log('withHero componentWillUpdate');

      const config = this.makeInstanceConfig(this._baseChartConfig, nextProps);


      let propNamesChanged = [];

      if (JSON.stringify(nextProps.series) !== JSON.stringify(this.props.series)) {
        propNamesChanged = [...propNamesChanged, 'series'];
      }

      if (JSON.stringify(nextProps.yAxis) !== JSON.stringify(this.props.yAxis)) {
        propNamesChanged = [...propNamesChanged, 'yAxis'];
      }

      if (JSON.stringify(nextProps.xAxis) !== JSON.stringify(this.props.xAxis)) {
        propNamesChanged = [...propNamesChanged, 'xAxis'];
      }

      // map highcontrast to series
      if (this.props.displayHighContrast !== nextProps.displayHighContrast) {
        this.props.updateSeriesByProp(this._getHighcontrastPropsMap(config, nextProps.displayHighContrast), 'dashStyle');
      }

      // update by type
      this.props.updateData(config, propNamesChanged);
    }

    // destroy
    componentWillUnmount() {
      // console.log('withHero componentWillUnmount');

      this.props.destroy();
      this._chart = null;
      this._baseChartConfig = null;
    }


    createBaseConfig() {

      // only create it once
      if (this._baseChartConfig) {
        return this._baseChartConfig;
      }


      const config = merge({}, BASE_HERO_CHARTCONFIG);

      // const broadcastSetState = this.setState.bind(this);

      config.chart.renderTo = this._chart;

      // bind events to config
      config.chart.events = {
        click: function(e) {
          // Hide tooltip on click (for mobile)
          if (this.tooltip && this.tooltip.label) {
            switch(this.tooltip.label.attr('visibility')) {
              case 'hidden':
                this.tooltip.label.show();
                break;
              case 'visible':
                this.tooltip.label.hide();
                break;
            }
          }
        }
        // load: function() {
        // },
        // render: function() {
        // },
      };

      this._baseChartConfig = config;

      return config;
    }

    makeInstanceConfig(config, passedProps) {
      const {series, xAxis, yAxis} = passedProps;

      let instanceConfig = merge({}, config, {
        xAxis,
        series,
        yAxis,
      });

      // Hero chart, remove left & right padding - https://github.com/govau/datavizkit/pull/153/files
      instanceConfig.xAxis.labels = {
        formatter: function() {
          return xAxis.categories[this.value]
        }
      };

      // markers
      instanceConfig.series = instanceConfig.series.map(s => {
        if (isObject(s.data[0])) {
          s.data = s.data.forEach(d => {
            d.marker = {
              enabled: false,
              radius: 4,
            }
          })
        } else {
          s.data = s.data.map(y => {
            return {
              y,
              marker: { // disable markers on line chart (by point), but not in legend
                enabled: false,
                radius: 4,
              }
            }
          });
        }
        return s;
      });

      return instanceConfig;
    }

    _getHighcontrastPropsMap(config, condition) {
      return config.series.map(condition ? this._highcontrastOnSeriesIteratee : this._highcontrastOffSeriesIteratee);
    }

    render() {
      // console.log('withHero render');

      return (
        <Composed {...this.props}>
          <div ref={el => this._chart = el} />
        </Composed>
      );
    }
  }
};

export default withHero;

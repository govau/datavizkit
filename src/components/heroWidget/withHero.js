
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';
import isObject from 'lodash/isObject';

import {createHighcontrastFillSeriesIteratee} from './../../utils/highcontrastPatterns';
import {symbolChars} from './../../utils/displayFormats';


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
    headerFormat: '<small>{point.key}</small><table>',
    pointFormatter: function() {
      // this refers tp "Point"
      const {units} = this.series.options;
      const symbol = symbolChars[this.series.symbol];
      const value = `${units === '$' ? '$' : ''}${this.y}${units === '%' ? '%' : ''}`;

      return `<tr>
                <td><span style="font-size:20px; color: ${this.series.color}">${symbol}</span></td>
                <td style="text-align: right;"><strong>${value}</strong></td>
              </tr>`;
    },
    footerFormat: '</table>',
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
      this._highcontrastSeriesIteratee = createHighcontrastFillSeriesIteratee();

      this.state = {
        customLegendData: null,
      }
    }

    // create
    componentDidMount() {
      // console.log('withHero componentDidMount');

      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps, nextState) {
      // console.log('withHero componentWillUpdate');

      const config = this.makeInstanceConfig(this._baseChartConfig, nextProps);

      // diff nextProps, nextState - intersection or decide what I should pass to update? currently update all

      let propNamesChanged = [];

      // todo check for change on chart as well


      if (this.props.displayHighContrast !== nextProps.displayHighContrast) {
        this.props.update(this._transformForHighContrast(config), ['series']);
        return;
      }

      if (JSON.stringify(nextProps.series) !== JSON.stringify(this.props.series)) {
        propNamesChanged = [...propNamesChanged, 'series'];
      }

      if (JSON.stringify(nextProps.yAxis) !== JSON.stringify(this.props.yAxis)) {
        propNamesChanged = [...propNamesChanged, 'yAxis'];
      }

      if (JSON.stringify(nextProps.xAxis) !== JSON.stringify(this.props.xAxis)) {
        propNamesChanged = [...propNamesChanged, 'xAxis'];
      }

      // update by type
      this.props.update(config, propNamesChanged);
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

      const broadcastSetState = this.setState.bind(this);

      config.chart.renderTo = this._chart;

      // bind events to config
      config.chart.events = {
        // load: function() {
        // },
        // render: function() {
        // },
      };

      this._baseChartConfig = config;

      return config;
    }

    makeInstanceConfig(config, passedProps) {
      const {series, xAxis, yAxis, displayHighContrast} = passedProps;

      let instanceConfig = merge({}, config, {
        xAxis,
        series,
        yAxis,
      });

      // markers
      instanceConfig.series = instanceConfig.series.map(s => {
        if (isObject(s.data[0])) {
          s.data = s.data.forEach(d => {
            d.marker = {
              enabled: false,
            }
          })
        } else {
          s.data = s.data.map(y => {
            return {
              y,
              marker: { // disable markers on line chart (by point), but not in legend
                enabled: false
              }
            }
          });
        }
        return s;
      });

      instanceConfig = this._transformForHighContrast(displayHighContrast, instanceConfig);

      return instanceConfig;
    }

    _transformForHighContrast(should, config) {
      if (should) {
        config.series = config.series.map(this._highcontrastSeriesIteratee);
      }
      return config;
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

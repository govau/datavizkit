
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';

import {createHighcontrastFillColorsSetSeriesIteratee} from './../../utils/highcontrastPatterns';
import {createPolarCustomLegendData} from './../../utils/chartOptionsHelpers';


const BASE_DONUT_CHARTCONFIG = {
  chart: {
    type: 'pie',
    height: 280,
    events: {},
  },
  title: {
    text: ''
  },
  subtitle: {
    text: '',
  },
  plotOptions: {
    pie: {
      size: '60%',
      animation: false,
      dataLabels: {
        enabled: false
      },
      showInLegend: true,
      states: {
        hover: {
          enabled: false,
        },
        select: { // required because can be selected programmatically
          enabled: false
        }
      }
    },
  },
  tooltip: {
    enabled: false,
  },
  yAxis: {
    title: {
      text: null
    },
  },
};


const withDonut = Composed => {
  return class extends PureComponent {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;

      this._highcontrastOnSeriesIteratee = createHighcontrastFillColorsSetSeriesIteratee(true);
      this._highcontrastOffSeriesIteratee = createHighcontrastFillColorsSetSeriesIteratee(false);

      this.state = {
        customLegendData: null,
      }
    }

    // create
    componentDidMount() {
      // console.log('withDonut componentDidMount');

      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      // map highcontrast to series
      if (this.props.displayHighContrast) {

        // todo - this is a hack! scary canary!
        const colorsMap = this._getHighcontrastPropsMap(config, this.props.displayHighContrast);
        config.series.forEach(s => {
          s.data.forEach((point, idx) => {
            point.color = colorsMap[idx];
          });
        });
        // todo - should be
        // this.props.updateSeriesPointsByProp(this._getHighcontrastPropsMap(config, this.props.displayHighContrast), 'color');
      }

      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps, nextState) {
      // console.log('withDonut componentWillUpdate');

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
      // todo - this is a hack! scary canary!
      if (this.props.displayHighContrast !== nextProps.displayHighContrast) {

        const colorsMap = this._getHighcontrastPropsMap(config, this.props.displayHighContrast);
        config.series.forEach(s => {
          s.data.forEach((point, idx) => {
            point.color = colorsMap[idx];
          });
        });
        propNamesChanged = [...propNamesChanged, 'chart'];
        // todo - should be
        // this.props.updateSeriesPointsByProp(this._getHighcontrastPropsMap(config, this.props.displayHighContrast), 'color');
      }

      // update by type
      this.props.updateData(config, propNamesChanged);
    }

    // destroy
    componentWillUnmount() {
      // console.log('withDonut componentWillUnmount');

      this.props.destroy();
      this._chart = null;
      this._baseChartConfig = null;
    }


    createBaseConfig() {

      // only create it once
      if (this._baseChartConfig) {
        return this._baseChartConfig;
      }


      const config = merge({}, BASE_DONUT_CHARTCONFIG);

      const broadcastSetState = this.setState.bind(this);

      config.chart.renderTo = this._chart;

      // bind events to config
      config.chart.events = {
        render: function() {
          broadcastSetState({'customLegendData': createPolarCustomLegendData(this.series)});
        },
      };

      this._baseChartConfig = config;

      return config;
    }

    makeInstanceConfig(config, passedProps) {
      const {series} = passedProps;

      let instanceConfig = merge({}, config, {
        series,
      });

      instanceConfig.series = instanceConfig.series.map(s => {
        return {
          ...s,
          colorByPoint: true,
          innerSize: '50%',
        }
      });

      return instanceConfig;
    }

    _getHighcontrastPropsMap(config, condition) {
      return config.series[0].data.map(condition ? this._highcontrastOnSeriesIteratee : this._highcontrastOffSeriesIteratee);
    }

    render() {
      // console.log('donut render');

      const {customLegendData} = this.state;
      const {displayHighContrast} = this.props;

      return (
        <Composed {...this.props}
                  customLegendData={customLegendData} displayHighContrast={displayHighContrast}>
          <div ref={el => this._chart = el} />
        </Composed>
      );
    }
  }
};

export default withDonut;

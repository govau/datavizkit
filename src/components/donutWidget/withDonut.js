
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';

import {createHighcontrastFillSeriesIteratee} from './../../utils/highcontrastPatterns';
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
      this._highcontrastSeriesIteratee = createHighcontrastFillSeriesIteratee();

      this.state = {
        customLegendData: null,
      }
    }

    // create
    componentDidMount() {
      // console.log('withDonut componentDidMount');

      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps, nextState) {
      // console.log('withDonut componentWillUpdate');

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
        load: function() {
        },
        render: function() {
          broadcastSetState({'customLegendData': createPolarCustomLegendData(this.series)});
        },
      };

      this._baseChartConfig = config;

      return config;
    }

    makeInstanceConfig(config, passedProps) {
      const {series, xAxis, yAxis, displayHighContrast} = passedProps;

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

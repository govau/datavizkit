
import React from 'react';
import merge from 'lodash/merge';

import PureComponentWithStaticProps from './../../classes/pureComponentWithStaticProps';
import {mapHighcontrastFillByPoint} from './../../utils/highcontrastPatterns';
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

  return class extends PureComponentWithStaticProps {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;
    }

    // create
    componentDidMount() {
      // console.log('withDonut componentDidMount');

      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps) {
      // console.log('withDonut componentWillUpdate');

      if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {

        const config = this.makeInstanceConfig(this._baseChartConfig, nextProps);
        // redraw chart
        this.props.redraw(config);
      }
    }

    // destroy
    componentWillUnmount() {
      // console.log('withDonut componentWillUnmount');

      this.props.destroy();
      this._chart = null;
      this._baseChartConfig = null;
    }


    createBaseConfig() {

      const setStatic = this.setStatic;

      // only create it once
      if (this._baseChartConfig) {
        return this._baseChartConfig;
      }


      const config = merge({}, BASE_DONUT_CHARTCONFIG);

      config.chart.renderTo = this._chart;

      // bind events to config
      config.chart.events = {
        render: function() {
          setStatic({'customLegendData': createPolarCustomLegendData(this.series)});
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

      instanceConfig = mapHighcontrastFillByPoint(instanceConfig, passedProps.displayHighContrast);

      return instanceConfig;
    }

    render() {
      // console.log('donut render');

      const customLegendData = this.getStatic('customLegendData');
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

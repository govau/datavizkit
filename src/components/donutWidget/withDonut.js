
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

      const colorProps = props.getColorProps(props.widgetIndex, props.cid);

      this.colorset = colorProps.colorset;
      this.highcontrastPatternIds = colorProps.highcontrastPatternIds;
      this.HighcontrastPatterns = colorProps.HighcontrastPatterns;
    }

    // create
    componentDidMount() {
      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps) {
      if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {

        const config = this.makeInstanceConfig(this._baseChartConfig, nextProps);
        // redraw chart
        this.props.redraw(config);
      }
    }

    // destroy
    componentWillUnmount() {
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

      config.colors  = this.colorset;
      config.chart.renderTo = this._chart;

      if (this.props.chartDescription) {
        config.chart.description = this.props.chartDescription;
      }

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

      instanceConfig = mapHighcontrastFillByPoint(instanceConfig, passedProps.displayHighContrast, this.highcontrastPatternIds);

      return instanceConfig;
    }

    render() {
      const {HighcontrastPatterns} = this;

      const customLegendData = this.getStatic('customLegendData');
      const {displayHighContrast} = this.props;

      return (
        <div>
          <HighcontrastPatterns />
          <Composed {...this.props}
                    customLegendData={customLegendData} displayHighContrast={displayHighContrast}>
            <div ref={el => this._chart = el} />
          </Composed>
        </div>
      );
    }
  }
};

export default withDonut;

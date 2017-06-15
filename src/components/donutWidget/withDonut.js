
import React from 'react';
import merge from 'lodash/merge';

import PureComponentWithStaticProps from './../../classes/pureComponentWithStaticProps';
import {makeHighcontrastPatterns} from './../../utils/highcontrastPatterns';
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

      this.colorset = props.series.map(s => {
        return s.data.map(d => d.color);
      }).reduce(function(prev, curr) { // flatten
        return prev.concat(curr);
      });
      this.patternIds = props.series.map(s => {
        return s.data.map((d, idx) => `hc-p-${props.cid}-${idx}`)
      }).reduce(function(prev, curr) { // flatten
        return prev.concat(curr);
      });
      this.hcColorset = this.patternIds.map((patternId) => `url(#${patternId})`);
      this.Patterns = makeHighcontrastPatterns(this.colorset, this.patternIds);
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

      // config.colors  = this.colorset;
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

      instanceConfig.series = series.map(s => { // todo - extract
        s.data = s.data.map((d, idx) => {
          d.color = passedProps.displayHighContrast ? this.hcColorset[idx] : this.colorset[idx];
          return d;
        });
        return s;
      });

      return instanceConfig;
    }

    render() {
      const {Patterns} = this;
      const customLegendData = this.getStatic('customLegendData');
      const {displayHighContrast} = this.props;

      return (
        <div>
          {displayHighContrast && <Patterns />}
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

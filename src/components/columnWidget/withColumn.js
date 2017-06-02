
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';

import {createHighcontrastFillColorsSetSeriesIteratee} from './../../utils/highcontrastPatterns';
import {
  createCartesianCustomLegendData,
  plotNullDataLayerToAxis
} from './../../utils/chartOptionsHelpers';


const BASE_COLUMN_CHARTCONFIG = {
  chart: {
    type: 'column',
    height: 280,
  },
  title: {
    text: ''
  },
  subtitle: {
    text: '',
  },
  plotOptions: {
    column: {},
    series: {
      stickyTracking: false,
      animation: false,
      point: {
      },
      states: {
        hover: {
          brightness: -.2,
        },
        select: { // required because it can be selected programatically
          enabled: false
        }
      },
      allowPointSelect: false
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


const withColumn = Composed => {
  return class extends PureComponent {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;

      this._highcontrastOnSeriesIteratee = createHighcontrastFillColorsSetSeriesIteratee(true);
      this._highcontrastOffSeriesIteratee = createHighcontrastFillColorsSetSeriesIteratee(false);

      this.static = new Map();

      this.setStatic = this.setStatic.bind(this);
      this.setCustomLegendData = this.setCustomLegendData.bind(this);
    }

    setStatic(keyValues) {
      for (const key in keyValues) {
        this.static.set(key, keyValues[key]);
      }
    }

    getStatic(key) {
      return this.static.get(key);
    }

    // create
    componentDidMount() {
      // console.log('withColumn componentDidMount');

      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      this.props.create(config);

      // map highcontrast to series
      if (this.props.displayHighContrast) {
        this.props.updateSeriesByProp(this._getHighcontrastPropsMap(config, this.props.displayHighContrast), 'color');
      }

      // hydrate static props
      this.forceUpdate();
    }

    // update
    componentWillUpdate(nextProps) {
      // console.log('withColumn componentWillUpdate');

      if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
        const config = this.makeInstanceConfig(this._baseChartConfig, nextProps);
        this.props.redraw(config);

        // map highcontrast to series
        if (this.props.displayHighContrast !== nextProps.displayHighContrast) {
          this.props.updateSeriesByProp(this._getHighcontrastPropsMap(config, nextProps.displayHighContrast), 'color');
        }

        // hydrate static props
        this.forceUpdate();
      }
    }

    // destroy
    componentWillUnmount() {
      // console.log('withColumn componentWillUnmount');

      this.props.destroy();
      this._chart = null;
      this._baseChartConfig = null;
      this.customLegendData = null;
    }

    setCustomLegendData(data) {
      this.customLegendData = data;
    }

    createBaseConfig() {

      const setStatic = this.setStatic;

      // only create it once
      if (this._baseChartConfig) {
        return this._baseChartConfig;
      }

      const config = merge({}, BASE_COLUMN_CHARTCONFIG);

      config.chart.renderTo = this._chart;

      // bind events to config
      config.chart.events = {
        load: function() {
        },
        render: function() {
          config.xAxis = plotNullDataLayerToAxis(this.xAxis, this.series, setStatic);

          setStatic({'customLegendData': createCartesianCustomLegendData(this.series)});

          // todo - extract
          // select nothing then..
          this.series.forEach(s => {
            s.data.filter((d,idx,arr) => {
              return idx === arr.length - 1;
            }).map(d => {
              d.setState('');
            });
          });

          // in 400ms "select" the last column
          this.series.forEach(s => {
            s.data.filter((d,idx,arr) => {
              return idx === arr.length - 1;
            }).map(d => {
              d.setState('hover');
            });
          });

        },
      };

      config.plotOptions.series.point.events = {
        mouseOver: function(e) {
          setStatic(createCartesianCustomLegendData(this.series.chart.series, this.index));

          // todo - extract
          this.series.chart.series.forEach(s => {
            s.data.filter((d,idx) => {
              return this.index === idx;
            }).map(d => {
              d.setState && d.setState('hover');
            });
          });
        },
        mouseOut: function() {
          // todo - extract
          this.series.chart.series.forEach(s => {
            s.data.map(d => {
              d.setState && d.setState('');
            });
          });
        }
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

      return instanceConfig;
    }

    _getHighcontrastPropsMap(config, condition) {
      return config.series.map(condition ? this._highcontrastOnSeriesIteratee : this._highcontrastOffSeriesIteratee);
    }

    render() {
      // console.log('withColumn render');

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

export default withColumn;

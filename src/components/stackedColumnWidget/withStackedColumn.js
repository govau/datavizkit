
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';

import {createHighcontrastFillColorsSetSeriesIteratee} from './../../utils/highcontrastPatterns';
import {
  createCartesianCustomLegendData,
  plotNullDataLayerToAxis
} from './../../utils/chartOptionsHelpers';



const BASE_STACKEDCOLUMN_CHARTCONFIG = {
  chart: {
    type: 'column',
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
    column: {
      stacking: null,
    },
    series: {
      animation: false,
      point: {
        events: {}
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
    // shared: true,
    enabled: false,
  },
  yAxis: {
    title: {
      text: null
    },
  }
};


const withStackedColumn = Composed => {
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
      // console.log('withStackedColumn componentDidMount');

      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      this.props.create(config);

      // map highcontrast to series
      if (this.props.displayHighContrast) {
        this.props.updateSeriesByProp(this._getHighcontrastPropsMap(config, this.props.displayHighContrast), 'color');
      }
    }

    // update
    componentWillUpdate(nextProps, nextState) {
      // console.log('withStackedColumn componentWillUpdate');

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
        this.props.updateSeriesByProp(this._getHighcontrastPropsMap(config, nextProps.displayHighContrast), 'color');
      }

      // update by type
      this.props.updateData(config, propNamesChanged);
    }

    // destroy
    componentWillUnmount() {
      // console.log('withStackedColumn componentWillUnmount');

      this.props.destroy();
      this._chart = null;
      this._baseChartConfig = null;
    }

    createBaseConfig() {

      const {stackingType} = this.props;

      // only create it once
      if (this._baseChartConfig) {
        return this._baseChartConfig;
      }


      const config = merge({}, BASE_STACKEDCOLUMN_CHARTCONFIG);

      const broadcastSetState = this.setState.bind(this);

      config.chart.renderTo = this._chart;


      // bind events to config
      config.chart.events = {
        // load: function() {
        // },
        render: function() {
          config.xAxis = plotNullDataLayerToAxis(this.xAxis, this.series, broadcastSetState);

          broadcastSetState({'customLegendData': createCartesianCustomLegendData(this.series)});

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


      config.plotOptions.column.stacking = stackingType || 'normal';

      config.plotOptions.series.point.events = {
        mouseOver: function(e) {
          broadcastSetState({'customLegendData': createCartesianCustomLegendData(this.series.chart.series, this.index)});

          // todo - extract
          this.series.chart.series.forEach(s => {
            s.data.filter((d,idx) => {
              return this.index === idx;
            }).map(d => {
              d.setState && d.setState('hover');
              return d;
            });
          });
        },
        mouseOut: function() {
          // todo - extract
          this.series.chart.series.forEach(s => {
            s.data.map(d => {
              d.setState && d.setState('');
              return d;
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
      // console.log('stackedColumn render');

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

export default withStackedColumn;

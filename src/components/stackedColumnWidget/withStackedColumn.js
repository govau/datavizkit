
import React from 'react';
import merge from 'lodash/merge';

import PureComponentWithStaticProps from './../../classes/pureComponentWithStaticProps';
import {makeHighcontrastPatterns} from './../../utils/highcontrastPatterns';
import {
  createCartesianCustomLegendData,
  mapNullDataLayerToX,
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
    enabled: false,
    shared: true,
    crosshairs: true,
  },
  yAxis: {
    title: {
      text: null
    },
  },
  xAxis: {
    crosshair: true,
  }
};


const withStackedColumn = Composed => {

  return class extends PureComponentWithStaticProps {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;

      this.colorset = props.series.map(s => s.color);
      this.patternIds = props.series.map((s,idx) => `hc-p-${props.cid}-${idx}`);
      this.hcColorset = this.patternIds.map((patternId) => `url(#${patternId})`);
      this.Patterns = makeHighcontrastPatterns(this.colorset, this.patternIds);
    }

    // create
    componentDidMount() {
      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props);

      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps, nextState) {
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
      this.static = null;
    }

    createBaseConfig() {

      const setStatic = this.setStatic;
      const {stackingType} = this.props;

      // only create it once
      if (this._baseChartConfig) {
        return this._baseChartConfig;
      }


      const config = merge({}, BASE_STACKEDCOLUMN_CHARTCONFIG);

      // config.colors  = this.colorset;
      config.chart.renderTo = this._chart;

      if (this.props.chartDescription) {
        config.chart.description = this.props.chartDescription;
      }

      // bind events to config
      config.chart.events = {
        render: function() {

          this.xAxis = mapNullDataLayerToX(this.xAxis, this.series, setStatic);

          setStatic({'customLegendData': createCartesianCustomLegendData(this.series)});

          // todo - extract
          // select nothing then..
          this.series.forEach(s => {
            s.data.filter((d,idx,arr) => {
              return idx === arr.length - 1;
            }).forEach(d => {
              d.setState('');
            });
          });

          // in 400ms "select" the last column
          this.series.forEach(s => {
            s.data.filter((d,idx,arr) => {
              return idx === arr.length - 1;
            }).forEach(d => {
              d.setState('hover');
            });
          });
        },
      };


      config.plotOptions.column.stacking = stackingType || 'normal';

      config.plotOptions.series.point.events = {
        mouseOver: function(e) {
          setStatic({'customLegendData': createCartesianCustomLegendData(this.series.chart.series, this.index)});

          // todo - extract
          this.series.chart.series.forEach(s => {
            s.data.filter((d,idx) => {
              return this.index === idx;
            }).forEach(d => {
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

      instanceConfig.series = series.map((s,idx) => { // todo - extract
        s.color = passedProps.displayHighContrast ? this.hcColorset[idx] : this.colorset[idx];
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

export default withStackedColumn;

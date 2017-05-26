
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';


const BASE_SPARKLINE_CHARTCONFIG = {
  chart: {
    type: 'spline',
    height: 140,
  },
  title: {
    text: ''
  },
  subtitle: {
    text: '',
  },
  yAxis: {
    visible: false,
    endOnTick: false,
    startOnTick: false,
  },
  xAxis: {
    visible: false,
  },
  plotOptions: {
    spline: {
      animation: false,
    },
    series: {
      lineWidth: 4,
      animation: false,
      stickyTracking: false,
      enableMouseTracking: false,
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: false,
          },
          select: {
            // enabled: false
          }
        }
      },
      states: {
        hover: {
          enabled: false,
        },
      },
      events: {

      }
    },
  },
  tooltip: {
    enabled: false
  },
};

const withSparkline = Composed => {
  return class extends PureComponent {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;
      this.state = {
        countValue: null,
        countUnits: null,
        trendLegendData: null,
      }
    }

    // create
    componentDidMount() {
      console.log('withSparkline componentDidMount');

      const config = this.makeInstanceConfig(this.createBaseConfig());

      console.log(config)

      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps, nextState) {
      console.log('withSparkline componentWillUpdate');

      const config = this.makeInstanceConfig(this._baseChartConfig);

      // diff nextProps, nextState - intersection or decide what I should pass to update

      let propNamesChanged = [];

      // todo check for change on chart as well

      if (JSON.stringify(nextProps.series) !== JSON.stringify(this.props.series)) {
        propNamesChanged = [...propNamesChanged, 'series'];
      }

      if (JSON.stringify(nextProps.xAxis) !== JSON.stringify(this.props.xAxis)) {
        propNamesChanged = [...propNamesChanged, 'xAxis'];
      }

      // update by type
      this.props.update(config, propNamesChanged);
    }

    // destroy
    componentWillUnmount() {
      console.log('withSparkline componentWillUnmount');

      this.props.destroy();
      this._chart = null;
      this._chartConfig = null;
    }


    createBaseConfig() {

      // only create it once
      if (this._chartConfig) {
        return this._chartConfig;
      }


      const config = merge({}, BASE_SPARKLINE_CHARTCONFIG);

      const broadcastSetState = this.setState.bind(this);

      config.chart.renderTo = this._chart;

      // bind events to config
      config.chart.events = {
        load: function() {
          console.log('sparkline load');
        },
        render: function() {
          console.log('sparkline render');
        },
        redraw: function() {
          console.log('sparkline redraw');
        }
      };

      this._baseChartConfig = config;

      return config;
    }

    makeInstanceConfig(config) {
      const {series, xAxis} = this.props;
      const instanceConfig = merge({}, config, {
        xAxis,
        series,
      });

      if (instanceConfig.yAxis && instanceConfig.yAxis.min) {
        delete instanceConfig.yAxis.min;
      }
      return instanceConfig;
    }

    render() {
      console.log('withSparkline render');

      const {countValue, countUnits, trendLegendData} = this.state;

      return (
        <div style={{border: '1px solid red', padding: '10px'}}>
          <h1>withSparkline</h1>
          <Composed {...this.props}
                    countValue={countValue} countUnits={countUnits} trendLegendData={trendLegendData}>
            <div ref={el => this._chart = el} />
          </Composed>
        </div>
      );
    }
  }
};

export default withSparkline;

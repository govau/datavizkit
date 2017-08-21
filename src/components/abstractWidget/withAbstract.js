
import React, {PureComponent} from 'react';
import merge from 'lodash/merge';


const BASE_ABSTRACT_CHARTCONFIG = {
  chart: {},
};

const withAbstract = Composed => {

  return class extends PureComponent {

    constructor(props) {
      super(props);
      this._chart = null;
      this._baseChartConfig = null;
    }

    // create
    componentDidMount() {
      // todo prop called customConfig

      const config = this.makeInstanceConfig(this.createBaseConfig(), this.props.config);
      // draw chart for first time
      this.props.create(config);
    }

    // update
    componentWillUpdate(nextProps) {
      if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
        const config = this.makeInstanceConfig(this._baseChartConfig, nextProps.config);
        // redraw
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
      // only create it once
      if (this._baseChartConfig) {
        return this._baseChartConfig;
      }

      const config = merge({}, BASE_ABSTRACT_CHARTCONFIG);

      config.chart.renderTo = this._chart;

      this._baseChartConfig = config;

      return config;
    }

    makeInstanceConfig(config, customConfig) {
      return merge({}, config, customConfig);
    }

    render() {
      return (
        <div>
          <Composed {...this.props}>
            <div ref={el => this._chart = el} />
          </Composed>
        </div>
      );
    }
  }

};

export default withAbstract;

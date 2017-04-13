
import React, {PureComponent} from 'react';

import Chart from './../../chart';
import {makeChartOptions} from './sparkline_dataHelpers';
import TrendLegend from './../../trendLegend';


/**
 * Renders a Line Widget with its surrounding state.
 */
class SparklineWidget extends PureComponent {
  constructor(props) {
    super(props);
    this.proxiedSetState = this.proxiedSetState.bind(this);
    this.chartInstance = null;
    this.state = {
      trendLegend: []
    };
  }

  proxiedSetState(state) {
    this.setState(state);
  }

  render() {
    const {trendLegend} = this.state;
    const {chartConfig, ...restProps} = this.props;

    const chartOptions = makeChartOptions({
      emitSetState: this.proxiedSetState,
      chartConfig,
      ...restProps
    });

    return (
      <article className="chart--sparkline" role="article">
        <section>
          <Chart ref={el => this.chartInstance = el} options={chartOptions} />
          <div>
            {trendLegend && trendLegend.length && <TrendLegend data={trendLegend} />}
          </div>
        </section>
      </article>
    )
  }

}

export default SparklineWidget;


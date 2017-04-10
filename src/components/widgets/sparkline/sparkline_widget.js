import React, {PureComponent} from 'react';
import Chart from './../../chart';
import {makeChartOptions} from './sparkline_dataHelpers';
import Legend from './../../customLegend';

/**
 * Renders a Line Widget with its surrounding state.
 */
class SparklineWidget extends PureComponent {
  constructor(props) {
    super(props);
    this.proxiedSetState = this.proxiedSetState.bind(this);
    this.chartInstance = null;
    this.state = {
      customLegend: []
    };
  }

  proxiedSetState(state) {
    this.setState(state);
  }

  render() {
    const {customLegend} = this.state;

    const chartOptions = makeChartOptions({
      emitSetState: this.proxiedSetState,
      widget: this.props.widget,
    });

    return (
      <article className={`chart--line`} role="article">
        <section>
          <Chart ref={el => this.chartInstance = el} options={chartOptions} />
          <div>
            {customLegend && customLegend.length && <Legend data={customLegend} />}
          </div>
        </section>
      </article>
    )
  }

}

export default SparklineWidget;


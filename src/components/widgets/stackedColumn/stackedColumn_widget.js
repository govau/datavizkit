
import React, {PureComponent} from 'react';

import Chart from './../../chart';
import {makeChartOptions} from './stackedColumn_dataHelpers';
import Legend from './../../customLegend';


/**
 * Renders a Stacked Column Widget with its surrounding state.
 */
class StackedColumnWidget extends PureComponent {
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
    const {chartConfig, ...restProps} = this.props;

    const chartOptions = makeChartOptions({
      emitSetState: this.proxiedSetState,
      chartConfig,
      ...restProps
    });

    return (
      <article className="chart--stackedColumn" role="article">
        <section>
          <Chart ref={el => this.chartInstance = el}
                 options={chartOptions}>
            <div>
              {customLegend && customLegend.length && <Legend data={customLegend} />}
            </div>
          </Chart>
        </section>
      </article>
    )
  }
}

export default StackedColumnWidget;



/*

 todo

 * can have a pattern for high contrast mode
 * guard against sectors that are too small. if i have more than said number of items, combine smallest ones in to an "Other" sector - enforce by a data transformation step
 * can display units
 * styled like dashboards
 *
 * Guard againt * A pie can only only have a single series of data
 *
 * Provide values to chart, chart will convert to percentages

 */


import React, {PureComponent} from 'react';

import Chart from './../../chart';
import {makeChartOptions} from './donut_dataHelpers';

import Legend from './../../customLegend';


/**
 * Renders a Donut Widget with it's surrounding state.
 *
 * Technically multiple series of data can be plotted on polar
 * charts, but this widget should only accept a single series of
 * data.
 *
 */
class DonutWidget extends PureComponent {

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
      <article className={`chart--pie`} role="article">
        <section>
          <Chart ref={el => this.chartInstance = el} options={chartOptions}>
            <div>
              {customLegend && customLegend.length && <Legend data={customLegend} />}
            </div>
          </Chart>
        </section>
      </article>
    )
  }
}

export default DonutWidget;


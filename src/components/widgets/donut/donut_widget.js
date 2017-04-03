

/*

 todo

 * can have a pattern for high contrast mode
 * guard against sectors that are too small. if i have more than said number of items, combine smallest ones in to an "Other" sector - enforce by a data transformation step
 * can display units
 * styled like dashboards

 */


import React, {PureComponent} from 'react';

import Chart from './../../chart';
import {makeChartOptions} from './donut_dataHelpers';


/**
 * Renders a Donut Widget with it's surrounding state.
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
              {customLegend && customLegend.length && <div>
                {customLegend.map(series => {
                  return series.map((d, dIdx) => {
                    return <div key={dIdx}>{d.color} {d.key} {d.y}</div>
                  });
                })}
              </div>}
            </div>
          </Chart>
        </section>
      </article>
    )
  }
}

export default DonutWidget;


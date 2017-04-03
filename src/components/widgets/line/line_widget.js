

/*

 todo

 * can have a pattern for high contrast mode
 * styled like dashboards

 */

import React, {PureComponent} from 'react';

import Chart from './../../chart';
import {makeChartOptions} from './line_dataHelpers';


/**
 * Renders a Line Widget with it's surrounding state.
 *
 */
class LineWidget extends PureComponent {

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
            {customLegend && customLegend.length && <div>
              {customLegend.map((d, idx) => {
                return <div key={idx}>{d.color} {d.key} {d.y}</div>
              })}
            </div>}
          </div>
        </section>
      </article>
    )
  }

}

export default LineWidget;




/*

 todo

 * can have a pattern for high contrast mode
 * styled like dashboards

 */

import React, {PureComponent} from 'react';
import last from 'lodash/last';

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
    const {widget: {title, dateUpdated}} = this.props;
    const {customLegend} = this.state;
    const datetimeUpdate = new Date(dateUpdated).toJSON();

    const chartOptions = makeChartOptions({
      emitSetState: this.proxiedSetState
    });

    return (
      <article className={`chart--line`} role="article">
        <header>
          <h1>{title}</h1>
          <span>Last updated <time dateTime={datetimeUpdate}>{dateUpdated}</time></span>
        </header>
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


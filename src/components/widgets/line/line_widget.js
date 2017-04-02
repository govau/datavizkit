

/*

 todo

 * legend updates on mouseover
 * has a vertical ruler and highlights points on mouseover
 * can have a pattern for high contrast mode


 */

import React, {PureComponent} from 'react';
import last from 'lodash/last';
import Emitter from 'tiny-emitter';

import Chart from './../../chart';
import {makeChartOptions} from './line_dataHelpers';


const emitter = new Emitter();

/**
 * Renders a Line Widget with it's surrounding state.
 *
 */
class LineWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.chartInstance = null;

    emitter.on('set:state', this.manualSetState.bind(this, arguments));

    this.state = {
      fauxLegend: []
    };
  }

  onRenderChart() {
    // scoped to chart
    const fauxLegend = this.series.map(s => {
      const latestPointInSeries = last(s.data);
      return {
        seriesName: s.name,
        color: latestPointInSeries.color,
        key: s.name,
        value: latestPointInSeries.y
      }
    });
    emitter.emit('set:state', {'fauxLegend': fauxLegend});
  }

  onPointUpdate() {
    // todo - need to update whole slice not only the point
    emitter.emit('set:state', {'fauxLegend': {
      seriesName: this.series.name,
      color: this.color,
      // key: s.name,
      key: this.category,
      value: this.y
    }});
  }

  manualSetState(self, stateToSet) {
    // todo  set on next tick
    this.setState(stateToSet);
  }

  render() {
    const {widget: {title, dateUpdated}} = this.props;
    const {fauxLegend} = this.state;
    const datetimeUpdate = new Date(dateUpdated).toJSON();

    // todo - improve this for update
    const chartOptions = makeChartOptions({
      onRender: this.onRenderChart,
      onPointUpdate: this.onPointUpdate
    });

    return (
      <article className={`chart--line`} role="article">
        <header>
          <h1>{title}</h1>
          <span>Last updated <time dateTime={datetimeUpdate}>{dateUpdated}</time></span>
          {/*<span>What is this?</span>*/}
        </header>
        <section>
          <Chart ref={el => this.chartInstance = el} options={chartOptions} />
          {fauxLegend.length && <div className="legend">
            <table>
              <tbody>
              {fauxLegend.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <svg width="12" height="12">
                      <g className="legend--icon">
                        {item.color && <rect x="0" y="0" width="12" height="12" fill={item.color} visibility="visible" rx="6" ry="6"></rect>}
                      </g>
                    </svg>
                    <span className="legend--data-name">{item.key}</span>
                  </td>
                  <td>{item.value}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>}
        </section>
      </article>
    )
  }

}

export default LineWidget;


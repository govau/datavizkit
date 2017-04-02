
/*

 todo

 * can have a null data layer
 * can have a pattern for high contrast mode
 * can include units yAxis: {
 format: '${value}'
 },
 * can support column groups - like line chart
 * styled like dashboards

 */


import React, {PureComponent} from 'react';
import Emitter from 'tiny-emitter';
import last from 'lodash/last';

import Chart from './../../chart';
import {makeChartOptions} from './column_dataHelpers';


const emitter = new Emitter();

/**
 * Renders a Column Widget with it's surrounding state.
 *
 */
class ColumnWidget extends PureComponent {

  constructor(props) {
    super(props);

    emitter.on('set:state', this.manualSetState.bind(this, arguments));

    this.state = {
      fauxLegend: []
    };
  }

  manualSetState(self, stateToSet) {
    // todo  set on next tick
    this.setState(stateToSet);
  }

  onRenderChart() {
    // scoped to chart
    const fauxLegend = this.series.map(s => {
      const latestPointInSeries = last(s.data);
      return {
        category: latestPointInSeries.category,
        color: latestPointInSeries.color,
        key: s.name,
        value: latestPointInSeries.y,
      }
    });
    emitter.emit('set:state', {'fauxLegend': fauxLegend});
  }

  onRenderChartCallback() {
    // scoped to instance

    // "hover" over the last column
    const lastIdx = this.series[0].data.length - 1;
    this.series[0].data[lastIdx].onMouseOver();

    console.log(this);

    this.renderer.rect(100, 100, 100, 100, 5)
      .attr({
        'stroke-width': 2,
        stroke: 'red',
        fill: 'yellow',
        zIndex: 3
      })
      .add();
  }

  onPointMouseOver() {
    // scoped to point
    const index = this.index;
    const fauxLegend = this.series.chart.series.map(s => {
      const pointInContext = s.data[index];
      return {
        category: pointInContext.category,
        color: pointInContext.color,
        key: s.name,
        value: pointInContext.y
      }
    });
    emitter.emit('set:state', {'fauxLegend': fauxLegend});
  }

  render() {
    const {widget: {title, dateUpdated}} = this.props;
    const {fauxLegend} = this.state;
    const datetimeUpdate = new Date(dateUpdated).toJSON();

    // todo - improve this for update
    const chartOptions = makeChartOptions({
      onRender: this.onRenderChart,
      onPointMouseOver: this.onPointMouseOver
    });

    return (
      <article className={`chart--column`} role="article">
        <header>
          <h1>{title}</h1>
          <span>Last updated <time dateTime={datetimeUpdate}>{dateUpdated}</time></span>
          {/*<span>What is this?</span>*/}
        </header>
        <section>
          {fauxLegend.length && <p>{fauxLegend[0].category}</p>}
          <Chart options={chartOptions}
                 callback={this.onRenderChartCallback} />
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

export default ColumnWidget;


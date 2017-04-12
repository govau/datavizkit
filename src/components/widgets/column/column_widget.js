
/*

 todo

 * can have a pattern for high contrast mode
 * can have a pattern for null data layer - http://www.highcharts.com/plugin-registry/single/9/Pattern-Fill
 *
 * include units - use legend.labelFormatter etc
 * can include units yAxis: {
 format: '${value}'
 },
 http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-pointplacement-numeric/
 * styled like dashboards

 * can support column groups - like line chart

 */


import React, {PureComponent} from 'react';

import Chart from './../../chart';
import {makeChartOptions} from './column_dataHelpers';

import Legend from './../../customLegend';


/**
 * Renders a Column Widget with it's surrounding state.
 *
 */
class ColumnWidget extends PureComponent {

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
      widget: this.props.widget
    });

    return (
      <article className={`chart--column`} role="article">
        <section>
          <Chart ref={el => this.chartInstance = el}
                 options={chartOptions}
                 callback={this.chartCallback}>
            <div>
              {customLegend && customLegend.length && <Legend data={customLegend} />}
            </div>
          </Chart>
        </section>
      </article>
    )
  }
}

export default ColumnWidget;


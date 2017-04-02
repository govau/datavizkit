
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
import last from 'lodash/last';

import Chart from './../../chart';
import {makeChartOptions} from './column_dataHelpers';


/**
 * Renders a Column Widget with it's surrounding state.
 *
 */
class ColumnWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.chartInstance = null;
  }

  chartCallback() {
    // scoped to instance

    // "hover" over the last column
    const lastCol = last(this.series[0].data);
    if (lastCol) {
      lastCol.onMouseOver && lastCol.onMouseOver();
    }
  }

  render() {
    const {widget: {title, dateUpdated}} = this.props;
    const datetimeUpdate = new Date(dateUpdated).toJSON();

    const chartOptions = makeChartOptions({});

    return (
      <article className={`chart--column`} role="article">
        <header>
          <h1>{title}</h1>
          <span>Last updated <time dateTime={datetimeUpdate}>{dateUpdated}</time></span>
        </header>
        <section>
          <Chart ref={el => this.chartInstance = el}
                 options={chartOptions}
                 callback={this.chartCallback}
                 hasCustomLegend={true} />
        </section>
      </article>
    )
  }
}

export default ColumnWidget;


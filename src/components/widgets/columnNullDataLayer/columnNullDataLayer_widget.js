
/*

 todo

 * null data layer pattern - http://www.highcharts.com/plugin-registry/single/9/Pattern-Fill

 */


import React, {PureComponent} from 'react';

import Chart from './../../chart';
import {makeChartOptions} from './columnNullDataLayer_dataHelpers';



/**
 * Renders a Column Null Data Layer Widget with it's surrounding state.
 *
 */
class ColumnNullDataLayerWidget extends PureComponent {
  render() {
    const chartOptions = makeChartOptions({});
    return (
      <article className={`chart--columnNullData`} role="article">
        <section>
          <Chart options={chartOptions} />
        </section>
      </article>
    )
  }
}

export default ColumnNullDataLayerWidget;


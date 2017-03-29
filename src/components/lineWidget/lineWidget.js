
/*

 todo

 * can have a pattern for high contrast mode
 * has a vertical ruler and highlights points on mouseover
 * legend updates on mouseover


 */


import React, {PureComponent, PropTypes} from 'react';

import {BASE_CHART_OPTIONS, withChart} from './../../hocs/withHighcharts';


class LineWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;

    const chartOptions = {
      ...BASE_CHART_OPTIONS,
      chart: {
        type: 'line'
      },
      plotOptions: {
        line: {
          animation: false,
          allowPointSelect: true,
          stickyTracking: true
        }
      },

      // instance props
      series: [{
        name: 'Installation',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
      }, {
        name: 'Manufacturing',
        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
      }, {
        name: 'Sales & Distribution',
        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
      }, {
        name: 'Project Development',
        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
      }, {
        name: 'Other',
        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
      }]
    };

    this.state = {
      chartOptions
    };
  }

  componentDidMount() {
    if (this.el === null) {
      throw new Error('Must provide a container element');
    }
    const _options = this.state.chartOptions;
    _options.chart.renderTo = this.el;
    this.instance = this.props.create(_options);
  }

  render() {
    const {widget: {title, dateUpdated}} = this.props;
    const datetimeUpdate = new Date(dateUpdated).toJSON();

    const chartType = this.state.chartOptions.chart.type;


    return (
      <article className={`chart--${chartType}`} role="article">
        <header>
          <h1>{title}</h1>
          <span>Last updated <time dateTime={datetimeUpdate}>{dateUpdated}</time></span>
          <span>What is this?</span>
        </header>
        <section>
          <div ref={el => this.el = el} />
        </section>
      </article>
    );
  }

}

export default withChart(LineWidget);


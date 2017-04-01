
/*

 todo

 * legend updates on mouseover
 * has a vertical ruler and highlights points on mouseover
 * can have a pattern for high contrast mode


 */


import React, {PureComponent, PropTypes} from 'react';
import Emitter from 'tiny-emitter';
import last from 'lodash/last';

import {BASE_CHART_OPTIONS, withChart} from './../../hocs/withHighcharts';


const emitter = new Emitter();

class LineWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;

    emitter.on('set:state', this.manualSetState.bind(this, arguments));


    const chartOptions = {
      ...BASE_CHART_OPTIONS,
      chart: {
        type: 'line',
        events: {   // todo - abstract
          render: function(e, target, type) {
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
        },
      },
      plotOptions: {
        line: {
          animation: false,
          allowPointSelect: true,
          stickyTracking: true
        },
        series: {
          animation: false,
          point: {
            events: {
              mouseOver: this.onPointUpdate,
            }
          },
          states: {
            select: { // required because can be selected programatically
              enabled: false
            }
          },
          allowPointSelect: false,
        },
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
      chartOptions,
      fauxLegend: [],
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

  // this has the scope of point
  onPointUpdate(e) {
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

    const chartType = this.state.chartOptions.chart.type;

    return (
      <article className={`chart--${chartType}`} role="article">
        <header>
          <h1>{title}</h1>
          <span>Last updated <time dateTime={datetimeUpdate}>{dateUpdated}</time></span>
          {/*<span>What is this?</span>*/}
        </header>
        <section>
          <div ref={el => this.el = el} />
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
    );
  }

}

export default withChart(LineWidget);


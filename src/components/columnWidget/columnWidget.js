/*

 todo

 * can have a null data layer
 * can have a pattern for high contrast mode


 */


import React, {PureComponent, PropTypes} from 'react';
import Emitter from 'tiny-emitter';
import last from 'lodash/last';

import {BASE_CHART_OPTIONS, withChart} from './../../hocs/withHighcharts';


const emitter = new Emitter();

class ColumnWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;

    emitter.on('set:state', this.manualSetState.bind(this, arguments));


    const chartOptions = {
      ...BASE_CHART_OPTIONS,
      chart: {
        type: 'column',
        events: {   // todo - abstract
          render: function(e, target, type) {
            const fauxLegend = this.series.map(s => {
              const latestPointInSeries = last(s.data);
              return {
                color: latestPointInSeries.color,
                key: s.name,
                value: latestPointInSeries.y
              }
            });
            emitter.emit('set:state', {'fauxLegend': fauxLegend});
          }
        },
      },
      yAxis: {
        title: {
          text: null
        }
      },
      plotOptions: {
        series: {
          animation: false,
          point: {
            events: {
              mouseOver: this.onPointUpdate,
            }
          },
          states: {
            hover: {
              color: 'yellow',
            },
            select: { // required because it can be selected programatically
              enabled: false
            }
          },
          allowPointSelect: false
        },
      },

      // instance props
      xAxis: {
        categories: ["Jan 2017","Feb 2017","Mar 2017","Apr 2017","May 2017","Jun 2017","Jul 2017","Aug 2017","Sep 2017","Oct 2017","Nov 2017","Dec 2017"]
      },
      series: [
        {
          "name": "Desktop",
          "data": [29.9, 71.5, 106.4, 129.2, 144, 176, 135, 148.5, 216.4, 194.1, 95.6, 54.4]
        }
      ],
    };

    this.state = {
      chartOptions,
      fauxLegend: [],
    };
  }

  // this has the scope of point
  onPointUpdate(e) {
    emitter.emit('set:state', {
      'fauxLegend':[
        {
          seriesName: this.series.name,
          color: this.color,
          // key: s.name,
          key: this.category,
          value: this.y
        }
      ]
    });
  }


  manualSetState(self, stateToSet) {
    // todo  set on next tick
    this.setState(stateToSet);
  }

  componentDidMount() {
    if (this.el === null) {
      throw new Error('Must provide a container element');
    }
    const _options = this.state.chartOptions;
    _options.chart.renderTo = this.el;
    this.instance = this.props.create(_options);

    // "hover" over the last column
    const lastIdx = this.instance.series[0].data.length - 1;
    this.instance.series[0].data[lastIdx].onMouseOver();
  }

  // todo
  // componentWillUpdate(nextProps, nextState) {
  //   this.props.update(nextState.chartOptions);
  // }

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
          <span>What is this?</span>
        </header>
        <section>
          {fauxLegend.map((item, idx) => (
            <div key={idx}><time>{item.key}</time></div>
          ))}
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
                    <span className="legend--data-name">{item.seriesName}</span>
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

ColumnWidget.propTypes = {};

ColumnWidget = withChart(ColumnWidget);

export default ColumnWidget;



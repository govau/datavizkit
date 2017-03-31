
/*

 todo

 * can have a pattern for high contrast mode
 * if i have more than said number of items, combine smallest ones in to an "Other" sector


 */


import React, {PureComponent, PropTypes} from 'react';
import Emitter from 'tiny-emitter';

import {BASE_CHART_OPTIONS, withChart} from './../../hocs/withHighcharts';


const emitter = new Emitter();

class DonutWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;

    emitter.on('set:state', this.manualSetState.bind(this, arguments));


    const chartOptions = {
      ...BASE_CHART_OPTIONS,
      chart: {
        type: 'pie',
        events: {   // todo - abstract
          render: function(e, target, type) {
            const decoratedData = this.series[0].data;  // pie only has 1 slice
            const fauxLegend = decoratedData.map(d => {
              return {
                color: d.color,
                key: d.name,
                value: d.y
              }
            });
            emitter.emit('set:state', {'fauxLegend': fauxLegend});
          }
        },
      },
      plotOptions: {
        pie: {
          animation: false,
          dataLabels: {
            enabled: false
          },
          showInLegend: true,
          stickyTracking: true,
          states: {
            hover: {
              halo: {
                size: 0
              }
            },
            select: { // required because can be selected programatically
              enabled: false
            }
          }
        },
      },

      // instance props
      series: [{
        name: 'Brands',
        colorByPoint: true,
        innerSize: '50%',
        data: [{
          name: 'Microsoft Internet Explorer',
          y: 56.33
        }, {
          name: 'Chrome',
          y: 24.03,
        }, {
          name: 'Firefox',
          y: 10.38
        }, {
          name: 'Safari',
          y: 4.77
        }, {
          name: 'Opera',
          y: 0.91
        }, {
          name: 'Proprietary or Undetectable',
          y: 0.2
        }]
      }],
    };

    this.state = {
      chartOptions,
      fauxLegend: []
    };
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

export default withChart(DonutWidget);


/*

 todo

 * can have a null data layer
 * can have a pattern for high contrast mode


 */


import React, {PureComponent, PropTypes} from 'react';
import Emitter from 'tiny-emitter';

import {BASE_CHART_OPTIONS, withChart} from './../../hocs/withHighcharts';


const emitter = new Emitter();

class ColumnWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;

    emitter.on('receive_onPointUpdate', this.receiveOnPointUpdate.bind(this));


    const chartOptions = {
      ...BASE_CHART_OPTIONS,
      chart: {
        type: 'column'
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
            select: { // required because can be selected programatically
              enabled: false
            }
          },
          allowPointSelect: false,
          stickyTracking: true
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
      legend: [
        {
          seriesName: "Desktop",
          label: "Dec 2017",
          value: 54.4
        }
      ]
    };
  }

  // this has the scope of point
  onPointUpdate(e) {
    emitter.emit('receive_onPointUpdate', {
      seriesName: this.series.name,
      label: this.category,
      value: this.y,
    });
  }

  // this has the scope of class
  receiveOnPointUpdate(options, cb) {
    const {label, value, seriesName} = options;
    const nextlegend = this.state.legend.map(f => {
      if (f.seriesName === seriesName) {
        f.label = label;
        f.value = value;
      }
      return f;
    });
    this.setState({legend: nextlegend});
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
    const {legend} = this.state;
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
          {legend.length && <div><time>{legend[0].label}</time></div>}
          <div ref={el => this.el = el} />
          {legend.length && <div className="legend">
            <table>
              <tbody>
                {legend.map((item, idx) => (
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



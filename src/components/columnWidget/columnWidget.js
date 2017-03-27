
import React, {PureComponent, PropTypes} from 'react';
import last from 'lodash/last';
import Emitter from 'tiny-emitter';

import {withChart} from './../../hocs/withHighcharts';


const emitter = new Emitter();

class ColumnWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;

    emitter.on('receive_onPointUpdate', this.receiveOnPointUpdate.bind(this));

    const {widget} = props;

    const chartOptions = {
      xAxis: {
        categories: widget.series.map(s => s.data)[0].map(item => item.description)
      },
      series:  widget.series.map(s => {
        return {
          name: s.name,
          label: s.data.map(item => item.description),
          data: s.data.map(item => item.value)
        }
      }),
      title: {
        text: null
      },
      chart: {
        marginBottom: 100,
        type: 'column'
      },
      plotOptions: {
        series: {
          animation: false,
          point: {
            events: {
              mouseOver: this.onPointUpdate
            }
          },
          // allowPointSelect: true,
          states: {
            hover: {
              color: null,
              borderWidth:5,
              borderColor:'Blue'
            }
          }
        },
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: false,
        // followTouchMove: true
      }
    };

    const restOptions = {
      fauxLegend: widget.series.map(s => {
        const item = last(s.data);
        return {
          seriesName: s.name,
          label: item.description,
          value: item.value
        }
      })
    };

    this.state = {
      chartOptions,
      ...restOptions
    };
  }


  // this is the scope of point
  onPointUpdate(e) {
    // console.log(this.category, this.y, this.series.name);

    this.select();
    emitter.emit('receive_onPointUpdate', {
      seriesName: this.series.name,
      label: this.category,
      value: this.y,
    });
  }

  receiveOnPointUpdate(options, cb) {
    // console.log(label, value, seriesName);

    const {label, value, seriesName} = options;
    const nextFauxLegend = this.state.fauxLegend.map(f => {
      if (f.seriesName === seriesName) {
        f.label = label;
        f.value = value;
      }
      return f;
    });
    this.setState({fauxLegend: nextFauxLegend});
  }

  componentDidMount() {
    if (this.el === null) {
      throw new Error('must provide a container element');
    }
    const _options = this.state.chartOptions;
    _options.chart.renderTo = this.el;
    this.instance = this.props.create(_options);

    // select the last column
    const lastIdx = this.instance.series[0].data.length - 1;
    this.instance.series[0].data[lastIdx].select();
  }

  // todo
  // componentWillUpdate(nextProps, nextState) {
  //   this.props.update(nextState.chartOptions);
  // }

  render() {
    const chartType = this.state.chartOptions.chart.type;
    const dateUpdated = this.props.widget.dateUpdated;
    const datetimeUpdate = new Date(dateUpdated).toJSON();
    const title = this.props.widget.title;
    const {fauxLegend} = this.state;

    console.log(...fauxLegend)

    return (
      <article className={`chart--${chartType}`} role="article">
        <header>
          <h1>{title}</h1>
          <span>Last updated <time dateTime={datetimeUpdate}>{dateUpdated}</time></span>
          <span>What is this?</span>
        </header>
        <section>
          {fauxLegend.length && <div><time>{fauxLegend[0].label}</time></div>}
          <div ref={el => this.el = el} />
          {fauxLegend.length && <div className="legend">
            <table>
              <tbody>
                {fauxLegend.map((legend, idx) => (
                  <tr key={idx}>
                    <th>
                      <svg width="12" height="12">
                        <g className="legend--icon">
                          {legend.color && <rect x="0" y="0" width="12" height="12" fill={legend.color} visibility="visible" rx="6" ry="6"></rect>}
                        </g>
                      </svg>
                      <span className="legend--data-name">{legend.seriesName}</span>
                    </th>
                    <td>{legend.value}</td>
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

ColumnWidget.propTypes = {
  // a column chart must have time-series data
};

export default withChart(ColumnWidget);



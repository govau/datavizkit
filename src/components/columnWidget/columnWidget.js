
import React, {PureComponent, PropTypes} from 'react';
import last from 'lodash/last';
import Emitter from 'tiny-emitter';

import {withChart} from './../../hocs/withHighcharts';


const emitter = new Emitter();

class ColumnWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;

    emitter.on('receive_onPointMouseOver', this.receiveOnPointMouseOver.bind(this));

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
              mouseOver: this.onPointMouseOver
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
        followTouchMove: true
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
  onPointMouseOver(e) {
    // console.log(this.category, this.y, this.series.name);
    emitter.emit('receive_onPointMouseOver', {
      seriesName: this.series.name,
      label: this.category,
      value: this.y,
      color: this.color
    });
  }

  receiveOnPointMouseOver(options, cb) {
    const {label, value, seriesName, color} = options;
    // console.log(label, value, seriesName);

    const nextFauxLegend = this.state.fauxLegend.map(f => {
      if (f.seriesName === seriesName) {
        f.label = label;
        f.value = value;
        f.color = color;
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
    this.props.create(_options);
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

    return (
      <article className={`chart--${chartType}`} role="article">
        <header>
          <h1>{title}</h1>
          <span>Last updated <time dateTime={datetimeUpdate}>{dateUpdated}</time></span>
          <span>What is this?</span>
        </header>
        <section>
          <div><time>{fauxLegend[0].label}</time></div>
          <div ref={el => this.el = el} />
          <div>
            {fauxLegend.map((legend, idx) => (
              <div key={idx}><dt>{legend.color && <span>{legend.color}</span>} {legend.seriesName}</dt><dd>{legend.value}</dd></div>
            ))}
          </div>
        </section>
      </article>
    );
  }

}

ColumnWidget.propTypes = {
  // a column chart must have time-series data
};

export default withChart(ColumnWidget);



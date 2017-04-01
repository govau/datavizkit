
/*

 todo

 * can be optionally 100% height
 * can have a pattern for high contrast mode
 * legend updates on mouseover


 */

import React, {PureComponent, PropTypes} from 'react';
import Emitter from 'tiny-emitter';

import {BASE_CHART_OPTIONS, withChart} from './../../hocs/withHighcharts';


const emitter = new Emitter();

class StackedColumnWidget extends PureComponent {

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
          stacking: 'normal',
          animation: false,
          point: {
            events: {
              mouseOver: this.onPointUpdate,
            }
          },
          states: {
            // hover: {
            //   color: 'yellow',
            // },
            select: { // required because can be selected programatically
              enabled: false
            }
          },
          allowPointSelect: false,
        },
      },

      // instance props
      xAxis: {
        categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas'],
      },
      series: [
        {
          name: 'John',
          data: [5, 3, 4, 7, 2]
        }, {
          name: 'Jane',
          data: [2, 2, 3, 2, 1]
        }, {
          name: 'Joe',
          data: [3, 4, 4, 2, 5]
        }
      ],
    };

    this.state = {
      chartOptions,
      fauxLegend: [
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

StackedColumnWidget.propTypes = {
};

export default withChart(StackedColumnWidget);



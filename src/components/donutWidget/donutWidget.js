
import React, {PureComponent, PropTypes} from 'react';

import {withChart} from './../../hocs/withHighcharts';


class DonutWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;

    const chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: null
      },
      plotOptions: {
        pie: {
          animation: false,
          allowPointSelect: true,
          dataLabels: {
            enabled: false
          },
        }
      },
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
      // plotOptions: {
      //   series: {
      //     animation: false,
      //     states: {
      //       hover: {
      //         color: 'yellow',
      //       },
      //       select: { // required because can be selected programatically
      //         enabled: false
      //       }
      //     },
      //     allowPointSelect: false,
      //   },
      // },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false
      },
      tooltip: {
        enabled: false,
      }
    };

    console.log(chartOptions)

    const restOptions = {};

    this.state = {
      chartOptions,
      ...restOptions
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

export default withChart(DonutWidget);


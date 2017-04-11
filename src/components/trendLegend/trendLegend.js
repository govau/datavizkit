import React, {PureComponent} from 'react';

class TrendLegend extends PureComponent {
  render() {
    const trend = this.getTrend();
    const volume = this.getVolume();
    const date = this.getPreviousDate();

    return (
      <div className='trend-legend'>
        <span class='metric-trend fa fa-arrow-${trend}'></span>
        <span class='summary-text'>{trend} {volume} since {date}</span>
      </div>
    )
  }

  getPreviousDate() {
    return this.props.previousDate;
  }

  getVolume() {
    let diff = this.getDifference();

    switch(diff) {
    case 0:
      return '';
    default:
      return Math.abs(diff);
    }
  }

  getTrend() {
    let diff = this.getDifference();
    
    switch(true) {
    case diff > 0:
      return 'up';
    case diff < 0:
      return 'down';
    default:
      return 'unchanged';
    }
  }

  getDifference() {
    let data = this.getData();
    let lastVal = data[data.length - 1].y
    let previousVal = data[data.length -2].y
    return lastVal - previousVal
  }

  getData() {
    return this.props.data;
  }
}

export default TrendLegend;


/*const TrendLegend = (props) => {
  const {data, className} = props;
  return (
    <div className={className}>
      <span class='metric-trend fa fa-arrow-${data.trend}'></span>
      <span class='summary-text'>${data.trend} ${data.volume} since ${data.previousDate}</span>
    </div>
  )
};*/
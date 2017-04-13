import React, {PureComponent} from 'react';
import styled from 'styled-components';

const TrendLegendDiv = styled.div`
  width: 100%;
  text-align:center;
`

class TrendLegend extends PureComponent {
  render() {
    const trend = this.getTrend();
    const volume = this.getVolume();
    const date = this.getPreviousDate();

    //TODO avoid fontawesome dependency; maybe inject somehow?
    const iconClass = `metric-trend fa fa-arrow-${trend}` 

    return (
      <TrendLegendDiv>
        <span className={iconClass}></span>
        <span className='summary-text'>{trend} {volume} since {date}</span>
      </TrendLegendDiv>
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

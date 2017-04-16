
// TODO remove the implicit fontawesome dependency


import React from 'react';
import styled from 'styled-components';


const getPreviousDate = (data) => {
  const secondLastDatum = data[data.length - 2];

  if (secondLastDatum && secondLastDatum.category) {
    return secondLastDatum.category;
  }
  return null;
};

const getVolume = (diff) => {
  switch(diff) {
    case 0:
      return '';
    default:
      return Math.abs(diff);
  }
};

const getTrend = (diff) => {
  switch(true) {
    case diff > 0:
      return 'up';
    case diff < 0:
      return 'down';
    default:
      return 'unchanged';
  }
};

const getDifference = (data) => {
  const lastVal = data[data.length - 1].y;
  const previousVal = data[data.length -2].y;
  return lastVal - previousVal;
};


const TrendLegend = ({data}) => {
  const difference = getDifference(data);
  const date = getPreviousDate(data);
  const trend = getTrend(difference);
  const volume = getVolume(difference);
  return (
    <div className="trend-legend">
      <i className={`metric-trend fa fa-arrow-${trend}`}></i>
      {date && <span className='summary-text'>{trend} {volume} since {date}</span>}
    </div>
  )
};

const StyledTrendLegend = styled(TrendLegend)`
  .trend-legend {
    width: 100%;
    text-align:center;
  }
`;

export default StyledTrendLegend;

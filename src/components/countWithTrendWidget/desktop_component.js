
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import Tooltip from './../tooltip';
import {CountValue, TrendValue} from './countWithTrendWidget';
import {dateFormats} from './../../utils/displayFormats';


/**
 * Desktop adaption of Count with Trend Widget.
 *
 */
const CountWithTrendWidget = (props) => {
  const {
    widget: {title, infoText, units},
    value,
    trendValue,
    trendDate,
  } = props;

  return (
    <StyledCount className={`chart--count`} role="article">
      <StyledHeader className={classnames({
        'yellow': title.toLowerCase() === 'user satisfaction',
        'green': title.toLowerCase() === 'cost per transaction',
        'blue': title.toLowerCase() === 'digital take-up',
        'purple': title.toLowerCase() === 'completion rate',
      })}>
        <h1>{title} {infoText && <Tooltip text={infoText} />}</h1>
      </StyledHeader>
      <section>
        <StyledCountContainer>
          <CountValue value={value} units={units} />
        </StyledCountContainer>
        {value && <StyledTrendContainer>
          <TrendValue value={trendValue} />
          <span className="trend-date">since {dateFormats.monthYear(trendDate)}</span>
        </StyledTrendContainer>}
      </section>
    </StyledCount>
  )
};

const StyledCount = styled.article`
  text-align: center;
`;

const StyledHeader = styled.header`
  &:after {
    content: ' ';
    display: block;
    background: #ccc;
    border-radius: 4px;
    height: 8px;
  }
  
  &.blue {
    &:after {
      background: #4892c0;
    }
  }
  &.green {
    &:after {
      background: #75a370;
    }
  }
  &.yellow {
    &:after {
      background: #f2b038;
    }
  }
  &.purple {
    &:after {
      background: #7066a5;
    }
  }
  h1 {
  	font-size: 20px;
  	font-weight: 600;
	  line-height: 1;
	  margin-bottom: 1rem;
	  color: #000000;
  }
`;

const StyledCountContainer = styled.div`
  border-bottom: 2px solid #cccccc;
  min-height: 130px;
  display: table;
  width: 100%;
  
  .count-value {
    display:table-cell;
    vertical-align: middle;
    font-size: 70px;
    font-weight: 300;
    opacity: 0.9;
    
    &.no-data {
      font-size: 40px;
    }
  }
  .count-units {
    font-size: 32px;
    font-weight: 600;
    vertical-align: middle;
    margin-left: 4px;
  }
`;

const StyledTrendContainer = styled.div`
  padding: 1em 2px;

  .trend-value,
  .trend-date {
    display: block;
  }

  .trend-value {
    .fa {
      color: #0075cd;
    }
  }
  .trend-date {
  }
`;

export default CountWithTrendWidget;

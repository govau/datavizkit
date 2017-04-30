
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import {CountValue, TrendValue} from './countWithTrendWidget';


/**
 * Mobile adaption of Count with Trend Widget.
 *
 */
const CountWithTrendWidget = (props) => {
  const {
    widget: {title, units},
    value,
    trendValue,
    trendDate,
  } = props;

  return (
    <Article_StyledCount role="article">
      <Div_BorderBottomContainer className={classnames({
        'yellow': title.toLowerCase() === 'user satisfaction',
        'green': title.toLowerCase() === 'cost per transaction',
        'blue': title.toLowerCase() === 'digital take-up',
        'purple': title.toLowerCase() === 'completion rate',
      })}>

        <Div_StyledLayoutContainer>

          <div>
            <h1>{title}</h1>
            <Span_styledTrend>
              <TrendValue value={trendValue} />
              <span className="trend-date">{trendDate}</span>
            </Span_styledTrend>
          </div>

          <Div_styledCountContainer>
            <CountValue value={value} units={units} />
          </Div_styledCountContainer>

        </Div_StyledLayoutContainer>

      </Div_BorderBottomContainer>
    </Article_StyledCount>
  )
};


const Article_StyledCount = styled.article`
  margin-bottom: 1em;
  background: white;
  border-radius: 5px;
  box-shadow: 
    0 4px 2px -2px rgba(0,0,0,0.4),
    4px 0 1px -2px rgba(0,0,0,0.4);
`;


const Div_BorderBottomContainer = styled.div`

  &:after {
    content: ' ';
    display: block;
    background: #ccc;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
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
`;


const Div_StyledLayoutContainer = styled.div`
  
  display: table;
  width: 100%;

  h1 {
  	font-size: 18px;
  	font-weight: 600;
	  line-height: 1;
	  color: #000000;
	  margin-bottom: 6px;
  }
  div {
    display: table-cell;
    vertical-align: middle;
    padding: 0 6px;
  }
`;

const Span_styledTrend = styled.span`
  display: block;
  margin-bottom: 8px;
  
  .trend-value {
    .fa {
      color: #0075cd;
    }
  }
`;

const Div_styledCountContainer = styled.div`
  text-align: right; 
  
  .count-value {
    font-size: 36px;
    font-weight: 300;
    opacity: 0.9;

    &.no-data {
      font-size: 22px;
    }
  }
  .count-units {
    font-size: 20px;
    font-weight: 600;
    margin-left: 4px;
    vertical-align: middle;
  }
`;

export default CountWithTrendWidget;

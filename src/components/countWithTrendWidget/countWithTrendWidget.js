
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import Tooltip from './../tooltip';
import {breakpoints} from './../../utils/styleVariables';


const StyledCount = styled.article`
  margin-bottom: 1em;
  border: 1px solid red;
  
    background: white;
    border-radius: 5px;
    box-shadow: 0 4px 2px -2px rgba(0,0,0,0.4);
    
      
  @media (min-width: ${breakpoints.screenMd}) {
    text-align: center;
  }
`;

const Div_StyledContainerMobile = styled.div`
  display: table;
  width: 100%;

  div {
    display: table-cell;
    vertical-align: middle;
    padding: 0 6px;
  }
  div:first-child {
  }
  div-second-child {
  }
`;

const Span_styledTrendMobile = styled.span`
  display: block;
  margin-bottom: 8px;
`;

const StyledHeader = styled.header`
  
  // background: ${props => props.yellow ? 'yellow' : 'red'};
  
  &:after {
    content: ' ';
    display: block;
    background: #ccc;
    border-radius-bottom-right: 4px;
    border-radius-bottom-left: 4px;
    height: 8px;
    
    @media (min-width: ${breakpoints.screenMd}) {
      border-radius-top-right: 4px;
      border-radius-top-left: 4px;
    }
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
  	font-size: 18px;
  	font-weight: 600;
	  line-height: 1;
	  color: #000000;
	  margin-bottom: 6px;
  }
  @media (min-width: ${breakpoints.screenMd}) {
    h1 {
      font-size: 20px;
      margin-bottom: 1rem;
    }
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

const Div_styledCountContainerMobile = styled.div`
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


/**
 * Sparkline-esque chart for displaying a Count of latest data and
 * the trend line for that data.
 * @returns {jsx}
 * @constructor
 */

const CountWithTrendWidget = (props) => {
  const {
    widget: {title, infoText, units},
    value,
    trendValue,
    trendDate,
  } = props;


  const CountValue = ({value, units}) => {
    if (!value) {
      return <span className="count-value no-data">No data</span>
    }
    return (
      <span className="count-value">
        {!units && value}
        {units === '$' ?
          <span>{units && <span className="count-units">{units}</span>}{value}</span> :
          <span>{value}{units && <span className="count-units">{units}</span>}</span>
        }
      </span>
    )
  };

  const TrendValue = ({value}) => {
    if (!value) {
      return null;
    }
    return (
      <span className="trend-value">
        {Number(value) > 0 ?
          <span>+{value} <i className="fa fa-arrow-up" /></span> :
          Number(value) < 0 ?
            <span>{value} <i className="fa fa-arrow-down" /></span> :
            <span>-&nbsp;</span>}
      </span>
    )
  };

  return (
    <StyledCount role="article">

      <StyledHeader className={classnames({
        'yellow': title.toLowerCase() === 'user satisfaction',
        'green': title.toLowerCase() === 'cost per transaction',
        'blue': title.toLowerCase() === 'digital take-up',
        'purple': title.toLowerCase() === 'completion rate',
      })}>
        <Div_StyledContainerMobile>
          <div>
            <h1>{title}</h1>
            <Span_styledTrendMobile>
              <TrendValue value={trendValue} />
              <span className="trend-date">{trendDate}</span>
            </Span_styledTrendMobile>
          </div>
          <Div_styledCountContainerMobile>
            <CountValue value={value} units={units} />
          </Div_styledCountContainerMobile>
        </Div_StyledContainerMobile>
      </StyledHeader>

    </StyledCount>
  )
};

export default CountWithTrendWidget;

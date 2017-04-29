
import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';

import Tooltip from './../tooltip';


const StyledCount = styled.article`
  text-align: center;
`;

const StyledHeader = styled.header`
  // background: ${props => props.yellow ? 'yellow' : 'red'};
  
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
	  line-height: 1.26;
	  color: #000000;
  }
`;

const StyledCountContainer = styled.div`
  border-bottom: 2px solid #cccccc;
  // padding: 2px 2px 4px;
  min-height: 150px;
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


/**
 * Sparkline-esque chart for displaying a Count of latest data and
 * the trend line for that data.
 * @returns {jsx}
 * @constructor
 */

const CountWithTrendWidget = (props) => {
  console.log(props)

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

    console.log(value)
    return (
      <span className="trend-value">
        {Number(value) > 0 ?
          <span>+{value} <i className="fa fa-arrow-up" /></span> :
          Number(value) < 0 ?
            <span>{value} <i className="fa fa-arrow-down" /></span> :
            <span>&nbsp;</span>}
      </span>
    )
  };

  return (
    <StyledCount className={`chart--count`} role="article">
      <StyledHeader className={classnames({
        'yellow': title.toLowerCase() === 'user satisfaction',
        'green': title.toLowerCase() === 'cost per transaction',
        'blue': title.toLowerCase() === 'digital take-up',
        'purple': title.toLowerCase() === 'completion rate',
      })}>
        <h1>{title} {infoText && <Tooltip text={infoText}>?</Tooltip>}</h1>
      </StyledHeader>
      <section>
        <StyledCountContainer>
          <CountValue value={value} units={units} />
        </StyledCountContainer>
        {value && <StyledTrendContainer>
          <TrendValue value={trendValue} />
          <span className="trend-date">{trendDate}</span>
        </StyledTrendContainer>}
      </section>
    </StyledCount>
  )
};

export default CountWithTrendWidget;

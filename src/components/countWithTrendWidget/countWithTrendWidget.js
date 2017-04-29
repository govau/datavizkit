
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
  padding: 1em 2px;
  
  .count-value {
    font-size: 77px;
    font-weight: 300;
    opacity: 0.9;
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

  const headerClass = 'orange';//title.toLowerCase();

  const title = 'Digital Take up';
  const infoText = null; //'info about dtu'; todo
  const value = 46;
  const units = '%';
  const trendValue = '-2% ^';
  const trendDate = 'since 30 Jun 2016';

  return (
    <StyledCount className={`chart--count`} role="article">
      <StyledHeader yellow {...headerClass} className={classnames({
        'yellow': title.toLowerCase() === 'user satisfaction',
        'green': title.toLowerCase() === 'cost per transaction',
        'blue': title.toLowerCase() === 'digital take up',
        'purple': title.toLowerCase() === 'completion rate',
      })}>
        <h1>{title}</h1>{infoText && <Tooltip text={infoText}>?</Tooltip>}
      </StyledHeader>
      <section>
        <StyledCountContainer>
          <span className="count-value">{value}{units && <span className="count-units">{units}</span>}</span>
        </StyledCountContainer>
        <StyledTrendContainer>
          <span className="trend-value">{trendValue}</span>
          <span className="trend-date">{trendDate}</span>
        </StyledTrendContainer>
      </section>
    </StyledCount>
  )
};

export default CountWithTrendWidget;

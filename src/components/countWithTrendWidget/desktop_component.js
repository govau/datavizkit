
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
    <Article_root role="article">
      <Span_tooltipContainer>{infoText && <Tooltip text={infoText} iconOnly={false} />}</Span_tooltipContainer>

      <Header_styled className={classnames({
        'yellow': title.toLowerCase() === 'user satisfaction',
        'green': title.toLowerCase() === 'cost per transaction',
        'blue': title.toLowerCase() === 'digital take-up',
        'purple': title.toLowerCase() === 'completion rate',
      })}>
        <h1>{title}</h1>
      </Header_styled>
      <section>
        <Div_countContainer>
          <CountValue value={value} units={units} />
        </Div_countContainer>
        {value && <Div_trendContainer>
          <TrendValue value={trendValue} />
          <span className="trend-date">since {dateFormats.monthYear(trendDate)}</span>
        </Div_trendContainer>}
      </section>

    </Article_root>
  )
};

const Article_root = styled.article`
	border-radius: 4px;
	background-color: #ffffff;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Span_tooltipContainer = styled.span`
  display: block;
  padding: 4px 8px;
  text-align: right;
`;

const Header_styled = styled.header`
  &:after {
    content: ' ';
    display: block;
    background: #ccc;
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
	  margin-top: 8px;
	  margin-bottom: 1rem;
	  color: #000000;
  }
`;

const Div_countContainer = styled.div`
  border: 1px solid red;

  padding: 2px 0 8px;
  // border-bottom: 2px solid #cccccc;
  // min-height: 120px;
  //
  // .countValue-component {
  //   display: table;
  //   width: 100%;
  // }
  //
  // .count-value,
  // .count-units {
  //   display:table-cell;
  //   vertical-align: middle;
  // }
  
  .count-value {
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
  }
`;

const Div_trendContainer = styled.div`
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

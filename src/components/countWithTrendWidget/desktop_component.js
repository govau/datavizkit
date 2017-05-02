
import React from 'react';
import classnames from 'classnames';

import Tooltip from './../tooltip';
import {CountValue, TrendValue} from './countWithTrendWidget';
import {dateFormats} from './../../utils/displayFormats';

import './styles.css'


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
    <article className="countWithTrendWidget" role="article">
      <span className="DVK-cwt__tooltip-container">{infoText && <Tooltip text={infoText} iconOnly={false} />}</span>

      <header className={`DVK-cwt__header ${classnames({
        'yellow': title.toLowerCase() === 'user satisfaction',
        'green': title.toLowerCase() === 'cost per transaction',
        'blue': title.toLowerCase() === 'digital take-up',
        'purple': title.toLowerCase() === 'completion rate',
      })}`}>
        <h1>{title}</h1>
      </header>
      <section>
        <div className="DVK-cwt__count-container">
          <CountValue value={value} units={units} />
        </div>
        {value && <div className="DVK-cwt__trend-container">
          <TrendValue value={trendValue} />
          <span className="trend-date">since {dateFormats.monthYear(trendDate)}</span>
        </div>}
      </section>

    </article>
  )
};

export default CountWithTrendWidget;

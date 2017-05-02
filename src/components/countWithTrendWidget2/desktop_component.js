
import React from 'react';
import classnames from 'classnames';

import Tooltip from './../tooltip';
import {CountValue, TrendValue} from './countWithTrendWidget';
import {dateFormats} from './../../utils/displayFormats';

import sheet from './styles.css'


/**
 * Desktop adaption of Count with Trend Widget.
 *
 */
const CountWithTrendWidget = (props) => {
  const {
    widget: {title, infoText, units, color},
    value,
    trendValue,
    trendDate,
  } = props;

  return (
    <article className={sheet.root} role="article">
      <span className={sheet.tooltipContainer}>
        {infoText && <Tooltip text={infoText} iconOnly={false} />}
        </span>

      <header className={classnames(
        sheet.header, {
          [sheet.headerYellow]: title.toLowerCase() === 'user satisfaction',
          [sheet.headerGreen]: title.toLowerCase() === 'cost per transaction',
          [sheet.headerBlue]: title.toLowerCase() === 'digital take-up',
          [sheet.headerPurple]: title.toLowerCase() === 'completion rate',
        }
      )}>
        <div className={sheet.h1Container}>
          <div className={sheet.h1ContainerInner}>
            <h1>{title}</h1>
          </div>
        </div>
      </header>
      <section>
        <div className={sheet.countContainer}>
          <CountValue value={value} units={units} />
        </div>
        {value && <div className={sheet.countTrend}>
          <TrendValue value={trendValue} />
          <span className="trend-date">since {dateFormats.monthYear(trendDate)}</span>
        </div>}
      </section>

    </article>
  )
};

export default CountWithTrendWidget;

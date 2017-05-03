
import React from 'react';
import classnames from 'classnames';

import {dateFormats} from './../../utils/displayFormats';
import Tooltip from './../tooltip';

import sheet from './desktop.css'


export const CountValue = ({value, units}) => {
  if (!value) {
    return (
      <div className={sheet.countContainer}>
        <div className={sheet.layoutFull}>
          <span className={sheet.countNodata}>No data</span>
        </div>
      </div>
    )
  }

  if (units === '$') {
    return (
      <div className={sheet.countContainer}>
        <div className={sheet.layoutLeftPrefix}>
          <span className={sheet.countUnits} style={{paddingRight: '4px'}}>{units}</span>
        </div>
        <div className={sheet.layoutRightValue}>
          <span className={sheet.countValue}>{value}</span>
        </div>
      </div>
    )
  } else if (units === '%') {
    return (
      <div className={sheet.countContainer}>
        <div className={sheet.layoutLeftValue}>
          <span className={sheet.countValue}>{value}</span>
        </div>
        <div className={sheet.layoutRightSuffix}>
          <span className={sheet.countUnits} style={{paddingLeft: '4px'}}>{units}</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className={sheet.countContainer}>
        <div className={sheet.layoutFull}>
          <span className={sheet.countValue}>{value}</span>
        </div>
      </div>
    )
  }
};


export const TrendValue = ({value, date}) => {
  return (
    <div className={sheet.trendContainer}>
      <div className={sheet.trendContainerInner}>
        {value && <div>
          <strong className={sheet.trendValue}>
            {Number(value) > 0 ?
              <span>{value} <i className="fa fa-arrow-up" /></span> :
              Number(value) < 0 ?
                <span>{value} <i className="fa fa-arrow-down" /></span> :
                <span>Unchanged <i className="fa fa-minus" /></span>}
          </strong>
          <span className={sheet.trendDate}>since {dateFormats.monthYear(date)}</span>
        </div>}
      </div>
    </div>
  )
};


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
        {infoText ? <Tooltip text={infoText} iconOnly={false} /> : <span>&nbsp;</span>}
        </span>

      <header className={classnames(
        sheet.header, { // todo - make this defined by "color"
          [sheet.headerYellow]: title.toLowerCase() === 'user satisfaction',
          [sheet.headerGreen]: title.toLowerCase() === 'cost per transaction',
          [sheet.headerBlue]: title.toLowerCase() === 'digital take-up',
          [sheet.headerPurple]: title.toLowerCase() === 'completion rate',
        }
      )}>
        <div className={sheet.h1Container}>
          <h1>{title}</h1>
        </div>
      </header>
      <section>

        <CountValue value={value} units={units} />

        <TrendValue value={trendValue} date={trendDate} />

      </section>

    </article>
  )
};

export default CountWithTrendWidget;

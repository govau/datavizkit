
import React from 'react';
import classnames from 'classnames';

import {dateFormats} from './../../utils/displayFormats';

import sheet from './mobile.css';


const CountValue = ({value, units}) => {
  if (!value) {
    return (
      <div className={sheet.countContainer}>
        <span className={sheet.countNodata}>No data</span>
      </div>
    )
  }

  if (units === '$') {
    return (
      <div className={sheet.countContainer}>
        <span className={sheet.countUnits} style={{paddingRight: '4px'}}>{units}</span>
        <span className={sheet.countValue}>{value}</span>
      </div>
    )
  } else if (units === '%') {
    return (
      <div className={sheet.countContainer}>
        <span className={sheet.countValue}>{value}</span>
        <span className={sheet.countUnits} style={{paddingLeft: '4px'}}>{units}</span>
      </div>
    )
  } else {
    return (
      <div className={sheet.countContainer}>
        <span className={sheet.countValue}>{value}</span>
      </div>
    )
  }
};


const TrendValue = ({value, date}) => {
  return (
    <div className={sheet.trendContainer}>
      {value ? <div>
        <strong className={sheet.trendValue}>
          {Number(value) > 0 ?
            <span>{value} <i className="fa fa-arrow-up" /></span> :
            Number(value) < 0 ?
              <span>{value} <i className="fa fa-arrow-down" /></span> :
              <span>Unchanged <i className="fa fa-minus" /></span>}
        </strong>
        <span className={sheet.trendDate}>since {dateFormats.monthYear(date)}</span>
      </div> : <span>&nbsp;</span>}
    </div>
  )
};


/**
 * Mobile adaption of Count with Trend Widget.
 *
 */
const MobileCountWithTrendWidget = (props) => {
  const {
    widget: {title, units},
    value,
    trendValue,
    trendDate,
  } = props;

  return (
    <article className={sheet.root} role="article">

      <div className={classnames(
        sheet.header, { // todo - make this defined by "color"
          [sheet.headerYellow]: title.toLowerCase() === 'user satisfaction',
          [sheet.headerGreen]: title.toLowerCase() === 'cost per transaction',
          [sheet.headerBlue]: title.toLowerCase() === 'digital take-up',
          [sheet.headerPurple]: title.toLowerCase() === 'completion rate',
        }
      )}>
        <div className={sheet.layoutContainer}>

          <div className={sheet.layoutLeft}>
            <h1>{title}</h1>
            <TrendValue value={trendValue} date={trendDate} />
          </div>

          <div className={sheet.layoutRight}>
            <CountValue value={value} units={units} />
          </div>

        </div>

      </div>
    </article>
  )
};

export default MobileCountWithTrendWidget;

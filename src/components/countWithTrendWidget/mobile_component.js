
import React from 'react';
import classnames from 'classnames';

import {dateFormats} from './../../utils/displayFormats';

try {require('./mobile.css');} catch(e) {}


const CountValue = ({value, units}) => {
  if (!value) {
    return (
      <div className="D_CTWM_countContainer">
        <span className="D_CTWM_countNodata">No data</span>
      </div>
    )
  }

  if (units === '$') {
    return (
      <div className="D_CTWM_countContainer">
        <span className="D_CTWM_countUnits" style={{paddingRight: '4px'}}>{units}</span>
        <span className="D_CTWM_countValue">{value}</span>
      </div>
    )
  } else if (units === '%') {
    return (
      <div className="D_CTWM_countContainer">
        <span className="D_CTWM_countValue">{value}</span>
        <span className="D_CTWM_countUnits" style={{paddingLeft: '4px'}}>{units}</span>
      </div>
    )
  } else {
    return (
      <div className="D_CTWM_countContainer">
        <span className="D_CTWM_countValue">{value}</span>
      </div>
    )
  }
};


const TrendValue = ({value, date}) => {
  return (
    <div className="D_CTWM_trendContainer">
      {value ? <div>
        <strong className="D_CTWM_trendValue">
          {Number(value) > 0 ?
            <span>{value} <i className="fa fa-arrow-up" /></span> :
            Number(value) < 0 ?
              <span>{value} <i className="fa fa-arrow-down" /></span> :
              <span>Unchanged <i className="fa fa-minus" /></span>}
        </strong>
        <span className="D_CTWM_trendDate">since {dateFormats.monthYear(date)}</span>
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
    <article className="D_CTWM_root" role="article">

      <div className={classnames(
        "D_CTWM_header", { // todo - make this defined by "color"
          "D_CTWM_headerYellow": title.toLowerCase() === 'user satisfaction',
          "D_CTWM_headerGreen": title.toLowerCase() === 'cost per transaction',
          "D_CTWM_headerBlue": title.toLowerCase() === 'digital take-up',
          "D_CTWM_headerPurple": title.toLowerCase() === 'completion rate',
        }
      )}>
        <div className="D_CTWM_layoutContainer">

          <div className="D_CTWM_layoutLeft">
            <h1>{title}</h1>
            <TrendValue value={trendValue} date={trendDate} />
          </div>

          <div className="D_CTWM_layoutRight">
            <CountValue value={value} units={units} />
          </div>

        </div>

      </div>
    </article>
  )
};

export default MobileCountWithTrendWidget;

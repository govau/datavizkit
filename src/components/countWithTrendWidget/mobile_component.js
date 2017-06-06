
import React from 'react';

import {dateFormats, valueWithUnits} from './../../utils/displayFormats';
import Tooltip from './../tooltip/tooltip';

try {require('./mobile.css');} catch(e) {}


const CountValue = ({value, units}) => {
  if (!value) {
    return (
      <div className="D_CTW_M_countContainer">
        <span className="D_CTW_M_countNodata">No data</span>
      </div>
    )
  }

  if (units === '$') {
    return (
      <div className="D_CTW_M_countContainer">
        <span className="D_CTW_M_countValue">
          <span className="D_CTW_M_countUnits" style={{paddingRight: '4px'}}>{units}</span>
          {value}</span>
      </div>
    )
  } else if (units === '%') {
    return (
      <div className="D_CTW_M_countContainer">
        <span className="D_CTW_M_countValue">{value}
          <span className="D_CTW_M_countUnits" style={{paddingLeft: '4px'}}>{units}</span>
        </span>
      </div>
    )
  } else {
    return (
      <div className="D_CTW_M_countContainer">
        <span className="D_CTW_M_countValue">{value}</span>
      </div>
    )
  }
};


const TrendValue = ({value, date, units}) => {
  let valStr = valueWithUnits(value, units);

  return (
    <div className="D_CTW_M_trendContainer">
      {value && <div>
        <strong className="D_CTW_M_trendValue">
          {Number(value) > 0 ?
            <span>{valStr} <i className="fa fa-arrow-up" /></span> :
            Number(value) < 0 ?
              <span>{valStr} <i className="fa fa-arrow-down" /></span> :
              <span>Unchanged <i className="fa fa-minus" /></span>}
        </strong>
        <span className="D_CTW_M_trendDate">since {dateFormats.monthYear(date)}</span>
      </div>}
    </div>
  )
};


/**
 * Mobile adaption of Count with Trend Widget.
 *
 */
const MobileCountWithTrendWidget = (props) => {

  const {
    title,
    units,
    tooltipAnchorTo,
    value,
    trendValue,
    trendDate,
    color,
  } = props;

  return (
    <article className="D_CTW_M_root" role="article">

      <div style={{background: color}}>
        <div className="D_CTW_M_layoutContainer">

          <div className="D_CTW_M_layoutLeft">
            <h1>{title} {tooltipAnchorTo && <Tooltip anchorTo={tooltipAnchorTo} iconOnly={true} />}</h1>
            <TrendValue value={trendValue} date={trendDate} units={units} />
          </div>

          <div className="D_CTW_M_layoutRight">
            <CountValue value={value} units={units} />
          </div>

        </div>

      </div>
    </article>
  )
};

export default MobileCountWithTrendWidget;

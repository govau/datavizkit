
import React from 'react';
import classnames from 'classnames';

import {dateFormats} from './../../utils/displayFormats';

try {require('./mobile.css');} catch(e) {}


const CountValue = ({value, units, unitsType}) => {
  if (!value) {
    return (
      <div className="D_CTW_M_countContainer">
        <span className="D_CTW_M_countNodata">No data</span>
      </div>
    )
  }

  if (unitsType === 'money') {
    return (
      <div className="D_CTW_M_countContainer">
        <span className="D_CTW_M_countValue">
          <span className="D_CTW_M_countUnits" style={{paddingRight: '4px'}}>{units}</span>
          {value}</span>
      </div>
    )
  } else if (unitsType === 'percentage') {
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


const TrendValue = ({value, date}) => {
  return (
    <div className="D_CTW_M_trendContainer">
      {value && <div>
        <strong className="D_CTW_M_trendValue">
          {Number(value) > 0 ?
            <span>{value} <i className="fa fa-arrow-up" /></span> :
            Number(value) < 0 ?
              <span>{value} <i className="fa fa-arrow-down" /></span> :
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
    unitsType,
    infoText,
    value,
    trendValue,
    trendDate,
  } = props;

  return (
    <article className="D_CTW_M_root" role="article">

      <div className={classnames(
        "D_CTW_M_header", { // todo - make this defined by "color"
          "D_CTW_M_headerYellow": title.toLowerCase() === 'user satisfaction',
          "D_CTW_M_headerGreen": title.toLowerCase() === 'cost per transaction',
          "D_CTW_M_headerBlue": title.toLowerCase() === 'digital take-up',
          "D_CTW_M_headerPurple": title.toLowerCase() === 'completion rate',
        }
      )}>
        <div className="D_CTW_M_layoutContainer">

          <div className="D_CTW_M_layoutLeft">
            <h1>{title}</h1>
            <TrendValue value={trendValue} date={trendDate} />
          </div>

          <div className="D_CTW_M_layoutRight">
            <CountValue value={value} units={units} unitsType={unitsType} />
          </div>

        </div>

      </div>
    </article>
  )
};

export default MobileCountWithTrendWidget;

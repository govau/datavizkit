
import React from 'react';

import {dateFormats, valueWithUnits} from './../../utils/displayFormats';
import Tooltip from './../tooltip/tooltip';

try {require('./desktop.css');} catch(e) {}



const CountValue = ({value, units}) => {
  if (!value) {
    return (
      <div className="D_CTW_D_countContainer">
        <div className="D_CTW_D_countContainerInner">
          <span className="D_CTW_D_countNodata">No data</span>
        </div>
      </div>
    )
  }

  if (units === '$') {
    return (
      <div className="D_CTW_D_countContainer">
        <div className="D_CTW_D_countContainerInner">
          <div className="D_CTW_D_count">
            <span className="D_CTW_D_countValue"><span className="D_CTW_D_countUnits">{units}</span>{value}</span>
          </div>
        </div>
      </div>
    )
  } else if (units === '%') {
    return (
      <div className="D_CTW_D_countContainer">
        <div className="D_CTW_D_countContainerInner">
          <span className="D_CTW_D_countValue">{value}<span className="D_CTW_D_countUnits">{units}</span></span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="D_CTW_D_countContainer">
        <div className="D_CTW_D_countContainerInner">
          <span className="D_CTW_D_countValue">{value}</span>
        </div>
      </div>
    )
  }
};


const TrendValue = ({value, date, units}) => {
  let valStr = valueWithUnits(value, units);

  return (
    <div className="D_CTW_D_trendContainer">
      <div className="D_CTW_D_trendContainerInner">
        {value && <div>
          <strong className="D_CTW_D_trendValue">
            {Number(value) > 0 ?
              <span>{valStr} <i className="fa fa-arrow-up" /></span> :
              Number(value) < 0 ?
                <span>{valStr} <i className="fa fa-arrow-down" /></span> :
                <span>Unchanged <i className="fa fa-minus" /></span>}
          </strong>
          <span className="D_CTW_D_trendDate">since {dateFormats.monthYear(date)}</span>
        </div>}
      </div>
    </div>
  )
};


/**
 * Desktop adaption of Count with Trend Widget.
 *
 */
const DesktopCountWithTrendWidget = (props) => {

  const {
    title,
    tooltipAnchorTo,
    units,
    value,
    trendValue,
    trendDate,
    color,
  } = props;

  return (
    <article className="D_CTW_D_root" role="article">
      <span className="D_CTW_D_tooltipContainer">
        {tooltipAnchorTo ? <Tooltip anchorTo={tooltipAnchorTo} iconOnly={true} /> : <span>&nbsp;</span>}
      </span>

      <header style={{background: color}}>
        <div className="D_CTW_D_h1Container">
          <div className="D_CTW_D_h1ContainerInner">
            <h1>{title}</h1>
          </div>
        </div>
      </header>

      <section>
        <CountValue value={value} units={units} />
        <TrendValue value={trendValue} date={trendDate} units={units} />
      </section>

    </article>
  )
};

export default DesktopCountWithTrendWidget;

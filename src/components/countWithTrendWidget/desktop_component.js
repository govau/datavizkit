
import React from 'react';
import classnames from 'classnames';

import {dateFormats} from './../../utils/displayFormats';
import Tooltip from './../tooltip';

try {require('./desktop.css');} catch(e) {}



const CountValue = ({value, units}) => {
  if (!value) {
    return (
      <div className="D_CTWD_countContainer">
        <div className="D_CTWD_layoutFull">
          <span className="D_CTWD_countNodata">No data</span>
        </div>
      </div>
    )
  }

  if (units === '$') {
    return (
      <div className="D_CTWD_countContainer">
        <div className="D_CTWD_layoutLeftPrefix">
          <span className="D_CTWD_countUnits" style={{paddingRight: '4px'}}>{units}</span>
        </div>
        <div className="D_CTWD_layoutRightValue">
          <span className="D_CTWD_countValue">{value}</span>
        </div>
      </div>
    )
  } else if (units === '%') {
    return (
      <div className="D_CTWD_countContainer">
        <div className="D_CTWD_layoutLeftValue">
          <span className="D_CTWD_countValue">{value}</span>
        </div>
        <div className="D_CTWD_layoutRightSuffix">
          <span className="D_CTWD_countUnits" style={{paddingLeft: '4px'}}>{units}</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="D_CTWD_countContainer">
        <div className="D_CTWD_layoutFull">
          <span className="D_CTWD_countValue">{value}</span>
        </div>
      </div>
    )
  }
};


const TrendValue = ({value, date}) => {
  return (
    <div className="D_CTWD_trendContainer">
      <div className="D_CTWD_trendContainerInner">
        {value && <div>
          <strong className="D_CTWD_trendValue">
            {Number(value) > 0 ?
              <span>{value} <i className="fa fa-arrow-up" /></span> :
              Number(value) < 0 ?
                <span>{value} <i className="fa fa-arrow-down" /></span> :
                <span>Unchanged <i className="fa fa-minus" /></span>}
          </strong>
          <span className="D_CTWD_trendDate">since {dateFormats.monthYear(date)}</span>
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
    widget: {title, infoText, units, color},
    value,
    trendValue,
    trendDate,
  } = props;

  return (
    <article className="D_CTWD_root" role="article">
      <span className="D_CTWD_tooltipContainer">
        {infoText ? <Tooltip text={infoText} iconOnly={false} /> : <span>&nbsp;</span>}
        </span>

      <header className={classnames(
        "D_CTWD_header", { // todo - make this defined by "color"
          "D_CTWD_headerYellow": title.toLowerCase() === 'user satisfaction',
          "D_CTWD_headerGreen": title.toLowerCase() === 'cost per transaction',
          "D_CTWD_headerBlue": title.toLowerCase() === 'digital take-up',
          "D_CTWD_headerPurple": title.toLowerCase() === 'completion rate',
        }
      )}>
        <div className="D_CTWD_h1Container">
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

export default DesktopCountWithTrendWidget;

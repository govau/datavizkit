
import React from 'react';
import classnames from 'classnames';

import {dateFormats} from './../../utils/displayFormats';
import Tooltip from './../tooltip';

try {require('./desktop.css');} catch(e) {}



const CountValue = ({value, units, unitsType}) => {
  if (!value) {
    return (
      <div className="D_CTW_D_countContainer">
        <div className="D_CTW_D_layoutFull">
          <span className="D_CTW_D_countNodata">No data</span>
        </div>
      </div>
    )
  }

  if (unitsType === 'money') {
    return (
      <div className="D_CTW_D_countContainer">
        <div className="D_CTW_D_layoutLeftPrefix">
          <span className="D_CTW_D_countUnits" style={{paddingRight: '4px'}}>{units}</span>
        </div>
        <div className="D_CTW_D_layoutRightValue">
          <span className="D_CTW_D_countValue">{value}</span>
        </div>
      </div>
    )
  } else if (unitsType === 'percentage') {
    return (
      <div className="D_CTW_D_countContainer">
        <div className="D_CTW_D_layoutLeftValue">
          <span className="D_CTW_D_countValue">{value}</span>
        </div>
        <div className="D_CTW_D_layoutRightSuffix">
          <span className="D_CTW_D_countUnits" style={{paddingLeft: '4px'}}>{units}</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className="D_CTW_D_countContainer">
        <div className="D_CTW_D_layoutFull">
          <span className="D_CTW_D_countValue">{value}</span>
        </div>
      </div>
    )
  }
};


const TrendValue = ({value, date}) => {
  return (
    <div className="D_CTW_D_trendContainer">
      <div className="D_CTW_D_trendContainerInner">
        {value && <div>
          <strong className="D_CTW_D_trendValue">
            {Number(value) > 0 ?
              <span>{value} <i className="fa fa-arrow-up" /></span> :
              Number(value) < 0 ?
                <span>{value} <i className="fa fa-arrow-down" /></span> :
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
    infoText,
    units,
    unitsType,
    color,
    value,
    trendValue,
    trendDate,
  } = props;

  return (
    <article className="D_CTW_D_root" role="article">
      <span className="D_CTW_D_tooltipContainer">
        {infoText ? <Tooltip text={infoText} iconOnly={true} /> : <span>&nbsp;</span>}
        </span>

      <header className={classnames(
        "D_CTW_D_header", { // todo - make this defined by "color"
          "D_CTW_D_headerYellow": title.toLowerCase() === 'user satisfaction',
          "D_CTW_D_headerGreen": title.toLowerCase() === 'cost per transaction',
          "D_CTW_D_headerBlue": title.toLowerCase() === 'digital take-up',
          "D_CTW_D_headerPurple": title.toLowerCase() === 'completion rate',
        }
      )}>
        <div className="D_CTW_D_h1Container">
          <div className="D_CTW_D_h1ContainerInner">
            <h1>{title}</h1>
          </div>
        </div>
      </header>
      <section>

        <CountValue value={value} units={units} unitsType={unitsType} />

        <TrendValue value={trendValue} date={trendDate} />

      </section>

    </article>
  )
};

export default DesktopCountWithTrendWidget;

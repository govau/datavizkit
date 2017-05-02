
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import MobileComponent from './mobile_component';
import DesktopComponent from './desktop_component';

import sheet from './styles.css';


export const CountValue = ({value, units}) => {
  if (!value) {
    return (
      <div className={sheet.countValue}>
        <div className={sheet.layoutSpanWhole}>
          <span className={classnames({
            [sheet.countValue]: true,
            [sheet.countNodata]: true,
          })}>No data</span>
        </div>
      </div>
    )
  }

  if (units === '$') {
    return (
      <div className={sheet.countValue}>
        <div className={sheet.layoutSpanLeftPrefix}>
          <span className={sheet.countUnits} style={{paddingRight: '4px'}}>{units}</span>
        </div>
        <div className={sheet.layoutSpanRightValue}>
          <span className={sheet.countValue}>{value}</span>
        </div>
      </div>
    )
  } else if (units === '%') {
    return (
      <div className={sheet.countValue}>
        <div className={sheet.layoutSpanLeftValue}>
          <span className={sheet.countValue}>{value}</span>
        </div>
        <div className={sheet.layoutSpanRightSuffix}>
          <span className={sheet.countUnits} style={{paddingLeft: '4px'}}>{units}</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className={sheet.countValue}>
        <div className={sheet.layoutSpanWhole}>
          <span className={sheet.countValue}>{value}</span>
        </div>
      </div>
    )
  }
};



export const TrendValue = ({value}) => {
  if (!value) {
    return null;
  }
  return (
    <strong className="trendValue">
        {Number(value) > 0 ?
          <span>{value} <i className="fa fa-arrow-up" /></span> :
          Number(value) < 0 ?
            <span>{value} <i className="fa fa-arrow-down" /></span> :
            <span>Unchanged <i className="fa fa-minus" /></span>}
      </strong>
  )
};


/**
 * A sparkline-esque chart for displaying a Count of latest data and
 * the trend line for that data.
 *
 */
const CountWithTrendWidget = (props) => {
  const {viewport, ...rest} = props;

  // if (typeof viewport === 'undefined' || viewport === 'sm' || viewport === 'md') {
    {/*return <MobileComponent {...rest} />*/}
  // } else {
    return <DesktopComponent {...rest} />
  // }
};

if (__DEV__) {
  CountWithTrendWidget.propTypes = {
    viewport: PropTypes.string,
  };
}


export default CountWithTrendWidget;


import React from 'react';
import PropTypes from 'prop-types';


import MobileComponent from './mobile_component';
import DesktopComponent from './desktop_component';


export const CountValue = ({value, units}) => {
  if (!value) {
    return (
      <div className='countValue-component'>
        <div style={{display: 'block', textAlign:'center'}}>
          <span className="count-value no-data">No data</span>
        </div>
      </div>
    )
  }

  if (units === '$') {
    return (
      <div className='countValue-component'>
        <div style={{width: '54%', display: 'inline-block', textAlign:'right'}}>
          <span className="count-units" style={{paddingRight: '4px'}}>{units}</span>
        </div>
        <div style={{width: '46%', display: 'inline-block', textAlign:'left'}}>
          <span className="count-value">{value}</span>
        </div>
      </div>
    )
  } else if (units === '%') {
    return (
      <div className='countValue-component' style={{display:'table', width: '100%'}}>
        <div style={{width: '54%', display: 'table-cell', textAlign:'right', verticalAlign:'middle'}}>
          <span className="count-value">{value}</span>
        </div>
        <div style={{width: '46%', display: 'table-cell', textAlign:'left', verticalAlign:'middle'}}>
          <span className="count-units" style={{paddingLeft: '4px'}}>{units}</span>
        </div>
      </div>
    )
  } else {
    return (
      <div className='countValue-component'>
        <div style={{display: 'block', textAlign:'center'}}>
          <span className="count-value">{value}</span>
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
    <strong className="trend-value">
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

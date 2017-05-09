
import React from 'react';

import {symbolChars} from './../../utils/displayFormats';

import './customLegend.css';


const Marker = ({symbol, color}) => {
  if (symbol) {
    return <text x="0" y="12" fill={color} style={{fontSize: '20px', fontFamily: `'Lucida Sans Unicode', Verdana, Arial, sans-serif`}}>{symbolChars[symbol]}</text>
  }
  return <rect x="0" y="0" width="12" height="12" fill={color} visibility="visible" rx="6" ry="6"></rect>
};

const Legend = ({data, displayHighContrast}) => {
  return (
    <div className="D_CL">
      <div className="D_CL_row">
        {data[0].category === null ? <span dangerouslySetInnerHTML={{__html: '&nbsp;'}} /> : data[0].category}
      </div>
      {data.map((d, idx) => {
        return (
          <div key={idx} className="D_CL_row">
            <div className="D_CL_key">
              <svg width="12" height="12">
                <g>
                  <Marker symbol={d.symbol} color={d.color} />
                </g>
              </svg>{d.key}
            </div>
            <div className="D_CL_value">{d.value}</div>
          </div>
        )
      })}
    </div>
  );
};

export default Legend;


import React from 'react';

import './customLegend.css';


const Legend = ({data}) => {
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
                <g>{d.color && <rect x="0" y="0" width="12" height="12" fill={d.color} visibility="visible" rx="6" ry="6"></rect>}</g>
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

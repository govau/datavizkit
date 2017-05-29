
import React from 'react';

import Marker from './../marker/marker.js';

import './customLegend.css';

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
              <Marker renderSymbol={displayHighContrast} symbol={d.symbol} color={d.color} />
              {d.key}
            </div>
            <div className="D_CL_value">{d.value}</div>
          </div>
        )
      })}
    </div>
  );
};

export default Legend;

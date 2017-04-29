
// todo - refactor classes in here to S-C


import React from 'react';
import styled from 'styled-components';


const Legend = ({data, className}) => {
  return (
    <div className={className}>
      {data.map((d, idx) => {
        return (
          <div key={idx} className="DVK-row">
            <div className="DVK-key">
              <svg width="12" height="12">
                <g>{d.color && <rect x="0" y="0" width="12" height="12" fill={d.color} visibility="visible" rx="6" ry="6"></rect>}</g>
              </svg>{d.key}
            </div>
            <div className="DVK-value">{d.y}</div>
          </div>
        )
      })}
    </div>
  );
};

const StyledLegend = styled(Legend)`
  padding: 0 4px;
  
  .DVK-row {
    display: table;
    width: 100%;
    margin-bottom: 4px;
  }
  .DVK-row:last-of-type {
    margin-bottom: 0;
  }
  .DVK-key,
  .DVK-value {
    display: table-cell;
    vertical-align: middle;
  }
  .DVK-key {
    svg {
      margin-right: 6px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      display: inline-block;
    }
  }
  .DVK-value {
    text-align: right;
    font-weight: 600;
  }
`;

export default StyledLegend;

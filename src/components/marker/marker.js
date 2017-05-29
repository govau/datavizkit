import React from 'react';

// For use in contexts where rendering a React component isn't possible,
// e.g. the content of a tooltip.
export const rawMarker = function(symbol, color, showLine) { 
  let shapes = {
    'circle': 
      <g transform="translate(0, 1)">
        <circle stroke="#FFFFFF" cx="12.5" cy="5.5" r="5.5"></circle>
      </g>,
    'diamond':
      <g transform="translate(12.363961, 6.363961) rotate(45.000000) translate(-12.363961, -6.363961)">
        <use fill-rule="evenodd" xlinkHref="#path-1"></use>
        <rect stroke="#FFFFFF" stroke-width="1" x="7.36396103" y="1.36396103" width="10" height="10"></rect>
      </g>,
    'triangle':
      <g transform="translate(2, 0) translate(10.56, 10.182254) rotate(45) translate(-10.56, -10.182254) translate(3.56, 3.182254)">
        <g transform="translate(1.000000, 1.000000)">
          <polygon points="0 0 11.1199999 2.99452777 2.99452777 11.1199999"></polygon>
        </g>
        <polygon stroke="#FFFFFF" points="0.29135534 0.29135534 13.085041 3.73659341 3.73659341 13.085041"></polygon>
      </g>,
    'square':
      <g transform="translate(0, 1)">                
        <rect id="Rectangle-16" stroke="#FFFFFF" x="7" y="0" width="11" height="11"></rect>
      </g>,
    'triangle-down': 
      <g transform="translate(5, -5) translate(10, 10) rotate(180) translate(-10, -10)">
        <g transform="translate(2, 0) translate(10.560000, 10.182254) rotate(45.000000) translate(-10.560000, -10.182254) translate(3.560000, 3.182254)">
          <g transform="translate(1.000000, 1.000000)">
            <polygon points="0 0 11.1199999 2.99452777 2.99452777 11.1199999"></polygon>
          </g>
          <polygon stroke="#FFFFFF" points="0.29135534 0.29135534 13.085041 3.73659341 3.73659341 13.085041"></polygon>
        </g>
      </g>
  };

  return <svg width="25px" height="17px" viewBox="0 0 25 17" version="1.1" 
            xmlns="http://www.w3.org/2000/svg">
          <defs>
              <rect id="path-1" x="7.86396103" y="1.86396103" width="9" height="9"></rect>
          </defs>
          <g stroke="none" strokeWidth="1" fill={color} fill-rule="evenodd">
            { showLine && <rect x="0" y="5" width="25" height="3" rx="1.5"></rect> }
            { shapes[symbol] || <rect x="0" y="0" width="12" height="12" visibility="visible" rx="6" ry="6"></rect> }
          </g>
        </svg>;
}

const Marker = ({symbol, color, showLine}) => {
  return rawMarker(symbol, color, showLine);
};

export default Marker;

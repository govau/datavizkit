
import Highcharts from 'highcharts';

export const symbolChars = {
  'circle': '●',
  'diamond': '◆',
  'triangle': '▴',
  'square': '■',
  'triangle-down': '▾' };

export const valueFormats = {
  'percentage': val => `${Highcharts.numberFormat(val, 2)}%`,
  'money': function(val) { return `$${val}`; }
};

export const unitFormats = {
  'money':      { 'symbol': '$', prefix: true },
  'percentage': { 'symbol': '%'}
};

export const dateFormats = {
  dateTime: val => new Date(val).toJSON(),
  dayMonthYear: val => Highcharts.dateFormat('%e %b %Y', new Date(val)),
  monthYear: val => Highcharts.dateFormat('%b %Y', new Date(val)),
};

export const valueWithUnits = (value, units) => {
  let op = value < 0 ? '-' : '+';
  let val = Math.abs(value);

  switch(units) {
  case '$':
    return `${op} $${val}`;
  case '%':
    return `${op} ${val}%`;
  default:
    return `${op} ${val}`;
  }
};

export const tooltipMarker = function(symbolName, color) { 
  let markerFuncs = {
    'circle': function(color) {
      return `<svg width="25px" height="13px" viewBox="0 0 25 13" version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>TT_UserSatisfaction</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="WOG-2015-?4" transform="translate(-596.000000, -1032.000000)" fill="${color}">
                  <g id="Group-44" transform="translate(590.000000, 946.000000)">
                      <g id="TT_UserSatisfaction" transform="translate(6.000000, 87.000000)">
                          <g id="Group-22" transform="translate(0.000000, 4.000000)">
                              <rect id="Rectangle-15" x="0" y="0" width="25" height="3" rx="1.5"></rect>
                          </g>
                          <circle id="Oval-5" stroke="#FFFFFF" cx="12.5" cy="5.5" r="5.5"></circle>
                      </g>
                  </g>
              </g>
          </g>
      </svg>`;
    },
    'diamond': function(color) {
      return `<svg width="25px" height="17px" viewBox="0 0 25 17" version="1.1" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>TT_CostPerTransaction</title>
          <desc>Created with Sketch.</desc>
          <defs>
              <rect id="path-1" x="7.86396103" y="1.86396103" width="9" height="9"></rect>
          </defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="WOG-2015-?4" transform="translate(-596.000000, -959.000000)">
                  <g id="Group-44" transform="translate(590.000000, 946.000000)">
                      <g id="TT_CostPerTransaction" transform="translate(6.000000, 15.000000)">
                          <rect id="Rectangle-15" fill="${color}" x="0" y="5" width="25" height="3" rx="1.5"></rect>
                          <g id="Rectangle-16" transform="translate(12.363961, 6.363961) rotate(45.000000) translate(-12.363961, -6.363961) ">
                              <use fill="${color}" fill-rule="evenodd" xlink:href="#path-1"></use>
                              <rect stroke="#FFFFFF" stroke-width="1" x="7.36396103" y="1.36396103" width="10" height="10"></rect>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </svg>`;
    },
    'triangle': function(color) { 
      return `<svg width="25px" height="14px" viewBox="0 0 25 14" version="1.1" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Rectangle-15</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Rectangle-15">
                  <g id="Group-3">
                      <rect id="Rectangle-15" fill="#6E63A7" fill-rule="nonzero" x="0" y="6" width="25" height="3" rx="1.5"></rect>
                      <g id="Group-2" transform="translate(2.000000, 0.000000)">
                          <g id="Rectangle-16" transform="translate(10.560000, 10.182254) rotate(45.000000) translate(-10.560000, -10.182254) translate(3.560000, 3.182254)">
                              <g id="path-1-link" transform="translate(1.000000, 1.000000)" fill="#6E63A7">
                                  <polygon id="path-1" points="0 0 11.1199999 2.99452777 2.99452777 11.1199999"></polygon>
                              </g>
                              <polygon id="Shape" stroke="#FFFFFF" points="0.29135534 0.29135534 13.085041 3.73659341 3.73659341 13.085041"></polygon>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </svg>`;
    },
    'square': function(color) { 
      return `<svg width="25px" height="13px" viewBox="0 0 25 13" version="1.1" 
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>TT_DigitalTakeUp</title>
          <desc>Created with Sketch.</desc>
          <defs></defs>
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="WOG-2015-?4" transform="translate(-596.000000, -985.000000)" fill="${color}">
                  <g id="Group-44" transform="translate(590.000000, 946.000000)">
                      <g id="TT_DigitalTakeUp" transform="translate(6.000000, 40.000000)">
                          <rect id="Rectangle-15" x="0" y="4" width="25" height="3" rx="1.5"></rect>
                          <rect id="Rectangle-16" stroke="#FFFFFF" x="7" y="0" width="11" height="11"></rect>
                      </g>
                  </g>
              </g>
          </g>
      </svg>`;
    }
    //TODO: triangle-down
  };

  let func = markerFuncs[symbolName] || markerFuncs['circle'];
  return func(color);
};
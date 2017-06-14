
import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip} from 'pui-react-tooltip';
import {OverlayTrigger} from 'pui-react-overlay-trigger';

import 'pui-css-tooltips';
import './tooltip.css';


const TooltipComponent = ({
  placement = 'bottom',
  text,
  iconOnly = false,
  anchorTo,

  // todo - derive viewport internally
  viewport,
}) => {

  if (typeof viewport !== 'undefined' && viewport !== 'lg') {
    placement = 'left';
  }

  if (typeof anchorTo !== 'undefined') {
    if (!anchorTo.match(/^#/i)) {
      throw new Error('anchor to type tooltips must provide an anchor link.')
    }
    return (
      <span className="D_Tool_overlay-trigger" tabIndex="0">
        <a href={anchorTo} className="D_Tool_text-wrap">
          {iconOnly ? ''  : <span>About this chart</span>}
          <i className="fa fa-question-circle-o" />
        </a>
      </span>
    )
  }

  return (
    <OverlayTrigger placement={placement} overlay={<Tooltip size="md">{text}</Tooltip>}>
      <span className="D_Tool_overlay-trigger overlay-trigger" tabIndex="0">
        <span className="D_Tool_text-wrap">
          {iconOnly ? ''  : <span>About this chart</span>}
          <i className="fa fa-question-circle-o" />
        </span>
      </span>
    </OverlayTrigger>
  )
};

if (__DEV__) {
  TooltipComponent.propTypes = {
    placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    text: PropTypes.string,
    iconOnly: PropTypes.bool,
  };
}

export default TooltipComponent;

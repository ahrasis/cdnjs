import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { duration } from '../styles/transitions';
import useTheme from '../styles/useTheme';
import { reflow, getTransitionProps } from '../transitions/utils';
import useForkRef from '../utils/useForkRef';
const styles = {
  entering: {
    transform: 'none'
  },
  entered: {
    transform: 'none'
  }
};
const defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen
};
/**
 * The Zoom transition can be used for the floating variant of the
 * [Button](/components/buttons/#floating-action-buttons) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

const Zoom = React.forwardRef(function Zoom(props, ref) {
  const {
    children,
    in: inProp,
    onEnter,
    onExit,
    style,
    timeout = defaultTimeout,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = Transition
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "in", "onEnter", "onExit", "style", "timeout", "TransitionComponent"]);

  const theme = useTheme();
  const handleRef = useForkRef(children.ref, ref);

  const handleEnter = (node, isAppearing) => {
    reflow(node); // So the animation always start from the start.

    const transitionProps = getTransitionProps({
      style,
      timeout
    }, {
      mode: 'enter'
    });
    node.style.webkitTransition = theme.transitions.create('transform', transitionProps);
    node.style.transition = theme.transitions.create('transform', transitionProps);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };

  const handleExit = node => {
    const transitionProps = getTransitionProps({
      style,
      timeout
    }, {
      mode: 'exit'
    });
    node.style.webkitTransition = theme.transitions.create('transform', transitionProps);
    node.style.transition = theme.transitions.create('transform', transitionProps);

    if (onExit) {
      onExit(node);
    }
  };

  return /*#__PURE__*/React.createElement(TransitionComponent, _extends({
    appear: true,
    in: inProp,
    onEnter: handleEnter,
    onExit: handleExit,
    timeout: timeout
  }, other), (state, childProps) => {
    return React.cloneElement(children, _extends({
      style: _extends(_extends(_extends({
        transform: 'scale(0)',
        visibility: state === 'exited' && !inProp ? 'hidden' : undefined
      }, styles[state]), style), children.props.style),
      ref: handleRef
    }, childProps));
  });
});
process.env.NODE_ENV !== "production" ? Zoom.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A single child content element.
   */
  children: PropTypes.element,

  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,

  /**
   * @ignore
   */
  onEnter: PropTypes.func,

  /**
   * @ignore
   */
  onExit: PropTypes.func,

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
export default Zoom;
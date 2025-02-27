import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import StepLabel from '../StepLabel';
import isMuiElement from '../utils/isMuiElement';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    width: '100%',
    padding: '24px 16px',
    margin: '-24px -16px',
    boxSizing: 'content-box'
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    justifyContent: 'flex-start',
    padding: '8px',
    margin: '-8px'
  },

  /* Styles applied to the `ButtonBase` touch-ripple. */
  touchRipple: {
    color: 'rgba(0, 0, 0, 0.3)'
  }
};
const StepButton = /*#__PURE__*/React.forwardRef(function StepButton(props, ref) {
  const {
    // eslint-disable-next-line react/prop-types
    active,
    // eslint-disable-next-line react/prop-types
    alternativeLabel,
    children,
    classes,
    className,
    completed,
    disabled,
    icon,
    optional,
    // eslint-disable-next-line react/prop-types
    orientation
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["active", "alternativeLabel", "children", "classes", "className", "completed", "disabled", "expanded", "icon", "last", "optional", "orientation"]);

  const childProps = {
    active,
    alternativeLabel,
    completed,
    disabled,
    icon,
    optional,
    orientation
  };
  const child = isMuiElement(children, ['StepLabel']) ? /*#__PURE__*/React.cloneElement(children, childProps) : /*#__PURE__*/React.createElement(StepLabel, childProps, children);
  return /*#__PURE__*/React.createElement(ButtonBase, _extends({
    focusRipple: true,
    disabled: disabled,
    TouchRippleProps: {
      className: classes.touchRipple
    },
    className: clsx(classes.root, classes[orientation], className),
    ref: ref
  }, other), child);
});
process.env.NODE_ENV !== "production" ? StepButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * For non-linear Steppers you need to manually set which steps are completed.
   * Otherwise the Stepper determines if a step is completed.
   */
  completed: PropTypes.bool,

  /**
   * @ignore This prop is ignored. You should disable the whole `Step`.
   */
  disabled: PropTypes.bool,

  /**
   * The icon displayed by the step label.
   */
  icon: PropTypes.node,

  /**
   * The optional node to display.
   */
  optional: PropTypes.node
} : void 0;
export default withStyles(styles, {
  name: 'MuiStepButton'
})(StepButton);
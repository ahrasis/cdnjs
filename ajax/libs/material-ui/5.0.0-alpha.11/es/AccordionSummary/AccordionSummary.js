import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";

/* eslint-disable jsx-a11y/aria-role */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ButtonBase from '../ButtonBase';
import IconButton from '../IconButton';
import withStyles from '../styles/withStyles';
import AccordionContext from '../Accordion/AccordionContext';
export const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    /* Styles applied to the root element. */
    root: {
      display: 'flex',
      minHeight: 8 * 6,
      transition: theme.transitions.create(['min-height', 'background-color'], transition),
      padding: theme.spacing(0, 2),
      '&:hover:not($disabled)': {
        cursor: 'pointer'
      },
      '&$expanded': {
        minHeight: 64
      },
      '&$focusVisible': {
        backgroundColor: theme.palette.action.focus
      },
      '&$disabled': {
        opacity: theme.palette.action.disabledOpacity
      }
    },

    /* Pseudo-class applied to the root element, children wrapper element and `IconButton` component if `expanded={true}`. */
    expanded: {},

    /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
    focusVisible: {},

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the children wrapper element. */
    content: {
      display: 'flex',
      flexGrow: 1,
      transition: theme.transitions.create(['margin'], transition),
      margin: '12px 0',
      '&$expanded': {
        margin: '20px 0'
      }
    },

    /* Styles applied to the `IconButton` component when `expandIcon` is supplied. */
    expandIcon: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', transition),
      '&:hover': {
        // Disable the hover effect for the IconButton,
        // because a hover effect should apply to the entire Expand button and
        // not only to the IconButton.
        backgroundColor: 'transparent'
      },
      '&$expanded': {
        transform: 'rotate(180deg)'
      }
    }
  };
};
const AccordionSummary = /*#__PURE__*/React.forwardRef(function AccordionSummary(props, ref) {
  const {
    children,
    classes,
    className,
    expandIcon,
    focusVisibleClassName,
    IconButtonProps = {},
    onClick
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "expandIcon", "focusVisibleClassName", "IconButtonProps", "onClick"]);

  const {
    disabled = false,
    expanded,
    toggle
  } = React.useContext(AccordionContext);

  const handleChange = event => {
    if (toggle) {
      toggle(event);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return /*#__PURE__*/React.createElement(ButtonBase, _extends({
    focusRipple: false,
    disableRipple: true,
    disabled: disabled,
    component: "div",
    "aria-expanded": expanded,
    className: clsx(classes.root, className, disabled && classes.disabled, expanded && classes.expanded),
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    onClick: handleChange,
    ref: ref
  }, other), /*#__PURE__*/React.createElement("div", {
    className: clsx(classes.content, expanded && classes.expanded)
  }, children), expandIcon && /*#__PURE__*/React.createElement(IconButton, _extends({
    edge: "end",
    component: "div",
    tabIndex: null,
    role: null,
    "aria-hidden": true
  }, IconButtonProps, {
    className: clsx(classes.expandIcon, IconButtonProps.className, expanded && classes.expanded)
  }), expandIcon));
});
process.env.NODE_ENV !== "production" ? AccordionSummary.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the accordion summary.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The icon to display as the expand indicator.
   */
  expandIcon: PropTypes.node,

  /**
   * This prop can help a person know which element has the keyboard focus.
   * The class name will be applied when the element gain the focus through a keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * Props applied to the `IconButton` element wrapping the expand icon.
   * @default {}
   */
  IconButtonProps: PropTypes.object,

  /**
   * @ignore
   */
  onClick: PropTypes.func
} : void 0;
export default withStyles(styles, {
  name: 'MuiAccordionSummary'
})(AccordionSummary);
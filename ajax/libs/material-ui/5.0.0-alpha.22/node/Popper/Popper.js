"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _core = require("@popperjs/core");

var _utils = require("@material-ui/utils");

var _styles = require("@material-ui/styles");

var _Portal = _interopRequireDefault(require("../Portal"));

var _setRef = _interopRequireDefault(require("../utils/setRef"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _useEnhancedEffect = _interopRequireDefault(require("../utils/useEnhancedEffect"));

function flipPlacement(placement, theme) {
  const direction = theme && theme.direction || 'ltr';

  if (direction === 'ltr') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';

    case 'bottom-start':
      return 'bottom-end';

    case 'top-end':
      return 'top-start';

    case 'top-start':
      return 'top-end';

    default:
      return placement;
  }
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const defaultPopperOptions = {};
/**
 * Poppers rely on the 3rd party library [Popper.js](https://popper.js.org/docs/v2/) for positioning.
 */

const Popper = /*#__PURE__*/React.forwardRef(function Popper(props, ref) {
  const {
    anchorEl,
    children,
    container,
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement: initialPlacement = 'bottom',
    popperOptions = defaultPopperOptions,
    popperRef: popperRefProp,
    style,
    transition = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["anchorEl", "children", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"]);
  const tooltipRef = React.useRef(null);
  const ownRef = (0, _useForkRef.default)(tooltipRef, ref);
  const popperRef = React.useRef(null);
  const handlePopperRef = (0, _useForkRef.default)(popperRef, popperRefProp);
  const handlePopperRefRef = React.useRef(handlePopperRef);
  (0, _useEnhancedEffect.default)(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React.useImperativeHandle(popperRefProp, () => popperRef.current, []);
  const [exited, setExited] = React.useState(true);
  const theme = (0, _styles.useTheme)();
  const rtlPlacement = flipPlacement(initialPlacement, theme);
  /**
   * placement initialized from prop but can change during lifetime if modifiers.flip.
   * modifiers.flip is essentially a flip for controlled/uncontrolled behavior
   */

  const [placement, setPlacement] = React.useState(rtlPlacement);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });
  const handleOpen = React.useCallback(() => {
    if (!tooltipRef.current || !anchorEl || !open) {
      return;
    }

    if (popperRef.current) {
      popperRef.current.destroy();
      handlePopperRefRef.current(null);
    }

    const handlePopperUpdate = data => {
      setPlacement(data.placement);
    };

    const resolvedAnchorEl = getAnchorEl(anchorEl);

    if (process.env.NODE_ENV !== 'production') {
      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();

        if (process.env.NODE_ENV !== 'test' && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          console.warn(['Material-UI: The `anchorEl` prop provided to the component is invalid.', 'The anchor element should be part of the document layout.', "Make sure the element is present in the document or that it's not display none."].join('\n'));
        }
      }
    }

    let popperModifiers = [{
      name: 'preventOverflow',
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: 'flip',
      options: {
        altBoundary: disablePortal
      }
    }, {
      name: 'onUpdate',
      enabled: true,
      phase: 'afterWrite',
      fn: ({
        state
      }) => {
        handlePopperUpdate(state);
      }
    }];

    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }

    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }

    const popper = (0, _core.createPopper)(getAnchorEl(anchorEl), tooltipRef.current, (0, _extends2.default)({
      placement: rtlPlacement
    }, popperOptions, {
      modifiers: popperModifiers
    }));
    handlePopperRefRef.current(popper);
  }, [anchorEl, disablePortal, modifiers, open, rtlPlacement, popperOptions]);
  const handleRef = React.useCallback(node => {
    (0, _setRef.default)(ownRef, node);
    handleOpen();
  }, [ownRef, handleOpen]);

  const handleEnter = () => {
    setExited(false);
  };

  const handleClose = () => {
    if (!popperRef.current) {
      return;
    }

    popperRef.current.destroy();
    handlePopperRefRef.current(null);
  };

  const handleExited = () => {
    setExited(true);
    handleClose();
  };

  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);
  React.useEffect(() => {
    if (!open && !transition) {
      // Otherwise handleExited will call this.
      handleClose();
    }
  }, [open, transition]);

  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }

  const childProps = {
    placement
  };

  if (transition) {
    childProps.TransitionProps = {
      in: open,
      onEnter: handleEnter,
      onExited: handleExited
    };
  }

  return /*#__PURE__*/React.createElement(_Portal.default, {
    disablePortal: disablePortal,
    container: container
  }, /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    ref: handleRef,
    role: "tooltip"
  }, other, {
    style: (0, _extends2.default)({
      // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
      position: 'fixed',
      // Fix Popper.js display issue
      top: 0,
      left: 0,
      display: !open && keepMounted && !transition ? 'none' : null
    }, style)
  }), typeof children === 'function' ? children(childProps) : children));
});
process.env.NODE_ENV !== "production" ? Popper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: (0, _utils.chainPropTypes)(_propTypes.default.oneOfType([_utils.HTMLElementType, _propTypes.default.object, _propTypes.default.func]), props => {
    if (props.open) {
      const resolvedAnchorEl = getAnchorEl(props.anchorEl);

      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();

        if (process.env.NODE_ENV !== 'test' && box.top === 0 && box.left === 0 && box.right === 0 && box.bottom === 0) {
          return new Error(['Material-UI: The `anchorEl` prop provided to the component is invalid.', 'The anchor element should be part of the document layout.', "Make sure the element is present in the document or that it's not display none."].join('\n'));
        }
      } else if (!resolvedAnchorEl || typeof resolvedAnchorEl.getBoundingClientRect !== 'function' || resolvedAnchorEl.contextElement != null && resolvedAnchorEl.contextElement.nodeType !== 1) {
        return new Error(['Material-UI: The `anchorEl` prop provided to the component is invalid.', 'It should be an HTML element instance or a virtualElement ', '(https://popper.js.org/docs/v2/virtual-elements/).'].join('\n'));
      }
    }

    return null;
  }),

  /**
   * Popper render function or node.
   */
  children: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.node, _propTypes.default.func]),

  /**
   * A HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_utils.HTMLElementType, _propTypes.default.func]),

  /**
   * The `children` will be inside the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: _propTypes.default.bool,

  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: _propTypes.default.bool,

  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: _propTypes.default.arrayOf(_propTypes.default.shape({
    data: _propTypes.default.object,
    effect: _propTypes.default.func,
    enabled: _propTypes.default.bool,
    fn: _propTypes.default.func,
    name: _propTypes.default.any.isRequired,
    options: _propTypes.default.object,
    phase: _propTypes.default.oneOf(['afterMain', 'afterRead', 'afterWrite', 'beforeMain', 'beforeRead', 'beforeWrite', 'main', 'read', 'write']),
    requires: _propTypes.default.arrayOf(_propTypes.default.string),
    requiresIfExists: _propTypes.default.arrayOf(_propTypes.default.string)
  })),

  /**
   * If `true`, the popper is visible.
   */
  open: _propTypes.default.bool.isRequired,

  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: _propTypes.default.oneOf(['auto-end', 'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),

  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: _propTypes.default.shape({
    modifiers: _propTypes.default.array,
    onFirstUpdate: _propTypes.default.func,
    placement: _propTypes.default.oneOf(['auto-end', 'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top']),
    strategy: _propTypes.default.oneOf(['absolute', 'fixed'])
  }),

  /**
   * A ref that points to the used popper instance.
   */
  popperRef: _utils.refType,

  /**
   * @ignore
   */
  style: _propTypes.default.object,

  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: _propTypes.default.bool
} : void 0;
var _default = Popper;
exports.default = _default;
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

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _colorManipulator = require("../styles/colorManipulator");

var _MoreHoriz = _interopRequireDefault(require("../internal/svg-icons/MoreHoriz"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

const styles = theme => ({
  button: {
    display: 'flex',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[700],
    borderRadius: 2,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[200]
    },
    '&:active': {
      boxShadow: theme.shadows[0],
      backgroundColor: (0, _colorManipulator.emphasize)(theme.palette.grey[200], 0.12)
    }
  },
  icon: {
    width: 24,
    height: 16
  }
});
/**
 * @ignore - internal component.
 */


function BreadcrumbCollapsed(props) {
  const {
    classes
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes"]);
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(_ButtonBase.default, (0, _extends2.default)({
    className: classes.button,
    focusRipple: true
  }, other), /*#__PURE__*/React.createElement(_MoreHoriz.default, {
    className: classes.icon
  })));
}

process.env.NODE_ENV !== "production" ? BreadcrumbCollapsed.propTypes = {
  /**
   * @ignore
   */
  classes: _propTypes.default.object.isRequired
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'PrivateBreadcrumbCollapsed'
})(BreadcrumbCollapsed);

exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSvgIcon;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

/**
 * Private module reserved for @material-ui packages.
 */
function createSvgIcon(path, displayName) {
  const Component = (props, ref) => /*#__PURE__*/_react.default.createElement(_SvgIcon.default, (0, _extends2.default)({
    "data-testid": `${displayName}Icon`,
    ref: ref
  }, props), path);

  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = `${displayName}Icon`;
  }

  Component.muiName = _SvgIcon.default.muiName;
  return /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(Component));
}
import _extends from "@babel/runtime/helpers/esm/extends";
import React from 'react';
import SvgIcon from '../SvgIcon';
/**
 * Private module reserved for @material-ui packages.
 */

export default function createSvgIcon(path, displayName) {
  var Component = function Component(props, ref) {
    return /*#__PURE__*/React.createElement(SvgIcon, _extends({
      "data-testid": "".concat(displayName, "Icon"),
      ref: ref
    }, props), path);
  };

  if (process.env.NODE_ENV !== 'production') {
    // Need to set `displayName` on the inner component for React.memo.
    // React prior to 16.14 ignores `displayName` on the wrapper.
    Component.displayName = "".concat(displayName, "Icon");
  }

  Component.muiName = SvgIcon.muiName;
  return /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(Component));
}
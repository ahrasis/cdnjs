"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _View = _interopRequireDefault(require("../View"));

var _createElement = _interopRequireDefault(require("../createElement"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

/**
 * This Component is used to "wrap" the modal we're opening
 * so that changing focus via tab will never leave the document.
 *
 * This allows us to properly trap the focus within a modal
 * even if the modal is at the start or end of a document.
 */
var FocusBracket = function FocusBracket() {
  return (0, _createElement.default)('div', {
    accessible: true,
    accessibilityRole: 'none',
    importantForAccessibility: 'no-hide-descendants',
    style: styles.focusBracket,
    tabIndex: 0
  });
};

function attemptFocus(element) {
  try {
    element.focus();
  } catch (e) {// Do nothing
  }

  return document.activeElement === element;
}

function focusFirstDescendant(element) {
  for (var i = 0; i < element.childNodes.length; i++) {
    var child = element.childNodes[i];

    if (attemptFocus(child) || focusFirstDescendant(child)) {
      return true;
    }
  }

  return false;
}

function focusLastDescendant(element) {
  for (var i = element.childNodes.length - 1; i >= 0; i--) {
    var child = element.childNodes[i];

    if (attemptFocus(child) || focusLastDescendant(child)) {
      return true;
    }
  }

  return false;
}

var ModalFocusTrap = function ModalFocusTrap(_ref) {
  var active = _ref.active,
      children = _ref.children;
  var trapElementRef = (0, _react.useRef)(); // Ref used to track trapping of focus and to prevent focus from leaving a modal
  // for accessibility reasons per W3CAG.

  var focusRef = (0, _react.useRef)({
    trapFocusInProgress: false,
    lastFocusedElement: null
  });
  var trapFocus = (0, _react.useCallback)(function () {
    // We should not trap focus if:
    // - The modal hasn't fully initialized with an HTMLElement ref
    // - Focus is already in the process of being trapped (eg, we're refocusing)
    // - isTrapActive prop being false-ish tells us to do nothing
    if (!trapElementRef.current || focusRef.current.trapFocusInProgress || !active) {
      return;
    }

    try {
      focusRef.current.trapFocusInProgress = true; // Only muck with the focus if the event target isn't within this modal

      if (document.activeElement instanceof Node && !trapElementRef.current.contains(document.activeElement)) {
        // To handle keyboard focusing we can make an assumption here.
        // If you're tabbing through the focusable elements, the previously
        // active element will either be the first or the last.
        //
        // If the previously selected element is the "first" descendant
        // and we're leaving it - this means that we should
        // be looping around to the other side of the modal.
        var hasFocused = focusFirstDescendant(trapElementRef.current);

        if (focusRef.current.lastFocusedElement === document.activeElement) {
          hasFocused = focusLastDescendant(trapElementRef.current);
        } // If we couldn't focus a new element then we need to blur the active element


        if (!hasFocused && document.activeElement) {
          document.activeElement.blur();
        }
      }
    } finally {
      focusRef.current.trapFocusInProgress = false;
    }

    focusRef.current.lastFocusedElement = document.activeElement;
  }, [active]); // Bind to the document itself for this component

  (0, _react.useEffect)(function () {
    if (_ExecutionEnvironment.canUseDOM) {
      document.addEventListener('focus', trapFocus, true); // Call the trapFocus callback at least once when this modal has been
      // re-rendered / trapFocus has changed!

      trapFocus();
      return function () {
        document.removeEventListener('focus', trapFocus, true);
      };
    }
  }, [trapFocus]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(FocusBracket, null), _react.default.createElement(_View.default, {
    ref: trapElementRef
  }, children), _react.default.createElement(FocusBracket, null));
};

var _default = ModalFocusTrap;
exports.default = _default;

var styles = _StyleSheet.default.create({
  focusBracket: {
    outlineStyle: 'none'
  }
});

module.exports = exports.default;
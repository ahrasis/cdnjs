"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setRef;

/**
 * TODO v5: consider to make it private
 *
 * passes {value} to {ref}
 *
 * WARNING: Be sure to only call this inside a callback that is passed as a ref.
 * Otherwise make sure to cleanup previous {ref} if it changes. See
 * https://github.com/mui-org/material-ui/issues/13539
 *
 * useful if you want to expose the ref of an inner component to the public api
 * while still using it inside the component
 * @param ref a ref callback or ref object if anything falsy this is a no-op
 */
function setRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
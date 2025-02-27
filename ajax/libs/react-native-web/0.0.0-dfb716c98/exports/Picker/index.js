function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import createElement from '../createElement';
import setAndForwardRef from '../../modules/setAndForwardRef';
import usePlatformMethods from '../../hooks/usePlatformMethods';
import PickerItem from './PickerItem';
import StyleSheet from '../StyleSheet';
import { forwardRef, useMemo, useRef } from 'react';
var Picker = forwardRef(function (props, forwardedRef) {
  var children = props.children,
      enabled = props.enabled,
      onValueChange = props.onValueChange,
      selectedValue = props.selectedValue,
      style = props.style,
      testID = props.testID,
      itemStyle = props.itemStyle,
      mode = props.mode,
      prompt = props.prompt,
      other = _objectWithoutPropertiesLoose(props, ["children", "enabled", "onValueChange", "selectedValue", "style", "testID", "itemStyle", "mode", "prompt"]);

  var hostRef = useRef(null);
  var setRef = useMemo(function () {
    return setAndForwardRef({
      getForwardedRef: function getForwardedRef() {
        return forwardedRef;
      },
      setLocalRef: function setLocalRef(hostNode) {
        hostRef.current = hostNode;
      }
    });
  }, [forwardedRef]);

  function handleChange(e) {
    var _e$target = e.target,
        selectedIndex = _e$target.selectedIndex,
        value = _e$target.value;

    if (onValueChange) {
      onValueChange(value, selectedIndex);
    }
  }

  var supportedProps = _objectSpread({
    children: children,
    disabled: enabled === false ? true : undefined,
    onChange: handleChange,
    ref: setRef,
    style: [styles.initial, style],
    testID: testID,
    value: selectedValue
  }, other);

  usePlatformMethods(hostRef, supportedProps);
  return createElement('select', supportedProps);
}); // $FlowFixMe

Picker.Item = PickerItem;
var styles = StyleSheet.create({
  initial: {
    fontFamily: 'System',
    fontSize: 'inherit',
    margin: 0
  }
});
export default Picker;
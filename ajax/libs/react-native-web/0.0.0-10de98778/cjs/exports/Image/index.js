"use strict";

exports.__esModule = true;
exports.default = void 0;

var _createElement = _interopRequireDefault(require("../createElement"));

var _css = _interopRequireDefault(require("../StyleSheet/css"));

var _AssetRegistry = require("../../modules/AssetRegistry");

var _resolveShadowValue = _interopRequireDefault(require("../StyleSheet/resolveShadowValue"));

var _ImageLoader = _interopRequireDefault(require("../../modules/ImageLoader"));

var _PixelRatio = _interopRequireDefault(require("../PixelRatio"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _TextAncestorContext = _interopRequireDefault(require("../Text/TextAncestorContext"));

var _View = _interopRequireDefault(require("../View"));

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ERRORED = 'ERRORED';
var LOADED = 'LOADED';
var LOADING = 'LOADING';
var IDLE = 'IDLE';
var _filterId = 0;
var svgDataUriPattern = /^(data:image\/svg\+xml;utf8,)(.*)/;

function createTintColorSVG(tintColor, id) {
  return tintColor && id != null ? _react.default.createElement("svg", {
    style: {
      position: 'absolute',
      height: 0,
      visibility: 'hidden',
      width: 0
    }
  }, _react.default.createElement("defs", null, _react.default.createElement("filter", {
    id: "tint-" + id
  }, _react.default.createElement("feFlood", {
    floodColor: "" + tintColor,
    key: tintColor
  }), _react.default.createElement("feComposite", {
    in2: "SourceAlpha",
    operator: "atop"
  })))) : null;
}

function getFlatStyle(style, blurRadius, filterId) {
  var flatStyle = _objectSpread({}, _StyleSheet.default.flatten(style));

  var filter = flatStyle.filter,
      resizeMode = flatStyle.resizeMode,
      shadowOffset = flatStyle.shadowOffset,
      tintColor = flatStyle.tintColor; // Add CSS filters
  // React Native exposes these features as props and proprietary styles

  var filters = [];
  var _filter = null;

  if (filter) {
    filters.push(filter);
  } //


  if (blurRadius) {
    filters.push("blur(" + blurRadius + "px)");
  }

  if (shadowOffset) {
    var shadowString = (0, _resolveShadowValue.default)(flatStyle);

    if (shadowString) {
      filters.push("drop-shadow(" + shadowString + ")");
    }
  }

  if (tintColor && filterId != null) {
    filters.push("url(#tint-" + filterId + ")");
  }

  if (filters.length > 0) {
    _filter = filters.join(' ');
  } // These styles are converted to CSS filters applied to the
  // element displaying the background image.


  delete flatStyle.shadowColor;
  delete flatStyle.shadowOpacity;
  delete flatStyle.shadowOffset;
  delete flatStyle.shadowRadius;
  delete flatStyle.tintColor; // These styles are not supported on View

  delete flatStyle.overlayColor;
  delete flatStyle.resizeMode;
  return [flatStyle, resizeMode, _filter, tintColor];
}

function resolveAssetDimensions(source) {
  if (typeof source === 'number') {
    var _getAssetByID = (0, _AssetRegistry.getAssetByID)(source),
        height = _getAssetByID.height,
        width = _getAssetByID.width;

    return {
      height: height,
      width: width
    };
  } else if (source != null && !Array.isArray(source) && typeof source === 'object') {
    var _height = source.height,
        _width = source.width;
    return {
      height: _height,
      width: _width
    };
  }
}

function resolveAssetUri(source) {
  var uri = null;

  if (typeof source === 'number') {
    // get the URI from the packager
    var asset = (0, _AssetRegistry.getAssetByID)(source);
    var scale = asset.scales[0];

    if (asset.scales.length > 1) {
      var preferredScale = _PixelRatio.default.get(); // Get the scale which is closest to the preferred scale


      scale = asset.scales.reduce(function (prev, curr) {
        return Math.abs(curr - preferredScale) < Math.abs(prev - preferredScale) ? curr : prev;
      });
    }

    var scaleSuffix = scale !== 1 ? "@" + scale + "x" : '';
    uri = asset ? asset.httpServerLocation + "/" + asset.name + scaleSuffix + "." + asset.type : '';
  } else if (typeof source === 'string') {
    uri = source;
  } else if (source && typeof source.uri === 'string') {
    uri = source.uri;
  }

  if (uri) {
    var match = uri.match(svgDataUriPattern); // inline SVG markup may contain characters (e.g., #, ") that need to be escaped

    if (match) {
      var prefix = match[1],
          svg = match[2];
      var encodedSvg = encodeURIComponent(svg);
      return "" + prefix + encodedSvg;
    }
  }

  return uri;
}

var Image = (0, _react.forwardRef)(function (props, ref) {
  var accessibilityLabel = props.accessibilityLabel,
      accessibilityRole = props.accessibilityRole,
      accessibilityState = props.accessibilityState,
      accessible = props.accessible,
      blurRadius = props.blurRadius,
      defaultSource = props.defaultSource,
      draggable = props.draggable,
      importantForAccessibility = props.importantForAccessibility,
      nativeID = props.nativeID,
      onError = props.onError,
      onLayout = props.onLayout,
      onLoad = props.onLoad,
      onLoadEnd = props.onLoadEnd,
      onLoadStart = props.onLoadStart,
      pointerEvents = props.pointerEvents,
      source = props.source,
      testID = props.testID;

  if (process.env.NODE_ENV !== 'production') {
    if (props.children) {
      throw new Error('The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.');
    }
  }

  var _useState = (0, _react.useState)(function () {
    var uri = resolveAssetUri(source);

    if (uri != null) {
      var isLoaded = _ImageLoader.default.has(uri);

      if (isLoaded) {
        return LOADED;
      }
    }

    return IDLE;
  }),
      state = _useState[0],
      updateState = _useState[1];

  var _useState2 = (0, _react.useState)({}),
      layout = _useState2[0],
      updateLayout = _useState2[1];

  var hasTextAncestor = (0, _react.useContext)(_TextAncestorContext.default);
  var hiddenImageRef = (0, _react.useRef)(null);
  var filterRef = (0, _react.useRef)(_filterId++);
  var requestRef = (0, _react.useRef)(null);
  var shouldDisplaySource = state === LOADED || state === LOADING && defaultSource == null;

  var _getFlatStyle = getFlatStyle(props.style, blurRadius, filterRef.current),
      flatStyle = _getFlatStyle[0],
      _resizeMode = _getFlatStyle[1],
      filter = _getFlatStyle[2],
      tintColor = _getFlatStyle[3];

  var resizeMode = props.resizeMode || _resizeMode || 'cover';
  var selectedSource = shouldDisplaySource ? source : defaultSource;
  var displayImageUri = resolveAssetUri(selectedSource);
  var imageSizeStyle = resolveAssetDimensions(selectedSource);
  var backgroundImage = displayImageUri ? "url(\"" + displayImageUri + "\")" : null;
  var backgroundSize = getBackgroundSize(); // Accessibility image allows users to trigger the browser's image context menu

  var hiddenImage = displayImageUri ? (0, _createElement.default)('img', {
    alt: accessibilityLabel || '',
    classList: [classes.accessibilityImage],
    draggable: draggable || false,
    ref: hiddenImageRef,
    src: displayImageUri
  }) : null;

  function getBackgroundSize() {
    if (hiddenImageRef.current != null && (resizeMode === 'center' || resizeMode === 'repeat')) {
      var _hiddenImageRef$curre = hiddenImageRef.current,
          naturalHeight = _hiddenImageRef$curre.naturalHeight,
          naturalWidth = _hiddenImageRef$curre.naturalWidth;
      var height = layout.height,
          width = layout.width;

      if (naturalHeight && naturalWidth && height && width) {
        var scaleFactor = Math.min(1, width / naturalWidth, height / naturalHeight);
        var x = Math.ceil(scaleFactor * naturalWidth);
        var y = Math.ceil(scaleFactor * naturalHeight);
        return x + "px " + y + "px";
      }
    }
  }

  function handleLayout(e) {
    if (resizeMode === 'center' || resizeMode === 'repeat' || onLayout) {
      var _layout = e.nativeEvent.layout;
      onLayout && onLayout(e);
      updateLayout(_layout);
    }
  } // Image loading


  (0, _react.useEffect)(function () {
    abortPendingRequest();
    var uri = resolveAssetUri(source);

    if (uri != null) {
      updateState(LOADING);

      if (onLoadStart) {
        onLoadStart();
      }

      requestRef.current = _ImageLoader.default.load(uri, function load(e) {
        updateState(LOADED);

        if (onLoad) {
          onLoad();
        }

        if (onLoadEnd) {
          onLoadEnd();
        }
      }, function error() {
        updateState(ERRORED);

        if (onError) {
          onError({
            nativeEvent: {
              error: "Failed to load resource " + uri + " (404)"
            }
          });
        }

        if (onLoadEnd) {
          onLoadEnd();
        }
      });
    }

    function abortPendingRequest() {
      if (requestRef.current != null) {
        _ImageLoader.default.abort(requestRef.current);

        requestRef.current = null;
      }
    }

    return abortPendingRequest;
  }, [source, requestRef, updateState, onError, onLoad, onLoadEnd, onLoadStart]);
  return _react.default.createElement(_View.default, {
    accessibilityLabel: accessibilityLabel,
    accessibilityRole: accessibilityRole,
    accessibilityState: accessibilityState,
    accessible: accessible,
    importantForAccessibility: importantForAccessibility,
    nativeID: nativeID,
    onLayout: handleLayout,
    pointerEvents: pointerEvents,
    ref: ref,
    style: [styles.root, hasTextAncestor && styles.inline, imageSizeStyle, flatStyle],
    testID: testID
  }, _react.default.createElement(_View.default, {
    style: [styles.image, resizeModeStyles[resizeMode], {
      backgroundImage: backgroundImage,
      filter: filter
    }, backgroundSize != null && {
      backgroundSize: backgroundSize
    }]
  }), hiddenImage, createTintColorSVG(tintColor, filterRef.current));
});
Image.displayName = 'Image'; // $FlowFixMe

Image.getSize = function (uri, success, failure) {
  _ImageLoader.default.getSize(uri, success, failure);
}; // $FlowFixMe


Image.prefetch = function (uri) {
  return _ImageLoader.default.prefetch(uri);
}; // $FlowFixMe


Image.queryCache = function (uris) {
  return _ImageLoader.default.queryCache(uris);
};

var classes = _css.default.create({
  accessibilityImage: _objectSpread({}, _StyleSheet.default.absoluteFillObject, {
    height: '100%',
    opacity: 0,
    width: '100%',
    zIndex: -1
  })
});

var styles = _StyleSheet.default.create({
  root: {
    flexBasis: 'auto',
    overflow: 'hidden',
    zIndex: 0
  },
  inline: {
    display: 'inline-flex'
  },
  image: _objectSpread({}, _StyleSheet.default.absoluteFillObject, {
    backgroundColor: 'transparent',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    zIndex: -1
  })
});

var resizeModeStyles = _StyleSheet.default.create({
  center: {
    backgroundSize: 'auto'
  },
  contain: {
    backgroundSize: 'contain'
  },
  cover: {
    backgroundSize: 'cover'
  },
  none: {
    backgroundPosition: '0 0',
    backgroundSize: 'auto'
  },
  repeat: {
    backgroundPosition: '0 0',
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto'
  },
  stretch: {
    backgroundSize: '100% 100%'
  }
});

var _default = Image;
exports.default = _default;
module.exports = exports.default;
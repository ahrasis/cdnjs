"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _styledEngine = _interopRequireDefault(require("@material-ui/styled-engine"));

var _styles = require("@material-ui/styles");

var _defaultTheme = _interopRequireDefault(require("./defaultTheme"));

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

const getStyleOverrides = (name, theme) => {
  let styleOverrides = {};

  if (theme && theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    styleOverrides = theme.components[name].styleOverrides;
  }

  return styleOverrides;
};

const getVariantStyles = (name, theme) => {
  let variants = [];

  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }

  const variantsStyles = {};
  variants.forEach(definition => {
    const key = (0, _styles.propsToClassKey)(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};

const variantsResolver = (props, styles, theme, name) => {
  var _theme$components, _theme$components$nam;

  const {
    styleProps = {}
  } = props;
  let variantsStyles = {};
  const themeVariants = theme === null || theme === void 0 ? void 0 : (_theme$components = theme.components) === null || _theme$components === void 0 ? void 0 : (_theme$components$nam = _theme$components[name]) === null || _theme$components$nam === void 0 ? void 0 : _theme$components$nam.variants;

  if (themeVariants) {
    themeVariants.forEach(themeVariant => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach(key => {
        if (styleProps[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });

      if (isMatch) {
        variantsStyles = (0, _extends2.default)({}, variantsStyles, styles[(0, _styles.propsToClassKey)(themeVariant.props)]);
      }
    });
  }

  return variantsStyles;
};

const shouldForwardProp = prop => prop !== 'styleProps' && prop !== 'theme';

const experimentalStyled = (tag, options, muiOptions = {}) => {
  const name = muiOptions.muiName;
  const defaultStyledResolver = (0, _styledEngine.default)(tag, (0, _extends2.default)({
    shouldForwardProp,
    label: name
  }, options));

  const muiStyledResolver = (...styles) => {
    const stylesWithDefaultTheme = styles.map(stylesArg => {
      return typeof stylesArg === 'function' ? (_ref) => {
        let {
          theme: themeInput
        } = _ref,
            rest = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["theme"]);
        return stylesArg((0, _extends2.default)({
          theme: isEmpty(themeInput) ? _defaultTheme.default : themeInput
        }, rest));
      } : stylesArg;
    });

    if (name && muiOptions.overridesResolver) {
      stylesWithDefaultTheme.push(props => {
        const theme = isEmpty(props.theme) ? _defaultTheme.default : props.theme;
        return muiOptions.overridesResolver(props, getStyleOverrides(name, theme), name);
      });
    }

    if (name) {
      stylesWithDefaultTheme.push(props => {
        const theme = isEmpty(props.theme) ? _defaultTheme.default : props.theme;
        return variantsResolver(props, getVariantStyles(name, theme), theme, name);
      });
    }

    return defaultStyledResolver(...stylesWithDefaultTheme);
  };

  return muiStyledResolver;
};

var _default = experimentalStyled;
exports.default = _default;
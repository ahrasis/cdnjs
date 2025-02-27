import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import Person from '../internal/svg-icons/Person';
import avatarClasses, { getAvatarUtilityClass } from './avatarClasses';

var overridesResolver = function overridesResolver(props, styles) {
  var _extends2;

  var _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'circular' : _props$variant;
  return deepmerge(styles.root || {}, _extends({}, styles[variant], (_extends2 = {}, _defineProperty(_extends2, "&.".concat(avatarClasses.colorDefault), styles.colorDefault), _defineProperty(_extends2, "& .".concat(avatarClasses.img), styles.img), _defineProperty(_extends2, "& .".concat(avatarClasses.fallback), styles.fallback), _extends2)));
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var _styleProps$classes = styleProps.classes,
      classes = _styleProps$classes === void 0 ? {} : _styleProps$classes,
      variant = styleProps.variant,
      colorDefault = styleProps.colorDefault;
  return {
    root: clsx(avatarClasses.root, classes.root, getAvatarUtilityClass(variant), colorDefault && avatarClasses.colorDefault),
    img: clsx(avatarClasses.img, classes.img),
    fallback: clsx(avatarClasses.fallback, classes.fallback)
  };
};

var AvatarRoot = experimentalStyled('div', {}, {
  name: 'MuiAvatar',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    lineHeight: 1,
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none'
  }, styleProps.variant === 'rounded' && {
    borderRadius: theme.shape.borderRadius
  }, styleProps.variant === 'square' && {
    borderRadius: 0
  }, styleProps.colorDefault && {
    color: theme.palette.background.default,
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
  });
});
var AvatarImg = experimentalStyled('img', {}, {
  name: 'MuiAvatar',
  slot: 'Img'
})({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  // Handle non-square image. The property isn't supported by IE11.
  objectFit: 'cover',
  // Hide alt text.
  color: 'transparent',
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000
});
var AvatarFallback = experimentalStyled(Person, {}, {
  name: 'MuiAvatar',
  slot: 'Fallback'
})({
  width: '75%',
  height: '75%'
});

function useLoaded(_ref2) {
  var src = _ref2.src,
      srcSet = _ref2.srcSet;

  var _React$useState = React.useState(false),
      loaded = _React$useState[0],
      setLoaded = _React$useState[1];

  React.useEffect(function () {
    if (!src && !srcSet) {
      return undefined;
    }

    setLoaded(false);
    var active = true;
    var image = new Image();
    image.src = src;

    if (srcSet) {
      image.srcset = srcSet;
    }

    image.onload = function () {
      if (!active) {
        return;
      }

      setLoaded('loaded');
    };

    image.onerror = function () {
      if (!active) {
        return;
      }

      setLoaded('error');
    };

    return function () {
      active = false;
    };
  }, [src, srcSet]);
  return loaded;
}

var Avatar = /*#__PURE__*/React.forwardRef(function Avatar(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAvatar'
  });

  var alt = props.alt,
      childrenProp = props.children,
      className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      imgProps = props.imgProps,
      sizes = props.sizes,
      src = props.src,
      srcSet = props.srcSet,
      _props$variant2 = props.variant,
      variant = _props$variant2 === void 0 ? 'circular' : _props$variant2,
      other = _objectWithoutProperties(props, ["alt", "children", "className", "component", "imgProps", "sizes", "src", "srcSet", "variant"]);

  var children = null; // Use a hook instead of onError on the img element to support server-side rendering.

  var loaded = useLoaded({
    src: src,
    srcSet: srcSet
  });
  var hasImg = src || srcSet;
  var hasImgNotFailing = hasImg && loaded !== 'error';

  var styleProps = _extends({}, props, {
    variant: variant,
    colorDefault: !hasImgNotFailing
  });

  var classes = useUtilityClasses(styleProps);

  if (hasImgNotFailing) {
    children = /*#__PURE__*/React.createElement(AvatarImg, _extends({
      alt: alt,
      src: src,
      srcSet: srcSet,
      sizes: sizes,
      className: classes.img
    }, imgProps));
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = /*#__PURE__*/React.createElement(AvatarFallback, {
      className: classes.fallback
    });
  }

  return /*#__PURE__*/React.createElement(AvatarRoot, _extends({
    as: Component,
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other), children);
});
process.env.NODE_ENV !== "production" ? Avatar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,

  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Attributes applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps: PropTypes.object,

  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,

  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,

  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet: PropTypes.string,

  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['circular', 'rounded', 'square']), PropTypes.string])
} : void 0;
export default Avatar;
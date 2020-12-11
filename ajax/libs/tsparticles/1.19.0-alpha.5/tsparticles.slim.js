/*!
 * Author : Matteo Bruni - https://www.matteobruni.it
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.matteobruni.it/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v1.19.0-alpha.5
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "CanvasUtils": () => /* reexport */ CanvasUtils,
  "Circle": () => /* reexport */ Circle,
  "CircleWarp": () => /* reexport */ CircleWarp,
  "ColorUtils": () => /* reexport */ ColorUtils,
  "Constants": () => /* reexport */ Constants,
  "Container": () => /* reexport */ Container,
  "MainSlim": () => /* reexport */ MainSlim,
  "Point": () => /* reexport */ Point,
  "Rectangle": () => /* reexport */ Rectangle,
  "Utils": () => /* reexport */ Utils,
  "pJSDom": () => /* binding */ pJSDom,
  "particlesJS": () => /* binding */ particlesJS,
  "tsParticles": () => /* binding */ tsParticles
});

;// CONCATENATED MODULE: ./dist/browser/ShapeDrawers/SquareDrawer.js
class SquareDrawer {
  getSidesCount() {
    return 4;
  }

  draw(context, particle, radius) {
    context.rect(-radius, -radius, radius * 2, radius * 2);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Particle/Vector.js
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get angle() {
    return Math.atan2(this.y, this.x);
  }

  set angle(angle) {
    const length = this.length;
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  get length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  set length(length) {
    const angle = this.angle;
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  addTo(v) {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n) {
    return new Vector(this.x * n, this.y * n);
  }

  multTo(n) {
    this.x *= n;
    this.y *= n;
  }

  div(n) {
    return new Vector(this.x / n, this.y / n);
  }

  divTo(n) {
    this.x /= n;
    this.y /= n;
  }

  distanceTo(v) {
    return this.sub(v).length;
  }

  getLengthSq() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }

  manhattanDistanceTo(v) {
    return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  setTo(velocity) {
    this.x = velocity.x;
    this.y = velocity.y;
  }

  rotate(angle) {
    return new Vector(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/NumberUtils.js

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
  const max = getRangeMax(r);
  let min = getRangeMin(r);

  if (max === min) {
    min = 0;
  }

  return Math.random() * (max - min) + min;
}
function getRangeValue(value) {
  return typeof value === "number" ? value : randomInRange(value);
}
function getRangeMin(value) {
  return typeof value === "number" ? value : value.min;
}
function getRangeMax(value) {
  return typeof value === "number" ? value : value.max;
}
function setRangeValue(source, value) {
  if (source === value || value === undefined && typeof source === "number") {
    return source;
  }

  const min = getRangeMin(source),
        max = getRangeMax(source);
  return value !== undefined ? {
    min: Math.min(min, value),
    max: Math.max(max, value)
  } : setRangeValue(min, max);
}
function getDistances(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return {
    dx: dx,
    dy: dy,
    distance: Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
  };
}
function getDistance(pointA, pointB) {
  return getDistances(pointA, pointB).distance;
}
function getParticleBaseVelocity(direction) {
  const baseVelocity = new Vector(0, 0);
  baseVelocity.length = 1;

  switch (direction) {
    case "top":
      baseVelocity.angle = -Math.PI / 2;
      break;

    case "top-right":
      baseVelocity.angle = -Math.PI / 4;
      break;

    case "right":
      baseVelocity.angle = 0;
      break;

    case "bottom-right":
      baseVelocity.angle = Math.PI / 4;
      break;

    case "bottom":
      baseVelocity.angle = Math.PI / 2;
      break;

    case "bottom-left":
      baseVelocity.angle = 3 * Math.PI / 4;
      break;

    case "left":
      baseVelocity.angle = Math.PI;
      break;

    case "top-left":
      baseVelocity.angle = -3 * Math.PI / 4;
      break;

    case "none":
    default:
      baseVelocity.angle = Math.random() * Math.PI * 2;
      break;
  }

  return baseVelocity;
}
function rotateVelocity(velocity, angle) {
  const res = new Vector(velocity.x, velocity.y);
  res.rotate(angle);
  return res;
}
function collisionVelocity(v1, v2, m1, m2) {
  return new Vector(v1.x * (m1 - m2) / (m1 + m2) + v2.x * 2 * m2 / (m1 + m2), v1.y);
}
function deg2rad(deg) {
  return deg * Math.PI / 180;
}
function rad2deg(rad) {
  return rad * 180 / Math.PI;
}
class NumberUtils {
  static clamp(num, min, max) {
    return clamp(num, min, max);
  }

  static mix(comp1, comp2, weight1, weight2) {
    return mix(comp1, comp2, weight1, weight2);
  }

  static randomInRange(r) {
    return randomInRange(r);
  }

  static getRangeValue(value) {
    return getRangeValue(value);
  }

  static getDistances(pointA, pointB) {
    return getDistances(pointA, pointB);
  }

  static getDistance(pointA, pointB) {
    return getDistance(pointA, pointB);
  }

  static getParticleBaseVelocity(direction) {
    return getParticleBaseVelocity(direction);
  }

  static rotateVelocity(velocity, angle) {
    return rotateVelocity(velocity, angle);
  }

  static collisionVelocity(v1, v2, m1, m2) {
    return collisionVelocity(v1, v2, m1, m2);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/Utils.js
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};




function rectSideBounce(pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor) {
  const res = {
    bounced: false
  };

  if (pOtherSide.min >= rectOtherSide.min && pOtherSide.min <= rectOtherSide.max && pOtherSide.max >= rectOtherSide.min && pOtherSide.max <= rectOtherSide.max) {
    if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0 || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0) {
      res.velocity = velocity * -factor;
      res.bounced = true;
    }
  }

  return res;
}

function checkSelector(element, selectors) {
  if (selectors instanceof Array) {
    for (const selector of selectors) {
      if (element.matches(selector)) {
        return true;
      }
    }

    return false;
  } else {
    return element.matches(selectors);
  }
}

function isSsr() {
  return typeof window === "undefined" || !window;
}
function animate() {
  return isSsr() ? callback => setTimeout(callback) : callback => (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout)(callback);
}
function cancelAnimation() {
  return isSsr() ? handle => clearTimeout(handle) : handle => (window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout)(handle);
}
function isInArray(value, array) {
  return value === array || array instanceof Array && array.indexOf(value) > -1;
}
function loadFont(character) {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield document.fonts.load(`${character.weight} 36px '${character.font}'`);
    } catch (_a) {}
  });
}
function arrayRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}
function itemFromArray(array, index, useIndex = true) {
  const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);
  return array[fixedIndex];
}
function isPointInside(point, size, radius, direction) {
  return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, direction);
}
function areBoundsInside(bounds, size, direction) {
  let inside = true;

  if (!direction || direction === "bottom") {
    inside = bounds.top < size.height;
  }

  if (inside && (!direction || direction === "left")) {
    inside = bounds.right > 0;
  }

  if (inside && (!direction || direction === "right")) {
    inside = bounds.left < size.width;
  }

  if (inside && (!direction || direction === "top")) {
    inside = bounds.bottom > 0;
  }

  return inside;
}
function calculateBounds(point, radius) {
  return {
    bottom: point.y + radius,
    left: point.x - radius,
    right: point.x + radius,
    top: point.y - radius
  };
}
function loadImage(source) {
  return new Promise((resolve, reject) => {
    if (!source) {
      reject("Error tsParticles - No image.src");
      return;
    }

    const image = {
      source: source,
      type: source.substr(source.length - 3)
    };
    const img = new Image();
    img.addEventListener("load", () => {
      image.element = img;
      resolve(image);
    });
    img.addEventListener("error", () => {
      reject(`Error tsParticles - loading image: ${source}`);
    });
    img.src = source;
  });
}
function downloadSvgImage(source) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!source) {
      throw new Error("Error tsParticles - No image.src");
    }

    const image = {
      source: source,
      type: source.substr(source.length - 3)
    };

    if (image.type !== "svg") {
      return loadImage(source);
    }

    const response = yield fetch(image.source);

    if (!response.ok) {
      throw new Error("Error tsParticles - Image not found");
    }

    image.svgData = yield response.text();
    return image;
  });
}
function deepExtend(destination, ...sources) {
  for (const source of sources) {
    if (source === undefined || source === null) {
      continue;
    }

    if (typeof source !== "object") {
      destination = source;
      continue;
    }

    const sourceIsArray = Array.isArray(source);

    if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
      destination = [];
    } else if (!sourceIsArray && (typeof destination !== "object" || !destination || Array.isArray(destination))) {
      destination = {};
    }

    for (const key in source) {
      if (key === "__proto__") {
        continue;
      }

      const sourceDict = source;
      const value = sourceDict[key];
      const isObject = typeof value === "object";
      const destDict = destination;
      destDict[key] = isObject && Array.isArray(value) ? value.map(v => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);
    }
  }

  return destination;
}
function isDivModeEnabled(mode, divs) {
  return divs instanceof Array ? !!divs.find(t => t.enable && isInArray(mode, t.mode)) : isInArray(mode, divs.mode);
}
function divModeExecute(mode, divs, callback) {
  if (divs instanceof Array) {
    for (const div of divs) {
      const divsMode = div.mode;
      const divsEnabled = div.enable;

      if (divsEnabled && isInArray(mode, divsMode)) {
        singleDivModeExecute(div, callback);
      }
    }
  } else {
    const divsMode = divs.mode;
    const divsEnabled = divs.enable;

    if (divsEnabled && isInArray(mode, divsMode)) {
      singleDivModeExecute(divs, callback);
    }
  }
}
function singleDivModeExecute(div, callback) {
  const selectors = div.selectors;

  if (selectors instanceof Array) {
    for (const selector of selectors) {
      callback(selector, div);
    }
  } else {
    callback(selectors, div);
  }
}
function divMode(divs, element) {
  if (!element || !divs) {
    return;
  }

  if (divs instanceof Array) {
    return divs.find(d => checkSelector(element, d.selectors));
  } else if (checkSelector(element, divs.selectors)) {
    return divs;
  }
}
function circleBounceDataFromParticle(p) {
  return {
    position: p.getPosition(),
    radius: p.getRadius(),
    velocity: p.velocity,
    factor: new Vector(getRangeValue(p.options.bounce.horizontal.value), getRangeValue(p.options.bounce.vertical.value))
  };
}
function circleBounce(p1, p2) {
  const xVelocityDiff = p1.velocity.x;
  const yVelocityDiff = p1.velocity.y;
  const pos1 = p1.position;
  const pos2 = p2.position;
  const xDist = pos2.x - pos1.x;
  const yDist = pos2.y - pos1.y;

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(pos2.y - pos1.y, pos2.x - pos1.x);
    const m1 = p1.radius;
    const m2 = p2.radius;
    const u1 = rotateVelocity(p1.velocity, angle);
    const u2 = rotateVelocity(p2.velocity, angle);
    const v1 = collisionVelocity(u1, u2, m1, m2);
    const v2 = collisionVelocity(u2, u1, m1, m2);
    const vFinal1 = rotateVelocity(v1, -angle);
    const vFinal2 = rotateVelocity(v2, -angle);
    p1.velocity.x = vFinal1.x * p1.factor.x;
    p1.velocity.y = vFinal1.y * p1.factor.y;
    p2.velocity.x = vFinal2.x * p2.factor.x;
    p2.velocity.y = vFinal2.y * p2.factor.y;
  }
}
function rectBounce(particle, divBounds) {
  const pPos = particle.getPosition();
  const size = particle.getRadius();
  const bounds = calculateBounds(pPos, size);
  const resH = rectSideBounce({
    min: bounds.left,
    max: bounds.right
  }, {
    min: bounds.top,
    max: bounds.bottom
  }, {
    min: divBounds.left,
    max: divBounds.right
  }, {
    min: divBounds.top,
    max: divBounds.bottom
  }, particle.velocity.x, getRangeValue(particle.options.bounce.horizontal.value));

  if (resH.bounced) {
    if (resH.velocity !== undefined) {
      particle.velocity.x = resH.velocity;
    }

    if (resH.position !== undefined) {
      particle.position.x = resH.position;
    }
  }

  const resV = rectSideBounce({
    min: bounds.top,
    max: bounds.bottom
  }, {
    min: bounds.left,
    max: bounds.right
  }, {
    min: divBounds.top,
    max: divBounds.bottom
  }, {
    min: divBounds.left,
    max: divBounds.right
  }, particle.velocity.y, getRangeValue(particle.options.bounce.vertical.value));

  if (resV.bounced) {
    if (resV.velocity !== undefined) {
      particle.velocity.y = resV.velocity;
    }

    if (resV.position !== undefined) {
      particle.position.y = resV.position;
    }
  }
}
function checkDestroy(particle, destroy, value, minValue, maxValue) {
  switch (destroy) {
    case "max":
      if (value >= maxValue) {
        particle.destroy();
      }

      break;

    case "min":
      if (value <= minValue) {
        particle.destroy();
      }

      break;
  }
}
class Utils {
  static isSsr() {
    return isSsr();
  }

  static get animate() {
    return animate();
  }

  static get cancelAnimation() {
    return cancelAnimation();
  }

  static isInArray(value, array) {
    return isInArray(value, array);
  }

  static loadFont(character) {
    return __awaiter(this, void 0, void 0, function* () {
      yield loadFont(character);
    });
  }

  static arrayRandomIndex(array) {
    return arrayRandomIndex(array);
  }

  static itemFromArray(array, index, useIndex = true) {
    return itemFromArray(array, index, useIndex);
  }

  static isPointInside(point, size, radius, direction) {
    return isPointInside(point, size, radius, direction);
  }

  static areBoundsInside(bounds, size, direction) {
    return areBoundsInside(bounds, size, direction);
  }

  static calculateBounds(point, radius) {
    return calculateBounds(point, radius);
  }

  static loadImage(source) {
    return loadImage(source);
  }

  static downloadSvgImage(source) {
    return downloadSvgImage(source);
  }

  static deepExtend(destination, ...sources) {
    return deepExtend(destination, sources);
  }

  static isDivModeEnabled(mode, divs) {
    return isDivModeEnabled(mode, divs);
  }

  static divModeExecute(mode, divs, callback) {
    return divModeExecute(mode, divs, callback);
  }

  static singleDivModeExecute(div, callback) {
    return singleDivModeExecute(div, callback);
  }

  static divMode(divs, element) {
    return divMode(divs, element);
  }

  static circleBounceDataFromParticle(p) {
    return circleBounceDataFromParticle(p);
  }

  static circleBounce(p1, p2) {
    return circleBounce(p1, p2);
  }

  static rectBounce(particle, divBounds) {
    return rectBounce(particle, divBounds);
  }

  static checkDestroy(particle, destroy, value, minValue, maxValue) {
    return checkDestroy(particle, destroy, value, minValue, maxValue);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/Constants.js
class Constants {}
Constants.canvasClass = "tsparticles-canvas-el";
Constants.randomColorValue = "random";
Constants.midColorValue = "mid";
Constants.touchEndEvent = "touchend";
Constants.mouseDownEvent = "mousedown";
Constants.mouseUpEvent = "mouseup";
Constants.mouseMoveEvent = "mousemove";
Constants.touchStartEvent = "touchstart";
Constants.touchMoveEvent = "touchmove";
Constants.mouseLeaveEvent = "mouseleave";
Constants.mouseOutEvent = "mouseout";
Constants.touchCancelEvent = "touchcancel";
Constants.resizeEvent = "resize";
Constants.visibilityChangeEvent = "visibilitychange";
Constants.noPolygonDataLoaded = "No polygon data loaded.";
Constants.noPolygonFound = "No polygon found, you need to specify SVG url in config.";
;// CONCATENATED MODULE: ./dist/browser/Utils/ColorUtils.js




function hue2rgb(p, q, t) {
  let tCalc = t;

  if (tCalc < 0) {
    tCalc += 1;
  }

  if (tCalc > 1) {
    tCalc -= 1;
  }

  if (tCalc < 1 / 6) {
    return p + (q - p) * 6 * tCalc;
  }

  if (tCalc < 1 / 2) {
    return q;
  }

  if (tCalc < 2 / 3) {
    return p + (q - p) * (2 / 3 - tCalc) * 6;
  }

  return p;
}

function stringToRgba(input) {
  if (input.startsWith("rgb")) {
    const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? {
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      b: parseInt(result[3], 10),
      g: parseInt(result[2], 10),
      r: parseInt(result[1], 10)
    } : undefined;
  } else if (input.startsWith("hsl")) {
    const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? hslaToRgba({
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      h: parseInt(result[1], 10),
      l: parseInt(result[3], 10),
      s: parseInt(result[2], 10)
    }) : undefined;
  } else if (input.startsWith("hsv")) {
    const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
    const result = regex.exec(input);
    return result ? hsvaToRgba({
      a: result.length > 4 ? parseFloat(result[5]) : 1,
      h: parseInt(result[1], 10),
      s: parseInt(result[2], 10),
      v: parseInt(result[3], 10)
    }) : undefined;
  } else {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
    const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
      return r + r + g + g + b + b + (a !== undefined ? a + a : "");
    });
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
    const result = regex.exec(hexFixed);
    return result ? {
      a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
      b: parseInt(result[3], 16),
      g: parseInt(result[2], 16),
      r: parseInt(result[1], 16)
    } : undefined;
  }
}

function colorToRgb(input, index, useIndex = true) {
  var _a, _b, _c;

  if (input === undefined) {
    return;
  }

  const color = typeof input === "string" ? {
    value: input
  } : input;
  let res;

  if (typeof color.value === "string") {
    if (color.value === Constants.randomColorValue) {
      res = getRandomRgbColor();
    } else {
      res = stringToRgb(color.value);
    }
  } else {
    if (color.value instanceof Array) {
      const colorSelected = itemFromArray(color.value, index, useIndex);
      res = colorToRgb({
        value: colorSelected
      });
    } else {
      const colorValue = color.value;
      const rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;

      if (rgbColor.r !== undefined) {
        res = rgbColor;
      } else {
        const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;

        if (hslColor.h !== undefined && hslColor.l !== undefined) {
          res = hslToRgb(hslColor);
        } else {
          const hsvColor = (_c = colorValue.hsv) !== null && _c !== void 0 ? _c : color.value;

          if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
            res = hsvToRgb(hsvColor);
          }
        }
      }
    }
  }

  return res;
}
function colorToHsl(color, index, useIndex = true) {
  const rgb = colorToRgb(color, index, useIndex);
  return rgb !== undefined ? rgbToHsl(rgb) : undefined;
}
function rgbToHsl(color) {
  const r1 = color.r / 255,
        g1 = color.g / 255,
        b1 = color.b / 255,
        max = Math.max(r1, g1, b1),
        min = Math.min(r1, g1, b1);
  const res = {
    h: 0,
    l: (max + min) / 2,
    s: 0
  };

  if (max != min) {
    res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min);
  }

  res.l *= 100;
  res.s *= 100;
  res.h *= 60;

  if (res.h < 0) {
    res.h += 360;
  }

  return res;
}
function stringToAlpha(input) {
  var _a;

  return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
}
function stringToRgb(input) {
  return stringToRgba(input);
}
function hslToRgb(hsl) {
  const result = {
    b: 0,
    g: 0,
    r: 0
  },
        hslPercent = {
    h: hsl.h / 360,
    l: hsl.l / 100,
    s: hsl.s / 100
  };

  if (hslPercent.s === 0) {
    result.b = hslPercent.l;
    result.g = hslPercent.l;
    result.r = hslPercent.l;
  } else {
    const q = hslPercent.l < 0.5 ? hslPercent.l * (1 + hslPercent.s) : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s;
    const p = 2 * hslPercent.l - q;
    result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
    result.g = hue2rgb(p, q, hslPercent.h);
    result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
  }

  result.r = Math.floor(result.r * 255);
  result.g = Math.floor(result.g * 255);
  result.b = Math.floor(result.b * 255);
  return result;
}
function hslaToRgba(hsla) {
  const rgbResult = hslToRgb(hsla);
  return {
    a: hsla.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}
function hslToHsv(hsl) {
  const l = hsl.l / 100,
        sl = hsl.s / 100,
        v = l + sl * Math.min(l, 1 - l),
        sv = !v ? 0 : 2 * (1 - l / v);
  return {
    h: hsl.h,
    s: sv * 100,
    v: v * 100
  };
}
function hslaToHsva(hsla) {
  const hsvResult = hslToHsv(hsla);
  return {
    a: hsla.a,
    h: hsvResult.h,
    s: hsvResult.s,
    v: hsvResult.v
  };
}
function hsvToHsl(hsv) {
  const v = hsv.v / 100,
        sv = hsv.s / 100;
  const l = v * (1 - sv / 2),
        sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
  return {
    h: hsv.h,
    l: l * 100,
    s: sl * 100
  };
}
function hsvaToHsla(hsva) {
  const hslResult = hsvToHsl(hsva);
  return {
    a: hsva.a,
    h: hslResult.h,
    l: hslResult.l,
    s: hslResult.s
  };
}
function hsvToRgb(hsv) {
  const result = {
    b: 0,
    g: 0,
    r: 0
  };
  const hsvPercent = {
    h: hsv.h / 60,
    s: hsv.s / 100,
    v: hsv.v / 100
  };
  const c = hsvPercent.v * hsvPercent.s,
        x = c * (1 - Math.abs(hsvPercent.h % 2 - 1));
  let tempRgb;

  if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
    tempRgb = {
      r: c,
      g: x,
      b: 0
    };
  } else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
    tempRgb = {
      r: x,
      g: c,
      b: 0
    };
  } else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
    tempRgb = {
      r: 0,
      g: c,
      b: x
    };
  } else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
    tempRgb = {
      r: 0,
      g: x,
      b: c
    };
  } else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
    tempRgb = {
      r: x,
      g: 0,
      b: c
    };
  } else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
    tempRgb = {
      r: c,
      g: 0,
      b: x
    };
  }

  if (tempRgb) {
    const m = hsvPercent.v - c;
    result.r = Math.floor((tempRgb.r + m) * 255);
    result.g = Math.floor((tempRgb.g + m) * 255);
    result.b = Math.floor((tempRgb.b + m) * 255);
  }

  return result;
}
function hsvaToRgba(hsva) {
  const rgbResult = hsvToRgb(hsva);
  return {
    a: hsva.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}
function rgbToHsv(rgb) {
  const rgbPercent = {
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255
  },
        xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        v = xMax,
        c = xMax - xMin;
  let h = 0;

  if (v === rgbPercent.r) {
    h = 60 * ((rgbPercent.g - rgbPercent.b) / c);
  } else if (v === rgbPercent.g) {
    h = 60 * (2 + (rgbPercent.b - rgbPercent.r) / c);
  } else if (v === rgbPercent.b) {
    h = 60 * (4 + (rgbPercent.r - rgbPercent.g) / c);
  }

  const s = !v ? 0 : c / v;
  return {
    h,
    s: s * 100,
    v: v * 100
  };
}
function rgbaToHsva(rgba) {
  const hsvResult = rgbToHsv(rgba);
  return {
    a: rgba.a,
    h: hsvResult.h,
    s: hsvResult.s,
    v: hsvResult.v
  };
}
function getRandomRgbColor(min) {
  const fixedMin = min !== null && min !== void 0 ? min : 0;
  const range = setRangeValue(fixedMin, 256);
  return {
    b: Math.floor(randomInRange(range)),
    g: Math.floor(randomInRange(range)),
    r: Math.floor(randomInRange(range))
  };
}
function getStyleFromRgb(color, opacity) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}
function getStyleFromHsl(color, opacity) {
  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}
function getStyleFromHsv(color, opacity) {
  return getStyleFromHsl(hsvToHsl(color), opacity);
}
function colorMix(color1, color2, size1, size2) {
  let rgb1 = color1;
  let rgb2 = color2;

  if (rgb1.r === undefined) {
    rgb1 = hslToRgb(color1);
  }

  if (rgb2.r === undefined) {
    rgb2 = hslToRgb(color2);
  }

  return {
    b: mix(rgb1.b, rgb2.b, size1, size2),
    g: mix(rgb1.g, rgb2.g, size1, size2),
    r: mix(rgb1.r, rgb2.r, size1, size2)
  };
}
function replaceColorSvg(image, color, opacity) {
  if (!image.svgData) {
    return "";
  }

  const svgXml = image.svgData;
  const rgbHex = /#([0-9A-F]{3,6})/gi;
  return svgXml.replace(rgbHex, () => getStyleFromHsl(color, opacity));
}
function getLinkColor(p1, p2, linkColor) {
  var _a, _b;

  if (linkColor === Constants.randomColorValue) {
    return getRandomRgbColor();
  } else if (linkColor === "mid") {
    const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor();
    const destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();

    if (sourceColor && destColor && p2) {
      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
    } else {
      const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;

      if (hslColor) {
        return hslToRgb(hslColor);
      }
    }
  } else {
    return linkColor;
  }
}
function getLinkRandomColor(optColor, blink, consent) {
  const color = typeof optColor === "string" ? optColor : optColor.value;

  if (color === Constants.randomColorValue) {
    if (consent) {
      return colorToRgb({
        value: color
      });
    } else if (blink) {
      return Constants.randomColorValue;
    } else {
      return Constants.midColorValue;
    }
  } else {
    return colorToRgb({
      value: color
    });
  }
}
function getHslFromAnimation(animation) {
  return animation !== undefined ? {
    h: animation.h.value,
    s: animation.s.value,
    l: animation.l.value
  } : undefined;
}
class ColorUtils {
  static colorToRgb(input, index, useIndex = true) {
    return colorToRgb(input, index, useIndex);
  }

  static colorToHsl(color, index, useIndex = true) {
    return colorToHsl(color, index, useIndex);
  }

  static rgbToHsl(color) {
    return rgbToHsl(color);
  }

  static stringToAlpha(input) {
    return stringToAlpha(input);
  }

  static stringToRgb(input) {
    return stringToRgb(input);
  }

  static hslToRgb(hsl) {
    return hslToRgb(hsl);
  }

  static hslaToRgba(hsla) {
    return hslaToRgba(hsla);
  }

  static hslToHsv(hsl) {
    return hslToHsv(hsl);
  }

  static hslaToHsva(hsla) {
    return hslaToHsva(hsla);
  }

  static hsvToHsl(hsv) {
    return hsvToHsl(hsv);
  }

  static hsvaToHsla(hsva) {
    return hsvaToHsla(hsva);
  }

  static hsvToRgb(hsv) {
    return hsvToRgb(hsv);
  }

  static hsvaToRgba(hsva) {
    return hsvaToRgba(hsva);
  }

  static rgbToHsv(rgb) {
    return rgbToHsv(rgb);
  }

  static rgbaToHsva(rgba) {
    return rgbaToHsva(rgba);
  }

  static getRandomRgbColor(min) {
    return getRandomRgbColor(min);
  }

  static getStyleFromRgb(color, opacity) {
    return getStyleFromRgb(color, opacity);
  }

  static getStyleFromHsl(color, opacity) {
    return getStyleFromHsl(color, opacity);
  }

  static getStyleFromHsv(color, opacity) {
    return getStyleFromHsv(color, opacity);
  }

  static mix(color1, color2, size1, size2) {
    return colorMix(color1, color2, size1, size2);
  }

  static replaceColorSvg(image, color, opacity) {
    return replaceColorSvg(image, color, opacity);
  }

  static getLinkColor(p1, p2, linkColor) {
    return getLinkColor(p1, p2, linkColor);
  }

  static getLinkRandomColor(optColor, blink, consent) {
    return getLinkRandomColor(optColor, blink, consent);
  }

  static getHslFromAnimation(animation) {
    return getHslFromAnimation(animation);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/CanvasUtils.js



function drawLine(context, begin, end) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.closePath();
}

function drawTriangle(context, p1, p2, p3) {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.closePath();
}

function paintBase(context, dimension, baseColor) {
  if (baseColor) {
    context.save();
    context.fillStyle = baseColor;
    context.fillRect(0, 0, dimension.width, dimension.height);
    context.restore();
  } else {
    clear(context, dimension);
  }
}
function clear(context, dimension) {
  context.clearRect(0, 0, dimension.width, dimension.height);
}
function drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, composite, colorLine, opacity, shadow) {
  let drawn = false;

  if (getDistance(begin, end) <= maxDistance) {
    drawLine(context, begin, end);
    drawn = true;
  } else if (warp) {
    let pi1;
    let pi2;
    const endNE = {
      x: end.x - canvasSize.width,
      y: end.y
    };
    const d1 = getDistances(begin, endNE);

    if (d1.distance <= maxDistance) {
      const yi = begin.y - d1.dy / d1.dx * begin.x;
      pi1 = {
        x: 0,
        y: yi
      };
      pi2 = {
        x: canvasSize.width,
        y: yi
      };
    } else {
      const endSW = {
        x: end.x,
        y: end.y - canvasSize.height
      };
      const d2 = getDistances(begin, endSW);

      if (d2.distance <= maxDistance) {
        const yi = begin.y - d2.dy / d2.dx * begin.x;
        const xi = -yi / (d2.dy / d2.dx);
        pi1 = {
          x: xi,
          y: 0
        };
        pi2 = {
          x: xi,
          y: canvasSize.height
        };
      } else {
        const endSE = {
          x: end.x - canvasSize.width,
          y: end.y - canvasSize.height
        };
        const d3 = getDistances(begin, endSE);

        if (d3.distance <= maxDistance) {
          const yi = begin.y - d3.dy / d3.dx * begin.x;
          const xi = -yi / (d3.dy / d3.dx);
          pi1 = {
            x: xi,
            y: yi
          };
          pi2 = {
            x: pi1.x + canvasSize.width,
            y: pi1.y + canvasSize.height
          };
        }
      }
    }

    if (pi1 && pi2) {
      drawLine(context, begin, pi1);
      drawLine(context, end, pi2);
      drawn = true;
    }
  }

  if (!drawn) {
    return;
  }

  context.lineWidth = width;

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  context.strokeStyle = getStyleFromRgb(colorLine, opacity);

  if (shadow.enable) {
    const shadowColor = colorToRgb(shadow.color);

    if (shadowColor) {
      context.shadowBlur = shadow.blur;
      context.shadowColor = getStyleFromRgb(shadowColor);
    }
  }

  context.stroke();
}
function drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle) {
  drawTriangle(context, pos1, pos2, pos3);

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);
  context.fill();
}
function drawConnectLine(context, width, lineStyle, begin, end) {
  context.save();
  drawLine(context, begin, end);
  context.lineWidth = width;
  context.strokeStyle = lineStyle;
  context.stroke();
  context.restore();
}
function gradient(context, p1, p2, opacity) {
  const gradStop = Math.floor(p2.getRadius() / p1.getRadius());
  const color1 = p1.getFillColor();
  const color2 = p2.getFillColor();

  if (!color1 || !color2) {
    return;
  }

  const sourcePos = p1.getPosition();
  const destPos = p2.getPosition();
  const midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius());
  const grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
  grad.addColorStop(0, getStyleFromHsl(color1, opacity));
  grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
  grad.addColorStop(1, getStyleFromHsl(color2, opacity));
  return grad;
}
function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  context.save();
  drawLine(context, begin, end);
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
  context.restore();
}
function drawLight(container, context, mousePos) {
  const lightOptions = container.options.interactivity.modes.light.area;
  context.beginPath();
  context.arc(mousePos.x, mousePos.y, lightOptions.radius, 0, 2 * Math.PI);
  const gradientAmbientLight = context.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, lightOptions.radius);
  const lightGradient = lightOptions.gradient;
  const gradientRgb = {
    start: colorToRgb(lightGradient.start),
    stop: colorToRgb(lightGradient.stop)
  };

  if (!gradientRgb.start || !gradientRgb.stop) {
    return;
  }

  gradientAmbientLight.addColorStop(0, getStyleFromRgb(gradientRgb.start));
  gradientAmbientLight.addColorStop(1, getStyleFromRgb(gradientRgb.stop));
  context.fillStyle = gradientAmbientLight;
  context.fill();
}
function drawParticleShadow(container, context, particle, mousePos) {
  const pos = particle.getPosition();
  const shadowOptions = container.options.interactivity.modes.light.shadow;
  context.save();
  const radius = particle.getRadius();
  const sides = particle.sides;
  const full = Math.PI * 2 / sides;
  const angle = -particle.rotate.value + Math.PI / 4;
  const factor = 1;
  const dots = [];

  for (let i = 0; i < sides; i++) {
    dots.push({
      x: pos.x + radius * Math.sin(angle + full * i) * factor,
      y: pos.y + radius * Math.cos(angle + full * i) * factor
    });
  }

  const points = [];
  const shadowLength = shadowOptions.length;

  for (const dot of dots) {
    const dotAngle = Math.atan2(mousePos.y - dot.y, mousePos.x - dot.x);
    const endX = dot.x + shadowLength * Math.sin(-dotAngle - Math.PI / 2);
    const endY = dot.y + shadowLength * Math.cos(-dotAngle - Math.PI / 2);
    points.push({
      endX: endX,
      endY: endY,
      startX: dot.x,
      startY: dot.y
    });
  }

  const shadowRgb = colorToRgb(shadowOptions.color);

  if (!shadowRgb) {
    return;
  }

  const shadowColor = getStyleFromRgb(shadowRgb);

  for (let i = points.length - 1; i >= 0; i--) {
    const n = i == points.length - 1 ? 0 : i + 1;
    context.beginPath();
    context.moveTo(points[i].startX, points[i].startY);
    context.lineTo(points[n].startX, points[n].startY);
    context.lineTo(points[n].endX, points[n].endY);
    context.lineTo(points[i].endX, points[i].endY);
    context.fillStyle = shadowColor;
    context.fill();
  }

  context.restore();
}
function drawParticle(container, context, particle, delta, fillColorValue, strokeColorValue, backgroundMask, composite, radius, opacity, shadow) {
  const pos = particle.getPosition();
  context.save();
  context.translate(pos.x, pos.y);
  context.beginPath();
  const angle = particle.rotate.value + (particle.options.rotate.path ? particle.velocity.angle : 0);

  if (angle !== 0) {
    context.rotate(angle);
  }

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  const shadowColor = particle.shadowColor;

  if (shadow.enable && shadowColor) {
    context.shadowBlur = shadow.blur;
    context.shadowColor = getStyleFromRgb(shadowColor);
    context.shadowOffsetX = shadow.offset.x;
    context.shadowOffsetY = shadow.offset.y;
  }

  if (fillColorValue) {
    context.fillStyle = fillColorValue;
  }

  const stroke = particle.stroke;
  context.lineWidth = particle.strokeWidth;

  if (strokeColorValue) {
    context.strokeStyle = strokeColorValue;
  }

  drawShape(container, context, particle, radius, opacity, delta);

  if (stroke.width > 0) {
    context.stroke();
  }

  if (particle.close) {
    context.closePath();
  }

  if (particle.fill) {
    context.fill();
  }

  context.restore();
  context.save();
  context.translate(pos.x, pos.y);

  if (angle !== 0) {
    context.rotate(angle);
  }

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
  context.restore();
}
function drawShape(container, context, particle, radius, opacity, delta) {
  if (!particle.shape) {
    return;
  }

  const drawer = container.drawers.get(particle.shape);

  if (!drawer) {
    return;
  }

  drawer.draw(context, particle, radius, opacity, delta.value, container.retina.pixelRatio);
}
function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
  if (!particle.shape) {
    return;
  }

  const drawer = container.drawers.get(particle.shape);

  if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
    return;
  }

  drawer.afterEffect(context, particle, radius, opacity, delta.value, container.retina.pixelRatio);
}
function drawPlugin(context, plugin, delta) {
  if (plugin.draw !== undefined) {
    context.save();
    plugin.draw(context, delta);
    context.restore();
  }
}
function drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end) {
  const pos = particle.getPosition();
  context.beginPath();

  if (fillColorValue) {
    context.strokeStyle = getStyleFromHsl(fillColorValue, opacity);
  }

  if (width === 0) {
    return;
  }

  context.lineWidth = width;
  const rotationRadian = deg2rad(rotation);
  context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
  context.stroke();
}
class CanvasUtils {
  static paintBase(context, dimension, baseColor) {
    paintBase(context, dimension, baseColor);
  }

  static clear(context, dimension) {
    clear(context, dimension);
  }

  static drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, composite, colorLine, opacity, shadow) {
    drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, composite, colorLine, opacity, shadow);
  }

  static drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle) {
    drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle);
  }

  static drawConnectLine(context, width, lineStyle, begin, end) {
    drawConnectLine(context, width, lineStyle, begin, end);
  }

  static gradient(context, p1, p2, opacity) {
    return gradient(context, p1, p2, opacity);
  }

  static drawGrabLine(context, width, begin, end, colorLine, opacity) {
    drawGrabLine(context, width, begin, end, colorLine, opacity);
  }

  static drawLight(container, context, mousePos) {
    drawLight(container, context, mousePos);
  }

  static drawParticleShadow(container, context, particle, mousePos) {
    drawParticleShadow(container, context, particle, mousePos);
  }

  static drawParticle(container, context, particle, delta, fillColorValue, strokeColorValue, backgroundMask, composite, radius, opacity, shadow) {
    drawParticle(container, context, particle, delta, fillColorValue, strokeColorValue, backgroundMask, composite, radius, opacity, shadow);
  }

  static drawShape(container, context, particle, radius, opacity, delta) {
    drawShape(container, context, particle, radius, opacity, delta);
  }

  static drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
    drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
  }

  static drawPlugin(context, plugin, delta) {
    drawPlugin(context, plugin, delta);
  }

  static drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end) {
    drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/Range.js
class Range {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y
    };
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/Circle.js

class Circle extends Range {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }

  contains(point) {
    const d = Math.pow(point.x - this.position.x, 2) + Math.pow(point.y - this.position.y, 2);
    return d <= Math.pow(this.radius, 2);
  }

  intersects(range) {
    const rect = range;
    const circle = range;
    const pos1 = this.position;
    const pos2 = range.position;
    const xDist = Math.abs(pos2.x - pos1.x);
    const yDist = Math.abs(pos2.y - pos1.y);
    const r = this.radius;

    if (circle.radius !== undefined) {
      const rSum = r + circle.radius;
      const dist = Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
      return rSum > dist;
    } else if (rect.size !== undefined) {
      const w = rect.size.width;
      const h = rect.size.height;
      const edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

      if (xDist > r + w || yDist > r + h) {
        return false;
      }

      if (xDist <= w || yDist <= h) {
        return true;
      }

      return edges <= Math.pow(r, 2);
    }

    return false;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/Rectangle.js

class Rectangle extends Range {
  constructor(x, y, width, height) {
    super(x, y);
    this.size = {
      height: height,
      width: width
    };
  }

  contains(point) {
    const w = this.size.width;
    const h = this.size.height;
    const pos = this.position;
    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
  }

  intersects(range) {
    const rect = range;
    const circle = range;
    const w = this.size.width;
    const h = this.size.height;
    const pos1 = this.position;
    const pos2 = range.position;

    if (circle.radius !== undefined) {
      return circle.intersects(this);
    } else if (rect.size !== undefined) {
      const size2 = rect.size;
      const w2 = size2.width;
      const h2 = size2.height;
      return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
    }

    return false;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/CircleWarp.js


class CircleWarp extends Circle {
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = {
      height: canvasSize.height,
      width: canvasSize.width
    };
  }

  contains(point) {
    if (super.contains(point)) {
      return true;
    }

    const posNE = {
      x: point.x - this.canvasSize.width,
      y: point.y
    };

    if (super.contains(posNE)) {
      return true;
    }

    const posSE = {
      x: point.x - this.canvasSize.width,
      y: point.y - this.canvasSize.height
    };

    if (super.contains(posSE)) {
      return true;
    }

    const posSW = {
      x: point.x,
      y: point.y - this.canvasSize.height
    };
    return super.contains(posSW);
  }

  intersects(range) {
    if (super.intersects(range)) {
      return true;
    }

    const rect = range;
    const circle = range;
    const newPos = {
      x: range.position.x - this.canvasSize.width,
      y: range.position.y - this.canvasSize.height
    };

    if (circle.radius !== undefined) {
      const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * 2);
      return super.intersects(biggerCircle);
    } else if (rect.size !== undefined) {
      const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
      return super.intersects(rectSW);
    }

    return false;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/EventListeners.js


let windowResizeTimer;

function manageListener(element, event, handler, add, options) {
  if (add) {
    let addOptions = {
      passive: true
    };

    if (typeof options === "boolean") {
      addOptions.capture = options;
    } else if (options !== undefined) {
      addOptions = options;
    }

    element.addEventListener(event, handler, addOptions);
  } else {
    const removeOptions = options;
    element.removeEventListener(event, handler, removeOptions);
  }
}

class EventListeners {
  constructor(container) {
    this.container = container;
    this.canPush = true;

    this.mouseMoveHandler = e => this.mouseTouchMove(e);

    this.touchStartHandler = e => this.mouseTouchMove(e);

    this.touchMoveHandler = e => this.mouseTouchMove(e);

    this.touchEndHandler = () => this.mouseTouchFinish();

    this.mouseLeaveHandler = () => this.mouseTouchFinish();

    this.touchCancelHandler = () => this.mouseTouchFinish();

    this.touchEndClickHandler = e => this.mouseTouchClick(e);

    this.mouseUpHandler = e => this.mouseTouchClick(e);

    this.mouseDownHandler = () => this.mouseDown();

    this.visibilityChangeHandler = () => this.handleVisibilityChange();

    this.resizeHandler = () => this.handleWindowResize();
  }

  addListeners() {
    this.manageListeners(true);
  }

  removeListeners() {
    this.manageListeners(false);
  }

  manageListeners(add) {
    var _a;

    const container = this.container;
    const options = container.options;
    const detectType = options.interactivity.detectsOn;
    let mouseLeaveEvent = Constants.mouseLeaveEvent;

    if (detectType === "window") {
      container.interactivity.element = window;
      mouseLeaveEvent = Constants.mouseOutEvent;
    } else if (detectType === "parent" && container.canvas.element) {
      const canvasEl = container.canvas.element;
      container.interactivity.element = (_a = canvasEl.parentElement) !== null && _a !== void 0 ? _a : canvasEl.parentNode;
    } else {
      container.interactivity.element = container.canvas.element;
    }

    const interactivityEl = container.interactivity.element;

    if (!interactivityEl) {
      return;
    }

    const html = interactivityEl;

    if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
      manageListener(interactivityEl, Constants.mouseMoveEvent, this.mouseMoveHandler, add);
      manageListener(interactivityEl, Constants.touchStartEvent, this.touchStartHandler, add);
      manageListener(interactivityEl, Constants.touchMoveEvent, this.touchMoveHandler, add);

      if (!options.interactivity.events.onClick.enable) {
        manageListener(interactivityEl, Constants.touchEndEvent, this.touchEndHandler, add);
      } else {
        manageListener(interactivityEl, Constants.touchEndEvent, this.touchEndClickHandler, add);
        manageListener(interactivityEl, Constants.mouseUpEvent, this.mouseUpHandler, add);
        manageListener(interactivityEl, Constants.mouseDownEvent, this.mouseDownHandler, add);
      }

      manageListener(interactivityEl, mouseLeaveEvent, this.mouseLeaveHandler, add);
      manageListener(interactivityEl, Constants.touchCancelEvent, this.touchCancelHandler, add);
    }

    if (container.canvas.element) {
      container.canvas.element.style.pointerEvents = html === container.canvas.element ? "initial" : "none";
    }

    if (options.interactivity.events.resize) {
      manageListener(window, Constants.resizeEvent, this.resizeHandler, add);
    }

    if (document) {
      manageListener(document, Constants.visibilityChangeEvent, this.visibilityChangeHandler, add, false);
    }
  }

  handleWindowResize() {
    windowResizeTimer = setTimeout(() => {
      var _a;

      if (windowResizeTimer) {
        clearTimeout(windowResizeTimer);
      }

      (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize();
    }, 500);
  }

  handleVisibilityChange() {
    const container = this.container;
    const options = container.options;
    this.mouseTouchFinish();

    if (!options.pauseOnBlur) {
      return;
    }

    if (document === null || document === void 0 ? void 0 : document.hidden) {
      container.pageHidden = true;
      container.pause();
    } else {
      container.pageHidden = false;

      if (container.getAnimationStatus()) {
        container.play(true);
      } else {
        container.draw();
      }
    }
  }

  mouseDown() {
    const interactivity = this.container.interactivity;

    if (interactivity) {
      const mouse = interactivity.mouse;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    }
  }

  mouseTouchMove(e) {
    var _a, _b, _c, _d, _e, _f, _g;

    const container = this.container;
    const options = container.options;

    if (((_a = container.interactivity) === null || _a === void 0 ? void 0 : _a.element) === undefined) {
      return;
    }

    container.interactivity.mouse.inside = true;
    let pos;
    const canvas = container.canvas.element;

    if (e.type.startsWith("mouse")) {
      this.canPush = true;
      const mouseEvent = e;

      if (container.interactivity.element === window) {
        if (canvas) {
          const clientRect = canvas.getBoundingClientRect();
          pos = {
            x: mouseEvent.clientX - clientRect.left,
            y: mouseEvent.clientY - clientRect.top
          };
        }
      } else if (options.interactivity.detectsOn === "parent") {
        const source = mouseEvent.target;
        const target = mouseEvent.currentTarget;
        const canvasEl = container.canvas.element;

        if (source && target && canvasEl) {
          const sourceRect = source.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();
          const canvasRect = canvasEl.getBoundingClientRect();
          pos = {
            x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
            y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top)
          };
        } else {
          pos = {
            x: (_b = mouseEvent.offsetX) !== null && _b !== void 0 ? _b : mouseEvent.clientX,
            y: (_c = mouseEvent.offsetY) !== null && _c !== void 0 ? _c : mouseEvent.clientY
          };
        }
      } else {
        if (mouseEvent.target === container.canvas.element) {
          pos = {
            x: (_d = mouseEvent.offsetX) !== null && _d !== void 0 ? _d : mouseEvent.clientX,
            y: (_e = mouseEvent.offsetY) !== null && _e !== void 0 ? _e : mouseEvent.clientY
          };
        }
      }
    } else {
      this.canPush = e.type !== "touchmove";
      const touchEvent = e;
      const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
      const canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
      pos = {
        x: lastTouch.clientX - ((_f = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _f !== void 0 ? _f : 0),
        y: lastTouch.clientY - ((_g = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _g !== void 0 ? _g : 0)
      };
    }

    const pxRatio = container.retina.pixelRatio;

    if (pos) {
      pos.x *= pxRatio;
      pos.y *= pxRatio;
    }

    container.interactivity.mouse.position = pos;
    container.interactivity.status = Constants.mouseMoveEvent;
  }

  mouseTouchFinish() {
    const interactivity = this.container.interactivity;

    if (interactivity === undefined) {
      return;
    }

    const mouse = interactivity.mouse;
    delete mouse.position;
    delete mouse.clickPosition;
    delete mouse.downPosition;
    interactivity.status = Constants.mouseLeaveEvent;
    mouse.inside = false;
    mouse.clicking = false;
  }

  mouseTouchClick(e) {
    const container = this.container;
    const options = container.options;
    const mouse = container.interactivity.mouse;
    mouse.inside = true;
    let handled = false;
    const mousePosition = mouse.position;

    if (mousePosition === undefined || !options.interactivity.events.onClick.enable) {
      return;
    }

    for (const [, plugin] of container.plugins) {
      if (plugin.clickPositionValid !== undefined) {
        handled = plugin.clickPositionValid(mousePosition);

        if (handled) {
          break;
        }
      }
    }

    if (!handled) {
      this.doMouseTouchClick(e);
    }

    mouse.clicking = false;
  }

  doMouseTouchClick(e) {
    const container = this.container;
    const options = container.options;

    if (this.canPush) {
      const mousePos = container.interactivity.mouse.position;

      if (mousePos) {
        container.interactivity.mouse.clickPosition = {
          x: mousePos.x,
          y: mousePos.y
        };
      } else {
        return;
      }

      container.interactivity.mouse.clickTime = new Date().getTime();
      const onClick = options.interactivity.events.onClick;

      if (onClick.mode instanceof Array) {
        for (const mode of onClick.mode) {
          this.handleClickMode(mode);
        }
      } else {
        this.handleClickMode(onClick.mode);
      }
    }

    if (e.type === "touchend") {
      setTimeout(() => this.mouseTouchFinish(), 500);
    }
  }

  handleClickMode(mode) {
    const container = this.container;
    const options = container.options;
    const pushOptions = options.interactivity.modes.push;
    const removeOptions = options.interactivity.modes.remove;

    switch (mode) {
      case "push":
        {
          const pushNb = pushOptions.quantity;

          if (pushNb > 0) {
            const group = itemFromArray([undefined, ...pushOptions.groups]);
            const groupOptions = group !== undefined ? container.options.particles.groups[group] : undefined;
            container.particles.push(pushNb, container.interactivity.mouse, groupOptions, group);
          }

          break;
        }

      case "remove":
        {
          const removeNb = removeOptions.quantity;

          if (removeNb > 0) {
            const group = itemFromArray([undefined, ...pushOptions.groups]);
            container.particles.removeQuantity(removeNb, group);
          }

          break;
        }

      case "bubble":
        container.bubble.clicking = true;
        break;

      case "repulse":
        container.repulse.clicking = true;
        container.repulse.count = 0;

        for (const particle of container.repulse.particles) {
          particle.velocity.setTo(particle.initialVelocity);
        }

        container.repulse.particles = [];
        container.repulse.finish = false;
        setTimeout(() => {
          if (!container.destroyed) {
            container.repulse.clicking = false;
          }
        }, options.interactivity.modes.repulse.duration * 1000);
        break;

      case "attract":
        container.attract.clicking = true;
        container.attract.count = 0;

        for (const particle of container.attract.particles) {
          particle.velocity.setTo(particle.initialVelocity);
        }

        container.attract.particles = [];
        container.attract.finish = false;
        setTimeout(() => {
          if (!container.destroyed) {
            container.attract.clicking = false;
          }
        }, options.interactivity.modes.attract.duration * 1000);
        break;

      case "pause":
        if (container.getAnimationStatus()) {
          container.pause();
        } else {
          container.play();
        }

        break;
    }

    for (const [, plugin] of container.plugins) {
      if (plugin.handleClickMode) {
        plugin.handleClickMode(mode);
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/Plugins.js
const plugins = [];
const interactorsInitializers = [];
const updatersInitializers = [];
const interactors = new Map();
const updaters = new Map();
const presets = new Map();
const drawers = new Map();
const noiseGenerators = new Map();
class Plugins {
  static getPlugin(plugin) {
    return plugins.find(t => t.id === plugin);
  }

  static addPlugin(plugin) {
    if (!Plugins.getPlugin(plugin.id)) {
      plugins.push(plugin);
    }
  }

  static getAvailablePlugins(container) {
    const res = new Map();

    for (const plugin of plugins) {
      if (!plugin.needsPlugin(container.options)) {
        continue;
      }

      res.set(plugin.id, plugin.getPlugin(container));
    }

    return res;
  }

  static loadOptions(options, sourceOptions) {
    for (const plugin of plugins) {
      plugin.loadOptions(options, sourceOptions);
    }
  }

  static getPreset(preset) {
    return presets.get(preset);
  }

  static addPreset(presetKey, options) {
    if (!Plugins.getPreset(presetKey)) {
      presets.set(presetKey, options);
    }
  }

  static addShapeDrawer(type, drawer) {
    if (!Plugins.getShapeDrawer(type)) {
      drawers.set(type, drawer);
    }
  }

  static getShapeDrawer(type) {
    return drawers.get(type);
  }

  static getSupportedShapes() {
    return drawers.keys();
  }

  static getNoiseGenerator(type) {
    return noiseGenerators.get(type);
  }

  static addNoiseGenerator(type, noiseGenerator) {
    if (!Plugins.getNoiseGenerator(type)) {
      noiseGenerators.set(type, noiseGenerator);
    }
  }

  static getInteractors(container) {
    let res = interactors.get(container);

    if (!res) {
      res = interactorsInitializers.map(t => t(container));
      interactors.set(container, res);
    }

    return res;
  }

  static addInteractor(initInteractor) {
    interactorsInitializers.push(initInteractor);
  }

  static getUpdaters(container) {
    let res = updaters.get(container);

    if (!res) {
      res = updatersInitializers.map(t => t(container));
      updaters.set(container, res);
    }

    return res;
  }

  static addParticleUpdater(initUpdater) {
    updatersInitializers.push(initUpdater);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/Point.js
class Point {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/QuadTree.js



class QuadTree {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  subdivide() {
    const x = this.rectangle.position.x;
    const y = this.rectangle.position.y;
    const w = this.rectangle.size.width;
    const h = this.rectangle.size.height;
    const capacity = this.capacity;
    this.northEast = new QuadTree(new Rectangle(x, y, w / 2, h / 2), capacity);
    this.northWest = new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
    this.southEast = new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
    this.southWest = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
    this.divided = true;
  }

  insert(point) {
    var _a, _b, _c, _d, _e;

    if (!this.rectangle.contains(point.position)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (_e = ((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) || ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) || ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) || ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point))) !== null && _e !== void 0 ? _e : false;
  }

  queryCircle(position, radius) {
    return this.query(new Circle(position.x, position.y, radius));
  }

  queryCircleWarp(position, radius, containerOrSize) {
    const container = containerOrSize;
    const size = containerOrSize;
    return this.query(new CircleWarp(position.x, position.y, radius, container.canvas !== undefined ? container.canvas.size : size));
  }

  queryRectangle(position, size) {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height));
  }

  query(range, found) {
    var _a, _b, _c, _d;

    const res = found !== null && found !== void 0 ? found : [];

    if (!range.intersects(this.rectangle)) {
      return [];
    } else {
      for (const p of this.points) {
        if (!range.contains(p.position)) {
          continue;
        }

        res.push(p.particle);
      }

      if (this.divided) {
        (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, res);
        (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, res);
        (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, res);
        (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, res);
      }
    }

    return res;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/index.js













;// CONCATENATED MODULE: ./dist/browser/ShapeDrawers/TextDrawer.js
var TextDrawer_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


class TextDrawer {
  getSidesCount() {
    return 12;
  }

  init(container) {
    var _a;

    return TextDrawer_awaiter(this, void 0, void 0, function* () {
      const options = container.options;

      if (isInArray("char", options.particles.shape.type) || isInArray("character", options.particles.shape.type)) {
        const shapeOptions = (_a = options.particles.shape.options["character"]) !== null && _a !== void 0 ? _a : options.particles.shape.options["char"];

        if (shapeOptions instanceof Array) {
          const promises = [];

          for (const character of shapeOptions) {
            promises.push(loadFont(character));
          }

          yield Promise.allSettled(promises);
        } else {
          if (shapeOptions !== undefined) {
            yield loadFont(shapeOptions);
          }
        }
      }
    });
  }

  draw(context, particle, radius) {
    var _a, _b, _c;

    const character = particle.shapeData;

    if (character === undefined) {
      return;
    }

    const textData = character.value;

    if (textData === undefined) {
      return;
    }

    const textParticle = particle;

    if (textParticle.text === undefined) {
      textParticle.text = textData instanceof Array ? itemFromArray(textData, particle.randomIndexData) : textData;
    }

    const text = textParticle.text;
    const style = (_a = character.style) !== null && _a !== void 0 ? _a : "";
    const weight = (_b = character.weight) !== null && _b !== void 0 ? _b : "";
    const size = Math.round(radius) * 2;
    const font = (_c = character.font) !== null && _c !== void 0 ? _c : "";
    const fill = particle.fill;
    const offsetX = text.length * radius / 2;
    context.font = `${style} ${weight} ${size}px "${font}"`;
    const pos = {
      x: -offsetX,
      y: radius / 2
    };

    if (fill) {
      context.fillText(text, pos.x, pos.y);
    } else {
      context.strokeText(text, pos.x, pos.y);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/ShapeDrawers/ImageDrawer.js
var ImageDrawer_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


class ImageDrawer {
  constructor() {
    this.images = [];
  }

  getSidesCount() {
    return 12;
  }

  getImages(container) {
    const containerImages = this.images.filter(t => t.id === container.id);

    if (!containerImages.length) {
      this.images.push({
        id: container.id,
        images: []
      });
      return this.getImages(container);
    } else {
      return containerImages[0];
    }
  }

  addImage(container, image) {
    const containerImages = this.getImages(container);
    containerImages === null || containerImages === void 0 ? void 0 : containerImages.images.push(image);
  }

  init(container) {
    var _a;

    return ImageDrawer_awaiter(this, void 0, void 0, function* () {
      const options = container.options;
      const shapeOptions = options.particles.shape;

      if (!isInArray("image", shapeOptions.type) && !isInArray("images", shapeOptions.type)) {
        return;
      }

      const imageOptions = (_a = shapeOptions.options["images"]) !== null && _a !== void 0 ? _a : shapeOptions.options["image"];

      if (imageOptions instanceof Array) {
        const promises = [];

        for (const optionsImage of imageOptions) {
          promises.push(this.loadImageShape(container, optionsImage));
        }

        yield Promise.allSettled(promises);
      } else {
        yield this.loadImageShape(container, imageOptions);
      }
    });
  }

  destroy() {
    this.images = [];
  }

  loadImageShape(container, imageShape) {
    return ImageDrawer_awaiter(this, void 0, void 0, function* () {
      try {
        const imagePromise = imageShape.replaceColor ? downloadSvgImage(imageShape.src) : loadImage(imageShape.src);
        const image = yield imagePromise;

        if (image) {
          this.addImage(container, image);
        }
      } catch (_a) {
        console.warn(`tsParticles error - ${imageShape.src} not found`);
      }
    });
  }

  draw(context, particle, radius, opacity) {
    var _a, _b;

    if (!context) {
      return;
    }

    const image = particle.image;
    const element = (_a = image === null || image === void 0 ? void 0 : image.data) === null || _a === void 0 ? void 0 : _a.element;

    if (!element) {
      return;
    }

    const ratio = (_b = image === null || image === void 0 ? void 0 : image.ratio) !== null && _b !== void 0 ? _b : 1;
    const pos = {
      x: -radius,
      y: -radius
    };

    if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
      context.globalAlpha = opacity;
    }

    context.drawImage(element, pos.x, pos.y, radius * 2, radius * 2 / ratio);

    if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
      context.globalAlpha = 1;
    }
  }

  loadShape(particle) {
    var _a, _b, _c, _d, _e;

    if (!(particle.shape === "image" || particle.shape === "images")) {
      return;
    }

    const container = particle.container;
    const images = this.getImages(container).images;
    const imageData = particle.shapeData;
    const image = (_a = images.find(t => t.source === imageData.src)) !== null && _a !== void 0 ? _a : images[0];
    const color = particle.getFillColor();
    let imageRes;

    if (!image) {
      return;
    }

    if (image.svgData !== undefined && imageData.replaceColor && color) {
      const svgColoredData = replaceColorSvg(image, color, particle.opacity.value);
      const svg = new Blob([svgColoredData], {
        type: "image/svg+xml"
      });
      const domUrl = URL || window.URL || window.webkitURL || window;
      const url = domUrl.createObjectURL(svg);
      const img = new Image();
      imageRes = {
        data: image,
        ratio: imageData.width / imageData.height,
        replaceColor: (_b = imageData.replaceColor) !== null && _b !== void 0 ? _b : imageData.replace_color,
        source: imageData.src
      };
      img.addEventListener("load", () => {
        const pImage = particle.image;

        if (pImage) {
          pImage.loaded = true;
          image.element = img;
        }

        domUrl.revokeObjectURL(url);
      });
      img.addEventListener("error", () => {
        domUrl.revokeObjectURL(url);
        loadImage(imageData.src).then(img2 => {
          const pImage = particle.image;

          if (pImage) {
            image.element = img2 === null || img2 === void 0 ? void 0 : img2.element;
            pImage.loaded = true;
          }
        });
      });
      img.src = url;
    } else {
      imageRes = {
        data: image,
        loaded: true,
        ratio: imageData.width / imageData.height,
        replaceColor: (_c = imageData.replaceColor) !== null && _c !== void 0 ? _c : imageData.replace_color,
        source: imageData.src
      };
    }

    if (!imageRes.ratio) {
      imageRes.ratio = 1;
    }

    const fill = (_d = imageData.fill) !== null && _d !== void 0 ? _d : particle.fill;
    const close = (_e = imageData.close) !== null && _e !== void 0 ? _e : particle.close;
    const imageShape = {
      image: imageRes,
      fill,
      close
    };
    particle.image = imageShape.image;
    particle.fill = imageShape.fill;
    particle.close = imageShape.close;
  }

}
;// CONCATENATED MODULE: ./dist/browser/ShapeDrawers/LineDrawer.js
class LineDrawer {
  getSidesCount() {
    return 1;
  }

  draw(context, particle, radius) {
    context.moveTo(0, -radius / 2);
    context.lineTo(0, radius / 2);
  }

}
;// CONCATENATED MODULE: ./dist/browser/ShapeDrawers/CircleDrawer.js
class CircleDrawer {
  getSidesCount() {
    return 12;
  }

  draw(context, particle, radius) {
    context.arc(0, 0, radius, 0, Math.PI * 2, false);
  }

}
;// CONCATENATED MODULE: ./dist/browser/ShapeDrawers/PolygonDrawerBase.js

class PolygonDrawerBase {
  getSidesCount(particle) {
    var _a, _b;

    const polygon = particle.shapeData;
    return (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
  }

  draw(context, particle, radius) {
    const start = this.getCenter(particle, radius);
    const side = this.getSidesData(particle, radius);
    const sideCount = side.count.numerator * side.count.denominator;
    const decimalSides = side.count.numerator / side.count.denominator;
    const interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides;
    const interiorAngle = Math.PI - deg2rad(interiorAngleDegrees);

    if (!context) {
      return;
    }

    context.beginPath();
    context.translate(start.x, start.y);
    context.moveTo(0, 0);

    for (let i = 0; i < sideCount; i++) {
      context.lineTo(side.length, 0);
      context.translate(side.length, 0);
      context.rotate(interiorAngle);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/ShapeDrawers/TriangleDrawer.js

class TriangleDrawer extends PolygonDrawerBase {
  getSidesCount() {
    return 3;
  }

  getSidesData(particle, radius) {
    return {
      count: {
        denominator: 2,
        numerator: 3
      },
      length: radius * 2
    };
  }

  getCenter(particle, radius) {
    return {
      x: -radius,
      y: radius / 1.66
    };
  }

}
;// CONCATENATED MODULE: ./dist/browser/ShapeDrawers/StarDrawer.js
class StarDrawer {
  getSidesCount(particle) {
    var _a, _b;

    const star = particle.shapeData;
    return (_b = (_a = star === null || star === void 0 ? void 0 : star.sides) !== null && _a !== void 0 ? _a : star === null || star === void 0 ? void 0 : star.nb_sides) !== null && _b !== void 0 ? _b : 5;
  }

  draw(context, particle, radius) {
    var _a;

    const star = particle.shapeData;
    const sides = this.getSidesCount(particle);
    const inset = (_a = star === null || star === void 0 ? void 0 : star.inset) !== null && _a !== void 0 ? _a : 2;
    context.moveTo(0, 0 - radius);

    for (let i = 0; i < sides; i++) {
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius * inset);
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/ShapeDrawers/PolygonDrawer.js

class PolygonDrawer extends PolygonDrawerBase {
  getSidesData(particle, radius) {
    var _a, _b;

    const polygon = particle.shapeData;
    const sides = (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
    return {
      count: {
        denominator: 1,
        numerator: sides
      },
      length: radius * 2.66 / (sides / 3)
    };
  }

  getCenter(particle, radius) {
    const sides = this.getSidesCount(particle);
    return {
      x: -radius / (sides / 3.5),
      y: -radius / (2.66 / 3.5)
    };
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/External/ExternalBase.js
class ExternalBase {
  constructor(container, subName) {
    this.container = container;
    this.type = 0;
    this.name = `external${subName}`;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/External/Bouncer.js



class Bouncer extends ExternalBase {
  constructor(container) {
    super(container, "bouncer");
  }

  isEnabled() {
    const container = this.container;
    const options = container.options;
    const mouse = container.interactivity.mouse;
    const events = options.interactivity.events;
    const divs = events.onDiv;
    return mouse.position && events.onHover.enable && isInArray("bounce", events.onHover.mode) || isDivModeEnabled("bounce", divs);
  }

  interact() {
    const container = this.container;
    const options = container.options;
    const events = options.interactivity.events;
    const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
    const hoverEnabled = events.onHover.enable;
    const hoverMode = events.onHover.mode;
    const divs = events.onDiv;

    if (mouseMoveStatus && hoverEnabled && isInArray("bounce", hoverMode)) {
      this.processMouseBounce();
    } else {
      divModeExecute("bounce", divs, (selector, div) => this.singleSelectorBounce(selector, div));
    }
  }

  reset() {}

  processMouseBounce() {
    const container = this.container;
    const pxRatio = container.retina.pixelRatio;
    const tolerance = 10 * pxRatio;
    const mousePos = container.interactivity.mouse.position;
    const radius = container.retina.bounceModeDistance;

    if (mousePos) {
      this.processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
    }
  }

  singleSelectorBounce(selector, div) {
    const container = this.container;
    const query = document.querySelectorAll(selector);

    if (!query.length) {
      return;
    }

    query.forEach(item => {
      const elem = item;
      const pxRatio = container.retina.pixelRatio;
      const pos = {
        x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
        y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
      };
      const radius = elem.offsetWidth / 2 * pxRatio;
      const tolerance = 10 * pxRatio;
      const area = div.type === "circle" ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
      this.processBounce(pos, radius, area);
    });
  }

  processBounce(position, radius, area) {
    const query = this.container.particles.quadTree.query(area);

    for (const particle of query) {
      if (area instanceof Circle) {
        circleBounce(circleBounceDataFromParticle(particle), {
          position,
          radius,
          velocity: new Vector(0, 0),
          factor: new Vector(0, 0)
        });
      } else if (area instanceof Rectangle) {
        rectBounce(particle, calculateBounds(position, radius));
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/External/Bubbler.js



function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
  if (modeValue > optionsValue) {
    const size = particleValue + (modeValue - optionsValue) * ratio;
    return clamp(size, particleValue, modeValue);
  } else if (modeValue < optionsValue) {
    const size = particleValue - (optionsValue - modeValue) * ratio;
    return clamp(size, modeValue, particleValue);
  }
}

class Bubbler extends ExternalBase {
  constructor(container) {
    super(container, "bubbler");
  }

  isEnabled() {
    const container = this.container;
    const options = container.options;
    const mouse = container.interactivity.mouse;
    const events = options.interactivity.events;
    const divs = events.onDiv;
    const divBubble = isDivModeEnabled("bubble", divs);

    if (!(divBubble || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    const clickMode = events.onClick.mode;
    return isInArray("bubble", hoverMode) || isInArray("bubble", clickMode) || divBubble;
  }

  reset(particle, force) {
    if (!particle.bubble.inRange || force) {
      delete particle.bubble.div;
      delete particle.bubble.opacity;
      delete particle.bubble.radius;
      delete particle.bubble.color;
    }
  }

  interact() {
    const options = this.container.options;
    const events = options.interactivity.events;
    const onHover = events.onHover;
    const onClick = events.onClick;
    const hoverEnabled = onHover.enable;
    const hoverMode = onHover.mode;
    const clickEnabled = onClick.enable;
    const clickMode = onClick.mode;
    const divs = events.onDiv;

    if (hoverEnabled && isInArray("bubble", hoverMode)) {
      this.hoverBubble();
    } else if (clickEnabled && isInArray("bubble", clickMode)) {
      this.clickBubble();
    } else {
      divModeExecute("bubble", divs, (selector, div) => this.singleSelectorHover(selector, div));
    }
  }

  singleSelectorHover(selector, div) {
    const container = this.container;
    const selectors = document.querySelectorAll(selector);

    if (!selectors.length) {
      return;
    }

    selectors.forEach(item => {
      const elem = item;
      const pxRatio = container.retina.pixelRatio;
      const pos = {
        x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
        y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
      };
      const repulseRadius = elem.offsetWidth / 2 * pxRatio;
      const area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio);
      const query = container.particles.quadTree.query(area);

      for (const particle of query) {
        if (!area.contains(particle.getPosition())) {
          continue;
        }

        particle.bubble.inRange = true;
        const divs = container.options.interactivity.modes.bubble.divs;
        const divBubble = divMode(divs, elem);

        if (!particle.bubble.div || particle.bubble.div !== elem) {
          this.reset(particle, true);
          particle.bubble.div = elem;
        }

        this.hoverBubbleSize(particle, 1, divBubble);
        this.hoverBubbleOpacity(particle, 1, divBubble);
        this.hoverBubbleColor(particle, divBubble);
      }
    });
  }

  process(particle, distMouse, timeSpent, data) {
    const container = this.container;
    const bubbleParam = data.bubbleObj.optValue;

    if (bubbleParam === undefined) {
      return;
    }

    const options = container.options;
    const bubbleDuration = options.interactivity.modes.bubble.duration;
    const bubbleDistance = container.retina.bubbleModeDistance;
    const particlesParam = data.particlesObj.optValue;
    const pObjBubble = data.bubbleObj.value;
    const pObj = data.particlesObj.value || 0;
    const type = data.type;

    if (bubbleParam !== particlesParam) {
      if (!container.bubble.durationEnd) {
        if (distMouse <= bubbleDistance) {
          const obj = pObjBubble !== null && pObjBubble !== void 0 ? pObjBubble : pObj;

          if (obj !== bubbleParam) {
            const value = pObj - timeSpent * (pObj - bubbleParam) / bubbleDuration;

            if (type === "size") {
              particle.bubble.radius = value;
            }

            if (type === "opacity") {
              particle.bubble.opacity = value;
            }
          }
        } else {
          if (type === "size") {
            delete particle.bubble.radius;
          }

          if (type === "opacity") {
            delete particle.bubble.opacity;
          }
        }
      } else if (pObjBubble) {
        if (type === "size") {
          delete particle.bubble.radius;
        }

        if (type === "opacity") {
          delete particle.bubble.opacity;
        }
      }
    }
  }

  clickBubble() {
    const container = this.container;
    const options = container.options;
    const mouseClickPos = container.interactivity.mouse.clickPosition;

    if (mouseClickPos === undefined) {
      return;
    }

    const distance = container.retina.bubbleModeDistance;
    const query = container.particles.quadTree.queryCircle(mouseClickPos, distance);

    for (const particle of query) {
      if (!container.bubble.clicking) {
        continue;
      }

      particle.bubble.inRange = !container.bubble.durationEnd;
      const pos = particle.getPosition();
      const distMouse = getDistance(pos, mouseClickPos);
      const timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;

      if (timeSpent > options.interactivity.modes.bubble.duration) {
        container.bubble.durationEnd = true;
      }

      if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
        container.bubble.clicking = false;
        container.bubble.durationEnd = false;
      }

      const sizeValue = particle.options.size.value;
      const sizeMaxValue = (typeof sizeValue === "number" ? sizeValue : sizeValue.max) * container.retina.pixelRatio;
      const sizeData = {
        bubbleObj: {
          optValue: container.retina.bubbleModeSize,
          value: particle.bubble.radius
        },
        particlesObj: {
          optValue: sizeMaxValue,
          value: particle.size.value
        },
        type: "size"
      };
      this.process(particle, distMouse, timeSpent, sizeData);
      const opacityValue = particle.options.opacity.value;
      const opacityMaxValue = (typeof opacityValue === "number" ? opacityValue : opacityValue.max) * container.retina.pixelRatio;
      const opacityData = {
        bubbleObj: {
          optValue: options.interactivity.modes.bubble.opacity,
          value: particle.bubble.opacity
        },
        particlesObj: {
          optValue: opacityMaxValue,
          value: particle.opacity.value
        },
        type: "opacity"
      };
      this.process(particle, distMouse, timeSpent, opacityData);

      if (!container.bubble.durationEnd) {
        if (distMouse <= container.retina.bubbleModeDistance) {
          this.hoverBubbleColor(particle);
        } else {
          delete particle.bubble.color;
        }
      } else {
        delete particle.bubble.color;
      }
    }
  }

  hoverBubble() {
    const container = this.container;
    const mousePos = container.interactivity.mouse.position;

    if (mousePos === undefined) {
      return;
    }

    const distance = container.retina.bubbleModeDistance;
    const query = container.particles.quadTree.queryCircle(mousePos, distance);

    for (const particle of query) {
      particle.bubble.inRange = true;
      const pos = particle.getPosition();
      const pointDistance = getDistance(pos, mousePos);
      const ratio = 1 - pointDistance / distance;

      if (pointDistance <= distance) {
        if (ratio >= 0 && container.interactivity.status === Constants.mouseMoveEvent) {
          this.hoverBubbleSize(particle, ratio);
          this.hoverBubbleOpacity(particle, ratio);
          this.hoverBubbleColor(particle);
        }
      } else {
        this.reset(particle);
      }

      if (container.interactivity.status === Constants.mouseLeaveEvent) {
        this.reset(particle);
      }
    }
  }

  hoverBubbleSize(particle, ratio, divBubble) {
    const container = this.container;
    const modeSize = (divBubble === null || divBubble === void 0 ? void 0 : divBubble.size) ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;

    if (modeSize === undefined) {
      return;
    }

    const sizeValue = particle.options.size.value;
    const sizeMaxValue = (typeof sizeValue === "number" ? sizeValue : sizeValue.max) * container.retina.pixelRatio;
    const pSize = particle.size.value;
    const size = calculateBubbleValue(pSize, modeSize, sizeMaxValue, ratio);

    if (size !== undefined) {
      particle.bubble.radius = size;
    }
  }

  hoverBubbleOpacity(particle, ratio, divBubble) {
    var _a;

    const container = this.container;
    const options = container.options;
    const modeOpacity = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.opacity) !== null && _a !== void 0 ? _a : options.interactivity.modes.bubble.opacity;

    if (modeOpacity === undefined) {
      return;
    }

    const opacityValue = particle.options.opacity.value;
    const opacityMaxValue = (typeof opacityValue === "number" ? opacityValue : opacityValue.max) * container.retina.pixelRatio;
    const pOpacity = particle.opacity.value;
    const opacity = calculateBubbleValue(pOpacity, modeOpacity, opacityMaxValue, ratio);

    if (opacity !== undefined) {
      particle.bubble.opacity = opacity;
    }
  }

  hoverBubbleColor(particle, divBubble) {
    var _a;

    const options = this.container.options;

    if (particle.bubble.color === undefined) {
      const modeColor = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.color) !== null && _a !== void 0 ? _a : options.interactivity.modes.bubble.color;

      if (modeColor === undefined) {
        return;
      }

      const bubbleColor = modeColor instanceof Array ? itemFromArray(modeColor) : modeColor;
      particle.bubble.color = colorToHsl(bubbleColor);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/External/Connector.js


class Connector extends ExternalBase {
  constructor(container) {
    super(container, "connector");
  }

  isEnabled() {
    const container = this.container;
    const mouse = container.interactivity.mouse;
    const events = container.options.interactivity.events;

    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    return isInArray("connect", hoverMode);
  }

  reset() {}

  interact() {
    const container = this.container;
    const options = container.options;

    if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
      const mousePos = container.interactivity.mouse.position;

      if (!mousePos) {
        return;
      }

      const distance = Math.abs(container.retina.connectModeRadius);
      const query = container.particles.quadTree.queryCircle(mousePos, distance);
      let i = 0;

      for (const p1 of query) {
        const pos1 = p1.getPosition();

        for (const p2 of query.slice(i + 1)) {
          const pos2 = p2.getPosition();
          const distMax = Math.abs(container.retina.connectModeDistance);
          const xDiff = Math.abs(pos1.x - pos2.x);
          const yDiff = Math.abs(pos1.y - pos2.y);

          if (xDiff < distMax && yDiff < distMax) {
            container.canvas.drawConnectLine(p1, p2);
          }
        }

        ++i;
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/External/Grabber.js


class Grabber extends ExternalBase {
  constructor(container) {
    super(container, "grabber");
  }

  isEnabled() {
    const container = this.container;
    const mouse = container.interactivity.mouse;
    const events = container.options.interactivity.events;

    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    return isInArray("grab", hoverMode);
  }

  reset() {}

  interact() {
    var _a;

    const container = this.container;
    const options = container.options;
    const interactivity = options.interactivity;

    if (interactivity.events.onHover.enable && container.interactivity.status === Constants.mouseMoveEvent) {
      const mousePos = container.interactivity.mouse.position;

      if (mousePos === undefined) {
        return;
      }

      const distance = container.retina.grabModeDistance;
      const query = container.particles.quadTree.queryCircle(mousePos, distance);

      for (const particle of query) {
        const pos = particle.getPosition();
        const pointDistance = getDistance(pos, mousePos);

        if (pointDistance <= distance) {
          const grabLineOptions = interactivity.modes.grab.links;
          const lineOpacity = grabLineOptions.opacity;
          const opacityLine = lineOpacity - pointDistance * lineOpacity / distance;

          if (opacityLine > 0) {
            const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : particle.options.links.color;

            if (!container.particles.grabLineColor) {
              const linksOptions = container.options.interactivity.modes.grab.links;
              container.particles.grabLineColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
            }

            const colorLine = getLinkColor(particle, undefined, container.particles.grabLineColor);

            if (colorLine === undefined) {
              return;
            }

            container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
          }
        }
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/External/Attractor.js


class Attractor extends ExternalBase {
  constructor(container) {
    super(container, "attractor");
  }

  isEnabled() {
    const container = this.container;
    const options = container.options;
    const mouse = container.interactivity.mouse;
    const events = options.interactivity.events;

    if (!(events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    const clickMode = events.onClick.mode;
    return isInArray("attract", hoverMode) || isInArray("attract", clickMode);
  }

  reset() {}

  interact() {
    const container = this.container;
    const options = container.options;
    const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
    const events = options.interactivity.events;
    const hoverEnabled = events.onHover.enable;
    const hoverMode = events.onHover.mode;
    const clickEnabled = events.onClick.enable;
    const clickMode = events.onClick.mode;

    if (mouseMoveStatus && hoverEnabled && isInArray("attract", hoverMode)) {
      this.hoverAttract();
    } else if (clickEnabled && isInArray("attract", clickMode)) {
      this.clickAttract();
    }
  }

  hoverAttract() {
    const container = this.container;
    const mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const attractRadius = container.retina.attractModeDistance;
    this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
  }

  processAttract(position, attractRadius, area) {
    const container = this.container;
    const attractOptions = container.options.interactivity.modes.attract;
    const query = container.particles.quadTree.query(area);

    for (const particle of query) {
      const {
        dx,
        dy,
        distance
      } = getDistances(particle.position, position);
      const velocity = attractOptions.speed * attractOptions.factor;
      const attractFactor = clamp((1 - Math.pow(distance / attractRadius, 2)) * velocity, 0, velocity);
      const normVec = {
        x: distance === 0 ? velocity : dx / distance * attractFactor,
        y: distance === 0 ? velocity : dy / distance * attractFactor
      };
      particle.position.x = particle.position.x - normVec.x;
      particle.position.y = particle.position.y - normVec.y;
    }
  }

  clickAttract() {
    const container = this.container;

    if (!container.attract.finish) {
      if (!container.attract.count) {
        container.attract.count = 0;
      }

      container.attract.count++;

      if (container.attract.count === container.particles.count) {
        container.attract.finish = true;
      }
    }

    if (container.attract.clicking) {
      const mousePos = container.interactivity.mouse.clickPosition;

      if (!mousePos) {
        return;
      }

      const attractRadius = container.retina.attractModeDistance;
      this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    } else if (container.attract.clicking === false) {
      container.attract.particles = [];
    }

    return;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/External/Repulser.js



class Repulser extends ExternalBase {
  constructor(container) {
    super(container, "repulser");
  }

  isEnabled() {
    const container = this.container;
    const options = container.options;
    const mouse = container.interactivity.mouse;
    const events = options.interactivity.events;
    const divs = events.onDiv;
    const divRepulse = isDivModeEnabled("repulse", divs);

    if (!(divRepulse || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    const clickMode = events.onClick.mode;
    return isInArray("repulse", hoverMode) || isInArray("repulse", clickMode) || divRepulse;
  }

  reset() {}

  interact() {
    const container = this.container;
    const options = container.options;
    const mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent;
    const events = options.interactivity.events;
    const hoverEnabled = events.onHover.enable;
    const hoverMode = events.onHover.mode;
    const clickEnabled = events.onClick.enable;
    const clickMode = events.onClick.mode;
    const divs = events.onDiv;

    if (mouseMoveStatus && hoverEnabled && isInArray("repulse", hoverMode)) {
      this.hoverRepulse();
    } else if (clickEnabled && isInArray("repulse", clickMode)) {
      this.clickRepulse();
    } else {
      divModeExecute("repulse", divs, (selector, div) => this.singleSelectorRepulse(selector, div));
    }
  }

  singleSelectorRepulse(selector, div) {
    const container = this.container;
    const query = document.querySelectorAll(selector);

    if (!query.length) {
      return;
    }

    query.forEach(item => {
      const elem = item;
      const pxRatio = container.retina.pixelRatio;
      const pos = {
        x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
        y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
      };
      const repulseRadius = elem.offsetWidth / 2 * pxRatio;
      const area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio);
      const divs = container.options.interactivity.modes.repulse.divs;
      const divRepulse = divMode(divs, elem);
      this.processRepulse(pos, repulseRadius, area, divRepulse);
    });
  }

  hoverRepulse() {
    const container = this.container;
    const mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const repulseRadius = container.retina.repulseModeDistance;
    this.processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
  }

  processRepulse(position, repulseRadius, area, divRepulse) {
    var _a;

    const container = this.container;
    const query = container.particles.quadTree.query(area);
    const repulseOptions = container.options.interactivity.modes.repulse;

    for (const particle of query) {
      const {
        dx,
        dy,
        distance
      } = getDistances(particle.position, position);
      const velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : repulseOptions.speed) * repulseOptions.factor;
      const repulseFactor = clamp((1 - Math.pow(distance / repulseRadius, 2)) * velocity, 0, velocity);
      const normVec = new Vector(distance === 0 ? velocity : dx / distance * repulseFactor, distance === 0 ? velocity : dy / distance * repulseFactor);
      particle.position.addTo(normVec);
    }
  }

  clickRepulse() {
    const container = this.container;

    if (!container.repulse.finish) {
      if (!container.repulse.count) {
        container.repulse.count = 0;
      }

      container.repulse.count++;

      if (container.repulse.count === container.particles.count) {
        container.repulse.finish = true;
      }
    }

    if (container.repulse.clicking) {
      const repulseDistance = container.retina.repulseModeDistance;
      const repulseRadius = Math.pow(repulseDistance / 6, 3);
      const mouseClickPos = container.interactivity.mouse.clickPosition;

      if (mouseClickPos === undefined) {
        return;
      }

      const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius);
      const query = container.particles.quadTree.query(range);

      for (const particle of query) {
        const {
          dx,
          dy,
          distance
        } = getDistances(mouseClickPos, particle.position);
        const d = Math.pow(distance, 2);
        const velocity = container.options.interactivity.modes.repulse.speed;
        const force = -repulseRadius * velocity / d;

        if (d <= repulseRadius) {
          container.repulse.particles.push(particle);
          const vect = new Vector(dx, dy);
          vect.length = force;
          particle.velocity.setTo(vect);
        }
      }
    } else if (container.repulse.clicking === false) {
      for (const particle of container.repulse.particles) {
        particle.velocity.setTo(particle.initialVelocity);
      }

      container.repulse.particles = [];
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/Particles/ParticlesBase.js
class ParticlesBase {
  constructor(container, subName) {
    this.container = container;
    this.type = 1;
    this.name = `particles${subName}`;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/Particles/Attractor.js


class Attractor_Attractor extends ParticlesBase {
  constructor(container) {
    super(container, "attractor");
  }

  interact(p1) {
    var _a;

    const container = this.container,
          distance = (_a = p1.attractDistance) !== null && _a !== void 0 ? _a : container.retina.attractDistance,
          pos1 = p1.getPosition(),
          query = container.particles.quadTree.queryCircle(pos1, distance);

    for (const p2 of query) {
      if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
        continue;
      }

      const pos2 = p2.getPosition(),
            {
        dx,
        dy
      } = getDistances(pos1, pos2),
            rotate = p1.options.move.attract.rotate,
            ax = dx / (rotate.x * 1000),
            ay = dy / (rotate.y * 1000),
            p1Factor = p2.size.value / p1.size.value,
            p2Factor = 1 / p1Factor;
      p1.velocity.x -= ax * p1Factor;
      p1.velocity.y -= ay * p1Factor;
      p2.velocity.x += ax * p2Factor;
      p2.velocity.y += ay * p2Factor;
    }
  }

  isEnabled(particle) {
    return particle.options.move.attract.enable;
  }

  reset() {}

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/Particles/Collider.js



function bounce(p1, p2) {
  circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
}

function destroy(p1, p2) {
  if (!p1.unbreakable && !p2.unbreakable) {
    bounce(p1, p2);
  }

  if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
    p1.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
    p2.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
    if (p1.getRadius() >= p2.getRadius()) {
      p2.destroy();
    } else {
      p1.destroy();
    }
  }
}

class Collider extends ParticlesBase {
  constructor(container) {
    super(container, "collider");
  }

  isEnabled(particle) {
    return particle.options.collisions.enable;
  }

  reset() {}

  interact(p1) {
    const container = this.container;
    const pos1 = p1.getPosition();
    const radius1 = p1.getRadius();
    const query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);

    for (const p2 of query) {
      if (p1 === p2 || !p2.options.collisions.enable || p1.options.collisions.mode !== p2.options.collisions.mode || p2.destroyed || p2.spawning) {
        continue;
      }

      const pos2 = p2.getPosition();

      if (Math.round(pos1.z) !== Math.round(pos2.z)) {
        continue;
      }

      const dist = getDistance(pos1, pos2);
      const radius2 = p2.getRadius();
      const distP = radius1 + radius2;

      if (dist <= distP) {
        this.resolveCollision(p1, p2);
      }
    }
  }

  resolveCollision(p1, p2) {
    switch (p1.options.collisions.mode) {
      case "absorb":
        {
          this.absorb(p1, p2);
          break;
        }

      case "bounce":
        {
          bounce(p1, p2);
          break;
        }

      case "destroy":
        {
          destroy(p1, p2);
          break;
        }
    }
  }

  absorb(p1, p2) {
    const container = this.container;
    const fps = container.options.fpsLimit / 1000;

    if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
      p1.destroy();
    } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
      p2.destroy();
    } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
      if (p1.getRadius() >= p2.getRadius()) {
        const factor = clamp(p1.getRadius() / p2.getRadius(), 0, p2.getRadius()) * fps;
        p1.size.value += factor;
        p2.size.value -= factor;

        if (p2.getRadius() <= container.retina.pixelRatio) {
          p2.size.value = 0;
          p2.destroy();
        }
      } else {
        const factor = clamp(p2.getRadius() / p1.getRadius(), 0, p1.getRadius()) * fps;
        p1.size.value -= factor;
        p2.size.value += factor;

        if (p1.getRadius() <= container.retina.pixelRatio) {
          p1.size.value = 0;
          p1.destroy();
        }
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/Particles/Infecter.js

class Infecter extends ParticlesBase {
  constructor(container) {
    super(container, "infecter");
  }

  isEnabled() {
    return this.container.options.infection.enable;
  }

  reset() {}

  interact(p1, delta) {
    var _a, _b;

    const infecter = this.container.particles.infecter;
    infecter.updateInfection(p1, delta.value);

    if (p1.infection.stage === undefined) {
      return;
    }

    const container = this.container;
    const options = container.options;
    const infectionOptions = options.infection;

    if (!infectionOptions.enable || infectionOptions.stages.length < 1) {
      return;
    }

    const infectionStage1 = infectionOptions.stages[p1.infection.stage];
    const pxRatio = container.retina.pixelRatio;
    const radius = p1.getRadius() * 2 + infectionStage1.radius * pxRatio;
    const pos = p1.getPosition();
    const infectedStage1 = (_a = infectionStage1.infectedStage) !== null && _a !== void 0 ? _a : p1.infection.stage;
    const query = container.particles.quadTree.queryCircle(pos, radius);
    const infections = infectionStage1.rate;
    const neighbors = query.length;

    for (const p2 of query) {
      if (p2 === p1 || p2.destroyed || p2.spawning || !(p2.infection.stage === undefined || p2.infection.stage !== p1.infection.stage)) {
        continue;
      }

      if (Math.random() < infections / neighbors) {
        if (p2.infection.stage === undefined) {
          infecter.startInfection(p2, infectedStage1);
        } else if (p2.infection.stage < p1.infection.stage) {
          infecter.updateInfectionStage(p2, infectedStage1);
        } else if (p2.infection.stage > p1.infection.stage) {
          const infectionStage2 = infectionOptions.stages[p2.infection.stage];
          const infectedStage2 = (_b = infectionStage2 === null || infectionStage2 === void 0 ? void 0 : infectionStage2.infectedStage) !== null && _b !== void 0 ? _b : p2.infection.stage;
          infecter.updateInfectionStage(p1, infectedStage2);
        }
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/Particles/Repulser.js



class Repulser_Repulser extends ParticlesBase {
  constructor(container) {
    super(container, "repulser");
  }

  isEnabled(particle) {
    return particle.options.repulse.enabled;
  }

  reset() {}

  interact(p1) {
    const container = this.container;
    const repulseOpt1 = p1.options.repulse;
    const pos1 = p1.getPosition();
    const query = container.particles.quadTree.queryCircle(pos1, repulseOpt1.distance);

    for (const p2 of query) {
      if (p1 === p2 || p2.destroyed) {
        continue;
      }

      const pos2 = p2.getPosition();
      const {
        dx,
        dy,
        distance
      } = getDistances(pos2, pos1);
      const velocity = repulseOpt1.speed * repulseOpt1.factor;

      if (distance > 0) {
        const repulseFactor = clamp((1 - Math.pow(distance / repulseOpt1.distance, 2)) * velocity, 0, velocity);
        const normVec = new Vector(dx / distance * repulseFactor, dy / distance * repulseFactor);
        p2.position.addTo(normVec);
      } else {
        const velocityVec = new Vector(velocity, velocity);
        p2.position.addTo(velocityVec);
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Interactions/Particles/Linker.js


class Linker extends ParticlesBase {
  constructor(container) {
    super(container, "linker");
  }

  isEnabled(particle) {
    return particle.options.links.enable;
  }

  reset() {}

  interact(p1) {
    var _a;

    const container = this.container;
    const linkOpt1 = p1.options.links;
    const optOpacity = linkOpt1.opacity;
    const optDistance = (_a = p1.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance;
    const canvasSize = container.canvas.size;
    const warp = linkOpt1.warp;
    const pos1 = p1.getPosition();
    const range = warp ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle(pos1.x, pos1.y, optDistance);
    const query = container.particles.quadTree.query(range);

    for (const p2 of query) {
      const linkOpt2 = p2.options.links;

      if (p1 === p2 || !linkOpt2.enable || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed) {
        continue;
      }

      const pos2 = p2.getPosition();
      const distance = this.getDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);

      if (distance > optDistance) {
        return;
      }

      const opacityLine = (1 - distance / optDistance) * optOpacity;
      this.setColor(p1);

      if (p2.links.map(t => t.destination).indexOf(p1) === -1 && p1.links.map(t => t.destination).indexOf(p2) === -1) {
        p1.links.push({
          destination: p2,
          opacity: opacityLine
        });
      }
    }
  }

  setColor(p1) {
    const container = this.container;
    const linksOptions = p1.options.links;
    let linkColor = linksOptions.id === undefined ? container.particles.linksColor : container.particles.linksColors.get(linksOptions.id);

    if (!linkColor) {
      const optColor = linksOptions.color;
      linkColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);

      if (linksOptions.id === undefined) {
        container.particles.linksColor = linkColor;
      } else {
        container.particles.linksColors.set(linksOptions.id, linkColor);
      }
    }
  }

  getDistance(pos1, pos2, optDistance, canvasSize, warp) {
    let distance = getDistance(pos1, pos2);

    if (distance <= optDistance || !warp) {
      return distance;
    }

    const pos2NE = {
      x: pos2.x - canvasSize.width,
      y: pos2.y
    };
    distance = getDistance(pos1, pos2NE);

    if (distance <= optDistance) {
      return distance;
    }

    const pos2SE = {
      x: pos2.x - canvasSize.width,
      y: pos2.y - canvasSize.height
    };
    distance = getDistance(pos1, pos2SE);

    if (distance <= optDistance) {
      return distance;
    }

    const pos2SW = {
      x: pos2.x,
      y: pos2.y - canvasSize.height
    };
    distance = getDistance(pos1, pos2SW);
    return distance;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Updaters/LifeUpdater.js

class LifeUpdater {
  constructor(container) {
    this.container = container;
  }

  isEnabled(particle) {
    return !particle.destroyed;
  }

  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }

    const life = particle.life;
    let justSpawned = false;

    if (particle.spawning) {
      life.delayTime += delta.value;

      if (life.delayTime >= particle.life.delay) {
        justSpawned = true;
        particle.spawning = false;
        life.delayTime = 0;
        life.time = 0;
      } else {
        return;
      }
    }

    if (life.duration === -1) {
      return;
    }

    if (justSpawned) {
      life.time = 0;
    } else {
      life.time += delta.value;
    }

    if (life.time < life.duration) {
      return;
    }

    life.time = 0;

    if (particle.life.count > 0) {
      particle.life.count--;
    }

    if (particle.life.count === 0) {
      particle.destroy();
      return;
    }

    const canvasSize = this.container.canvas.size,
          widthRange = setRangeValue(0, canvasSize.width),
          heightRange = setRangeValue(0, canvasSize.width);
    particle.position.x = randomInRange(widthRange);
    particle.position.y = randomInRange(heightRange);
    particle.spawning = true;
    life.delayTime = 0;
    life.time = 0;
    particle.reset();
    const lifeOptions = particle.options.life;
    life.delay = getRangeValue(lifeOptions.delay.value) * 1000;
    life.duration = getRangeValue(lifeOptions.duration.value) * 1000;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Updaters/OpacityUpdater.js

class OpacityUpdater {
  constructor(container) {
    this.container = container;
  }

  isEnabled(particle) {
    const opacityAnim = particle.options.opacity.anim;
    return !particle.destroyed && !particle.spawning && opacityAnim.enable && (opacityAnim.count <= 0 || particle.loops.opacity < opacityAnim.count);
  }

  update(particle, delta) {
    var _a, _b;

    const opacityOpt = particle.options.opacity;
    const opacityAnim = opacityOpt.anim;
    const value = opacityOpt.value;
    const minValue = typeof value === "number" ? value : value.min;
    const maxValue = typeof value === "number" ? value : value.max;

    if (!this.isEnabled(particle)) {
      return;
    }

    switch (particle.opacity.status) {
      case 0:
        if (particle.opacity.value >= maxValue) {
          particle.opacity.status = 1;
          particle.loops.opacity++;
        } else {
          particle.opacity.value += ((_a = particle.opacity.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
        }

        break;

      case 1:
        if (particle.opacity.value <= minValue) {
          particle.opacity.status = 0;
          particle.loops.opacity++;
        } else {
          particle.opacity.value -= ((_b = particle.opacity.velocity) !== null && _b !== void 0 ? _b : 0) * delta.factor;
        }

        break;
    }

    checkDestroy(particle, opacityAnim.destroy, particle.opacity.value, minValue, maxValue);

    if (!particle.destroyed) {
      particle.opacity.value = clamp(particle.opacity.value, minValue, maxValue);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Updaters/SizeUpdater.js

class SizeUpdater {
  constructor(container) {
    this.container = container;
  }

  isEnabled(particle) {
    const sizeOpt = particle.options.size;
    const sizeAnim = sizeOpt.animation;
    return !particle.destroyed && !particle.spawning && sizeAnim.enable && (sizeAnim.count <= 0 || particle.loops.size < sizeAnim.count);
  }

  update(particle, delta) {
    var _a;

    const container = this.container;
    const sizeOpt = particle.options.size;
    const sizeAnim = sizeOpt.animation;
    const sizeVelocity = ((_a = particle.size.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
    const value = sizeOpt.value;
    const minValue = (typeof value === "number" ? value : value.min) * container.retina.pixelRatio;
    const maxValue = (typeof value === "number" ? value : value.max) * container.retina.pixelRatio;

    if (!this.isEnabled(particle)) {
      return;
    }

    switch (particle.size.status) {
      case 0:
        if (particle.size.value >= maxValue) {
          particle.size.status = 1;
          particle.loops.size++;
        } else {
          particle.size.value += sizeVelocity;
        }

        break;

      case 1:
        if (particle.size.value <= minValue) {
          particle.size.status = 0;
          particle.loops.size++;
        } else {
          particle.size.value -= sizeVelocity;
        }

    }

    checkDestroy(particle, sizeAnim.destroy, particle.size.value, minValue, maxValue);

    if (!particle.destroyed) {
      particle.size.value = clamp(particle.size.value, minValue, maxValue);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Updaters/AngleUpdater.js
class AngleUpdater {
  constructor(container) {
    this.container = container;
  }

  isEnabled(particle) {
    const rotate = particle.options.rotate;
    const rotateAnimation = rotate.animation;
    return !particle.destroyed && !particle.spawning && !rotate.path && rotateAnimation.enable;
  }

  update(particle, delta) {
    var _a;

    if (!this.isEnabled(particle)) {
      return;
    }

    const speed = ((_a = particle.rotate.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
    const max = 2 * Math.PI;

    switch (particle.rotate.status) {
      case 0:
        particle.rotate.value += speed;

        if (particle.rotate.value > max) {
          particle.rotate.value -= max;
        }

        break;

      case 1:
      default:
        particle.rotate.value -= speed;

        if (particle.rotate.value < 0) {
          particle.rotate.value += max;
        }

        break;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Updaters/ColorUpdater.js

class ColorUpdater {
  constructor(container) {
    this.container = container;
  }

  isEnabled(particle) {
    var _a, _b, _c;

    const animationOptions = particle.options.color.animation;
    return !particle.destroyed && !particle.spawning && (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h.value) !== undefined && animationOptions.h.enable || ((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s.value) !== undefined && animationOptions.s.enable || ((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l.value) !== undefined && animationOptions.l.enable);
  }

  update(particle, delta) {
    var _a, _b, _c;

    const animationOptions = particle.options.color.animation;

    if (!this.isEnabled(particle)) {
      return;
    }

    if (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h) !== undefined) {
      this.updateValue(particle, delta, particle.color.h, animationOptions.h, 360, false);
    }

    if (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s) !== undefined) {
      this.updateValue(particle, delta, particle.color.s, animationOptions.s, 100, true);
    }

    if (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l) !== undefined) {
      this.updateValue(particle, delta, particle.color.l, animationOptions.l, 100, true);
    }
  }

  updateValue(particle, delta, value, valueAnimation, max, decrease) {
    var _a;

    const colorValue = value;

    if (!colorValue || !valueAnimation.enable) {
      return;
    }

    const offset = randomInRange(valueAnimation.offset);
    const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6;

    if (!decrease || colorValue.status === 0) {
      colorValue.value += velocity;

      if (decrease && colorValue.value > max) {
        colorValue.status = 1;
        colorValue.value -= colorValue.value % max;
      }
    } else {
      colorValue.value -= velocity;

      if (colorValue.value < 0) {
        colorValue.status = 0;
        colorValue.value += colorValue.value;
      }
    }

    if (colorValue.value > max) {
      colorValue.value %= max;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Updaters/StrokeColorUpdater.js

class StrokeColorUpdater {
  constructor(container) {
    this.container = container;
  }

  isEnabled(particle) {
    var _a, _b, _c;

    const color = particle.stroke.color;
    return !particle.destroyed && !particle.spawning && color !== undefined && (((_a = particle.strokeColor) === null || _a === void 0 ? void 0 : _a.h.value) !== undefined && color.animation.h.enable || ((_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.s.value) !== undefined && color.animation.s.enable || ((_c = particle.strokeColor) === null || _c === void 0 ? void 0 : _c.l.value) !== undefined && color.animation.l.enable);
  }

  update(particle, delta) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;

    if (!this.isEnabled(particle)) {
      return;
    }

    const animationOptions = particle.stroke.color.animation;
    const valueAnimations = animationOptions;

    if (valueAnimations.enable !== undefined) {
      const hue = (_b = (_a = particle.strokeColor) === null || _a === void 0 ? void 0 : _a.h) !== null && _b !== void 0 ? _b : (_c = particle.color) === null || _c === void 0 ? void 0 : _c.h;

      if (hue) {
        this.updateValue(particle, delta, hue, valueAnimations, 360);
      }
    } else {
      const hslAnimations = animationOptions;
      const h = (_e = (_d = particle.strokeColor) === null || _d === void 0 ? void 0 : _d.h) !== null && _e !== void 0 ? _e : (_f = particle.color) === null || _f === void 0 ? void 0 : _f.h;

      if (h) {
        this.updateValue(particle, delta, h, hslAnimations.h, 360);
      }

      const s = (_h = (_g = particle.strokeColor) === null || _g === void 0 ? void 0 : _g.s) !== null && _h !== void 0 ? _h : (_j = particle.color) === null || _j === void 0 ? void 0 : _j.s;

      if (s) {
        this.updateValue(particle, delta, s, hslAnimations.s, 100);
      }

      const l = (_l = (_k = particle.strokeColor) === null || _k === void 0 ? void 0 : _k.l) !== null && _l !== void 0 ? _l : (_m = particle.color) === null || _m === void 0 ? void 0 : _m.l;

      if (l) {
        this.updateValue(particle, delta, l, hslAnimations.l, 100);
      }
    }
  }

  updateValue(particle, delta, value, valueAnimation, max) {
    var _a;

    const colorValue = value;

    if (!colorValue) {
      return;
    }

    const offset = randomInRange(valueAnimation.offset);
    colorValue.value += ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6;

    if (colorValue.value > max) {
      colorValue.value %= max;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Updaters/OutOfCanvasUpdater.js


function bounceHorizontal(data) {
  if (!(data.outMode === "bounce" || data.outMode === "bounce-horizontal" || data.outMode === "bounceHorizontal" || data.outMode === "split")) {
    return;
  }

  const velocity = data.particle.velocity.x;
  let bounced = false;

  if (data.direction === "right" && data.bounds.right >= data.canvasSize.width && velocity > 0 || data.direction === "left" && data.bounds.left <= 0 && velocity < 0) {
    const newVelocity = getRangeValue(data.particle.options.bounce.horizontal.value);
    data.particle.velocity.x *= -newVelocity;
    bounced = true;
  }

  if (!bounced) {
    return;
  }

  const minPos = data.offset.x + data.size;

  if (data.bounds.right >= data.canvasSize.width) {
    data.particle.position.x = data.canvasSize.width - minPos;
  } else if (data.bounds.left <= 0) {
    data.particle.position.x = minPos;
  }

  if (data.outMode === "split") {
    data.particle.destroy();
  }
}

function bounceVertical(data) {
  if (data.outMode === "bounce" || data.outMode === "bounce-vertical" || data.outMode === "bounceVertical" || data.outMode === "split") {
    const velocity = data.particle.velocity.y;
    let bounced = false;

    if (data.direction === "bottom" && data.bounds.bottom >= data.canvasSize.height && velocity > 0 || data.direction === "top" && data.bounds.top <= 0 && velocity < 0) {
      const newVelocity = getRangeValue(data.particle.options.bounce.vertical.value);
      data.particle.velocity.y *= -newVelocity;
      bounced = true;
    }

    if (!bounced) {
      return;
    }

    const minPos = data.offset.y + data.size;

    if (data.bounds.bottom >= data.canvasSize.height) {
      data.particle.position.y = data.canvasSize.height - minPos;
    } else if (data.bounds.top <= 0) {
      data.particle.position.y = minPos;
    }

    if (data.outMode === "split") {
      data.particle.destroy();
    }
  }
}

class OutOfCanvasUpdater {
  constructor(container) {
    this.container = container;
  }

  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning;
  }

  update(particle, delta) {
    var _a, _b, _c, _d;

    const outModes = particle.options.move.outModes;
    this.updateOutMode(particle, delta, (_a = outModes.bottom) !== null && _a !== void 0 ? _a : outModes.default, "bottom");
    this.updateOutMode(particle, delta, (_b = outModes.left) !== null && _b !== void 0 ? _b : outModes.default, "left");
    this.updateOutMode(particle, delta, (_c = outModes.right) !== null && _c !== void 0 ? _c : outModes.default, "right");
    this.updateOutMode(particle, delta, (_d = outModes.top) !== null && _d !== void 0 ? _d : outModes.default, "top");
  }

  updateOutMode(particle, delta, outMode, direction) {
    switch (outMode) {
      case "bounce":
      case "bounce-vertical":
      case "bounce-horizontal":
      case "bounceVertical":
      case "bounceHorizontal":
      case "split":
        this.bounce(particle, delta, direction, outMode);
        break;

      case "destroy":
        this.destroy(particle, direction);
        break;

      case "out":
        this.out(particle, direction);
        break;

      case "none":
        this.none(particle, direction);
        break;
    }
  }

  destroy(particle, direction) {
    const container = this.container;

    if (isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
      return;
    }

    container.particles.remove(particle, undefined, true);
  }

  out(particle, direction) {
    const container = this.container;

    if (isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
      return;
    }

    const wrap = particle.options.move.warp,
          canvasSize = container.canvas.size,
          newPos = {
      bottom: canvasSize.height + particle.getRadius() - particle.offset.y,
      left: -particle.getRadius() - particle.offset.x,
      right: canvasSize.width + particle.getRadius() + particle.offset.x,
      top: -particle.getRadius() - particle.offset.y
    },
          sizeValue = particle.getRadius(),
          nextBounds = calculateBounds(particle.position, sizeValue);

    if (direction === "right" && nextBounds.left > canvasSize.width - particle.offset.x) {
      particle.position.x = newPos.left;
      particle.initialPosition.x = particle.position.x;

      if (!wrap) {
        particle.position.y = Math.random() * canvasSize.height;
        particle.initialPosition.y = particle.position.y;
      }
    } else if (direction === "left" && nextBounds.right < -particle.offset.x) {
      particle.position.x = newPos.right;
      particle.initialPosition.x = particle.position.x;

      if (!wrap) {
        particle.position.y = Math.random() * canvasSize.height;
        particle.initialPosition.y = particle.position.y;
      }
    }

    if (direction === "bottom" && nextBounds.top > canvasSize.height - particle.offset.y) {
      if (!wrap) {
        particle.position.x = Math.random() * canvasSize.width;
        particle.initialPosition.x = particle.position.x;
      }

      particle.position.y = newPos.top;
      particle.initialPosition.y = particle.position.y;
    } else if (direction === "top" && nextBounds.bottom < -particle.offset.y) {
      if (!wrap) {
        particle.position.x = Math.random() * canvasSize.width;
        particle.initialPosition.x = particle.position.x;
      }

      particle.position.y = newPos.bottom;
      particle.initialPosition.y = particle.position.y;
    }
  }

  bounce(particle, delta, direction, outMode) {
    const container = this.container;
    let handled = false;

    for (const [, plugin] of container.plugins) {
      if (plugin.particleBounce !== undefined) {
        handled = plugin.particleBounce(particle, delta, direction);
      }

      if (handled) {
        break;
      }
    }

    if (handled) {
      return;
    }

    const pos = particle.getPosition(),
          offset = particle.offset,
          size = particle.getRadius(),
          bounds = calculateBounds(pos, size),
          canvasSize = container.canvas.size;
    bounceHorizontal({
      particle,
      outMode,
      direction,
      bounds,
      canvasSize,
      offset,
      size
    });
    bounceVertical({
      particle,
      outMode,
      direction,
      bounds,
      canvasSize,
      offset,
      size
    });
  }

  none(particle, direction) {
    if (particle.options.move.distance) {
      return;
    }

    const gravityOptions = particle.options.move.gravity,
          container = this.container;

    if (!gravityOptions.enable) {
      if (!isPointInside(particle.position, container.canvas.size, particle.getRadius(), direction)) {
        container.particles.remove(particle);
      }
    } else {
      const position = particle.position;

      if (gravityOptions.acceleration >= 0 && position.y > container.canvas.size.height && direction === "bottom" || gravityOptions.acceleration < 0 && position.y < 0 && direction === "top") {
        container.particles.remove(particle);
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Canvas.js

class Canvas {
  constructor(container) {
    this.container = container;
    this.size = {
      height: 0,
      width: 0
    };
    this.context = null;
    this.generatedCanvas = false;
  }

  init() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;

    this.resize();
    const options = this.container.options;
    const element = this.element;

    if (element) {
      if (options.fullScreen.enable) {
        this.originalStyle = deepExtend({}, element.style);
        element.style.position = "fixed";
        element.style.zIndex = options.fullScreen.zIndex.toString(10);
        element.style.top = "0";
        element.style.left = "0";
        element.style.width = "100%";
        element.style.height = "100%";
      } else {
        element.style.position = (_b = (_a = this.originalStyle) === null || _a === void 0 ? void 0 : _a.position) !== null && _b !== void 0 ? _b : "";
        element.style.zIndex = (_d = (_c = this.originalStyle) === null || _c === void 0 ? void 0 : _c.zIndex) !== null && _d !== void 0 ? _d : "";
        element.style.top = (_f = (_e = this.originalStyle) === null || _e === void 0 ? void 0 : _e.top) !== null && _f !== void 0 ? _f : "";
        element.style.left = (_h = (_g = this.originalStyle) === null || _g === void 0 ? void 0 : _g.left) !== null && _h !== void 0 ? _h : "";
        element.style.width = (_k = (_j = this.originalStyle) === null || _j === void 0 ? void 0 : _j.width) !== null && _k !== void 0 ? _k : "";
        element.style.height = (_m = (_l = this.originalStyle) === null || _l === void 0 ? void 0 : _l.height) !== null && _m !== void 0 ? _m : "";
      }
    }

    const cover = options.backgroundMask.cover;
    const color = cover.color;
    const trail = options.particles.move.trail;
    const coverRgb = colorToRgb(color);
    this.coverColor = coverRgb !== undefined ? {
      r: coverRgb.r,
      g: coverRgb.g,
      b: coverRgb.b,
      a: cover.opacity
    } : undefined;
    this.trailFillColor = colorToRgb(trail.fillColor);
    this.initBackground();
    this.paint();
  }

  loadCanvas(canvas, generatedCanvas) {
    var _a;

    if (!canvas.className) {
      canvas.className = Constants.canvasClass;
    }

    if (this.generatedCanvas) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }

    this.generatedCanvas = generatedCanvas !== null && generatedCanvas !== void 0 ? generatedCanvas : this.generatedCanvas;
    this.element = canvas;
    this.originalStyle = deepExtend({}, this.element.style);
    this.size.height = canvas.offsetHeight;
    this.size.width = canvas.offsetWidth;
    this.context = this.element.getContext("2d");
    this.container.retina.init();
    this.initBackground();
  }

  destroy() {
    var _a;

    if (this.generatedCanvas) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }

    if (this.context) {
      clear(this.context, this.size);
    }
  }

  paint() {
    const options = this.container.options;

    if (!this.context) {
      return;
    }

    if (options.backgroundMask.enable && options.backgroundMask.cover && this.coverColor) {
      clear(this.context, this.size);
      this.paintBase(getStyleFromRgb(this.coverColor, this.coverColor.a));
    } else {
      this.paintBase();
    }
  }

  clear() {
    const options = this.container.options;
    const trail = options.particles.move.trail;

    if (options.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > 0 && this.trailFillColor) {
      this.paintBase(getStyleFromRgb(this.trailFillColor, 1 / trail.length));
    } else if (this.context) {
      clear(this.context, this.size);
    }
  }

  windowResize() {
    if (!this.element) {
      return;
    }

    const container = this.container;
    container.canvas.resize();
    container.options.setResponsive(this.size.width, container.retina.pixelRatio, container.fullOptions);
    container.particles.setDensity();

    for (const [, plugin] of container.plugins) {
      if (plugin.resize !== undefined) {
        plugin.resize();
      }
    }
  }

  resize() {
    if (!this.element) {
      return;
    }

    const container = this.container;
    const pxRatio = container.retina.pixelRatio;
    const size = container.canvas.size;
    const oldSize = {
      width: size.width,
      height: size.height
    };
    size.width = this.element.offsetWidth * pxRatio;
    size.height = this.element.offsetHeight * pxRatio;
    this.element.width = size.width;
    this.element.height = size.height;
    this.resizeFactor = {
      width: size.width / oldSize.width,
      height: size.height / oldSize.height
    };
  }

  drawConnectLine(p1, p2) {
    var _a;

    const lineStyle = this.lineStyle(p1, p2);

    if (!lineStyle) {
      return;
    }

    const ctx = this.context;

    if (!ctx) {
      return;
    }

    const pos1 = p1.getPosition();
    const pos2 = p2.getPosition();
    drawConnectLine(ctx, (_a = p1.linksWidth) !== null && _a !== void 0 ? _a : this.container.retina.linksWidth, lineStyle, pos1, pos2);
  }

  drawGrabLine(particle, lineColor, opacity, mousePos) {
    var _a;

    const container = this.container;
    const ctx = container.canvas.context;

    if (!ctx) {
      return;
    }

    const beginPos = particle.getPosition();
    drawGrabLine(ctx, (_a = particle.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth, beginPos, mousePos, lineColor, opacity);
  }

  drawParticleShadow(particle, mousePos) {
    if (!this.context) {
      return;
    }

    drawParticleShadow(this.container, this.context, particle, mousePos);
  }

  drawLinkTriangle(p1, link1, link2) {
    var _a;

    const container = this.container;
    const options = container.options;
    const p2 = link1.destination;
    const p3 = link2.destination;
    const triangleOptions = p1.options.links.triangles;
    const opacityTriangle = (_a = triangleOptions.opacity) !== null && _a !== void 0 ? _a : (link1.opacity + link2.opacity) / 2;

    if (opacityTriangle <= 0) {
      return;
    }

    const pos1 = p1.getPosition();
    const pos2 = p2.getPosition();
    const pos3 = p3.getPosition();
    const ctx = this.context;

    if (!ctx) {
      return;
    }

    if (getDistance(pos1, pos2) > container.retina.linksDistance || getDistance(pos3, pos2) > container.retina.linksDistance || getDistance(pos3, pos1) > container.retina.linksDistance) {
      return;
    }

    let colorTriangle = colorToRgb(triangleOptions.color);

    if (!colorTriangle) {
      const linksOptions = p1.options.links;
      const linkColor = linksOptions.id !== undefined ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
      colorTriangle = getLinkColor(p1, p2, linkColor);
    }

    if (!colorTriangle) {
      return;
    }

    drawLinkTriangle(ctx, pos1, pos2, pos3, options.backgroundMask.enable, options.backgroundMask.composite, colorTriangle, opacityTriangle);
  }

  drawLinkLine(p1, link) {
    var _a, _b;

    const container = this.container;
    const options = container.options;
    const p2 = link.destination;
    let opacity = link.opacity;
    const pos1 = p1.getPosition();
    const pos2 = p2.getPosition();
    const ctx = this.context;

    if (!ctx) {
      return;
    }

    let colorLine;
    const twinkle = p1.options.twinkle.lines;

    if (twinkle.enable) {
      const twinkleFreq = twinkle.frequency;
      const twinkleRgb = colorToRgb(twinkle.color);
      const twinkling = Math.random() < twinkleFreq;

      if (twinkling && twinkleRgb !== undefined) {
        colorLine = twinkleRgb;
        opacity = twinkle.opacity;
      }
    }

    if (!colorLine) {
      const linksOptions = p1.options.links;
      const linkColor = linksOptions.id !== undefined ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
      colorLine = getLinkColor(p1, p2, linkColor);
    }

    if (!colorLine) {
      return;
    }

    const width = (_a = p1.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth;
    const maxDistance = (_b = p1.linksDistance) !== null && _b !== void 0 ? _b : container.retina.linksDistance;
    drawLinkLine(ctx, width, pos1, pos2, maxDistance, container.canvas.size, p1.options.links.warp, options.backgroundMask.enable, options.backgroundMask.composite, colorLine, opacity, p1.options.links.shadow);
  }

  drawParticle(particle, delta) {
    var _a, _b, _c;

    if (particle.spawning || particle.destroyed) {
      return;
    }

    const pfColor = particle.getFillColor();
    const psColor = (_a = particle.getStrokeColor()) !== null && _a !== void 0 ? _a : pfColor;

    if (!pfColor && !psColor) {
      return;
    }

    const options = this.container.options;
    const pOptions = particle.options;
    const twinkle = pOptions.twinkle.particles;
    const twinkleFreq = twinkle.frequency;
    const twinkleRgb = colorToRgb(twinkle.color);
    const twinkling = twinkle.enable && Math.random() < twinkleFreq;
    const radius = particle.getRadius();
    const opacity = twinkling ? twinkle.opacity : (_b = particle.bubble.opacity) !== null && _b !== void 0 ? _b : particle.opacity.value;
    const strokeOpacity = (_c = particle.stroke.opacity) !== null && _c !== void 0 ? _c : opacity;
    const infectionStage = particle.infection.stage;
    const infection = options.infection;
    const infectionStages = infection.stages;
    const infectionColor = infectionStage !== undefined ? infectionStages[infectionStage].color : undefined;
    const infectionRgb = colorToRgb(infectionColor);
    const fColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : infectionRgb !== null && infectionRgb !== void 0 ? infectionRgb : pfColor ? hslToRgb(pfColor) : undefined;
    const sColor = twinkling && twinkleRgb !== undefined ? twinkleRgb : infectionRgb !== null && infectionRgb !== void 0 ? infectionRgb : psColor ? hslToRgb(psColor) : undefined;
    const zIndexOptions = particle.options.zIndex;
    const zOpacityFactor = 1 - zIndexOptions.opacityRate * particle.zIndexFactor;
    const zOpacity = opacity * zOpacityFactor;
    const fillColorValue = fColor !== undefined ? getStyleFromRgb(fColor, zOpacity) : undefined;

    if (!this.context || !fillColorValue && !sColor) {
      return;
    }

    const zStrokeOpacity = strokeOpacity * zOpacityFactor;
    const strokeColorValue = sColor !== undefined ? getStyleFromRgb(sColor, zStrokeOpacity) : fillColorValue;
    this.drawParticleLinks(particle);

    if (radius > 0) {
      const orbitOptions = particle.options.orbit;
      const zSizeFactor = 1 - zIndexOptions.sizeRate * particle.zIndexFactor;

      if (orbitOptions.enable) {
        this.drawOrbit(particle, orbitOptions, "back");
      }

      drawParticle(this.container, this.context, particle, delta, fillColorValue, strokeColorValue, options.backgroundMask.enable, options.backgroundMask.composite, radius * zSizeFactor, zOpacity, particle.options.shadow);

      if (orbitOptions.enable) {
        this.drawOrbit(particle, orbitOptions, "front");
      }
    }
  }

  drawOrbit(particle, orbitOptions, type) {
    var _a, _b, _c, _d;

    if (!this.context) {
      return;
    }

    const container = this.container;
    let start;
    let end;

    if (type === "back") {
      start = Math.PI / 2;
      end = Math.PI * 3 / 2;
    } else if (type === "front") {
      start = Math.PI * 3 / 2;
      end = Math.PI / 2;
    } else {
      start = 0;
      end = 2 * Math.PI;
    }

    drawEllipse(this.context, particle, (_a = particle.orbitColor) !== null && _a !== void 0 ? _a : particle.getFillColor(), (_c = (_b = particle.orbitRadius) !== null && _b !== void 0 ? _b : container.retina.orbitRadius) !== null && _c !== void 0 ? _c : particle.getRadius(), orbitOptions.opacity, orbitOptions.width, ((_d = particle.orbitRotation) !== null && _d !== void 0 ? _d : 0) * container.retina.pixelRatio, start, end);
  }

  drawParticleLinks(particle) {
    if (!this.context) {
      return;
    }

    const container = this.container;
    const particles = container.particles;
    const pOptions = particle.options;

    if (particle.links.length > 0) {
      this.context.save();
      const p1Links = particle.links.filter(l => {
        const linkFreq = container.particles.getLinkFrequency(particle, l.destination);
        return linkFreq <= pOptions.links.frequency;
      });

      for (const link of p1Links) {
        const p2 = link.destination;

        if (pOptions.links.triangles.enable) {
          const links = p1Links.map(l => l.destination);
          const vertices = p2.links.filter(t => {
            const linkFreq = container.particles.getLinkFrequency(p2, t.destination);
            return linkFreq <= p2.options.links.frequency && links.indexOf(t.destination) >= 0;
          });

          if (vertices.length) {
            for (const vertex of vertices) {
              const p3 = vertex.destination;
              const triangleFreq = particles.getTriangleFrequency(particle, p2, p3);

              if (triangleFreq > pOptions.links.triangles.frequency) {
                continue;
              }

              this.drawLinkTriangle(particle, link, vertex);
            }
          }
        }

        if (link.opacity > 0 && container.retina.linksWidth > 0) {
          this.drawLinkLine(particle, link);
        }
      }

      this.context.restore();
    }
  }

  drawPlugin(plugin, delta) {
    if (!this.context) {
      return;
    }

    drawPlugin(this.context, plugin, delta);
  }

  drawLight(mousePos) {
    if (!this.context) {
      return;
    }

    drawLight(this.container, this.context, mousePos);
  }

  paintBase(baseColor) {
    if (!this.context) {
      return;
    }

    paintBase(this.context, this.size, baseColor);
  }

  lineStyle(p1, p2) {
    const options = this.container.options;
    const connectOptions = options.interactivity.modes.connect;

    if (this.context) {
      return gradient(this.context, p1, p2, connectOptions.links.opacity);
    }
  }

  initBackground() {
    const options = this.container.options;
    const background = options.background;
    const element = this.element;

    if (!element) {
      return;
    }

    const elementStyle = element.style;

    if (background.color) {
      const color = colorToRgb(background.color);
      elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "rgba(0, 0, 0, 0)";
    } else {
      elementStyle.backgroundColor = "rgba(0, 0, 0, 0)";
    }

    if (background.image) {
      elementStyle.backgroundImage = background.image;
    }

    if (background.position) {
      elementStyle.backgroundPosition = background.position;
    }

    if (background.repeat) {
      elementStyle.backgroundRepeat = background.repeat;
    }

    if (background.size) {
      elementStyle.backgroundSize = background.size;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/OptionsColor.js
class OptionsColor {
  constructor() {
    this.value = "#fff";
  }

  static create(source, data) {
    const color = source !== null && source !== void 0 ? source : new OptionsColor();

    if (data !== undefined) {
      color.load(typeof data === "string" ? {
        value: data
      } : data);
    }

    return color;
  }

  load(data) {
    if ((data === null || data === void 0 ? void 0 : data.value) === undefined) {
      return;
    }

    this.value = data.value;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Links/LinksShadow.js

class LinksShadow {
  constructor() {
    this.blur = 5;
    this.color = new OptionsColor();
    this.enable = false;
    this.color.value = "#00ff00";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.blur !== undefined) {
      this.blur = data.blur;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Links/LinksTriangle.js

class LinksTriangle {
  constructor() {
    this.enable = false;
    this.frequency = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Links/Links.js



class Links {
  constructor() {
    this.blink = false;
    this.color = new OptionsColor();
    this.consent = false;
    this.distance = 100;
    this.enable = false;
    this.frequency = 1;
    this.opacity = 1;
    this.shadow = new LinksShadow();
    this.triangles = new LinksTriangle();
    this.width = 1;
    this.warp = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.id !== undefined) {
      this.id = data.id;
    }

    if (data.blink !== undefined) {
      this.blink = data.blink;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (data.consent !== undefined) {
      this.consent = data.consent;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    this.shadow.load(data.shadow);
    this.triangles.load(data.triangles);

    if (data.width !== undefined) {
      this.width = data.width;
    }

    if (data.warp !== undefined) {
      this.warp = data.warp;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/Attract.js
class Attract {
  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3000,
      y: 3000
    };
  }

  get rotateX() {
    return this.rotate.x;
  }

  set rotateX(value) {
    this.rotate.x = value;
  }

  get rotateY() {
    return this.rotate.y;
  }

  set rotateY(value) {
    this.rotate.y = value;
  }

  load(data) {
    var _a, _b, _c, _d;

    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    const rotateX = (_b = (_a = data.rotate) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : data.rotateX;

    if (rotateX !== undefined) {
      this.rotate.x = rotateX;
    }

    const rotateY = (_d = (_c = data.rotate) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : data.rotateY;

    if (rotateY !== undefined) {
      this.rotate.y = rotateY;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/Trail.js

class Trail {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fillColor = new OptionsColor();
    this.fillColor.value = "#000000";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.fillColor = OptionsColor.create(this.fillColor, data.fillColor);

    if (data.length !== undefined) {
      this.length = data.length;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Random.js
class Random {
  constructor() {
    this.enable = false;
    this.minimumValue = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.minimumValue !== undefined) {
      this.minimumValue = data.minimumValue;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/ValueWithRandom.js


class ValueWithRandom {
  constructor() {
    this.random = new Random();
    this.value = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (typeof data.random === "boolean") {
      this.random.enable = data.random;
    } else {
      this.random.load(data.random);
    }

    if (data.value !== undefined) {
      this.value = setRangeValue(data.value, this.random.enable ? this.random.minimumValue : undefined);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/Noise/NoiseDelay.js

class NoiseDelay extends ValueWithRandom {
  constructor() {
    super();
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/Noise/Noise.js

class Noise {
  constructor() {
    this.clamp = true;
    this.delay = new NoiseDelay();
    this.enable = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.clamp !== undefined) {
      this.clamp = data.clamp;
    }

    this.delay.load(data.delay);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.generator = data.generator;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/MoveAngle.js
class MoveAngle {
  constructor() {
    this.offset = 0;
    this.value = 45;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.offset !== undefined) {
      this.offset = data.offset;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/MoveGravity.js
class MoveGravity {
  constructor() {
    this.acceleration = 9.81;
    this.enable = false;
    this.maxSpeed = 50;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.acceleration !== undefined) {
      this.acceleration = data.acceleration;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.maxSpeed !== undefined) {
      this.maxSpeed = data.maxSpeed;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/OutModes.js
class OutModes {
  constructor() {
    this.default = "out";
  }

  load(data) {
    var _a, _b, _c, _d;

    if (!data) {
      return;
    }

    if (data.default !== undefined) {
      this.default = data.default;
    }

    this.bottom = (_a = data.bottom) !== null && _a !== void 0 ? _a : data.default;
    this.left = (_b = data.left) !== null && _b !== void 0 ? _b : data.default;
    this.right = (_c = data.right) !== null && _c !== void 0 ? _c : data.default;
    this.top = (_d = data.top) !== null && _d !== void 0 ? _d : data.default;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/Spin.js

class Spin {
  constructor() {
    this.acceleration = 0;
    this.enable = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.acceleration !== undefined) {
      this.acceleration = data.acceleration;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.position = data.position ? deepExtend({}, data.position) : undefined;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/Move.js








class Move {
  constructor() {
    this.angle = new MoveAngle();
    this.attract = new Attract();
    this.direction = "none";
    this.distance = {};
    this.enable = false;
    this.gravity = new MoveGravity();
    this.noise = new Noise();
    this.outModes = new OutModes();
    this.random = false;
    this.size = false;
    this.speed = 2;
    this.spin = new Spin();
    this.straight = false;
    this.trail = new Trail();
    this.vibrate = false;
    this.warp = false;
  }

  get collisions() {
    return false;
  }

  set collisions(value) {}

  get bounce() {
    return this.collisions;
  }

  set bounce(value) {
    this.collisions = value;
  }

  get out_mode() {
    return this.outMode;
  }

  set out_mode(value) {
    this.outMode = value;
  }

  get outMode() {
    return this.outModes.default;
  }

  set outMode(value) {
    this.outModes.default = value;
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    if (data.angle !== undefined) {
      if (typeof data.angle === "number") {
        this.angle.value = data.angle;
      } else {
        this.angle.load(data.angle);
      }
    }

    this.attract.load(data.attract);

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    if (data.distance !== undefined) {
      this.distance = typeof data.distance === "number" ? {
        horizontal: data.distance,
        vertical: data.distance
      } : deepExtend({}, data.distance);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.gravity.load(data.gravity);
    this.noise.load(data.noise);
    const outMode = (_a = data.outMode) !== null && _a !== void 0 ? _a : data.out_mode;

    if (data.outModes !== undefined || outMode !== undefined) {
      if (typeof data.outModes === "string" || data.outModes === undefined && outMode !== undefined) {
        this.outModes.load({
          default: (_b = data.outModes) !== null && _b !== void 0 ? _b : outMode
        });
      } else {
        this.outModes.load(data.outModes);
      }
    }

    if (data.random !== undefined) {
      this.random = data.random;
    }

    if (data.size !== undefined) {
      this.size = data.size;
    }

    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }

    this.spin.load(data.spin);

    if (data.straight !== undefined) {
      this.straight = data.straight;
    }

    this.trail.load(data.trail);

    if (data.vibrate !== undefined) {
      this.vibrate = data.vibrate;
    }

    if (data.warp !== undefined) {
      this.warp = data.warp;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Number/Density.js
class Density {
  constructor() {
    this.enable = false;
    this.area = 800;
    this.factor = 1000;
  }

  get value_area() {
    return this.area;
  }

  set value_area(value) {
    this.area = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    const area = (_a = data.area) !== null && _a !== void 0 ? _a : data.value_area;

    if (area !== undefined) {
      this.area = area;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Number/ParticlesNumber.js

class ParticlesNumber {
  constructor() {
    this.density = new Density();
    this.limit = 0;
    this.value = 0;
  }

  get max() {
    return this.limit;
  }

  set max(value) {
    this.limit = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    this.density.load(data.density);
    const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;

    if (limit !== undefined) {
      this.limit = limit;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/AnimationOptions.js
class AnimationOptions {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 1;
    this.sync = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Opacity/OpacityAnimation.js

class OpacityAnimation extends AnimationOptions {
  constructor() {
    super();
    this.count = 0;
    this.destroy = "none";
    this.enable = false;
    this.speed = 2;
    this.startValue = "random";
    this.sync = false;
  }

  get opacity_min() {
    return this.minimumValue;
  }

  set opacity_min(value) {
    this.minimumValue = value;
  }

  load(data) {
    var _a;

    super.load(data);

    if (data === undefined) {
      return;
    }

    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }

    this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.opacity_min;

    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Opacity/Opacity.js



class Opacity extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new OpacityAnimation();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }

  get anim() {
    return this.animation;
  }

  set anim(value) {
    this.animation = value;
  }

  load(data) {
    var _a;

    if (!data) {
      return;
    }

    super.load(data);
    this.animation.load((_a = data.animation) !== null && _a !== void 0 ? _a : data.anim);

    if (this.animation.enable) {
      this.value = setRangeValue(this.value, this.animation.minimumValue);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Shape/Shape.js

class Shape {
  constructor() {
    this.options = {};
    this.type = "circle";
  }

  get image() {
    var _a;

    return (_a = this.options["image"]) !== null && _a !== void 0 ? _a : this.options["images"];
  }

  set image(value) {
    this.options["image"] = value;
    this.options["images"] = value;
  }

  get custom() {
    return this.options;
  }

  set custom(value) {
    this.options = value;
  }

  get images() {
    return this.image instanceof Array ? this.image : [this.image];
  }

  set images(value) {
    this.image = value;
  }

  get stroke() {
    return [];
  }

  set stroke(_value) {}

  get character() {
    var _a;

    return (_a = this.options["character"]) !== null && _a !== void 0 ? _a : this.options["char"];
  }

  set character(value) {
    this.options["character"] = value;
    this.options["char"] = value;
  }

  get polygon() {
    var _a;

    return (_a = this.options["polygon"]) !== null && _a !== void 0 ? _a : this.options["star"];
  }

  set polygon(value) {
    this.options["polygon"] = value;
    this.options["star"] = value;
  }

  load(data) {
    var _a, _b, _c;

    if (!data) {
      return;
    }

    const options = (_a = data.options) !== null && _a !== void 0 ? _a : data.custom;

    if (options !== undefined) {
      for (const shape in options) {
        const item = options[shape];

        if (item !== undefined) {
          this.options[shape] = deepExtend((_b = this.options[shape]) !== null && _b !== void 0 ? _b : {}, item);
        }
      }
    }

    this.loadShape(data.character, "character", "char", true);
    this.loadShape(data.polygon, "polygon", "star", false);
    this.loadShape((_c = data.image) !== null && _c !== void 0 ? _c : data.images, "image", "images", true);

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }

  loadShape(item, mainKey, altKey, altOverride) {
    var _a, _b, _c, _d;

    if (item === undefined) {
      return;
    }

    if (item instanceof Array) {
      if (!(this.options[mainKey] instanceof Array)) {
        this.options[mainKey] = [];

        if (!this.options[altKey] || altOverride) {
          this.options[altKey] = [];
        }
      }

      this.options[mainKey] = deepExtend((_a = this.options[mainKey]) !== null && _a !== void 0 ? _a : [], item);

      if (!this.options[altKey] || altOverride) {
        this.options[altKey] = deepExtend((_b = this.options[altKey]) !== null && _b !== void 0 ? _b : [], item);
      }
    } else {
      if (this.options[mainKey] instanceof Array) {
        this.options[mainKey] = {};

        if (!this.options[altKey] || altOverride) {
          this.options[altKey] = {};
        }
      }

      this.options[mainKey] = deepExtend((_c = this.options[mainKey]) !== null && _c !== void 0 ? _c : {}, item);

      if (!this.options[altKey] || altOverride) {
        this.options[altKey] = deepExtend((_d = this.options[altKey]) !== null && _d !== void 0 ? _d : {}, item);
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Size/SizeAnimation.js

class SizeAnimation extends AnimationOptions {
  constructor() {
    super();
    this.count = 0;
    this.destroy = "none";
    this.enable = false;
    this.speed = 5;
    this.startValue = "random";
    this.sync = false;
  }

  get size_min() {
    return this.minimumValue;
  }

  set size_min(value) {
    this.minimumValue = value;
  }

  load(data) {
    var _a;

    super.load(data);

    if (data === undefined) {
      return;
    }

    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }

    this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.size_min;

    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Size/Size.js



class Size extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new SizeAnimation();
    this.random.minimumValue = 1;
    this.value = 3;
  }

  get anim() {
    return this.animation;
  }

  set anim(value) {
    this.animation = value;
  }

  load(data) {
    var _a;

    if (!data) {
      return;
    }

    super.load(data);
    this.animation.load((_a = data.animation) !== null && _a !== void 0 ? _a : data.anim);

    if (this.animation.enable) {
      this.value = setRangeValue(this.value, this.animation.minimumValue);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Rotate/Rotate.js


class Rotate extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new AnimationOptions();
    this.animation.speed = 0;
    this.direction = "clockwise";
    this.path = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    super.load(data);

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    this.animation.load(data.animation);

    if (data.path !== undefined) {
      this.path = data.path;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Shadow.js

class Shadow {
  constructor() {
    this.blur = 0;
    this.color = new OptionsColor();
    this.enable = false;
    this.offset = {
      x: 0,
      y: 0
    };
    this.color.value = "#000000";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.blur !== undefined) {
      this.blur = data.blur;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.offset === undefined) {
      return;
    }

    if (data.offset.x !== undefined) {
      this.offset.x = data.offset.x;
    }

    if (data.offset.y !== undefined) {
      this.offset.y = data.offset.y;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/ColorAnimation.js

class ColorAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.offset = 0;
    this.speed = 1;
    this.sync = true;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.offset !== undefined) {
      this.offset = setRangeValue(data.offset);
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/HslAnimation.js

class HslAnimation {
  constructor() {
    this.h = new ColorAnimation();
    this.s = new ColorAnimation();
    this.l = new ColorAnimation();
  }

  load(data) {
    if (!data) {
      return;
    }

    this.h.load(data.h);
    this.s.load(data.s);
    this.l.load(data.l);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/AnimatableColor.js


class AnimatableColor extends OptionsColor {
  constructor() {
    super();
    this.animation = new HslAnimation();
  }

  static create(source, data) {
    const color = source !== null && source !== void 0 ? source : new AnimatableColor();

    if (data !== undefined) {
      color.load(typeof data === "string" ? {
        value: data
      } : data);
    }

    return color;
  }

  load(data) {
    super.load(data);

    if (!data) {
      return;
    }

    const colorAnimation = data.animation;

    if (colorAnimation !== undefined) {
      if (colorAnimation.enable !== undefined) {
        this.animation.h.load(colorAnimation);
      } else {
        this.animation.load(data.animation);
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Stroke.js

class Stroke {
  constructor() {
    this.width = 0;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = AnimatableColor.create(this.color, data.color);
    }

    if (data.width !== undefined) {
      this.width = data.width;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Bounce/BounceFactor.js

class BounceFactor extends ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Bounce/Bounce.js

class Bounce {
  constructor() {
    this.horizontal = new BounceFactor();
    this.vertical = new BounceFactor();
  }

  load(data) {
    if (!data) {
      return;
    }

    this.horizontal.load(data.horizontal);
    this.vertical.load(data.vertical);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Collisions/CollisionsOverlap.js
class CollisionsOverlap {
  constructor() {
    this.enable = true;
    this.retries = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.retries !== undefined) {
      this.retries = data.retries;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Collisions/Collisions.js


class Collisions {
  constructor() {
    this.bounce = new Bounce();
    this.enable = false;
    this.mode = "bounce";
    this.overlap = new CollisionsOverlap();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.bounce.load(data.bounce);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    this.overlap.load(data.overlap);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Twinkle/TwinkleValues.js

class TwinkleValues {
  constructor() {
    this.enable = false;
    this.frequency = 0.05;
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.frequency !== undefined) {
      this.frequency = data.frequency;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Twinkle/Twinkle.js

class Twinkle {
  constructor() {
    this.lines = new TwinkleValues();
    this.particles = new TwinkleValues();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.lines.load(data.lines);
    this.particles.load(data.particles);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Life/LifeDelay.js

class LifeDelay extends ValueWithRandom {
  constructor() {
    super();
    this.sync = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    super.load(data);

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Life/LifeDuration.js

class LifeDuration extends ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 0.0001;
    this.sync = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    super.load(data);

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Life/Life.js


class Life {
  constructor() {
    this.count = 0;
    this.delay = new LifeDelay();
    this.duration = new LifeDuration();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    this.delay.load(data.delay);
    this.duration.load(data.duration);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Orbit/OrbitRotation.js

class OrbitRotation extends ValueWithRandom {
  constructor() {
    super();
    this.value = 45;
    this.random.enable = false;
    this.random.minimumValue = 0;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    super.load(data);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Orbit/Orbit.js



class Orbit {
  constructor() {
    this.animation = new AnimationOptions();
    this.enable = false;
    this.opacity = 1;
    this.rotation = new OrbitRotation();
    this.width = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.animation.load(data.animation);
    this.rotation.load(data.rotation);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    if (data.width !== undefined) {
      this.width = data.width;
    }

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/ZIndex/ZIndex.js

class ZIndex extends ValueWithRandom {
  constructor() {
    super();
    this.opacityRate = 1;
    this.sizeRate = 1;
    this.velocityRate = 1;
  }

  load(data) {
    super.load(data);

    if (!data) {
      return;
    }

    if (data.opacityRate !== undefined) {
      this.opacityRate = data.opacityRate;
    }

    if (data.sizeRate !== undefined) {
      this.sizeRate = data.sizeRate;
    }

    if (data.velocityRate !== undefined) {
      this.velocityRate = data.velocityRate;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Repulse/Repulse.js

class Repulse extends ValueWithRandom {
  constructor() {
    super();
    this.enabled = false;
    this.distance = 1;
    this.duration = 1;
    this.factor = 1;
    this.speed = 1;
  }

  load(data) {
    super.load(data);

    if (!data) {
      return;
    }

    if (data.enabled !== undefined) {
      this.enabled = data.enabled;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Destroy/SplitFactor.js

class SplitFactor extends ValueWithRandom {
  constructor() {
    super();
    this.value = 3;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Destroy/SplitRate.js

class SplitRate extends ValueWithRandom {
  constructor() {
    super();
    this.value = 9;
    this.random.enable = true;
    this.random.minimumValue = 4;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Destroy/Split.js



class Split {
  constructor() {
    this.count = 1;
    this.factor = new SplitFactor();
    this.rate = new SplitRate();
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    this.factor.load(data.factor);
    this.rate.load(data.rate);

    if (data.particles !== undefined) {
      this.particles = deepExtend({}, data.particles);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Destroy/Destroy.js

class Destroy {
  constructor() {
    this.mode = "none";
    this.split = new Split();
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    this.split.load(data.split);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Particles.js



















class Particles_Particles {
  constructor() {
    this.bounce = new Bounce();
    this.collisions = new Collisions();
    this.color = new AnimatableColor();
    this.destroy = new Destroy();
    this.groups = {};
    this.life = new Life();
    this.links = new Links();
    this.move = new Move();
    this.number = new ParticlesNumber();
    this.orbit = new Orbit();
    this.opacity = new Opacity();
    this.reduceDuplicates = false;
    this.repulse = new Repulse();
    this.rotate = new Rotate();
    this.shadow = new Shadow();
    this.shape = new Shape();
    this.size = new Size();
    this.stroke = new Stroke();
    this.twinkle = new Twinkle();
    this.zIndex = new ZIndex();
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
    this.links = value;
  }

  load(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

    if (!data) {
      return;
    }

    this.zIndex.load(data.zIndex);
    this.repulse.load(data.repulse);
    this.bounce.load(data.bounce);
    this.color = AnimatableColor.create(this.color, data.color);
    this.destroy.load(data.destroy);

    if (data.groups !== undefined) {
      for (const group in data.groups) {
        const item = data.groups[group];

        if (item !== undefined) {
          this.groups[group] = deepExtend((_a = this.groups[group]) !== null && _a !== void 0 ? _a : {}, item);
        }
      }
    }

    this.life.load(data.life);
    const links = (_c = (_b = data.links) !== null && _b !== void 0 ? _b : data.lineLinked) !== null && _c !== void 0 ? _c : data.line_linked;

    if (links !== undefined) {
      this.links.load(links);
    }

    this.move.load(data.move);

    if (((_e = (_d = data.move) === null || _d === void 0 ? void 0 : _d.attract) === null || _e === void 0 ? void 0 : _e.distance) === undefined) {
      this.move.attract.distance = this.links.distance;
    }

    this.number.load(data.number);
    this.opacity.load(data.opacity);

    if (data.reduceDuplicates !== undefined) {
      this.reduceDuplicates = data.reduceDuplicates;
    }

    this.rotate.load(data.rotate);
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.twinkle.load(data.twinkle);
    this.orbit.load(data.orbit);
    const collisions = (_g = (_f = data.move) === null || _f === void 0 ? void 0 : _f.collisions) !== null && _g !== void 0 ? _g : (_h = data.move) === null || _h === void 0 ? void 0 : _h.bounce;

    if (collisions !== undefined) {
      this.collisions.enable = collisions;
    }

    this.collisions.load(data.collisions);
    const strokeToLoad = (_j = data.stroke) !== null && _j !== void 0 ? _j : (_k = data.shape) === null || _k === void 0 ? void 0 : _k.stroke;

    if (strokeToLoad === undefined) {
      return;
    }

    if (strokeToLoad instanceof Array) {
      this.stroke = strokeToLoad.map(s => {
        const tmp = new Stroke();
        tmp.load(s);
        return tmp;
      });
    } else {
      if (this.stroke instanceof Array) {
        this.stroke = new Stroke();
      }

      this.stroke.load(strokeToLoad);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Particle/Vector3d.js

class Vector3d extends Vector {
  constructor(x, y, z) {
    super(x, y);
    this.z = z;
  }

  add(v) {
    return v instanceof Vector3d ? new Vector3d(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
  }

  addTo(v) {
    super.addTo(v);

    if (v instanceof Vector3d) {
      this.z += v.z;
    }
  }

  sub(v) {
    return v instanceof Vector3d ? new Vector3d(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
  }

  subFrom(v) {
    super.subFrom(v);

    if (v instanceof Vector3d) {
      this.z -= v.z;
    }
  }

  mult(n) {
    return new Vector3d(this.x * n, this.y * n, this.z * n);
  }

  multTo(n) {
    super.multTo(n);
    this.z *= n;
  }

  div(n) {
    return new Vector3d(this.x / n, this.y / n, this.z / n);
  }

  divTo(n) {
    super.divTo(n);
    this.z /= n;
  }

  copy() {
    return new Vector3d(this.x, this.y, this.z);
  }

  setTo(v) {
    super.setTo(v);

    if (v instanceof Vector3d) {
      this.z = v.z;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Particle.js





class Particle {
  constructor(id, container, position, overrideOptions, group) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

    this.id = id;
    this.container = container;
    this.group = group;
    this.links = [];
    this.fill = true;
    this.close = true;
    this.lastNoiseTime = 0;
    this.splitCount = 0;
    this.unbreakable = false;
    this.destroyed = false;
    this.misplaced = false;
    this.loops = {
      opacity: 0,
      size: 0
    };
    this.infection = {};
    this.maxDistance = {};
    const pxRatio = container.retina.pixelRatio;
    const options = container.options;
    const particlesOptions = new Particles_Particles();
    particlesOptions.load(options.particles);
    const shapeType = particlesOptions.shape.type;
    const reduceDuplicates = particlesOptions.reduceDuplicates;
    this.shape = shapeType instanceof Array ? itemFromArray(shapeType, this.id, reduceDuplicates) : shapeType;

    if (overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) {
      if (overrideOptions.shape.type) {
        const overrideShapeType = overrideOptions.shape.type;
        this.shape = overrideShapeType instanceof Array ? itemFromArray(overrideShapeType, this.id, reduceDuplicates) : overrideShapeType;
      }

      const shapeOptions = new Shape();
      shapeOptions.load(overrideOptions.shape);

      if (this.shape) {
        this.shapeData = this.loadShapeData(shapeOptions, reduceDuplicates);
      }
    } else {
      this.shapeData = this.loadShapeData(particlesOptions.shape, reduceDuplicates);
    }

    if (overrideOptions !== undefined) {
      particlesOptions.load(overrideOptions);
    }

    if (((_a = this.shapeData) === null || _a === void 0 ? void 0 : _a.particles) !== undefined) {
      particlesOptions.load((_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.particles);
    }

    this.fill = (_d = (_c = this.shapeData) === null || _c === void 0 ? void 0 : _c.fill) !== null && _d !== void 0 ? _d : this.fill;
    this.close = (_f = (_e = this.shapeData) === null || _e === void 0 ? void 0 : _e.close) !== null && _f !== void 0 ? _f : this.close;
    this.options = particlesOptions;
    const zIndexValue = getRangeValue(this.options.zIndex.value);
    const sizeOptions = this.options.size;
    const sizeValue = getRangeValue(sizeOptions.value) * container.retina.pixelRatio;
    const randomSize = typeof sizeOptions.random === "boolean" ? sizeOptions.random : sizeOptions.random.enable;
    this.size = {
      value: sizeValue
    };
    this.position = this.calcPosition(this.container, position, clamp(zIndexValue, 0, container.zLayers));
    this.initialPosition = this.position.copy();
    const particles = this.container.particles;
    particles.needsSort = particles.needsSort || particles.lastZIndex < this.position.z;
    particles.lastZIndex = this.position.z;
    this.offset = new Vector(0, 0);
    this.zIndexFactor = this.position.z / container.zLayers;
    this.noiseDelay = getRangeValue(this.options.move.noise.delay.value) * 1000;
    container.retina.initParticle(this);
    const color = this.options.color;
    this.direction = this.options.move.direction;
    this.moveSpeed = getRangeValue(this.options.move.speed);
    this.bubble = {
      inRange: false
    };
    this.initialVelocity = this.calculateVelocity();
    this.velocity = this.initialVelocity.copy();
    const rotateOptions = this.options.rotate;
    this.rotate = {
      value: deg2rad(rotateOptions.random.enable ? Math.random() * 360 : getRangeValue(rotateOptions.value))
    };
    let rotateDirection = rotateOptions.direction;

    if (rotateDirection === "random") {
      const index = Math.floor(Math.random() * 2);
      rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
    }

    switch (rotateDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        this.rotate.status = 1;
        break;

      case "clockwise":
        this.rotate.status = 0;
        break;
    }

    const rotateAnimation = this.options.rotate.animation;

    if (rotateAnimation.enable) {
      this.rotate.velocity = rotateAnimation.speed / 360 * container.retina.reduceFactor;

      if (!rotateAnimation.sync) {
        this.rotate.velocity *= Math.random();
      }
    }

    const sizeAnimation = this.options.size.animation;

    if (sizeAnimation.enable) {
      this.size.status = 0;

      if (!randomSize) {
        switch (sizeAnimation.startValue) {
          case "min":
            this.size.value = getRangeMin(this.options.size.value) * pxRatio;
            this.size.status = 0;
            break;

          case "random":
            this.size.value = getRangeValue(this.options.size.value) * pxRatio;
            this.size.status = Math.random() >= 0.5 ? 0 : 1;
            break;

          case "max":
          default:
            this.size.value = getRangeMax(this.options.size.value) * pxRatio;
            this.size.status = 1;
            break;
        }
      }

      this.size.velocity = ((_g = this.sizeAnimationSpeed) !== null && _g !== void 0 ? _g : container.retina.sizeAnimationSpeed) / 100 * container.retina.reduceFactor;

      if (!sizeAnimation.sync) {
        this.size.velocity *= Math.random();
      }
    }

    const orbitOptions = particlesOptions.orbit;

    if (orbitOptions.enable) {
      this.orbitRotation = getRangeValue(orbitOptions.rotation.value);
      this.orbitColor = colorToHsl(orbitOptions.color);
    }

    const hslColor = colorToHsl(color, this.id, reduceDuplicates);

    if (hslColor) {
      this.color = {
        h: {
          value: hslColor.h
        },
        s: {
          value: hslColor.s
        },
        l: {
          value: hslColor.l
        }
      };
      const colorAnimation = this.options.color.animation;
      this.setColorAnimation(colorAnimation.h, this.color.h);
      this.setColorAnimation(colorAnimation.s, this.color.s);
      this.setColorAnimation(colorAnimation.l, this.color.l);
    }

    const opacityOptions = this.options.opacity;
    const randomOpacity = typeof opacityOptions.random === "boolean" ? opacityOptions.random : opacityOptions.random.enable;
    this.opacity = {
      value: getRangeValue(opacityOptions.value)
    };
    this.opacity.value = clamp(this.opacity.value, 0, 1);
    const opacityAnimation = opacityOptions.animation;

    if (opacityAnimation.enable) {
      this.opacity.status = 0;

      if (!randomOpacity) {
        switch (opacityAnimation.startValue) {
          case "min":
            this.opacity.value = getRangeMin(this.options.opacity.value);
            this.opacity.status = 0;
            break;

          case "random":
            this.opacity.value = getRangeValue(this.options.opacity.value);
            this.opacity.status = Math.random() >= 0.5 ? 0 : 1;
            break;

          case "max":
          default:
            this.opacity.value = getRangeMax(this.options.opacity.value);
            this.opacity.status = 1;
            break;
        }
      }

      this.opacity.velocity = opacityAnimation.speed / 100 * container.retina.reduceFactor;

      if (!opacityAnimation.sync) {
        this.opacity.velocity *= Math.random();
      }
    }

    this.sides = 24;
    let drawer = container.drawers.get(this.shape);

    if (!drawer) {
      drawer = Plugins.getShapeDrawer(this.shape);

      if (drawer) {
        container.drawers.set(this.shape, drawer);
      }
    }

    if (drawer === null || drawer === void 0 ? void 0 : drawer.loadShape) {
      drawer === null || drawer === void 0 ? void 0 : drawer.loadShape(this);
    }

    const sideCountFunc = drawer === null || drawer === void 0 ? void 0 : drawer.getSidesCount;

    if (sideCountFunc) {
      this.sides = sideCountFunc(this);
    }

    this.stroke = this.options.stroke instanceof Array ? itemFromArray(this.options.stroke, this.id, reduceDuplicates) : this.options.stroke;
    this.strokeWidth = this.stroke.width * container.retina.pixelRatio;
    const strokeHslColor = (_h = colorToHsl(this.stroke.color)) !== null && _h !== void 0 ? _h : this.getFillColor();

    if (strokeHslColor) {
      this.strokeColor = {
        h: {
          value: strokeHslColor.h
        },
        s: {
          value: strokeHslColor.s
        },
        l: {
          value: strokeHslColor.l
        }
      };
      const strokeColorAnimation = (_j = this.stroke.color) === null || _j === void 0 ? void 0 : _j.animation;

      if (strokeColorAnimation && this.strokeColor) {
        this.setColorAnimation(strokeColorAnimation.h, this.strokeColor.h);
        this.setColorAnimation(strokeColorAnimation.s, this.strokeColor.s);
        this.setColorAnimation(strokeColorAnimation.l, this.strokeColor.l);
      }
    }

    const lifeOptions = particlesOptions.life;
    this.life = {
      delay: container.retina.reduceFactor ? getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : Math.random()) / container.retina.reduceFactor * 1000 : 0,
      delayTime: 0,
      duration: container.retina.reduceFactor ? getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : Math.random()) / container.retina.reduceFactor * 1000 : 0,
      time: 0,
      count: particlesOptions.life.count
    };
    this.spawning = this.life.delay > 0;

    if (this.life.duration <= 0) {
      this.life.duration = -1;
    }

    if (this.life.count <= 0) {
      this.life.count = -1;
    }

    if (this.options.move.spin.enable) {
      const spinPos = (_k = this.options.move.spin.position) !== null && _k !== void 0 ? _k : {
        x: 50,
        y: 50
      };
      const spinCenter = {
        x: spinPos.x / 100 * this.container.canvas.size.width,
        y: spinPos.y / 100 * this.container.canvas.size.height
      };
      const pos = this.getPosition();
      const distance = getDistance(pos, spinCenter);
      this.spin = {
        center: spinCenter,
        direction: this.velocity.x >= 0 ? "clockwise" : "counter-clockwise",
        angle: this.velocity.angle,
        radius: distance,
        acceleration: this.options.move.spin.acceleration
      };
    }

    this.shadowColor = colorToRgb(this.options.shadow.color);
  }

  draw(delta) {
    this.container.canvas.drawParticle(this, delta);
  }

  getPosition() {
    return {
      x: this.position.x + this.offset.x,
      y: this.position.y + this.offset.y,
      z: this.position.z
    };
  }

  getRadius() {
    return this.bubble.radius || this.size.value;
  }

  getFillColor() {
    var _a;

    return (_a = this.bubble.color) !== null && _a !== void 0 ? _a : getHslFromAnimation(this.color);
  }

  getStrokeColor() {
    var _a, _b;

    return (_b = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : getHslFromAnimation(this.strokeColor)) !== null && _b !== void 0 ? _b : this.getFillColor();
  }

  destroy(override) {
    if (this.unbreakable) {
      return;
    }

    this.destroyed = true;
    this.bubble.inRange = false;
    this.links = [];

    if (override) {
      return;
    }

    const destroyOptions = this.options.destroy;

    if (destroyOptions.mode === "split") {
      this.split();
    }
  }

  reset() {
    this.loops.opacity = 0;
    this.loops.size = 0;
  }

  setColorAnimation(colorAnimation, colorValue) {
    if (colorAnimation.enable) {
      colorValue.velocity = colorAnimation.speed / 100 * this.container.retina.reduceFactor;

      if (colorAnimation.sync) {
        return;
      }

      colorValue.status = 0;
      colorValue.velocity *= Math.random();

      if (colorValue.value) {
        colorValue.value *= Math.random();
      }
    } else {
      colorValue.velocity = 0;
    }
  }

  calcPosition(container, position, zIndex, tryCount = 0) {
    var _a, _b;

    for (const [, plugin] of container.plugins) {
      const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

      if (pluginPos !== undefined) {
        return new Vector3d(pluginPos.x, pluginPos.y, zIndex);
      }
    }

    const cSize = container.canvas.size;
    const pos = new Vector3d((_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : cSize.width * Math.random(), (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : cSize.height * Math.random(), zIndex);
    this.fixPositionInCanvas(pos);

    if (this.checkOverlap(pos, tryCount)) {
      return this.calcPosition(container, undefined, pos.z, tryCount + 1);
    }

    return pos;
  }

  fixPositionInCanvas(pos) {
    const container = this.container;
    const outMode = this.options.move.outModes;
    const hOut = [outMode.right, outMode.left];
    const vOut = [outMode.bottom, outMode.top];
    pos.x += this.getOutCanvasFix(["bounce", "bounce-horizontal"], hOut, container.canvas.size.width, pos.x);
    pos.y += this.getOutCanvasFix(["bounce", "bounce-vertical"], vOut, container.canvas.size.height, pos.y);
  }

  getOutCanvasFix(outModes, modes, size, coordinate) {
    for (const outMode of outModes) {
      if (!isInArray(outMode, modes)) {
        continue;
      }

      if (coordinate > size - this.size.value * 2) {
        return this.size.value;
      } else if (coordinate < this.size.value * 2) {
        return -this.size.value;
      }
    }

    return 0;
  }

  checkOverlap(pos, tryCount = 0) {
    const overlapOptions = this.options.collisions.overlap;

    if (!overlapOptions.enable) {
      const retries = overlapOptions.retries;

      if (retries >= 0 && tryCount > retries) {
        throw new Error("Particle is overlapping and can't be placed");
      }

      let overlaps = false;

      for (const particle of this.container.particles.array) {
        if (getDistance(pos, particle.position) < this.size.value + particle.size.value) {
          overlaps = true;
          break;
        }
      }

      return overlaps;
    }

    return false;
  }

  calculateVelocity() {
    const res = getParticleBaseVelocity(this.direction),
          moveOptions = this.options.move,
          angle = deg2rad(moveOptions.angle.value),
          offset = deg2rad(moveOptions.angle.offset);

    if (moveOptions.straight && moveOptions.random || !moveOptions.straight) {
      const range = setRangeValue(offset - angle / 2, offset + angle / 2);
      res.angle += randomInRange(range);
    }

    return res;
  }

  split() {
    const splitOptions = this.options.destroy.split;

    if (splitOptions.count >= 0 && this.splitCount++ > splitOptions.count) {
      return;
    }

    const rate = getRangeValue(splitOptions.rate.value);

    for (let i = 0; i < rate; i++) {
      this.container.particles.addSplitParticle(this);
    }
  }

  loadShapeData(shapeOptions, reduceDuplicates) {
    const shapeData = shapeOptions.options[this.shape];

    if (shapeData) {
      return deepExtend({}, shapeData instanceof Array ? itemFromArray(shapeData, this.id, reduceDuplicates) : shapeData);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/InteractionManager.js

class InteractionManager {
  constructor(container) {
    this.container = container;
    const interactors = Plugins.getInteractors(container);
    this.externalInteractors = [];
    this.particleInteractors = [];

    for (const interactor of interactors) {
      switch (interactor.type) {
        case 0:
          this.externalInteractors.push(interactor);
          break;

        case 1:
          this.particleInteractors.push(interactor);
          break;
      }
    }
  }

  externalInteract(delta) {
    for (const interactor of this.externalInteractors) {
      if (interactor.isEnabled()) {
        interactor.interact(delta);
      }
    }
  }

  particlesInteract(particle, delta) {
    for (const interactor of this.externalInteractors) {
      interactor.reset(particle);
    }

    for (const interactor of this.particleInteractors) {
      if (interactor.isEnabled(particle)) {
        interactor.interact(particle, delta);
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Particle/Infecter.js
class Infecter_Infecter {
  constructor(container) {
    this.container = container;
  }

  startInfection(particle, stage) {
    const options = this.container.options,
          stages = options.infection.stages,
          stagesCount = stages.length;

    if (stage > stagesCount || stage < 0) {
      return;
    }

    particle.infection.delay = 0;
    particle.infection.delayStage = stage;
  }

  updateInfectionStage(particle, stage) {
    const options = this.container.options,
          stagesCount = options.infection.stages.length;

    if (stage > stagesCount || stage < 0 || particle.infection.stage !== undefined && particle.infection.stage > stage) {
      return;
    }

    particle.infection.stage = stage;
    particle.infection.time = 0;
  }

  updateInfection(particle, delta) {
    const options = this.container.options,
          infection = options.infection,
          stages = options.infection.stages,
          stagesCount = stages.length;

    if (particle.infection.delay !== undefined && particle.infection.delayStage !== undefined) {
      const stage = particle.infection.delayStage;

      if (stage > stagesCount || stage < 0) {
        return;
      }

      if (particle.infection.delay > infection.delay * 1000) {
        particle.infection.stage = stage;
        particle.infection.time = 0;
        delete particle.infection.delay;
        delete particle.infection.delayStage;
      } else {
        particle.infection.delay += delta;
      }
    } else {
      delete particle.infection.delay;
      delete particle.infection.delayStage;
    }

    if (particle.infection.stage !== undefined && particle.infection.time !== undefined) {
      const infectionStage = stages[particle.infection.stage];

      if (infectionStage.duration !== undefined && infectionStage.duration >= 0) {
        if (particle.infection.time > infectionStage.duration * 1000) {
          this.nextInfectionStage(particle);
        } else {
          particle.infection.time += delta;
        }
      } else {
        particle.infection.time += delta;
      }
    } else {
      delete particle.infection.stage;
      delete particle.infection.time;
    }
  }

  nextInfectionStage(particle) {
    const options = this.container.options,
          stagesCount = options.infection.stages.length;

    if (stagesCount <= 0 || particle.infection.stage === undefined) {
      return;
    }

    particle.infection.time = 0;

    if (stagesCount <= ++particle.infection.stage) {
      if (options.infection.cure) {
        delete particle.infection.stage;
        delete particle.infection.time;
        return;
      } else {
        particle.infection.stage = 0;
        particle.infection.time = 0;
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Particle/Mover.js


class Mover {
  constructor(container) {
    this.container = container;
  }

  move(particle, delta) {
    const resizeFactor = this.container.canvas.resizeFactor;

    if (resizeFactor) {
      particle.position.x *= resizeFactor.width;
      particle.position.y *= resizeFactor.height;
    }

    particle.bubble.inRange = false;
    particle.links = [];

    for (const [, plugin] of this.container.plugins) {
      if (particle.destroyed) {
        break;
      }

      if (plugin.particleUpdate) {
        plugin.particleUpdate(particle, delta);
      }
    }

    if (particle.destroyed) {
      return;
    }

    this.moveParticle(particle, delta);
    this.moveParallax(particle);
  }

  moveParticle(particle, delta) {
    const particlesOptions = particle.options;

    if (!particlesOptions.move.enable) {
      return;
    }

    const container = this.container,
          slowFactor = this.getProximitySpeedFactor(particle),
          baseSpeed = particle.moveSpeed * container.retina.pixelRatio * container.retina.reduceFactor,
          sizeValue = particle.options.size.value,
          maxSize = getRangeMax(sizeValue) * container.retina.pixelRatio,
          sizeFactor = particlesOptions.move.size ? particle.getRadius() / maxSize : 1,
          moveSpeed = baseSpeed / 4 * sizeFactor * slowFactor * delta.factor;
    this.applyNoise(particle, delta);
    const gravityOptions = particlesOptions.move.gravity;

    if (gravityOptions.enable) {
      particle.velocity.y += gravityOptions.acceleration * delta.factor / (60 * moveSpeed);
    }

    const velocity = particle.velocity.mult(moveSpeed);

    if (gravityOptions.enable && velocity.y >= gravityOptions.maxSpeed && gravityOptions.maxSpeed > 0) {
      velocity.y = gravityOptions.maxSpeed;
      particle.velocity.y = velocity.y / moveSpeed;
    }

    const zIndexOptions = particle.options.zIndex,
          zVelocityFactor = 1 - zIndexOptions.velocityRate * particle.zIndexFactor;

    if (particlesOptions.move.spin.enable) {
      this.spin(particle, moveSpeed);
    } else {
      velocity.multTo(zVelocityFactor);
      particle.position.addTo(velocity);

      if (particlesOptions.move.vibrate) {
        const vibrateVelocity = new Vector(Math.sin(particle.position.x * Math.cos(particle.position.y) * zVelocityFactor), Math.cos(particle.position.y * Math.sin(particle.position.x) * zVelocityFactor));
        particle.position.addTo(vibrateVelocity);
      }
    }

    this.applyDistance(particle);
  }

  spin(particle, moveSpeed) {
    const container = this.container;

    if (!particle.spin) {
      return;
    }

    const updateFunc = {
      x: particle.spin.direction === "clockwise" ? Math.cos : Math.sin,
      y: particle.spin.direction === "clockwise" ? Math.sin : Math.cos
    };
    particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
    particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
    particle.spin.radius += particle.spin.acceleration;
    const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height);

    if (particle.spin.radius > maxCanvasSize / 2) {
      particle.spin.radius = maxCanvasSize / 2;
      particle.spin.acceleration *= -1;
    } else if (particle.spin.radius < 0) {
      particle.spin.radius = 0;
      particle.spin.acceleration *= -1;
    }

    particle.spin.angle += moveSpeed / 100 * (1 - particle.spin.radius / maxCanvasSize);
  }

  applyDistance(particle) {
    const initialPosition = particle.initialPosition;
    const {
      dx,
      dy
    } = getDistances(initialPosition, particle.position);
    const dxFixed = Math.abs(dx),
          dyFixed = Math.abs(dy);
    const hDistance = particle.maxDistance.horizontal;
    const vDistance = particle.maxDistance.vertical;

    if (!(hDistance !== undefined || vDistance !== undefined)) {
      return;
    }

    if ((hDistance !== undefined && dxFixed >= hDistance || vDistance !== undefined && dyFixed >= vDistance) && !particle.misplaced) {
      particle.misplaced = hDistance !== undefined && dxFixed > hDistance || vDistance !== undefined && dyFixed > vDistance;

      if (hDistance !== undefined) {
        particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
      }

      if (vDistance !== undefined) {
        particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
      }
    } else if ((hDistance === undefined || dxFixed < hDistance) && (vDistance === undefined || dyFixed < vDistance) && particle.misplaced) {
      particle.misplaced = false;
    } else if (particle.misplaced) {
      const pos = particle.position,
            vel = particle.velocity;

      if (hDistance !== undefined && (pos.x < initialPosition.x && vel.x < 0 || pos.x > initialPosition.x && vel.x > 0)) {
        vel.x *= -Math.random();
      }

      if (vDistance !== undefined && (pos.y < initialPosition.y && vel.y < 0 || pos.y > initialPosition.y && vel.y > 0)) {
        vel.y *= -Math.random();
      }
    }
  }

  applyNoise(particle, delta) {
    const particlesOptions = particle.options,
          noiseOptions = particlesOptions.move.noise,
          noiseEnabled = noiseOptions.enable;

    if (!noiseEnabled) {
      return;
    }

    const container = this.container;

    if (particle.lastNoiseTime <= particle.noiseDelay) {
      particle.lastNoiseTime += delta.value;
      return;
    }

    let generator = container.noise;

    if (noiseOptions.generator) {
      const customGenerator = Plugins.getNoiseGenerator(noiseOptions.generator);

      if (customGenerator) {
        generator = customGenerator;
      }
    }

    const noise = generator.generate(particle),
          vel = particle.velocity,
          noiseVel = new Vector(0, 0);
    noiseVel.length = noise.length;
    noiseVel.angle = noise.angle;
    vel.addTo(noiseVel);

    if (noiseOptions.clamp) {
      vel.x = clamp(vel.x, -1, 1);
      vel.y = clamp(vel.y, -1, 1);
    }

    particle.lastNoiseTime -= particle.noiseDelay;
  }

  moveParallax(particle) {
    const container = this.container,
          options = container.options;

    if (isSsr() || !options.interactivity.events.onHover.parallax.enable) {
      return;
    }

    const parallaxForce = options.interactivity.events.onHover.parallax.force,
          mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const canvasCenter = {
      x: container.canvas.size.width / 2,
      y: container.canvas.size.height / 2
    },
          parallaxSmooth = options.interactivity.events.onHover.parallax.smooth,
          factor = particle.getRadius() / parallaxForce,
          tmp = {
      x: (mousePos.x - canvasCenter.x) * factor,
      y: (mousePos.y - canvasCenter.y) * factor
    };
    particle.offset.x += (tmp.x - particle.offset.x) / parallaxSmooth;
    particle.offset.y += (tmp.y - particle.offset.y) / parallaxSmooth;
  }

  getProximitySpeedFactor(particle) {
    const container = this.container,
          options = container.options,
          active = isInArray("slow", options.interactivity.events.onHover.mode);

    if (!active) {
      return 1;
    }

    const mousePos = this.container.interactivity.mouse.position;

    if (!mousePos) {
      return 1;
    }

    const particlePos = particle.getPosition(),
          dist = getDistance(mousePos, particlePos),
          radius = container.retina.slowModeRadius;

    if (dist > radius) {
      return 1;
    }

    const proximityFactor = dist / radius || 0,
          slowFactor = options.interactivity.modes.slow.factor;
    return proximityFactor / slowFactor;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Particles.js






class Particles {
  constructor(container) {
    this.container = container;
    this.nextId = 0;
    this.array = [];
    this.limit = 0;
    this.needsSort = false;
    this.lastZIndex = 0;
    this.linksFreq = new Map();
    this.trianglesFreq = new Map();
    this.interactionManager = new InteractionManager(this.container);
    this.infecter = new Infecter_Infecter(this.container);
    this.mover = new Mover(this.container);
    const canvasSize = this.container.canvas.size;
    this.linksColors = new Map();
    this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    this.updaters = Plugins.getUpdaters(container);
  }

  get count() {
    return this.array.length;
  }

  init() {
    var _a;

    const container = this.container;
    const options = container.options;
    this.lastZIndex = 0;
    this.needsSort = false;
    this.linksFreq = new Map();
    this.trianglesFreq = new Map();
    let handled = false;

    for (const [, plugin] of container.plugins) {
      if (plugin.particlesInitialization !== undefined) {
        handled = plugin.particlesInitialization();
      }

      if (handled) {
        break;
      }
    }

    this.addManualParticles();

    if (!handled) {
      for (const group in options.particles.groups) {
        const groupOptions = options.particles.groups[group];

        for (let i = this.count, j = 0; j < ((_a = groupOptions.number) === null || _a === void 0 ? void 0 : _a.value) && i < options.particles.number.value; i++, j++) {
          this.addParticle(undefined, groupOptions, group);
        }
      }

      for (let i = this.count; i < options.particles.number.value; i++) {
        this.addParticle();
      }
    }

    if (options.infection.enable) {
      for (let i = 0; i < options.infection.infections; i++) {
        const notInfected = this.array.filter(p => p.infection.stage === undefined);
        const infected = itemFromArray(notInfected);
        this.infecter.startInfection(infected, 0);
      }
    }

    container.noise.init();
  }

  redraw() {
    this.clear();
    this.init();
    this.draw({
      value: 0,
      factor: 0
    });
  }

  removeAt(index, quantity = 1, group, override) {
    if (!(index >= 0 && index <= this.count)) {
      return;
    }

    let deleted = 0;

    for (let i = index; deleted < quantity && i < this.count; i++) {
      const particle = this.array[i];

      if (!particle || particle.group !== group) {
        continue;
      }

      particle.destroy(override);
      this.array.splice(i--, 1);
      deleted++;
    }
  }

  remove(particle, group, override) {
    this.removeAt(this.array.indexOf(particle), undefined, group !== null && group !== void 0 ? group : particle.group, override);
  }

  update(delta) {
    const container = this.container;
    const particlesToDelete = [];
    container.noise.update();

    for (const [, plugin] of container.plugins) {
      if (plugin.update !== undefined) {
        plugin.update(delta);
      }
    }

    for (const particle of this.array) {
      if (particle.destroyed) {
        particlesToDelete.push(particle);
        continue;
      }

      this.mover.move(particle, delta);

      if (particle.destroyed) {
        particlesToDelete.push(particle);
        continue;
      }

      this.quadTree.insert(new Point(particle.getPosition(), particle));
    }

    for (const particle of particlesToDelete) {
      this.remove(particle);
    }

    this.interactionManager.externalInteract(delta);

    for (const particle of this.container.particles.array) {
      for (const updater of this.updaters) {
        updater.update(particle, delta);
      }

      if (!particle.destroyed && !particle.spawning) {
        this.interactionManager.particlesInteract(particle, delta);
      }
    }

    delete container.canvas.resizeFactor;
  }

  draw(delta) {
    const container = this.container;
    container.canvas.clear();
    const canvasSize = this.container.canvas.size;
    this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    this.update(delta);

    for (const [, plugin] of container.plugins) {
      container.canvas.drawPlugin(plugin, delta);
    }

    if (this.needsSort) {
      this.array.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
      this.lastZIndex = this.array[this.array.length - 1].position.z;
      this.needsSort = false;
    }

    for (const p of this.array) {
      p.draw(delta);
    }
  }

  clear() {
    this.array = [];
  }

  push(nb, mouse, overrideOptions, group) {
    this.pushing = true;

    if (this.limit > 0) {
      const countToRemove = this.count + nb - this.limit;

      if (countToRemove > 0) {
        this.removeQuantity(countToRemove, group);
      }
    }

    for (let i = 0; i < nb; i++) {
      this.addParticle(mouse === null || mouse === void 0 ? void 0 : mouse.position, overrideOptions, group);
    }

    this.pushing = false;
  }

  addParticle(position, overrideOptions, group) {
    return this.pushParticle(position, overrideOptions, group);
  }

  addSplitParticle(parent) {
    const splitOptions = parent.options.destroy.split;
    const options = new Particles_Particles();
    options.load(parent.options);
    const factor = getRangeValue(splitOptions.factor.value);
    options.color.load({
      value: {
        hsl: parent.getFillColor()
      }
    });

    if (typeof options.size.value === "number") {
      options.size.value /= factor;
    } else {
      options.size.value.min /= factor;
      options.size.value.max /= factor;
    }

    options.load(splitOptions.particles);
    const offset = setRangeValue(-parent.size.value, parent.size.value);
    const position = {
      x: parent.position.x + randomInRange(offset),
      y: parent.position.y + randomInRange(offset)
    };
    return this.pushParticle(position, options, parent.group, particle => {
      if (particle.size.value < 0.5) {
        return false;
      }

      particle.splitCount = parent.splitCount + 1;
      particle.unbreakable = true;
      setTimeout(() => {
        particle.unbreakable = false;
      }, 500);
      return true;
    });
  }

  removeQuantity(quantity, group) {
    this.removeAt(0, quantity, group);
  }

  getLinkFrequency(p1, p2) {
    const key = `${Math.min(p1.id, p2.id)}_${Math.max(p1.id, p2.id)}`;
    let res = this.linksFreq.get(key);

    if (res === undefined) {
      res = Math.random();
      this.linksFreq.set(key, res);
    }

    return res;
  }

  getTriangleFrequency(p1, p2, p3) {
    let [id1, id2, id3] = [p1.id, p2.id, p3.id];

    if (id1 > id2) {
      [id2, id1] = [id1, id2];
    }

    if (id2 > id3) {
      [id3, id2] = [id2, id3];
    }

    if (id1 > id3) {
      [id3, id1] = [id1, id3];
    }

    const key = `${id1}_${id2}_${id3}`;
    let res = this.trianglesFreq.get(key);

    if (res === undefined) {
      res = Math.random();
      this.trianglesFreq.set(key, res);
    }

    return res;
  }

  addManualParticles() {
    const container = this.container;
    const options = container.options;

    for (const particle of options.manualParticles) {
      const pos = particle.position ? {
        x: particle.position.x * container.canvas.size.width / 100,
        y: particle.position.y * container.canvas.size.height / 100
      } : undefined;
      this.addParticle(pos, particle.options);
    }
  }

  setDensity() {
    const options = this.container.options;

    for (const group in options.particles.groups) {
      this.applyDensity(options.particles.groups[group], 0, group);
    }

    this.applyDensity(options.particles, options.manualParticles.length);
  }

  applyDensity(options, manualCount, group) {
    const numberOptions = options.number;
    const densityFactor = this.initDensityFactor(numberOptions.density);
    const optParticlesNumber = numberOptions.value;
    const optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber;
    const particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount;
    const particlesCount = Math.min(this.count, this.array.filter(t => t.group === group).length);
    this.limit = numberOptions.limit * densityFactor;

    if (particlesCount < particlesNumber) {
      this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
    } else if (particlesCount > particlesNumber) {
      this.removeQuantity(particlesCount - particlesNumber, group);
    }
  }

  initDensityFactor(densityOptions) {
    const container = this.container;

    if (!container.canvas.element || !(densityOptions === null || densityOptions === void 0 ? void 0 : densityOptions.enable)) {
      return 1;
    }

    const canvas = container.canvas.element;
    const pxRatio = container.retina.pixelRatio;
    return canvas.width * canvas.height / (densityOptions.factor * Math.pow(pxRatio, 2) * densityOptions.area);
  }

  pushParticle(position, overrideOptions, group, initializer) {
    try {
      const particle = new Particle(this.nextId, this.container, position, overrideOptions, group);
      let canAdd = true;

      if (initializer) {
        canAdd = initializer(particle);
      }

      if (!canAdd) {
        return;
      }

      this.array.push(particle);
      this.nextId++;
      return particle;
    } catch (e) {
      console.warn(`error adding particle: ${e}`);
      return;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Retina.js

class Retina {
  constructor(container) {
    this.container = container;
  }

  init() {
    const container = this.container;
    const options = container.options;

    if (options.detectRetina) {
      this.pixelRatio = typeof devicePixelRatio === "undefined" ? 1 : devicePixelRatio;
    } else {
      this.pixelRatio = 1;
    }

    const motionOptions = this.container.options.motion;

    if (motionOptions && (motionOptions.disable || motionOptions.reduce.value)) {
      if (isSsr() || typeof matchMedia === "undefined" || !matchMedia) {
        this.reduceFactor = 1;
      } else {
        const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");

        if (mediaQuery) {
          this.handleMotionChange(mediaQuery);

          const handleChange = () => {
            this.handleMotionChange(mediaQuery);
            container.refresh().catch(() => {});
          };

          if (mediaQuery.addEventListener !== undefined) {
            mediaQuery.addEventListener("change", handleChange);
          } else if (mediaQuery.addListener !== undefined) {
            mediaQuery.addListener(handleChange);
          }
        }
      }
    } else {
      this.reduceFactor = 1;
    }

    const ratio = this.pixelRatio;

    if (container.canvas.element) {
      const element = container.canvas.element;
      container.canvas.size.width = element.offsetWidth * ratio;
      container.canvas.size.height = element.offsetHeight * ratio;
    }

    const particles = options.particles;
    this.attractDistance = particles.move.attract.distance * ratio;
    this.linksDistance = particles.links.distance * ratio;
    this.linksWidth = particles.links.width * ratio;
    this.sizeAnimationSpeed = particles.size.animation.speed * ratio;

    if (particles.orbit.radius !== undefined) {
      this.orbitRadius = particles.orbit.radius * this.container.retina.pixelRatio;
    }

    const modes = options.interactivity.modes;
    this.connectModeDistance = modes.connect.distance * ratio;
    this.connectModeRadius = modes.connect.radius * ratio;
    this.grabModeDistance = modes.grab.distance * ratio;
    this.repulseModeDistance = modes.repulse.distance * ratio;
    this.bounceModeDistance = modes.bounce.distance * ratio;
    this.attractModeDistance = modes.attract.distance * ratio;
    this.slowModeRadius = modes.slow.radius * ratio;
    this.bubbleModeDistance = modes.bubble.distance * ratio;

    if (modes.bubble.size) {
      this.bubbleModeSize = modes.bubble.size * ratio;
    }
  }

  initParticle(particle) {
    const options = particle.options;
    const ratio = this.pixelRatio;
    const orbit = options.orbit;
    const moveDistance = options.move.distance;
    particle.attractDistance = options.move.attract.distance * ratio;
    particle.linksDistance = options.links.distance * ratio;
    particle.linksWidth = options.links.width * ratio;
    particle.sizeAnimationSpeed = options.size.animation.speed * ratio;
    particle.orbitRadius = (orbit === null || orbit === void 0 ? void 0 : orbit.radius) !== undefined ? orbit.radius * ratio : undefined;

    if (particle.spin) {
      particle.spin.acceleration = options.move.spin.acceleration * ratio;
    }

    const maxDistance = particle.maxDistance;
    maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
    maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
  }

  handleMotionChange(mediaQuery) {
    const options = this.container.options;

    if (mediaQuery.matches) {
      const motion = options.motion;
      this.reduceFactor = motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1;
    } else {
      this.reduceFactor = 1;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/FrameManager.js
class FrameManager {
  constructor(container) {
    this.container = container;
  }

  nextFrame(timestamp) {
    try {
      const container = this.container;

      if (container.lastFrameTime !== undefined && timestamp < container.lastFrameTime + 1000 / container.fpsLimit) {
        container.draw();
        return;
      }

      const deltaValue = timestamp - container.lastFrameTime;
      const delta = {
        value: deltaValue,
        factor: 60 * deltaValue / 1000
      };
      container.lastFrameTime = timestamp;
      container.particles.draw(delta);

      if (container.getAnimationStatus()) {
        container.draw();
      }
    } catch (e) {
      console.error("tsParticles error in animation loop", e);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Events/ClickEvent.js
class ClickEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Events/DivEvent.js
class DivEvent {
  constructor() {
    this.selectors = [];
    this.enable = false;
    this.mode = [];
    this.type = "circle";
  }

  get elementId() {
    return this.ids;
  }

  set elementId(value) {
    this.ids = value;
  }

  get el() {
    return this.elementId;
  }

  set el(value) {
    this.elementId = value;
  }

  get ids() {
    if (this.selectors instanceof Array) {
      return this.selectors.map(t => t.replace("#", ""));
    } else {
      return this.selectors.replace("#", "");
    }
  }

  set ids(value) {
    if (value instanceof Array) {
      this.selectors = value.map(t => `#${t}`);
    } else {
      this.selectors = `#${value}`;
    }
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    const ids = (_b = (_a = data.ids) !== null && _a !== void 0 ? _a : data.elementId) !== null && _b !== void 0 ? _b : data.el;

    if (ids !== undefined) {
      this.ids = ids;
    }

    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Events/Parallax.js
class Parallax {
  constructor() {
    this.enable = false;
    this.force = 2;
    this.smooth = 10;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.force !== undefined) {
      this.force = data.force;
    }

    if (data.smooth !== undefined) {
      this.smooth = data.smooth;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Events/HoverEvent.js

class HoverEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
    this.parallax = new Parallax();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    this.parallax.load(data.parallax);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Events/Events.js



class Events {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent();
    this.onHover = new HoverEvent();
    this.resize = true;
  }

  get onclick() {
    return this.onClick;
  }

  set onclick(value) {
    this.onClick = value;
  }

  get ondiv() {
    return this.onDiv;
  }

  set ondiv(value) {
    this.onDiv = value;
  }

  get onhover() {
    return this.onHover;
  }

  set onhover(value) {
    this.onHover = value;
  }

  load(data) {
    var _a, _b, _c;

    if (data === undefined) {
      return;
    }

    this.onClick.load((_a = data.onClick) !== null && _a !== void 0 ? _a : data.onclick);
    const onDiv = (_b = data.onDiv) !== null && _b !== void 0 ? _b : data.ondiv;

    if (onDiv !== undefined) {
      if (onDiv instanceof Array) {
        this.onDiv = onDiv.map(div => {
          const tmp = new DivEvent();
          tmp.load(div);
          return tmp;
        });
      } else {
        this.onDiv = new DivEvent();
        this.onDiv.load(onDiv);
      }
    }

    this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);

    if (data.resize !== undefined) {
      this.resize = data.resize;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/BubbleBase.js

class BubbleBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    if (data.color !== undefined) {
      if (data.color instanceof Array) {
        this.color = data.color.map(s => OptionsColor.create(undefined, s));
      } else {
        if (this.color instanceof Array) {
          this.color = new OptionsColor();
        }

        this.color = OptionsColor.create(this.color, data.color);
      }
    }

    if (data.size !== undefined) {
      this.size = data.size;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/BubbleDiv.js

class BubbleDiv extends BubbleBase {
  constructor() {
    super();
    this.selectors = [];
  }

  get ids() {
    if (this.selectors instanceof Array) {
      return this.selectors.map(t => t.replace("#", ""));
    } else {
      return this.selectors.replace("#", "");
    }
  }

  set ids(value) {
    if (value instanceof Array) {
      this.selectors = value.map(t => `#${t}`);
    } else {
      this.selectors = `#${value}`;
    }
  }

  load(data) {
    super.load(data);

    if (data === undefined) {
      return;
    }

    if (data.ids !== undefined) {
      this.ids = data.ids;
    }

    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Bubble.js


class Bubble extends BubbleBase {
  load(data) {
    super.load(data);

    if (!(data !== undefined && data.divs !== undefined)) {
      return;
    }

    if (data.divs instanceof Array) {
      this.divs = data.divs.map(s => {
        const tmp = new BubbleDiv();
        tmp.load(s);
        return tmp;
      });
    } else {
      if (this.divs instanceof Array || !this.divs) {
        this.divs = new BubbleDiv();
      }

      this.divs.load(data.divs);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/ConnectLinks.js
class ConnectLinks {
  constructor() {
    this.opacity = 0.5;
  }

  load(data) {
    if (!(data !== undefined && data.opacity !== undefined)) {
      return;
    }

    this.opacity = data.opacity;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Connect.js

class Connect {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
    this.radius = 60;
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
    this.links = value;
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/GrabLinks.js

class GrabLinks {
  constructor() {
    this.blink = false;
    this.consent = false;
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.blink !== undefined) {
      this.blink = data.blink;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.consent !== undefined) {
      this.consent = data.consent;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Grab.js

class Grab {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
    this.links = value;
  }

  load(data) {
    var _a, _b;

    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Remove.js
class Remove {
  constructor() {
    this.default = true;
    this.groups = [];
    this.quantity = 2;
  }

  get particles_nb() {
    return this.quantity;
  }

  set particles_nb(value) {
    this.quantity = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    if (data.default !== undefined) {
      this.default = data.default;
    }

    if (data.groups !== undefined) {
      this.groups = data.groups.map(t => t);
    }

    if (!this.groups.length) {
      this.default = true;
    }

    const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;

    if (quantity !== undefined) {
      this.quantity = quantity;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Push.js
class Push {
  constructor() {
    this.default = true;
    this.groups = [];
    this.quantity = 4;
  }

  get particles_nb() {
    return this.quantity;
  }

  set particles_nb(value) {
    this.quantity = value;
  }

  load(data) {
    var _a;

    if (data === undefined) {
      return;
    }

    if (data.default !== undefined) {
      this.default = data.default;
    }

    if (data.groups !== undefined) {
      this.groups = data.groups.map(t => t);
    }

    if (!this.groups.length) {
      this.default = true;
    }

    const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;

    if (quantity !== undefined) {
      this.quantity = quantity;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/RepulseBase.js
class RepulseBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.factor = 100;
    this.speed = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/RepulseDiv.js

class RepulseDiv extends RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }

  get ids() {
    if (this.selectors instanceof Array) {
      return this.selectors.map(t => t.replace("#", ""));
    } else {
      return this.selectors.replace("#", "");
    }
  }

  set ids(value) {
    if (value instanceof Array) {
      this.selectors = value.map(() => `#${value}`);
    } else {
      this.selectors = `#${value}`;
    }
  }

  load(data) {
    super.load(data);

    if (data === undefined) {
      return;
    }

    if (data.ids !== undefined) {
      this.ids = data.ids;
    }

    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Repulse.js


class Repulse_Repulse extends RepulseBase {
  load(data) {
    super.load(data);

    if ((data === null || data === void 0 ? void 0 : data.divs) === undefined) {
      return;
    }

    if (data.divs instanceof Array) {
      this.divs = data.divs.map(s => {
        const tmp = new RepulseDiv();
        tmp.load(s);
        return tmp;
      });
    } else {
      if (this.divs instanceof Array || !this.divs) {
        this.divs = new RepulseDiv();
      }

      this.divs.load(data.divs);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Slow.js
class Slow {
  constructor() {
    this.factor = 3;
    this.radius = 200;
  }

  get active() {
    return false;
  }

  set active(_value) {}

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Trail.js

class Trail_Trail {
  constructor() {
    this.delay = 1;
    this.quantity = 1;
    this.pauseOnStop = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.delay !== undefined) {
      this.delay = data.delay;
    }

    if (data.quantity !== undefined) {
      this.quantity = data.quantity;
    }

    if (data.particles !== undefined) {
      this.particles = deepExtend({}, data.particles);
    }

    if (data.pauseOnStop !== undefined) {
      this.pauseOnStop = data.pauseOnStop;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Attract.js
class Attract_Attract {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.factor = 1;
    this.speed = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    if (data.duration !== undefined) {
      this.duration = data.duration;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/LightGradient.js

class LightGradient {
  constructor() {
    this.start = new OptionsColor();
    this.stop = new OptionsColor();
    this.start.value = "#ffffff";
    this.stop.value = "#000000";
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.start = OptionsColor.create(this.start, data.start);
    this.stop = OptionsColor.create(this.stop, data.stop);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/LightArea.js

class LightArea {
  constructor() {
    this.gradient = new LightGradient();
    this.radius = 1000;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.gradient.load(data.gradient);

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/LightShadow.js

class LightShadow {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#000000";
    this.length = 2000;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (data.length !== undefined) {
      this.length = data.length;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Light.js


class Light {
  constructor() {
    this.area = new LightArea();
    this.shadow = new LightShadow();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.area.load(data.area);
    this.shadow.load(data.shadow);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Bounce.js
class Bounce_Bounce {
  constructor() {
    this.distance = 200;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Modes.js











class Modes {
  constructor() {
    this.attract = new Attract_Attract();
    this.bounce = new Bounce_Bounce();
    this.bubble = new Bubble();
    this.connect = new Connect();
    this.grab = new Grab();
    this.light = new Light();
    this.push = new Push();
    this.remove = new Remove();
    this.repulse = new Repulse_Repulse();
    this.slow = new Slow();
    this.trail = new Trail_Trail();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.attract.load(data.attract);
    this.bubble.load(data.bubble);
    this.connect.load(data.connect);
    this.grab.load(data.grab);
    this.light.load(data.light);
    this.push.load(data.push);
    this.remove.load(data.remove);
    this.repulse.load(data.repulse);
    this.slow.load(data.slow);
    this.trail.load(data.trail);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Interactivity.js


class Interactivity {
  constructor() {
    this.detectsOn = "canvas";
    this.events = new Events();
    this.modes = new Modes();
  }

  get detect_on() {
    return this.detectsOn;
  }

  set detect_on(value) {
    this.detectsOn = value;
  }

  load(data) {
    var _a, _b, _c;

    if (data === undefined) {
      return;
    }

    const detectsOn = (_a = data.detectsOn) !== null && _a !== void 0 ? _a : data.detect_on;

    if (detectsOn !== undefined) {
      this.detectsOn = detectsOn;
    }

    this.events.load(data.events);
    this.modes.load(data.modes);

    if (((_c = (_b = data.modes) === null || _b === void 0 ? void 0 : _b.slow) === null || _c === void 0 ? void 0 : _c.active) === true) {
      if (this.events.onHover.mode instanceof Array) {
        if (this.events.onHover.mode.indexOf("slow") < 0) {
          this.events.onHover.mode.push("slow");
        }
      } else if (this.events.onHover.mode !== "slow") {
        this.events.onHover.mode = [this.events.onHover.mode, "slow"];
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/BackgroundMask/BackgroundMaskCover.js

class BackgroundMaskCover {
  constructor() {
    this.color = new OptionsColor();
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/BackgroundMask/BackgroundMask.js

class BackgroundMask {
  constructor() {
    this.composite = "destination-out";
    this.cover = new BackgroundMaskCover();
    this.enable = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.composite !== undefined) {
      this.composite = data.composite;
    }

    if (data.cover !== undefined) {
      const cover = data.cover;
      const color = typeof data.cover === "string" ? {
        color: data.cover
      } : data.cover;
      this.cover.load(cover.color !== undefined ? cover : {
        color: color
      });
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Background/Background.js

class Background {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "";
    this.image = "";
    this.position = "";
    this.repeat = "";
    this.size = "";
    this.opacity = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    this.color = OptionsColor.create(this.color, data.color);

    if (data.image !== undefined) {
      this.image = data.image;
    }

    if (data.position !== undefined) {
      this.position = data.position;
    }

    if (data.repeat !== undefined) {
      this.repeat = data.repeat;
    }

    if (data.size !== undefined) {
      this.size = data.size;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Infection/InfectionStage.js

class InfectionStage {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#ff0000";
    this.radius = 0;
    this.rate = 1;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }

    this.duration = data.duration;
    this.infectedStage = data.infectedStage;

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }

    if (data.rate !== undefined) {
      this.rate = data.rate;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Infection/Infection.js

class Infection {
  constructor() {
    this.cure = false;
    this.delay = 0;
    this.enable = false;
    this.infections = 0;
    this.stages = [];
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.cure !== undefined) {
      this.cure = data.cure;
    }

    if (data.delay !== undefined) {
      this.delay = data.delay;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.infections !== undefined) {
      this.infections = data.infections;
    }

    if (data.stages === undefined) {
      return;
    }

    this.stages = data.stages.map(t => {
      const s = new InfectionStage();
      s.load(t);
      return s;
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Theme/ThemeDefault.js
class ThemeDefault {
  constructor() {
    this.mode = "any";
    this.value = false;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Theme/Theme.js


class Theme {
  constructor() {
    this.name = "";
    this.default = new ThemeDefault();
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    if (data.name !== undefined) {
      this.name = data.name;
    }

    this.default.load(data.default);

    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/FullScreen/FullScreen.js
class FullScreen {
  constructor() {
    this.enable = false;
    this.zIndex = -1;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.zIndex !== undefined) {
      this.zIndex = data.zIndex;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Motion/MotionReduce.js
class MotionReduce {
  constructor() {
    this.factor = 4;
    this.value = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.factor !== undefined) {
      this.factor = data.factor;
    }

    if (data.value !== undefined) {
      this.value = data.value;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Motion/Motion.js

class Motion {
  constructor() {
    this.disable = false;
    this.reduce = new MotionReduce();
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.disable !== undefined) {
      this.disable = data.disable;
    }

    this.reduce.load(data.reduce);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/ManualParticle.js

class ManualParticle {
  load(data) {
    var _a, _b;

    if (!data) {
      return;
    }

    if (data.position !== undefined) {
      this.position = {
        x: (_a = data.position.x) !== null && _a !== void 0 ? _a : 50,
        y: (_b = data.position.y) !== null && _b !== void 0 ? _b : 50
      };
    }

    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Responsive.js

class Responsive {
  constructor() {
    this.maxWidth = Infinity;
    this.options = {};
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.maxWidth !== undefined) {
      this.maxWidth = data.maxWidth;
    }

    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Options.js











class Options {
  constructor() {
    this.autoPlay = true;
    this.background = new Background();
    this.backgroundMask = new BackgroundMask();
    this.fullScreen = new FullScreen();
    this.detectRetina = true;
    this.fpsLimit = 30;
    this.infection = new Infection();
    this.interactivity = new Interactivity();
    this.manualParticles = [];
    this.motion = new Motion();
    this.particles = new Particles_Particles();
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = false;
    this.responsive = [];
    this.themes = [];
    this.particles.number.value = 100;
  }

  get backgroundMode() {
    return this.fullScreen;
  }

  set backgroundMode(value) {
    this.fullScreen = value;
  }

  get fps_limit() {
    return this.fpsLimit;
  }

  set fps_limit(value) {
    this.fpsLimit = value;
  }

  get retina_detect() {
    return this.detectRetina;
  }

  set retina_detect(value) {
    this.detectRetina = value;
  }

  load(data) {
    var _a, _b, _c;

    if (data === undefined) {
      return;
    }

    if (data.preset !== undefined) {
      if (data.preset instanceof Array) {
        for (const preset of data.preset) {
          this.importPreset(preset);
        }
      } else {
        this.importPreset(data.preset);
      }
    }

    if (data.autoPlay !== undefined) {
      this.autoPlay = data.autoPlay;
    }

    const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;

    if (detectRetina !== undefined) {
      this.detectRetina = detectRetina;
    }

    const fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;

    if (fpsLimit !== undefined) {
      this.fpsLimit = fpsLimit;
    }

    if (data.pauseOnBlur !== undefined) {
      this.pauseOnBlur = data.pauseOnBlur;
    }

    if (data.pauseOnOutsideViewport !== undefined) {
      this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
    }

    this.background.load(data.background);
    this.fullScreen.load((_c = data.fullScreen) !== null && _c !== void 0 ? _c : data.backgroundMode);
    this.backgroundMask.load(data.backgroundMask);
    this.infection.load(data.infection);
    this.interactivity.load(data.interactivity);

    if (data.manualParticles !== undefined) {
      this.manualParticles = data.manualParticles.map(t => {
        const tmp = new ManualParticle();
        tmp.load(t);
        return tmp;
      });
    }

    this.motion.load(data.motion);
    this.particles.load(data.particles);
    Plugins.loadOptions(this, data);

    if (data.responsive !== undefined) {
      for (const responsive of data.responsive) {
        const optResponsive = new Responsive();
        optResponsive.load(responsive);
        this.responsive.push(optResponsive);
      }
    }

    this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);

    if (data.themes !== undefined) {
      for (const theme of data.themes) {
        const optTheme = new Theme();
        optTheme.load(theme);
        this.themes.push(optTheme);
      }
    }
  }

  setTheme(name) {
    if (name) {
      const chosenTheme = this.themes.find(theme => theme.name === name);

      if (chosenTheme) {
        this.load(chosenTheme.options);
      }
    } else {
      const clientDarkMode = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches;
      let defaultTheme = this.themes.find(theme => theme.default.value && (theme.default.mode === "dark" && clientDarkMode || theme.default.mode === "light" && !clientDarkMode));

      if (!defaultTheme) {
        defaultTheme = this.themes.find(theme => theme.default.value && theme.default.mode === "any");
      }

      if (defaultTheme) {
        this.load(defaultTheme.options);
      }
    }
  }

  setResponsive(width, pxRatio, defaultOptions) {
    var _a;

    this.load(defaultOptions);
    this.load((_a = this.responsive.find(t => t.maxWidth * pxRatio > width)) === null || _a === void 0 ? void 0 : _a.options);
  }

  importPreset(preset) {
    this.load(Plugins.getPreset(preset));
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Container.js
var Container_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};







class Container {
  constructor(id, sourceOptions, ...presets) {
    this.id = id;
    this.sourceOptions = sourceOptions;
    this.zLayers = 10000;
    this.firstStart = true;
    this.started = false;
    this.destroyed = false;
    this.paused = true;
    this.lastFrameTime = 0;
    this.pageHidden = false;
    this.retina = new Retina(this);
    this.canvas = new Canvas(this);
    this.particles = new Particles(this);
    this.drawer = new FrameManager(this);
    this.noise = {
      generate: () => {
        return {
          angle: Math.random() * Math.PI * 2,
          length: Math.random()
        };
      },
      init: () => {},
      update: () => {}
    };
    this.interactivity = {
      mouse: {
        clicking: false,
        inside: false
      }
    };
    this.bubble = {};
    this.repulse = {
      particles: []
    };
    this.attract = {
      particles: []
    };
    this.plugins = new Map();
    this.drawers = new Map();
    this.fullOptions = new Options();
    this.options = new Options();

    for (const preset of presets) {
      this.fullOptions.load(Plugins.getPreset(preset));
    }

    const shapes = Plugins.getSupportedShapes();

    for (const type of shapes) {
      const drawer = Plugins.getShapeDrawer(type);

      if (drawer) {
        this.drawers.set(type, drawer);
      }
    }

    if (this.sourceOptions) {
      this.fullOptions.load(this.sourceOptions);
    }

    this.fpsLimit = this.fullOptions.fpsLimit > 0 ? this.fullOptions.fpsLimit : 60;
    this.eventListeners = new EventListeners(this);

    if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(entries => this.intersectionManager(entries));
    }
  }

  play(force) {
    const needsUpdate = this.paused || force;

    if (this.firstStart && !this.options.autoPlay) {
      this.firstStart = false;
      return;
    }

    if (this.paused) {
      this.paused = false;
    }

    if (needsUpdate) {
      for (const [, plugin] of this.plugins) {
        if (plugin.play) {
          plugin.play();
        }
      }

      this.lastFrameTime = performance.now();
    }

    this.draw();
  }

  pause() {
    if (this.drawAnimationFrame !== undefined) {
      cancelAnimation()(this.drawAnimationFrame);
      delete this.drawAnimationFrame;
    }

    if (this.paused) {
      return;
    }

    for (const [, plugin] of this.plugins) {
      if (plugin.pause) {
        plugin.pause();
      }
    }

    if (!this.pageHidden) {
      this.paused = true;
    }
  }

  draw() {
    this.drawAnimationFrame = animate()(timestamp => this.drawer.nextFrame(timestamp));
  }

  getAnimationStatus() {
    return !this.paused;
  }

  setNoise(noiseOrGenerator, init, update) {
    if (!noiseOrGenerator) {
      return;
    }

    if (typeof noiseOrGenerator === "function") {
      this.noise.generate = noiseOrGenerator;

      if (init) {
        this.noise.init = init;
      }

      if (update) {
        this.noise.update = update;
      }
    } else {
      if (noiseOrGenerator.generate) {
        this.noise.generate = noiseOrGenerator.generate;
      }

      if (noiseOrGenerator.init) {
        this.noise.init = noiseOrGenerator.init;
      }

      if (noiseOrGenerator.update) {
        this.noise.update = noiseOrGenerator.update;
      }
    }
  }

  destroy() {
    this.stop();
    this.canvas.destroy();

    for (const [, drawer] of this.drawers) {
      if (drawer.destroy) {
        drawer.destroy(this);
      }
    }

    for (const key of this.drawers.keys()) {
      this.drawers.delete(key);
    }

    this.destroyed = true;
  }

  exportImg(callback) {
    this.exportImage(callback);
  }

  exportImage(callback, type, quality) {
    var _a;

    return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
  }

  exportConfiguration() {
    return JSON.stringify(this.options, undefined, 2);
  }

  refresh() {
    return Container_awaiter(this, void 0, void 0, function* () {
      this.stop();
      return this.start();
    });
  }

  stop() {
    if (!this.started) {
      return;
    }

    this.firstStart = true;
    this.started = false;
    this.eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.clear();

    if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
      this.intersectionObserver.observe(this.interactivity.element);
    }

    for (const [, plugin] of this.plugins) {
      if (plugin.stop) {
        plugin.stop();
      }
    }

    for (const key of this.plugins.keys()) {
      this.plugins.delete(key);
    }

    this.particles.linksColors = new Map();
    delete this.particles.grabLineColor;
    delete this.particles.linksColor;
  }

  loadTheme(name) {
    return Container_awaiter(this, void 0, void 0, function* () {
      this.options.setTheme(name);
      return this.refresh();
    });
  }

  start() {
    return Container_awaiter(this, void 0, void 0, function* () {
      if (this.started) {
        return;
      }

      yield this.init();
      this.started = true;
      this.eventListeners.addListeners();

      if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
        this.intersectionObserver.observe(this.interactivity.element);
      }

      for (const [, plugin] of this.plugins) {
        if (plugin.startAsync !== undefined) {
          yield plugin.startAsync();
        } else if (plugin.start !== undefined) {
          plugin.start();
        }
      }

      this.play();
    });
  }

  init() {
    return Container_awaiter(this, void 0, void 0, function* () {
      this.options = new Options();
      this.options.load(this.fullOptions);
      this.retina.init();
      this.canvas.init();
      this.options.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this.fullOptions);
      this.options.setTheme(undefined);
      this.retina.init();
      this.canvas.init();
      this.fpsLimit = this.options.fpsLimit > 0 ? this.options.fpsLimit : 60;
      const availablePlugins = Plugins.getAvailablePlugins(this);

      for (const [id, plugin] of availablePlugins) {
        this.plugins.set(id, plugin);
      }

      const drawerPromises = [];

      for (const [, drawer] of this.drawers) {
        if (drawer.init) {
          drawerPromises.push(drawer.init(this));
        }
      }

      yield Promise.allSettled(drawerPromises);

      for (const [, plugin] of this.plugins) {
        if (plugin.init) {
          plugin.init(this.options);
        } else if (plugin.initAsync !== undefined) {
          yield plugin.initAsync(this.options);
        }
      }

      this.particles.init();
      this.particles.setDensity();
    });
  }

  intersectionManager(entries) {
    if (!this.options.pauseOnOutsideViewport) {
      return;
    }

    for (const entry of entries) {
      if (entry.target !== this.interactivity.element) {
        continue;
      }

      if (entry.isIntersecting) {
        this.play();
      } else {
        this.pause();
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Loader.js
var Loader_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



const tsParticlesDom = [];

function fetchError(statusCode) {
  console.error(`Error tsParticles - fetch status: ${statusCode}`);
  console.error("Error tsParticles - File config not found");
}

class Loader {
  static dom() {
    return tsParticlesDom;
  }

  static domItem(index) {
    const dom = Loader.dom();
    const item = dom[index];

    if (item && !item.destroyed) {
      return item;
    }

    dom.splice(index, 1);
  }

  static load(tagId, options, index) {
    return Loader_awaiter(this, void 0, void 0, function* () {
      const domContainer = document.getElementById(tagId);

      if (!domContainer) {
        return;
      }

      return Loader.set(tagId, domContainer, options, index);
    });
  }

  static set(id, domContainer, options, index) {
    return Loader_awaiter(this, void 0, void 0, function* () {
      const currentOptions = options instanceof Array ? itemFromArray(options, index) : options;
      const dom = Loader.dom();
      const oldIndex = dom.findIndex(v => v.id === id);

      if (oldIndex >= 0) {
        const old = Loader.domItem(oldIndex);

        if (old && !old.destroyed) {
          old.destroy();
          dom.splice(oldIndex, 1);
        }
      }

      let canvasEl;
      let generatedCanvas;

      if (domContainer.tagName.toLowerCase() === "canvas") {
        canvasEl = domContainer;
        generatedCanvas = false;
      } else {
        const existingCanvases = domContainer.getElementsByTagName("canvas");

        if (existingCanvases.length) {
          canvasEl = existingCanvases[0];

          if (!canvasEl.className) {
            canvasEl.className = Constants.canvasClass;
          }

          generatedCanvas = false;
        } else {
          generatedCanvas = true;
          canvasEl = document.createElement("canvas");
          canvasEl.className = Constants.canvasClass;
          canvasEl.style.width = "100%";
          canvasEl.style.height = "100%";
          domContainer.appendChild(canvasEl);
        }
      }

      const newItem = new Container(id, currentOptions);

      if (oldIndex >= 0) {
        dom.splice(oldIndex, 0, newItem);
      } else {
        dom.push(newItem);
      }

      newItem.canvas.loadCanvas(canvasEl, generatedCanvas);
      yield newItem.start();
      return newItem;
    });
  }

  static loadJSON(tagId, jsonUrl, index) {
    return Loader_awaiter(this, void 0, void 0, function* () {
      const url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index) : jsonUrl;
      const response = yield fetch(url);

      if (response.ok) {
        return Loader.load(tagId, yield response.json());
      } else {
        fetchError(response.status);
      }
    });
  }

  static setJSON(id, domContainer, jsonUrl) {
    return Loader_awaiter(this, void 0, void 0, function* () {
      const response = yield fetch(jsonUrl);

      if (response.ok) {
        const options = yield response.json();
        return Loader.set(id, domContainer, options);
      } else {
        fetchError(response.status);
      }
    });
  }

  static setOnClickHandler(callback) {
    const dom = Loader.dom();

    if (dom.length === 0) {
      throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
    }

    for (const domItem of dom) {
      const el = domItem.interactivity.element;

      if (!el) {
        continue;
      }

      const clickOrTouchHandler = (e, pos) => {
        if (domItem.destroyed) {
          return;
        }

        const pxRatio = domItem.retina.pixelRatio;
        const posRetina = {
          x: pos.x * pxRatio,
          y: pos.y * pxRatio
        };
        const sizeValue = domItem.options.particles.size.value;
        const particles = domItem.particles.quadTree.queryCircle(posRetina, domItem.retina.pixelRatio * (typeof sizeValue === "number" ? sizeValue : sizeValue.max));
        callback(e, particles);
      };

      const clickHandler = e => {
        if (domItem.destroyed) {
          return;
        }

        const mouseEvent = e;
        const pos = {
          x: mouseEvent.offsetX || mouseEvent.clientX,
          y: mouseEvent.offsetY || mouseEvent.clientY
        };
        clickOrTouchHandler(e, pos);
      };

      const touchStartHandler = () => {
        if (domItem.destroyed) {
          return;
        }

        touched = true;
        touchMoved = false;
      };

      const touchMoveHandler = () => {
        if (domItem.destroyed) {
          return;
        }

        touchMoved = true;
      };

      const touchEndHandler = e => {
        var _a, _b, _c;

        if (domItem.destroyed) {
          return;
        }

        if (touched && !touchMoved) {
          const touchEvent = e;
          const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
          const canvasRect = (_a = domItem.canvas.element) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
          const pos = {
            x: lastTouch.clientX - ((_b = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _b !== void 0 ? _b : 0),
            y: lastTouch.clientY - ((_c = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _c !== void 0 ? _c : 0)
          };
          clickOrTouchHandler(e, pos);
        }

        touched = false;
        touchMoved = false;
      };

      const touchCancelHandler = () => {
        if (domItem.destroyed) {
          return;
        }

        touched = false;
        touchMoved = false;
      };

      let touched = false;
      let touchMoved = false;
      el.addEventListener("click", clickHandler);
      el.addEventListener("touchstart", touchStartHandler);
      el.addEventListener("touchmove", touchMoveHandler);
      el.addEventListener("touchend", touchEndHandler);
      el.addEventListener("touchcancel", touchCancelHandler);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/main.core.js
var main_core_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};



class MainCore {
  constructor() {
    this.initialized = false;
  }

  init() {
    if (!this.initialized) {
      this.initialized = true;
    }
  }

  loadFromArray(tagId, options, index) {
    return main_core_awaiter(this, void 0, void 0, function* () {
      return Loader.load(tagId, options, index);
    });
  }

  load(tagId, options) {
    return main_core_awaiter(this, void 0, void 0, function* () {
      return Loader.load(tagId, options);
    });
  }

  set(id, element, options) {
    return main_core_awaiter(this, void 0, void 0, function* () {
      return Loader.set(id, element, options);
    });
  }

  loadJSON(tagId, pathConfigJson, index) {
    return Loader.loadJSON(tagId, pathConfigJson, index);
  }

  setOnClickHandler(callback) {
    Loader.setOnClickHandler(callback);
  }

  dom() {
    return Loader.dom();
  }

  domItem(index) {
    return Loader.domItem(index);
  }

  addShape(shape, drawer, init, afterEffect, destroy) {
    let customDrawer;

    if (typeof drawer === "function") {
      customDrawer = {
        afterEffect: afterEffect,
        destroy: destroy,
        draw: drawer,
        init: init
      };
    } else {
      customDrawer = drawer;
    }

    Plugins.addShapeDrawer(shape, customDrawer);
  }

  addPreset(preset, options) {
    Plugins.addPreset(preset, options);
  }

  addPlugin(plugin) {
    Plugins.addPlugin(plugin);
  }

  addNoiseGenerator(name, generator) {
    Plugins.addNoiseGenerator(name, generator);
  }

  addInteractor(interactorInitializer) {
    Plugins.addInteractor(interactorInitializer);
  }

  addParticleUpdater(updaterInitializer) {
    Plugins.addParticleUpdater(updaterInitializer);
  }

}
;// CONCATENATED MODULE: ./dist/browser/main.slim.js



























class MainSlim extends MainCore {
  constructor() {
    super();
    const squareDrawer = new SquareDrawer();
    const textDrawer = new TextDrawer();
    const imageDrawer = new ImageDrawer();
    this.addParticleUpdater(container => new LifeUpdater(container));
    this.addParticleUpdater(container => new OpacityUpdater(container));
    this.addParticleUpdater(container => new SizeUpdater(container));
    this.addParticleUpdater(container => new AngleUpdater(container));
    this.addParticleUpdater(container => new ColorUpdater(container));
    this.addParticleUpdater(container => new StrokeColorUpdater(container));
    this.addParticleUpdater(container => new OutOfCanvasUpdater(container));
    this.addInteractor(container => new Bouncer(container));
    this.addInteractor(container => new Bubbler(container));
    this.addInteractor(container => new Connector(container));
    this.addInteractor(container => new Grabber(container));
    this.addInteractor(container => new Attractor(container));
    this.addInteractor(container => new Repulser(container));
    this.addInteractor(container => new Attractor_Attractor(container));
    this.addInteractor(container => new Collider(container));
    this.addInteractor(container => new Infecter(container));
    this.addInteractor(container => new Repulser_Repulser(container));
    this.addInteractor(container => new Linker(container));
    this.addShape("line", new LineDrawer());
    this.addShape("circle", new CircleDrawer());
    this.addShape("edge", squareDrawer);
    this.addShape("square", squareDrawer);
    this.addShape("triangle", new TriangleDrawer());
    this.addShape("star", new StarDrawer());
    this.addShape("polygon", new PolygonDrawer());
    this.addShape("char", textDrawer);
    this.addShape("character", textDrawer);
    this.addShape("image", imageDrawer);
    this.addShape("images", imageDrawer);
  }

}
;// CONCATENATED MODULE: ./dist/browser/pjs.js
const initPjs = main => {
  const particlesJS = (tagId, options) => {
    return main.load(tagId, options);
  };

  particlesJS.load = (tagId, pathConfigJson, callback) => {
    main.loadJSON(tagId, pathConfigJson).then(container => {
      if (container) {
        callback(container);
      }
    });
  };

  particlesJS.setOnClickHandler = callback => {
    main.setOnClickHandler(callback);
  };

  const pJSDom = main.dom();
  return {
    particlesJS,
    pJSDom
  };
};


;// CONCATENATED MODULE: ./dist/browser/index.slim.js



const tsParticles = new MainSlim();
tsParticles.init();
const {
  particlesJS,
  pJSDom
} = initPjs(tsParticles);






/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(355);
/******/ })()
;
});
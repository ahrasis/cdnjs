/*
Copyright (c) 2020 Daybrush
name: selecto
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/selecto.git
version: 1.6.2
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Selecto = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
      var t = {};

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    }
    function __decorate(decorators, target, key, desc) {
      var c = arguments.length,
          r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
          d;
      if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __spreadArrays() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

      return r;
    }

    /*
    Copyright (c) 2017 NAVER Corp.
    @egjs/component project is licensed under the MIT license

    @egjs/component JavaScript library
    https://naver.github.io/egjs-component

    @version 2.1.2
    */
    /**
     * Copyright (c) 2015 NAVER Corp.
     * egjs projects are licensed under the MIT license
     */
    function isUndefined(value) {
      return typeof value === "undefined";
    }
    /**
     * A class used to manage events in a component
     * @ko 컴포넌트의 이벤트을 관리할 수 있게 하는 클래스
     * @alias eg.Component
     */


    var Component =
    /*#__PURE__*/
    function () {
      var Component =
      /*#__PURE__*/
      function () {
        /**
        * Version info string
        * @ko 버전정보 문자열
        * @name VERSION
        * @static
        * @type {String}
        * @example
        * eg.Component.VERSION;  // ex) 2.0.0
        * @memberof eg.Component
        */

        /**
         * @support {"ie": "7+", "ch" : "latest", "ff" : "latest",  "sf" : "latest", "edge" : "latest", "ios" : "7+", "an" : "2.1+ (except 3.x)"}
         */
        function Component() {
          this._eventHandler = {};
          this.options = {};
        }
        /**
         * Triggers a custom event.
         * @ko 커스텀 이벤트를 발생시킨다
         * @param {String} eventName The name of the custom event to be triggered <ko>발생할 커스텀 이벤트의 이름</ko>
         * @param {Object} customEvent Event data to be sent when triggering a custom event <ko>커스텀 이벤트가 발생할 때 전달할 데이터</ko>
         * @return {Boolean} Indicates whether the event has occurred. If the stop() method is called by a custom event handler, it will return false and prevent the event from occurring. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">Ref</a> <ko>이벤트 발생 여부. 커스텀 이벤트 핸들러에서 stop() 메서드를 호출하면 'false'를 반환하고 이벤트 발생을 중단한다. <a href="https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F">참고</a></ko>
         * @example
        class Some extends eg.Component {
         some(){
         	if(this.trigger("beforeHi")){ // When event call to stop return false.
        	this.trigger("hi");// fire hi event.
         	}
         }
        }
        const some = new Some();
        some.on("beforeHi", (e) => {
        if(condition){
        	e.stop(); // When event call to stop, `hi` event not call.
        }
        });
        some.on("hi", (e) => {
        // `currentTarget` is component instance.
        console.log(some === e.currentTarget); // true
        });
        // If you want to more know event design. You can see article.
        // https://github.com/naver/egjs-component/wiki/How-to-make-Component-event-design%3F
         */


        var _proto = Component.prototype;

        _proto.trigger = function trigger(eventName, customEvent) {
          if (customEvent === void 0) {
            customEvent = {};
          }

          var handlerList = this._eventHandler[eventName] || [];
          var hasHandlerList = handlerList.length > 0;

          if (!hasHandlerList) {
            return true;
          } // If detach method call in handler in first time then handler list calls.


          handlerList = handlerList.concat();
          customEvent.eventType = eventName;
          var isCanceled = false;
          var arg = [customEvent];
          var i = 0;

          customEvent.stop = function () {
            isCanceled = true;
          };

          customEvent.currentTarget = this;

          for (var _len = arguments.length, restParam = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            restParam[_key - 2] = arguments[_key];
          }

          if (restParam.length >= 1) {
            arg = arg.concat(restParam);
          }

          for (i = 0; handlerList[i]; i++) {
            handlerList[i].apply(this, arg);
          }

          return !isCanceled;
        };
        /**
         * Executed event just one time.
         * @ko 이벤트가 한번만 실행된다.
         * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
         * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           alert("hi");
         }
         thing() {
           this.once("hi", this.hi);
         }
        }
        var some = new Some();
        some.thing();
        some.trigger("hi");
        // fire alert("hi");
        some.trigger("hi");
        // Nothing happens
         */


        _proto.once = function once(eventName, handlerToAttach) {
          if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
            var eventHash = eventName;
            var i;

            for (i in eventHash) {
              this.once(i, eventHash[i]);
            }

            return this;
          } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
            var self = this;
            this.on(eventName, function listener() {
              for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                arg[_key2] = arguments[_key2];
              }

              handlerToAttach.apply(self, arg);
              self.off(eventName, listener);
            });
          }

          return this;
        };
        /**
         * Checks whether an event has been attached to a component.
         * @ko 컴포넌트에 이벤트가 등록됐는지 확인한다.
         * @param {String} eventName The name of the event to be attached <ko>등록 여부를 확인할 이벤트의 이름</ko>
         * @return {Boolean} Indicates whether the event is attached. <ko>이벤트 등록 여부</ko>
         * @example
        class Some extends eg.Component {
         some() {
           this.hasOn("hi");// check hi event.
         }
        }
         */


        _proto.hasOn = function hasOn(eventName) {
          return !!this._eventHandler[eventName];
        };
        /**
         * Attaches an event to a component.
         * @ko 컴포넌트에 이벤트를 등록한다.
         * @param {eventName} eventName The name of the event to be attached <ko>등록할 이벤트의 이름</ko>
         * @param {Function} handlerToAttach The handler function of the event to be attached <ko>등록할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself<ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           console.log("hi");
         }
         some() {
           this.on("hi",this.hi); //attach event
         }
        }
        */


        _proto.on = function on(eventName, handlerToAttach) {
          if (typeof eventName === "object" && isUndefined(handlerToAttach)) {
            var eventHash = eventName;
            var name;

            for (name in eventHash) {
              this.on(name, eventHash[name]);
            }

            return this;
          } else if (typeof eventName === "string" && typeof handlerToAttach === "function") {
            var handlerList = this._eventHandler[eventName];

            if (isUndefined(handlerList)) {
              this._eventHandler[eventName] = [];
              handlerList = this._eventHandler[eventName];
            }

            handlerList.push(handlerToAttach);
          }

          return this;
        };
        /**
         * Detaches an event from the component.
         * @ko 컴포넌트에 등록된 이벤트를 해제한다
         * @param {eventName} eventName The name of the event to be detached <ko>해제할 이벤트의 이름</ko>
         * @param {Function} handlerToDetach The handler function of the event to be detached <ko>해제할 이벤트의 핸들러 함수</ko>
         * @return {eg.Component} An instance of a component itself <ko>컴포넌트 자신의 인스턴스</ko>
         * @example
        class Some extends eg.Component {
         hi() {
           console.log("hi");
         }
         some() {
           this.off("hi",this.hi); //detach event
         }
        }
         */


        _proto.off = function off(eventName, handlerToDetach) {
          // All event detach.
          if (isUndefined(eventName)) {
            this._eventHandler = {};
            return this;
          } // All handler of specific event detach.


          if (isUndefined(handlerToDetach)) {
            if (typeof eventName === "string") {
              this._eventHandler[eventName] = undefined;
              return this;
            } else {
              var eventHash = eventName;
              var name;

              for (name in eventHash) {
                this.off(name, eventHash[name]);
              }

              return this;
            }
          } // The handler of specific event detach.


          var handlerList = this._eventHandler[eventName];

          if (handlerList) {
            var k;
            var handlerFunction;

            for (k = 0; (handlerFunction = handlerList[k]) !== undefined; k++) {
              if (handlerFunction === handlerToDetach) {
                handlerList = handlerList.splice(k, 1);
                break;
              }
            }
          }

          return this;
        };

        return Component;
      }();

      Component.VERSION = "2.1.2";
      return Component;
    }();

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.0.0
    */
    /**
    * get string "object"
    * @memberof Consts
    * @example
    import {OBJECT} from "@daybrush/utils";

    console.log(OBJECT); // "object"
    */

    var OBJECT = "object";
    var OPEN_CLOSED_CHARACTER = ["\"", "'", "\\\"", "\\'"];
    /**
    * Check the type that the value is object.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isObject} from "@daybrush/utils";

    console.log(isObject({})); // true
    console.log(isObject(undefined)); // false
    console.log(isObject("")); // false
    console.log(isObject(null)); // false
    */

    function isObject(value) {
      return value && typeof value === OBJECT;
    }
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */

    function isArray(value) {
      return Array.isArray(value);
    }

    function findClosed(closedCharacter, texts, index, length) {
      for (var i = index; i < length; ++i) {
        var character = texts[i].trim();

        if (character === closedCharacter) {
          return i;
        }

        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed(")", texts, i + 1, length);
        } else if (OPEN_CLOSED_CHARACTER.indexOf(character) > -1) {
          nextIndex = findClosed(character, texts, i + 1, length);
        }

        if (nextIndex === -1) {
          break;
        }

        i = nextIndex;
      }

      return -1;
    }

    function splitText(text, separator) {
      var regexText = "(\\s*" + (separator || ",") + "\\s*|\\(|\\)|\"|'|\\\\\"|\\\\'|\\s+)";
      var regex = new RegExp(regexText, "g");
      var texts = text.split(regex).filter(Boolean);
      var length = texts.length;
      var values = [];
      var tempValues = [];

      for (var i = 0; i < length; ++i) {
        var character = texts[i].trim();
        var nextIndex = i;

        if (character === "(") {
          nextIndex = findClosed(")", texts, i + 1, length);
        } else if (character === ")") {
          throw new Error("invalid format");
        } else if (OPEN_CLOSED_CHARACTER.indexOf(character) > -1) {
          nextIndex = findClosed(character, texts, i + 1, length);
        } else if (character === separator) {
          if (tempValues.length) {
            values.push(tempValues.join(""));
            tempValues = [];
          }

          continue;
        }

        if (nextIndex === -1) {
          nextIndex = length - 1;
        }

        tempValues.push(texts.slice(i, nextIndex + 1).join(""));
        i = nextIndex;
      }

      if (tempValues.length) {
        values.push(tempValues.join(""));
      }

      return values;
    }
    /**
    * divide text by comma.
    * @memberof Utils
    * @param {string} text - text to divide
    * @return {Array} divided texts
    * @example
    import {splitComma} from "@daybrush/utils";

    console.log(splitComma("a,b,c,d,e,f,g"));
    // ["a", "b", "c", "d", "e", "f", "g"]
    console.log(splitComma("'a,b',c,'d,e',f,g"));
    // ["'a,b'", "c", "'d,e'", "f", "g"]
    */

    function splitComma(text) {
      // divide comma(,)
      // "[^"]*"|'[^']*'
      return splitText(text, ",");
    }
    /**
    * transform strings to camel-case
    * @memberof Utils
    * @param {String} text - string
    * @return {String} camel-case string
    * @example
    import {camelize} from "@daybrush/utils";

    console.log(camelize("transform-origin")); // transformOrigin
    console.log(camelize("abcd_efg")); // abcdEfg
    console.log(camelize("abcd efg")); // abcdEfg
    */

    function camelize(str) {
      return str.replace(/[\s-_]([a-z])/g, function (all, letter) {
        return letter.toUpperCase();
      });
    }
    /**
    * Date.now() method
    * @memberof CrossBrowser
    * @return {number} milliseconds
    * @example
    import {now} from "@daybrush/utils";

    console.log(now()); // 12121324241(milliseconds)
    */

    function now() {
      return Date.now ? Date.now() : new Date().getTime();
    }
    /**
    * Checks if the specified class value exists in the element's class attribute.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to search
    * @return {boolean} return false if the class is not found.
    * @example
    import {hasClass} from "@daybrush/utils";

    console.log(hasClass(element, "start")); // true or false
    */

    function hasClass(element, className) {
      if (element.classList) {
        return element.classList.contains(className);
      }

      return !!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
    }
    /**
    * Add the specified class value. If these classe already exist in the element's class attribute they are ignored.
    * @memberof DOM
    * @param element - target
    * @param className - the class name to add
    * @example
    import {addClass} from "@daybrush/utils";

    addClass(element, "start");
    */

    function addClass(element, className) {
      if (element.classList) {
        element.classList.add(className);
      } else {
        element.className += " " + className;
      }
    }
    /**
    * Sets up a function that will be called whenever the specified event is delivered to the target
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
    * @param - An options object that specifies characteristics about the event listener. The available options are:
    * @example
    import {addEvent} from "@daybrush/utils";

    addEvent(el, "click", e => {
      console.log(e);
    });
    */

    function addEvent(el, type, listener, options) {
      el.addEventListener(type, listener, options);
    }
    /**
    * removes from the EventTarget an event listener previously registered with EventTarget.addEventListener()
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The EventListener function of the event handler to remove from the event target.
    * @example
    import {addEvent, removeEvent} from "@daybrush/utils";
    const listener = e => {
      console.log(e);
    };
    addEvent(el, "click", listener);
    removeEvent(el, "click", listener);
    */

    function removeEvent(el, type, listener) {
      el.removeEventListener(type, listener);
    }

    /*
    Copyright (c) 2019 Daybrush
    name: @daybrush/drag
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/drag.git
    version: 0.19.3
    */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign$1 = function () {
      __assign$1 = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }

        return t;
      };

      return __assign$1.apply(this, arguments);
    };

    function getRad(pos1, pos2) {
      var distX = pos2[0] - pos1[0];
      var distY = pos2[1] - pos1[1];
      var rad = Math.atan2(distY, distX);
      return rad >= 0 ? rad : rad + Math.PI * 2;
    }
    function getRotatiion(touches) {
      return getRad([touches[0].clientX, touches[0].clientY], [touches[1].clientX, touches[1].clientY]) / Math.PI * 180;
    }
    function getPinchDragPosition(clients, prevClients, startClients, startPinchClients) {
      var nowCenter = getAverageClient(clients);
      var prevCenter = getAverageClient(prevClients);
      var startCenter = getAverageClient(startPinchClients);
      var pinchClient = plueClient(startPinchClients[0], minusClient(nowCenter, startCenter));
      var pinchPrevClient = plueClient(startPinchClients[0], minusClient(prevCenter, startCenter));
      return getPosition(pinchClient, pinchPrevClient, startClients[0]);
    }
    function isMultiTouch(e) {
      return e.touches && e.touches.length >= 2;
    }
    function getPositionEvent(e) {
      if (e.touches) {
        return getClients(e.touches);
      } else {
        return [getClient(e)];
      }
    }
    function getPosition(client, prevClient, startClient) {
      var clientX = client.clientX,
          clientY = client.clientY;
      var prevX = prevClient.clientX,
          prevY = prevClient.clientY;
      var startX = startClient.clientX,
          startY = startClient.clientY;
      var deltaX = clientX - prevX;
      var deltaY = clientY - prevY;
      var distX = clientX - startX;
      var distY = clientY - startY;
      return {
        clientX: clientX,
        clientY: clientY,
        deltaX: deltaX,
        deltaY: deltaY,
        distX: distX,
        distY: distY
      };
    }
    function getDist(clients) {
      return Math.sqrt(Math.pow(clients[0].clientX - clients[1].clientX, 2) + Math.pow(clients[0].clientY - clients[1].clientY, 2));
    }
    function getPositions(clients, prevClients, startClients) {
      return clients.map(function (client, i) {
        return getPosition(client, prevClients[i], startClients[i]);
      });
    }
    function getClients(touches) {
      var length = Math.min(touches.length, 2);
      var clients = [];

      for (var i = 0; i < length; ++i) {
        clients.push(getClient(touches[i]));
      }

      return clients;
    }
    function getClient(e) {
      return {
        clientX: e.clientX,
        clientY: e.clientY
      };
    }
    function getAverageClient(clients) {
      if (clients.length === 1) {
        return clients[0];
      }

      return {
        clientX: (clients[0].clientX + clients[1].clientX) / 2,
        clientY: (clients[0].clientY + clients[1].clientY) / 2
      };
    }
    function plueClient(client1, client2) {
      return {
        clientX: client1.clientX + client2.clientX,
        clientY: client1.clientY + client2.clientY
      };
    }
    function minusClient(client1, client2) {
      return {
        clientX: client1.clientX - client2.clientX,
        clientY: client1.clientY - client2.clientY
      };
    }

    var INPUT_TAGNAMES = ["textarea", "input"];
    /**
     * You can set up drag events in any browser.
     */

    var Dragger =
    /*#__PURE__*/
    function () {
      /**
       *
       */
      function Dragger(targets, options) {
        var _this = this;

        if (options === void 0) {
          options = {};
        }

        this.options = {};
        this.flag = false;
        this.pinchFlag = false;
        this.datas = {};
        this.isDrag = false;
        this.isPinch = false;
        this.isMouse = false;
        this.isTouch = false;
        this.prevClients = [];
        this.startClients = [];
        this.movement = 0;
        this.startPinchClients = [];
        this.startDistance = 0;
        this.customDist = [0, 0];
        this.targets = [];
        this.prevTime = 0;
        this.isDouble = false;
        this.startRotate = 0;
        /**
         * @method
         */

        this.onDragStart = function (e, isTrusted) {
          if (isTrusted === void 0) {
            isTrusted = true;
          }

          if (!_this.flag && e.cancelable === false) {
            return;
          }

          var _a = _this.options,
              container = _a.container,
              pinchOutside = _a.pinchOutside,
              dragstart = _a.dragstart,
              preventRightClick = _a.preventRightClick,
              preventDefault = _a.preventDefault,
              checkInput = _a.checkInput;
          var isTouch = _this.isTouch;

          if (!_this.flag) {
            var activeElement = document.activeElement;
            var target = e.target;
            var tagName = target.tagName.toLowerCase();
            var hasInput = INPUT_TAGNAMES.indexOf(tagName) > -1;
            var hasContentEditable = target.isContentEditable;

            if (hasInput || hasContentEditable) {
              if (checkInput || activeElement === target) {
                // force false or already focused.
                return false;
              }

              if (activeElement && hasContentEditable && activeElement.isContentEditable && activeElement.contains(target)) {
                return false;
              }
            } else if ((preventDefault || e.type === "touchstart") && activeElement) {
              var activeTagName = activeElement.tagName;

              if (activeElement.isContentEditable || INPUT_TAGNAMES.indexOf(activeTagName) > -1) {
                activeElement.blur();
              }
            }
          }

          var timer = 0;

          if (!_this.flag && isTouch && pinchOutside) {
            timer = setTimeout(function () {
              addEvent(container, "touchstart", _this.onDragStart, {
                passive: false
              });
            });
          }

          if (_this.flag && isTouch && pinchOutside) {
            removeEvent(container, "touchstart", _this.onDragStart);
          }

          if (isMultiTouch(e)) {
            clearTimeout(timer);

            if (!_this.flag && e.touches.length !== e.changedTouches.length) {
              return;
            }

            if (!_this.pinchFlag) {
              _this.onPinchStart(e);
            }
          }

          if (_this.flag) {
            return;
          }

          var clients = _this.startClients[0] ? _this.startClients : getPositionEvent(e);
          _this.customDist = [0, 0];
          _this.flag = true;
          _this.isDrag = false;
          _this.startClients = clients;
          _this.prevClients = clients;
          _this.datas = {};
          _this.movement = 0;
          var position = getPosition(clients[0], _this.prevClients[0], _this.startClients[0]);

          if (preventRightClick && (e.which === 3 || e.button === 2)) {
            clearTimeout(timer);

            _this.initDrag();

            return false;
          }

          var result = dragstart && dragstart(__assign$1({
            type: "dragstart",
            datas: _this.datas,
            inputEvent: e,
            isTrusted: isTrusted
          }, position));

          if (result === false) {
            clearTimeout(timer);

            _this.initDrag();
          }

          _this.isDouble = now() - _this.prevTime < 200;
          _this.flag && preventDefault && e.preventDefault();
        };

        this.onDrag = function (e, isScroll) {
          if (!_this.flag) {
            return;
          }

          var clients = getPositionEvent(e);

          if (_this.pinchFlag) {
            _this.onPinch(e, clients);
          }

          var result = _this.move([0, 0], e, clients);

          if (!result || !result.deltaX && !result.deltaY) {
            return;
          }

          var drag = _this.options.drag;
          drag && drag(__assign$1({}, result, {
            isScroll: !!isScroll,
            inputEvent: e
          }));
        };

        this.onDragEnd = function (e) {
          if (!_this.flag) {
            return;
          }

          var _a = _this.options,
              dragend = _a.dragend,
              pinchOutside = _a.pinchOutside,
              container = _a.container;

          if (_this.isTouch && pinchOutside) {
            removeEvent(container, "touchstart", _this.onDragStart);
          }

          if (_this.pinchFlag) {
            _this.onPinchEnd(e);
          }

          _this.flag = false;
          var prevClients = _this.prevClients;
          var startClients = _this.startClients;
          var position = _this.pinchFlag ? getPinchDragPosition(prevClients, prevClients, startClients, _this.startPinchClients) : getPosition(prevClients[0], prevClients[0], startClients[0]);
          var currentTime = now();
          var isDouble = !_this.isDrag && _this.isDouble;
          _this.prevTime = _this.isDrag || isDouble ? 0 : currentTime;
          _this.startClients = [];
          _this.prevClients = [];
          dragend && dragend(__assign$1({
            type: "dragend",
            datas: _this.datas,
            isDouble: isDouble,
            isDrag: _this.isDrag,
            inputEvent: e
          }, position));
        };

        var elements = [].concat(targets);
        this.options = __assign$1({
          checkInput: false,
          container: elements.length > 1 ? window : elements[0],
          preventRightClick: true,
          preventDefault: true,
          pinchThreshold: 0,
          events: ["touch", "mouse"]
        }, options);
        var _a = this.options,
            container = _a.container,
            events = _a.events;
        this.isTouch = events.indexOf("touch") > -1;
        this.isMouse = events.indexOf("mouse") > -1;
        this.customDist = [0, 0];
        this.targets = elements;

        if (this.isMouse) {
          elements.forEach(function (el) {
            addEvent(el, "mousedown", _this.onDragStart);
          });
          addEvent(container, "mousemove", this.onDrag);
          addEvent(container, "mouseup", this.onDragEnd);
          addEvent(container, "contextmenu", this.onDragEnd);
        }

        if (this.isTouch) {
          var passive_1 = {
            passive: false
          };
          elements.forEach(function (el) {
            addEvent(el, "touchstart", _this.onDragStart, passive_1);
          });
          addEvent(container, "touchmove", this.onDrag, passive_1);
          addEvent(container, "touchend", this.onDragEnd, passive_1);
          addEvent(container, "touchcancel", this.onDragEnd, passive_1);
        }
      }
      /**
       *
       */


      var __proto = Dragger.prototype;

      __proto.isDragging = function () {
        return this.isDrag;
      };
      /**
       *
       */


      __proto.isFlag = function () {
        return this.flag;
      };
      /**
       *
       */


      __proto.isPinchFlag = function () {
        return this.pinchFlag;
      };
      /**
       *
       */


      __proto.isPinching = function () {
        return this.isPinch;
      };
      /**
       *
       */


      __proto.scrollBy = function (deltaX, deltaY, e, isCallDrag) {
        if (isCallDrag === void 0) {
          isCallDrag = true;
        }

        if (!this.flag) {
          return;
        }

        this.startClients.forEach(function (client) {
          client.clientX -= deltaX;
          client.clientY -= deltaY;
        });
        this.prevClients.forEach(function (client) {
          client.clientX -= deltaX;
          client.clientY -= deltaY;
        });
        isCallDrag && this.onDrag(e, true);
      };

      __proto.move = function (_a, inputEvent, clients) {
        var deltaX = _a[0],
            deltaY = _a[1];

        if (clients === void 0) {
          clients = this.prevClients;
        }

        var customDist = this.customDist;
        var prevClients = this.prevClients;
        var startClients = this.startClients;
        var position = this.pinchFlag ? getPinchDragPosition(clients, prevClients, startClients, this.startPinchClients) : getPosition(clients[0], prevClients[0], startClients[0]);
        customDist[0] += deltaX;
        customDist[1] += deltaY;
        position.deltaX += deltaX;
        position.deltaY += deltaY;
        var positionDeltaX = position.deltaX,
            positionDeltaY = position.deltaY;
        position.distX += customDist[0];
        position.distY += customDist[1];
        this.movement += Math.sqrt(positionDeltaX * positionDeltaX + positionDeltaY * positionDeltaY);
        this.prevClients = clients;
        this.isDrag = true;
        return __assign$1({
          type: "drag",
          datas: this.datas
        }, position, {
          movement: this.movement,
          isDrag: this.isDrag,
          isPinch: this.isPinch,
          isScroll: false,
          inputEvent: inputEvent
        });
      };

      __proto.onPinchStart = function (e) {
        var _a, _b;

        var _c = this.options,
            pinchstart = _c.pinchstart,
            pinchThreshold = _c.pinchThreshold;

        if (this.isDrag && this.movement > pinchThreshold) {
          return;
        }

        var pinchClients = getClients(e.changedTouches);
        this.pinchFlag = true;

        (_a = this.startClients).push.apply(_a, pinchClients);

        (_b = this.prevClients).push.apply(_b, pinchClients);

        this.startDistance = getDist(this.prevClients);
        this.startPinchClients = this.prevClients.slice();

        if (!pinchstart) {
          return;
        }

        var startClients = this.prevClients;
        var startAverageClient = getAverageClient(startClients);
        var centerPosition = getPosition(startAverageClient, startAverageClient, startAverageClient);
        this.startRotate = getRotatiion(startClients);
        pinchstart(__assign$1({
          type: "pinchstart",
          datas: this.datas,
          angle: this.startRotate,
          touches: getPositions(startClients, startClients, startClients)
        }, centerPosition, {
          inputEvent: e
        }));
      };

      __proto.onPinch = function (e, clients) {
        if (!this.flag || !this.pinchFlag || clients.length < 2) {
          return;
        }

        this.isPinch = true;
        var pinch = this.options.pinch;

        if (!pinch) {
          return;
        }

        var prevClients = this.prevClients;
        var startClients = this.startClients;
        var centerPosition = getPosition(getAverageClient(clients), getAverageClient(prevClients), getAverageClient(startClients));
        var angle = getRotatiion(clients);
        var distance = getDist(clients);
        pinch(__assign$1({
          type: "pinch",
          datas: this.datas,
          movement: this.movement,
          angle: angle,
          rotation: angle - this.startRotate,
          touches: getPositions(clients, prevClients, startClients),
          scale: distance / this.startDistance,
          distance: distance
        }, centerPosition, {
          inputEvent: e
        }));
      };

      __proto.onPinchEnd = function (e) {
        if (!this.flag || !this.pinchFlag) {
          return;
        }

        var isPinch = this.isPinch;
        this.isPinch = false;
        this.pinchFlag = false;
        var pinchend = this.options.pinchend;

        if (!pinchend) {
          return;
        }

        var prevClients = this.prevClients;
        var startClients = this.startClients;
        var centerPosition = getPosition(getAverageClient(prevClients), getAverageClient(prevClients), getAverageClient(startClients));
        pinchend(__assign$1({
          type: "pinchend",
          datas: this.datas,
          isPinch: isPinch,
          touches: getPositions(prevClients, prevClients, startClients)
        }, centerPosition, {
          inputEvent: e
        }));
        this.isPinch = false;
        this.pinchFlag = false;
      };

      __proto.triggerDragStart = function (e) {
        this.onDragStart(e, false);
      };
      /**
       *
       */


      __proto.unset = function () {
        var _this = this;

        var targets = this.targets;
        var container = this.options.container;

        if (this.isMouse) {
          targets.forEach(function (target) {
            removeEvent(target, "mousedown", _this.onDragStart);
          });
          removeEvent(container, "mousemove", this.onDrag);
          removeEvent(container, "mouseup", this.onDragEnd);
          removeEvent(container, "contextmenu", this.onDragEnd);
        }

        if (this.isTouch) {
          targets.forEach(function (target) {
            removeEvent(target, "touchstart", _this.onDragStart);
          });
          removeEvent(container, "touchstart", this.onDragStart);
          removeEvent(container, "touchmove", this.onDrag);
          removeEvent(container, "touchend", this.onDragEnd);
          removeEvent(container, "touchcancel", this.onDragEnd);
        }
      };

      __proto.initDrag = function () {
        this.startClients = [];
        this.prevClients = [];
        this.flag = false;
      };

      return Dragger;
    }();

    /*
    Copyright (c) 2019 Daybrush
    name: framework-utils
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/framework-utils.git
    version: 0.3.4
    */
    /* Class Decorator */

    function Properties(properties, action) {
      return function (component) {
        var prototype = component.prototype;
        properties.forEach(function (property) {
          action(prototype, property);
        });
      };
    }

    /*
    Copyright (c) 2019-present NAVER Corp.
    name: @egjs/list-differ
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-list-differ
    version: 1.0.0
    */
    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var PolyMap =
    /*#__PURE__*/
    function () {
      function PolyMap() {
        this.keys = [];
        this.values = [];
      }

      var __proto = PolyMap.prototype;

      __proto.get = function (key) {
        return this.values[this.keys.indexOf(key)];
      };

      __proto.set = function (key, value) {
        var keys = this.keys;
        var values = this.values;
        var prevIndex = keys.indexOf(key);
        var index = prevIndex === -1 ? keys.length : prevIndex;
        keys[index] = key;
        values[index] = value;
      };

      return PolyMap;
    }();

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var HashMap =
    /*#__PURE__*/
    function () {
      function HashMap() {
        this.object = {};
      }

      var __proto = HashMap.prototype;

      __proto.get = function (key) {
        return this.object[key];
      };

      __proto.set = function (key, value) {
        this.object[key] = value;
      };

      return HashMap;
    }();

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var SUPPORT_MAP = typeof Map === "function";

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var Link =
    /*#__PURE__*/
    function () {
      function Link() {}

      var __proto = Link.prototype;

      __proto.connect = function (prevLink, nextLink) {
        this.prev = prevLink;
        this.next = nextLink;
        prevLink && (prevLink.next = this);
        nextLink && (nextLink.prev = this);
      };

      __proto.disconnect = function () {
        // In double linked list, diconnect the interconnected relationship.
        var prevLink = this.prev;
        var nextLink = this.next;
        prevLink && (prevLink.next = nextLink);
        nextLink && (nextLink.prev = prevLink);
      };

      __proto.getIndex = function () {
        var link = this;
        var index = -1;

        while (link) {
          link = link.prev;
          ++index;
        }

        return index;
      };

      return Link;
    }();

    /*
    egjs-list-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */

    function orderChanged(changed, fixed) {
      // It is roughly in the order of these examples.
      // 4, 6, 0, 2, 1, 3, 5, 7
      var fromLinks = []; // 0, 1, 2, 3, 4, 5, 6, 7

      var toLinks = [];
      changed.forEach(function (_a) {
        var from = _a[0],
            to = _a[1];
        var link = new Link();
        fromLinks[from] = link;
        toLinks[to] = link;
      }); // `fromLinks` are connected to each other by double linked list.

      fromLinks.forEach(function (link, i) {
        link.connect(fromLinks[i - 1]);
      });
      return changed.filter(function (_, i) {
        return !fixed[i];
      }).map(function (_a, i) {
        var from = _a[0],
            to = _a[1];

        if (from === to) {
          return [0, 0];
        }

        var fromLink = fromLinks[from];
        var toLink = toLinks[to - 1];
        var fromIndex = fromLink.getIndex(); // Disconnect the link connected to `fromLink`.

        fromLink.disconnect(); // Connect `fromLink` to the right of `toLink`.

        if (!toLink) {
          fromLink.connect(undefined, fromLinks[0]);
        } else {
          fromLink.connect(toLink, toLink.next);
        }

        var toIndex = fromLink.getIndex();
        return [fromIndex, toIndex];
      });
    }

    var Result =
    /*#__PURE__*/
    function () {
      function Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed) {
        this.prevList = prevList;
        this.list = list;
        this.added = added;
        this.removed = removed;
        this.changed = changed;
        this.maintained = maintained;
        this.changedBeforeAdded = changedBeforeAdded;
        this.fixed = fixed;
      }

      var __proto = Result.prototype;
      Object.defineProperty(__proto, "ordered", {
        get: function () {
          if (!this.cacheOrdered) {
            this.caculateOrdered();
          }

          return this.cacheOrdered;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(__proto, "pureChanged", {
        get: function () {
          if (!this.cachePureChanged) {
            this.caculateOrdered();
          }

          return this.cachePureChanged;
        },
        enumerable: true,
        configurable: true
      });

      __proto.caculateOrdered = function () {
        var ordered = orderChanged(this.changedBeforeAdded, this.fixed);
        var changed = this.changed;
        var pureChanged = [];
        this.cacheOrdered = ordered.filter(function (_a, i) {
          var from = _a[0],
              to = _a[1];
          var _b = changed[i],
              fromBefore = _b[0],
              toBefore = _b[1];

          if (from !== to) {
            pureChanged.push([fromBefore, toBefore]);
            return true;
          }
        });
        this.cachePureChanged = pureChanged;
      };

      return Result;
    }();

    /**
     *
     * @memberof eg.ListDiffer
     * @static
     * @function
     * @param - Previous List <ko> 이전 목록 </ko>
     * @param - List to Update <ko> 업데이트 할 목록 </ko>
     * @param - This callback function returns the key of the item. <ko> 아이템의 키를 반환하는 콜백 함수입니다.</ko>
     * @return - Returns the diff between `prevList` and `list` <ko> `prevList`와 `list`의 다른 점을 반환한다.</ko>
     * @example
     * import { diff } from "@egjs/list-differ";
     * // script => eg.ListDiffer.diff
     * const result = diff([0, 1, 2, 3, 4, 5], [7, 8, 0, 4, 3, 6, 2, 1], e => e);
     * // List before update
     * // [1, 2, 3, 4, 5]
     * console.log(result.prevList);
     * // Updated list
     * // [4, 3, 6, 2, 1]
     * console.log(result.list);
     * // Index array of values added to `list`
     * // [0, 1, 5]
     * console.log(result.added);
     * // Index array of values removed in `prevList`
     * // [5]
     * console.log(result.removed);
     * // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`
     * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
     * console.log(result.changed);
     * // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
     * // [[4, 3], [3, 4], [2, 6]]
     * console.log(result.pureChanged);
     * // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
     * // [[4, 1], [4, 2], [4, 3]]
     * console.log(result.ordered);
     * // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved
     * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
     * console.log(result.maintained);
     */

    function diff(prevList, list, findKeyCallback) {
      var mapClass = SUPPORT_MAP ? Map : findKeyCallback ? HashMap : PolyMap;

      var callback = findKeyCallback || function (e) {
        return e;
      };

      var added = [];
      var removed = [];
      var maintained = [];
      var prevKeys = prevList.map(callback);
      var keys = list.map(callback);
      var prevKeyMap = new mapClass();
      var keyMap = new mapClass();
      var changedBeforeAdded = [];
      var fixed = [];
      var removedMap = {};
      var changed = [];
      var addedCount = 0;
      var removedCount = 0; // Add prevKeys and keys to the hashmap.

      prevKeys.forEach(function (key, prevListIndex) {
        prevKeyMap.set(key, prevListIndex);
      });
      keys.forEach(function (key, listIndex) {
        keyMap.set(key, listIndex);
      }); // Compare `prevKeys` and `keys` and add them to `removed` if they are not in `keys`.

      prevKeys.forEach(function (key, prevListIndex) {
        var listIndex = keyMap.get(key); // In prevList, but not in list, it is removed.

        if (typeof listIndex === "undefined") {
          ++removedCount;
          removed.push(prevListIndex);
        } else {
          removedMap[listIndex] = removedCount;
        }
      }); // Compare `prevKeys` and `keys` and add them to `added` if they are not in `prevKeys`.

      keys.forEach(function (key, listIndex) {
        var prevListIndex = prevKeyMap.get(key); // In list, but not in prevList, it is added.

        if (typeof prevListIndex === "undefined") {
          added.push(listIndex);
          ++addedCount;
        } else {
          maintained.push([prevListIndex, listIndex]);
          removedCount = removedMap[listIndex] || 0;
          changedBeforeAdded.push([prevListIndex - removedCount, listIndex - addedCount]);
          fixed.push(listIndex === prevListIndex);

          if (prevListIndex !== listIndex) {
            changed.push([prevListIndex, listIndex]);
          }
        }
      }); // Sort by ascending order of 'to(list's index).

      removed.reverse();
      return new Result(prevList, list, added, removed, changed, maintained, changedBeforeAdded, fixed);
    }

    /**
     * A module that checks diff when values are added, removed, or changed in an array.
     * @ko 배열 또는 오브젝트에서 값이 추가되거나 삭제되거나 순서가 변경사항을 체크하는 모듈입니다.
     * @memberof eg
     */

    var ListDiffer =
    /*#__PURE__*/
    function () {
      /**
       * @param - Initializing Data Array. <ko> 초기 설정할 데이터 배열.</ko>
       * @param - This callback function returns the key of the item. <ko> 아이템의 키를 반환하는 콜백 함수입니다.</ko>
       * @example
       * import ListDiffer from "@egjs/list-differ";
       * // script => eg.ListDiffer
       * const differ = new ListDiffer([0, 1, 2, 3, 4, 5], e => e);
       * const result = differ.update([7, 8, 0, 4, 3, 6, 2, 1]);
       * // List before update
       * // [1, 2, 3, 4, 5]
       * console.log(result.prevList);
       * // Updated list
       * // [4, 3, 6, 2, 1]
       * console.log(result.list);
       * // Index array of values added to `list`.
       * // [0, 1, 5]
       * console.log(result.added);
       * // Index array of values removed in `prevList`.
       * // [5]
       * console.log(result.removed);
       * // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`.
       * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
       * console.log(result.changed);
       * // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
       * // [[4, 3], [3, 4], [2, 6]]
       * console.log(result.pureChanged);
       * // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
       * // [[4, 1], [4, 2], [4, 3]]
       * console.log(result.ordered);
       * // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved.
       * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
       * console.log(result.maintained);
       */
      function ListDiffer(list, findKeyCallback) {
        if (list === void 0) {
          list = [];
        }

        this.findKeyCallback = findKeyCallback;
        this.list = [].slice.call(list);
      }
      /**
       * Update list.
       * @ko 리스트를 업데이트를 합니다.
       * @param - List to update <ko> 업데이트할 리스트 </ko>
       * @return - Returns the results of an update from `prevList` to `list`.<ko> `prevList`에서 `list`로 업데이트한 결과를 반환한다. </ko>
       */


      var __proto = ListDiffer.prototype;

      __proto.update = function (list) {
        var newData = [].slice.call(list);
        var result = diff(this.list, newData, this.findKeyCallback);
        this.list = newData;
        return result;
      };

      return ListDiffer;
    }();

    /*
    Copyright (c) 2019-present NAVER Corp.
    name: @egjs/children-differ
    license: MIT
    author: NAVER Corp.
    repository: https://github.com/naver/egjs-children-differ
    version: 1.0.0
    */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics$1 = function (d, b) {
      extendStatics$1 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
      extendStatics$1(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /*
    egjs-children-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    var findKeyCallback = typeof Map === "function" ? undefined : function () {
      var childrenCount = 0;
      return function (el) {
        return el.__DIFF_KEY__ || (el.__DIFF_KEY__ = ++childrenCount);
      };
    }();

    /**
     * A module that checks diff when child are added, removed, or changed .
     * @ko 자식 노드들에서 자식 노드가 추가되거나 삭제되거나 순서가 변경된 사항을 체크하는 모듈입니다.
     * @memberof eg
     * @extends eg.ListDiffer
     */

    var ChildrenDiffer =
    /*#__PURE__*/
    function (_super) {
      __extends$1(ChildrenDiffer, _super);
      /**
       * @param - Initializing Children <ko> 초기 설정할 자식 노드들</ko>
       */


      function ChildrenDiffer(list) {
        if (list === void 0) {
          list = [];
        }

        return _super.call(this, list, findKeyCallback) || this;
      }

      return ChildrenDiffer;
    }(ListDiffer);

    /*
    egjs-children-differ
    Copyright (c) 2019-present NAVER Corp.
    MIT license
    */
    /**
     *
     * @memberof eg.ChildrenDiffer
     * @static
     * @function
     * @param - Previous List <ko> 이전 목록 </ko>
     * @param - List to Update <ko> 업데이트 할 목록 </ko>
     * @return - Returns the diff between `prevList` and `list` <ko> `prevList`와 `list`의 다른 점을 반환한다.</ko>
     * @example
     * import { diff } from "@egjs/children-differ";
     * // script => eg.ChildrenDiffer.diff
     * const result = diff([0, 1, 2, 3, 4, 5], [7, 8, 0, 4, 3, 6, 2, 1]);
     * // List before update
     * // [1, 2, 3, 4, 5]
     * console.log(result.prevList);
     * // Updated list
     * // [4, 3, 6, 2, 1]
     * console.log(result.list);
     * // Index array of values added to `list`
     * // [0, 1, 5]
     * console.log(result.added);
     * // Index array of values removed in `prevList`
     * // [5]
     * console.log(result.removed);
     * // An array of index pairs of `prevList` and `list` with different indexes from `prevList` and `list`
     * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
     * console.log(result.changed);
     * // The subset of `changed` and an array of index pairs that moved data directly. Indicate an array of absolute index pairs of `ordered`.(Formatted by: Array<[index of prevList, index of list]>)
     * // [[4, 3], [3, 4], [2, 6]]
     * console.log(result.pureChanged);
     * // An array of index pairs to be `ordered` that can synchronize `list` before adding data. (Formatted by: Array<[prevIndex, nextIndex]>)
     * // [[4, 1], [4, 2], [4, 3]]
     * console.log(result.ordered);
     * // An array of index pairs of `prevList` and `list` that have not been added/removed so data is preserved
     * // [[0, 2], [4, 3], [3, 4], [2, 6], [1, 7]]
     * console.log(result.maintained);
     */

    function diff$1(prevList, list) {
      return diff(prevList, list, findKeyCallback);
    }

    /*
    Copyright (c) 2019 Daybrush
    name: @scena/dragscroll
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/dragscroll.git
    version: 0.2.1
    */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics$2 = function (d, b) {
      extendStatics$2 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$2(d, b);
    };

    function __extends$2(d, b) {
      extendStatics$2(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function getDefaultScrollPosition(e) {
      var container = e.container;
      return [container.scrollLeft, container.scrollTop];
    }

    var DragScroll =
    /*#__PURE__*/
    function (_super) {
      __extends$2(DragScroll, _super);

      function DragScroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;

        _this.startRect = null;
        _this.startPos = [];
        _this.prevTime = 0;
        _this.timer = 0;
        return _this;
      }

      var __proto = DragScroll.prototype;

      __proto.dragStart = function (e, options) {
        var _a = options.container.getBoundingClientRect(),
            top = _a.top,
            left = _a.left,
            width = _a.width,
            height = _a.height;

        this.startPos = [e.clientX, e.clientY];
        this.startRect = {
          top: top,
          left: left,
          width: width,
          height: height
        };
      };

      __proto.drag = function (e, options) {
        var _this = this;

        var clientX = e.clientX,
            clientY = e.clientY;
        var container = options.container,
            _a = options.threshold,
            threshold = _a === void 0 ? 0 : _a,
            _b = options.throttleTime,
            throttleTime = _b === void 0 ? 0 : _b,
            _c = options.getScrollPosition,
            getScrollPosition = _c === void 0 ? getDefaultScrollPosition : _c;

        var _d = this,
            startRect = _d.startRect,
            startPos = _d.startPos;

        var nowTime = now();
        var distTime = Math.max(throttleTime + this.prevTime - nowTime, 0);
        var direction = [0, 0];

        if (startRect.top > clientY - threshold) {
          if (startPos[1] > startRect.top || clientY < startPos[1]) {
            direction[1] = -1;
          }
        } else if (startRect.top + startRect.height < clientY + threshold) {
          if (startPos[1] < startRect.top + startRect.height || clientY > startPos[1]) {
            direction[1] = 1;
          }
        }

        if (startRect.left > clientX - threshold) {
          if (startPos[0] > startRect.left || clientX < startPos[0]) {
            direction[0] = -1;
          }
        } else if (startRect.left + startRect.width < clientX + threshold) {
          if (startPos[0] < startRect.left + startRect.width || clientX > startPos[0]) {
            direction[0] = 1;
          }
        }

        clearTimeout(this.timer);

        if (!direction[0] && !direction[1]) {
          return false;
        }

        if (distTime > 0) {
          this.timer = window.setTimeout(function () {
            _this.drag(e, options);
          }, distTime);
          return false;
        }

        this.prevTime = nowTime;
        var prevPos = getScrollPosition({
          container: container,
          direction: direction
        });
        this.trigger("scroll", {
          container: container,
          direction: direction,
          inputEvent: e
        });
        var nextPos = getScrollPosition({
          container: container,
          direction: direction
        });
        var offsetX = nextPos[0] - prevPos[0];
        var offsetY = nextPos[1] - prevPos[1];

        if (!offsetX && !offsetY) {
          return false;
        }

        this.trigger("move", {
          offsetX: direction[0] ? offsetX : 0,
          offsetY: direction[1] ? offsetY : 0,
          inputEvent: e
        });

        if (throttleTime) {
          this.timer = window.setTimeout(function () {
            _this.drag(e, options);
          }, throttleTime);
        }

        return true;
      };

      __proto.dragEnd = function () {
        clearTimeout(this.timer);
      };

      return DragScroll;
    }(Component);

    /*
    Copyright (c) Daybrush
    name: keycon
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/keycon.git
    version: 1.1.0
    */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics$3 = function (d, b) {
      extendStatics$3 = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };

      return extendStatics$3(d, b);
    };

    function __extends$3(d, b) {
      extendStatics$3(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function createCommonjsModule(fn, module) {
      return module = {
        exports: {}
      }, fn(module, module.exports), module.exports;
    }

    var keycode = createCommonjsModule(function (module, exports) {
    // Source: http://jsfiddle.net/vWx8V/
    // http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

    /**
     * Conenience method returns corresponding value for given keyName or keyCode.
     *
     * @param {Mixed} keyCode {Number} or keyName {String}
     * @return {Mixed}
     * @api public
     */

    function keyCode(searchInput) {
      // Keyboard Events
      if (searchInput && 'object' === typeof searchInput) {
        var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode;
        if (hasKeyCode) searchInput = hasKeyCode;
      }

      // Numbers
      if ('number' === typeof searchInput) return names[searchInput]

      // Everything else (cast to string)
      var search = String(searchInput);

      // check codes
      var foundNamedKey = codes[search.toLowerCase()];
      if (foundNamedKey) return foundNamedKey

      // check aliases
      var foundNamedKey = aliases[search.toLowerCase()];
      if (foundNamedKey) return foundNamedKey

      // weird character?
      if (search.length === 1) return search.charCodeAt(0)

      return undefined
    }

    /**
     * Compares a keyboard event with a given keyCode or keyName.
     *
     * @param {Event} event Keyboard event that should be tested
     * @param {Mixed} keyCode {Number} or keyName {String}
     * @return {Boolean}
     * @api public
     */
    keyCode.isEventKey = function isEventKey(event, nameOrCode) {
      if (event && 'object' === typeof event) {
        var keyCode = event.which || event.keyCode || event.charCode;
        if (keyCode === null || keyCode === undefined) { return false; }
        if (typeof nameOrCode === 'string') {
          // check codes
          var foundNamedKey = codes[nameOrCode.toLowerCase()];
          if (foundNamedKey) { return foundNamedKey === keyCode; }
        
          // check aliases
          var foundNamedKey = aliases[nameOrCode.toLowerCase()];
          if (foundNamedKey) { return foundNamedKey === keyCode; }
        } else if (typeof nameOrCode === 'number') {
          return nameOrCode === keyCode;
        }
        return false;
      }
    };

    exports = module.exports = keyCode;

    /**
     * Get by name
     *
     *   exports.code['enter'] // => 13
     */

    var codes = exports.code = exports.codes = {
      'backspace': 8,
      'tab': 9,
      'enter': 13,
      'shift': 16,
      'ctrl': 17,
      'alt': 18,
      'pause/break': 19,
      'caps lock': 20,
      'esc': 27,
      'space': 32,
      'page up': 33,
      'page down': 34,
      'end': 35,
      'home': 36,
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
      'insert': 45,
      'delete': 46,
      'command': 91,
      'left command': 91,
      'right command': 93,
      'numpad *': 106,
      'numpad +': 107,
      'numpad -': 109,
      'numpad .': 110,
      'numpad /': 111,
      'num lock': 144,
      'scroll lock': 145,
      'my computer': 182,
      'my calculator': 183,
      ';': 186,
      '=': 187,
      ',': 188,
      '-': 189,
      '.': 190,
      '/': 191,
      '`': 192,
      '[': 219,
      '\\': 220,
      ']': 221,
      "'": 222
    };

    // Helper aliases

    var aliases = exports.aliases = {
      'windows': 91,
      '⇧': 16,
      '⌥': 18,
      '⌃': 17,
      '⌘': 91,
      'ctl': 17,
      'control': 17,
      'option': 18,
      'pause': 19,
      'break': 19,
      'caps': 20,
      'return': 13,
      'escape': 27,
      'spc': 32,
      'spacebar': 32,
      'pgup': 33,
      'pgdn': 34,
      'ins': 45,
      'del': 46,
      'cmd': 91
    };

    /*!
     * Programatically add the following
     */

    // lower case chars
    for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32;

    // numbers
    for (var i = 48; i < 58; i++) codes[i - 48] = i;

    // function keys
    for (i = 1; i < 13; i++) codes['f'+i] = i + 111;

    // numpad keys
    for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96;

    /**
     * Get by code
     *
     *   exports.name[13] // => 'Enter'
     */

    var names = exports.names = exports.title = {}; // title for backward compat

    // Create reverse mapping
    for (i in codes) names[codes[i]] = i;

    // Add aliases
    for (var alias in aliases) {
      codes[alias] = aliases[alias];
    }
    });
    var keycode_1 = keycode.code;
    var keycode_2 = keycode.codes;
    var keycode_3 = keycode.aliases;
    var keycode_4 = keycode.names;
    var keycode_5 = keycode.title;

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 1.0.0
    */
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */

    var STRING = "string";
    /**
    * Check the type that the value is isArray.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isArray} from "@daybrush/utils";

    console.log(isArray([])); // true
    console.log(isArray({})); // false
    console.log(isArray(undefined)); // false
    console.log(isArray(null)); // false
    */

    function isArray$1(value) {
      return Array.isArray(value);
    }
    /**
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */

    function isString(value) {
      return typeof value === STRING;
    }
    /**
    * Sets up a function that will be called whenever the specified event is delivered to the target
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
    * @param - An options object that specifies characteristics about the event listener. The available options are:
    * @example
    import {addEvent} from "@daybrush/utils";

    addEvent(el, "click", e => {
      console.log(e);
    });
    */

    function addEvent$1(el, type, listener, options) {
      el.addEventListener(type, listener, options);
    }
    /**
    * removes from the EventTarget an event listener previously registered with EventTarget.addEventListener()
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The EventListener function of the event handler to remove from the event target.
    * @example
    import {addEvent, removeEvent} from "@daybrush/utils";
    const listener = e => {
      console.log(e);
    };
    addEvent(el, "click", listener);
    removeEvent(el, "click", listener);
    */

    function removeEvent$1(el, type, listener) {
      el.removeEventListener(type, listener);
    }

    var codeData = {
      "+": "plus",
      "left command": "meta",
      "right command": "meta"
    };
    var keysSort = {
      shift: 1,
      ctrl: 2,
      alt: 3,
      meta: 4
    };
    /**
     * @memberof KeyController
     */

    function getKey(keyCode) {
      var key = keycode_4[keyCode] || "";

      for (var name in codeData) {
        key = key.replace(name, codeData[name]);
      }

      return key.replace(/\s/g, "");
    }
    /**
     * @memberof KeyController
     */

    function getCombi(e, key) {
      if (key === void 0) {
        key = getKey(e.keyCode);
      }

      var keys = getModifierCombi(e);
      keys.indexOf(key) === -1 && keys.push(key);
      return keys.filter(Boolean);
    }
    /**
     * @memberof KeyController
     */

    function getModifierCombi(e) {
      var keys = [e.shiftKey && "shift", e.ctrlKey && "ctrl", e.altKey && "alt", e.metaKey && "meta"];
      return keys.filter(Boolean);
    }

    function getArrangeCombi(keys) {
      var arrangeKeys = keys.slice();
      arrangeKeys.sort(function (prev, next) {
        var prevScore = keysSort[prev] || 5;
        var nextScore = keysSort[next] || 5;
        return prevScore - nextScore;
      });
      return arrangeKeys;
    }

    var globalKeyController;
    /**
     */

    var KeyController =
    /*#__PURE__*/
    function (_super) {
      __extends$3(KeyController, _super);
      /**
       *
       */


      function KeyController(container) {
        if (container === void 0) {
          container = window;
        }

        var _this = _super.call(this) || this;

        _this.container = container;
        /**
         */

        _this.ctrlKey = false;
        /**
         */

        _this.altKey = false;
        /**
         *
         */

        _this.shiftKey = false;
        /**
         *
         */

        _this.metaKey = false;

        _this.clear = function () {
          _this.ctrlKey = false;
          _this.altKey = false;
          _this.shiftKey = false;
          _this.metaKey = false;
          return _this;
        };

        _this.keydownEvent = function (e) {
          _this.triggerEvent("keydown", e);
        };

        _this.keyupEvent = function (e) {
          _this.triggerEvent("keyup", e);
        };

        _this.blur = function () {
          _this.clear();

          _this.trigger("blur");
        };

        addEvent$1(container, "blur", _this.blur);
        addEvent$1(container, "keydown", _this.keydownEvent);
        addEvent$1(container, "keyup", _this.keyupEvent);
        return _this;
      }

      var __proto = KeyController.prototype;
      Object.defineProperty(KeyController, "global", {
        /**
         */
        get: function () {
          return globalKeyController || (globalKeyController = new KeyController());
        },
        enumerable: false,
        configurable: true
      });

      KeyController.setGlobal = function () {
        return this.global;
      };
      /**
       *
       */


      __proto.destroy = function () {
        var container = this.container;
        this.clear();
        this.off();
        removeEvent$1(container, "blur", this.blur);
        removeEvent$1(container, "keydown", this.keydownEvent);
        removeEvent$1(container, "keyup", this.keyupEvent);
      };
      /**
       *
       */


      __proto.keydown = function (comb, callback) {
        return this.addEvent("keydown", comb, callback);
      };
      /**
       *
       */


      __proto.offKeydown = function (comb, callback) {
        return this.removeEvent("keydown", comb, callback);
      };
      /**
       *
       */


      __proto.offKeyup = function (comb, callback) {
        return this.removeEvent("keyup", comb, callback);
      };
      /**
       *
       */


      __proto.keyup = function (comb, callback) {
        return this.addEvent("keyup", comb, callback);
      };

      __proto.addEvent = function (type, comb, callback) {
        if (isArray$1(comb)) {
          this.on(type + "." + getArrangeCombi(comb).join("."), callback);
        } else if (isString(comb)) {
          this.on(type + "." + comb, callback);
        } else {
          this.on(type, comb);
        }

        return this;
      };

      __proto.removeEvent = function (type, comb, callback) {
        if (isArray$1(comb)) {
          this.off(type + "." + getArrangeCombi(comb).join("."), callback);
        } else if (isString(comb)) {
          this.off(type + "." + comb, callback);
        } else {
          this.off(type, comb);
        }

        return this;
      };

      __proto.triggerEvent = function (type, e) {
        this.ctrlKey = e.ctrlKey;
        this.shiftKey = e.shiftKey;
        this.altKey = e.altKey;
        this.metaKey = e.metaKey;
        var key = getKey(e.keyCode);
        var isToggle = key === "ctrl" || key === "shift" || key === "meta" || key === "alt";
        var param = {
          key: key,
          isToggle: isToggle,
          inputEvent: e,
          keyCode: e.keyCode,
          ctrlKey: e.ctrlKey,
          altKey: e.altKey,
          shiftKey: e.shiftKey,
          metaKey: e.metaKey
        };
        this.trigger(type, param);
        this.trigger(type + "." + key, param);
        var combi = getCombi(e, key);
        combi.length > 1 && this.trigger(type + "." + combi.join("."), param);
      };

      return KeyController;
    }(Component);

    function getClient$1(e) {
      if ("touches" in e) {
        var touch = e.touches[0] || e.changedTouches[0];
        return {
          clientX: touch.clientX,
          clientY: touch.clientY
        };
      } else {
        return {
          clientX: e.clientX,
          clientY: e.clientY
        };
      }
    }
    function createElement(jsx, prevTarget, container) {
      var tag = jsx.tag,
          children = jsx.children,
          attributes = jsx.attributes,
          className = jsx.className,
          style = jsx.style;
      var el = prevTarget || document.createElement(tag);

      for (var name in attributes) {
        el.setAttribute(name, attributes[name]);
      }

      var elChildren = el.children;
      children.forEach(function (child, i) {
        createElement(child, elChildren[i], el);
      });

      if (className) {
        className.split(" ").forEach(function (name) {
          if (!hasClass(el, name)) {
            addClass(el, name);
          }
        });
      }

      if (style) {
        var elStyle = el.style;

        for (var name in style) {
          elStyle[name] = style[name];
        }
      }

      if (!prevTarget && container) {
        container.appendChild(el);
      }

      return el;
    }
    function h(tag, attrs) {
      var children = [];

      for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
      }

      var _a = attrs || {},
          _b = _a.className,
          className = _b === void 0 ? "" : _b,
          _c = _a.style,
          style = _c === void 0 ? {} : _c,
          attributes = __rest(_a, ["className", "style"]);

      return {
        tag: tag,
        className: className,
        style: style,
        attributes: attributes,
        children: children
      };
    }
    function diffValue(prev, cur, func) {
      if (prev !== cur) {
        func(prev, cur);
      }
    }
    function getRect(e, ratio) {
      var _a = e.distX,
          distX = _a === void 0 ? 0 : _a,
          _b = e.distY,
          distY = _b === void 0 ? 0 : _b;
      var _c = e.datas,
          startX = _c.startX,
          startY = _c.startY;

      if (ratio > 0) {
        var nextHeight = Math.sqrt((distX * distX + distY * distY) / (1 + ratio * ratio));
        var nextWidth = ratio * nextHeight;
        distX = (distX >= 0 ? 1 : -1) * nextWidth;
        distY = (distY >= 0 ? 1 : -1) * nextHeight;
      }

      var tx = Math.min(0, distX);
      var ty = Math.min(0, distY); // h ^ 2 + (ratio * h) ^ 2 = dist
      // (1 + ratio ^ 2) * h^2 = dist ^ 2
      // dist * Math.atan(ratio);

      var width = Math.abs(distX);
      var height = Math.abs(distY);
      var left = startX + tx;
      var top = startY + ty;
      return {
        left: left,
        top: top,
        right: left + width,
        bottom: top + height,
        width: width,
        height: height
      };
    }

    /*
    Copyright (c) 2019 Daybrush
    name: css-styled
    license: MIT
    author: Daybrush
    repository: git+https://github.com/daybrush/css-styled.git
    version: 0.2.3
    */

    function hash(str) {
      var hash = 5381,
          i    = str.length;

      while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
      }

      /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
       * integers. Since we want the results to be always positive, convert the
       * signed int to an unsigned by doing an unsigned bitshift. */
      return hash >>> 0;
    }

    var stringHash = hash;

    function getHash(str) {
      return stringHash(str).toString(36);
    }
    function getShadowRoot(parentElement) {
      if (parentElement && parentElement.getRootNode) {
        var rootNode = parentElement.getRootNode();

        if (rootNode.nodeType === 11) {
          return rootNode;
        }
      }

      return;
    }
    function injectStyle(className, css, options, shadowRoot) {
      var style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.setAttribute("data-styled-id", className);

      if (options.nonce) {
        style.setAttribute("nonce", options.nonce);
      }

      var styleCSS = css;

      if (!options.original) {
        styleCSS = css.replace(/([^}{]*){/mg, function (all, selector) {
          return splitComma(selector).map(function (subSelector) {
            if (subSelector.indexOf(":global") > -1) {
              return subSelector.replace(/\:global/g, "");
            } else if (subSelector.indexOf(":host") > -1) {
              return "" + subSelector.replace(/\:host/g, "." + className);
            }

            return "." + className + " " + subSelector;
          }).join(", ") + "{";
        });
      }

      style.innerHTML = styleCSS;
      (shadowRoot || document.head || document.body).appendChild(style);
      return style;
    }

    function styled(css) {
      var injectClassName = "rCS" + getHash(css);
      var injectCount = 0;
      var injectElement;
      return {
        className: injectClassName,
        inject: function (el, options) {
          if (options === void 0) {
            options = {};
          }

          var shadowRoot = getShadowRoot(el);
          var firstMount = injectCount === 0;
          var styleElement;

          if (shadowRoot || firstMount) {
            styleElement = injectStyle(injectClassName, css, options, shadowRoot);
          }

          if (firstMount) {
            injectElement = styleElement;
          }

          if (!shadowRoot) {
            ++injectCount;
          }

          return {
            destroy: function () {
              if (shadowRoot) {
                el.removeChild(styleElement);
                styleElement = null;
              } else {
                if (injectCount > 0) {
                  --injectCount;
                }

                if (injectCount === 0 && injectElement) {
                  injectElement.parentNode.removeChild(injectElement);
                  injectElement = null;
                }
              }
            }
          };
        }
      };
    }

    var injector = styled("\n:host {\n    position: fixed;\n    display: none;\n    border: 1px solid #4af;\n    background: rgba(68, 170, 255, 0.5);\n    z-index: 100;\n}\n");
    /**
     * @memberof Selecto
     */

    var CLASS_NAME = "selecto-selection " + injector.className;
    var PROPERTIES = ["selectableTargets", "selectByClick", "selectFromInside", "continueSelect", "toggleContinueSelect", "keyContainer", "hitRate", "scrollOptions", "checkInput", "preventDefault", "ratio"];
    /**
     * @memberof Selecto
     */

    var OPTIONS = __spreadArrays([// ignore target, container,
    "dragContainer", "cspNonce"], PROPERTIES);
    var OPTION_TYPES = {
      target: null,
      container: null,
      dragContainer: null,
      selectableTargets: Array,
      selectByClick: Boolean,
      selectFromInside: Boolean,
      continueSelect: Boolean,
      toggleContinueSelect: Array,
      keyContainer: null,
      hitRate: Number,
      scrollOptions: Object,
      checkInput: Boolean,
      preventDefault: Boolean,
      cspNonce: String,
      ratio: Number
    };
    /**
     * @memberof Selecto
     */

    var EVENTS = ["dragStart", "drag", "dragEnd", "selectStart", "select", "selectEnd", "keydown", "keyup", "scroll"];
    /**
     * @memberof Selecto
     */

    var METHODS = ["clickTarget", "setSelectedTargets", "triggerDragStart"];

    /**
     * Selecto.js is a component that allows you to select elements in the drag area using the mouse or touch.
     * @sort 1
     * @extends eg.Component
     */

    var Selecto =
    /*#__PURE__*/
    function (_super) {
      __extends(Selecto, _super);
      /**
       *
       */


      function Selecto(options) {
        if (options === void 0) {
          options = {};
        }

        var _this = _super.call(this) || this;

        _this.selectedTargets = [];
        _this.differ = new ChildrenDiffer();
        _this.dragScroll = new DragScroll();

        _this.onDragStart = function (e, clickedTarget) {
          var datas = e.datas,
              clientX = e.clientX,
              clientY = e.clientY,
              inputEvent = e.inputEvent;
          var _a = _this.options,
              continueSelect = _a.continueSelect,
              selectFromInside = _a.selectFromInside,
              selectByClick = _a.selectByClick;

          var selectableTargets = _this.getSelectableTargets();

          var selectableRects = selectableTargets.map(function (target) {
            var rect = target.getBoundingClientRect();
            var left = rect.left,
                top = rect.top,
                width = rect.width,
                height = rect.height;
            return {
              left: left,
              top: top,
              right: left + width,
              bottom: top + height,
              width: width,
              height: height
            };
          });
          datas.selectableTargets = selectableTargets;
          datas.selectableRects = selectableRects;
          datas.startSelectedTargets = _this.selectedTargets;
          var hitRect = {
            left: clientX,
            top: clientY,
            right: clientX,
            bottom: clientY,
            width: 0,
            height: 0
          };
          var firstPassedTargets = [];

          if (selectFromInside || selectByClick) {
            var pointTarget = clickedTarget || document.elementFromPoint(clientX, clientY);

            while (pointTarget) {
              if (selectableTargets.indexOf(pointTarget) > -1) {
                break;
              }

              pointTarget = pointTarget.parentElement;
            }

            firstPassedTargets = pointTarget ? [pointTarget] : [];
          }

          var hasInsideTargets = firstPassedTargets.length > 0;
          var isPreventSelect = !selectFromInside && hasInsideTargets;

          if (isPreventSelect && !selectByClick) {
            return false;
          }

          var type = inputEvent.type;
          var isTrusted = type === "mousedown" || type === "touchstart";
          /**
           * When the drag starts, the dragStart event is called.
           * Call the stop () function if you have a specific element or don't want to raise a select
           * @memberof Selecto
           * @event dragStart
           * @param {OnDragStart} - Parameters for the dragStart event
           * @example
           * import Selecto from "selecto";
           *
           * const selecto = new Selecto({
           *   container: document.body,
           *   selectByClick: true,
           *   selectFromInside: false,
           * });
           *
           * selecto.on("dragStart", e => {
           *   if (e.inputEvent.target.tagName === "SPAN") {
           *     e.stop();
           *   }
           * }).on("select", e => {
           *   e.added.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.removed.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * });
           */

          var result = isTrusted ? _this.trigger("dragStart", e) : true;

          if (!result) {
            return false;
          }

          if (!continueSelect) {
            _this.selectedTargets = [];
          } else {
            firstPassedTargets = _this.passSelectedTargets(firstPassedTargets);
          }

          _this.select(firstPassedTargets, hitRect, inputEvent, true);

          datas.startX = clientX;
          datas.startY = clientY;
          datas.selectedTargets = firstPassedTargets;
          _this.target.style.cssText += "left:0px;top:0px;transform: translate(" + clientX + "px, " + clientY + "px)";

          if (isPreventSelect && selectByClick) {
            _this.onDragEnd(e);

            inputEvent.preventDefault();
            return false;
          } else {
            if (type === "touchstart") {
              inputEvent.preventDefault();
            }

            var scrollOptions = _this.options.scrollOptions;

            if (scrollOptions && scrollOptions.container) {
              _this.dragScroll.dragStart(e, scrollOptions);
            }

            return true;
          }
        };

        _this.onDrag = function (e) {
          var scrollOptions = _this.options.scrollOptions;

          if (scrollOptions && scrollOptions.container) {
            if (_this.dragScroll.drag(e, scrollOptions)) {
              return;
            }
          }

          _this.check(e);
        };

        _this.onDragEnd = function (e) {
          var datas = e.datas;
          var rect = getRect(e, _this.options.ratio);

          _this.dragScroll.dragEnd();

          _this.target.style.cssText += "display: none;";

          _this.trigger("dragEnd", __assign(__assign({}, e), {
            rect: rect
          }));

          _this.selectEnd(datas.startSelectedTargets, datas.selectedTargets, rect, e);

          _this.selectedTargets = datas.selectedTargets;
        };

        _this.onKeyDown = function (e) {
          if (!_this.sameCombiKey(e)) {
            return;
          }

          _this.continueSelect = true;
          /**
           * When you keydown the key you specified in toggleContinueSelect, the keydown event is called.
           * @memberof Selecto
           * @event keydown
           * @example
           * import Selecto from "selecto";
           *
           * const selecto = new Selecto({
           *   container: document.body,
           *   toggleContinueSelect: "shift";
           *   keyContainer: window,
           * });
           *
           * selecto.on("keydown", () => {
           *   document.querySelector(".button").classList.add("selected");
           * }).on("keyup", () => {
           *   document.querySelector(".button").classList.remove("selected");
           * }).on("select", e => {
           *   e.added.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.removed.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * });
           */

          _this.trigger("keydown", {});
        };

        _this.onKeyUp = function (e) {
          if (!_this.sameCombiKey(e, true)) {
            return;
          }

          _this.continueSelect = false;
          /**
           * When you keyup the key you specified in toggleContinueSelect, the keyup event is called.
           * @memberof Selecto
           * @event keyup
           * @example
           * import Selecto from "selecto";
           *
           * const selecto = new Selecto({
           *   container: document.body,
           *   toggleContinueSelect: "shift";
           *   keyContainer: window,
           * });
           *
           * selecto.on("keydown", () => {
           *   document.querySelector(".button").classList.add("selected");
           * }).on("keyup", () => {
           *   document.querySelector(".button").classList.remove("selected");
           * }).on("select", e => {
           *   e.added.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.removed.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * });
           */

          _this.trigger("keyup", {});
        };

        _this.onBlur = function () {
          if (_this.toggleContinueSelect && _this.continueSelect) {
            _this.trigger("keyup", {});
          }
        };

        _this.onDocumentSelectStart = function (e) {
          if (!_this.dragger.isFlag()) {
            return;
          }

          var dragContainer = _this.dragContainer;

          if (dragContainer === window) {
            dragContainer = document.documentElement;
          }

          var containers = dragContainer instanceof Element ? [dragContainer] : [].slice.call(dragContainer);
          var target = e.target;
          containers.some(function (container) {
            if (container === target || container.contains(target)) {
              e.preventDefault();
              return true;
            }
          });
        };

        _this.target = options.target;
        _this.container = options.container;
        _this.options = __assign({
          target: null,
          container: null,
          dragContainer: null,
          selectableTargets: [],
          selectByClick: true,
          selectFromInside: true,
          hitRate: 100,
          continueSelect: false,
          toggleContinueSelect: null,
          keyContainer: null,
          scrollOptions: undefined,
          checkInput: false,
          preventDefault: false,
          cspNonce: "",
          ratio: 0
        }, options);

        _this.initElement();

        _this.initDragScroll();

        _this.setKeyController();

        return _this;
      }
      /**
       * You can set the currently selected targets.
       */


      var __proto = Selecto.prototype;

      __proto.setSelectedTargets = function (selectedTargets) {
        this.selectedTargets = selectedTargets;
        this.differ = new ChildrenDiffer(selectedTargets);
        return this;
      };
      /**
       * You can get the currently selected targets.
       */


      __proto.getSelectedTargets = function () {
        return this.selectedTargets;
      };

      __proto.setKeyContainer = function (keyContainer) {
        var _this = this;

        var options = this.options;
        diffValue(options.keyContainer, keyContainer, function () {
          options.keyContainer = keyContainer;

          _this.setKeyController();
        });
      };

      __proto.setToggleContinueSelect = function (toggleContinueSelect) {
        var _this = this;

        var options = this.options;
        diffValue(options.toggleContinueSelect, toggleContinueSelect, function () {
          options.toggleContinueSelect = toggleContinueSelect;

          _this.setKeyEvent();
        });
      };

      __proto.setPreventDefault = function (value) {
        this.dragger.options.preventDefault = value;
      };

      __proto.setCheckInput = function (value) {
        this.dragger.options.checkInput = value;
      };
      /**
       * `OnDragStart` is triggered by an external event.
       * @param - external event
       * @example
       * import Selecto from "selecto";
       *
       * const selecto = new Selecto();
       *
       * window.addEventListener("mousedown", e => {
       *   selecto.triggerDragStart(e);
       * });
       */


      __proto.triggerDragStart = function (e) {
        this.dragger.triggerDragStart(e);
        return this;
      };
      /**
       * Destroy elements, properties, and events.
       */


      __proto.destroy = function () {
        this.off();
        this.keycon && this.keycon.destroy();
        this.dragger.unset();
        this.injectResult.destroy();
        removeEvent(document, "selectstart", this.onDocumentSelectStart);
        this.keycon = null;
        this.dragger = null;
        this.injectResult = null;
        this.target = null;
        this.container = null;
        this.options = null;
      };
      /**
       * External click or mouse events can be applied to the selecto.
       * @params - Extenal click or mouse event
       * @params - Specify the clicked target directly.
       */


      __proto.clickTarget = function (e, clickedTarget) {
        var _a = getClient$1(e),
            clientX = _a.clientX,
            clientY = _a.clientY;

        var dragEvent = {
          datas: {},
          clientX: clientX,
          clientY: clientY,
          inputEvent: e
        };

        if (this.onDragStart(dragEvent, clickedTarget)) {
          this.onDragEnd(dragEvent);
        }

        return this;
      };

      __proto.setKeyController = function () {
        var _a = this.options,
            keyContainer = _a.keyContainer,
            toggleContinueSelect = _a.toggleContinueSelect;

        if (this.keycon) {
          this.keycon.destroy();
          this.keycon = null;
        }

        if (toggleContinueSelect) {
          this.keycon = new KeyController(keyContainer || window);
          this.keycon.keydown(this.onKeyDown).keyup(this.onKeyUp).on("blur", this.onBlur);
        }
      };

      __proto.setKeyEvent = function () {
        var toggleContinueSelect = this.options.toggleContinueSelect;

        if (!toggleContinueSelect || this.keycon) {
          return;
        }

        this.setKeyController();
      };

      __proto.initElement = function () {
        this.target = createElement(h("div", {
          className: CLASS_NAME
        }), this.target, this.container);
        var target = this.target;
        var _a = this.options,
            dragContainer = _a.dragContainer,
            checkInput = _a.checkInput,
            preventDefault = _a.preventDefault;
        this.dragContainer = typeof dragContainer === "string" ? [].slice.call(document.querySelectorAll(dragContainer)) : this.options.dragContainer || this.target.parentNode;
        this.dragger = new Dragger(this.dragContainer, {
          container: window,
          checkInput: checkInput,
          preventDefault: preventDefault,
          dragstart: this.onDragStart,
          drag: this.onDrag,
          dragend: this.onDragEnd
        });
        addEvent(document, "selectstart", this.onDocumentSelectStart);
        this.injectResult = injector.inject(target, {
          nonce: this.options.cspNonce
        });
      };

      __proto.hitTest = function (selectRect, clientX, clientY, targets, rects) {
        var _a = this.options,
            hitRate = _a.hitRate,
            selectByClick = _a.selectByClick;
        var left = selectRect.left,
            top = selectRect.top,
            right = selectRect.right,
            bottom = selectRect.bottom;
        return targets.filter(function (target, i) {
          var _a = rects[i],
              rectLeft = _a.left,
              rectTop = _a.top,
              rectRight = _a.right,
              rectBottom = _a.bottom;
          var isStart = rectLeft <= clientX && clientX <= rectRight && rectTop <= clientY && clientY <= rectBottom;
          var rectSize = (rectRight - rectLeft) * (rectBottom - rectTop);
          var testLeft = Math.max(rectLeft, left);
          var testRight = Math.min(rectRight, right);
          var testTop = Math.max(rectTop, top);
          var testBottom = Math.min(rectBottom, bottom);

          if (selectByClick && isStart) {
            return true;
          }

          if (testRight < testLeft || testBottom < testTop) {
            return false;
          }

          var rate = Math.round((testRight - testLeft) * (testBottom - testTop) / rectSize * 100);

          if (rate >= hitRate) {
            return true;
          }

          return false;
        });
      };

      __proto.initDragScroll = function () {
        var _this = this;

        this.dragScroll.on("scroll", function (_a) {
          var container = _a.container,
              direction = _a.direction;

          _this.trigger("scroll", {
            container: container,
            direction: direction
          });
        }).on("move", function (_a) {
          var offsetX = _a.offsetX,
              offsetY = _a.offsetY,
              inputEvent = _a.inputEvent;
          var datas = inputEvent.datas;
          datas.startX -= offsetX;
          datas.startY -= offsetY;
          datas.selectableRects.forEach(function (rect) {
            rect.top -= offsetY;
            rect.bottom -= offsetY;
            rect.left -= offsetX;
            rect.right -= offsetX;
          });

          _this.dragger.scrollBy(offsetX, offsetY, inputEvent.inputEvent, false);

          inputEvent.distX += offsetX;
          inputEvent.distY += offsetY;

          _this.check(inputEvent);
        });
      };

      __proto.getSelectableTargets = function () {
        var selectableTargets = [];
        this.options.selectableTargets.forEach(function (target) {
          if (isObject(target)) {
            selectableTargets.push(target);
          } else {
            var elements = [].slice.call(document.querySelectorAll(target));
            elements.forEach(function (el) {
              selectableTargets.push(el);
            });
          }
        });
        return selectableTargets;
      };

      __proto.passSelectedTargets = function (passedTargets) {
        var _a = diff$1(this.selectedTargets, passedTargets),
            list = _a.list,
            prevList = _a.prevList,
            added = _a.added,
            removed = _a.removed;

        return added.map(function (index) {
          return list[index];
        }).concat(removed.map(function (index) {
          return prevList[index];
        }));
      };

      __proto.select = function (selectedTargets, rect, inputEvent, isStart) {
        var _a = this.differ.update(selectedTargets),
            added = _a.added,
            removed = _a.removed,
            prevList = _a.prevList,
            list = _a.list;

        if (isStart) {
          /**
           * When the select(drag) starts, the selectStart event is called.
           * @memberof Selecto
           * @event selectStart
           * @param {Selecto.OnSelect} - Parameters for the selectStart event
           * @example
           * import Selecto from "selecto";
           *
           * const selecto = new Selecto({
           *   container: document.body,
           *   selectByClick: true,
           *   selectFromInside: false,
           * });
           *
           * selecto.on("selectStart", e => {
           *   e.added.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.removed.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * }).on("selectEnd", e => {
           *   e.afterAdded.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.afterRemoved.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * });
           */
          this.trigger("selectStart", {
            selected: selectedTargets,
            added: added.map(function (index) {
              return list[index];
            }),
            removed: removed.map(function (index) {
              return prevList[index];
            }),
            rect: rect,
            inputEvent: inputEvent
          });
        }

        if (added.length || removed.length) {
          /**
           * When the select in real time, the select event is called.
           * @memberof Selecto
           * @event select
           * @param {Selecto.OnSelect} - Parameters for the select event
           * @example
           * import Selecto from "selecto";
           *
           * const selecto = new Selecto({
           *   container: document.body,
           *   selectByClick: true,
           *   selectFromInside: false,
           * });
           *
           * selecto.on("select", e => {
           *   e.added.forEach(el => {
           *     el.classList.add("selected");
           *   });
           *   e.removed.forEach(el => {
           *     el.classList.remove("selected");
           *   });
           * });
           */
          this.trigger("select", {
            selected: selectedTargets,
            added: added.map(function (index) {
              return list[index];
            }),
            removed: removed.map(function (index) {
              return prevList[index];
            }),
            rect: rect,
            inputEvent: inputEvent
          });
        }
      };

      __proto.selectEnd = function (startSelectedTargets, selectedTargets, rect, e) {
        var inputEvent = e.inputEvent,
            isDouble = e.isDouble;

        var _a = diff$1(startSelectedTargets, selectedTargets),
            added = _a.added,
            removed = _a.removed,
            prevList = _a.prevList,
            list = _a.list;

        var _b = diff$1(this.selectedTargets, selectedTargets),
            afterAdded = _b.added,
            afterRemoved = _b.removed,
            afterPrevList = _b.prevList,
            afterList = _b.list;

        var type = inputEvent.type;
        var isDragStart = type === "mousedown" || type === "touchstart";
        /**
         * When the select(dragEnd or click) ends, the selectEnd event is called.
         * @memberof Selecto
         * @event selectEnd
         * @param {Selecto.OnSelectEnd} - Parameters for the selectEnd event
         * @example
         * import Selecto from "selecto";
         *
         * const selecto = new Selecto({
         *   container: document.body,
         *   selectByClick: true,
         *   selectFromInside: false,
         * });
         *
         * selecto.on("selectStart", e => {
         *   e.added.forEach(el => {
         *     el.classList.add("selected");
         *   });
         *   e.removed.forEach(el => {
         *     el.classList.remove("selected");
         *   });
         * }).on("selectEnd", e => {
         *   e.afterAdded.forEach(el => {
         *     el.classList.add("selected");
         *   });
         *   e.afterRemoved.forEach(el => {
         *     el.classList.remove("selected");
         *   });
         * });
         */

        this.trigger("selectEnd", {
          selected: selectedTargets,
          added: added.map(function (index) {
            return list[index];
          }),
          removed: removed.map(function (index) {
            return prevList[index];
          }),
          afterAdded: afterAdded.map(function (index) {
            return afterList[index];
          }),
          afterRemoved: afterRemoved.map(function (index) {
            return afterPrevList[index];
          }),
          isDragStart: isDragStart,
          isDouble: !!isDouble,
          rect: rect,
          inputEvent: inputEvent
        });
      };

      __proto.check = function (e) {
        var datas = e.datas,
            inputEvent = e.inputEvent;
        var rect = getRect(e, this.options.ratio);
        var top = rect.top,
            left = rect.left,
            width = rect.width,
            height = rect.height;
        this.target.style.cssText += "display: block;" + "left:0px;top:0px;" + ("transform: translate(" + left + "px, " + top + "px);") + ("width:" + width + "px;height:" + height + "px;");
        var passedTargets = this.hitTest(rect, datas.startX, datas.startY, datas.selectableTargets, datas.selectableRects);
        var selectedTargets = this.passSelectedTargets(passedTargets);
        this.trigger("drag", __assign(__assign({}, e), {
          rect: rect
        }));
        this.select(selectedTargets, rect, inputEvent);
        datas.selectedTargets = selectedTargets;
      };

      __proto.sameCombiKey = function (e, isKeyup) {
        var toggleContinueSelect = [].concat(this.options.toggleContinueSelect);
        var combi = getCombi(e.inputEvent, e.key);
        var toggleKeys = isArray(toggleContinueSelect[0]) ? toggleContinueSelect : [toggleContinueSelect];

        if (isKeyup) {
          var singleKey_1 = e.key;
          return toggleKeys.some(function (keys) {
            return keys.some(function (key) {
              return key === singleKey_1;
            });
          });
        }

        return toggleKeys.some(function (keys) {
          return keys.every(function (key) {
            return combi.indexOf(key) > -1;
          });
        });
      };

      Selecto = __decorate([Properties(PROPERTIES, function (prototype, property) {
        var attributes = {
          enumerable: true,
          configurable: true,
          get: function () {
            return this.options[property];
          }
        };
        var setter = camelize("set " + property);

        if (prototype[setter]) {
          attributes.set = function set(value) {
            this[setter](value);
          };
        } else {
          attributes.set = function set(value) {
            this.options[property] = value;
          };
        }

        Object.defineProperty(prototype, property, attributes);
      })], Selecto);
      return Selecto;
    }(Component);



    var modules = ({
        __proto__: null,
        'default': Selecto,
        OPTIONS: OPTIONS,
        OPTION_TYPES: OPTION_TYPES,
        PROPERTIES: PROPERTIES,
        EVENTS: EVENTS,
        METHODS: METHODS,
        CLASS_NAME: CLASS_NAME
    });

    for (var name in modules) {
      Selecto[name] = modules[name];
    }

    return Selecto;

})));
//# sourceMappingURL=selecto.js.map

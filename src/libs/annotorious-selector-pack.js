(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Annotorious"] = factory();
	else
		root["Annotorious"] = root["Annotorious"] || {}, root["Annotorious"]["SelectorPack"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 94:
/*!***********************************************!*\
  !*** ./node_modules/fast-deep-equal/index.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
 // do not edit .js files directly - edit src/index.jst

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && _typeof(a) == 'object' && _typeof(b) == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;

    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }

      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    }

    for (i = length; i-- !== 0;) {
      var key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  } // true if both NaN, false otherwise


  return a !== a && b !== b;
};

/***/ }),

/***/ 773:
/*!********************************************!*\
  !*** ./node_modules/tiny-emitter/index.js ***!
  \********************************************/
/***/ ((module) => {

function E() {// Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function on(name, callback, ctx) {
    var e = this.e || (this.e = {});
    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });
    return this;
  },
  once: function once(name, callback, ctx) {
    var self = this;

    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    ;
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function emit(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },
  off: function off(name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
      }
    } // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910


    liveEvents.length ? e[name] = liveEvents : delete e[name];
    return this;
  }
};
module.exports = E;
module.exports.TinyEmitter = E;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************************!*\
  !*** ./src/index.js + 38 modules ***!
  \***********************************/

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

// EXTERNAL MODULE: ./node_modules/tiny-emitter/index.js
var tiny_emitter = __webpack_require__(773);
var tiny_emitter_default = /*#__PURE__*/__webpack_require__.n(tiny_emitter);
;// CONCATENATED MODULE: ./node_modules/@recogito/annotorious/src/util/Touch.js
var SIM_EVENTS = {
  touchstart: 'mousedown',
  touchmove: 'mousemove',
  touchend: 'mouseup'
};
var isTouchDevice = function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};
var enableTouchTranslation = function enableTouchTranslation(el) {
  var pressAndHoldTrigger = null;

  var simulateEvent = function simulateEvent(type, e) {
    return new MouseEvent(type, {
      screenX: e.screenX,
      screenY: e.screenY,
      clientX: e.clientX,
      clientY: e.clientY,
      pageX: e.pageX,
      pageY: e.pageY,
      bubbles: true
    });
  };

  var touchHandler = function touchHandler(evt) {
    var touch = evt.changedTouches[0];
    var simulatedEvent = simulateEvent(SIM_EVENTS[evt.type], touch);
    touch.target.dispatchEvent(simulatedEvent);
    evt.preventDefault();

    if (evt.type === 'touchstart' || evt.type === 'touchmove') {
      pressAndHoldTrigger && clearTimeout(pressAndHoldTrigger);
      pressAndHoldTrigger = setTimeout(function () {
        var simulatedEvent = simulateEvent('dblclick', touch);
        touch.target.dispatchEvent(simulatedEvent);
      }, 800);
    }

    if (evt.type === 'touchend') pressAndHoldTrigger && clearTimeout(pressAndHoldTrigger);
  };

  el.addEventListener('touchstart', touchHandler, true);
  el.addEventListener('touchmove', touchHandler, true);
  el.addEventListener('touchend', touchHandler, true);
  el.addEventListener('touchcancel', touchHandler, true);
};
;// CONCATENATED MODULE: ./node_modules/@recogito/annotorious/src/util/SVG.js
var SVG_SVG_NAMESPACE = 'http://www.w3.org/2000/svg';

var getClassNames = function getClassNames(el) {
  var attr = el.getAttribute('class');
  return attr ? new Set(attr.split(' ')) : new Set();
}; // IE11 doesn't support adding/removing classes to SVG elements except 
// via .setAttribute


var SVG_addClass = function addClass(el, className) {
  var classNames = getClassNames(el);
  classNames.add(className);
  el.setAttribute('class', Array.from(classNames).join(' '));
};
var removeClass = function removeClass(el, className) {
  var classNames = getClassNames(el);
  classNames["delete"](className);
  if (classNames.size === 0) el.removeAttribute('class');else el.setAttribute('class', Array.from(classNames).join(' '));
};
var hasClass = function hasClass(el, className) {
  return getClassNames(el).has(className);
};
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/rng.js
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/regex.js
/* harmony default export */ const regex = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/validate.js


function validate(uuid) {
  return typeof uuid === 'string' && regex.test(uuid);
}

/* harmony default export */ const esm_browser_validate = (validate);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/stringify.js

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434

  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!esm_browser_validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const esm_browser_stringify = (stringify);
;// CONCATENATED MODULE: ./node_modules/uuid/dist/esm-browser/v4.js



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return esm_browser_stringify(rnds);
}

/* harmony default export */ const esm_browser_v4 = (v4);
// EXTERNAL MODULE: ./node_modules/fast-deep-equal/index.js
var fast_deep_equal = __webpack_require__(94);
var fast_deep_equal_default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal);
;// CONCATENATED MODULE: ./node_modules/@recogito/recogito-client-core/src/WebAnnotation.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var WebAnnotation = /*#__PURE__*/function () {
  function WebAnnotation(annotation, opts) {
    var _this = this;

    _classCallCheck(this, WebAnnotation);

    _defineProperty(this, "clone", function (opt_props, opt_opts) {
      return new WebAnnotation(_objectSpread(_objectSpread({}, _this.underlying), opt_props), _objectSpread(_objectSpread({}, _this.opts), opt_opts));
    });

    _defineProperty(this, "selector", function (type) {
      var target = _this.underlying.target;

      if (target.selector) {
        // Normalize to array
        var selectors = Array.isArray(target.selector) ? target.selector : [target.selector];
        return selectors.find(function (s) {
          return s.type === type;
        });
      }
    });

    this.underlying = annotation;
    this.opts = opts;
  }
  /** For convenience - creates an empty web annotation **/


  _createClass(WebAnnotation, [{
    key: "isEqual",
    value:
    /** An equality check based on the underlying object **/
    function isEqual(other) {
      if ((other === null || other === void 0 ? void 0 : other.type) !== 'Annotation') {
        return false;
      } else if (this.underlying === other.underlying) {
        return true;
      } else if (!this.underlying.id || !other.underlying.id) {
        return false;
      } else {
        return fast_deep_equal_default()(this.underlying, other.underlying);
      }
    }
  }, {
    key: "readOnly",
    get: function get() {
      var _this$opts;

      return (_this$opts = this.opts) === null || _this$opts === void 0 ? void 0 : _this$opts.readOnly;
    }
    /*************************************/

    /* Getters to forward properties of  */

    /* the underlying annotation         */

    /*************************************/

  }, {
    key: "id",
    get: function get() {
      return this.underlying.id;
    }
  }, {
    key: "context",
    get: function get() {
      return this.underlying['@context'];
    }
  }, {
    key: "type",
    get: function get() {
      return this.underlying.type;
    }
  }, {
    key: "motivation",
    get: function get() {
      return this.underlying.motivation;
    }
  }, {
    key: "body",
    get: function get() {
      return this.underlying.body;
    }
  }, {
    key: "target",
    get: function get() {
      return this.underlying.target;
    }
    /** Same as .body, but guaranteed to return an array **/

  }, {
    key: "bodies",
    get: function get() {
      return Array.isArray(this.underlying.body) ? this.underlying.body : [this.underlying.body];
    }
    /** Only bodies are meant to be mutated by the application **/
    ,
    set: function set(bodies) {
      this.underlying.body = bodies;
    }
    /** Same as .target, but guaranteed to return an array **/

  }, {
    key: "targets",
    get: function get() {
      return Array.isArray(this.underlying.target) ? this.underlying.target : [this.underlying.target];
    }
    /*****************************************/

    /* Various access helpers and shorthands */

    /*****************************************/

    /** Selector of the given type **/

  }, {
    key: "quote",
    get:
    /** Shorthand for the 'exact' field of the TextQuoteSelector **/
    function get() {
      var _this$selector;

      return (_this$selector = this.selector('TextQuoteSelector')) === null || _this$selector === void 0 ? void 0 : _this$selector.exact;
    }
    /** Shorthand for the 'start' field of the TextPositionSelector **/

  }, {
    key: "start",
    get: function get() {
      var _this$selector2;

      return (_this$selector2 = this.selector('TextPositionSelector')) === null || _this$selector2 === void 0 ? void 0 : _this$selector2.start;
    }
    /** Shorthand for the 'end' field of the TextPositionSelector **/

  }, {
    key: "end",
    get: function get() {
      var _this$selector3;

      return (_this$selector3 = this.selector('TextPositionSelector')) === null || _this$selector3 === void 0 ? void 0 : _this$selector3.end;
    }
  }]);

  return WebAnnotation;
}();

_defineProperty(WebAnnotation, "create", function (args) {
  var stub = {
    '@context': 'http://www.w3.org/ns/anno.jsonld',
    'type': 'Annotation',
    'id': "#".concat(esm_browser_v4()),
    'body': []
  };
  return new WebAnnotation(_objectSpread(_objectSpread({}, stub), args));
});


;// CONCATENATED MODULE: ./node_modules/@recogito/recogito-client-core/src/Selection.js
function Selection_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function Selection_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? Selection_ownKeys(Object(source), !0).forEach(function (key) { Selection_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : Selection_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function Selection_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Selection_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Selection_createClass(Constructor, protoProps, staticProps) { if (protoProps) Selection_defineProperties(Constructor.prototype, protoProps); if (staticProps) Selection_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function Selection_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * An "annotation in draft mode". Really the same
 * data structure, but as a separate class so we can
 * tell things apart properly.
 */

var Selection = /*#__PURE__*/function () {
  function Selection(_target, body) {
    var _this = this;

    Selection_classCallCheck(this, Selection);

    Selection_defineProperty(this, "clone", function (opt_props) {
      // Deep-clone
      var cloned = new Selection();
      cloned.underlying = JSON.parse(JSON.stringify(_this.underlying));
      if (opt_props) cloned.underlying = Selection_objectSpread(Selection_objectSpread({}, cloned.underlying), opt_props);
      return cloned;
    });

    Selection_defineProperty(this, "selector", function (type) {
      var target = _this.underlying.target;

      if (target.selector) {
        // Normalize to array
        var selectors = Array.isArray(target.selector) ? target.selector : [target.selector];
        return selectors.find(function (s) {
          return s.type === type;
        });
      }
    });

    Selection_defineProperty(this, "toAnnotation", function () {
      var a = Object.assign({}, _this.underlying, {
        'type': 'Annotation',
        'id': "#".concat(esm_browser_v4())
      });
      return new WebAnnotation(a);
    });

    this.underlying = {
      '@context': 'http://www.w3.org/ns/anno.jsonld',
      type: 'Selection',
      body: body || [],
      target: _target
    };
  }
  /** Creates a copy of this selection **/


  Selection_createClass(Selection, [{
    key: "context",
    get: function get() {
      return this.underlying['@context'];
    }
  }, {
    key: "type",
    get: function get() {
      return this.underlying.type;
    }
  }, {
    key: "body",
    get: function get() {
      return this.underlying.body;
    }
  }, {
    key: "target",
    get: function get() {
      return this.underlying.target;
    }
  }, {
    key: "targets",
    get: function get() {
      return Array.isArray(this.underlying.target) ? this.underlying.target : [this.underlying.target];
    }
    /** For consistency with WebAnnotation **/

  }, {
    key: "isEqual",
    value: function isEqual(other) {
      if (!other) {
        return false;
      } else {
        return fast_deep_equal_default()(this.underlying, other.underlying);
      }
    }
  }, {
    key: "bodies",
    get: function get() {
      return Array.isArray(this.underlying.body) ? this.underlying.body : [this.underlying.body];
    }
  }, {
    key: "quote",
    get:
    /** Shorthand for the 'exact' field of the TextQuoteSelector **/
    function get() {
      var _this$selector;

      return (_this$selector = this.selector('TextQuoteSelector')) === null || _this$selector === void 0 ? void 0 : _this$selector.exact;
    }
    /*******************************************/

    /* Selection-specific properties & methods */

    /*******************************************/

  }, {
    key: "isSelection",
    get: function get() {
      return true;
    }
  }]);

  return Selection;
}();


;// CONCATENATED MODULE: ./node_modules/@recogito/annotorious/src/tools/Tool.js
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function Tool_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Tool_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Tool_createClass(Constructor, protoProps, staticProps) { if (protoProps) Tool_defineProperties(Constructor.prototype, protoProps); if (staticProps) Tool_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function Tool_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var IMPLEMENTATION_MISSING = "An implementation is missing";
var isTouch = isTouchDevice();
/**
 * A commmon base class for Tools and EditableShapes
 */

var ToolLike = /*#__PURE__*/function (_EventEmitter) {
  _inherits(ToolLike, _EventEmitter);

  var _super = _createSuper(ToolLike);

  function ToolLike(g, config, env) {
    var _this;

    Tool_classCallCheck(this, ToolLike);

    _this = _super.call(this);

    Tool_defineProperty(_assertThisInitialized(_this), "enableResponsive", function () {
      if (window.ResizeObserver) {
        _this.resizeObserver = new ResizeObserver(function () {
          var svgBounds = _this.svg.getBoundingClientRect();

          var _this$svg$viewBox$bas = _this.svg.viewBox.baseVal,
              width = _this$svg$viewBox$bas.width,
              height = _this$svg$viewBox$bas.height;
          _this.scale = Math.max(width / svgBounds.width, height / svgBounds.height);
          if (_this.onScaleChanged) _this.onScaleChanged(_this.scale);
        });

        _this.resizeObserver.observe(_this.svg.parentNode);
      }
    });

    Tool_defineProperty(_assertThisInitialized(_this), "getSVGPoint", function (evt) {
      var pt = _this.svg.createSVGPoint();

      if (isTouch) {
        var bbox = _this.svg.getBoundingClientRect();

        var x = evt.clientX - bbox.x;
        var y = evt.clientY - bbox.y;

        var _this$svg$getBounding = _this.svg.getBoundingClientRect(),
            left = _this$svg$getBounding.left,
            top = _this$svg$getBounding.top;

        pt.x = x + left;
        pt.y = y + top;
        return pt.matrixTransform(_this.g.getScreenCTM().inverse());
      } else {
        pt.x = evt.offsetX;
        pt.y = evt.offsetY;
        return pt.matrixTransform(_this.g.getCTM().inverse());
      }
    });

    Tool_defineProperty(_assertThisInitialized(_this), "drawHandle", function (x, y) {
      var containerGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
      containerGroup.setAttribute('class', 'a9s-handle');
      var group = document.createElementNS(SVG_SVG_NAMESPACE, 'g');

      var drawCircle = function drawCircle(r) {
        var c = document.createElementNS(SVG_SVG_NAMESPACE, 'circle');
        c.setAttribute('cx', x);
        c.setAttribute('cy', y);
        c.setAttribute('r', r);
        c.setAttribute('transform-origin', "".concat(x, " ").concat(y));
        return c;
      };

      var radius = _this.config.handleRadius || 6;
      var inner = drawCircle(radius);
      inner.setAttribute('class', 'a9s-handle-inner');
      var outer = drawCircle(radius + 1);
      outer.setAttribute('class', 'a9s-handle-outer');
      group.appendChild(outer);
      group.appendChild(inner);
      containerGroup.appendChild(group);
      return containerGroup;
    });

    Tool_defineProperty(_assertThisInitialized(_this), "setHandleXY", function (handle, x, y) {
      var inner = handle.querySelector('.a9s-handle-inner');
      inner.setAttribute('cx', x);
      inner.setAttribute('cy', y);
      inner.setAttribute('transform-origin', "".concat(x, " ").concat(y));
      var outer = handle.querySelector('.a9s-handle-outer');
      outer.setAttribute('cx', x);
      outer.setAttribute('cy', y);
      outer.setAttribute('transform-origin', "".concat(x, " ").concat(y));
    });

    Tool_defineProperty(_assertThisInitialized(_this), "getHandleXY", function (handle) {
      var outer = handle.querySelector('.a9s-handle-outer');
      return {
        x: parseFloat(outer.getAttribute('cx')),
        y: parseFloat(outer.getAttribute('cy'))
      };
    });

    Tool_defineProperty(_assertThisInitialized(_this), "scaleHandle", function (handle) {
      var inner = handle.querySelector('.a9s-handle-inner');
      var outer = handle.querySelector('.a9s-handle-outer');
      var radius = _this.scale * (_this.config.handleRadius || 6);
      inner.setAttribute('r', radius);
      outer.setAttribute('r', radius);
    });

    _this.svg = g.closest('svg');
    _this.g = g;
    _this.config = config;
    _this.env = env; // Default image scale

    _this.scale = 1; // Bit of a hack. If we are dealing with a 'real' image, we enable
    // reponsive mode. OpenSeadragon handles scaling in a different way,
    // so we don't need responsive mode.

    var image = env.image;
    if (image instanceof Element || image instanceof HTMLDocument) _this.enableResponsive();
    return _this;
  }
  /**
   * Implementations MAY extend this (calling super),
   * to destroy SVG elements, mask, etc.
   */


  Tool_createClass(ToolLike, [{
    key: "destroy",
    value: function destroy() {
      if (this.resizeObserver) this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }]);

  return ToolLike;
}((tiny_emitter_default()));
/**
 * Base class that adds some convenience stuff for tool plugins.
 */

var Tool = /*#__PURE__*/function (_ToolLike) {
  _inherits(Tool, _ToolLike);

  var _super2 = _createSuper(Tool);

  function Tool(g, config, env) {
    var _this2;

    Tool_classCallCheck(this, Tool);

    _this2 = _super2.call(this, g, config, env); // We'll keep a flag set to false until
    // the user has started moving, so we can
    // fire the startSelection event

    Tool_defineProperty(_assertThisInitialized(_this2), "attachListeners", function (_ref) {
      var mouseMove = _ref.mouseMove,
          mouseUp = _ref.mouseUp,
          dblClick = _ref.dblClick;

      // Handle SVG conversion on behalf of tool implementations
      if (mouseMove) {
        _this2.mouseMove = function (evt) {
          var _this2$getSVGPoint = _this2.getSVGPoint(evt),
              x = _this2$getSVGPoint.x,
              y = _this2$getSVGPoint.y;

          if (!_this2.started) {
            _this2.emit('startSelection', {
              x: x,
              y: y
            });

            _this2.started = true;
          }

          mouseMove(x, y, evt);
        }; // Mouse move goes on SVG element


        _this2.svg.addEventListener('mousemove', _this2.mouseMove);
      }

      if (mouseUp) {
        _this2.mouseUp = function (evt) {
          if (evt.button !== 0) return; // left click

          var _this2$getSVGPoint2 = _this2.getSVGPoint(evt),
              x = _this2$getSVGPoint2.x,
              y = _this2$getSVGPoint2.y;

          mouseUp(x, y, evt);
        }; // Mouse up goes on doc, so we capture events outside, too


        document.addEventListener('mouseup', _this2.mouseUp);
      }

      if (dblClick) {
        _this2.dblClick = function (evt) {
          var _this2$getSVGPoint3 = _this2.getSVGPoint(evt),
              x = _this2$getSVGPoint3.x,
              y = _this2$getSVGPoint3.y;

          dblClick(x, y, evt);
        };

        document.addEventListener('dblclick', _this2.dblClick);
      }
    });

    Tool_defineProperty(_assertThisInitialized(_this2), "detachListeners", function () {
      if (_this2.mouseMove) _this2.svg.removeEventListener('mousemove', _this2.mouseMove);
      if (_this2.mouseUp) document.removeEventListener('mouseup', _this2.mouseUp);
      if (_this2.dblClick) document.removeEventListener('dblclick', _this2.dblClick);
    });

    Tool_defineProperty(_assertThisInitialized(_this2), "start", function (evt, startOnSingleClick) {
      // Handle SVG conversion on behalf of tool implementations
      var _this2$getSVGPoint4 = _this2.getSVGPoint(evt),
          x = _this2$getSVGPoint4.x,
          y = _this2$getSVGPoint4.y;

      _this2.startDrawing(x, y, startOnSingleClick, evt);
    });

    Tool_defineProperty(_assertThisInitialized(_this2), "startDrawing", function (evt) {
      throw new Error(IMPLEMENTATION_MISSING);
    });

    Tool_defineProperty(_assertThisInitialized(_this2), "createEditableShape", function (annotation, formatters) {
      throw new Error(IMPLEMENTATION_MISSING);
    });

    _this2.started = false;
    return _this2;
  }

  Tool_createClass(Tool, [{
    key: "isDrawing",
    get:
    /**
     * Tool implementations MUST override these
     */
    function get() {
      throw new Error(IMPLEMENTATION_MISSING);
    }
  }]);

  return Tool;
}(ToolLike); // In addition, Tool implementations need to implement the following static methods
// Tool.identifier = '...'




Tool.supports = function (annotation) {
  throw new Error(IMPLEMENTATION_MISSING);
}; // Just some convenience shortcuts to client-core, for quicker
// importing in plugins. (In a way, the intention is to make the
// Tool class serve as a kind of mini-SDK).




;// CONCATENATED MODULE: ./node_modules/@recogito/annotorious/src/tools/EditableShape.js
function EditableShape_typeof(obj) { "@babel/helpers - typeof"; return EditableShape_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, EditableShape_typeof(obj); }

function EditableShape_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EditableShape_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EditableShape_createClass(Constructor, protoProps, staticProps) { if (protoProps) EditableShape_defineProperties(Constructor.prototype, protoProps); if (staticProps) EditableShape_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function EditableShape_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) EditableShape_setPrototypeOf(subClass, superClass); }

function EditableShape_setPrototypeOf(o, p) { EditableShape_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return EditableShape_setPrototypeOf(o, p); }

function EditableShape_createSuper(Derived) { var hasNativeReflectConstruct = EditableShape_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = EditableShape_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = EditableShape_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return EditableShape_possibleConstructorReturn(this, result); }; }

function EditableShape_possibleConstructorReturn(self, call) { if (call && (EditableShape_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return EditableShape_assertThisInitialized(self); }

function EditableShape_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function EditableShape_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function EditableShape_getPrototypeOf(o) { EditableShape_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return EditableShape_getPrototypeOf(o); }

function EditableShape_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var EditableShape_IMPLEMENTATION_MISSING = "An implementation is missing";

var EditableShape = /*#__PURE__*/function (_ToolLike) {
  EditableShape_inherits(EditableShape, _ToolLike);

  var _super = EditableShape_createSuper(EditableShape);

  function EditableShape(annotation, g, config, env) {
    var _this;

    EditableShape_classCallCheck(this, EditableShape);

    _this = _super.call(this, g, config, env);

    EditableShape_defineProperty(EditableShape_assertThisInitialized(_this), "updateState", function (annotation) {
      throw new Error(EditableShape_IMPLEMENTATION_MISSING);
    });

    _this.annotation = annotation;
    return _this;
  }
  /**
   * Implementations MUST override this method!
   * 
   * Must return the 'g' element with the a9s-annotation class.
   */


  EditableShape_createClass(EditableShape, [{
    key: "element",
    get: function get() {
      throw new Error(EditableShape_IMPLEMENTATION_MISSING);
    }
    /**
     * Implementations MUST override this method!
     * 
     * The annotation argument MUST be used to update
     * the current state of the shape. It MUST NOT
     * be stored as 'this.annotation'! 'this.annotation'
     * MUST remain the original annotation at the time
     * this EditableShape was created, because we will
     * need it again in case the user cancels editing.
     * 
     * Thinking of it in React terms, 'this.annotation'
     * has the same purpose as props.annotation, whereas
     * this method affects state.
     */

  }]);

  return EditableShape;
}(ToolLike);


;// CONCATENATED MODULE: ./node_modules/@recogito/annotorious/src/selectors/RectFragment.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


/** 
 * Parses a W3C Web Annotation FragmentSelector conforming
 * to the Media Fragments spec. Supports (well-formed) xywh=pixel
 * and xywh=percent fragments. 
 */

var parseRectFragment = function parseRectFragment(annotation, image) {
  var selector = annotation.selector('FragmentSelector');

  if (selector !== null && selector !== void 0 && selector.conformsTo.startsWith('http://www.w3.org/TR/media-frags')) {
    var value = selector.value;
    var format = value.includes(':') ? value.substring(value.indexOf('=') + 1, value.indexOf(':')) : 'pixel';
    var coords = value.includes(':') ? value.substring(value.indexOf(':') + 1) : value.substring(value.indexOf('=') + 1);

    var _coords$split$map = coords.split(',').map(parseFloat),
        _coords$split$map2 = _slicedToArray(_coords$split$map, 4),
        x = _coords$split$map2[0],
        y = _coords$split$map2[1],
        w = _coords$split$map2[2],
        h = _coords$split$map2[3];

    if (format.toLowerCase() === 'percent') {
      x = x * image.naturalWidth / 100;
      y = y * image.naturalHeight / 100;
      w = w * image.naturalWidth / 100;
      h = h * image.naturalHeight / 100;
    }

    return {
      x: x,
      y: y,
      w: w,
      h: h
    };
  }
};
/** 
 * Serializes a (x, y, w, h)-tuple as Media Fragment selector
 * using pixel coordinates.
 */

var toPixelRectFragment = function toPixelRectFragment(x, y, w, h, image) {
  return {
    source: image === null || image === void 0 ? void 0 : image.src,
    selector: {
      type: "FragmentSelector",
      conformsTo: "http://www.w3.org/TR/media-frags/",
      value: "xywh=pixel:".concat(x, ",").concat(y, ",").concat(w, ",").concat(h)
    }
  };
};
/** 
 * Serializes a (x, y, w, h)-tuple as Media Fragment selector 
 * using percent coordinates.
 */


var toPercentRectFragment = function toPercentRectFragment(x, y, w, h, image) {
  var px = x / image.naturalWidth * 100;
  var py = y / image.naturalHeight * 100;
  var pw = w / image.naturalWidth * 100;
  var ph = h / image.naturalHeight * 100;
  return {
    source: image.src,
    selector: {
      type: "FragmentSelector",
      conformsTo: "http://www.w3.org/TR/media-frags/",
      value: "xywh=percent:".concat(px, ",").concat(py, ",").concat(pw, ",").concat(ph)
    }
  };
};

var toRectFragment = function toRectFragment(x, y, w, h, image, fragmentUnit) {
  return (fragmentUnit === null || fragmentUnit === void 0 ? void 0 : fragmentUnit.toLowerCase()) === 'percent' ? toPercentRectFragment(x, y, w, h, image) : toPixelRectFragment(x, y, w, h, image);
};
/** Shorthand to apply the given (x, y, w, h) to the SVG shape **/

var setXYWH = function setXYWH(shape, x, y, w, h) {
  shape.setAttribute('x', x);
  shape.setAttribute('y', y);
  shape.setAttribute('width', w);
  shape.setAttribute('height', h);
};

var setPointXY = function setPointXY(shape, x, y) {
  shape.setAttribute('cx', x);
  shape.setAttribute('cy', y);
  shape.setAttribute('r', 7); // TODO make configurable
};

var drawRectMask = function drawRectMask(imageDimensions, x, y, w, h) {
  var mask = document.createElementNS(SVG_NAMESPACE, 'path');
  mask.setAttribute('fill-rule', 'evenodd');
  var naturalWidth = imageDimensions.naturalWidth,
      naturalHeight = imageDimensions.naturalHeight;
  mask.setAttribute('d', "M0 0 h".concat(naturalWidth, " v").concat(naturalHeight, " h-").concat(naturalWidth, " z M").concat(x, " ").concat(y, " h").concat(w, " v").concat(h, " h-").concat(w, " z"));
  return mask;
};
var setRectMaskSize = function setRectMaskSize(mask, imageDimensions, x, y, w, h) {
  var naturalWidth = imageDimensions.naturalWidth,
      naturalHeight = imageDimensions.naturalHeight;
  mask.setAttribute('d', "M0 0 h".concat(naturalWidth, " v").concat(naturalHeight, " h-").concat(naturalWidth, " z M").concat(x, " ").concat(y, " h").concat(w, " v").concat(h, " h-").concat(w, " z"));
};
/** 
 * Draws an SVG rectangle, either from an annotation, or an
 * (x, y, w, h)-tuple.
 */

var drawRect = function drawRect(arg1, arg2, arg3, arg4) {
  var _ref = arg1.type === 'Annotation' || arg1.type === 'Selection' ? parseRectFragment(arg1, arg2) : {
    x: arg1,
    y: arg2,
    w: arg3,
    h: arg4
  },
      x = _ref.x,
      y = _ref.y,
      w = _ref.w,
      h = _ref.h;

  var g = document.createElementNS(SVG_NAMESPACE, 'g');

  if (w === 0 && h === 0) {
    // Edge case: rect is actually a point
    addClass(g, 'a9s-point');
    addClass(g, 'a9s-non-scaling');
    g.setAttribute('transform-origin', "".concat(x, " ").concat(y));
    var outerPoint = document.createElementNS(SVG_NAMESPACE, 'circle');
    var innerPoint = document.createElementNS(SVG_NAMESPACE, 'circle');
    innerPoint.setAttribute('class', 'a9s-inner');
    setPointXY(innerPoint, x, y);
    outerPoint.setAttribute('class', 'a9s-outer');
    setPointXY(outerPoint, x, y);
    g.appendChild(outerPoint);
    g.appendChild(innerPoint);
  } else {
    var outerRect = document.createElementNS(SVG_NAMESPACE, 'rect');
    var innerRect = document.createElementNS(SVG_NAMESPACE, 'rect');
    innerRect.setAttribute('class', 'a9s-inner');
    setXYWH(innerRect, x, y, w, h);
    outerRect.setAttribute('class', 'a9s-outer');
    setXYWH(outerRect, x, y, w, h);
    g.appendChild(outerRect);
    g.appendChild(innerRect);
  }

  return g;
};
/** Gets the (x, y, w, h)-values from the attributes of the SVG group **/

var getRectSize = function getRectSize(g) {
  var outer = g.querySelector('.a9s-outer');

  if (outer.nodeName === 'rect') {
    var x = parseFloat(outer.getAttribute('x'));
    var y = parseFloat(outer.getAttribute('y'));
    var w = parseFloat(outer.getAttribute('width'));
    var h = parseFloat(outer.getAttribute('height'));
    return {
      x: x,
      y: y,
      w: w,
      h: h
    };
  } else {
    var _x = parseFloat(outer.getAttribute('cx'));

    var _y = parseFloat(outer.getAttribute('cy'));

    return {
      x: _x,
      y: _y,
      w: 0,
      h: 0
    };
  }
};
/** Applies the (x, y, w, h)-values to the rects in the SVG group **/

var setRectSize = function setRectSize(g, x, y, w, h) {
  var inner = g.querySelector('.a9s-inner');
  var outer = g.querySelector('.a9s-outer');

  if (outer.nodeName === 'rect') {
    setXYWH(inner, x, y, w, h);
    setXYWH(outer, x, y, w, h);
  } else {
    setPointXY(inner, x, y);
    setPointXY(outer, x, y);
  }
};
/** 
 * Shorthand to get the area (rectangle w x h) from the 
 * annotation's fragment selector. 
 */

var rectArea = function rectArea(annotation, image) {
  var _parseRectFragment = parseRectFragment(annotation, image),
      w = _parseRectFragment.w,
      h = _parseRectFragment.h;

  return w * h;
};
;// CONCATENATED MODULE: ./src/point/Point.js
function Point_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function Point_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? Point_ownKeys(Object(source), !0).forEach(function (key) { Point_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : Point_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function Point_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var isPoint = function isPoint(annotation) {
  var _annotation$target$re;

  return ((_annotation$target$re = annotation.target.renderedVia) === null || _annotation$target$re === void 0 ? void 0 : _annotation$target$re.name) === 'point';
};
var toFragment = function toFragment(x, y, image, fragmentUnit) {
  return Point_objectSpread(Point_objectSpread({}, toRectFragment(x, y, 0, 0, image, fragmentUnit)), {}, {
    renderedVia: {
      name: 'point'
    }
  });
};
;// CONCATENATED MODULE: ./src/point/EditablePoint.js
function EditablePoint_typeof(obj) { "@babel/helpers - typeof"; return EditablePoint_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, EditablePoint_typeof(obj); }

function EditablePoint_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EditablePoint_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EditablePoint_createClass(Constructor, protoProps, staticProps) { if (protoProps) EditablePoint_defineProperties(Constructor.prototype, protoProps); if (staticProps) EditablePoint_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = EditablePoint_getPrototypeOf(object); if (object === null) break; } return object; }

function EditablePoint_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) EditablePoint_setPrototypeOf(subClass, superClass); }

function EditablePoint_setPrototypeOf(o, p) { EditablePoint_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return EditablePoint_setPrototypeOf(o, p); }

function EditablePoint_createSuper(Derived) { var hasNativeReflectConstruct = EditablePoint_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = EditablePoint_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = EditablePoint_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return EditablePoint_possibleConstructorReturn(this, result); }; }

function EditablePoint_possibleConstructorReturn(self, call) { if (call && (EditablePoint_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return EditablePoint_assertThisInitialized(self); }

function EditablePoint_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function EditablePoint_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function EditablePoint_getPrototypeOf(o) { EditablePoint_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return EditablePoint_getPrototypeOf(o); }

function EditablePoint_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var EditablePoint = /*#__PURE__*/function (_EditableShape) {
  EditablePoint_inherits(EditablePoint, _EditableShape);

  var _super = EditablePoint_createSuper(EditablePoint);

  function EditablePoint(_annotation, g, config, env) {
    var _this;

    EditablePoint_classCallCheck(this, EditablePoint);

    _this = _super.call(this, _annotation, g, config, env);

    EditablePoint_defineProperty(EditablePoint_assertThisInitialized(_this), "onScaleChanged", function () {
      return _this.scaleHandle(_this.point);
    });

    EditablePoint_defineProperty(EditablePoint_assertThisInitialized(_this), "onGrab", function () {
      _this.isGrabbed = true;
    });

    EditablePoint_defineProperty(EditablePoint_assertThisInitialized(_this), "onMouseMove", function (evt) {
      if (evt.button !== 0) return; // left click

      if (_this.isGrabbed) {
        var _this$getSVGPoint = _this.getSVGPoint(evt),
            x = _this$getSVGPoint.x,
            y = _this$getSVGPoint.y;

        _this.setHandleXY(_this.point, x, y);

        var target = toFragment(x, y, _this.env.image, _this.config.fragmentUnit);

        _this.emit('update', target);
      }
    });

    EditablePoint_defineProperty(EditablePoint_assertThisInitialized(_this), "onMouseUp", function () {
      _this.isGrabbed = false;
    });

    EditablePoint_defineProperty(EditablePoint_assertThisInitialized(_this), "updateState", function (annotation) {
      var _parseRectFragment = parseRectFragment(annotation, _this.env.image),
          x = _parseRectFragment.x,
          y = _parseRectFragment.y;

      _this.setHandleXY(_this.point, x, y);
    });

    _this.svg.addEventListener('mousemove', _this.onMouseMove);

    _this.svg.addEventListener('mouseup', _this.onMouseUp);

    var _parseRectFragment2 = parseRectFragment(_annotation, env.image),
        _x = _parseRectFragment2.x,
        _y = _parseRectFragment2.y;

    _this.container = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    _this.elementGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');

    _this.elementGroup.setAttribute('class', 'a9s-annotation editable selected');

    _this.point = _this.drawHandle(_x, _y);

    _this.point.addEventListener('mousedown', _this.onGrab);

    _this.elementGroup.appendChild(_this.point);

    _this.container.appendChild(_this.elementGroup);

    g.appendChild(_this.container); // true if te mouse has grabbed the point

    _this.isGrabbed = false;
    return _this;
  }

  EditablePoint_createClass(EditablePoint, [{
    key: "element",
    get: function get() {
      return this.elementGroup;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.svg.removeEventListener('mousemove', this.onMouseMove);
      this.svg.removeEventListener('mouseup', this.onMouseUp);
      this.container.parentNode.removeChild(this.container);

      _get(EditablePoint_getPrototypeOf(EditablePoint.prototype), "destroy", this).call(this);
    }
  }]);

  return EditablePoint;
}(EditableShape);


;// CONCATENATED MODULE: ./src/point/PointTool.js
function PointTool_typeof(obj) { "@babel/helpers - typeof"; return PointTool_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, PointTool_typeof(obj); }

function PointTool_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PointTool_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function PointTool_createClass(Constructor, protoProps, staticProps) { if (protoProps) PointTool_defineProperties(Constructor.prototype, protoProps); if (staticProps) PointTool_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function PointTool_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) PointTool_setPrototypeOf(subClass, superClass); }

function PointTool_setPrototypeOf(o, p) { PointTool_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return PointTool_setPrototypeOf(o, p); }

function PointTool_createSuper(Derived) { var hasNativeReflectConstruct = PointTool_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = PointTool_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = PointTool_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return PointTool_possibleConstructorReturn(this, result); }; }

function PointTool_possibleConstructorReturn(self, call) { if (call && (PointTool_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return PointTool_assertThisInitialized(self); }

function PointTool_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function PointTool_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function PointTool_getPrototypeOf(o) { PointTool_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return PointTool_getPrototypeOf(o); }

function PointTool_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var PointTool = /*#__PURE__*/function (_Tool) {
  PointTool_inherits(PointTool, _Tool);

  var _super = PointTool_createSuper(PointTool);

  function PointTool(g, config, env) {
    var _this;

    PointTool_classCallCheck(this, PointTool);

    _this = _super.call(this, g, config, env);

    PointTool_defineProperty(PointTool_assertThisInitialized(_this), "startDrawing", function (x, y, _, evt) {
      var _evt$target$closest;

      // The top-most existing annotation at this position (if any) 
      var annotation = (_evt$target$closest = evt.target.closest('.a9s-annotation')) === null || _evt$target$closest === void 0 ? void 0 : _evt$target$closest.annotation; // The point drawing tool will ALWAYS create a point annotation,
      // regardless of whether there's already an annotation underneath.
      // UNLESS the annotation underneath is itself a point!

      if (!annotation || !isPoint(annotation)) {
        var element = _this.drawHandle(x, y);

        _this.scaleHandle(element);

        _this.g.appendChild(element);

        element.annotation = new Selection(toFragment(x, y, _this.env.image, _this.config.fragmentUnit));

        _this.emit('complete', element);
      } else {
        _this.emit('cancel');
      }
    });

    PointTool_defineProperty(PointTool_assertThisInitialized(_this), "stop", function () {// Nothing to do
    });

    PointTool_defineProperty(PointTool_assertThisInitialized(_this), "createEditableShape", function (annotation) {
      return new EditablePoint(annotation, _this.g, _this.config, _this.env);
    });

    return _this;
  }

  PointTool_createClass(PointTool, [{
    key: "isDrawing",
    get: function get() {
      // Point selection is an instant action - the
      // tool is never an 'drawing' state
      return false;
    }
  }]);

  return PointTool;
}(Tool);


PointTool.identifier = 'point';

PointTool.supports = function (annotation) {
  // Not needed, since the target.renderedVia property will be evaluated first
  return false;
};
;// CONCATENATED MODULE: ./node_modules/@recogito/annotorious/src/selectors/EmbeddedSVG.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = EmbeddedSVG_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function EmbeddedSVG_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return EmbeddedSVG_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return EmbeddedSVG_arrayLikeToArray(o, minLen); }

function EmbeddedSVG_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



/** Helper that forces an un-namespaced node to SVG **/

var insertSVGNamespace = function insertSVGNamespace(originalDoc) {
  // Serialize and parse for the namespace to take effect on every node
  var serializer = new XMLSerializer();
  var str = serializer.serializeToString(originalDoc.documentElement); // Doesn't seem that there's a clean cross-browser way for this...

  var namespaced = str.replace('<svg>', "<svg xmlns=\"".concat(SVG_SVG_NAMESPACE, "\">"));
  var parser = new DOMParser();
  var namespacedDoc = parser.parseFromString(namespaced, "image/svg+xml");
  return namespacedDoc.documentElement;
};

var sanitize = function sanitize(doc) {
  // Cf. https://github.com/mattkrick/sanitize-svg#readme  
  // for the basic approach
  var cleanEl = function cleanEl(el) {
    Array.from(el.attributes).forEach(function (attr) {
      if (attr.name.startsWith('on')) el.removeAttribute(attr.name);
    });
  }; // Remove script tags


  var scripts = doc.getElementsByTagName('script');
  Array.from(scripts).reverse().forEach(function (el) {
    return el.parentNode.removeChild(el);
  }); // Remove on... attributes

  cleanEl(doc);
  Array.from(doc.querySelectorAll('*')).forEach(cleanEl);
  return doc;
};

var svgFragmentToShape = function svgFragmentToShape(annotation) {
  var selector = annotation.selector('SvgSelector');

  if (selector) {
    var parser = new DOMParser(); // Parse the XML document, assuming SVG

    var value = selector.value;
    var doc = parser.parseFromString(value, "image/svg+xml"); // SVG needs a namespace declaration - check if it's set or insert if not

    var isPrefixDeclared = doc.lookupPrefix(SVG_SVG_NAMESPACE); // SVG declared via prefix

    var isDefaultNamespaceSVG = doc.lookupNamespaceURI(null); // SVG declared as default namespace

    if (isPrefixDeclared || isDefaultNamespaceSVG) {
      return sanitize(doc).firstChild;
    } else {
      return sanitize(insertSVGNamespace(doc)).firstChild;
    }
  }
};
var drawEmbeddedSVG = function drawEmbeddedSVG(annotation) {
  var shape = svgFragmentToShape(annotation); // Because we're nitpicky, we don't just draw the shape,
  // but duplicate it, so we can have inner and an outer lines

  var g = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
  var inner = shape.cloneNode(true);
  inner.setAttribute('class', 'a9s-inner');
  var outer = shape.cloneNode(true);
  outer.setAttribute('class', 'a9s-outer');
  g.appendChild(outer);
  g.appendChild(inner);
  return g;
};
var toSVGTarget = function toSVGTarget(shape, image) {
  var inner = shape.querySelector('.a9s-inner').cloneNode(true);
  inner.removeAttribute('class');
  inner.removeAttribute('xmlns');
  var serialized = inner.outerHTML || new XMLSerializer().serializeToString(inner);
  serialized = serialized.replace(" xmlns=\"".concat(SVG_SVG_NAMESPACE, "\""), '');
  return {
    source: image === null || image === void 0 ? void 0 : image.src,
    selector: {
      type: "SvgSelector",
      value: "<svg>".concat(serialized, "</svg>")
    }
  };
};
var svgArea = function svgArea(annotation) {
  var shape = svgFragmentToShape(annotation);
  var nodeName = shape.nodeName.toLowerCase();
  if (nodeName === 'polygon') return svgPolygonArea(shape);else if (nodeName === 'circle') return svgCircleArea(shape);else if (nodeName === 'ellipse') return svgEllipseArea(shape);else if (nodeName == 'path') return svgPathArea(shape);else if (nodeName == 'line') return 0;else throw "Unsupported SVG shape type: ".concat(nodeName);
};

var svgPolygonArea = function svgPolygonArea(polygon) {
  var points = polygon.getAttribute('points').trim().split(' ') // Split x/y tuples
  .map(function (xy) {
    return xy.split(',').map(function (str) {
      return parseFloat(str.trim());
    });
  });
  return polygonArea(points);
};

var svgCircleArea = function svgCircleArea(circle) {
  var r = circle.getAttribute('r');
  return r * r * Math.PI;
};

var svgEllipseArea = function svgEllipseArea(ellipse) {
  var rx = ellipse.getAttribute('rx');
  var ry = ellipse.getAttribute('ry');
  return rx * ry * Math.PI;
};

var svgPathArea = function svgPathArea(path) {
  var polygons = svgPathToPolygons(path);

  if (polygons.length == 1) {
    return polygonArea(polygons[0]);
  } else {
    // Helper to check if a polygon is a hole
    var isHole = function isHole(p) {
      return polygons.find(function (other) {
        if (p !== other) return polygonInPolygon(p, other);
      });
    };

    var area = 0;

    var _iterator = _createForOfIteratorHelper(polygons),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var poly = _step.value;
        if (isHole(poly)) area -= polygonArea(poly);else area += polygonArea(poly);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return area;
  }
};
;// CONCATENATED MODULE: ./src/circle/Circle.js

/** Shorthand to apply the given (x, y, r) to the SVG shape **/

var setXYR = function setXYR(shape, x, y, r) {
  shape.setAttribute('cx', x);
  shape.setAttribute('cy', y);
  shape.setAttribute('r', r);
};
/** 
 * Draws an SVG circle, either from an annotation, or an
 * (cx, cy, r)-tuple.
 */


var drawCircle = function drawCircle(cx, cy, r) {
  var g = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
  var outerCircle = document.createElementNS(SVG_SVG_NAMESPACE, 'circle');
  var innerCircle = document.createElementNS(SVG_SVG_NAMESPACE, 'circle');
  innerCircle.setAttribute('class', 'a9s-inner');
  setXYR(innerCircle, cx, cy, r);
  outerCircle.setAttribute('class', 'a9s-outer');
  setXYR(outerCircle, cx, cy, r);
  g.appendChild(outerCircle);
  g.appendChild(innerCircle);
  return g;
};
var setCircleSize = function setCircleSize(g, cx, cy, r) {
  var innerCircle = g.querySelector('.a9s-inner');
  var outerCircle = g.querySelector('.a9s-outer');
  setXYR(innerCircle, cx, cy, r);
  setXYR(outerCircle, cx, cy, r);
};
var getCircleSize = function getCircleSize(g) {
  var outerCircle = g.querySelector('.a9s-outer');
  var cx = parseFloat(outerCircle.getAttribute('cx'));
  var cy = parseFloat(outerCircle.getAttribute('cy'));
  var r = parseFloat(outerCircle.getAttribute('r'));
  return {
    cx: cx,
    cy: cy,
    r: r
  };
};
;// CONCATENATED MODULE: ./src/circle/CircleMask.js
function CircleMask_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CircleMask_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CircleMask_createClass(Constructor, protoProps, staticProps) { if (protoProps) CircleMask_defineProperties(Constructor.prototype, protoProps); if (staticProps) CircleMask_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function CircleMask_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var CircleMask = /*#__PURE__*/function () {
  function CircleMask(imageDimensions, circle) {
    var _this = this;

    CircleMask_classCallCheck(this, CircleMask);

    CircleMask_defineProperty(this, "redraw", function () {
      var _getCircleSize = getCircleSize(_this.circle),
          cx = _getCircleSize.cx,
          cy = _getCircleSize.cy,
          r = _getCircleSize.r;

      var tx = cx + r > _this.w ? _this.w - r : cx;
      var ty = cy + r > _this.h ? _this.h - r : cy + r;

      _this.mask.setAttribute('d', "M0 0 h".concat(_this.w, " v").concat(_this.h, " h-").concat(_this.w, " z M").concat(tx, " ").concat(ty, " a ").concat(r, " ").concat(r, " 0 1 1 1 0"));
    });

    CircleMask_defineProperty(this, "destroy", function () {
      return _this.mask.parentNode.removeChild(_this.mask);
    });

    this.w = imageDimensions.naturalWidth;
    this.h = imageDimensions.naturalHeight;
    this.circle = circle;

    var _getCircleSize2 = getCircleSize(this.circle),
        _cx = _getCircleSize2.cx,
        _cy = _getCircleSize2.cy,
        _r = _getCircleSize2.r;

    var _tx = _cx + _r > this.w ? this.w - _r : _cx;

    var _ty = _cy + _r > this.h ? this.h - _r : _cy + _r;

    this.mask = document.createElementNS(SVG_SVG_NAMESPACE, 'path');
    this.mask.setAttribute('fill-rule', 'evenodd');
    this.mask.setAttribute('class', 'a9s-selection-mask');
    this.mask.setAttribute('d', "M0 0 h".concat(this.w, " v").concat(this.h, " h-").concat(this.w, " z M").concat(_tx, " ").concat(_ty, " a ").concat(_r, " ").concat(_r, " 0 1 1 1 0"));
  }

  CircleMask_createClass(CircleMask, [{
    key: "element",
    get: function get() {
      return this.mask;
    }
  }]);

  return CircleMask;
}();


;// CONCATENATED MODULE: ./src/circle/RubberbandCircle.js
function RubberbandCircle_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RubberbandCircle_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RubberbandCircle_createClass(Constructor, protoProps, staticProps) { if (protoProps) RubberbandCircle_defineProperties(Constructor.prototype, protoProps); if (staticProps) RubberbandCircle_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function RubberbandCircle_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/**
 * A 'rubberband' selection tool for creating a circle by
 * clicking and dragging.
 */

var RubberbandCircle = /*#__PURE__*/function () {
  function RubberbandCircle(anchorX, anchorY, g, env) {
    var _this = this;

    RubberbandCircle_classCallCheck(this, RubberbandCircle);

    RubberbandCircle_defineProperty(this, "dragTo", function (oppositeX, oppositeY) {
      var _this$env$image = _this.env.image,
          naturalWidth = _this$env$image.naturalWidth,
          naturalHeight = _this$env$image.naturalHeight; // Make visible

      _this.group.style.display = null;
      var w = oppositeX - _this.anchor[0];
      var h = oppositeY - _this.anchor[1];
      var r = Math.max(1, Math.pow(Math.pow(w, 2) + Math.pow(h, 2), 0.5) / 2);
      var cx = _this.anchor[0] + w / 2;
      var cy = _this.anchor[1] + h / 2;
      if (cx - r < 0 || cx + r > naturalWidth || cy - r < 0 || cy + r > naturalHeight) return;
      setCircleSize(_this.circle, cx, cy, r);

      _this.mask.redraw();
    });

    RubberbandCircle_defineProperty(this, "getBoundingClientRect", function () {
      return _this.circle.getBoundingClientRect();
    });

    RubberbandCircle_defineProperty(this, "toSelection", function () {
      return new Selection(toSVGTarget(_this.group, _this.env.image));
    });

    RubberbandCircle_defineProperty(this, "destroy", function () {
      _this.group.parentNode.removeChild(_this.group);

      _this.mask = null;
      _this.circle = null;
      _this.group = null;
    });

    this.anchor = [anchorX, anchorY];
    this.env = env;
    this.group = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    this.circle = drawCircle(anchorX, anchorY, 2);
    this.circle.setAttribute('class', 'a9s-selection');
    this.mask = new CircleMask(env.image, this.circle); // We make the selection transparent to 
    // pointer events because it would interfere with the 
    // rendered annotations' mouseleave/enter events

    this.group.style.pointerEvents = 'none'; // Additionally, selection remains hidden until 
    // the user actually moves the mouse

    this.group.style.display = 'none';
    this.group.appendChild(this.mask.element);
    this.group.appendChild(this.circle);
    g.appendChild(this.group);
  }

  RubberbandCircle_createClass(RubberbandCircle, [{
    key: "element",
    get: function get() {
      return this.circle;
    }
  }]);

  return RubberbandCircle;
}();


;// CONCATENATED MODULE: ./node_modules/@recogito/annotorious/src/util/Formatting.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || Formatting_unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function Formatting_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return Formatting_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Formatting_arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return Formatting_arrayLikeToArray(arr); }

function Formatting_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


var isFirefox = /firefox/i.test(navigator.userAgent);

var formatSvgEl = function formatSvgEl(svgEl, x, y, w, h) {
  svgEl.setAttribute('width', w);
  svgEl.setAttribute('height', h); // Argh - Firefox produces broken SVG bounds for nested SVG

  if (isFirefox) {
    svgEl.setAttribute('x', 0);
    svgEl.setAttribute('y', 0);
    svgEl.setAttribute('transform', "translate(".concat(x, ", ").concat(y, ")"));
  } else {
    svgEl.setAttribute('x', x);
    svgEl.setAttribute('y', y);
  }
};

var appendFormatterEl = function appendFormatterEl(formatterEl, shape) {
  var _shape$getBBox = shape.getBBox(),
      x = _shape$getBBox.x,
      y = _shape$getBBox.y,
      width = _shape$getBBox.width,
      height = _shape$getBBox.height;

  var svgEl = document.createElementNS(SVG_SVG_NAMESPACE, 'svg');
  svgEl.setAttribute('class', 'a9s-formatter-el');
  formatSvgEl(svgEl, x, y, width, height);
  var g = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
  g.appendChild(formatterEl);
  y;
  svgEl.appendChild(g);
  shape.append(svgEl);
};
/**
 * A formatter is a user-defined function that takes an annotation as input,
 * and returns either a string, or an object. If a string is returned, this
 * will be appended to the annotation element CSS class list. Otherwise, the
 * object can have the following properties: 
 * 
 * - 'className' added to the CSS class list
 * - 'data-*' added as data attributes
 * - 'style' a list of CSS styles (in the form of a string) 
 */


var format = function format(shape, annotation, formatters) {
  // The formatter can be undefined
  if (!formatters) return shape; // Merge outputs from all formatter functions into one object

  var format = formatters.reduce(function (merged, fn) {
    var format = fn(annotation);
    if (!format) return merged;

    if (typeof format === 'string' || format instanceof String) {
      merged.className = merged.className ? "".concat(merged.className, " ").concat(format) : format;
    } else if (format.nodeType === Node.ELEMENT_NODE) {
      merged.elements = merged.elements ? [].concat(_toConsumableArray(merged.elements), [format]) : [format];
    } else {
      var _className = format.className,
          _style = format.style,
          element = format.element;
      if (_className) merged.className = merged.className ? "".concat(merged.className, " ").concat(_className) : _className;
      if (_style) merged.style = merged.style ? "".concat(merged.style, " ").concat(_style) : _style;
      if (element) merged.elements = merged.elements ? [].concat(_toConsumableArray(merged.elements), [element]) : [element];
    } // Copy data attributes


    for (var key in format) {
      if (format.hasOwnProperty(key) && key.startsWith('data-')) {
        merged[key] = format[key];
      }
    }

    return merged;
  }, {});
  var className = format.className,
      style = format.style,
      elements = format.elements;
  if (className) SVG_addClass(shape, className);

  if (style) {
    var outer = shape.querySelector('.a9s-outer');
    var inner = shape.querySelector('.a9s-inner');

    if (outer && inner) {
      outer.setAttribute('style', 'display:none');
      inner.setAttribute('style', style);
    } else {
      shape.setAttribute('style', style);
    }
  }

  if (elements) elements.forEach(function (el) {
    return appendFormatterEl(el, shape);
  });

  for (var key in format) {
    if (format.hasOwnProperty(key) && key.startsWith('data-')) {
      shape.setAttribute(key, format[key]);
    }
  }
};
var setFormatterElSize = function setFormatterElSize(group, x, y, w, h) {
  var formatterEl = group.querySelector('.a9s-formatter-el');
  if (formatterEl) formatSvgEl(formatterEl, x, y, w, h);
};
;// CONCATENATED MODULE: ./src/circle/EditableCircle.js
function EditableCircle_typeof(obj) { "@babel/helpers - typeof"; return EditableCircle_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, EditableCircle_typeof(obj); }

function EditableCircle_slicedToArray(arr, i) { return EditableCircle_arrayWithHoles(arr) || EditableCircle_iterableToArrayLimit(arr, i) || EditableCircle_unsupportedIterableToArray(arr, i) || EditableCircle_nonIterableRest(); }

function EditableCircle_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function EditableCircle_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return EditableCircle_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return EditableCircle_arrayLikeToArray(o, minLen); }

function EditableCircle_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function EditableCircle_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function EditableCircle_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function EditableCircle_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EditableCircle_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EditableCircle_createClass(Constructor, protoProps, staticProps) { if (protoProps) EditableCircle_defineProperties(Constructor.prototype, protoProps); if (staticProps) EditableCircle_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function EditableCircle_get() { if (typeof Reflect !== "undefined" && Reflect.get) { EditableCircle_get = Reflect.get.bind(); } else { EditableCircle_get = function _get(target, property, receiver) { var base = EditableCircle_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return EditableCircle_get.apply(this, arguments); }

function EditableCircle_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = EditableCircle_getPrototypeOf(object); if (object === null) break; } return object; }

function EditableCircle_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) EditableCircle_setPrototypeOf(subClass, superClass); }

function EditableCircle_setPrototypeOf(o, p) { EditableCircle_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return EditableCircle_setPrototypeOf(o, p); }

function EditableCircle_createSuper(Derived) { var hasNativeReflectConstruct = EditableCircle_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = EditableCircle_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = EditableCircle_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return EditableCircle_possibleConstructorReturn(this, result); }; }

function EditableCircle_possibleConstructorReturn(self, call) { if (call && (EditableCircle_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return EditableCircle_assertThisInitialized(self); }

function EditableCircle_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function EditableCircle_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function EditableCircle_getPrototypeOf(o) { EditableCircle_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return EditableCircle_getPrototypeOf(o); }

function EditableCircle_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







/**
 * An editable circle shape.
 */

var EditableCircle = /*#__PURE__*/function (_EditableShape) {
  EditableCircle_inherits(EditableCircle, _EditableShape);

  var _super = EditableCircle_createSuper(EditableCircle);

  function EditableCircle(_annotation, g, config, env) {
    var _this;

    EditableCircle_classCallCheck(this, EditableCircle);

    _this = _super.call(this, _annotation, g, config, env);

    EditableCircle_defineProperty(EditableCircle_assertThisInitialized(_this), "setSize", function (cx, cy, r) {
      setCircleSize(_this.circle, cx, cy, r);

      _this.mask.redraw();

      setFormatterElSize(_this.elementGroup, cx, cy, r, r);

      var _this$handles = EditableCircle_slicedToArray(_this.handles, 4),
          topleft = _this$handles[0],
          topright = _this$handles[1],
          bottomright = _this$handles[2],
          bottomleft = _this$handles[3];

      _this.setHandleXY(topleft, cx, cy - r);

      _this.setHandleXY(topright, cx + r, cy);

      _this.setHandleXY(bottomright, cx, cy + r);

      _this.setHandleXY(bottomleft, cx - r, cy);
    });

    EditableCircle_defineProperty(EditableCircle_assertThisInitialized(_this), "stretchCorners", function (draggedHandleIdx, anchorHandle, mousePos) {
      var anchor = _this.getHandleXY(anchorHandle);

      var mouseX = mousePos.x;
      var mouseY = mousePos.y;
      var width = 0;
      var height = 0;
      var r;

      if (draggedHandleIdx == 0 || draggedHandleIdx == 2) {
        mouseX = anchor.x;
        height = mouseY - anchor.y;
        r = Math.abs(height) / 2;
      } else {
        mouseY = anchor.y;
        width = mouseX - anchor.x;
        r = Math.abs(width) / 2;
      }

      var x = width > 0 ? anchor.x : mouseX;
      var y = height > 0 ? anchor.y : mouseY;
      var w = Math.abs(width);
      var h = Math.abs(height);
      var cx = x + w / 2;
      var cy = y + h / 2;
      setCircleSize(_this.circle, cx, cy, r);

      _this.mask.redraw();

      setFormatterElSize(_this.elementGroup, cx, cy, r, r);

      if (draggedHandleIdx == 0 || draggedHandleIdx == 2) {
        var idx0 = 0;
        var idx2 = 2;

        if (draggedHandleIdx == 0 && height > 0 || draggedHandleIdx == 2 && height < 0) {
          idx0 = 2;
          idx2 = 0;
        }

        _this.setHandleXY(_this.handles[idx0], cx, cy - r);

        _this.setHandleXY(_this.handles[idx2], cx, cy + r);

        _this.setHandleXY(_this.handles[1], cx + r, cy);

        _this.setHandleXY(_this.handles[3], cx - r, cy);
      } else {
        var idx3 = 3;
        var idx1 = 1;

        if (draggedHandleIdx == 1 && width > 0 || draggedHandleIdx == 3 && width < 0) {
          idx3 = 1;
          idx1 = 3;
        }

        _this.setHandleXY(_this.handles[idx3], cx + r, cy);

        _this.setHandleXY(_this.handles[idx1], cx - r, cy);

        _this.setHandleXY(_this.handles[0], cx, cy - r);

        _this.setHandleXY(_this.handles[2], cx, cy + r);
      }
    });

    EditableCircle_defineProperty(EditableCircle_assertThisInitialized(_this), "onGrab", function (grabbedElem) {
      return function (evt) {
        _this.grabbedElem = grabbedElem;

        var pos = _this.getSVGPoint(evt);

        var _getCircleSize = getCircleSize(_this.circle),
            cx = _getCircleSize.cx,
            cy = _getCircleSize.cy;

        _this.grabbedAt = {
          x: pos.x - cx,
          y: pos.y - cy
        };
      };
    });

    EditableCircle_defineProperty(EditableCircle_assertThisInitialized(_this), "onMouseMove", function (evt) {
      var constrain = function constrain(coord, max) {
        return coord < 0 ? 0 : coord > max ? max : coord;
      };

      if (_this.grabbedElem) {
        var pos = _this.getSVGPoint(evt);

        if (_this.grabbedElem === _this.circle) {
          var _getCircleSize2 = getCircleSize(_this.circle),
              r = _getCircleSize2.r;

          var _this$env$image = _this.env.image,
              naturalWidth = _this$env$image.naturalWidth,
              naturalHeight = _this$env$image.naturalHeight;
          var cx = Math.max(constrain(pos.x - _this.grabbedAt.x, naturalWidth - r), r);
          var cy = Math.max(constrain(pos.y - _this.grabbedAt.y, naturalHeight - r), r);

          _this.setSize(cx, cy, r);

          _this.emit('update', toSVGTarget(_this.circle, _this.env.image));
        } else {
          // Mouse position replaces one of the corner coords, depending
          // on which handle is the grabbed element
          var handleIdx = _this.handles.indexOf(_this.grabbedElem);

          var oppositeHandle = handleIdx < 2 ? _this.handles[handleIdx + 2] : _this.handles[handleIdx - 2];

          _this.stretchCorners(handleIdx, oppositeHandle, pos);

          _this.emit('update', toSVGTarget(_this.circle, _this.env.image));
        }
      }
    });

    EditableCircle_defineProperty(EditableCircle_assertThisInitialized(_this), "onMouseUp", function () {
      _this.grabbedElem = null;
      _this.grabbedAt = null;
    });

    EditableCircle_defineProperty(EditableCircle_assertThisInitialized(_this), "onScaleChanged", function (scale) {
      return _this.handles.map(_this.scaleHandle);
    });

    EditableCircle_defineProperty(EditableCircle_assertThisInitialized(_this), "updateState", function (annotation) {
      var shape = svgFragmentToShape(annotation);
      var cx = parseFloat(shape.getAttribute('cx'));
      var cy = parseFloat(shape.getAttribute('cy'));
      var r = parseFloat(shape.getAttribute('r'));

      _this.setSize(cx, cy, r);
    });

    _this.svg.addEventListener('mousemove', _this.onMouseMove);

    _this.svg.addEventListener('mouseup', _this.onMouseUp); // SVG markup for this class looks like this:
    // 
    // <g>
    //   <path class="a9s-selection mask"... />
    //   <g> <-- return this node as .element
    //     <circle class="a9s-outer" ... />
    //     <circle class="a9s-inner" ... />
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //   </g> 
    // </g>
    // 'g' for the editable circle compound shape


    _this.containerGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    _this.circle = drawEmbeddedSVG(_annotation);

    _this.circle.querySelector('.a9s-inner').addEventListener('mousedown', _this.onGrab(_this.circle));

    _this.mask = new CircleMask(env.image, _this.circle);

    _this.containerGroup.appendChild(_this.mask.element); // The 'element' = circle + handles


    _this.elementGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');

    _this.elementGroup.setAttribute('class', 'a9s-annotation editable selected');

    _this.elementGroup.appendChild(_this.circle);

    var _getCircleSize3 = getCircleSize(_this.circle),
        _cx = _getCircleSize3.cx,
        _cy = _getCircleSize3.cy,
        _r = _getCircleSize3.r;

    _this.handles = [[_cx, _cy - _r], [_cx + _r, _cy], [_cx, _cy + _r], [_cx - _r, _cy]].map(function (t) {
      var _t = EditableCircle_slicedToArray(t, 2),
          x = _t[0],
          y = _t[1];

      var handle = _this.drawHandle(x, y);

      handle.addEventListener('mousedown', _this.onGrab(handle));

      _this.elementGroup.appendChild(handle);

      return handle;
    });

    _this.containerGroup.appendChild(_this.elementGroup);

    g.appendChild(_this.containerGroup);
    format(_this.circle, _annotation, config.formatter); // The grabbed element (handle or entire group), if any

    _this.grabbedElem = null; // Mouse xy offset inside the shape, if mouse pressed

    _this.grabbedAt = null;
    return _this;
  }

  EditableCircle_createClass(EditableCircle, [{
    key: "element",
    get: function get() {
      return this.elementGroup;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.containerGroup.parentNode.removeChild(this.containerGroup);

      EditableCircle_get(EditableCircle_getPrototypeOf(EditableCircle.prototype), "destroy", this).call(this);
    }
  }]);

  return EditableCircle;
}(EditableShape);


;// CONCATENATED MODULE: ./src/circle/RubberbandCircleTool.js
function RubberbandCircleTool_typeof(obj) { "@babel/helpers - typeof"; return RubberbandCircleTool_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, RubberbandCircleTool_typeof(obj); }

function RubberbandCircleTool_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RubberbandCircleTool_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RubberbandCircleTool_createClass(Constructor, protoProps, staticProps) { if (protoProps) RubberbandCircleTool_defineProperties(Constructor.prototype, protoProps); if (staticProps) RubberbandCircleTool_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function RubberbandCircleTool_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) RubberbandCircleTool_setPrototypeOf(subClass, superClass); }

function RubberbandCircleTool_setPrototypeOf(o, p) { RubberbandCircleTool_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return RubberbandCircleTool_setPrototypeOf(o, p); }

function RubberbandCircleTool_createSuper(Derived) { var hasNativeReflectConstruct = RubberbandCircleTool_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = RubberbandCircleTool_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = RubberbandCircleTool_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return RubberbandCircleTool_possibleConstructorReturn(this, result); }; }

function RubberbandCircleTool_possibleConstructorReturn(self, call) { if (call && (RubberbandCircleTool_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return RubberbandCircleTool_assertThisInitialized(self); }

function RubberbandCircleTool_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function RubberbandCircleTool_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function RubberbandCircleTool_getPrototypeOf(o) { RubberbandCircleTool_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return RubberbandCircleTool_getPrototypeOf(o); }

function RubberbandCircleTool_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * A rubberband selector for circle selections.
 */

var RubberbandCircleTool = /*#__PURE__*/function (_Tool) {
  RubberbandCircleTool_inherits(RubberbandCircleTool, _Tool);

  var _super = RubberbandCircleTool_createSuper(RubberbandCircleTool);

  function RubberbandCircleTool(g, config, env) {
    var _this;

    RubberbandCircleTool_classCallCheck(this, RubberbandCircleTool);

    _this = _super.call(this, g, config, env);

    RubberbandCircleTool_defineProperty(RubberbandCircleTool_assertThisInitialized(_this), "startDrawing", function (x, y) {
      _this.attachListeners({
        mouseMove: _this.onMouseMove,
        mouseUp: _this.onMouseUp
      });

      _this.rubberband = new RubberbandCircle(x, y, _this.g, _this.env);
    });

    RubberbandCircleTool_defineProperty(RubberbandCircleTool_assertThisInitialized(_this), "stop", function () {
      if (_this.rubberband) {
        _this.rubberband.destroy();

        _this.rubberband = null;
      }
    });

    RubberbandCircleTool_defineProperty(RubberbandCircleTool_assertThisInitialized(_this), "onMouseMove", function (x, y) {
      return _this.rubberband.dragTo(x, y);
    });

    RubberbandCircleTool_defineProperty(RubberbandCircleTool_assertThisInitialized(_this), "onMouseUp", function () {
      _this.detachListeners();

      _this.started = false;

      var _this$rubberband$getB = _this.rubberband.getBoundingClientRect(),
          width = _this$rubberband$getB.width,
          height = _this$rubberband$getB.height;

      var minWidth = _this.config.minSelectionWidth || 4;
      var minHeight = _this.config.minSelectionHeight || 4;

      if (width >= minWidth && height >= minHeight) {
        // Emit the SVG shape with selection attached    
        var element = _this.rubberband.element;
        element.annotation = _this.rubberband.toSelection(); // Emit the completed shape...

        _this.emit('complete', element);
      } else {
        _this.emit('cancel');
      }

      _this.stop();
    });

    RubberbandCircleTool_defineProperty(RubberbandCircleTool_assertThisInitialized(_this), "createEditableShape", function (annotation) {
      return new EditableCircle(annotation, _this.g, _this.config, _this.env);
    });

    _this.rubberband = null;
    return _this;
  }

  RubberbandCircleTool_createClass(RubberbandCircleTool, [{
    key: "isDrawing",
    get: function get() {
      return this.rubberband != null;
    }
  }]);

  return RubberbandCircleTool;
}(Tool);


RubberbandCircleTool.identifier = 'circle';

RubberbandCircleTool.supports = function (annotation) {
  var _selector$value;

  var selector = annotation.selector('SvgSelector');
  if (selector) return (_selector$value = selector.value) === null || _selector$value === void 0 ? void 0 : _selector$value.match(/^<svg.*<circle/g);
};
;// CONCATENATED MODULE: ./src/ellipse/Ellipse.js

/** Shorthand to apply the given (x, y, rx, ry) to the SVG shape **/

var Ellipse_setXYR = function setXYR(shape, x, y, rx, ry) {
  shape.setAttribute('cx', x);
  shape.setAttribute('cy', y);
  shape.setAttribute('rx', rx);
  shape.setAttribute('ry', ry);
};
/** 
 * Draws an SVG ellipse, either from an annotation, or an
 * (cx, cy, rx, ry)-tuple.
 */


var drawEllipse = function drawEllipse(cx, cy, rx, ry) {
  var g = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
  var innerEllipse = document.createElementNS(SVG_SVG_NAMESPACE, 'ellipse');
  var outerEllipse = document.createElementNS(SVG_SVG_NAMESPACE, 'ellipse');
  innerEllipse.setAttribute('class', 'a9s-inner');
  Ellipse_setXYR(innerEllipse, cx, cy, rx, ry);
  outerEllipse.setAttribute('class', 'a9s-outer');
  Ellipse_setXYR(outerEllipse, cx, cy, rx, ry);
  g.appendChild(outerEllipse);
  g.appendChild(innerEllipse);
  return g;
};
var setEllipseSize = function setEllipseSize(g, cx, cy, rx, ry) {
  var innerEllipse = g.querySelector('.a9s-inner');
  var outerEllipse = g.querySelector('.a9s-outer');
  Ellipse_setXYR(innerEllipse, cx, cy, rx, ry);
  Ellipse_setXYR(outerEllipse, cx, cy, rx, ry);
};
var getEllipseSize = function getEllipseSize(g) {
  var outerEllipse = g.querySelector('.a9s-outer');
  var cx = parseFloat(outerEllipse.getAttribute('cx'));
  var cy = parseFloat(outerEllipse.getAttribute('cy'));
  var rx = parseFloat(outerEllipse.getAttribute('rx'));
  var ry = parseFloat(outerEllipse.getAttribute('ry'));
  return {
    cx: cx,
    cy: cy,
    rx: rx,
    ry: ry
  };
};
;// CONCATENATED MODULE: ./src/ellipse/EllipseMask.js
function EllipseMask_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EllipseMask_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EllipseMask_createClass(Constructor, protoProps, staticProps) { if (protoProps) EllipseMask_defineProperties(Constructor.prototype, protoProps); if (staticProps) EllipseMask_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function EllipseMask_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var EllipseMask = /*#__PURE__*/function () {
  function EllipseMask(imageDimensions, ellipse) {
    var _this = this;

    EllipseMask_classCallCheck(this, EllipseMask);

    EllipseMask_defineProperty(this, "redraw", function () {
      var _getEllipseSize = getEllipseSize(_this.ellipse),
          cx = _getEllipseSize.cx,
          cy = _getEllipseSize.cy,
          rx = _getEllipseSize.rx,
          ry = _getEllipseSize.ry;

      var ty = cy + ry;

      _this.mask.setAttribute('d', "M0 0 h".concat(_this.w, " v").concat(_this.h, " h-").concat(_this.w, " z M").concat(cx, " ").concat(ty, " a ").concat(rx, " ").concat(ry, " 0 1 1 1 0"));
    });

    EllipseMask_defineProperty(this, "destroy", function () {
      return _this.mask.parentNode.removeChild(_this.mask);
    });

    this.w = imageDimensions.naturalWidth;
    this.h = imageDimensions.naturalHeight;
    this.ellipse = ellipse;

    var _getEllipseSize2 = getEllipseSize(this.ellipse),
        _cx = _getEllipseSize2.cx,
        _cy = _getEllipseSize2.cy,
        _rx = _getEllipseSize2.rx,
        _ry = _getEllipseSize2.ry;

    var _ty = _cy + _ry;

    this.mask = document.createElementNS(SVG_SVG_NAMESPACE, 'path');
    this.mask.setAttribute('fill-rule', 'evenodd');
    this.mask.setAttribute('class', 'a9s-selection-mask');
    this.mask.setAttribute('d', "M0 0 h".concat(this.w, " v").concat(this.h, " h-").concat(this.w, " z M").concat(_cx, " ").concat(_ty, " a ").concat(_rx, " ").concat(_ry, " 0 1 1 1 0"));
  }

  EllipseMask_createClass(EllipseMask, [{
    key: "element",
    get: function get() {
      return this.mask;
    }
  }]);

  return EllipseMask;
}();


;// CONCATENATED MODULE: ./src/ellipse/RubberbandEllipse.js
function RubberbandEllipse_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RubberbandEllipse_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RubberbandEllipse_createClass(Constructor, protoProps, staticProps) { if (protoProps) RubberbandEllipse_defineProperties(Constructor.prototype, protoProps); if (staticProps) RubberbandEllipse_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function RubberbandEllipse_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/**
 * A 'rubberband' selection tool for creating a ellipse by
 * clicking and dragging.
 */

var RubberbandEllipse = /*#__PURE__*/function () {
  function RubberbandEllipse(anchorX, anchorY, g, env) {
    var _this = this;

    RubberbandEllipse_classCallCheck(this, RubberbandEllipse);

    RubberbandEllipse_defineProperty(this, "dragTo", function (oppositeX, oppositeY) {
      // Make visible
      _this.group.style.display = null;
      var w = oppositeX - _this.anchor[0];
      var h = oppositeY - _this.anchor[1];
      var cx = w > 0 ? _this.anchor[0] + w / 2 : oppositeX + w / 2;
      var cy = h > 0 ? _this.anchor[1] + h / 2 : oppositeY + h / 2;
      var rx = Math.abs(w / 2);
      var ry = Math.abs(h / 2);
      setEllipseSize(_this.ellipse, cx, cy, rx, ry);

      _this.mask.redraw();
    });

    RubberbandEllipse_defineProperty(this, "getBoundingClientRect", function () {
      return _this.ellipse.getBoundingClientRect();
    });

    RubberbandEllipse_defineProperty(this, "toSelection", function () {
      return new Selection(toSVGTarget(_this.group, _this.env.image));
    });

    RubberbandEllipse_defineProperty(this, "destroy", function () {
      _this.group.parentNode.removeChild(_this.group);

      _this.mask = null;
      _this.ellipse = null;
      _this.group = null;
    });

    this.anchor = [anchorX, anchorY];
    this.env = env;
    this.group = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    this.ellipse = drawEllipse(anchorX, anchorY, 2);
    this.ellipse.setAttribute('class', 'a9s-selection');
    this.mask = new EllipseMask(env.image, this.ellipse); // We make the selection transparent to 
    // pointer events because it would interfere with the 
    // rendered annotations' mouseleave/enter events

    this.group.style.pointerEvents = 'none'; // Additionally, selection remains hidden until 
    // the user actually moves the mouse

    this.group.style.display = 'none';
    this.group.appendChild(this.mask.element);
    this.group.appendChild(this.ellipse);
    g.appendChild(this.group);
  }

  RubberbandEllipse_createClass(RubberbandEllipse, [{
    key: "element",
    get: function get() {
      return this.ellipse;
    }
  }]);

  return RubberbandEllipse;
}();


;// CONCATENATED MODULE: ./src/ellipse/EditableEllipse.js
function EditableEllipse_typeof(obj) { "@babel/helpers - typeof"; return EditableEllipse_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, EditableEllipse_typeof(obj); }

function EditableEllipse_slicedToArray(arr, i) { return EditableEllipse_arrayWithHoles(arr) || EditableEllipse_iterableToArrayLimit(arr, i) || EditableEllipse_unsupportedIterableToArray(arr, i) || EditableEllipse_nonIterableRest(); }

function EditableEllipse_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function EditableEllipse_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return EditableEllipse_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return EditableEllipse_arrayLikeToArray(o, minLen); }

function EditableEllipse_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function EditableEllipse_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function EditableEllipse_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function EditableEllipse_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EditableEllipse_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EditableEllipse_createClass(Constructor, protoProps, staticProps) { if (protoProps) EditableEllipse_defineProperties(Constructor.prototype, protoProps); if (staticProps) EditableEllipse_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function EditableEllipse_get() { if (typeof Reflect !== "undefined" && Reflect.get) { EditableEllipse_get = Reflect.get.bind(); } else { EditableEllipse_get = function _get(target, property, receiver) { var base = EditableEllipse_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return EditableEllipse_get.apply(this, arguments); }

function EditableEllipse_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = EditableEllipse_getPrototypeOf(object); if (object === null) break; } return object; }

function EditableEllipse_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) EditableEllipse_setPrototypeOf(subClass, superClass); }

function EditableEllipse_setPrototypeOf(o, p) { EditableEllipse_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return EditableEllipse_setPrototypeOf(o, p); }

function EditableEllipse_createSuper(Derived) { var hasNativeReflectConstruct = EditableEllipse_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = EditableEllipse_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = EditableEllipse_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return EditableEllipse_possibleConstructorReturn(this, result); }; }

function EditableEllipse_possibleConstructorReturn(self, call) { if (call && (EditableEllipse_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return EditableEllipse_assertThisInitialized(self); }

function EditableEllipse_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function EditableEllipse_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function EditableEllipse_getPrototypeOf(o) { EditableEllipse_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return EditableEllipse_getPrototypeOf(o); }

function EditableEllipse_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







/**
 * An editable ellipse shape.
 */

var EditableEllipse = /*#__PURE__*/function (_EditableShape) {
  EditableEllipse_inherits(EditableEllipse, _EditableShape);

  var _super = EditableEllipse_createSuper(EditableEllipse);

  function EditableEllipse(_annotation, g, config, env) {
    var _this;

    EditableEllipse_classCallCheck(this, EditableEllipse);

    _this = _super.call(this, _annotation, g, config, env);

    EditableEllipse_defineProperty(EditableEllipse_assertThisInitialized(_this), "setSize", function (cx, cy, rx, ry) {
      setEllipseSize(_this.ellipse, cx, cy, rx, ry);

      _this.mask.redraw();

      setFormatterElSize(_this.elementGroup, cx, cy, rx, ry);

      var _this$handles = EditableEllipse_slicedToArray(_this.handles, 4),
          topleft = _this$handles[0],
          topright = _this$handles[1],
          bottomright = _this$handles[2],
          bottomleft = _this$handles[3];

      _this.setHandleXY(topleft, cx, cy - ry);

      _this.setHandleXY(topright, cx + rx, cy);

      _this.setHandleXY(bottomright, cx, cy + ry);

      _this.setHandleXY(bottomleft, cx - rx, cy);
    });

    EditableEllipse_defineProperty(EditableEllipse_assertThisInitialized(_this), "stretchCorners", function (draggedHandleIdx, anchorHandle, leftHandle, mousePos) {
      var anchor = _this.getHandleXY(anchorHandle);

      var anchorLeft = _this.getHandleXY(leftHandle);

      var mouseX = mousePos.x;
      var mouseY = mousePos.y;
      var rx = 0;
      var ry = 0;

      if (draggedHandleIdx == 0 || draggedHandleIdx == 2) {
        mouseX = anchor.x;
      } else {
        mouseY = anchor.y;
      }

      var width = mouseX - anchor.x;
      var height = mouseY - anchor.y;
      var x = width > 0 ? anchor.x : mouseX;
      var y = height > 0 ? anchor.y : mouseY;
      var w = Math.abs(width);
      var h = Math.abs(height);
      var cx = x + w / 2;
      var cy = y + h / 2;
      var rx = w / 2;
      var ry = h / 2;

      if (draggedHandleIdx == 0 || draggedHandleIdx == 2) {
        rx = Math.abs(anchor.x - anchorLeft.x);
      } else {
        ry = Math.abs(anchor.y - anchorLeft.y);
      }

      setEllipseSize(_this.ellipse, cx, cy, rx, ry);

      _this.mask.redraw();

      setFormatterElSize(_this.elementGroup, cx, cy, rx, ry);

      if (draggedHandleIdx == 0 || draggedHandleIdx == 2) {
        var idx0 = 0;
        var idx2 = 2;

        if (draggedHandleIdx == 0 && height > 0 || draggedHandleIdx == 2 && height < 0) {
          idx0 = 2;
          idx2 = 0;
        }

        _this.setHandleXY(_this.handles[idx0], cx, cy - ry);

        _this.setHandleXY(_this.handles[idx2], cx, cy + ry);

        _this.setHandleXY(_this.handles[1], cx + rx, cy);

        _this.setHandleXY(_this.handles[3], cx - rx, cy);
      } else {
        var idx3 = 3;
        var idx1 = 1;

        if (draggedHandleIdx == 1 && width > 0 || draggedHandleIdx == 3 && width < 0) {
          idx3 = 1;
          idx1 = 3;
        }

        _this.setHandleXY(_this.handles[idx3], cx + rx, cy);

        _this.setHandleXY(_this.handles[idx1], cx - rx, cy);

        _this.setHandleXY(_this.handles[0], cx, cy - ry);

        _this.setHandleXY(_this.handles[2], cx, cy + ry);
      }
    });

    EditableEllipse_defineProperty(EditableEllipse_assertThisInitialized(_this), "onGrab", function (grabbedElem) {
      return function (evt) {
        _this.grabbedElem = grabbedElem;

        var pos = _this.getSVGPoint(evt);

        var _getEllipseSize = getEllipseSize(_this.ellipse),
            cx = _getEllipseSize.cx,
            cy = _getEllipseSize.cy;

        _this.grabbedAt = {
          x: pos.x - cx,
          y: pos.y - cy
        };
      };
    });

    EditableEllipse_defineProperty(EditableEllipse_assertThisInitialized(_this), "onMouseMove", function (evt) {
      var constrain = function constrain(coord, max) {
        return coord < 0 ? 0 : coord > max ? max : coord;
      };

      if (_this.grabbedElem) {
        var pos = _this.getSVGPoint(evt);

        if (_this.grabbedElem === _this.ellipse) {
          var _getEllipseSize2 = getEllipseSize(_this.ellipse),
              rx = _getEllipseSize2.rx,
              ry = _getEllipseSize2.ry;

          var _this$env$image = _this.env.image,
              naturalWidth = _this$env$image.naturalWidth,
              naturalHeight = _this$env$image.naturalHeight;
          var cx = constrain(pos.x - _this.grabbedAt.x, naturalWidth - rx);
          var cy = constrain(pos.y - _this.grabbedAt.y, naturalHeight - ry);

          _this.setSize(cx, cy, rx, ry);

          _this.emit('update', toSVGTarget(_this.ellipse, _this.env.image));
        } else {
          // Mouse position replaces one of the corner coords, depending
          // on which handle is the grabbed element
          var handleIdx = _this.handles.indexOf(_this.grabbedElem);

          var oppositeHandle = handleIdx < 2 ? _this.handles[handleIdx + 2] : _this.handles[handleIdx - 2];
          var leftHandle = _this.handles[(handleIdx + 3) % 4];

          _this.stretchCorners(handleIdx, oppositeHandle, leftHandle, pos);

          _this.emit('update', toSVGTarget(_this.ellipse, _this.env.image));
        }
      }
    });

    EditableEllipse_defineProperty(EditableEllipse_assertThisInitialized(_this), "onMouseUp", function () {
      _this.grabbedElem = null;
      _this.grabbedAt = null;
    });

    EditableEllipse_defineProperty(EditableEllipse_assertThisInitialized(_this), "onScaleChanged", function (scale) {
      return _this.handles.map(_this.scaleHandle);
    });

    EditableEllipse_defineProperty(EditableEllipse_assertThisInitialized(_this), "updateState", function (annotation) {
      var shape = svgFragmentToShape(annotation);
      var cx = parseFloat(shape.getAttribute('cx'));
      var cy = parseFloat(shape.getAttribute('cy'));
      var rx = parseFloat(shape.getAttribute('rx'));
      var ry = parseFloat(shape.getAttribute('ry'));

      _this.setSize(cx, cy, rx, ry);
    });

    _this.svg.addEventListener('mousemove', _this.onMouseMove);

    _this.svg.addEventListener('mouseup', _this.onMouseUp); // SVG markup for this class looks like this:
    // 
    // <g>
    //   <path class="a9s-selection mask"... />
    //   <g> <-- return this node as .element
    //     <ellipse class="a9s-outer" ... />
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //   </g> 
    // </g>
    // 'g' for the editable ellipse compound shape


    _this.containerGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    _this.ellipse = drawEmbeddedSVG(_annotation);

    _this.ellipse.querySelector('.a9s-inner').addEventListener('mousedown', _this.onGrab(_this.ellipse));

    _this.mask = new EllipseMask(env.image, _this.ellipse);

    _this.containerGroup.appendChild(_this.mask.element); // The 'element' = ellipse + handles


    _this.elementGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');

    _this.elementGroup.setAttribute('class', 'a9s-annotation editable selected');

    _this.elementGroup.appendChild(_this.ellipse);

    var _getEllipseSize3 = getEllipseSize(_this.ellipse),
        _cx = _getEllipseSize3.cx,
        _cy = _getEllipseSize3.cy,
        _rx = _getEllipseSize3.rx,
        _ry = _getEllipseSize3.ry;

    _this.handles = [[_cx, _cy - _ry], [_cx + _rx, _cy], [_cx, _cy + _ry], [_cx - _rx, _cy]].map(function (t) {
      var _t = EditableEllipse_slicedToArray(t, 2),
          x = _t[0],
          y = _t[1];

      var handle = _this.drawHandle(x, y);

      handle.addEventListener('mousedown', _this.onGrab(handle));

      _this.elementGroup.appendChild(handle);

      return handle;
    });

    _this.containerGroup.appendChild(_this.elementGroup);

    g.appendChild(_this.containerGroup);
    format(_this.ellipse, _annotation, config.formatter); // The grabbed element (handle or entire group), if any

    _this.grabbedElem = null; // Mouse xy offset inside the shape, if mouse pressed

    _this.grabbedAt = null;
    return _this;
  }

  EditableEllipse_createClass(EditableEllipse, [{
    key: "element",
    get: function get() {
      return this.elementGroup;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.containerGroup.parentNode.removeChild(this.containerGroup);

      EditableEllipse_get(EditableEllipse_getPrototypeOf(EditableEllipse.prototype), "destroy", this).call(this);
    }
  }]);

  return EditableEllipse;
}(EditableShape);


;// CONCATENATED MODULE: ./src/ellipse/RubberbandEllipseTool.js
function RubberbandEllipseTool_typeof(obj) { "@babel/helpers - typeof"; return RubberbandEllipseTool_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, RubberbandEllipseTool_typeof(obj); }

function RubberbandEllipseTool_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RubberbandEllipseTool_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RubberbandEllipseTool_createClass(Constructor, protoProps, staticProps) { if (protoProps) RubberbandEllipseTool_defineProperties(Constructor.prototype, protoProps); if (staticProps) RubberbandEllipseTool_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function RubberbandEllipseTool_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) RubberbandEllipseTool_setPrototypeOf(subClass, superClass); }

function RubberbandEllipseTool_setPrototypeOf(o, p) { RubberbandEllipseTool_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return RubberbandEllipseTool_setPrototypeOf(o, p); }

function RubberbandEllipseTool_createSuper(Derived) { var hasNativeReflectConstruct = RubberbandEllipseTool_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = RubberbandEllipseTool_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = RubberbandEllipseTool_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return RubberbandEllipseTool_possibleConstructorReturn(this, result); }; }

function RubberbandEllipseTool_possibleConstructorReturn(self, call) { if (call && (RubberbandEllipseTool_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return RubberbandEllipseTool_assertThisInitialized(self); }

function RubberbandEllipseTool_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function RubberbandEllipseTool_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function RubberbandEllipseTool_getPrototypeOf(o) { RubberbandEllipseTool_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return RubberbandEllipseTool_getPrototypeOf(o); }

function RubberbandEllipseTool_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * A rubberband selector for ellipse selections.
 */

var RubberbandEllipseTool = /*#__PURE__*/function (_Tool) {
  RubberbandEllipseTool_inherits(RubberbandEllipseTool, _Tool);

  var _super = RubberbandEllipseTool_createSuper(RubberbandEllipseTool);

  function RubberbandEllipseTool(g, config, env) {
    var _this;

    RubberbandEllipseTool_classCallCheck(this, RubberbandEllipseTool);

    _this = _super.call(this, g, config, env);

    RubberbandEllipseTool_defineProperty(RubberbandEllipseTool_assertThisInitialized(_this), "startDrawing", function (x, y) {
      _this.attachListeners({
        mouseMove: _this.onMouseMove,
        mouseUp: _this.onMouseUp
      });

      _this.rubberband = new RubberbandEllipse(x, y, _this.g, _this.env);
    });

    RubberbandEllipseTool_defineProperty(RubberbandEllipseTool_assertThisInitialized(_this), "stop", function () {
      if (_this.rubberband) {
        _this.rubberband.destroy();

        _this.rubberband = null;
      }
    });

    RubberbandEllipseTool_defineProperty(RubberbandEllipseTool_assertThisInitialized(_this), "onMouseMove", function (x, y) {
      return _this.rubberband.dragTo(x, y);
    });

    RubberbandEllipseTool_defineProperty(RubberbandEllipseTool_assertThisInitialized(_this), "onMouseUp", function () {
      _this.detachListeners();

      _this.started = false;

      var _this$rubberband$getB = _this.rubberband.getBoundingClientRect(),
          width = _this$rubberband$getB.width,
          height = _this$rubberband$getB.height;

      var minWidth = _this.config.minSelectionWidth || 4;
      var minHeight = _this.config.minSelectionHeight || 4;

      if (width >= minWidth && height >= minHeight) {
        // Emit the SVG shape with selection attached    
        var element = _this.rubberband.element;
        element.annotation = _this.rubberband.toSelection(); // Emit the completed shape...

        _this.emit('complete', element);
      } else {
        _this.emit('cancel');
      }

      _this.stop();
    });

    RubberbandEllipseTool_defineProperty(RubberbandEllipseTool_assertThisInitialized(_this), "createEditableShape", function (annotation) {
      return new EditableEllipse(annotation, _this.g, _this.config, _this.env);
    });

    _this.rubberband = null;
    return _this;
  }

  RubberbandEllipseTool_createClass(RubberbandEllipseTool, [{
    key: "isDrawing",
    get: function get() {
      return this.rubberband != null;
    }
  }]);

  return RubberbandEllipseTool;
}(Tool);


RubberbandEllipseTool.identifier = 'ellipse';

RubberbandEllipseTool.supports = function (annotation) {
  var _selector$value;

  var selector = annotation.selector('SvgSelector');
  if (selector) return (_selector$value = selector.value) === null || _selector$value === void 0 ? void 0 : _selector$value.match(/^<svg.*<ellipse/g);
};
;// CONCATENATED MODULE: ./src/freehand/RubberbandFreehand.js
function RubberbandFreehand_toConsumableArray(arr) { return RubberbandFreehand_arrayWithoutHoles(arr) || RubberbandFreehand_iterableToArray(arr) || RubberbandFreehand_unsupportedIterableToArray(arr) || RubberbandFreehand_nonIterableSpread(); }

function RubberbandFreehand_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function RubberbandFreehand_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return RubberbandFreehand_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return RubberbandFreehand_arrayLikeToArray(o, minLen); }

function RubberbandFreehand_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function RubberbandFreehand_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return RubberbandFreehand_arrayLikeToArray(arr); }

function RubberbandFreehand_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function RubberbandFreehand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RubberbandFreehand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RubberbandFreehand_createClass(Constructor, protoProps, staticProps) { if (protoProps) RubberbandFreehand_defineProperties(Constructor.prototype, protoProps); if (staticProps) RubberbandFreehand_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function RubberbandFreehand_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



 // TODO optional: mask to dim the outside area
//import Mask from './FreehandMask';

/**
 * A 'rubberband' selection tool for creating freehand drawing by
 * clicking and dragging.
 */

var RubberbandFreehand = /*#__PURE__*/function () {
  function RubberbandFreehand(anchor, g, env) {
    var _this = this;

    RubberbandFreehand_classCallCheck(this, RubberbandFreehand);

    RubberbandFreehand_defineProperty(this, "setPoints", function (points) {
      var str = points.map(function (pt) {
        return "L".concat(pt[0], " ").concat(pt[1]);
      }).join(' ');
      str = 'M' + str.substring(1);

      _this.outer.setAttribute('d', str);

      _this.inner.setAttribute('d', str);
    });

    RubberbandFreehand_defineProperty(this, "getBoundingClientRect", function () {
      return _this.outer.getBoundingClientRect();
    });

    RubberbandFreehand_defineProperty(this, "dragTo", function (xy) {
      // Make visible
      _this.group.style.display = null; //TODO optional: edge smoothing

      _this.addPoint(xy); // TODO optional: mask to dim the outside area
      // this.mask.redraw();

    });

    RubberbandFreehand_defineProperty(this, "addPoint", function (xy) {
      _this.points = [].concat(RubberbandFreehand_toConsumableArray(_this.points), [xy]);

      _this.setPoints(_this.points); // TODO optional: mask to dim the outside area
      // this.mask.redraw();

    });

    RubberbandFreehand_defineProperty(this, "destroy", function () {
      _this.group.parentNode.removeChild(_this.group);

      _this.freehand = null;
      _this.group = null;
    });

    RubberbandFreehand_defineProperty(this, "toSelection", function () {
      return new Selection(toSVGTarget(_this.group, _this.env.image));
    });

    this.points = [anchor];
    this.env = env;
    this.group = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    this.freehand = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    this.freehand.setAttribute('class', 'a9s-selection');
    this.outer = document.createElementNS(SVG_SVG_NAMESPACE, 'path');
    this.outer.setAttribute('class', 'a9s-outer');
    this.inner = document.createElementNS(SVG_SVG_NAMESPACE, 'path');
    this.inner.setAttribute('class', 'a9s-inner');
    this.setPoints(this.points); // TODO optional: mask to dim the outside area
    // this.mask = new Mask(env.image, this.inner);

    this.freehand.appendChild(this.outer);
    this.freehand.appendChild(this.inner); // Additionally, selection remains hidden until 
    // the user actually moves the mouse

    this.group.style.display = 'none'; // TODO optional: mask to dim the outside area
    // this.group.appendChild(this.mask.element);

    this.group.appendChild(this.freehand);
    g.appendChild(this.group);
  }

  RubberbandFreehand_createClass(RubberbandFreehand, [{
    key: "element",
    get: function get() {
      return this.freehand;
    }
  }]);

  return RubberbandFreehand;
}();


;// CONCATENATED MODULE: ./src/freehand/EditableFreehand.js
function EditableFreehand_typeof(obj) { "@babel/helpers - typeof"; return EditableFreehand_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, EditableFreehand_typeof(obj); }

function EditableFreehand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EditableFreehand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EditableFreehand_createClass(Constructor, protoProps, staticProps) { if (protoProps) EditableFreehand_defineProperties(Constructor.prototype, protoProps); if (staticProps) EditableFreehand_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function EditableFreehand_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) EditableFreehand_setPrototypeOf(subClass, superClass); }

function EditableFreehand_setPrototypeOf(o, p) { EditableFreehand_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return EditableFreehand_setPrototypeOf(o, p); }

function EditableFreehand_createSuper(Derived) { var hasNativeReflectConstruct = EditableFreehand_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = EditableFreehand_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = EditableFreehand_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return EditableFreehand_possibleConstructorReturn(this, result); }; }

function EditableFreehand_possibleConstructorReturn(self, call) { if (call && (EditableFreehand_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return EditableFreehand_assertThisInitialized(self); }

function EditableFreehand_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function EditableFreehand_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function EditableFreehand_get() { if (typeof Reflect !== "undefined" && Reflect.get) { EditableFreehand_get = Reflect.get.bind(); } else { EditableFreehand_get = function _get(target, property, receiver) { var base = EditableFreehand_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return EditableFreehand_get.apply(this, arguments); }

function EditableFreehand_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = EditableFreehand_getPrototypeOf(object); if (object === null) break; } return object; }

function EditableFreehand_getPrototypeOf(o) { EditableFreehand_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return EditableFreehand_getPrototypeOf(o); }

function EditableFreehand_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 // TODO optional: mask to dim the outside area
//import Mask from './FreehandMask';

var getPoints = function getPoints(shape) {
  var pointList = shape.getAttribute('d').split('L');
  var points = [];

  if (pointList.length > 0) {
    var point = pointList[0].substring(1).trim().split(' ');
    points.push({
      x: parseFloat(point[0]),
      y: parseFloat(point[1])
    });

    for (var i = 1; i < pointList.length; i++) {
      var point = pointList[i].trim().split(' ');
      points.push({
        x: parseFloat(point[0]),
        y: parseFloat(point[1])
      });
    }
  }

  return points;
};

var getBBox = function getBBox(shape) {
  return shape.querySelector('.a9s-inner').getBBox();
};
/**
 * An editable freehand drawing.
 */


var EditableFreehand = /*#__PURE__*/function (_EditableShape) {
  EditableFreehand_inherits(EditableFreehand, _EditableShape);

  var _super = EditableFreehand_createSuper(EditableFreehand);

  function EditableFreehand(_annotation, g, config, env) {
    var _thisSuper, _this;

    EditableFreehand_classCallCheck(this, EditableFreehand);

    _this = _super.call(this, _annotation, g, config, env);

    EditableFreehand_defineProperty(EditableFreehand_assertThisInitialized(_this), "setPoints", function (points) {
      // Not using .toFixed(1) because that will ALWAYS
      // return one decimal, e.g. "15.0" (when we want "15")
      var round = function round(num) {
        return Math.round(10 * num) / 10;
      };

      var str = points.map(function (pt) {
        return "L".concat(round(pt.x), " ").concat(round(pt.y));
      }).join(' ');
      str = 'M' + str.substring(1);

      var inner = _this.shape.querySelector('.a9s-inner');

      inner.setAttribute('d', str);

      var outer = _this.shape.querySelector('.a9s-outer');

      outer.setAttribute('d', str);

      var _outer$getBBox = outer.getBBox(),
          x = _outer$getBBox.x,
          y = _outer$getBBox.y,
          width = _outer$getBBox.width,
          height = _outer$getBBox.height; // TODO optional: mask to dim the outside area
      // this.mask.redraw();
      // TODO optional: handles to stretch the shape

      /*    const [ topleft, topright, bottomright, bottomleft] = this.handles;
      
          this.setHandleXY(topleft, x, y);
          this.setHandleXY(topright, x + width, y);
          this.setHandleXY(bottomright, x + width, y + height);
          this.setHandleXY(bottomleft, x, y + height);*/


      setFormatterElSize(_this.elementGroup, x, y, width, height);
    });

    EditableFreehand_defineProperty(EditableFreehand_assertThisInitialized(_this), "onGrab", function (grabbedElem) {
      return function (evt) {
        _this.grabbedElem = grabbedElem;

        var pos = _this.getSVGPoint(evt);

        _this.grabbedAt = {
          x: pos.x,
          y: pos.y
        };
      };
    });

    EditableFreehand_defineProperty(EditableFreehand_assertThisInitialized(_this), "onMouseMove", function (evt) {
      var constrain = function constrain(coord, delta, max) {
        return coord + delta < 0 ? -coord : coord + delta > max ? max - coord : delta;
      };

      if (_this.grabbedElem) {
        var pos = _this.getSVGPoint(evt);

        var _getBBox = getBBox(_this.shape),
            x = _getBBox.x,
            y = _getBBox.y,
            width = _getBBox.width,
            height = _getBBox.height;

        if (_this.grabbedElem === _this.shape) {
          var _this$env$image = _this.env.image,
              naturalWidth = _this$env$image.naturalWidth,
              naturalHeight = _this$env$image.naturalHeight;
          var dx = constrain(x, pos.x - _this.grabbedAt.x, naturalWidth - width);
          var dy = constrain(y, pos.y - _this.grabbedAt.y, naturalHeight - height);

          var inner = _this.shape.querySelector('.a9s-inner');

          var updatedPoints = getPoints(inner).map(function (pt) {
            return {
              x: pt.x + dx,
              y: pt.y + dy
            };
          });
          _this.grabbedAt = pos;

          _this.setPoints(updatedPoints);

          _this.emit('update', toSVGTarget(_this.shape, _this.env.image));
        } // TODO optional: handles to stretch the shape

        /* else {
          const handleIdx = this.handles.indexOf(this.grabbedElem);
          const oppositeHandle = handleIdx < 2 ? 
            this.handles[handleIdx + 2] : this.handles[handleIdx - 2];
           this.stretchCorners(handleIdx, oppositeHandle, pos);
           this.emit('update', toSVGTarget(this.shape, this.env.image));
        }*/

      }
    });

    EditableFreehand_defineProperty(EditableFreehand_assertThisInitialized(_this), "onMouseUp", function (evt) {
      _this.grabbedElem = null;
      _this.grabbedAt = null;
    });

    EditableFreehand_defineProperty(EditableFreehand_assertThisInitialized(_this), "updateState", function (annotation) {
      var points = getPoints(svgFragmentToShape(annotation));

      _this.setPoints(points);
    });

    EditableFreehand_defineProperty(EditableFreehand_assertThisInitialized(_this), "destroy", function () {
      _this.containerGroup.parentNode.removeChild(_this.containerGroup);

      EditableFreehand_get((_thisSuper = EditableFreehand_assertThisInitialized(_this), EditableFreehand_getPrototypeOf(EditableFreehand.prototype)), "destroy", _thisSuper).call(_thisSuper);
    });

    _this.svg.addEventListener('mousemove', _this.onMouseMove);

    _this.svg.addEventListener('mouseup', _this.onMouseUp); // SVG markup for this class looks like this:
    // 
    // <g>
    //   <path class="a9s-selection mask"... />
    //   <g> <-- return this node as .element
    //     <polygon class="a9s-outer" ... />
    //     <polygon class="a9s-inner" ... />
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //     ...
    //   </g> 
    // </g>
    // 'g' for the editable free drawing compound shape


    _this.containerGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    _this.shape = drawEmbeddedSVG(_annotation); // TODO optional: mask to dim the outside area
    // this.mask = new Mask(env.image, this.shape.querySelector('.a9s-inner'));
    // this.containerGroup.appendChild(this.mask.element);

    _this.elementGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');

    _this.elementGroup.setAttribute('class', 'a9s-annotation editable selected');

    _this.elementGroup.appendChild(_this.shape);

    _this.containerGroup.appendChild(_this.elementGroup);

    g.appendChild(_this.containerGroup);
    format(_this.shape, _annotation, config.formatter);

    _this.shape.querySelector('.a9s-inner').addEventListener('mousedown', _this.onGrab(_this.shape));

    var _getBBox2 = getBBox(_this.shape),
        _x = _getBBox2.x,
        _y = _getBBox2.y,
        _width = _getBBox2.width,
        _height = _getBBox2.height; // TODO optional: handles to stretch the shape

    /*    this.handles = [
          [ x, y ], 
          [ x + width, y ], 
          [ x + width, y + height ], 
          [ x, y + height ]
        ].map(t => { 
          const [ x, y ] = t;
          const handle = this.drawHandle(x, y);
    
          handle.addEventListener('mousedown', this.onGrab(handle));
          this.elementGroup.appendChild(handle);
    
          return handle;
        });*/
    // The grabbed element (handle or entire shape), if any


    _this.grabbedElem = null; // Mouse grab point

    _this.grabbedAt = null;
    return _this;
  }

  EditableFreehand_createClass(EditableFreehand, [{
    key: "element",
    get: function get() {
      return this.elementGroup;
    }
  }]);

  return EditableFreehand;
}(EditableShape);


;// CONCATENATED MODULE: ./src/freehand/RubberbandFreehandTool.js
function RubberbandFreehandTool_typeof(obj) { "@babel/helpers - typeof"; return RubberbandFreehandTool_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, RubberbandFreehandTool_typeof(obj); }

function RubberbandFreehandTool_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RubberbandFreehandTool_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RubberbandFreehandTool_createClass(Constructor, protoProps, staticProps) { if (protoProps) RubberbandFreehandTool_defineProperties(Constructor.prototype, protoProps); if (staticProps) RubberbandFreehandTool_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function RubberbandFreehandTool_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) RubberbandFreehandTool_setPrototypeOf(subClass, superClass); }

function RubberbandFreehandTool_setPrototypeOf(o, p) { RubberbandFreehandTool_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return RubberbandFreehandTool_setPrototypeOf(o, p); }

function RubberbandFreehandTool_createSuper(Derived) { var hasNativeReflectConstruct = RubberbandFreehandTool_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = RubberbandFreehandTool_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = RubberbandFreehandTool_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return RubberbandFreehandTool_possibleConstructorReturn(this, result); }; }

function RubberbandFreehandTool_possibleConstructorReturn(self, call) { if (call && (RubberbandFreehandTool_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return RubberbandFreehandTool_assertThisInitialized(self); }

function RubberbandFreehandTool_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function RubberbandFreehandTool_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function RubberbandFreehandTool_getPrototypeOf(o) { RubberbandFreehandTool_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return RubberbandFreehandTool_getPrototypeOf(o); }

function RubberbandFreehandTool_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * A rubberband selector for freehand fragments.
 */

var RubberbandFreehandTool = /*#__PURE__*/function (_Tool) {
  RubberbandFreehandTool_inherits(RubberbandFreehandTool, _Tool);

  var _super = RubberbandFreehandTool_createSuper(RubberbandFreehandTool);

  function RubberbandFreehandTool(g, config, env) {
    var _this;

    RubberbandFreehandTool_classCallCheck(this, RubberbandFreehandTool);

    _this = _super.call(this, g, config, env);

    RubberbandFreehandTool_defineProperty(RubberbandFreehandTool_assertThisInitialized(_this), "startDrawing", function (x, y) {
      _this._isDrawing = true;

      _this.attachListeners({
        mouseMove: _this.onMouseMove,
        mouseUp: _this.onMouseUp,
        dblClick: _this.onDblClick
      });

      _this.rubberband = new RubberbandFreehand([x, y], _this.g, _this.env);
    });

    RubberbandFreehandTool_defineProperty(RubberbandFreehandTool_assertThisInitialized(_this), "stop", function () {
      _this.detachListeners();

      _this._isDrawing = false;

      if (_this.rubberband) {
        _this.rubberband.destroy();

        _this.rubberband = null;
      }
    });

    RubberbandFreehandTool_defineProperty(RubberbandFreehandTool_assertThisInitialized(_this), "onMouseMove", function (x, y) {
      return _this.rubberband.dragTo([x, y]);
    });

    RubberbandFreehandTool_defineProperty(RubberbandFreehandTool_assertThisInitialized(_this), "onMouseUp", function (x, y) {
      _this.onDblClick(x, y);
    });

    RubberbandFreehandTool_defineProperty(RubberbandFreehandTool_assertThisInitialized(_this), "onDblClick", function (x, y) {
      _this._isDrawing = false;

      _this.rubberband.addPoint([x, y]);

      _this.detachListeners();

      var _this$rubberband$getB = _this.rubberband.getBoundingClientRect(),
          width = _this$rubberband$getB.width,
          height = _this$rubberband$getB.height;

      var minWidth = _this.config.minSelectionWidth || 4;
      var minHeight = _this.config.minSelectionHeight || 4;

      if (width >= minWidth || height >= minHeight) {
        var shape = _this.rubberband.element;
        shape.annotation = _this.rubberband.toSelection();

        _this.emit('complete', shape);
      } else {
        _this.emit('cancel');
      }

      _this.stop();
    });

    RubberbandFreehandTool_defineProperty(RubberbandFreehandTool_assertThisInitialized(_this), "createEditableShape", function (annotation) {
      return new EditableFreehand(annotation, _this.g, _this.config, _this.env);
    });

    _this._isDrawing = false;
    return _this;
  }

  RubberbandFreehandTool_createClass(RubberbandFreehandTool, [{
    key: "isDrawing",
    get: function get() {
      return this._isDrawing;
    }
  }]);

  return RubberbandFreehandTool;
}(Tool);


RubberbandFreehandTool.identifier = 'freehand';

RubberbandFreehandTool.supports = function (annotation) {
  var selector = annotation.selector('SvgSelector');
  if (selector) return selector.value.match(/^<svg.*<path*/g) && !selector.value.toUpperCase().includes('Z');
};
;// CONCATENATED MODULE: ./node_modules/@recogito/annotorious/src/tools/polygon/PolygonMask.js
function PolygonMask_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function PolygonMask_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function PolygonMask_createClass(Constructor, protoProps, staticProps) { if (protoProps) PolygonMask_defineProperties(Constructor.prototype, protoProps); if (staticProps) PolygonMask_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function PolygonMask_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var PolygonMask = /*#__PURE__*/function () {
  function PolygonMask(imageDimensions, polygon) {
    var _this = this;

    PolygonMask_classCallCheck(this, PolygonMask);

    PolygonMask_defineProperty(this, "redraw", function () {
      _this.mask.setAttribute('d', "M0 0 h".concat(_this.w, " v").concat(_this.h, " h-").concat(_this.w, " z M").concat(_this.polygon.getAttribute('points'), " z"));
    });

    PolygonMask_defineProperty(this, "destroy", function () {
      return _this.mask.parentNode.removeChild(_this.mask);
    });

    this.w = imageDimensions.naturalWidth;
    this.h = imageDimensions.naturalHeight;
    this.polygon = polygon;
    this.mask = document.createElementNS(SVG_SVG_NAMESPACE, 'path');
    this.mask.setAttribute('fill-rule', 'evenodd');
    this.mask.setAttribute('class', 'a9s-selection-mask');
    this.mask.setAttribute('d', "M0 0 h".concat(this.w, " v").concat(this.h, " h-").concat(this.w, " z M").concat(this.polygon.getAttribute('points'), " z"));
  }

  PolygonMask_createClass(PolygonMask, [{
    key: "element",
    get: function get() {
      return this.mask;
    }
  }]);

  return PolygonMask;
}();


;// CONCATENATED MODULE: ./src/multipolygon/RubberbandMultipolygon.js
function RubberbandMultipolygon_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function RubberbandMultipolygon_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? RubberbandMultipolygon_ownKeys(Object(source), !0).forEach(function (key) { RubberbandMultipolygon_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : RubberbandMultipolygon_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function RubberbandMultipolygon_toConsumableArray(arr) { return RubberbandMultipolygon_arrayWithoutHoles(arr) || RubberbandMultipolygon_iterableToArray(arr) || RubberbandMultipolygon_unsupportedIterableToArray(arr) || RubberbandMultipolygon_nonIterableSpread(); }

function RubberbandMultipolygon_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function RubberbandMultipolygon_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function RubberbandMultipolygon_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return RubberbandMultipolygon_arrayLikeToArray(arr); }

function RubberbandMultipolygon_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = RubberbandMultipolygon_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function RubberbandMultipolygon_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return RubberbandMultipolygon_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return RubberbandMultipolygon_arrayLikeToArray(o, minLen); }

function RubberbandMultipolygon_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function RubberbandMultipolygon_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RubberbandMultipolygon_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RubberbandMultipolygon_createClass(Constructor, protoProps, staticProps) { if (protoProps) RubberbandMultipolygon_defineProperties(Constructor.prototype, protoProps); if (staticProps) RubberbandMultipolygon_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function RubberbandMultipolygon_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




 // TODO optional: mask to dim the outside area
//import Mask from './multipolygonMask';

/**
 * A 'rubberband' selection tool for creating multipolygon drawing by
 * clicking and dragging.
 */

var RubberbandMultipolygon = /*#__PURE__*/function () {
  function RubberbandMultipolygon(anchor, g, env) {
    var _this = this;

    RubberbandMultipolygon_classCallCheck(this, RubberbandMultipolygon);

    RubberbandMultipolygon_defineProperty(this, "setPoints", function (points) {
      var attr = "";

      var _iterator = RubberbandMultipolygon_createForOfIteratorHelper(points),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var ps = _step.value;
          var attr2 = "";

          if (ps.length > 0) {
            var _iterator2 = RubberbandMultipolygon_createForOfIteratorHelper(ps),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var p = _step2.value;

                if (p) {
                  if (attr2 === "") {
                    attr2 += "M".concat(p[0], ",").concat(p[1]);
                  } else {
                    attr2 += " L".concat(p[0], ",").concat(p[1]);
                  }
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            ;
            attr += attr2;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      attr += " Z";

      _this.outer.setAttribute('d', attr);

      _this.inner.setAttribute('d', attr);
    });

    RubberbandMultipolygon_defineProperty(this, "getBoundingClientRect", function () {
      return _this.outer.getBoundingClientRect();
    });

    RubberbandMultipolygon_defineProperty(this, "dragTo", function (xy) {
      // Make visible
      _this.group.style.display = null;

      var head = _this.points[_this.points.length - 1].slice(0, _this.points[_this.points.length - 1].length - 1);

      var headRest = _this.points.slice(0, -1);

      var rubberband = [].concat(RubberbandMultipolygon_toConsumableArray(head), [xy, head[0]]);
      headRest.push(rubberband);

      _this.setPoints(headRest);

      _this.mask.redraw();
    });

    RubberbandMultipolygon_defineProperty(this, "addPoint", function (xy) {
      // Don't add a new point if distance < 2 pixels
      if (_this.points[_this.points.length - 1].length > 0) {
        var head = _this.points[_this.points.length - 1].slice(0, _this.points[_this.points.length - 1].length - 1);

        var lastCorner = head[head.length - 1];
        var dist = Math.pow(xy[0] - lastCorner[0], 2) + Math.pow(xy[1] - lastCorner[1], 2);

        if (dist > 4) {
          _this.points[_this.points.length - 1] = [].concat(RubberbandMultipolygon_toConsumableArray(head), [xy, head[0]]);

          _this.setPoints(_this.points);

          _this.mask.redraw();
        }
      } else {
        _this.points[_this.points.length - 1] = [xy, xy];

        _this.setPoints(_this.points);
      }
    });

    RubberbandMultipolygon_defineProperty(this, "undo", function () {
      if (_this.points[_this.points.length - 1].length > 2) {
        _this.points[_this.points.length - 1].pop();
      } else {
        if (_this.points.length > 1) {
          _this.points.pop();
        }
      }
    });

    RubberbandMultipolygon_defineProperty(this, "newPart", function () {
      _this.points.push([]);
    });

    RubberbandMultipolygon_defineProperty(this, "destroy", function () {
      _this.group.parentNode.removeChild(_this.group);

      _this.multipolygon = null;
      _this.group = null;
    });

    RubberbandMultipolygon_defineProperty(this, "toSelection", function () {
      return new Selection(RubberbandMultipolygon_objectSpread(RubberbandMultipolygon_objectSpread({}, toSVGTarget(_this.group, _this.env.image)), {}, {
        renderedVia: {
          name: 'multipolygon'
        }
      }));
    });

    this.points = [];
    this.points.push([anchor, anchor]);
    this.env = env;
    this.group = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    this.multipolygon = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    this.multipolygon.setAttribute('class', 'a9s-selection');
    this.outer = document.createElementNS(SVG_SVG_NAMESPACE, 'path');
    this.outer.setAttribute('class', 'a9s-outer');
    this.inner = document.createElementNS(SVG_SVG_NAMESPACE, 'path');
    this.inner.setAttribute('class', 'a9s-inner');
    this.setPoints(this.points);
    this.mask = new PolygonMask(env.image, this.inner); // TODO optional: mask to dim the outside area
    // this.mask = new Mask(env.image, this.inner);

    this.multipolygon.appendChild(this.outer);
    this.multipolygon.appendChild(this.inner); // Additionally, selection remains hidden until 
    // the user actually moves the mouse

    this.group.style.display = 'none'; // TODO optional: mask to dim the outside area
    // this.group.appendChild(this.mask.element);

    this.group.appendChild(this.mask.element);
    this.group.appendChild(this.multipolygon);
    g.appendChild(this.group);
  }

  RubberbandMultipolygon_createClass(RubberbandMultipolygon, [{
    key: "element",
    get: function get() {
      return this.multipolygon;
    }
  }]);

  return RubberbandMultipolygon;
}();


;// CONCATENATED MODULE: ./src/multipolygon/EditableMultipolygon.js
function EditableMultipolygon_typeof(obj) { "@babel/helpers - typeof"; return EditableMultipolygon_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, EditableMultipolygon_typeof(obj); }

function EditableMultipolygon_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function EditableMultipolygon_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? EditableMultipolygon_ownKeys(Object(source), !0).forEach(function (key) { EditableMultipolygon_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : EditableMultipolygon_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function EditableMultipolygon_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EditableMultipolygon_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EditableMultipolygon_createClass(Constructor, protoProps, staticProps) { if (protoProps) EditableMultipolygon_defineProperties(Constructor.prototype, protoProps); if (staticProps) EditableMultipolygon_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function EditableMultipolygon_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) EditableMultipolygon_setPrototypeOf(subClass, superClass); }

function EditableMultipolygon_setPrototypeOf(o, p) { EditableMultipolygon_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return EditableMultipolygon_setPrototypeOf(o, p); }

function EditableMultipolygon_createSuper(Derived) { var hasNativeReflectConstruct = EditableMultipolygon_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = EditableMultipolygon_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = EditableMultipolygon_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return EditableMultipolygon_possibleConstructorReturn(this, result); }; }

function EditableMultipolygon_possibleConstructorReturn(self, call) { if (call && (EditableMultipolygon_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return EditableMultipolygon_assertThisInitialized(self); }

function EditableMultipolygon_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function EditableMultipolygon_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function EditableMultipolygon_get() { if (typeof Reflect !== "undefined" && Reflect.get) { EditableMultipolygon_get = Reflect.get.bind(); } else { EditableMultipolygon_get = function _get(target, property, receiver) { var base = EditableMultipolygon_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return EditableMultipolygon_get.apply(this, arguments); }

function EditableMultipolygon_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = EditableMultipolygon_getPrototypeOf(object); if (object === null) break; } return object; }

function EditableMultipolygon_getPrototypeOf(o) { EditableMultipolygon_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return EditableMultipolygon_getPrototypeOf(o); }

function EditableMultipolygon_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function EditableMultipolygon_createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = EditableMultipolygon_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function EditableMultipolygon_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return EditableMultipolygon_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return EditableMultipolygon_arrayLikeToArray(o, minLen); }

function EditableMultipolygon_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




 // TODO optional: mask to dim the outside area
//import Mask from './MultipolygonMask';

var EditableMultipolygon_getPoints = function getPoints(shape) {
  // Could just be Array.from(shape.querySelector('.inner').points) but...
  // IE11 :-(
  var pointLists = getPointsFromPathValue(shape.querySelector('.a9s-inner').attributes.d.nodeValue);
  var pointArray = [];

  var _iterator = EditableMultipolygon_createForOfIteratorHelper(pointLists),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var pointList = _step.value;
      var points = [];

      var _iterator2 = EditableMultipolygon_createForOfIteratorHelper(pointList),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var point = _step2.value;
          var p = {
            x: parseFloat(point[0]),
            y: parseFloat(point[1])
          };
          points.push(p);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      pointArray.push(points);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return pointArray;
};

var getPointsFromPathValue = function getPointsFromPathValue(polygon) {
  var results = polygon.split('M');
  var allcoords = [];
  results.forEach(function (result, index) {
    if (result.length > 0) {
      var coords = [];
      result = result.replace(/ Z/g, "Z");
      result = result.replace(/Z /g, "Z");
      result = result.replace(/Z/g, "");
      result = result.replace(/L /g, "L");
      result = result.replace(/ L/g, "L");
      var coordsString = result.split("L");
      coordsString.forEach(function (coord, index) {
        coords.push([parseFloat(coord.split(",")[0]).toFixed(2).toString(), parseFloat(coord.split(",")[1]).toFixed(2).toString()]);
      });

      if (coords[0] !== coords[coords.length - 1]) {
        coords.push(coords[0]);
      }

      allcoords.push(coords);
    }
  });
  return allcoords;
};

var EditableMultipolygon_getBBox = function getBBox(shape) {
  return shape.querySelector('.a9s-inner').getBBox();
};

var svgFragmentToPoints = function svgFragmentToPoints(annotation) {
  var svgShape = svgFragmentToShape(annotation);
  var polygon = svgShape.getAttribute('d');
  var allcoords = getPointsFromPathValue(polygon);
  return allcoords; //svgShape.getAttribute('d')
  //  .split(' ') // Split x/y tuples
  //  .map(xy => xy.split(',').map(str => parseFloat(str.trim())));
};

var EditableMultipolygon_drawEmbeddedSVG = function drawEmbeddedSVG(annotation) {
  var shape = svgFragmentToShape(annotation); // Hack

  svgFragmentToPoints(annotation); // Because we're nitpicky, we don't just draw the shape,
  // but duplicate it, so we can have inner and an outer lines

  var g = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
  var inner = shape.cloneNode(true);
  inner.setAttribute('class', 'a9s-inner');
  var outer = shape.cloneNode(true);
  outer.setAttribute('class', 'a9s-outer');
  g.appendChild(outer);
  g.appendChild(inner);
  return g;
};
/**
 * An editable multipolygon drawing.
 */


var EditableMultipolygon = /*#__PURE__*/function (_EditableShape) {
  EditableMultipolygon_inherits(EditableMultipolygon, _EditableShape);

  var _super = EditableMultipolygon_createSuper(EditableMultipolygon);

  function EditableMultipolygon(_annotation, g, config, env) {
    var _thisSuper, _this;

    EditableMultipolygon_classCallCheck(this, EditableMultipolygon);

    _this = _super.call(this, _annotation, g, config, env);

    EditableMultipolygon_defineProperty(EditableMultipolygon_assertThisInitialized(_this), "setPoints", function (points) {
      var round = function round(num) {
        return Math.round(10 * num) / 10;
      };

      var str = "";

      var _iterator3 = EditableMultipolygon_createForOfIteratorHelper(points),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var pointList = _step3.value;
          str += "M";
          var first = true;

          var _iterator4 = EditableMultipolygon_createForOfIteratorHelper(pointList),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              var point = _step4.value;

              if (first) {
                first = false;
                str += point.x.toString() + "," + point.y.toString();
              } else {
                str += " L" + round(point.x).toString() + "," + round(point.y).toString();
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          str += " Z";
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var inner = _this.shape.querySelector('.a9s-inner');

      inner.setAttribute('d', str);

      var outer = _this.shape.querySelector('.a9s-outer');

      outer.setAttribute('d', str); // this.mask.redraw();

      var _outer$getBBox = outer.getBBox(),
          x = _outer$getBBox.x,
          y = _outer$getBBox.y,
          width = _outer$getBBox.width,
          height = _outer$getBBox.height;

      setFormatterElSize(_this.elementGroup, x, y, width, height);
    });

    EditableMultipolygon_defineProperty(EditableMultipolygon_assertThisInitialized(_this), "onGrab", function (grabbedElem) {
      return function (evt) {
        _this.grabbedElem = grabbedElem;

        var pos = _this.getSVGPoint(evt);

        _this.grabbedAt = {
          x: pos.x,
          y: pos.y
        };
      };
    });

    EditableMultipolygon_defineProperty(EditableMultipolygon_assertThisInitialized(_this), "onMouseMove", function (evt) {
      if (_this.grabbedElem) {
        (function () {
          var pos = _this.getSVGPoint(evt);

          if (_this.grabbedElem === _this.shape) {
            (function () {
              var dx = pos.x - _this.grabbedAt.x;
              var dy = pos.y - _this.grabbedAt.y;
              var pointList = EditableMultipolygon_getPoints(_this.shape);
              var updatedPoints = [];

              var _iterator5 = EditableMultipolygon_createForOfIteratorHelper(pointList),
                  _step5;

              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                  var points = _step5.value;
                  updatedPoints.push(points.map(function (pt) {
                    return {
                      x: pt.x + dx,
                      y: pt.y + dy
                    };
                  }));
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }

              _this.grabbedAt = pos;

              _this.setPoints(updatedPoints);

              var i = 0;

              for (var _i = 0, _updatedPoints = updatedPoints; _i < _updatedPoints.length; _i++) {
                var updatedPointsList = _updatedPoints[_i];
                updatedPointsList.forEach(function (pt, idx) {
                  if (_this.handles[i][idx] !== undefined) _this.setHandleXY(_this.handles[i][idx], pt.x, pt.y);
                });
                i += 1;
              }

              _this.emit('update', EditableMultipolygon_objectSpread(EditableMultipolygon_objectSpread({}, toSVGTarget(_this.shape, _this.env.image)), {}, {
                renderedVia: {
                  name: 'multipolygon'
                }
              }));
            })();
          } else {
            (function () {
              var handleIdx = -1;
              var pointListIDX = 0;
              var found = false;

              var _iterator6 = EditableMultipolygon_createForOfIteratorHelper(_this.handles),
                  _step6;

              try {
                for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                  var handle = _step6.value;

                  if (handle.indexOf(_this.grabbedElem) > 0) {
                    handleIdx = handle.indexOf(_this.grabbedElem);
                    found = true;
                  } else {
                    if (!found) {
                      pointListIDX += 1;
                    }
                  }
                }
              } catch (err) {
                _iterator6.e(err);
              } finally {
                _iterator6.f();
              }

              var pointList = EditableMultipolygon_getPoints(_this.shape);
              var updatedPoints = [];
              var updatedPointsIDX = 0;

              var _iterator7 = EditableMultipolygon_createForOfIteratorHelper(pointList),
                  _step7;

              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  var points = _step7.value;

                  if (updatedPointsIDX === pointListIDX) {
                    (function () {
                      var newPoints = [];
                      points.forEach(function (value, i) {
                        if (i === handleIdx) {
                          newPoints.push(pos);
                        } else {
                          newPoints.push(value);
                        }
                      });
                      updatedPoints.push(newPoints);
                    })();
                  } else {
                    updatedPoints.push(points);
                  }

                  updatedPointsIDX += 1;
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }

              _this.setPoints(updatedPoints);

              updatedPointsIDX = 0;

              var _iterator8 = EditableMultipolygon_createForOfIteratorHelper(_this.handles),
                  _step8;

              try {
                for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
                  var _handle = _step8.value;

                  if (updatedPointsIDX === pointListIDX) {
                    _this.setHandleXY(_handle[handleIdx], pos.x, pos.y);
                  }

                  updatedPointsIDX += 1;
                }
              } catch (err) {
                _iterator8.e(err);
              } finally {
                _iterator8.f();
              }

              _this.emit('update', EditableMultipolygon_objectSpread(EditableMultipolygon_objectSpread({}, toSVGTarget(_this.shape, _this.env.image)), {}, {
                renderedVia: {
                  name: 'multipolygon'
                }
              }));
            })();
          }
        })();
      }
    });

    EditableMultipolygon_defineProperty(EditableMultipolygon_assertThisInitialized(_this), "onMouseUp", function (evt) {
      _this.grabbedElem = null;
      _this.grabbedAt = null;
    });

    EditableMultipolygon_defineProperty(EditableMultipolygon_assertThisInitialized(_this), "updateState", function (annotation) {
      var points = EditableMultipolygon_getPoints(svgFragmentToShape(annotation));

      _this.setPoints(points);
    });

    EditableMultipolygon_defineProperty(EditableMultipolygon_assertThisInitialized(_this), "destroy", function () {
      _this.containerGroup.parentNode.removeChild(_this.containerGroup);

      EditableMultipolygon_get((_thisSuper = EditableMultipolygon_assertThisInitialized(_this), EditableMultipolygon_getPrototypeOf(EditableMultipolygon.prototype)), "destroy", _thisSuper).call(_thisSuper);
    });

    _this.svg.addEventListener('mousemove', _this.onMouseMove);

    _this.svg.addEventListener('mouseup', _this.onMouseUp); // SVG markup for this class looks like this:
    // 
    // <g>
    //   <path class="a9s-selection mask"... />
    //   <g> <-- return this node as .element
    //     <polygon class="a9s-outer" ... />
    //     <polygon class="a9s-inner" ... />
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //     ...
    //   </g> 
    // </g>
    // 'g' for the editable free drawing compound shape


    _this.containerGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    _this.shape = EditableMultipolygon_drawEmbeddedSVG(_annotation); // TODO optional: mask to dim the outside area
    // this.mask = new Mask(env.image, this.shape.querySelector('.a9s-inner'));
    // this.containerGroup.appendChild(this.mask.element);

    _this.elementGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');

    _this.elementGroup.setAttribute('class', 'a9s-annotation editable selected');

    _this.elementGroup.appendChild(_this.shape);

    var _pointList = EditableMultipolygon_getPoints(_this.shape);

    _this.handles = [];

    var _iterator9 = EditableMultipolygon_createForOfIteratorHelper(_pointList),
        _step9;

    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var points = _step9.value;

        _this.handles.push(points.map(function (pt) {
          var handle = _this.drawHandle(pt.x, pt.y);

          handle.addEventListener('mousedown', _this.onGrab(handle));

          _this.elementGroup.appendChild(handle);

          return handle;
        }));
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }

    _this.containerGroup.appendChild(_this.elementGroup);

    g.appendChild(_this.containerGroup);
    format(_this.shape, _annotation, config.formatter);

    _this.shape.querySelector('.a9s-inner').addEventListener('mousedown', _this.onGrab(_this.shape));

    var _getBBox = EditableMultipolygon_getBBox(_this.shape),
        _x = _getBBox.x,
        _y = _getBBox.y,
        _width = _getBBox.width,
        _height = _getBBox.height; // TODO optional: handles to stretch the shape

    /*    this.handles = [
          [ x, y ], 
          [ x + width, y ], 
          [ x + width, y + height ], 
          [ x, y + height ]
        ].map(t => { 
          const [ x, y ] = t;
          const handle = this.drawHandle(x, y);
    
          handle.addEventListener('mousedown', this.onGrab(handle));
          this.elementGroup.appendChild(handle);
    
          return handle;
        });*/
    // The grabbed element (handle or entire shape), if any


    _this.grabbedElem = null; // Mouse grab point

    _this.grabbedAt = null;
    return _this;
  }

  EditableMultipolygon_createClass(EditableMultipolygon, [{
    key: "element",
    get: function get() {
      return this.elementGroup;
    }
  }]);

  return EditableMultipolygon;
}(EditableShape);


;// CONCATENATED MODULE: ./src/multipolygon/RubberbandMultipolygonTool.js
function RubberbandMultipolygonTool_typeof(obj) { "@babel/helpers - typeof"; return RubberbandMultipolygonTool_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, RubberbandMultipolygonTool_typeof(obj); }

function RubberbandMultipolygonTool_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RubberbandMultipolygonTool_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RubberbandMultipolygonTool_createClass(Constructor, protoProps, staticProps) { if (protoProps) RubberbandMultipolygonTool_defineProperties(Constructor.prototype, protoProps); if (staticProps) RubberbandMultipolygonTool_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function RubberbandMultipolygonTool_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) RubberbandMultipolygonTool_setPrototypeOf(subClass, superClass); }

function RubberbandMultipolygonTool_setPrototypeOf(o, p) { RubberbandMultipolygonTool_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return RubberbandMultipolygonTool_setPrototypeOf(o, p); }

function RubberbandMultipolygonTool_createSuper(Derived) { var hasNativeReflectConstruct = RubberbandMultipolygonTool_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = RubberbandMultipolygonTool_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = RubberbandMultipolygonTool_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return RubberbandMultipolygonTool_possibleConstructorReturn(this, result); }; }

function RubberbandMultipolygonTool_possibleConstructorReturn(self, call) { if (call && (RubberbandMultipolygonTool_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return RubberbandMultipolygonTool_assertThisInitialized(self); }

function RubberbandMultipolygonTool_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function RubberbandMultipolygonTool_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function RubberbandMultipolygonTool_getPrototypeOf(o) { RubberbandMultipolygonTool_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return RubberbandMultipolygonTool_getPrototypeOf(o); }

function RubberbandMultipolygonTool_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * A rubberband selector for Multipolygon fragments.
 */

var RubberbandMultipolygonTool = /*#__PURE__*/function (_Tool) {
  RubberbandMultipolygonTool_inherits(RubberbandMultipolygonTool, _Tool);

  var _super = RubberbandMultipolygonTool_createSuper(RubberbandMultipolygonTool);

  function RubberbandMultipolygonTool(g, config, env) {
    var _this;

    RubberbandMultipolygonTool_classCallCheck(this, RubberbandMultipolygonTool);

    _this = _super.call(this, g, config, env);

    RubberbandMultipolygonTool_defineProperty(RubberbandMultipolygonTool_assertThisInitialized(_this), "startDrawing", function (x, y) {
      _this._isDrawing = true;

      _this.attachListeners({
        mouseMove: _this.onMouseMove,
        mouseUp: _this.onMouseUp,
        dblClick: _this.onDblClick
      });

      _this.rubberband = new RubberbandMultipolygon([x, y], _this.g, _this.env);
    });

    RubberbandMultipolygonTool_defineProperty(RubberbandMultipolygonTool_assertThisInitialized(_this), "stop", function () {
      _this.detachListeners();

      _this._isDrawing = false;

      if (_this.rubberband) {
        _this.rubberband.destroy();

        _this.rubberband = null;
      }
    });

    RubberbandMultipolygonTool_defineProperty(RubberbandMultipolygonTool_assertThisInitialized(_this), "undo", function () {
      if (_this.rubberband) {
        _this.rubberband.undo();
      }
    });

    RubberbandMultipolygonTool_defineProperty(RubberbandMultipolygonTool_assertThisInitialized(_this), "newPart", function () {
      if (_this.rubberband) {
        _this.rubberband.newPart();
      }
    });

    RubberbandMultipolygonTool_defineProperty(RubberbandMultipolygonTool_assertThisInitialized(_this), "onMouseMove", function (x, y) {
      return _this.rubberband.dragTo([x, y]);
    });

    RubberbandMultipolygonTool_defineProperty(RubberbandMultipolygonTool_assertThisInitialized(_this), "onMouseUp", function (x, y, evt) {
      if (evt.altKey) {
        _this.onDblClick(evt);
      } else if (evt.ctrlKey) {
        _this.rubberband.undo();
      } else {
        var _this$rubberband$getB = _this.rubberband.getBoundingClientRect(),
            width = _this$rubberband$getB.width,
            height = _this$rubberband$getB.height;

        var minWidth = _this.config.minSelectionWidth || 4;
        var minHeight = _this.config.minSelectionHeight || 4;

        if (width >= minWidth || height >= minHeight) {
          _this.rubberband.addPoint([x, y]);
        } else {
          _this.emit('cancel');

          _this.stop();
        }
      }
    });

    RubberbandMultipolygonTool_defineProperty(RubberbandMultipolygonTool_assertThisInitialized(_this), "onDblClick", function (x, y) {
      _this._isDrawing = false;

      _this.rubberband.addPoint([x, y]);

      var shape = _this.rubberband.element;
      shape.annotation = _this.rubberband.toSelection();

      _this.emit('complete', shape);

      _this.stop();
    });

    RubberbandMultipolygonTool_defineProperty(RubberbandMultipolygonTool_assertThisInitialized(_this), "createEditableShape", function (annotation) {
      return new EditableMultipolygon(annotation, _this.g, _this.config, _this.env);
    });

    _this._isDrawing = false;
    document.addEventListener('keydown', function (evt) {
      if (evt.key == "z" && evt.ctrlKey) {
        _this.undo();
      }

      if (evt.key == 'n') {
        _this.newPart();
      }
    });
    return _this;
  }

  RubberbandMultipolygonTool_createClass(RubberbandMultipolygonTool, [{
    key: "isDrawing",
    get: function get() {
      return this._isDrawing;
    }
  }]);

  return RubberbandMultipolygonTool;
}(Tool);


RubberbandMultipolygonTool.identifier = 'multipolygon';

RubberbandMultipolygonTool.supports = function (annotation) {
  return false;
};
;// CONCATENATED MODULE: ./src/line/LineMask.js
function LineMask_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function LineMask_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function LineMask_createClass(Constructor, protoProps, staticProps) { if (protoProps) LineMask_defineProperties(Constructor.prototype, protoProps); if (staticProps) LineMask_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function LineMask_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var LineMask = /*#__PURE__*/function () {
  function LineMask(imageDimensions, line) {
    var _this = this;

    LineMask_classCallCheck(this, LineMask);

    LineMask_defineProperty(this, "redraw", function () {
      _this.mask.setAttribute('d', "M0 0 h".concat(_this.w, " v").concat(_this.h, " h-").concat(_this.w, " z M").concat(_this.line.getAttribute('x1'), " ").concat(_this.line.getAttribute('y1'), " ").concat(_this.line.getAttribute('x2'), " ").concat(_this.line.getAttribute('y2'), "z"));
    });

    LineMask_defineProperty(this, "destroy", function () {
      return _this.mask.parentNode.removeChild(_this.mask);
    });

    this.w = imageDimensions.naturalWidth;
    this.h = imageDimensions.naturalHeight;
    this.line = line;
    this.mask = document.createElementNS(SVG_SVG_NAMESPACE, 'path');
    this.mask.setAttribute('fill-rule', 'evenodd');
    this.mask.setAttribute('class', 'a9s-selection-mask');
    this.mask.setAttribute('d', "M0 0 h".concat(this.w, " v").concat(this.h, " h-").concat(this.w, " z M").concat(this.line.getAttribute('x1'), " ").concat(this.line.getAttribute('y1'), " z"));
  }

  LineMask_createClass(LineMask, [{
    key: "element",
    get: function get() {
      return this.mask;
    }
  }]);

  return LineMask;
}();


;// CONCATENATED MODULE: ./src/line/RubberbandLine.js
function RubberbandLine_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function RubberbandLine_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? RubberbandLine_ownKeys(Object(source), !0).forEach(function (key) { RubberbandLine_defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : RubberbandLine_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function RubberbandLine_toConsumableArray(arr) { return RubberbandLine_arrayWithoutHoles(arr) || RubberbandLine_iterableToArray(arr) || RubberbandLine_unsupportedIterableToArray(arr) || RubberbandLine_nonIterableSpread(); }

function RubberbandLine_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function RubberbandLine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return RubberbandLine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return RubberbandLine_arrayLikeToArray(o, minLen); }

function RubberbandLine_iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function RubberbandLine_arrayWithoutHoles(arr) { if (Array.isArray(arr)) return RubberbandLine_arrayLikeToArray(arr); }

function RubberbandLine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function RubberbandLine_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RubberbandLine_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RubberbandLine_createClass(Constructor, protoProps, staticProps) { if (protoProps) RubberbandLine_defineProperties(Constructor.prototype, protoProps); if (staticProps) RubberbandLine_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function RubberbandLine_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * A 'rubberband' selection tool for creating Line drawing by
 * clicking and dragging.
 */

var RubberbandLine = /*#__PURE__*/function () {
  function RubberbandLine(anchor, g, env) {
    var _this = this;

    RubberbandLine_classCallCheck(this, RubberbandLine);

    RubberbandLine_defineProperty(this, "setPoints", function (points) {
      var attr = points; // set attribute for line svg element for outer and inner
      // example: <line x1="0" y1="80" x2="100" y2="20" stroke="black" />

      _this.outer.setAttribute('x1', attr[0]);

      _this.inner.setAttribute('x1', attr[0]);

      _this.outer.setAttribute('y1', attr[1]);

      _this.inner.setAttribute('y1', attr[1]);

      if (attr.length > 2) {
        _this.outer.setAttribute('x2', attr[2]);

        _this.inner.setAttribute('x2', attr[2]);

        _this.outer.setAttribute('y2', attr[3]);

        _this.inner.setAttribute('y2', attr[3]);
      }
    });

    RubberbandLine_defineProperty(this, "getBoundingClientRect", function () {
      return _this.outer.getBoundingClientRect();
    });

    RubberbandLine_defineProperty(this, "dragTo", function (xy) {
      // Make visible
      _this.group.style.display = null;
      _this.mousepos = xy; //console.log(xy);

      var rubberband = [].concat(RubberbandLine_toConsumableArray(_this.points), [xy[0], xy[1]]);

      _this.setPoints(rubberband);

      _this.mask.redraw();
    });

    RubberbandLine_defineProperty(this, "addPoint", function (xy) {
      // Don't add a new point if distance < 2 pixels
      if (_this.points.length <= 2) {
        _this.points[2] = xy[0];
        _this.points[3] = xy[1];

        _this.setPoints(_this.points);
      }
    });

    RubberbandLine_defineProperty(this, "undo", function () {
      if (_this.points[_this.points.length - 1].length > 2) {
        _this.points[_this.points.length - 1].pop();
      } else {
        if (_this.points.length > 1) {
          _this.points.pop();
        }
      }
    });

    RubberbandLine_defineProperty(this, "newPart", function () {
      _this.points.push([]);
    });

    RubberbandLine_defineProperty(this, "destroy", function () {
      _this.group.parentNode.removeChild(_this.group);

      _this.Line = null;
      _this.group = null;
    });

    RubberbandLine_defineProperty(this, "toSelection", function () {
      return new Selection(RubberbandLine_objectSpread(RubberbandLine_objectSpread({}, toSVGTarget(_this.group, _this.env.image)), {}, {
        renderedVia: {
          name: 'line'
        }
      }));
    });

    this.points = anchor; //this.points.push([ anchor, anchor ])

    this.env = env;
    this.group = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    this.Line = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    this.Line.setAttribute('class', 'a9s-selection');
    this.outer = document.createElementNS(SVG_SVG_NAMESPACE, 'line');
    this.outer.setAttribute('class', 'a9s-outer');
    this.inner = document.createElementNS(SVG_SVG_NAMESPACE, 'line');
    this.inner.setAttribute('class', 'a9s-inner');
    this.setPoints(this.points);
    this.mask = new LineMask(env.image, this.inner); // TODO optional: mask to dim the outside area
    // this.mask = new Mask(env.image, this.inner);

    this.Line.appendChild(this.outer);
    this.Line.appendChild(this.inner); // Additionally, selection remains hidden until 
    // the user actually moves the mouse

    this.group.style.display = 'none'; // TODO optional: mask to dim the outside area
    // this.group.appendChild(this.mask.element);

    this.group.appendChild(this.mask.element);
    this.group.appendChild(this.Line);
    g.appendChild(this.group);
  }

  RubberbandLine_createClass(RubberbandLine, [{
    key: "element",
    get: function get() {
      return this.Line;
    }
  }]);

  return RubberbandLine;
}();


;// CONCATENATED MODULE: ./src/line/EditableLine.js
function EditableLine_typeof(obj) { "@babel/helpers - typeof"; return EditableLine_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, EditableLine_typeof(obj); }

function EditableLine_slicedToArray(arr, i) { return EditableLine_arrayWithHoles(arr) || EditableLine_iterableToArrayLimit(arr, i) || EditableLine_unsupportedIterableToArray(arr, i) || EditableLine_nonIterableRest(); }

function EditableLine_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function EditableLine_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return EditableLine_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return EditableLine_arrayLikeToArray(o, minLen); }

function EditableLine_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function EditableLine_iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function EditableLine_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function EditableLine_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EditableLine_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EditableLine_createClass(Constructor, protoProps, staticProps) { if (protoProps) EditableLine_defineProperties(Constructor.prototype, protoProps); if (staticProps) EditableLine_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function EditableLine_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) EditableLine_setPrototypeOf(subClass, superClass); }

function EditableLine_setPrototypeOf(o, p) { EditableLine_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return EditableLine_setPrototypeOf(o, p); }

function EditableLine_createSuper(Derived) { var hasNativeReflectConstruct = EditableLine_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = EditableLine_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = EditableLine_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return EditableLine_possibleConstructorReturn(this, result); }; }

function EditableLine_possibleConstructorReturn(self, call) { if (call && (EditableLine_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return EditableLine_assertThisInitialized(self); }

function EditableLine_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function EditableLine_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function EditableLine_get() { if (typeof Reflect !== "undefined" && Reflect.get) { EditableLine_get = Reflect.get.bind(); } else { EditableLine_get = function _get(target, property, receiver) { var base = EditableLine_superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return EditableLine_get.apply(this, arguments); }

function EditableLine_superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = EditableLine_getPrototypeOf(object); if (object === null) break; } return object; }

function EditableLine_getPrototypeOf(o) { EditableLine_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return EditableLine_getPrototypeOf(o); }

function EditableLine_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var EditableLine_getPoints = function getPoints(shape) {
  // Could just be Array.from(shape.querySelector('.inner').points) but...
  // IE11 :-(
  var innerElement = shape.querySelector('.a9s-inner');
  var points = [[innerElement.x1.baseVal, innerElement.y1.baseVal], [innerElement.x2.baseVal, innerElement.y2.baseVal]];
  return points;
};

var EditableLine_getBBox = function getBBox(shape) {
  return shape.querySelector('.a9s-inner').getBBox();
};
/**
 * An editable line shape.
 */


var EditableLine = /*#__PURE__*/function (_EditableShape) {
  EditableLine_inherits(EditableLine, _EditableShape);

  var _super = EditableLine_createSuper(EditableLine);

  function EditableLine(_annotation, g, config, env) {
    var _thisSuper, _this;

    EditableLine_classCallCheck(this, EditableLine);

    _this = _super.call(this, _annotation, g, config, env);

    EditableLine_defineProperty(EditableLine_assertThisInitialized(_this), "onScaleChanged", function () {
      return _this.handles.map(_this.scaleHandle);
    });

    EditableLine_defineProperty(EditableLine_assertThisInitialized(_this), "setPoints", function (points) {
      // Not using .toFixed(1) because that will ALWAYS
      // return one decimal, e.g. "15.0" (when we want "15")
      var round = function round(num) {
        return Math.round(10 * num) / 10;
      };

      var x1 = points[0].x;
      var y1 = points[0].y;
      var x2 = points[1].x;
      var y2 = points[1].y;

      var inner = _this.shape.querySelector('.a9s-inner');

      inner.setAttribute('x1', x1);
      inner.setAttribute('y1', y1);
      inner.setAttribute('x2', x2);
      inner.setAttribute('y2', y2);

      var outer = _this.shape.querySelector('.a9s-outer');

      outer.setAttribute('x1', x1);
      outer.setAttribute('y1', y1);
      outer.setAttribute('x2', x2);
      outer.setAttribute('y2', y2);

      _this.mask.redraw();

      var _outer$getBBox = outer.getBBox(),
          x = _outer$getBBox.x,
          y = _outer$getBBox.y,
          width = _outer$getBBox.width,
          height = _outer$getBBox.height;

      setFormatterElSize(_this.elementGroup, x, y, width, height);
    });

    EditableLine_defineProperty(EditableLine_assertThisInitialized(_this), "onGrab", function (grabbedElem) {
      return function (evt) {
        if (evt.button !== 0) return; // left click

        _this.grabbedElem = grabbedElem;
        _this.grabbedAt = _this.getSVGPoint(evt);
      };
    });

    EditableLine_defineProperty(EditableLine_assertThisInitialized(_this), "onMouseMove", function (evt) {
      var constrain = function constrain(coord, delta, max) {
        return coord + delta < 0 ? -coord : coord + delta > max ? max - coord : delta;
      };

      if (_this.grabbedElem) {
        var pos = _this.getSVGPoint(evt);

        if (_this.grabbedElem === _this.shape) {
          var _getBBox = EditableLine_getBBox(_this.shape),
              x = _getBBox.x,
              y = _getBBox.y,
              width = _getBBox.width,
              height = _getBBox.height;

          var _this$env$image = _this.env.image,
              naturalWidth = _this$env$image.naturalWidth,
              naturalHeight = _this$env$image.naturalHeight;
          var dx = constrain(x, pos.x - _this.grabbedAt.x, naturalWidth - width);
          var dy = constrain(y, pos.y - _this.grabbedAt.y, naturalHeight - height);
          var updatedPoints = EditableLine_getPoints(_this.shape).map(function (pt) {
            return {
              x: pt[0].value + dx,
              y: pt[1].value + dy
            };
          });
          _this.grabbedAt = pos;

          _this.setPoints(updatedPoints);

          updatedPoints.forEach(function (pt, idx) {
            return _this.setHandleXY(_this.handles[idx], pt.x, pt.y);
          });

          _this.emit('update', toSVGTarget(_this.shape, _this.env.image));
        } else {
          var handleIdx = _this.handles.indexOf(_this.grabbedElem);

          var _updatedPoints = EditableLine_getPoints(_this.shape).map(function (pt, idx) {
            return idx === handleIdx ? pos : {
              'x': pt[0].value,
              'y': pt[1].value
            };
          });

          _this.setPoints(_updatedPoints);

          _this.setHandleXY(_this.handles[handleIdx], pos.x, pos.y);

          _this.emit('update', toSVGTarget(_this.shape, _this.env.image));
        }
      }
    });

    EditableLine_defineProperty(EditableLine_assertThisInitialized(_this), "onMouseUp", function (evt) {
      _this.grabbedElem = null;
      _this.grabbedAt = null;
    });

    EditableLine_defineProperty(EditableLine_assertThisInitialized(_this), "updateState", function (annotation) {
      var points = svgFragmentToShape(annotation).getAttribute('points').split(' ') // Split x/y tuples
      .map(function (xy) {
        var _xy$split$map = xy.split(',').map(function (str) {
          return parseFloat(str.trim());
        }),
            _xy$split$map2 = EditableLine_slicedToArray(_xy$split$map, 2),
            x = _xy$split$map2[0],
            y = _xy$split$map2[1];

        return {
          x: x,
          y: y
        };
      });

      _this.setPoints(points);

      points.forEach(function (pt, idx) {
        return _this.setHandleXY(_this.handles[idx], pt.x, pt.y);
      });
    });

    EditableLine_defineProperty(EditableLine_assertThisInitialized(_this), "destroy", function () {
      _this.containerGroup.parentNode.removeChild(_this.containerGroup);

      EditableLine_get((_thisSuper = EditableLine_assertThisInitialized(_this), EditableLine_getPrototypeOf(EditableLine.prototype)), "destroy", _thisSuper).call(_thisSuper);
    });

    _this.svg.addEventListener('mousemove', _this.onMouseMove);

    _this.svg.addEventListener('mouseup', _this.onMouseUp); // SVG markup for this class looks like this:
    //
    // <g>
    //   <path class="a9s-selection mask"... />
    //   <g> <-- return this node as .element
    //     <line class="a9s-outer" ... />
    //     <line class="a9s-inner" ... />
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //     <g class="a9s-handle" ...> ... </g>
    //     ...
    //   </g>
    // </g>
    // 'g' for the editable line shape


    _this.containerGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');
    _this.shape = drawEmbeddedSVG(_annotation);

    _this.shape.querySelector('.a9s-inner').addEventListener('mousedown', _this.onGrab(_this.shape));

    _this.mask = new LineMask(env.image, _this.shape.querySelector('.a9s-inner'));

    _this.containerGroup.appendChild(_this.mask.element);

    _this.elementGroup = document.createElementNS(SVG_SVG_NAMESPACE, 'g');

    _this.elementGroup.setAttribute('class', 'a9s-annotation editable selected');

    _this.elementGroup.setAttribute('data-id', _annotation.id);

    _this.elementGroup.appendChild(_this.shape);

    _this.handles = EditableLine_getPoints(_this.shape).map(function (pt) {
      var handle = _this.drawHandle(pt[0].value, pt[1].value);

      handle.addEventListener('mousedown', _this.onGrab(handle));

      _this.elementGroup.appendChild(handle);

      return handle;
    });

    _this.containerGroup.appendChild(_this.elementGroup);

    g.appendChild(_this.containerGroup);
    format(_this.shape, _annotation, config.formatters); // The grabbed element (handle or entire shape), if any

    _this.grabbedElem = null; // Mouse grab point

    _this.grabbedAt = null;
    return _this;
  }

  EditableLine_createClass(EditableLine, [{
    key: "element",
    get: function get() {
      return this.elementGroup;
    } // TODO: update this for line svg Attributes, currently not being used

  }]);

  return EditableLine;
}(EditableShape);


;// CONCATENATED MODULE: ./src/line/RubberbandLineTool.js
function RubberbandLineTool_typeof(obj) { "@babel/helpers - typeof"; return RubberbandLineTool_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, RubberbandLineTool_typeof(obj); }

function RubberbandLineTool_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function RubberbandLineTool_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function RubberbandLineTool_createClass(Constructor, protoProps, staticProps) { if (protoProps) RubberbandLineTool_defineProperties(Constructor.prototype, protoProps); if (staticProps) RubberbandLineTool_defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function RubberbandLineTool_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) RubberbandLineTool_setPrototypeOf(subClass, superClass); }

function RubberbandLineTool_setPrototypeOf(o, p) { RubberbandLineTool_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return RubberbandLineTool_setPrototypeOf(o, p); }

function RubberbandLineTool_createSuper(Derived) { var hasNativeReflectConstruct = RubberbandLineTool_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = RubberbandLineTool_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = RubberbandLineTool_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return RubberbandLineTool_possibleConstructorReturn(this, result); }; }

function RubberbandLineTool_possibleConstructorReturn(self, call) { if (call && (RubberbandLineTool_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return RubberbandLineTool_assertThisInitialized(self); }

function RubberbandLineTool_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function RubberbandLineTool_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function RubberbandLineTool_getPrototypeOf(o) { RubberbandLineTool_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return RubberbandLineTool_getPrototypeOf(o); }

function RubberbandLineTool_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/**
 * A rubberband selector for Line fragments.
 */

var RubberbandLineTool = /*#__PURE__*/function (_Tool) {
  RubberbandLineTool_inherits(RubberbandLineTool, _Tool);

  var _super = RubberbandLineTool_createSuper(RubberbandLineTool);

  function RubberbandLineTool(g, config, env) {
    var _this;

    RubberbandLineTool_classCallCheck(this, RubberbandLineTool);

    _this = _super.call(this, g, config, env);

    RubberbandLineTool_defineProperty(RubberbandLineTool_assertThisInitialized(_this), "startDrawing", function (x, y) {
      _this._isDrawing = true;

      _this.attachListeners({
        mouseMove: _this.onMouseMove,
        mouseUp: _this.onMouseUp
      });

      _this.rubberband = new RubberbandLine([x, y], _this.g, _this.env);
    });

    RubberbandLineTool_defineProperty(RubberbandLineTool_assertThisInitialized(_this), "stop", function () {
      _this.detachListeners();

      _this._isDrawing = false;

      if (_this.rubberband) {
        _this.rubberband.destroy();

        _this.rubberband = null;
      }
    });

    RubberbandLineTool_defineProperty(RubberbandLineTool_assertThisInitialized(_this), "undo", function () {
      if (_this.rubberband) {
        _this.rubberband.undo();
      }
    });

    RubberbandLineTool_defineProperty(RubberbandLineTool_assertThisInitialized(_this), "newPart", function () {
      if (_this.rubberband) {
        _this.rubberband.newPart();
      }
    });

    RubberbandLineTool_defineProperty(RubberbandLineTool_assertThisInitialized(_this), "onMouseMove", function (x, y) {
      return _this.rubberband.dragTo([x, y]);
    });

    RubberbandLineTool_defineProperty(RubberbandLineTool_assertThisInitialized(_this), "onMouseUp", function (x, y, evt) {
      if (evt.altKey) {
        _this.onDblClick(evt);
      } else if (evt.ctrlKey) {
        _this.rubberband.undo();
      } else {
        // TODO: see when this is useful
        // const { width, height } = this.rubberband.getBoundingClientRect();
        // const minWidth = this.config.minSelectionWidth || 4;
        // const minHeight = this.config.minSelectionHeight || 4;
        if (_this.rubberband.points.length == 2) {
          _this.rubberband.addPoint([x, y]); // check if both coordinates are same


          if (_this.rubberband.points[0] == _this.rubberband.points[2] && _this.rubberband.points[1] == _this.rubberband.points[3]) {
            _this.emit('cancel');

            _this.stop();
          } else {
            _this._isDrawing = false;
            var shape = _this.rubberband.element;
            shape.annotation = _this.rubberband.toSelection();

            _this.emit('complete', shape);

            _this.stop();
          }
        }
      }
    });

    RubberbandLineTool_defineProperty(RubberbandLineTool_assertThisInitialized(_this), "createEditableShape", function (annotation) {
      return new EditableLine(annotation, _this.g, _this.config, _this.env);
    });

    _this._isDrawing = false;
    document.addEventListener('keydown', function (evt) {
      if (evt.key == "z" && evt.ctrlKey) {
        _this.undo();
      }

      if (evt.key == 'n') {
        _this.newPart();
      }
    });
    return _this;
  }

  RubberbandLineTool_createClass(RubberbandLineTool, [{
    key: "isDrawing",
    get: function get() {
      return this._isDrawing;
    }
  }]);

  return RubberbandLineTool;
}(Tool);


RubberbandLineTool.identifier = 'line';

RubberbandLineTool.supports = function (annotation) {
  var _selector$value;

  var selector = annotation.selector('SvgSelector');
  if (selector) return (_selector$value = selector.value) === null || _selector$value === void 0 ? void 0 : _selector$value.match(/^<svg.*<line/g);
};
;// CONCATENATED MODULE: ./src/index.js






var ALL_TOOLS = new Set(['point', 'circle', 'ellipse', 'freehand', 'line' // 'multipolygon' // exclude from defaults for now
]);

var SelectorPack = function SelectorPack(anno, config) {
  // Add configured tools, or all
  var tools = config !== null && config !== void 0 && config.tools ? config.tools.map(function (t) {
    return t.toLowerCase();
  }) : ALL_TOOLS;
  tools.forEach(function (tool) {
    if (tool === 'point') anno.addDrawingTool(PointTool);
    if (tool === 'circle') anno.addDrawingTool(RubberbandCircleTool);
    if (tool === 'ellipse') anno.addDrawingTool(RubberbandEllipseTool);
    if (tool === 'freehand') anno.addDrawingTool(RubberbandFreehandTool);
    if (tool === 'multipolygon') anno.addDrawingTool(RubberbandMultipolygonTool);
    if (tool === 'line') anno.addDrawingTool(RubberbandLineTool);
  });
};

/* harmony default export */ const src = (SelectorPack);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=annotorious-selector-pack.js.map
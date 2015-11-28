(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pane"] = factory();
	else
		root["pane"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var pane = {
	    geom: {
	        Point: __webpack_require__(1)
	    },
	    utils: __webpack_require__(2),
	    Events: __webpack_require__(11),
	    Model: __webpack_require__(12),
	    Paper: __webpack_require__(18),
	    shapes: {
	        basic: {
	            Generic: __webpack_require__(23),
	            Rect: __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./shapes/basic/Rect\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	        }
	    }
	
	};
	
	module.exports = pane;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _commonUtils = __webpack_require__(2);
	
	var math = Math;
	var PI = math.PI;
	var abs = math.abs;
	var cos = math.cos;
	var sin = math.sin;
	var mmin = math.min;
	var mmax = math.max;
	var sqrt = math.sqrt;
	var atan2 = math.atan2;
	var _round = math.round;
	var floor = math.floor;
	var _random = math.random;
	
	var Point = (function () {
	    function Point() {
	        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	        _classCallCheck(this, Point);
	
	        var that = this;
	
	        that.x = x;
	        that.y = y;
	    }
	
	    _createClass(Point, [{
	        key: 'update',
	        value: function update() {
	            var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            var that = this;
	
	            that.x = x;
	            that.y = y;
	
	            return that;
	        }
	    }, {
	        key: 'translate',
	        value: function translate() {
	            var dx = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	            var dy = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	            var that = this;
	
	            that.x += dx;
	            that.y += dy;
	
	            return that;
	        }
	    }, {
	        key: 'round',
	        value: function round(precision) {
	
	            var that = this;
	
	            that.x = precision ? (0, _commonUtils.toFixed)(that.x, precision) : _round(that.x);
	            that.y = precision ? (0, _commonUtils.toFixed)(that.y, precision) : _round(that.y);
	
	            return that;
	        }
	    }, {
	        key: 'diff',
	        value: function diff(p) {
	            return new Point(this.x - p.x, this.y - p.y);
	        }
	    }, {
	        key: 'adhereToRect',
	        value: function adhereToRect(rect) {
	
	            // If point lies outside rectangle `rect`, return the nearest point on
	            // the boundary of rect `rect`, otherwise return point itself.
	
	            var that = this;
	            if (rect.containsPoint(that)) {
	                return that;
	            }
	
	            that.x = mmin(mmax(that.x, rect.x), rect.x + rect.width);
	            that.y = mmin(mmax(that.y, rect.y), rect.y + rect.height);
	
	            return that;
	        }
	    }, {
	        key: 'theta',
	        value: function theta(p) {
	
	            // Compute the angle between me and `p` and the x axis.
	            // (cartesian-to-polar coordinates conversion)
	            // Return theta angle in degrees.
	
	            // Invert the y-axis.
	            var y = -(p.y - this.y);
	            var x = p.x - this.x;
	            // Makes sure that the comparison with zero takes rounding errors into account.
	            var PRECISION = 10;
	            // Note that `atan2` is not defined for `x`, `y` both equal zero.
	            var rad = (0, _commonUtils.toFixed)(y, PRECISION) === 0 && (0, _commonUtils.toFixed)(x, PRECISION) === 0 ? 0 : atan2(y, x);
	
	            // Correction for III. and IV. quadrant.
	            if (rad < 0) {
	                rad = 2 * PI + rad;
	            }
	
	            return (0, _commonUtils.toDeg)(rad);
	        }
	    }, {
	        key: 'distance',
	        value: function distance(p) {
	
	            // Returns distance between me and point `p`.
	
	            var dx = p.x - this.x;
	            var dy = p.y - this.y;
	            return sqrt(dx * dx + dy * dy);
	        }
	    }, {
	        key: 'manhattanDistance',
	        value: function manhattanDistance(p) {
	
	            // Returns a manhattan (taxi-cab) distance between me and point `p`.
	
	            return abs(p.x - this.x) + abs(p.y - this.y);
	        }
	    }, {
	        key: 'normalize',
	        value: function normalize(len) {
	
	            // Scale the line segment between (0,0) and me to have a length of len.
	
	            var that = this;
	            var x = that.x;
	            var y = that.y;
	
	            if (x === 0 && y === 0) {
	                return that;
	            }
	
	            var l = len || 1;
	            var s;
	
	            if (x === 0) {
	                s = l / y;
	            } else if (y === 0) {
	                s = l / x;
	            } else {
	                s = l / that.distance(new Point());
	            }
	
	            that.x = s * x;
	            that.y = s * y;
	
	            return that;
	        }
	    }, {
	        key: 'toPolar',
	        value: function toPolar(o) {
	
	            // Converts rectangular to polar coordinates.
	            // An origin can be specified, otherwise it's `0 0`.
	
	            o = o && new Point(o) || new Point(0, 0);
	
	            var that = this;
	            var x = that.x;
	            var y = that.y;
	
	            that.x = sqrt((x - o.x) * (x - o.x) + (y - o.y) * (y - o.y)); // r
	            that.y = toRad(o.theta(point(x, y)));
	
	            return that;
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate(o, angle) {
	
	            // Rotate point by angle around origin o.
	
	            angle = (angle + 360) % 360;
	
	            var that = this;
	
	            that.toPolar(o);
	            that.y += toRad(angle);
	
	            var p = Point.fromPolar(that.x, that.y, o);
	
	            that.x = p.x;
	            that.y = p.y;
	            return that;
	        }
	    }, {
	        key: 'move',
	        value: function move(ref, distance) {
	
	            // Move point on line starting from ref
	            // ending at me by distance distance.
	            var that = this;
	            var rad = toRad(ref.theta(that));
	            return that.translate(cos(rad) * distance, -sin(rad) * distance);
	        }
	    }, {
	        key: 'reflect',
	        value: function reflect(ref) {
	
	            // Returns a point that is the reflection of me with
	            // the center of inversion in ref point.
	
	            return ref.move(this, this.distance(ref));
	        }
	    }, {
	        key: 'changeInAngle',
	        value: function changeInAngle(dx, dy, ref) {
	            // Returns change in angle from my previous position (-dx, -dy) to
	            // my new position relative to ref point.
	
	            // Revert the translation and measure the change in angle around x-axis.
	            return this.translate(-dx, -dy).theta(ref) - this.theta(ref);
	        }
	    }, {
	        key: 'snapToGrid',
	        value: function snapToGrid(gx, gy) {
	
	            var that = this;
	
	            that.x = (0, _commonUtils.snapToGrid)(that.x, gx);
	            that.y = (0, _commonUtils.snapToGrid)(that.y, gy || gx);
	
	            return that;
	        }
	    }, {
	        key: 'valueOf',
	        value: function valueOf() {
	            return [this.x, this.y];
	        }
	    }, {
	        key: 'toString',
	        value: function toString() {
	            return this.valueOf().join(', ');
	        }
	    }, {
	        key: 'equals',
	        value: function equals(p) {
	            return Point.equals(this, p);
	        }
	    }, {
	        key: 'clone',
	        value: function clone() {
	            return Point.fromPoint(this);
	        }
	    }], [{
	        key: 'equals',
	        value: function equals(p1, p2) {
	            return p1 && p2 && p1 instanceof Point && p2 instanceof Point && p1.x === p2.x && p1.y === p2.y;
	        }
	    }, {
	        key: 'fromPoint',
	        value: function fromPoint(p) {
	            return new Point(p.x, p.y);
	        }
	    }, {
	        key: 'fromString',
	        value: function fromString(str) {
	            var arr = str.split(str.indexOf('@') === -1 ? ' ' : '@');
	            return new Point((0, _commonUtils.toFloat)(arr[0]), (0, _commonUtils.toFloat)(arr[1]));
	        }
	    }, {
	        key: 'fromPolar',
	        value: function fromPolar(r, angle, o) {
	
	            // Alternative constructor, from polar coordinates.
	            // @param {number} r Distance.
	            // @param {number} angle Angle in radians.
	            // @param {point} [optional] o Origin.
	
	            o = o && point(o) || point(0, 0);
	            var x = abs(r * cos(angle));
	            var y = abs(r * sin(angle));
	            var deg = normalizeAngle((0, _commonUtils.toDeg)(angle));
	
	            if (deg < 90) {
	                y = -y;
	            } else if (deg < 180) {
	                x = -x;
	                y = -y;
	            } else if (deg < 270) {
	                x = -x;
	            }
	
	            return point(o.x + x, o.y + y);
	        }
	    }, {
	        key: 'random',
	        value: function random(x1, x2, y1, y2) {
	            // Create a point with random coordinates that fall
	            // into the range `[x1, x2]` and `[y1, y2]`.
	
	            var x = floor(_random() * (x2 - x1 + 1) + x1);
	            var y = floor(_random() * (y2 - y1 + 1) + y1);
	
	            return new Point(x, y);
	        }
	    }]);
	
	    return Point;
	})();
	
	exports['default'] = Point;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	var _utilsLang = __webpack_require__(3);
	
	_defaults(exports, _interopExportWildcard(_utilsLang, _defaults));
	
	var _utilsString = __webpack_require__(4);
	
	_defaults(exports, _interopExportWildcard(_utilsString, _defaults));
	
	var _utilsNumber = __webpack_require__(5);
	
	_defaults(exports, _interopExportWildcard(_utilsNumber, _defaults));
	
	var _utilsObject = __webpack_require__(6);
	
	_defaults(exports, _interopExportWildcard(_utilsObject, _defaults));
	
	var _utilsArray = __webpack_require__(7);
	
	_defaults(exports, _interopExportWildcard(_utilsArray, _defaults));
	
	var _utilsFunction = __webpack_require__(8);
	
	_defaults(exports, _interopExportWildcard(_utilsFunction, _defaults));
	
	var _utilsDom = __webpack_require__(9);
	
	_defaults(exports, _interopExportWildcard(_utilsDom, _defaults));
	
	var _utilsGeom = __webpack_require__(10);
	
	_defaults(exports, _interopExportWildcard(_utilsGeom, _defaults));

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var objProto = Object.prototype;
	var toString = objProto.toString;
	var hasOwn = objProto.hasOwnProperty;
	
	function isNull(obj) {
	    return obj === null;
	}
	
	function isUndefined(obj) {
	    return typeof obj === 'undefined';
	}
	
	function isString(obj) {
	    return typeof obj === 'string';
	}
	
	function isBoolean(obj) {
	    return typeof obj === 'boolean';
	}
	
	function isNullOrUndefined(obj) {
	    return isUndefined(obj) || isNull(obj);
	}
	
	function isType(obj, type) {
	    return toString.call(obj) === '[object ' + type + ']';
	}
	
	function isObject(obj) {
	    if (!obj) {
	        return false;
	    }
	
	    var type = typeof obj;
	
	    return type === 'function' || type === 'object';
	}
	
	function isFunction(obj) {
	    return isType(obj, 'Function');
	}
	
	function isWindow(obj) {
	    return obj && obj === obj.window;
	}
	
	function isArray(obj) {
	    return Array.isArray(obj);
	}
	
	function isArrayLike(obj) {
	    if (isArray(obj)) {
	        return true;
	    }
	
	    if (isFunction(obj) || isWindow(obj)) {
	        return false;
	    }
	
	    var length = !!obj && 'length' in obj && obj.length;
	
	    return length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
	}
	
	function isNumeric(obj) {
	    return !isArray(obj) && obj - parseFloat(obj) + 1 >= 0;
	}
	
	function isPlainObject(obj) {
	
	    // Not plain objects:
	    // - Any object or value whose internal [[Class]] property is not "[object Object]"
	    // - DOM nodes
	    // - window
	    if (!isObject(obj) || obj.nodeType || isWindow(obj)) {
	        return false;
	    }
	
	    if (obj.constructor && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
	        return false;
	    }
	
	    // If the function hasn't returned already, we're confident that
	    // |obj| is a plain object, created by {} or constructed with new Object
	    return true;
	}
	
	function isEmptyObject(obj) {
	    var name;
	    for (name in obj) {
	        return false;
	    }
	    return true;
	}
	
	exports.isNull = isNull;
	exports.isType = isType;
	exports.isArray = isArray;
	exports.isObject = isObject;
	exports.isString = isString;
	exports.isWindow = isWindow;
	exports.isBoolean = isBoolean;
	exports.isNumeric = isNumeric;
	exports.isFunction = isFunction;
	exports.isArrayLike = isArrayLike;
	exports.isUndefined = isUndefined;
	exports.isPlainObject = isPlainObject;
	exports.isEmptyObject = isEmptyObject;
	exports.isNullOrUndefined = isNullOrUndefined;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var proto = String.prototype;
	
	function toString(str) {
	    return '' + str;
	}
	
	function uc(str) {
	    return ('' + str).toUpperCase();
	}
	
	function lc(str) {
	    return ('' + str).toLowerCase();
	}
	
	function sanitizeText(text) {
	
	    // Replace all spaces with the Unicode No-break space.
	    // ref: http://www.fileformat.info/info/unicode/char/a0/index.htm
	    // IE would otherwise collapse all spaces into one. This is useful
	    // e.g. in tests when you want to compare the actual DOM text content
	    // without having to add the unicode character in the place of all spaces.
	
	    return (text || '').replace(/ /g, ' ');
	}
	
	function trim(str) {
	    return str ? proto.trim.call('' + str) : '';
	}
	
	exports.lc = lc;
	exports.uc = uc;
	exports.trim = trim;
	exports.toString = toString;
	exports.sanitizeText = sanitizeText;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function toInt(value) {
	    return parseInt(value, 10);
	}
	
	function toFloat(value) {
	    return parseFloat(value);
	}
	
	function toFixed(value, precision) {
	    var power = Math.pow(10, precision);
	    return toFloat((Math.round(value * power) / power).toFixed(precision));
	}
	
	exports.toInt = toInt;
	exports.toFloat = toFloat;
	exports.toFixed = toFixed;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _array = __webpack_require__(7);
	
	var _lang = __webpack_require__(3);
	
	function hasKey(obj, key) {
	    return obj !== null && Object.prototype.hasOwnProperty.call(obj, key);
	}
	
	function keys(obj) {
	    return obj ? Object.keys(obj) : [];
	}
	
	function forIn(obj, iterator, context) {
	    (0, _array.forEach)(keys(obj), function (key) {
	        iterator.call(context, obj[key], key);
	    });
	}
	
	function extend(target) {
	
	    if (!target) {
	        target = {};
	    }
	
	    for (var i = 1, l = arguments.length; i < l; i++) {
	        var source = arguments[i];
	
	        if (source) {
	            for (var key in source) {
	                target[key] = source[key];
	            }
	        }
	    }
	
	    return target;
	}
	
	function merge(target) {
	
	    if (!target) {
	        target = {};
	    }
	
	    for (var i = 1, l = arguments.length; i < l; i++) {
	
	        var source = arguments[i];
	        if (source) {
	            for (var name in source) {
	
	                var src = target[name];
	                var copy = source[name];
	                var copyIsArray = (0, _lang.isArray)(copy);
	
	                if (copyIsArray || (0, _lang.isPlainObject)(copy)) {
	
	                    var clone;
	                    if (copyIsArray) {
	                        clone = src && (0, _lang.isArray)(src) ? src : [];
	                    } else {
	                        clone = src && (0, _lang.isPlainObject)(src) ? src : {};
	                    }
	
	                    target[name] = merge(clone, copy);
	                } else {
	                    target[name] = copy;
	                }
	            }
	        }
	    }
	
	    return target;
	}
	
	exports.hasKey = hasKey;
	exports.keys = keys;
	exports.forIn = forIn;
	exports.merge = merge;
	exports.extend = extend;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _lang = __webpack_require__(3);
	
	var proto = Array.prototype;
	
	function toArray(obj) {
	    return (0, _lang.isArray)(obj) ? obj : (0, _lang.isArrayLike)(obj) ? proto.slice.call(obj) : [obj];
	}
	
	function indexOf(arr, item) {
	    return arr ? proto.indexOf.call(arr, item) : -1;
	}
	
	function lastIndexOf(arr, item) {
	    return arr ? proto.lastIndexOf.call(arr, item) : -1;
	}
	
	function every(arr, iterator, context) {
	    return arr ? proto.every.call(arr, iterator, context) : false;
	}
	
	function some(arr, iterator, context) {
	    return arr ? proto.some.call(arr, iterator, context) : false;
	}
	
	function forEach(arr, iterator, context) {
	    arr && proto.forEach.call(arr, iterator, context);
	}
	
	function map(arr, iterator, context) {
	    return arr ? proto.map.call(arr, iterator, context) : [];
	}
	
	function filter(arr, iterator, context) {
	    return arr ? proto.filter.call(arr, iterator, context) : [];
	}
	
	function reduce(arr, iterator, initialValue) {
	    return arr ? proto.reduce.call(arr, iterator, initialValue) : initialValue;
	}
	
	function reduceRight(arr, iterator, initialValue) {
	    return arr ? proto.reduceRight.call(arr, iterator, initialValue) : initialValue;
	}
	
	exports.toArray = toArray;
	exports.indexOf = indexOf;
	exports.lastIndexOf = lastIndexOf;
	exports.every = every;
	exports.some = some;
	exports.forEach = forEach;
	exports.map = map;
	exports.filter = filter;
	exports.reduce = reduce;
	exports.reduceRight = reduceRight;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _lang = __webpack_require__(3);
	
	function invoke(fn, args, context) {
	    if (!fn || !(0, _lang.isFunction)(fn)) {
	        return;
	    }
	
	    var ret;
	    var a1 = args[0];
	    var a2 = args[1];
	    var a3 = args[2];
	
	    switch (args.length) {
	        case 0:
	            ret = fn.call(context);
	            break;
	        case 1:
	            ret = fn.call(context, a1);
	            break;
	        case 2:
	            ret = fn.call(context, a1, a2);
	            break;
	        case 3:
	            ret = fn.call(context, a1, a2, a3);
	            break;
	        default:
	            ret = fn.apply(context, args);
	            break;
	    }
	
	    return ret;
	}
	
	function bind(fn, context /* [,arg1[,arg2[,argN]]] */) {
	    return (0, _lang.isFunction)(fn) ? Function.prototype.bind.apply(arguments) : fn;
	}
	
	exports.bind = bind;
	exports.invoke = invoke;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _lang = __webpack_require__(3);
	
	var _array = __webpack_require__(7);
	
	// xml namespaces.
	var ns = {
	    xmlns: 'http://www.w3.org/2000/svg',
	    xlink: 'http://www.w3.org/1999/xlink'
	};
	// svg version.
	var svgVersion = '1.1';
	
	function isNode(elem, nodeName, attrName, attrValue) {
	    var ret = elem && !isNaN(elem.nodeType);
	
	    if (ret) {
	        ret = isNullOrUndefined(nodeName) || getNodeName(elem) === nodeName.toLowerCase();
	    }
	
	    if (ret) {
	        ret = isNullOrUndefined(attrName) || elem.getAttribute(attrName) === attrValue;
	    }
	
	    return ret;
	}
	
	function getClassName(elem) {
	    return elem.getAttribute && elem.getAttribute('class') || '';
	}
	
	function getNodeName(elem) {
	    return elem.nodeName ? elem.nodeName.toLowerCase() : '';
	}
	
	function parseXML(str, async) {
	
	    var xml;
	
	    try {
	        var parser = new DOMParser();
	
	        if (!(0, _lang.isUndefined)(async)) {
	            parser.async = async;
	        }
	
	        xml = parser.parseFromString(str, 'text/xml');
	    } catch (error) {
	        xml = null;
	    }
	
	    if (!xml || xml.getElementsByTagName('parsererror').length) {
	        throw new Error('Invalid XML: ' + str);
	    }
	
	    return xml;
	}
	
	function createSvgDocument(content) {
	    // Create an SVG document element.
	    // If `content` is passed, it will be used as the SVG content of
	    // the `<svg>` root element.
	
	    var svg = '<svg xmlns="' + ns.xmlns + '" xmlns:xlink="' + ns.xmlns + '" version="' + svgVersion + '">' + (content || '') + '</svg>';
	    var xml = parseXML(svg, false);
	    return xml.documentElement;
	}
	
	function createSvgElement(tagName, doc) {
	    return (doc || document).createElementNS(ns.xmlns, tagName);
	}
	
	function setAttribute(elem, name, value) {
	
	    if (name === 'id') {
	        elem.id = value;
	    } else {
	
	        var combined = name.split(':');
	
	        combined.length > 1
	        // Attribute names can be namespaced. E.g. `image` elements
	        // have a `xlink:href` attribute to set the source of the image.
	        ? elem.setAttributeNS(ns[combined[0]], combined[1], value) : elem.setAttribute(name, value);
	    }
	}
	
	// parse transform
	// ---------------
	
	function parseTranslate(transform) {
	
	    var translate = { tx: 0, ty: 0 };
	
	    if (transform) {
	
	        var separator = /[ ,]+/;
	
	        var match = transform.match(/translate\((.*)\)/);
	        if (match) {
	            var arr = match[1].split(separator);
	
	            if (arr[0]) {
	                translate.tx += parseFloat(arr[0]);
	            }
	
	            if (arr[1]) {
	                translate.ty += parseFloat(arr[1]);
	            }
	        }
	    }
	
	    return translate;
	}
	
	function parseScale(transform) {
	
	    var scale = { sx: 1, sy: 1 };
	
	    if (transform) {
	
	        var separator = /[ ,]+/;
	
	        var match = transform.match(/scale\((.*)\)/);
	        if (match) {
	            var arr = match[1].split(separator);
	
	            if (arr[0]) {
	                scale.sx *= parseFloat(arr[0]);
	            }
	
	            if (arr[1] || arr[0]) {
	                scale.sy *= parseFloat(arr[1] || arr[0]);
	            }
	        }
	    }
	
	    return scale;
	}
	
	function parseRotate(transform) {
	
	    var rotate = { angle: 0 };
	
	    if (transform) {
	
	        var separator = /[ ,]+/;
	
	        var match = transform.match(/rotate\((.*)\)/);
	        if (match) {
	            var arr = match[1].split(separator);
	
	            if (arr[0]) {
	                rotate.angle += parseFloat(arr[0]);
	            }
	
	            if (arr[1] && arr[2]) {
	                rotate.cx = parseFloat(arr[1]);
	                rotate.cy = parseFloat(arr[2]);
	            }
	        }
	    }
	
	    return rotate;
	}
	
	function parseTransform(transform) {
	    return {
	        translate: parseTranslate(transform),
	        rotate: parseRotate(transform),
	        scale: parseScale(transform)
	    };
	}
	
	// path data
	// ---------
	
	function lineToPathData(line) {
	    return ['M', line.getAttribute('x1'), line.getAttribute('y1'), 'L', line.getAttribute('x2'), line.getAttribute('y2')].join(' ');
	}
	
	function polygonToPathData(polygon) {
	
	    var d = [];
	
	    (0, _array.forEach)(polygon.points, function (p, i) {
	        d.push(i === 0 ? 'M' : 'L', p.x, p.y);
	    });
	
	    d.push('Z');
	
	    return d.join(' ');
	}
	
	function polylineToPathData(polyline) {
	
	    var d = [];
	
	    (0, _array.forEach)(polyline.points, function (p, i) {
	        d.push(i === 0 ? 'M' : 'L', p.x, p.y);
	    });
	
	    return d.join(' ');
	}
	
	function rectToPathData(rect) {
	
	    var x = parseFloat(rect.getAttribute('x')) || 0;
	    var y = parseFloat(rect.getAttribute('y')) || 0;
	    var w = parseFloat(rect.getAttribute('width')) || 0;
	    var h = parseFloat(rect.getAttribute('height')) || 0;
	    var rx = parseFloat(rect.getAttribute('rx')) || 0;
	    var ry = parseFloat(rect.getAttribute('ry')) || 0;
	    var r = x + w;
	    var b = y + h;
	
	    var d;
	
	    if (!rx && !ry) {
	
	        d = ['M', x, y, 'H', r, 'V', b, 'H', x, 'V', y, 'Z'];
	    } else {
	
	        d = ['M', x + rx, y, 'L', r - rx, y, 'Q', r, y, r, y + ry, 'L', r, y + h - ry, 'Q', r, b, r - rx, b, 'L', x + rx, b, 'Q', x, b, x, b - rx, 'L', x, y + ry, 'Q', x, y, x + rx, y, 'Z'];
	    }
	    return d.join(' ');
	}
	
	var KAPPA = 0.5522847498307935;
	
	function circleToPathData(circle) {
	
	    var cx = parseFloat(circle.getAttribute('cx')) || 0;
	    var cy = parseFloat(circle.getAttribute('cy')) || 0;
	    var r = parseFloat(circle.getAttribute('r'));
	    var cd = r * KAPPA; // Control distance.
	
	    return ['M', cx, cy - r, // Move to the first point.
	    'C', cx + cd, cy - r, cx + r, cy - cd, cx + r, cy, // I. Quadrant.
	    'C', cx + r, cy + cd, cx + cd, cy + r, cx, cy + r, // II. Quadrant.
	    'C', cx - cd, cy + r, cx - r, cy + cd, cx - r, cy, // III. Quadrant.
	    'C', cx - r, cy - cd, cx - cd, cy - r, cx, cy - r, // IV. Quadrant.
	    'Z'].join(' ');
	}
	
	function ellipseToPathData(ellipse) {
	
	    var cx = parseFloat(ellipse.getAttribute('cx')) || 0;
	    var cy = parseFloat(ellipse.getAttribute('cy')) || 0;
	    var rx = parseFloat(ellipse.getAttribute('rx'));
	    var ry = parseFloat(ellipse.getAttribute('ry')) || rx;
	    var cdx = rx * KAPPA; // Control distance x.
	    var cdy = ry * KAPPA; // Control distance y.
	
	    return ['M', cx, cy - ry, // Move to the first point.
	    'C', cx + cdx, cy - ry, cx + rx, cy - cdy, cx + rx, cy, // I. Quadrant.
	    'C', cx + rx, cy + cdy, cx + cdx, cy + ry, cx, cy + ry, // II. Quadrant.
	    'C', cx - cdx, cy + ry, cx - rx, cy + cdy, cx - rx, cy, // III. Quadrant.
	    'C', cx - rx, cy - cdy, cx - cdx, cy - ry, cx, cy - ry, // IV. Quadrant.
	    'Z'].join(' ');
	}
	
	exports.isNode = isNode;
	exports.createSvgDocument = createSvgDocument;
	exports.createSvgElement = createSvgElement;
	exports.setAttribute = setAttribute;
	exports.getClassName = getClassName;
	exports.getNodeName = getNodeName;
	exports.parseScale = parseScale;
	exports.parseRotate = parseRotate;
	exports.parseTransform = parseTransform;
	exports.parseTranslate = parseTranslate;
	exports.lineToPathData = lineToPathData;
	exports.rectToPathData = rectToPathData;
	exports.circleToPathData = circleToPathData;
	exports.ellipseToPathData = ellipseToPathData;
	exports.polygonToPathData = polygonToPathData;
	exports.polylineToPathData = polylineToPathData;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var math = Math;
	var PI = math.PI;
	var round = math.round;
	
	function toDeg(rad) {
	    return 180 * rad / PI % 360;
	}
	
	function toRad(deg, over360) {
	    deg = over360 ? deg : deg % 360;
	    return deg * PI / 180;
	}
	
	function snapToGrid(val, gridSize) {
	    return gridSize * round(val / gridSize);
	}
	
	function normalizeAngle(angle) {
	    return angle % 360 + (angle < 0 ? 360 : 0);
	}
	
	exports.toDeg = toDeg;
	exports.toRad = toRad;
	exports.snapToGrid = snapToGrid;
	exports.normalizeAngle = normalizeAngle;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _commonUtils = __webpack_require__(2);
	
	var splitter = /\s+/;
	
	function triggerEvents(callbacks, args, context) {
	
	    var result = true;
	
	    for (var i = 0, l = callbacks.length; i < l; i += 2) {
	        result = (0, _commonUtils.invoke)(callbacks[i], args, callbacks[i + 1] || context) && result;
	    }
	
	    return result;
	}
	
	var Events = (function () {
	    function Events() {
	        _classCallCheck(this, Events);
	    }
	
	    _createClass(Events, [{
	        key: 'on',
	        value: function on(events, callback, context) {
	
	            var that = this;
	
	            if (!callback) {
	                return that;
	            }
	
	            var listeners = that.__events || (that.__events = {});
	
	            events = events.split(splitter);
	
	            (0, _commonUtils.forEach)(events, function (event) {
	                var list = listeners[event] || (listeners[event] = []);
	                list.push(callback, context);
	            });
	
	            return that;
	        }
	    }, {
	        key: 'once',
	        value: function once(events, callback, context) {
	
	            var that = this;
	            var cb = function cb() {
	                that.off(events, cb);
	                callback.apply(context || that, arguments);
	            };
	
	            return that.on(events, cb, context);
	        }
	    }, {
	        key: 'off',
	        value: function off(events, callback, context) {
	
	            var that = this;
	            var listeners = that.__events;
	
	            // No events.
	            if (!listeners) {
	                return that;
	            }
	
	            // removing *all* events.
	            if (!(events || callback || context)) {
	                delete that.__events;
	                return that;
	            }
	
	            events = events ? events.split(splitter) : (0, _commonUtils.keys)(listeners);
	
	            (0, _commonUtils.forEach)(events, function (event) {
	
	                var list = listeners[event];
	
	                if (!list) {
	                    return;
	                }
	
	                // remove all event.
	                if (!(callback || context)) {
	                    delete listeners[event];
	                    return;
	                }
	
	                for (var i = list.length - 2; i >= 0; i -= 2) {
	                    if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
	                        list.splice(i, 2);
	                    }
	                }
	            });
	
	            return that;
	        }
	    }, {
	        key: 'trigger',
	        value: function trigger(eventName) {
	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }
	
	            var that = this;
	            var listeners = that.__events;
	
	            // No events.
	            if (!listeners || !eventName) {
	                return null;
	            }
	
	            var result = true;
	            var commonCallbacks = listeners['*'];
	
	            (0, _commonUtils.forEach)(eventName.split(splitter), function (event) {
	
	                var callbacks;
	
	                if (event !== '*') {
	                    callbacks = listeners[event];
	                    if (callbacks) {
	                        triggerEvents(callbacks, args, that);
	                    }
	                }
	
	                if (commonCallbacks) {
	                    triggerEvents(commonCallbacks, [event].concat(args), that);
	                }
	            });
	
	            return result;
	        }
	    }]);
	
	    return Events;
	})();
	
	exports['default'] = Events;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _commonUtils = __webpack_require__(2);
	
	var _commonEvents = __webpack_require__(11);
	
	var _commonEvents2 = _interopRequireDefault(_commonEvents);
	
	var _cellsCell = __webpack_require__(13);
	
	var _cellsCell2 = _interopRequireDefault(_cellsCell);
	
	var _changesRootChange = __webpack_require__(14);
	
	var _changesRootChange2 = _interopRequireDefault(_changesRootChange);
	
	var _changesChildChange = __webpack_require__(16);
	
	var _changesChildChange2 = _interopRequireDefault(_changesChildChange);
	
	var _changesChangeCollection = __webpack_require__(17);
	
	var _changesChangeCollection2 = _interopRequireDefault(_changesChangeCollection);
	
	var Model = (function (_Events) {
	    _inherits(Model, _Events);
	
	    function Model(root) {
	        _classCallCheck(this, Model);
	
	        _get(Object.getPrototypeOf(Model.prototype), 'constructor', this).call(this);
	
	        var that = this;
	
	        that.nextId = 0;
	        that.updateLevel = 0;
	        that.endingUpdate = false;
	        that.changes = new _changesChangeCollection2['default'](that);
	
	        if (root) {
	            that.setRoot(root);
	        } else {
	            that.clear();
	        }
	    }
	
	    _createClass(Model, [{
	        key: 'clear',
	        value: function clear() {
	            return this.setRoot(this.createRoot());
	        }
	    }, {
	        key: 'getDefaultParent',
	        value: function getDefaultParent() {
	            return this.getRoot().getChildAt(0); // the first layer
	        }
	    }, {
	        key: 'isAncestor',
	        value: function isAncestor(parent, child) {
	
	            if (!parent || !child) {
	                return false;
	            }
	
	            while (child && child !== parent) {
	                child = child.parent;
	            }
	
	            return child === parent;
	        }
	    }, {
	        key: 'contains',
	        value: function contains(cell) {
	            return this.isAncestor(this.root, cell);
	        }
	    }, {
	        key: 'getCellById',
	        value: function getCellById(id) {
	            return this.cells ? this.cells[id] : null;
	        }
	    }, {
	        key: 'createCellId',
	        value: function createCellId() {
	            var that = this;
	            var id = that.nextId;
	
	            that.nextId += 1;
	
	            return 'cell-' + id;
	        }
	    }, {
	        key: 'getAncestors',
	        value: function getAncestors(child) {
	
	            var that = this;
	            var result = [];
	            var parent = child ? child.parent : null;
	
	            if (parent) {
	                result.push(parent);
	                result = result.concat(that.getAncestors(parent));
	            }
	
	            return result;
	        }
	    }, {
	        key: 'getDescendants',
	        value: function getDescendants(parent) {
	
	            var that = this;
	            var result = [];
	
	            parent = parent || that.getRoot();
	            parent.eachChild(function (child) {
	                result.push(child);
	                result = result.concat(that.getDescendants(child));
	            });
	
	            return result;
	        }
	    }, {
	        key: 'getParents',
	        value: function getParents(cells) {
	
	            var parents = [];
	
	            if (cells) {
	
	                var hash = {};
	
	                each(cells, function (cell) {
	                    var parent = cell.parent;
	
	                    if (parent) {
	                        var id = cellRoute.create(parent);
	
	                        if (!hash[id]) {
	                            hash[id] = parent;
	                            parents.push(parent);
	                        }
	                    }
	                });
	            }
	
	            return parents;
	        }
	
	        // root
	        // ----
	
	    }, {
	        key: 'isRoot',
	        value: function isRoot(cell) {
	            return cell && this.root === cell;
	        }
	    }, {
	        key: 'createRoot',
	        value: function createRoot() {
	            var root = new _cellsCell2['default']();
	
	            root.insertChild(this.createLayer());
	
	            return root;
	        }
	    }, {
	        key: 'getRoot',
	        value: function getRoot(cell) {
	
	            var root = cell || this.root;
	
	            if (cell) {
	                while (cell) {
	                    root = cell;
	                    cell = cell.parent;
	                }
	            }
	
	            return root;
	        }
	    }, {
	        key: 'setRoot',
	        value: function setRoot(root) {
	            return this.digest(new _changesRootChange2['default'](this, root));
	        }
	    }, {
	        key: 'rootChanged',
	        value: function rootChanged(newRoot) {
	
	            var that = this;
	            var oldRoot = that.root;
	
	            that.root = newRoot;
	            that.cells = null;
	            that.nextId = 0;
	            that.cellAdded(newRoot);
	
	            return oldRoot;
	        }
	
	        // Layers
	        // ------
	
	    }, {
	        key: 'isLayer',
	        value: function isLayer(cell) {
	            return cell && this.isRoot(cell.parent);
	        }
	    }, {
	        key: 'getLayers',
	        value: function getLayers() {
	            return this.getRoot().children || [];
	        }
	    }, {
	        key: 'createLayer',
	        value: function createLayer() {
	            return new _cellsCell2['default']();
	        }
	
	        // child
	        // -----
	
	    }, {
	        key: 'getParent',
	        value: function getParent(cell) {
	            return cell ? cell.parent : null;
	        }
	    }, {
	        key: 'addCell',
	        value: function addCell(child, parent, index) {
	            return this.addCells([child], parent, index);
	        }
	    }, {
	        key: 'addCells',
	        value: function addCells(cells, parent, index) {
	
	            var that = this;
	
	            parent = parent || that.getDefaultParent();
	            index = (0, _commonUtils.isNullOrUndefined)(index) ? parent.getChildCount() : index;
	
	            that.beginUpdate();
	
	            (0, _commonUtils.forEach)(cells, function (cell) {
	                if (cell && parent && cell !== parent) {
	                    that.digest(new _changesChildChange2['default'](that, parent, cell, index));
	                    index += 1;
	                } else {
	                    index -= 1;
	                }
	            });
	
	            that.endUpdate();
	
	            return that;
	        }
	    }, {
	        key: 'childChanged',
	        value: function childChanged(cell, newParent, newIndex) {
	
	            var that = this;
	            var oldParent = cell.parent;
	
	            if (newParent) {
	                if (newParent !== oldParent || oldParent.getChildIndex(cell) !== newIndex) {
	                    newParent.insertChild(cell, newIndex);
	                }
	            } else if (oldParent) {
	                oldParent.removeChild(cell);
	            }
	
	            // check if the previous parent was already in the
	            // model and avoids calling cellAdded if it was.
	            if (newParent && !that.contains(oldParent)) {
	                that.cellAdded(cell);
	            } else if (!newParent) {
	                that.cellRemoved(cell);
	            }
	
	            return oldParent;
	        }
	    }, {
	        key: 'linkChanged',
	        value: function linkChanged(link, newNode, isSource) {
	            var oldNode = link.getNode(isSource);
	
	            if (newNode) {
	                newNode.insertLink(link, isSource);
	            } else if (oldNode) {
	                oldNode.removeLink(link, isSource);
	            }
	
	            return oldNode;
	        }
	    }, {
	        key: 'cellAdded',
	        value: function cellAdded(cell) {
	
	            var that = this;
	
	            if (cell) {
	
	                var id = cell.id || that.createCellId(cell);
	
	                if (id) {
	
	                    // distinct
	                    var collision = that.getCellById(id);
	
	                    if (collision !== cell) {
	                        while (collision) {
	                            id = that.createCellId(cell);
	                            collision = that.getCellById(id);
	                        }
	
	                        // as lazy as possible
	                        if (!that.cells) {
	                            that.cells = {};
	                        }
	
	                        cell.id = id;
	                        that.cells[id] = cell;
	                    }
	                }
	
	                // fix nextId
	                if ((0, _commonUtils.isNumeric)(id)) {
	                    that.nextId = Math.max(that.nextId, id);
	                }
	
	                cell.eachChild(that.cellAdded, that);
	            }
	        }
	    }, {
	        key: 'updateLinkParents',
	        value: function updateLinkParents(cell, root) {
	
	            var that = this;
	
	            root = root || that.getRoot(cell);
	
	            // update links on children first
	            cell.eachChild(function (child) {
	                that.updateLinkParents(child, root);
	            });
	
	            // update the parents of all connected links
	            cell.eachLink(function (link) {
	                // update edge parent if edge and child have
	                // a common root node (does not need to be the
	                // model root node)
	                if (that.isAncestor(root, link)) {
	                    that.updateLinkParent(link, root);
	                }
	            });
	        }
	    }, {
	        key: 'updateLinkParent',
	        value: function updateLinkParent(link, root) {
	
	            var that = this;
	            var cell = null;
	            var source = link.getTerminal(true);
	            var target = link.getTerminal(false);
	
	            // use the first non-relative descendants of the source terminal
	            while (source && !source.isLink && source.geometry && source.geometry.relative) {
	                source = source.parent;
	            }
	
	            // use the first non-relative descendants of the target terminal
	            while (target && !target.isLink && target.geometry && target.geometry.relative) {
	                target = target.parent;
	            }
	
	            if (that.isAncestor(root, source) && that.isAncestor(root, target)) {
	
	                if (source === target) {
	                    cell = source.parent;
	                } else {
	                    cell = that.getNearestCommonAncestor(source, target);
	                }
	
	                if (cell && (cell.parent !== that.root || that.isAncestor(cell, link)) && link.parent !== cell) {
	
	                    var geo = link.geometry;
	
	                    if (geo) {
	                        var origin1 = that.getOrigin(link.parent);
	                        var origin2 = that.getOrigin(cell);
	
	                        var dx = origin2.x - origin1.x;
	                        var dy = origin2.y - origin1.y;
	
	                        geo = geo.clone();
	                        geo.translate(-dx, -dy);
	                        that.setGeometry(link, geo);
	                    }
	
	                    that.add(cell, link);
	                }
	            }
	        }
	    }, {
	        key: 'getNearestCommonAncestor',
	        value: function getNearestCommonAncestor(cell1, cell2) {
	
	            if (cell1 && cell2) {
	
	                var route1 = cellRoute.create(cell1);
	                var route2 = cellRoute.create(cell2);
	
	                if (route1 && route2) {
	
	                    var cell = cell1;
	                    var route = route2;
	                    var current = route1;
	
	                    if (route1.length > route2.length) {
	                        cell = cell2;
	                        route = route1;
	                        current = route2;
	                    }
	
	                    while (cell) {
	                        var parent = cell.parent;
	
	                        // check if the cell path is equal to the beginning of the given cell path
	                        if (route.indexOf(current + cellRoute.separator) === 0 && parent) {
	                            return cell;
	                        }
	
	                        cell = parent;
	                        current = cellRoute.getParentRoute(current);
	                    }
	                }
	            }
	
	            return null;
	        }
	
	        // get the absolute, accumulated origin for the children
	        // inside the given parent as an `Point`.
	    }, {
	        key: 'getOrigin',
	        value: function getOrigin(cell) {
	
	            var that = this;
	            var result = null;
	
	            if (cell) {
	                result = that.getOrigin(cell.parent);
	
	                if (!cell.isLink) {
	                    var geo = cell.geometry;
	
	                    if (geo) {
	                        result.x += geo.x;
	                        result.y += geo.y;
	                    }
	                }
	            } else {
	                result = new Point();
	            }
	
	            return result;
	        }
	    }, {
	        key: 'remove',
	        value: function remove(cell) {
	
	            var that = this;
	
	            if (cell) {
	                if (cell === that.root) {
	                    that.setRoot(null);
	                } else if (cell.parent) {
	                    that.digest(new _changesChildChange2['default'](that, null, cell));
	                }
	            }
	
	            return cell;
	        }
	    }, {
	        key: 'cellRemoved',
	        value: function cellRemoved(cell) {
	
	            var that = this;
	
	            if (cell) {
	
	                cell.eachChild(function (child) {
	                    that.cellRemoved(child);
	                });
	
	                var id = cell.id;
	                var cells = that.cells;
	                if (cells && id) {
	                    delete cells[id];
	                }
	            }
	        }
	    }, {
	        key: 'getChildNodes',
	        value: function getChildNodes(parent) {
	            return this.getChildCells(parent, true, false);
	        }
	    }, {
	        key: 'getChildLinks',
	        value: function getChildLinks(parent) {
	            return this.getChildCells(parent, false, true);
	        }
	    }, {
	        key: 'getChildCells',
	        value: function getChildCells(parent, isNode, isLink) {
	            return parent ? parent.filterChild(function (child) {
	                return isNode && child.isNode || isLink && child.isLink;
	            }) : [];
	        }
	
	        // update
	        // ------
	
	    }, {
	        key: 'digest',
	        value: function digest(change) {
	
	            var that = this;
	
	            change.digest();
	
	            that.beginUpdate();
	            that.changes.add(change);
	            that.endUpdate();
	
	            return that;
	        }
	    }, {
	        key: 'beginUpdate',
	        value: function beginUpdate() {
	
	            var that = this;
	
	            that.updateLevel += 1;
	            that.trigger('beginUpdate');
	
	            if (that.updateLevel === 1) {
	                that.trigger('startEdit');
	            }
	        }
	    }, {
	        key: 'endUpdate',
	        value: function endUpdate() {
	
	            var that = this;
	
	            that.updateLevel -= 1;
	
	            if (that.updateLevel === 0) {
	                that.trigger('endEdit');
	            }
	
	            if (!that.endingUpdate) {
	
	                var changeCollection = that.changes;
	
	                that.endingUpdate = that.updateLevel === 0;
	                that.trigger('endUpdate', changeCollection.changes);
	
	                // TODO: 如果此时还没有和 paper 关联, 所有的 changes 都将失效, 所以需要一种机制来管理
	
	                if (that.endingUpdate && changeCollection.hasChange()) {
	                    changeCollection.notify().clear();
	                }
	
	                that.endingUpdate = false;
	            }
	        }
	    }]);
	
	    return Model;
	})(_commonEvents2['default']);
	
	exports['default'] = Model;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _commonUtils = __webpack_require__(2);
	
	var _commonEvents = __webpack_require__(11);
	
	var _commonEvents2 = _interopRequireDefault(_commonEvents);
	
	var Cell = (function () {
	    function Cell(attributes) {
	        _classCallCheck(this, Cell);
	
	        var that = this;
	
	        that.attributes = (0, _commonUtils.merge)({}, that.defaults, attributes);
	        that.visible = true;
	    }
	
	    _createClass(Cell, [{
	        key: 'getPosition',
	        value: function getPosition() {}
	    }, {
	        key: 'getSize',
	        value: function getSize() {}
	    }, {
	        key: 'isNode',
	        value: function isNode() {
	            return false;
	        }
	    }, {
	        key: 'isLink',
	        value: function isLink() {
	            return false;
	        }
	
	        // link
	        // ----
	
	    }, {
	        key: 'getTerminal',
	        value: function getTerminal(isSource) {
	            return isSource ? this.source : this.target;
	        }
	    }, {
	        key: 'setTerminal',
	        value: function setTerminal(node, isSource) {
	            if (isSource) {
	                this.source = node;
	            } else {
	                this.target = node;
	            }
	
	            return node;
	        }
	    }, {
	        key: 'removeFromTerminal',
	        value: function removeFromTerminal(isSource) {
	
	            // remove link from node
	
	            var that = this;
	
	            var node = that.getTerminal(isSource);
	
	            if (node) {
	                node.removeLink(that, isSource);
	            }
	
	            return that;
	        }
	
	        // children
	        // --------
	
	    }, {
	        key: 'getChildCount',
	        value: function getChildCount() {
	            var children = this.children;
	            return children ? children.length : 0;
	        }
	    }, {
	        key: 'getChildIndex',
	        value: function getChildIndex(child) {
	            return (0, _commonUtils.indexOf)(this.children || [], child);
	        }
	    }, {
	        key: 'getChildAt',
	        value: function getChildAt(index) {
	            var children = this.children;
	            return children ? children[index] : null;
	        }
	    }, {
	        key: 'eachChild',
	        value: function eachChild(iterator, context) {
	
	            var that = this;
	            var children = that.children;
	
	            children && (0, _commonUtils.forEach)(children, iterator, context);
	
	            return that;
	        }
	    }, {
	        key: 'filterChild',
	        value: function filterChild(iterator, context) {
	            var children = this.children;
	            return children ? (0, _commonUtils.filter)(children, iterator, context) : [];
	        }
	    }, {
	        key: 'insertChild',
	        value: function insertChild(child, index) {
	            var that = this;
	
	            if (child) {
	
	                // fix index
	                if ((0, _commonUtils.isNullOrUndefined)(index)) {
	                    index = that.getChildCount();
	
	                    if (child.parent === that) {
	                        index--;
	                    }
	                }
	
	                child.removeFromParent();
	                child.parent = that;
	
	                var children = that.children;
	
	                if (children) {
	                    children.splice(index, 0, child);
	                } else {
	                    children = that.children = [];
	                    children.push(child);
	                }
	            }
	
	            return that;
	        }
	    }, {
	        key: 'removeChild',
	        value: function removeChild(child) {
	            return this.removeChildAt(this.getChildIndex(child));
	        }
	    }, {
	        key: 'removeChildAt',
	        value: function removeChildAt(index) {
	            var that = this;
	            var child = null;
	            var children = that.children;
	
	            if (children && index >= 0) {
	                child = that.getChildAt(index);
	
	                if (child) {
	                    children.splice(index, 1);
	                    child.parent = null;
	                }
	            }
	
	            return child;
	        }
	
	        // node
	        // -----
	
	    }, {
	        key: 'getLinkCount',
	        value: function getLinkCount() {
	            var links = this.links;
	            return links ? links.length : 0;
	        }
	    }, {
	        key: 'getLinkIndex',
	        value: function getLinkIndex(link) {
	            return (0, _commonUtils.indexOf)(this.links || [], link);
	        }
	    }, {
	        key: 'getLinkAt',
	        value: function getLinkAt(index) {
	            var links = this.links;
	            return links ? links[index] : null;
	        }
	    }, {
	        key: 'eachLink',
	        value: function eachLink(iterator, context) {
	
	            var that = this;
	            var links = that.links;
	
	            links && (0, _commonUtils.forEach)(links, iterator, context);
	
	            return that;
	        }
	    }, {
	        key: 'filterLink',
	        value: function filterLink(iterator, context) {
	            var links = this.links;
	            return links ? (0, _commonUtils.filter)(links, iterator, context) : [];
	        }
	    }, {
	        key: 'insertLink',
	        value: function insertLink(link, outgoing) {
	
	            var that = this;
	
	            if (link) {
	                link.removeFromTerminal(outgoing);
	                link.setTerminal(that, outgoing);
	
	                var links = that.links;
	
	                // 连线的起点和终点是同一个节点时，说明连线已经和节点关联，则不需要添加
	                if (!links || that.getLinkIndex(link) < 0 || link.getTerminal(!outgoing) !== that) {
	
	                    if (!links) {
	                        links = that.links = [];
	                    }
	
	                    links.push(link);
	                }
	            }
	
	            return link;
	        }
	    }, {
	        key: 'removeLink',
	        value: function removeLink(link, outgoing) {
	
	            var that = this;
	            var links = that.links;
	
	            if (link) {
	
	                // 连线的起点和终点是同一个节点时不需要移除
	                if (links && link.getTerminal(!outgoing) !== that) {
	                    var index = that.getLinkIndex(link);
	
	                    if (index >= 0) {
	                        links.splice(index, 1);
	                    }
	                }
	
	                link.setTerminal(null, outgoing);
	            }
	
	            return link;
	        }
	
	        // parent
	        // ------
	
	    }, {
	        key: 'getParent',
	        value: function getParent() {
	            return this.parent;
	        }
	    }, {
	        key: 'removeFromParent',
	        value: function removeFromParent() {
	
	            var that = this;
	            var parent = that.parent;
	
	            if (parent) {
	                parent.removeChild(that);
	            }
	
	            return that;
	        }
	
	        // common
	        // ------
	
	    }, {
	        key: 'valueOf',
	        value: function valueOf() {}
	    }, {
	        key: 'toString',
	        value: function toString() {}
	    }, {
	        key: 'clone',
	        value: function clone() {}
	    }, {
	        key: 'destroy',
	        value: function destroy() {}
	    }]);
	
	    return Cell;
	})();
	
	exports['default'] = Cell;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var RootChange = (function () {
	    function RootChange(model, root) {
	        _classCallCheck(this, RootChange);
	
	        var that = this;
	
	        that.model = model;
	        that.root = root;
	        that.previous = root;
	    }
	
	    _createClass(RootChange, [{
	        key: "digest",
	        value: function digest() {
	
	            var that = this;
	            var model = that.model;
	            var previous = that.previous;
	
	            that.root = previous;
	            that.previous = model.rootChanged(previous);
	
	            return that;
	        }
	    }]);
	
	    return RootChange;
	})();
	
	exports["default"] = RootChange;
	module.exports = exports["default"];

/***/ },
/* 15 */,
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ChildChange = (function () {
	    function ChildChange(model, parent, child, index) {
	        _classCallCheck(this, ChildChange);
	
	        var that = this;
	
	        that.model = model;
	        that.child = child;
	        that.parent = parent;
	        that.index = index;
	        that.previous = parent;
	        that.previousIndex = index;
	    }
	
	    _createClass(ChildChange, [{
	        key: "digest",
	        value: function digest() {
	
	            var that = this;
	            var model = that.model;
	            var child = that.child;
	            var newParent = that.previous;
	            var newIndex = that.previousIndex;
	            var oldParent = child.parent;
	            var oldIndex = oldParent ? oldParent.getChildIndex(child) : 0;
	
	            // 移除连线时，需要移除连线和节点的关联关系
	            if (!newParent) {
	                that.connect(child, false);
	            }
	
	            oldParent = model.childChanged(child, newParent, newIndex);
	
	            // 更新连线的父节点时，同时更新连线的关联节点
	            if (newParent) {
	                that.connect(child, true);
	            }
	
	            that.parent = newParent;
	            that.index = newIndex;
	            that.previous = oldParent;
	            that.previousIndex = oldIndex;
	
	            return that;
	        }
	    }, {
	        key: "connect",
	        value: function connect(cell, connected) {
	
	            var that = this;
	            var model = that.model;
	
	            if (cell.isLink()) {
	
	                var source = cell.getTerminal(true);
	                var target = cell.getTerminal(false);
	
	                if (source) {
	                    model.linkChanged(cell, connected ? source : null, true);
	                }
	
	                if (target) {
	                    model.linkChanged(cell, connected ? target : null, false);
	                }
	
	                cell.setTerminal(source, true);
	                cell.setTerminal(target, false);
	            }
	
	            cell.eachChild(function (child) {
	                that.connect(child, connected);
	            });
	
	            return that;
	        }
	    }]);
	
	    return ChildChange;
	})();
	
	exports["default"] = ChildChange;
	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var ChangeCollection = (function () {
	    function ChangeCollection(model) {
	        _classCallCheck(this, ChangeCollection);
	
	        this.model = model;
	    }
	
	    _createClass(ChangeCollection, [{
	        key: 'hasChange',
	        value: function hasChange() {
	            var changes = this.changes;
	            return changes && changes.length;
	        }
	    }, {
	        key: 'add',
	        value: function add(change) {
	
	            var that = this;
	            var changes = that.changes;
	
	            if (change) {
	
	                if (!changes) {
	                    changes = that.changes = [];
	                }
	
	                changes.push(change);
	            }
	
	            return change;
	        }
	    }, {
	        key: 'clear',
	        value: function clear() {
	            this.changes = null;
	            return this;
	        }
	    }, {
	        key: 'notify',
	        value: function notify() {
	
	            var that = this;
	
	            that.model.trigger('change', that.changes);
	
	            return that;
	        }
	    }]);
	
	    return ChangeCollection;
	})();
	
	exports['default'] = ChangeCollection;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x11, _x12, _x13) { var _again = true; _function: while (_again) { var object = _x11, property = _x12, receiver = _x13; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x11 = parent; _x12 = property; _x13 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _commonUtils = __webpack_require__(2);
	
	var _commonEvents = __webpack_require__(11);
	
	var _commonEvents2 = _interopRequireDefault(_commonEvents);
	
	var _commonVector = __webpack_require__(19);
	
	var _commonVector2 = _interopRequireDefault(_commonVector);
	
	var _Model = __webpack_require__(12);
	
	var _Model2 = _interopRequireDefault(_Model);
	
	var _viewsLinkView = __webpack_require__(20);
	
	var _viewsLinkView2 = _interopRequireDefault(_viewsLinkView);
	
	var _viewsNodeView = __webpack_require__(21);
	
	var _viewsNodeView2 = _interopRequireDefault(_viewsNodeView);
	
	var _changesRootChange = __webpack_require__(14);
	
	var _changesRootChange2 = _interopRequireDefault(_changesRootChange);
	
	var _changesChildChange = __webpack_require__(16);
	
	var _changesChildChange2 = _interopRequireDefault(_changesChildChange);
	
	// the default options for paper
	var OPTIONS = {
	    x: 0,
	    y: 0,
	    width: '100%',
	    height: '100%',
	    gridSize: 1,
	    viewportClassName: 'pane-viewport',
	    linkClassName: '',
	    nodeClassName: '',
	    getCellClassName: function getCellClassName(cell) {},
	    getView: function getView(cell) {}
	};
	
	var Paper = (function (_Events) {
	    _inherits(Paper, _Events);
	
	    function Paper(container, model, options) {
	        _classCallCheck(this, Paper);
	
	        _get(Object.getPrototypeOf(Paper.prototype), 'constructor', this).call(this);
	
	        var that = this;
	
	        that.model = model || new _Model2['default']();
	
	        that.configure(options);
	
	        if (container) {
	            that.init(container).setup().resize().translate();
	        }
	    }
	
	    // events
	    //  - paper:configure
	    //  - paper:init
	    //  - paper:setup
	    //  - paper:destroy
	    //  - paper:resize
	
	    _createClass(Paper, [{
	        key: 'configure',
	        value: function configure(options) {
	
	            var that = this;
	
	            that.options = (0, _commonUtils.merge)({}, OPTIONS, options);
	            that.trigger('paper:configure', that.options);
	
	            return that;
	        }
	
	        // lift cycle
	        // ----------
	
	    }, {
	        key: 'init',
	        value: function init(container) {
	
	            // create svg
	
	            var that = this;
	
	            if (container) {
	
	                var svg = (0, _commonVector2['default'])('svg');
	                var root = (0, _commonVector2['default'])('g');
	                var drawPane = (0, _commonVector2['default'])('g');
	
	                root.append(drawPane);
	                svg.append(root);
	                container.appendChild(svg.node);
	
	                that.container = container;
	                that.svg = svg.node;
	                that.root = root.node;
	                that.drawPane = drawPane.node;
	
	                that.trigger('paper:init', container);
	            }
	
	            return that;
	        }
	    }, {
	        key: 'setup',
	        value: function setup() {
	
	            // install event listeners.
	
	            var that = this;
	
	            that.model.on('change', that.processChanges, that);
	
	            that.trigger('paper:setup');
	
	            return that;
	        }
	    }, {
	        key: 'remove',
	        value: function remove() {}
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            var that = this;
	
	            that.trigger('paper:destroy');
	
	            return that;
	        }
	    }, {
	        key: 'revalidate',
	        value: function revalidate() {
	            return this.invalidate().validate();
	        }
	    }, {
	        key: 'clear',
	        value: function clear(cell) {
	            var force = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	            var recurse = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	            var that = this;
	            var model = that.model;
	
	            cell = cell || model.getRoot();
	
	            that.removeState(cell);
	
	            if (recurse && (force || cell !== that.currentRoot)) {
	                cell.eachChild(function (child) {
	                    that.clear(child, force, recurse);
	                });
	            } else {
	                that.invalidate(cell, true, true);
	            }
	
	            return that;
	        }
	    }, {
	        key: 'invalidate',
	        value: function invalidate(cell) {
	            var recurse = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	            var includeLink = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
	
	            var that = this;
	            var model = that.model;
	
	            cell = cell || model.getRoot();
	
	            var view = that.getView(cell);
	
	            if (view) {
	                view.invalid = true;
	            }
	
	            if (!cell.invalidating) {
	
	                cell.invalidating = true;
	
	                if (recurse) {
	                    cell.eachChild(function (child) {
	                        that.invalidate(child, recurse, includeLink);
	                    });
	                }
	
	                if (includeLink) {
	                    cell.eachLink(function (link) {
	                        that.invalidate(link, recurse, includeLink);
	                    });
	                }
	
	                cell.invalidating = false;
	            }
	
	            return that;
	        }
	    }, {
	        key: 'validate',
	        value: function validate(cell) {
	
	            var that = this;
	
	            cell = cell || that.model.getRoot();
	
	            that.validateCell(cell).validateView(cell);
	
	            return that;
	        }
	    }, {
	        key: 'validateCell',
	        value: function validateCell(cell) {
	            var visible = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	            // create or remove view for cell
	
	            var that = this;
	
	            if (cell) {
	
	                visible = visible && cell.isVisible();
	
	                var view = that.getView(cell, visible);
	
	                if (view && !visible) {
	                    that.removeView(cell);
	                }
	
	                cell.eachChild(function (child) {
	                    that.validateCell(child, visible);
	                });
	            }
	
	            return that;
	        }
	    }, {
	        key: 'validateView',
	        value: function validateView(cell) {
	            var recurse = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	            var that = this;
	
	            if (cell) {
	
	                var view = that.getView(cell);
	
	                if (view) {
	                    if (view.invalid) {
	                        view.invalid = false;
	
	                        that.validateView(cell.getParent(), recurse);
	
	                        // render
	                        that.renderView(cell);
	                    }
	                }
	
	                if (recurse) {
	                    cell.eachChild(function (child) {
	                        that.validateView(child, recurse);
	                    });
	                }
	            }
	
	            return that;
	        }
	
	        // transform
	        // ---------
	
	    }, {
	        key: 'resize',
	        value: function resize(width, height) {
	
	            var that = this;
	            var options = that.options;
	
	            width = options.width = width || options.width;
	            height = options.height = height || options.height;
	
	            (0, _commonVector2['default'])(that.svg).attr({ width: width, height: height });
	
	            that.trigger('paper:resize', width, height);
	
	            return that;
	        }
	    }, {
	        key: 'translate',
	        value: function translate(x, y, absolute) {
	
	            var that = this;
	            var options = that.options;
	
	            x = options.x = x || options.x;
	            y = options.y = y || options.y;
	
	            (0, _commonVector2['default'])(that.root).translate(x, y, absolute);
	
	            that.trigger('paper:translate', x, y);
	
	            return that;
	        }
	    }, {
	        key: 'translateTo',
	        value: function translateTo(x, y) {
	            return this.translate(x, y, true);
	        }
	    }, {
	        key: 'scale',
	        value: function scale(sx, sy) {
	            var ox = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	            var oy = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate(deg) {
	            var ox = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var oy = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	        }
	
	        // view
	        // ----
	
	    }, {
	        key: 'getView',
	        value: function getView(cell, create) {
	
	            var that = this;
	            var views = that.views;
	
	            if (cell) {
	                var view = views ? views[cell.id] : null;
	
	                if (!view && create && cell.visible) {
	                    view = that.createView(cell);
	                }
	
	                return view;
	            }
	        }
	    }, {
	        key: 'createView',
	        value: function createView(cell) {
	
	            var that = this;
	            var options = that.options;
	
	            // get view's constructor from options.
	            var ViewClass = options.getView.call(that, cell);
	
	            if (!ViewClass) {
	                ViewClass = cell.isLink() ? _viewsLinkView2['default'] : cell.isNode() ? _viewsNodeView2['default'] : null;
	            }
	
	            if (ViewClass) {
	
	                var view = new ViewClass(that, cell);
	                var views = that.views;
	
	                if (!views) {
	                    views = that.views = {};
	                }
	
	                views[cell.id] = view;
	
	                return view;
	            }
	        }
	    }, {
	        key: 'removeView',
	        value: function removeView(cell) {
	
	            var that = this;
	            var view = that.getView(cell);
	
	            if (view) {
	                delete that.views[cell.id];
	                view.destroy();
	            }
	
	            return that;
	        }
	    }, {
	        key: 'renderView',
	        value: function renderView(cell) {
	
	            var that = this;
	            var view = that.getView(cell);
	
	            if (view) {
	                view.render();
	            }
	        }
	
	        // changes
	        // -------
	
	    }, {
	        key: 'processChanges',
	        value: function processChanges(changes) {
	
	            var that = this;
	
	            console.log(changes);
	
	            (0, _commonUtils.forEach)(changes, function (change) {
	                that.distributeChange(change);
	            });
	
	            that.validate();
	
	            return that;
	        }
	    }, {
	        key: 'distributeChange',
	        value: function distributeChange(change) {
	
	            var that = this;
	
	            if (change instanceof _changesRootChange2['default']) {
	                that.onRootChanged(change);
	            } else if (change instanceof _changesChildChange2['default']) {
	                that.onChildChanged(change);
	            }
	
	            return that;
	        }
	    }, {
	        key: 'onRootChanged',
	        value: function onRootChanged(change) {}
	    }, {
	        key: 'onChildChanged',
	        value: function onChildChanged(change) {
	
	            var that = this;
	
	            var newParent = change.parent;
	            var oldParent = change.previous;
	
	            that.invalidate(change.child, true, true);
	
	            //if (newParent == null || this.isCellCollapsed(newParent)) {
	            //    this.view.invalidate(change.child, true, true);
	            //    this.removeStateForCell(change.child);
	            //
	            //    // Handles special case of current root of view being removed
	            //    if (this.view.currentRoot == change.child) {
	            //        this.home();
	            //    }
	            //}
	
	            if (newParent !== oldParent) {
	                // Refreshes the collapse/expand icons on the parents
	                if (newParent) {
	                    that.invalidate(newParent, false, false);
	                }
	
	                if (oldParent) {
	                    that.invalidate(oldParent, false, false);
	                }
	            }
	        }
	
	        // event handlers
	        // --------------
	
	    }, {
	        key: 'onPointerDown',
	        value: function onPointerDown(e) {}
	    }, {
	        key: 'onPointerMove',
	        value: function onPointerMove(e) {}
	    }, {
	        key: 'onPointerUp',
	        value: function onPointerUp(e) {}
	    }]);
	
	    return Paper;
	})(_commonEvents2['default']);
	
	exports['default'] = Paper;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	exports.VElement = VElement;
	
	var _commonUtils = __webpack_require__(2);
	
	var rclass = /[\t\r\n\f]/g;
	var rnotwhite = /\S+/g;
	
	function VElement(elem) {
	
	    if (elem instanceof VElement) {
	        elem = elem.node;
	    }
	
	    this.node = elem;
	}
	
	function vectorize(node) {
	    return new VElement(node);
	}
	
	function normalize(elem) {
	    return elem instanceof VElement ? elem.node : elem;
	}
	
	function createElement(elem, attrs, children) {
	
	    if (!elem) {
	        return null;
	    }
	
	    if ((0, _commonUtils.isObject)(elem)) {
	        return vectorize(elem);
	    }
	
	    if (elem.toLowerCase() === 'svg') {
	        return vectorize((0, _commonUtils.createSvgDocument)());
	    } else if (elem[0] === '<') {
	        var svgDoc = (0, _commonUtils.createSvgDocument)(elem);
	        if (svgDoc.childNodes.length > 1) {
	            return (0, _commonUtils.map)(svgDoc.childNodes, function (childNode) {
	                return vectorize(document.importNode(childNode, true));
	            });
	        }
	
	        return vectorize(document.importNode(svgDoc.firstChild, true));
	    }
	
	    // create svg node by tagName.
	    elem = (0, _commonUtils.createSvgElement)(elem);
	
	    // set attributes.
	    attrs && (0, _commonUtils.forIn)(attrs, function (attr, value) {
	        (0, _commonUtils.setAttribute)(elem, attr, value);
	    });
	
	    // append children.
	    if (children) {
	        children = (0, _commonUtils.isArray)(children) ? children : [children];
	
	        (0, _commonUtils.forEach)(children, function (child) {
	            elem.appendChild(child instanceof VElement ? child.node : child);
	        });
	    }
	
	    return vectorize(elem);
	}
	
	VElement.prototype = {
	
	    constructor: VElement,
	
	    attr: function attr(name, value) {
	
	        var that = this;
	        var node = that.node;
	        var length = arguments.length;
	
	        // Return all attributes.
	        if (!length) {
	            var attrs = {};
	            (0, _commonUtils.forEach)(node.attributes, function (attr) {
	                attrs[attr.nodeName] = attr.nodeValue;
	            });
	            return attrs;
	        }
	
	        if (length === 1) {
	            if ((0, _commonUtils.isObject)(name)) {
	                (0, _commonUtils.forIn)(name, function (attrValue, attrName) {
	                    (0, _commonUtils.setAttribute)(node, attrName, attrValue);
	                });
	            } else {
	                return node.getAttribute(name);
	            }
	        } else {
	            (0, _commonUtils.setAttribute)(node, name, value);
	        }
	
	        return that;
	    },
	
	    removeAttr: function removeAttr(name) {
	
	        var that = this;
	        var node = that.node;
	
	        if (node && name) {
	            node.removeAttribute(name);
	        }
	
	        return that;
	    },
	
	    text: function text() {},
	
	    hasClass: function hasClass(selector) {
	
	        var that = this;
	        var node = that.node;
	        var className = ' ' + selector + ' ';
	
	        if (node.nodeType === 1) {
	            return (' ' + (0, _commonUtils.getClassName)(node) + ' ').replace(rclass, ' ').indexOf(className) > -1;
	        }
	        return false;
	    },
	
	    addClass: function addClass(value) {
	
	        var that = this;
	        var node = that.node;
	
	        if ((0, _commonUtils.isFunction)(value)) {
	            return that.addClass(value.call(node, (0, _commonUtils.getClassName)(node)));
	        }
	
	        if (value && (0, _commonUtils.isString)(value) && node.nodeType === 1) {
	
	            var classes = value.match(rnotwhite) || [];
	            var oldValue = (' ' + (0, _commonUtils.getClassName)(node) + ' ').replace(rclass, ' ');
	            var newValue = (0, _commonUtils.reduce)(classes, function (ret, cls) {
	                if (ret.indexOf(' ' + cls + ' ') < 0) {
	                    ret += cls + ' ';
	                }
	                return ret;
	            }, oldValue);
	
	            newValue = (0, _commonUtils.trim)(newValue);
	            if (oldValue !== newValue) {
	                node.setAttribute('class', newValue);
	            }
	        }
	
	        return that;
	    },
	
	    removeClass: function removeClass(value) {
	
	        var that = this;
	        var node = that.node;
	
	        if ((0, _commonUtils.isFunction)(value)) {
	            return that.removeClass(value.call(node, (0, _commonUtils.getClassName)(node)));
	        }
	
	        if ((!value || (0, _commonUtils.isString)(value)) && node.nodeType === 1) {
	
	            var classes = (value || '').match(rnotwhite) || [];
	            var oldValue = (' ' + (0, _commonUtils.getClassName)(node) + ' ').replace(rclass, ' ');
	            var newValue = (0, _commonUtils.reduce)(classes, function (ret, cls) {
	                if (ret.indexOf(' ' + cls + ' ') > -1) {
	                    ret = ret.replace(' ' + cls + ' ', ' ');
	                }
	                return ret;
	            }, oldValue);
	
	            newValue = value ? (0, _commonUtils.trim)(newValue) : '';
	            if (oldValue !== newValue) {
	                node.setAttribute('class', newValue);
	            }
	        }
	
	        return that;
	    },
	
	    toggleClass: function toggleClass(value, stateVal) {
	
	        var that = this;
	        var node = that.node;
	
	        if ((0, _commonUtils.isBoolean)(stateVal) && (0, _commonUtils.isString)(value)) {
	            return stateVal ? that.addClass(value) : that.removeClass(value);
	        }
	
	        if ((0, _commonUtils.isFunction)(value)) {
	            return that.toggleClass(value.call(node, (0, _commonUtils.getClassName)(node), stateVal), stateVal);
	        }
	
	        if (value && (0, _commonUtils.isString)(value)) {
	            var classes = value.match(rnotwhite) || [];
	            (0, _commonUtils.forEach)(classes, function (cls) {
	                that.hasClass(cls) ? that.removeClass(cls) : that.addClass(cls);
	            });
	        }
	
	        return that;
	    },
	
	    remove: function remove() {
	
	        var that = this;
	        var node = that.node;
	
	        if (node && node.parentNode) {
	            node.parentNode.removeChild(node);
	        }
	
	        return that;
	    },
	
	    empty: function empty() {
	
	        var that = this;
	        var node = that.node;
	
	        if (node) {
	            while (node.lastChild) {
	                node.removeChild(node.lastChild);
	            }
	        }
	
	        return that;
	    },
	
	    append: function append(elem) {
	
	        var that = this;
	
	        elem && (0, _commonUtils.forEach)((0, _commonUtils.toArray)(elem), function (item) {
	            that.node.appendChild(normalize(item));
	        });
	
	        return that;
	    },
	
	    prepend: function prepend(elem) {
	
	        var that = this;
	        var node = that.node;
	
	        elem && node.insertBefore(normalize(elem), node.firstChild);
	
	        return that;
	    },
	
	    appendTo: function appendTo(elem) {
	        //elem.appendChild(this.node);
	        //return this;
	    },
	
	    prependTo: function prependTo(elem) {},
	
	    before: function before(elem) {},
	
	    after: function after(elem) {},
	
	    getSVGElement: function getSVGElement() {
	        var that = this;
	        var node = that.node;
	
	        return node instanceof window.SVGSVGElement ? that : vectorize(node.ownerSVGElement);
	    },
	
	    getDefs: function getDefs() {
	        var defs = this.svg().node.getElementsByTagName('defs');
	        return defs && defs.length ? vectorize(defs[0]) : null;
	    },
	
	    clone: function clone() {
	        var node = this.node;
	
	        var cloned = vectorize(node.cloneNode(true));
	
	        if (node.id) {
	            cloned.node.removeAttribute('id');
	        }
	        return cloned;
	    },
	
	    find: function find(selector) {
	        return (0, _commonUtils.map)(this.node.querySelectorAll(selector), vectorize);
	    },
	
	    findOne: function findOne(selector) {
	        var found = this.node.querySelector(selector);
	        return found ? vectorize(found) : null;
	    },
	
	    findParent: function findParent(className, terminator) {
	
	        var node = this.node;
	        var stop = terminator || node.ownerSVGElement;
	
	        node = node.parentNode;
	
	        while (node && node !== stop) {
	            var vElem = vectorize(node);
	            if (vElem.hasClass(className)) {
	                return vElem;
	            }
	
	            node = node.parentNode;
	        }
	
	        return null;
	    },
	
	    index: function index() {
	
	        var index = 0;
	        var node = this.node.previousSibling;
	
	        while (node) {
	            // nodeType 1 for ELEMENT_NODE
	            if (node.nodeType === 1) {
	                index++;
	            }
	            node = node.previousSibling;
	        }
	
	        return index;
	    },
	
	    translate: function translate(tx, ty, relative) {
	
	        var that = this;
	        var transformAttr = that.attr('transform') || '';
	        var translate = (0, _commonUtils.parseTranslate)(transformAttr);
	
	        if (!arguments.length) {
	            return translate;
	        }
	
	        transformAttr = (0, _commonUtils.trim)(transformAttr.replace(/translate\([^\)]*\)/g, ''));
	
	        var dx = relative ? translate.tx + tx : tx;
	        var dy = relative ? translate.ty + ty : ty;
	
	        var newTranslate = 'translate(' + dx + ',' + dy + ')';
	
	        return that.attr('transform', newTranslate + ' ' + transformAttr);
	    },
	
	    rotate: function rotate(angle, cx, cy, relative) {
	
	        var transformAttr = that.attr('transform') || '';
	        var rotate = (0, _commonUtils.parseRotate)(transformAttr);
	
	        if (!arguments.length) {
	            return rotate;
	        }
	
	        transformAttr = (0, _commonUtils.trim)(transformAttr.replace(/rotate\([^\)]*\)/g, ''));
	
	        angle %= 360;
	
	        var newAngle = relative ? rotate.angle + angle : angle;
	        var newOrigin = (0, _commonUtils.isUndefined)(cx) || (0, _commonUtils.isUndefined)(cy) ? '' : ',' + cx + ',' + cy;
	        var newRotate = 'rotate(' + newAngle + newOrigin + ')';
	
	        return this.attr('transform', transformAttr + ' ' + newRotate);
	    },
	
	    scale: function scale(sx, sy, relative) {
	
	        var transformAttr = this.attr('transform') || '';
	        var scale = (0, _commonUtils.parseScale)(transformAttr);
	        var length = arguments.length;
	
	        if (!length) {
	            return scale;
	        }
	
	        transformAttr = (0, _commonUtils.trim)(transformAttr.replace(/scale\([^\)]*\)/g, ''));
	
	        if (length === 1) {
	            sy = sx;
	        } else if (length === 2) {
	            if ((0, _commonUtils.isBoolean)(sy)) {
	                relative = sy;
	                sy = sx;
	            }
	        }
	
	        sx = relative ? scale.sx * sx : sx;
	        sy = relative ? scale.sy * sy : sy;
	
	        var newScale = 'scale(' + sx + ',' + sy + ')';
	
	        return this.attr('transform', transformAttr + ' ' + newScale);
	    },
	
	    bbox: function bbox(withoutTransformations, target) {
	        // Get SVGRect that contains coordinates and dimension of the real
	        // bounding box, i.e. after transformations are applied.
	        // If `target` is specified, bounding box will be computed
	        // relatively to `target` element.
	
	        var that = this;
	        var node = that.node;
	
	        // If the element is not in the live DOM, it does not have a bounding
	        // box defined and so fall back to 'zero' dimension element.
	        if (!node.ownerSVGElement) {
	            return {
	                x: 0,
	                y: 0,
	                width: 0,
	                height: 0
	            };
	        }
	
	        var box;
	        try {
	            box = node.getBBox();
	            // We are creating a new object as the standard says that you can't
	            // modify the attributes of a bbox.
	            box = {
	                x: box.x,
	                y: box.y,
	                width: box.width,
	                height: box.height
	            };
	        } catch (e) {
	            // Fallback for IE.
	            box = {
	                x: node.clientLeft,
	                y: node.clientTop,
	                width: node.clientWidth,
	                height: node.clientHeight
	            };
	        }
	
	        if (withoutTransformations) {
	            return box;
	        }
	
	        var matrix = node.getTransformToElement(target || node.ownerSVGElement);
	
	        return V.transformRect(box, matrix);
	    },
	
	    toLocalPoint: function toLocalPoint(x, y) {
	        // Convert global point into the coordinate space of this element.
	
	    },
	
	    translateCenterToPoint: function translateCenterToPoint() {},
	
	    translateAndAutoOrient: function translateAndAutoOrient() {},
	
	    animateAlongPath: function animateAlongPath() {},
	
	    sample: function sample(interval) {
	
	        // Interpolate path by discrete points.
	        // The precision of the sampling is controlled by `interval`.
	        // In other words, `sample()` will generate a point on the path
	        // starting at the beginning of the path going to the end every
	        // `interval` pixels.
	        // The sampler can be very useful. E.g. finding intersection between
	        // two paths (finding the two closest points from two samples).
	
	        // `path.getTotalLength()`
	        // Returns the computed value for the total length of the path using
	        // the browser's distance-along-a-path algorithm, as a distance in the
	        // current user coordinate system.
	
	        // `path.getPointAtLength(distance)`
	        // Returns the (x,y) coordinate in user space which is distance units
	        // along the path, utilizing the browser's distance-along-a-path algorithm.
	
	        interval = interval || 1;
	
	        var node = this.node;
	        var length = node.getTotalLength();
	        var distance = 0;
	        var samples = [];
	        var sample;
	
	        while (distance < length) {
	            sample = node.getPointAtLength(distance);
	            samples.push({ x: sample.x, y: sample.y, distance: distance });
	            distance += interval;
	        }
	
	        return samples;
	    },
	
	    toPath: function toPath() {
	
	        var that = this;
	        var path = vectorize((0, _commonUtils.createSvgElement)('path'));
	        var d = that.toPathData();
	
	        path.attr(that.attr());
	
	        d && path.attr('d', d);
	
	        return path;
	    },
	
	    toPathData: function toPathData() {
	
	        var that = this;
	        var node = that.node;
	        var tagName = node.tagName.toUpperCase();
	
	        switch (tagName) {
	            case 'PATH':
	                return that.attr('d');
	            case 'LINE':
	                return (0, _commonUtils.lineToPathData)(node);
	            case 'POLYGON':
	                return (0, _commonUtils.polygonToPathData)(node);
	            case 'POLYLINE':
	                return (0, _commonUtils.polylineToPathData)(node);
	            case 'ELLIPSE':
	                return (0, _commonUtils.ellipseToPathData)(node);
	            case 'CIRCLE':
	                return (0, _commonUtils.circleToPathData)(node);
	            case 'RECT':
	                return (0, _commonUtils.rectToPathData)(node);
	        }
	
	        throw new Error(tagName + ' cannot be converted to PATH.');
	    },
	
	    findIntersection: function findIntersection(ref, target) {
	
	        // Find the intersection of a line starting in the center
	        // of the SVG `node` ending in the point `ref`.
	        // `target` is an SVG element to which `node`s transformations are relative to.
	        // In JointJS, `target` is the `paper.viewport` SVG group element.
	        // Note that `ref` point must be in the coordinate system of the `target` for this function to work properly.
	        // Returns a point in the `target` coordinate system (the same system as `ref` is in) if
	        // an intersection is found. Returns `undefined` otherwise.
	
	        var that = this;
	        var svg = that.svg().node;
	
	        target = target || svg;
	
	        var bbox = g.rect(this.bbox(false, target));
	        var center = bbox.getCenter();
	        var spot = bbox.intersectionWithLineFromCenterToPoint(ref);
	
	        if (!spot) {
	            return undefined;
	        }
	
	        var tagName = this.node.localName.toUpperCase();
	
	        // Little speed up optimalization for `<rect>` element. We do not do conversion
	        // to path element and sampling but directly calculate the intersection through
	        // a transformed geometrical rectangle.
	        if (tagName === 'RECT') {
	
	            var gRect = g.rect(parseFloat(this.attr('x') || 0), parseFloat(this.attr('y') || 0), parseFloat(this.attr('width')), parseFloat(this.attr('height')));
	            // Get the rect transformation matrix with regards to the SVG document.
	            var rectMatrix = this.node.getTransformToElement(target);
	            // Decompose the matrix to find the rotation angle.
	            var rectMatrixComponents = V.decomposeMatrix(rectMatrix);
	            // Now we want to rotate the rectangle back so that we
	            // can use `intersectionWithLineFromCenterToPoint()` passing the angle as the second argument.
	            var resetRotation = svg.createSVGTransform();
	            resetRotation.setRotate(-rectMatrixComponents.rotation, center.x, center.y);
	            var rect = V.transformRect(gRect, resetRotation.matrix.multiply(rectMatrix));
	            spot = g.rect(rect).intersectionWithLineFromCenterToPoint(ref, rectMatrixComponents.rotation);
	        } else if (tagName === 'PATH' || tagName === 'POLYGON' || tagName === 'POLYLINE' || tagName === 'CIRCLE' || tagName === 'ELLIPSE') {
	
	            var pathNode = tagName === 'PATH' ? that : that.toPath();
	            var samples = pathNode.sample();
	            var minDistance = Infinity;
	            var closestSamples = [];
	
	            for (var i = 0, len = samples.length; i < len; i++) {
	
	                var sample = samples[i];
	                // Convert the sample point in the local coordinate system to the global coordinate system.
	                var gp = V.createSVGPoint(sample.x, sample.y);
	                gp = gp.matrixTransform(this.node.getTransformToElement(target));
	                sample = g.point(gp);
	                var centerDistance = sample.distance(center);
	                // Penalize a higher distance to the reference point by 10%.
	                // This gives better results. This is due to
	                // inaccuracies introduced by rounding errors and getPointAtLength() returns.
	                var refDistance = sample.distance(ref) * 1.1;
	                var distance = centerDistance + refDistance;
	                if (distance < minDistance) {
	                    minDistance = distance;
	                    closestSamples = [{
	                        sample: sample,
	                        refDistance: refDistance
	                    }];
	                } else if (distance < minDistance + 1) {
	                    closestSamples.push({
	                        sample: sample,
	                        refDistance: refDistance
	                    });
	                }
	            }
	
	            closestSamples.sort(function (a, b) {
	                return a.refDistance - b.refDistance;
	            });
	            spot = closestSamples[0].sample;
	        }
	
	        return spot;
	    }
	};
	
	// vector
	// ------
	
	var vector = VElement.createElement = createElement;
	
	vector.isVElement = function (obj) {
	    return obj instanceof VElement;
	};
	
	// exports
	// -------
	
	exports['default'] = vector;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _commonVector = __webpack_require__(19);
	
	var _commonVector2 = _interopRequireDefault(_commonVector);
	
	var _CellView2 = __webpack_require__(22);
	
	var _CellView3 = _interopRequireDefault(_CellView2);
	
	var NodeView = (function (_CellView) {
	    _inherits(NodeView, _CellView);
	
	    function NodeView() {
	        _classCallCheck(this, NodeView);
	
	        _get(Object.getPrototypeOf(NodeView.prototype), 'constructor', this).apply(this, arguments);
	    }
	
	    _createClass(NodeView, [{
	        key: 'update',
	        value: function update() {
	
	            var that = this;
	
	            return that;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	
	            var that = this;
	            var vel = that.vel;
	
	            vel.empty();
	
	            that.renderMarkup();
	
	            that.scalableNode = vel.findOne('.pane-scalable');
	            that.rotatableNode = vel.findOne('.pane-rotatable');
	
	            return that.update().resize().rotate().translate();
	        }
	    }, {
	        key: 'renderMarkup',
	        value: function renderMarkup() {
	
	            var that = this;
	            var cell = that.cell;
	            var markup = cell.get('markup') || cell.markup;
	
	            if (markup) {
	                that.vel.append((0, _commonVector2['default'])(markup));
	            } else {
	                throw new Error('invalid markup');
	            }
	
	            return that;
	        }
	    }, {
	        key: 'scale',
	        value: function scale() {
	
	            var that = this;
	
	            return that;
	        }
	    }, {
	        key: 'resize',
	        value: function resize() {
	
	            var that = this;
	
	            return that;
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate() {
	
	            var that = this;
	            var node = that.rotatableNode;
	
	            if (node) {
	
	                var cell = that.cell;
	                var angle = cell.get('angle');
	
	                if (angle) {
	
	                    var size = cell.get('size') || { width: 1, height: 1 };
	                    var ox = size.width / 2;
	                    var oy = size.height / 2;
	
	                    node.attr('transform', 'rotate(' + angle + ',' + ox + ',' + oy + ')');
	                } else {
	                    node.removeAttr('transform');
	                }
	            }
	
	            return that;
	        }
	    }, {
	        key: 'translate',
	        value: function translate() {
	
	            var that = this;
	
	            return that;
	        }
	    }, {
	        key: 'getBBox',
	        value: function getBBox() {}
	    }]);
	
	    return NodeView;
	})(_CellView3['default']);
	
	exports['default'] = NodeView;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _commonEvents = __webpack_require__(11);
	
	var _commonEvents2 = _interopRequireDefault(_commonEvents);
	
	var _commonVector = __webpack_require__(19);
	
	var _commonVector2 = _interopRequireDefault(_commonVector);
	
	var CellView = (function () {
	    function CellView(paper, cell) {
	        _classCallCheck(this, CellView);
	
	        var that = this;
	
	        that.cell = cell;
	        that.paper = paper;
	
	        that.ensureElement();
	    }
	
	    _createClass(CellView, [{
	        key: 'ensureElement',
	        value: function ensureElement() {
	
	            var that = this;
	
	            var vel = (0, _commonVector2['default'])('g');
	
	            that.el = vel.node;
	            that.vel = vel;
	
	            that.paper.drawPane.appendChild(that.el);
	
	            return that;
	        }
	    }, {
	        key: 'find',
	        value: function find(selector) {}
	    }, {
	        key: 'onDblClick',
	        value: function onDblClick() {}
	    }, {
	        key: 'onClick',
	        value: function onClick() {}
	    }, {
	        key: 'onPointerDown',
	        value: function onPointerDown() {}
	    }, {
	        key: 'onPointerMove',
	        value: function onPointerMove() {}
	    }, {
	        key: 'onPointerUp',
	        value: function onPointerUp() {}
	    }, {
	        key: 'onMouseOver',
	        value: function onMouseOver() {}
	    }, {
	        key: 'onMouseOut',
	        value: function onMouseOut() {}
	    }, {
	        key: 'onContextMenu',
	        value: function onContextMenu() {}
	    }]);
	
	    return CellView;
	})();
	
	exports['default'] = CellView;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _commonUtils = __webpack_require__(2);
	
	var _cellsNode = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../cells/Node\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _cellsNode2 = _interopRequireDefault(_cellsNode);
	
	var Generic = (function (_Node) {
	    _inherits(Generic, _Node);
	
	    function Generic() {
	        _classCallCheck(this, Generic);
	
	        _get(Object.getPrototypeOf(Generic.prototype), 'constructor', this).apply(this, arguments);
	    }
	
	    return Generic;
	})(_cellsNode2['default']);
	
	exports['default'] = _cellsNode2['default'].extend({
	    defaults: (0, _commonUtils.merge)({
	        attrs: {
	            '.': {
	                fill: '#fff',
	                stroke: 'none'
	            }
	        }
	    }, _cellsNode2['default'].prototype.defaults)
	});
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=pane-0.0.1.js.map
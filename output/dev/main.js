/*!
 * 
 * [Dojo](https://dojo.io/)
 * Copyright [JS Foundation](https://js.foundation/) & contributors
 * [New BSD license](https://github.com/dojo/meta/blob/master/LICENSE)
 * All rights reserved
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("main", [], factory);
	else if(typeof exports === 'object')
		exports["main"] = factory();
	else
		root["main"] = factory();
})(this, function() {
return dojoWebpackJsonpsf_loan(["main"],{

/***/ "./node_modules/@dojo/core/Destroyable.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var lang_1 = __webpack_require__("./node_modules/@dojo/core/lang.js");
var Promise_1 = __webpack_require__("./node_modules/@dojo/shim/Promise.js");
/**
 * No operation function to replace own once instance is destoryed
 */
function noop() {
    return Promise_1.default.resolve(false);
}
/**
 * No op function used to replace own, once instance has been destoryed
 */
function destroyed() {
    throw new Error('Call made to destroyed method');
}
var Destroyable = /** @class */ (function () {
    /**
     * @constructor
     */
    function Destroyable() {
        this.handles = [];
    }
    /**
     * Register handles for the instance that will be destroyed when `this.destroy` is called
     *
     * @param {Handle} handle The handle to add for the instance
     * @returns {Handle} a handle for the handle, removes the handle for the instance and calls destroy
     */
    Destroyable.prototype.own = function (handles) {
        var handle = Array.isArray(handles) ? lang_1.createCompositeHandle.apply(void 0, tslib_1.__spread(handles)) : handles;
        var _handles = this.handles;
        _handles.push(handle);
        return {
            destroy: function () {
                _handles.splice(_handles.indexOf(handle));
                handle.destroy();
            }
        };
    };
    /**
     * Destrpys all handers registered for the instance
     *
     * @returns {Promise<any} a promise that resolves once all handles have been destroyed
     */
    Destroyable.prototype.destroy = function () {
        var _this = this;
        return new Promise_1.default(function (resolve) {
            _this.handles.forEach(function (handle) {
                handle && handle.destroy && handle.destroy();
            });
            _this.destroy = noop;
            _this.own = destroyed;
            resolve(true);
        });
    };
    return Destroyable;
}());
exports.Destroyable = Destroyable;
exports.default = Destroyable;


/***/ }),

/***/ "./node_modules/@dojo/core/Evented.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Map_1 = __webpack_require__("./node_modules/@dojo/shim/Map.js");
var Destroyable_1 = __webpack_require__("./node_modules/@dojo/core/Destroyable.js");
/**
 * Map of computed regular expressions, keyed by string
 */
var regexMap = new Map_1.default();
/**
 * Determines is the event type glob has been matched
 *
 * @returns boolean that indicates if the glob is matched
 */
function isGlobMatch(globString, targetString) {
    if (typeof targetString === 'string' && typeof globString === 'string' && globString.indexOf('*') !== -1) {
        var regex = void 0;
        if (regexMap.has(globString)) {
            regex = regexMap.get(globString);
        }
        else {
            regex = new RegExp("^" + globString.replace(/\*/g, '.*') + "$");
            regexMap.set(globString, regex);
        }
        return regex.test(targetString);
    }
    else {
        return globString === targetString;
    }
}
exports.isGlobMatch = isGlobMatch;
/**
 * Event Class
 */
var Evented = /** @class */ (function (_super) {
    tslib_1.__extends(Evented, _super);
    function Evented() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * map of listeners keyed by event type
         */
        _this.listenersMap = new Map_1.default();
        return _this;
    }
    Evented.prototype.emit = function (event) {
        var _this = this;
        this.listenersMap.forEach(function (methods, type) {
            if (isGlobMatch(type, event.type)) {
                methods.forEach(function (method) {
                    method.call(_this, event);
                });
            }
        });
    };
    Evented.prototype.on = function (type, listener) {
        var _this = this;
        if (Array.isArray(listener)) {
            var handles_1 = listener.map(function (listener) { return _this._addListener(type, listener); });
            return {
                destroy: function () {
                    handles_1.forEach(function (handle) { return handle.destroy(); });
                }
            };
        }
        return this._addListener(type, listener);
    };
    Evented.prototype._addListener = function (type, listener) {
        var _this = this;
        var listeners = this.listenersMap.get(type) || [];
        listeners.push(listener);
        this.listenersMap.set(type, listeners);
        return {
            destroy: function () {
                var listeners = _this.listenersMap.get(type) || [];
                listeners.splice(listeners.indexOf(listener), 1);
            }
        };
    };
    return Evented;
}(Destroyable_1.Destroyable));
exports.Evented = Evented;
exports.default = Evented;


/***/ }),

/***/ "./node_modules/@dojo/core/lang.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var object_1 = __webpack_require__("./node_modules/@dojo/shim/object.js");
var object_2 = __webpack_require__("./node_modules/@dojo/shim/object.js");
exports.assign = object_2.assign;
var slice = Array.prototype.slice;
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Type guard that ensures that the value can be coerced to Object
 * to weed out host objects that do not derive from Object.
 * This function is used to check if we want to deep copy an object or not.
 * Note: In ES6 it is possible to modify an object's Symbol.toStringTag property, which will
 * change the value returned by `toString`. This is a rare edge case that is difficult to handle,
 * so it is not handled here.
 * @param  value The value to check
 * @return       If the value is coercible into an Object
 */
function shouldDeepCopyObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
function copyArray(array, inherited) {
    return array.map(function (item) {
        if (Array.isArray(item)) {
            return copyArray(item, inherited);
        }
        return !shouldDeepCopyObject(item)
            ? item
            : _mixin({
                deep: true,
                inherited: inherited,
                sources: [item],
                target: {}
            });
    });
}
function _mixin(kwArgs) {
    var deep = kwArgs.deep;
    var inherited = kwArgs.inherited;
    var target = kwArgs.target;
    var copied = kwArgs.copied || [];
    var copiedClone = tslib_1.__spread(copied);
    for (var i = 0; i < kwArgs.sources.length; i++) {
        var source = kwArgs.sources[i];
        if (source === null || source === undefined) {
            continue;
        }
        for (var key in source) {
            if (inherited || hasOwnProperty.call(source, key)) {
                var value = source[key];
                if (copiedClone.indexOf(value) !== -1) {
                    continue;
                }
                if (deep) {
                    if (Array.isArray(value)) {
                        value = copyArray(value, inherited);
                    }
                    else if (shouldDeepCopyObject(value)) {
                        var targetValue = target[key] || {};
                        copied.push(source);
                        value = _mixin({
                            deep: true,
                            inherited: inherited,
                            sources: [value],
                            target: targetValue,
                            copied: copied
                        });
                    }
                }
                target[key] = value;
            }
        }
    }
    return target;
}
function create(prototype) {
    var mixins = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        mixins[_i - 1] = arguments[_i];
    }
    if (!mixins.length) {
        throw new RangeError('lang.create requires at least one mixin object.');
    }
    var args = mixins.slice();
    args.unshift(Object.create(prototype));
    return object_1.assign.apply(null, args);
}
exports.create = create;
function deepAssign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    return _mixin({
        deep: true,
        inherited: false,
        sources: sources,
        target: target
    });
}
exports.deepAssign = deepAssign;
function deepMixin(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    return _mixin({
        deep: true,
        inherited: true,
        sources: sources,
        target: target
    });
}
exports.deepMixin = deepMixin;
/**
 * Creates a new object using the provided source's prototype as the prototype for the new object, and then
 * deep copies the provided source's values into the new target.
 *
 * @param source The object to duplicate
 * @return The new object
 */
function duplicate(source) {
    var target = Object.create(Object.getPrototypeOf(source));
    return deepMixin(target, source);
}
exports.duplicate = duplicate;
/**
 * Determines whether two values are the same value.
 *
 * @param a First value to compare
 * @param b Second value to compare
 * @return true if the values are the same; false otherwise
 */
function isIdentical(a, b) {
    return (a === b ||
        /* both values are NaN */
        (a !== a && b !== b));
}
exports.isIdentical = isIdentical;
/**
 * Returns a function that binds a method to the specified object at runtime. This is similar to
 * `Function.prototype.bind`, but instead of a function it takes the name of a method on an object.
 * As a result, the function returned by `lateBind` will always call the function currently assigned to
 * the specified property on the object as of the moment the function it returns is called.
 *
 * @param instance The context object
 * @param method The name of the method on the context object to bind to itself
 * @param suppliedArgs An optional array of values to prepend to the `instance[method]` arguments list
 * @return The bound function
 */
function lateBind(instance, method) {
    var suppliedArgs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        suppliedArgs[_i - 2] = arguments[_i];
    }
    return suppliedArgs.length
        ? function () {
            var args = arguments.length ? suppliedArgs.concat(slice.call(arguments)) : suppliedArgs;
            // TS7017
            return instance[method].apply(instance, args);
        }
        : function () {
            // TS7017
            return instance[method].apply(instance, arguments);
        };
}
exports.lateBind = lateBind;
function mixin(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    return _mixin({
        deep: false,
        inherited: true,
        sources: sources,
        target: target
    });
}
exports.mixin = mixin;
/**
 * Returns a function which invokes the given function with the given arguments prepended to its argument list.
 * Like `Function.prototype.bind`, but does not alter execution context.
 *
 * @param targetFunction The function that needs to be bound
 * @param suppliedArgs An optional array of arguments to prepend to the `targetFunction` arguments list
 * @return The bound function
 */
function partial(targetFunction) {
    var suppliedArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        suppliedArgs[_i - 1] = arguments[_i];
    }
    return function () {
        var args = arguments.length ? suppliedArgs.concat(slice.call(arguments)) : suppliedArgs;
        return targetFunction.apply(this, args);
    };
}
exports.partial = partial;
/**
 * Returns an object with a destroy method that, when called, calls the passed-in destructor.
 * This is intended to provide a unified interface for creating "remove" / "destroy" handlers for
 * event listeners, timers, etc.
 *
 * @param destructor A function that will be called when the handle's `destroy` method is invoked
 * @return The handle object
 */
function createHandle(destructor) {
    var called = false;
    return {
        destroy: function () {
            if (!called) {
                called = true;
                destructor();
            }
        }
    };
}
exports.createHandle = createHandle;
/**
 * Returns a single handle that can be used to destroy multiple handles simultaneously.
 *
 * @param handles An array of handles with `destroy` methods
 * @return The handle object
 */
function createCompositeHandle() {
    var handles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        handles[_i] = arguments[_i];
    }
    return createHandle(function () {
        for (var i = 0; i < handles.length; i++) {
            handles[i].destroy();
        }
    });
}
exports.createCompositeHandle = createCompositeHandle;


/***/ }),

/***/ "./node_modules/@dojo/has/has.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {
Object.defineProperty(exports, "__esModule", { value: true });
function isFeatureTestThenable(value) {
    return value && value.then;
}
/**
 * A cache of results of feature tests
 */
exports.testCache = {};
/**
 * A cache of the un-resolved feature tests
 */
exports.testFunctions = {};
/**
 * A cache of unresolved thenables (probably promises)
 * @type {{}}
 */
var testThenables = {};
/**
 * A reference to the global scope (`window` in a browser, `global` in NodeJS)
 */
var globalScope = (function () {
    /* istanbul ignore else */
    if (typeof window !== 'undefined') {
        // Browsers
        return window;
    }
    else if (typeof global !== 'undefined') {
        // Node
        return global;
    }
    else if (typeof self !== 'undefined') {
        // Web workers
        return self;
    }
    /* istanbul ignore next */
    return {};
})();
/* Grab the staticFeatures if there are available */
var staticFeatures = (globalScope.DojoHasEnvironment || {}).staticFeatures;
/* Cleaning up the DojoHasEnviornment */
if ('DojoHasEnvironment' in globalScope) {
    delete globalScope.DojoHasEnvironment;
}
/**
 * Custom type guard to narrow the `staticFeatures` to either a map or a function that
 * returns a map.
 *
 * @param value The value to guard for
 */
function isStaticFeatureFunction(value) {
    return typeof value === 'function';
}
/**
 * The cache of asserted features that were available in the global scope when the
 * module loaded
 */
var staticCache = staticFeatures
    ? isStaticFeatureFunction(staticFeatures) ? staticFeatures.apply(globalScope) : staticFeatures
    : {};/* Providing an empty cache, if none was in the environment

/**
* AMD plugin function.
*
* Conditional loads modules based on a has feature test value.
*
* @param resourceId Gives the resolved module id to load.
* @param require The loader require function with respect to the module that contained the plugin resource in its
*                dependency list.
* @param load Callback to loader that consumes result of plugin demand.
*/
function load(resourceId, require, load, config) {
    resourceId ? require([resourceId], load) : load();
}
exports.load = load;
/**
 * AMD plugin function.
 *
 * Resolves resourceId into a module id based on possibly-nested tenary expression that branches on has feature test
 * value(s).
 *
 * @param resourceId The id of the module
 * @param normalize Resolves a relative module id into an absolute module id
 */
function normalize(resourceId, normalize) {
    var tokens = resourceId.match(/[\?:]|[^:\?]*/g) || [];
    var i = 0;
    function get(skip) {
        var term = tokens[i++];
        if (term === ':') {
            // empty string module name, resolves to null
            return null;
        }
        else {
            // postfixed with a ? means it is a feature to branch on, the term is the name of the feature
            if (tokens[i++] === '?') {
                if (!skip && has(term)) {
                    // matched the feature, get the first value from the options
                    return get();
                }
                else {
                    // did not match, get the second value, passing over the first
                    get(true);
                    return get(skip);
                }
            }
            // a module
            return term;
        }
    }
    var id = get();
    return id && normalize(id);
}
exports.normalize = normalize;
/**
 * Check if a feature has already been registered
 *
 * @param feature the name of the feature
 */
function exists(feature) {
    var normalizedFeature = feature.toLowerCase();
    return Boolean(normalizedFeature in staticCache || normalizedFeature in exports.testCache || exports.testFunctions[normalizedFeature]);
}
exports.exists = exists;
/**
 * Register a new test for a named feature.
 *
 * @example
 * has.add('dom-addeventlistener', !!document.addEventListener);
 *
 * @example
 * has.add('touch-events', function () {
 *    return 'ontouchstart' in document
 * });
 *
 * @param feature the name of the feature
 * @param value the value reported of the feature, or a function that will be executed once on first test
 * @param overwrite if an existing value should be overwritten. Defaults to false.
 */
function add(feature, value, overwrite) {
    if (overwrite === void 0) { overwrite = false; }
    var normalizedFeature = feature.toLowerCase();
    if (exists(normalizedFeature) && !overwrite && !(normalizedFeature in staticCache)) {
        throw new TypeError("Feature \"" + feature + "\" exists and overwrite not true.");
    }
    if (typeof value === 'function') {
        exports.testFunctions[normalizedFeature] = value;
    }
    else if (isFeatureTestThenable(value)) {
        testThenables[feature] = value.then(function (resolvedValue) {
            exports.testCache[feature] = resolvedValue;
            delete testThenables[feature];
        }, function () {
            delete testThenables[feature];
        });
    }
    else {
        exports.testCache[normalizedFeature] = value;
        delete exports.testFunctions[normalizedFeature];
    }
}
exports.add = add;
/**
 * Return the current value of a named feature.
 *
 * @param feature The name (if a string) or identifier (if an integer) of the feature to test.
 */
function has(feature) {
    var result;
    var normalizedFeature = feature.toLowerCase();
    if (normalizedFeature in staticCache) {
        result = staticCache[normalizedFeature];
    }
    else if (exports.testFunctions[normalizedFeature]) {
        result = exports.testCache[normalizedFeature] = exports.testFunctions[normalizedFeature].call(null);
        delete exports.testFunctions[normalizedFeature];
    }
    else if (normalizedFeature in exports.testCache) {
        result = exports.testCache[normalizedFeature];
    }
    else if (feature in testThenables) {
        return false;
    }
    else {
        throw new TypeError("Attempt to detect unregistered has feature \"" + feature + "\"");
    }
    return result;
}
exports.default = has;
/*
 * Out of the box feature tests
 */
/* Environments */
/* Used as a value to provide a debug only code path */
add('debug', true);
/* Detects if the environment is "browser like" */
add('host-browser', typeof document !== 'undefined' && typeof location !== 'undefined');
/* Detects if the environment appears to be NodeJS */
add('host-node', function () {
    if (typeof process === 'object' && process.versions && process.versions.node) {
        return process.versions.node;
    }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/@dojo/shim/Map.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var iterator_1 = __webpack_require__("./node_modules/@dojo/shim/iterator.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var object_1 = __webpack_require__("./node_modules/@dojo/shim/object.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
__webpack_require__("./node_modules/@dojo/shim/Symbol.js");
exports.Map = global_1.default.Map;
if (!has_1.default('es6-map')) {
    exports.Map = (_a = /** @class */ (function () {
            function Map(iterable) {
                this._keys = [];
                this._values = [];
                this[Symbol.toStringTag] = 'Map';
                if (iterable) {
                    if (iterator_1.isArrayLike(iterable)) {
                        for (var i = 0; i < iterable.length; i++) {
                            var value = iterable[i];
                            this.set(value[0], value[1]);
                        }
                    }
                    else {
                        try {
                            for (var iterable_1 = tslib_1.__values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                                var value = iterable_1_1.value;
                                this.set(value[0], value[1]);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                var e_1, _a;
            }
            /**
             * An alternative to Array.prototype.indexOf using Object.is
             * to check for equality. See http://mzl.la/1zuKO2V
             */
            Map.prototype._indexOfKey = function (keys, key) {
                for (var i = 0, length_1 = keys.length; i < length_1; i++) {
                    if (object_1.is(keys[i], key)) {
                        return i;
                    }
                }
                return -1;
            };
            Object.defineProperty(Map.prototype, "size", {
                get: function () {
                    return this._keys.length;
                },
                enumerable: true,
                configurable: true
            });
            Map.prototype.clear = function () {
                this._keys.length = this._values.length = 0;
            };
            Map.prototype.delete = function (key) {
                var index = this._indexOfKey(this._keys, key);
                if (index < 0) {
                    return false;
                }
                this._keys.splice(index, 1);
                this._values.splice(index, 1);
                return true;
            };
            Map.prototype.entries = function () {
                var _this = this;
                var values = this._keys.map(function (key, i) {
                    return [key, _this._values[i]];
                });
                return new iterator_1.ShimIterator(values);
            };
            Map.prototype.forEach = function (callback, context) {
                var keys = this._keys;
                var values = this._values;
                for (var i = 0, length_2 = keys.length; i < length_2; i++) {
                    callback.call(context, values[i], keys[i], this);
                }
            };
            Map.prototype.get = function (key) {
                var index = this._indexOfKey(this._keys, key);
                return index < 0 ? undefined : this._values[index];
            };
            Map.prototype.has = function (key) {
                return this._indexOfKey(this._keys, key) > -1;
            };
            Map.prototype.keys = function () {
                return new iterator_1.ShimIterator(this._keys);
            };
            Map.prototype.set = function (key, value) {
                var index = this._indexOfKey(this._keys, key);
                index = index < 0 ? this._keys.length : index;
                this._keys[index] = key;
                this._values[index] = value;
                return this;
            };
            Map.prototype.values = function () {
                return new iterator_1.ShimIterator(this._values);
            };
            Map.prototype[Symbol.iterator] = function () {
                return this.entries();
            };
            return Map;
        }()),
        _a[Symbol.species] = _a,
        _a);
}
exports.default = exports.Map;
var _a;


/***/ }),

/***/ "./node_modules/@dojo/shim/Promise.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var queue_1 = __webpack_require__("./node_modules/@dojo/shim/support/queue.js");
__webpack_require__("./node_modules/@dojo/shim/Symbol.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
exports.ShimPromise = global_1.default.Promise;
exports.isThenable = function isThenable(value) {
    return value && typeof value.then === 'function';
};
if (!has_1.default('es6-promise')) {
    global_1.default.Promise = exports.ShimPromise = (_a = /** @class */ (function () {
            /**
             * Creates a new Promise.
             *
             * @constructor
             *
             * @param executor
             * The executor function is called immediately when the Promise is instantiated. It is responsible for
             * starting the asynchronous operation when it is invoked.
             *
             * The executor must call either the passed `resolve` function when the asynchronous operation has completed
             * successfully, or the `reject` function when the operation fails.
             */
            function Promise(executor) {
                var _this = this;
                /**
                 * The current state of this promise.
                 */
                this.state = 1 /* Pending */;
                this[Symbol.toStringTag] = 'Promise';
                /**
                 * If true, the resolution of this promise is chained ("locked in") to another promise.
                 */
                var isChained = false;
                /**
                 * Whether or not this promise is in a resolved state.
                 */
                var isResolved = function () {
                    return _this.state !== 1 /* Pending */ || isChained;
                };
                /**
                 * Callbacks that should be invoked once the asynchronous operation has completed.
                 */
                var callbacks = [];
                /**
                 * Initially pushes callbacks onto a queue for execution once this promise settles. After the promise settles,
                 * enqueues callbacks for execution on the next event loop turn.
                 */
                var whenFinished = function (callback) {
                    if (callbacks) {
                        callbacks.push(callback);
                    }
                };
                /**
                 * Settles this promise.
                 *
                 * @param newState The resolved state for this promise.
                 * @param {T|any} value The resolved value for this promise.
                 */
                var settle = function (newState, value) {
                    // A promise can only be settled once.
                    if (_this.state !== 1 /* Pending */) {
                        return;
                    }
                    _this.state = newState;
                    _this.resolvedValue = value;
                    whenFinished = queue_1.queueMicroTask;
                    // Only enqueue a callback runner if there are callbacks so that initially fulfilled Promises don't have to
                    // wait an extra turn.
                    if (callbacks && callbacks.length > 0) {
                        queue_1.queueMicroTask(function () {
                            if (callbacks) {
                                var count = callbacks.length;
                                for (var i = 0; i < count; ++i) {
                                    callbacks[i].call(null);
                                }
                                callbacks = null;
                            }
                        });
                    }
                };
                /**
                 * Resolves this promise.
                 *
                 * @param newState The resolved state for this promise.
                 * @param {T|any} value The resolved value for this promise.
                 */
                var resolve = function (newState, value) {
                    if (isResolved()) {
                        return;
                    }
                    if (exports.isThenable(value)) {
                        value.then(settle.bind(null, 0 /* Fulfilled */), settle.bind(null, 2 /* Rejected */));
                        isChained = true;
                    }
                    else {
                        settle(newState, value);
                    }
                };
                this.then = function (onFulfilled, onRejected) {
                    return new Promise(function (resolve, reject) {
                        // whenFinished initially queues up callbacks for execution after the promise has settled. Once the
                        // promise has settled, whenFinished will schedule callbacks for execution on the next turn through the
                        // event loop.
                        whenFinished(function () {
                            var callback = _this.state === 2 /* Rejected */ ? onRejected : onFulfilled;
                            if (typeof callback === 'function') {
                                try {
                                    resolve(callback(_this.resolvedValue));
                                }
                                catch (error) {
                                    reject(error);
                                }
                            }
                            else if (_this.state === 2 /* Rejected */) {
                                reject(_this.resolvedValue);
                            }
                            else {
                                resolve(_this.resolvedValue);
                            }
                        });
                    });
                };
                try {
                    executor(resolve.bind(null, 0 /* Fulfilled */), resolve.bind(null, 2 /* Rejected */));
                }
                catch (error) {
                    settle(2 /* Rejected */, error);
                }
            }
            Promise.all = function (iterable) {
                return new this(function (resolve, reject) {
                    var values = [];
                    var complete = 0;
                    var total = 0;
                    var populating = true;
                    function fulfill(index, value) {
                        values[index] = value;
                        ++complete;
                        finish();
                    }
                    function finish() {
                        if (populating || complete < total) {
                            return;
                        }
                        resolve(values);
                    }
                    function processItem(index, item) {
                        ++total;
                        if (exports.isThenable(item)) {
                            // If an item Promise rejects, this Promise is immediately rejected with the item
                            // Promise's rejection error.
                            item.then(fulfill.bind(null, index), reject);
                        }
                        else {
                            Promise.resolve(item).then(fulfill.bind(null, index));
                        }
                    }
                    var i = 0;
                    try {
                        for (var iterable_1 = tslib_1.__values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                            var value = iterable_1_1.value;
                            processItem(i, value);
                            i++;
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    populating = false;
                    finish();
                    var e_1, _a;
                });
            };
            Promise.race = function (iterable) {
                return new this(function (resolve, reject) {
                    try {
                        for (var iterable_2 = tslib_1.__values(iterable), iterable_2_1 = iterable_2.next(); !iterable_2_1.done; iterable_2_1 = iterable_2.next()) {
                            var item = iterable_2_1.value;
                            if (item instanceof Promise) {
                                // If a Promise item rejects, this Promise is immediately rejected with the item
                                // Promise's rejection error.
                                item.then(resolve, reject);
                            }
                            else {
                                Promise.resolve(item).then(resolve);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (iterable_2_1 && !iterable_2_1.done && (_a = iterable_2.return)) _a.call(iterable_2);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    var e_2, _a;
                });
            };
            Promise.reject = function (reason) {
                return new this(function (resolve, reject) {
                    reject(reason);
                });
            };
            Promise.resolve = function (value) {
                return new this(function (resolve) {
                    resolve(value);
                });
            };
            Promise.prototype.catch = function (onRejected) {
                return this.then(undefined, onRejected);
            };
            return Promise;
        }()),
        _a[Symbol.species] = exports.ShimPromise,
        _a);
}
exports.default = exports.ShimPromise;
var _a;


/***/ }),

/***/ "./node_modules/@dojo/shim/Symbol.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var util_1 = __webpack_require__("./node_modules/@dojo/shim/support/util.js");
exports.Symbol = global_1.default.Symbol;
if (!has_1.default('es6-symbol')) {
    /**
     * Throws if the value is not a symbol, used internally within the Shim
     * @param  {any}    value The value to check
     * @return {symbol}       Returns the symbol or throws
     */
    var validateSymbol_1 = function validateSymbol(value) {
        if (!isSymbol(value)) {
            throw new TypeError(value + ' is not a symbol');
        }
        return value;
    };
    var defineProperties_1 = Object.defineProperties;
    var defineProperty_1 = Object.defineProperty;
    var create_1 = Object.create;
    var objPrototype_1 = Object.prototype;
    var globalSymbols_1 = {};
    var getSymbolName_1 = (function () {
        var created = create_1(null);
        return function (desc) {
            var postfix = 0;
            var name;
            while (created[String(desc) + (postfix || '')]) {
                ++postfix;
            }
            desc += String(postfix || '');
            created[desc] = true;
            name = '@@' + desc;
            // FIXME: Temporary guard until the duplicate execution when testing can be
            // pinned down.
            if (!Object.getOwnPropertyDescriptor(objPrototype_1, name)) {
                defineProperty_1(objPrototype_1, name, {
                    set: function (value) {
                        defineProperty_1(this, name, util_1.getValueDescriptor(value));
                    }
                });
            }
            return name;
        };
    })();
    var InternalSymbol_1 = function Symbol(description) {
        if (this instanceof InternalSymbol_1) {
            throw new TypeError('TypeError: Symbol is not a constructor');
        }
        return Symbol(description);
    };
    exports.Symbol = global_1.default.Symbol = function Symbol(description) {
        if (this instanceof Symbol) {
            throw new TypeError('TypeError: Symbol is not a constructor');
        }
        var sym = Object.create(InternalSymbol_1.prototype);
        description = description === undefined ? '' : String(description);
        return defineProperties_1(sym, {
            __description__: util_1.getValueDescriptor(description),
            __name__: util_1.getValueDescriptor(getSymbolName_1(description))
        });
    };
    /* Decorate the Symbol function with the appropriate properties */
    defineProperty_1(exports.Symbol, 'for', util_1.getValueDescriptor(function (key) {
        if (globalSymbols_1[key]) {
            return globalSymbols_1[key];
        }
        return (globalSymbols_1[key] = exports.Symbol(String(key)));
    }));
    defineProperties_1(exports.Symbol, {
        keyFor: util_1.getValueDescriptor(function (sym) {
            var key;
            validateSymbol_1(sym);
            for (key in globalSymbols_1) {
                if (globalSymbols_1[key] === sym) {
                    return key;
                }
            }
        }),
        hasInstance: util_1.getValueDescriptor(exports.Symbol.for('hasInstance'), false, false),
        isConcatSpreadable: util_1.getValueDescriptor(exports.Symbol.for('isConcatSpreadable'), false, false),
        iterator: util_1.getValueDescriptor(exports.Symbol.for('iterator'), false, false),
        match: util_1.getValueDescriptor(exports.Symbol.for('match'), false, false),
        observable: util_1.getValueDescriptor(exports.Symbol.for('observable'), false, false),
        replace: util_1.getValueDescriptor(exports.Symbol.for('replace'), false, false),
        search: util_1.getValueDescriptor(exports.Symbol.for('search'), false, false),
        species: util_1.getValueDescriptor(exports.Symbol.for('species'), false, false),
        split: util_1.getValueDescriptor(exports.Symbol.for('split'), false, false),
        toPrimitive: util_1.getValueDescriptor(exports.Symbol.for('toPrimitive'), false, false),
        toStringTag: util_1.getValueDescriptor(exports.Symbol.for('toStringTag'), false, false),
        unscopables: util_1.getValueDescriptor(exports.Symbol.for('unscopables'), false, false)
    });
    /* Decorate the InternalSymbol object */
    defineProperties_1(InternalSymbol_1.prototype, {
        constructor: util_1.getValueDescriptor(exports.Symbol),
        toString: util_1.getValueDescriptor(function () {
            return this.__name__;
        }, false, false)
    });
    /* Decorate the Symbol.prototype */
    defineProperties_1(exports.Symbol.prototype, {
        toString: util_1.getValueDescriptor(function () {
            return 'Symbol (' + validateSymbol_1(this).__description__ + ')';
        }),
        valueOf: util_1.getValueDescriptor(function () {
            return validateSymbol_1(this);
        })
    });
    defineProperty_1(exports.Symbol.prototype, exports.Symbol.toPrimitive, util_1.getValueDescriptor(function () {
        return validateSymbol_1(this);
    }));
    defineProperty_1(exports.Symbol.prototype, exports.Symbol.toStringTag, util_1.getValueDescriptor('Symbol', false, false, true));
    defineProperty_1(InternalSymbol_1.prototype, exports.Symbol.toPrimitive, util_1.getValueDescriptor(exports.Symbol.prototype[exports.Symbol.toPrimitive], false, false, true));
    defineProperty_1(InternalSymbol_1.prototype, exports.Symbol.toStringTag, util_1.getValueDescriptor(exports.Symbol.prototype[exports.Symbol.toStringTag], false, false, true));
}
/**
 * A custom guard function that determines if an object is a symbol or not
 * @param  {any}       value The value to check to see if it is a symbol or not
 * @return {is symbol}       Returns true if a symbol or not (and narrows the type guard)
 */
function isSymbol(value) {
    return (value && (typeof value === 'symbol' || value['@@toStringTag'] === 'Symbol')) || false;
}
exports.isSymbol = isSymbol;
/**
 * Fill any missing well known symbols if the native Symbol is missing them
 */
[
    'hasInstance',
    'isConcatSpreadable',
    'iterator',
    'species',
    'replace',
    'search',
    'split',
    'match',
    'toPrimitive',
    'toStringTag',
    'unscopables',
    'observable'
].forEach(function (wellKnown) {
    if (!exports.Symbol[wellKnown]) {
        Object.defineProperty(exports.Symbol, wellKnown, util_1.getValueDescriptor(exports.Symbol.for(wellKnown), false, false));
    }
});
exports.default = exports.Symbol;


/***/ }),

/***/ "./node_modules/@dojo/shim/WeakMap.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var iterator_1 = __webpack_require__("./node_modules/@dojo/shim/iterator.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
__webpack_require__("./node_modules/@dojo/shim/Symbol.js");
exports.WeakMap = global_1.default.WeakMap;
if (!has_1.default('es6-weakmap')) {
    var DELETED_1 = {};
    var getUID_1 = function getUID() {
        return Math.floor(Math.random() * 100000000);
    };
    var generateName_1 = (function () {
        var startId = Math.floor(Date.now() % 100000000);
        return function generateName() {
            return '__wm' + getUID_1() + (startId++ + '__');
        };
    })();
    exports.WeakMap = /** @class */ (function () {
        function WeakMap(iterable) {
            this[Symbol.toStringTag] = 'WeakMap';
            this._name = generateName_1();
            this._frozenEntries = [];
            if (iterable) {
                if (iterator_1.isArrayLike(iterable)) {
                    for (var i = 0; i < iterable.length; i++) {
                        var item = iterable[i];
                        this.set(item[0], item[1]);
                    }
                }
                else {
                    try {
                        for (var iterable_1 = tslib_1.__values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
                            var _a = tslib_1.__read(iterable_1_1.value, 2), key = _a[0], value = _a[1];
                            this.set(key, value);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (iterable_1_1 && !iterable_1_1.done && (_b = iterable_1.return)) _b.call(iterable_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                }
            }
            var e_1, _b;
        }
        WeakMap.prototype._getFrozenEntryIndex = function (key) {
            for (var i = 0; i < this._frozenEntries.length; i++) {
                if (this._frozenEntries[i].key === key) {
                    return i;
                }
            }
            return -1;
        };
        WeakMap.prototype.delete = function (key) {
            if (key === undefined || key === null) {
                return false;
            }
            var entry = key[this._name];
            if (entry && entry.key === key && entry.value !== DELETED_1) {
                entry.value = DELETED_1;
                return true;
            }
            var frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                this._frozenEntries.splice(frozenIndex, 1);
                return true;
            }
            return false;
        };
        WeakMap.prototype.get = function (key) {
            if (key === undefined || key === null) {
                return undefined;
            }
            var entry = key[this._name];
            if (entry && entry.key === key && entry.value !== DELETED_1) {
                return entry.value;
            }
            var frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                return this._frozenEntries[frozenIndex].value;
            }
        };
        WeakMap.prototype.has = function (key) {
            if (key === undefined || key === null) {
                return false;
            }
            var entry = key[this._name];
            if (Boolean(entry && entry.key === key && entry.value !== DELETED_1)) {
                return true;
            }
            var frozenIndex = this._getFrozenEntryIndex(key);
            if (frozenIndex >= 0) {
                return true;
            }
            return false;
        };
        WeakMap.prototype.set = function (key, value) {
            if (!key || (typeof key !== 'object' && typeof key !== 'function')) {
                throw new TypeError('Invalid value used as weak map key');
            }
            var entry = key[this._name];
            if (!entry || entry.key !== key) {
                entry = Object.create(null, {
                    key: { value: key }
                });
                if (Object.isFrozen(key)) {
                    this._frozenEntries.push(entry);
                }
                else {
                    Object.defineProperty(key, this._name, {
                        value: entry
                    });
                }
            }
            entry.value = value;
            return this;
        };
        return WeakMap;
    }());
}
exports.default = exports.WeakMap;


/***/ }),

/***/ "./node_modules/@dojo/shim/array.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var iterator_1 = __webpack_require__("./node_modules/@dojo/shim/iterator.js");
var number_1 = __webpack_require__("./node_modules/@dojo/shim/number.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
var util_1 = __webpack_require__("./node_modules/@dojo/shim/support/util.js");
if (has_1.default('es6-array') && has_1.default('es6-array-fill')) {
    exports.from = global_1.default.Array.from;
    exports.of = global_1.default.Array.of;
    exports.copyWithin = util_1.wrapNative(global_1.default.Array.prototype.copyWithin);
    exports.fill = util_1.wrapNative(global_1.default.Array.prototype.fill);
    exports.find = util_1.wrapNative(global_1.default.Array.prototype.find);
    exports.findIndex = util_1.wrapNative(global_1.default.Array.prototype.findIndex);
}
else {
    // It is only older versions of Safari/iOS that have a bad fill implementation and so aren't in the wild
    // To make things easier, if there is a bad fill implementation, the whole set of functions will be filled
    /**
     * Ensures a non-negative, non-infinite, safe integer.
     *
     * @param length The number to validate
     * @return A proper length
     */
    var toLength_1 = function toLength(length) {
        if (isNaN(length)) {
            return 0;
        }
        length = Number(length);
        if (isFinite(length)) {
            length = Math.floor(length);
        }
        // Ensure a non-negative, real, safe integer
        return Math.min(Math.max(length, 0), number_1.MAX_SAFE_INTEGER);
    };
    /**
     * From ES6 7.1.4 ToInteger()
     *
     * @param value A value to convert
     * @return An integer
     */
    var toInteger_1 = function toInteger(value) {
        value = Number(value);
        if (isNaN(value)) {
            return 0;
        }
        if (value === 0 || !isFinite(value)) {
            return value;
        }
        return (value > 0 ? 1 : -1) * Math.floor(Math.abs(value));
    };
    /**
     * Normalizes an offset against a given length, wrapping it if negative.
     *
     * @param value The original offset
     * @param length The total length to normalize against
     * @return If negative, provide a distance from the end (length); otherwise provide a distance from 0
     */
    var normalizeOffset_1 = function normalizeOffset(value, length) {
        return value < 0 ? Math.max(length + value, 0) : Math.min(value, length);
    };
    exports.from = function from(arrayLike, mapFunction, thisArg) {
        if (arrayLike == null) {
            throw new TypeError('from: requires an array-like object');
        }
        if (mapFunction && thisArg) {
            mapFunction = mapFunction.bind(thisArg);
        }
        /* tslint:disable-next-line:variable-name */
        var Constructor = this;
        var length = toLength_1(arrayLike.length);
        // Support extension
        var array = typeof Constructor === 'function' ? Object(new Constructor(length)) : new Array(length);
        if (!iterator_1.isArrayLike(arrayLike) && !iterator_1.isIterable(arrayLike)) {
            return array;
        }
        // if this is an array and the normalized length is 0, just return an empty array. this prevents a problem
        // with the iteration on IE when using a NaN array length.
        if (iterator_1.isArrayLike(arrayLike)) {
            if (length === 0) {
                return [];
            }
            for (var i = 0; i < arrayLike.length; i++) {
                array[i] = mapFunction ? mapFunction(arrayLike[i], i) : arrayLike[i];
            }
        }
        else {
            var i = 0;
            try {
                for (var arrayLike_1 = tslib_1.__values(arrayLike), arrayLike_1_1 = arrayLike_1.next(); !arrayLike_1_1.done; arrayLike_1_1 = arrayLike_1.next()) {
                    var value = arrayLike_1_1.value;
                    array[i] = mapFunction ? mapFunction(value, i) : value;
                    i++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (arrayLike_1_1 && !arrayLike_1_1.done && (_a = arrayLike_1.return)) _a.call(arrayLike_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        if (arrayLike.length !== undefined) {
            array.length = length;
        }
        return array;
        var e_1, _a;
    };
    exports.of = function of() {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        return Array.prototype.slice.call(items);
    };
    exports.copyWithin = function copyWithin(target, offset, start, end) {
        if (target == null) {
            throw new TypeError('copyWithin: target must be an array-like object');
        }
        var length = toLength_1(target.length);
        offset = normalizeOffset_1(toInteger_1(offset), length);
        start = normalizeOffset_1(toInteger_1(start), length);
        end = normalizeOffset_1(end === undefined ? length : toInteger_1(end), length);
        var count = Math.min(end - start, length - offset);
        var direction = 1;
        if (offset > start && offset < start + count) {
            direction = -1;
            start += count - 1;
            offset += count - 1;
        }
        while (count > 0) {
            if (start in target) {
                target[offset] = target[start];
            }
            else {
                delete target[offset];
            }
            offset += direction;
            start += direction;
            count--;
        }
        return target;
    };
    exports.fill = function fill(target, value, start, end) {
        var length = toLength_1(target.length);
        var i = normalizeOffset_1(toInteger_1(start), length);
        end = normalizeOffset_1(end === undefined ? length : toInteger_1(end), length);
        while (i < end) {
            target[i++] = value;
        }
        return target;
    };
    exports.find = function find(target, callback, thisArg) {
        var index = exports.findIndex(target, callback, thisArg);
        return index !== -1 ? target[index] : undefined;
    };
    exports.findIndex = function findIndex(target, callback, thisArg) {
        var length = toLength_1(target.length);
        if (!callback) {
            throw new TypeError('find: second argument must be a function');
        }
        if (thisArg) {
            callback = callback.bind(thisArg);
        }
        for (var i = 0; i < length; i++) {
            if (callback(target[i], i, target)) {
                return i;
            }
        }
        return -1;
    };
}
if (has_1.default('es7-array')) {
    exports.includes = util_1.wrapNative(global_1.default.Array.prototype.includes);
}
else {
    /**
     * Ensures a non-negative, non-infinite, safe integer.
     *
     * @param length The number to validate
     * @return A proper length
     */
    var toLength_2 = function toLength(length) {
        length = Number(length);
        if (isNaN(length)) {
            return 0;
        }
        if (isFinite(length)) {
            length = Math.floor(length);
        }
        // Ensure a non-negative, real, safe integer
        return Math.min(Math.max(length, 0), number_1.MAX_SAFE_INTEGER);
    };
    exports.includes = function includes(target, searchElement, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        var len = toLength_2(target.length);
        for (var i = fromIndex; i < len; ++i) {
            var currentElement = target[i];
            if (searchElement === currentElement ||
                (searchElement !== searchElement && currentElement !== currentElement)) {
                return true;
            }
        }
        return false;
    };
}


/***/ }),

/***/ "./node_modules/@dojo/shim/global.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var globalObject = (function () {
    if (typeof global !== 'undefined') {
        // global spec defines a reference to the global object called 'global'
        // https://github.com/tc39/proposal-global
        // `global` is also defined in NodeJS
        return global;
    }
    else if (typeof window !== 'undefined') {
        // window is defined in browsers
        return window;
    }
    else if (typeof self !== 'undefined') {
        // self is defined in WebWorkers
        return self;
    }
})();
exports.default = globalObject;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@dojo/shim/iterator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__("./node_modules/@dojo/shim/Symbol.js");
var string_1 = __webpack_require__("./node_modules/@dojo/shim/string.js");
var staticDone = { done: true, value: undefined };
/**
 * A class that _shims_ an iterator interface on array like objects.
 */
var ShimIterator = /** @class */ (function () {
    function ShimIterator(list) {
        this._nextIndex = -1;
        if (isIterable(list)) {
            this._nativeIterator = list[Symbol.iterator]();
        }
        else {
            this._list = list;
        }
    }
    /**
     * Return the next iteration result for the Iterator
     */
    ShimIterator.prototype.next = function () {
        if (this._nativeIterator) {
            return this._nativeIterator.next();
        }
        if (!this._list) {
            return staticDone;
        }
        if (++this._nextIndex < this._list.length) {
            return {
                done: false,
                value: this._list[this._nextIndex]
            };
        }
        return staticDone;
    };
    ShimIterator.prototype[Symbol.iterator] = function () {
        return this;
    };
    return ShimIterator;
}());
exports.ShimIterator = ShimIterator;
/**
 * A type guard for checking if something has an Iterable interface
 *
 * @param value The value to type guard against
 */
function isIterable(value) {
    return value && typeof value[Symbol.iterator] === 'function';
}
exports.isIterable = isIterable;
/**
 * A type guard for checking if something is ArrayLike
 *
 * @param value The value to type guard against
 */
function isArrayLike(value) {
    return value && typeof value.length === 'number';
}
exports.isArrayLike = isArrayLike;
/**
 * Returns the iterator for an object
 *
 * @param iterable The iterable object to return the iterator for
 */
function get(iterable) {
    if (isIterable(iterable)) {
        return iterable[Symbol.iterator]();
    }
    else if (isArrayLike(iterable)) {
        return new ShimIterator(iterable);
    }
}
exports.get = get;
/**
 * Shims the functionality of `for ... of` blocks
 *
 * @param iterable The object the provides an interator interface
 * @param callback The callback which will be called for each item of the iterable
 * @param thisArg Optional scope to pass the callback
 */
function forOf(iterable, callback, thisArg) {
    var broken = false;
    function doBreak() {
        broken = true;
    }
    /* We need to handle iteration of double byte strings properly */
    if (isArrayLike(iterable) && typeof iterable === 'string') {
        var l = iterable.length;
        for (var i = 0; i < l; ++i) {
            var char = iterable[i];
            if (i + 1 < l) {
                var code = char.charCodeAt(0);
                if (code >= string_1.HIGH_SURROGATE_MIN && code <= string_1.HIGH_SURROGATE_MAX) {
                    char += iterable[++i];
                }
            }
            callback.call(thisArg, char, iterable, doBreak);
            if (broken) {
                return;
            }
        }
    }
    else {
        var iterator = get(iterable);
        if (iterator) {
            var result = iterator.next();
            while (!result.done) {
                callback.call(thisArg, result.value, iterable, doBreak);
                if (broken) {
                    return;
                }
                result = iterator.next();
            }
        }
    }
}
exports.forOf = forOf;


/***/ }),

/***/ "./node_modules/@dojo/shim/number.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
/**
 * The smallest interval between two representable numbers.
 */
exports.EPSILON = 1;
/**
 * The maximum safe integer in JavaScript
 */
exports.MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
/**
 * The minimum safe integer in JavaScript
 */
exports.MIN_SAFE_INTEGER = -exports.MAX_SAFE_INTEGER;
/**
 * Determines whether the passed value is NaN without coersion.
 *
 * @param value The value to test
 * @return true if the value is NaN, false if it is not
 */
function isNaN(value) {
    return typeof value === 'number' && global_1.default.isNaN(value);
}
exports.isNaN = isNaN;
/**
 * Determines whether the passed value is a finite number without coersion.
 *
 * @param value The value to test
 * @return true if the value is finite, false if it is not
 */
function isFinite(value) {
    return typeof value === 'number' && global_1.default.isFinite(value);
}
exports.isFinite = isFinite;
/**
 * Determines whether the passed value is an integer.
 *
 * @param value The value to test
 * @return true if the value is an integer, false if it is not
 */
function isInteger(value) {
    return isFinite(value) && Math.floor(value) === value;
}
exports.isInteger = isInteger;
/**
 * Determines whether the passed value is an integer that is 'safe,' meaning:
 *   1. it can be expressed as an IEEE-754 double precision number
 *   2. it has a one-to-one mapping to a mathematical integer, meaning its
 *      IEEE-754 representation cannot be the result of rounding any other
 *      integer to fit the IEEE-754 representation
 *
 * @param value The value to test
 * @return true if the value is an integer, false if it is not
 */
function isSafeInteger(value) {
    return isInteger(value) && Math.abs(value) <= exports.MAX_SAFE_INTEGER;
}
exports.isSafeInteger = isSafeInteger;


/***/ }),

/***/ "./node_modules/@dojo/shim/object.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
var Symbol_1 = __webpack_require__("./node_modules/@dojo/shim/Symbol.js");
if (has_1.default('es6-object')) {
    var globalObject = global_1.default.Object;
    exports.assign = globalObject.assign;
    exports.getOwnPropertyDescriptor = globalObject.getOwnPropertyDescriptor;
    exports.getOwnPropertyNames = globalObject.getOwnPropertyNames;
    exports.getOwnPropertySymbols = globalObject.getOwnPropertySymbols;
    exports.is = globalObject.is;
    exports.keys = globalObject.keys;
}
else {
    exports.keys = function symbolAwareKeys(o) {
        return Object.keys(o).filter(function (key) { return !Boolean(key.match(/^@@.+/)); });
    };
    exports.assign = function assign(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (target == null) {
            // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var to = Object(target);
        sources.forEach(function (nextSource) {
            if (nextSource) {
                // Skip over if undefined or null
                exports.keys(nextSource).forEach(function (nextKey) {
                    to[nextKey] = nextSource[nextKey];
                });
            }
        });
        return to;
    };
    exports.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(o, prop) {
        if (Symbol_1.isSymbol(prop)) {
            return Object.getOwnPropertyDescriptor(o, prop);
        }
        else {
            return Object.getOwnPropertyDescriptor(o, prop);
        }
    };
    exports.getOwnPropertyNames = function getOwnPropertyNames(o) {
        return Object.getOwnPropertyNames(o).filter(function (key) { return !Boolean(key.match(/^@@.+/)); });
    };
    exports.getOwnPropertySymbols = function getOwnPropertySymbols(o) {
        return Object.getOwnPropertyNames(o)
            .filter(function (key) { return Boolean(key.match(/^@@.+/)); })
            .map(function (key) { return Symbol.for(key.substring(2)); });
    };
    exports.is = function is(value1, value2) {
        if (value1 === value2) {
            return value1 !== 0 || 1 / value1 === 1 / value2; // -0
        }
        return value1 !== value1 && value2 !== value2; // NaN
    };
}
if (has_1.default('es2017-object')) {
    var globalObject = global_1.default.Object;
    exports.getOwnPropertyDescriptors = globalObject.getOwnPropertyDescriptors;
    exports.entries = globalObject.entries;
    exports.values = globalObject.values;
}
else {
    exports.getOwnPropertyDescriptors = function getOwnPropertyDescriptors(o) {
        return exports.getOwnPropertyNames(o).reduce(function (previous, key) {
            previous[key] = exports.getOwnPropertyDescriptor(o, key);
            return previous;
        }, {});
    };
    exports.entries = function entries(o) {
        return exports.keys(o).map(function (key) { return [key, o[key]]; });
    };
    exports.values = function values(o) {
        return exports.keys(o).map(function (key) { return o[key]; });
    };
}


/***/ }),

/***/ "./node_modules/@dojo/shim/string.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
var util_1 = __webpack_require__("./node_modules/@dojo/shim/support/util.js");
/**
 * The minimum location of high surrogates
 */
exports.HIGH_SURROGATE_MIN = 0xd800;
/**
 * The maximum location of high surrogates
 */
exports.HIGH_SURROGATE_MAX = 0xdbff;
/**
 * The minimum location of low surrogates
 */
exports.LOW_SURROGATE_MIN = 0xdc00;
/**
 * The maximum location of low surrogates
 */
exports.LOW_SURROGATE_MAX = 0xdfff;
if (has_1.default('es6-string') && has_1.default('es6-string-raw')) {
    exports.fromCodePoint = global_1.default.String.fromCodePoint;
    exports.raw = global_1.default.String.raw;
    exports.codePointAt = util_1.wrapNative(global_1.default.String.prototype.codePointAt);
    exports.endsWith = util_1.wrapNative(global_1.default.String.prototype.endsWith);
    exports.includes = util_1.wrapNative(global_1.default.String.prototype.includes);
    exports.normalize = util_1.wrapNative(global_1.default.String.prototype.normalize);
    exports.repeat = util_1.wrapNative(global_1.default.String.prototype.repeat);
    exports.startsWith = util_1.wrapNative(global_1.default.String.prototype.startsWith);
}
else {
    /**
     * Validates that text is defined, and normalizes position (based on the given default if the input is NaN).
     * Used by startsWith, includes, and endsWith.
     *
     * @return Normalized position.
     */
    var normalizeSubstringArgs_1 = function (name, text, search, position, isEnd) {
        if (isEnd === void 0) { isEnd = false; }
        if (text == null) {
            throw new TypeError('string.' + name + ' requires a valid string to search against.');
        }
        var length = text.length;
        position = position !== position ? (isEnd ? length : 0) : position;
        return [text, String(search), Math.min(Math.max(position, 0), length)];
    };
    exports.fromCodePoint = function fromCodePoint() {
        var codePoints = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            codePoints[_i] = arguments[_i];
        }
        // Adapted from https://github.com/mathiasbynens/String.fromCodePoint
        var length = arguments.length;
        if (!length) {
            return '';
        }
        var fromCharCode = String.fromCharCode;
        var MAX_SIZE = 0x4000;
        var codeUnits = [];
        var index = -1;
        var result = '';
        while (++index < length) {
            var codePoint = Number(arguments[index]);
            // Code points must be finite integers within the valid range
            var isValid = isFinite(codePoint) && Math.floor(codePoint) === codePoint && codePoint >= 0 && codePoint <= 0x10ffff;
            if (!isValid) {
                throw RangeError('string.fromCodePoint: Invalid code point ' + codePoint);
            }
            if (codePoint <= 0xffff) {
                // BMP code point
                codeUnits.push(codePoint);
            }
            else {
                // Astral code point; split in surrogate halves
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                codePoint -= 0x10000;
                var highSurrogate = (codePoint >> 10) + exports.HIGH_SURROGATE_MIN;
                var lowSurrogate = codePoint % 0x400 + exports.LOW_SURROGATE_MIN;
                codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += fromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
            }
        }
        return result;
    };
    exports.raw = function raw(callSite) {
        var substitutions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            substitutions[_i - 1] = arguments[_i];
        }
        var rawStrings = callSite.raw;
        var result = '';
        var numSubstitutions = substitutions.length;
        if (callSite == null || callSite.raw == null) {
            throw new TypeError('string.raw requires a valid callSite object with a raw value');
        }
        for (var i = 0, length_1 = rawStrings.length; i < length_1; i++) {
            result += rawStrings[i] + (i < numSubstitutions && i < length_1 - 1 ? substitutions[i] : '');
        }
        return result;
    };
    exports.codePointAt = function codePointAt(text, position) {
        if (position === void 0) { position = 0; }
        // Adapted from https://github.com/mathiasbynens/String.prototype.codePointAt
        if (text == null) {
            throw new TypeError('string.codePointAt requries a valid string.');
        }
        var length = text.length;
        if (position !== position) {
            position = 0;
        }
        if (position < 0 || position >= length) {
            return undefined;
        }
        // Get the first code unit
        var first = text.charCodeAt(position);
        if (first >= exports.HIGH_SURROGATE_MIN && first <= exports.HIGH_SURROGATE_MAX && length > position + 1) {
            // Start of a surrogate pair (high surrogate and there is a next code unit); check for low surrogate
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            var second = text.charCodeAt(position + 1);
            if (second >= exports.LOW_SURROGATE_MIN && second <= exports.LOW_SURROGATE_MAX) {
                return (first - exports.HIGH_SURROGATE_MIN) * 0x400 + second - exports.LOW_SURROGATE_MIN + 0x10000;
            }
        }
        return first;
    };
    exports.endsWith = function endsWith(text, search, endPosition) {
        if (endPosition == null) {
            endPosition = text.length;
        }
        _a = tslib_1.__read(normalizeSubstringArgs_1('endsWith', text, search, endPosition, true), 3), text = _a[0], search = _a[1], endPosition = _a[2];
        var start = endPosition - search.length;
        if (start < 0) {
            return false;
        }
        return text.slice(start, endPosition) === search;
        var _a;
    };
    exports.includes = function includes(text, search, position) {
        if (position === void 0) { position = 0; }
        _a = tslib_1.__read(normalizeSubstringArgs_1('includes', text, search, position), 3), text = _a[0], search = _a[1], position = _a[2];
        return text.indexOf(search, position) !== -1;
        var _a;
    };
    exports.repeat = function repeat(text, count) {
        if (count === void 0) { count = 0; }
        // Adapted from https://github.com/mathiasbynens/String.prototype.repeat
        if (text == null) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (count !== count) {
            count = 0;
        }
        if (count < 0 || count === Infinity) {
            throw new RangeError('string.repeat requires a non-negative finite count.');
        }
        var result = '';
        while (count) {
            if (count % 2) {
                result += text;
            }
            if (count > 1) {
                text += text;
            }
            count >>= 1;
        }
        return result;
    };
    exports.startsWith = function startsWith(text, search, position) {
        if (position === void 0) { position = 0; }
        search = String(search);
        _a = tslib_1.__read(normalizeSubstringArgs_1('startsWith', text, search, position), 3), text = _a[0], search = _a[1], position = _a[2];
        var end = position + search.length;
        if (end > text.length) {
            return false;
        }
        return text.slice(position, end) === search;
        var _a;
    };
}
if (has_1.default('es2017-string')) {
    exports.padEnd = util_1.wrapNative(global_1.default.String.prototype.padEnd);
    exports.padStart = util_1.wrapNative(global_1.default.String.prototype.padStart);
}
else {
    exports.padEnd = function padEnd(text, maxLength, fillString) {
        if (fillString === void 0) { fillString = ' '; }
        if (text === null || text === undefined) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (maxLength === Infinity) {
            throw new RangeError('string.padEnd requires a non-negative finite count.');
        }
        if (maxLength === null || maxLength === undefined || maxLength < 0) {
            maxLength = 0;
        }
        var strText = String(text);
        var padding = maxLength - strText.length;
        if (padding > 0) {
            strText +=
                exports.repeat(fillString, Math.floor(padding / fillString.length)) +
                    fillString.slice(0, padding % fillString.length);
        }
        return strText;
    };
    exports.padStart = function padStart(text, maxLength, fillString) {
        if (fillString === void 0) { fillString = ' '; }
        if (text === null || text === undefined) {
            throw new TypeError('string.repeat requires a valid string.');
        }
        if (maxLength === Infinity) {
            throw new RangeError('string.padStart requires a non-negative finite count.');
        }
        if (maxLength === null || maxLength === undefined || maxLength < 0) {
            maxLength = 0;
        }
        var strText = String(text);
        var padding = maxLength - strText.length;
        if (padding > 0) {
            strText =
                exports.repeat(fillString, Math.floor(padding / fillString.length)) +
                    fillString.slice(0, padding % fillString.length) +
                    strText;
        }
        return strText;
    };
}


/***/ }),

/***/ "./node_modules/@dojo/shim/support/has.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var has_1 = __webpack_require__("./node_modules/@dojo/has/has.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
exports.default = has_1.default;
tslib_1.__exportStar(__webpack_require__("./node_modules/@dojo/has/has.js"), exports);
/* ECMAScript 6 and 7 Features */
/* Array */
has_1.add('es6-array', function () {
    return (['from', 'of'].every(function (key) { return key in global_1.default.Array; }) &&
        ['findIndex', 'find', 'copyWithin'].every(function (key) { return key in global_1.default.Array.prototype; }));
}, true);
has_1.add('es6-array-fill', function () {
    if ('fill' in global_1.default.Array.prototype) {
        /* Some versions of Safari do not properly implement this */
        return [1].fill(9, Number.POSITIVE_INFINITY)[0] === 1;
    }
    return false;
}, true);
has_1.add('es7-array', function () { return 'includes' in global_1.default.Array.prototype; }, true);
/* Map */
has_1.add('es6-map', function () {
    if (typeof global_1.default.Map === 'function') {
        /*
    IE11 and older versions of Safari are missing critical ES6 Map functionality
    We wrap this in a try/catch because sometimes the Map constructor exists, but does not
    take arguments (iOS 8.4)
     */
        try {
            var map = new global_1.default.Map([[0, 1]]);
            return (map.has(0) &&
                typeof map.keys === 'function' &&
                has_1.default('es6-symbol') &&
                typeof map.values === 'function' &&
                typeof map.entries === 'function');
        }
        catch (e) {
            /* istanbul ignore next: not testing on iOS at the moment */
            return false;
        }
    }
    return false;
}, true);
/* Math */
has_1.add('es6-math', function () {
    return [
        'clz32',
        'sign',
        'log10',
        'log2',
        'log1p',
        'expm1',
        'cosh',
        'sinh',
        'tanh',
        'acosh',
        'asinh',
        'atanh',
        'trunc',
        'fround',
        'cbrt',
        'hypot'
    ].every(function (name) { return typeof global_1.default.Math[name] === 'function'; });
}, true);
has_1.add('es6-math-imul', function () {
    if ('imul' in global_1.default.Math) {
        /* Some versions of Safari on ios do not properly implement this */
        return Math.imul(0xffffffff, 5) === -5;
    }
    return false;
}, true);
/* Object */
has_1.add('es6-object', function () {
    return (has_1.default('es6-symbol') &&
        ['assign', 'is', 'getOwnPropertySymbols', 'setPrototypeOf'].every(function (name) { return typeof global_1.default.Object[name] === 'function'; }));
}, true);
has_1.add('es2017-object', function () {
    return ['values', 'entries', 'getOwnPropertyDescriptors'].every(function (name) { return typeof global_1.default.Object[name] === 'function'; });
}, true);
/* Observable */
has_1.add('es-observable', function () { return typeof global_1.default.Observable !== 'undefined'; }, true);
/* Promise */
has_1.add('es6-promise', function () { return typeof global_1.default.Promise !== 'undefined' && has_1.default('es6-symbol'); }, true);
/* Set */
has_1.add('es6-set', function () {
    if (typeof global_1.default.Set === 'function') {
        /* IE11 and older versions of Safari are missing critical ES6 Set functionality */
        var set = new global_1.default.Set([1]);
        return set.has(1) && 'keys' in set && typeof set.keys === 'function' && has_1.default('es6-symbol');
    }
    return false;
}, true);
/* String */
has_1.add('es6-string', function () {
    return ([
        /* static methods */
        'fromCodePoint'
    ].every(function (key) { return typeof global_1.default.String[key] === 'function'; }) &&
        [
            /* instance methods */
            'codePointAt',
            'normalize',
            'repeat',
            'startsWith',
            'endsWith',
            'includes'
        ].every(function (key) { return typeof global_1.default.String.prototype[key] === 'function'; }));
}, true);
has_1.add('es6-string-raw', function () {
    function getCallSite(callSite) {
        var substitutions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            substitutions[_i - 1] = arguments[_i];
        }
        var result = tslib_1.__spread(callSite);
        result.raw = callSite.raw;
        return result;
    }
    if ('raw' in global_1.default.String) {
        var b = 1;
        var callSite = getCallSite(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["a\n", ""], ["a\\n", ""])), b);
        callSite.raw = ['a\\n'];
        var supportsTrunc = global_1.default.String.raw(callSite, 42) === 'a:\\n';
        return supportsTrunc;
    }
    return false;
}, true);
has_1.add('es2017-string', function () {
    return ['padStart', 'padEnd'].every(function (key) { return typeof global_1.default.String.prototype[key] === 'function'; });
}, true);
/* Symbol */
has_1.add('es6-symbol', function () { return typeof global_1.default.Symbol !== 'undefined' && typeof Symbol() === 'symbol'; }, true);
/* WeakMap */
has_1.add('es6-weakmap', function () {
    if (typeof global_1.default.WeakMap !== 'undefined') {
        /* IE11 and older versions of Safari are missing critical ES6 Map functionality */
        var key1 = {};
        var key2 = {};
        var map = new global_1.default.WeakMap([[key1, 1]]);
        Object.freeze(key1);
        return map.get(key1) === 1 && map.set(key2, 2) === map && has_1.default('es6-symbol');
    }
    return false;
}, true);
/* Miscellaneous features */
has_1.add('microtasks', function () { return has_1.default('es6-promise') || has_1.default('host-node') || has_1.default('dom-mutationobserver'); }, true);
has_1.add('postmessage', function () {
    // If window is undefined, and we have postMessage, it probably means we're in a web worker. Web workers have
    // post message but it doesn't work how we expect it to, so it's best just to pretend it doesn't exist.
    return typeof global_1.default.window !== 'undefined' && typeof global_1.default.postMessage === 'function';
}, true);
has_1.add('raf', function () { return typeof global_1.default.requestAnimationFrame === 'function'; }, true);
has_1.add('setimmediate', function () { return typeof global_1.default.setImmediate !== 'undefined'; }, true);
/* DOM Features */
has_1.add('dom-mutationobserver', function () {
    if (has_1.default('host-browser') && Boolean(global_1.default.MutationObserver || global_1.default.WebKitMutationObserver)) {
        // IE11 has an unreliable MutationObserver implementation where setProperty() does not
        // generate a mutation event, observers can crash, and the queue does not drain
        // reliably. The following feature test was adapted from
        // https://gist.github.com/t10ko/4aceb8c71681fdb275e33efe5e576b14
        var example = document.createElement('div');
        /* tslint:disable-next-line:variable-name */
        var HostMutationObserver = global_1.default.MutationObserver || global_1.default.WebKitMutationObserver;
        var observer = new HostMutationObserver(function () { });
        observer.observe(example, { attributes: true });
        example.style.setProperty('display', 'block');
        return Boolean(observer.takeRecords().length);
    }
    return false;
}, true);
has_1.add('dom-webanimation', function () { return has_1.default('host-browser') && global_1.default.Animation !== undefined && global_1.default.KeyframeEffect !== undefined; }, true);
var templateObject_1;


/***/ }),

/***/ "./node_modules/@dojo/shim/support/queue.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
Object.defineProperty(exports, "__esModule", { value: true });
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var has_1 = __webpack_require__("./node_modules/@dojo/shim/support/has.js");
function executeTask(item) {
    if (item && item.isActive && item.callback) {
        item.callback();
    }
}
function getQueueHandle(item, destructor) {
    return {
        destroy: function () {
            this.destroy = function () { };
            item.isActive = false;
            item.callback = null;
            if (destructor) {
                destructor();
            }
        }
    };
}
var checkMicroTaskQueue;
var microTasks;
/**
 * Schedules a callback to the macrotask queue.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
exports.queueTask = (function () {
    var destructor;
    var enqueue;
    // Since the IE implementation of `setImmediate` is not flawless, we will test for `postMessage` first.
    if (has_1.default('postmessage')) {
        var queue_1 = [];
        global_1.default.addEventListener('message', function (event) {
            // Confirm that the event was triggered by the current window and by this particular implementation.
            if (event.source === global_1.default && event.data === 'dojo-queue-message') {
                event.stopPropagation();
                if (queue_1.length) {
                    executeTask(queue_1.shift());
                }
            }
        });
        enqueue = function (item) {
            queue_1.push(item);
            global_1.default.postMessage('dojo-queue-message', '*');
        };
    }
    else if (has_1.default('setimmediate')) {
        destructor = global_1.default.clearImmediate;
        enqueue = function (item) {
            return setImmediate(executeTask.bind(null, item));
        };
    }
    else {
        destructor = global_1.default.clearTimeout;
        enqueue = function (item) {
            return setTimeout(executeTask.bind(null, item), 0);
        };
    }
    function queueTask(callback) {
        var item = {
            isActive: true,
            callback: callback
        };
        var id = enqueue(item);
        return getQueueHandle(item, destructor &&
            function () {
                destructor(id);
            });
    }
    // TODO: Use aspect.before when it is available.
    return has_1.default('microtasks')
        ? queueTask
        : function (callback) {
            checkMicroTaskQueue();
            return queueTask(callback);
        };
})();
// When no mechanism for registering microtasks is exposed by the environment, microtasks will
// be queued and then executed in a single macrotask before the other macrotasks are executed.
if (!has_1.default('microtasks')) {
    var isMicroTaskQueued_1 = false;
    microTasks = [];
    checkMicroTaskQueue = function () {
        if (!isMicroTaskQueued_1) {
            isMicroTaskQueued_1 = true;
            exports.queueTask(function () {
                isMicroTaskQueued_1 = false;
                if (microTasks.length) {
                    var item = void 0;
                    while ((item = microTasks.shift())) {
                        executeTask(item);
                    }
                }
            });
        }
    };
}
/**
 * Schedules an animation task with `window.requestAnimationFrame` if it exists, or with `queueTask` otherwise.
 *
 * Since requestAnimationFrame's behavior does not match that expected from `queueTask`, it is not used there.
 * However, at times it makes more sense to delegate to requestAnimationFrame; hence the following method.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
exports.queueAnimationTask = (function () {
    if (!has_1.default('raf')) {
        return exports.queueTask;
    }
    function queueAnimationTask(callback) {
        var item = {
            isActive: true,
            callback: callback
        };
        var rafId = requestAnimationFrame(executeTask.bind(null, item));
        return getQueueHandle(item, function () {
            cancelAnimationFrame(rafId);
        });
    }
    // TODO: Use aspect.before when it is available.
    return has_1.default('microtasks')
        ? queueAnimationTask
        : function (callback) {
            checkMicroTaskQueue();
            return queueAnimationTask(callback);
        };
})();
/**
 * Schedules a callback to the microtask queue.
 *
 * Any callbacks registered with `queueMicroTask` will be executed before the next macrotask. If no native
 * mechanism for scheduling macrotasks is exposed, then any callbacks will be fired before any macrotask
 * registered with `queueTask` or `queueAnimationTask`.
 *
 * @param callback the function to be queued and later executed.
 * @returns An object with a `destroy` method that, when called, prevents the registered callback from executing.
 */
exports.queueMicroTask = (function () {
    var enqueue;
    if (has_1.default('host-node')) {
        enqueue = function (item) {
            global_1.default.process.nextTick(executeTask.bind(null, item));
        };
    }
    else if (has_1.default('es6-promise')) {
        enqueue = function (item) {
            global_1.default.Promise.resolve(item).then(executeTask);
        };
    }
    else if (has_1.default('dom-mutationobserver')) {
        /* tslint:disable-next-line:variable-name */
        var HostMutationObserver = global_1.default.MutationObserver || global_1.default.WebKitMutationObserver;
        var node_1 = document.createElement('div');
        var queue_2 = [];
        var observer = new HostMutationObserver(function () {
            while (queue_2.length > 0) {
                var item = queue_2.shift();
                if (item && item.isActive && item.callback) {
                    item.callback();
                }
            }
        });
        observer.observe(node_1, { attributes: true });
        enqueue = function (item) {
            queue_2.push(item);
            node_1.setAttribute('queueStatus', '1');
        };
    }
    else {
        enqueue = function (item) {
            checkMicroTaskQueue();
            microTasks.push(item);
        };
    }
    return function (callback) {
        var item = {
            isActive: true,
            callback: callback
        };
        enqueue(item);
        return getQueueHandle(item);
    };
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/@dojo/shim/support/util.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper function to generate a value property descriptor
 *
 * @param value        The value the property descriptor should be set to
 * @param enumerable   If the property should be enumberable, defaults to false
 * @param writable     If the property should be writable, defaults to true
 * @param configurable If the property should be configurable, defaults to true
 * @return             The property descriptor object
 */
function getValueDescriptor(value, enumerable, writable, configurable) {
    if (enumerable === void 0) { enumerable = false; }
    if (writable === void 0) { writable = true; }
    if (configurable === void 0) { configurable = true; }
    return {
        value: value,
        enumerable: enumerable,
        writable: writable,
        configurable: configurable
    };
}
exports.getValueDescriptor = getValueDescriptor;
function wrapNative(nativeFunction) {
    return function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return nativeFunction.apply(target, args);
    };
}
exports.wrapNative = wrapNative;


/***/ }),

/***/ "./node_modules/@dojo/widget-core/NodeHandler.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Evented_1 = __webpack_require__("./node_modules/@dojo/core/Evented.js");
var Map_1 = __webpack_require__("./node_modules/@dojo/shim/Map.js");
/**
 * Enum to identify the type of event.
 * Listening to 'Projector' will notify when projector is created or updated
 * Listening to 'Widget' will notify when widget root is created or updated
 */
var NodeEventType;
(function (NodeEventType) {
    NodeEventType["Projector"] = "Projector";
    NodeEventType["Widget"] = "Widget";
})(NodeEventType = exports.NodeEventType || (exports.NodeEventType = {}));
var NodeHandler = /** @class */ (function (_super) {
    tslib_1.__extends(NodeHandler, _super);
    function NodeHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._nodeMap = new Map_1.default();
        return _this;
    }
    NodeHandler.prototype.get = function (key) {
        return this._nodeMap.get(key);
    };
    NodeHandler.prototype.has = function (key) {
        return this._nodeMap.has(key);
    };
    NodeHandler.prototype.add = function (element, key) {
        this._nodeMap.set(key, element);
        this.emit({ type: key });
    };
    NodeHandler.prototype.addRoot = function () {
        this.emit({ type: NodeEventType.Widget });
    };
    NodeHandler.prototype.addProjector = function () {
        this.emit({ type: NodeEventType.Projector });
    };
    NodeHandler.prototype.clear = function () {
        this._nodeMap.clear();
    };
    return NodeHandler;
}(Evented_1.Evented));
exports.NodeHandler = NodeHandler;
exports.default = NodeHandler;


/***/ }),

/***/ "./node_modules/@dojo/widget-core/Registry.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Promise_1 = __webpack_require__("./node_modules/@dojo/shim/Promise.js");
var Map_1 = __webpack_require__("./node_modules/@dojo/shim/Map.js");
var Symbol_1 = __webpack_require__("./node_modules/@dojo/shim/Symbol.js");
var Evented_1 = __webpack_require__("./node_modules/@dojo/core/Evented.js");
/**
 * Widget base symbol type
 */
exports.WIDGET_BASE_TYPE = Symbol_1.default('Widget Base');
/**
 * Checks is the item is a subclass of WidgetBase (or a WidgetBase)
 *
 * @param item the item to check
 * @returns true/false indicating if the item is a WidgetBaseConstructor
 */
function isWidgetBaseConstructor(item) {
    return Boolean(item && item._type === exports.WIDGET_BASE_TYPE);
}
exports.isWidgetBaseConstructor = isWidgetBaseConstructor;
function isWidgetConstructorDefaultExport(item) {
    return Boolean(item &&
        item.hasOwnProperty('__esModule') &&
        item.hasOwnProperty('default') &&
        isWidgetBaseConstructor(item.default));
}
exports.isWidgetConstructorDefaultExport = isWidgetConstructorDefaultExport;
/**
 * The Registry implementation
 */
var Registry = /** @class */ (function (_super) {
    tslib_1.__extends(Registry, _super);
    function Registry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Emit loaded event for registry label
     */
    Registry.prototype.emitLoadedEvent = function (widgetLabel, item) {
        this.emit({
            type: widgetLabel,
            action: 'loaded',
            item: item
        });
    };
    Registry.prototype.define = function (label, item) {
        var _this = this;
        if (this._widgetRegistry === undefined) {
            this._widgetRegistry = new Map_1.default();
        }
        if (this._widgetRegistry.has(label)) {
            throw new Error("widget has already been registered for '" + label.toString() + "'");
        }
        this._widgetRegistry.set(label, item);
        if (item instanceof Promise_1.default) {
            item.then(function (widgetCtor) {
                _this._widgetRegistry.set(label, widgetCtor);
                _this.emitLoadedEvent(label, widgetCtor);
                return widgetCtor;
            }, function (error) {
                throw error;
            });
        }
        else if (isWidgetBaseConstructor(item)) {
            this.emitLoadedEvent(label, item);
        }
    };
    Registry.prototype.defineInjector = function (label, injectorFactory) {
        if (this._injectorRegistry === undefined) {
            this._injectorRegistry = new Map_1.default();
        }
        if (this._injectorRegistry.has(label)) {
            throw new Error("injector has already been registered for '" + label.toString() + "'");
        }
        var invalidator = new Evented_1.Evented();
        var injectorItem = {
            injector: injectorFactory(function () { return invalidator.emit({ type: 'invalidate' }); }),
            invalidator: invalidator
        };
        this._injectorRegistry.set(label, injectorItem);
        this.emitLoadedEvent(label, injectorItem);
    };
    Registry.prototype.get = function (label) {
        var _this = this;
        if (!this._widgetRegistry || !this.has(label)) {
            return null;
        }
        var item = this._widgetRegistry.get(label);
        if (isWidgetBaseConstructor(item)) {
            return item;
        }
        if (item instanceof Promise_1.default) {
            return null;
        }
        var promise = item();
        this._widgetRegistry.set(label, promise);
        promise.then(function (widgetCtor) {
            if (isWidgetConstructorDefaultExport(widgetCtor)) {
                widgetCtor = widgetCtor.default;
            }
            _this._widgetRegistry.set(label, widgetCtor);
            _this.emitLoadedEvent(label, widgetCtor);
            return widgetCtor;
        }, function (error) {
            throw error;
        });
        return null;
    };
    Registry.prototype.getInjector = function (label) {
        if (!this._injectorRegistry || !this.hasInjector(label)) {
            return null;
        }
        return this._injectorRegistry.get(label);
    };
    Registry.prototype.has = function (label) {
        return Boolean(this._widgetRegistry && this._widgetRegistry.has(label));
    };
    Registry.prototype.hasInjector = function (label) {
        return Boolean(this._injectorRegistry && this._injectorRegistry.has(label));
    };
    return Registry;
}(Evented_1.Evented));
exports.Registry = Registry;
exports.default = Registry;


/***/ }),

/***/ "./node_modules/@dojo/widget-core/RegistryHandler.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Map_1 = __webpack_require__("./node_modules/@dojo/shim/Map.js");
var Evented_1 = __webpack_require__("./node_modules/@dojo/core/Evented.js");
var Registry_1 = __webpack_require__("./node_modules/@dojo/widget-core/Registry.js");
var RegistryHandler = /** @class */ (function (_super) {
    tslib_1.__extends(RegistryHandler, _super);
    function RegistryHandler() {
        var _this = _super.call(this) || this;
        _this._registry = new Registry_1.Registry();
        _this._registryWidgetLabelMap = new Map_1.Map();
        _this._registryInjectorLabelMap = new Map_1.Map();
        _this.own(_this._registry);
        var destroy = function () {
            if (_this.baseRegistry) {
                _this._registryWidgetLabelMap.delete(_this.baseRegistry);
                _this._registryInjectorLabelMap.delete(_this.baseRegistry);
                _this.baseRegistry = undefined;
            }
        };
        _this.own({ destroy: destroy });
        return _this;
    }
    Object.defineProperty(RegistryHandler.prototype, "base", {
        set: function (baseRegistry) {
            if (this.baseRegistry) {
                this._registryWidgetLabelMap.delete(this.baseRegistry);
                this._registryInjectorLabelMap.delete(this.baseRegistry);
            }
            this.baseRegistry = baseRegistry;
        },
        enumerable: true,
        configurable: true
    });
    RegistryHandler.prototype.define = function (label, widget) {
        this._registry.define(label, widget);
    };
    RegistryHandler.prototype.defineInjector = function (label, injector) {
        this._registry.defineInjector(label, injector);
    };
    RegistryHandler.prototype.has = function (label) {
        return this._registry.has(label) || Boolean(this.baseRegistry && this.baseRegistry.has(label));
    };
    RegistryHandler.prototype.hasInjector = function (label) {
        return this._registry.hasInjector(label) || Boolean(this.baseRegistry && this.baseRegistry.hasInjector(label));
    };
    RegistryHandler.prototype.get = function (label, globalPrecedence) {
        if (globalPrecedence === void 0) { globalPrecedence = false; }
        return this._get(label, globalPrecedence, 'get', this._registryWidgetLabelMap);
    };
    RegistryHandler.prototype.getInjector = function (label, globalPrecedence) {
        if (globalPrecedence === void 0) { globalPrecedence = false; }
        return this._get(label, globalPrecedence, 'getInjector', this._registryInjectorLabelMap);
    };
    RegistryHandler.prototype._get = function (label, globalPrecedence, getFunctionName, labelMap) {
        var _this = this;
        var registries = globalPrecedence ? [this.baseRegistry, this._registry] : [this._registry, this.baseRegistry];
        for (var i = 0; i < registries.length; i++) {
            var registry = registries[i];
            if (!registry) {
                continue;
            }
            var item = registry[getFunctionName](label);
            var registeredLabels = labelMap.get(registry) || [];
            if (item) {
                return item;
            }
            else if (registeredLabels.indexOf(label) === -1) {
                var handle = registry.on(label, function (event) {
                    if (event.action === 'loaded' &&
                        _this[getFunctionName](label, globalPrecedence) === event.item) {
                        _this.emit({ type: 'invalidate' });
                    }
                });
                this.own(handle);
                labelMap.set(registry, tslib_1.__spread(registeredLabels, [label]));
            }
        }
        return null;
    };
    return RegistryHandler;
}(Evented_1.Evented));
exports.RegistryHandler = RegistryHandler;
exports.default = RegistryHandler;


/***/ }),

/***/ "./node_modules/@dojo/widget-core/WidgetBase.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Map_1 = __webpack_require__("./node_modules/@dojo/shim/Map.js");
var WeakMap_1 = __webpack_require__("./node_modules/@dojo/shim/WeakMap.js");
var Symbol_1 = __webpack_require__("./node_modules/@dojo/shim/Symbol.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var diff_1 = __webpack_require__("./node_modules/@dojo/widget-core/diff.js");
var RegistryHandler_1 = __webpack_require__("./node_modules/@dojo/widget-core/RegistryHandler.js");
var NodeHandler_1 = __webpack_require__("./node_modules/@dojo/widget-core/NodeHandler.js");
var vdom_1 = __webpack_require__("./node_modules/@dojo/widget-core/vdom.js");
var Registry_1 = __webpack_require__("./node_modules/@dojo/widget-core/Registry.js");
var decoratorMap = new Map_1.default();
var boundAuto = diff_1.auto.bind(null);
exports.noBind = Symbol_1.default.for('dojoNoBind');
/**
 * Main widget base for all widgets to extend
 */
var WidgetBase = /** @class */ (function () {
    /**
     * @constructor
     */
    function WidgetBase() {
        var _this = this;
        /**
         * Indicates if it is the initial set properties cycle
         */
        this._initialProperties = true;
        /**
         * Array of property keys considered changed from the previous set properties
         */
        this._changedPropertyKeys = [];
        this._nodeHandler = new NodeHandler_1.default();
        this._handles = [];
        this._children = [];
        this._decoratorCache = new Map_1.default();
        this._properties = {};
        this._boundRenderFunc = this.render.bind(this);
        this._boundInvalidate = this.invalidate.bind(this);
        vdom_1.widgetInstanceMap.set(this, {
            dirty: true,
            onAttach: function () {
                _this.onAttach();
            },
            onDetach: function () {
                _this.onDetach();
                _this.destroy();
            },
            nodeHandler: this._nodeHandler,
            registry: function () {
                return _this.registry;
            },
            coreProperties: {},
            rendering: false,
            inputProperties: {}
        });
        this._runAfterConstructors();
    }
    WidgetBase.prototype.meta = function (MetaType) {
        if (this._metaMap === undefined) {
            this._metaMap = new Map_1.default();
        }
        var cached = this._metaMap.get(MetaType);
        if (!cached) {
            cached = new MetaType({
                invalidate: this._boundInvalidate,
                nodeHandler: this._nodeHandler,
                bind: this
            });
            this.own(cached);
            this._metaMap.set(MetaType, cached);
        }
        return cached;
    };
    WidgetBase.prototype.onAttach = function () {
        // Do nothing by default.
    };
    WidgetBase.prototype.onDetach = function () {
        // Do nothing by default.
    };
    Object.defineProperty(WidgetBase.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WidgetBase.prototype, "changedPropertyKeys", {
        get: function () {
            return tslib_1.__spread(this._changedPropertyKeys);
        },
        enumerable: true,
        configurable: true
    });
    WidgetBase.prototype.__setCoreProperties__ = function (coreProperties) {
        var baseRegistry = coreProperties.baseRegistry;
        var instanceData = vdom_1.widgetInstanceMap.get(this);
        if (instanceData.coreProperties.baseRegistry !== baseRegistry) {
            if (this._registry === undefined) {
                this._registry = new RegistryHandler_1.default();
                this.own(this._registry);
                this.own(this._registry.on('invalidate', this._boundInvalidate));
            }
            this._registry.base = baseRegistry;
            this.invalidate();
        }
        instanceData.coreProperties = coreProperties;
    };
    WidgetBase.prototype.__setProperties__ = function (originalProperties) {
        var _this = this;
        var instanceData = vdom_1.widgetInstanceMap.get(this);
        instanceData.inputProperties = originalProperties;
        var properties = this._runBeforeProperties(originalProperties);
        var registeredDiffPropertyNames = this.getDecorator('registeredDiffProperty');
        var changedPropertyKeys = [];
        var propertyNames = Object.keys(properties);
        if (this._initialProperties === false || registeredDiffPropertyNames.length !== 0) {
            var allProperties = tslib_1.__spread(propertyNames, Object.keys(this._properties));
            var checkedProperties = [];
            var diffPropertyResults = {};
            var runReactions = false;
            for (var i = 0; i < allProperties.length; i++) {
                var propertyName = allProperties[i];
                if (checkedProperties.indexOf(propertyName) !== -1) {
                    continue;
                }
                checkedProperties.push(propertyName);
                var previousProperty = this._properties[propertyName];
                var newProperty = this._bindFunctionProperty(properties[propertyName], instanceData.coreProperties.bind);
                if (registeredDiffPropertyNames.indexOf(propertyName) !== -1) {
                    runReactions = true;
                    var diffFunctions = this.getDecorator("diffProperty:" + propertyName);
                    for (var i_1 = 0; i_1 < diffFunctions.length; i_1++) {
                        var result = diffFunctions[i_1](previousProperty, newProperty);
                        if (result.changed && changedPropertyKeys.indexOf(propertyName) === -1) {
                            changedPropertyKeys.push(propertyName);
                        }
                        if (propertyName in properties) {
                            diffPropertyResults[propertyName] = result.value;
                        }
                    }
                }
                else {
                    var result = boundAuto(previousProperty, newProperty);
                    if (result.changed && changedPropertyKeys.indexOf(propertyName) === -1) {
                        changedPropertyKeys.push(propertyName);
                    }
                    if (propertyName in properties) {
                        diffPropertyResults[propertyName] = result.value;
                    }
                }
            }
            if (runReactions) {
                this._mapDiffPropertyReactions(properties, changedPropertyKeys).forEach(function (args, reaction) {
                    if (args.changed) {
                        reaction.call(_this, args.previousProperties, args.newProperties);
                    }
                });
            }
            this._properties = diffPropertyResults;
            this._changedPropertyKeys = changedPropertyKeys;
        }
        else {
            this._initialProperties = false;
            for (var i = 0; i < propertyNames.length; i++) {
                var propertyName = propertyNames[i];
                if (typeof properties[propertyName] === 'function') {
                    properties[propertyName] = this._bindFunctionProperty(properties[propertyName], instanceData.coreProperties.bind);
                }
                else {
                    changedPropertyKeys.push(propertyName);
                }
            }
            this._changedPropertyKeys = changedPropertyKeys;
            this._properties = tslib_1.__assign({}, properties);
        }
        if (this._changedPropertyKeys.length > 0) {
            this.invalidate();
        }
    };
    Object.defineProperty(WidgetBase.prototype, "children", {
        get: function () {
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    WidgetBase.prototype.__setChildren__ = function (children) {
        if (this._children.length > 0 || children.length > 0) {
            this._children = children;
            this.invalidate();
        }
    };
    WidgetBase.prototype.__render__ = function () {
        var instanceData = vdom_1.widgetInstanceMap.get(this);
        instanceData.dirty = false;
        var render = this._runBeforeRenders();
        var dNode = render();
        dNode = this.runAfterRenders(dNode);
        this._nodeHandler.clear();
        return dNode;
    };
    WidgetBase.prototype.invalidate = function () {
        var instanceData = vdom_1.widgetInstanceMap.get(this);
        if (instanceData.invalidate) {
            instanceData.invalidate();
        }
    };
    WidgetBase.prototype.render = function () {
        return d_1.v('div', {}, this.children);
    };
    /**
     * Function to add decorators to WidgetBase
     *
     * @param decoratorKey The key of the decorator
     * @param value The value of the decorator
     */
    WidgetBase.prototype.addDecorator = function (decoratorKey, value) {
        value = Array.isArray(value) ? value : [value];
        if (this.hasOwnProperty('constructor')) {
            var decoratorList = decoratorMap.get(this.constructor);
            if (!decoratorList) {
                decoratorList = new Map_1.default();
                decoratorMap.set(this.constructor, decoratorList);
            }
            var specificDecoratorList = decoratorList.get(decoratorKey);
            if (!specificDecoratorList) {
                specificDecoratorList = [];
                decoratorList.set(decoratorKey, specificDecoratorList);
            }
            specificDecoratorList.push.apply(specificDecoratorList, tslib_1.__spread(value));
        }
        else {
            var decorators = this.getDecorator(decoratorKey);
            this._decoratorCache.set(decoratorKey, tslib_1.__spread(decorators, value));
        }
    };
    /**
     * Function to build the list of decorators from the global decorator map.
     *
     * @param decoratorKey  The key of the decorator
     * @return An array of decorator values
     * @private
     */
    WidgetBase.prototype._buildDecoratorList = function (decoratorKey) {
        var allDecorators = [];
        var constructor = this.constructor;
        while (constructor) {
            var instanceMap = decoratorMap.get(constructor);
            if (instanceMap) {
                var decorators = instanceMap.get(decoratorKey);
                if (decorators) {
                    allDecorators.unshift.apply(allDecorators, tslib_1.__spread(decorators));
                }
            }
            constructor = Object.getPrototypeOf(constructor);
        }
        return allDecorators;
    };
    /**
     * Function to retrieve decorator values
     *
     * @param decoratorKey The key of the decorator
     * @returns An array of decorator values
     */
    WidgetBase.prototype.getDecorator = function (decoratorKey) {
        var allDecorators = this._decoratorCache.get(decoratorKey);
        if (allDecorators !== undefined) {
            return allDecorators;
        }
        allDecorators = this._buildDecoratorList(decoratorKey);
        this._decoratorCache.set(decoratorKey, allDecorators);
        return allDecorators;
    };
    WidgetBase.prototype._mapDiffPropertyReactions = function (newProperties, changedPropertyKeys) {
        var _this = this;
        var reactionFunctions = this.getDecorator('diffReaction');
        return reactionFunctions.reduce(function (reactionPropertyMap, _a) {
            var reaction = _a.reaction, propertyName = _a.propertyName;
            var reactionArguments = reactionPropertyMap.get(reaction);
            if (reactionArguments === undefined) {
                reactionArguments = {
                    previousProperties: {},
                    newProperties: {},
                    changed: false
                };
            }
            reactionArguments.previousProperties[propertyName] = _this._properties[propertyName];
            reactionArguments.newProperties[propertyName] = newProperties[propertyName];
            if (changedPropertyKeys.indexOf(propertyName) !== -1) {
                reactionArguments.changed = true;
            }
            reactionPropertyMap.set(reaction, reactionArguments);
            return reactionPropertyMap;
        }, new Map_1.default());
    };
    /**
     * Binds unbound property functions to the specified `bind` property
     *
     * @param properties properties to check for functions
     */
    WidgetBase.prototype._bindFunctionProperty = function (property, bind) {
        if (typeof property === 'function' && !property[exports.noBind] && Registry_1.isWidgetBaseConstructor(property) === false) {
            if (this._bindFunctionPropertyMap === undefined) {
                this._bindFunctionPropertyMap = new WeakMap_1.default();
            }
            var bindInfo = this._bindFunctionPropertyMap.get(property) || {};
            var boundFunc = bindInfo.boundFunc, scope = bindInfo.scope;
            if (boundFunc === undefined || scope !== bind) {
                boundFunc = property.bind(bind);
                this._bindFunctionPropertyMap.set(property, { boundFunc: boundFunc, scope: bind });
            }
            return boundFunc;
        }
        return property;
    };
    Object.defineProperty(WidgetBase.prototype, "registry", {
        get: function () {
            if (this._registry === undefined) {
                this._registry = new RegistryHandler_1.default();
                this.own(this._registry);
                this.own(this._registry.on('invalidate', this._boundInvalidate));
            }
            return this._registry;
        },
        enumerable: true,
        configurable: true
    });
    WidgetBase.prototype._runBeforeProperties = function (properties) {
        var _this = this;
        var beforeProperties = this.getDecorator('beforeProperties');
        if (beforeProperties.length > 0) {
            return beforeProperties.reduce(function (properties, beforePropertiesFunction) {
                return tslib_1.__assign({}, properties, beforePropertiesFunction.call(_this, properties));
            }, tslib_1.__assign({}, properties));
        }
        return properties;
    };
    /**
     * Run all registered before renders and return the updated render method
     */
    WidgetBase.prototype._runBeforeRenders = function () {
        var _this = this;
        var beforeRenders = this.getDecorator('beforeRender');
        if (beforeRenders.length > 0) {
            return beforeRenders.reduce(function (render, beforeRenderFunction) {
                var updatedRender = beforeRenderFunction.call(_this, render, _this._properties, _this._children);
                if (!updatedRender) {
                    console.warn('Render function not returned from beforeRender, using previous render');
                    return render;
                }
                return updatedRender;
            }, this._boundRenderFunc);
        }
        return this._boundRenderFunc;
    };
    /**
     * Run all registered after renders and return the decorated DNodes
     *
     * @param dNode The DNodes to run through the after renders
     */
    WidgetBase.prototype.runAfterRenders = function (dNode) {
        var _this = this;
        var afterRenders = this.getDecorator('afterRender');
        if (afterRenders.length > 0) {
            return afterRenders.reduce(function (dNode, afterRenderFunction) {
                return afterRenderFunction.call(_this, dNode);
            }, dNode);
        }
        if (this._metaMap !== undefined) {
            this._metaMap.forEach(function (meta) {
                meta.afterRender();
            });
        }
        return dNode;
    };
    WidgetBase.prototype._runAfterConstructors = function () {
        var _this = this;
        var afterConstructors = this.getDecorator('afterConstructor');
        if (afterConstructors.length > 0) {
            afterConstructors.forEach(function (afterConstructor) { return afterConstructor.call(_this); });
        }
    };
    WidgetBase.prototype.own = function (handle) {
        this._handles.push(handle);
    };
    WidgetBase.prototype.destroy = function () {
        while (this._handles.length > 0) {
            var handle = this._handles.pop();
            if (handle) {
                handle.destroy();
            }
        }
    };
    /**
     * static identifier
     */
    WidgetBase._type = Registry_1.WIDGET_BASE_TYPE;
    return WidgetBase;
}());
exports.WidgetBase = WidgetBase;
exports.default = WidgetBase;


/***/ }),

/***/ "./node_modules/@dojo/widget-core/animations/cssTransitions.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var browserSpecificTransitionEndEventName = '';
var browserSpecificAnimationEndEventName = '';
function determineBrowserStyleNames(element) {
    if ('WebkitTransition' in element.style) {
        browserSpecificTransitionEndEventName = 'webkitTransitionEnd';
        browserSpecificAnimationEndEventName = 'webkitAnimationEnd';
    }
    else if ('transition' in element.style || 'MozTransition' in element.style) {
        browserSpecificTransitionEndEventName = 'transitionend';
        browserSpecificAnimationEndEventName = 'animationend';
    }
    else {
        throw new Error('Your browser is not supported');
    }
}
function initialize(element) {
    if (browserSpecificAnimationEndEventName === '') {
        determineBrowserStyleNames(element);
    }
}
function runAndCleanUp(element, startAnimation, finishAnimation) {
    initialize(element);
    var finished = false;
    var transitionEnd = function () {
        if (!finished) {
            finished = true;
            element.removeEventListener(browserSpecificTransitionEndEventName, transitionEnd);
            element.removeEventListener(browserSpecificAnimationEndEventName, transitionEnd);
            finishAnimation();
        }
    };
    startAnimation();
    element.addEventListener(browserSpecificAnimationEndEventName, transitionEnd);
    element.addEventListener(browserSpecificTransitionEndEventName, transitionEnd);
}
function exit(node, properties, exitAnimation, removeNode) {
    var activeClass = properties.exitAnimationActive || exitAnimation + "-active";
    runAndCleanUp(node, function () {
        node.classList.add(exitAnimation);
        requestAnimationFrame(function () {
            node.classList.add(activeClass);
        });
    }, function () {
        removeNode();
    });
}
function enter(node, properties, enterAnimation) {
    var activeClass = properties.enterAnimationActive || enterAnimation + "-active";
    runAndCleanUp(node, function () {
        node.classList.add(enterAnimation);
        requestAnimationFrame(function () {
            node.classList.add(activeClass);
        });
    }, function () {
        node.classList.remove(enterAnimation);
        node.classList.remove(activeClass);
    });
}
exports.default = {
    enter: enter,
    exit: exit
};


/***/ }),

/***/ "./node_modules/@dojo/widget-core/d.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var Symbol_1 = __webpack_require__("./node_modules/@dojo/shim/Symbol.js");
/**
 * The symbol identifier for a WNode type
 */
exports.WNODE = Symbol_1.default('Identifier for a WNode.');
/**
 * The symbol identifier for a VNode type
 */
exports.VNODE = Symbol_1.default('Identifier for a VNode.');
/**
 * The symbol identifier for a VNode type created using dom()
 */
exports.DOMVNODE = Symbol_1.default('Identifier for a VNode created using existing dom.');
/**
 * Helper function that returns true if the `DNode` is a `WNode` using the `type` property
 */
function isWNode(child) {
    return Boolean(child && typeof child !== 'string' && child.type === exports.WNODE);
}
exports.isWNode = isWNode;
/**
 * Helper function that returns true if the `DNode` is a `VNode` using the `type` property
 */
function isVNode(child) {
    return Boolean(child && typeof child !== 'string' && (child.type === exports.VNODE || child.type === exports.DOMVNODE));
}
exports.isVNode = isVNode;
/**
 * Helper function that returns true if the `DNode` is a `VNode` created with `dom()` using the `type` property
 */
function isDomVNode(child) {
    return Boolean(child && typeof child !== 'string' && child.type === exports.DOMVNODE);
}
exports.isDomVNode = isDomVNode;
function isElementNode(value) {
    return !!value.tagName;
}
exports.isElementNode = isElementNode;
function decorate(dNodes, optionsOrModifier, predicate) {
    var shallow = false;
    var modifier;
    if (typeof optionsOrModifier === 'function') {
        modifier = optionsOrModifier;
    }
    else {
        modifier = optionsOrModifier.modifier;
        predicate = optionsOrModifier.predicate;
        shallow = optionsOrModifier.shallow || false;
    }
    var nodes = Array.isArray(dNodes) ? tslib_1.__spread(dNodes) : [dNodes];
    function breaker() {
        nodes = [];
    }
    while (nodes.length) {
        var node = nodes.shift();
        if (node) {
            if (!shallow && (isWNode(node) || isVNode(node)) && node.children) {
                nodes = tslib_1.__spread(nodes, node.children);
            }
            if (!predicate || predicate(node)) {
                modifier(node, breaker);
            }
        }
    }
    return dNodes;
}
exports.decorate = decorate;
/**
 * Wrapper function for calls to create a widget.
 */
function w(widgetConstructor, properties, children) {
    if (children === void 0) { children = []; }
    return {
        children: children,
        widgetConstructor: widgetConstructor,
        properties: properties,
        type: exports.WNODE
    };
}
exports.w = w;
function v(tag, propertiesOrChildren, children) {
    if (propertiesOrChildren === void 0) { propertiesOrChildren = {}; }
    if (children === void 0) { children = undefined; }
    var properties = propertiesOrChildren;
    var deferredPropertiesCallback;
    if (Array.isArray(propertiesOrChildren)) {
        children = propertiesOrChildren;
        properties = {};
    }
    if (typeof properties === 'function') {
        deferredPropertiesCallback = properties;
        properties = {};
    }
    return {
        tag: tag,
        deferredPropertiesCallback: deferredPropertiesCallback,
        children: children,
        properties: properties,
        type: exports.VNODE
    };
}
exports.v = v;
/**
 * Create a VNode for an existing DOM Node.
 */
function dom(_a, children) {
    var node = _a.node, _b = _a.attrs, attrs = _b === void 0 ? {} : _b, _c = _a.props, props = _c === void 0 ? {} : _c, _d = _a.on, on = _d === void 0 ? {} : _d, _e = _a.diffType, diffType = _e === void 0 ? 'none' : _e;
    return {
        tag: isElementNode(node) ? node.tagName.toLowerCase() : '',
        properties: props,
        attributes: attrs,
        events: on,
        children: children,
        type: exports.DOMVNODE,
        domNode: node,
        text: isElementNode(node) ? undefined : node.data,
        diffType: diffType
    };
}
exports.dom = dom;


/***/ }),

/***/ "./node_modules/@dojo/widget-core/decorators/afterRender.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var handleDecorator_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/handleDecorator.js");
function afterRender(method) {
    return handleDecorator_1.handleDecorator(function (target, propertyKey) {
        target.addDecorator('afterRender', propertyKey ? target[propertyKey] : method);
    });
}
exports.afterRender = afterRender;
exports.default = afterRender;


/***/ }),

/***/ "./node_modules/@dojo/widget-core/decorators/handleDecorator.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generic decorator handler to take care of whether or not the decorator was called at the class level
 * or the method level.
 *
 * @param handler
 */
function handleDecorator(handler) {
    return function (target, propertyKey, descriptor) {
        if (typeof target === 'function') {
            handler(target.prototype, undefined);
        }
        else {
            handler(target, propertyKey);
        }
    };
}
exports.handleDecorator = handleDecorator;
exports.default = handleDecorator;


/***/ }),

/***/ "./node_modules/@dojo/widget-core/diff.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Registry_1 = __webpack_require__("./node_modules/@dojo/widget-core/Registry.js");
function isObjectOrArray(value) {
    return Object.prototype.toString.call(value) === '[object Object]' || Array.isArray(value);
}
function always(previousProperty, newProperty) {
    return {
        changed: true,
        value: newProperty
    };
}
exports.always = always;
function ignore(previousProperty, newProperty) {
    return {
        changed: false,
        value: newProperty
    };
}
exports.ignore = ignore;
function reference(previousProperty, newProperty) {
    return {
        changed: previousProperty !== newProperty,
        value: newProperty
    };
}
exports.reference = reference;
function shallow(previousProperty, newProperty) {
    var changed = false;
    var validOldProperty = previousProperty && isObjectOrArray(previousProperty);
    var validNewProperty = newProperty && isObjectOrArray(newProperty);
    if (!validOldProperty || !validNewProperty) {
        return {
            changed: true,
            value: newProperty
        };
    }
    var previousKeys = Object.keys(previousProperty);
    var newKeys = Object.keys(newProperty);
    if (previousKeys.length !== newKeys.length) {
        changed = true;
    }
    else {
        changed = newKeys.some(function (key) {
            return newProperty[key] !== previousProperty[key];
        });
    }
    return {
        changed: changed,
        value: newProperty
    };
}
exports.shallow = shallow;
function auto(previousProperty, newProperty) {
    var result;
    if (typeof newProperty === 'function') {
        if (newProperty._type === Registry_1.WIDGET_BASE_TYPE) {
            result = reference(previousProperty, newProperty);
        }
        else {
            result = ignore(previousProperty, newProperty);
        }
    }
    else if (isObjectOrArray(newProperty)) {
        result = shallow(previousProperty, newProperty);
    }
    else {
        result = reference(previousProperty, newProperty);
    }
    return result;
}
exports.auto = auto;


/***/ }),

/***/ "./node_modules/@dojo/widget-core/mixins/Projector.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var lang_1 = __webpack_require__("./node_modules/@dojo/core/lang.js");
var cssTransitions_1 = __webpack_require__("./node_modules/@dojo/widget-core/animations/cssTransitions.js");
var afterRender_1 = __webpack_require__("./node_modules/@dojo/widget-core/decorators/afterRender.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var vdom_1 = __webpack_require__("./node_modules/@dojo/widget-core/vdom.js");
/**
 * Represents the attach state of the projector
 */
var ProjectorAttachState;
(function (ProjectorAttachState) {
    ProjectorAttachState[ProjectorAttachState["Attached"] = 1] = "Attached";
    ProjectorAttachState[ProjectorAttachState["Detached"] = 2] = "Detached";
})(ProjectorAttachState = exports.ProjectorAttachState || (exports.ProjectorAttachState = {}));
/**
 * Attach type for the projector
 */
var AttachType;
(function (AttachType) {
    AttachType[AttachType["Append"] = 1] = "Append";
    AttachType[AttachType["Merge"] = 2] = "Merge";
})(AttachType = exports.AttachType || (exports.AttachType = {}));
function ProjectorMixin(Base) {
    var Projector = /** @class */ (function (_super) {
        tslib_1.__extends(Projector, _super);
        function Projector() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, tslib_1.__spread(args)) || this;
            _this._root = document.body;
            _this._async = true;
            _this._projectorProperties = {};
            _this._projectionOptions = {
                transitions: cssTransitions_1.default
            };
            _this.root = document.body;
            _this.projectorState = ProjectorAttachState.Detached;
            return _this;
        }
        Projector.prototype.append = function (root) {
            var options = {
                type: AttachType.Append,
                root: root
            };
            return this._attach(options);
        };
        Projector.prototype.merge = function (root) {
            var options = {
                type: AttachType.Merge,
                root: root
            };
            return this._attach(options);
        };
        Object.defineProperty(Projector.prototype, "root", {
            get: function () {
                return this._root;
            },
            set: function (root) {
                if (this.projectorState === ProjectorAttachState.Attached) {
                    throw new Error('Projector already attached, cannot change root element');
                }
                this._root = root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Projector.prototype, "async", {
            get: function () {
                return this._async;
            },
            set: function (async) {
                if (this.projectorState === ProjectorAttachState.Attached) {
                    throw new Error('Projector already attached, cannot change async mode');
                }
                this._async = async;
            },
            enumerable: true,
            configurable: true
        });
        Projector.prototype.sandbox = function (doc) {
            var _this = this;
            if (doc === void 0) { doc = document; }
            if (this.projectorState === ProjectorAttachState.Attached) {
                throw new Error('Projector already attached, cannot create sandbox');
            }
            this._async = false;
            var previousRoot = this.root;
            /* free up the document fragment for GC */
            this.own({
                destroy: function () {
                    _this._root = previousRoot;
                }
            });
            this._attach({
                /* DocumentFragment is not assignable to Element, but provides everything needed to work */
                root: doc.createDocumentFragment(),
                type: AttachType.Append
            });
        };
        Projector.prototype.setChildren = function (children) {
            this.__setChildren__(children);
        };
        Projector.prototype.setProperties = function (properties) {
            this.__setProperties__(properties);
        };
        Projector.prototype.__setProperties__ = function (properties) {
            if (this._projectorProperties && this._projectorProperties.registry !== properties.registry) {
                if (this._projectorProperties.registry) {
                    this._projectorProperties.registry.destroy();
                }
            }
            this._projectorProperties = lang_1.assign({}, properties);
            _super.prototype.__setCoreProperties__.call(this, { bind: this, baseRegistry: properties.registry });
            _super.prototype.__setProperties__.call(this, properties);
        };
        Projector.prototype.toHtml = function () {
            if (this.projectorState !== ProjectorAttachState.Attached || !this._projection) {
                throw new Error('Projector is not attached, cannot return an HTML string of projection.');
            }
            return this._projection.domNode.childNodes[0].outerHTML;
        };
        Projector.prototype.afterRender = function (result) {
            var node = result;
            if (typeof result === 'string' || result === null || result === undefined) {
                node = d_1.v('span', {}, [result]);
            }
            return node;
        };
        Projector.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        Projector.prototype._attach = function (_a) {
            var _this = this;
            var type = _a.type, root = _a.root;
            if (root) {
                this.root = root;
            }
            if (this._attachHandle) {
                return this._attachHandle;
            }
            this.projectorState = ProjectorAttachState.Attached;
            var handle = {
                destroy: function () {
                    if (_this.projectorState === ProjectorAttachState.Attached) {
                        _this._projection = undefined;
                        _this.projectorState = ProjectorAttachState.Detached;
                    }
                }
            };
            this.own(handle);
            this._attachHandle = handle;
            this._projectionOptions = tslib_1.__assign({}, this._projectionOptions, { sync: !this._async });
            switch (type) {
                case AttachType.Append:
                    this._projection = vdom_1.dom.append(this.root, this, this._projectionOptions);
                    break;
                case AttachType.Merge:
                    this._projection = vdom_1.dom.merge(this.root, this, this._projectionOptions);
                    break;
            }
            return this._attachHandle;
        };
        tslib_1.__decorate([
            afterRender_1.afterRender(),
            tslib_1.__metadata("design:type", Function),
            tslib_1.__metadata("design:paramtypes", [Object]),
            tslib_1.__metadata("design:returntype", void 0)
        ], Projector.prototype, "afterRender", null);
        return Projector;
    }(Base));
    return Projector;
}
exports.ProjectorMixin = ProjectorMixin;
exports.default = ProjectorMixin;


/***/ }),

/***/ "./node_modules/@dojo/widget-core/vdom.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var global_1 = __webpack_require__("./node_modules/@dojo/shim/global.js");
var array_1 = __webpack_require__("./node_modules/@dojo/shim/array.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var Registry_1 = __webpack_require__("./node_modules/@dojo/widget-core/Registry.js");
var WeakMap_1 = __webpack_require__("./node_modules/@dojo/shim/WeakMap.js");
var NAMESPACE_W3 = 'http://www.w3.org/';
var NAMESPACE_SVG = NAMESPACE_W3 + '2000/svg';
var NAMESPACE_XLINK = NAMESPACE_W3 + '1999/xlink';
var emptyArray = [];
exports.widgetInstanceMap = new WeakMap_1.default();
var instanceMap = new WeakMap_1.default();
var projectorStateMap = new WeakMap_1.default();
function same(dnode1, dnode2) {
    if (d_1.isVNode(dnode1) && d_1.isVNode(dnode2)) {
        if (d_1.isDomVNode(dnode1) || d_1.isDomVNode(dnode2)) {
            if (dnode1.domNode !== dnode2.domNode) {
                return false;
            }
        }
        if (dnode1.tag !== dnode2.tag) {
            return false;
        }
        if (dnode1.properties.key !== dnode2.properties.key) {
            return false;
        }
        return true;
    }
    else if (d_1.isWNode(dnode1) && d_1.isWNode(dnode2)) {
        if (dnode1.instance === undefined && typeof dnode2.widgetConstructor === 'string') {
            return false;
        }
        if (dnode1.widgetConstructor !== dnode2.widgetConstructor) {
            return false;
        }
        if (dnode1.properties.key !== dnode2.properties.key) {
            return false;
        }
        return true;
    }
    return false;
}
var missingTransition = function () {
    throw new Error('Provide a transitions object to the projectionOptions to do animations');
};
function getProjectionOptions(projectorOptions, projectorInstance) {
    var defaults = {
        namespace: undefined,
        styleApplyer: function (domNode, styleName, value) {
            domNode.style[styleName] = value;
        },
        transitions: {
            enter: missingTransition,
            exit: missingTransition
        },
        depth: 0,
        merge: false,
        sync: false,
        projectorInstance: projectorInstance
    };
    return tslib_1.__assign({}, defaults, projectorOptions);
}
function checkStyleValue(styleValue) {
    if (typeof styleValue !== 'string') {
        throw new Error('Style values must be strings');
    }
}
function updateEvent(domNode, eventName, currentValue, projectionOptions, bind, previousValue) {
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    var eventMap = projectorState.nodeMap.get(domNode) || new WeakMap_1.default();
    if (previousValue) {
        var previousEvent = eventMap.get(previousValue);
        domNode.removeEventListener(eventName, previousEvent);
    }
    var callback = currentValue.bind(bind);
    if (eventName === 'input') {
        callback = function (evt) {
            currentValue.call(this, evt);
            evt.target['oninput-value'] = evt.target.value;
        }.bind(bind);
    }
    domNode.addEventListener(eventName, callback);
    eventMap.set(currentValue, callback);
    projectorState.nodeMap.set(domNode, eventMap);
}
function addClasses(domNode, classes) {
    if (classes) {
        var classNames = classes.split(' ');
        for (var i = 0; i < classNames.length; i++) {
            domNode.classList.add(classNames[i]);
        }
    }
}
function removeClasses(domNode, classes) {
    if (classes) {
        var classNames = classes.split(' ');
        for (var i = 0; i < classNames.length; i++) {
            domNode.classList.remove(classNames[i]);
        }
    }
}
function buildPreviousProperties(domNode, previous, current) {
    var diffType = current.diffType, properties = current.properties, attributes = current.attributes;
    if (!diffType || diffType === 'vdom') {
        return { properties: previous.properties, attributes: previous.attributes, events: previous.events };
    }
    else if (diffType === 'none') {
        return { properties: {}, attributes: previous.attributes ? {} : undefined, events: previous.events };
    }
    var newProperties = {
        properties: {}
    };
    if (attributes) {
        newProperties.attributes = {};
        newProperties.events = previous.events;
        Object.keys(properties).forEach(function (propName) {
            newProperties.properties[propName] = domNode[propName];
        });
        Object.keys(attributes).forEach(function (attrName) {
            newProperties.attributes[attrName] = domNode.getAttribute(attrName);
        });
        return newProperties;
    }
    newProperties.properties = Object.keys(properties).reduce(function (props, property) {
        props[property] = domNode.getAttribute(property) || domNode[property];
        return props;
    }, {});
    return newProperties;
}
function focusNode(propValue, previousValue, domNode, projectionOptions) {
    var result;
    if (typeof propValue === 'function') {
        result = propValue();
    }
    else {
        result = propValue && !previousValue;
    }
    if (result === true) {
        var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
        projectorState.deferredRenderCallbacks.push(function () {
            domNode.focus();
        });
    }
}
function removeOrphanedEvents(domNode, previousProperties, properties, projectionOptions, onlyEvents) {
    if (onlyEvents === void 0) { onlyEvents = false; }
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    var eventMap = projectorState.nodeMap.get(domNode);
    if (eventMap) {
        Object.keys(previousProperties).forEach(function (propName) {
            var isEvent = propName.substr(0, 2) === 'on' || onlyEvents;
            var eventName = onlyEvents ? propName : propName.substr(2);
            if (isEvent && !properties[propName]) {
                var eventCallback = eventMap.get(previousProperties[propName]);
                if (eventCallback) {
                    domNode.removeEventListener(eventName, eventCallback);
                }
            }
        });
    }
}
function updateAttribute(domNode, attrName, attrValue, projectionOptions) {
    if (projectionOptions.namespace === NAMESPACE_SVG && attrName === 'href') {
        domNode.setAttributeNS(NAMESPACE_XLINK, attrName, attrValue);
    }
    else if ((attrName === 'role' && attrValue === '') || attrValue === undefined) {
        domNode.removeAttribute(attrName);
    }
    else {
        domNode.setAttribute(attrName, attrValue);
    }
}
function updateAttributes(domNode, previousAttributes, attributes, projectionOptions) {
    var attrNames = Object.keys(attributes);
    var attrCount = attrNames.length;
    for (var i = 0; i < attrCount; i++) {
        var attrName = attrNames[i];
        var attrValue = attributes[attrName];
        var previousAttrValue = previousAttributes[attrName];
        if (attrValue !== previousAttrValue) {
            updateAttribute(domNode, attrName, attrValue, projectionOptions);
        }
    }
}
function updateProperties(domNode, previousProperties, properties, projectionOptions, includesEventsAndAttributes) {
    if (includesEventsAndAttributes === void 0) { includesEventsAndAttributes = true; }
    var propertiesUpdated = false;
    var propNames = Object.keys(properties);
    var propCount = propNames.length;
    if (propNames.indexOf('classes') === -1 && previousProperties.classes) {
        if (Array.isArray(previousProperties.classes)) {
            for (var i = 0; i < previousProperties.classes.length; i++) {
                removeClasses(domNode, previousProperties.classes[i]);
            }
        }
        else {
            removeClasses(domNode, previousProperties.classes);
        }
    }
    includesEventsAndAttributes && removeOrphanedEvents(domNode, previousProperties, properties, projectionOptions);
    for (var i = 0; i < propCount; i++) {
        var propName = propNames[i];
        var propValue = properties[propName];
        var previousValue = previousProperties[propName];
        if (propName === 'classes') {
            var previousClasses = Array.isArray(previousValue) ? previousValue : [previousValue];
            var currentClasses = Array.isArray(propValue) ? propValue : [propValue];
            if (previousClasses && previousClasses.length > 0) {
                if (!propValue || propValue.length === 0) {
                    for (var i_1 = 0; i_1 < previousClasses.length; i_1++) {
                        removeClasses(domNode, previousClasses[i_1]);
                    }
                }
                else {
                    var newClasses = tslib_1.__spread(currentClasses);
                    for (var i_2 = 0; i_2 < previousClasses.length; i_2++) {
                        var previousClassName = previousClasses[i_2];
                        if (previousClassName) {
                            var classIndex = newClasses.indexOf(previousClassName);
                            if (classIndex === -1) {
                                removeClasses(domNode, previousClassName);
                            }
                            else {
                                newClasses.splice(classIndex, 1);
                            }
                        }
                    }
                    for (var i_3 = 0; i_3 < newClasses.length; i_3++) {
                        addClasses(domNode, newClasses[i_3]);
                    }
                }
            }
            else {
                for (var i_4 = 0; i_4 < currentClasses.length; i_4++) {
                    addClasses(domNode, currentClasses[i_4]);
                }
            }
        }
        else if (propName === 'focus') {
            focusNode(propValue, previousValue, domNode, projectionOptions);
        }
        else if (propName === 'styles') {
            var styleNames = Object.keys(propValue);
            var styleCount = styleNames.length;
            for (var j = 0; j < styleCount; j++) {
                var styleName = styleNames[j];
                var newStyleValue = propValue[styleName];
                var oldStyleValue = previousValue && previousValue[styleName];
                if (newStyleValue === oldStyleValue) {
                    continue;
                }
                propertiesUpdated = true;
                if (newStyleValue) {
                    checkStyleValue(newStyleValue);
                    projectionOptions.styleApplyer(domNode, styleName, newStyleValue);
                }
                else {
                    projectionOptions.styleApplyer(domNode, styleName, '');
                }
            }
        }
        else {
            if (!propValue && typeof previousValue === 'string') {
                propValue = '';
            }
            if (propName === 'value') {
                var domValue = domNode[propName];
                if (domValue !== propValue &&
                    (domNode['oninput-value']
                        ? domValue === domNode['oninput-value']
                        : propValue !== previousValue)) {
                    domNode[propName] = propValue;
                    domNode['oninput-value'] = undefined;
                }
                if (propValue !== previousValue) {
                    propertiesUpdated = true;
                }
            }
            else if (propName !== 'key' && propValue !== previousValue) {
                var type = typeof propValue;
                if (type === 'function' && propName.lastIndexOf('on', 0) === 0 && includesEventsAndAttributes) {
                    updateEvent(domNode, propName.substr(2), propValue, projectionOptions, properties.bind, previousValue);
                }
                else if (type === 'string' && propName !== 'innerHTML' && includesEventsAndAttributes) {
                    updateAttribute(domNode, propName, propValue, projectionOptions);
                }
                else if (propName === 'scrollLeft' || propName === 'scrollTop') {
                    if (domNode[propName] !== propValue) {
                        domNode[propName] = propValue;
                    }
                }
                else {
                    domNode[propName] = propValue;
                }
                propertiesUpdated = true;
            }
        }
    }
    return propertiesUpdated;
}
function findIndexOfChild(children, sameAs, start) {
    for (var i = start; i < children.length; i++) {
        if (same(children[i], sameAs)) {
            return i;
        }
    }
    return -1;
}
function toParentVNode(domNode) {
    return {
        tag: '',
        properties: {},
        children: undefined,
        domNode: domNode,
        type: d_1.VNODE
    };
}
exports.toParentVNode = toParentVNode;
function toTextVNode(data) {
    return {
        tag: '',
        properties: {},
        children: undefined,
        text: "" + data,
        domNode: undefined,
        type: d_1.VNODE
    };
}
exports.toTextVNode = toTextVNode;
function toInternalWNode(instance, instanceData) {
    return {
        instance: instance,
        rendered: [],
        coreProperties: instanceData.coreProperties,
        children: instance.children,
        widgetConstructor: instance.constructor,
        properties: instanceData.inputProperties,
        type: d_1.WNODE
    };
}
function filterAndDecorateChildren(children, instance) {
    if (children === undefined) {
        return emptyArray;
    }
    children = Array.isArray(children) ? children : [children];
    for (var i = 0; i < children.length;) {
        var child = children[i];
        if (child === undefined || child === null) {
            children.splice(i, 1);
            continue;
        }
        else if (typeof child === 'string') {
            children[i] = toTextVNode(child);
        }
        else {
            if (d_1.isVNode(child)) {
                if (child.properties.bind === undefined) {
                    child.properties.bind = instance;
                    if (child.children && child.children.length > 0) {
                        filterAndDecorateChildren(child.children, instance);
                    }
                }
            }
            else {
                if (!child.coreProperties) {
                    var instanceData = exports.widgetInstanceMap.get(instance);
                    child.coreProperties = {
                        bind: instance,
                        baseRegistry: instanceData.coreProperties.baseRegistry
                    };
                }
                if (child.children && child.children.length > 0) {
                    filterAndDecorateChildren(child.children, instance);
                }
            }
        }
        i++;
    }
    return children;
}
exports.filterAndDecorateChildren = filterAndDecorateChildren;
function nodeAdded(dnode, transitions) {
    if (d_1.isVNode(dnode) && dnode.properties) {
        var enterAnimation = dnode.properties.enterAnimation;
        if (enterAnimation) {
            if (typeof enterAnimation === 'function') {
                enterAnimation(dnode.domNode, dnode.properties);
            }
            else {
                transitions.enter(dnode.domNode, dnode.properties, enterAnimation);
            }
        }
    }
}
function nodeToRemove(dnode, transitions, projectionOptions) {
    if (d_1.isWNode(dnode)) {
        var rendered = dnode.rendered || emptyArray;
        if (dnode.instance) {
            var instanceData = exports.widgetInstanceMap.get(dnode.instance);
            instanceData.onDetach();
            instanceMap.delete(dnode.instance);
        }
        for (var i = 0; i < rendered.length; i++) {
            nodeToRemove(rendered[i], transitions, projectionOptions);
        }
    }
    else {
        var domNode_1 = dnode.domNode;
        var properties = dnode.properties;
        if (dnode.children && dnode.children.length > 0) {
            for (var i = 0; i < dnode.children.length; i++) {
                nodeToRemove(dnode.children[i], transitions, projectionOptions);
            }
        }
        var exitAnimation = properties.exitAnimation;
        if (properties && exitAnimation) {
            domNode_1.style.pointerEvents = 'none';
            var removeDomNode = function () {
                domNode_1 && domNode_1.parentNode && domNode_1.parentNode.removeChild(domNode_1);
                dnode.domNode = undefined;
            };
            if (typeof exitAnimation === 'function') {
                exitAnimation(domNode_1, removeDomNode, properties);
                return;
            }
            else {
                transitions.exit(dnode.domNode, properties, exitAnimation, removeDomNode);
                return;
            }
        }
        domNode_1 && domNode_1.parentNode && domNode_1.parentNode.removeChild(domNode_1);
        dnode.domNode = undefined;
    }
}
function checkDistinguishable(childNodes, indexToCheck, parentInstance) {
    var childNode = childNodes[indexToCheck];
    if (d_1.isVNode(childNode) && !childNode.tag) {
        return; // Text nodes need not be distinguishable
    }
    var key = childNode.properties.key;
    if (key === undefined || key === null) {
        for (var i = 0; i < childNodes.length; i++) {
            if (i !== indexToCheck) {
                var node = childNodes[i];
                if (same(node, childNode)) {
                    var nodeIdentifier = void 0;
                    var parentName = parentInstance.constructor.name || 'unknown';
                    if (d_1.isWNode(childNode)) {
                        nodeIdentifier = childNode.widgetConstructor.name || 'unknown';
                    }
                    else {
                        nodeIdentifier = childNode.tag;
                    }
                    console.warn("A widget (" + parentName + ") has had a child addded or removed, but they were not able to uniquely identified. It is recommended to provide a unique 'key' property when using the same widget or element (" + nodeIdentifier + ") multiple times as siblings");
                    break;
                }
            }
        }
    }
}
function updateChildren(parentVNode, oldChildren, newChildren, parentInstance, projectionOptions) {
    oldChildren = oldChildren || emptyArray;
    newChildren = newChildren;
    var oldChildrenLength = oldChildren.length;
    var newChildrenLength = newChildren.length;
    var transitions = projectionOptions.transitions;
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    projectionOptions = tslib_1.__assign({}, projectionOptions, { depth: projectionOptions.depth + 1 });
    var oldIndex = 0;
    var newIndex = 0;
    var i;
    var textUpdated = false;
    var _loop_1 = function () {
        var oldChild = oldIndex < oldChildrenLength ? oldChildren[oldIndex] : undefined;
        var newChild = newChildren[newIndex];
        if (d_1.isVNode(newChild) && typeof newChild.deferredPropertiesCallback === 'function') {
            newChild.inserted = d_1.isVNode(oldChild) && oldChild.inserted;
            addDeferredProperties(newChild, projectionOptions);
        }
        if (oldChild !== undefined && same(oldChild, newChild)) {
            textUpdated = updateDom(oldChild, newChild, projectionOptions, parentVNode, parentInstance) || textUpdated;
            oldIndex++;
            newIndex++;
            return "continue";
        }
        var findOldIndex = findIndexOfChild(oldChildren, newChild, oldIndex + 1);
        var addChild = function () {
            var insertBeforeDomNode = undefined;
            var child = oldChildren[oldIndex];
            if (child) {
                var nextIndex = oldIndex + 1;
                var insertBeforeChildren = [child];
                while (insertBeforeChildren.length) {
                    var insertBefore = insertBeforeChildren.shift();
                    if (d_1.isWNode(insertBefore)) {
                        if (insertBefore.rendered) {
                            insertBeforeChildren.push.apply(insertBeforeChildren, tslib_1.__spread(insertBefore.rendered));
                        }
                    }
                    else {
                        if (insertBefore.domNode) {
                            insertBeforeDomNode = insertBefore.domNode;
                            break;
                        }
                    }
                    if (insertBeforeChildren.length === 0 && oldChildren[nextIndex]) {
                        insertBeforeChildren.push(oldChildren[nextIndex]);
                        nextIndex++;
                    }
                }
            }
            createDom(newChild, parentVNode, insertBeforeDomNode, projectionOptions, parentInstance);
            nodeAdded(newChild, transitions);
            var indexToCheck = newIndex;
            projectorState.afterRenderCallbacks.push(function () {
                checkDistinguishable(newChildren, indexToCheck, parentInstance);
            });
        };
        if (!oldChild || findOldIndex === -1) {
            addChild();
            newIndex++;
            return "continue";
        }
        var removeChild = function () {
            var indexToCheck = oldIndex;
            projectorState.afterRenderCallbacks.push(function () {
                checkDistinguishable(oldChildren, indexToCheck, parentInstance);
            });
            if (d_1.isWNode(oldChild)) {
                var item = instanceMap.get(oldChild.instance);
                if (item) {
                    oldChild = item.dnode;
                }
            }
            nodeToRemove(oldChild, transitions, projectionOptions);
        };
        var findNewIndex = findIndexOfChild(newChildren, oldChild, newIndex + 1);
        if (findNewIndex === -1) {
            removeChild();
            oldIndex++;
            return "continue";
        }
        addChild();
        removeChild();
        oldIndex++;
        newIndex++;
    };
    while (newIndex < newChildrenLength) {
        _loop_1();
    }
    if (oldChildrenLength > oldIndex) {
        var _loop_2 = function () {
            var indexToCheck = i;
            projectorState.afterRenderCallbacks.push(function () {
                checkDistinguishable(oldChildren, indexToCheck, parentInstance);
            });
            var childToRemove = oldChildren[i];
            if (d_1.isWNode(childToRemove)) {
                var item = instanceMap.get(childToRemove.instance);
                if (item) {
                    childToRemove = item.dnode;
                }
            }
            nodeToRemove(childToRemove, transitions, projectionOptions);
        };
        // Remove child fragments
        for (i = oldIndex; i < oldChildrenLength; i++) {
            _loop_2();
        }
    }
    return textUpdated;
}
function addChildren(parentVNode, children, projectionOptions, parentInstance, insertBefore, childNodes) {
    if (insertBefore === void 0) { insertBefore = undefined; }
    if (children === undefined) {
        return;
    }
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectorState.merge && childNodes === undefined) {
        childNodes = array_1.from(parentVNode.domNode.childNodes);
    }
    var transitions = projectionOptions.transitions;
    projectionOptions = tslib_1.__assign({}, projectionOptions, { depth: projectionOptions.depth + 1 });
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        if (d_1.isVNode(child)) {
            if (projectorState.merge && childNodes) {
                var domElement = undefined;
                while (child.domNode === undefined && childNodes.length > 0) {
                    domElement = childNodes.shift();
                    if (domElement && domElement.tagName === (child.tag.toUpperCase() || undefined)) {
                        child.domNode = domElement;
                    }
                }
            }
            createDom(child, parentVNode, insertBefore, projectionOptions, parentInstance);
        }
        else {
            createDom(child, parentVNode, insertBefore, projectionOptions, parentInstance, childNodes);
        }
        nodeAdded(child, transitions);
    }
}
function initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions) {
    addChildren(dnode, dnode.children, projectionOptions, parentInstance, undefined);
    if (typeof dnode.deferredPropertiesCallback === 'function' && dnode.inserted === undefined) {
        addDeferredProperties(dnode, projectionOptions);
    }
    if (dnode.attributes && dnode.events) {
        updateAttributes(domNode, {}, dnode.attributes, projectionOptions);
        updateProperties(domNode, {}, dnode.properties, projectionOptions, false);
        removeOrphanedEvents(domNode, {}, dnode.events, projectionOptions, true);
        var events_1 = dnode.events;
        Object.keys(events_1).forEach(function (event) {
            updateEvent(domNode, event, events_1[event], projectionOptions, dnode.properties.bind);
        });
    }
    else {
        updateProperties(domNode, {}, dnode.properties, projectionOptions);
    }
    if (dnode.properties.key !== null && dnode.properties.key !== undefined) {
        var instanceData = exports.widgetInstanceMap.get(parentInstance);
        instanceData.nodeHandler.add(domNode, "" + dnode.properties.key);
    }
    dnode.inserted = true;
}
function createDom(dnode, parentVNode, insertBefore, projectionOptions, parentInstance, childNodes) {
    var domNode;
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (d_1.isWNode(dnode)) {
        var widgetConstructor = dnode.widgetConstructor;
        var parentInstanceData = exports.widgetInstanceMap.get(parentInstance);
        if (!Registry_1.isWidgetBaseConstructor(widgetConstructor)) {
            var item = parentInstanceData.registry().get(widgetConstructor);
            if (item === null) {
                return;
            }
            widgetConstructor = item;
        }
        var instance_1 = new widgetConstructor();
        dnode.instance = instance_1;
        var instanceData_1 = exports.widgetInstanceMap.get(instance_1);
        instanceData_1.invalidate = function () {
            instanceData_1.dirty = true;
            if (instanceData_1.rendering === false) {
                projectorState.renderQueue.push({ instance: instance_1, depth: projectionOptions.depth });
                scheduleRender(projectionOptions);
            }
        };
        instanceData_1.rendering = true;
        instance_1.__setCoreProperties__(dnode.coreProperties);
        instance_1.__setChildren__(dnode.children);
        instance_1.__setProperties__(dnode.properties);
        var rendered = instance_1.__render__();
        instanceData_1.rendering = false;
        if (rendered) {
            var filteredRendered = filterAndDecorateChildren(rendered, instance_1);
            dnode.rendered = filteredRendered;
            addChildren(parentVNode, filteredRendered, projectionOptions, instance_1, insertBefore, childNodes);
        }
        instanceMap.set(instance_1, { dnode: dnode, parentVNode: parentVNode });
        instanceData_1.nodeHandler.addRoot();
        projectorState.afterRenderCallbacks.push(function () {
            instanceData_1.onAttach();
        });
    }
    else {
        if (projectorState.merge && projectorState.mergeElement !== undefined) {
            domNode = dnode.domNode = projectionOptions.mergeElement;
            projectorState.mergeElement = undefined;
            initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions);
            return;
        }
        var doc = parentVNode.domNode.ownerDocument;
        if (!dnode.tag && typeof dnode.text === 'string') {
            if (dnode.domNode !== undefined && parentVNode.domNode) {
                var newDomNode = dnode.domNode.ownerDocument.createTextNode(dnode.text);
                if (parentVNode.domNode === dnode.domNode.parentNode) {
                    parentVNode.domNode.replaceChild(newDomNode, dnode.domNode);
                }
                else {
                    parentVNode.domNode.appendChild(newDomNode);
                    dnode.domNode.parentNode && dnode.domNode.parentNode.removeChild(dnode.domNode);
                }
                dnode.domNode = newDomNode;
            }
            else {
                domNode = dnode.domNode = doc.createTextNode(dnode.text);
                if (insertBefore !== undefined) {
                    parentVNode.domNode.insertBefore(domNode, insertBefore);
                }
                else {
                    parentVNode.domNode.appendChild(domNode);
                }
            }
        }
        else {
            if (dnode.domNode === undefined) {
                if (dnode.tag === 'svg') {
                    projectionOptions = tslib_1.__assign({}, projectionOptions, { namespace: NAMESPACE_SVG });
                }
                if (projectionOptions.namespace !== undefined) {
                    domNode = dnode.domNode = doc.createElementNS(projectionOptions.namespace, dnode.tag);
                }
                else {
                    domNode = dnode.domNode = dnode.domNode || doc.createElement(dnode.tag);
                }
            }
            else {
                domNode = dnode.domNode;
            }
            initPropertiesAndChildren(domNode, dnode, parentInstance, projectionOptions);
            if (insertBefore !== undefined) {
                parentVNode.domNode.insertBefore(domNode, insertBefore);
            }
            else if (domNode.parentNode !== parentVNode.domNode) {
                parentVNode.domNode.appendChild(domNode);
            }
        }
    }
}
function updateDom(previous, dnode, projectionOptions, parentVNode, parentInstance) {
    if (d_1.isWNode(dnode)) {
        var instance = previous.instance;
        var _a = instanceMap.get(instance), parentVNode_1 = _a.parentVNode, node = _a.dnode;
        var previousRendered = node ? node.rendered : previous.rendered;
        var instanceData = exports.widgetInstanceMap.get(instance);
        instanceData.rendering = true;
        instance.__setCoreProperties__(dnode.coreProperties);
        instance.__setChildren__(dnode.children);
        instance.__setProperties__(dnode.properties);
        dnode.instance = instance;
        if (instanceData.dirty === true) {
            var rendered = instance.__render__();
            instanceData.rendering = false;
            dnode.rendered = filterAndDecorateChildren(rendered, instance);
            updateChildren(parentVNode_1, previousRendered, dnode.rendered, instance, projectionOptions);
        }
        else {
            instanceData.rendering = false;
            dnode.rendered = previousRendered;
        }
        instanceMap.set(instance, { dnode: dnode, parentVNode: parentVNode_1 });
        instanceData.nodeHandler.addRoot();
    }
    else {
        if (previous === dnode) {
            return false;
        }
        var domNode_2 = (dnode.domNode = previous.domNode);
        var textUpdated = false;
        var updated = false;
        if (!dnode.tag && typeof dnode.text === 'string') {
            if (dnode.text !== previous.text) {
                var newDomNode = domNode_2.ownerDocument.createTextNode(dnode.text);
                domNode_2.parentNode.replaceChild(newDomNode, domNode_2);
                dnode.domNode = newDomNode;
                textUpdated = true;
                return textUpdated;
            }
        }
        else {
            if (dnode.tag && dnode.tag.lastIndexOf('svg', 0) === 0) {
                projectionOptions = tslib_1.__assign({}, projectionOptions, { namespace: NAMESPACE_SVG });
            }
            if (previous.children !== dnode.children) {
                var children = filterAndDecorateChildren(dnode.children, parentInstance);
                dnode.children = children;
                updated =
                    updateChildren(dnode, previous.children, children, parentInstance, projectionOptions) || updated;
            }
            var previousProperties_1 = buildPreviousProperties(domNode_2, previous, dnode);
            if (dnode.attributes && dnode.events) {
                updateAttributes(domNode_2, previousProperties_1.attributes, dnode.attributes, projectionOptions);
                updated =
                    updateProperties(domNode_2, previousProperties_1.properties, dnode.properties, projectionOptions, false) || updated;
                removeOrphanedEvents(domNode_2, previousProperties_1.events, dnode.events, projectionOptions, true);
                var events_2 = dnode.events;
                Object.keys(events_2).forEach(function (event) {
                    updateEvent(domNode_2, event, events_2[event], projectionOptions, dnode.properties.bind, previousProperties_1.events[event]);
                });
            }
            else {
                updated =
                    updateProperties(domNode_2, previousProperties_1.properties, dnode.properties, projectionOptions) ||
                        updated;
            }
            if (dnode.properties.key !== null && dnode.properties.key !== undefined) {
                var instanceData = exports.widgetInstanceMap.get(parentInstance);
                instanceData.nodeHandler.add(domNode_2, "" + dnode.properties.key);
            }
        }
        if (updated && dnode.properties && dnode.properties.updateAnimation) {
            dnode.properties.updateAnimation(domNode_2, dnode.properties, previous.properties);
        }
    }
}
function addDeferredProperties(vnode, projectionOptions) {
    // transfer any properties that have been passed - as these must be decorated properties
    vnode.decoratedDeferredProperties = vnode.properties;
    var properties = vnode.deferredPropertiesCallback(!!vnode.inserted);
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    vnode.properties = tslib_1.__assign({}, properties, vnode.decoratedDeferredProperties);
    projectorState.deferredRenderCallbacks.push(function () {
        var properties = tslib_1.__assign({}, vnode.deferredPropertiesCallback(!!vnode.inserted), vnode.decoratedDeferredProperties);
        updateProperties(vnode.domNode, vnode.properties, properties, projectionOptions);
        vnode.properties = properties;
    });
}
function runDeferredRenderCallbacks(projectionOptions) {
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectorState.deferredRenderCallbacks.length) {
        if (projectionOptions.sync) {
            while (projectorState.deferredRenderCallbacks.length) {
                var callback = projectorState.deferredRenderCallbacks.shift();
                callback && callback();
            }
        }
        else {
            global_1.default.requestAnimationFrame(function () {
                while (projectorState.deferredRenderCallbacks.length) {
                    var callback = projectorState.deferredRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
    }
}
function runAfterRenderCallbacks(projectionOptions) {
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectionOptions.sync) {
        while (projectorState.afterRenderCallbacks.length) {
            var callback = projectorState.afterRenderCallbacks.shift();
            callback && callback();
        }
    }
    else {
        if (global_1.default.requestIdleCallback) {
            global_1.default.requestIdleCallback(function () {
                while (projectorState.afterRenderCallbacks.length) {
                    var callback = projectorState.afterRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
        else {
            setTimeout(function () {
                while (projectorState.afterRenderCallbacks.length) {
                    var callback = projectorState.afterRenderCallbacks.shift();
                    callback && callback();
                }
            });
        }
    }
}
function scheduleRender(projectionOptions) {
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    if (projectionOptions.sync) {
        render(projectionOptions);
    }
    else if (projectorState.renderScheduled === undefined) {
        projectorState.renderScheduled = global_1.default.requestAnimationFrame(function () {
            render(projectionOptions);
        });
    }
}
function render(projectionOptions) {
    var projectorState = projectorStateMap.get(projectionOptions.projectorInstance);
    projectorState.renderScheduled = undefined;
    var renderQueue = projectorState.renderQueue;
    var renders = tslib_1.__spread(renderQueue);
    projectorState.renderQueue = [];
    renders.sort(function (a, b) { return a.depth - b.depth; });
    var previouslyRendered = [];
    while (renders.length) {
        var instance = renders.shift().instance;
        if (instanceMap.has(instance) && previouslyRendered.indexOf(instance) === -1) {
            previouslyRendered.push(instance);
            var _a = instanceMap.get(instance), parentVNode = _a.parentVNode, dnode = _a.dnode;
            var instanceData = exports.widgetInstanceMap.get(instance);
            updateDom(dnode, toInternalWNode(instance, instanceData), projectionOptions, parentVNode, instance);
        }
    }
    runAfterRenderCallbacks(projectionOptions);
    runDeferredRenderCallbacks(projectionOptions);
}
exports.dom = {
    append: function (parentNode, instance, projectionOptions) {
        if (projectionOptions === void 0) { projectionOptions = {}; }
        var instanceData = exports.widgetInstanceMap.get(instance);
        var finalProjectorOptions = getProjectionOptions(projectionOptions, instance);
        var projectorState = {
            afterRenderCallbacks: [],
            deferredRenderCallbacks: [],
            nodeMap: new WeakMap_1.default(),
            renderScheduled: undefined,
            renderQueue: [],
            merge: projectionOptions.merge || false,
            mergeElement: projectionOptions.mergeElement
        };
        projectorStateMap.set(instance, projectorState);
        finalProjectorOptions.rootNode = parentNode;
        var parentVNode = toParentVNode(finalProjectorOptions.rootNode);
        var node = toInternalWNode(instance, instanceData);
        instanceMap.set(instance, { dnode: node, parentVNode: parentVNode });
        instanceData.invalidate = function () {
            instanceData.dirty = true;
            if (instanceData.rendering === false) {
                projectorState.renderQueue.push({ instance: instance, depth: finalProjectorOptions.depth });
                scheduleRender(finalProjectorOptions);
            }
        };
        updateDom(node, node, finalProjectorOptions, parentVNode, instance);
        projectorState.afterRenderCallbacks.push(function () {
            instanceData.onAttach();
        });
        runDeferredRenderCallbacks(finalProjectorOptions);
        runAfterRenderCallbacks(finalProjectorOptions);
        return {
            domNode: finalProjectorOptions.rootNode
        };
    },
    create: function (instance, projectionOptions) {
        return this.append(document.createElement('div'), instance, projectionOptions);
    },
    merge: function (element, instance, projectionOptions) {
        if (projectionOptions === void 0) { projectionOptions = {}; }
        projectionOptions.merge = true;
        projectionOptions.mergeElement = element;
        var projection = this.append(element.parentNode, instance, projectionOptions);
        var projectorState = projectorStateMap.get(instance);
        projectorState.merge = false;
        return projection;
    }
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js"), __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/* harmony export (immutable) */ __webpack_exports__["__exportStar"] = __exportStar;
/* harmony export (immutable) */ __webpack_exports__["__values"] = __values;
/* harmony export (immutable) */ __webpack_exports__["__read"] = __read;
/* harmony export (immutable) */ __webpack_exports__["__spread"] = __spread;
/* harmony export (immutable) */ __webpack_exports__["__await"] = __await;
/* harmony export (immutable) */ __webpack_exports__["__asyncGenerator"] = __asyncGenerator;
/* harmony export (immutable) */ __webpack_exports__["__asyncDelegator"] = __asyncDelegator;
/* harmony export (immutable) */ __webpack_exports__["__asyncValues"] = __asyncValues;
/* harmony export (immutable) */ __webpack_exports__["__makeTemplateObject"] = __makeTemplateObject;
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

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/main.css":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Projector_1 = __webpack_require__("./node_modules/@dojo/widget-core/mixins/Projector.js");
var App_1 = __webpack_require__("./src/widgets/App.ts");
// Create a projector to convert the virtual DOM produced by the application into the rendered page.
// For more information on starting up a Dojo 2 application, take a look at
// https://dojo.io/tutorials/002_creating_an_application/
var Projector = Projector_1.ProjectorMixin(App_1.default);
var projector = new Projector();
// By default, append() will attach the rendered content to document.body.  To insert this application
// into existing HTML content, pass the desired root node to append().
projector.append();


/***/ }),

/***/ "./src/widgets/App.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__("./node_modules/tslib/tslib.es6.js");
var WidgetBase_1 = __webpack_require__("./node_modules/@dojo/widget-core/WidgetBase.js");
var d_1 = __webpack_require__("./node_modules/@dojo/widget-core/d.js");
var App = /** @class */ (function (_super) {
    tslib_1.__extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return d_1.v('div');
    };
    return App;
}(WidgetBase_1.default));
exports.default = App;


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./src/main.css");
module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy9EZXN0cm95YWJsZS50cyIsIndlYnBhY2s6Ly8vRXZlbnRlZC50cyIsIndlYnBhY2s6Ly8vbGFuZy50cyIsIndlYnBhY2s6Ly8vaGFzLnRzIiwid2VicGFjazovLy9NYXAudHMiLCJ3ZWJwYWNrOi8vL1Byb21pc2UudHMiLCJ3ZWJwYWNrOi8vL1N5bWJvbC50cyIsIndlYnBhY2s6Ly8vV2Vha01hcC50cyIsIndlYnBhY2s6Ly8vYXJyYXkudHMiLCJ3ZWJwYWNrOi8vL2dsb2JhbC50cyIsIndlYnBhY2s6Ly8vaXRlcmF0b3IudHMiLCJ3ZWJwYWNrOi8vL251bWJlci50cyIsIndlYnBhY2s6Ly8vb2JqZWN0LnRzIiwid2VicGFjazovLy9zdHJpbmcudHMiLCJ3ZWJwYWNrOi8vL3F1ZXVlLnRzIiwid2VicGFjazovLy91dGlsLnRzIiwid2VicGFjazovLy9Ob2RlSGFuZGxlci50cyIsIndlYnBhY2s6Ly8vUmVnaXN0cnkudHMiLCJ3ZWJwYWNrOi8vL1JlZ2lzdHJ5SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vV2lkZ2V0QmFzZS50cyIsIndlYnBhY2s6Ly8vY3NzVHJhbnNpdGlvbnMudHMiLCJ3ZWJwYWNrOi8vL2QudHMiLCJ3ZWJwYWNrOi8vL2FmdGVyUmVuZGVyLnRzIiwid2VicGFjazovLy9oYW5kbGVEZWNvcmF0b3IudHMiLCJ3ZWJwYWNrOi8vL2RpZmYudHMiLCJ3ZWJwYWNrOi8vL1Byb2plY3Rvci50cyIsIndlYnBhY2s6Ly8vdmRvbS50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5jc3M/ODQ4NSIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd2lkZ2V0cy9BcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTzs7Ozs7Ozs7O0FDVEE7QUFDQTtBQUVBOzs7QUFHQTtJQUNDLE9BQU8saUJBQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzlCO0FBRUE7OztBQUdBO0lBQ0MsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQztBQUNqRDtBQUVBO0lBTUM7OztJQUdBO1FBQ0MsSUFBSSxDQUFDLFFBQU8sRUFBRyxFQUFFO0lBQ2xCO0lBRUE7Ozs7OztJQU1BLDBCQUFHLEVBQUgsVUFBSSxPQUEwQjtRQUM3QixJQUFNLE9BQU0sRUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLDRCQUFxQixnQ0FBSSxPQUFPLEdBQUUsRUFBRSxPQUFPO1FBQzNFLDJCQUFpQjtRQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNyQixPQUFPO1lBQ04sT0FBTztnQkFDTixRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDakI7U0FDQTtJQUNGLENBQUM7SUFFRDs7Ozs7SUFLQSw4QkFBTyxFQUFQO1FBQUE7UUFDQyxPQUFPLElBQUksaUJBQU8sQ0FBQyxVQUFDLE9BQU87WUFDMUIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO2dCQUMzQixPQUFNLEdBQUksTUFBTSxDQUFDLFFBQU8sR0FBSSxN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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7QUN2THRDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0IsRUFBRTtBQUNsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDekxEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOURBO0FBQUE7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTSxnQkFBZ0Isc0NBQXNDLGlCQUFpQixF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RUFBRTs7Ozs7Ozs7Ozs7O0FDWGxCO0FBQ0E7QUFFQTtJQUFpQztJQUFqQzs7SUFJQTtJQUhZLHFCQUFNLEVBQWhCO1FBQ0UsT0FBTyxLQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDSCxVQUFDO0FBQUQsQ0FKQSxDQUFpQyxvQkFBVSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJtYWluXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm1haW5cIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wibWFpblwiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJpbXBvcnQgeyBIYW5kbGUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgY3JlYXRlQ29tcG9zaXRlSGFuZGxlIH0gZnJvbSAnLi9sYW5nJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ0Bkb2pvL3NoaW0vUHJvbWlzZSc7XG5cbi8qKlxuICogTm8gb3BlcmF0aW9uIGZ1bmN0aW9uIHRvIHJlcGxhY2Ugb3duIG9uY2UgaW5zdGFuY2UgaXMgZGVzdG9yeWVkXG4gKi9cbmZ1bmN0aW9uIG5vb3AoKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpO1xufVxuXG4vKipcbiAqIE5vIG9wIGZ1bmN0aW9uIHVzZWQgdG8gcmVwbGFjZSBvd24sIG9uY2UgaW5zdGFuY2UgaGFzIGJlZW4gZGVzdG9yeWVkXG4gKi9cbmZ1bmN0aW9uIGRlc3Ryb3llZCgpOiBuZXZlciB7XG5cdHRocm93IG5ldyBFcnJvcignQ2FsbCBtYWRlIHRvIGRlc3Ryb3llZCBtZXRob2QnKTtcbn1cblxuZXhwb3J0IGNsYXNzIERlc3Ryb3lhYmxlIHtcblx0LyoqXG5cdCAqIHJlZ2lzdGVyIGhhbmRsZXMgZm9yIHRoZSBpbnN0YW5jZVxuXHQgKi9cblx0cHJpdmF0ZSBoYW5kbGVzOiBIYW5kbGVbXTtcblxuXHQvKipcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmhhbmRsZXMgPSBbXTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZWdpc3RlciBoYW5kbGVzIGZvciB0aGUgaW5zdGFuY2UgdGhhdCB3aWxsIGJlIGRlc3Ryb3llZCB3aGVuIGB0aGlzLmRlc3Ryb3lgIGlzIGNhbGxlZFxuXHQgKlxuXHQgKiBAcGFyYW0ge0hhbmRsZX0gaGFuZGxlIFRoZSBoYW5kbGUgdG8gYWRkIGZvciB0aGUgaW5zdGFuY2Vcblx0ICogQHJldHVybnMge0hhbmRsZX0gYSBoYW5kbGUgZm9yIHRoZSBoYW5kbGUsIHJlbW92ZXMgdGhlIGhhbmRsZSBmb3IgdGhlIGluc3RhbmNlIGFuZCBjYWxscyBkZXN0cm95XG5cdCAqL1xuXHRvd24oaGFuZGxlczogSGFuZGxlIHwgSGFuZGxlW10pOiBIYW5kbGUge1xuXHRcdGNvbnN0IGhhbmRsZSA9IEFycmF5LmlzQXJyYXkoaGFuZGxlcykgPyBjcmVhdGVDb21wb3NpdGVIYW5kbGUoLi4uaGFuZGxlcykgOiBoYW5kbGVzO1xuXHRcdGNvbnN0IHsgaGFuZGxlczogX2hhbmRsZXMgfSA9IHRoaXM7XG5cdFx0X2hhbmRsZXMucHVzaChoYW5kbGUpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRkZXN0cm95KCkge1xuXHRcdFx0XHRfaGFuZGxlcy5zcGxpY2UoX2hhbmRsZXMuaW5kZXhPZihoYW5kbGUpKTtcblx0XHRcdFx0aGFuZGxlLmRlc3Ryb3koKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIERlc3RycHlzIGFsbCBoYW5kZXJzIHJlZ2lzdGVyZWQgZm9yIHRoZSBpbnN0YW5jZVxuXHQgKlxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnl9IGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIG9uY2UgYWxsIGhhbmRsZXMgaGF2ZSBiZWVuIGRlc3Ryb3llZFxuXHQgKi9cblx0ZGVzdHJveSgpOiBQcm9taXNlPGFueT4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0dGhpcy5oYW5kbGVzLmZvckVhY2goKGhhbmRsZSkgPT4ge1xuXHRcdFx0XHRoYW5kbGUgJiYgaGFuZGxlLmRlc3Ryb3kgJiYgaGFuZGxlLmRlc3Ryb3koKTtcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5kZXN0cm95ID0gbm9vcDtcblx0XHRcdHRoaXMub3duID0gZGVzdHJveWVkO1xuXHRcdFx0cmVzb2x2ZSh0cnVlKTtcblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZXN0cm95YWJsZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBEZXN0cm95YWJsZS50cyIsImltcG9ydCBNYXAgZnJvbSAnQGRvam8vc2hpbS9NYXAnO1xuaW1wb3J0IHsgSGFuZGxlLCBFdmVudFR5cGUsIEV2ZW50T2JqZWN0IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERlc3Ryb3lhYmxlIH0gZnJvbSAnLi9EZXN0cm95YWJsZSc7XG5cbi8qKlxuICogTWFwIG9mIGNvbXB1dGVkIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGtleWVkIGJ5IHN0cmluZ1xuICovXG5jb25zdCByZWdleE1hcCA9IG5ldyBNYXA8c3RyaW5nLCBSZWdFeHA+KCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpcyB0aGUgZXZlbnQgdHlwZSBnbG9iIGhhcyBiZWVuIG1hdGNoZWRcbiAqXG4gKiBAcmV0dXJucyBib29sZWFuIHRoYXQgaW5kaWNhdGVzIGlmIHRoZSBnbG9iIGlzIG1hdGNoZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzR2xvYk1hdGNoKGdsb2JTdHJpbmc6IHN0cmluZyB8IHN5bWJvbCwgdGFyZ2V0U3RyaW5nOiBzdHJpbmcgfCBzeW1ib2wpOiBib29sZWFuIHtcblx0aWYgKHR5cGVvZiB0YXJnZXRTdHJpbmcgPT09ICdzdHJpbmcnICYmIHR5cGVvZiBnbG9iU3RyaW5nID09PSAnc3RyaW5nJyAmJiBnbG9iU3RyaW5nLmluZGV4T2YoJyonKSAhPT0gLTEpIHtcblx0XHRsZXQgcmVnZXg6IFJlZ0V4cDtcblx0XHRpZiAocmVnZXhNYXAuaGFzKGdsb2JTdHJpbmcpKSB7XG5cdFx0XHRyZWdleCA9IHJlZ2V4TWFwLmdldChnbG9iU3RyaW5nKSE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7Z2xvYlN0cmluZy5yZXBsYWNlKC9cXCovZywgJy4qJyl9JGApO1xuXHRcdFx0cmVnZXhNYXAuc2V0KGdsb2JTdHJpbmcsIHJlZ2V4KTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlZ2V4LnRlc3QodGFyZ2V0U3RyaW5nKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZ2xvYlN0cmluZyA9PT0gdGFyZ2V0U3RyaW5nO1xuXHR9XG59XG5cbmV4cG9ydCB0eXBlIEV2ZW50ZWRDYWxsYmFjazxUID0gRXZlbnRUeXBlLCBFIGV4dGVuZHMgRXZlbnRPYmplY3Q8VD4gPSBFdmVudE9iamVjdDxUPj4gPSB7XG5cdC8qKlxuXHQgKiBBIGNhbGxiYWNrIHRoYXQgdGFrZXMgYW4gYGV2ZW50YCBhcmd1bWVudFxuXHQgKlxuXHQgKiBAcGFyYW0gZXZlbnQgVGhlIGV2ZW50IG9iamVjdFxuXHQgKi9cblxuXHQoZXZlbnQ6IEUpOiBib29sZWFuIHwgdm9pZDtcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tRXZlbnRUeXBlczxUIGV4dGVuZHMgRXZlbnRPYmplY3Q8YW55PiA9IEV2ZW50T2JqZWN0PGFueT4+IHtcblx0W2luZGV4OiBzdHJpbmddOiBUO1xufVxuXG4vKipcbiAqIEEgdHlwZSB3aGljaCBpcyBlaXRoZXIgYSB0YXJnZXRlZCBldmVudCBsaXN0ZW5lciBvciBhbiBhcnJheSBvZiBsaXN0ZW5lcnNcbiAqIEB0ZW1wbGF0ZSBUIFRoZSB0eXBlIG9mIHRhcmdldCBmb3IgdGhlIGV2ZW50c1xuICogQHRlbXBsYXRlIEUgVGhlIGV2ZW50IHR5cGUgZm9yIHRoZSBldmVudHNcbiAqL1xuZXhwb3J0IHR5cGUgRXZlbnRlZENhbGxiYWNrT3JBcnJheTxUID0gRXZlbnRUeXBlLCBFIGV4dGVuZHMgRXZlbnRPYmplY3Q8VD4gPSBFdmVudE9iamVjdDxUPj4gPVxuXHR8IEV2ZW50ZWRDYWxsYmFjazxULCBFPlxuXHR8IEV2ZW50ZWRDYWxsYmFjazxULCBFPltdO1xuXG4vKipcbiAqIEV2ZW50IENsYXNzXG4gKi9cbmV4cG9ydCBjbGFzcyBFdmVudGVkPFxuXHRNIGV4dGVuZHMgQ3VzdG9tRXZlbnRUeXBlcyA9IHt9LFxuXHRUID0gRXZlbnRUeXBlLFxuXHRPIGV4dGVuZHMgRXZlbnRPYmplY3Q8VD4gPSBFdmVudE9iamVjdDxUPlxuPiBleHRlbmRzIERlc3Ryb3lhYmxlIHtcblx0Ly8gVGhlIGZvbGxvd2luZyBtZW1iZXIgaXMgcHVyZWx5IHNvIFR5cGVTY3JpcHQgcmVtZW1iZXJzIHRoZSB0eXBlIG9mIGBNYCB3aGVuIGV4dGVuZGluZyBzb1xuXHQvLyB0aGF0IHRoZSB1dGlsaXRpZXMgaW4gYG9uLnRzYCB3aWxsIHdvcmsgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8yMDM0OFxuXHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcblx0cHJvdGVjdGVkIF9fdHlwZU1hcF9fPzogTTtcblx0LyoqXG5cdCAqIG1hcCBvZiBsaXN0ZW5lcnMga2V5ZWQgYnkgZXZlbnQgdHlwZVxuXHQgKi9cblx0cHJvdGVjdGVkIGxpc3RlbmVyc01hcDogTWFwPFQgfCBrZXlvZiBNLCBFdmVudGVkQ2FsbGJhY2s8VCwgTz5bXT4gPSBuZXcgTWFwKCk7XG5cblx0LyoqXG5cdCAqIEVtaXRzIHRoZSBldmVudCBvYmplY3QgZm9yIHRoZSBzcGVjaWZpZWQgdHlwZVxuXHQgKlxuXHQgKiBAcGFyYW0gZXZlbnQgdGhlIGV2ZW50IHRvIGVtaXRcblx0ICovXG5cdGVtaXQ8SyBleHRlbmRzIGtleW9mIE0+KGV2ZW50OiBNW0tdKTogdm9pZDtcblx0ZW1pdChldmVudDogTyk6IHZvaWQ7XG5cdGVtaXQoZXZlbnQ6IGFueSk6IHZvaWQge1xuXHRcdHRoaXMubGlzdGVuZXJzTWFwLmZvckVhY2goKG1ldGhvZHMsIHR5cGUpID0+IHtcblx0XHRcdGlmIChpc0dsb2JNYXRjaCh0eXBlIGFzIGFueSwgZXZlbnQudHlwZSkpIHtcblx0XHRcdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRcdFx0XHRtZXRob2QuY2FsbCh0aGlzLCBldmVudCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhdGNoIGFsbCBoYW5kbGVyIGZvciB2YXJpb3VzIGNhbGwgc2lnbmF0dXJlcy4gVGhlIHNpZ25hdHVyZXMgYXJlIGRlZmluZWQgaW5cblx0ICogYEJhc2VFdmVudGVkRXZlbnRzYC4gIFlvdSBjYW4gYWRkIHlvdXIgb3duIGV2ZW50IHR5cGUgLT4gaGFuZGxlciB0eXBlcyBieSBleHRlbmRpbmdcblx0ICogYEJhc2VFdmVudGVkRXZlbnRzYC4gIFNlZSBleGFtcGxlIGZvciBkZXRhaWxzLlxuXHQgKlxuXHQgKiBAcGFyYW0gYXJnc1xuXHQgKlxuXHQgKiBAZXhhbXBsZVxuXHQgKlxuXHQgKiBpbnRlcmZhY2UgV2lkZ2V0QmFzZUV2ZW50cyBleHRlbmRzIEJhc2VFdmVudGVkRXZlbnRzIHtcblx0ICogICAgICh0eXBlOiAncHJvcGVydGllczpjaGFuZ2VkJywgaGFuZGxlcjogUHJvcGVydGllc0NoYW5nZWRIYW5kbGVyKTogSGFuZGxlO1xuXHQgKiB9XG5cdCAqIGNsYXNzIFdpZGdldEJhc2UgZXh0ZW5kcyBFdmVudGVkIHtcblx0ICogICAgb246IFdpZGdldEJhc2VFdmVudHM7XG5cdCAqIH1cblx0ICpcblx0ICogQHJldHVybiB7YW55fVxuXHQgKi9cblx0b248SyBleHRlbmRzIGtleW9mIE0+KHR5cGU6IEssIGxpc3RlbmVyOiBFdmVudGVkQ2FsbGJhY2tPckFycmF5PEssIE1bS10+KTogSGFuZGxlO1xuXHRvbih0eXBlOiBULCBsaXN0ZW5lcjogRXZlbnRlZENhbGxiYWNrT3JBcnJheTxULCBPPik6IEhhbmRsZTtcblx0b24odHlwZTogYW55LCBsaXN0ZW5lcjogRXZlbnRlZENhbGxiYWNrT3JBcnJheTxhbnksIGFueT4pOiBIYW5kbGUge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGxpc3RlbmVyKSkge1xuXHRcdFx0Y29uc3QgaGFuZGxlcyA9IGxpc3RlbmVyLm1hcCgobGlzdGVuZXIpID0+IHRoaXMuX2FkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSk7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRkZXN0cm95KCkge1xuXHRcdFx0XHRcdGhhbmRsZXMuZm9yRWFjaCgoaGFuZGxlKSA9PiBoYW5kbGUuZGVzdHJveSgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2FkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKTtcblx0fVxuXG5cdHByaXZhdGUgX2FkZExpc3RlbmVyKHR5cGU6IFQgfCBrZXlvZiBNLCBsaXN0ZW5lcjogRXZlbnRlZENhbGxiYWNrPFQsIE8+KSB7XG5cdFx0Y29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNNYXAuZ2V0KHR5cGUpIHx8IFtdO1xuXHRcdGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblx0XHR0aGlzLmxpc3RlbmVyc01hcC5zZXQodHlwZSwgbGlzdGVuZXJzKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZGVzdHJveTogKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc01hcC5nZXQodHlwZSkgfHwgW107XG5cdFx0XHRcdGxpc3RlbmVycy5zcGxpY2UobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpLCAxKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEV2ZW50ZWQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gRXZlbnRlZC50cyIsImltcG9ydCB7IEhhbmRsZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tICdAZG9qby9zaGltL29iamVjdCc7XG5cbmV4cG9ydCB7IGFzc2lnbiB9IGZyb20gJ0Bkb2pvL3NoaW0vb2JqZWN0JztcblxuY29uc3Qgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVHlwZSBndWFyZCB0aGF0IGVuc3VyZXMgdGhhdCB0aGUgdmFsdWUgY2FuIGJlIGNvZXJjZWQgdG8gT2JqZWN0XG4gKiB0byB3ZWVkIG91dCBob3N0IG9iamVjdHMgdGhhdCBkbyBub3QgZGVyaXZlIGZyb20gT2JqZWN0LlxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGNoZWNrIGlmIHdlIHdhbnQgdG8gZGVlcCBjb3B5IGFuIG9iamVjdCBvciBub3QuXG4gKiBOb3RlOiBJbiBFUzYgaXQgaXMgcG9zc2libGUgdG8gbW9kaWZ5IGFuIG9iamVjdCdzIFN5bWJvbC50b1N0cmluZ1RhZyBwcm9wZXJ0eSwgd2hpY2ggd2lsbFxuICogY2hhbmdlIHRoZSB2YWx1ZSByZXR1cm5lZCBieSBgdG9TdHJpbmdgLiBUaGlzIGlzIGEgcmFyZSBlZGdlIGNhc2UgdGhhdCBpcyBkaWZmaWN1bHQgdG8gaGFuZGxlLFxuICogc28gaXQgaXMgbm90IGhhbmRsZWQgaGVyZS5cbiAqIEBwYXJhbSAgdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrXG4gKiBAcmV0dXJuICAgICAgIElmIHRoZSB2YWx1ZSBpcyBjb2VyY2libGUgaW50byBhbiBPYmplY3RcbiAqL1xuZnVuY3Rpb24gc2hvdWxkRGVlcENvcHlPYmplY3QodmFsdWU6IGFueSk6IHZhbHVlIGlzIE9iamVjdCB7XG5cdHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuZnVuY3Rpb24gY29weUFycmF5PFQ+KGFycmF5OiBUW10sIGluaGVyaXRlZDogYm9vbGVhbik6IFRbXSB7XG5cdHJldHVybiBhcnJheS5tYXAoZnVuY3Rpb24oaXRlbTogVCk6IFQge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG5cdFx0XHRyZXR1cm4gPGFueT5jb3B5QXJyYXkoPGFueT5pdGVtLCBpbmhlcml0ZWQpO1xuXHRcdH1cblxuXHRcdHJldHVybiAhc2hvdWxkRGVlcENvcHlPYmplY3QoaXRlbSlcblx0XHRcdD8gaXRlbVxuXHRcdFx0OiBfbWl4aW4oe1xuXHRcdFx0XHRcdGRlZXA6IHRydWUsXG5cdFx0XHRcdFx0aW5oZXJpdGVkOiBpbmhlcml0ZWQsXG5cdFx0XHRcdFx0c291cmNlczogPEFycmF5PFQ+PltpdGVtXSxcblx0XHRcdFx0XHR0YXJnZXQ6IDxUPnt9XG5cdFx0XHRcdH0pO1xuXHR9KTtcbn1cblxuaW50ZXJmYWNlIE1peGluQXJnczxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fT4ge1xuXHRkZWVwOiBib29sZWFuO1xuXHRpbmhlcml0ZWQ6IGJvb2xlYW47XG5cdHNvdXJjZXM6IChVIHwgbnVsbCB8IHVuZGVmaW5lZClbXTtcblx0dGFyZ2V0OiBUO1xuXHRjb3BpZWQ/OiBhbnlbXTtcbn1cblxuZnVuY3Rpb24gX21peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9Pihrd0FyZ3M6IE1peGluQXJnczxULCBVPik6IFQgJiBVIHtcblx0Y29uc3QgZGVlcCA9IGt3QXJncy5kZWVwO1xuXHRjb25zdCBpbmhlcml0ZWQgPSBrd0FyZ3MuaW5oZXJpdGVkO1xuXHRjb25zdCB0YXJnZXQ6IGFueSA9IGt3QXJncy50YXJnZXQ7XG5cdGNvbnN0IGNvcGllZCA9IGt3QXJncy5jb3BpZWQgfHwgW107XG5cdGNvbnN0IGNvcGllZENsb25lID0gWy4uLmNvcGllZF07XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBrd0FyZ3Muc291cmNlcy5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IHNvdXJjZSA9IGt3QXJncy5zb3VyY2VzW2ldO1xuXG5cdFx0aWYgKHNvdXJjZSA9PT0gbnVsbCB8fCBzb3VyY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXHRcdGZvciAobGV0IGtleSBpbiBzb3VyY2UpIHtcblx0XHRcdGlmIChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcblx0XHRcdFx0bGV0IHZhbHVlOiBhbnkgPSBzb3VyY2Vba2V5XTtcblxuXHRcdFx0XHRpZiAoY29waWVkQ2xvbmUuaW5kZXhPZih2YWx1ZSkgIT09IC0xKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZGVlcCkge1xuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdFx0XHRcdFx0dmFsdWUgPSBjb3B5QXJyYXkodmFsdWUsIGluaGVyaXRlZCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChzaG91bGREZWVwQ29weU9iamVjdCh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdGNvbnN0IHRhcmdldFZhbHVlOiBhbnkgPSB0YXJnZXRba2V5XSB8fCB7fTtcblx0XHRcdFx0XHRcdGNvcGllZC5wdXNoKHNvdXJjZSk7XG5cdFx0XHRcdFx0XHR2YWx1ZSA9IF9taXhpbih7XG5cdFx0XHRcdFx0XHRcdGRlZXA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdGluaGVyaXRlZDogaW5oZXJpdGVkLFxuXHRcdFx0XHRcdFx0XHRzb3VyY2VzOiBbdmFsdWVdLFxuXHRcdFx0XHRcdFx0XHR0YXJnZXQ6IHRhcmdldFZhbHVlLFxuXHRcdFx0XHRcdFx0XHRjb3BpZWRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0YXJnZXRba2V5XSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiA8VCAmIFU+dGFyZ2V0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IGZyb20gdGhlIGdpdmVuIHByb3RvdHlwZSwgYW5kIGNvcGllcyBhbGwgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyBvZiBvbmUgb3IgbW9yZVxuICogc291cmNlIG9iamVjdHMgdG8gdGhlIG5ld2x5IGNyZWF0ZWQgdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gcHJvdG90eXBlIFRoZSBwcm90b3R5cGUgdG8gY3JlYXRlIGEgbmV3IG9iamVjdCBmcm9tXG4gKiBAcGFyYW0gbWl4aW5zIEFueSBudW1iZXIgb2Ygb2JqZWN0cyB3aG9zZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIHdpbGwgYmUgY29waWVkIHRvIHRoZSBjcmVhdGVkIG9iamVjdFxuICogQHJldHVybiBUaGUgbmV3IG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlPFxuXHRUIGV4dGVuZHMge30sXG5cdFUgZXh0ZW5kcyB7fSxcblx0ViBleHRlbmRzIHt9LFxuXHRXIGV4dGVuZHMge30sXG5cdFggZXh0ZW5kcyB7fSxcblx0WSBleHRlbmRzIHt9LFxuXHRaIGV4dGVuZHMge31cbj4ocHJvdG90eXBlOiBULCBtaXhpbjE6IFUsIG1peGluMjogViwgbWl4aW4zOiBXLCBtaXhpbjQ6IFgsIG1peGluNTogWSwgbWl4aW42OiBaKTogVCAmIFUgJiBWICYgVyAmIFggJiBZICYgWjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30sIFkgZXh0ZW5kcyB7fT4oXG5cdHByb3RvdHlwZTogVCxcblx0bWl4aW4xOiBVLFxuXHRtaXhpbjI6IFYsXG5cdG1peGluMzogVyxcblx0bWl4aW40OiBYLFxuXHRtaXhpbjU6IFlcbik6IFQgJiBVICYgViAmIFcgJiBYICYgWTtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30+KFxuXHRwcm90b3R5cGU6IFQsXG5cdG1peGluMTogVSxcblx0bWl4aW4yOiBWLFxuXHRtaXhpbjM6IFcsXG5cdG1peGluNDogWFxuKTogVCAmIFUgJiBWICYgVyAmIFg7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30sIFcgZXh0ZW5kcyB7fT4oXG5cdHByb3RvdHlwZTogVCxcblx0bWl4aW4xOiBVLFxuXHRtaXhpbjI6IFYsXG5cdG1peGluMzogV1xuKTogVCAmIFUgJiBWICYgVztcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fT4ocHJvdG90eXBlOiBULCBtaXhpbjE6IFUsIG1peGluMjogVik6IFQgJiBVICYgVjtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30+KHByb3RvdHlwZTogVCwgbWl4aW46IFUpOiBUICYgVTtcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8VCBleHRlbmRzIHt9Pihwcm90b3R5cGU6IFQpOiBUO1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZShwcm90b3R5cGU6IGFueSwgLi4ubWl4aW5zOiBhbnlbXSk6IGFueSB7XG5cdGlmICghbWl4aW5zLmxlbmd0aCkge1xuXHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdsYW5nLmNyZWF0ZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgbWl4aW4gb2JqZWN0LicpO1xuXHR9XG5cblx0Y29uc3QgYXJncyA9IG1peGlucy5zbGljZSgpO1xuXHRhcmdzLnVuc2hpZnQoT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpKTtcblxuXHRyZXR1cm4gYXNzaWduLmFwcGx5KG51bGwsIGFyZ3MpO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGFsbCBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIG9mIG9uZSBvciBtb3JlIHNvdXJjZSBvYmplY3RzIHRvIHRoZSB0YXJnZXQgb2JqZWN0LFxuICogcmVjdXJzaXZlbHkgY29weWluZyBhbGwgbmVzdGVkIG9iamVjdHMgYW5kIGFycmF5cyBhcyB3ZWxsLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdG8gcmVjZWl2ZSB2YWx1ZXMgZnJvbSBzb3VyY2Ugb2JqZWN0c1xuICogQHBhcmFtIHNvdXJjZXMgQW55IG51bWJlciBvZiBvYmplY3RzIHdob3NlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIHRhcmdldCBvYmplY3RcbiAqIEByZXR1cm4gVGhlIG1vZGlmaWVkIHRhcmdldCBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248XG5cdFQgZXh0ZW5kcyB7fSxcblx0VSBleHRlbmRzIHt9LFxuXHRWIGV4dGVuZHMge30sXG5cdFcgZXh0ZW5kcyB7fSxcblx0WCBleHRlbmRzIHt9LFxuXHRZIGV4dGVuZHMge30sXG5cdFogZXh0ZW5kcyB7fVxuPih0YXJnZXQ6IFQsIHNvdXJjZTE6IFUsIHNvdXJjZTI6IFYsIHNvdXJjZTM6IFcsIHNvdXJjZTQ6IFgsIHNvdXJjZTU6IFksIHNvdXJjZTY6IFopOiBUICYgVSAmIFYgJiBXICYgWCAmIFkgJiBaO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30sIFkgZXh0ZW5kcyB7fT4oXG5cdHRhcmdldDogVCxcblx0c291cmNlMTogVSxcblx0c291cmNlMjogVixcblx0c291cmNlMzogVyxcblx0c291cmNlNDogWCxcblx0c291cmNlNTogWVxuKTogVCAmIFUgJiBWICYgVyAmIFggJiBZO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFcsXG5cdHNvdXJjZTQ6IFhcbik6IFQgJiBVICYgViAmIFcgJiBYO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9Pihcblx0dGFyZ2V0OiBULFxuXHRzb3VyY2UxOiBVLFxuXHRzb3VyY2UyOiBWLFxuXHRzb3VyY2UzOiBXXG4pOiBUICYgVSAmIFYgJiBXO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fT4odGFyZ2V0OiBULCBzb3VyY2UxOiBVLCBzb3VyY2UyOiBWKTogVCAmIFUgJiBWO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBBc3NpZ248VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30+KHRhcmdldDogVCwgc291cmNlOiBVKTogVCAmIFU7XG5leHBvcnQgZnVuY3Rpb24gZGVlcEFzc2lnbih0YXJnZXQ6IGFueSwgLi4uc291cmNlczogYW55W10pOiBhbnkge1xuXHRyZXR1cm4gX21peGluKHtcblx0XHRkZWVwOiB0cnVlLFxuXHRcdGluaGVyaXRlZDogZmFsc2UsXG5cdFx0c291cmNlczogc291cmNlcyxcblx0XHR0YXJnZXQ6IHRhcmdldFxuXHR9KTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBhbGwgZW51bWVyYWJsZSAob3duIG9yIGluaGVyaXRlZCkgcHJvcGVydGllcyBvZiBvbmUgb3IgbW9yZSBzb3VyY2Ugb2JqZWN0cyB0byB0aGVcbiAqIHRhcmdldCBvYmplY3QsIHJlY3Vyc2l2ZWx5IGNvcHlpbmcgYWxsIG5lc3RlZCBvYmplY3RzIGFuZCBhcnJheXMgYXMgd2VsbC5cbiAqXG4gKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IHRvIHJlY2VpdmUgdmFsdWVzIGZyb20gc291cmNlIG9iamVjdHNcbiAqIEBwYXJhbSBzb3VyY2VzIEFueSBudW1iZXIgb2Ygb2JqZWN0cyB3aG9zZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIHRhcmdldCBvYmplY3RcbiAqIEByZXR1cm4gVGhlIG1vZGlmaWVkIHRhcmdldCBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBNaXhpbjxcblx0VCBleHRlbmRzIHt9LFxuXHRVIGV4dGVuZHMge30sXG5cdFYgZXh0ZW5kcyB7fSxcblx0VyBleHRlbmRzIHt9LFxuXHRYIGV4dGVuZHMge30sXG5cdFkgZXh0ZW5kcyB7fSxcblx0WiBleHRlbmRzIHt9XG4+KHRhcmdldDogVCwgc291cmNlMTogVSwgc291cmNlMjogViwgc291cmNlMzogVywgc291cmNlNDogWCwgc291cmNlNTogWSwgc291cmNlNjogWik6IFQgJiBVICYgViAmIFcgJiBYICYgWSAmIFo7XG5leHBvcnQgZnVuY3Rpb24gZGVlcE1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30sIFcgZXh0ZW5kcyB7fSwgWCBleHRlbmRzIHt9LCBZIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFcsXG5cdHNvdXJjZTQ6IFgsXG5cdHNvdXJjZTU6IFlcbik6IFQgJiBVICYgViAmIFcgJiBYICYgWTtcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFcsXG5cdHNvdXJjZTQ6IFhcbik6IFQgJiBVICYgViAmIFcgJiBYO1xuZXhwb3J0IGZ1bmN0aW9uIGRlZXBNaXhpbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFdcbik6IFQgJiBVICYgViAmIFc7XG5leHBvcnQgZnVuY3Rpb24gZGVlcE1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30+KHRhcmdldDogVCwgc291cmNlMTogVSwgc291cmNlMjogVik6IFQgJiBVICYgVjtcbmV4cG9ydCBmdW5jdGlvbiBkZWVwTWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30+KHRhcmdldDogVCwgc291cmNlOiBVKTogVCAmIFU7XG5leHBvcnQgZnVuY3Rpb24gZGVlcE1peGluKHRhcmdldDogYW55LCAuLi5zb3VyY2VzOiBhbnlbXSk6IGFueSB7XG5cdHJldHVybiBfbWl4aW4oe1xuXHRcdGRlZXA6IHRydWUsXG5cdFx0aW5oZXJpdGVkOiB0cnVlLFxuXHRcdHNvdXJjZXM6IHNvdXJjZXMsXG5cdFx0dGFyZ2V0OiB0YXJnZXRcblx0fSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBvYmplY3QgdXNpbmcgdGhlIHByb3ZpZGVkIHNvdXJjZSdzIHByb3RvdHlwZSBhcyB0aGUgcHJvdG90eXBlIGZvciB0aGUgbmV3IG9iamVjdCwgYW5kIHRoZW5cbiAqIGRlZXAgY29waWVzIHRoZSBwcm92aWRlZCBzb3VyY2UncyB2YWx1ZXMgaW50byB0aGUgbmV3IHRhcmdldC5cbiAqXG4gKiBAcGFyYW0gc291cmNlIFRoZSBvYmplY3QgdG8gZHVwbGljYXRlXG4gKiBAcmV0dXJuIFRoZSBuZXcgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkdXBsaWNhdGU8VCBleHRlbmRzIHt9Pihzb3VyY2U6IFQpOiBUIHtcblx0Y29uc3QgdGFyZ2V0ID0gT2JqZWN0LmNyZWF0ZShPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc291cmNlKSk7XG5cblx0cmV0dXJuIGRlZXBNaXhpbih0YXJnZXQsIHNvdXJjZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHR3byB2YWx1ZXMgYXJlIHRoZSBzYW1lIHZhbHVlLlxuICpcbiAqIEBwYXJhbSBhIEZpcnN0IHZhbHVlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSBiIFNlY29uZCB2YWx1ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlcyBhcmUgdGhlIHNhbWU7IGZhbHNlIG90aGVyd2lzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJZGVudGljYWwoYTogYW55LCBiOiBhbnkpOiBib29sZWFuIHtcblx0cmV0dXJuIChcblx0XHRhID09PSBiIHx8XG5cdFx0LyogYm90aCB2YWx1ZXMgYXJlIE5hTiAqL1xuXHRcdChhICE9PSBhICYmIGIgIT09IGIpXG5cdCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgYmluZHMgYSBtZXRob2QgdG8gdGhlIHNwZWNpZmllZCBvYmplY3QgYXQgcnVudGltZS4gVGhpcyBpcyBzaW1pbGFyIHRvXG4gKiBgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRgLCBidXQgaW5zdGVhZCBvZiBhIGZ1bmN0aW9uIGl0IHRha2VzIHRoZSBuYW1lIG9mIGEgbWV0aG9kIG9uIGFuIG9iamVjdC5cbiAqIEFzIGEgcmVzdWx0LCB0aGUgZnVuY3Rpb24gcmV0dXJuZWQgYnkgYGxhdGVCaW5kYCB3aWxsIGFsd2F5cyBjYWxsIHRoZSBmdW5jdGlvbiBjdXJyZW50bHkgYXNzaWduZWQgdG9cbiAqIHRoZSBzcGVjaWZpZWQgcHJvcGVydHkgb24gdGhlIG9iamVjdCBhcyBvZiB0aGUgbW9tZW50IHRoZSBmdW5jdGlvbiBpdCByZXR1cm5zIGlzIGNhbGxlZC5cbiAqXG4gKiBAcGFyYW0gaW5zdGFuY2UgVGhlIGNvbnRleHQgb2JqZWN0XG4gKiBAcGFyYW0gbWV0aG9kIFRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgb24gdGhlIGNvbnRleHQgb2JqZWN0IHRvIGJpbmQgdG8gaXRzZWxmXG4gKiBAcGFyYW0gc3VwcGxpZWRBcmdzIEFuIG9wdGlvbmFsIGFycmF5IG9mIHZhbHVlcyB0byBwcmVwZW5kIHRvIHRoZSBgaW5zdGFuY2VbbWV0aG9kXWAgYXJndW1lbnRzIGxpc3RcbiAqIEByZXR1cm4gVGhlIGJvdW5kIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsYXRlQmluZChpbnN0YW5jZToge30sIG1ldGhvZDogc3RyaW5nLCAuLi5zdXBwbGllZEFyZ3M6IGFueVtdKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkge1xuXHRyZXR1cm4gc3VwcGxpZWRBcmdzLmxlbmd0aFxuXHRcdD8gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvbnN0IGFyZ3M6IGFueVtdID0gYXJndW1lbnRzLmxlbmd0aCA/IHN1cHBsaWVkQXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSA6IHN1cHBsaWVkQXJncztcblxuXHRcdFx0XHQvLyBUUzcwMTdcblx0XHRcdFx0cmV0dXJuICg8YW55Pmluc3RhbmNlKVttZXRob2RdLmFwcGx5KGluc3RhbmNlLCBhcmdzKTtcblx0XHRcdH1cblx0XHQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQvLyBUUzcwMTdcblx0XHRcdFx0cmV0dXJuICg8YW55Pmluc3RhbmNlKVttZXRob2RdLmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpO1xuXHRcdFx0fTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBhbGwgZW51bWVyYWJsZSAob3duIG9yIGluaGVyaXRlZCkgcHJvcGVydGllcyBvZiBvbmUgb3IgbW9yZSBzb3VyY2Ugb2JqZWN0cyB0byB0aGVcbiAqIHRhcmdldCBvYmplY3QuXG4gKlxuICogQHJldHVybiBUaGUgbW9kaWZpZWQgdGFyZ2V0IG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9LCBYIGV4dGVuZHMge30sIFkgZXh0ZW5kcyB7fSwgWiBleHRlbmRzIHt9Pihcblx0dGFyZ2V0OiBULFxuXHRzb3VyY2UxOiBVLFxuXHRzb3VyY2UyOiBWLFxuXHRzb3VyY2UzOiBXLFxuXHRzb3VyY2U0OiBYLFxuXHRzb3VyY2U1OiBZLFxuXHRzb3VyY2U2OiBaXG4pOiBUICYgVSAmIFYgJiBXICYgWCAmIFkgJiBaO1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30sIFcgZXh0ZW5kcyB7fSwgWCBleHRlbmRzIHt9LCBZIGV4dGVuZHMge30+KFxuXHR0YXJnZXQ6IFQsXG5cdHNvdXJjZTE6IFUsXG5cdHNvdXJjZTI6IFYsXG5cdHNvdXJjZTM6IFcsXG5cdHNvdXJjZTQ6IFgsXG5cdHNvdXJjZTU6IFlcbik6IFQgJiBVICYgViAmIFcgJiBYICYgWTtcbmV4cG9ydCBmdW5jdGlvbiBtaXhpbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fSwgViBleHRlbmRzIHt9LCBXIGV4dGVuZHMge30sIFggZXh0ZW5kcyB7fT4oXG5cdHRhcmdldDogVCxcblx0c291cmNlMTogVSxcblx0c291cmNlMjogVixcblx0c291cmNlMzogVyxcblx0c291cmNlNDogWFxuKTogVCAmIFUgJiBWICYgVyAmIFg7XG5leHBvcnQgZnVuY3Rpb24gbWl4aW48VCBleHRlbmRzIHt9LCBVIGV4dGVuZHMge30sIFYgZXh0ZW5kcyB7fSwgVyBleHRlbmRzIHt9Pihcblx0dGFyZ2V0OiBULFxuXHRzb3VyY2UxOiBVLFxuXHRzb3VyY2UyOiBWLFxuXHRzb3VyY2UzOiBXXG4pOiBUICYgVSAmIFYgJiBXO1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluPFQgZXh0ZW5kcyB7fSwgVSBleHRlbmRzIHt9LCBWIGV4dGVuZHMge30+KHRhcmdldDogVCwgc291cmNlMTogVSwgc291cmNlMjogVik6IFQgJiBVICYgVjtcbmV4cG9ydCBmdW5jdGlvbiBtaXhpbjxUIGV4dGVuZHMge30sIFUgZXh0ZW5kcyB7fT4odGFyZ2V0OiBULCBzb3VyY2U6IFUpOiBUICYgVTtcbmV4cG9ydCBmdW5jdGlvbiBtaXhpbih0YXJnZXQ6IGFueSwgLi4uc291cmNlczogYW55W10pOiBhbnkge1xuXHRyZXR1cm4gX21peGluKHtcblx0XHRkZWVwOiBmYWxzZSxcblx0XHRpbmhlcml0ZWQ6IHRydWUsXG5cdFx0c291cmNlczogc291cmNlcyxcblx0XHR0YXJnZXQ6IHRhcmdldFxuXHR9KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgZnVuY3Rpb24gd2hpY2ggaW52b2tlcyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCB0aGUgZ2l2ZW4gYXJndW1lbnRzIHByZXBlbmRlZCB0byBpdHMgYXJndW1lbnQgbGlzdC5cbiAqIExpa2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kYCwgYnV0IGRvZXMgbm90IGFsdGVyIGV4ZWN1dGlvbiBjb250ZXh0LlxuICpcbiAqIEBwYXJhbSB0YXJnZXRGdW5jdGlvbiBUaGUgZnVuY3Rpb24gdGhhdCBuZWVkcyB0byBiZSBib3VuZFxuICogQHBhcmFtIHN1cHBsaWVkQXJncyBBbiBvcHRpb25hbCBhcnJheSBvZiBhcmd1bWVudHMgdG8gcHJlcGVuZCB0byB0aGUgYHRhcmdldEZ1bmN0aW9uYCBhcmd1bWVudHMgbGlzdFxuICogQHJldHVybiBUaGUgYm91bmQgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnRpYWwodGFyZ2V0RnVuY3Rpb246ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55LCAuLi5zdXBwbGllZEFyZ3M6IGFueVtdKTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnkge1xuXHRyZXR1cm4gZnVuY3Rpb24odGhpczogYW55KSB7XG5cdFx0Y29uc3QgYXJnczogYW55W10gPSBhcmd1bWVudHMubGVuZ3RoID8gc3VwcGxpZWRBcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpIDogc3VwcGxpZWRBcmdzO1xuXG5cdFx0cmV0dXJuIHRhcmdldEZ1bmN0aW9uLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHdpdGggYSBkZXN0cm95IG1ldGhvZCB0aGF0LCB3aGVuIGNhbGxlZCwgY2FsbHMgdGhlIHBhc3NlZC1pbiBkZXN0cnVjdG9yLlxuICogVGhpcyBpcyBpbnRlbmRlZCB0byBwcm92aWRlIGEgdW5pZmllZCBpbnRlcmZhY2UgZm9yIGNyZWF0aW5nIFwicmVtb3ZlXCIgLyBcImRlc3Ryb3lcIiBoYW5kbGVycyBmb3JcbiAqIGV2ZW50IGxpc3RlbmVycywgdGltZXJzLCBldGMuXG4gKlxuICogQHBhcmFtIGRlc3RydWN0b3IgQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGhhbmRsZSdzIGBkZXN0cm95YCBtZXRob2QgaXMgaW52b2tlZFxuICogQHJldHVybiBUaGUgaGFuZGxlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFuZGxlKGRlc3RydWN0b3I6ICgpID0+IHZvaWQpOiBIYW5kbGUge1xuXHRsZXQgY2FsbGVkID0gZmFsc2U7XG5cdHJldHVybiB7XG5cdFx0ZGVzdHJveTogZnVuY3Rpb24odGhpczogSGFuZGxlKSB7XG5cdFx0XHRpZiAoIWNhbGxlZCkge1xuXHRcdFx0XHRjYWxsZWQgPSB0cnVlO1xuXHRcdFx0XHRkZXN0cnVjdG9yKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBzaW5nbGUgaGFuZGxlIHRoYXQgY2FuIGJlIHVzZWQgdG8gZGVzdHJveSBtdWx0aXBsZSBoYW5kbGVzIHNpbXVsdGFuZW91c2x5LlxuICpcbiAqIEBwYXJhbSBoYW5kbGVzIEFuIGFycmF5IG9mIGhhbmRsZXMgd2l0aCBgZGVzdHJveWAgbWV0aG9kc1xuICogQHJldHVybiBUaGUgaGFuZGxlIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29tcG9zaXRlSGFuZGxlKC4uLmhhbmRsZXM6IEhhbmRsZVtdKTogSGFuZGxlIHtcblx0cmV0dXJuIGNyZWF0ZUhhbmRsZShmdW5jdGlvbigpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGhhbmRsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGhhbmRsZXNbaV0uZGVzdHJveSgpO1xuXHRcdH1cblx0fSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbGFuZy50cyIsImltcG9ydCBoYXMsIHsgYWRkIH0gZnJvbSAnQGRvam8vaGFzL2hhcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4uL2dsb2JhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGhhcztcbmV4cG9ydCAqIGZyb20gJ0Bkb2pvL2hhcy9oYXMnO1xuXG4vKiBFQ01BU2NyaXB0IDYgYW5kIDcgRmVhdHVyZXMgKi9cblxuLyogQXJyYXkgKi9cbmFkZChcblx0J2VzNi1hcnJheScsXG5cdCgpID0+IHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0Wydmcm9tJywgJ29mJ10uZXZlcnkoKGtleSkgPT4ga2V5IGluIGdsb2JhbC5BcnJheSkgJiZcblx0XHRcdFsnZmluZEluZGV4JywgJ2ZpbmQnLCAnY29weVdpdGhpbiddLmV2ZXJ5KChrZXkpID0+IGtleSBpbiBnbG9iYWwuQXJyYXkucHJvdG90eXBlKVxuXHRcdCk7XG5cdH0sXG5cdHRydWVcbik7XG5cbmFkZChcblx0J2VzNi1hcnJheS1maWxsJyxcblx0KCkgPT4ge1xuXHRcdGlmICgnZmlsbCcgaW4gZ2xvYmFsLkFycmF5LnByb3RvdHlwZSkge1xuXHRcdFx0LyogU29tZSB2ZXJzaW9ucyBvZiBTYWZhcmkgZG8gbm90IHByb3Blcmx5IGltcGxlbWVudCB0aGlzICovXG5cdFx0XHRyZXR1cm4gKDxhbnk+WzFdKS5maWxsKDksIE51bWJlci5QT1NJVElWRV9JTkZJTklUWSlbMF0gPT09IDE7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuYWRkKCdlczctYXJyYXknLCAoKSA9PiAnaW5jbHVkZXMnIGluIGdsb2JhbC5BcnJheS5wcm90b3R5cGUsIHRydWUpO1xuXG4vKiBNYXAgKi9cbmFkZChcblx0J2VzNi1tYXAnLFxuXHQoKSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBnbG9iYWwuTWFwID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvKlxuXHRcdElFMTEgYW5kIG9sZGVyIHZlcnNpb25zIG9mIFNhZmFyaSBhcmUgbWlzc2luZyBjcml0aWNhbCBFUzYgTWFwIGZ1bmN0aW9uYWxpdHlcblx0XHRXZSB3cmFwIHRoaXMgaW4gYSB0cnkvY2F0Y2ggYmVjYXVzZSBzb21ldGltZXMgdGhlIE1hcCBjb25zdHJ1Y3RvciBleGlzdHMsIGJ1dCBkb2VzIG5vdFxuXHRcdHRha2UgYXJndW1lbnRzIChpT1MgOC40KVxuXHRcdCAqL1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgbWFwID0gbmV3IGdsb2JhbC5NYXAoW1swLCAxXV0pO1xuXG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0bWFwLmhhcygwKSAmJlxuXHRcdFx0XHRcdHR5cGVvZiBtYXAua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdFx0XHRcdGhhcygnZXM2LXN5bWJvbCcpICYmXG5cdFx0XHRcdFx0dHlwZW9mIG1hcC52YWx1ZXMgPT09ICdmdW5jdGlvbicgJiZcblx0XHRcdFx0XHR0eXBlb2YgbWFwLmVudHJpZXMgPT09ICdmdW5jdGlvbidcblx0XHRcdFx0KTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0LyogaXN0YW5idWwgaWdub3JlIG5leHQ6IG5vdCB0ZXN0aW5nIG9uIGlPUyBhdCB0aGUgbW9tZW50ICovXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG4vKiBNYXRoICovXG5hZGQoXG5cdCdlczYtbWF0aCcsXG5cdCgpID0+IHtcblx0XHRyZXR1cm4gW1xuXHRcdFx0J2NsejMyJyxcblx0XHRcdCdzaWduJyxcblx0XHRcdCdsb2cxMCcsXG5cdFx0XHQnbG9nMicsXG5cdFx0XHQnbG9nMXAnLFxuXHRcdFx0J2V4cG0xJyxcblx0XHRcdCdjb3NoJyxcblx0XHRcdCdzaW5oJyxcblx0XHRcdCd0YW5oJyxcblx0XHRcdCdhY29zaCcsXG5cdFx0XHQnYXNpbmgnLFxuXHRcdFx0J2F0YW5oJyxcblx0XHRcdCd0cnVuYycsXG5cdFx0XHQnZnJvdW5kJyxcblx0XHRcdCdjYnJ0Jyxcblx0XHRcdCdoeXBvdCdcblx0XHRdLmV2ZXJ5KChuYW1lKSA9PiB0eXBlb2YgZ2xvYmFsLk1hdGhbbmFtZV0gPT09ICdmdW5jdGlvbicpO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG5hZGQoXG5cdCdlczYtbWF0aC1pbXVsJyxcblx0KCkgPT4ge1xuXHRcdGlmICgnaW11bCcgaW4gZ2xvYmFsLk1hdGgpIHtcblx0XHRcdC8qIFNvbWUgdmVyc2lvbnMgb2YgU2FmYXJpIG9uIGlvcyBkbyBub3QgcHJvcGVybHkgaW1wbGVtZW50IHRoaXMgKi9cblx0XHRcdHJldHVybiAoPGFueT5NYXRoKS5pbXVsKDB4ZmZmZmZmZmYsIDUpID09PSAtNTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG4vKiBPYmplY3QgKi9cbmFkZChcblx0J2VzNi1vYmplY3QnLFxuXHQoKSA9PiB7XG5cdFx0cmV0dXJuIChcblx0XHRcdGhhcygnZXM2LXN5bWJvbCcpICYmXG5cdFx0XHRbJ2Fzc2lnbicsICdpcycsICdnZXRPd25Qcm9wZXJ0eVN5bWJvbHMnLCAnc2V0UHJvdG90eXBlT2YnXS5ldmVyeShcblx0XHRcdFx0KG5hbWUpID0+IHR5cGVvZiBnbG9iYWwuT2JqZWN0W25hbWVdID09PSAnZnVuY3Rpb24nXG5cdFx0XHQpXG5cdFx0KTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuYWRkKFxuXHQnZXMyMDE3LW9iamVjdCcsXG5cdCgpID0+IHtcblx0XHRyZXR1cm4gWyd2YWx1ZXMnLCAnZW50cmllcycsICdnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzJ10uZXZlcnkoXG5cdFx0XHQobmFtZSkgPT4gdHlwZW9mIGdsb2JhbC5PYmplY3RbbmFtZV0gPT09ICdmdW5jdGlvbidcblx0XHQpO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG4vKiBPYnNlcnZhYmxlICovXG5hZGQoJ2VzLW9ic2VydmFibGUnLCAoKSA9PiB0eXBlb2YgZ2xvYmFsLk9ic2VydmFibGUgIT09ICd1bmRlZmluZWQnLCB0cnVlKTtcblxuLyogUHJvbWlzZSAqL1xuYWRkKCdlczYtcHJvbWlzZScsICgpID0+IHR5cGVvZiBnbG9iYWwuUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaGFzKCdlczYtc3ltYm9sJyksIHRydWUpO1xuXG4vKiBTZXQgKi9cbmFkZChcblx0J2VzNi1zZXQnLFxuXHQoKSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBnbG9iYWwuU2V0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHQvKiBJRTExIGFuZCBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgYXJlIG1pc3NpbmcgY3JpdGljYWwgRVM2IFNldCBmdW5jdGlvbmFsaXR5ICovXG5cdFx0XHRjb25zdCBzZXQgPSBuZXcgZ2xvYmFsLlNldChbMV0pO1xuXHRcdFx0cmV0dXJuIHNldC5oYXMoMSkgJiYgJ2tleXMnIGluIHNldCAmJiB0eXBlb2Ygc2V0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgaGFzKCdlczYtc3ltYm9sJyk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuLyogU3RyaW5nICovXG5hZGQoXG5cdCdlczYtc3RyaW5nJyxcblx0KCkgPT4ge1xuXHRcdHJldHVybiAoXG5cdFx0XHRbXG5cdFx0XHRcdC8qIHN0YXRpYyBtZXRob2RzICovXG5cdFx0XHRcdCdmcm9tQ29kZVBvaW50J1xuXHRcdFx0XS5ldmVyeSgoa2V5KSA9PiB0eXBlb2YgZ2xvYmFsLlN0cmluZ1trZXldID09PSAnZnVuY3Rpb24nKSAmJlxuXHRcdFx0W1xuXHRcdFx0XHQvKiBpbnN0YW5jZSBtZXRob2RzICovXG5cdFx0XHRcdCdjb2RlUG9pbnRBdCcsXG5cdFx0XHRcdCdub3JtYWxpemUnLFxuXHRcdFx0XHQncmVwZWF0Jyxcblx0XHRcdFx0J3N0YXJ0c1dpdGgnLFxuXHRcdFx0XHQnZW5kc1dpdGgnLFxuXHRcdFx0XHQnaW5jbHVkZXMnXG5cdFx0XHRdLmV2ZXJ5KChrZXkpID0+IHR5cGVvZiBnbG9iYWwuU3RyaW5nLnByb3RvdHlwZVtrZXldID09PSAnZnVuY3Rpb24nKVxuXHRcdCk7XG5cdH0sXG5cdHRydWVcbik7XG5cbmFkZChcblx0J2VzNi1zdHJpbmctcmF3Jyxcblx0KCkgPT4ge1xuXHRcdGZ1bmN0aW9uIGdldENhbGxTaXRlKGNhbGxTaXRlOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uc3Vic3RpdHV0aW9uczogYW55W10pIHtcblx0XHRcdGNvbnN0IHJlc3VsdCA9IFsuLi5jYWxsU2l0ZV07XG5cdFx0XHQocmVzdWx0IGFzIGFueSkucmF3ID0gY2FsbFNpdGUucmF3O1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRpZiAoJ3JhdycgaW4gZ2xvYmFsLlN0cmluZykge1xuXHRcdFx0bGV0IGIgPSAxO1xuXHRcdFx0bGV0IGNhbGxTaXRlID0gZ2V0Q2FsbFNpdGVgYVxcbiR7Yn1gO1xuXG5cdFx0XHQoY2FsbFNpdGUgYXMgYW55KS5yYXcgPSBbJ2FcXFxcbiddO1xuXHRcdFx0Y29uc3Qgc3VwcG9ydHNUcnVuYyA9IGdsb2JhbC5TdHJpbmcucmF3KGNhbGxTaXRlLCA0MikgPT09ICdhOlxcXFxuJztcblxuXHRcdFx0cmV0dXJuIHN1cHBvcnRzVHJ1bmM7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG5hZGQoXG5cdCdlczIwMTctc3RyaW5nJyxcblx0KCkgPT4ge1xuXHRcdHJldHVybiBbJ3BhZFN0YXJ0JywgJ3BhZEVuZCddLmV2ZXJ5KChrZXkpID0+IHR5cGVvZiBnbG9iYWwuU3RyaW5nLnByb3RvdHlwZVtrZXldID09PSAnZnVuY3Rpb24nKTtcblx0fSxcblx0dHJ1ZVxuKTtcblxuLyogU3ltYm9sICovXG5hZGQoJ2VzNi1zeW1ib2wnLCAoKSA9PiB0eXBlb2YgZ2xvYmFsLlN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIFN5bWJvbCgpID09PSAnc3ltYm9sJywgdHJ1ZSk7XG5cbi8qIFdlYWtNYXAgKi9cbmFkZChcblx0J2VzNi13ZWFrbWFwJyxcblx0KCkgPT4ge1xuXHRcdGlmICh0eXBlb2YgZ2xvYmFsLldlYWtNYXAgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQvKiBJRTExIGFuZCBvbGRlciB2ZXJzaW9ucyBvZiBTYWZhcmkgYXJlIG1pc3NpbmcgY3JpdGljYWwgRVM2IE1hcCBmdW5jdGlvbmFsaXR5ICovXG5cdFx0XHRjb25zdCBrZXkxID0ge307XG5cdFx0XHRjb25zdCBrZXkyID0ge307XG5cdFx0XHRjb25zdCBtYXAgPSBuZXcgZ2xvYmFsLldlYWtNYXAoW1trZXkxLCAxXV0pO1xuXHRcdFx0T2JqZWN0LmZyZWV6ZShrZXkxKTtcblx0XHRcdHJldHVybiBtYXAuZ2V0KGtleTEpID09PSAxICYmIG1hcC5zZXQoa2V5MiwgMikgPT09IG1hcCAmJiBoYXMoJ2VzNi1zeW1ib2wnKTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXHR0cnVlXG4pO1xuXG4vKiBNaXNjZWxsYW5lb3VzIGZlYXR1cmVzICovXG5hZGQoJ21pY3JvdGFza3MnLCAoKSA9PiBoYXMoJ2VzNi1wcm9taXNlJykgfHwgaGFzKCdob3N0LW5vZGUnKSB8fCBoYXMoJ2RvbS1tdXRhdGlvbm9ic2VydmVyJyksIHRydWUpO1xuYWRkKFxuXHQncG9zdG1lc3NhZ2UnLFxuXHQoKSA9PiB7XG5cdFx0Ly8gSWYgd2luZG93IGlzIHVuZGVmaW5lZCwgYW5kIHdlIGhhdmUgcG9zdE1lc3NhZ2UsIGl0IHByb2JhYmx5IG1lYW5zIHdlJ3JlIGluIGEgd2ViIHdvcmtlci4gV2ViIHdvcmtlcnMgaGF2ZVxuXHRcdC8vIHBvc3QgbWVzc2FnZSBidXQgaXQgZG9lc24ndCB3b3JrIGhvdyB3ZSBleHBlY3QgaXQgdG8sIHNvIGl0J3MgYmVzdCBqdXN0IHRvIHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cblx0XHRyZXR1cm4gdHlwZW9mIGdsb2JhbC53aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBnbG9iYWwucG9zdE1lc3NhZ2UgPT09ICdmdW5jdGlvbic7XG5cdH0sXG5cdHRydWVcbik7XG5hZGQoJ3JhZicsICgpID0+IHR5cGVvZiBnbG9iYWwucmVxdWVzdEFuaW1hdGlvbkZyYW1lID09PSAnZnVuY3Rpb24nLCB0cnVlKTtcbmFkZCgnc2V0aW1tZWRpYXRlJywgKCkgPT4gdHlwZW9mIGdsb2JhbC5zZXRJbW1lZGlhdGUgIT09ICd1bmRlZmluZWQnLCB0cnVlKTtcblxuLyogRE9NIEZlYXR1cmVzICovXG5cbmFkZChcblx0J2RvbS1tdXRhdGlvbm9ic2VydmVyJyxcblx0KCkgPT4ge1xuXHRcdGlmIChoYXMoJ2hvc3QtYnJvd3NlcicpICYmIEJvb2xlYW4oZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXIpKSB7XG5cdFx0XHQvLyBJRTExIGhhcyBhbiB1bnJlbGlhYmxlIE11dGF0aW9uT2JzZXJ2ZXIgaW1wbGVtZW50YXRpb24gd2hlcmUgc2V0UHJvcGVydHkoKSBkb2VzIG5vdFxuXHRcdFx0Ly8gZ2VuZXJhdGUgYSBtdXRhdGlvbiBldmVudCwgb2JzZXJ2ZXJzIGNhbiBjcmFzaCwgYW5kIHRoZSBxdWV1ZSBkb2VzIG5vdCBkcmFpblxuXHRcdFx0Ly8gcmVsaWFibHkuIFRoZSBmb2xsb3dpbmcgZmVhdHVyZSB0ZXN0IHdhcyBhZGFwdGVkIGZyb21cblx0XHRcdC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3QxMGtvLzRhY2ViOGM3MTY4MWZkYjI3NWUzM2VmZTVlNTc2YjE0XG5cdFx0XHRjb25zdCBleGFtcGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0XHQvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZSAqL1xuXHRcdFx0Y29uc3QgSG9zdE11dGF0aW9uT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblx0XHRcdGNvbnN0IG9ic2VydmVyID0gbmV3IEhvc3RNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKCkge30pO1xuXHRcdFx0b2JzZXJ2ZXIub2JzZXJ2ZShleGFtcGxlLCB7IGF0dHJpYnV0ZXM6IHRydWUgfSk7XG5cblx0XHRcdGV4YW1wbGUuc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnYmxvY2snKTtcblxuXHRcdFx0cmV0dXJuIEJvb2xlYW4ob2JzZXJ2ZXIudGFrZVJlY29yZHMoKS5sZW5ndGgpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cdHRydWVcbik7XG5cbmFkZChcblx0J2RvbS13ZWJhbmltYXRpb24nLFxuXHQoKSA9PiBoYXMoJ2hvc3QtYnJvd3NlcicpICYmIGdsb2JhbC5BbmltYXRpb24gIT09IHVuZGVmaW5lZCAmJiBnbG9iYWwuS2V5ZnJhbWVFZmZlY3QgIT09IHVuZGVmaW5lZCxcblx0dHJ1ZVxuKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBoYXMudHMiLCJpbXBvcnQgeyBpc0FycmF5TGlrZSwgSXRlcmFibGUsIEl0ZXJhYmxlSXRlcmF0b3IsIFNoaW1JdGVyYXRvciB9IGZyb20gJy4vaXRlcmF0b3InO1xuaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgeyBpcyBhcyBvYmplY3RJcyB9IGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBoYXMgZnJvbSAnLi9zdXBwb3J0L2hhcyc7XG5pbXBvcnQgJy4vU3ltYm9sJztcblxuZXhwb3J0IGludGVyZmFjZSBNYXA8SywgVj4ge1xuXHQvKipcblx0ICogRGVsZXRlcyBhbGwga2V5cyBhbmQgdGhlaXIgYXNzb2NpYXRlZCB2YWx1ZXMuXG5cdCAqL1xuXHRjbGVhcigpOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBEZWxldGVzIGEgZ2l2ZW4ga2V5IGFuZCBpdHMgYXNzb2NpYXRlZCB2YWx1ZS5cblx0ICpcblx0ICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGRlbGV0ZVxuXHQgKiBAcmV0dXJuIHRydWUgaWYgdGhlIGtleSBleGlzdHMsIGZhbHNlIGlmIGl0IGRvZXMgbm90XG5cdCAqL1xuXHRkZWxldGUoa2V5OiBLKTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBpdGVyYXRvciB0aGF0IHlpZWxkcyBlYWNoIGtleS92YWx1ZSBwYWlyIGFzIGFuIGFycmF5LlxuXHQgKlxuXHQgKiBAcmV0dXJuIEFuIGl0ZXJhdG9yIGZvciBlYWNoIGtleS92YWx1ZSBwYWlyIGluIHRoZSBpbnN0YW5jZS5cblx0ICovXG5cdGVudHJpZXMoKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+O1xuXG5cdC8qKlxuXHQgKiBFeGVjdXRlcyBhIGdpdmVuIGZ1bmN0aW9uIGZvciBlYWNoIG1hcCBlbnRyeS4gVGhlIGZ1bmN0aW9uXG5cdCAqIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6IHRoZSBlbGVtZW50IHZhbHVlLCB0aGVcblx0ICogZWxlbWVudCBrZXksIGFuZCB0aGUgYXNzb2NpYXRlZCBNYXAgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIEBwYXJhbSBjYWxsYmFja2ZuIFRoZSBmdW5jdGlvbiB0byBleGVjdXRlIGZvciBlYWNoIG1hcCBlbnRyeSxcblx0ICogQHBhcmFtIHRoaXNBcmcgVGhlIHZhbHVlIHRvIHVzZSBmb3IgYHRoaXNgIGZvciBlYWNoIGV4ZWN1dGlvbiBvZiB0aGUgY2FsYmFja1xuXHQgKi9cblx0Zm9yRWFjaChjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogSywgbWFwOiBNYXA8SywgVj4pID0+IHZvaWQsIHRoaXNBcmc/OiBhbnkpOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBrZXkuXG5cdCAqXG5cdCAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBsb29rIHVwXG5cdCAqIEByZXR1cm4gVGhlIHZhbHVlIGlmIG9uZSBleGlzdHMgb3IgdW5kZWZpbmVkXG5cdCAqL1xuXHRnZXQoa2V5OiBLKTogViB8IHVuZGVmaW5lZDtcblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBpdGVyYXRvciB0aGF0IHlpZWxkcyBlYWNoIGtleSBpbiB0aGUgbWFwLlxuXHQgKlxuXHQgKiBAcmV0dXJuIEFuIGl0ZXJhdG9yIGNvbnRhaW5pbmcgdGhlIGluc3RhbmNlJ3Mga2V5cy5cblx0ICovXG5cdGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxLPjtcblxuXHQvKipcblx0ICogQ2hlY2tzIGZvciB0aGUgcHJlc2VuY2Ugb2YgYSBnaXZlbiBrZXkuXG5cdCAqXG5cdCAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBjaGVjayBmb3Jcblx0ICogQHJldHVybiB0cnVlIGlmIHRoZSBrZXkgZXhpc3RzLCBmYWxzZSBpZiBpdCBkb2VzIG5vdFxuXHQgKi9cblx0aGFzKGtleTogSyk6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBhIGdpdmVuIGtleS5cblx0ICpcblx0ICogQHBhcmFtIGtleSBUaGUga2V5IHRvIGRlZmluZSBhIHZhbHVlIHRvXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduXG5cdCAqIEByZXR1cm4gVGhlIE1hcCBpbnN0YW5jZVxuXHQgKi9cblx0c2V0KGtleTogSywgdmFsdWU6IFYpOiB0aGlzO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBudW1iZXIgb2Yga2V5IC8gdmFsdWUgcGFpcnMgaW4gdGhlIE1hcC5cblx0ICovXG5cdHJlYWRvbmx5IHNpemU6IG51bWJlcjtcblxuXHQvKipcblx0ICogUmV0dXJucyBhbiBpdGVyYXRvciB0aGF0IHlpZWxkcyBlYWNoIHZhbHVlIGluIHRoZSBtYXAuXG5cdCAqXG5cdCAqIEByZXR1cm4gQW4gaXRlcmF0b3IgY29udGFpbmluZyB0aGUgaW5zdGFuY2UncyB2YWx1ZXMuXG5cdCAqL1xuXHR2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxWPjtcblxuXHQvKiogUmV0dXJucyBhbiBpdGVyYWJsZSBvZiBlbnRyaWVzIGluIHRoZSBtYXAuICovXG5cdFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhYmxlSXRlcmF0b3I8W0ssIFZdPjtcblxuXHRyZWFkb25seSBbU3ltYm9sLnRvU3RyaW5nVGFnXTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hcENvbnN0cnVjdG9yIHtcblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgTWFwXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblx0bmV3ICgpOiBNYXA8YW55LCBhbnk+O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgbmV3IE1hcFxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIGl0ZXJhdG9yXG5cdCAqIEFycmF5IG9yIGl0ZXJhdG9yIGNvbnRhaW5pbmcgdHdvLWl0ZW0gdHVwbGVzIHVzZWQgdG8gaW5pdGlhbGx5IHBvcHVsYXRlIHRoZSBtYXAuXG5cdCAqIFRoZSBmaXJzdCBpdGVtIGluIGVhY2ggdHVwbGUgY29ycmVzcG9uZHMgdG8gdGhlIGtleSBvZiB0aGUgbWFwIGVudHJ5LlxuXHQgKiBUaGUgc2Vjb25kIGl0ZW0gY29ycmVzcG9uZHMgdG8gdGhlIHZhbHVlIG9mIHRoZSBtYXAgZW50cnkuXG5cdCAqL1xuXHRuZXcgPEssIFY+KGl0ZXJhdG9yPzogW0ssIFZdW10pOiBNYXA8SywgVj47XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBuZXcgTWFwXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKlxuXHQgKiBAcGFyYW0gaXRlcmF0b3Jcblx0ICogQXJyYXkgb3IgaXRlcmF0b3IgY29udGFpbmluZyB0d28taXRlbSB0dXBsZXMgdXNlZCB0byBpbml0aWFsbHkgcG9wdWxhdGUgdGhlIG1hcC5cblx0ICogVGhlIGZpcnN0IGl0ZW0gaW4gZWFjaCB0dXBsZSBjb3JyZXNwb25kcyB0byB0aGUga2V5IG9mIHRoZSBtYXAgZW50cnkuXG5cdCAqIFRoZSBzZWNvbmQgaXRlbSBjb3JyZXNwb25kcyB0byB0aGUgdmFsdWUgb2YgdGhlIG1hcCBlbnRyeS5cblx0ICovXG5cdG5ldyA8SywgVj4oaXRlcmF0b3I6IEl0ZXJhYmxlPFtLLCBWXT4pOiBNYXA8SywgVj47XG5cblx0cmVhZG9ubHkgcHJvdG90eXBlOiBNYXA8YW55LCBhbnk+O1xuXG5cdHJlYWRvbmx5IFtTeW1ib2wuc3BlY2llc106IE1hcENvbnN0cnVjdG9yO1xufVxuXG5leHBvcnQgbGV0IE1hcDogTWFwQ29uc3RydWN0b3IgPSBnbG9iYWwuTWFwO1xuXG5pZiAoIWhhcygnZXM2LW1hcCcpKSB7XG5cdE1hcCA9IGNsYXNzIE1hcDxLLCBWPiB7XG5cdFx0cHJvdGVjdGVkIHJlYWRvbmx5IF9rZXlzOiBLW10gPSBbXTtcblx0XHRwcm90ZWN0ZWQgcmVhZG9ubHkgX3ZhbHVlczogVltdID0gW107XG5cblx0XHQvKipcblx0XHQgKiBBbiBhbHRlcm5hdGl2ZSB0byBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiB1c2luZyBPYmplY3QuaXNcblx0XHQgKiB0byBjaGVjayBmb3IgZXF1YWxpdHkuIFNlZSBodHRwOi8vbXpsLmxhLzF6dUtPMlZcblx0XHQgKi9cblx0XHRwcm90ZWN0ZWQgX2luZGV4T2ZLZXkoa2V5czogS1tdLCBrZXk6IEspOiBudW1iZXIge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKG9iamVjdElzKGtleXNbaV0sIGtleSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBbU3ltYm9sLnNwZWNpZXNdID0gTWFwO1xuXG5cdFx0Y29uc3RydWN0b3IoaXRlcmFibGU/OiBBcnJheUxpa2U8W0ssIFZdPiB8IEl0ZXJhYmxlPFtLLCBWXT4pIHtcblx0XHRcdGlmIChpdGVyYWJsZSkge1xuXHRcdFx0XHRpZiAoaXNBcnJheUxpa2UoaXRlcmFibGUpKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBpdGVyYWJsZVtpXTtcblx0XHRcdFx0XHRcdHRoaXMuc2V0KHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgdmFsdWUgb2YgaXRlcmFibGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuc2V0KHZhbHVlWzBdLCB2YWx1ZVsxXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Z2V0IHNpemUoKTogbnVtYmVyIHtcblx0XHRcdHJldHVybiB0aGlzLl9rZXlzLmxlbmd0aDtcblx0XHR9XG5cblx0XHRjbGVhcigpOiB2b2lkIHtcblx0XHRcdHRoaXMuX2tleXMubGVuZ3RoID0gdGhpcy5fdmFsdWVzLmxlbmd0aCA9IDA7XG5cdFx0fVxuXG5cdFx0ZGVsZXRlKGtleTogSyk6IGJvb2xlYW4ge1xuXHRcdFx0Y29uc3QgaW5kZXggPSB0aGlzLl9pbmRleE9mS2V5KHRoaXMuX2tleXMsIGtleSk7XG5cdFx0XHRpZiAoaW5kZXggPCAwKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2tleXMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdHRoaXMuX3ZhbHVlcy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0ZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFtLLCBWXT4ge1xuXHRcdFx0Y29uc3QgdmFsdWVzID0gdGhpcy5fa2V5cy5tYXAoKGtleTogSywgaTogbnVtYmVyKTogW0ssIFZdID0+IHtcblx0XHRcdFx0cmV0dXJuIFtrZXksIHRoaXMuX3ZhbHVlc1tpXV07XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIG5ldyBTaGltSXRlcmF0b3IodmFsdWVzKTtcblx0XHR9XG5cblx0XHRmb3JFYWNoKGNhbGxiYWNrOiAodmFsdWU6IFYsIGtleTogSywgbWFwSW5zdGFuY2U6IE1hcDxLLCBWPikgPT4gYW55LCBjb250ZXh0Pzoge30pIHtcblx0XHRcdGNvbnN0IGtleXMgPSB0aGlzLl9rZXlzO1xuXHRcdFx0Y29uc3QgdmFsdWVzID0gdGhpcy5fdmFsdWVzO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y2FsbGJhY2suY2FsbChjb250ZXh0LCB2YWx1ZXNbaV0sIGtleXNbaV0sIHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGdldChrZXk6IEspOiBWIHwgdW5kZWZpbmVkIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gdGhpcy5faW5kZXhPZktleSh0aGlzLl9rZXlzLCBrZXkpO1xuXHRcdFx0cmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IHRoaXMuX3ZhbHVlc1tpbmRleF07XG5cdFx0fVxuXG5cdFx0aGFzKGtleTogSyk6IGJvb2xlYW4ge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2luZGV4T2ZLZXkodGhpcy5fa2V5cywga2V5KSA+IC0xO1xuXHRcdH1cblxuXHRcdGtleXMoKTogSXRlcmFibGVJdGVyYXRvcjxLPiB7XG5cdFx0XHRyZXR1cm4gbmV3IFNoaW1JdGVyYXRvcih0aGlzLl9rZXlzKTtcblx0XHR9XG5cblx0XHRzZXQoa2V5OiBLLCB2YWx1ZTogVik6IE1hcDxLLCBWPiB7XG5cdFx0XHRsZXQgaW5kZXggPSB0aGlzLl9pbmRleE9mS2V5KHRoaXMuX2tleXMsIGtleSk7XG5cdFx0XHRpbmRleCA9IGluZGV4IDwgMCA/IHRoaXMuX2tleXMubGVuZ3RoIDogaW5kZXg7XG5cdFx0XHR0aGlzLl9rZXlzW2luZGV4XSA9IGtleTtcblx0XHRcdHRoaXMuX3ZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHZhbHVlcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFY+IHtcblx0XHRcdHJldHVybiBuZXcgU2hpbUl0ZXJhdG9yKHRoaXMuX3ZhbHVlcyk7XG5cdFx0fVxuXG5cdFx0W1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbSywgVl0+IHtcblx0XHRcdHJldHVybiB0aGlzLmVudHJpZXMoKTtcblx0XHR9XG5cblx0XHRbU3ltYm9sLnRvU3RyaW5nVGFnXTogJ01hcCcgPSAnTWFwJztcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWFwO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIE1hcC50cyIsImltcG9ydCB7IFRoZW5hYmxlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHsgcXVldWVNaWNyb1Rhc2sgfSBmcm9tICcuL3N1cHBvcnQvcXVldWUnO1xuaW1wb3J0IHsgSXRlcmFibGUgfSBmcm9tICcuL2l0ZXJhdG9yJztcbmltcG9ydCAnLi9TeW1ib2wnO1xuaW1wb3J0IGhhcyBmcm9tICcuL3N1cHBvcnQvaGFzJztcblxuLyoqXG4gKiBFeGVjdXRvciBpcyB0aGUgaW50ZXJmYWNlIGZvciBmdW5jdGlvbnMgdXNlZCB0byBpbml0aWFsaXplIGEgUHJvbWlzZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFeGVjdXRvcjxUPiB7XG5cdC8qKlxuXHQgKiBUaGUgZXhlY3V0b3IgZm9yIHRoZSBwcm9taXNlXG5cdCAqXG5cdCAqIEBwYXJhbSByZXNvbHZlIFRoZSByZXNvbHZlciBjYWxsYmFjayBvZiB0aGUgcHJvbWlzZVxuXHQgKiBAcGFyYW0gcmVqZWN0IFRoZSByZWplY3RvciBjYWxsYmFjayBvZiB0aGUgcHJvbWlzZVxuXHQgKi9cblx0KHJlc29sdmU6ICh2YWx1ZT86IFQgfCBQcm9taXNlTGlrZTxUPikgPT4gdm9pZCwgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkKTogdm9pZDtcbn1cblxuZXhwb3J0IGxldCBTaGltUHJvbWlzZTogdHlwZW9mIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcblxuZXhwb3J0IGNvbnN0IGlzVGhlbmFibGUgPSBmdW5jdGlvbiBpc1RoZW5hYmxlPFQ+KHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBQcm9taXNlTGlrZTxUPiB7XG5cdHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmlmICghaGFzKCdlczYtcHJvbWlzZScpKSB7XG5cdGNvbnN0IGVudW0gU3RhdGUge1xuXHRcdEZ1bGZpbGxlZCxcblx0XHRQZW5kaW5nLFxuXHRcdFJlamVjdGVkXG5cdH1cblxuXHRnbG9iYWwuUHJvbWlzZSA9IFNoaW1Qcm9taXNlID0gY2xhc3MgUHJvbWlzZTxUPiBpbXBsZW1lbnRzIFRoZW5hYmxlPFQ+IHtcblx0XHRzdGF0aWMgYWxsKGl0ZXJhYmxlOiBJdGVyYWJsZTxhbnkgfCBQcm9taXNlTGlrZTxhbnk+PiB8IChhbnkgfCBQcm9taXNlTGlrZTxhbnk+KVtdKTogUHJvbWlzZTxhbnk+IHtcblx0XHRcdHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdFx0Y29uc3QgdmFsdWVzOiBhbnlbXSA9IFtdO1xuXHRcdFx0XHRsZXQgY29tcGxldGUgPSAwO1xuXHRcdFx0XHRsZXQgdG90YWwgPSAwO1xuXHRcdFx0XHRsZXQgcG9wdWxhdGluZyA9IHRydWU7XG5cblx0XHRcdFx0ZnVuY3Rpb24gZnVsZmlsbChpbmRleDogbnVtYmVyLCB2YWx1ZTogYW55KTogdm9pZCB7XG5cdFx0XHRcdFx0dmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuXHRcdFx0XHRcdCsrY29tcGxldGU7XG5cdFx0XHRcdFx0ZmluaXNoKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmdW5jdGlvbiBmaW5pc2goKTogdm9pZCB7XG5cdFx0XHRcdFx0aWYgKHBvcHVsYXRpbmcgfHwgY29tcGxldGUgPCB0b3RhbCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXNvbHZlKHZhbHVlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmdW5jdGlvbiBwcm9jZXNzSXRlbShpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpOiB2b2lkIHtcblx0XHRcdFx0XHQrK3RvdGFsO1xuXHRcdFx0XHRcdGlmIChpc1RoZW5hYmxlKGl0ZW0pKSB7XG5cdFx0XHRcdFx0XHQvLyBJZiBhbiBpdGVtIFByb21pc2UgcmVqZWN0cywgdGhpcyBQcm9taXNlIGlzIGltbWVkaWF0ZWx5IHJlamVjdGVkIHdpdGggdGhlIGl0ZW1cblx0XHRcdFx0XHRcdC8vIFByb21pc2UncyByZWplY3Rpb24gZXJyb3IuXG5cdFx0XHRcdFx0XHRpdGVtLnRoZW4oZnVsZmlsbC5iaW5kKG51bGwsIGluZGV4KSwgcmVqZWN0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKGl0ZW0pLnRoZW4oZnVsZmlsbC5iaW5kKG51bGwsIGluZGV4KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGkgPSAwO1xuXHRcdFx0XHRmb3IgKGNvbnN0IHZhbHVlIG9mIGl0ZXJhYmxlKSB7XG5cdFx0XHRcdFx0cHJvY2Vzc0l0ZW0oaSwgdmFsdWUpO1xuXHRcdFx0XHRcdGkrKztcblx0XHRcdFx0fVxuXHRcdFx0XHRwb3B1bGF0aW5nID0gZmFsc2U7XG5cblx0XHRcdFx0ZmluaXNoKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzdGF0aWMgcmFjZTxUPihpdGVyYWJsZTogSXRlcmFibGU8VCB8IFByb21pc2VMaWtlPFQ+PiB8IChUIHwgUHJvbWlzZUxpa2U8VD4pW10pOiBQcm9taXNlPFRbXT4ge1xuXHRcdFx0cmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKHJlc29sdmU6ICh2YWx1ZT86IGFueSkgPT4gdm9pZCwgcmVqZWN0KSB7XG5cdFx0XHRcdGZvciAoY29uc3QgaXRlbSBvZiBpdGVyYWJsZSkge1xuXHRcdFx0XHRcdGlmIChpdGVtIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuXHRcdFx0XHRcdFx0Ly8gSWYgYSBQcm9taXNlIGl0ZW0gcmVqZWN0cywgdGhpcyBQcm9taXNlIGlzIGltbWVkaWF0ZWx5IHJlamVjdGVkIHdpdGggdGhlIGl0ZW1cblx0XHRcdFx0XHRcdC8vIFByb21pc2UncyByZWplY3Rpb24gZXJyb3IuXG5cdFx0XHRcdFx0XHRpdGVtLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0UHJvbWlzZS5yZXNvbHZlKGl0ZW0pLnRoZW4ocmVzb2x2ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzdGF0aWMgcmVqZWN0KHJlYXNvbj86IGFueSk6IFByb21pc2U8bmV2ZXI+IHtcblx0XHRcdHJldHVybiBuZXcgdGhpcyhmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcblx0XHRcdFx0cmVqZWN0KHJlYXNvbik7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRzdGF0aWMgcmVzb2x2ZSgpOiBQcm9taXNlPHZvaWQ+O1xuXHRcdHN0YXRpYyByZXNvbHZlPFQ+KHZhbHVlOiBUIHwgUHJvbWlzZUxpa2U8VD4pOiBQcm9taXNlPFQ+O1xuXHRcdHN0YXRpYyByZXNvbHZlPFQ+KHZhbHVlPzogYW55KTogUHJvbWlzZTxUPiB7XG5cdFx0XHRyZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24ocmVzb2x2ZSkge1xuXHRcdFx0XHRyZXNvbHZlKDxUPnZhbHVlKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHN0YXRpYyBbU3ltYm9sLnNwZWNpZXNdOiBQcm9taXNlQ29uc3RydWN0b3IgPSBTaGltUHJvbWlzZSBhcyBQcm9taXNlQ29uc3RydWN0b3I7XG5cblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGEgbmV3IFByb21pc2UuXG5cdFx0ICpcblx0XHQgKiBAY29uc3RydWN0b3Jcblx0XHQgKlxuXHRcdCAqIEBwYXJhbSBleGVjdXRvclxuXHRcdCAqIFRoZSBleGVjdXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgaW1tZWRpYXRlbHkgd2hlbiB0aGUgUHJvbWlzZSBpcyBpbnN0YW50aWF0ZWQuIEl0IGlzIHJlc3BvbnNpYmxlIGZvclxuXHRcdCAqIHN0YXJ0aW5nIHRoZSBhc3luY2hyb25vdXMgb3BlcmF0aW9uIHdoZW4gaXQgaXMgaW52b2tlZC5cblx0XHQgKlxuXHRcdCAqIFRoZSBleGVjdXRvciBtdXN0IGNhbGwgZWl0aGVyIHRoZSBwYXNzZWQgYHJlc29sdmVgIGZ1bmN0aW9uIHdoZW4gdGhlIGFzeW5jaHJvbm91cyBvcGVyYXRpb24gaGFzIGNvbXBsZXRlZFxuXHRcdCAqIHN1Y2Nlc3NmdWxseSwgb3IgdGhlIGByZWplY3RgIGZ1bmN0aW9uIHdoZW4gdGhlIG9wZXJhdGlvbiBmYWlscy5cblx0XHQgKi9cblx0XHRjb25zdHJ1Y3RvcihleGVjdXRvcjogRXhlY3V0b3I8VD4pIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogSWYgdHJ1ZSwgdGhlIHJlc29sdXRpb24gb2YgdGhpcyBwcm9taXNlIGlzIGNoYWluZWQgKFwibG9ja2VkIGluXCIpIHRvIGFub3RoZXIgcHJvbWlzZS5cblx0XHRcdCAqL1xuXHRcdFx0bGV0IGlzQ2hhaW5lZCA9IGZhbHNlO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFdoZXRoZXIgb3Igbm90IHRoaXMgcHJvbWlzZSBpcyBpbiBhIHJlc29sdmVkIHN0YXRlLlxuXHRcdFx0ICovXG5cdFx0XHRjb25zdCBpc1Jlc29sdmVkID0gKCk6IGJvb2xlYW4gPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5zdGF0ZSAhPT0gU3RhdGUuUGVuZGluZyB8fCBpc0NoYWluZWQ7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIENhbGxiYWNrcyB0aGF0IHNob3VsZCBiZSBpbnZva2VkIG9uY2UgdGhlIGFzeW5jaHJvbm91cyBvcGVyYXRpb24gaGFzIGNvbXBsZXRlZC5cblx0XHRcdCAqL1xuXHRcdFx0bGV0IGNhbGxiYWNrczogbnVsbCB8IChBcnJheTwoKSA9PiB2b2lkPikgPSBbXTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBJbml0aWFsbHkgcHVzaGVzIGNhbGxiYWNrcyBvbnRvIGEgcXVldWUgZm9yIGV4ZWN1dGlvbiBvbmNlIHRoaXMgcHJvbWlzZSBzZXR0bGVzLiBBZnRlciB0aGUgcHJvbWlzZSBzZXR0bGVzLFxuXHRcdFx0ICogZW5xdWV1ZXMgY2FsbGJhY2tzIGZvciBleGVjdXRpb24gb24gdGhlIG5leHQgZXZlbnQgbG9vcCB0dXJuLlxuXHRcdFx0ICovXG5cdFx0XHRsZXQgd2hlbkZpbmlzaGVkID0gZnVuY3Rpb24oY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcblx0XHRcdFx0aWYgKGNhbGxiYWNrcykge1xuXHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXR0bGVzIHRoaXMgcHJvbWlzZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gbmV3U3RhdGUgVGhlIHJlc29sdmVkIHN0YXRlIGZvciB0aGlzIHByb21pc2UuXG5cdFx0XHQgKiBAcGFyYW0ge1R8YW55fSB2YWx1ZSBUaGUgcmVzb2x2ZWQgdmFsdWUgZm9yIHRoaXMgcHJvbWlzZS5cblx0XHRcdCAqL1xuXHRcdFx0Y29uc3Qgc2V0dGxlID0gKG5ld1N0YXRlOiBTdGF0ZSwgdmFsdWU6IGFueSk6IHZvaWQgPT4ge1xuXHRcdFx0XHQvLyBBIHByb21pc2UgY2FuIG9ubHkgYmUgc2V0dGxlZCBvbmNlLlxuXHRcdFx0XHRpZiAodGhpcy5zdGF0ZSAhPT0gU3RhdGUuUGVuZGluZykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuc3RhdGUgPSBuZXdTdGF0ZTtcblx0XHRcdFx0dGhpcy5yZXNvbHZlZFZhbHVlID0gdmFsdWU7XG5cdFx0XHRcdHdoZW5GaW5pc2hlZCA9IHF1ZXVlTWljcm9UYXNrO1xuXG5cdFx0XHRcdC8vIE9ubHkgZW5xdWV1ZSBhIGNhbGxiYWNrIHJ1bm5lciBpZiB0aGVyZSBhcmUgY2FsbGJhY2tzIHNvIHRoYXQgaW5pdGlhbGx5IGZ1bGZpbGxlZCBQcm9taXNlcyBkb24ndCBoYXZlIHRvXG5cdFx0XHRcdC8vIHdhaXQgYW4gZXh0cmEgdHVybi5cblx0XHRcdFx0aWYgKGNhbGxiYWNrcyAmJiBjYWxsYmFja3MubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdHF1ZXVlTWljcm9UYXNrKGZ1bmN0aW9uKCk6IHZvaWQge1xuXHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcykge1xuXHRcdFx0XHRcdFx0XHRsZXQgY291bnQgPSBjYWxsYmFja3MubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyArK2kpIHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFja3NbaV0uY2FsbChudWxsKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MgPSBudWxsO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJlc29sdmVzIHRoaXMgcHJvbWlzZS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW0gbmV3U3RhdGUgVGhlIHJlc29sdmVkIHN0YXRlIGZvciB0aGlzIHByb21pc2UuXG5cdFx0XHQgKiBAcGFyYW0ge1R8YW55fSB2YWx1ZSBUaGUgcmVzb2x2ZWQgdmFsdWUgZm9yIHRoaXMgcHJvbWlzZS5cblx0XHRcdCAqL1xuXHRcdFx0Y29uc3QgcmVzb2x2ZSA9IChuZXdTdGF0ZTogU3RhdGUsIHZhbHVlOiBhbnkpOiB2b2lkID0+IHtcblx0XHRcdFx0aWYgKGlzUmVzb2x2ZWQoKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc1RoZW5hYmxlKHZhbHVlKSkge1xuXHRcdFx0XHRcdHZhbHVlLnRoZW4oc2V0dGxlLmJpbmQobnVsbCwgU3RhdGUuRnVsZmlsbGVkKSwgc2V0dGxlLmJpbmQobnVsbCwgU3RhdGUuUmVqZWN0ZWQpKTtcblx0XHRcdFx0XHRpc0NoYWluZWQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNldHRsZShuZXdTdGF0ZSwgdmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLnRoZW4gPSA8VFJlc3VsdDEgPSBULCBUUmVzdWx0MiA9IG5ldmVyPihcblx0XHRcdFx0b25GdWxmaWxsZWQ/OiAoKHZhbHVlOiBUKSA9PiBUUmVzdWx0MSB8IFByb21pc2VMaWtlPFRSZXN1bHQxPikgfCB1bmRlZmluZWQgfCBudWxsLFxuXHRcdFx0XHRvblJlamVjdGVkPzogKChyZWFzb246IGFueSkgPT4gVFJlc3VsdDIgfCBQcm9taXNlTGlrZTxUUmVzdWx0Mj4pIHwgdW5kZWZpbmVkIHwgbnVsbFxuXHRcdFx0KTogUHJvbWlzZTxUUmVzdWx0MSB8IFRSZXN1bHQyPiA9PiB7XG5cdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0Ly8gd2hlbkZpbmlzaGVkIGluaXRpYWxseSBxdWV1ZXMgdXAgY2FsbGJhY2tzIGZvciBleGVjdXRpb24gYWZ0ZXIgdGhlIHByb21pc2UgaGFzIHNldHRsZWQuIE9uY2UgdGhlXG5cdFx0XHRcdFx0Ly8gcHJvbWlzZSBoYXMgc2V0dGxlZCwgd2hlbkZpbmlzaGVkIHdpbGwgc2NoZWR1bGUgY2FsbGJhY2tzIGZvciBleGVjdXRpb24gb24gdGhlIG5leHQgdHVybiB0aHJvdWdoIHRoZVxuXHRcdFx0XHRcdC8vIGV2ZW50IGxvb3AuXG5cdFx0XHRcdFx0d2hlbkZpbmlzaGVkKCgpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGNhbGxiYWNrOiAoKHZhbHVlPzogYW55KSA9PiBhbnkpIHwgdW5kZWZpbmVkIHwgbnVsbCA9XG5cdFx0XHRcdFx0XHRcdHRoaXMuc3RhdGUgPT09IFN0YXRlLlJlamVjdGVkID8gb25SZWplY3RlZCA6IG9uRnVsZmlsbGVkO1xuXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShjYWxsYmFjayh0aGlzLnJlc29sdmVkVmFsdWUpKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuc3RhdGUgPT09IFN0YXRlLlJlamVjdGVkKSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCh0aGlzLnJlc29sdmVkVmFsdWUpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSh0aGlzLnJlc29sdmVkVmFsdWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdGV4ZWN1dG9yKHJlc29sdmUuYmluZChudWxsLCBTdGF0ZS5GdWxmaWxsZWQpLCByZXNvbHZlLmJpbmQobnVsbCwgU3RhdGUuUmVqZWN0ZWQpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdHNldHRsZShTdGF0ZS5SZWplY3RlZCwgZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNhdGNoPFRSZXN1bHQgPSBuZXZlcj4oXG5cdFx0XHRvblJlamVjdGVkPzogKChyZWFzb246IGFueSkgPT4gVFJlc3VsdCB8IFByb21pc2VMaWtlPFRSZXN1bHQ+KSB8IHVuZGVmaW5lZCB8IG51bGxcblx0XHQpOiBQcm9taXNlPFQgfCBUUmVzdWx0PiB7XG5cdFx0XHRyZXR1cm4gdGhpcy50aGVuKHVuZGVmaW5lZCwgb25SZWplY3RlZCk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogVGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhpcyBwcm9taXNlLlxuXHRcdCAqL1xuXHRcdHByaXZhdGUgc3RhdGUgPSBTdGF0ZS5QZW5kaW5nO1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIHJlc29sdmVkIHZhbHVlIGZvciB0aGlzIHByb21pc2UuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSB7VHxhbnl9XG5cdFx0ICovXG5cdFx0cHJpdmF0ZSByZXNvbHZlZFZhbHVlOiBhbnk7XG5cblx0XHR0aGVuOiA8VFJlc3VsdDEgPSBULCBUUmVzdWx0MiA9IG5ldmVyPihcblx0XHRcdG9uZnVsZmlsbGVkPzogKCh2YWx1ZTogVCkgPT4gVFJlc3VsdDEgfCBQcm9taXNlTGlrZTxUUmVzdWx0MT4pIHwgdW5kZWZpbmVkIHwgbnVsbCxcblx0XHRcdG9ucmVqZWN0ZWQ/OiAoKHJlYXNvbjogYW55KSA9PiBUUmVzdWx0MiB8IFByb21pc2VMaWtlPFRSZXN1bHQyPikgfCB1bmRlZmluZWQgfCBudWxsXG5cdFx0KSA9PiBQcm9taXNlPFRSZXN1bHQxIHwgVFJlc3VsdDI+O1xuXG5cdFx0W1N5bWJvbC50b1N0cmluZ1RhZ106ICdQcm9taXNlJyA9ICdQcm9taXNlJztcblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpbVByb21pc2U7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gUHJvbWlzZS50cyIsImltcG9ydCBoYXMgZnJvbSAnLi9zdXBwb3J0L2hhcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJy4vZ2xvYmFsJztcbmltcG9ydCB7IGdldFZhbHVlRGVzY3JpcHRvciB9IGZyb20gJy4vc3VwcG9ydC91dGlsJztcblxuZGVjbGFyZSBnbG9iYWwge1xuXHRpbnRlcmZhY2UgU3ltYm9sQ29uc3RydWN0b3Ige1xuXHRcdG9ic2VydmFibGU6IHN5bWJvbDtcblx0fVxufVxuXG5leHBvcnQgbGV0IFN5bWJvbDogU3ltYm9sQ29uc3RydWN0b3IgPSBnbG9iYWwuU3ltYm9sO1xuXG5pZiAoIWhhcygnZXM2LXN5bWJvbCcpKSB7XG5cdC8qKlxuXHQgKiBUaHJvd3MgaWYgdGhlIHZhbHVlIGlzIG5vdCBhIHN5bWJvbCwgdXNlZCBpbnRlcm5hbGx5IHdpdGhpbiB0aGUgU2hpbVxuXHQgKiBAcGFyYW0gIHthbnl9ICAgIHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVja1xuXHQgKiBAcmV0dXJuIHtzeW1ib2x9ICAgICAgIFJldHVybnMgdGhlIHN5bWJvbCBvciB0aHJvd3Ncblx0ICovXG5cdGNvbnN0IHZhbGlkYXRlU3ltYm9sID0gZnVuY3Rpb24gdmFsaWRhdGVTeW1ib2wodmFsdWU6IGFueSk6IHN5bWJvbCB7XG5cdFx0aWYgKCFpc1N5bWJvbCh2YWx1ZSkpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IodmFsdWUgKyAnIGlzIG5vdCBhIHN5bWJvbCcpO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWU7XG5cdH07XG5cblx0Y29uc3QgZGVmaW5lUHJvcGVydGllcyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzO1xuXHRjb25zdCBkZWZpbmVQcm9wZXJ0eTogKFxuXHRcdG86IGFueSxcblx0XHRwOiBzdHJpbmcgfCBzeW1ib2wsXG5cdFx0YXR0cmlidXRlczogUHJvcGVydHlEZXNjcmlwdG9yICYgVGhpc1R5cGU8YW55PlxuXHQpID0+IGFueSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBhcyBhbnk7XG5cdGNvbnN0IGNyZWF0ZSA9IE9iamVjdC5jcmVhdGU7XG5cblx0Y29uc3Qgb2JqUHJvdG90eXBlID0gT2JqZWN0LnByb3RvdHlwZTtcblxuXHRjb25zdCBnbG9iYWxTeW1ib2xzOiB7IFtrZXk6IHN0cmluZ106IHN5bWJvbCB9ID0ge307XG5cblx0Y29uc3QgZ2V0U3ltYm9sTmFtZSA9IChmdW5jdGlvbigpIHtcblx0XHRjb25zdCBjcmVhdGVkID0gY3JlYXRlKG51bGwpO1xuXHRcdHJldHVybiBmdW5jdGlvbihkZXNjOiBzdHJpbmcgfCBudW1iZXIpOiBzdHJpbmcge1xuXHRcdFx0bGV0IHBvc3RmaXggPSAwO1xuXHRcdFx0bGV0IG5hbWU6IHN0cmluZztcblx0XHRcdHdoaWxlIChjcmVhdGVkW1N0cmluZyhkZXNjKSArIChwb3N0Zml4IHx8ICcnKV0pIHtcblx0XHRcdFx0Kytwb3N0Zml4O1xuXHRcdFx0fVxuXHRcdFx0ZGVzYyArPSBTdHJpbmcocG9zdGZpeCB8fCAnJyk7XG5cdFx0XHRjcmVhdGVkW2Rlc2NdID0gdHJ1ZTtcblx0XHRcdG5hbWUgPSAnQEAnICsgZGVzYztcblxuXHRcdFx0Ly8gRklYTUU6IFRlbXBvcmFyeSBndWFyZCB1bnRpbCB0aGUgZHVwbGljYXRlIGV4ZWN1dGlvbiB3aGVuIHRlc3RpbmcgY2FuIGJlXG5cdFx0XHQvLyBwaW5uZWQgZG93bi5cblx0XHRcdGlmICghT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmpQcm90b3R5cGUsIG5hbWUpKSB7XG5cdFx0XHRcdGRlZmluZVByb3BlcnR5KG9ialByb3RvdHlwZSwgbmFtZSwge1xuXHRcdFx0XHRcdHNldDogZnVuY3Rpb24odGhpczogU3ltYm9sLCB2YWx1ZTogYW55KSB7XG5cdFx0XHRcdFx0XHRkZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCBnZXRWYWx1ZURlc2NyaXB0b3IodmFsdWUpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbmFtZTtcblx0XHR9O1xuXHR9KSgpO1xuXG5cdGNvbnN0IEludGVybmFsU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKHRoaXM6IGFueSwgZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBudW1iZXIpOiBzeW1ib2wge1xuXHRcdGlmICh0aGlzIGluc3RhbmNlb2YgSW50ZXJuYWxTeW1ib2wpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGVFcnJvcjogU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG5cdFx0fVxuXHRcdHJldHVybiBTeW1ib2woZGVzY3JpcHRpb24pO1xuXHR9O1xuXG5cdFN5bWJvbCA9IGdsb2JhbC5TeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2wodGhpczogU3ltYm9sLCBkZXNjcmlwdGlvbj86IHN0cmluZyB8IG51bWJlcik6IHN5bWJvbCB7XG5cdFx0aWYgKHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ1R5cGVFcnJvcjogU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yJyk7XG5cdFx0fVxuXHRcdGNvbnN0IHN5bSA9IE9iamVjdC5jcmVhdGUoSW50ZXJuYWxTeW1ib2wucHJvdG90eXBlKTtcblx0XHRkZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uID09PSB1bmRlZmluZWQgPyAnJyA6IFN0cmluZyhkZXNjcmlwdGlvbik7XG5cdFx0cmV0dXJuIGRlZmluZVByb3BlcnRpZXMoc3ltLCB7XG5cdFx0XHRfX2Rlc2NyaXB0aW9uX186IGdldFZhbHVlRGVzY3JpcHRvcihkZXNjcmlwdGlvbiksXG5cdFx0XHRfX25hbWVfXzogZ2V0VmFsdWVEZXNjcmlwdG9yKGdldFN5bWJvbE5hbWUoZGVzY3JpcHRpb24pKVxuXHRcdH0pO1xuXHR9IGFzIFN5bWJvbENvbnN0cnVjdG9yO1xuXG5cdC8qIERlY29yYXRlIHRoZSBTeW1ib2wgZnVuY3Rpb24gd2l0aCB0aGUgYXBwcm9wcmlhdGUgcHJvcGVydGllcyAqL1xuXHRkZWZpbmVQcm9wZXJ0eShcblx0XHRTeW1ib2wsXG5cdFx0J2ZvcicsXG5cdFx0Z2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uKGtleTogc3RyaW5nKTogc3ltYm9sIHtcblx0XHRcdGlmIChnbG9iYWxTeW1ib2xzW2tleV0pIHtcblx0XHRcdFx0cmV0dXJuIGdsb2JhbFN5bWJvbHNba2V5XTtcblx0XHRcdH1cblx0XHRcdHJldHVybiAoZ2xvYmFsU3ltYm9sc1trZXldID0gU3ltYm9sKFN0cmluZyhrZXkpKSk7XG5cdFx0fSlcblx0KTtcblx0ZGVmaW5lUHJvcGVydGllcyhTeW1ib2wsIHtcblx0XHRrZXlGb3I6IGdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbihzeW06IHN5bWJvbCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0XHRsZXQga2V5OiBzdHJpbmc7XG5cdFx0XHR2YWxpZGF0ZVN5bWJvbChzeW0pO1xuXHRcdFx0Zm9yIChrZXkgaW4gZ2xvYmFsU3ltYm9scykge1xuXHRcdFx0XHRpZiAoZ2xvYmFsU3ltYm9sc1trZXldID09PSBzeW0pIHtcblx0XHRcdFx0XHRyZXR1cm4ga2V5O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSksXG5cdFx0aGFzSW5zdGFuY2U6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCdoYXNJbnN0YW5jZScpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdGlzQ29uY2F0U3ByZWFkYWJsZTogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ2lzQ29uY2F0U3ByZWFkYWJsZScpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdGl0ZXJhdG9yOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcignaXRlcmF0b3InKSwgZmFsc2UsIGZhbHNlKSxcblx0XHRtYXRjaDogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ21hdGNoJyksIGZhbHNlLCBmYWxzZSksXG5cdFx0b2JzZXJ2YWJsZTogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ29ic2VydmFibGUnKSwgZmFsc2UsIGZhbHNlKSxcblx0XHRyZXBsYWNlOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcigncmVwbGFjZScpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdHNlYXJjaDogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ3NlYXJjaCcpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdHNwZWNpZXM6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCdzcGVjaWVzJyksIGZhbHNlLCBmYWxzZSksXG5cdFx0c3BsaXQ6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCdzcGxpdCcpLCBmYWxzZSwgZmFsc2UpLFxuXHRcdHRvUHJpbWl0aXZlOiBnZXRWYWx1ZURlc2NyaXB0b3IoU3ltYm9sLmZvcigndG9QcmltaXRpdmUnKSwgZmFsc2UsIGZhbHNlKSxcblx0XHR0b1N0cmluZ1RhZzogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3IoJ3RvU3RyaW5nVGFnJyksIGZhbHNlLCBmYWxzZSksXG5cdFx0dW5zY29wYWJsZXM6IGdldFZhbHVlRGVzY3JpcHRvcihTeW1ib2wuZm9yKCd1bnNjb3BhYmxlcycpLCBmYWxzZSwgZmFsc2UpXG5cdH0pO1xuXG5cdC8qIERlY29yYXRlIHRoZSBJbnRlcm5hbFN5bWJvbCBvYmplY3QgKi9cblx0ZGVmaW5lUHJvcGVydGllcyhJbnRlcm5hbFN5bWJvbC5wcm90b3R5cGUsIHtcblx0XHRjb25zdHJ1Y3RvcjogZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbCksXG5cdFx0dG9TdHJpbmc6IGdldFZhbHVlRGVzY3JpcHRvcihcblx0XHRcdGZ1bmN0aW9uKHRoaXM6IHsgX19uYW1lX186IHN0cmluZyB9KSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLl9fbmFtZV9fO1xuXHRcdFx0fSxcblx0XHRcdGZhbHNlLFxuXHRcdFx0ZmFsc2Vcblx0XHQpXG5cdH0pO1xuXG5cdC8qIERlY29yYXRlIHRoZSBTeW1ib2wucHJvdG90eXBlICovXG5cdGRlZmluZVByb3BlcnRpZXMoU3ltYm9sLnByb3RvdHlwZSwge1xuXHRcdHRvU3RyaW5nOiBnZXRWYWx1ZURlc2NyaXB0b3IoZnVuY3Rpb24odGhpczogU3ltYm9sKSB7XG5cdFx0XHRyZXR1cm4gJ1N5bWJvbCAoJyArICg8YW55PnZhbGlkYXRlU3ltYm9sKHRoaXMpKS5fX2Rlc2NyaXB0aW9uX18gKyAnKSc7XG5cdFx0fSksXG5cdFx0dmFsdWVPZjogZ2V0VmFsdWVEZXNjcmlwdG9yKGZ1bmN0aW9uKHRoaXM6IFN5bWJvbCkge1xuXHRcdFx0cmV0dXJuIHZhbGlkYXRlU3ltYm9sKHRoaXMpO1xuXHRcdH0pXG5cdH0pO1xuXG5cdGRlZmluZVByb3BlcnR5KFxuXHRcdFN5bWJvbC5wcm90b3R5cGUsXG5cdFx0U3ltYm9sLnRvUHJpbWl0aXZlLFxuXHRcdGdldFZhbHVlRGVzY3JpcHRvcihmdW5jdGlvbih0aGlzOiBTeW1ib2wpIHtcblx0XHRcdHJldHVybiB2YWxpZGF0ZVN5bWJvbCh0aGlzKTtcblx0XHR9KVxuXHQpO1xuXHRkZWZpbmVQcm9wZXJ0eShTeW1ib2wucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIGdldFZhbHVlRGVzY3JpcHRvcignU3ltYm9sJywgZmFsc2UsIGZhbHNlLCB0cnVlKSk7XG5cblx0ZGVmaW5lUHJvcGVydHkoXG5cdFx0SW50ZXJuYWxTeW1ib2wucHJvdG90eXBlLFxuXHRcdFN5bWJvbC50b1ByaW1pdGl2ZSxcblx0XHRnZXRWYWx1ZURlc2NyaXB0b3IoKDxhbnk+U3ltYm9sKS5wcm90b3R5cGVbU3ltYm9sLnRvUHJpbWl0aXZlXSwgZmFsc2UsIGZhbHNlLCB0cnVlKVxuXHQpO1xuXHRkZWZpbmVQcm9wZXJ0eShcblx0XHRJbnRlcm5hbFN5bWJvbC5wcm90b3R5cGUsXG5cdFx0U3ltYm9sLnRvU3RyaW5nVGFnLFxuXHRcdGdldFZhbHVlRGVzY3JpcHRvcigoPGFueT5TeW1ib2wpLnByb3RvdHlwZVtTeW1ib2wudG9TdHJpbmdUYWddLCBmYWxzZSwgZmFsc2UsIHRydWUpXG5cdCk7XG59XG5cbi8qKlxuICogQSBjdXN0b20gZ3VhcmQgZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIGlmIGFuIG9iamVjdCBpcyBhIHN5bWJvbCBvciBub3RcbiAqIEBwYXJhbSAge2FueX0gICAgICAgdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrIHRvIHNlZSBpZiBpdCBpcyBhIHN5bWJvbCBvciBub3RcbiAqIEByZXR1cm4ge2lzIHN5bWJvbH0gICAgICAgUmV0dXJucyB0cnVlIGlmIGEgc3ltYm9sIG9yIG5vdCAoYW5kIG5hcnJvd3MgdGhlIHR5cGUgZ3VhcmQpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZTogYW55KTogdmFsdWUgaXMgc3ltYm9sIHtcblx0cmV0dXJuICh2YWx1ZSAmJiAodHlwZW9mIHZhbHVlID09PSAnc3ltYm9sJyB8fCB2YWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykpIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEZpbGwgYW55IG1pc3Npbmcgd2VsbCBrbm93biBzeW1ib2xzIGlmIHRoZSBuYXRpdmUgU3ltYm9sIGlzIG1pc3NpbmcgdGhlbVxuICovXG5bXG5cdCdoYXNJbnN0YW5jZScsXG5cdCdpc0NvbmNhdFNwcmVhZGFibGUnLFxuXHQnaXRlcmF0b3InLFxuXHQnc3BlY2llcycsXG5cdCdyZXBsYWNlJyxcblx0J3NlYXJjaCcsXG5cdCdzcGxpdCcsXG5cdCdtYXRjaCcsXG5cdCd0b1ByaW1pdGl2ZScsXG5cdCd0b1N0cmluZ1RhZycsXG5cdCd1bnNjb3BhYmxlcycsXG5cdCdvYnNlcnZhYmxlJ1xuXS5mb3JFYWNoKCh3ZWxsS25vd24pID0+IHtcblx0aWYgKCEoU3ltYm9sIGFzIGFueSlbd2VsbEtub3duXSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShTeW1ib2wsIHdlbGxLbm93biwgZ2V0VmFsdWVEZXNjcmlwdG9yKFN5bWJvbC5mb3Iod2VsbEtub3duKSwgZmFsc2UsIGZhbHNlKSk7XG5cdH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBTeW1ib2w7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gU3ltYm9sLnRzIiwiaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgeyBpc0FycmF5TGlrZSwgSXRlcmFibGUgfSBmcm9tICcuL2l0ZXJhdG9yJztcbmltcG9ydCBoYXMgZnJvbSAnLi9zdXBwb3J0L2hhcyc7XG5pbXBvcnQgJy4vU3ltYm9sJztcblxuZXhwb3J0IGludGVyZmFjZSBXZWFrTWFwPEsgZXh0ZW5kcyBvYmplY3QsIFY+IHtcblx0LyoqXG5cdCAqIFJlbW92ZSBhIGBrZXlgIGZyb20gdGhlIG1hcFxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gcmVtb3ZlXG5cdCAqIEByZXR1cm4gYHRydWVgIGlmIHRoZSB2YWx1ZSB3YXMgcmVtb3ZlZCwgb3RoZXJ3aXNlIGBmYWxzZWBcblx0ICovXG5cdGRlbGV0ZShrZXk6IEspOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSB0aGUgdmFsdWUsIGJhc2VkIG9uIHRoZSBzdXBwbGllZCBga2V5YFxuXHQgKlxuXHQgKiBAcGFyYW0ga2V5IFRoZSBrZXkgdG8gcmV0cmlldmUgdGhlIGB2YWx1ZWAgZm9yXG5cdCAqIEByZXR1cm4gdGhlIGB2YWx1ZWAgYmFzZWQgb24gdGhlIGBrZXlgIGlmIGZvdW5kLCBvdGhlcndpc2UgYGZhbHNlYFxuXHQgKi9cblx0Z2V0KGtleTogSyk6IFYgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIERldGVybWluZXMgaWYgYSBga2V5YCBpcyBwcmVzZW50IGluIHRoZSBtYXBcblx0ICpcblx0ICogQHBhcmFtIGtleSBUaGUgYGtleWAgdG8gY2hlY2tcblx0ICogQHJldHVybiBgdHJ1ZWAgaWYgdGhlIGtleSBpcyBwYXJ0IG9mIHRoZSBtYXAsIG90aGVyd2lzZSBgZmFsc2VgLlxuXHQgKi9cblx0aGFzKGtleTogSyk6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFNldCBhIGB2YWx1ZWAgZm9yIGEgcGFydGljdWxhciBga2V5YC5cblx0ICpcblx0ICogQHBhcmFtIGtleSBUaGUgYGtleWAgdG8gc2V0IHRoZSBgdmFsdWVgIGZvclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIGB2YWx1ZWAgdG8gc2V0XG5cdCAqIEByZXR1cm4gdGhlIGluc3RhbmNlc1xuXHQgKi9cblx0c2V0KGtleTogSywgdmFsdWU6IFYpOiB0aGlzO1xuXG5cdHJlYWRvbmx5IFtTeW1ib2wudG9TdHJpbmdUYWddOiAnV2Vha01hcCc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2Vha01hcENvbnN0cnVjdG9yIHtcblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhIGBXZWFrTWFwYFxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cdG5ldyAoKTogV2Vha01hcDxvYmplY3QsIGFueT47XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhIGBXZWFrTWFwYFxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIGl0ZXJhYmxlIEFuIGl0ZXJhYmxlIHRoYXQgY29udGFpbnMgeWllbGRzIHVwIGtleS92YWx1ZSBwYWlyIGVudHJpZXNcblx0ICovXG5cdG5ldyA8SyBleHRlbmRzIG9iamVjdCwgVj4oaXRlcmFibGU/OiBbSywgVl1bXSk6IFdlYWtNYXA8SywgVj47XG5cblx0LyoqXG5cdCAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBhIGBXZWFrTWFwYFxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICpcblx0ICogQHBhcmFtIGl0ZXJhYmxlIEFuIGl0ZXJhYmxlIHRoYXQgY29udGFpbnMgeWllbGRzIHVwIGtleS92YWx1ZSBwYWlyIGVudHJpZXNcblx0ICovXG5cdG5ldyA8SyBleHRlbmRzIG9iamVjdCwgVj4oaXRlcmFibGU6IEl0ZXJhYmxlPFtLLCBWXT4pOiBXZWFrTWFwPEssIFY+O1xuXG5cdHJlYWRvbmx5IHByb3RvdHlwZTogV2Vha01hcDxvYmplY3QsIGFueT47XG59XG5cbmV4cG9ydCBsZXQgV2Vha01hcDogV2Vha01hcENvbnN0cnVjdG9yID0gZ2xvYmFsLldlYWtNYXA7XG5cbmludGVyZmFjZSBFbnRyeTxLLCBWPiB7XG5cdGtleTogSztcblx0dmFsdWU6IFY7XG59XG5cbmlmICghaGFzKCdlczYtd2Vha21hcCcpKSB7XG5cdGNvbnN0IERFTEVURUQ6IGFueSA9IHt9O1xuXG5cdGNvbnN0IGdldFVJRCA9IGZ1bmN0aW9uIGdldFVJRCgpOiBudW1iZXIge1xuXHRcdHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwMDApO1xuXHR9O1xuXG5cdGNvbnN0IGdlbmVyYXRlTmFtZSA9IChmdW5jdGlvbigpIHtcblx0XHRsZXQgc3RhcnRJZCA9IE1hdGguZmxvb3IoRGF0ZS5ub3coKSAlIDEwMDAwMDAwMCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gZ2VuZXJhdGVOYW1lKCk6IHN0cmluZyB7XG5cdFx0XHRyZXR1cm4gJ19fd20nICsgZ2V0VUlEKCkgKyAoc3RhcnRJZCsrICsgJ19fJyk7XG5cdFx0fTtcblx0fSkoKTtcblxuXHRXZWFrTWFwID0gY2xhc3MgV2Vha01hcDxLLCBWPiB7XG5cdFx0cHJpdmF0ZSByZWFkb25seSBfbmFtZTogc3RyaW5nO1xuXHRcdHByaXZhdGUgcmVhZG9ubHkgX2Zyb3plbkVudHJpZXM6IEVudHJ5PEssIFY+W107XG5cblx0XHRjb25zdHJ1Y3RvcihpdGVyYWJsZT86IEFycmF5TGlrZTxbSywgVl0+IHwgSXRlcmFibGU8W0ssIFZdPikge1xuXHRcdFx0dGhpcy5fbmFtZSA9IGdlbmVyYXRlTmFtZSgpO1xuXG5cdFx0XHR0aGlzLl9mcm96ZW5FbnRyaWVzID0gW107XG5cblx0XHRcdGlmIChpdGVyYWJsZSkge1xuXHRcdFx0XHRpZiAoaXNBcnJheUxpa2UoaXRlcmFibGUpKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYWJsZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0Y29uc3QgaXRlbSA9IGl0ZXJhYmxlW2ldO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXQoaXRlbVswXSwgaXRlbVsxXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGl0ZXJhYmxlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldChrZXksIHZhbHVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRwcml2YXRlIF9nZXRGcm96ZW5FbnRyeUluZGV4KGtleTogYW55KTogbnVtYmVyIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fZnJvemVuRW50cmllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAodGhpcy5fZnJvemVuRW50cmllc1tpXS5rZXkgPT09IGtleSkge1xuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cblx0XHRkZWxldGUoa2V5OiBhbnkpOiBib29sZWFuIHtcblx0XHRcdGlmIChrZXkgPT09IHVuZGVmaW5lZCB8fCBrZXkgPT09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBlbnRyeTogRW50cnk8SywgVj4gPSBrZXlbdGhpcy5fbmFtZV07XG5cdFx0XHRpZiAoZW50cnkgJiYgZW50cnkua2V5ID09PSBrZXkgJiYgZW50cnkudmFsdWUgIT09IERFTEVURUQpIHtcblx0XHRcdFx0ZW50cnkudmFsdWUgPSBERUxFVEVEO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZnJvemVuSW5kZXggPSB0aGlzLl9nZXRGcm96ZW5FbnRyeUluZGV4KGtleSk7XG5cdFx0XHRpZiAoZnJvemVuSW5kZXggPj0gMCkge1xuXHRcdFx0XHR0aGlzLl9mcm96ZW5FbnRyaWVzLnNwbGljZShmcm96ZW5JbmRleCwgMSk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Z2V0KGtleTogYW55KTogViB8IHVuZGVmaW5lZCB7XG5cdFx0XHRpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGVudHJ5OiBFbnRyeTxLLCBWPiA9IGtleVt0aGlzLl9uYW1lXTtcblx0XHRcdGlmIChlbnRyeSAmJiBlbnRyeS5rZXkgPT09IGtleSAmJiBlbnRyeS52YWx1ZSAhPT0gREVMRVRFRCkge1xuXHRcdFx0XHRyZXR1cm4gZW50cnkudmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGZyb3plbkluZGV4ID0gdGhpcy5fZ2V0RnJvemVuRW50cnlJbmRleChrZXkpO1xuXHRcdFx0aWYgKGZyb3plbkluZGV4ID49IDApIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2Zyb3plbkVudHJpZXNbZnJvemVuSW5kZXhdLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGhhcyhrZXk6IGFueSk6IGJvb2xlYW4ge1xuXHRcdFx0aWYgKGtleSA9PT0gdW5kZWZpbmVkIHx8IGtleSA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGVudHJ5OiBFbnRyeTxLLCBWPiA9IGtleVt0aGlzLl9uYW1lXTtcblx0XHRcdGlmIChCb29sZWFuKGVudHJ5ICYmIGVudHJ5LmtleSA9PT0ga2V5ICYmIGVudHJ5LnZhbHVlICE9PSBERUxFVEVEKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZnJvemVuSW5kZXggPSB0aGlzLl9nZXRGcm96ZW5FbnRyeUluZGV4KGtleSk7XG5cdFx0XHRpZiAoZnJvemVuSW5kZXggPj0gMCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHNldChrZXk6IGFueSwgdmFsdWU/OiBhbnkpOiB0aGlzIHtcblx0XHRcdGlmICgha2V5IHx8ICh0eXBlb2Yga2V5ICE9PSAnb2JqZWN0JyAmJiB0eXBlb2Yga2V5ICE9PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHZhbHVlIHVzZWQgYXMgd2VhayBtYXAga2V5Jyk7XG5cdFx0XHR9XG5cdFx0XHRsZXQgZW50cnk6IEVudHJ5PEssIFY+ID0ga2V5W3RoaXMuX25hbWVdO1xuXHRcdFx0aWYgKCFlbnRyeSB8fCBlbnRyeS5rZXkgIT09IGtleSkge1xuXHRcdFx0XHRlbnRyeSA9IE9iamVjdC5jcmVhdGUobnVsbCwge1xuXHRcdFx0XHRcdGtleTogeyB2YWx1ZToga2V5IH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYgKE9iamVjdC5pc0Zyb3plbihrZXkpKSB7XG5cdFx0XHRcdFx0dGhpcy5fZnJvemVuRW50cmllcy5wdXNoKGVudHJ5KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoa2V5LCB0aGlzLl9uYW1lLCB7XG5cdFx0XHRcdFx0XHR2YWx1ZTogZW50cnlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZW50cnkudmFsdWUgPSB2YWx1ZTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdFtTeW1ib2wudG9TdHJpbmdUYWddOiAnV2Vha01hcCcgPSAnV2Vha01hcCc7XG5cdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFdlYWtNYXA7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gV2Vha01hcC50cyIsImltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UsIGlzSXRlcmFibGUsIEl0ZXJhYmxlIH0gZnJvbSAnLi9pdGVyYXRvcic7XG5pbXBvcnQgeyBNQVhfU0FGRV9JTlRFR0VSIH0gZnJvbSAnLi9udW1iZXInO1xuaW1wb3J0IGhhcyBmcm9tICcuL3N1cHBvcnQvaGFzJztcbmltcG9ydCB7IHdyYXBOYXRpdmUgfSBmcm9tICcuL3N1cHBvcnQvdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFwQ2FsbGJhY2s8VCwgVT4ge1xuXHQvKipcblx0ICogQSBjYWxsYmFjayBmdW5jdGlvbiB3aGVuIG1hcHBpbmdcblx0ICpcblx0ICogQHBhcmFtIGVsZW1lbnQgVGhlIGVsZW1lbnQgdGhhdCBpcyBjdXJyZW50bHkgYmVpbmcgbWFwcGVkXG5cdCAqIEBwYXJhbSBpbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgZWxlbWVudFxuXHQgKi9cblx0KGVsZW1lbnQ6IFQsIGluZGV4OiBudW1iZXIpOiBVO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZpbmRDYWxsYmFjazxUPiB7XG5cdC8qKlxuXHQgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdXNpbmcgZmluZFxuXHQgKlxuXHQgKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudCB0aGF0IGlzIGN1cnJlbnR5IGJlaW5nIGFuYWx5c2VkXG5cdCAqIEBwYXJhbSBpbmRleCBUaGUgY3VycmVudCBpbmRleCBvZiB0aGUgZWxlbWVudCB0aGF0IGlzIGJlaW5nIGFuYWx5c2VkXG5cdCAqIEBwYXJhbSBhcnJheSBUaGUgc291cmNlIGFycmF5XG5cdCAqL1xuXHQoZWxlbWVudDogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IEFycmF5TGlrZTxUPik6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBXcml0YWJsZUFycmF5TGlrZTxUPiB7XG5cdHJlYWRvbmx5IGxlbmd0aDogbnVtYmVyO1xuXHRbbjogbnVtYmVyXTogVDtcbn1cblxuLyogRVM2IEFycmF5IHN0YXRpYyBtZXRob2RzICovXG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJvbSB7XG5cdC8qKlxuXHQgKiBUaGUgQXJyYXkuZnJvbSgpIG1ldGhvZCBjcmVhdGVzIGEgbmV3IEFycmF5IGluc3RhbmNlIGZyb20gYW4gYXJyYXktbGlrZSBvciBpdGVyYWJsZSBvYmplY3QuXG5cdCAqXG5cdCAqIEBwYXJhbSBzb3VyY2UgQW4gYXJyYXktbGlrZSBvciBpdGVyYWJsZSBvYmplY3QgdG8gY29udmVydCB0byBhbiBhcnJheVxuXHQgKiBAcGFyYW0gbWFwRnVuY3Rpb24gQSBtYXAgZnVuY3Rpb24gdG8gY2FsbCBvbiBlYWNoIGVsZW1lbnQgaW4gdGhlIGFycmF5XG5cdCAqIEBwYXJhbSB0aGlzQXJnIFRoZSBleGVjdXRpb24gY29udGV4dCBmb3IgdGhlIG1hcCBmdW5jdGlvblxuXHQgKiBAcmV0dXJuIFRoZSBuZXcgQXJyYXlcblx0ICovXG5cdDxULCBVPihzb3VyY2U6IEFycmF5TGlrZTxUPiB8IEl0ZXJhYmxlPFQ+LCBtYXBGdW5jdGlvbjogTWFwQ2FsbGJhY2s8VCwgVT4sIHRoaXNBcmc/OiBhbnkpOiBBcnJheTxVPjtcblxuXHQvKipcblx0ICogVGhlIEFycmF5LmZyb20oKSBtZXRob2QgY3JlYXRlcyBhIG5ldyBBcnJheSBpbnN0YW5jZSBmcm9tIGFuIGFycmF5LWxpa2Ugb3IgaXRlcmFibGUgb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gc291cmNlIEFuIGFycmF5LWxpa2Ugb3IgaXRlcmFibGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYW4gYXJyYXlcblx0ICogQHJldHVybiBUaGUgbmV3IEFycmF5XG5cdCAqL1xuXHQ8VD4oc291cmNlOiBBcnJheUxpa2U8VD4gfCBJdGVyYWJsZTxUPik6IEFycmF5PFQ+O1xufVxuXG5leHBvcnQgbGV0IGZyb206IEZyb207XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBhcnJheSBmcm9tIHRoZSBmdW5jdGlvbiBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSBhcmd1bWVudHMgQW55IG51bWJlciBvZiBhcmd1bWVudHMgZm9yIHRoZSBhcnJheVxuICogQHJldHVybiBBbiBhcnJheSBmcm9tIHRoZSBnaXZlbiBhcmd1bWVudHNcbiAqL1xuZXhwb3J0IGxldCBvZjogPFQ+KC4uLml0ZW1zOiBUW10pID0+IEFycmF5PFQ+O1xuXG4vKiBFUzYgQXJyYXkgaW5zdGFuY2UgbWV0aG9kcyAqL1xuXG4vKipcbiAqIENvcGllcyBkYXRhIGludGVybmFsbHkgd2l0aGluIGFuIGFycmF5IG9yIGFycmF5LWxpa2Ugb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBhcnJheS1saWtlIG9iamVjdFxuICogQHBhcmFtIG9mZnNldCBUaGUgaW5kZXggdG8gc3RhcnQgY29weWluZyB2YWx1ZXMgdG87IGlmIG5lZ2F0aXZlLCBpdCBjb3VudHMgYmFja3dhcmRzIGZyb20gbGVuZ3RoXG4gKiBAcGFyYW0gc3RhcnQgVGhlIGZpcnN0IChpbmNsdXNpdmUpIGluZGV4IHRvIGNvcHk7IGlmIG5lZ2F0aXZlLCBpdCBjb3VudHMgYmFja3dhcmRzIGZyb20gbGVuZ3RoXG4gKiBAcGFyYW0gZW5kIFRoZSBsYXN0IChleGNsdXNpdmUpIGluZGV4IHRvIGNvcHk7IGlmIG5lZ2F0aXZlLCBpdCBjb3VudHMgYmFja3dhcmRzIGZyb20gbGVuZ3RoXG4gKiBAcmV0dXJuIFRoZSB0YXJnZXRcbiAqL1xuZXhwb3J0IGxldCBjb3B5V2l0aGluOiA8VD4odGFyZ2V0OiBBcnJheUxpa2U8VD4sIG9mZnNldDogbnVtYmVyLCBzdGFydDogbnVtYmVyLCBlbmQ/OiBudW1iZXIpID0+IEFycmF5TGlrZTxUPjtcblxuLyoqXG4gKiBGaWxscyBlbGVtZW50cyBvZiBhbiBhcnJheS1saWtlIG9iamVjdCB3aXRoIHRoZSBzcGVjaWZpZWQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHRvIGZpbGxcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gZmlsbCBlYWNoIGVsZW1lbnQgb2YgdGhlIHRhcmdldCB3aXRoXG4gKiBAcGFyYW0gc3RhcnQgVGhlIGZpcnN0IGluZGV4IHRvIGZpbGxcbiAqIEBwYXJhbSBlbmQgVGhlIChleGNsdXNpdmUpIGluZGV4IGF0IHdoaWNoIHRvIHN0b3AgZmlsbGluZ1xuICogQHJldHVybiBUaGUgZmlsbGVkIHRhcmdldFxuICovXG5leHBvcnQgbGV0IGZpbGw6IDxUPih0YXJnZXQ6IEFycmF5TGlrZTxUPiwgdmFsdWU6IFQsIHN0YXJ0PzogbnVtYmVyLCBlbmQ/OiBudW1iZXIpID0+IEFycmF5TGlrZTxUPjtcblxuLyoqXG4gKiBGaW5kcyBhbmQgcmV0dXJucyB0aGUgZmlyc3QgaW5zdGFuY2UgbWF0Y2hpbmcgdGhlIGNhbGxiYWNrIG9yIHVuZGVmaW5lZCBpZiBvbmUgaXMgbm90IGZvdW5kLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgQW4gYXJyYXktbGlrZSBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFjayBBIGZ1bmN0aW9uIHJldHVybmluZyBpZiB0aGUgY3VycmVudCB2YWx1ZSBtYXRjaGVzIGEgY3JpdGVyaWFcbiAqIEBwYXJhbSB0aGlzQXJnIFRoZSBleGVjdXRpb24gY29udGV4dCBmb3IgdGhlIGZpbmQgZnVuY3Rpb25cbiAqIEByZXR1cm4gVGhlIGZpcnN0IGVsZW1lbnQgbWF0Y2hpbmcgdGhlIGNhbGxiYWNrLCBvciB1bmRlZmluZWQgaWYgb25lIGRvZXMgbm90IGV4aXN0XG4gKi9cbmV4cG9ydCBsZXQgZmluZDogPFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCBjYWxsYmFjazogRmluZENhbGxiYWNrPFQ+LCB0aGlzQXJnPzoge30pID0+IFQgfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgc2VhcmNoIGFuZCByZXR1cm5zIHRoZSBmaXJzdCBpbmRleCB3aG9zZSB2YWx1ZSBzYXRpc2ZpZXMgdGhlIHBhc3NlZCBjYWxsYmFjayxcbiAqIG9yIC0xIGlmIG5vIHZhbHVlcyBzYXRpc2Z5IGl0LlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgQW4gYXJyYXktbGlrZSBvYmplY3RcbiAqIEBwYXJhbSBjYWxsYmFjayBBIGZ1bmN0aW9uIHJldHVybmluZyB0cnVlIGlmIHRoZSBjdXJyZW50IHZhbHVlIHNhdGlzZmllcyBpdHMgY3JpdGVyaWFcbiAqIEBwYXJhbSB0aGlzQXJnIFRoZSBleGVjdXRpb24gY29udGV4dCBmb3IgdGhlIGZpbmQgZnVuY3Rpb25cbiAqIEByZXR1cm4gVGhlIGZpcnN0IGluZGV4IHdob3NlIHZhbHVlIHNhdGlzZmllcyB0aGUgcGFzc2VkIGNhbGxiYWNrLCBvciAtMSBpZiBubyB2YWx1ZXMgc2F0aXNmeSBpdFxuICovXG5leHBvcnQgbGV0IGZpbmRJbmRleDogPFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCBjYWxsYmFjazogRmluZENhbGxiYWNrPFQ+LCB0aGlzQXJnPzoge30pID0+IG51bWJlcjtcblxuLyogRVM3IEFycmF5IGluc3RhbmNlIG1ldGhvZHMgKi9cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYW4gYXJyYXkgaW5jbHVkZXMgYSBnaXZlbiB2YWx1ZVxuICpcbiAqIEBwYXJhbSB0YXJnZXQgdGhlIHRhcmdldCBhcnJheS1saWtlIG9iamVjdFxuICogQHBhcmFtIHNlYXJjaEVsZW1lbnQgdGhlIGl0ZW0gdG8gc2VhcmNoIGZvclxuICogQHBhcmFtIGZyb21JbmRleCB0aGUgc3RhcnRpbmcgaW5kZXggdG8gc2VhcmNoIGZyb21cbiAqIEByZXR1cm4gYHRydWVgIGlmIHRoZSBhcnJheSBpbmNsdWRlcyB0aGUgZWxlbWVudCwgb3RoZXJ3aXNlIGBmYWxzZWBcbiAqL1xuZXhwb3J0IGxldCBpbmNsdWRlczogPFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCBzZWFyY2hFbGVtZW50OiBULCBmcm9tSW5kZXg/OiBudW1iZXIpID0+IGJvb2xlYW47XG5cbmlmIChoYXMoJ2VzNi1hcnJheScpICYmIGhhcygnZXM2LWFycmF5LWZpbGwnKSkge1xuXHRmcm9tID0gZ2xvYmFsLkFycmF5LmZyb207XG5cdG9mID0gZ2xvYmFsLkFycmF5Lm9mO1xuXHRjb3B5V2l0aGluID0gd3JhcE5hdGl2ZShnbG9iYWwuQXJyYXkucHJvdG90eXBlLmNvcHlXaXRoaW4pO1xuXHRmaWxsID0gd3JhcE5hdGl2ZShnbG9iYWwuQXJyYXkucHJvdG90eXBlLmZpbGwpO1xuXHRmaW5kID0gd3JhcE5hdGl2ZShnbG9iYWwuQXJyYXkucHJvdG90eXBlLmZpbmQpO1xuXHRmaW5kSW5kZXggPSB3cmFwTmF0aXZlKGdsb2JhbC5BcnJheS5wcm90b3R5cGUuZmluZEluZGV4KTtcbn0gZWxzZSB7XG5cdC8vIEl0IGlzIG9ubHkgb2xkZXIgdmVyc2lvbnMgb2YgU2FmYXJpL2lPUyB0aGF0IGhhdmUgYSBiYWQgZmlsbCBpbXBsZW1lbnRhdGlvbiBhbmQgc28gYXJlbid0IGluIHRoZSB3aWxkXG5cdC8vIFRvIG1ha2UgdGhpbmdzIGVhc2llciwgaWYgdGhlcmUgaXMgYSBiYWQgZmlsbCBpbXBsZW1lbnRhdGlvbiwgdGhlIHdob2xlIHNldCBvZiBmdW5jdGlvbnMgd2lsbCBiZSBmaWxsZWRcblxuXHQvKipcblx0ICogRW5zdXJlcyBhIG5vbi1uZWdhdGl2ZSwgbm9uLWluZmluaXRlLCBzYWZlIGludGVnZXIuXG5cdCAqXG5cdCAqIEBwYXJhbSBsZW5ndGggVGhlIG51bWJlciB0byB2YWxpZGF0ZVxuXHQgKiBAcmV0dXJuIEEgcHJvcGVyIGxlbmd0aFxuXHQgKi9cblx0Y29uc3QgdG9MZW5ndGggPSBmdW5jdGlvbiB0b0xlbmd0aChsZW5ndGg6IG51bWJlcik6IG51bWJlciB7XG5cdFx0aWYgKGlzTmFOKGxlbmd0aCkpIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblxuXHRcdGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xuXHRcdGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG5cdFx0XHRsZW5ndGggPSBNYXRoLmZsb29yKGxlbmd0aCk7XG5cdFx0fVxuXHRcdC8vIEVuc3VyZSBhIG5vbi1uZWdhdGl2ZSwgcmVhbCwgc2FmZSBpbnRlZ2VyXG5cdFx0cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbmd0aCwgMCksIE1BWF9TQUZFX0lOVEVHRVIpO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBGcm9tIEVTNiA3LjEuNCBUb0ludGVnZXIoKVxuXHQgKlxuXHQgKiBAcGFyYW0gdmFsdWUgQSB2YWx1ZSB0byBjb252ZXJ0XG5cdCAqIEByZXR1cm4gQW4gaW50ZWdlclxuXHQgKi9cblx0Y29uc3QgdG9JbnRlZ2VyID0gZnVuY3Rpb24gdG9JbnRlZ2VyKHZhbHVlOiBhbnkpOiBudW1iZXIge1xuXHRcdHZhbHVlID0gTnVtYmVyKHZhbHVlKTtcblx0XHRpZiAoaXNOYU4odmFsdWUpKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdFx0aWYgKHZhbHVlID09PSAwIHx8ICFpc0Zpbml0ZSh2YWx1ZSkpIHtcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKHZhbHVlID4gMCA/IDEgOiAtMSkgKiBNYXRoLmZsb29yKE1hdGguYWJzKHZhbHVlKSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIE5vcm1hbGl6ZXMgYW4gb2Zmc2V0IGFnYWluc3QgYSBnaXZlbiBsZW5ndGgsIHdyYXBwaW5nIGl0IGlmIG5lZ2F0aXZlLlxuXHQgKlxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIG9yaWdpbmFsIG9mZnNldFxuXHQgKiBAcGFyYW0gbGVuZ3RoIFRoZSB0b3RhbCBsZW5ndGggdG8gbm9ybWFsaXplIGFnYWluc3Rcblx0ICogQHJldHVybiBJZiBuZWdhdGl2ZSwgcHJvdmlkZSBhIGRpc3RhbmNlIGZyb20gdGhlIGVuZCAobGVuZ3RoKTsgb3RoZXJ3aXNlIHByb3ZpZGUgYSBkaXN0YW5jZSBmcm9tIDBcblx0ICovXG5cdGNvbnN0IG5vcm1hbGl6ZU9mZnNldCA9IGZ1bmN0aW9uIG5vcm1hbGl6ZU9mZnNldCh2YWx1ZTogbnVtYmVyLCBsZW5ndGg6IG51bWJlcik6IG51bWJlciB7XG5cdFx0cmV0dXJuIHZhbHVlIDwgMCA/IE1hdGgubWF4KGxlbmd0aCArIHZhbHVlLCAwKSA6IE1hdGgubWluKHZhbHVlLCBsZW5ndGgpO1xuXHR9O1xuXG5cdGZyb20gPSBmdW5jdGlvbiBmcm9tKFxuXHRcdHRoaXM6IEFycmF5Q29uc3RydWN0b3IsXG5cdFx0YXJyYXlMaWtlOiBJdGVyYWJsZTxhbnk+IHwgQXJyYXlMaWtlPGFueT4sXG5cdFx0bWFwRnVuY3Rpb24/OiBNYXBDYWxsYmFjazxhbnksIGFueT4sXG5cdFx0dGhpc0FyZz86IGFueVxuXHQpOiBBcnJheTxhbnk+IHtcblx0XHRpZiAoYXJyYXlMaWtlID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2Zyb206IHJlcXVpcmVzIGFuIGFycmF5LWxpa2Ugb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0aWYgKG1hcEZ1bmN0aW9uICYmIHRoaXNBcmcpIHtcblx0XHRcdG1hcEZ1bmN0aW9uID0gbWFwRnVuY3Rpb24uYmluZCh0aGlzQXJnKTtcblx0XHR9XG5cblx0XHQvKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6dmFyaWFibGUtbmFtZSAqL1xuXHRcdGNvbnN0IENvbnN0cnVjdG9yID0gdGhpcztcblx0XHRjb25zdCBsZW5ndGg6IG51bWJlciA9IHRvTGVuZ3RoKCg8YW55PmFycmF5TGlrZSkubGVuZ3RoKTtcblxuXHRcdC8vIFN1cHBvcnQgZXh0ZW5zaW9uXG5cdFx0Y29uc3QgYXJyYXk6IGFueVtdID1cblx0XHRcdHR5cGVvZiBDb25zdHJ1Y3RvciA9PT0gJ2Z1bmN0aW9uJyA/IDxhbnlbXT5PYmplY3QobmV3IENvbnN0cnVjdG9yKGxlbmd0aCkpIDogbmV3IEFycmF5KGxlbmd0aCk7XG5cblx0XHRpZiAoIWlzQXJyYXlMaWtlKGFycmF5TGlrZSkgJiYgIWlzSXRlcmFibGUoYXJyYXlMaWtlKSkge1xuXHRcdFx0cmV0dXJuIGFycmF5O1xuXHRcdH1cblxuXHRcdC8vIGlmIHRoaXMgaXMgYW4gYXJyYXkgYW5kIHRoZSBub3JtYWxpemVkIGxlbmd0aCBpcyAwLCBqdXN0IHJldHVybiBhbiBlbXB0eSBhcnJheS4gdGhpcyBwcmV2ZW50cyBhIHByb2JsZW1cblx0XHQvLyB3aXRoIHRoZSBpdGVyYXRpb24gb24gSUUgd2hlbiB1c2luZyBhIE5hTiBhcnJheSBsZW5ndGguXG5cdFx0aWYgKGlzQXJyYXlMaWtlKGFycmF5TGlrZSkpIHtcblx0XHRcdGlmIChsZW5ndGggPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5TGlrZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRhcnJheVtpXSA9IG1hcEZ1bmN0aW9uID8gbWFwRnVuY3Rpb24oYXJyYXlMaWtlW2ldLCBpKSA6IGFycmF5TGlrZVtpXTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGkgPSAwO1xuXHRcdFx0Zm9yIChjb25zdCB2YWx1ZSBvZiBhcnJheUxpa2UpIHtcblx0XHRcdFx0YXJyYXlbaV0gPSBtYXBGdW5jdGlvbiA/IG1hcEZ1bmN0aW9uKHZhbHVlLCBpKSA6IHZhbHVlO1xuXHRcdFx0XHRpKys7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCg8YW55PmFycmF5TGlrZSkubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGFycmF5Lmxlbmd0aCA9IGxlbmd0aDtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyYXk7XG5cdH07XG5cblx0b2YgPSBmdW5jdGlvbiBvZjxUPiguLi5pdGVtczogVFtdKTogQXJyYXk8VD4ge1xuXHRcdHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpdGVtcyk7XG5cdH07XG5cblx0Y29weVdpdGhpbiA9IGZ1bmN0aW9uIGNvcHlXaXRoaW48VD4oXG5cdFx0dGFyZ2V0OiBBcnJheUxpa2U8VD4sXG5cdFx0b2Zmc2V0OiBudW1iZXIsXG5cdFx0c3RhcnQ6IG51bWJlcixcblx0XHRlbmQ/OiBudW1iZXJcblx0KTogQXJyYXlMaWtlPFQ+IHtcblx0XHRpZiAodGFyZ2V0ID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ2NvcHlXaXRoaW46IHRhcmdldCBtdXN0IGJlIGFuIGFycmF5LWxpa2Ugb2JqZWN0Jyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9MZW5ndGgodGFyZ2V0Lmxlbmd0aCk7XG5cdFx0b2Zmc2V0ID0gbm9ybWFsaXplT2Zmc2V0KHRvSW50ZWdlcihvZmZzZXQpLCBsZW5ndGgpO1xuXHRcdHN0YXJ0ID0gbm9ybWFsaXplT2Zmc2V0KHRvSW50ZWdlcihzdGFydCksIGxlbmd0aCk7XG5cdFx0ZW5kID0gbm9ybWFsaXplT2Zmc2V0KGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogdG9JbnRlZ2VyKGVuZCksIGxlbmd0aCk7XG5cdFx0bGV0IGNvdW50ID0gTWF0aC5taW4oZW5kIC0gc3RhcnQsIGxlbmd0aCAtIG9mZnNldCk7XG5cblx0XHRsZXQgZGlyZWN0aW9uID0gMTtcblx0XHRpZiAob2Zmc2V0ID4gc3RhcnQgJiYgb2Zmc2V0IDwgc3RhcnQgKyBjb3VudCkge1xuXHRcdFx0ZGlyZWN0aW9uID0gLTE7XG5cdFx0XHRzdGFydCArPSBjb3VudCAtIDE7XG5cdFx0XHRvZmZzZXQgKz0gY291bnQgLSAxO1xuXHRcdH1cblxuXHRcdHdoaWxlIChjb3VudCA+IDApIHtcblx0XHRcdGlmIChzdGFydCBpbiB0YXJnZXQpIHtcblx0XHRcdFx0KHRhcmdldCBhcyBXcml0YWJsZUFycmF5TGlrZTxUPilbb2Zmc2V0XSA9IHRhcmdldFtzdGFydF07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgKHRhcmdldCBhcyBXcml0YWJsZUFycmF5TGlrZTxUPilbb2Zmc2V0XTtcblx0XHRcdH1cblxuXHRcdFx0b2Zmc2V0ICs9IGRpcmVjdGlvbjtcblx0XHRcdHN0YXJ0ICs9IGRpcmVjdGlvbjtcblx0XHRcdGNvdW50LS07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fTtcblxuXHRmaWxsID0gZnVuY3Rpb24gZmlsbDxUPih0YXJnZXQ6IEFycmF5TGlrZTxUPiwgdmFsdWU6IGFueSwgc3RhcnQ/OiBudW1iZXIsIGVuZD86IG51bWJlcik6IEFycmF5TGlrZTxUPiB7XG5cdFx0Y29uc3QgbGVuZ3RoID0gdG9MZW5ndGgodGFyZ2V0Lmxlbmd0aCk7XG5cdFx0bGV0IGkgPSBub3JtYWxpemVPZmZzZXQodG9JbnRlZ2VyKHN0YXJ0KSwgbGVuZ3RoKTtcblx0XHRlbmQgPSBub3JtYWxpemVPZmZzZXQoZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiB0b0ludGVnZXIoZW5kKSwgbGVuZ3RoKTtcblxuXHRcdHdoaWxlIChpIDwgZW5kKSB7XG5cdFx0XHQodGFyZ2V0IGFzIFdyaXRhYmxlQXJyYXlMaWtlPFQ+KVtpKytdID0gdmFsdWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fTtcblxuXHRmaW5kID0gZnVuY3Rpb24gZmluZDxUPih0YXJnZXQ6IEFycmF5TGlrZTxUPiwgY2FsbGJhY2s6IEZpbmRDYWxsYmFjazxUPiwgdGhpc0FyZz86IHt9KTogVCB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3QgaW5kZXggPSBmaW5kSW5kZXg8VD4odGFyZ2V0LCBjYWxsYmFjaywgdGhpc0FyZyk7XG5cdFx0cmV0dXJuIGluZGV4ICE9PSAtMSA/IHRhcmdldFtpbmRleF0gOiB1bmRlZmluZWQ7XG5cdH07XG5cblx0ZmluZEluZGV4ID0gZnVuY3Rpb24gZmluZEluZGV4PFQ+KHRhcmdldDogQXJyYXlMaWtlPFQ+LCBjYWxsYmFjazogRmluZENhbGxiYWNrPFQ+LCB0aGlzQXJnPzoge30pOiBudW1iZXIge1xuXHRcdGNvbnN0IGxlbmd0aCA9IHRvTGVuZ3RoKHRhcmdldC5sZW5ndGgpO1xuXG5cdFx0aWYgKCFjYWxsYmFjaykge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignZmluZDogc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzQXJnKSB7XG5cdFx0XHRjYWxsYmFjayA9IGNhbGxiYWNrLmJpbmQodGhpc0FyZyk7XG5cdFx0fVxuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGNhbGxiYWNrKHRhcmdldFtpXSwgaSwgdGFyZ2V0KSkge1xuXHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gLTE7XG5cdH07XG59XG5cbmlmIChoYXMoJ2VzNy1hcnJheScpKSB7XG5cdGluY2x1ZGVzID0gd3JhcE5hdGl2ZShnbG9iYWwuQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzKTtcbn0gZWxzZSB7XG5cdC8qKlxuXHQgKiBFbnN1cmVzIGEgbm9uLW5lZ2F0aXZlLCBub24taW5maW5pdGUsIHNhZmUgaW50ZWdlci5cblx0ICpcblx0ICogQHBhcmFtIGxlbmd0aCBUaGUgbnVtYmVyIHRvIHZhbGlkYXRlXG5cdCAqIEByZXR1cm4gQSBwcm9wZXIgbGVuZ3RoXG5cdCAqL1xuXHRjb25zdCB0b0xlbmd0aCA9IGZ1bmN0aW9uIHRvTGVuZ3RoKGxlbmd0aDogbnVtYmVyKTogbnVtYmVyIHtcblx0XHRsZW5ndGggPSBOdW1iZXIobGVuZ3RoKTtcblx0XHRpZiAoaXNOYU4obGVuZ3RoKSkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXHRcdGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG5cdFx0XHRsZW5ndGggPSBNYXRoLmZsb29yKGxlbmd0aCk7XG5cdFx0fVxuXHRcdC8vIEVuc3VyZSBhIG5vbi1uZWdhdGl2ZSwgcmVhbCwgc2FmZSBpbnRlZ2VyXG5cdFx0cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbmd0aCwgMCksIE1BWF9TQUZFX0lOVEVHRVIpO1xuXHR9O1xuXG5cdGluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXM8VD4odGFyZ2V0OiBBcnJheUxpa2U8VD4sIHNlYXJjaEVsZW1lbnQ6IFQsIGZyb21JbmRleDogbnVtYmVyID0gMCk6IGJvb2xlYW4ge1xuXHRcdGxldCBsZW4gPSB0b0xlbmd0aCh0YXJnZXQubGVuZ3RoKTtcblxuXHRcdGZvciAobGV0IGkgPSBmcm9tSW5kZXg7IGkgPCBsZW47ICsraSkge1xuXHRcdFx0Y29uc3QgY3VycmVudEVsZW1lbnQgPSB0YXJnZXRbaV07XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHNlYXJjaEVsZW1lbnQgPT09IGN1cnJlbnRFbGVtZW50IHx8XG5cdFx0XHRcdChzZWFyY2hFbGVtZW50ICE9PSBzZWFyY2hFbGVtZW50ICYmIGN1cnJlbnRFbGVtZW50ICE9PSBjdXJyZW50RWxlbWVudClcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gYXJyYXkudHMiLCJjb25zdCBnbG9iYWxPYmplY3Q6IGFueSA9IChmdW5jdGlvbigpOiBhbnkge1xuXHRpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHQvLyBnbG9iYWwgc3BlYyBkZWZpbmVzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IGNhbGxlZCAnZ2xvYmFsJ1xuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWdsb2JhbFxuXHRcdC8vIGBnbG9iYWxgIGlzIGFsc28gZGVmaW5lZCBpbiBOb2RlSlNcblx0XHRyZXR1cm4gZ2xvYmFsO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0Ly8gd2luZG93IGlzIGRlZmluZWQgaW4gYnJvd3NlcnNcblx0XHRyZXR1cm4gd2luZG93O1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuXHRcdC8vIHNlbGYgaXMgZGVmaW5lZCBpbiBXZWJXb3JrZXJzXG5cdFx0cmV0dXJuIHNlbGY7XG5cdH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdsb2JhbE9iamVjdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBnbG9iYWwudHMiLCJpbXBvcnQgJy4vU3ltYm9sJztcbmltcG9ydCB7IEhJR0hfU1VSUk9HQVRFX01BWCwgSElHSF9TVVJST0dBVEVfTUlOIH0gZnJvbSAnLi9zdHJpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEl0ZXJhdG9yUmVzdWx0PFQ+IHtcblx0cmVhZG9ubHkgZG9uZTogYm9vbGVhbjtcblx0cmVhZG9ubHkgdmFsdWU6IFQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlcmF0b3I8VD4ge1xuXHRuZXh0KHZhbHVlPzogYW55KTogSXRlcmF0b3JSZXN1bHQ8VD47XG5cblx0cmV0dXJuPyh2YWx1ZT86IGFueSk6IEl0ZXJhdG9yUmVzdWx0PFQ+O1xuXG5cdHRocm93PyhlPzogYW55KTogSXRlcmF0b3JSZXN1bHQ8VD47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSXRlcmFibGU8VD4ge1xuXHRbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYXRvcjxUPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJdGVyYWJsZUl0ZXJhdG9yPFQ+IGV4dGVuZHMgSXRlcmF0b3I8VD4ge1xuXHRbU3ltYm9sLml0ZXJhdG9yXSgpOiBJdGVyYWJsZUl0ZXJhdG9yPFQ+O1xufVxuXG5jb25zdCBzdGF0aWNEb25lOiBJdGVyYXRvclJlc3VsdDxhbnk+ID0geyBkb25lOiB0cnVlLCB2YWx1ZTogdW5kZWZpbmVkIH07XG5cbi8qKlxuICogQSBjbGFzcyB0aGF0IF9zaGltc18gYW4gaXRlcmF0b3IgaW50ZXJmYWNlIG9uIGFycmF5IGxpa2Ugb2JqZWN0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNoaW1JdGVyYXRvcjxUPiB7XG5cdHByaXZhdGUgX2xpc3Q6IEFycmF5TGlrZTxUPiB8IHVuZGVmaW5lZDtcblx0cHJpdmF0ZSBfbmV4dEluZGV4ID0gLTE7XG5cdHByaXZhdGUgX25hdGl2ZUl0ZXJhdG9yOiBJdGVyYXRvcjxUPiB8IHVuZGVmaW5lZDtcblxuXHRjb25zdHJ1Y3RvcihsaXN0OiBBcnJheUxpa2U8VD4gfCBJdGVyYWJsZTxUPikge1xuXHRcdGlmIChpc0l0ZXJhYmxlKGxpc3QpKSB7XG5cdFx0XHR0aGlzLl9uYXRpdmVJdGVyYXRvciA9IGxpc3RbU3ltYm9sLml0ZXJhdG9yXSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9saXN0ID0gbGlzdDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJuIHRoZSBuZXh0IGl0ZXJhdGlvbiByZXN1bHQgZm9yIHRoZSBJdGVyYXRvclxuXHQgKi9cblx0bmV4dCgpOiBJdGVyYXRvclJlc3VsdDxUPiB7XG5cdFx0aWYgKHRoaXMuX25hdGl2ZUl0ZXJhdG9yKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fbmF0aXZlSXRlcmF0b3IubmV4dCgpO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuX2xpc3QpIHtcblx0XHRcdHJldHVybiBzdGF0aWNEb25lO1xuXHRcdH1cblx0XHRpZiAoKyt0aGlzLl9uZXh0SW5kZXggPCB0aGlzLl9saXN0Lmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZG9uZTogZmFsc2UsXG5cdFx0XHRcdHZhbHVlOiB0aGlzLl9saXN0W3RoaXMuX25leHRJbmRleF1cblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiBzdGF0aWNEb25lO1xuXHR9XG5cblx0W1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxUPiB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuLyoqXG4gKiBBIHR5cGUgZ3VhcmQgZm9yIGNoZWNraW5nIGlmIHNvbWV0aGluZyBoYXMgYW4gSXRlcmFibGUgaW50ZXJmYWNlXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0eXBlIGd1YXJkIGFnYWluc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSXRlcmFibGUodmFsdWU6IGFueSk6IHZhbHVlIGlzIEl0ZXJhYmxlPGFueT4ge1xuXHRyZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlW1N5bWJvbC5pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XG59XG5cbi8qKlxuICogQSB0eXBlIGd1YXJkIGZvciBjaGVja2luZyBpZiBzb21ldGhpbmcgaXMgQXJyYXlMaWtlXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0eXBlIGd1YXJkIGFnYWluc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBBcnJheUxpa2U8YW55PiB7XG5cdHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBmb3IgYW4gb2JqZWN0XG4gKlxuICogQHBhcmFtIGl0ZXJhYmxlIFRoZSBpdGVyYWJsZSBvYmplY3QgdG8gcmV0dXJuIHRoZSBpdGVyYXRvciBmb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldDxUPihpdGVyYWJsZTogSXRlcmFibGU8VD4gfCBBcnJheUxpa2U8VD4pOiBJdGVyYXRvcjxUPiB8IHVuZGVmaW5lZCB7XG5cdGlmIChpc0l0ZXJhYmxlKGl0ZXJhYmxlKSkge1xuXHRcdHJldHVybiBpdGVyYWJsZVtTeW1ib2wuaXRlcmF0b3JdKCk7XG5cdH0gZWxzZSBpZiAoaXNBcnJheUxpa2UoaXRlcmFibGUpKSB7XG5cdFx0cmV0dXJuIG5ldyBTaGltSXRlcmF0b3IoaXRlcmFibGUpO1xuXHR9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9yT2ZDYWxsYmFjazxUPiB7XG5cdC8qKlxuXHQgKiBBIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBhIGZvck9mKCkgaXRlcmF0aW9uXG5cdCAqXG5cdCAqIEBwYXJhbSB2YWx1ZSBUaGUgY3VycmVudCB2YWx1ZVxuXHQgKiBAcGFyYW0gb2JqZWN0IFRoZSBvYmplY3QgYmVpbmcgaXRlcmF0ZWQgb3ZlclxuXHQgKiBAcGFyYW0gZG9CcmVhayBBIGZ1bmN0aW9uLCBpZiBjYWxsZWQsIHdpbGwgc3RvcCB0aGUgaXRlcmF0aW9uXG5cdCAqL1xuXHQodmFsdWU6IFQsIG9iamVjdDogSXRlcmFibGU8VD4gfCBBcnJheUxpa2U8VD4gfCBzdHJpbmcsIGRvQnJlYWs6ICgpID0+IHZvaWQpOiB2b2lkO1xufVxuXG4vKipcbiAqIFNoaW1zIHRoZSBmdW5jdGlvbmFsaXR5IG9mIGBmb3IgLi4uIG9mYCBibG9ja3NcbiAqXG4gKiBAcGFyYW0gaXRlcmFibGUgVGhlIG9iamVjdCB0aGUgcHJvdmlkZXMgYW4gaW50ZXJhdG9yIGludGVyZmFjZVxuICogQHBhcmFtIGNhbGxiYWNrIFRoZSBjYWxsYmFjayB3aGljaCB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaCBpdGVtIG9mIHRoZSBpdGVyYWJsZVxuICogQHBhcmFtIHRoaXNBcmcgT3B0aW9uYWwgc2NvcGUgdG8gcGFzcyB0aGUgY2FsbGJhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZvck9mPFQ+KFxuXHRpdGVyYWJsZTogSXRlcmFibGU8VD4gfCBBcnJheUxpa2U8VD4gfCBzdHJpbmcsXG5cdGNhbGxiYWNrOiBGb3JPZkNhbGxiYWNrPFQ+LFxuXHR0aGlzQXJnPzogYW55XG4pOiB2b2lkIHtcblx0bGV0IGJyb2tlbiA9IGZhbHNlO1xuXG5cdGZ1bmN0aW9uIGRvQnJlYWsoKSB7XG5cdFx0YnJva2VuID0gdHJ1ZTtcblx0fVxuXG5cdC8qIFdlIG5lZWQgdG8gaGFuZGxlIGl0ZXJhdGlvbiBvZiBkb3VibGUgYnl0ZSBzdHJpbmdzIHByb3Blcmx5ICovXG5cdGlmIChpc0FycmF5TGlrZShpdGVyYWJsZSkgJiYgdHlwZW9mIGl0ZXJhYmxlID09PSAnc3RyaW5nJykge1xuXHRcdGNvbnN0IGwgPSBpdGVyYWJsZS5sZW5ndGg7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsOyArK2kpIHtcblx0XHRcdGxldCBjaGFyID0gaXRlcmFibGVbaV07XG5cdFx0XHRpZiAoaSArIDEgPCBsKSB7XG5cdFx0XHRcdGNvbnN0IGNvZGUgPSBjaGFyLmNoYXJDb2RlQXQoMCk7XG5cdFx0XHRcdGlmIChjb2RlID49IEhJR0hfU1VSUk9HQVRFX01JTiAmJiBjb2RlIDw9IEhJR0hfU1VSUk9HQVRFX01BWCkge1xuXHRcdFx0XHRcdGNoYXIgKz0gaXRlcmFibGVbKytpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzQXJnLCBjaGFyLCBpdGVyYWJsZSwgZG9CcmVhayk7XG5cdFx0XHRpZiAoYnJva2VuKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgaXRlcmF0b3IgPSBnZXQoaXRlcmFibGUpO1xuXHRcdGlmIChpdGVyYXRvcikge1xuXHRcdFx0bGV0IHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcblxuXHRcdFx0d2hpbGUgKCFyZXN1bHQuZG9uZSkge1xuXHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHJlc3VsdC52YWx1ZSwgaXRlcmFibGUsIGRvQnJlYWspO1xuXHRcdFx0XHRpZiAoYnJva2VuKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBpdGVyYXRvci50cyIsImltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuXG4vKipcbiAqIFRoZSBzbWFsbGVzdCBpbnRlcnZhbCBiZXR3ZWVuIHR3byByZXByZXNlbnRhYmxlIG51bWJlcnMuXG4gKi9cbmV4cG9ydCBjb25zdCBFUFNJTE9OID0gMTtcblxuLyoqXG4gKiBUaGUgbWF4aW11bSBzYWZlIGludGVnZXIgaW4gSmF2YVNjcmlwdFxuICovXG5leHBvcnQgY29uc3QgTUFYX1NBRkVfSU5URUdFUiA9IE1hdGgucG93KDIsIDUzKSAtIDE7XG5cbi8qKlxuICogVGhlIG1pbmltdW0gc2FmZSBpbnRlZ2VyIGluIEphdmFTY3JpcHRcbiAqL1xuZXhwb3J0IGNvbnN0IE1JTl9TQUZFX0lOVEVHRVIgPSAtTUFYX1NBRkVfSU5URUdFUjtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBOYU4gd2l0aG91dCBjb2Vyc2lvbi5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgTmFOLCBmYWxzZSBpZiBpdCBpcyBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTmFOKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0cmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgZ2xvYmFsLmlzTmFOKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhIGZpbml0ZSBudW1iZXIgd2l0aG91dCBjb2Vyc2lvbi5cbiAqXG4gKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4gdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgZmluaXRlLCBmYWxzZSBpZiBpdCBpcyBub3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRmluaXRlKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiBnbG9iYWwuaXNGaW5pdGUodmFsdWUpO1xufVxuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGFzc2VkIHZhbHVlIGlzIGFuIGludGVnZXIuXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIsIGZhbHNlIGlmIGl0IGlzIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlZ2VyKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBudW1iZXIge1xuXHRyZXR1cm4gaXNGaW5pdGUodmFsdWUpICYmIE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBhc3NlZCB2YWx1ZSBpcyBhbiBpbnRlZ2VyIHRoYXQgaXMgJ3NhZmUsJyBtZWFuaW5nOlxuICogICAxLiBpdCBjYW4gYmUgZXhwcmVzc2VkIGFzIGFuIElFRUUtNzU0IGRvdWJsZSBwcmVjaXNpb24gbnVtYmVyXG4gKiAgIDIuIGl0IGhhcyBhIG9uZS10by1vbmUgbWFwcGluZyB0byBhIG1hdGhlbWF0aWNhbCBpbnRlZ2VyLCBtZWFuaW5nIGl0c1xuICogICAgICBJRUVFLTc1NCByZXByZXNlbnRhdGlvbiBjYW5ub3QgYmUgdGhlIHJlc3VsdCBvZiByb3VuZGluZyBhbnkgb3RoZXJcbiAqICAgICAgaW50ZWdlciB0byBmaXQgdGhlIElFRUUtNzU0IHJlcHJlc2VudGF0aW9uXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGlzIGFuIGludGVnZXIsIGZhbHNlIGlmIGl0IGlzIG5vdFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNTYWZlSW50ZWdlcih2YWx1ZTogYW55KTogdmFsdWUgaXMgbnVtYmVyIHtcblx0cmV0dXJuIGlzSW50ZWdlcih2YWx1ZSkgJiYgTWF0aC5hYnModmFsdWUpIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbnVtYmVyLnRzIiwiaW1wb3J0IGdsb2JhbCBmcm9tICcuL2dsb2JhbCc7XG5pbXBvcnQgaGFzIGZyb20gJy4vc3VwcG9ydC9oYXMnO1xuaW1wb3J0IHsgaXNTeW1ib2wgfSBmcm9tICcuL1N5bWJvbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgT2JqZWN0QXNzaWduIHtcblx0LyoqXG5cdCAqIENvcHkgdGhlIHZhbHVlcyBvZiBhbGwgb2YgdGhlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgZnJvbSBvbmUgb3IgbW9yZSBzb3VyY2Ugb2JqZWN0cyB0byBhXG5cdCAqIHRhcmdldCBvYmplY3QuIFJldHVybnMgdGhlIHRhcmdldCBvYmplY3QuXG5cdCAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdG8gY29weSB0by5cblx0ICogQHBhcmFtIHNvdXJjZSBUaGUgc291cmNlIG9iamVjdCBmcm9tIHdoaWNoIHRvIGNvcHkgcHJvcGVydGllcy5cblx0ICovXG5cdDxULCBVPih0YXJnZXQ6IFQsIHNvdXJjZTogVSk6IFQgJiBVO1xuXG5cdC8qKlxuXHQgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYWxsIG9mIHRoZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIGZyb20gb25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMgdG8gYVxuXHQgKiB0YXJnZXQgb2JqZWN0LiBSZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IHRvIGNvcHkgdG8uXG5cdCAqIEBwYXJhbSBzb3VyY2UxIFRoZSBmaXJzdCBzb3VyY2Ugb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSBwcm9wZXJ0aWVzLlxuXHQgKiBAcGFyYW0gc291cmNlMiBUaGUgc2Vjb25kIHNvdXJjZSBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHByb3BlcnRpZXMuXG5cdCAqL1xuXHQ8VCwgVSwgVj4odGFyZ2V0OiBULCBzb3VyY2UxOiBVLCBzb3VyY2UyOiBWKTogVCAmIFUgJiBWO1xuXG5cdC8qKlxuXHQgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYWxsIG9mIHRoZSBlbnVtZXJhYmxlIG93biBwcm9wZXJ0aWVzIGZyb20gb25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMgdG8gYVxuXHQgKiB0YXJnZXQgb2JqZWN0LiBSZXR1cm5zIHRoZSB0YXJnZXQgb2JqZWN0LlxuXHQgKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgb2JqZWN0IHRvIGNvcHkgdG8uXG5cdCAqIEBwYXJhbSBzb3VyY2UxIFRoZSBmaXJzdCBzb3VyY2Ugb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSBwcm9wZXJ0aWVzLlxuXHQgKiBAcGFyYW0gc291cmNlMiBUaGUgc2Vjb25kIHNvdXJjZSBvYmplY3QgZnJvbSB3aGljaCB0byBjb3B5IHByb3BlcnRpZXMuXG5cdCAqIEBwYXJhbSBzb3VyY2UzIFRoZSB0aGlyZCBzb3VyY2Ugb2JqZWN0IGZyb20gd2hpY2ggdG8gY29weSBwcm9wZXJ0aWVzLlxuXHQgKi9cblx0PFQsIFUsIFYsIFc+KHRhcmdldDogVCwgc291cmNlMTogVSwgc291cmNlMjogViwgc291cmNlMzogVyk6IFQgJiBVICYgViAmIFc7XG5cblx0LyoqXG5cdCAqIENvcHkgdGhlIHZhbHVlcyBvZiBhbGwgb2YgdGhlIGVudW1lcmFibGUgb3duIHByb3BlcnRpZXMgZnJvbSBvbmUgb3IgbW9yZSBzb3VyY2Ugb2JqZWN0cyB0byBhXG5cdCAqIHRhcmdldCBvYmplY3QuIFJldHVybnMgdGhlIHRhcmdldCBvYmplY3QuXG5cdCAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBvYmplY3QgdG8gY29weSB0by5cblx0ICogQHBhcmFtIHNvdXJjZXMgT25lIG9yIG1vcmUgc291cmNlIG9iamVjdHMgZnJvbSB3aGljaCB0byBjb3B5IHByb3BlcnRpZXNcblx0ICovXG5cdCh0YXJnZXQ6IG9iamVjdCwgLi4uc291cmNlczogYW55W10pOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT2JqZWN0RW50ZXJpZXMge1xuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBrZXkvdmFsdWVzIG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0XG5cdCAqIEBwYXJhbSBvIE9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLiBUaGlzIGNhbiBiZSBhbiBvYmplY3QgdGhhdCB5b3UgY3JlYXRlZCBvciBhbiBleGlzdGluZyBEb2N1bWVudCBPYmplY3QgTW9kZWwgKERPTSkgb2JqZWN0LlxuXHQgKi9cblx0PFQgZXh0ZW5kcyB7IFtrZXk6IHN0cmluZ106IGFueSB9LCBLIGV4dGVuZHMga2V5b2YgVD4obzogVCk6IFtrZXlvZiBULCBUW0tdXVtdO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGtleS92YWx1ZXMgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3Rcblx0ICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuIFRoaXMgY2FuIGJlIGFuIG9iamVjdCB0aGF0IHlvdSBjcmVhdGVkIG9yIGFuIGV4aXN0aW5nIERvY3VtZW50IE9iamVjdCBNb2RlbCAoRE9NKSBvYmplY3QuXG5cdCAqL1xuXHQobzogb2JqZWN0KTogW3N0cmluZywgYW55XVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9iamVjdEdldE93blByb3BlcnR5RGVzY3JpcHRvcnMge1xuXHQ8VD4obzogVCk6IHsgW0sgaW4ga2V5b2YgVF06IFByb3BlcnR5RGVzY3JpcHRvciB9O1xuXHQobzogYW55KTogeyBba2V5OiBzdHJpbmddOiBQcm9wZXJ0eURlc2NyaXB0b3IgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPYmplY3RWYWx1ZXMge1xuXHQvKipcblx0ICogUmV0dXJucyBhbiBhcnJheSBvZiB2YWx1ZXMgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3Rcblx0ICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuIFRoaXMgY2FuIGJlIGFuIG9iamVjdCB0aGF0IHlvdSBjcmVhdGVkIG9yIGFuIGV4aXN0aW5nIERvY3VtZW50IE9iamVjdCBNb2RlbCAoRE9NKSBvYmplY3QuXG5cdCAqL1xuXHQ8VD4obzogeyBbczogc3RyaW5nXTogVCB9KTogVFtdO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHZhbHVlcyBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdFxuXHQgKiBAcGFyYW0gbyBPYmplY3QgdGhhdCBjb250YWlucyB0aGUgcHJvcGVydGllcyBhbmQgbWV0aG9kcy4gVGhpcyBjYW4gYmUgYW4gb2JqZWN0IHRoYXQgeW91IGNyZWF0ZWQgb3IgYW4gZXhpc3RpbmcgRG9jdW1lbnQgT2JqZWN0IE1vZGVsIChET00pIG9iamVjdC5cblx0ICovXG5cdChvOiBvYmplY3QpOiBhbnlbXTtcbn1cblxuZXhwb3J0IGxldCBhc3NpZ246IE9iamVjdEFzc2lnbjtcblxuLyoqXG4gKiBHZXRzIHRoZSBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBvZiB0aGUgc3BlY2lmaWVkIG9iamVjdC5cbiAqIEFuIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIGlzIG9uZSB0aGF0IGlzIGRlZmluZWQgZGlyZWN0bHkgb24gdGhlIG9iamVjdCBhbmQgaXMgbm90XG4gKiBpbmhlcml0ZWQgZnJvbSB0aGUgb2JqZWN0J3MgcHJvdG90eXBlLlxuICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHByb3BlcnR5LlxuICogQHBhcmFtIHAgTmFtZSBvZiB0aGUgcHJvcGVydHkuXG4gKi9cbmV4cG9ydCBsZXQgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiA8VCwgSyBleHRlbmRzIGtleW9mIFQ+KG86IFQsIHByb3BlcnR5S2V5OiBLKSA9PiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbmFtZXMgb2YgdGhlIG93biBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdC4gVGhlIG93biBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBhcmUgdGhvc2UgdGhhdCBhcmUgZGVmaW5lZCBkaXJlY3RseVxuICogb24gdGhhdCBvYmplY3QsIGFuZCBhcmUgbm90IGluaGVyaXRlZCBmcm9tIHRoZSBvYmplY3QncyBwcm90b3R5cGUuIFRoZSBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdCBpbmNsdWRlIGJvdGggZmllbGRzIChvYmplY3RzKSBhbmQgZnVuY3Rpb25zLlxuICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIG93biBwcm9wZXJ0aWVzLlxuICovXG5leHBvcnQgbGV0IGdldE93blByb3BlcnR5TmFtZXM6IChvOiBhbnkpID0+IHN0cmluZ1tdO1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgYWxsIHN5bWJvbCBwcm9wZXJ0aWVzIGZvdW5kIGRpcmVjdGx5IG9uIG9iamVjdCBvLlxuICogQHBhcmFtIG8gT2JqZWN0IHRvIHJldHJpZXZlIHRoZSBzeW1ib2xzIGZyb20uXG4gKi9cbmV4cG9ydCBsZXQgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAobzogYW55KSA9PiBzeW1ib2xbXTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHZhbHVlcyBhcmUgdGhlIHNhbWUgdmFsdWUsIGZhbHNlIG90aGVyd2lzZS5cbiAqIEBwYXJhbSB2YWx1ZTEgVGhlIGZpcnN0IHZhbHVlLlxuICogQHBhcmFtIHZhbHVlMiBUaGUgc2Vjb25kIHZhbHVlLlxuICovXG5leHBvcnQgbGV0IGlzOiAodmFsdWUxOiBhbnksIHZhbHVlMjogYW55KSA9PiBib29sZWFuO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIG5hbWVzIG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgb2YgYW4gb2JqZWN0LlxuICogQHBhcmFtIG8gT2JqZWN0IHRoYXQgY29udGFpbnMgdGhlIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuIFRoaXMgY2FuIGJlIGFuIG9iamVjdCB0aGF0IHlvdSBjcmVhdGVkIG9yIGFuIGV4aXN0aW5nIERvY3VtZW50IE9iamVjdCBNb2RlbCAoRE9NKSBvYmplY3QuXG4gKi9cbmV4cG9ydCBsZXQga2V5czogKG86IG9iamVjdCkgPT4gc3RyaW5nW107XG5cbi8qIEVTNyBPYmplY3Qgc3RhdGljIG1ldGhvZHMgKi9cblxuZXhwb3J0IGxldCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzOiBPYmplY3RHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzO1xuXG5leHBvcnQgbGV0IGVudHJpZXM6IE9iamVjdEVudGVyaWVzO1xuXG5leHBvcnQgbGV0IHZhbHVlczogT2JqZWN0VmFsdWVzO1xuXG5pZiAoaGFzKCdlczYtb2JqZWN0JykpIHtcblx0Y29uc3QgZ2xvYmFsT2JqZWN0ID0gZ2xvYmFsLk9iamVjdDtcblx0YXNzaWduID0gZ2xvYmFsT2JqZWN0LmFzc2lnbjtcblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2xvYmFsT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblx0Z2V0T3duUHJvcGVydHlOYW1lcyA9IGdsb2JhbE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuXHRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnbG9iYWxPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXHRpcyA9IGdsb2JhbE9iamVjdC5pcztcblx0a2V5cyA9IGdsb2JhbE9iamVjdC5rZXlzO1xufSBlbHNlIHtcblx0a2V5cyA9IGZ1bmN0aW9uIHN5bWJvbEF3YXJlS2V5cyhvOiBvYmplY3QpOiBzdHJpbmdbXSB7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKG8pLmZpbHRlcigoa2V5KSA9PiAhQm9vbGVhbihrZXkubWF0Y2goL15AQC4rLykpKTtcblx0fTtcblxuXHRhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0OiBhbnksIC4uLnNvdXJjZXM6IGFueVtdKSB7XG5cdFx0aWYgKHRhcmdldCA9PSBudWxsKSB7XG5cdFx0XHQvLyBUeXBlRXJyb3IgaWYgdW5kZWZpbmVkIG9yIG51bGxcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRvID0gT2JqZWN0KHRhcmdldCk7XG5cdFx0c291cmNlcy5mb3JFYWNoKChuZXh0U291cmNlKSA9PiB7XG5cdFx0XHRpZiAobmV4dFNvdXJjZSkge1xuXHRcdFx0XHQvLyBTa2lwIG92ZXIgaWYgdW5kZWZpbmVkIG9yIG51bGxcblx0XHRcdFx0a2V5cyhuZXh0U291cmNlKS5mb3JFYWNoKChuZXh0S2V5KSA9PiB7XG5cdFx0XHRcdFx0dG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiB0bztcblx0fTtcblxuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoXG5cdFx0bzogYW55LFxuXHRcdHByb3A6IHN0cmluZyB8IHN5bWJvbFxuXHQpOiBQcm9wZXJ0eURlc2NyaXB0b3IgfCB1bmRlZmluZWQge1xuXHRcdGlmIChpc1N5bWJvbChwcm9wKSkge1xuXHRcdFx0cmV0dXJuICg8YW55Pk9iamVjdCkuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG8sIHByb3ApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvLCBwcm9wKTtcblx0XHR9XG5cdH07XG5cblx0Z2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMobzogYW55KTogc3RyaW5nW10ge1xuXHRcdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5maWx0ZXIoKGtleSkgPT4gIUJvb2xlYW4oa2V5Lm1hdGNoKC9eQEAuKy8pKSk7XG5cdH07XG5cblx0Z2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKG86IGFueSk6IHN5bWJvbFtdIHtcblx0XHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobylcblx0XHRcdC5maWx0ZXIoKGtleSkgPT4gQm9vbGVhbihrZXkubWF0Y2goL15AQC4rLykpKVxuXHRcdFx0Lm1hcCgoa2V5KSA9PiBTeW1ib2wuZm9yKGtleS5zdWJzdHJpbmcoMikpKTtcblx0fTtcblxuXHRpcyA9IGZ1bmN0aW9uIGlzKHZhbHVlMTogYW55LCB2YWx1ZTI6IGFueSk6IGJvb2xlYW4ge1xuXHRcdGlmICh2YWx1ZTEgPT09IHZhbHVlMikge1xuXHRcdFx0cmV0dXJuIHZhbHVlMSAhPT0gMCB8fCAxIC8gdmFsdWUxID09PSAxIC8gdmFsdWUyOyAvLyAtMFxuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWUxICE9PSB2YWx1ZTEgJiYgdmFsdWUyICE9PSB2YWx1ZTI7IC8vIE5hTlxuXHR9O1xufVxuXG5pZiAoaGFzKCdlczIwMTctb2JqZWN0JykpIHtcblx0Y29uc3QgZ2xvYmFsT2JqZWN0ID0gZ2xvYmFsLk9iamVjdDtcblx0Z2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA9IGdsb2JhbE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzO1xuXHRlbnRyaWVzID0gZ2xvYmFsT2JqZWN0LmVudHJpZXM7XG5cdHZhbHVlcyA9IGdsb2JhbE9iamVjdC52YWx1ZXM7XG59IGVsc2Uge1xuXHRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvOiBhbnkpIHtcblx0XHRyZXR1cm4gZ2V0T3duUHJvcGVydHlOYW1lcyhvKS5yZWR1Y2UoXG5cdFx0XHQocHJldmlvdXMsIGtleSkgPT4ge1xuXHRcdFx0XHRwcmV2aW91c1trZXldID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG8sIGtleSkhO1xuXHRcdFx0XHRyZXR1cm4gcHJldmlvdXM7XG5cdFx0XHR9LFxuXHRcdFx0e30gYXMgeyBba2V5OiBzdHJpbmddOiBQcm9wZXJ0eURlc2NyaXB0b3IgfVxuXHRcdCk7XG5cdH07XG5cblx0ZW50cmllcyA9IGZ1bmN0aW9uIGVudHJpZXMobzogYW55KTogW3N0cmluZywgYW55XVtdIHtcblx0XHRyZXR1cm4ga2V5cyhvKS5tYXAoKGtleSkgPT4gW2tleSwgb1trZXldXSBhcyBbc3RyaW5nLCBhbnldKTtcblx0fTtcblxuXHR2YWx1ZXMgPSBmdW5jdGlvbiB2YWx1ZXMobzogYW55KTogYW55W10ge1xuXHRcdHJldHVybiBrZXlzKG8pLm1hcCgoa2V5KSA9PiBvW2tleV0pO1xuXHR9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIG9iamVjdC50cyIsImltcG9ydCBnbG9iYWwgZnJvbSAnLi9nbG9iYWwnO1xuaW1wb3J0IGhhcyBmcm9tICcuL3N1cHBvcnQvaGFzJztcbmltcG9ydCB7IHdyYXBOYXRpdmUgfSBmcm9tICcuL3N1cHBvcnQvdXRpbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RyaW5nTm9ybWFsaXplIHtcblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIFN0cmluZyB2YWx1ZSByZXN1bHQgb2Ygbm9ybWFsaXppbmcgdGhlIHN0cmluZyBpbnRvIHRoZSBub3JtYWxpemF0aW9uIGZvcm1cblx0ICogbmFtZWQgYnkgZm9ybSBhcyBzcGVjaWZpZWQgaW4gVW5pY29kZSBTdGFuZGFyZCBBbm5leCAjMTUsIFVuaWNvZGUgTm9ybWFsaXphdGlvbiBGb3Jtcy5cblx0ICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHN0cmluZ1xuXHQgKiBAcGFyYW0gZm9ybSBBcHBsaWNhYmxlIHZhbHVlczogXCJORkNcIiwgXCJORkRcIiwgXCJORktDXCIsIG9yIFwiTkZLRFwiLCBJZiBub3Qgc3BlY2lmaWVkIGRlZmF1bHRcblx0ICogaXMgXCJORkNcIlxuXHQgKi9cblx0KHRhcmdldDogc3RyaW5nLCBmb3JtOiAnTkZDJyB8ICdORkQnIHwgJ05GS0MnIHwgJ05GS0QnKTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBTdHJpbmcgdmFsdWUgcmVzdWx0IG9mIG5vcm1hbGl6aW5nIHRoZSBzdHJpbmcgaW50byB0aGUgbm9ybWFsaXphdGlvbiBmb3JtXG5cdCAqIG5hbWVkIGJ5IGZvcm0gYXMgc3BlY2lmaWVkIGluIFVuaWNvZGUgU3RhbmRhcmQgQW5uZXggIzE1LCBVbmljb2RlIE5vcm1hbGl6YXRpb24gRm9ybXMuXG5cdCAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBzdHJpbmdcblx0ICogQHBhcmFtIGZvcm0gQXBwbGljYWJsZSB2YWx1ZXM6IFwiTkZDXCIsIFwiTkZEXCIsIFwiTkZLQ1wiLCBvciBcIk5GS0RcIiwgSWYgbm90IHNwZWNpZmllZCBkZWZhdWx0XG5cdCAqIGlzIFwiTkZDXCJcblx0ICovXG5cdCh0YXJnZXQ6IHN0cmluZywgZm9ybT86IHN0cmluZyk6IHN0cmluZztcbn1cblxuLyoqXG4gKiBUaGUgbWluaW11bSBsb2NhdGlvbiBvZiBoaWdoIHN1cnJvZ2F0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IEhJR0hfU1VSUk9HQVRFX01JTiA9IDB4ZDgwMDtcblxuLyoqXG4gKiBUaGUgbWF4aW11bSBsb2NhdGlvbiBvZiBoaWdoIHN1cnJvZ2F0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IEhJR0hfU1VSUk9HQVRFX01BWCA9IDB4ZGJmZjtcblxuLyoqXG4gKiBUaGUgbWluaW11bSBsb2NhdGlvbiBvZiBsb3cgc3Vycm9nYXRlc1xuICovXG5leHBvcnQgY29uc3QgTE9XX1NVUlJPR0FURV9NSU4gPSAweGRjMDA7XG5cbi8qKlxuICogVGhlIG1heGltdW0gbG9jYXRpb24gb2YgbG93IHN1cnJvZ2F0ZXNcbiAqL1xuZXhwb3J0IGNvbnN0IExPV19TVVJST0dBVEVfTUFYID0gMHhkZmZmO1xuXG4vKiBFUzYgc3RhdGljIG1ldGhvZHMgKi9cblxuLyoqXG4gKiBSZXR1cm4gdGhlIFN0cmluZyB2YWx1ZSB3aG9zZSBlbGVtZW50cyBhcmUsIGluIG9yZGVyLCB0aGUgZWxlbWVudHMgaW4gdGhlIExpc3QgZWxlbWVudHMuXG4gKiBJZiBsZW5ndGggaXMgMCwgdGhlIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZC5cbiAqIEBwYXJhbSBjb2RlUG9pbnRzIFRoZSBjb2RlIHBvaW50cyB0byBnZW5lcmF0ZSB0aGUgc3RyaW5nXG4gKi9cbmV4cG9ydCBsZXQgZnJvbUNvZGVQb2ludDogKC4uLmNvZGVQb2ludHM6IG51bWJlcltdKSA9PiBzdHJpbmc7XG5cbi8qKlxuICogYHJhd2AgaXMgaW50ZW5kZWQgZm9yIHVzZSBhcyBhIHRhZyBmdW5jdGlvbiBvZiBhIFRhZ2dlZCBUZW1wbGF0ZSBTdHJpbmcuIFdoZW4gY2FsbGVkXG4gKiBhcyBzdWNoIHRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGJlIGEgd2VsbCBmb3JtZWQgdGVtcGxhdGUgY2FsbCBzaXRlIG9iamVjdCBhbmQgdGhlIHJlc3RcbiAqIHBhcmFtZXRlciB3aWxsIGNvbnRhaW4gdGhlIHN1YnN0aXR1dGlvbiB2YWx1ZXMuXG4gKiBAcGFyYW0gdGVtcGxhdGUgQSB3ZWxsLWZvcm1lZCB0ZW1wbGF0ZSBzdHJpbmcgY2FsbCBzaXRlIHJlcHJlc2VudGF0aW9uLlxuICogQHBhcmFtIHN1YnN0aXR1dGlvbnMgQSBzZXQgb2Ygc3Vic3RpdHV0aW9uIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGxldCByYXc6ICh0ZW1wbGF0ZTogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLnN1YnN0aXR1dGlvbnM6IGFueVtdKSA9PiBzdHJpbmc7XG5cbi8qIEVTNiBpbnN0YW5jZSBtZXRob2RzICovXG5cbi8qKlxuICogUmV0dXJucyBhIG5vbm5lZ2F0aXZlIGludGVnZXIgTnVtYmVyIGxlc3MgdGhhbiAxMTE0MTEyICgweDExMDAwMCkgdGhhdCBpcyB0aGUgY29kZSBwb2ludFxuICogdmFsdWUgb2YgdGhlIFVURi0xNiBlbmNvZGVkIGNvZGUgcG9pbnQgc3RhcnRpbmcgYXQgdGhlIHN0cmluZyBlbGVtZW50IGF0IHBvc2l0aW9uIHBvcyBpblxuICogdGhlIFN0cmluZyByZXN1bHRpbmcgZnJvbSBjb252ZXJ0aW5nIHRoaXMgb2JqZWN0IHRvIGEgU3RyaW5nLlxuICogSWYgdGhlcmUgaXMgbm8gZWxlbWVudCBhdCB0aGF0IHBvc2l0aW9uLCB0aGUgcmVzdWx0IGlzIHVuZGVmaW5lZC5cbiAqIElmIGEgdmFsaWQgVVRGLTE2IHN1cnJvZ2F0ZSBwYWlyIGRvZXMgbm90IGJlZ2luIGF0IHBvcywgdGhlIHJlc3VsdCBpcyB0aGUgY29kZSB1bml0IGF0IHBvcy5cbiAqL1xuZXhwb3J0IGxldCBjb2RlUG9pbnRBdDogKHRhcmdldDogc3RyaW5nLCBwb3M/OiBudW1iZXIpID0+IG51bWJlciB8IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNlcXVlbmNlIG9mIGVsZW1lbnRzIG9mIHNlYXJjaFN0cmluZyBjb252ZXJ0ZWQgdG8gYSBTdHJpbmcgaXMgdGhlXG4gKiBzYW1lIGFzIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnRzIG9mIHRoaXMgb2JqZWN0IChjb252ZXJ0ZWQgdG8gYSBTdHJpbmcpIHN0YXJ0aW5nIGF0XG4gKiBlbmRQb3NpdGlvbiDigJMgbGVuZ3RoKHRoaXMpLiBPdGhlcndpc2UgcmV0dXJucyBmYWxzZS5cbiAqL1xuZXhwb3J0IGxldCBlbmRzV2l0aDogKHRhcmdldDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZywgZW5kUG9zaXRpb24/OiBudW1iZXIpID0+IGJvb2xlYW47XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHNlYXJjaFN0cmluZyBhcHBlYXJzIGFzIGEgc3Vic3RyaW5nIG9mIHRoZSByZXN1bHQgb2YgY29udmVydGluZyB0aGlzXG4gKiBvYmplY3QgdG8gYSBTdHJpbmcsIGF0IG9uZSBvciBtb3JlIHBvc2l0aW9ucyB0aGF0IGFyZVxuICogZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHBvc2l0aW9uOyBvdGhlcndpc2UsIHJldHVybnMgZmFsc2UuXG4gKiBAcGFyYW0gdGFyZ2V0IFRoZSB0YXJnZXQgc3RyaW5nXG4gKiBAcGFyYW0gc2VhcmNoU3RyaW5nIHNlYXJjaCBzdHJpbmdcbiAqIEBwYXJhbSBwb3NpdGlvbiBJZiBwb3NpdGlvbiBpcyB1bmRlZmluZWQsIDAgaXMgYXNzdW1lZCwgc28gYXMgdG8gc2VhcmNoIGFsbCBvZiB0aGUgU3RyaW5nLlxuICovXG5leHBvcnQgbGV0IGluY2x1ZGVzOiAodGFyZ2V0OiBzdHJpbmcsIHNlYXJjaFN0cmluZzogc3RyaW5nLCBwb3NpdGlvbj86IG51bWJlcikgPT4gYm9vbGVhbjtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBTdHJpbmcgdmFsdWUgcmVzdWx0IG9mIG5vcm1hbGl6aW5nIHRoZSBzdHJpbmcgaW50byB0aGUgbm9ybWFsaXphdGlvbiBmb3JtXG4gKiBuYW1lZCBieSBmb3JtIGFzIHNwZWNpZmllZCBpbiBVbmljb2RlIFN0YW5kYXJkIEFubmV4ICMxNSwgVW5pY29kZSBOb3JtYWxpemF0aW9uIEZvcm1zLlxuICogQHBhcmFtIHRhcmdldCBUaGUgdGFyZ2V0IHN0cmluZ1xuICogQHBhcmFtIGZvcm0gQXBwbGljYWJsZSB2YWx1ZXM6IFwiTkZDXCIsIFwiTkZEXCIsIFwiTkZLQ1wiLCBvciBcIk5GS0RcIiwgSWYgbm90IHNwZWNpZmllZCBkZWZhdWx0XG4gKiBpcyBcIk5GQ1wiXG4gKi9cbmV4cG9ydCBsZXQgbm9ybWFsaXplOiBTdHJpbmdOb3JtYWxpemU7XG5cbi8qKlxuICogUmV0dXJucyBhIFN0cmluZyB2YWx1ZSB0aGF0IGlzIG1hZGUgZnJvbSBjb3VudCBjb3BpZXMgYXBwZW5kZWQgdG9nZXRoZXIuIElmIGNvdW50IGlzIDAsXG4gKiBUIGlzIHRoZSBlbXB0eSBTdHJpbmcgaXMgcmV0dXJuZWQuXG4gKiBAcGFyYW0gY291bnQgbnVtYmVyIG9mIGNvcGllcyB0byBhcHBlbmRcbiAqL1xuZXhwb3J0IGxldCByZXBlYXQ6ICh0YXJnZXQ6IHN0cmluZywgY291bnQ/OiBudW1iZXIpID0+IHN0cmluZztcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNlcXVlbmNlIG9mIGVsZW1lbnRzIG9mIHNlYXJjaFN0cmluZyBjb252ZXJ0ZWQgdG8gYSBTdHJpbmcgaXMgdGhlXG4gKiBzYW1lIGFzIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnRzIG9mIHRoaXMgb2JqZWN0IChjb252ZXJ0ZWQgdG8gYSBTdHJpbmcpIHN0YXJ0aW5nIGF0XG4gKiBwb3NpdGlvbi4gT3RoZXJ3aXNlIHJldHVybnMgZmFsc2UuXG4gKi9cbmV4cG9ydCBsZXQgc3RhcnRzV2l0aDogKHRhcmdldDogc3RyaW5nLCBzZWFyY2hTdHJpbmc6IHN0cmluZywgcG9zaXRpb24/OiBudW1iZXIpID0+IGJvb2xlYW47XG5cbi8qIEVTNyBpbnN0YW5jZSBtZXRob2RzICovXG5cbi8qKlxuICogUGFkcyB0aGUgY3VycmVudCBzdHJpbmcgd2l0aCBhIGdpdmVuIHN0cmluZyAocG9zc2libHkgcmVwZWF0ZWQpIHNvIHRoYXQgdGhlIHJlc3VsdGluZyBzdHJpbmcgcmVhY2hlcyBhIGdpdmVuIGxlbmd0aC5cbiAqIFRoZSBwYWRkaW5nIGlzIGFwcGxpZWQgZnJvbSB0aGUgZW5kIChyaWdodCkgb2YgdGhlIGN1cnJlbnQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBzdHJpbmdcbiAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIGxlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHN0cmluZyBvbmNlIHRoZSBjdXJyZW50IHN0cmluZyBoYXMgYmVlbiBwYWRkZWQuXG4gKiAgICAgICAgSWYgdGhpcyBwYXJhbWV0ZXIgaXMgc21hbGxlciB0aGFuIHRoZSBjdXJyZW50IHN0cmluZydzIGxlbmd0aCwgdGhlIGN1cnJlbnQgc3RyaW5nIHdpbGwgYmUgcmV0dXJuZWQgYXMgaXQgaXMuXG4gKlxuICogQHBhcmFtIGZpbGxTdHJpbmcgVGhlIHN0cmluZyB0byBwYWQgdGhlIGN1cnJlbnQgc3RyaW5nIHdpdGguXG4gKiAgICAgICAgSWYgdGhpcyBzdHJpbmcgaXMgdG9vIGxvbmcsIGl0IHdpbGwgYmUgdHJ1bmNhdGVkIGFuZCB0aGUgbGVmdC1tb3N0IHBhcnQgd2lsbCBiZSBhcHBsaWVkLlxuICogICAgICAgIFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGlzIHBhcmFtZXRlciBpcyBcIiBcIiAoVSswMDIwKS5cbiAqL1xuZXhwb3J0IGxldCBwYWRFbmQ6ICh0YXJnZXQ6IHN0cmluZywgbWF4TGVuZ3RoOiBudW1iZXIsIGZpbGxTdHJpbmc/OiBzdHJpbmcpID0+IHN0cmluZztcblxuLyoqXG4gKiBQYWRzIHRoZSBjdXJyZW50IHN0cmluZyB3aXRoIGEgZ2l2ZW4gc3RyaW5nIChwb3NzaWJseSByZXBlYXRlZCkgc28gdGhhdCB0aGUgcmVzdWx0aW5nIHN0cmluZyByZWFjaGVzIGEgZ2l2ZW4gbGVuZ3RoLlxuICogVGhlIHBhZGRpbmcgaXMgYXBwbGllZCBmcm9tIHRoZSBzdGFydCAobGVmdCkgb2YgdGhlIGN1cnJlbnQgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIHRhcmdldCBzdHJpbmdcbiAqIEBwYXJhbSBtYXhMZW5ndGggVGhlIGxlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHN0cmluZyBvbmNlIHRoZSBjdXJyZW50IHN0cmluZyBoYXMgYmVlbiBwYWRkZWQuXG4gKiAgICAgICAgSWYgdGhpcyBwYXJhbWV0ZXIgaXMgc21hbGxlciB0aGFuIHRoZSBjdXJyZW50IHN0cmluZydzIGxlbmd0aCwgdGhlIGN1cnJlbnQgc3RyaW5nIHdpbGwgYmUgcmV0dXJuZWQgYXMgaXQgaXMuXG4gKlxuICogQHBhcmFtIGZpbGxTdHJpbmcgVGhlIHN0cmluZyB0byBwYWQgdGhlIGN1cnJlbnQgc3RyaW5nIHdpdGguXG4gKiAgICAgICAgSWYgdGhpcyBzdHJpbmcgaXMgdG9vIGxvbmcsIGl0IHdpbGwgYmUgdHJ1bmNhdGVkIGFuZCB0aGUgbGVmdC1tb3N0IHBhcnQgd2lsbCBiZSBhcHBsaWVkLlxuICogICAgICAgIFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGlzIHBhcmFtZXRlciBpcyBcIiBcIiAoVSswMDIwKS5cbiAqL1xuZXhwb3J0IGxldCBwYWRTdGFydDogKHRhcmdldDogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlciwgZmlsbFN0cmluZz86IHN0cmluZykgPT4gc3RyaW5nO1xuXG5pZiAoaGFzKCdlczYtc3RyaW5nJykgJiYgaGFzKCdlczYtc3RyaW5nLXJhdycpKSB7XG5cdGZyb21Db2RlUG9pbnQgPSBnbG9iYWwuU3RyaW5nLmZyb21Db2RlUG9pbnQ7XG5cdHJhdyA9IGdsb2JhbC5TdHJpbmcucmF3O1xuXG5cdGNvZGVQb2ludEF0ID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5jb2RlUG9pbnRBdCk7XG5cdGVuZHNXaXRoID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aCk7XG5cdGluY2x1ZGVzID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyk7XG5cdG5vcm1hbGl6ZSA9IHdyYXBOYXRpdmUoZ2xvYmFsLlN0cmluZy5wcm90b3R5cGUubm9ybWFsaXplKTtcblx0cmVwZWF0ID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5yZXBlYXQpO1xuXHRzdGFydHNXaXRoID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoKTtcbn0gZWxzZSB7XG5cdC8qKlxuXHQgKiBWYWxpZGF0ZXMgdGhhdCB0ZXh0IGlzIGRlZmluZWQsIGFuZCBub3JtYWxpemVzIHBvc2l0aW9uIChiYXNlZCBvbiB0aGUgZ2l2ZW4gZGVmYXVsdCBpZiB0aGUgaW5wdXQgaXMgTmFOKS5cblx0ICogVXNlZCBieSBzdGFydHNXaXRoLCBpbmNsdWRlcywgYW5kIGVuZHNXaXRoLlxuXHQgKlxuXHQgKiBAcmV0dXJuIE5vcm1hbGl6ZWQgcG9zaXRpb24uXG5cdCAqL1xuXHRjb25zdCBub3JtYWxpemVTdWJzdHJpbmdBcmdzID0gZnVuY3Rpb24oXG5cdFx0bmFtZTogc3RyaW5nLFxuXHRcdHRleHQ6IHN0cmluZyxcblx0XHRzZWFyY2g6IHN0cmluZyxcblx0XHRwb3NpdGlvbjogbnVtYmVyLFxuXHRcdGlzRW5kOiBib29sZWFuID0gZmFsc2Vcblx0KTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHtcblx0XHRpZiAodGV4dCA9PSBudWxsKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdzdHJpbmcuJyArIG5hbWUgKyAnIHJlcXVpcmVzIGEgdmFsaWQgc3RyaW5nIHRvIHNlYXJjaCBhZ2FpbnN0LicpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGxlbmd0aCA9IHRleHQubGVuZ3RoO1xuXHRcdHBvc2l0aW9uID0gcG9zaXRpb24gIT09IHBvc2l0aW9uID8gKGlzRW5kID8gbGVuZ3RoIDogMCkgOiBwb3NpdGlvbjtcblx0XHRyZXR1cm4gW3RleHQsIFN0cmluZyhzZWFyY2gpLCBNYXRoLm1pbihNYXRoLm1heChwb3NpdGlvbiwgMCksIGxlbmd0aCldO1xuXHR9O1xuXG5cdGZyb21Db2RlUG9pbnQgPSBmdW5jdGlvbiBmcm9tQ29kZVBvaW50KC4uLmNvZGVQb2ludHM6IG51bWJlcltdKTogc3RyaW5nIHtcblx0XHQvLyBBZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLmZyb21Db2RlUG9pbnRcblx0XHRjb25zdCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXHRcdGlmICghbGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblx0XHRjb25zdCBNQVhfU0laRSA9IDB4NDAwMDtcblx0XHRsZXQgY29kZVVuaXRzOiBudW1iZXJbXSA9IFtdO1xuXHRcdGxldCBpbmRleCA9IC0xO1xuXHRcdGxldCByZXN1bHQgPSAnJztcblxuXHRcdHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG5cdFx0XHRsZXQgY29kZVBvaW50ID0gTnVtYmVyKGFyZ3VtZW50c1tpbmRleF0pO1xuXG5cdFx0XHQvLyBDb2RlIHBvaW50cyBtdXN0IGJlIGZpbml0ZSBpbnRlZ2VycyB3aXRoaW4gdGhlIHZhbGlkIHJhbmdlXG5cdFx0XHRsZXQgaXNWYWxpZCA9XG5cdFx0XHRcdGlzRmluaXRlKGNvZGVQb2ludCkgJiYgTWF0aC5mbG9vcihjb2RlUG9pbnQpID09PSBjb2RlUG9pbnQgJiYgY29kZVBvaW50ID49IDAgJiYgY29kZVBvaW50IDw9IDB4MTBmZmZmO1xuXHRcdFx0aWYgKCFpc1ZhbGlkKSB7XG5cdFx0XHRcdHRocm93IFJhbmdlRXJyb3IoJ3N0cmluZy5mcm9tQ29kZVBvaW50OiBJbnZhbGlkIGNvZGUgcG9pbnQgJyArIGNvZGVQb2ludCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjb2RlUG9pbnQgPD0gMHhmZmZmKSB7XG5cdFx0XHRcdC8vIEJNUCBjb2RlIHBvaW50XG5cdFx0XHRcdGNvZGVVbml0cy5wdXNoKGNvZGVQb2ludCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyBBc3RyYWwgY29kZSBwb2ludDsgc3BsaXQgaW4gc3Vycm9nYXRlIGhhbHZlc1xuXHRcdFx0XHQvLyBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcblx0XHRcdFx0Y29kZVBvaW50IC09IDB4MTAwMDA7XG5cdFx0XHRcdGxldCBoaWdoU3Vycm9nYXRlID0gKGNvZGVQb2ludCA+PiAxMCkgKyBISUdIX1NVUlJPR0FURV9NSU47XG5cdFx0XHRcdGxldCBsb3dTdXJyb2dhdGUgPSBjb2RlUG9pbnQgJSAweDQwMCArIExPV19TVVJST0dBVEVfTUlOO1xuXHRcdFx0XHRjb2RlVW5pdHMucHVzaChoaWdoU3Vycm9nYXRlLCBsb3dTdXJyb2dhdGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaW5kZXggKyAxID09PSBsZW5ndGggfHwgY29kZVVuaXRzLmxlbmd0aCA+IE1BWF9TSVpFKSB7XG5cdFx0XHRcdHJlc3VsdCArPSBmcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgY29kZVVuaXRzKTtcblx0XHRcdFx0Y29kZVVuaXRzLmxlbmd0aCA9IDA7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0cmF3ID0gZnVuY3Rpb24gcmF3KGNhbGxTaXRlOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uc3Vic3RpdHV0aW9uczogYW55W10pOiBzdHJpbmcge1xuXHRcdGxldCByYXdTdHJpbmdzID0gY2FsbFNpdGUucmF3O1xuXHRcdGxldCByZXN1bHQgPSAnJztcblx0XHRsZXQgbnVtU3Vic3RpdHV0aW9ucyA9IHN1YnN0aXR1dGlvbnMubGVuZ3RoO1xuXG5cdFx0aWYgKGNhbGxTaXRlID09IG51bGwgfHwgY2FsbFNpdGUucmF3ID09IG51bGwpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmluZy5yYXcgcmVxdWlyZXMgYSB2YWxpZCBjYWxsU2l0ZSBvYmplY3Qgd2l0aCBhIHJhdyB2YWx1ZScpO1xuXHRcdH1cblxuXHRcdGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSByYXdTdHJpbmdzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdFx0XHRyZXN1bHQgKz0gcmF3U3RyaW5nc1tpXSArIChpIDwgbnVtU3Vic3RpdHV0aW9ucyAmJiBpIDwgbGVuZ3RoIC0gMSA/IHN1YnN0aXR1dGlvbnNbaV0gOiAnJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHRjb2RlUG9pbnRBdCA9IGZ1bmN0aW9uIGNvZGVQb2ludEF0KHRleHQ6IHN0cmluZywgcG9zaXRpb246IG51bWJlciA9IDApOiBudW1iZXIgfCB1bmRlZmluZWQge1xuXHRcdC8vIEFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbWF0aGlhc2J5bmVucy9TdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0XG5cdFx0aWYgKHRleHQgPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLmNvZGVQb2ludEF0IHJlcXVyaWVzIGEgdmFsaWQgc3RyaW5nLicpO1xuXHRcdH1cblx0XHRjb25zdCBsZW5ndGggPSB0ZXh0Lmxlbmd0aDtcblxuXHRcdGlmIChwb3NpdGlvbiAhPT0gcG9zaXRpb24pIHtcblx0XHRcdHBvc2l0aW9uID0gMDtcblx0XHR9XG5cdFx0aWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+PSBsZW5ndGgpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Ly8gR2V0IHRoZSBmaXJzdCBjb2RlIHVuaXRcblx0XHRjb25zdCBmaXJzdCA9IHRleHQuY2hhckNvZGVBdChwb3NpdGlvbik7XG5cdFx0aWYgKGZpcnN0ID49IEhJR0hfU1VSUk9HQVRFX01JTiAmJiBmaXJzdCA8PSBISUdIX1NVUlJPR0FURV9NQVggJiYgbGVuZ3RoID4gcG9zaXRpb24gKyAxKSB7XG5cdFx0XHQvLyBTdGFydCBvZiBhIHN1cnJvZ2F0ZSBwYWlyIChoaWdoIHN1cnJvZ2F0ZSBhbmQgdGhlcmUgaXMgYSBuZXh0IGNvZGUgdW5pdCk7IGNoZWNrIGZvciBsb3cgc3Vycm9nYXRlXG5cdFx0XHQvLyBodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZyNzdXJyb2dhdGUtZm9ybXVsYWVcblx0XHRcdGNvbnN0IHNlY29uZCA9IHRleHQuY2hhckNvZGVBdChwb3NpdGlvbiArIDEpO1xuXHRcdFx0aWYgKHNlY29uZCA+PSBMT1dfU1VSUk9HQVRFX01JTiAmJiBzZWNvbmQgPD0gTE9XX1NVUlJPR0FURV9NQVgpIHtcblx0XHRcdFx0cmV0dXJuIChmaXJzdCAtIEhJR0hfU1VSUk9HQVRFX01JTikgKiAweDQwMCArIHNlY29uZCAtIExPV19TVVJST0dBVEVfTUlOICsgMHgxMDAwMDtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZpcnN0O1xuXHR9O1xuXG5cdGVuZHNXaXRoID0gZnVuY3Rpb24gZW5kc1dpdGgodGV4dDogc3RyaW5nLCBzZWFyY2g6IHN0cmluZywgZW5kUG9zaXRpb24/OiBudW1iZXIpOiBib29sZWFuIHtcblx0XHRpZiAoZW5kUG9zaXRpb24gPT0gbnVsbCkge1xuXHRcdFx0ZW5kUG9zaXRpb24gPSB0ZXh0Lmxlbmd0aDtcblx0XHR9XG5cblx0XHRbdGV4dCwgc2VhcmNoLCBlbmRQb3NpdGlvbl0gPSBub3JtYWxpemVTdWJzdHJpbmdBcmdzKCdlbmRzV2l0aCcsIHRleHQsIHNlYXJjaCwgZW5kUG9zaXRpb24sIHRydWUpO1xuXG5cdFx0Y29uc3Qgc3RhcnQgPSBlbmRQb3NpdGlvbiAtIHNlYXJjaC5sZW5ndGg7XG5cdFx0aWYgKHN0YXJ0IDwgMCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0ZXh0LnNsaWNlKHN0YXJ0LCBlbmRQb3NpdGlvbikgPT09IHNlYXJjaDtcblx0fTtcblxuXHRpbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzKHRleHQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIgPSAwKTogYm9vbGVhbiB7XG5cdFx0W3RleHQsIHNlYXJjaCwgcG9zaXRpb25dID0gbm9ybWFsaXplU3Vic3RyaW5nQXJncygnaW5jbHVkZXMnLCB0ZXh0LCBzZWFyY2gsIHBvc2l0aW9uKTtcblx0XHRyZXR1cm4gdGV4dC5pbmRleE9mKHNlYXJjaCwgcG9zaXRpb24pICE9PSAtMTtcblx0fTtcblxuXHRyZXBlYXQgPSBmdW5jdGlvbiByZXBlYXQodGV4dDogc3RyaW5nLCBjb3VudDogbnVtYmVyID0gMCk6IHN0cmluZyB7XG5cdFx0Ly8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXRoaWFzYnluZW5zL1N0cmluZy5wcm90b3R5cGUucmVwZWF0XG5cdFx0aWYgKHRleHQgPT0gbnVsbCkge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignc3RyaW5nLnJlcGVhdCByZXF1aXJlcyBhIHZhbGlkIHN0cmluZy4nKTtcblx0XHR9XG5cdFx0aWYgKGNvdW50ICE9PSBjb3VudCkge1xuXHRcdFx0Y291bnQgPSAwO1xuXHRcdH1cblx0XHRpZiAoY291bnQgPCAwIHx8IGNvdW50ID09PSBJbmZpbml0eSkge1xuXHRcdFx0dGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3N0cmluZy5yZXBlYXQgcmVxdWlyZXMgYSBub24tbmVnYXRpdmUgZmluaXRlIGNvdW50LicpO1xuXHRcdH1cblxuXHRcdGxldCByZXN1bHQgPSAnJztcblx0XHR3aGlsZSAoY291bnQpIHtcblx0XHRcdGlmIChjb3VudCAlIDIpIHtcblx0XHRcdFx0cmVzdWx0ICs9IHRleHQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAoY291bnQgPiAxKSB7XG5cdFx0XHRcdHRleHQgKz0gdGV4dDtcblx0XHRcdH1cblx0XHRcdGNvdW50ID4+PSAxO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9O1xuXG5cdHN0YXJ0c1dpdGggPSBmdW5jdGlvbiBzdGFydHNXaXRoKHRleHQ6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIHBvc2l0aW9uOiBudW1iZXIgPSAwKTogYm9vbGVhbiB7XG5cdFx0c2VhcmNoID0gU3RyaW5nKHNlYXJjaCk7XG5cdFx0W3RleHQsIHNlYXJjaCwgcG9zaXRpb25dID0gbm9ybWFsaXplU3Vic3RyaW5nQXJncygnc3RhcnRzV2l0aCcsIHRleHQsIHNlYXJjaCwgcG9zaXRpb24pO1xuXG5cdFx0Y29uc3QgZW5kID0gcG9zaXRpb24gKyBzZWFyY2gubGVuZ3RoO1xuXHRcdGlmIChlbmQgPiB0ZXh0Lmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0ZXh0LnNsaWNlKHBvc2l0aW9uLCBlbmQpID09PSBzZWFyY2g7XG5cdH07XG59XG5cbmlmIChoYXMoJ2VzMjAxNy1zdHJpbmcnKSkge1xuXHRwYWRFbmQgPSB3cmFwTmF0aXZlKGdsb2JhbC5TdHJpbmcucHJvdG90eXBlLnBhZEVuZCk7XG5cdHBhZFN0YXJ0ID0gd3JhcE5hdGl2ZShnbG9iYWwuU3RyaW5nLnByb3RvdHlwZS5wYWRTdGFydCk7XG59IGVsc2Uge1xuXHRwYWRFbmQgPSBmdW5jdGlvbiBwYWRFbmQodGV4dDogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlciwgZmlsbFN0cmluZzogc3RyaW5nID0gJyAnKTogc3RyaW5nIHtcblx0XHRpZiAodGV4dCA9PT0gbnVsbCB8fCB0ZXh0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmluZy5yZXBlYXQgcmVxdWlyZXMgYSB2YWxpZCBzdHJpbmcuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKG1heExlbmd0aCA9PT0gSW5maW5pdHkpIHtcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdzdHJpbmcucGFkRW5kIHJlcXVpcmVzIGEgbm9uLW5lZ2F0aXZlIGZpbml0ZSBjb3VudC4nKTtcblx0XHR9XG5cblx0XHRpZiAobWF4TGVuZ3RoID09PSBudWxsIHx8IG1heExlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IG1heExlbmd0aCA8IDApIHtcblx0XHRcdG1heExlbmd0aCA9IDA7XG5cdFx0fVxuXG5cdFx0bGV0IHN0clRleHQgPSBTdHJpbmcodGV4dCk7XG5cdFx0Y29uc3QgcGFkZGluZyA9IG1heExlbmd0aCAtIHN0clRleHQubGVuZ3RoO1xuXG5cdFx0aWYgKHBhZGRpbmcgPiAwKSB7XG5cdFx0XHRzdHJUZXh0ICs9XG5cdFx0XHRcdHJlcGVhdChmaWxsU3RyaW5nLCBNYXRoLmZsb29yKHBhZGRpbmcgLyBmaWxsU3RyaW5nLmxlbmd0aCkpICtcblx0XHRcdFx0ZmlsbFN0cmluZy5zbGljZSgwLCBwYWRkaW5nICUgZmlsbFN0cmluZy5sZW5ndGgpO1xuXHRcdH1cblxuXHRcdHJldHVybiBzdHJUZXh0O1xuXHR9O1xuXG5cdHBhZFN0YXJ0ID0gZnVuY3Rpb24gcGFkU3RhcnQodGV4dDogc3RyaW5nLCBtYXhMZW5ndGg6IG51bWJlciwgZmlsbFN0cmluZzogc3RyaW5nID0gJyAnKTogc3RyaW5nIHtcblx0XHRpZiAodGV4dCA9PT0gbnVsbCB8fCB0ZXh0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ3N0cmluZy5yZXBlYXQgcmVxdWlyZXMgYSB2YWxpZCBzdHJpbmcuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKG1heExlbmd0aCA9PT0gSW5maW5pdHkpIHtcblx0XHRcdHRocm93IG5ldyBSYW5nZUVycm9yKCdzdHJpbmcucGFkU3RhcnQgcmVxdWlyZXMgYSBub24tbmVnYXRpdmUgZmluaXRlIGNvdW50LicpO1xuXHRcdH1cblxuXHRcdGlmIChtYXhMZW5ndGggPT09IG51bGwgfHwgbWF4TGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbWF4TGVuZ3RoIDwgMCkge1xuXHRcdFx0bWF4TGVuZ3RoID0gMDtcblx0XHR9XG5cblx0XHRsZXQgc3RyVGV4dCA9IFN0cmluZyh0ZXh0KTtcblx0XHRjb25zdCBwYWRkaW5nID0gbWF4TGVuZ3RoIC0gc3RyVGV4dC5sZW5ndGg7XG5cblx0XHRpZiAocGFkZGluZyA+IDApIHtcblx0XHRcdHN0clRleHQgPVxuXHRcdFx0XHRyZXBlYXQoZmlsbFN0cmluZywgTWF0aC5mbG9vcihwYWRkaW5nIC8gZmlsbFN0cmluZy5sZW5ndGgpKSArXG5cdFx0XHRcdGZpbGxTdHJpbmcuc2xpY2UoMCwgcGFkZGluZyAlIGZpbGxTdHJpbmcubGVuZ3RoKSArXG5cdFx0XHRcdHN0clRleHQ7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0clRleHQ7XG5cdH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3RyaW5nLnRzIiwiaW1wb3J0IGdsb2JhbCBmcm9tICcuLi9nbG9iYWwnO1xuaW1wb3J0IGhhcyBmcm9tICcuL2hhcyc7XG5pbXBvcnQgeyBIYW5kbGUgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcblxuZnVuY3Rpb24gZXhlY3V0ZVRhc2soaXRlbTogUXVldWVJdGVtIHwgdW5kZWZpbmVkKTogdm9pZCB7XG5cdGlmIChpdGVtICYmIGl0ZW0uaXNBY3RpdmUgJiYgaXRlbS5jYWxsYmFjaykge1xuXHRcdGl0ZW0uY2FsbGJhY2soKTtcblx0fVxufVxuXG5mdW5jdGlvbiBnZXRRdWV1ZUhhbmRsZShpdGVtOiBRdWV1ZUl0ZW0sIGRlc3RydWN0b3I/OiAoLi4uYXJnczogYW55W10pID0+IGFueSk6IEhhbmRsZSB7XG5cdHJldHVybiB7XG5cdFx0ZGVzdHJveTogZnVuY3Rpb24odGhpczogSGFuZGxlKSB7XG5cdFx0XHR0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHt9O1xuXHRcdFx0aXRlbS5pc0FjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0aXRlbS5jYWxsYmFjayA9IG51bGw7XG5cblx0XHRcdGlmIChkZXN0cnVjdG9yKSB7XG5cdFx0XHRcdGRlc3RydWN0b3IoKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG5cbmludGVyZmFjZSBQb3N0TWVzc2FnZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuXHRzb3VyY2U6IGFueTtcblx0ZGF0YTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXVlSXRlbSB7XG5cdGlzQWN0aXZlOiBib29sZWFuO1xuXHRjYWxsYmFjazogbnVsbCB8ICgoLi4uYXJnczogYW55W10pID0+IGFueSk7XG59XG5cbmxldCBjaGVja01pY3JvVGFza1F1ZXVlOiAoKSA9PiB2b2lkO1xubGV0IG1pY3JvVGFza3M6IFF1ZXVlSXRlbVtdO1xuXG4vKipcbiAqIFNjaGVkdWxlcyBhIGNhbGxiYWNrIHRvIHRoZSBtYWNyb3Rhc2sgcXVldWUuXG4gKlxuICogQHBhcmFtIGNhbGxiYWNrIHRoZSBmdW5jdGlvbiB0byBiZSBxdWV1ZWQgYW5kIGxhdGVyIGV4ZWN1dGVkLlxuICogQHJldHVybnMgQW4gb2JqZWN0IHdpdGggYSBgZGVzdHJveWAgbWV0aG9kIHRoYXQsIHdoZW4gY2FsbGVkLCBwcmV2ZW50cyB0aGUgcmVnaXN0ZXJlZCBjYWxsYmFjayBmcm9tIGV4ZWN1dGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IHF1ZXVlVGFzayA9IChmdW5jdGlvbigpIHtcblx0bGV0IGRlc3RydWN0b3I6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuXHRsZXQgZW5xdWV1ZTogKGl0ZW06IFF1ZXVlSXRlbSkgPT4gdm9pZDtcblxuXHQvLyBTaW5jZSB0aGUgSUUgaW1wbGVtZW50YXRpb24gb2YgYHNldEltbWVkaWF0ZWAgaXMgbm90IGZsYXdsZXNzLCB3ZSB3aWxsIHRlc3QgZm9yIGBwb3N0TWVzc2FnZWAgZmlyc3QuXG5cdGlmIChoYXMoJ3Bvc3RtZXNzYWdlJykpIHtcblx0XHRjb25zdCBxdWV1ZTogUXVldWVJdGVtW10gPSBbXTtcblxuXHRcdGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZXZlbnQ6IFBvc3RNZXNzYWdlRXZlbnQpOiB2b2lkIHtcblx0XHRcdC8vIENvbmZpcm0gdGhhdCB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBieSB0aGUgY3VycmVudCB3aW5kb3cgYW5kIGJ5IHRoaXMgcGFydGljdWxhciBpbXBsZW1lbnRhdGlvbi5cblx0XHRcdGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJiBldmVudC5kYXRhID09PSAnZG9qby1xdWV1ZS1tZXNzYWdlJykge1xuXHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRpZiAocXVldWUubGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZXhlY3V0ZVRhc2socXVldWUuc2hpZnQoKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGVucXVldWUgPSBmdW5jdGlvbihpdGVtOiBRdWV1ZUl0ZW0pOiB2b2lkIHtcblx0XHRcdHF1ZXVlLnB1c2goaXRlbSk7XG5cdFx0XHRnbG9iYWwucG9zdE1lc3NhZ2UoJ2Rvam8tcXVldWUtbWVzc2FnZScsICcqJyk7XG5cdFx0fTtcblx0fSBlbHNlIGlmIChoYXMoJ3NldGltbWVkaWF0ZScpKSB7XG5cdFx0ZGVzdHJ1Y3RvciA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcblx0XHRlbnF1ZXVlID0gZnVuY3Rpb24oaXRlbTogUXVldWVJdGVtKTogYW55IHtcblx0XHRcdHJldHVybiBzZXRJbW1lZGlhdGUoZXhlY3V0ZVRhc2suYmluZChudWxsLCBpdGVtKSk7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRkZXN0cnVjdG9yID0gZ2xvYmFsLmNsZWFyVGltZW91dDtcblx0XHRlbnF1ZXVlID0gZnVuY3Rpb24oaXRlbTogUXVldWVJdGVtKTogYW55IHtcblx0XHRcdHJldHVybiBzZXRUaW1lb3V0KGV4ZWN1dGVUYXNrLmJpbmQobnVsbCwgaXRlbSksIDApO1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBxdWV1ZVRhc2soY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogSGFuZGxlIHtcblx0XHRjb25zdCBpdGVtOiBRdWV1ZUl0ZW0gPSB7XG5cdFx0XHRpc0FjdGl2ZTogdHJ1ZSxcblx0XHRcdGNhbGxiYWNrOiBjYWxsYmFja1xuXHRcdH07XG5cdFx0Y29uc3QgaWQ6IGFueSA9IGVucXVldWUoaXRlbSk7XG5cblx0XHRyZXR1cm4gZ2V0UXVldWVIYW5kbGUoXG5cdFx0XHRpdGVtLFxuXHRcdFx0ZGVzdHJ1Y3RvciAmJlxuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRkZXN0cnVjdG9yKGlkKTtcblx0XHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHQvLyBUT0RPOiBVc2UgYXNwZWN0LmJlZm9yZSB3aGVuIGl0IGlzIGF2YWlsYWJsZS5cblx0cmV0dXJuIGhhcygnbWljcm90YXNrcycpXG5cdFx0PyBxdWV1ZVRhc2tcblx0XHQ6IGZ1bmN0aW9uKGNhbGxiYWNrOiAoLi4uYXJnczogYW55W10pID0+IGFueSk6IEhhbmRsZSB7XG5cdFx0XHRcdGNoZWNrTWljcm9UYXNrUXVldWUoKTtcblx0XHRcdFx0cmV0dXJuIHF1ZXVlVGFzayhjYWxsYmFjayk7XG5cdFx0XHR9O1xufSkoKTtcblxuLy8gV2hlbiBubyBtZWNoYW5pc20gZm9yIHJlZ2lzdGVyaW5nIG1pY3JvdGFza3MgaXMgZXhwb3NlZCBieSB0aGUgZW52aXJvbm1lbnQsIG1pY3JvdGFza3Mgd2lsbFxuLy8gYmUgcXVldWVkIGFuZCB0aGVuIGV4ZWN1dGVkIGluIGEgc2luZ2xlIG1hY3JvdGFzayBiZWZvcmUgdGhlIG90aGVyIG1hY3JvdGFza3MgYXJlIGV4ZWN1dGVkLlxuaWYgKCFoYXMoJ21pY3JvdGFza3MnKSkge1xuXHRsZXQgaXNNaWNyb1Rhc2tRdWV1ZWQgPSBmYWxzZTtcblxuXHRtaWNyb1Rhc2tzID0gW107XG5cdGNoZWNrTWljcm9UYXNrUXVldWUgPSBmdW5jdGlvbigpOiB2b2lkIHtcblx0XHRpZiAoIWlzTWljcm9UYXNrUXVldWVkKSB7XG5cdFx0XHRpc01pY3JvVGFza1F1ZXVlZCA9IHRydWU7XG5cdFx0XHRxdWV1ZVRhc2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlzTWljcm9UYXNrUXVldWVkID0gZmFsc2U7XG5cblx0XHRcdFx0aWYgKG1pY3JvVGFza3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0bGV0IGl0ZW06IFF1ZXVlSXRlbSB8IHVuZGVmaW5lZDtcblx0XHRcdFx0XHR3aGlsZSAoKGl0ZW0gPSBtaWNyb1Rhc2tzLnNoaWZ0KCkpKSB7XG5cdFx0XHRcdFx0XHRleGVjdXRlVGFzayhpdGVtKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcbn1cblxuLyoqXG4gKiBTY2hlZHVsZXMgYW4gYW5pbWF0aW9uIHRhc2sgd2l0aCBgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZWAgaWYgaXQgZXhpc3RzLCBvciB3aXRoIGBxdWV1ZVRhc2tgIG90aGVyd2lzZS5cbiAqXG4gKiBTaW5jZSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUncyBiZWhhdmlvciBkb2VzIG5vdCBtYXRjaCB0aGF0IGV4cGVjdGVkIGZyb20gYHF1ZXVlVGFza2AsIGl0IGlzIG5vdCB1c2VkIHRoZXJlLlxuICogSG93ZXZlciwgYXQgdGltZXMgaXQgbWFrZXMgbW9yZSBzZW5zZSB0byBkZWxlZ2F0ZSB0byByZXF1ZXN0QW5pbWF0aW9uRnJhbWU7IGhlbmNlIHRoZSBmb2xsb3dpbmcgbWV0aG9kLlxuICpcbiAqIEBwYXJhbSBjYWxsYmFjayB0aGUgZnVuY3Rpb24gdG8gYmUgcXVldWVkIGFuZCBsYXRlciBleGVjdXRlZC5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIGEgYGRlc3Ryb3lgIG1ldGhvZCB0aGF0LCB3aGVuIGNhbGxlZCwgcHJldmVudHMgdGhlIHJlZ2lzdGVyZWQgY2FsbGJhY2sgZnJvbSBleGVjdXRpbmcuXG4gKi9cbmV4cG9ydCBjb25zdCBxdWV1ZUFuaW1hdGlvblRhc2sgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICghaGFzKCdyYWYnKSkge1xuXHRcdHJldHVybiBxdWV1ZVRhc2s7XG5cdH1cblxuXHRmdW5jdGlvbiBxdWV1ZUFuaW1hdGlvblRhc2soY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogSGFuZGxlIHtcblx0XHRjb25zdCBpdGVtOiBRdWV1ZUl0ZW0gPSB7XG5cdFx0XHRpc0FjdGl2ZTogdHJ1ZSxcblx0XHRcdGNhbGxiYWNrOiBjYWxsYmFja1xuXHRcdH07XG5cdFx0Y29uc3QgcmFmSWQ6IG51bWJlciA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShleGVjdXRlVGFzay5iaW5kKG51bGwsIGl0ZW0pKTtcblxuXHRcdHJldHVybiBnZXRRdWV1ZUhhbmRsZShpdGVtLCBmdW5jdGlvbigpIHtcblx0XHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZklkKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIFRPRE86IFVzZSBhc3BlY3QuYmVmb3JlIHdoZW4gaXQgaXMgYXZhaWxhYmxlLlxuXHRyZXR1cm4gaGFzKCdtaWNyb3Rhc2tzJylcblx0XHQ/IHF1ZXVlQW5pbWF0aW9uVGFza1xuXHRcdDogZnVuY3Rpb24oY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogSGFuZGxlIHtcblx0XHRcdFx0Y2hlY2tNaWNyb1Rhc2tRdWV1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gcXVldWVBbmltYXRpb25UYXNrKGNhbGxiYWNrKTtcblx0XHRcdH07XG59KSgpO1xuXG4vKipcbiAqIFNjaGVkdWxlcyBhIGNhbGxiYWNrIHRvIHRoZSBtaWNyb3Rhc2sgcXVldWUuXG4gKlxuICogQW55IGNhbGxiYWNrcyByZWdpc3RlcmVkIHdpdGggYHF1ZXVlTWljcm9UYXNrYCB3aWxsIGJlIGV4ZWN1dGVkIGJlZm9yZSB0aGUgbmV4dCBtYWNyb3Rhc2suIElmIG5vIG5hdGl2ZVxuICogbWVjaGFuaXNtIGZvciBzY2hlZHVsaW5nIG1hY3JvdGFza3MgaXMgZXhwb3NlZCwgdGhlbiBhbnkgY2FsbGJhY2tzIHdpbGwgYmUgZmlyZWQgYmVmb3JlIGFueSBtYWNyb3Rhc2tcbiAqIHJlZ2lzdGVyZWQgd2l0aCBgcXVldWVUYXNrYCBvciBgcXVldWVBbmltYXRpb25UYXNrYC5cbiAqXG4gKiBAcGFyYW0gY2FsbGJhY2sgdGhlIGZ1bmN0aW9uIHRvIGJlIHF1ZXVlZCBhbmQgbGF0ZXIgZXhlY3V0ZWQuXG4gKiBAcmV0dXJucyBBbiBvYmplY3Qgd2l0aCBhIGBkZXN0cm95YCBtZXRob2QgdGhhdCwgd2hlbiBjYWxsZWQsIHByZXZlbnRzIHRoZSByZWdpc3RlcmVkIGNhbGxiYWNrIGZyb20gZXhlY3V0aW5nLlxuICovXG5leHBvcnQgbGV0IHF1ZXVlTWljcm9UYXNrID0gKGZ1bmN0aW9uKCkge1xuXHRsZXQgZW5xdWV1ZTogKGl0ZW06IFF1ZXVlSXRlbSkgPT4gdm9pZDtcblxuXHRpZiAoaGFzKCdob3N0LW5vZGUnKSkge1xuXHRcdGVucXVldWUgPSBmdW5jdGlvbihpdGVtOiBRdWV1ZUl0ZW0pOiB2b2lkIHtcblx0XHRcdGdsb2JhbC5wcm9jZXNzLm5leHRUaWNrKGV4ZWN1dGVUYXNrLmJpbmQobnVsbCwgaXRlbSkpO1xuXHRcdH07XG5cdH0gZWxzZSBpZiAoaGFzKCdlczYtcHJvbWlzZScpKSB7XG5cdFx0ZW5xdWV1ZSA9IGZ1bmN0aW9uKGl0ZW06IFF1ZXVlSXRlbSk6IHZvaWQge1xuXHRcdFx0Z2xvYmFsLlByb21pc2UucmVzb2x2ZShpdGVtKS50aGVuKGV4ZWN1dGVUYXNrKTtcblx0XHR9O1xuXHR9IGVsc2UgaWYgKGhhcygnZG9tLW11dGF0aW9ub2JzZXJ2ZXInKSkge1xuXHRcdC8qIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTp2YXJpYWJsZS1uYW1lICovXG5cdFx0Y29uc3QgSG9zdE11dGF0aW9uT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcblx0XHRjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0Y29uc3QgcXVldWU6IFF1ZXVlSXRlbVtdID0gW107XG5cdFx0Y29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSG9zdE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24oKTogdm9pZCB7XG5cdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBpdGVtID0gcXVldWUuc2hpZnQoKTtcblx0XHRcdFx0aWYgKGl0ZW0gJiYgaXRlbS5pc0FjdGl2ZSAmJiBpdGVtLmNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0aXRlbS5jYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHsgYXR0cmlidXRlczogdHJ1ZSB9KTtcblxuXHRcdGVucXVldWUgPSBmdW5jdGlvbihpdGVtOiBRdWV1ZUl0ZW0pOiB2b2lkIHtcblx0XHRcdHF1ZXVlLnB1c2goaXRlbSk7XG5cdFx0XHRub2RlLnNldEF0dHJpYnV0ZSgncXVldWVTdGF0dXMnLCAnMScpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0ZW5xdWV1ZSA9IGZ1bmN0aW9uKGl0ZW06IFF1ZXVlSXRlbSk6IHZvaWQge1xuXHRcdFx0Y2hlY2tNaWNyb1Rhc2tRdWV1ZSgpO1xuXHRcdFx0bWljcm9UYXNrcy5wdXNoKGl0ZW0pO1xuXHRcdH07XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24oY2FsbGJhY2s6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55KTogSGFuZGxlIHtcblx0XHRjb25zdCBpdGVtOiBRdWV1ZUl0ZW0gPSB7XG5cdFx0XHRpc0FjdGl2ZTogdHJ1ZSxcblx0XHRcdGNhbGxiYWNrOiBjYWxsYmFja1xuXHRcdH07XG5cblx0XHRlbnF1ZXVlKGl0ZW0pO1xuXG5cdFx0cmV0dXJuIGdldFF1ZXVlSGFuZGxlKGl0ZW0pO1xuXHR9O1xufSkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBxdWV1ZS50cyIsIi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGEgdmFsdWUgcHJvcGVydHkgZGVzY3JpcHRvclxuICpcbiAqIEBwYXJhbSB2YWx1ZSAgICAgICAgVGhlIHZhbHVlIHRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHNob3VsZCBiZSBzZXQgdG9cbiAqIEBwYXJhbSBlbnVtZXJhYmxlICAgSWYgdGhlIHByb3BlcnR5IHNob3VsZCBiZSBlbnVtYmVyYWJsZSwgZGVmYXVsdHMgdG8gZmFsc2VcbiAqIEBwYXJhbSB3cml0YWJsZSAgICAgSWYgdGhlIHByb3BlcnR5IHNob3VsZCBiZSB3cml0YWJsZSwgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHBhcmFtIGNvbmZpZ3VyYWJsZSBJZiB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIGNvbmZpZ3VyYWJsZSwgZGVmYXVsdHMgdG8gdHJ1ZVxuICogQHJldHVybiAgICAgICAgICAgICBUaGUgcHJvcGVydHkgZGVzY3JpcHRvciBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFZhbHVlRGVzY3JpcHRvcjxUPihcblx0dmFsdWU6IFQsXG5cdGVudW1lcmFibGU6IGJvb2xlYW4gPSBmYWxzZSxcblx0d3JpdGFibGU6IGJvb2xlYW4gPSB0cnVlLFxuXHRjb25maWd1cmFibGU6IGJvb2xlYW4gPSB0cnVlXG4pOiBUeXBlZFByb3BlcnR5RGVzY3JpcHRvcjxUPiB7XG5cdHJldHVybiB7XG5cdFx0dmFsdWU6IHZhbHVlLFxuXHRcdGVudW1lcmFibGU6IGVudW1lcmFibGUsXG5cdFx0d3JpdGFibGU6IHdyaXRhYmxlLFxuXHRcdGNvbmZpZ3VyYWJsZTogY29uZmlndXJhYmxlXG5cdH07XG59XG5cbi8qKlxuICogQSBoZWxwZXIgZnVuY3Rpb24gd2hpY2ggd3JhcHMgYSBmdW5jdGlvbiB3aGVyZSB0aGUgZmlyc3QgYXJndW1lbnQgYmVjb21lcyB0aGUgc2NvcGVcbiAqIG9mIHRoZSBjYWxsXG4gKlxuICogQHBhcmFtIG5hdGl2ZUZ1bmN0aW9uIFRoZSBzb3VyY2UgZnVuY3Rpb24gdG8gYmUgd3JhcHBlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gd3JhcE5hdGl2ZTxULCBVLCBSPihuYXRpdmVGdW5jdGlvbjogKGFyZzE6IFUpID0+IFIpOiAodGFyZ2V0OiBULCBhcmcxOiBVKSA9PiBSO1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXBOYXRpdmU8VCwgVSwgViwgUj4obmF0aXZlRnVuY3Rpb246IChhcmcxOiBVLCBhcmcyOiBWKSA9PiBSKTogKHRhcmdldDogVCwgYXJnMTogVSwgYXJnMjogVikgPT4gUjtcbmV4cG9ydCBmdW5jdGlvbiB3cmFwTmF0aXZlPFQsIFUsIFYsIFcsIFI+KFxuXHRuYXRpdmVGdW5jdGlvbjogKGFyZzE6IFUsIGFyZzI6IFYsIGFyZzM6IFcpID0+IFJcbik6ICh0YXJnZXQ6IFQsIGFyZzE6IFUsIGFyZzI6IFYsIGFyZzM6IFcpID0+IFI7XG5leHBvcnQgZnVuY3Rpb24gd3JhcE5hdGl2ZTxULCBVLCBWLCBXLCBYLCBSPihcblx0bmF0aXZlRnVuY3Rpb246IChhcmcxOiBVLCBhcmcyOiBWLCBhcmczOiBXKSA9PiBSXG4pOiAodGFyZ2V0OiBULCBhcmcxOiBVLCBhcmcyOiBWLCBhcmczOiBXKSA9PiBSO1xuZXhwb3J0IGZ1bmN0aW9uIHdyYXBOYXRpdmU8VCwgVSwgViwgVywgWCwgWSwgUj4oXG5cdG5hdGl2ZUZ1bmN0aW9uOiAoYXJnMTogVSwgYXJnMjogViwgYXJnMzogVywgYXJnNDogWSkgPT4gUlxuKTogKHRhcmdldDogVCwgYXJnMTogVSwgYXJnMjogViwgYXJnMzogVywgYXJnNDogWSkgPT4gUjtcbmV4cG9ydCBmdW5jdGlvbiB3cmFwTmF0aXZlKG5hdGl2ZUZ1bmN0aW9uOiAoLi4uYXJnczogYW55W10pID0+IGFueSk6ICh0YXJnZXQ6IGFueSwgLi4uYXJnczogYW55W10pID0+IGFueSB7XG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQ6IGFueSwgLi4uYXJnczogYW55W10pOiBhbnkge1xuXHRcdHJldHVybiBuYXRpdmVGdW5jdGlvbi5hcHBseSh0YXJnZXQsIGFyZ3MpO1xuXHR9O1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHV0aWwudHMiLCJpbXBvcnQgeyBFdmVudGVkIH0gZnJvbSAnQGRvam8vY29yZS9FdmVudGVkJztcbmltcG9ydCB7IEV2ZW50T2JqZWN0IH0gZnJvbSAnQGRvam8vY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCBNYXAgZnJvbSAnQGRvam8vc2hpbS9NYXAnO1xuaW1wb3J0IHsgTm9kZUhhbmRsZXJJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG4vKipcbiAqIEVudW0gdG8gaWRlbnRpZnkgdGhlIHR5cGUgb2YgZXZlbnQuXG4gKiBMaXN0ZW5pbmcgdG8gJ1Byb2plY3Rvcicgd2lsbCBub3RpZnkgd2hlbiBwcm9qZWN0b3IgaXMgY3JlYXRlZCBvciB1cGRhdGVkXG4gKiBMaXN0ZW5pbmcgdG8gJ1dpZGdldCcgd2lsbCBub3RpZnkgd2hlbiB3aWRnZXQgcm9vdCBpcyBjcmVhdGVkIG9yIHVwZGF0ZWRcbiAqL1xuZXhwb3J0IGVudW0gTm9kZUV2ZW50VHlwZSB7XG5cdFByb2plY3RvciA9ICdQcm9qZWN0b3InLFxuXHRXaWRnZXQgPSAnV2lkZ2V0J1xufVxuXG5leHBvcnQgdHlwZSBOb2RlSGFuZGxlckV2ZW50TWFwID0ge1xuXHRQcm9qZWN0b3I6IEV2ZW50T2JqZWN0PE5vZGVFdmVudFR5cGUuUHJvamVjdG9yPjtcblx0V2lkZ2V0OiBFdmVudE9iamVjdDxOb2RlRXZlbnRUeXBlLldpZGdldD47XG59O1xuXG5leHBvcnQgY2xhc3MgTm9kZUhhbmRsZXIgZXh0ZW5kcyBFdmVudGVkPE5vZGVIYW5kbGVyRXZlbnRNYXA+IGltcGxlbWVudHMgTm9kZUhhbmRsZXJJbnRlcmZhY2Uge1xuXHRwcml2YXRlIF9ub2RlTWFwID0gbmV3IE1hcDxzdHJpbmcsIEVsZW1lbnQ+KCk7XG5cblx0cHVibGljIGdldChrZXk6IHN0cmluZyk6IEVsZW1lbnQgfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB0aGlzLl9ub2RlTWFwLmdldChrZXkpO1xuXHR9XG5cblx0cHVibGljIGhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9ub2RlTWFwLmhhcyhrZXkpO1xuXHR9XG5cblx0cHVibGljIGFkZChlbGVtZW50OiBFbGVtZW50LCBrZXk6IHN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMuX25vZGVNYXAuc2V0KGtleSwgZWxlbWVudCk7XG5cdFx0dGhpcy5lbWl0KHsgdHlwZToga2V5IH0pO1xuXHR9XG5cblx0cHVibGljIGFkZFJvb3QoKTogdm9pZCB7XG5cdFx0dGhpcy5lbWl0KHsgdHlwZTogTm9kZUV2ZW50VHlwZS5XaWRnZXQgfSk7XG5cdH1cblxuXHRwdWJsaWMgYWRkUHJvamVjdG9yKCk6IHZvaWQge1xuXHRcdHRoaXMuZW1pdCh7IHR5cGU6IE5vZGVFdmVudFR5cGUuUHJvamVjdG9yIH0pO1xuXHR9XG5cblx0cHVibGljIGNsZWFyKCk6IHZvaWQge1xuXHRcdHRoaXMuX25vZGVNYXAuY2xlYXIoKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlSGFuZGxlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBOb2RlSGFuZGxlci50cyIsImltcG9ydCBQcm9taXNlIGZyb20gJ0Bkb2pvL3NoaW0vUHJvbWlzZSc7XG5pbXBvcnQgTWFwIGZyb20gJ0Bkb2pvL3NoaW0vTWFwJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnQGRvam8vc2hpbS9TeW1ib2wnO1xuaW1wb3J0IHsgRXZlbnRPYmplY3QgfSBmcm9tICdAZG9qby9jb3JlL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRXZlbnRlZCB9IGZyb20gJ0Bkb2pvL2NvcmUvRXZlbnRlZCc7XG5pbXBvcnQge1xuXHRDb25zdHJ1Y3Rvcixcblx0SW5qZWN0b3JGYWN0b3J5LFxuXHRJbmplY3Rvckl0ZW0sXG5cdFJlZ2lzdHJ5TGFiZWwsXG5cdFdpZGdldEJhc2VDb25zdHJ1Y3Rvcixcblx0V2lkZ2V0QmFzZUludGVyZmFjZVxufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5leHBvcnQgdHlwZSBXaWRnZXRCYXNlQ29uc3RydWN0b3JGdW5jdGlvbiA9ICgpID0+IFByb21pc2U8V2lkZ2V0QmFzZUNvbnN0cnVjdG9yPjtcblxuZXhwb3J0IHR5cGUgRVNNRGVmYXVsdFdpZGdldEJhc2VGdW5jdGlvbiA9ICgpID0+IFByb21pc2U8RVNNRGVmYXVsdFdpZGdldEJhc2U8V2lkZ2V0QmFzZUludGVyZmFjZT4+O1xuXG5leHBvcnQgdHlwZSBSZWdpc3RyeUl0ZW0gPVxuXHR8IFdpZGdldEJhc2VDb25zdHJ1Y3RvclxuXHR8IFByb21pc2U8V2lkZ2V0QmFzZUNvbnN0cnVjdG9yPlxuXHR8IFdpZGdldEJhc2VDb25zdHJ1Y3RvckZ1bmN0aW9uXG5cdHwgRVNNRGVmYXVsdFdpZGdldEJhc2VGdW5jdGlvbjtcblxuLyoqXG4gKiBXaWRnZXQgYmFzZSBzeW1ib2wgdHlwZVxuICovXG5leHBvcnQgY29uc3QgV0lER0VUX0JBU0VfVFlQRSA9IFN5bWJvbCgnV2lkZ2V0IEJhc2UnKTtcblxuZXhwb3J0IGludGVyZmFjZSBSZWdpc3RyeUV2ZW50T2JqZWN0IGV4dGVuZHMgRXZlbnRPYmplY3Q8UmVnaXN0cnlMYWJlbD4ge1xuXHRhY3Rpb246IHN0cmluZztcblx0aXRlbTogV2lkZ2V0QmFzZUNvbnN0cnVjdG9yIHwgSW5qZWN0b3JGYWN0b3J5O1xufVxuLyoqXG4gKiBXaWRnZXQgUmVnaXN0cnkgSW50ZXJmYWNlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmVnaXN0cnlJbnRlcmZhY2Uge1xuXHQvKipcblx0ICogRGVmaW5lIGEgV2lkZ2V0UmVnaXN0cnlJdGVtIGFnYWluc3QgYSBsYWJlbFxuXHQgKlxuXHQgKiBAcGFyYW0gbGFiZWwgVGhlIGxhYmVsIG9mIHRoZSB3aWRnZXQgdG8gcmVnaXN0ZXJcblx0ICogQHBhcmFtIHJlZ2lzdHJ5SXRlbSBUaGUgcmVnaXN0cnkgaXRlbSB0byBkZWZpbmVcblx0ICovXG5cdGRlZmluZShsYWJlbDogUmVnaXN0cnlMYWJlbCwgcmVnaXN0cnlJdGVtOiBSZWdpc3RyeUl0ZW0pOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBSZWdpc3RyeUl0ZW0gZm9yIHRoZSBnaXZlbiBsYWJlbCwgbnVsbCBpZiBhbiBlbnRyeSBkb2Vzbid0IGV4aXN0XG5cdCAqXG5cdCAqIEBwYXJhbSB3aWRnZXRMYWJlbCBUaGUgbGFiZWwgb2YgdGhlIHdpZGdldCB0byByZXR1cm5cblx0ICogQHJldHVybnMgVGhlIFJlZ2lzdHJ5SXRlbSBmb3IgdGhlIHdpZGdldExhYmVsLCBgbnVsbGAgaWYgbm8gZW50cnkgZXhpc3RzXG5cdCAqL1xuXHRnZXQ8VCBleHRlbmRzIFdpZGdldEJhc2VJbnRlcmZhY2UgPSBXaWRnZXRCYXNlSW50ZXJmYWNlPihsYWJlbDogUmVnaXN0cnlMYWJlbCk6IENvbnN0cnVjdG9yPFQ+IHwgbnVsbDtcblxuXHQvKipcblx0ICogUmV0dXJucyBhIGJvb2xlYW4gaWYgYW4gZW50cnkgZm9yIHRoZSBsYWJlbCBleGlzdHNcblx0ICpcblx0ICogQHBhcmFtIHdpZGdldExhYmVsIFRoZSBsYWJlbCB0byBzZWFyY2ggZm9yXG5cdCAqIEByZXR1cm5zIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBhIHdpZGdldCByZWdpc3RyeSBpdGVtIGV4aXN0c1xuXHQgKi9cblx0aGFzKGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRGVmaW5lIGFuIEluamVjdG9yIGFnYWluc3QgYSBsYWJlbFxuXHQgKlxuXHQgKiBAcGFyYW0gbGFiZWwgVGhlIGxhYmVsIG9mIHRoZSBpbmplY3RvciB0byByZWdpc3RlclxuXHQgKiBAcGFyYW0gcmVnaXN0cnlJdGVtIFRoZSBpbmplY3RvciBmYWN0b3J5XG5cdCAqL1xuXHRkZWZpbmVJbmplY3RvcihsYWJlbDogUmVnaXN0cnlMYWJlbCwgaW5qZWN0b3JGYWN0b3J5OiBJbmplY3RvckZhY3RvcnkpOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYW4gSW5qZWN0b3IgcmVnaXN0cnkgaXRlbSBmb3IgdGhlIGdpdmVuIGxhYmVsLCBudWxsIGlmIGFuIGVudHJ5IGRvZXNuJ3QgZXhpc3Rcblx0ICpcblx0ICogQHBhcmFtIGxhYmVsIFRoZSBsYWJlbCBvZiB0aGUgaW5qZWN0b3IgdG8gcmV0dXJuXG5cdCAqIEByZXR1cm5zIFRoZSBSZWdpc3RyeUl0ZW0gZm9yIHRoZSB3aWRnZXRMYWJlbCwgYG51bGxgIGlmIG5vIGVudHJ5IGV4aXN0c1xuXHQgKi9cblx0Z2V0SW5qZWN0b3I8VD4obGFiZWw6IFJlZ2lzdHJ5TGFiZWwpOiBJbmplY3Rvckl0ZW08VD4gfCBudWxsO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGEgYm9vbGVhbiBpZiBhbiBpbmplY3RvciBmb3IgdGhlIGxhYmVsIGV4aXN0c1xuXHQgKlxuXHQgKiBAcGFyYW0gd2lkZ2V0TGFiZWwgVGhlIGxhYmVsIHRvIHNlYXJjaCBmb3Jcblx0ICogQHJldHVybnMgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGEgaW5qZWN0b3IgcmVnaXN0cnkgaXRlbSBleGlzdHNcblx0ICovXG5cdGhhc0luamVjdG9yKGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaXMgdGhlIGl0ZW0gaXMgYSBzdWJjbGFzcyBvZiBXaWRnZXRCYXNlIChvciBhIFdpZGdldEJhc2UpXG4gKlxuICogQHBhcmFtIGl0ZW0gdGhlIGl0ZW0gdG8gY2hlY2tcbiAqIEByZXR1cm5zIHRydWUvZmFsc2UgaW5kaWNhdGluZyBpZiB0aGUgaXRlbSBpcyBhIFdpZGdldEJhc2VDb25zdHJ1Y3RvclxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNXaWRnZXRCYXNlQ29uc3RydWN0b3I8VCBleHRlbmRzIFdpZGdldEJhc2VJbnRlcmZhY2U+KGl0ZW06IGFueSk6IGl0ZW0gaXMgQ29uc3RydWN0b3I8VD4ge1xuXHRyZXR1cm4gQm9vbGVhbihpdGVtICYmIGl0ZW0uX3R5cGUgPT09IFdJREdFVF9CQVNFX1RZUEUpO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVTTURlZmF1bHRXaWRnZXRCYXNlPFQ+IHtcblx0ZGVmYXVsdDogQ29uc3RydWN0b3I8VD47XG5cdF9fZXNNb2R1bGU/OiBib29sZWFuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNXaWRnZXRDb25zdHJ1Y3RvckRlZmF1bHRFeHBvcnQ8VD4oaXRlbTogYW55KTogaXRlbSBpcyBFU01EZWZhdWx0V2lkZ2V0QmFzZTxUPiB7XG5cdHJldHVybiBCb29sZWFuKFxuXHRcdGl0ZW0gJiZcblx0XHRcdGl0ZW0uaGFzT3duUHJvcGVydHkoJ19fZXNNb2R1bGUnKSAmJlxuXHRcdFx0aXRlbS5oYXNPd25Qcm9wZXJ0eSgnZGVmYXVsdCcpICYmXG5cdFx0XHRpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcihpdGVtLmRlZmF1bHQpXG5cdCk7XG59XG5cbi8qKlxuICogVGhlIFJlZ2lzdHJ5IGltcGxlbWVudGF0aW9uXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWdpc3RyeSBleHRlbmRzIEV2ZW50ZWQ8e30sIFJlZ2lzdHJ5TGFiZWwsIFJlZ2lzdHJ5RXZlbnRPYmplY3Q+IGltcGxlbWVudHMgUmVnaXN0cnlJbnRlcmZhY2Uge1xuXHQvKipcblx0ICogaW50ZXJuYWwgbWFwIG9mIGxhYmVscyBhbmQgUmVnaXN0cnlJdGVtXG5cdCAqL1xuXHRwcml2YXRlIF93aWRnZXRSZWdpc3RyeTogTWFwPFJlZ2lzdHJ5TGFiZWwsIFJlZ2lzdHJ5SXRlbT4gfCB1bmRlZmluZWQ7XG5cblx0cHJpdmF0ZSBfaW5qZWN0b3JSZWdpc3RyeTogTWFwPFJlZ2lzdHJ5TGFiZWwsIEluamVjdG9ySXRlbT4gfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIEVtaXQgbG9hZGVkIGV2ZW50IGZvciByZWdpc3RyeSBsYWJlbFxuXHQgKi9cblx0cHJpdmF0ZSBlbWl0TG9hZGVkRXZlbnQod2lkZ2V0TGFiZWw6IFJlZ2lzdHJ5TGFiZWwsIGl0ZW06IFdpZGdldEJhc2VDb25zdHJ1Y3RvciB8IEluamVjdG9ySXRlbSk6IHZvaWQge1xuXHRcdHRoaXMuZW1pdCh7XG5cdFx0XHR0eXBlOiB3aWRnZXRMYWJlbCxcblx0XHRcdGFjdGlvbjogJ2xvYWRlZCcsXG5cdFx0XHRpdGVtXG5cdFx0fSk7XG5cdH1cblxuXHRwdWJsaWMgZGVmaW5lKGxhYmVsOiBSZWdpc3RyeUxhYmVsLCBpdGVtOiBSZWdpc3RyeUl0ZW0pOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fd2lkZ2V0UmVnaXN0cnkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fd2lkZ2V0UmVnaXN0cnkgPSBuZXcgTWFwKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3dpZGdldFJlZ2lzdHJ5LmhhcyhsYWJlbCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgd2lkZ2V0IGhhcyBhbHJlYWR5IGJlZW4gcmVnaXN0ZXJlZCBmb3IgJyR7bGFiZWwudG9TdHJpbmcoKX0nYCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fd2lkZ2V0UmVnaXN0cnkuc2V0KGxhYmVsLCBpdGVtKTtcblxuXHRcdGlmIChpdGVtIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuXHRcdFx0aXRlbS50aGVuKFxuXHRcdFx0XHQod2lkZ2V0Q3RvcikgPT4ge1xuXHRcdFx0XHRcdHRoaXMuX3dpZGdldFJlZ2lzdHJ5IS5zZXQobGFiZWwsIHdpZGdldEN0b3IpO1xuXHRcdFx0XHRcdHRoaXMuZW1pdExvYWRlZEV2ZW50KGxhYmVsLCB3aWRnZXRDdG9yKTtcblx0XHRcdFx0XHRyZXR1cm4gd2lkZ2V0Q3Rvcjtcblx0XHRcdFx0fSxcblx0XHRcdFx0KGVycm9yKSA9PiB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0fSBlbHNlIGlmIChpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcihpdGVtKSkge1xuXHRcdFx0dGhpcy5lbWl0TG9hZGVkRXZlbnQobGFiZWwsIGl0ZW0pO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBkZWZpbmVJbmplY3RvcihsYWJlbDogUmVnaXN0cnlMYWJlbCwgaW5qZWN0b3JGYWN0b3J5OiBJbmplY3RvckZhY3RvcnkpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5faW5qZWN0b3JSZWdpc3RyeSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9pbmplY3RvclJlZ2lzdHJ5ID0gbmV3IE1hcCgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LmhhcyhsYWJlbCkpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgaW5qZWN0b3IgaGFzIGFscmVhZHkgYmVlbiByZWdpc3RlcmVkIGZvciAnJHtsYWJlbC50b1N0cmluZygpfSdgKTtcblx0XHR9XG5cblx0XHRjb25zdCBpbnZhbGlkYXRvciA9IG5ldyBFdmVudGVkKCk7XG5cblx0XHRjb25zdCBpbmplY3Rvckl0ZW06IEluamVjdG9ySXRlbSA9IHtcblx0XHRcdGluamVjdG9yOiBpbmplY3RvckZhY3RvcnkoKCkgPT4gaW52YWxpZGF0b3IuZW1pdCh7IHR5cGU6ICdpbnZhbGlkYXRlJyB9KSksXG5cdFx0XHRpbnZhbGlkYXRvclxuXHRcdH07XG5cblx0XHR0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LnNldChsYWJlbCwgaW5qZWN0b3JJdGVtKTtcblx0XHR0aGlzLmVtaXRMb2FkZWRFdmVudChsYWJlbCwgaW5qZWN0b3JJdGVtKTtcblx0fVxuXG5cdHB1YmxpYyBnZXQ8VCBleHRlbmRzIFdpZGdldEJhc2VJbnRlcmZhY2UgPSBXaWRnZXRCYXNlSW50ZXJmYWNlPihsYWJlbDogUmVnaXN0cnlMYWJlbCk6IENvbnN0cnVjdG9yPFQ+IHwgbnVsbCB7XG5cdFx0aWYgKCF0aGlzLl93aWRnZXRSZWdpc3RyeSB8fCAhdGhpcy5oYXMobGFiZWwpKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCBpdGVtID0gdGhpcy5fd2lkZ2V0UmVnaXN0cnkuZ2V0KGxhYmVsKTtcblxuXHRcdGlmIChpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcjxUPihpdGVtKSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXG5cdFx0aWYgKGl0ZW0gaW5zdGFuY2VvZiBQcm9taXNlKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCBwcm9taXNlID0gKDxXaWRnZXRCYXNlQ29uc3RydWN0b3JGdW5jdGlvbj5pdGVtKSgpO1xuXHRcdHRoaXMuX3dpZGdldFJlZ2lzdHJ5LnNldChsYWJlbCwgcHJvbWlzZSk7XG5cblx0XHRwcm9taXNlLnRoZW4oXG5cdFx0XHQod2lkZ2V0Q3RvcikgPT4ge1xuXHRcdFx0XHRpZiAoaXNXaWRnZXRDb25zdHJ1Y3RvckRlZmF1bHRFeHBvcnQ8VD4od2lkZ2V0Q3RvcikpIHtcblx0XHRcdFx0XHR3aWRnZXRDdG9yID0gd2lkZ2V0Q3Rvci5kZWZhdWx0O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5fd2lkZ2V0UmVnaXN0cnkhLnNldChsYWJlbCwgd2lkZ2V0Q3Rvcik7XG5cdFx0XHRcdHRoaXMuZW1pdExvYWRlZEV2ZW50KGxhYmVsLCB3aWRnZXRDdG9yKTtcblx0XHRcdFx0cmV0dXJuIHdpZGdldEN0b3I7XG5cdFx0XHR9LFxuXHRcdFx0KGVycm9yKSA9PiB7XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHB1YmxpYyBnZXRJbmplY3RvcjxUPihsYWJlbDogUmVnaXN0cnlMYWJlbCk6IEluamVjdG9ySXRlbTxUPiB8IG51bGwge1xuXHRcdGlmICghdGhpcy5faW5qZWN0b3JSZWdpc3RyeSB8fCAhdGhpcy5oYXNJbmplY3RvcihsYWJlbCkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LmdldChsYWJlbCkhO1xuXHR9XG5cblx0cHVibGljIGhhcyhsYWJlbDogUmVnaXN0cnlMYWJlbCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBCb29sZWFuKHRoaXMuX3dpZGdldFJlZ2lzdHJ5ICYmIHRoaXMuX3dpZGdldFJlZ2lzdHJ5LmhhcyhsYWJlbCkpO1xuXHR9XG5cblx0cHVibGljIGhhc0luamVjdG9yKGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIEJvb2xlYW4odGhpcy5faW5qZWN0b3JSZWdpc3RyeSAmJiB0aGlzLl9pbmplY3RvclJlZ2lzdHJ5LmhhcyhsYWJlbCkpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlZ2lzdHJ5O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFJlZ2lzdHJ5LnRzIiwiaW1wb3J0IHsgTWFwIH0gZnJvbSAnQGRvam8vc2hpbS9NYXAnO1xuaW1wb3J0IHsgRXZlbnRlZCB9IGZyb20gJ0Bkb2pvL2NvcmUvRXZlbnRlZCc7XG5pbXBvcnQgeyBFdmVudE9iamVjdCB9IGZyb20gJ0Bkb2pvL2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3RvciwgSW5qZWN0b3JGYWN0b3J5LCBJbmplY3Rvckl0ZW0sIFJlZ2lzdHJ5TGFiZWwsIFdpZGdldEJhc2VJbnRlcmZhY2UgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUmVnaXN0cnksIFJlZ2lzdHJ5RXZlbnRPYmplY3QsIFJlZ2lzdHJ5SXRlbSB9IGZyb20gJy4vUmVnaXN0cnknO1xuXG5leHBvcnQgdHlwZSBSZWdpc3RyeUhhbmRsZXJFdmVudE1hcCA9IHtcblx0aW52YWxpZGF0ZTogRXZlbnRPYmplY3Q8J2ludmFsaWRhdGUnPjtcbn07XG5cbmV4cG9ydCBjbGFzcyBSZWdpc3RyeUhhbmRsZXIgZXh0ZW5kcyBFdmVudGVkPFJlZ2lzdHJ5SGFuZGxlckV2ZW50TWFwPiB7XG5cdHByaXZhdGUgX3JlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5KCk7XG5cdHByaXZhdGUgX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXA6IE1hcDxSZWdpc3RyeSwgUmVnaXN0cnlMYWJlbFtdPiA9IG5ldyBNYXAoKTtcblx0cHJpdmF0ZSBfcmVnaXN0cnlJbmplY3RvckxhYmVsTWFwOiBNYXA8UmVnaXN0cnksIFJlZ2lzdHJ5TGFiZWxbXT4gPSBuZXcgTWFwKCk7XG5cdHByb3RlY3RlZCBiYXNlUmVnaXN0cnk/OiBSZWdpc3RyeTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXMub3duKHRoaXMuX3JlZ2lzdHJ5KTtcblx0XHRjb25zdCBkZXN0cm95ID0gKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMuYmFzZVJlZ2lzdHJ5KSB7XG5cdFx0XHRcdHRoaXMuX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXAuZGVsZXRlKHRoaXMuYmFzZVJlZ2lzdHJ5KTtcblx0XHRcdFx0dGhpcy5fcmVnaXN0cnlJbmplY3RvckxhYmVsTWFwLmRlbGV0ZSh0aGlzLmJhc2VSZWdpc3RyeSk7XG5cdFx0XHRcdHRoaXMuYmFzZVJlZ2lzdHJ5ID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0dGhpcy5vd24oeyBkZXN0cm95IH0pO1xuXHR9XG5cblx0cHVibGljIHNldCBiYXNlKGJhc2VSZWdpc3RyeTogUmVnaXN0cnkpIHtcblx0XHRpZiAodGhpcy5iYXNlUmVnaXN0cnkpIHtcblx0XHRcdHRoaXMuX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXAuZGVsZXRlKHRoaXMuYmFzZVJlZ2lzdHJ5KTtcblx0XHRcdHRoaXMuX3JlZ2lzdHJ5SW5qZWN0b3JMYWJlbE1hcC5kZWxldGUodGhpcy5iYXNlUmVnaXN0cnkpO1xuXHRcdH1cblx0XHR0aGlzLmJhc2VSZWdpc3RyeSA9IGJhc2VSZWdpc3RyeTtcblx0fVxuXG5cdHB1YmxpYyBkZWZpbmUobGFiZWw6IFJlZ2lzdHJ5TGFiZWwsIHdpZGdldDogUmVnaXN0cnlJdGVtKTogdm9pZCB7XG5cdFx0dGhpcy5fcmVnaXN0cnkuZGVmaW5lKGxhYmVsLCB3aWRnZXQpO1xuXHR9XG5cblx0cHVibGljIGRlZmluZUluamVjdG9yKGxhYmVsOiBSZWdpc3RyeUxhYmVsLCBpbmplY3RvcjogSW5qZWN0b3JGYWN0b3J5KTogdm9pZCB7XG5cdFx0dGhpcy5fcmVnaXN0cnkuZGVmaW5lSW5qZWN0b3IobGFiZWwsIGluamVjdG9yKTtcblx0fVxuXG5cdHB1YmxpYyBoYXMobGFiZWw6IFJlZ2lzdHJ5TGFiZWwpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fcmVnaXN0cnkuaGFzKGxhYmVsKSB8fCBCb29sZWFuKHRoaXMuYmFzZVJlZ2lzdHJ5ICYmIHRoaXMuYmFzZVJlZ2lzdHJ5LmhhcyhsYWJlbCkpO1xuXHR9XG5cblx0cHVibGljIGhhc0luamVjdG9yKGxhYmVsOiBSZWdpc3RyeUxhYmVsKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX3JlZ2lzdHJ5Lmhhc0luamVjdG9yKGxhYmVsKSB8fCBCb29sZWFuKHRoaXMuYmFzZVJlZ2lzdHJ5ICYmIHRoaXMuYmFzZVJlZ2lzdHJ5Lmhhc0luamVjdG9yKGxhYmVsKSk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0PFQgZXh0ZW5kcyBXaWRnZXRCYXNlSW50ZXJmYWNlID0gV2lkZ2V0QmFzZUludGVyZmFjZT4oXG5cdFx0bGFiZWw6IFJlZ2lzdHJ5TGFiZWwsXG5cdFx0Z2xvYmFsUHJlY2VkZW5jZTogYm9vbGVhbiA9IGZhbHNlXG5cdCk6IENvbnN0cnVjdG9yPFQ+IHwgbnVsbCB7XG5cdFx0cmV0dXJuIHRoaXMuX2dldChsYWJlbCwgZ2xvYmFsUHJlY2VkZW5jZSwgJ2dldCcsIHRoaXMuX3JlZ2lzdHJ5V2lkZ2V0TGFiZWxNYXApO1xuXHR9XG5cblx0cHVibGljIGdldEluamVjdG9yPFQ+KGxhYmVsOiBSZWdpc3RyeUxhYmVsLCBnbG9iYWxQcmVjZWRlbmNlOiBib29sZWFuID0gZmFsc2UpOiBJbmplY3Rvckl0ZW08VD4gfCBudWxsIHtcblx0XHRyZXR1cm4gdGhpcy5fZ2V0KGxhYmVsLCBnbG9iYWxQcmVjZWRlbmNlLCAnZ2V0SW5qZWN0b3InLCB0aGlzLl9yZWdpc3RyeUluamVjdG9yTGFiZWxNYXApO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0KFxuXHRcdGxhYmVsOiBSZWdpc3RyeUxhYmVsLFxuXHRcdGdsb2JhbFByZWNlZGVuY2U6IGJvb2xlYW4sXG5cdFx0Z2V0RnVuY3Rpb25OYW1lOiAnZ2V0SW5qZWN0b3InIHwgJ2dldCcsXG5cdFx0bGFiZWxNYXA6IE1hcDxSZWdpc3RyeSwgUmVnaXN0cnlMYWJlbFtdPlxuXHQpOiBhbnkge1xuXHRcdGNvbnN0IHJlZ2lzdHJpZXMgPSBnbG9iYWxQcmVjZWRlbmNlID8gW3RoaXMuYmFzZVJlZ2lzdHJ5LCB0aGlzLl9yZWdpc3RyeV0gOiBbdGhpcy5fcmVnaXN0cnksIHRoaXMuYmFzZVJlZ2lzdHJ5XTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlZ2lzdHJpZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHJlZ2lzdHJ5OiBhbnkgPSByZWdpc3RyaWVzW2ldO1xuXHRcdFx0aWYgKCFyZWdpc3RyeSkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGl0ZW0gPSByZWdpc3RyeVtnZXRGdW5jdGlvbk5hbWVdKGxhYmVsKTtcblx0XHRcdGNvbnN0IHJlZ2lzdGVyZWRMYWJlbHMgPSBsYWJlbE1hcC5nZXQocmVnaXN0cnkpIHx8IFtdO1xuXHRcdFx0aWYgKGl0ZW0pIHtcblx0XHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0XHR9IGVsc2UgaWYgKHJlZ2lzdGVyZWRMYWJlbHMuaW5kZXhPZihsYWJlbCkgPT09IC0xKSB7XG5cdFx0XHRcdGNvbnN0IGhhbmRsZSA9IHJlZ2lzdHJ5Lm9uKGxhYmVsLCAoZXZlbnQ6IFJlZ2lzdHJ5RXZlbnRPYmplY3QpID0+IHtcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRldmVudC5hY3Rpb24gPT09ICdsb2FkZWQnICYmXG5cdFx0XHRcdFx0XHQodGhpcyBhcyBhbnkpW2dldEZ1bmN0aW9uTmFtZV0obGFiZWwsIGdsb2JhbFByZWNlZGVuY2UpID09PSBldmVudC5pdGVtXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmVtaXQoeyB0eXBlOiAnaW52YWxpZGF0ZScgfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5vd24oaGFuZGxlKTtcblx0XHRcdFx0bGFiZWxNYXAuc2V0KHJlZ2lzdHJ5LCBbLi4ucmVnaXN0ZXJlZExhYmVscywgbGFiZWxdKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVnaXN0cnlIYW5kbGVyO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFJlZ2lzdHJ5SGFuZGxlci50cyIsImltcG9ydCBNYXAgZnJvbSAnQGRvam8vc2hpbS9NYXAnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnQGRvam8vc2hpbS9XZWFrTWFwJztcbmltcG9ydCBTeW1ib2wgZnJvbSAnQGRvam8vc2hpbS9TeW1ib2wnO1xuaW1wb3J0IHsgSGFuZGxlIH0gZnJvbSAnQGRvam8vY29yZS9pbnRlcmZhY2VzJztcbmltcG9ydCB7IHYgfSBmcm9tICcuL2QnO1xuaW1wb3J0IHsgYXV0byB9IGZyb20gJy4vZGlmZic7XG5pbXBvcnQge1xuXHRBZnRlclJlbmRlcixcblx0QmVmb3JlUHJvcGVydGllcyxcblx0QmVmb3JlUmVuZGVyLFxuXHRDb3JlUHJvcGVydGllcyxcblx0RGlmZlByb3BlcnR5UmVhY3Rpb24sXG5cdEROb2RlLFxuXHRSZW5kZXIsXG5cdFdpZGdldE1ldGFCYXNlLFxuXHRXaWRnZXRNZXRhQ29uc3RydWN0b3IsXG5cdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdFdpZGdldFByb3BlcnRpZXNcbn0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCBSZWdpc3RyeUhhbmRsZXIgZnJvbSAnLi9SZWdpc3RyeUhhbmRsZXInO1xuaW1wb3J0IE5vZGVIYW5kbGVyIGZyb20gJy4vTm9kZUhhbmRsZXInO1xuaW1wb3J0IHsgd2lkZ2V0SW5zdGFuY2VNYXAgfSBmcm9tICcuL3Zkb20nO1xuaW1wb3J0IHsgaXNXaWRnZXRCYXNlQ29uc3RydWN0b3IsIFdJREdFVF9CQVNFX1RZUEUgfSBmcm9tICcuL1JlZ2lzdHJ5JztcblxuaW50ZXJmYWNlIFJlYWN0aW9uRnVuY3Rpb25Bcmd1bWVudHMge1xuXHRwcmV2aW91c1Byb3BlcnRpZXM6IGFueTtcblx0bmV3UHJvcGVydGllczogYW55O1xuXHRjaGFuZ2VkOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgUmVhY3Rpb25GdW5jdGlvbkNvbmZpZyB7XG5cdHByb3BlcnR5TmFtZTogc3RyaW5nO1xuXHRyZWFjdGlvbjogRGlmZlByb3BlcnR5UmVhY3Rpb247XG59XG5cbmV4cG9ydCB0eXBlIEJvdW5kRnVuY3Rpb25EYXRhID0geyBib3VuZEZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55OyBzY29wZTogYW55IH07XG5cbmNvbnN0IGRlY29yYXRvck1hcCA9IG5ldyBNYXA8RnVuY3Rpb24sIE1hcDxzdHJpbmcsIGFueVtdPj4oKTtcbmNvbnN0IGJvdW5kQXV0byA9IGF1dG8uYmluZChudWxsKTtcblxuZXhwb3J0IGNvbnN0IG5vQmluZCA9IFN5bWJvbC5mb3IoJ2Rvam9Ob0JpbmQnKTtcblxuLyoqXG4gKiBNYWluIHdpZGdldCBiYXNlIGZvciBhbGwgd2lkZ2V0cyB0byBleHRlbmRcbiAqL1xuZXhwb3J0IGNsYXNzIFdpZGdldEJhc2U8UCA9IFdpZGdldFByb3BlcnRpZXMsIEMgZXh0ZW5kcyBETm9kZSA9IEROb2RlPiBpbXBsZW1lbnRzIFdpZGdldEJhc2VJbnRlcmZhY2U8UCwgQz4ge1xuXHQvKipcblx0ICogc3RhdGljIGlkZW50aWZpZXJcblx0ICovXG5cdHN0YXRpYyBfdHlwZTogc3ltYm9sID0gV0lER0VUX0JBU0VfVFlQRTtcblxuXHQvKipcblx0ICogY2hpbGRyZW4gYXJyYXlcblx0ICovXG5cdHByaXZhdGUgX2NoaWxkcmVuOiAoQyB8IG51bGwpW107XG5cblx0LyoqXG5cdCAqIEluZGljYXRlcyBpZiBpdCBpcyB0aGUgaW5pdGlhbCBzZXQgcHJvcGVydGllcyBjeWNsZVxuXHQgKi9cblx0cHJpdmF0ZSBfaW5pdGlhbFByb3BlcnRpZXMgPSB0cnVlO1xuXG5cdC8qKlxuXHQgKiBpbnRlcm5hbCB3aWRnZXQgcHJvcGVydGllc1xuXHQgKi9cblx0cHJpdmF0ZSBfcHJvcGVydGllczogUCAmIFdpZGdldFByb3BlcnRpZXMgJiB7IFtpbmRleDogc3RyaW5nXTogYW55IH07XG5cblx0LyoqXG5cdCAqIEFycmF5IG9mIHByb3BlcnR5IGtleXMgY29uc2lkZXJlZCBjaGFuZ2VkIGZyb20gdGhlIHByZXZpb3VzIHNldCBwcm9wZXJ0aWVzXG5cdCAqL1xuXHRwcml2YXRlIF9jaGFuZ2VkUHJvcGVydHlLZXlzOiBzdHJpbmdbXSA9IFtdO1xuXG5cdC8qKlxuXHQgKiBtYXAgb2YgZGVjb3JhdG9ycyB0aGF0IGFyZSBhcHBsaWVkIHRvIHRoaXMgd2lkZ2V0XG5cdCAqL1xuXHRwcml2YXRlIF9kZWNvcmF0b3JDYWNoZTogTWFwPHN0cmluZywgYW55W10+O1xuXG5cdHByaXZhdGUgX3JlZ2lzdHJ5OiBSZWdpc3RyeUhhbmRsZXIgfCB1bmRlZmluZWQ7XG5cblx0LyoqXG5cdCAqIE1hcCBvZiBmdW5jdGlvbnMgcHJvcGVydGllcyBmb3IgdGhlIGJvdW5kIGZ1bmN0aW9uXG5cdCAqL1xuXHRwcml2YXRlIF9iaW5kRnVuY3Rpb25Qcm9wZXJ0eU1hcDogV2Vha01hcDwoLi4uYXJnczogYW55W10pID0+IGFueSwgQm91bmRGdW5jdGlvbkRhdGE+IHwgdW5kZWZpbmVkO1xuXG5cdHByaXZhdGUgX21ldGFNYXA6IE1hcDxXaWRnZXRNZXRhQ29uc3RydWN0b3I8YW55PiwgV2lkZ2V0TWV0YUJhc2U+IHwgdW5kZWZpbmVkO1xuXG5cdHByaXZhdGUgX2JvdW5kUmVuZGVyRnVuYzogUmVuZGVyO1xuXG5cdHByaXZhdGUgX2JvdW5kSW52YWxpZGF0ZTogKCkgPT4gdm9pZDtcblxuXHRwcml2YXRlIF9ub2RlSGFuZGxlcjogTm9kZUhhbmRsZXIgPSBuZXcgTm9kZUhhbmRsZXIoKTtcblxuXHRwcml2YXRlIF9oYW5kbGVzOiBIYW5kbGVbXSA9IFtdO1xuXG5cdC8qKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICovXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2NoaWxkcmVuID0gW107XG5cdFx0dGhpcy5fZGVjb3JhdG9yQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgYW55W10+KCk7XG5cdFx0dGhpcy5fcHJvcGVydGllcyA9IDxQPnt9O1xuXHRcdHRoaXMuX2JvdW5kUmVuZGVyRnVuYyA9IHRoaXMucmVuZGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5fYm91bmRJbnZhbGlkYXRlID0gdGhpcy5pbnZhbGlkYXRlLmJpbmQodGhpcyk7XG5cblx0XHR3aWRnZXRJbnN0YW5jZU1hcC5zZXQodGhpcywge1xuXHRcdFx0ZGlydHk6IHRydWUsXG5cdFx0XHRvbkF0dGFjaDogKCk6IHZvaWQgPT4ge1xuXHRcdFx0XHR0aGlzLm9uQXR0YWNoKCk7XG5cdFx0XHR9LFxuXHRcdFx0b25EZXRhY2g6ICgpOiB2b2lkID0+IHtcblx0XHRcdFx0dGhpcy5vbkRldGFjaCgpO1xuXHRcdFx0XHR0aGlzLmRlc3Ryb3koKTtcblx0XHRcdH0sXG5cdFx0XHRub2RlSGFuZGxlcjogdGhpcy5fbm9kZUhhbmRsZXIsXG5cdFx0XHRyZWdpc3RyeTogKCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZWdpc3RyeTtcblx0XHRcdH0sXG5cdFx0XHRjb3JlUHJvcGVydGllczoge30gYXMgQ29yZVByb3BlcnRpZXMsXG5cdFx0XHRyZW5kZXJpbmc6IGZhbHNlLFxuXHRcdFx0aW5wdXRQcm9wZXJ0aWVzOiB7fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5fcnVuQWZ0ZXJDb25zdHJ1Y3RvcnMoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBtZXRhPFQgZXh0ZW5kcyBXaWRnZXRNZXRhQmFzZT4oTWV0YVR5cGU6IFdpZGdldE1ldGFDb25zdHJ1Y3RvcjxUPik6IFQge1xuXHRcdGlmICh0aGlzLl9tZXRhTWFwID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX21ldGFNYXAgPSBuZXcgTWFwPFdpZGdldE1ldGFDb25zdHJ1Y3Rvcjxhbnk+LCBXaWRnZXRNZXRhQmFzZT4oKTtcblx0XHR9XG5cdFx0bGV0IGNhY2hlZCA9IHRoaXMuX21ldGFNYXAuZ2V0KE1ldGFUeXBlKTtcblx0XHRpZiAoIWNhY2hlZCkge1xuXHRcdFx0Y2FjaGVkID0gbmV3IE1ldGFUeXBlKHtcblx0XHRcdFx0aW52YWxpZGF0ZTogdGhpcy5fYm91bmRJbnZhbGlkYXRlLFxuXHRcdFx0XHRub2RlSGFuZGxlcjogdGhpcy5fbm9kZUhhbmRsZXIsXG5cdFx0XHRcdGJpbmQ6IHRoaXNcblx0XHRcdH0pO1xuXHRcdFx0dGhpcy5vd24oY2FjaGVkKTtcblx0XHRcdHRoaXMuX21ldGFNYXAuc2V0KE1ldGFUeXBlLCBjYWNoZWQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBjYWNoZWQgYXMgVDtcblx0fVxuXG5cdHByb3RlY3RlZCBvbkF0dGFjaCgpOiB2b2lkIHtcblx0XHQvLyBEbyBub3RoaW5nIGJ5IGRlZmF1bHQuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25EZXRhY2goKTogdm9pZCB7XG5cdFx0Ly8gRG8gbm90aGluZyBieSBkZWZhdWx0LlxuXHR9XG5cblx0cHVibGljIGdldCBwcm9wZXJ0aWVzKCk6IFJlYWRvbmx5PFA+ICYgUmVhZG9ubHk8V2lkZ2V0UHJvcGVydGllcz4ge1xuXHRcdHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzO1xuXHR9XG5cblx0cHVibGljIGdldCBjaGFuZ2VkUHJvcGVydHlLZXlzKCk6IHN0cmluZ1tdIHtcblx0XHRyZXR1cm4gWy4uLnRoaXMuX2NoYW5nZWRQcm9wZXJ0eUtleXNdO1xuXHR9XG5cblx0cHVibGljIF9fc2V0Q29yZVByb3BlcnRpZXNfXyhjb3JlUHJvcGVydGllczogQ29yZVByb3BlcnRpZXMpOiB2b2lkIHtcblx0XHRjb25zdCB7IGJhc2VSZWdpc3RyeSB9ID0gY29yZVByb3BlcnRpZXM7XG5cdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpITtcblxuXHRcdGlmIChpbnN0YW5jZURhdGEuY29yZVByb3BlcnRpZXMuYmFzZVJlZ2lzdHJ5ICE9PSBiYXNlUmVnaXN0cnkpIHtcblx0XHRcdGlmICh0aGlzLl9yZWdpc3RyeSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHRoaXMuX3JlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5SGFuZGxlcigpO1xuXHRcdFx0XHR0aGlzLm93bih0aGlzLl9yZWdpc3RyeSk7XG5cdFx0XHRcdHRoaXMub3duKHRoaXMuX3JlZ2lzdHJ5Lm9uKCdpbnZhbGlkYXRlJywgdGhpcy5fYm91bmRJbnZhbGlkYXRlKSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9yZWdpc3RyeS5iYXNlID0gYmFzZVJlZ2lzdHJ5O1xuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCk7XG5cdFx0fVxuXHRcdGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcyA9IGNvcmVQcm9wZXJ0aWVzO1xuXHR9XG5cblx0cHVibGljIF9fc2V0UHJvcGVydGllc19fKG9yaWdpbmFsUHJvcGVydGllczogdGhpc1sncHJvcGVydGllcyddKTogdm9pZCB7XG5cdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpITtcblx0XHRpbnN0YW5jZURhdGEuaW5wdXRQcm9wZXJ0aWVzID0gb3JpZ2luYWxQcm9wZXJ0aWVzO1xuXHRcdGNvbnN0IHByb3BlcnRpZXMgPSB0aGlzLl9ydW5CZWZvcmVQcm9wZXJ0aWVzKG9yaWdpbmFsUHJvcGVydGllcyk7XG5cdFx0Y29uc3QgcmVnaXN0ZXJlZERpZmZQcm9wZXJ0eU5hbWVzID0gdGhpcy5nZXREZWNvcmF0b3IoJ3JlZ2lzdGVyZWREaWZmUHJvcGVydHknKTtcblx0XHRjb25zdCBjaGFuZ2VkUHJvcGVydHlLZXlzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdGNvbnN0IHByb3BlcnR5TmFtZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcblxuXHRcdGlmICh0aGlzLl9pbml0aWFsUHJvcGVydGllcyA9PT0gZmFsc2UgfHwgcmVnaXN0ZXJlZERpZmZQcm9wZXJ0eU5hbWVzLmxlbmd0aCAhPT0gMCkge1xuXHRcdFx0Y29uc3QgYWxsUHJvcGVydGllcyA9IFsuLi5wcm9wZXJ0eU5hbWVzLCAuLi5PYmplY3Qua2V5cyh0aGlzLl9wcm9wZXJ0aWVzKV07XG5cdFx0XHRjb25zdCBjaGVja2VkUHJvcGVydGllczogKHN0cmluZyB8IG51bWJlcilbXSA9IFtdO1xuXHRcdFx0Y29uc3QgZGlmZlByb3BlcnR5UmVzdWx0czogYW55ID0ge307XG5cdFx0XHRsZXQgcnVuUmVhY3Rpb25zID0gZmFsc2U7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYWxsUHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjb25zdCBwcm9wZXJ0eU5hbWUgPSBhbGxQcm9wZXJ0aWVzW2ldO1xuXHRcdFx0XHRpZiAoY2hlY2tlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpICE9PSAtMSkge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNoZWNrZWRQcm9wZXJ0aWVzLnB1c2gocHJvcGVydHlOYW1lKTtcblx0XHRcdFx0Y29uc3QgcHJldmlvdXNQcm9wZXJ0eSA9IHRoaXMuX3Byb3BlcnRpZXNbcHJvcGVydHlOYW1lXTtcblx0XHRcdFx0Y29uc3QgbmV3UHJvcGVydHkgPSB0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eShcblx0XHRcdFx0XHRwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0sXG5cdFx0XHRcdFx0aW5zdGFuY2VEYXRhLmNvcmVQcm9wZXJ0aWVzLmJpbmRcblx0XHRcdFx0KTtcblx0XHRcdFx0aWYgKHJlZ2lzdGVyZWREaWZmUHJvcGVydHlOYW1lcy5pbmRleE9mKHByb3BlcnR5TmFtZSkgIT09IC0xKSB7XG5cdFx0XHRcdFx0cnVuUmVhY3Rpb25zID0gdHJ1ZTtcblx0XHRcdFx0XHRjb25zdCBkaWZmRnVuY3Rpb25zID0gdGhpcy5nZXREZWNvcmF0b3IoYGRpZmZQcm9wZXJ0eToke3Byb3BlcnR5TmFtZX1gKTtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGRpZmZGdW5jdGlvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGRpZmZGdW5jdGlvbnNbaV0ocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpO1xuXHRcdFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFuZ2VkICYmIGNoYW5nZWRQcm9wZXJ0eUtleXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRjaGFuZ2VkUHJvcGVydHlLZXlzLnB1c2gocHJvcGVydHlOYW1lKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykge1xuXHRcdFx0XHRcdFx0XHRkaWZmUHJvcGVydHlSZXN1bHRzW3Byb3BlcnR5TmFtZV0gPSByZXN1bHQudmFsdWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3VsdCA9IGJvdW5kQXV0byhwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSk7XG5cdFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFuZ2VkICYmIGNoYW5nZWRQcm9wZXJ0eUtleXMuaW5kZXhPZihwcm9wZXJ0eU5hbWUpID09PSAtMSkge1xuXHRcdFx0XHRcdFx0Y2hhbmdlZFByb3BlcnR5S2V5cy5wdXNoKHByb3BlcnR5TmFtZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eU5hbWUgaW4gcHJvcGVydGllcykge1xuXHRcdFx0XHRcdFx0ZGlmZlByb3BlcnR5UmVzdWx0c1twcm9wZXJ0eU5hbWVdID0gcmVzdWx0LnZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAocnVuUmVhY3Rpb25zKSB7XG5cdFx0XHRcdHRoaXMuX21hcERpZmZQcm9wZXJ0eVJlYWN0aW9ucyhwcm9wZXJ0aWVzLCBjaGFuZ2VkUHJvcGVydHlLZXlzKS5mb3JFYWNoKChhcmdzLCByZWFjdGlvbikgPT4ge1xuXHRcdFx0XHRcdGlmIChhcmdzLmNoYW5nZWQpIHtcblx0XHRcdFx0XHRcdHJlYWN0aW9uLmNhbGwodGhpcywgYXJncy5wcmV2aW91c1Byb3BlcnRpZXMsIGFyZ3MubmV3UHJvcGVydGllcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3Byb3BlcnRpZXMgPSBkaWZmUHJvcGVydHlSZXN1bHRzO1xuXHRcdFx0dGhpcy5fY2hhbmdlZFByb3BlcnR5S2V5cyA9IGNoYW5nZWRQcm9wZXJ0eUtleXM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2luaXRpYWxQcm9wZXJ0aWVzID0gZmFsc2U7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByb3BlcnR5TmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0Y29uc3QgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lc1tpXTtcblx0XHRcdFx0aWYgKHR5cGVvZiBwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRwcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPSB0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eShcblx0XHRcdFx0XHRcdHByb3BlcnRpZXNbcHJvcGVydHlOYW1lXSxcblx0XHRcdFx0XHRcdGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcy5iaW5kXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGFuZ2VkUHJvcGVydHlLZXlzLnB1c2gocHJvcGVydHlOYW1lKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5fY2hhbmdlZFByb3BlcnR5S2V5cyA9IGNoYW5nZWRQcm9wZXJ0eUtleXM7XG5cdFx0XHR0aGlzLl9wcm9wZXJ0aWVzID0geyAuLi5wcm9wZXJ0aWVzIH07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2NoYW5nZWRQcm9wZXJ0eUtleXMubGVuZ3RoID4gMCkge1xuXHRcdFx0dGhpcy5pbnZhbGlkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGdldCBjaGlsZHJlbigpOiAoQyB8IG51bGwpW10ge1xuXHRcdHJldHVybiB0aGlzLl9jaGlsZHJlbjtcblx0fVxuXG5cdHB1YmxpYyBfX3NldENoaWxkcmVuX18oY2hpbGRyZW46IChDIHwgbnVsbClbXSk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9jaGlsZHJlbi5sZW5ndGggPiAwIHx8IGNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuX2NoaWxkcmVuID0gY2hpbGRyZW47XG5cdFx0XHR0aGlzLmludmFsaWRhdGUoKTtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgX19yZW5kZXJfXygpOiBETm9kZSB8IEROb2RlW10ge1xuXHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldCh0aGlzKSE7XG5cdFx0aW5zdGFuY2VEYXRhLmRpcnR5ID0gZmFsc2U7XG5cdFx0Y29uc3QgcmVuZGVyID0gdGhpcy5fcnVuQmVmb3JlUmVuZGVycygpO1xuXHRcdGxldCBkTm9kZSA9IHJlbmRlcigpO1xuXHRcdGROb2RlID0gdGhpcy5ydW5BZnRlclJlbmRlcnMoZE5vZGUpO1xuXHRcdHRoaXMuX25vZGVIYW5kbGVyLmNsZWFyKCk7XG5cdFx0cmV0dXJuIGROb2RlO1xuXHR9XG5cblx0cHVibGljIGludmFsaWRhdGUoKTogdm9pZCB7XG5cdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHRoaXMpITtcblx0XHRpZiAoaW5zdGFuY2VEYXRhLmludmFsaWRhdGUpIHtcblx0XHRcdGluc3RhbmNlRGF0YS5pbnZhbGlkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIHJlbmRlcigpOiBETm9kZSB8IEROb2RlW10ge1xuXHRcdHJldHVybiB2KCdkaXYnLCB7fSwgdGhpcy5jaGlsZHJlbik7XG5cdH1cblxuXHQvKipcblx0ICogRnVuY3Rpb24gdG8gYWRkIGRlY29yYXRvcnMgdG8gV2lkZ2V0QmFzZVxuXHQgKlxuXHQgKiBAcGFyYW0gZGVjb3JhdG9yS2V5IFRoZSBrZXkgb2YgdGhlIGRlY29yYXRvclxuXHQgKiBAcGFyYW0gdmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBkZWNvcmF0b3Jcblx0ICovXG5cdHByb3RlY3RlZCBhZGREZWNvcmF0b3IoZGVjb3JhdG9yS2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcblx0XHR2YWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuXHRcdGlmICh0aGlzLmhhc093blByb3BlcnR5KCdjb25zdHJ1Y3RvcicpKSB7XG5cdFx0XHRsZXQgZGVjb3JhdG9yTGlzdCA9IGRlY29yYXRvck1hcC5nZXQodGhpcy5jb25zdHJ1Y3Rvcik7XG5cdFx0XHRpZiAoIWRlY29yYXRvckxpc3QpIHtcblx0XHRcdFx0ZGVjb3JhdG9yTGlzdCA9IG5ldyBNYXA8c3RyaW5nLCBhbnlbXT4oKTtcblx0XHRcdFx0ZGVjb3JhdG9yTWFwLnNldCh0aGlzLmNvbnN0cnVjdG9yLCBkZWNvcmF0b3JMaXN0KTtcblx0XHRcdH1cblxuXHRcdFx0bGV0IHNwZWNpZmljRGVjb3JhdG9yTGlzdCA9IGRlY29yYXRvckxpc3QuZ2V0KGRlY29yYXRvcktleSk7XG5cdFx0XHRpZiAoIXNwZWNpZmljRGVjb3JhdG9yTGlzdCkge1xuXHRcdFx0XHRzcGVjaWZpY0RlY29yYXRvckxpc3QgPSBbXTtcblx0XHRcdFx0ZGVjb3JhdG9yTGlzdC5zZXQoZGVjb3JhdG9yS2V5LCBzcGVjaWZpY0RlY29yYXRvckxpc3QpO1xuXHRcdFx0fVxuXHRcdFx0c3BlY2lmaWNEZWNvcmF0b3JMaXN0LnB1c2goLi4udmFsdWUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBkZWNvcmF0b3JzID0gdGhpcy5nZXREZWNvcmF0b3IoZGVjb3JhdG9yS2V5KTtcblx0XHRcdHRoaXMuX2RlY29yYXRvckNhY2hlLnNldChkZWNvcmF0b3JLZXksIFsuLi5kZWNvcmF0b3JzLCAuLi52YWx1ZV0pO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBGdW5jdGlvbiB0byBidWlsZCB0aGUgbGlzdCBvZiBkZWNvcmF0b3JzIGZyb20gdGhlIGdsb2JhbCBkZWNvcmF0b3IgbWFwLlxuXHQgKlxuXHQgKiBAcGFyYW0gZGVjb3JhdG9yS2V5ICBUaGUga2V5IG9mIHRoZSBkZWNvcmF0b3Jcblx0ICogQHJldHVybiBBbiBhcnJheSBvZiBkZWNvcmF0b3IgdmFsdWVzXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHRwcml2YXRlIF9idWlsZERlY29yYXRvckxpc3QoZGVjb3JhdG9yS2V5OiBzdHJpbmcpOiBhbnlbXSB7XG5cdFx0Y29uc3QgYWxsRGVjb3JhdG9ycyA9IFtdO1xuXG5cdFx0bGV0IGNvbnN0cnVjdG9yID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuXHRcdHdoaWxlIChjb25zdHJ1Y3Rvcikge1xuXHRcdFx0Y29uc3QgaW5zdGFuY2VNYXAgPSBkZWNvcmF0b3JNYXAuZ2V0KGNvbnN0cnVjdG9yKTtcblx0XHRcdGlmIChpbnN0YW5jZU1hcCkge1xuXHRcdFx0XHRjb25zdCBkZWNvcmF0b3JzID0gaW5zdGFuY2VNYXAuZ2V0KGRlY29yYXRvcktleSk7XG5cblx0XHRcdFx0aWYgKGRlY29yYXRvcnMpIHtcblx0XHRcdFx0XHRhbGxEZWNvcmF0b3JzLnVuc2hpZnQoLi4uZGVjb3JhdG9ycyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3RydWN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoY29uc3RydWN0b3IpO1xuXHRcdH1cblxuXHRcdHJldHVybiBhbGxEZWNvcmF0b3JzO1xuXHR9XG5cblx0LyoqXG5cdCAqIEZ1bmN0aW9uIHRvIHJldHJpZXZlIGRlY29yYXRvciB2YWx1ZXNcblx0ICpcblx0ICogQHBhcmFtIGRlY29yYXRvcktleSBUaGUga2V5IG9mIHRoZSBkZWNvcmF0b3Jcblx0ICogQHJldHVybnMgQW4gYXJyYXkgb2YgZGVjb3JhdG9yIHZhbHVlc1xuXHQgKi9cblx0cHJvdGVjdGVkIGdldERlY29yYXRvcihkZWNvcmF0b3JLZXk6IHN0cmluZyk6IGFueVtdIHtcblx0XHRsZXQgYWxsRGVjb3JhdG9ycyA9IHRoaXMuX2RlY29yYXRvckNhY2hlLmdldChkZWNvcmF0b3JLZXkpO1xuXG5cdFx0aWYgKGFsbERlY29yYXRvcnMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGFsbERlY29yYXRvcnM7XG5cdFx0fVxuXG5cdFx0YWxsRGVjb3JhdG9ycyA9IHRoaXMuX2J1aWxkRGVjb3JhdG9yTGlzdChkZWNvcmF0b3JLZXkpO1xuXG5cdFx0dGhpcy5fZGVjb3JhdG9yQ2FjaGUuc2V0KGRlY29yYXRvcktleSwgYWxsRGVjb3JhdG9ycyk7XG5cdFx0cmV0dXJuIGFsbERlY29yYXRvcnM7XG5cdH1cblxuXHRwcml2YXRlIF9tYXBEaWZmUHJvcGVydHlSZWFjdGlvbnMoXG5cdFx0bmV3UHJvcGVydGllczogYW55LFxuXHRcdGNoYW5nZWRQcm9wZXJ0eUtleXM6IHN0cmluZ1tdXG5cdCk6IE1hcDxGdW5jdGlvbiwgUmVhY3Rpb25GdW5jdGlvbkFyZ3VtZW50cz4ge1xuXHRcdGNvbnN0IHJlYWN0aW9uRnVuY3Rpb25zOiBSZWFjdGlvbkZ1bmN0aW9uQ29uZmlnW10gPSB0aGlzLmdldERlY29yYXRvcignZGlmZlJlYWN0aW9uJyk7XG5cblx0XHRyZXR1cm4gcmVhY3Rpb25GdW5jdGlvbnMucmVkdWNlKChyZWFjdGlvblByb3BlcnR5TWFwLCB7IHJlYWN0aW9uLCBwcm9wZXJ0eU5hbWUgfSkgPT4ge1xuXHRcdFx0bGV0IHJlYWN0aW9uQXJndW1lbnRzID0gcmVhY3Rpb25Qcm9wZXJ0eU1hcC5nZXQocmVhY3Rpb24pO1xuXHRcdFx0aWYgKHJlYWN0aW9uQXJndW1lbnRzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmVhY3Rpb25Bcmd1bWVudHMgPSB7XG5cdFx0XHRcdFx0cHJldmlvdXNQcm9wZXJ0aWVzOiB7fSxcblx0XHRcdFx0XHRuZXdQcm9wZXJ0aWVzOiB7fSxcblx0XHRcdFx0XHRjaGFuZ2VkOiBmYWxzZVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0cmVhY3Rpb25Bcmd1bWVudHMucHJldmlvdXNQcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPSB0aGlzLl9wcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdFx0XHRyZWFjdGlvbkFyZ3VtZW50cy5uZXdQcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV0gPSBuZXdQcm9wZXJ0aWVzW3Byb3BlcnR5TmFtZV07XG5cdFx0XHRpZiAoY2hhbmdlZFByb3BlcnR5S2V5cy5pbmRleE9mKHByb3BlcnR5TmFtZSkgIT09IC0xKSB7XG5cdFx0XHRcdHJlYWN0aW9uQXJndW1lbnRzLmNoYW5nZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0cmVhY3Rpb25Qcm9wZXJ0eU1hcC5zZXQocmVhY3Rpb24sIHJlYWN0aW9uQXJndW1lbnRzKTtcblx0XHRcdHJldHVybiByZWFjdGlvblByb3BlcnR5TWFwO1xuXHRcdH0sIG5ldyBNYXA8RnVuY3Rpb24sIFJlYWN0aW9uRnVuY3Rpb25Bcmd1bWVudHM+KCkpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpbmRzIHVuYm91bmQgcHJvcGVydHkgZnVuY3Rpb25zIHRvIHRoZSBzcGVjaWZpZWQgYGJpbmRgIHByb3BlcnR5XG5cdCAqXG5cdCAqIEBwYXJhbSBwcm9wZXJ0aWVzIHByb3BlcnRpZXMgdG8gY2hlY2sgZm9yIGZ1bmN0aW9uc1xuXHQgKi9cblx0cHJpdmF0ZSBfYmluZEZ1bmN0aW9uUHJvcGVydHkocHJvcGVydHk6IGFueSwgYmluZDogYW55KTogYW55IHtcblx0XHRpZiAodHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nICYmICFwcm9wZXJ0eVtub0JpbmRdICYmIGlzV2lkZ2V0QmFzZUNvbnN0cnVjdG9yKHByb3BlcnR5KSA9PT0gZmFsc2UpIHtcblx0XHRcdGlmICh0aGlzLl9iaW5kRnVuY3Rpb25Qcm9wZXJ0eU1hcCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHRoaXMuX2JpbmRGdW5jdGlvblByb3BlcnR5TWFwID0gbmV3IFdlYWtNYXA8XG5cdFx0XHRcdFx0KC4uLmFyZ3M6IGFueVtdKSA9PiBhbnksXG5cdFx0XHRcdFx0eyBib3VuZEZ1bmM6ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55OyBzY29wZTogYW55IH1cblx0XHRcdFx0PigpO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgYmluZEluZm86IFBhcnRpYWw8Qm91bmRGdW5jdGlvbkRhdGE+ID0gdGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHlNYXAuZ2V0KHByb3BlcnR5KSB8fCB7fTtcblx0XHRcdGxldCB7IGJvdW5kRnVuYywgc2NvcGUgfSA9IGJpbmRJbmZvO1xuXG5cdFx0XHRpZiAoYm91bmRGdW5jID09PSB1bmRlZmluZWQgfHwgc2NvcGUgIT09IGJpbmQpIHtcblx0XHRcdFx0Ym91bmRGdW5jID0gcHJvcGVydHkuYmluZChiaW5kKSBhcyAoLi4uYXJnczogYW55W10pID0+IGFueTtcblx0XHRcdFx0dGhpcy5fYmluZEZ1bmN0aW9uUHJvcGVydHlNYXAuc2V0KHByb3BlcnR5LCB7IGJvdW5kRnVuYywgc2NvcGU6IGJpbmQgfSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYm91bmRGdW5jO1xuXHRcdH1cblx0XHRyZXR1cm4gcHJvcGVydHk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHJlZ2lzdHJ5KCk6IFJlZ2lzdHJ5SGFuZGxlciB7XG5cdFx0aWYgKHRoaXMuX3JlZ2lzdHJ5ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX3JlZ2lzdHJ5ID0gbmV3IFJlZ2lzdHJ5SGFuZGxlcigpO1xuXHRcdFx0dGhpcy5vd24odGhpcy5fcmVnaXN0cnkpO1xuXHRcdFx0dGhpcy5vd24odGhpcy5fcmVnaXN0cnkub24oJ2ludmFsaWRhdGUnLCB0aGlzLl9ib3VuZEludmFsaWRhdGUpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX3JlZ2lzdHJ5O1xuXHR9XG5cblx0cHJpdmF0ZSBfcnVuQmVmb3JlUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBhbnkpIHtcblx0XHRjb25zdCBiZWZvcmVQcm9wZXJ0aWVzOiBCZWZvcmVQcm9wZXJ0aWVzW10gPSB0aGlzLmdldERlY29yYXRvcignYmVmb3JlUHJvcGVydGllcycpO1xuXHRcdGlmIChiZWZvcmVQcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBiZWZvcmVQcm9wZXJ0aWVzLnJlZHVjZShcblx0XHRcdFx0KHByb3BlcnRpZXMsIGJlZm9yZVByb3BlcnRpZXNGdW5jdGlvbikgPT4ge1xuXHRcdFx0XHRcdHJldHVybiB7IC4uLnByb3BlcnRpZXMsIC4uLmJlZm9yZVByb3BlcnRpZXNGdW5jdGlvbi5jYWxsKHRoaXMsIHByb3BlcnRpZXMpIH07XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHsgLi4ucHJvcGVydGllcyB9XG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcHJvcGVydGllcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSdW4gYWxsIHJlZ2lzdGVyZWQgYmVmb3JlIHJlbmRlcnMgYW5kIHJldHVybiB0aGUgdXBkYXRlZCByZW5kZXIgbWV0aG9kXG5cdCAqL1xuXHRwcml2YXRlIF9ydW5CZWZvcmVSZW5kZXJzKCk6IFJlbmRlciB7XG5cdFx0Y29uc3QgYmVmb3JlUmVuZGVycyA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdiZWZvcmVSZW5kZXInKTtcblxuXHRcdGlmIChiZWZvcmVSZW5kZXJzLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBiZWZvcmVSZW5kZXJzLnJlZHVjZSgocmVuZGVyOiBSZW5kZXIsIGJlZm9yZVJlbmRlckZ1bmN0aW9uOiBCZWZvcmVSZW5kZXIpID0+IHtcblx0XHRcdFx0Y29uc3QgdXBkYXRlZFJlbmRlciA9IGJlZm9yZVJlbmRlckZ1bmN0aW9uLmNhbGwodGhpcywgcmVuZGVyLCB0aGlzLl9wcm9wZXJ0aWVzLCB0aGlzLl9jaGlsZHJlbik7XG5cdFx0XHRcdGlmICghdXBkYXRlZFJlbmRlcikge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybignUmVuZGVyIGZ1bmN0aW9uIG5vdCByZXR1cm5lZCBmcm9tIGJlZm9yZVJlbmRlciwgdXNpbmcgcHJldmlvdXMgcmVuZGVyJyk7XG5cdFx0XHRcdFx0cmV0dXJuIHJlbmRlcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdXBkYXRlZFJlbmRlcjtcblx0XHRcdH0sIHRoaXMuX2JvdW5kUmVuZGVyRnVuYyk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9ib3VuZFJlbmRlckZ1bmM7XG5cdH1cblxuXHQvKipcblx0ICogUnVuIGFsbCByZWdpc3RlcmVkIGFmdGVyIHJlbmRlcnMgYW5kIHJldHVybiB0aGUgZGVjb3JhdGVkIEROb2Rlc1xuXHQgKlxuXHQgKiBAcGFyYW0gZE5vZGUgVGhlIEROb2RlcyB0byBydW4gdGhyb3VnaCB0aGUgYWZ0ZXIgcmVuZGVyc1xuXHQgKi9cblx0cHJvdGVjdGVkIHJ1bkFmdGVyUmVuZGVycyhkTm9kZTogRE5vZGUgfCBETm9kZVtdKTogRE5vZGUgfCBETm9kZVtdIHtcblx0XHRjb25zdCBhZnRlclJlbmRlcnMgPSB0aGlzLmdldERlY29yYXRvcignYWZ0ZXJSZW5kZXInKTtcblxuXHRcdGlmIChhZnRlclJlbmRlcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0cmV0dXJuIGFmdGVyUmVuZGVycy5yZWR1Y2UoKGROb2RlOiBETm9kZSB8IEROb2RlW10sIGFmdGVyUmVuZGVyRnVuY3Rpb246IEFmdGVyUmVuZGVyKSA9PiB7XG5cdFx0XHRcdHJldHVybiBhZnRlclJlbmRlckZ1bmN0aW9uLmNhbGwodGhpcywgZE5vZGUpO1xuXHRcdFx0fSwgZE5vZGUpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9tZXRhTWFwICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX21ldGFNYXAuZm9yRWFjaCgobWV0YSkgPT4ge1xuXHRcdFx0XHRtZXRhLmFmdGVyUmVuZGVyKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZE5vZGU7XG5cdH1cblxuXHRwcml2YXRlIF9ydW5BZnRlckNvbnN0cnVjdG9ycygpOiB2b2lkIHtcblx0XHRjb25zdCBhZnRlckNvbnN0cnVjdG9ycyA9IHRoaXMuZ2V0RGVjb3JhdG9yKCdhZnRlckNvbnN0cnVjdG9yJyk7XG5cblx0XHRpZiAoYWZ0ZXJDb25zdHJ1Y3RvcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0YWZ0ZXJDb25zdHJ1Y3RvcnMuZm9yRWFjaCgoYWZ0ZXJDb25zdHJ1Y3RvcikgPT4gYWZ0ZXJDb25zdHJ1Y3Rvci5jYWxsKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgb3duKGhhbmRsZTogSGFuZGxlKTogdm9pZCB7XG5cdFx0dGhpcy5faGFuZGxlcy5wdXNoKGhhbmRsZSk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgZGVzdHJveSgpIHtcblx0XHR3aGlsZSAodGhpcy5faGFuZGxlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRjb25zdCBoYW5kbGUgPSB0aGlzLl9oYW5kbGVzLnBvcCgpO1xuXHRcdFx0aWYgKGhhbmRsZSkge1xuXHRcdFx0XHRoYW5kbGUuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBXaWRnZXRCYXNlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFdpZGdldEJhc2UudHMiLCJpbXBvcnQgeyBWTm9kZVByb3BlcnRpZXMgfSBmcm9tICcuLy4uL2ludGVyZmFjZXMnO1xuXG5sZXQgYnJvd3NlclNwZWNpZmljVHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9ICcnO1xubGV0IGJyb3dzZXJTcGVjaWZpY0FuaW1hdGlvbkVuZEV2ZW50TmFtZSA9ICcnO1xuXG5mdW5jdGlvbiBkZXRlcm1pbmVCcm93c2VyU3R5bGVOYW1lcyhlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuXHRpZiAoJ1dlYmtpdFRyYW5zaXRpb24nIGluIGVsZW1lbnQuc3R5bGUpIHtcblx0XHRicm93c2VyU3BlY2lmaWNUcmFuc2l0aW9uRW5kRXZlbnROYW1lID0gJ3dlYmtpdFRyYW5zaXRpb25FbmQnO1xuXHRcdGJyb3dzZXJTcGVjaWZpY0FuaW1hdGlvbkVuZEV2ZW50TmFtZSA9ICd3ZWJraXRBbmltYXRpb25FbmQnO1xuXHR9IGVsc2UgaWYgKCd0cmFuc2l0aW9uJyBpbiBlbGVtZW50LnN0eWxlIHx8ICdNb3pUcmFuc2l0aW9uJyBpbiBlbGVtZW50LnN0eWxlKSB7XG5cdFx0YnJvd3NlclNwZWNpZmljVHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9ICd0cmFuc2l0aW9uZW5kJztcblx0XHRicm93c2VyU3BlY2lmaWNBbmltYXRpb25FbmRFdmVudE5hbWUgPSAnYW5pbWF0aW9uZW5kJztcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1lvdXIgYnJvd3NlciBpcyBub3Qgc3VwcG9ydGVkJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZShlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuXHRpZiAoYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lID09PSAnJykge1xuXHRcdGRldGVybWluZUJyb3dzZXJTdHlsZU5hbWVzKGVsZW1lbnQpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJ1bkFuZENsZWFuVXAoZWxlbWVudDogSFRNTEVsZW1lbnQsIHN0YXJ0QW5pbWF0aW9uOiAoKSA9PiB2b2lkLCBmaW5pc2hBbmltYXRpb246ICgpID0+IHZvaWQpIHtcblx0aW5pdGlhbGl6ZShlbGVtZW50KTtcblxuXHRsZXQgZmluaXNoZWQgPSBmYWxzZTtcblxuXHRsZXQgdHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdGlmICghZmluaXNoZWQpIHtcblx0XHRcdGZpbmlzaGVkID0gdHJ1ZTtcblx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihicm93c2VyU3BlY2lmaWNUcmFuc2l0aW9uRW5kRXZlbnROYW1lLCB0cmFuc2l0aW9uRW5kKTtcblx0XHRcdGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihicm93c2VyU3BlY2lmaWNBbmltYXRpb25FbmRFdmVudE5hbWUsIHRyYW5zaXRpb25FbmQpO1xuXG5cdFx0XHRmaW5pc2hBbmltYXRpb24oKTtcblx0XHR9XG5cdH07XG5cblx0c3RhcnRBbmltYXRpb24oKTtcblxuXHRlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoYnJvd3NlclNwZWNpZmljQW5pbWF0aW9uRW5kRXZlbnROYW1lLCB0cmFuc2l0aW9uRW5kKTtcblx0ZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGJyb3dzZXJTcGVjaWZpY1RyYW5zaXRpb25FbmRFdmVudE5hbWUsIHRyYW5zaXRpb25FbmQpO1xufVxuXG5mdW5jdGlvbiBleGl0KG5vZGU6IEhUTUxFbGVtZW50LCBwcm9wZXJ0aWVzOiBWTm9kZVByb3BlcnRpZXMsIGV4aXRBbmltYXRpb246IHN0cmluZywgcmVtb3ZlTm9kZTogKCkgPT4gdm9pZCkge1xuXHRjb25zdCBhY3RpdmVDbGFzcyA9IHByb3BlcnRpZXMuZXhpdEFuaW1hdGlvbkFjdGl2ZSB8fCBgJHtleGl0QW5pbWF0aW9ufS1hY3RpdmVgO1xuXG5cdHJ1bkFuZENsZWFuVXAoXG5cdFx0bm9kZSxcblx0XHQoKSA9PiB7XG5cdFx0XHRub2RlLmNsYXNzTGlzdC5hZGQoZXhpdEFuaW1hdGlvbik7XG5cblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcblx0XHRcdFx0bm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0KCkgPT4ge1xuXHRcdFx0cmVtb3ZlTm9kZSgpO1xuXHRcdH1cblx0KTtcbn1cblxuZnVuY3Rpb24gZW50ZXIobm9kZTogSFRNTEVsZW1lbnQsIHByb3BlcnRpZXM6IFZOb2RlUHJvcGVydGllcywgZW50ZXJBbmltYXRpb246IHN0cmluZykge1xuXHRjb25zdCBhY3RpdmVDbGFzcyA9IHByb3BlcnRpZXMuZW50ZXJBbmltYXRpb25BY3RpdmUgfHwgYCR7ZW50ZXJBbmltYXRpb259LWFjdGl2ZWA7XG5cblx0cnVuQW5kQ2xlYW5VcChcblx0XHRub2RlLFxuXHRcdCgpID0+IHtcblx0XHRcdG5vZGUuY2xhc3NMaXN0LmFkZChlbnRlckFuaW1hdGlvbik7XG5cblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcblx0XHRcdFx0bm9kZS5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdFx0KCkgPT4ge1xuXHRcdFx0bm9kZS5jbGFzc0xpc3QucmVtb3ZlKGVudGVyQW5pbWF0aW9uKTtcblx0XHRcdG5vZGUuY2xhc3NMaXN0LnJlbW92ZShhY3RpdmVDbGFzcyk7XG5cdFx0fVxuXHQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGVudGVyLFxuXHRleGl0XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNzc1RyYW5zaXRpb25zLnRzIiwiaW1wb3J0IFN5bWJvbCBmcm9tICdAZG9qby9zaGltL1N5bWJvbCc7XG5pbXBvcnQge1xuXHRDb25zdHJ1Y3Rvcixcblx0RGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdERlZmVycmVkVmlydHVhbFByb3BlcnRpZXMsXG5cdEROb2RlLFxuXHRWTm9kZSxcblx0UmVnaXN0cnlMYWJlbCxcblx0Vk5vZGVQcm9wZXJ0aWVzLFxuXHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRXTm9kZSxcblx0RG9tT3B0aW9uc1xufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgSW50ZXJuYWxWTm9kZSwgUmVuZGVyUmVzdWx0IH0gZnJvbSAnLi92ZG9tJztcblxuLyoqXG4gKiBUaGUgc3ltYm9sIGlkZW50aWZpZXIgZm9yIGEgV05vZGUgdHlwZVxuICovXG5leHBvcnQgY29uc3QgV05PREUgPSBTeW1ib2woJ0lkZW50aWZpZXIgZm9yIGEgV05vZGUuJyk7XG5cbi8qKlxuICogVGhlIHN5bWJvbCBpZGVudGlmaWVyIGZvciBhIFZOb2RlIHR5cGVcbiAqL1xuZXhwb3J0IGNvbnN0IFZOT0RFID0gU3ltYm9sKCdJZGVudGlmaWVyIGZvciBhIFZOb2RlLicpO1xuXG4vKipcbiAqIFRoZSBzeW1ib2wgaWRlbnRpZmllciBmb3IgYSBWTm9kZSB0eXBlIGNyZWF0ZWQgdXNpbmcgZG9tKClcbiAqL1xuZXhwb3J0IGNvbnN0IERPTVZOT0RFID0gU3ltYm9sKCdJZGVudGlmaWVyIGZvciBhIFZOb2RlIGNyZWF0ZWQgdXNpbmcgZXhpc3RpbmcgZG9tLicpO1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiB0aGUgYEROb2RlYCBpcyBhIGBXTm9kZWAgdXNpbmcgdGhlIGB0eXBlYCBwcm9wZXJ0eVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNXTm9kZTxXIGV4dGVuZHMgV2lkZ2V0QmFzZUludGVyZmFjZSA9IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlPihcblx0Y2hpbGQ6IEROb2RlPFc+XG4pOiBjaGlsZCBpcyBXTm9kZTxXPiB7XG5cdHJldHVybiBCb29sZWFuKGNoaWxkICYmIHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgY2hpbGQudHlwZSA9PT0gV05PREUpO1xufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiB0aGUgYEROb2RlYCBpcyBhIGBWTm9kZWAgdXNpbmcgdGhlIGB0eXBlYCBwcm9wZXJ0eVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNWTm9kZShjaGlsZDogRE5vZGUpOiBjaGlsZCBpcyBWTm9kZSB7XG5cdHJldHVybiBCb29sZWFuKGNoaWxkICYmIHR5cGVvZiBjaGlsZCAhPT0gJ3N0cmluZycgJiYgKGNoaWxkLnR5cGUgPT09IFZOT0RFIHx8IGNoaWxkLnR5cGUgPT09IERPTVZOT0RFKSk7XG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0cnVlIGlmIHRoZSBgRE5vZGVgIGlzIGEgYFZOb2RlYCBjcmVhdGVkIHdpdGggYGRvbSgpYCB1c2luZyB0aGUgYHR5cGVgIHByb3BlcnR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RvbVZOb2RlKGNoaWxkOiBETm9kZSk6IGNoaWxkIGlzIFZOb2RlIHtcblx0cmV0dXJuIEJvb2xlYW4oY2hpbGQgJiYgdHlwZW9mIGNoaWxkICE9PSAnc3RyaW5nJyAmJiBjaGlsZC50eXBlID09PSBET01WTk9ERSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VsZW1lbnROb2RlKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBFbGVtZW50IHtcblx0cmV0dXJuICEhdmFsdWUudGFnTmFtZTtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgZm9yIHRoZSBkZWNvcmF0ZSBtb2RpZmllclxuICovXG5leHBvcnQgaW50ZXJmYWNlIE1vZGlmaWVyPFQgZXh0ZW5kcyBETm9kZT4ge1xuXHQoZE5vZGU6IFQsIGJyZWFrZXI6ICgpID0+IHZvaWQpOiB2b2lkO1xufVxuXG4vKipcbiAqIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gZm9yIGRlY29yYXRlXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUHJlZGljYXRlPFQgZXh0ZW5kcyBETm9kZT4ge1xuXHQoZE5vZGU6IEROb2RlKTogZE5vZGUgaXMgVDtcbn1cblxuLyoqXG4gKiBEZWNvcmF0b3Igb3B0aW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIERlY29yYXRlT3B0aW9uczxUIGV4dGVuZHMgRE5vZGU+IHtcblx0bW9kaWZpZXI6IE1vZGlmaWVyPFQ+O1xuXHRwcmVkaWNhdGU/OiBQcmVkaWNhdGU8VD47XG5cdHNoYWxsb3c/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEdlbmVyaWMgZGVjb3JhdGUgZnVuY3Rpb24gZm9yIEROb2Rlcy4gVGhlIG5vZGVzIGFyZSBtb2RpZmllZCBpbiBwbGFjZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgcHJlZGljYXRlXG4gKiBhbmQgbW9kaWZpZXIgZnVuY3Rpb25zLlxuICpcbiAqIFRoZSBjaGlsZHJlbiBvZiBlYWNoIG5vZGUgYXJlIGZsYXR0ZW5lZCBhbmQgYWRkZWQgdG8gdGhlIGFycmF5IGZvciBkZWNvcmF0aW9uLlxuICpcbiAqIElmIG5vIHByZWRpY2F0ZSBpcyBzdXBwbGllZCB0aGVuIHRoZSBtb2RpZmllciB3aWxsIGJlIGV4ZWN1dGVkIG9uIGFsbCBub2Rlcy4gQSBgYnJlYWtlcmAgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIHRoZVxuICogbW9kaWZpZXIgd2hpY2ggd2lsbCBkcmFpbiB0aGUgbm9kZXMgYXJyYXkgYW5kIGV4aXQgdGhlIGRlY29yYXRpb24uXG4gKlxuICogV2hlbiB0aGUgYHNoYWxsb3dgIG9wdGlvbnMgaXMgc2V0IHRvIGB0cnVlYCB0aGUgb25seSB0aGUgdG9wIG5vZGUgb3Igbm9kZXMgd2lsbCBiZSBkZWNvcmF0ZWQgKG9ubHkgc3VwcG9ydGVkIHVzaW5nXG4gKiBgRGVjb3JhdGVPcHRpb25zYCkuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZTxUIGV4dGVuZHMgRE5vZGU+KGROb2RlczogRE5vZGUsIG9wdGlvbnM6IERlY29yYXRlT3B0aW9uczxUPik6IEROb2RlO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29yYXRlPFQgZXh0ZW5kcyBETm9kZT4oZE5vZGVzOiBETm9kZVtdLCBvcHRpb25zOiBEZWNvcmF0ZU9wdGlvbnM8VD4pOiBETm9kZVtdO1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29yYXRlPFQgZXh0ZW5kcyBETm9kZT4oZE5vZGVzOiBETm9kZSB8IEROb2RlW10sIG9wdGlvbnM6IERlY29yYXRlT3B0aW9uczxUPik6IEROb2RlIHwgRE5vZGVbXTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZTxUIGV4dGVuZHMgRE5vZGU+KGROb2RlczogRE5vZGUsIG1vZGlmaWVyOiBNb2RpZmllcjxUPiwgcHJlZGljYXRlOiBQcmVkaWNhdGU8VD4pOiBETm9kZTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZTxUIGV4dGVuZHMgRE5vZGU+KGROb2RlczogRE5vZGVbXSwgbW9kaWZpZXI6IE1vZGlmaWVyPFQ+LCBwcmVkaWNhdGU6IFByZWRpY2F0ZTxUPik6IEROb2RlW107XG5leHBvcnQgZnVuY3Rpb24gZGVjb3JhdGU8VCBleHRlbmRzIEROb2RlPihcblx0ZE5vZGVzOiBSZW5kZXJSZXN1bHQsXG5cdG1vZGlmaWVyOiBNb2RpZmllcjxUPixcblx0cHJlZGljYXRlOiBQcmVkaWNhdGU8VD5cbik6IFJlbmRlclJlc3VsdDtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZShkTm9kZXM6IEROb2RlLCBtb2RpZmllcjogTW9kaWZpZXI8RE5vZGU+KTogRE5vZGU7XG5leHBvcnQgZnVuY3Rpb24gZGVjb3JhdGUoZE5vZGVzOiBETm9kZVtdLCBtb2RpZmllcjogTW9kaWZpZXI8RE5vZGU+KTogRE5vZGVbXTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZShkTm9kZXM6IFJlbmRlclJlc3VsdCwgbW9kaWZpZXI6IE1vZGlmaWVyPEROb2RlPik6IFJlbmRlclJlc3VsdDtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvcmF0ZShcblx0ZE5vZGVzOiBETm9kZSB8IEROb2RlW10sXG5cdG9wdGlvbnNPck1vZGlmaWVyOiBNb2RpZmllcjxETm9kZT4gfCBEZWNvcmF0ZU9wdGlvbnM8RE5vZGU+LFxuXHRwcmVkaWNhdGU/OiBQcmVkaWNhdGU8RE5vZGU+XG4pOiBETm9kZSB8IEROb2RlW10ge1xuXHRsZXQgc2hhbGxvdyA9IGZhbHNlO1xuXHRsZXQgbW9kaWZpZXI7XG5cdGlmICh0eXBlb2Ygb3B0aW9uc09yTW9kaWZpZXIgPT09ICdmdW5jdGlvbicpIHtcblx0XHRtb2RpZmllciA9IG9wdGlvbnNPck1vZGlmaWVyO1xuXHR9IGVsc2Uge1xuXHRcdG1vZGlmaWVyID0gb3B0aW9uc09yTW9kaWZpZXIubW9kaWZpZXI7XG5cdFx0cHJlZGljYXRlID0gb3B0aW9uc09yTW9kaWZpZXIucHJlZGljYXRlO1xuXHRcdHNoYWxsb3cgPSBvcHRpb25zT3JNb2RpZmllci5zaGFsbG93IHx8IGZhbHNlO1xuXHR9XG5cblx0bGV0IG5vZGVzID0gQXJyYXkuaXNBcnJheShkTm9kZXMpID8gWy4uLmROb2Rlc10gOiBbZE5vZGVzXTtcblx0ZnVuY3Rpb24gYnJlYWtlcigpIHtcblx0XHRub2RlcyA9IFtdO1xuXHR9XG5cdHdoaWxlIChub2Rlcy5sZW5ndGgpIHtcblx0XHRjb25zdCBub2RlID0gbm9kZXMuc2hpZnQoKTtcblx0XHRpZiAobm9kZSkge1xuXHRcdFx0aWYgKCFzaGFsbG93ICYmIChpc1dOb2RlKG5vZGUpIHx8IGlzVk5vZGUobm9kZSkpICYmIG5vZGUuY2hpbGRyZW4pIHtcblx0XHRcdFx0bm9kZXMgPSBbLi4ubm9kZXMsIC4uLm5vZGUuY2hpbGRyZW5dO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCFwcmVkaWNhdGUgfHwgcHJlZGljYXRlKG5vZGUpKSB7XG5cdFx0XHRcdG1vZGlmaWVyKG5vZGUsIGJyZWFrZXIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gZE5vZGVzO1xufVxuXG4vKipcbiAqIFdyYXBwZXIgZnVuY3Rpb24gZm9yIGNhbGxzIHRvIGNyZWF0ZSBhIHdpZGdldC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHc8VyBleHRlbmRzIFdpZGdldEJhc2VJbnRlcmZhY2U+KFxuXHR3aWRnZXRDb25zdHJ1Y3RvcjogQ29uc3RydWN0b3I8Vz4gfCBSZWdpc3RyeUxhYmVsLFxuXHRwcm9wZXJ0aWVzOiBXWydwcm9wZXJ0aWVzJ10sXG5cdGNoaWxkcmVuOiBXWydjaGlsZHJlbiddID0gW11cbik6IFdOb2RlPFc+IHtcblx0cmV0dXJuIHtcblx0XHRjaGlsZHJlbixcblx0XHR3aWRnZXRDb25zdHJ1Y3Rvcixcblx0XHRwcm9wZXJ0aWVzLFxuXHRcdHR5cGU6IFdOT0RFXG5cdH07XG59XG5cbi8qKlxuICogV3JhcHBlciBmdW5jdGlvbiBmb3IgY2FsbHMgdG8gY3JlYXRlIFZOb2Rlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHYodGFnOiBzdHJpbmcsIGNoaWxkcmVuOiB1bmRlZmluZWQgfCBETm9kZVtdKTogVk5vZGU7XG5leHBvcnQgZnVuY3Rpb24gdih0YWc6IHN0cmluZywgcHJvcGVydGllczogRGVmZXJyZWRWaXJ0dWFsUHJvcGVydGllcyB8IFZOb2RlUHJvcGVydGllcywgY2hpbGRyZW4/OiBETm9kZVtdKTogVk5vZGU7XG5leHBvcnQgZnVuY3Rpb24gdih0YWc6IHN0cmluZyk6IFZOb2RlO1xuZXhwb3J0IGZ1bmN0aW9uIHYoXG5cdHRhZzogc3RyaW5nLFxuXHRwcm9wZXJ0aWVzT3JDaGlsZHJlbjogVk5vZGVQcm9wZXJ0aWVzIHwgRGVmZXJyZWRWaXJ0dWFsUHJvcGVydGllcyB8IEROb2RlW10gPSB7fSxcblx0Y2hpbGRyZW46IHVuZGVmaW5lZCB8IEROb2RlW10gPSB1bmRlZmluZWRcbik6IFZOb2RlIHtcblx0bGV0IHByb3BlcnRpZXM6IFZOb2RlUHJvcGVydGllcyB8IERlZmVycmVkVmlydHVhbFByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzT3JDaGlsZHJlbjtcblx0bGV0IGRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrO1xuXG5cdGlmIChBcnJheS5pc0FycmF5KHByb3BlcnRpZXNPckNoaWxkcmVuKSkge1xuXHRcdGNoaWxkcmVuID0gcHJvcGVydGllc09yQ2hpbGRyZW47XG5cdFx0cHJvcGVydGllcyA9IHt9O1xuXHR9XG5cblx0aWYgKHR5cGVvZiBwcm9wZXJ0aWVzID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0ZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2sgPSBwcm9wZXJ0aWVzO1xuXHRcdHByb3BlcnRpZXMgPSB7fTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0dGFnLFxuXHRcdGRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrLFxuXHRcdGNoaWxkcmVuLFxuXHRcdHByb3BlcnRpZXMsXG5cdFx0dHlwZTogVk5PREVcblx0fTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBWTm9kZSBmb3IgYW4gZXhpc3RpbmcgRE9NIE5vZGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkb20oXG5cdHsgbm9kZSwgYXR0cnMgPSB7fSwgcHJvcHMgPSB7fSwgb24gPSB7fSwgZGlmZlR5cGUgPSAnbm9uZScgfTogRG9tT3B0aW9ucyxcblx0Y2hpbGRyZW4/OiBETm9kZVtdXG4pOiBWTm9kZSB7XG5cdHJldHVybiB7XG5cdFx0dGFnOiBpc0VsZW1lbnROb2RlKG5vZGUpID8gbm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgOiAnJyxcblx0XHRwcm9wZXJ0aWVzOiBwcm9wcyxcblx0XHRhdHRyaWJ1dGVzOiBhdHRycyxcblx0XHRldmVudHM6IG9uLFxuXHRcdGNoaWxkcmVuLFxuXHRcdHR5cGU6IERPTVZOT0RFLFxuXHRcdGRvbU5vZGU6IG5vZGUsXG5cdFx0dGV4dDogaXNFbGVtZW50Tm9kZShub2RlKSA/IHVuZGVmaW5lZCA6IG5vZGUuZGF0YSxcblx0XHRkaWZmVHlwZVxuXHR9IGFzIEludGVybmFsVk5vZGU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZC50cyIsImltcG9ydCB7IGhhbmRsZURlY29yYXRvciB9IGZyb20gJy4vaGFuZGxlRGVjb3JhdG9yJztcblxuLyoqXG4gKiBEZWNvcmF0b3IgdGhhdCBjYW4gYmUgdXNlZCB0byByZWdpc3RlciBhIGZ1bmN0aW9uIHRvIHJ1biBhcyBhbiBhc3BlY3QgdG8gYHJlbmRlcmBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFmdGVyUmVuZGVyKG1ldGhvZDogRnVuY3Rpb24pOiAodGFyZ2V0OiBhbnkpID0+IHZvaWQ7XG5leHBvcnQgZnVuY3Rpb24gYWZ0ZXJSZW5kZXIoKTogKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKSA9PiB2b2lkO1xuZXhwb3J0IGZ1bmN0aW9uIGFmdGVyUmVuZGVyKG1ldGhvZD86IEZ1bmN0aW9uKSB7XG5cdHJldHVybiBoYW5kbGVEZWNvcmF0b3IoKHRhcmdldCwgcHJvcGVydHlLZXkpID0+IHtcblx0XHR0YXJnZXQuYWRkRGVjb3JhdG9yKCdhZnRlclJlbmRlcicsIHByb3BlcnR5S2V5ID8gdGFyZ2V0W3Byb3BlcnR5S2V5XSA6IG1ldGhvZCk7XG5cdH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhZnRlclJlbmRlcjtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBhZnRlclJlbmRlci50cyIsImV4cG9ydCB0eXBlIERlY29yYXRvckhhbmRsZXIgPSAodGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5Pzogc3RyaW5nKSA9PiB2b2lkO1xuXG4vKipcbiAqIEdlbmVyaWMgZGVjb3JhdG9yIGhhbmRsZXIgdG8gdGFrZSBjYXJlIG9mIHdoZXRoZXIgb3Igbm90IHRoZSBkZWNvcmF0b3Igd2FzIGNhbGxlZCBhdCB0aGUgY2xhc3MgbGV2ZWxcbiAqIG9yIHRoZSBtZXRob2QgbGV2ZWwuXG4gKlxuICogQHBhcmFtIGhhbmRsZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZURlY29yYXRvcihoYW5kbGVyOiBEZWNvcmF0b3JIYW5kbGVyKSB7XG5cdHJldHVybiBmdW5jdGlvbih0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk/OiBzdHJpbmcsIGRlc2NyaXB0b3I/OiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcblx0XHRpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0aGFuZGxlcih0YXJnZXQucHJvdG90eXBlLCB1bmRlZmluZWQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRoYW5kbGVyKHRhcmdldCwgcHJvcGVydHlLZXkpO1xuXHRcdH1cblx0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRGVjb3JhdG9yO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGhhbmRsZURlY29yYXRvci50cyIsImltcG9ydCB7IFByb3BlcnR5Q2hhbmdlUmVjb3JkIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFdJREdFVF9CQVNFX1RZUEUgfSBmcm9tICcuL1JlZ2lzdHJ5JztcblxuZnVuY3Rpb24gaXNPYmplY3RPckFycmF5KHZhbHVlOiBhbnkpOiBib29sZWFuIHtcblx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IE9iamVjdF0nIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWx3YXlzKHByZXZpb3VzUHJvcGVydHk6IGFueSwgbmV3UHJvcGVydHk6IGFueSk6IFByb3BlcnR5Q2hhbmdlUmVjb3JkIHtcblx0cmV0dXJuIHtcblx0XHRjaGFuZ2VkOiB0cnVlLFxuXHRcdHZhbHVlOiBuZXdQcm9wZXJ0eVxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaWdub3JlKHByZXZpb3VzUHJvcGVydHk6IGFueSwgbmV3UHJvcGVydHk6IGFueSk6IFByb3BlcnR5Q2hhbmdlUmVjb3JkIHtcblx0cmV0dXJuIHtcblx0XHRjaGFuZ2VkOiBmYWxzZSxcblx0XHR2YWx1ZTogbmV3UHJvcGVydHlcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZmVyZW5jZShwcmV2aW91c1Byb3BlcnR5OiBhbnksIG5ld1Byb3BlcnR5OiBhbnkpOiBQcm9wZXJ0eUNoYW5nZVJlY29yZCB7XG5cdHJldHVybiB7XG5cdFx0Y2hhbmdlZDogcHJldmlvdXNQcm9wZXJ0eSAhPT0gbmV3UHJvcGVydHksXG5cdFx0dmFsdWU6IG5ld1Byb3BlcnR5XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaGFsbG93KHByZXZpb3VzUHJvcGVydHk6IGFueSwgbmV3UHJvcGVydHk6IGFueSk6IFByb3BlcnR5Q2hhbmdlUmVjb3JkIHtcblx0bGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuXHRjb25zdCB2YWxpZE9sZFByb3BlcnR5ID0gcHJldmlvdXNQcm9wZXJ0eSAmJiBpc09iamVjdE9yQXJyYXkocHJldmlvdXNQcm9wZXJ0eSk7XG5cdGNvbnN0IHZhbGlkTmV3UHJvcGVydHkgPSBuZXdQcm9wZXJ0eSAmJiBpc09iamVjdE9yQXJyYXkobmV3UHJvcGVydHkpO1xuXG5cdGlmICghdmFsaWRPbGRQcm9wZXJ0eSB8fCAhdmFsaWROZXdQcm9wZXJ0eSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjaGFuZ2VkOiB0cnVlLFxuXHRcdFx0dmFsdWU6IG5ld1Byb3BlcnR5XG5cdFx0fTtcblx0fVxuXG5cdGNvbnN0IHByZXZpb3VzS2V5cyA9IE9iamVjdC5rZXlzKHByZXZpb3VzUHJvcGVydHkpO1xuXHRjb25zdCBuZXdLZXlzID0gT2JqZWN0LmtleXMobmV3UHJvcGVydHkpO1xuXG5cdGlmIChwcmV2aW91c0tleXMubGVuZ3RoICE9PSBuZXdLZXlzLmxlbmd0aCkge1xuXHRcdGNoYW5nZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXHRcdGNoYW5nZWQgPSBuZXdLZXlzLnNvbWUoKGtleSkgPT4ge1xuXHRcdFx0cmV0dXJuIG5ld1Byb3BlcnR5W2tleV0gIT09IHByZXZpb3VzUHJvcGVydHlba2V5XTtcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdGNoYW5nZWQsXG5cdFx0dmFsdWU6IG5ld1Byb3BlcnR5XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdXRvKHByZXZpb3VzUHJvcGVydHk6IGFueSwgbmV3UHJvcGVydHk6IGFueSk6IFByb3BlcnR5Q2hhbmdlUmVjb3JkIHtcblx0bGV0IHJlc3VsdDtcblx0aWYgKHR5cGVvZiBuZXdQcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdGlmIChuZXdQcm9wZXJ0eS5fdHlwZSA9PT0gV0lER0VUX0JBU0VfVFlQRSkge1xuXHRcdFx0cmVzdWx0ID0gcmVmZXJlbmNlKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ID0gaWdub3JlKHByZXZpb3VzUHJvcGVydHksIG5ld1Byb3BlcnR5KTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoaXNPYmplY3RPckFycmF5KG5ld1Byb3BlcnR5KSkge1xuXHRcdHJlc3VsdCA9IHNoYWxsb3cocHJldmlvdXNQcm9wZXJ0eSwgbmV3UHJvcGVydHkpO1xuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9IHJlZmVyZW5jZShwcmV2aW91c1Byb3BlcnR5LCBuZXdQcm9wZXJ0eSk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBkaWZmLnRzIiwiaW1wb3J0IHsgYXNzaWduIH0gZnJvbSAnQGRvam8vY29yZS9sYW5nJztcbmltcG9ydCB7IEhhbmRsZSB9IGZyb20gJ0Bkb2pvL2NvcmUvaW50ZXJmYWNlcyc7XG5pbXBvcnQgY3NzVHJhbnNpdGlvbnMgZnJvbSAnLi4vYW5pbWF0aW9ucy9jc3NUcmFuc2l0aW9ucyc7XG5pbXBvcnQgeyBDb25zdHJ1Y3RvciwgRE5vZGUsIFByb2plY3Rpb24sIFByb2plY3Rpb25PcHRpb25zIH0gZnJvbSAnLi8uLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFdpZGdldEJhc2UgfSBmcm9tICcuLy4uL1dpZGdldEJhc2UnO1xuaW1wb3J0IHsgYWZ0ZXJSZW5kZXIgfSBmcm9tICcuLy4uL2RlY29yYXRvcnMvYWZ0ZXJSZW5kZXInO1xuaW1wb3J0IHsgdiB9IGZyb20gJy4vLi4vZCc7XG5pbXBvcnQgeyBSZWdpc3RyeSB9IGZyb20gJy4vLi4vUmVnaXN0cnknO1xuaW1wb3J0IHsgZG9tIH0gZnJvbSAnLi8uLi92ZG9tJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBhdHRhY2ggc3RhdGUgb2YgdGhlIHByb2plY3RvclxuICovXG5leHBvcnQgZW51bSBQcm9qZWN0b3JBdHRhY2hTdGF0ZSB7XG5cdEF0dGFjaGVkID0gMSxcblx0RGV0YWNoZWRcbn1cblxuLyoqXG4gKiBBdHRhY2ggdHlwZSBmb3IgdGhlIHByb2plY3RvclxuICovXG5leHBvcnQgZW51bSBBdHRhY2hUeXBlIHtcblx0QXBwZW5kID0gMSxcblx0TWVyZ2UgPSAyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXR0YWNoT3B0aW9ucyB7XG5cdC8qKlxuXHQgKiBJZiBgJ2FwcGVuZCdgIGl0IHdpbGwgYXBwZW5kZWQgdG8gdGhlIHJvb3QuIElmIGAnbWVyZ2UnYCBpdCB3aWxsIG1lcmdlZCB3aXRoIHRoZSByb290LiBJZiBgJ3JlcGxhY2UnYCBpdCB3aWxsXG5cdCAqIHJlcGxhY2UgdGhlIHJvb3QuXG5cdCAqL1xuXHR0eXBlOiBBdHRhY2hUeXBlO1xuXG5cdC8qKlxuXHQgKiBFbGVtZW50IHRvIGF0dGFjaCB0aGUgcHJvamVjdG9yLlxuXHQgKi9cblx0cm9vdD86IEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdG9yUHJvcGVydGllcyB7XG5cdHJlZ2lzdHJ5PzogUmVnaXN0cnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvamVjdG9yTWl4aW48UD4ge1xuXHRyZWFkb25seSBwcm9wZXJ0aWVzOiBSZWFkb25seTxQPiAmIFJlYWRvbmx5PFByb2plY3RvclByb3BlcnRpZXM+O1xuXG5cdC8qKlxuXHQgKiBBcHBlbmQgdGhlIHByb2plY3RvciB0byB0aGUgcm9vdC5cblx0ICovXG5cdGFwcGVuZChyb290PzogRWxlbWVudCk6IEhhbmRsZTtcblxuXHQvKipcblx0ICogTWVyZ2UgdGhlIHByb2plY3RvciBvbnRvIHRoZSByb290LlxuXHQgKlxuXHQgKiBUaGUgYHJvb3RgIGFuZCBhbnkgb2YgaXRzIGBjaGlsZHJlbmAgd2lsbCBiZSByZS11c2VkLiAgQW55IGV4Y2VzcyBET00gbm9kZXMgd2lsbCBiZSBpZ25vcmVkIGFuZCBhbnkgbWlzc2luZyBET00gbm9kZXNcblx0ICogd2lsbCBiZSBjcmVhdGVkLlxuXHQgKiBAcGFyYW0gcm9vdCBUaGUgcm9vdCBlbGVtZW50IHRoYXQgdGhlIHJvb3QgdmlydHVhbCBET00gbm9kZSB3aWxsIGJlIG1lcmdlZCB3aXRoLiAgRGVmYXVsdHMgdG8gYGRvY3VtZW50LmJvZHlgLlxuXHQgKi9cblx0bWVyZ2Uocm9vdD86IEVsZW1lbnQpOiBIYW5kbGU7XG5cblx0LyoqXG5cdCAqIEF0dGFjaCB0aGUgcHJvamVjdCB0byBhIF9zYW5kYm94ZWRfIGRvY3VtZW50IGZyYWdtZW50IHRoYXQgaXMgbm90IHBhcnQgb2YgdGhlIERPTS5cblx0ICpcblx0ICogV2hlbiBzYW5kYm94ZWQsIHRoZSBgUHJvamVjdG9yYCB3aWxsIHJ1biBpbiBhIHN5bmMgbWFubmVyLCB3aGVyZSByZW5kZXJzIGFyZSBjb21wbGV0ZWQgd2l0aGluIHRoZSBzYW1lIHR1cm4uXG5cdCAqIFRoZSBgUHJvamVjdG9yYCBjcmVhdGVzIGEgYERvY3VtZW50RnJhZ21lbnRgIHdoaWNoIHJlcGxhY2VzIGFueSBvdGhlciBgcm9vdGAgdGhhdCBoYXMgYmVlbiBzZXQuXG5cdCAqIEBwYXJhbSBkb2MgVGhlIGBEb2N1bWVudGAgdG8gdXNlLCB3aGljaCBkZWZhdWx0cyB0byB0aGUgZ2xvYmFsIGBkb2N1bWVudGAuXG5cdCAqL1xuXHRzYW5kYm94KGRvYz86IERvY3VtZW50KTogdm9pZDtcblxuXHQvKipcblx0ICogU2V0cyB0aGUgcHJvcGVydGllcyBmb3IgdGhlIHdpZGdldC4gUmVzcG9uc2libGUgZm9yIGNhbGxpbmcgdGhlIGRpZmZpbmcgZnVuY3Rpb25zIGZvciB0aGUgcHJvcGVydGllcyBhZ2FpbnN0IHRoZVxuXHQgKiBwcmV2aW91cyBwcm9wZXJ0aWVzLiBSdW5zIHRob3VnaCBhbnkgcmVnaXN0ZXJlZCBzcGVjaWZpYyBwcm9wZXJ0eSBkaWZmIGZ1bmN0aW9ucyBjb2xsZWN0aW5nIHRoZSByZXN1bHRzIGFuZCB0aGVuXG5cdCAqIHJ1bnMgdGhlIHJlbWFpbmRlciB0aHJvdWdoIHRoZSBjYXRjaCBhbGwgZGlmZiBmdW5jdGlvbi4gVGhlIGFnZ3JlZ2F0ZSBvZiB0aGUgdHdvIHNldHMgb2YgdGhlIHJlc3VsdHMgaXMgdGhlblxuXHQgKiBzZXQgYXMgdGhlIHdpZGdldCdzIHByb3BlcnRpZXNcblx0ICpcblx0ICogQHBhcmFtIHByb3BlcnRpZXMgVGhlIG5ldyB3aWRnZXQgcHJvcGVydGllc1xuXHQgKi9cblx0c2V0UHJvcGVydGllcyhwcm9wZXJ0aWVzOiB0aGlzWydwcm9wZXJ0aWVzJ10pOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBTZXRzIHRoZSB3aWRnZXQncyBjaGlsZHJlblxuXHQgKi9cblx0c2V0Q2hpbGRyZW4oY2hpbGRyZW46IEROb2RlW10pOiB2b2lkO1xuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBgc3RyaW5nYCB0aGF0IHJlcHJlc2VudHMgdGhlIEhUTUwgb2YgdGhlIGN1cnJlbnQgcHJvamVjdGlvbi4gIFRoZSBwcm9qZWN0b3IgbmVlZHMgdG8gYmUgYXR0YWNoZWQuXG5cdCAqL1xuXHR0b0h0bWwoKTogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBJbmRpY2F0ZXMgaWYgdGhlIHByb2plY3RvcnMgaXMgaW4gYXN5bmMgbW9kZSwgY29uZmlndXJlZCB0byBgdHJ1ZWAgYnkgZGVmYXVsdHMuXG5cdCAqL1xuXHRhc3luYzogYm9vbGVhbjtcblxuXHQvKipcblx0ICogUm9vdCBlbGVtZW50IHRvIGF0dGFjaCB0aGUgcHJvamVjdG9yXG5cdCAqL1xuXHRyb290OiBFbGVtZW50O1xuXG5cdC8qKlxuXHQgKiBUaGUgc3RhdHVzIG9mIHRoZSBwcm9qZWN0b3Jcblx0ICovXG5cdHJlYWRvbmx5IHByb2plY3RvclN0YXRlOiBQcm9qZWN0b3JBdHRhY2hTdGF0ZTtcblxuXHQvKipcblx0ICogUnVucyByZWdpc3RlcmVkIGRlc3Ryb3kgaGFuZGxlc1xuXHQgKi9cblx0ZGVzdHJveSgpOiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJvamVjdG9yTWl4aW48UCwgVCBleHRlbmRzIENvbnN0cnVjdG9yPFdpZGdldEJhc2U8UD4+PihCYXNlOiBUKTogVCAmIENvbnN0cnVjdG9yPFByb2plY3Rvck1peGluPFA+PiB7XG5cdGFic3RyYWN0IGNsYXNzIFByb2plY3RvciBleHRlbmRzIEJhc2Uge1xuXHRcdHB1YmxpYyBwcm9qZWN0b3JTdGF0ZTogUHJvamVjdG9yQXR0YWNoU3RhdGU7XG5cblx0XHRwcml2YXRlIF9yb290OiBFbGVtZW50ID0gZG9jdW1lbnQuYm9keTtcblx0XHRwcml2YXRlIF9hc3luYyA9IHRydWU7XG5cdFx0cHJpdmF0ZSBfYXR0YWNoSGFuZGxlOiBIYW5kbGUgfCB1bmRlZmluZWQ7XG5cdFx0cHJpdmF0ZSBfcHJvamVjdGlvbk9wdGlvbnM6IFBhcnRpYWw8UHJvamVjdGlvbk9wdGlvbnM+O1xuXHRcdHByaXZhdGUgX3Byb2plY3Rpb246IFByb2plY3Rpb24gfCB1bmRlZmluZWQ7XG5cdFx0cHJpdmF0ZSBfcHJvamVjdG9yUHJvcGVydGllczogdGhpc1sncHJvcGVydGllcyddID0ge30gYXMgdGhpc1sncHJvcGVydGllcyddO1xuXHRcdHB1YmxpYyBhYnN0cmFjdCBwcm9wZXJ0aWVzOiBSZWFkb25seTxQPiAmIFJlYWRvbmx5PFByb2plY3RvclByb3BlcnRpZXM+O1xuXG5cdFx0Y29uc3RydWN0b3IoLi4uYXJnczogYW55W10pIHtcblx0XHRcdHN1cGVyKC4uLmFyZ3MpO1xuXG5cdFx0XHR0aGlzLl9wcm9qZWN0aW9uT3B0aW9ucyA9IHtcblx0XHRcdFx0dHJhbnNpdGlvbnM6IGNzc1RyYW5zaXRpb25zXG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLnJvb3QgPSBkb2N1bWVudC5ib2R5O1xuXHRcdFx0dGhpcy5wcm9qZWN0b3JTdGF0ZSA9IFByb2plY3RvckF0dGFjaFN0YXRlLkRldGFjaGVkO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBhcHBlbmQocm9vdD86IEVsZW1lbnQpOiBIYW5kbGUge1xuXHRcdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdFx0dHlwZTogQXR0YWNoVHlwZS5BcHBlbmQsXG5cdFx0XHRcdHJvb3Rcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiB0aGlzLl9hdHRhY2gob3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0cHVibGljIG1lcmdlKHJvb3Q/OiBFbGVtZW50KTogSGFuZGxlIHtcblx0XHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRcdHR5cGU6IEF0dGFjaFR5cGUuTWVyZ2UsXG5cdFx0XHRcdHJvb3Rcblx0XHRcdH07XG5cblx0XHRcdHJldHVybiB0aGlzLl9hdHRhY2gob3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0cHVibGljIHNldCByb290KHJvb3Q6IEVsZW1lbnQpIHtcblx0XHRcdGlmICh0aGlzLnByb2plY3RvclN0YXRlID09PSBQcm9qZWN0b3JBdHRhY2hTdGF0ZS5BdHRhY2hlZCkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1Byb2plY3RvciBhbHJlYWR5IGF0dGFjaGVkLCBjYW5ub3QgY2hhbmdlIHJvb3QgZWxlbWVudCcpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fcm9vdCA9IHJvb3Q7XG5cdFx0fVxuXG5cdFx0cHVibGljIGdldCByb290KCk6IEVsZW1lbnQge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3Jvb3Q7XG5cdFx0fVxuXG5cdFx0cHVibGljIGdldCBhc3luYygpOiBib29sZWFuIHtcblx0XHRcdHJldHVybiB0aGlzLl9hc3luYztcblx0XHR9XG5cblx0XHRwdWJsaWMgc2V0IGFzeW5jKGFzeW5jOiBib29sZWFuKSB7XG5cdFx0XHRpZiAodGhpcy5wcm9qZWN0b3JTdGF0ZSA9PT0gUHJvamVjdG9yQXR0YWNoU3RhdGUuQXR0YWNoZWQpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdQcm9qZWN0b3IgYWxyZWFkeSBhdHRhY2hlZCwgY2Fubm90IGNoYW5nZSBhc3luYyBtb2RlJyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9hc3luYyA9IGFzeW5jO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBzYW5kYm94KGRvYzogRG9jdW1lbnQgPSBkb2N1bWVudCk6IHZvaWQge1xuXHRcdFx0aWYgKHRoaXMucHJvamVjdG9yU3RhdGUgPT09IFByb2plY3RvckF0dGFjaFN0YXRlLkF0dGFjaGVkKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignUHJvamVjdG9yIGFscmVhZHkgYXR0YWNoZWQsIGNhbm5vdCBjcmVhdGUgc2FuZGJveCcpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fYXN5bmMgPSBmYWxzZTtcblx0XHRcdGNvbnN0IHByZXZpb3VzUm9vdCA9IHRoaXMucm9vdDtcblxuXHRcdFx0LyogZnJlZSB1cCB0aGUgZG9jdW1lbnQgZnJhZ21lbnQgZm9yIEdDICovXG5cdFx0XHR0aGlzLm93bih7XG5cdFx0XHRcdGRlc3Ryb3k6ICgpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9yb290ID0gcHJldmlvdXNSb290O1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0dGhpcy5fYXR0YWNoKHtcblx0XHRcdFx0LyogRG9jdW1lbnRGcmFnbWVudCBpcyBub3QgYXNzaWduYWJsZSB0byBFbGVtZW50LCBidXQgcHJvdmlkZXMgZXZlcnl0aGluZyBuZWVkZWQgdG8gd29yayAqL1xuXHRcdFx0XHRyb290OiBkb2MuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpIGFzIGFueSxcblx0XHRcdFx0dHlwZTogQXR0YWNoVHlwZS5BcHBlbmRcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBzZXRDaGlsZHJlbihjaGlsZHJlbjogRE5vZGVbXSk6IHZvaWQge1xuXHRcdFx0dGhpcy5fX3NldENoaWxkcmVuX18oY2hpbGRyZW4pO1xuXHRcdH1cblxuXHRcdHB1YmxpYyBzZXRQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IHRoaXNbJ3Byb3BlcnRpZXMnXSk6IHZvaWQge1xuXHRcdFx0dGhpcy5fX3NldFByb3BlcnRpZXNfXyhwcm9wZXJ0aWVzKTtcblx0XHR9XG5cblx0XHRwdWJsaWMgX19zZXRQcm9wZXJ0aWVzX18ocHJvcGVydGllczogdGhpc1sncHJvcGVydGllcyddKTogdm9pZCB7XG5cdFx0XHRpZiAodGhpcy5fcHJvamVjdG9yUHJvcGVydGllcyAmJiB0aGlzLl9wcm9qZWN0b3JQcm9wZXJ0aWVzLnJlZ2lzdHJ5ICE9PSBwcm9wZXJ0aWVzLnJlZ2lzdHJ5KSB7XG5cdFx0XHRcdGlmICh0aGlzLl9wcm9qZWN0b3JQcm9wZXJ0aWVzLnJlZ2lzdHJ5KSB7XG5cdFx0XHRcdFx0dGhpcy5fcHJvamVjdG9yUHJvcGVydGllcy5yZWdpc3RyeS5kZXN0cm95KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX3Byb2plY3RvclByb3BlcnRpZXMgPSBhc3NpZ24oe30sIHByb3BlcnRpZXMpO1xuXHRcdFx0c3VwZXIuX19zZXRDb3JlUHJvcGVydGllc19fKHsgYmluZDogdGhpcywgYmFzZVJlZ2lzdHJ5OiBwcm9wZXJ0aWVzLnJlZ2lzdHJ5IH0pO1xuXHRcdFx0c3VwZXIuX19zZXRQcm9wZXJ0aWVzX18ocHJvcGVydGllcyk7XG5cdFx0fVxuXG5cdFx0cHVibGljIHRvSHRtbCgpOiBzdHJpbmcge1xuXHRcdFx0aWYgKHRoaXMucHJvamVjdG9yU3RhdGUgIT09IFByb2plY3RvckF0dGFjaFN0YXRlLkF0dGFjaGVkIHx8ICF0aGlzLl9wcm9qZWN0aW9uKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignUHJvamVjdG9yIGlzIG5vdCBhdHRhY2hlZCwgY2Fubm90IHJldHVybiBhbiBIVE1MIHN0cmluZyBvZiBwcm9qZWN0aW9uLicpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICh0aGlzLl9wcm9qZWN0aW9uLmRvbU5vZGUuY2hpbGROb2Rlc1swXSBhcyBFbGVtZW50KS5vdXRlckhUTUw7XG5cdFx0fVxuXG5cdFx0QGFmdGVyUmVuZGVyKClcblx0XHRwdWJsaWMgYWZ0ZXJSZW5kZXIocmVzdWx0OiBETm9kZSkge1xuXHRcdFx0bGV0IG5vZGUgPSByZXN1bHQ7XG5cdFx0XHRpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycgfHwgcmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG5vZGUgPSB2KCdzcGFuJywge30sIFtyZXN1bHRdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0fVxuXG5cdFx0cHVibGljIGRlc3Ryb3koKSB7XG5cdFx0XHRzdXBlci5kZXN0cm95KCk7XG5cdFx0fVxuXG5cdFx0cHJpdmF0ZSBfYXR0YWNoKHsgdHlwZSwgcm9vdCB9OiBBdHRhY2hPcHRpb25zKTogSGFuZGxlIHtcblx0XHRcdGlmIChyb290KSB7XG5cdFx0XHRcdHRoaXMucm9vdCA9IHJvb3Q7XG5cdFx0XHR9XG5cblx0XHRcdGlmICh0aGlzLl9hdHRhY2hIYW5kbGUpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuX2F0dGFjaEhhbmRsZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5wcm9qZWN0b3JTdGF0ZSA9IFByb2plY3RvckF0dGFjaFN0YXRlLkF0dGFjaGVkO1xuXG5cdFx0XHRjb25zdCBoYW5kbGUgPSB7XG5cdFx0XHRcdGRlc3Ryb3k6ICgpID0+IHtcblx0XHRcdFx0XHRpZiAodGhpcy5wcm9qZWN0b3JTdGF0ZSA9PT0gUHJvamVjdG9yQXR0YWNoU3RhdGUuQXR0YWNoZWQpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3Byb2plY3Rpb24gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHR0aGlzLnByb2plY3RvclN0YXRlID0gUHJvamVjdG9yQXR0YWNoU3RhdGUuRGV0YWNoZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHR0aGlzLm93bihoYW5kbGUpO1xuXHRcdFx0dGhpcy5fYXR0YWNoSGFuZGxlID0gaGFuZGxlO1xuXG5cdFx0XHR0aGlzLl9wcm9qZWN0aW9uT3B0aW9ucyA9IHsgLi4udGhpcy5fcHJvamVjdGlvbk9wdGlvbnMsIC4uLnsgc3luYzogIXRoaXMuX2FzeW5jIH0gfTtcblxuXHRcdFx0c3dpdGNoICh0eXBlKSB7XG5cdFx0XHRcdGNhc2UgQXR0YWNoVHlwZS5BcHBlbmQ6XG5cdFx0XHRcdFx0dGhpcy5fcHJvamVjdGlvbiA9IGRvbS5hcHBlbmQodGhpcy5yb290LCB0aGlzLCB0aGlzLl9wcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgQXR0YWNoVHlwZS5NZXJnZTpcblx0XHRcdFx0XHR0aGlzLl9wcm9qZWN0aW9uID0gZG9tLm1lcmdlKHRoaXMucm9vdCwgdGhpcywgdGhpcy5fcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdGhpcy5fYXR0YWNoSGFuZGxlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBQcm9qZWN0b3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3Rvck1peGluO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIFByb2plY3Rvci50cyIsImltcG9ydCBnbG9iYWwgZnJvbSAnQGRvam8vc2hpbS9nbG9iYWwnO1xuaW1wb3J0IHtcblx0Q29yZVByb3BlcnRpZXMsXG5cdERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRETm9kZSxcblx0Vk5vZGUsXG5cdFdOb2RlLFxuXHRQcm9qZWN0aW9uT3B0aW9ucyxcblx0UHJvamVjdGlvbixcblx0U3VwcG9ydGVkQ2xhc3NOYW1lLFxuXHRUcmFuc2l0aW9uU3RyYXRlZ3ksXG5cdFZOb2RlUHJvcGVydGllc1xufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgZnJvbSBhcyBhcnJheUZyb20gfSBmcm9tICdAZG9qby9zaGltL2FycmF5JztcbmltcG9ydCB7IGlzV05vZGUsIGlzVk5vZGUsIGlzRG9tVk5vZGUsIFZOT0RFLCBXTk9ERSB9IGZyb20gJy4vZCc7XG5pbXBvcnQgeyBpc1dpZGdldEJhc2VDb25zdHJ1Y3RvciB9IGZyb20gJy4vUmVnaXN0cnknO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnQGRvam8vc2hpbS9XZWFrTWFwJztcbmltcG9ydCBOb2RlSGFuZGxlciBmcm9tICcuL05vZGVIYW5kbGVyJztcbmltcG9ydCBSZWdpc3RyeUhhbmRsZXIgZnJvbSAnLi9SZWdpc3RyeUhhbmRsZXInO1xuXG5jb25zdCBOQU1FU1BBQ0VfVzMgPSAnaHR0cDovL3d3dy53My5vcmcvJztcbmNvbnN0IE5BTUVTUEFDRV9TVkcgPSBOQU1FU1BBQ0VfVzMgKyAnMjAwMC9zdmcnO1xuY29uc3QgTkFNRVNQQUNFX1hMSU5LID0gTkFNRVNQQUNFX1czICsgJzE5OTkveGxpbmsnO1xuXG5jb25zdCBlbXB0eUFycmF5OiAoSW50ZXJuYWxXTm9kZSB8IEludGVybmFsVk5vZGUpW10gPSBbXTtcblxuZXhwb3J0IHR5cGUgUmVuZGVyUmVzdWx0ID0gRE5vZGU8YW55PiB8IEROb2RlPGFueT5bXTtcblxuaW50ZXJmYWNlIEluc3RhbmNlTWFwRGF0YSB7XG5cdHBhcmVudFZOb2RlOiBJbnRlcm5hbFZOb2RlO1xuXHRkbm9kZTogSW50ZXJuYWxXTm9kZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbFdOb2RlIGV4dGVuZHMgV05vZGU8RGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2U+IHtcblx0LyoqXG5cdCAqIFRoZSBpbnN0YW5jZSBvZiB0aGUgd2lkZ2V0XG5cdCAqL1xuXHRpbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2U7XG5cblx0LyoqXG5cdCAqIFRoZSByZW5kZXJlZCBETm9kZXMgZnJvbSB0aGUgaW5zdGFuY2Vcblx0ICovXG5cdHJlbmRlcmVkOiBJbnRlcm5hbEROb2RlW107XG5cblx0LyoqXG5cdCAqIENvcmUgcHJvcGVydGllcyB0aGF0IGFyZSB1c2VkIGJ5IHRoZSB3aWRnZXQgY29yZSBzeXN0ZW1cblx0ICovXG5cdGNvcmVQcm9wZXJ0aWVzOiBDb3JlUHJvcGVydGllcztcblxuXHQvKipcblx0ICogQ2hpbGRyZW4gZm9yIHRoZSBXTm9kZVxuXHQgKi9cblx0Y2hpbGRyZW46IEludGVybmFsRE5vZGVbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbnRlcm5hbFZOb2RlIGV4dGVuZHMgVk5vZGUge1xuXHQvKipcblx0ICogQ2hpbGRyZW4gZm9yIHRoZSBWTm9kZVxuXHQgKi9cblx0Y2hpbGRyZW4/OiBJbnRlcm5hbEROb2RlW107XG5cblx0aW5zZXJ0ZWQ/OiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBCYWcgdXNlZCB0byBzdGlsbCBkZWNvcmF0ZSBwcm9wZXJ0aWVzIG9uIGEgZGVmZXJyZWQgcHJvcGVydGllcyBjYWxsYmFja1xuXHQgKi9cblx0ZGVjb3JhdGVkRGVmZXJyZWRQcm9wZXJ0aWVzPzogVk5vZGVQcm9wZXJ0aWVzO1xuXG5cdC8qKlxuXHQgKiBET00gZWxlbWVudFxuXHQgKi9cblx0ZG9tTm9kZT86IEVsZW1lbnQgfCBUZXh0O1xufVxuXG5leHBvcnQgdHlwZSBJbnRlcm5hbEROb2RlID0gSW50ZXJuYWxWTm9kZSB8IEludGVybmFsV05vZGU7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyUXVldWUge1xuXHRpbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2U7XG5cdGRlcHRoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV2lkZ2V0RGF0YSB7XG5cdG9uRGV0YWNoOiAoKSA9PiB2b2lkO1xuXHRvbkF0dGFjaDogKCkgPT4gdm9pZDtcblx0ZGlydHk6IGJvb2xlYW47XG5cdHJlZ2lzdHJ5OiAoKSA9PiBSZWdpc3RyeUhhbmRsZXI7XG5cdG5vZGVIYW5kbGVyOiBOb2RlSGFuZGxlcjtcblx0Y29yZVByb3BlcnRpZXM6IENvcmVQcm9wZXJ0aWVzO1xuXHRpbnZhbGlkYXRlPzogRnVuY3Rpb247XG5cdHJlbmRlcmluZzogYm9vbGVhbjtcblx0aW5wdXRQcm9wZXJ0aWVzOiBhbnk7XG59XG5cbmludGVyZmFjZSBQcm9qZWN0b3JTdGF0ZSB7XG5cdGRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzOiBGdW5jdGlvbltdO1xuXHRhZnRlclJlbmRlckNhbGxiYWNrczogRnVuY3Rpb25bXTtcblx0bm9kZU1hcDogV2Vha01hcDxOb2RlLCBXZWFrTWFwPEZ1bmN0aW9uLCBFdmVudExpc3RlbmVyPj47XG5cdHJlbmRlclNjaGVkdWxlZD86IG51bWJlcjtcblx0cmVuZGVyUXVldWU6IFJlbmRlclF1ZXVlW107XG5cdG1lcmdlOiBib29sZWFuO1xuXHRtZXJnZUVsZW1lbnQ/OiBOb2RlO1xufVxuXG5leHBvcnQgY29uc3Qgd2lkZ2V0SW5zdGFuY2VNYXAgPSBuZXcgV2Vha01hcDxhbnksIFdpZGdldERhdGE+KCk7XG5cbmNvbnN0IGluc3RhbmNlTWFwID0gbmV3IFdlYWtNYXA8RGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsIEluc3RhbmNlTWFwRGF0YT4oKTtcbmNvbnN0IHByb2plY3RvclN0YXRlTWFwID0gbmV3IFdlYWtNYXA8RGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsIFByb2plY3RvclN0YXRlPigpO1xuXG5mdW5jdGlvbiBzYW1lKGRub2RlMTogSW50ZXJuYWxETm9kZSwgZG5vZGUyOiBJbnRlcm5hbEROb2RlKSB7XG5cdGlmIChpc1ZOb2RlKGRub2RlMSkgJiYgaXNWTm9kZShkbm9kZTIpKSB7XG5cdFx0aWYgKGlzRG9tVk5vZGUoZG5vZGUxKSB8fCBpc0RvbVZOb2RlKGRub2RlMikpIHtcblx0XHRcdGlmIChkbm9kZTEuZG9tTm9kZSAhPT0gZG5vZGUyLmRvbU5vZGUpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoZG5vZGUxLnRhZyAhPT0gZG5vZGUyLnRhZykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoZG5vZGUxLnByb3BlcnRpZXMua2V5ICE9PSBkbm9kZTIucHJvcGVydGllcy5rZXkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gZWxzZSBpZiAoaXNXTm9kZShkbm9kZTEpICYmIGlzV05vZGUoZG5vZGUyKSkge1xuXHRcdGlmIChkbm9kZTEuaW5zdGFuY2UgPT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZG5vZGUyLndpZGdldENvbnN0cnVjdG9yID09PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoZG5vZGUxLndpZGdldENvbnN0cnVjdG9yICE9PSBkbm9kZTIud2lkZ2V0Q29uc3RydWN0b3IpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKGRub2RlMS5wcm9wZXJ0aWVzLmtleSAhPT0gZG5vZGUyLnByb3BlcnRpZXMua2V5KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxuY29uc3QgbWlzc2luZ1RyYW5zaXRpb24gPSBmdW5jdGlvbigpIHtcblx0dGhyb3cgbmV3IEVycm9yKCdQcm92aWRlIGEgdHJhbnNpdGlvbnMgb2JqZWN0IHRvIHRoZSBwcm9qZWN0aW9uT3B0aW9ucyB0byBkbyBhbmltYXRpb25zJyk7XG59O1xuXG5mdW5jdGlvbiBnZXRQcm9qZWN0aW9uT3B0aW9ucyhcblx0cHJvamVjdG9yT3B0aW9uczogUGFydGlhbDxQcm9qZWN0aW9uT3B0aW9ucz4sXG5cdHByb2plY3Rvckluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZVxuKTogUHJvamVjdGlvbk9wdGlvbnMge1xuXHRjb25zdCBkZWZhdWx0czogUGFydGlhbDxQcm9qZWN0aW9uT3B0aW9ucz4gPSB7XG5cdFx0bmFtZXNwYWNlOiB1bmRlZmluZWQsXG5cdFx0c3R5bGVBcHBseWVyOiBmdW5jdGlvbihkb21Ob2RlOiBIVE1MRWxlbWVudCwgc3R5bGVOYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcblx0XHRcdChkb21Ob2RlLnN0eWxlIGFzIGFueSlbc3R5bGVOYW1lXSA9IHZhbHVlO1xuXHRcdH0sXG5cdFx0dHJhbnNpdGlvbnM6IHtcblx0XHRcdGVudGVyOiBtaXNzaW5nVHJhbnNpdGlvbixcblx0XHRcdGV4aXQ6IG1pc3NpbmdUcmFuc2l0aW9uXG5cdFx0fSxcblx0XHRkZXB0aDogMCxcblx0XHRtZXJnZTogZmFsc2UsXG5cdFx0c3luYzogZmFsc2UsXG5cdFx0cHJvamVjdG9ySW5zdGFuY2Vcblx0fTtcblx0cmV0dXJuIHsgLi4uZGVmYXVsdHMsIC4uLnByb2plY3Rvck9wdGlvbnMgfSBhcyBQcm9qZWN0aW9uT3B0aW9ucztcbn1cblxuZnVuY3Rpb24gY2hlY2tTdHlsZVZhbHVlKHN0eWxlVmFsdWU6IE9iamVjdCkge1xuXHRpZiAodHlwZW9mIHN0eWxlVmFsdWUgIT09ICdzdHJpbmcnKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdTdHlsZSB2YWx1ZXMgbXVzdCBiZSBzdHJpbmdzJyk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRXZlbnQoXG5cdGRvbU5vZGU6IE5vZGUsXG5cdGV2ZW50TmFtZTogc3RyaW5nLFxuXHRjdXJyZW50VmFsdWU6IEZ1bmN0aW9uLFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMsXG5cdGJpbmQ6IGFueSxcblx0cHJldmlvdXNWYWx1ZT86IEZ1bmN0aW9uXG4pIHtcblx0Y29uc3QgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpITtcblx0Y29uc3QgZXZlbnRNYXAgPSBwcm9qZWN0b3JTdGF0ZS5ub2RlTWFwLmdldChkb21Ob2RlKSB8fCBuZXcgV2Vha01hcCgpO1xuXG5cdGlmIChwcmV2aW91c1ZhbHVlKSB7XG5cdFx0Y29uc3QgcHJldmlvdXNFdmVudCA9IGV2ZW50TWFwLmdldChwcmV2aW91c1ZhbHVlKTtcblx0XHRkb21Ob2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBwcmV2aW91c0V2ZW50KTtcblx0fVxuXG5cdGxldCBjYWxsYmFjayA9IGN1cnJlbnRWYWx1ZS5iaW5kKGJpbmQpO1xuXG5cdGlmIChldmVudE5hbWUgPT09ICdpbnB1dCcpIHtcblx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uKHRoaXM6IGFueSwgZXZ0OiBFdmVudCkge1xuXHRcdFx0Y3VycmVudFZhbHVlLmNhbGwodGhpcywgZXZ0KTtcblx0XHRcdChldnQudGFyZ2V0IGFzIGFueSlbJ29uaW5wdXQtdmFsdWUnXSA9IChldnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xuXHRcdH0uYmluZChiaW5kKTtcblx0fVxuXG5cdGRvbU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKTtcblx0ZXZlbnRNYXAuc2V0KGN1cnJlbnRWYWx1ZSwgY2FsbGJhY2spO1xuXHRwcm9qZWN0b3JTdGF0ZS5ub2RlTWFwLnNldChkb21Ob2RlLCBldmVudE1hcCk7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzZXMoZG9tTm9kZTogRWxlbWVudCwgY2xhc3NlczogU3VwcG9ydGVkQ2xhc3NOYW1lKSB7XG5cdGlmIChjbGFzc2VzKSB7XG5cdFx0Y29uc3QgY2xhc3NOYW1lcyA9IGNsYXNzZXMuc3BsaXQoJyAnKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNsYXNzTmFtZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGRvbU5vZGUuY2xhc3NMaXN0LmFkZChjbGFzc05hbWVzW2ldKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlOiBFbGVtZW50LCBjbGFzc2VzOiBTdXBwb3J0ZWRDbGFzc05hbWUpIHtcblx0aWYgKGNsYXNzZXMpIHtcblx0XHRjb25zdCBjbGFzc05hbWVzID0gY2xhc3Nlcy5zcGxpdCgnICcpO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NOYW1lcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0ZG9tTm9kZS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZXNbaV0pO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBidWlsZFByZXZpb3VzUHJvcGVydGllcyhkb21Ob2RlOiBhbnksIHByZXZpb3VzOiBJbnRlcm5hbFZOb2RlLCBjdXJyZW50OiBJbnRlcm5hbFZOb2RlKSB7XG5cdGNvbnN0IHsgZGlmZlR5cGUsIHByb3BlcnRpZXMsIGF0dHJpYnV0ZXMgfSA9IGN1cnJlbnQ7XG5cdGlmICghZGlmZlR5cGUgfHwgZGlmZlR5cGUgPT09ICd2ZG9tJykge1xuXHRcdHJldHVybiB7IHByb3BlcnRpZXM6IHByZXZpb3VzLnByb3BlcnRpZXMsIGF0dHJpYnV0ZXM6IHByZXZpb3VzLmF0dHJpYnV0ZXMsIGV2ZW50czogcHJldmlvdXMuZXZlbnRzIH07XG5cdH0gZWxzZSBpZiAoZGlmZlR5cGUgPT09ICdub25lJykge1xuXHRcdHJldHVybiB7IHByb3BlcnRpZXM6IHt9LCBhdHRyaWJ1dGVzOiBwcmV2aW91cy5hdHRyaWJ1dGVzID8ge30gOiB1bmRlZmluZWQsIGV2ZW50czogcHJldmlvdXMuZXZlbnRzIH07XG5cdH1cblx0bGV0IG5ld1Byb3BlcnRpZXM6IGFueSA9IHtcblx0XHRwcm9wZXJ0aWVzOiB7fVxuXHR9O1xuXHRpZiAoYXR0cmlidXRlcykge1xuXHRcdG5ld1Byb3BlcnRpZXMuYXR0cmlidXRlcyA9IHt9O1xuXHRcdG5ld1Byb3BlcnRpZXMuZXZlbnRzID0gcHJldmlvdXMuZXZlbnRzO1xuXHRcdE9iamVjdC5rZXlzKHByb3BlcnRpZXMpLmZvckVhY2goKHByb3BOYW1lKSA9PiB7XG5cdFx0XHRuZXdQcm9wZXJ0aWVzLnByb3BlcnRpZXNbcHJvcE5hbWVdID0gZG9tTm9kZVtwcm9wTmFtZV07XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0ck5hbWUpID0+IHtcblx0XHRcdG5ld1Byb3BlcnRpZXMuYXR0cmlidXRlc1thdHRyTmFtZV0gPSBkb21Ob2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG5ld1Byb3BlcnRpZXM7XG5cdH1cblx0bmV3UHJvcGVydGllcy5wcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcykucmVkdWNlKFxuXHRcdChwcm9wcywgcHJvcGVydHkpID0+IHtcblx0XHRcdHByb3BzW3Byb3BlcnR5XSA9IGRvbU5vZGUuZ2V0QXR0cmlidXRlKHByb3BlcnR5KSB8fCBkb21Ob2RlW3Byb3BlcnR5XTtcblx0XHRcdHJldHVybiBwcm9wcztcblx0XHR9LFxuXHRcdHt9IGFzIGFueVxuXHQpO1xuXHRyZXR1cm4gbmV3UHJvcGVydGllcztcbn1cblxuZnVuY3Rpb24gZm9jdXNOb2RlKHByb3BWYWx1ZTogYW55LCBwcmV2aW91c1ZhbHVlOiBhbnksIGRvbU5vZGU6IEVsZW1lbnQsIHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9ucyk6IHZvaWQge1xuXHRsZXQgcmVzdWx0O1xuXHRpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdHJlc3VsdCA9IHByb3BWYWx1ZSgpO1xuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9IHByb3BWYWx1ZSAmJiAhcHJldmlvdXNWYWx1ZTtcblx0fVxuXHRpZiAocmVzdWx0ID09PSB0cnVlKSB7XG5cdFx0Y29uc3QgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpITtcblx0XHRwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5wdXNoKCgpID0+IHtcblx0XHRcdChkb21Ob2RlIGFzIEhUTUxFbGVtZW50KS5mb2N1cygpO1xuXHRcdH0pO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU9ycGhhbmVkRXZlbnRzKFxuXHRkb21Ob2RlOiBFbGVtZW50LFxuXHRwcmV2aW91c1Byb3BlcnRpZXM6IFZOb2RlUHJvcGVydGllcyxcblx0cHJvcGVydGllczogVk5vZGVQcm9wZXJ0aWVzLFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMsXG5cdG9ubHlFdmVudHM6IGJvb2xlYW4gPSBmYWxzZVxuKSB7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdGNvbnN0IGV2ZW50TWFwID0gcHJvamVjdG9yU3RhdGUubm9kZU1hcC5nZXQoZG9tTm9kZSk7XG5cdGlmIChldmVudE1hcCkge1xuXHRcdE9iamVjdC5rZXlzKHByZXZpb3VzUHJvcGVydGllcykuZm9yRWFjaCgocHJvcE5hbWUpID0+IHtcblx0XHRcdGNvbnN0IGlzRXZlbnQgPSBwcm9wTmFtZS5zdWJzdHIoMCwgMikgPT09ICdvbicgfHwgb25seUV2ZW50cztcblx0XHRcdGNvbnN0IGV2ZW50TmFtZSA9IG9ubHlFdmVudHMgPyBwcm9wTmFtZSA6IHByb3BOYW1lLnN1YnN0cigyKTtcblx0XHRcdGlmIChpc0V2ZW50ICYmICFwcm9wZXJ0aWVzW3Byb3BOYW1lXSkge1xuXHRcdFx0XHRjb25zdCBldmVudENhbGxiYWNrID0gZXZlbnRNYXAuZ2V0KHByZXZpb3VzUHJvcGVydGllc1twcm9wTmFtZV0pO1xuXHRcdFx0XHRpZiAoZXZlbnRDYWxsYmFjaykge1xuXHRcdFx0XHRcdGRvbU5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGV2ZW50Q2FsbGJhY2spO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQXR0cmlidXRlKGRvbU5vZGU6IEVsZW1lbnQsIGF0dHJOYW1lOiBzdHJpbmcsIGF0dHJWYWx1ZTogc3RyaW5nLCBwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMpIHtcblx0aWYgKHByb2plY3Rpb25PcHRpb25zLm5hbWVzcGFjZSA9PT0gTkFNRVNQQUNFX1NWRyAmJiBhdHRyTmFtZSA9PT0gJ2hyZWYnKSB7XG5cdFx0ZG9tTm9kZS5zZXRBdHRyaWJ1dGVOUyhOQU1FU1BBQ0VfWExJTkssIGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuXHR9IGVsc2UgaWYgKChhdHRyTmFtZSA9PT0gJ3JvbGUnICYmIGF0dHJWYWx1ZSA9PT0gJycpIHx8IGF0dHJWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0ZG9tTm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXHR9IGVsc2Uge1xuXHRcdGRvbU5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZXMoXG5cdGRvbU5vZGU6IEVsZW1lbnQsXG5cdHByZXZpb3VzQXR0cmlidXRlczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB9LFxuXHRhdHRyaWJ1dGVzOiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIH0sXG5cdHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9uc1xuKSB7XG5cdGNvbnN0IGF0dHJOYW1lcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpO1xuXHRjb25zdCBhdHRyQ291bnQgPSBhdHRyTmFtZXMubGVuZ3RoO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IGF0dHJDb3VudDsgaSsrKSB7XG5cdFx0Y29uc3QgYXR0ck5hbWUgPSBhdHRyTmFtZXNbaV07XG5cdFx0Y29uc3QgYXR0clZhbHVlID0gYXR0cmlidXRlc1thdHRyTmFtZV07XG5cdFx0Y29uc3QgcHJldmlvdXNBdHRyVmFsdWUgPSBwcmV2aW91c0F0dHJpYnV0ZXNbYXR0ck5hbWVdO1xuXHRcdGlmIChhdHRyVmFsdWUgIT09IHByZXZpb3VzQXR0clZhbHVlKSB7XG5cdFx0XHR1cGRhdGVBdHRyaWJ1dGUoZG9tTm9kZSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVQcm9wZXJ0aWVzKFxuXHRkb21Ob2RlOiBFbGVtZW50LFxuXHRwcmV2aW91c1Byb3BlcnRpZXM6IFZOb2RlUHJvcGVydGllcyxcblx0cHJvcGVydGllczogVk5vZGVQcm9wZXJ0aWVzLFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMsXG5cdGluY2x1ZGVzRXZlbnRzQW5kQXR0cmlidXRlcyA9IHRydWVcbikge1xuXHRsZXQgcHJvcGVydGllc1VwZGF0ZWQgPSBmYWxzZTtcblx0Y29uc3QgcHJvcE5hbWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XG5cdGNvbnN0IHByb3BDb3VudCA9IHByb3BOYW1lcy5sZW5ndGg7XG5cdGlmIChwcm9wTmFtZXMuaW5kZXhPZignY2xhc3NlcycpID09PSAtMSAmJiBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlcykge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHByZXZpb3VzUHJvcGVydGllcy5jbGFzc2VzKSkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRyZW1vdmVDbGFzc2VzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcy5jbGFzc2VzW2ldKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlLCBwcmV2aW91c1Byb3BlcnRpZXMuY2xhc3Nlcyk7XG5cdFx0fVxuXHR9XG5cblx0aW5jbHVkZXNFdmVudHNBbmRBdHRyaWJ1dGVzICYmIHJlbW92ZU9ycGhhbmVkRXZlbnRzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcywgcHJvcGVydGllcywgcHJvamVjdGlvbk9wdGlvbnMpO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcENvdW50OyBpKyspIHtcblx0XHRjb25zdCBwcm9wTmFtZSA9IHByb3BOYW1lc1tpXTtcblx0XHRsZXQgcHJvcFZhbHVlID0gcHJvcGVydGllc1twcm9wTmFtZV07XG5cdFx0Y29uc3QgcHJldmlvdXNWYWx1ZSA9IHByZXZpb3VzUHJvcGVydGllcyFbcHJvcE5hbWVdO1xuXHRcdGlmIChwcm9wTmFtZSA9PT0gJ2NsYXNzZXMnKSB7XG5cdFx0XHRjb25zdCBwcmV2aW91c0NsYXNzZXMgPSBBcnJheS5pc0FycmF5KHByZXZpb3VzVmFsdWUpID8gcHJldmlvdXNWYWx1ZSA6IFtwcmV2aW91c1ZhbHVlXTtcblx0XHRcdGNvbnN0IGN1cnJlbnRDbGFzc2VzID0gQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpID8gcHJvcFZhbHVlIDogW3Byb3BWYWx1ZV07XG5cdFx0XHRpZiAocHJldmlvdXNDbGFzc2VzICYmIHByZXZpb3VzQ2xhc3Nlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGlmICghcHJvcFZhbHVlIHx8IHByb3BWYWx1ZS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHByZXZpb3VzQ2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0cmVtb3ZlQ2xhc3Nlcyhkb21Ob2RlLCBwcmV2aW91c0NsYXNzZXNbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBuZXdDbGFzc2VzOiAobnVsbCB8IHVuZGVmaW5lZCB8IHN0cmluZylbXSA9IFsuLi5jdXJyZW50Q2xhc3Nlc107XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2aW91c0NsYXNzZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGNvbnN0IHByZXZpb3VzQ2xhc3NOYW1lID0gcHJldmlvdXNDbGFzc2VzW2ldO1xuXHRcdFx0XHRcdFx0aWYgKHByZXZpb3VzQ2xhc3NOYW1lKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGNsYXNzSW5kZXggPSBuZXdDbGFzc2VzLmluZGV4T2YocHJldmlvdXNDbGFzc05hbWUpO1xuXHRcdFx0XHRcdFx0XHRpZiAoY2xhc3NJbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHRyZW1vdmVDbGFzc2VzKGRvbU5vZGUsIHByZXZpb3VzQ2xhc3NOYW1lKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRuZXdDbGFzc2VzLnNwbGljZShjbGFzc0luZGV4LCAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5ld0NsYXNzZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRcdGFkZENsYXNzZXMoZG9tTm9kZSwgbmV3Q2xhc3Nlc1tpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnRDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0YWRkQ2xhc3Nlcyhkb21Ob2RlLCBjdXJyZW50Q2xhc3Nlc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHByb3BOYW1lID09PSAnZm9jdXMnKSB7XG5cdFx0XHRmb2N1c05vZGUocHJvcFZhbHVlLCBwcmV2aW91c1ZhbHVlLCBkb21Ob2RlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0fSBlbHNlIGlmIChwcm9wTmFtZSA9PT0gJ3N0eWxlcycpIHtcblx0XHRcdGNvbnN0IHN0eWxlTmFtZXMgPSBPYmplY3Qua2V5cyhwcm9wVmFsdWUpO1xuXHRcdFx0Y29uc3Qgc3R5bGVDb3VudCA9IHN0eWxlTmFtZXMubGVuZ3RoO1xuXHRcdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBzdHlsZUNvdW50OyBqKyspIHtcblx0XHRcdFx0Y29uc3Qgc3R5bGVOYW1lID0gc3R5bGVOYW1lc1tqXTtcblx0XHRcdFx0Y29uc3QgbmV3U3R5bGVWYWx1ZSA9IHByb3BWYWx1ZVtzdHlsZU5hbWVdO1xuXHRcdFx0XHRjb25zdCBvbGRTdHlsZVZhbHVlID0gcHJldmlvdXNWYWx1ZSAmJiBwcmV2aW91c1ZhbHVlW3N0eWxlTmFtZV07XG5cdFx0XHRcdGlmIChuZXdTdHlsZVZhbHVlID09PSBvbGRTdHlsZVZhbHVlKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cHJvcGVydGllc1VwZGF0ZWQgPSB0cnVlO1xuXHRcdFx0XHRpZiAobmV3U3R5bGVWYWx1ZSkge1xuXHRcdFx0XHRcdGNoZWNrU3R5bGVWYWx1ZShuZXdTdHlsZVZhbHVlKTtcblx0XHRcdFx0XHRwcm9qZWN0aW9uT3B0aW9ucy5zdHlsZUFwcGx5ZXIhKGRvbU5vZGUgYXMgSFRNTEVsZW1lbnQsIHN0eWxlTmFtZSwgbmV3U3R5bGVWYWx1ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMuc3R5bGVBcHBseWVyIShkb21Ob2RlIGFzIEhUTUxFbGVtZW50LCBzdHlsZU5hbWUsICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoIXByb3BWYWx1ZSAmJiB0eXBlb2YgcHJldmlvdXNWYWx1ZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0cHJvcFZhbHVlID0gJyc7XG5cdFx0XHR9XG5cdFx0XHRpZiAocHJvcE5hbWUgPT09ICd2YWx1ZScpIHtcblx0XHRcdFx0Y29uc3QgZG9tVmFsdWUgPSAoZG9tTm9kZSBhcyBhbnkpW3Byb3BOYW1lXTtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGRvbVZhbHVlICE9PSBwcm9wVmFsdWUgJiZcblx0XHRcdFx0XHQoKGRvbU5vZGUgYXMgYW55KVsnb25pbnB1dC12YWx1ZSddXG5cdFx0XHRcdFx0XHQ/IGRvbVZhbHVlID09PSAoZG9tTm9kZSBhcyBhbnkpWydvbmlucHV0LXZhbHVlJ11cblx0XHRcdFx0XHRcdDogcHJvcFZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHQoZG9tTm9kZSBhcyBhbnkpW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcblx0XHRcdFx0XHQoZG9tTm9kZSBhcyBhbnkpWydvbmlucHV0LXZhbHVlJ10gPSB1bmRlZmluZWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHByb3BWYWx1ZSAhPT0gcHJldmlvdXNWYWx1ZSkge1xuXHRcdFx0XHRcdHByb3BlcnRpZXNVcGRhdGVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChwcm9wTmFtZSAhPT0gJ2tleScgJiYgcHJvcFZhbHVlICE9PSBwcmV2aW91c1ZhbHVlKSB7XG5cdFx0XHRcdGNvbnN0IHR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wTmFtZS5sYXN0SW5kZXhPZignb24nLCAwKSA9PT0gMCAmJiBpbmNsdWRlc0V2ZW50c0FuZEF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHR1cGRhdGVFdmVudChcblx0XHRcdFx0XHRcdGRvbU5vZGUsXG5cdFx0XHRcdFx0XHRwcm9wTmFtZS5zdWJzdHIoMiksXG5cdFx0XHRcdFx0XHRwcm9wVmFsdWUsXG5cdFx0XHRcdFx0XHRwcm9qZWN0aW9uT3B0aW9ucyxcblx0XHRcdFx0XHRcdHByb3BlcnRpZXMuYmluZCxcblx0XHRcdFx0XHRcdHByZXZpb3VzVmFsdWVcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHByb3BOYW1lICE9PSAnaW5uZXJIVE1MJyAmJiBpbmNsdWRlc0V2ZW50c0FuZEF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHR1cGRhdGVBdHRyaWJ1dGUoZG9tTm9kZSwgcHJvcE5hbWUsIHByb3BWYWx1ZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHByb3BOYW1lID09PSAnc2Nyb2xsTGVmdCcgfHwgcHJvcE5hbWUgPT09ICdzY3JvbGxUb3AnKSB7XG5cdFx0XHRcdFx0aWYgKChkb21Ob2RlIGFzIGFueSlbcHJvcE5hbWVdICE9PSBwcm9wVmFsdWUpIHtcblx0XHRcdFx0XHRcdChkb21Ob2RlIGFzIGFueSlbcHJvcE5hbWVdID0gcHJvcFZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQoZG9tTm9kZSBhcyBhbnkpW3Byb3BOYW1lXSA9IHByb3BWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwcm9wZXJ0aWVzVXBkYXRlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBwcm9wZXJ0aWVzVXBkYXRlZDtcbn1cblxuZnVuY3Rpb24gZmluZEluZGV4T2ZDaGlsZChjaGlsZHJlbjogSW50ZXJuYWxETm9kZVtdLCBzYW1lQXM6IEludGVybmFsRE5vZGUsIHN0YXJ0OiBudW1iZXIpIHtcblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoc2FtZShjaGlsZHJlbltpXSwgc2FtZUFzKSkge1xuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvUGFyZW50Vk5vZGUoZG9tTm9kZTogRWxlbWVudCk6IEludGVybmFsVk5vZGUge1xuXHRyZXR1cm4ge1xuXHRcdHRhZzogJycsXG5cdFx0cHJvcGVydGllczoge30sXG5cdFx0Y2hpbGRyZW46IHVuZGVmaW5lZCxcblx0XHRkb21Ob2RlLFxuXHRcdHR5cGU6IFZOT0RFXG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1RleHRWTm9kZShkYXRhOiBhbnkpOiBJbnRlcm5hbFZOb2RlIHtcblx0cmV0dXJuIHtcblx0XHR0YWc6ICcnLFxuXHRcdHByb3BlcnRpZXM6IHt9LFxuXHRcdGNoaWxkcmVuOiB1bmRlZmluZWQsXG5cdFx0dGV4dDogYCR7ZGF0YX1gLFxuXHRcdGRvbU5vZGU6IHVuZGVmaW5lZCxcblx0XHR0eXBlOiBWTk9ERVxuXHR9O1xufVxuXG5mdW5jdGlvbiB0b0ludGVybmFsV05vZGUoaW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLCBpbnN0YW5jZURhdGE6IFdpZGdldERhdGEpOiBJbnRlcm5hbFdOb2RlIHtcblx0cmV0dXJuIHtcblx0XHRpbnN0YW5jZSxcblx0XHRyZW5kZXJlZDogW10sXG5cdFx0Y29yZVByb3BlcnRpZXM6IGluc3RhbmNlRGF0YS5jb3JlUHJvcGVydGllcyxcblx0XHRjaGlsZHJlbjogaW5zdGFuY2UuY2hpbGRyZW4gYXMgYW55LFxuXHRcdHdpZGdldENvbnN0cnVjdG9yOiBpbnN0YW5jZS5jb25zdHJ1Y3RvciBhcyBhbnksXG5cdFx0cHJvcGVydGllczogaW5zdGFuY2VEYXRhLmlucHV0UHJvcGVydGllcyxcblx0XHR0eXBlOiBXTk9ERVxuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihcblx0Y2hpbGRyZW46IHVuZGVmaW5lZCB8IEROb2RlIHwgRE5vZGVbXSxcblx0aW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlXG4pOiBJbnRlcm5hbEROb2RlW10ge1xuXHRpZiAoY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBlbXB0eUFycmF5O1xuXHR9XG5cdGNoaWxkcmVuID0gQXJyYXkuaXNBcnJheShjaGlsZHJlbikgPyBjaGlsZHJlbiA6IFtjaGlsZHJlbl07XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7ICkge1xuXHRcdGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV0gYXMgSW50ZXJuYWxETm9kZTtcblx0XHRpZiAoY2hpbGQgPT09IHVuZGVmaW5lZCB8fCBjaGlsZCA9PT0gbnVsbCkge1xuXHRcdFx0Y2hpbGRyZW4uc3BsaWNlKGksIDEpO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRjaGlsZHJlbltpXSA9IHRvVGV4dFZOb2RlKGNoaWxkKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKGlzVk5vZGUoY2hpbGQpKSB7XG5cdFx0XHRcdGlmIChjaGlsZC5wcm9wZXJ0aWVzLmJpbmQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdChjaGlsZC5wcm9wZXJ0aWVzIGFzIGFueSkuYmluZCA9IGluc3RhbmNlO1xuXHRcdFx0XHRcdGlmIChjaGlsZC5jaGlsZHJlbiAmJiBjaGlsZC5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0XHRmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKGNoaWxkLmNoaWxkcmVuLCBpbnN0YW5jZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoIWNoaWxkLmNvcmVQcm9wZXJ0aWVzKSB7XG5cdFx0XHRcdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0XHRcdFx0Y2hpbGQuY29yZVByb3BlcnRpZXMgPSB7XG5cdFx0XHRcdFx0XHRiaW5kOiBpbnN0YW5jZSxcblx0XHRcdFx0XHRcdGJhc2VSZWdpc3RyeTogaW5zdGFuY2VEYXRhLmNvcmVQcm9wZXJ0aWVzLmJhc2VSZWdpc3RyeVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGNoaWxkLmNoaWxkcmVuICYmIGNoaWxkLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKGNoaWxkLmNoaWxkcmVuLCBpbnN0YW5jZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aSsrO1xuXHR9XG5cdHJldHVybiBjaGlsZHJlbiBhcyBJbnRlcm5hbEROb2RlW107XG59XG5cbmZ1bmN0aW9uIG5vZGVBZGRlZChkbm9kZTogSW50ZXJuYWxETm9kZSwgdHJhbnNpdGlvbnM6IFRyYW5zaXRpb25TdHJhdGVneSkge1xuXHRpZiAoaXNWTm9kZShkbm9kZSkgJiYgZG5vZGUucHJvcGVydGllcykge1xuXHRcdGNvbnN0IGVudGVyQW5pbWF0aW9uID0gZG5vZGUucHJvcGVydGllcy5lbnRlckFuaW1hdGlvbjtcblx0XHRpZiAoZW50ZXJBbmltYXRpb24pIHtcblx0XHRcdGlmICh0eXBlb2YgZW50ZXJBbmltYXRpb24gPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0ZW50ZXJBbmltYXRpb24oZG5vZGUuZG9tTm9kZSBhcyBFbGVtZW50LCBkbm9kZS5wcm9wZXJ0aWVzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRyYW5zaXRpb25zLmVudGVyKGRub2RlLmRvbU5vZGUgYXMgRWxlbWVudCwgZG5vZGUucHJvcGVydGllcywgZW50ZXJBbmltYXRpb24gYXMgc3RyaW5nKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbm9kZVRvUmVtb3ZlKGRub2RlOiBJbnRlcm5hbEROb2RlLCB0cmFuc2l0aW9uczogVHJhbnNpdGlvblN0cmF0ZWd5LCBwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMpIHtcblx0aWYgKGlzV05vZGUoZG5vZGUpKSB7XG5cdFx0Y29uc3QgcmVuZGVyZWQgPSBkbm9kZS5yZW5kZXJlZCB8fCBlbXB0eUFycmF5O1xuXHRcdGlmIChkbm9kZS5pbnN0YW5jZSkge1xuXHRcdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KGRub2RlLmluc3RhbmNlKSE7XG5cdFx0XHRpbnN0YW5jZURhdGEub25EZXRhY2goKTtcblx0XHRcdGluc3RhbmNlTWFwLmRlbGV0ZShkbm9kZS5pbnN0YW5jZSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcmVuZGVyZWQubGVuZ3RoOyBpKyspIHtcblx0XHRcdG5vZGVUb1JlbW92ZShyZW5kZXJlZFtpXSwgdHJhbnNpdGlvbnMsIHByb2plY3Rpb25PcHRpb25zKTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgZG9tTm9kZSA9IGRub2RlLmRvbU5vZGU7XG5cdFx0Y29uc3QgcHJvcGVydGllcyA9IGRub2RlLnByb3BlcnRpZXM7XG5cdFx0aWYgKGRub2RlLmNoaWxkcmVuICYmIGRub2RlLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0bm9kZVRvUmVtb3ZlKGRub2RlLmNoaWxkcmVuW2ldLCB0cmFuc2l0aW9ucywgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRjb25zdCBleGl0QW5pbWF0aW9uID0gcHJvcGVydGllcy5leGl0QW5pbWF0aW9uO1xuXHRcdGlmIChwcm9wZXJ0aWVzICYmIGV4aXRBbmltYXRpb24pIHtcblx0XHRcdChkb21Ob2RlIGFzIEhUTUxFbGVtZW50KS5zdHlsZS5wb2ludGVyRXZlbnRzID0gJ25vbmUnO1xuXHRcdFx0Y29uc3QgcmVtb3ZlRG9tTm9kZSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRkb21Ob2RlICYmIGRvbU5vZGUucGFyZW50Tm9kZSAmJiBkb21Ob2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tTm9kZSk7XG5cdFx0XHRcdGRub2RlLmRvbU5vZGUgPSB1bmRlZmluZWQ7XG5cdFx0XHR9O1xuXHRcdFx0aWYgKHR5cGVvZiBleGl0QW5pbWF0aW9uID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGV4aXRBbmltYXRpb24oZG9tTm9kZSBhcyBFbGVtZW50LCByZW1vdmVEb21Ob2RlLCBwcm9wZXJ0aWVzKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dHJhbnNpdGlvbnMuZXhpdChkbm9kZS5kb21Ob2RlIGFzIEVsZW1lbnQsIHByb3BlcnRpZXMsIGV4aXRBbmltYXRpb24gYXMgc3RyaW5nLCByZW1vdmVEb21Ob2RlKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRkb21Ob2RlICYmIGRvbU5vZGUucGFyZW50Tm9kZSAmJiBkb21Ob2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tTm9kZSk7XG5cdFx0ZG5vZGUuZG9tTm9kZSA9IHVuZGVmaW5lZDtcblx0fVxufVxuXG5mdW5jdGlvbiBjaGVja0Rpc3Rpbmd1aXNoYWJsZShcblx0Y2hpbGROb2RlczogSW50ZXJuYWxETm9kZVtdLFxuXHRpbmRleFRvQ2hlY2s6IG51bWJlcixcblx0cGFyZW50SW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlXG4pIHtcblx0Y29uc3QgY2hpbGROb2RlID0gY2hpbGROb2Rlc1tpbmRleFRvQ2hlY2tdO1xuXHRpZiAoaXNWTm9kZShjaGlsZE5vZGUpICYmICFjaGlsZE5vZGUudGFnKSB7XG5cdFx0cmV0dXJuOyAvLyBUZXh0IG5vZGVzIG5lZWQgbm90IGJlIGRpc3Rpbmd1aXNoYWJsZVxuXHR9XG5cdGNvbnN0IHsga2V5IH0gPSBjaGlsZE5vZGUucHJvcGVydGllcztcblxuXHRpZiAoa2V5ID09PSB1bmRlZmluZWQgfHwga2V5ID09PSBudWxsKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoaSAhPT0gaW5kZXhUb0NoZWNrKSB7XG5cdFx0XHRcdGNvbnN0IG5vZGUgPSBjaGlsZE5vZGVzW2ldO1xuXHRcdFx0XHRpZiAoc2FtZShub2RlLCBjaGlsZE5vZGUpKSB7XG5cdFx0XHRcdFx0bGV0IG5vZGVJZGVudGlmaWVyOiBzdHJpbmc7XG5cdFx0XHRcdFx0Y29uc3QgcGFyZW50TmFtZSA9IChwYXJlbnRJbnN0YW5jZSBhcyBhbnkpLmNvbnN0cnVjdG9yLm5hbWUgfHwgJ3Vua25vd24nO1xuXHRcdFx0XHRcdGlmIChpc1dOb2RlKGNoaWxkTm9kZSkpIHtcblx0XHRcdFx0XHRcdG5vZGVJZGVudGlmaWVyID0gKGNoaWxkTm9kZS53aWRnZXRDb25zdHJ1Y3RvciBhcyBhbnkpLm5hbWUgfHwgJ3Vua25vd24nO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRub2RlSWRlbnRpZmllciA9IGNoaWxkTm9kZS50YWc7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcdFx0YEEgd2lkZ2V0ICgke3BhcmVudE5hbWV9KSBoYXMgaGFkIGEgY2hpbGQgYWRkZGVkIG9yIHJlbW92ZWQsIGJ1dCB0aGV5IHdlcmUgbm90IGFibGUgdG8gdW5pcXVlbHkgaWRlbnRpZmllZC4gSXQgaXMgcmVjb21tZW5kZWQgdG8gcHJvdmlkZSBhIHVuaXF1ZSAna2V5JyBwcm9wZXJ0eSB3aGVuIHVzaW5nIHRoZSBzYW1lIHdpZGdldCBvciBlbGVtZW50ICgke25vZGVJZGVudGlmaWVyfSkgbXVsdGlwbGUgdGltZXMgYXMgc2libGluZ3NgXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDaGlsZHJlbihcblx0cGFyZW50Vk5vZGU6IEludGVybmFsVk5vZGUsXG5cdG9sZENoaWxkcmVuOiBJbnRlcm5hbEROb2RlW10sXG5cdG5ld0NoaWxkcmVuOiBJbnRlcm5hbEROb2RlW10sXG5cdHBhcmVudEluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZSxcblx0cHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zXG4pIHtcblx0b2xkQ2hpbGRyZW4gPSBvbGRDaGlsZHJlbiB8fCBlbXB0eUFycmF5O1xuXHRuZXdDaGlsZHJlbiA9IG5ld0NoaWxkcmVuO1xuXHRjb25zdCBvbGRDaGlsZHJlbkxlbmd0aCA9IG9sZENoaWxkcmVuLmxlbmd0aDtcblx0Y29uc3QgbmV3Q2hpbGRyZW5MZW5ndGggPSBuZXdDaGlsZHJlbi5sZW5ndGg7XG5cdGNvbnN0IHRyYW5zaXRpb25zID0gcHJvamVjdGlvbk9wdGlvbnMudHJhbnNpdGlvbnMhO1xuXHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHRwcm9qZWN0aW9uT3B0aW9ucyA9IHsgLi4ucHJvamVjdGlvbk9wdGlvbnMsIGRlcHRoOiBwcm9qZWN0aW9uT3B0aW9ucy5kZXB0aCArIDEgfTtcblx0bGV0IG9sZEluZGV4ID0gMDtcblx0bGV0IG5ld0luZGV4ID0gMDtcblx0bGV0IGk6IG51bWJlcjtcblx0bGV0IHRleHRVcGRhdGVkID0gZmFsc2U7XG5cdHdoaWxlIChuZXdJbmRleCA8IG5ld0NoaWxkcmVuTGVuZ3RoKSB7XG5cdFx0bGV0IG9sZENoaWxkID0gb2xkSW5kZXggPCBvbGRDaGlsZHJlbkxlbmd0aCA/IG9sZENoaWxkcmVuW29sZEluZGV4XSA6IHVuZGVmaW5lZDtcblx0XHRjb25zdCBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW25ld0luZGV4XTtcblx0XHRpZiAoaXNWTm9kZShuZXdDaGlsZCkgJiYgdHlwZW9mIG5ld0NoaWxkLmRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRuZXdDaGlsZC5pbnNlcnRlZCA9IGlzVk5vZGUob2xkQ2hpbGQpICYmIG9sZENoaWxkLmluc2VydGVkO1xuXHRcdFx0YWRkRGVmZXJyZWRQcm9wZXJ0aWVzKG5ld0NoaWxkLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0fVxuXHRcdGlmIChvbGRDaGlsZCAhPT0gdW5kZWZpbmVkICYmIHNhbWUob2xkQ2hpbGQsIG5ld0NoaWxkKSkge1xuXHRcdFx0dGV4dFVwZGF0ZWQgPSB1cGRhdGVEb20ob2xkQ2hpbGQsIG5ld0NoaWxkLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50Vk5vZGUsIHBhcmVudEluc3RhbmNlKSB8fCB0ZXh0VXBkYXRlZDtcblx0XHRcdG9sZEluZGV4Kys7XG5cdFx0XHRuZXdJbmRleCsrO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZmluZE9sZEluZGV4ID0gZmluZEluZGV4T2ZDaGlsZChvbGRDaGlsZHJlbiwgbmV3Q2hpbGQsIG9sZEluZGV4ICsgMSk7XG5cdFx0Y29uc3QgYWRkQ2hpbGQgPSAoKSA9PiB7XG5cdFx0XHRsZXQgaW5zZXJ0QmVmb3JlRG9tTm9kZTogRWxlbWVudCB8IFRleHQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgY2hpbGQ6IEludGVybmFsRE5vZGUgPSBvbGRDaGlsZHJlbltvbGRJbmRleF07XG5cdFx0XHRpZiAoY2hpbGQpIHtcblx0XHRcdFx0bGV0IG5leHRJbmRleCA9IG9sZEluZGV4ICsgMTtcblx0XHRcdFx0bGV0IGluc2VydEJlZm9yZUNoaWxkcmVuID0gW2NoaWxkXTtcblx0XHRcdFx0d2hpbGUgKGluc2VydEJlZm9yZUNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHRcdGNvbnN0IGluc2VydEJlZm9yZSA9IGluc2VydEJlZm9yZUNoaWxkcmVuLnNoaWZ0KCkhO1xuXHRcdFx0XHRcdGlmIChpc1dOb2RlKGluc2VydEJlZm9yZSkpIHtcblx0XHRcdFx0XHRcdGlmIChpbnNlcnRCZWZvcmUucmVuZGVyZWQpIHtcblx0XHRcdFx0XHRcdFx0aW5zZXJ0QmVmb3JlQ2hpbGRyZW4ucHVzaCguLi5pbnNlcnRCZWZvcmUucmVuZGVyZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAoaW5zZXJ0QmVmb3JlLmRvbU5vZGUpIHtcblx0XHRcdFx0XHRcdFx0aW5zZXJ0QmVmb3JlRG9tTm9kZSA9IGluc2VydEJlZm9yZS5kb21Ob2RlO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGluc2VydEJlZm9yZUNoaWxkcmVuLmxlbmd0aCA9PT0gMCAmJiBvbGRDaGlsZHJlbltuZXh0SW5kZXhdKSB7XG5cdFx0XHRcdFx0XHRpbnNlcnRCZWZvcmVDaGlsZHJlbi5wdXNoKG9sZENoaWxkcmVuW25leHRJbmRleF0pO1xuXHRcdFx0XHRcdFx0bmV4dEluZGV4Kys7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNyZWF0ZURvbShuZXdDaGlsZCwgcGFyZW50Vk5vZGUsIGluc2VydEJlZm9yZURvbU5vZGUsIHByb2plY3Rpb25PcHRpb25zLCBwYXJlbnRJbnN0YW5jZSk7XG5cdFx0XHRub2RlQWRkZWQobmV3Q2hpbGQsIHRyYW5zaXRpb25zKTtcblx0XHRcdGNvbnN0IGluZGV4VG9DaGVjayA9IG5ld0luZGV4O1xuXHRcdFx0cHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MucHVzaCgoKSA9PiB7XG5cdFx0XHRcdGNoZWNrRGlzdGluZ3Vpc2hhYmxlKG5ld0NoaWxkcmVuLCBpbmRleFRvQ2hlY2ssIHBhcmVudEluc3RhbmNlKTtcblx0XHRcdH0pO1xuXHRcdH07XG5cblx0XHRpZiAoIW9sZENoaWxkIHx8IGZpbmRPbGRJbmRleCA9PT0gLTEpIHtcblx0XHRcdGFkZENoaWxkKCk7XG5cdFx0XHRuZXdJbmRleCsrO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVtb3ZlQ2hpbGQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBpbmRleFRvQ2hlY2sgPSBvbGRJbmRleDtcblx0XHRcdHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnB1c2goKCkgPT4ge1xuXHRcdFx0XHRjaGVja0Rpc3Rpbmd1aXNoYWJsZShvbGRDaGlsZHJlbiwgaW5kZXhUb0NoZWNrLCBwYXJlbnRJbnN0YW5jZSk7XG5cdFx0XHR9KTtcblx0XHRcdGlmIChpc1dOb2RlKG9sZENoaWxkKSkge1xuXHRcdFx0XHRjb25zdCBpdGVtID0gaW5zdGFuY2VNYXAuZ2V0KG9sZENoaWxkLmluc3RhbmNlKTtcblx0XHRcdFx0aWYgKGl0ZW0pIHtcblx0XHRcdFx0XHRvbGRDaGlsZCA9IGl0ZW0uZG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5vZGVUb1JlbW92ZShvbGRDaGlsZCEsIHRyYW5zaXRpb25zLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0fTtcblx0XHRjb25zdCBmaW5kTmV3SW5kZXggPSBmaW5kSW5kZXhPZkNoaWxkKG5ld0NoaWxkcmVuLCBvbGRDaGlsZCwgbmV3SW5kZXggKyAxKTtcblxuXHRcdGlmIChmaW5kTmV3SW5kZXggPT09IC0xKSB7XG5cdFx0XHRyZW1vdmVDaGlsZCgpO1xuXHRcdFx0b2xkSW5kZXgrKztcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGFkZENoaWxkKCk7XG5cdFx0cmVtb3ZlQ2hpbGQoKTtcblx0XHRvbGRJbmRleCsrO1xuXHRcdG5ld0luZGV4Kys7XG5cdH1cblx0aWYgKG9sZENoaWxkcmVuTGVuZ3RoID4gb2xkSW5kZXgpIHtcblx0XHQvLyBSZW1vdmUgY2hpbGQgZnJhZ21lbnRzXG5cdFx0Zm9yIChpID0gb2xkSW5kZXg7IGkgPCBvbGRDaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBpbmRleFRvQ2hlY2sgPSBpO1xuXHRcdFx0cHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MucHVzaCgoKSA9PiB7XG5cdFx0XHRcdGNoZWNrRGlzdGluZ3Vpc2hhYmxlKG9sZENoaWxkcmVuLCBpbmRleFRvQ2hlY2ssIHBhcmVudEluc3RhbmNlKTtcblx0XHRcdH0pO1xuXHRcdFx0bGV0IGNoaWxkVG9SZW1vdmUgPSBvbGRDaGlsZHJlbltpXTtcblx0XHRcdGlmIChpc1dOb2RlKGNoaWxkVG9SZW1vdmUpKSB7XG5cdFx0XHRcdGNvbnN0IGl0ZW0gPSBpbnN0YW5jZU1hcC5nZXQoY2hpbGRUb1JlbW92ZS5pbnN0YW5jZSk7XG5cdFx0XHRcdGlmIChpdGVtKSB7XG5cdFx0XHRcdFx0Y2hpbGRUb1JlbW92ZSA9IGl0ZW0uZG5vZGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5vZGVUb1JlbW92ZShjaGlsZFRvUmVtb3ZlLCB0cmFuc2l0aW9ucywgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGV4dFVwZGF0ZWQ7XG59XG5cbmZ1bmN0aW9uIGFkZENoaWxkcmVuKFxuXHRwYXJlbnRWTm9kZTogSW50ZXJuYWxWTm9kZSxcblx0Y2hpbGRyZW46IEludGVybmFsRE5vZGVbXSB8IHVuZGVmaW5lZCxcblx0cHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zLFxuXHRwYXJlbnRJbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdGluc2VydEJlZm9yZTogRWxlbWVudCB8IFRleHQgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG5cdGNoaWxkTm9kZXM/OiAoRWxlbWVudCB8IFRleHQpW11cbikge1xuXHRpZiAoY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdGlmIChwcm9qZWN0b3JTdGF0ZS5tZXJnZSAmJiBjaGlsZE5vZGVzID09PSB1bmRlZmluZWQpIHtcblx0XHRjaGlsZE5vZGVzID0gYXJyYXlGcm9tKHBhcmVudFZOb2RlLmRvbU5vZGUhLmNoaWxkTm9kZXMpIGFzIChFbGVtZW50IHwgVGV4dClbXTtcblx0fVxuXHRjb25zdCB0cmFuc2l0aW9ucyA9IHByb2plY3Rpb25PcHRpb25zLnRyYW5zaXRpb25zITtcblx0cHJvamVjdGlvbk9wdGlvbnMgPSB7IC4uLnByb2plY3Rpb25PcHRpb25zLCBkZXB0aDogcHJvamVjdGlvbk9wdGlvbnMuZGVwdGggKyAxIH07XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdGNvbnN0IGNoaWxkID0gY2hpbGRyZW5baV07XG5cblx0XHRpZiAoaXNWTm9kZShjaGlsZCkpIHtcblx0XHRcdGlmIChwcm9qZWN0b3JTdGF0ZS5tZXJnZSAmJiBjaGlsZE5vZGVzKSB7XG5cdFx0XHRcdGxldCBkb21FbGVtZW50OiBFbGVtZW50IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR3aGlsZSAoY2hpbGQuZG9tTm9kZSA9PT0gdW5kZWZpbmVkICYmIGNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdGRvbUVsZW1lbnQgPSBjaGlsZE5vZGVzLnNoaWZ0KCkgYXMgRWxlbWVudDtcblx0XHRcdFx0XHRpZiAoZG9tRWxlbWVudCAmJiBkb21FbGVtZW50LnRhZ05hbWUgPT09IChjaGlsZC50YWcudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQpKSB7XG5cdFx0XHRcdFx0XHRjaGlsZC5kb21Ob2RlID0gZG9tRWxlbWVudDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGNyZWF0ZURvbShjaGlsZCwgcGFyZW50Vk5vZGUsIGluc2VydEJlZm9yZSwgcHJvamVjdGlvbk9wdGlvbnMsIHBhcmVudEluc3RhbmNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y3JlYXRlRG9tKGNoaWxkLCBwYXJlbnRWTm9kZSwgaW5zZXJ0QmVmb3JlLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50SW5zdGFuY2UsIGNoaWxkTm9kZXMpO1xuXHRcdH1cblx0XHRub2RlQWRkZWQoY2hpbGQsIHRyYW5zaXRpb25zKTtcblx0fVxufVxuXG5mdW5jdGlvbiBpbml0UHJvcGVydGllc0FuZENoaWxkcmVuKFxuXHRkb21Ob2RlOiBFbGVtZW50LFxuXHRkbm9kZTogSW50ZXJuYWxWTm9kZSxcblx0cGFyZW50SW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnNcbikge1xuXHRhZGRDaGlsZHJlbihkbm9kZSwgZG5vZGUuY2hpbGRyZW4sIHByb2plY3Rpb25PcHRpb25zLCBwYXJlbnRJbnN0YW5jZSwgdW5kZWZpbmVkKTtcblx0aWYgKHR5cGVvZiBkbm9kZS5kZWZlcnJlZFByb3BlcnRpZXNDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyAmJiBkbm9kZS5pbnNlcnRlZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0YWRkRGVmZXJyZWRQcm9wZXJ0aWVzKGRub2RlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdH1cblxuXHRpZiAoZG5vZGUuYXR0cmlidXRlcyAmJiBkbm9kZS5ldmVudHMpIHtcblx0XHR1cGRhdGVBdHRyaWJ1dGVzKGRvbU5vZGUsIHt9LCBkbm9kZS5hdHRyaWJ1dGVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0dXBkYXRlUHJvcGVydGllcyhkb21Ob2RlLCB7fSwgZG5vZGUucHJvcGVydGllcywgcHJvamVjdGlvbk9wdGlvbnMsIGZhbHNlKTtcblx0XHRyZW1vdmVPcnBoYW5lZEV2ZW50cyhkb21Ob2RlLCB7fSwgZG5vZGUuZXZlbnRzLCBwcm9qZWN0aW9uT3B0aW9ucywgdHJ1ZSk7XG5cdFx0Y29uc3QgZXZlbnRzID0gZG5vZGUuZXZlbnRzO1xuXHRcdE9iamVjdC5rZXlzKGV2ZW50cykuZm9yRWFjaCgoZXZlbnQpID0+IHtcblx0XHRcdHVwZGF0ZUV2ZW50KGRvbU5vZGUsIGV2ZW50LCBldmVudHNbZXZlbnRdLCBwcm9qZWN0aW9uT3B0aW9ucywgZG5vZGUucHJvcGVydGllcy5iaW5kKTtcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR1cGRhdGVQcm9wZXJ0aWVzKGRvbU5vZGUsIHt9LCBkbm9kZS5wcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdH1cblx0aWYgKGRub2RlLnByb3BlcnRpZXMua2V5ICE9PSBudWxsICYmIGRub2RlLnByb3BlcnRpZXMua2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQocGFyZW50SW5zdGFuY2UpITtcblx0XHRpbnN0YW5jZURhdGEubm9kZUhhbmRsZXIuYWRkKGRvbU5vZGUgYXMgSFRNTEVsZW1lbnQsIGAke2Rub2RlLnByb3BlcnRpZXMua2V5fWApO1xuXHR9XG5cdGRub2RlLmluc2VydGVkID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRG9tKFxuXHRkbm9kZTogSW50ZXJuYWxETm9kZSxcblx0cGFyZW50Vk5vZGU6IEludGVybmFsVk5vZGUsXG5cdGluc2VydEJlZm9yZTogRWxlbWVudCB8IFRleHQgfCB1bmRlZmluZWQsXG5cdHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9ucyxcblx0cGFyZW50SW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlLFxuXHRjaGlsZE5vZGVzPzogKEVsZW1lbnQgfCBUZXh0KVtdXG4pIHtcblx0bGV0IGRvbU5vZGU6IEVsZW1lbnQgfCBUZXh0IHwgdW5kZWZpbmVkO1xuXHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHRpZiAoaXNXTm9kZShkbm9kZSkpIHtcblx0XHRsZXQgeyB3aWRnZXRDb25zdHJ1Y3RvciB9ID0gZG5vZGU7XG5cdFx0Y29uc3QgcGFyZW50SW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KHBhcmVudEluc3RhbmNlKSE7XG5cdFx0aWYgKCFpc1dpZGdldEJhc2VDb25zdHJ1Y3RvcjxEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZT4od2lkZ2V0Q29uc3RydWN0b3IpKSB7XG5cdFx0XHRjb25zdCBpdGVtID0gcGFyZW50SW5zdGFuY2VEYXRhLnJlZ2lzdHJ5KCkuZ2V0PERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlPih3aWRnZXRDb25zdHJ1Y3Rvcik7XG5cdFx0XHRpZiAoaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR3aWRnZXRDb25zdHJ1Y3RvciA9IGl0ZW07XG5cdFx0fVxuXHRcdGNvbnN0IGluc3RhbmNlID0gbmV3IHdpZGdldENvbnN0cnVjdG9yKCk7XG5cdFx0ZG5vZGUuaW5zdGFuY2UgPSBpbnN0YW5jZTtcblx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpITtcblx0XHRpbnN0YW5jZURhdGEuaW52YWxpZGF0ZSA9ICgpID0+IHtcblx0XHRcdGluc3RhbmNlRGF0YS5kaXJ0eSA9IHRydWU7XG5cdFx0XHRpZiAoaW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9PT0gZmFsc2UpIHtcblx0XHRcdFx0cHJvamVjdG9yU3RhdGUucmVuZGVyUXVldWUucHVzaCh7IGluc3RhbmNlLCBkZXB0aDogcHJvamVjdGlvbk9wdGlvbnMuZGVwdGggfSk7XG5cdFx0XHRcdHNjaGVkdWxlUmVuZGVyKHByb2plY3Rpb25PcHRpb25zKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPSB0cnVlO1xuXHRcdGluc3RhbmNlLl9fc2V0Q29yZVByb3BlcnRpZXNfXyhkbm9kZS5jb3JlUHJvcGVydGllcyk7XG5cdFx0aW5zdGFuY2UuX19zZXRDaGlsZHJlbl9fKGRub2RlLmNoaWxkcmVuKTtcblx0XHRpbnN0YW5jZS5fX3NldFByb3BlcnRpZXNfXyhkbm9kZS5wcm9wZXJ0aWVzKTtcblx0XHRjb25zdCByZW5kZXJlZCA9IGluc3RhbmNlLl9fcmVuZGVyX18oKTtcblx0XHRpbnN0YW5jZURhdGEucmVuZGVyaW5nID0gZmFsc2U7XG5cdFx0aWYgKHJlbmRlcmVkKSB7XG5cdFx0XHRjb25zdCBmaWx0ZXJlZFJlbmRlcmVkID0gZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihyZW5kZXJlZCwgaW5zdGFuY2UpO1xuXHRcdFx0ZG5vZGUucmVuZGVyZWQgPSBmaWx0ZXJlZFJlbmRlcmVkO1xuXHRcdFx0YWRkQ2hpbGRyZW4ocGFyZW50Vk5vZGUsIGZpbHRlcmVkUmVuZGVyZWQsIHByb2plY3Rpb25PcHRpb25zLCBpbnN0YW5jZSwgaW5zZXJ0QmVmb3JlLCBjaGlsZE5vZGVzKTtcblx0XHR9XG5cdFx0aW5zdGFuY2VNYXAuc2V0KGluc3RhbmNlLCB7IGRub2RlLCBwYXJlbnRWTm9kZSB9KTtcblx0XHRpbnN0YW5jZURhdGEubm9kZUhhbmRsZXIuYWRkUm9vdCgpO1xuXHRcdHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLnB1c2goKCkgPT4ge1xuXHRcdFx0aW5zdGFuY2VEYXRhLm9uQXR0YWNoKCk7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHByb2plY3RvclN0YXRlLm1lcmdlICYmIHByb2plY3RvclN0YXRlLm1lcmdlRWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRkb21Ob2RlID0gZG5vZGUuZG9tTm9kZSA9IHByb2plY3Rpb25PcHRpb25zLm1lcmdlRWxlbWVudDtcblx0XHRcdHByb2plY3RvclN0YXRlLm1lcmdlRWxlbWVudCA9IHVuZGVmaW5lZDtcblx0XHRcdGluaXRQcm9wZXJ0aWVzQW5kQ2hpbGRyZW4oZG9tTm9kZSEsIGRub2RlLCBwYXJlbnRJbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBkb2MgPSBwYXJlbnRWTm9kZS5kb21Ob2RlIS5vd25lckRvY3VtZW50O1xuXHRcdGlmICghZG5vZGUudGFnICYmIHR5cGVvZiBkbm9kZS50ZXh0ID09PSAnc3RyaW5nJykge1xuXHRcdFx0aWYgKGRub2RlLmRvbU5vZGUgIT09IHVuZGVmaW5lZCAmJiBwYXJlbnRWTm9kZS5kb21Ob2RlKSB7XG5cdFx0XHRcdGNvbnN0IG5ld0RvbU5vZGUgPSBkbm9kZS5kb21Ob2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZG5vZGUudGV4dCEpO1xuXHRcdFx0XHRpZiAocGFyZW50Vk5vZGUuZG9tTm9kZSA9PT0gZG5vZGUuZG9tTm9kZS5wYXJlbnROb2RlKSB7XG5cdFx0XHRcdFx0cGFyZW50Vk5vZGUuZG9tTm9kZS5yZXBsYWNlQ2hpbGQobmV3RG9tTm9kZSwgZG5vZGUuZG9tTm9kZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cGFyZW50Vk5vZGUuZG9tTm9kZS5hcHBlbmRDaGlsZChuZXdEb21Ob2RlKTtcblx0XHRcdFx0XHRkbm9kZS5kb21Ob2RlLnBhcmVudE5vZGUgJiYgZG5vZGUuZG9tTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRub2RlLmRvbU5vZGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRub2RlLmRvbU5vZGUgPSBuZXdEb21Ob2RlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUoZG5vZGUudGV4dCEpO1xuXHRcdFx0XHRpZiAoaW5zZXJ0QmVmb3JlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRwYXJlbnRWTm9kZS5kb21Ob2RlIS5pbnNlcnRCZWZvcmUoZG9tTm9kZSwgaW5zZXJ0QmVmb3JlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwYXJlbnRWTm9kZS5kb21Ob2RlIS5hcHBlbmRDaGlsZChkb21Ob2RlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoZG5vZGUuZG9tTm9kZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGlmIChkbm9kZS50YWcgPT09ICdzdmcnKSB7XG5cdFx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMgPSB7IC4uLnByb2plY3Rpb25PcHRpb25zLCAuLi57IG5hbWVzcGFjZTogTkFNRVNQQUNFX1NWRyB9IH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHByb2plY3Rpb25PcHRpb25zLm5hbWVzcGFjZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0ZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgPSBkb2MuY3JlYXRlRWxlbWVudE5TKHByb2plY3Rpb25PcHRpb25zLm5hbWVzcGFjZSwgZG5vZGUudGFnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkb21Ob2RlID0gZG5vZGUuZG9tTm9kZSA9IGRub2RlLmRvbU5vZGUgfHwgZG9jLmNyZWF0ZUVsZW1lbnQoZG5vZGUudGFnKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZG9tTm9kZSA9IGRub2RlLmRvbU5vZGU7XG5cdFx0XHR9XG5cdFx0XHRpbml0UHJvcGVydGllc0FuZENoaWxkcmVuKGRvbU5vZGUhIGFzIEVsZW1lbnQsIGRub2RlLCBwYXJlbnRJbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0aWYgKGluc2VydEJlZm9yZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHBhcmVudFZOb2RlLmRvbU5vZGUhLmluc2VydEJlZm9yZShkb21Ob2RlLCBpbnNlcnRCZWZvcmUpO1xuXHRcdFx0fSBlbHNlIGlmIChkb21Ob2RlIS5wYXJlbnROb2RlICE9PSBwYXJlbnRWTm9kZS5kb21Ob2RlISkge1xuXHRcdFx0XHRwYXJlbnRWTm9kZS5kb21Ob2RlIS5hcHBlbmRDaGlsZChkb21Ob2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRG9tKFxuXHRwcmV2aW91czogYW55LFxuXHRkbm9kZTogSW50ZXJuYWxETm9kZSxcblx0cHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zLFxuXHRwYXJlbnRWTm9kZTogSW50ZXJuYWxWTm9kZSxcblx0cGFyZW50SW5zdGFuY2U6IERlZmF1bHRXaWRnZXRCYXNlSW50ZXJmYWNlXG4pIHtcblx0aWYgKGlzV05vZGUoZG5vZGUpKSB7XG5cdFx0Y29uc3QgeyBpbnN0YW5jZSB9ID0gcHJldmlvdXM7XG5cdFx0Y29uc3QgeyBwYXJlbnRWTm9kZSwgZG5vZGU6IG5vZGUgfSA9IGluc3RhbmNlTWFwLmdldChpbnN0YW5jZSkhO1xuXHRcdGNvbnN0IHByZXZpb3VzUmVuZGVyZWQgPSBub2RlID8gbm9kZS5yZW5kZXJlZCA6IHByZXZpb3VzLnJlbmRlcmVkO1xuXHRcdGNvbnN0IGluc3RhbmNlRGF0YSA9IHdpZGdldEluc3RhbmNlTWFwLmdldChpbnN0YW5jZSkhO1xuXHRcdGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPSB0cnVlO1xuXHRcdGluc3RhbmNlLl9fc2V0Q29yZVByb3BlcnRpZXNfXyhkbm9kZS5jb3JlUHJvcGVydGllcyk7XG5cdFx0aW5zdGFuY2UuX19zZXRDaGlsZHJlbl9fKGRub2RlLmNoaWxkcmVuKTtcblx0XHRpbnN0YW5jZS5fX3NldFByb3BlcnRpZXNfXyhkbm9kZS5wcm9wZXJ0aWVzKTtcblx0XHRkbm9kZS5pbnN0YW5jZSA9IGluc3RhbmNlO1xuXHRcdGlmIChpbnN0YW5jZURhdGEuZGlydHkgPT09IHRydWUpIHtcblx0XHRcdGNvbnN0IHJlbmRlcmVkID0gaW5zdGFuY2UuX19yZW5kZXJfXygpO1xuXHRcdFx0aW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9IGZhbHNlO1xuXHRcdFx0ZG5vZGUucmVuZGVyZWQgPSBmaWx0ZXJBbmREZWNvcmF0ZUNoaWxkcmVuKHJlbmRlcmVkLCBpbnN0YW5jZSk7XG5cdFx0XHR1cGRhdGVDaGlsZHJlbihwYXJlbnRWTm9kZSwgcHJldmlvdXNSZW5kZXJlZCwgZG5vZGUucmVuZGVyZWQsIGluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGluc3RhbmNlRGF0YS5yZW5kZXJpbmcgPSBmYWxzZTtcblx0XHRcdGRub2RlLnJlbmRlcmVkID0gcHJldmlvdXNSZW5kZXJlZDtcblx0XHR9XG5cdFx0aW5zdGFuY2VNYXAuc2V0KGluc3RhbmNlLCB7IGRub2RlLCBwYXJlbnRWTm9kZSB9KTtcblx0XHRpbnN0YW5jZURhdGEubm9kZUhhbmRsZXIuYWRkUm9vdCgpO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChwcmV2aW91cyA9PT0gZG5vZGUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0Y29uc3QgZG9tTm9kZSA9IChkbm9kZS5kb21Ob2RlID0gcHJldmlvdXMuZG9tTm9kZSk7XG5cdFx0bGV0IHRleHRVcGRhdGVkID0gZmFsc2U7XG5cdFx0bGV0IHVwZGF0ZWQgPSBmYWxzZTtcblx0XHRpZiAoIWRub2RlLnRhZyAmJiB0eXBlb2YgZG5vZGUudGV4dCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdGlmIChkbm9kZS50ZXh0ICE9PSBwcmV2aW91cy50ZXh0KSB7XG5cdFx0XHRcdGNvbnN0IG5ld0RvbU5vZGUgPSBkb21Ob2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZG5vZGUudGV4dCEpO1xuXHRcdFx0XHRkb21Ob2RlLnBhcmVudE5vZGUhLnJlcGxhY2VDaGlsZChuZXdEb21Ob2RlLCBkb21Ob2RlKTtcblx0XHRcdFx0ZG5vZGUuZG9tTm9kZSA9IG5ld0RvbU5vZGU7XG5cdFx0XHRcdHRleHRVcGRhdGVkID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuIHRleHRVcGRhdGVkO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoZG5vZGUudGFnICYmIGRub2RlLnRhZy5sYXN0SW5kZXhPZignc3ZnJywgMCkgPT09IDApIHtcblx0XHRcdFx0cHJvamVjdGlvbk9wdGlvbnMgPSB7IC4uLnByb2plY3Rpb25PcHRpb25zLCAuLi57IG5hbWVzcGFjZTogTkFNRVNQQUNFX1NWRyB9IH07XG5cdFx0XHR9XG5cdFx0XHRpZiAocHJldmlvdXMuY2hpbGRyZW4gIT09IGRub2RlLmNoaWxkcmVuKSB7XG5cdFx0XHRcdGNvbnN0IGNoaWxkcmVuID0gZmlsdGVyQW5kRGVjb3JhdGVDaGlsZHJlbihkbm9kZS5jaGlsZHJlbiwgcGFyZW50SW5zdGFuY2UpO1xuXHRcdFx0XHRkbm9kZS5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuXHRcdFx0XHR1cGRhdGVkID1cblx0XHRcdFx0XHR1cGRhdGVDaGlsZHJlbihkbm9kZSwgcHJldmlvdXMuY2hpbGRyZW4sIGNoaWxkcmVuLCBwYXJlbnRJbnN0YW5jZSwgcHJvamVjdGlvbk9wdGlvbnMpIHx8IHVwZGF0ZWQ7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHByZXZpb3VzUHJvcGVydGllcyA9IGJ1aWxkUHJldmlvdXNQcm9wZXJ0aWVzKGRvbU5vZGUsIHByZXZpb3VzLCBkbm9kZSk7XG5cdFx0XHRpZiAoZG5vZGUuYXR0cmlidXRlcyAmJiBkbm9kZS5ldmVudHMpIHtcblx0XHRcdFx0dXBkYXRlQXR0cmlidXRlcyhkb21Ob2RlLCBwcmV2aW91c1Byb3BlcnRpZXMuYXR0cmlidXRlcywgZG5vZGUuYXR0cmlidXRlcywgcHJvamVjdGlvbk9wdGlvbnMpO1xuXHRcdFx0XHR1cGRhdGVkID1cblx0XHRcdFx0XHR1cGRhdGVQcm9wZXJ0aWVzKFxuXHRcdFx0XHRcdFx0ZG9tTm9kZSxcblx0XHRcdFx0XHRcdHByZXZpb3VzUHJvcGVydGllcy5wcm9wZXJ0aWVzLFxuXHRcdFx0XHRcdFx0ZG5vZGUucHJvcGVydGllcyxcblx0XHRcdFx0XHRcdHByb2plY3Rpb25PcHRpb25zLFxuXHRcdFx0XHRcdFx0ZmFsc2Vcblx0XHRcdFx0XHQpIHx8IHVwZGF0ZWQ7XG5cdFx0XHRcdHJlbW92ZU9ycGhhbmVkRXZlbnRzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcy5ldmVudHMsIGRub2RlLmV2ZW50cywgcHJvamVjdGlvbk9wdGlvbnMsIHRydWUpO1xuXHRcdFx0XHRjb25zdCBldmVudHMgPSBkbm9kZS5ldmVudHM7XG5cdFx0XHRcdE9iamVjdC5rZXlzKGV2ZW50cykuZm9yRWFjaCgoZXZlbnQpID0+IHtcblx0XHRcdFx0XHR1cGRhdGVFdmVudChcblx0XHRcdFx0XHRcdGRvbU5vZGUsXG5cdFx0XHRcdFx0XHRldmVudCxcblx0XHRcdFx0XHRcdGV2ZW50c1tldmVudF0sXG5cdFx0XHRcdFx0XHRwcm9qZWN0aW9uT3B0aW9ucyxcblx0XHRcdFx0XHRcdGRub2RlLnByb3BlcnRpZXMuYmluZCxcblx0XHRcdFx0XHRcdHByZXZpb3VzUHJvcGVydGllcy5ldmVudHNbZXZlbnRdXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR1cGRhdGVkID1cblx0XHRcdFx0XHR1cGRhdGVQcm9wZXJ0aWVzKGRvbU5vZGUsIHByZXZpb3VzUHJvcGVydGllcy5wcm9wZXJ0aWVzLCBkbm9kZS5wcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucykgfHxcblx0XHRcdFx0XHR1cGRhdGVkO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZG5vZGUucHJvcGVydGllcy5rZXkgIT09IG51bGwgJiYgZG5vZGUucHJvcGVydGllcy5rZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQocGFyZW50SW5zdGFuY2UpITtcblx0XHRcdFx0aW5zdGFuY2VEYXRhLm5vZGVIYW5kbGVyLmFkZChkb21Ob2RlLCBgJHtkbm9kZS5wcm9wZXJ0aWVzLmtleX1gKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHVwZGF0ZWQgJiYgZG5vZGUucHJvcGVydGllcyAmJiBkbm9kZS5wcm9wZXJ0aWVzLnVwZGF0ZUFuaW1hdGlvbikge1xuXHRcdFx0ZG5vZGUucHJvcGVydGllcy51cGRhdGVBbmltYXRpb24oZG9tTm9kZSBhcyBFbGVtZW50LCBkbm9kZS5wcm9wZXJ0aWVzLCBwcmV2aW91cy5wcm9wZXJ0aWVzKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYWRkRGVmZXJyZWRQcm9wZXJ0aWVzKHZub2RlOiBJbnRlcm5hbFZOb2RlLCBwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMpIHtcblx0Ly8gdHJhbnNmZXIgYW55IHByb3BlcnRpZXMgdGhhdCBoYXZlIGJlZW4gcGFzc2VkIC0gYXMgdGhlc2UgbXVzdCBiZSBkZWNvcmF0ZWQgcHJvcGVydGllc1xuXHR2bm9kZS5kZWNvcmF0ZWREZWZlcnJlZFByb3BlcnRpZXMgPSB2bm9kZS5wcm9wZXJ0aWVzO1xuXHRjb25zdCBwcm9wZXJ0aWVzID0gdm5vZGUuZGVmZXJyZWRQcm9wZXJ0aWVzQ2FsbGJhY2shKCEhdm5vZGUuaW5zZXJ0ZWQpO1xuXHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHR2bm9kZS5wcm9wZXJ0aWVzID0geyAuLi5wcm9wZXJ0aWVzLCAuLi52bm9kZS5kZWNvcmF0ZWREZWZlcnJlZFByb3BlcnRpZXMgfTtcblx0cHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3MucHVzaCgoKSA9PiB7XG5cdFx0Y29uc3QgcHJvcGVydGllcyA9IHtcblx0XHRcdC4uLnZub2RlLmRlZmVycmVkUHJvcGVydGllc0NhbGxiYWNrISghIXZub2RlLmluc2VydGVkKSxcblx0XHRcdC4uLnZub2RlLmRlY29yYXRlZERlZmVycmVkUHJvcGVydGllc1xuXHRcdH07XG5cdFx0dXBkYXRlUHJvcGVydGllcyh2bm9kZS5kb21Ob2RlISBhcyBFbGVtZW50LCB2bm9kZS5wcm9wZXJ0aWVzLCBwcm9wZXJ0aWVzLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0dm5vZGUucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBydW5EZWZlcnJlZFJlbmRlckNhbGxiYWNrcyhwcm9qZWN0aW9uT3B0aW9uczogUHJvamVjdGlvbk9wdGlvbnMpIHtcblx0Y29uc3QgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQocHJvamVjdGlvbk9wdGlvbnMucHJvamVjdG9ySW5zdGFuY2UpITtcblx0aWYgKHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdGlmIChwcm9qZWN0aW9uT3B0aW9ucy5zeW5jKSB7XG5cdFx0XHR3aGlsZSAocHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdGNvbnN0IGNhbGxiYWNrID0gcHJvamVjdG9yU3RhdGUuZGVmZXJyZWRSZW5kZXJDYWxsYmFja3Muc2hpZnQoKTtcblx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Z2xvYmFsLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG5cdFx0XHRcdHdoaWxlIChwcm9qZWN0b3JTdGF0ZS5kZWZlcnJlZFJlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRjb25zdCBjYWxsYmFjayA9IHByb2plY3RvclN0YXRlLmRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzLnNoaWZ0KCk7XG5cdFx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHJ1bkFmdGVyUmVuZGVyQ2FsbGJhY2tzKHByb2plY3Rpb25PcHRpb25zOiBQcm9qZWN0aW9uT3B0aW9ucykge1xuXHRjb25zdCBwcm9qZWN0b3JTdGF0ZSA9IHByb2plY3RvclN0YXRlTWFwLmdldChwcm9qZWN0aW9uT3B0aW9ucy5wcm9qZWN0b3JJbnN0YW5jZSkhO1xuXHRpZiAocHJvamVjdGlvbk9wdGlvbnMuc3luYykge1xuXHRcdHdoaWxlIChwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5sZW5ndGgpIHtcblx0XHRcdGNvbnN0IGNhbGxiYWNrID0gcHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3Muc2hpZnQoKTtcblx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmIChnbG9iYWwucmVxdWVzdElkbGVDYWxsYmFjaykge1xuXHRcdFx0Z2xvYmFsLnJlcXVlc3RJZGxlQ2FsbGJhY2soKCkgPT4ge1xuXHRcdFx0XHR3aGlsZSAocHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0Y29uc3QgY2FsbGJhY2sgPSBwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5zaGlmdCgpO1xuXHRcdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0d2hpbGUgKHByb2plY3RvclN0YXRlLmFmdGVyUmVuZGVyQ2FsbGJhY2tzLmxlbmd0aCkge1xuXHRcdFx0XHRcdGNvbnN0IGNhbGxiYWNrID0gcHJvamVjdG9yU3RhdGUuYWZ0ZXJSZW5kZXJDYWxsYmFja3Muc2hpZnQoKTtcblx0XHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gc2NoZWR1bGVSZW5kZXIocHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zKSB7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdGlmIChwcm9qZWN0aW9uT3B0aW9ucy5zeW5jKSB7XG5cdFx0cmVuZGVyKHByb2plY3Rpb25PcHRpb25zKTtcblx0fSBlbHNlIGlmIChwcm9qZWN0b3JTdGF0ZS5yZW5kZXJTY2hlZHVsZWQgPT09IHVuZGVmaW5lZCkge1xuXHRcdHByb2plY3RvclN0YXRlLnJlbmRlclNjaGVkdWxlZCA9IGdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuXHRcdFx0cmVuZGVyKHByb2plY3Rpb25PcHRpb25zKTtcblx0XHR9KTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW5kZXIocHJvamVjdGlvbk9wdGlvbnM6IFByb2plY3Rpb25PcHRpb25zKSB7XG5cdGNvbnN0IHByb2plY3RvclN0YXRlID0gcHJvamVjdG9yU3RhdGVNYXAuZ2V0KHByb2plY3Rpb25PcHRpb25zLnByb2plY3Rvckluc3RhbmNlKSE7XG5cdHByb2plY3RvclN0YXRlLnJlbmRlclNjaGVkdWxlZCA9IHVuZGVmaW5lZDtcblx0Y29uc3QgcmVuZGVyUXVldWUgPSBwcm9qZWN0b3JTdGF0ZS5yZW5kZXJRdWV1ZTtcblx0Y29uc3QgcmVuZGVycyA9IFsuLi5yZW5kZXJRdWV1ZV07XG5cdHByb2plY3RvclN0YXRlLnJlbmRlclF1ZXVlID0gW107XG5cdHJlbmRlcnMuc29ydCgoYSwgYikgPT4gYS5kZXB0aCAtIGIuZGVwdGgpO1xuXHRjb25zdCBwcmV2aW91c2x5UmVuZGVyZWQgPSBbXTtcblx0d2hpbGUgKHJlbmRlcnMubGVuZ3RoKSB7XG5cdFx0Y29uc3QgeyBpbnN0YW5jZSB9ID0gcmVuZGVycy5zaGlmdCgpITtcblx0XHRpZiAoaW5zdGFuY2VNYXAuaGFzKGluc3RhbmNlKSAmJiBwcmV2aW91c2x5UmVuZGVyZWQuaW5kZXhPZihpbnN0YW5jZSkgPT09IC0xKSB7XG5cdFx0XHRwcmV2aW91c2x5UmVuZGVyZWQucHVzaChpbnN0YW5jZSk7XG5cdFx0XHRjb25zdCB7IHBhcmVudFZOb2RlLCBkbm9kZSB9ID0gaW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0XHRjb25zdCBpbnN0YW5jZURhdGEgPSB3aWRnZXRJbnN0YW5jZU1hcC5nZXQoaW5zdGFuY2UpITtcblx0XHRcdHVwZGF0ZURvbShkbm9kZSwgdG9JbnRlcm5hbFdOb2RlKGluc3RhbmNlLCBpbnN0YW5jZURhdGEpLCBwcm9qZWN0aW9uT3B0aW9ucywgcGFyZW50Vk5vZGUsIGluc3RhbmNlKTtcblx0XHR9XG5cdH1cblx0cnVuQWZ0ZXJSZW5kZXJDYWxsYmFja3MocHJvamVjdGlvbk9wdGlvbnMpO1xuXHRydW5EZWZlcnJlZFJlbmRlckNhbGxiYWNrcyhwcm9qZWN0aW9uT3B0aW9ucyk7XG59XG5cbmV4cG9ydCBjb25zdCBkb20gPSB7XG5cdGFwcGVuZDogZnVuY3Rpb24oXG5cdFx0cGFyZW50Tm9kZTogRWxlbWVudCxcblx0XHRpbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsXG5cdFx0cHJvamVjdGlvbk9wdGlvbnM6IFBhcnRpYWw8UHJvamVjdGlvbk9wdGlvbnM+ID0ge31cblx0KTogUHJvamVjdGlvbiB7XG5cdFx0Y29uc3QgaW5zdGFuY2VEYXRhID0gd2lkZ2V0SW5zdGFuY2VNYXAuZ2V0KGluc3RhbmNlKSE7XG5cdFx0Y29uc3QgZmluYWxQcm9qZWN0b3JPcHRpb25zID0gZ2V0UHJvamVjdGlvbk9wdGlvbnMocHJvamVjdGlvbk9wdGlvbnMsIGluc3RhbmNlKTtcblx0XHRjb25zdCBwcm9qZWN0b3JTdGF0ZTogUHJvamVjdG9yU3RhdGUgPSB7XG5cdFx0XHRhZnRlclJlbmRlckNhbGxiYWNrczogW10sXG5cdFx0XHRkZWZlcnJlZFJlbmRlckNhbGxiYWNrczogW10sXG5cdFx0XHRub2RlTWFwOiBuZXcgV2Vha01hcCgpLFxuXHRcdFx0cmVuZGVyU2NoZWR1bGVkOiB1bmRlZmluZWQsXG5cdFx0XHRyZW5kZXJRdWV1ZTogW10sXG5cdFx0XHRtZXJnZTogcHJvamVjdGlvbk9wdGlvbnMubWVyZ2UgfHwgZmFsc2UsXG5cdFx0XHRtZXJnZUVsZW1lbnQ6IHByb2plY3Rpb25PcHRpb25zLm1lcmdlRWxlbWVudFxuXHRcdH07XG5cdFx0cHJvamVjdG9yU3RhdGVNYXAuc2V0KGluc3RhbmNlLCBwcm9qZWN0b3JTdGF0ZSk7XG5cblx0XHRmaW5hbFByb2plY3Rvck9wdGlvbnMucm9vdE5vZGUgPSBwYXJlbnROb2RlO1xuXHRcdGNvbnN0IHBhcmVudFZOb2RlID0gdG9QYXJlbnRWTm9kZShmaW5hbFByb2plY3Rvck9wdGlvbnMucm9vdE5vZGUpO1xuXHRcdGNvbnN0IG5vZGUgPSB0b0ludGVybmFsV05vZGUoaW5zdGFuY2UsIGluc3RhbmNlRGF0YSk7XG5cdFx0aW5zdGFuY2VNYXAuc2V0KGluc3RhbmNlLCB7IGRub2RlOiBub2RlLCBwYXJlbnRWTm9kZSB9KTtcblx0XHRpbnN0YW5jZURhdGEuaW52YWxpZGF0ZSA9ICgpID0+IHtcblx0XHRcdGluc3RhbmNlRGF0YS5kaXJ0eSA9IHRydWU7XG5cdFx0XHRpZiAoaW5zdGFuY2VEYXRhLnJlbmRlcmluZyA9PT0gZmFsc2UpIHtcblx0XHRcdFx0cHJvamVjdG9yU3RhdGUucmVuZGVyUXVldWUucHVzaCh7IGluc3RhbmNlLCBkZXB0aDogZmluYWxQcm9qZWN0b3JPcHRpb25zLmRlcHRoIH0pO1xuXHRcdFx0XHRzY2hlZHVsZVJlbmRlcihmaW5hbFByb2plY3Rvck9wdGlvbnMpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0dXBkYXRlRG9tKG5vZGUsIG5vZGUsIGZpbmFsUHJvamVjdG9yT3B0aW9ucywgcGFyZW50Vk5vZGUsIGluc3RhbmNlKTtcblx0XHRwcm9qZWN0b3JTdGF0ZS5hZnRlclJlbmRlckNhbGxiYWNrcy5wdXNoKCgpID0+IHtcblx0XHRcdGluc3RhbmNlRGF0YS5vbkF0dGFjaCgpO1xuXHRcdH0pO1xuXHRcdHJ1bkRlZmVycmVkUmVuZGVyQ2FsbGJhY2tzKGZpbmFsUHJvamVjdG9yT3B0aW9ucyk7XG5cdFx0cnVuQWZ0ZXJSZW5kZXJDYWxsYmFja3MoZmluYWxQcm9qZWN0b3JPcHRpb25zKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0ZG9tTm9kZTogZmluYWxQcm9qZWN0b3JPcHRpb25zLnJvb3ROb2RlXG5cdFx0fTtcblx0fSxcblx0Y3JlYXRlOiBmdW5jdGlvbihpbnN0YW5jZTogRGVmYXVsdFdpZGdldEJhc2VJbnRlcmZhY2UsIHByb2plY3Rpb25PcHRpb25zPzogUGFydGlhbDxQcm9qZWN0aW9uT3B0aW9ucz4pOiBQcm9qZWN0aW9uIHtcblx0XHRyZXR1cm4gdGhpcy5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksIGluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdH0sXG5cdG1lcmdlOiBmdW5jdGlvbihcblx0XHRlbGVtZW50OiBFbGVtZW50LFxuXHRcdGluc3RhbmNlOiBEZWZhdWx0V2lkZ2V0QmFzZUludGVyZmFjZSxcblx0XHRwcm9qZWN0aW9uT3B0aW9uczogUGFydGlhbDxQcm9qZWN0aW9uT3B0aW9ucz4gPSB7fVxuXHQpOiBQcm9qZWN0aW9uIHtcblx0XHRwcm9qZWN0aW9uT3B0aW9ucy5tZXJnZSA9IHRydWU7XG5cdFx0cHJvamVjdGlvbk9wdGlvbnMubWVyZ2VFbGVtZW50ID0gZWxlbWVudDtcblx0XHRjb25zdCBwcm9qZWN0aW9uID0gdGhpcy5hcHBlbmQoZWxlbWVudC5wYXJlbnROb2RlIGFzIEVsZW1lbnQsIGluc3RhbmNlLCBwcm9qZWN0aW9uT3B0aW9ucyk7XG5cdFx0Y29uc3QgcHJvamVjdG9yU3RhdGUgPSBwcm9qZWN0b3JTdGF0ZU1hcC5nZXQoaW5zdGFuY2UpITtcblx0XHRwcm9qZWN0b3JTdGF0ZS5tZXJnZSA9IGZhbHNlO1xuXHRcdHJldHVybiBwcm9qZWN0aW9uO1xuXHR9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHZkb20udHMiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSBtYWluIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSB5W29wWzBdICYgMiA/IFwicmV0dXJuXCIgOiBvcFswXSA/IFwidGhyb3dcIiA6IFwibmV4dFwiXSkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbMCwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgIH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChvW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9OyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gbWFpbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcbn0gY2F0Y2goZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxuXHRcdGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL21haW4uY3NzXG4vLyBtb2R1bGUgaWQgPSAuL3NyYy9tYWluLmNzc1xuLy8gbW9kdWxlIGNodW5rcyA9IG1haW4iLCJpbXBvcnQgeyBQcm9qZWN0b3JNaXhpbiB9IGZyb20gJ0Bkb2pvL3dpZGdldC1jb3JlL21peGlucy9Qcm9qZWN0b3InO1xuaW1wb3J0IEFwcCBmcm9tICcuL3dpZGdldHMvQXBwJztcblxuLy8gQ3JlYXRlIGEgcHJvamVjdG9yIHRvIGNvbnZlcnQgdGhlIHZpcnR1YWwgRE9NIHByb2R1Y2VkIGJ5IHRoZSBhcHBsaWNhdGlvbiBpbnRvIHRoZSByZW5kZXJlZCBwYWdlLlxuLy8gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gc3RhcnRpbmcgdXAgYSBEb2pvIDIgYXBwbGljYXRpb24sIHRha2UgYSBsb29rIGF0XG4vLyBodHRwczovL2Rvam8uaW8vdHV0b3JpYWxzLzAwMl9jcmVhdGluZ19hbl9hcHBsaWNhdGlvbi9cbmNvbnN0IFByb2plY3RvciA9IFByb2plY3Rvck1peGluKEFwcCk7XG5jb25zdCBwcm9qZWN0b3IgPSBuZXcgUHJvamVjdG9yKCk7XG5cbi8vIEJ5IGRlZmF1bHQsIGFwcGVuZCgpIHdpbGwgYXR0YWNoIHRoZSByZW5kZXJlZCBjb250ZW50IHRvIGRvY3VtZW50LmJvZHkuICBUbyBpbnNlcnQgdGhpcyBhcHBsaWNhdGlvblxuLy8gaW50byBleGlzdGluZyBIVE1MIGNvbnRlbnQsIHBhc3MgdGhlIGRlc2lyZWQgcm9vdCBub2RlIHRvIGFwcGVuZCgpLlxucHJvamVjdG9yLmFwcGVuZCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL0Bkb2pvL3dlYnBhY2stY29udHJpYi9jc3MtbW9kdWxlLWR0cy1sb2FkZXI/dHlwZT10cyZpbnN0YW5jZU5hbWU9MF9kb2pvIS4vc3JjL21haW4udHMiLCJpbXBvcnQgV2lkZ2V0QmFzZSBmcm9tICdAZG9qby93aWRnZXQtY29yZS9XaWRnZXRCYXNlJztcbmltcG9ydCB7IHYgfSBmcm9tICdAZG9qby93aWRnZXQtY29yZS9kJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgV2lkZ2V0QmFzZSB7XG4gIHByb3RlY3RlZCByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHYoJ2RpdicpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvQGRvam8vd2VicGFjay1jb250cmliL2Nzcy1tb2R1bGUtZHRzLWxvYWRlcj90eXBlPXRzJmluc3RhbmNlTmFtZT0wX2Rvam8hLi9zcmMvd2lkZ2V0cy9BcHAudHMiXSwic291cmNlUm9vdCI6IiJ9
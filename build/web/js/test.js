//     Underscore.js 1.5.1
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.1';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value == null ? _.identity : value);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var result;
    var timeout = null;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

(function(){
  var require = function(){
    return window.Subledger;
  }
  var exports = {};
/*!
 * Nodeunit
 * https://github.com/caolan/nodeunit
 * Copyright (c) 2010 Caolan McMahon
 * MIT Licensed
 *
 * json2.js
 * http://www.JSON.org/json2.js
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */
nodeunit = (function(){
/*
    http://www.JSON.org/json2.js
    2010-11-17

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

var JSON = {};

(function () {
    "use strict";

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
var assert = this.assert = {};
var types = {};
var core = {};
var nodeunit = {};
var reporter = {};
/*global setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root = this,
        previous_async = root.async;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    else {
        root.async = async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    //// cross-browser compatiblity functions ////

    var _forEach = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _forEach(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _forEach(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    var _indexOf = function (arr, item) {
        if (arr.indexOf) {
            return arr.indexOf(item);
        }
        for (var i = 0; i < arr.length; i += 1) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        async.nextTick = function (fn) {
            setTimeout(fn, 0);
        };
    }
    else {
        async.nextTick = process.nextTick;
    }

    async.forEach = function (arr, iterator, callback) {
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _forEach(arr, function (x) {
            iterator(x, function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback();
                    }
                }
            });
        });
    };

    async.forEachSeries = function (arr, iterator, callback) {
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed === arr.length) {
                        callback();
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.forEach].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.forEachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);


    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.forEachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.forEach(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.forEach(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var completed = [];

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _forEach(listeners, function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (completed.length === keys.length) {
                callback(null);
            }
        });

        _forEach(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                if (err) {
                    callback(err);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    completed.push(k);
                    taskComplete();
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && _indexOf(completed, x) !== -1);
                }, true);
            };
            if (ready()) {
                task[task.length - 1](taskCallback);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        if (!tasks.length) {
            return callback();
        }
        callback = callback || function () {};
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.nextTick(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    async.parallel = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args || null);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.forEach(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args || null);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.forEachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.queue = function (worker, concurrency) {
        var workers = 0;
        var tasks = [];
        var q = {
            concurrency: concurrency,
            push: function (data, callback) {
                tasks.push({data: data, callback: callback});
                async.nextTick(q.process);
            },
            process: function () {
                if (workers < q.concurrency && tasks.length) {
                    var task = tasks.splice(0, 1)[0];
                    workers += 1;
                    worker(task.data, function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        q.process();
                    });
                }
            },
            length: function () {
                return tasks.length;
            }
        };
        return q;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _forEach(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        hasher = hasher || function (x) {
            return x;
        };
        return function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else {
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    callback.apply(null, arguments);
                }]));
            }
        };
    };

}());
(function(exports){
/**
 * This file is based on the node.js assert module, but with some small
 * changes for browser-compatibility
 * THIS FILE SHOULD BE BROWSER-COMPATIBLE JS!
 */


/**
 * Added for browser compatibility
 */

var _keys = function(obj){
    if(Object.keys) return Object.keys(obj);
    if (typeof obj != 'object' && typeof obj != 'function') {
        throw new TypeError('-');
    }
    var keys = [];
    for(var k in obj){
        if(obj.hasOwnProperty(k)) keys.push(k);
    }
    return keys;
};



// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


var pSlice = Array.prototype.slice;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = exports;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({message: message, actual: actual, expected: expected})

assert.AssertionError = function AssertionError (options) {
  this.name = "AssertionError";
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
};
// code from util.inherits in node
assert.AssertionError.super_ = Error;


// EDITED FOR BROWSER COMPATIBILITY: replaced Object.create call
var ctor = function () { this.constructor = assert.AssertionError; };
ctor.prototype = Error.prototype;
assert.AssertionError.prototype = new ctor();


assert.AssertionError.prototype.toString = function() {
  if (this.message) {
    return [this.name+":", this.message].join(' ');
  } else {
    return [ this.name+":"
           , JSON.stringify(this.expected )
           , this.operator
           , JSON.stringify(this.actual)
           ].join(" ");
  }
};

// assert.AssertionError instanceof Error

assert.AssertionError.__proto__ = Error.prototype;

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

assert.ok = function ok(value, message) {
  if (!!!value) fail(value, true, message, "==", assert.ok);
};

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, "==", assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, "!=", assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, "deepEqual", assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == "object",
  // equivalence is determined by ==.
  } else if (typeof actual != 'object' && typeof expected != 'object') {
    return actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical "prototype" property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isUndefinedOrNull (value) {
  return value === null || value === undefined;
}

function isArguments (object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv (a, b) {
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical "prototype" property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  try{
    var ka = _keys(a),
      kb = _keys(b),
      key, i;
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key] ))
       return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, "notDeepEqual", assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, "===", assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as determined by !==.
// assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, "!==", assert.notStrictEqual);
  }
};

function _throws (shouldThrow, block, err, message) {
  var exception = null,
      threw = false,
      typematters = true;

  message = message || "";

  //handle optional arguments
  if (arguments.length == 3) {
    if (typeof(err) == "string") {
      message = err;
      typematters = false;
    }
  } else if (arguments.length == 2) {
    typematters = false;
  }

  try {
    block();
  } catch (e) {
    threw = true;
    exception = e;
  }

  if (shouldThrow && !threw) {
    fail( "Missing expected exception"
        + (err && err.name ? " ("+err.name+")." : '.')
        + (message ? " " + message : "")
        );
  }
  if (!shouldThrow && threw && typematters && exception instanceof err) {
    fail( "Got unwanted exception"
        + (err && err.name ? " ("+err.name+")." : '.')
        + (message ? " " + message : "")
        );
  }
  if ((shouldThrow && threw && typematters && !(exception instanceof err)) ||
      (!shouldThrow && threw)) {
    throw exception;
  }
};

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function (err) { if (err) {throw err;}};
})(assert);
(function(exports){
/*!
 * Nodeunit
 * Copyright (c) 2010 Caolan McMahon
 * MIT Licensed
 *
 * THIS FILE SHOULD BE BROWSER-COMPATIBLE JS!
 * You can use @REMOVE_LINE_FOR_BROWSER to remove code from the browser build.
 * Only code on that line will be removed, its mostly to avoid requiring code
 * that is node specific
 */

/**
 * Module dependencies
 */

//var assert = require('./assert'),     //@REMOVE_LINE_FOR_BROWSER
//    async = require('../deps/async'); //@REMOVE_LINE_FOR_BROWSER


/**
 * Creates assertion objects representing the result of an assert call.
 * Accepts an object or AssertionError as its argument.
 *
 * @param {object} obj
 * @api public
 */

exports.assertion = function (obj) {
    return {
        method: obj.method || '',
        message: obj.message || (obj.error && obj.error.message) || '',
        error: obj.error,
        passed: function () {
            return !this.error;
        },
        failed: function () {
            return Boolean(this.error);
        }
    };
};

/**
 * Creates an assertion list object representing a group of assertions.
 * Accepts an array of assertion objects.
 *
 * @param {Array} arr
 * @param {Number} duration
 * @api public
 */

exports.assertionList = function (arr, duration) {
    var that = arr || [];
    that.failures = function () {
        var failures = 0;
        for (var i = 0; i < this.length; i += 1) {
            if (this[i].failed()) {
                failures += 1;
            }
        }
        return failures;
    };
    that.passes = function () {
        return that.length - that.failures();
    };
    that.duration = duration || 0;
    return that;
};

/**
 * Create a wrapper function for assert module methods. Executes a callback
 * after the it's complete with an assertion object representing the result.
 *
 * @param {Function} callback
 * @api private
 */

var assertWrapper = function (callback) {
    return function (new_method, assert_method, arity) {
        return function () {
            var message = arguments[arity - 1];
            var a = exports.assertion({method: new_method, message: message});
            try {
                assert[assert_method].apply(null, arguments);
            }
            catch (e) {
                a.error = e;
            }
            callback(a);
        };
    };
};

/**
 * Creates the 'test' object that gets passed to every test function.
 * Accepts the name of the test function as its first argument, followed by
 * the start time in ms, the options object and a callback function.
 *
 * @param {String} name
 * @param {Number} start
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */

exports.test = function (name, start, options, callback) {
    var expecting;
    var a_list = [];

    var wrapAssert = assertWrapper(function (a) {
        a_list.push(a);
        if (options.log) {
            async.nextTick(function () {
                options.log(a);
            });
        }
    });

    var test = {
        done: function (err) {
            if (expecting !== undefined && expecting !== a_list.length) {
                var e = new Error(
                    'Expected ' + expecting + ' assertions, ' +
                    a_list.length + ' ran'
                );
                var a1 = exports.assertion({method: 'expect', error: e});
                a_list.push(a1);
                if (options.log) {
                    async.nextTick(function () {
                        options.log(a1);
                    });
                }
            }
            if (err) {
                var a2 = exports.assertion({error: err});
                a_list.push(a2);
                if (options.log) {
                    async.nextTick(function () {
                        options.log(a2);
                    });
                }
            }
            var end = new Date().getTime();
            async.nextTick(function () {
                var assertion_list = exports.assertionList(a_list, end - start);
                options.testDone(name, assertion_list);
                callback(null, a_list);
            });
        },
        ok: wrapAssert('ok', 'ok', 2),
        same: wrapAssert('same', 'deepEqual', 3),
        equals: wrapAssert('equals', 'equal', 3),
        expect: function (num) {
            expecting = num;
        },
        _assertion_list: a_list
    };
    // add all functions from the assert module
    for (var k in assert) {
        if (assert.hasOwnProperty(k)) {
            test[k] = wrapAssert(k, k, assert[k].length);
        }
    }
    return test;
};

/**
 * Ensures an options object has all callbacks, adding empty callback functions
 * if any are missing.
 *
 * @param {Object} opt
 * @return {Object}
 * @api public
 */

exports.options = function (opt) {
    var optionalCallback = function (name) {
        opt[name] = opt[name] || function () {};
    };

    optionalCallback('moduleStart');
    optionalCallback('moduleDone');
    optionalCallback('testStart');
    optionalCallback('testDone');
    //optionalCallback('log');

    // 'done' callback is not optional.

    return opt;
};
})(types);
(function(exports){
/*!
 * Nodeunit
 * Copyright (c) 2010 Caolan McMahon
 * MIT Licensed
 *
 * THIS FILE SHOULD BE BROWSER-COMPATIBLE JS!
 * You can use @REMOVE_LINE_FOR_BROWSER to remove code from the browser build.
 * Only code on that line will be removed, its mostly to avoid requiring code
 * that is node specific
 */

/**
 * Module dependencies
 */

//var async = require('../deps/async'), //@REMOVE_LINE_FOR_BROWSER
//    types = require('./types');       //@REMOVE_LINE_FOR_BROWSER


/**
 * Added for browser compatibility
 */

var _keys = function (obj) {
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    return keys;
};


var _copy = function (obj) {
    var nobj = {};
    var keys = _keys(obj);
    for (var i = 0; i <  keys.length; i += 1) {
        nobj[keys[i]] = obj[keys[i]];
    }
    return nobj;
};


/**
 * Runs a test function (fn) from a loaded module. After the test function
 * calls test.done(), the callback is executed with an assertionList as its
 * second argument.
 *
 * @param {String} name
 * @param {Function} fn
 * @param {Object} opt
 * @param {Function} callback
 * @api public
 */

exports.runTest = function (name, fn, opt, callback) {
    var options = types.options(opt);

    options.testStart(name);
    var start = new Date().getTime();
    var test = types.test(name, start, options, callback);

    try {
        fn(test);
    }
    catch (e) {
        test.done(e);
    }
};

/**
 * Takes an object containing test functions or other test suites as properties
 * and runs each in series. After all tests have completed, the callback is
 * called with a list of all assertions as the second argument.
 *
 * If a name is passed to this function it is prepended to all test and suite
 * names that run within it.
 *
 * @param {String} name
 * @param {Object} suite
 * @param {Object} opt
 * @param {Function} callback
 * @api public
 */

exports.runSuite = function (name, suite, opt, callback) {
    var keys = _keys(suite);

    async.concatSeries(keys, function (k, cb) {
        var prop = suite[k], _name;

        _name = name ? [].concat(name, k) : [k];

        _name.toString = function () {
            // fallback for old one
            return this.join(' - ');
        };

        if (typeof prop === 'function') {
            var in_name = false;
            for (var i = 0; i < _name.length; i += 1) {
                if (_name[i] === opt.testspec) {
                    in_name = true;
                }
            }
            if (!opt.testspec || in_name) {
                if (opt.moduleStart) {
                    opt.moduleStart();
                }
                exports.runTest(_name, suite[k], opt, cb);
            }
            else {
                return cb();
            }
        }
        else {
            exports.runSuite(_name, suite[k], opt, cb);
        }
    }, callback);
};

/**
 * Run each exported test function or test suite from a loaded module.
 *
 * @param {String} name
 * @param {Object} mod
 * @param {Object} opt
 * @param {Function} callback
 * @api public
 */

exports.runModule = function (name, mod, opt, callback) {
    var options = _copy(types.options(opt));

    var _run = false;
    var _moduleStart = options.moduleStart;
    function run_once() {
        if (!_run) {
            _run = true;
            _moduleStart(name);
        }
    }
    options.moduleStart = run_once;

    mod = this.testCase(mod);

    var start = new Date().getTime();

    exports.runSuite(null, mod, options, function (err, a_list) {
        var end = new Date().getTime();
        var assertion_list = types.assertionList(a_list, end - start);
        options.moduleDone(name, assertion_list);
        callback(null, a_list);
    });
};

/**
 * Treats an object literal as a list of modules keyed by name. Runs each
 * module and finished with calling 'done'. You can think of this as a browser
 * safe alternative to runFiles in the nodeunit module.
 *
 * @param {Object} modules
 * @param {Object} opt
 * @api public
 */

exports.runModules = function (modules, opt) {
    var all_assertions = [];
    var options = types.options(opt);
    var start = new Date().getTime();

    async.concatSeries(_keys(modules), function (k, cb) {
        exports.runModule(k, modules[k], options, cb);
    },
    function (err, all_assertions) {
        var end = new Date().getTime();
        options.done(types.assertionList(all_assertions, end - start));
    });
};


/**
 * Wraps a test function with setUp and tearDown functions.
 * Used by testCase.
 *
 * @param {Function} setUp
 * @param {Function} tearDown
 * @param {Function} fn
 * @api private
 */

var wrapTest = function (setUp, tearDown, fn) {
    return function (test) {
        var context = {};
        if (tearDown) {
            var done = test.done;
            test.done = function (err) {
                try {
                    tearDown.call(context, function (err2) {
                        if (err && err2) {
                            test._assertion_list.push(
                                types.assertion({error: err})
                            );
                            return done(err2);
                        }
                        done(err || err2);
                    });
                }
                catch (e) {
                    done(e);
                }
            };
        }
        if (setUp) {
            setUp.call(context, function (err) {
                if (err) {
                    return test.done(err);
                }
                fn.call(context, test);
            });
        }
        else {
            fn.call(context, test);
        }
    };
};


/**
 * Wraps a group of tests with setUp and tearDown functions.
 * Used by testCase.
 *
 * @param {Function} setUp
 * @param {Function} tearDown
 * @param {Object} group
 * @api private
 */

var wrapGroup = function (setUp, tearDown, group) {
    var tests = {};
    var keys = _keys(group);
    for (var i = 0; i < keys.length; i += 1) {
        var k = keys[i];
        if (typeof group[k] === 'function') {
            tests[k] = wrapTest(setUp, tearDown, group[k]);
        }
        else if (typeof group[k] === 'object') {
            tests[k] = wrapGroup(setUp, tearDown, group[k]);
        }
    }
    return tests;
};


/**
 * Utility for wrapping a suite of test functions with setUp and tearDown
 * functions.
 *
 * @param {Object} suite
 * @return {Object}
 * @api public
 */

exports.testCase = function (suite) {
    var setUp = suite.setUp;
    var tearDown = suite.tearDown;
    delete suite.setUp;
    delete suite.tearDown;
    return wrapGroup(setUp, tearDown, suite);
};
})(core);
(function(exports){
/*!
 * Nodeunit
 * Copyright (c) 2010 Caolan McMahon
 * MIT Licensed
 *
 * THIS FILE SHOULD BE BROWSER-COMPATIBLE JS!
 * You can use @REMOVE_LINE_FOR_BROWSER to remove code from the browser build.
 * Only code on that line will be removed, its mostly to avoid requiring code
 * that is node specific
 */


/**
 * NOTE: this test runner is not listed in index.js because it cannot be
 * used with the command-line tool, only inside the browser.
 */


/**
 * Reporter info string
 */

exports.info = "Browser-based test reporter";


/**
 * Run all tests within each module, reporting the results
 *
 * @param {Array} files
 * @api public
 */

exports.run = function (modules, options) {
    var start = new Date().getTime();

    function setText(el, txt) {
        if ('innerText' in el) {
            el.innerText = txt;
        }
        else if ('textContent' in el){
            el.textContent = txt;
        }
    }

    function getOrCreate(tag, id) {
        var el = document.getElementById(id);
        if (!el) {
            el = document.createElement(tag);
            el.id = id;
            document.body.appendChild(el);
        }
        return el;
    };

    var header = getOrCreate('h1', 'nodeunit-header');
    var banner = getOrCreate('h2', 'nodeunit-banner');
    var userAgent = getOrCreate('h2', 'nodeunit-userAgent');
    var tests = getOrCreate('ol', 'nodeunit-tests');
    var result = getOrCreate('p', 'nodeunit-testresult');

    setText(userAgent, navigator.userAgent);

    nodeunit.runModules(modules, {
        moduleStart: function (name) {
            /*var mheading = document.createElement('h2');
            mheading.innerText = name;
            results.appendChild(mheading);
            module = document.createElement('ol');
            results.appendChild(module);*/
        },
        testDone: function (name, assertions) {
            var test = document.createElement('li');
            var strong = document.createElement('strong');
            strong.innerHTML = name + ' <b style="color: black;">(' +
                '<b class="fail">' + assertions.failures() + '</b>, ' +
                '<b class="pass">' + assertions.passes() + '</b>, ' +
                assertions.length +
            ')</b>';
            test.className = assertions.failures() ? 'fail': 'pass';
            test.appendChild(strong);

            var aList = document.createElement('ol');
            aList.style.display = 'none';
            test.onclick = function () {
                var d = aList.style.display;
                aList.style.display = (d == 'none') ? 'block': 'none';
            };
            for (var i=0; i<assertions.length; i++) {
                var li = document.createElement('li');
                var a = assertions[i];
                if (a.failed()) {
                    li.innerHTML = (a.message || a.method || 'no message') +
                        '<pre>' + (a.error.stack || a.error) + '</pre>';
                    li.className = 'fail';
                }
                else {
                    li.innerHTML = a.message || a.method || 'no message';
                    li.className = 'pass';
                }
                aList.appendChild(li);
            }
            test.appendChild(aList);
            tests.appendChild(test);
        },
        done: function (assertions) {
            var end = new Date().getTime();
            var duration = end - start;

            var failures = assertions.failures();
            banner.className = failures ? 'fail': 'pass';

            result.innerHTML = 'Tests completed in ' + duration +
                ' milliseconds.<br/><span class="passed">' +
                assertions.passes() + '</span> assertions of ' +
                '<span class="all">' + assertions.length + '<span> passed, ' +
                assertions.failures() + ' failed.';
        }
    });
};
})(reporter);
nodeunit = core;
nodeunit.assert = assert;
nodeunit.reporter = reporter;
nodeunit.run = reporter.run;
return nodeunit; })();

/*jslint nomen: true*/
/*global exports, Subledger, _*/
(function () {

  // using strict mode
  'use strict';

  var subledger, identity, identityKey, org, book, account, category, journalEntry, journalEntryToPost, journalEntryLine, report, report_rendering;

  exports['var subledger = new Subledger()'] = {
    'Create Subledger connection' : function (test) {
      subledger = new Subledger();
      test.equal(subledger.url, 'https://api.subledger.com/v2');
      test.equal(subledger.oauth_consumer_key, null);
      test.equal(subledger.oauth_consumer_secret, null);
      test.done();
    }
  };

  exports['subledger.identity() without OAuth'] = {
    'Create Subledger identity' : function (test) {
      subledger.identity().create({'email': 'test@test.com', 'description': 'test', 'reference': 'http://www.test.com'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_identity !== undefined, '"active_identity" property exist');
        test.ok(d.active_identity.id !== undefined, '"active_identity.id" property exist');
        test.deepEqual(d.active_identity.description, 'test', '"active_identity.description" property equal "test"');
        test.ok(d.active_key !== undefined, '"active_key" property exist');
        test.ok(d.active_key.id !== undefined, '"active_key.id" property exist');
        identity = d;
        test.done();
      });
    }
  };

  exports['subledger.setCredentials()'] = {
    'Set Subledger consumer identity' : function (test) {
      subledger.setCredentials(identity.active_key.id, identity.active_key.secret);
      test.equal(subledger.oauth_consumer_key, identity.active_key.id);
      test.equal(subledger.oauth_consumer_secret, identity.active_key.secret);
      test.done();
    }
  };

  exports['subledger.identity() with OAuth'] = {
    'Get Subledger identity' : function (test) {
      subledger.identity(identity.active_identity.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_identity !== undefined, '"active_identity" property exist');
        test.ok(d.active_identity.id !== undefined, '"active_identity.id" property exist');
        test.deepEqual(d.active_identity.description, 'test', '"active_identity.description" property equal "test"');
        test.done();
      });
    },
    'Update Subledger identity' : function (test) {
      var update = {
        "email": identity.active_identity.email,
        "description": "test2",
        "reference": identity.active_identity.reference,
        "version": identity.active_identity.version + 1
      };

      subledger.identity(identity.active_identity.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_identity !== undefined, '"active_identity" property exist');
        test.ok(d.active_identity.id !== undefined, '"active_identity.id" property exist');
        test.deepEqual(d.active_identity.description, 'test2', '"active_identity.description" property equal "test2"');
        test.done();
      });
    }
  };

  exports['subledger.identity().key()'] = {
    'Create Subledger identity key' : function (test) {
      subledger.identity(identity.active_identity.id).key().create({'identity_id': identity.active_identity.id}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_key !== undefined, '"active_key" property exist');
        test.ok(d.active_key.id !== undefined, '"active_key.id" property exist');
        identityKey = d;
        test.done();
      });
    },
    'Get Subledger identity key' : function (test) {
      subledger.identity(identity.active_identity.id).key(identityKey.active_key.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_key !== undefined, '"active_key" property exist');
        test.ok(d.active_key.id !== undefined, '"active_key.id" property exist');
        test.done();
      });
    },
    'Archive Subledger identity key' : function (test) {
      subledger.identity(identity.active_identity.id).key(identityKey.active_key.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_key !== undefined, '"archived_key" property exist');
        test.ok(d.archived_key.id !== undefined, '"archived_key.id" property exist');
        test.done();
      });
    },
    'Activate Subledger identity key' : function (test) {
      subledger.identity(identity.active_identity.id).key(identityKey.active_key.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_key !== undefined, '"active_key" property exist');
        test.ok(d.active_key.id !== undefined, '"active_key.id" property exist');
        test.done();
      });
    }
  };

  exports['subledger.org()'] = {
    'Create Subledger org' : function (test) {
      subledger.org().create({'description': 'test', 'reference': 'http://www.test.com'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_org !== undefined, '"active_org" property exist');
        test.ok(d.active_org.id !== undefined, '"active_org.id" property exist');
        test.deepEqual(d.active_org.description, 'test', '"active_org.description" property equal "test"');
        org = d;
        test.done();
      });
    },
    'Get Subledger org' : function (test) {
      subledger.org(org.active_org.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_org !== undefined, '"active_org" property exist');
        test.ok(d.active_org.id !== undefined, '"active_org.id" property exist');
        test.done();
      });
    },
    'Update Subledger org' : function (test) {
      var update = {
        'description': 'test2',
        'reference': org.active_org.reference,
        'version': org.active_org.version + 1
      };

      subledger.org(org.active_org.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_org !== undefined, '"active_org" property exist');
        test.ok(d.active_org.id !== undefined, '"active_org.id" property exist');
        test.deepEqual(d.active_org.description, 'test2', '"active_org.description" property equal "test2"');
        test.done();
      });
    },
    'Archive Subledger org' : function (test) {
      subledger.org(org.active_org.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_org !== undefined, '"archived_org" property exist');
        test.ok(d.archived_org.id !== undefined, '"archived_org.id" property exist');
        test.done();
      });
    },
    'Activate Subledger org' : function (test) {
      subledger.org(org.active_org.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_org !== undefined, '"active_org" property exist');
        test.ok(d.active_org.id !== undefined, '"active_org.id" property exist');
        test.done();
      });
    }
  };

  exports['subledger.org().book()'] = {
    'Get Subledger Books without parameter' : function (test) {
      subledger.org(org.active_org.id).book().get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_books !== undefined, '"active_books" property exist');
        test.deepEqual(_.isArray(d.active_books), true, '"active_books" property contain array');
        test.done();
      });
    },
    'Get Subledger Books with parameter' : function (test) {
      subledger.org(org.active_org.id).book().get({'state': 'archived'}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_books !== undefined, '"archived_books" property exist');
        test.deepEqual(_.isArray(d.archived_books), true, '"archived_books" property contain array');
        test.done();
      });
    },
    'Create Subledger Book' : function (test) {
      subledger.org(org.active_org.id).book().create({'description': 'foo', 'reference': 'http://www.bar.com'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_book !== undefined, '"active_book" property exist');
        test.ok(d.active_book.id !== undefined, '"active_book.id" property exist');
        test.deepEqual(d.active_book.description, 'foo', '"active_book.description" property equal "foo"');
        book = d;
        test.done();
      });
    },
    'Get Subledger Book' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_book !== undefined, '"active_book" property exist');
        test.deepEqual(d.active_book.id, book.active_book.id, '"active_books.id" property is the same');
        test.done();
      });
    },
    'Update Subledger Book' : function (test) {
      var update = {
        "description": 'baz',
        "reference": book.active_book.reference,
        "version": book.active_book.version + 1
      };

      subledger.org(org.active_org.id).book(book.active_book.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_book !== undefined, '"active_book" property exist');
        test.ok(d.active_book.id !== undefined, '"active_book.id" property exist');
        test.deepEqual(d.active_book.description, 'baz', '"active_book.description" property equal "baz"');
        book = d;
        test.done();
      });
    },
    'Archive Subledger Book' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_book !== undefined, '"archived_book" property exist');
        test.ok(d.archived_book.id !== undefined, '"archived_book.id" property exist');
        book = d;
        test.done();
      });
    },
    'Activate Subledger Book' : function (test) {
      subledger.org(org.active_org.id).book(book.archived_book.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_book !== undefined, '"active_book" property exist');
        test.ok(d.active_book.id !== undefined, '"active_book.id" property exist');
        book = d;
        test.done();
      });
    }
  };

  exports['subledger.org().book().account()'] = {
    'Get Subledger Book Accounts without parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account().get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_accounts !== undefined, '"active_accounts" property exist');
        test.deepEqual(_.isArray(d.active_accounts), true, '"active_accounts" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Accounts with parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account().get({'state': 'archived'}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_accounts !== undefined, '"archived_accounts" property exist');
        test.deepEqual(_.isArray(d.archived_accounts), true, '"archived_accounts" property contain array');
        test.done();
      });
    },
    'Create Subledger Book Account' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account().create({'description': 'foo', 'reference': 'http://www.bar.com', 'normal_balance': 'debit'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.ok(d.active_account.id !== undefined, '"active_account.id" property exist');
        test.deepEqual(d.active_account.description, 'foo', '"active_account.description" property equal "foo"');
        account = d;
        test.done();
      });
    },
    'Get Subledger Book Account' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account(account.active_account.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.deepEqual(d.active_account.id, account.active_account.id, '"active_account.id" property is the same');
        test.done();
      });
    },
    'Update Subledger Book Account' : function (test) {
      var update = {
        "description": "baz",
        "reference": account.active_account.reference,
        "normal_balance": account.active_account.normal_balance,
        "version": account.active_account.version + 1
      };

      subledger.org(org.active_org.id).book(book.active_book.id).account(account.active_account.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.ok(d.active_account.id !== undefined, '"active_account.id" property exist');
        test.deepEqual(d.active_account.description, 'baz', '"active_account.description" property equal "baz"');
        account = d;
        test.done();
      });
    },
    'Get Subledger Book Account Balance without parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account(account.active_account.id).balance(function (e, d) {
        test.ifError(e);
        test.ok(d.balance !== undefined, '"balance" property exist');
        test.ok(d.balance.debit_value !== undefined, '"balance.debit_value" property exist');
        test.done();
      });
    },
    'Get Subledger Book Account Balance with parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account(account.active_account.id).balance({'at': '2020-01-01T00:00:00.000Z'}, function (e, d) {
        test.ifError(e);
        test.ok(d.balance !== undefined, '"balance" property exist');
        test.ok(d.balance.debit_value !== undefined, '"balance.debit_value" property exist');
        test.done();
      });
    },
    'Archive Subledger Book Account' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account(account.active_account.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_account !== undefined, '"archived_account" property exist');
        test.ok(d.archived_account.id !== undefined, '"archived_account.id" property exist');
        account = d;
        test.done();
      });
    },
    'Activate Subledger Book Account' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account(account.archived_account.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.ok(d.active_account.id !== undefined, '"active_account.id" property exist');
        account = d;
        test.done();
      });
    }
  };

  exports['subledger.org().book().account().line()'] = {
    'Get Subledger Book Account Lines without parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account(account.active_account.id).line().get(function (e, d) {
        test.ifError(e);
        test.ok(d.posted_lines !== undefined, '"posted_lines" property exist');
        test.deepEqual(_.isArray(d.posted_lines), true, '"posted_lines" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Account Lines with parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account(account.active_account.id).line().get({'before': 20200101}, function (e, d) {
        test.ifError(e);
        test.ok(d.posted_lines !== undefined, '"posted_lines" property exist');
        test.deepEqual(_.isArray(d.posted_lines), true, '"posted_lines" property contain array');
        test.done();
      });
    }
  };

  exports['subledger.org().book().account().firstAndLastLine()'] = {
    'Get Subledger Book Account First and Last Lines' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).account(account.active_account.id).firstAndLastLine(function (e, d) {
        test.ifError(e);
        test.ok(d.posted_lines !== undefined, '"posted_lines" property exist');
        test.deepEqual(_.isArray(d.posted_lines), true, '"posted_lines" property contain array');
        test.done();
      });
    }
  };

  exports['subledger.org().book().journalEntry()'] = {
    'Get Subledger Book Journal Entries without parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry().get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entries !== undefined, '"active_journal_entries" property exist');
        test.deepEqual(_.isArray(d.active_journal_entries), true, '"active_journal_entries" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Journal Entries with parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry().get({'state': 'archived', 'before': new Date().toISOString()}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_journal_entries !== undefined, '"archived_journal_entries" property exist');
        test.deepEqual(_.isArray(d.archived_journal_entries), true, '"archived_journal_entries" property contain array');
        test.done();
      });
    },
    'Create Subledger Book Journal Entry' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry().create({"effective_at": new Date().toISOString(), "description": "foo", "reference": "http://www.bar.com"}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entry !== undefined, '"active_journal_entry" property exist');
        test.ok(d.active_journal_entry.id !== undefined, '"active_journal_entry.id" property exist');
        test.deepEqual(d.active_journal_entry.description, 'foo', '"active_account.description" property equal "foo"');
        journalEntry = d;
        test.done();
      });
    },
    'Create Subledger Book Journal Entry to be posted' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry().create({"effective_at": new Date().toISOString(), "description": "foo", "reference": "http://www.bar.com"}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entry !== undefined, '"active_journal_entry" property exist');
        test.ok(d.active_journal_entry.id !== undefined, '"active_journal_entry.id" property exist');
        test.deepEqual(d.active_journal_entry.description, 'foo', '"active_account.description" property equal "foo"');
        journalEntryToPost = d;
        test.done();
      });
    },
    'Create and Post Subledger Book Journal Entry' : function (test) {
      var data = {
        "effective_at": new Date().toISOString(),
        "description": "foo",
        "reference": "http://www.bar.com",
        "lines": [
          {
            "account": account.active_account.id,
            "description": "foo",
            "reference": "http://www.bar.com",
            "value": {
              "type": "zero",
              "amount": "0"
            },
            "order": "1"
          }
        ]
      };

      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry().createAndPost(data, function (e, d) {
        test.ifError(e);
        test.ok(d.posting_journal_entry !== undefined, '"posting_journal_entry" property exist');
        test.ok(d.posting_journal_entry.id !== undefined, '"posting_journal_entry.id" property exist');
        test.deepEqual(d.posting_journal_entry.description, 'foo', '"posting_journal_entry.description" property equal "foo"');
        test.done();
      });
    },
    'Get Subledger Book Journal Entry' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entry !== undefined, '"active_journal_entry" property exist');
        test.ok(d.active_journal_entry.id !== undefined, '"active_journal_entry.id" property exist');
        test.deepEqual(d.active_journal_entry.id, journalEntry.active_journal_entry.id, '"active_journal_entry.id" property is the same');
        test.done();
      });
    },
    'Update Subledger Book Journal Entry' : function (test) {
      var update = {
        "effective_at": journalEntry.active_journal_entry.effective_at,
        "description": "baz",
        "reference": journalEntry.active_journal_entry.reference,
        "version": journalEntry.active_journal_entry.version + 1
      };
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entry !== undefined, '"active_account" property exist');
        test.ok(d.active_journal_entry.id !== undefined, '"active_account.id" property exist');
        test.deepEqual(d.active_journal_entry.description, 'baz', '"active_account.description" property equal "baz"');
        journalEntry = d;
        test.done();
      });
    },
    'Get Subledger Book Journal Entry Balance' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).balance(function (e, d) {
        test.ifError(e);
        test.ok(d.balance !== undefined, '"balance" property exist');
        test.ok(d.balance.debit_value !== undefined, '"balance.debit_value" property exist');
        test.done();
      });
    },
    'Get Subledger Book Journal Entry Progress' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).progress(function (e, d) {
        test.ifError(e);
        test.ok(d.progress !== undefined, '"progress" property exist');
        test.ok(d.progress.percentage !== undefined, '"progress.percentage" property exist');
        test.done();
      });
    },
    'Archive Subledger Book Journal Entry' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_journal_entry !== undefined, '"archived_journal_entry" property exist');
        test.ok(d.archived_journal_entry.id !== undefined, '"archived_journal_entry.id" property exist');
        journalEntry = d;
        test.done();
      });
    },
    'Activate Subledger Book Journal Entry' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.archived_journal_entry.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entry !== undefined, '"active_journal_entry" property exist');
        test.ok(d.active_journal_entry.id !== undefined, '"active_journal_entry.id" property exist');
        journalEntry = d;
        test.done();
      });
    }
  };

  exports['subledger.org().book().journalEntry().line()'] = {
    'Get Subledger Book Journal Entry Lines without parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line().get({state: 'active'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_lines !== undefined, '"active_lines" property exist');
        test.deepEqual(_.isArray(d.active_lines), true, '"active_lines" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Journal Entry Lines with parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line().get({'state': 'archived'}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_lines !== undefined, '"archived_lines" property exist');
        test.deepEqual(_.isArray(d.archived_lines), true, '"archived_lines" property contain array');
        test.done();
      });
    },
    'Create Subledger Book Journal Entry Line' : function (test) {
      var data = {
        "account": account.active_account.id,
        "description": "foo",
        "reference": "http://www.bar.com",
        "value": {
          "type": "zero",
          "amount": "0"
        },
        "order": "1"
      };
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line().create(data, function (e, d) {
        test.ifError(e);
        test.ok(d.active_line !== undefined, '"active_line" property exist');
        test.ok(d.active_line.id !== undefined, '"active_line.id" property exist');
        test.deepEqual(d.active_line.description, 'foo', '"active_line.description" property equal "foo"');
        journalEntryLine = d;
        test.done();
      });
    },
    'Create Subledger Book Journal Entry Line in other journal entry' : function (test) {
      var data = {
        "account": account.active_account.id,
        "description": "foo",
        "reference": "http://www.bar.com",
        "value": {
          "type": "zero",
          "amount": "0"
        },
        "order": "1"
      };
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntryToPost.active_journal_entry.id).line().create(data, function (e, d) {
        test.ifError(e);
        test.ok(d.active_line !== undefined, '"active_line" property exist');
        test.ok(d.active_line.id !== undefined, '"active_line.id" property exist');
        test.deepEqual(d.active_line.description, 'foo', '"active_line.description" property equal "foo"');
        test.done();
      });
    },
    'Post Subledger Book Journal Entry' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntryToPost.active_journal_entry.id).post(function (e, d) {
        test.ifError(e);
        test.ok(d.posting_journal_entry !== undefined, '"posting_journal_entry" property exist');
        test.ok(d.posting_journal_entry.id !== undefined, '"posting_journal_entry.id" property exist');
        journalEntryToPost = d;
        test.done();
      });
    },
    'Get Subledger Book Journal Entry Line' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.active_line.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_line !== undefined, '"active_line" property exist');
        test.ok(d.active_line.id !== undefined, '"active_line.id" property exist');
        test.done();
      });
    },
    'Update Subledger Book Journal Entry Line' : function (test) {
      var data = {
        "account": journalEntryLine.active_line.account,
        "description": "baz",
        "reference": journalEntryLine.active_line.reference,
        "value": journalEntryLine.active_line.value,
        "order": journalEntryLine.active_line.order,
        "version": journalEntryLine.active_line.version + 1
      };

      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.active_line.id).update(data, function (e, d) {
        test.ifError(e);
        test.ok(d.active_line !== undefined, '"active_line" property exist');
        test.ok(d.active_line.id !== undefined, '"active_line.id" property exist');
        test.deepEqual(d.active_line.description, 'baz', '"active_line.description" property equal "baz"');
        journalEntryLine = d;
        test.done();
      });
    },
    'Archive Subledger Book Journal Entry Line' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.active_line.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_line !== undefined, '"archived_line" property exist');
        test.ok(d.archived_line.id !== undefined, '"archived_line.id" property exist');
        journalEntryLine = d;
        test.done();
      });
    },
    'Activate Subledger Book Journal Entry Line' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.archived_line.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_line !== undefined, '"active_line" property exist');
        test.ok(d.active_line.id !== undefined, '"active_line.id" property exist');
        journalEntryLine = d;
        test.done();
      });
    }
  };

  exports['subledger.org().book().category()'] = {
    'Get Subledger Book Categories without parameter': function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).category().get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_categories !== undefined, '"active_categories" property exist');
        test.deepEqual(_.isArray(d.active_categories), true, '"active_accounts" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Categories with parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).category().get({'state': 'archived'}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_categories !== undefined, '"archived_categories" property exist');
        test.deepEqual(_.isArray(d.archived_categories), true, '"archived_categories" property contain array');
        test.done();
      });
    },
    'Create Subledger Book Category' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).category().create({'description': 'foo', 'reference': 'http://www.bar.com', 'normal_balance': 'debit'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.ok(d.active_category.id !== undefined, '"active_categoryt.id" property exist');
        test.deepEqual(d.active_category.description, 'foo', '"active_category.description" property equal "foo"');
        category = d;
        test.done();
      });
    },
    'Get Subledger Book Category' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).category(category.active_category.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.deepEqual(d.active_category.id, category.active_category.id, '"active_category.id" property is the same');
        test.done();
      });
    },
    'Update Subledger Book Category' : function (test) {
      var update = {
        "description": "baz",
        "reference": category.active_category.reference,
        "normal_balance": category.active_category.normal_balance,
        "version": category.active_category.version + 1
      };

      subledger.org(org.active_org.id).book(book.active_book.id).category(category.active_category.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.ok(d.active_category.id !== undefined, '"active_category.id" property exist');
        test.deepEqual(d.active_category.description, 'baz', '"active_category.description" property equal "baz"');
        category = d;
        test.done();
      });
    },
    'Attach Subledger Book Category to Account' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).category(category.active_category.id).attach({account: account.active_account.id}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.deepEqual(d.active_account.id, account.active_account.id, '"active_account.id" property is the same');
        test.done();
      });
    },
    'Detach Subledger Book Category from Account' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).category(category.active_category.id).detach({account: account.active_account.id}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.deepEqual(d.active_account.id, account.active_account.id, '"active_account.id" property is the same');
        test.done();
      });
    },
    'Archive Subledger Book Category' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).category(category.active_category.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_category !== undefined, '"archived_category" property exist');
        test.ok(d.archived_category.id !== undefined, '"archived_category.id" property exist');
        category = d;
        test.done();
      });
    },
    'Activate Subledger Book Category' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).category(category.archived_category.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.ok(d.active_category.id !== undefined, '"active_category.id" property exist');
        category = d;
        test.done();
      });
    }
  };

  exports['subledger.org().book().report()'] = {
    'Get Subledger Book Reports without parameter': function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).report().get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_reports !== undefined, '"active_reports" property exist');
        test.deepEqual(_.isArray(d.active_reports), true, '"active_reports" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Reports with parameter' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).report().get({'state': 'archived'}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_reports !== undefined, '"archived_reports" property exist');
        test.deepEqual(_.isArray(d.archived_reports), true, '"archived_reports" property contain array');
        test.done();
      });
    },
    'Create Subledger Book Report' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).report().create({'description': 'foo', 'reference': 'http://www.bar.com'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_report !== undefined, '"active_report" property exist');
        test.ok(d.active_report.id !== undefined, '"active_report.id" property exist');
        test.deepEqual(d.active_report.description, 'foo', '"active_report.description" property equal "foo"');
        report = d;
        test.done();
      });
    },
    'Get Subledger Book Report' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).report(report.active_report.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_report !== undefined, '"active_report" property exist');
        test.deepEqual(d.active_report.id, report.active_report.id, '"active_report.id" property is the same');
        test.done();
      });
    },
    'Update Subledger Book Report' : function (test) {
      var update = {
        "description": "baz",
        "reference": report.active_report.reference,
        "version": report.active_report.version + 1
      };

      subledger.org(org.active_org.id).book(book.active_book.id).report(report.active_report.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_report !== undefined, '"active_report" property exist');
        test.ok(d.active_report.id !== undefined, '"active_report.id" property exist');
        test.deepEqual(d.active_report.description, 'baz', '"active_report.description" property equal "baz"');
        report = d;
        test.done();
      });
    },
    'Attach Subledger Book Report to Category' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).report(report.active_report.id).attach({category: category.active_category.id}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.deepEqual(d.active_category.id, category.active_category.id, '"active_category.id" property is the same');
        test.done();
      });
    },
    'Detach Subledger Book Report from Category' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).report(report.active_report.id).detach({category: category.active_category.id}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.deepEqual(d.active_category.id, category.active_category.id, '"active_category.id" property is the same');
        test.done();
      });
    },
    'Archive Subledger Book Report' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).report(report.active_report.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_report !== undefined, '"archived_report" property exist');
        test.ok(d.archived_report.id !== undefined, '"archived_report.id" property exist');
        report = d;
        test.done();
      });
    },
    'Activate Subledger Book Report' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).report(report.archived_report.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_report !== undefined, '"active_report" property exist');
        test.ok(d.active_report.id !== undefined, '"active_report.id" property exist');
        report = d;
        test.done();
      });
    },
    'Render Subledger Book Report' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).report(report.active_report.id).render(function (e, d) {
        test.ifError(e);
        test.ok(d.building_report_rendering !== undefined || d.completed_report_rendering !== undefined, '"building_report_rendering or completed_report_rendering" property exist');

        if (d.building_report_rendering !== undefined) {
          test.ok(d.building_report_rendering.id !== undefined, '"building_report_rendering.id" property exist');
          report_rendering = d.building_report_rendering;
        }

        if (d.completed_report_rendering !== undefined) {
          test.ok(d.completed_report_rendering.id !== undefined, '"completed_report_rendering.id" property exist');
          report_rendering = d.completed_report_rendering;
        }

        test.done();
      });
    }
  };

  exports['subledger.org().book().report_rendering()'] = {
    'Render Subledger Book Report' : function (test) {
      subledger.org(org.active_org.id).book(book.active_book.id).report_rendering(report_rendering.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.building_report_rendering !== undefined || d.completed_report_rendering !== undefined, '"building_report_rendering or completed_report_rendering" property exist');

        if (d.building_report_rendering !== undefined) {
          test.ok(d.building_report_rendering.id !== undefined, '"building_report_rendering.id" property exist');
          report_rendering = d.building_report_rendering;
        }

        if (d.completed_report_rendering !== undefined) {
          test.ok(d.completed_report_rendering.id !== undefined, '"completed_report_rendering.id" property exist');
          report_rendering = d.completed_report_rendering;
        }

        test.done();
      });
    }
  };

}());
/*jslint nomen: true*/
/*global exports, Subledger, _*/
(function () {

  // using strict mode
  'use strict';

  var subledger, identity, identityKey, organization, book, account, category, journalEntry, journalEntryToPost, journalEntryLine, report, report_rendering;

  exports['v1_0_var subledger = new Subledger()'] = {
    'Create Subledger connection' : function (test) {
      subledger = new Subledger();
      test.equal(subledger.url, 'https://api.subledger.com/v2');
      test.equal(subledger.oauth_consumer_key, null);
      test.equal(subledger.oauth_consumer_secret, null);
      test.done();
    }
  };

  exports['v1_0_subledger.identity() without OAuth'] = {
    'Create Subledger identity' : function (test) {
      subledger.identity().create({'email': 'test@test.com', 'description': 'test', 'reference': 'http://www.test.com'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_identity !== undefined, '"active_identity" property exist');
        test.ok(d.active_identity.id !== undefined, '"active_identity.id" property exist');
        test.deepEqual(d.active_identity.description, 'test', '"active_identity.description" property equal "test"');
        test.ok(d.active_key !== undefined, '"active_key" property exist');
        test.ok(d.active_key.id !== undefined, '"active_key.id" property exist');
        identity = d;
        test.done();
      });
    }
  };

  exports['v1_0_subledger.setCredentials()'] = {
    'Set Subledger consumer identity' : function (test) {
      subledger.setCredentials(identity.active_key.id, identity.active_key.secret);
      test.equal(subledger.oauth_consumer_key, identity.active_key.id);
      test.equal(subledger.oauth_consumer_secret, identity.active_key.secret);
      test.done();
    }
  };

  exports['v1_0_subledger.identity() with OAuth'] = {
    'Get Subledger identity' : function (test) {
      subledger.identity(identity.active_identity.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_identity !== undefined, '"active_identity" property exist');
        test.ok(d.active_identity.id !== undefined, '"active_identity.id" property exist');
        test.deepEqual(d.active_identity.description, 'test', '"active_identity.description" property equal "test"');
        test.done();
      });
    },
    'Update Subledger identity' : function (test) {
      var update = {
        "email": identity.active_identity.email,
        "description": "test2",
        "reference": identity.active_identity.reference,
        "version": identity.active_identity.version + 1
      };

      subledger.identity(identity.active_identity.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_identity !== undefined, '"active_identity" property exist');
        test.ok(d.active_identity.id !== undefined, '"active_identity.id" property exist');
        test.deepEqual(d.active_identity.description, 'test2', '"active_identity.description" property equal "test2"');
        test.done();
      });
    }
  };

  exports['v1_0_subledger.identity().key()'] = {
    'Create Subledger identity key' : function (test) {
      subledger.identity(identity.active_identity.id).key().create({'identity_id': identity.active_identity.id}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_key !== undefined, '"active_key" property exist');
        test.ok(d.active_key.id !== undefined, '"active_key.id" property exist');
        identityKey = d;
        test.done();
      });
    },
    'Get Subledger identity key' : function (test) {
      subledger.identity(identity.active_identity.id).key(identityKey.active_key.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_key !== undefined, '"active_key" property exist');
        test.ok(d.active_key.id !== undefined, '"active_key.id" property exist');
        test.done();
      });
    },
    'Archive Subledger identity key' : function (test) {
      subledger.identity(identity.active_identity.id).key(identityKey.active_key.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_key !== undefined, '"archived_key" property exist');
        test.ok(d.archived_key.id !== undefined, '"archived_key.id" property exist');
        test.done();
      });
    },
    'Activate Subledger identity key' : function (test) {
      subledger.identity(identity.active_identity.id).key(identityKey.active_key.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_key !== undefined, '"active_key" property exist');
        test.ok(d.active_key.id !== undefined, '"active_key.id" property exist');
        test.done();
      });
    }
  };

  exports['v1_0_subledger.organization()'] = {
    'Create Subledger organization' : function (test) {
      subledger.organization().create({'description': 'test', 'reference': 'http://www.test.com'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_org !== undefined, '"active_org" property exist');
        test.ok(d.active_org.id !== undefined, '"active_org.id" property exist');
        test.deepEqual(d.active_org.description, 'test', '"active_org.description" property equal "test"');
        organization = d;
        test.done();
      });
    },
    'Get Subledger organization' : function (test) {
      subledger.organization(organization.active_org.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_org !== undefined, '"active_org" property exist');
        test.ok(d.active_org.id !== undefined, '"active_org.id" property exist');
        test.done();
      });
    },
    'Update Subledger organization' : function (test) {
      var update = {
        'description': 'test2',
        'reference': organization.active_org.reference,
        'version': organization.active_org.version + 1
      };

      subledger.organization(organization.active_org.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_org !== undefined, '"active_org" property exist');
        test.ok(d.active_org.id !== undefined, '"active_org.id" property exist');
        test.deepEqual(d.active_org.description, 'test2', '"active_org.description" property equal "test2"');
        test.done();
      });
    },
    'Archive Subledger organization' : function (test) {
      subledger.organization(organization.active_org.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_org !== undefined, '"archived_org" property exist');
        test.ok(d.archived_org.id !== undefined, '"archived_org.id" property exist');
        test.done();
      });
    },
    'Activate Subledger organization' : function (test) {
      subledger.organization(organization.active_org.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_org !== undefined, '"active_org" property exist');
        test.ok(d.active_org.id !== undefined, '"active_org.id" property exist');
        test.done();
      });
    }
  };

  exports['v1_0_subledger.organization().book()'] = {
    'Get Subledger Books without parameter' : function (test) {
      subledger.organization(organization.active_org.id).book().get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_books !== undefined, '"active_books" property exist');
        test.deepEqual(_.isArray(d.active_books), true, '"active_books" property contain array');
        test.done();
      });
    },
    'Get Subledger Books with parameter' : function (test) {
      subledger.organization(organization.active_org.id).book().get({'state': 'archived'}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_books !== undefined, '"archived_books" property exist');
        test.deepEqual(_.isArray(d.archived_books), true, '"archived_books" property contain array');
        test.done();
      });
    },
    'Create Subledger Book' : function (test) {
      subledger.organization(organization.active_org.id).book().create({'description': 'foo', 'reference': 'http://www.bar.com'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_book !== undefined, '"active_book" property exist');
        test.ok(d.active_book.id !== undefined, '"active_book.id" property exist');
        test.deepEqual(d.active_book.description, 'foo', '"active_book.description" property equal "foo"');
        book = d;
        test.done();
      });
    },
    'Get Subledger Book' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_book !== undefined, '"active_book" property exist');
        test.deepEqual(d.active_book.id, book.active_book.id, '"active_books.id" property is the same');
        test.done();
      });
    },
    'Update Subledger Book' : function (test) {
      var update = {
        "description": 'baz',
        "reference": book.active_book.reference,
        "version": book.active_book.version + 1
      };

      subledger.organization(organization.active_org.id).book(book.active_book.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_book !== undefined, '"active_book" property exist');
        test.ok(d.active_book.id !== undefined, '"active_book.id" property exist');
        test.deepEqual(d.active_book.description, 'baz', '"active_book.description" property equal "baz"');
        book = d;
        test.done();
      });
    },
    'Archive Subledger Book' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_book !== undefined, '"archived_book" property exist');
        test.ok(d.archived_book.id !== undefined, '"archived_book.id" property exist');
        book = d;
        test.done();
      });
    },
    'Activate Subledger Book' : function (test) {
      subledger.organization(organization.active_org.id).book(book.archived_book.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_book !== undefined, '"active_book" property exist');
        test.ok(d.active_book.id !== undefined, '"active_book.id" property exist');
        book = d;
        test.done();
      });
    }
  };

  exports['v1_0_subledger.organization().book().account()'] = {
    'Get Subledger Book Accounts without parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account().get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_accounts !== undefined, '"active_accounts" property exist');
        test.deepEqual(_.isArray(d.active_accounts), true, '"active_accounts" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Accounts with parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account().get({'state': 'archived'}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_accounts !== undefined, '"archived_accounts" property exist');
        test.deepEqual(_.isArray(d.archived_accounts), true, '"archived_accounts" property contain array');
        test.done();
      });
    },
    'Create Subledger Book Account' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account().create({'description': 'foo', 'reference': 'http://www.bar.com', 'normal_balance': 'debit'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.ok(d.active_account.id !== undefined, '"active_account.id" property exist');
        test.deepEqual(d.active_account.description, 'foo', '"active_account.description" property equal "foo"');
        account = d;
        test.done();
      });
    },
    'Get Subledger Book Account' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.deepEqual(d.active_account.id, account.active_account.id, '"active_account.id" property is the same');
        test.done();
      });
    },
    'Update Subledger Book Account' : function (test) {
      var update = {
        "description": "baz",
        "reference": account.active_account.reference,
        "normal_balance": account.active_account.normal_balance,
        "version": account.active_account.version + 1
      };

      subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.ok(d.active_account.id !== undefined, '"active_account.id" property exist');
        test.deepEqual(d.active_account.description, 'baz', '"active_account.description" property equal "baz"');
        account = d;
        test.done();
      });
    },
    'Get Subledger Book Account Balance without parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).balance(function (e, d) {
        test.ifError(e);
        test.ok(d.balance !== undefined, '"balance" property exist');
        test.ok(d.balance.debit_value !== undefined, '"balance.debit_value" property exist');
        test.done();
      });
    },
    'Get Subledger Book Account Balance with parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).balance({'at': '2020-01-01T00:00:00.000Z'}, function (e, d) {
        test.ifError(e);
        test.ok(d.balance !== undefined, '"balance" property exist');
        test.ok(d.balance.debit_value !== undefined, '"balance.debit_value" property exist');
        test.done();
      });
    },
    'Archive Subledger Book Account' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_account !== undefined, '"archived_account" property exist');
        test.ok(d.archived_account.id !== undefined, '"archived_account.id" property exist');
        account = d;
        test.done();
      });
    },
    'Activate Subledger Book Account' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.archived_account.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.ok(d.active_account.id !== undefined, '"active_account.id" property exist');
        account = d;
        test.done();
      });
    }
  };

  exports['v1_0_subledger.organization().book().account().line()'] = {
    'Get Subledger Book Account Lines without parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).line().get(function (e, d) {
        test.ifError(e);
        test.ok(d.posted_lines !== undefined, '"posted_lines" property exist');
        test.deepEqual(_.isArray(d.posted_lines), true, '"posted_lines" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Account Lines with parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).line().get({'before': 20200101}, function (e, d) {
        test.ifError(e);
        test.ok(d.posted_lines !== undefined, '"posted_lines" property exist');
        test.deepEqual(_.isArray(d.posted_lines), true, '"posted_lines" property contain array');
        test.done();
      });
    }
  };

  exports['v1_0_subledger.organization().book().account().firstAndLastLine()'] = {
    'Get Subledger Book Account First and Last Lines' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).account(account.active_account.id).firstAndLastLine(function (e, d) {
        test.ifError(e);
        test.ok(d.posted_lines !== undefined, '"posted_lines" property exist');
        test.deepEqual(_.isArray(d.posted_lines), true, '"posted_lines" property contain array');
        test.done();
      });
    }
  };

  exports['v1_0_subledger.organization().book().journalEntry()'] = {
    'Get Subledger Book Journal Entries without parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry().get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entries !== undefined, '"active_journal_entries" property exist');
        test.deepEqual(_.isArray(d.active_journal_entries), true, '"active_journal_entries" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Journal Entries with parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry().get({'state': 'archived', 'before': new Date().toISOString()}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_journal_entries !== undefined, '"archived_journal_entries" property exist');
        test.deepEqual(_.isArray(d.archived_journal_entries), true, '"archived_journal_entries" property contain array');
        test.done();
      });
    },
    'Create Subledger Book Journal Entry' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry().create({"effective_at": new Date().toISOString(), "description": "foo", "reference": "http://www.bar.com"}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entry !== undefined, '"active_journal_entry" property exist');
        test.ok(d.active_journal_entry.id !== undefined, '"active_journal_entry.id" property exist');
        test.deepEqual(d.active_journal_entry.description, 'foo', '"active_account.description" property equal "foo"');
        journalEntry = d;
        test.done();
      });
    },
    'Create Subledger Book Journal Entry to be posted' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry().create({"effective_at": new Date().toISOString(), "description": "foo", "reference": "http://www.bar.com"}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entry !== undefined, '"active_journal_entry" property exist');
        test.ok(d.active_journal_entry.id !== undefined, '"active_journal_entry.id" property exist');
        test.deepEqual(d.active_journal_entry.description, 'foo', '"active_account.description" property equal "foo"');
        journalEntryToPost = d;
        test.done();
      });
    },
    'Create and Post Subledger Book Journal Entry' : function (test) {
      var data = {
        "effective_at": new Date().toISOString(),
        "description": "foo",
        "reference": "http://www.bar.com",
        "lines": [
          {
            "account": account.active_account.id,
            "description": "foo",
            "reference": "http://www.bar.com",
            "value": {
              "type": "zero",
              "amount": "0"
            },
            "order": "1"
          }
        ]
      };

      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry().createAndPost(data, function (e, d) {
        test.ifError(e);
        test.ok(d.posting_journal_entry !== undefined, '"posting_journal_entry" property exist');
        test.ok(d.posting_journal_entry.id !== undefined, '"posting_journal_entry.id" property exist');
        test.deepEqual(d.posting_journal_entry.description, 'foo', '"posting_journal_entry.description" property equal "foo"');
        test.done();
      });
    },
    'Get Subledger Book Journal Entry' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entry !== undefined, '"active_journal_entry" property exist');
        test.ok(d.active_journal_entry.id !== undefined, '"active_journal_entry.id" property exist');
        test.deepEqual(d.active_journal_entry.id, journalEntry.active_journal_entry.id, '"active_journal_entry.id" property is the same');
        test.done();
      });
    },
    'Update Subledger Book Journal Entry' : function (test) {
      var update = {
        "effective_at": journalEntry.active_journal_entry.effective_at,
        "description": "baz",
        "reference": journalEntry.active_journal_entry.reference,
        "version": journalEntry.active_journal_entry.version + 1
      };
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entry !== undefined, '"active_account" property exist');
        test.ok(d.active_journal_entry.id !== undefined, '"active_account.id" property exist');
        test.deepEqual(d.active_journal_entry.description, 'baz', '"active_account.description" property equal "baz"');
        journalEntry = d;
        test.done();
      });
    },
    'Get Subledger Book Journal Entry Balance' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).balance(function (e, d) {
        test.ifError(e);
        test.ok(d.balance !== undefined, '"balance" property exist');
        test.ok(d.balance.debit_value !== undefined, '"balance.debit_value" property exist');
        test.done();
      });
    },
    'Get Subledger Book Journal Entry Progress' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).progress(function (e, d) {
        test.ifError(e);
        test.ok(d.progress !== undefined, '"progress" property exist');
        test.ok(d.progress.percentage !== undefined, '"progress.percentage" property exist');
        test.done();
      });
    },
    'Archive Subledger Book Journal Entry' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_journal_entry !== undefined, '"archived_journal_entry" property exist');
        test.ok(d.archived_journal_entry.id !== undefined, '"archived_journal_entry.id" property exist');
        journalEntry = d;
        test.done();
      });
    },
    'Activate Subledger Book Journal Entry' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.archived_journal_entry.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_journal_entry !== undefined, '"active_journal_entry" property exist');
        test.ok(d.active_journal_entry.id !== undefined, '"active_journal_entry.id" property exist');
        journalEntry = d;
        test.done();
      });
    }
  };

  exports['v1_0_subledger.organization().book().journalEntry().line()'] = {
    'Get Subledger Book Journal Entry Lines without parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line().get({state: 'active'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_lines !== undefined, '"active_lines" property exist');
        test.deepEqual(_.isArray(d.active_lines), true, '"active_lines" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Journal Entry Lines with parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line().get({'state': 'archived'}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_lines !== undefined, '"archived_lines" property exist');
        test.deepEqual(_.isArray(d.archived_lines), true, '"archived_lines" property contain array');
        test.done();
      });
    },
    'Create Subledger Book Journal Entry Line' : function (test) {
      var data = {
        "account": account.active_account.id,
        "description": "foo",
        "reference": "http://www.bar.com",
        "value": {
          "type": "zero",
          "amount": "0"
        },
        "order": "1"
      };
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line().create(data, function (e, d) {
        test.ifError(e);
        test.ok(d.active_line !== undefined, '"active_line" property exist');
        test.ok(d.active_line.id !== undefined, '"active_line.id" property exist');
        test.deepEqual(d.active_line.description, 'foo', '"active_line.description" property equal "foo"');
        journalEntryLine = d;
        test.done();
      });
    },
    'Create Subledger Book Journal Entry Line in other journal entry' : function (test) {
      var data = {
        "account": account.active_account.id,
        "description": "foo",
        "reference": "http://www.bar.com",
        "value": {
          "type": "zero",
          "amount": "0"
        },
        "order": "1"
      };
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntryToPost.active_journal_entry.id).line().create(data, function (e, d) {
        test.ifError(e);
        test.ok(d.active_line !== undefined, '"active_line" property exist');
        test.ok(d.active_line.id !== undefined, '"active_line.id" property exist');
        test.deepEqual(d.active_line.description, 'foo', '"active_line.description" property equal "foo"');
        test.done();
      });
    },
    'Post Subledger Book Journal Entry' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntryToPost.active_journal_entry.id).post(function (e, d) {
        test.ifError(e);
        test.ok(d.posting_journal_entry !== undefined, '"posting_journal_entry" property exist');
        test.ok(d.posting_journal_entry.id !== undefined, '"posting_journal_entry.id" property exist');
        journalEntryToPost = d;
        test.done();
      });
    },
    'Get Subledger Book Journal Entry Line' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.active_line.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_line !== undefined, '"active_line" property exist');
        test.ok(d.active_line.id !== undefined, '"active_line.id" property exist');
        test.done();
      });
    },
    'Update Subledger Book Journal Entry Line' : function (test) {
      var data = {
        "account": journalEntryLine.active_line.account,
        "description": "baz",
        "reference": journalEntryLine.active_line.reference,
        "value": journalEntryLine.active_line.value,
        "order": journalEntryLine.active_line.order,
        "version": journalEntryLine.active_line.version + 1
      };

      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.active_line.id).update(data, function (e, d) {
        test.ifError(e);
        test.ok(d.active_line !== undefined, '"active_line" property exist');
        test.ok(d.active_line.id !== undefined, '"active_line.id" property exist');
        test.deepEqual(d.active_line.description, 'baz', '"active_line.description" property equal "baz"');
        journalEntryLine = d;
        test.done();
      });
    },
    'Archive Subledger Book Journal Entry Line' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.active_line.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_line !== undefined, '"archived_line" property exist');
        test.ok(d.archived_line.id !== undefined, '"archived_line.id" property exist');
        journalEntryLine = d;
        test.done();
      });
    },
    'Activate Subledger Book Journal Entry Line' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).journalEntry(journalEntry.active_journal_entry.id).line(journalEntryLine.archived_line.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_line !== undefined, '"active_line" property exist');
        test.ok(d.active_line.id !== undefined, '"active_line.id" property exist');
        journalEntryLine = d;
        test.done();
      });
    }
  };

  exports['v1_0_subledger.organization().book().category()'] = {
    'Get Subledger Book Categories without parameter': function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).category().get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_categories !== undefined, '"active_categories" property exist');
        test.deepEqual(_.isArray(d.active_categories), true, '"active_accounts" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Categories with parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).category().get({'state': 'archived'}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_categories !== undefined, '"archived_categories" property exist');
        test.deepEqual(_.isArray(d.archived_categories), true, '"archived_categories" property contain array');
        test.done();
      });
    },
    'Create Subledger Book Category' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).category().create({'description': 'foo', 'reference': 'http://www.bar.com', 'normal_balance': 'debit'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.ok(d.active_category.id !== undefined, '"active_categoryt.id" property exist');
        test.deepEqual(d.active_category.description, 'foo', '"active_category.description" property equal "foo"');
        category = d;
        test.done();
      });
    },
    'Get Subledger Book Category' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).category(category.active_category.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.deepEqual(d.active_category.id, category.active_category.id, '"active_category.id" property is the same');
        test.done();
      });
    },
    'Update Subledger Book Category' : function (test) {
      var update = {
        "description": "baz",
        "reference": category.active_category.reference,
        "normal_balance": category.active_category.normal_balance,
        "version": category.active_category.version + 1
      };

      subledger.organization(organization.active_org.id).book(book.active_book.id).category(category.active_category.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.ok(d.active_category.id !== undefined, '"active_category.id" property exist');
        test.deepEqual(d.active_category.description, 'baz', '"active_category.description" property equal "baz"');
        category = d;
        test.done();
      });
    },
    'Attach Subledger Book Category to Account' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).category(category.active_category.id).attach({account: account.active_account.id}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.deepEqual(d.active_account.id, account.active_account.id, '"active_account.id" property is the same');
        test.done();
      });
    },
    'Detach Subledger Book Category from Account' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).category(category.active_category.id).detach({account: account.active_account.id}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_account !== undefined, '"active_account" property exist');
        test.deepEqual(d.active_account.id, account.active_account.id, '"active_account.id" property is the same');
        test.done();
      });
    },
    'Archive Subledger Book Category' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).category(category.active_category.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_category !== undefined, '"archived_category" property exist');
        test.ok(d.archived_category.id !== undefined, '"archived_category.id" property exist');
        category = d;
        test.done();
      });
    },
    'Activate Subledger Book Category' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).category(category.archived_category.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.ok(d.active_category.id !== undefined, '"active_category.id" property exist');
        category = d;
        test.done();
      });
    }
  };

  exports['v1_0_subledger.organization().book().report()'] = {
    'Get Subledger Book Reports without parameter': function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).report().get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_reports !== undefined, '"active_reports" property exist');
        test.deepEqual(_.isArray(d.active_reports), true, '"active_reports" property contain array');
        test.done();
      });
    },
    'Get Subledger Book Reports with parameter' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).report().get({'state': 'archived'}, function (e, d) {
        test.ifError(e);
        test.ok(d.archived_reports !== undefined, '"archived_reports" property exist');
        test.deepEqual(_.isArray(d.archived_reports), true, '"archived_reports" property contain array');
        test.done();
      });
    },
    'Create Subledger Book Report' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).report().create({'description': 'foo', 'reference': 'http://www.bar.com'}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_report !== undefined, '"active_report" property exist');
        test.ok(d.active_report.id !== undefined, '"active_report.id" property exist');
        test.deepEqual(d.active_report.description, 'foo', '"active_report.description" property equal "foo"');
        report = d;
        test.done();
      });
    },
    'Get Subledger Book Report' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).report(report.active_report.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.active_report !== undefined, '"active_report" property exist');
        test.deepEqual(d.active_report.id, report.active_report.id, '"active_report.id" property is the same');
        test.done();
      });
    },
    'Update Subledger Book Report' : function (test) {
      var update = {
        "description": "baz",
        "reference": report.active_report.reference,
        "version": report.active_report.version + 1
      };

      subledger.organization(organization.active_org.id).book(book.active_book.id).report(report.active_report.id).update(update, function (e, d) {
        test.ifError(e);
        test.ok(d.active_report !== undefined, '"active_report" property exist');
        test.ok(d.active_report.id !== undefined, '"active_report.id" property exist');
        test.deepEqual(d.active_report.description, 'baz', '"active_report.description" property equal "baz"');
        report = d;
        test.done();
      });
    },
    'Attach Subledger Book Report to Category' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).report(report.active_report.id).attach({category: category.active_category.id}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.deepEqual(d.active_category.id, category.active_category.id, '"active_category.id" property is the same');
        test.done();
      });
    },
    'Detach Subledger Book Report from Category' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).report(report.active_report.id).detach({category: category.active_category.id}, function (e, d) {
        test.ifError(e);
        test.ok(d.active_category !== undefined, '"active_category" property exist');
        test.deepEqual(d.active_category.id, category.active_category.id, '"active_category.id" property is the same');
        test.done();
      });
    },
    'Archive Subledger Book Report' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).report(report.active_report.id).archive(function (e, d) {
        test.ifError(e);
        test.ok(d.archived_report !== undefined, '"archived_report" property exist');
        test.ok(d.archived_report.id !== undefined, '"archived_report.id" property exist');
        report = d;
        test.done();
      });
    },
    'Activate Subledger Book Report' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).report(report.archived_report.id).activate(function (e, d) {
        test.ifError(e);
        test.ok(d.active_report !== undefined, '"active_report" property exist');
        test.ok(d.active_report.id !== undefined, '"active_report.id" property exist');
        report = d;
        test.done();
      });
    },
    'Render Subledger Book Report' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).report(report.active_report.id).render(function (e, d) {
        test.ifError(e);
        test.ok(d.building_report_rendering !== undefined || d.completed_report_rendering !== undefined, '"building_report_rendering or completed_report_rendering" property exist');

        if (d.building_report_rendering !== undefined) {
          test.ok(d.building_report_rendering.id !== undefined, '"building_report_rendering.id" property exist');
          report_rendering = d.building_report_rendering;
        }

        if (d.completed_report_rendering !== undefined) {
          test.ok(d.completed_report_rendering.id !== undefined, '"completed_report_rendering.id" property exist');
          report_rendering = d.completed_report_rendering;
        }

        test.done();
      });
    }
  };

  exports['v1_0_subledger.organization().book().report_rendering()'] = {
    'Render Subledger Book Report' : function (test) {
      subledger.organization(organization.active_org.id).book(book.active_book.id).report_rendering(report_rendering.id).get(function (e, d) {
        test.ifError(e);
        test.ok(d.building_report_rendering !== undefined || d.completed_report_rendering !== undefined, '"building_report_rendering or completed_report_rendering" property exist');

        if (d.building_report_rendering !== undefined) {
          test.ok(d.building_report_rendering.id !== undefined, '"building_report_rendering.id" property exist');
          report_rendering = d.building_report_rendering;
        }

        if (d.completed_report_rendering !== undefined) {
          test.ok(d.completed_report_rendering.id !== undefined, '"completed_report_rendering.id" property exist');
          report_rendering = d.completed_report_rendering;
        }

        test.done();
      });
    }
  };

}());
(function(){
	var banner = $('#nodeunit-banner'),
      tests = $('#nodeunit-tests'),
      passed = 0,
      failed = 0,
      total = 0;

	function updateTest(_passed, _failed) {
		passed += _passed;
		failed += _failed;
		updateTotals(passed, failed);
	}

  function updateTotals(_passed, _failed) {
    if (_failed) {
      banner.removeClass('pass');
      banner.addClass('fail');
    }
    banner.html('<h3>' + _passed + ' tests passed. ' + _failed + ' failed.</h3>');
  }

	nodeunit.runModules(exports, {
		moduleStart : function (name) {
			tests.append('<h3>' + name + '</h3>');
		},
		testDone : function (name, assertions) {
			var testEl = $('<li>'),
				testHtml = '',
				assertUl = $('<ul>'),
				assertLi,
				assertHtml = '',
				assert;

			total++;

			// each test
			testHtml += '<div class="title"><strong>' + name + '</strong> ';
			if (assertions.failures()) {
				testEl.addClass('fail open');
				testHtml += assertions.passes() + ' passed,';
				testHtml += assertions.failures() + ' failed.</div>';
			} else {
				testEl.addClass('pass');
				testHtml += 'All ' + assertions.passes() + ' passed.</div>';
			}
			testEl.addClass('test');
			testEl.html(testHtml);

			// each assert
			for (var i = 0; i < assertions.length; i++) {
				assert = assertions[i];
				assertLi = $('<li>');
				assertHtml = '<strong>' + total + '.' + (i + 1) + '</strong> ';
				assertHtml += (assert.message || assert.method || 'no message');
				if (assert.failed()) {
					assertHtml += ' (' + assert.error.expected + ' ' + assert.error.operator + ' ' + assert.error.actual + ')';
					assertHtml += '<pre>' + (assert.error.stack || assert.error) + '</pre>';
					assertLi.addClass('fail');
				} else {
					assertLi.addClass('pass');
				}
				assertLi.html(assertHtml);
				assertUl.append(assertLi);
			}

			testEl.append(assertUl);
			tests.append(testEl);
			updateTest(assertions.passes(), assertions.failures());
		},
		done : function (assertions) {
        var failures = assertions.failures(),

        toStr = '<pre>' + [
          "Please submit an issue to " +
            "<a href='https://github.com/subledger/js_client/issues'>https://github.com/subledger/js_client/issues</a> " +
            "with the information below and the failing tests.",
          "",
          "Date.prototype.toString = " + (new Date()).toString(),
          "Date.prototype.toLocaleString = " + (new Date()).toLocaleString(),
          "Date.prototype.getTimezoneOffset = " + (new Date(1000)).getTimezoneOffset(),
          "navigator.userAgent = " + navigator.userAgent
        ].join("<br/>") + '</pre>';

      if (failures) {
        banner.after('<p>' + [
          "Hmm, looks like some of the unit tests are failing.",
          "It's hard to catch all the bugs across all browsers, so if you have a minute, " +
            "please submit an issue with the failing test and the info below. Thanks!",
          toStr].join('</p><p>') + '</p>');
      } else {
        banner.after("<p class='success'>Awesome, all the unit tests passed!</p>");
      }

      updateTotals(assertions.passes(), failures);
		}
	});

	tests.on('click', 'li.test', function(){
		$(this).toggleClass('open');
	});
})();


})();
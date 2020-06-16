if (!Object.freeze || typeof Object.freeze !== 'function') {
  throw Error('ES5 support required');
}
// from ES5
const O = Object,
  OP = O.prototype,
  create = O.create,
  defineProperty = O.defineProperty,
  defineProperties = O.defineProperties,
  getOwnPropertyNames = O.getOwnPropertyNames,
  getOwnPropertyDescriptor = O.getOwnPropertyDescriptor,
  getPrototypeOf = O.getPrototypeOf,
  freeze = O.freeze,
  isFrozen = O.isFrozen,
  isSealed = O.isSealed,
  seal = O.seal,
  isExtensible = O.isExtensible,
  preventExtensions = O.preventExtensions,
  hasOwnProperty = OP.hasOwnProperty,
  toStringObj = OP.toString,
  isArray = Array.isArray,
  slice = Array.prototype.slice;
// Utility functions; some exported
function defaults(dst, src) {
  getOwnPropertyNames(src).forEach(function(k) {
    if (!hasOwnProperty.call(dst, k)) {
      defineProperty(dst, k, getOwnPropertyDescriptor(src, k));
    }
  });
  return dst;
}
const isObject = function(o) {
  return o === Object(o);
};
const isPrimitive = function(o) {
  return o !== Object(o);
};
const isFunction = function(f) {
  return typeof f === 'function';
};
const signatureOf = function(o) {
  return toStringObj.call(o);
};
const HASWEAKMAP = (function() {
  // paranoia check
  try {
    const wm = new WeakMap();
    wm.set(wm, wm);
    return wm.get(wm) === wm;
  } catch (e) {
    return false;
  }
})();
// exported
function is(x, y) {
  return x === y
    ? x !== 0
      ? true
      : 1 / x === 1 / y // +-0
    : x !== x && y !== y; // NaN
}
function isnt(x, y) {
  return !is(x, y);
}
const defaultCK = {
  descriptors: true,
  extensibility: true,
  enumerator: getOwnPropertyNames
};

function equals(sourceX, sourceY, ck) {
  let vx, vy;
  if (HASWEAKMAP) {
    vx = new WeakMap();
    vy = new WeakMap();
  }
  ck = defaults(ck || {}, defaultCK);
  return (function _equals(x, y) {
    if (isPrimitive(x)) {
      return is(x, y);
    }
    if (isFunction(x)) {
      return is(x, y);
    }
    // check deeply
    const sx = signatureOf(x),
      sy = signatureOf(y);
    // sx, sy,
    let i, l, px, py, kx, ky, dx, dy, flt;
    if (sx !== sy) {
      return false;
    }
    switch (sx) {
      case '[object Array]':
      case '[object Object]':
        if (ck.extensibility) {
          if (isExtensible(x) !== isExtensible(y)) {
            return false;
          }
          if (isSealed(x) !== isSealed(y)) {
            return false;
          }
          if (isFrozen(x) !== isFrozen(y)) {
            return false;
          }
        }
        if (vx) {
          if (vx.has(x)) {
            // console.log('circular ref found');
            return vy.has(y);
          }
          vx.set(x, true);
          vy.set(y, true);
        }
        px = ck.enumerator(x);
        py = ck.enumerator(y);
        if (ck.filter) {
          flt = function(k) {
            const d = getOwnPropertyDescriptor(this, k);
            return ck.filter(d, k, this);
          };
          px = px.filter(flt, x);
          py = py.filter(flt, y);
        }
        if (px.length !== py.length) {
          return false;
        }
        px.sort();
        py.sort();
        for (i = 0, l = px.length; i < l; ++i) {
          kx = px[i];
          ky = py[i];
          if (kx !== ky) {
            return false;
          }
          dx = getOwnPropertyDescriptor(x, ky);
          dy = getOwnPropertyDescriptor(y, ky);
          if ('value' in dx) {
            if (!_equals(dx.value, dy.value)) {
              return false;
            }
          } else {
            if (dx.get && dx.get !== dy.get) {
              return false;
            }
            if (dx.set && dx.set !== dy.set) {
              return false;
            }
          }
          if (ck.descriptors) {
            if (dx.enumerable !== dy.enumerable) {
              return false;
            }
            if (ck.extensibility) {
              if (dx.writable !== dy.writable) {
                return false;
              }
              if (dx.configurable !== dy.configurable) {
                return false;
              }
            }
          }
        }
        return true;
      case '[object RegExp]':
      case '[object Date]':
      case '[object String]':
      case '[object Number]':
      case '[object Boolean]':
        return '' + x === '' + y;
      default:
        throw TypeError(sx + ' not supported');
    }
  })(sourceX, sourceY);
}

export function deepClone(source, deep, ck?) {
  let wm;
  if (deep && HASWEAKMAP) {
    wm = new WeakMap();
  }
  ck = defaults(ck || {}, defaultCK);
  return (function _clone(src) {
    // primitives and functions
    if (isPrimitive(src)) {
      return src;
    }
    if (isFunction(src)) {
      return src;
    }
    const sig = signatureOf(src);
    switch (sig) {
      case '[object Array]':
      case '[object Object]':
        if (wm) {
          if (wm.has(src)) {
            // console.log('circular ref found');
            return src;
          }
          wm.set(src, true);
        }
        const isarray = isArray(src);
        const dst = isarray ? [] : create(getPrototypeOf(src));
        ck.enumerator(src).forEach(function(k) {
          // Firefox forbids defineProperty(obj, 'length' desc)
          if (isarray && k === 'length') {
            dst.length = src.length;
          } else {
            if (ck.descriptors) {
              const desc = getOwnPropertyDescriptor(src, k);
              if (ck.filter && !ck.filter(desc, k, src)) {
                return;
              }
              if (deep && 'value' in desc) {
                desc.value = _clone(src[k]);
              }
              defineProperty(dst, k, desc);
            } else {
              dst[k] = _clone(src[k]);
            }
          }
        });
        if (ck.extensibility) {
          if (!isExtensible(src)) {
            preventExtensions(dst);
          }
          if (isSealed(src)) {
            seal(dst);
          }
          if (isFrozen(src)) {
            freeze(dst);
          }
        }
        return dst;
      case '[object RegExp]':
      case '[object Date]':
      case '[object String]':
      case '[object Number]':
      case '[object Boolean]':
        return deep ? new src.constructor(src.valueOf()) : src;
      default:
        throw TypeError(sig + ' is not supported');
    }
  })(source);
}
//  Install
const obj2specs = function(src) {
  const specs = create(null);
  getOwnPropertyNames(src).forEach(function(k) {
    specs[k] = {
      value: src[k],
      configurable: true,
      writable: true,
      enumerable: false
    };
  });
  return specs;
};
const defaultProperties = function(dst, descs) {
  getOwnPropertyNames(descs).forEach(function(k) {
    if (!hasOwnProperty.call(dst, k)) {
      defineProperty(dst, k, descs[k]);
    }
  });
  return dst;
};

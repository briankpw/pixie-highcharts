const isObj = function(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Sources cannot be null or undefined');
  }

  return Object(val);
}

function assignKey(to, from, key) {
  const val = from[key];

  if (val === undefined || val === null) {
    return;
  }

  if (hasOwnProperty.call(to, key)) {
    if (to[key] === undefined || to[key] === null) {
      throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
    }
  }

  if (!hasOwnProperty.call(to, key) || !isObj(val)) {
    to[key] = val;
  } else {
    to[key] = assign(Object(to[key]), from[key]);
  }
}

function assign(to, from) {
  if (to === from) {
    return to;
  }

  from = Object(from);

  for (const key in from) {
    if (hasOwnProperty.call(from, key)) {
      assignKey(to, from, key);
    }
  }
  return to;
}

export function deepAssign(target, ...args) {
  target = toObject(target);

  for (let s = 0; s < args.length; s++) {
    assign(target, args[s]);
  }

  return target;
}

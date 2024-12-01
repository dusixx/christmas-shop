const root = document.documentElement;
const lower = v => v?.toLocaleLowerCase();

export const isArray = v => Array.isArray(v);
export const isFunc = v => typeof v === "function";
export const isStr = v => typeof v === "string";

export const wasKeyDown = (key, e) => {
  return e.key === key && !e.ctrlKey && !e.altKey && !e.shiftKey;
};

export const cssVar = {
  get(name) {
    return getComputedStyle(root).getPropertyValue(name);
  },
  set(name, val) {
    return root.style.setProperty(name, val);
  },
};

export const getTypeName = v => {
  return Object.prototype.toString.call(v).slice(8, -1);
};

export const isTagEqual = (el, tag) => {
  return lower(el?.tagName) === lower(tag);
};

export const elementExpected = (el, tag) => {
  if (!isTagEqual(el, tag) && lower(getTypeName(el)) !== lower(tag)) {
    throw TypeError(`'${tag}' element expected`);
  }
};

export const makeId = name => {
  return lower(`${name}`.trim().replace(/\s+/g, "-"));
};

export const rndInt = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const getRandomElements = (arr, count = arr?.length) => {
  elementExpected(arr, "array");
  const a = [...arr];

  return Array.from(
    { length: Math.min(count, a.length) },
    () => a.splice(rndInt(0, a.length - 1), 1)[0],
  );
};

export const joinClasses = (...args) => {
  return args
    .map(v => (isStr(v) ? v.trim() : ``))
    .filter(v => v)
    .join(" ");
};

export function throttle(target, tio) {
  elementExpected(target, "function");

  let timerId;
  let lastArgs;
  let lastCtx;

  function throttled(...args) {
    if (timerId) {
      lastArgs = args;
      lastCtx = this;
      return;
    }
    target.apply(this, args);

    timerId = setTimeout(() => {
      timerId = 0;
      if (lastArgs) {
        throttled.apply(lastCtx, lastArgs);
        lastArgs = lastCtx = null;
      }
    }, tio);
  }
  return throttled;
}

export const msToDDHHMMSS = ms => {
  const secs = ms / 1000;
  return {
    ss: `${Math.floor(secs % 60)}`.padStart(2, 0),
    mm: `${Math.floor((secs / 60) % 60)}`.padStart(2, 0),
    hh: `${Math.floor((secs / 3600) % 24)}`.padStart(2, 0),
    dd: `${Math.floor(secs / 3600 / 24)}`.padStart(2, 0),
  };
};

export const getUTCDate = date => {
  const dt = new Date(date);
  elementExpected(dt, "date");

  return new Date(
    Date.UTC(
      dt.getFullYear(),
      dt.getMonth(),
      dt.getDate(),
      dt.getHours(),
      dt.getMinutes(),
      dt.getSeconds(),
      dt.getMilliseconds(),
    ),
  );
};

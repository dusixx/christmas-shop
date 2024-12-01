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

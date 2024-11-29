const root = document.querySelector(":root");

export const wasKeyDown = (key, e) => {
  return e.key === key && !e.ctrlKey && !e.altKey && !e.shiftKey;
};

export const getCSSVar = varName => {
  return getComputedStyle(root).getPropertyValue(varName);
};

export const setCSSVar = (varName, val) => {
  return root.style.setProperty(varName, val);
};

export const rndInt = (min, max) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const getRandomElements = (srcArr, count = srcArr?.length) => {
  if (!Array.isArray(srcArr)) {
    throw TypeError("Array expected");
  }
  const result = [];
  const arr = [...srcArr];
  let len = Math.min(count, arr.length);

  while (len--) {
    let idx = rndInt(0, arr.length - 1);
    result.push(arr[idx]);
    arr.splice(idx, 1);
  }
  return result;
};

export const makeId = name => {
  return String(name).replace(/\s+/g, "-").toLocaleLowerCase();
};

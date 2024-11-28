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

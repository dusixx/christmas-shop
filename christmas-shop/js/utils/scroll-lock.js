const root = document.documentElement;

export class Scroll {
  static #locked;
  static #rootCss;

  static toTop() {
    scrollTo({ top: 0 });
  }

  static toggleLock({ toTop } = {}) {
    if (!this.#locked) {
      if (toTop) this.toTop();

      this.#rootCss = root.style.cssText;
      root.style.cssText = `overflow: hidden; scrollbar-gutter: stable;`;
    } else {
      root.style.cssText = this.#rootCss;
      this.#rootCss = null;
    }
    this.#locked = !this.#locked;
  }
}

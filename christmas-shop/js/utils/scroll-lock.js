const root = document.documentElement;

export class Scroll {
  static #top;
  static #left;
  static #rootCSS;
  static #locked;

  static #lockScroll() {
    const curRootCSS = root.style.cssText;
    const curTop = pageYOffset;
    const curLeft = pageXOffset;

    root.style.cssText = `
        ${curRootCSS};
        position: fixed;
        top: -${curTop}px;
        left: -${curLeft}px;
        width: 100%;
        overflow-y: ${this.isVBarVisible() ? `scroll` : `hidden`};
    `;

    return { curTop, curLeft, curRootCSS };
  }

  static isVBarVisible() {
    const curBodyClientWidth = root.clientWidth;
    const curBodyOverflow = root.style.overflow;

    root.style.overflow = "hidden";
    const res = curBodyClientWidth !== root.clientWidth;
    root.style.overflow = curBodyOverflow;

    return res;
  }

  static lock() {
    if (this.#locked) return;

    const { curTop, curLeft, curRootCSS } = this.#lockScroll();
    this.#top = curTop;
    this.#left = curLeft;
    this.#rootCSS = curRootCSS;

    this.#locked = true;
  }

  static unlock() {
    if (!this.#locked) return;

    // restore root style
    root.style.cssText = this.#rootCSS;
    // avoid auto scrolling up and back
    root.style.scrollBehavior = "auto";
    // restore scroll position
    scrollTo({
      top: this.#top,
      left: this.#left,
    });
    root.style.removeProperty("scroll-behavior");

    this.#locked = false;
  }

  static get isLocked() {
    return this.#locked;
  }

  static toggleLock(force) {
    const flag = force == null ? this.#locked : !force;
    return flag ? this.unlock() : this.lock();
  }
}

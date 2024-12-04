import { elementExpected, throttle } from "./helpers.js";

const cls = {
  backtop: "backtop",
  backtopActive: "backtop--active",
};

export class Backtop {
  static #ref;
  static #threshold;
  static #pollingTimeout;
  static #handlePageScroll;

  static init(opts) {
    this.#ref = document.querySelector(`.${cls.backtop}`);
    elementExpected(this.ref, "a");

    this.pollingTimeout = opts?.pollingTimeout;
    this.threshold = opts?.threshold;
  }

  static set pollingTimeout(value) {
    this.#pollingTimeout = value;

    document.removeEventListener("scroll", this.#handlePageScroll);

    // disable scroll polling and thus the backtop too
    if (value < 0) return;

    this.#handlePageScroll = throttle(() => {
      this.ref.classList.toggle(cls.backtopActive, scrollY >= this.threshold);
    }, value);

    document.addEventListener("scroll", this.#handlePageScroll);
  }

  static get pollingTimeout() {
    return this.#pollingTimeout;
  }

  static set threshold(v) {
    this.#threshold = v;
  }

  static get threshold() {
    return this.#threshold;
  }

  static get ref() {
    return this.#ref;
  }
}

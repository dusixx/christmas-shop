import { ClassName, throttle } from "../common";
export class Backtop {
  static #instance;
  #ref;
  #threshold;
  #pollingTimeout;
  #handlePageScroll;

  constructor(opts) {
    if (Backtop.#instance) {
      return Backtop.#instance;
    }
    Backtop.#instance = this;

    this.#ref = document.querySelector(`.${ClassName.Backtop}`);
    this.pollingTimeout = opts?.pollingTimeout;
    this.threshold = opts?.threshold;
  }

  set pollingTimeout(value) {
    this.#pollingTimeout = value;

    document.removeEventListener("scroll", this.#handlePageScroll);

    // disable scroll polling and thus the backtop too
    if (value < 0) {
      return;
    }
    this.#handlePageScroll = throttle(() => {
      this.ref.classList.toggle(ClassName.BacktopActive, scrollY >= this.threshold);
    }, value);

    document.addEventListener("scroll", this.#handlePageScroll);
  }

  get pollingTimeout() {
    return this.#pollingTimeout;
  }

  set threshold(v) {
    this.#threshold = v;
  }

  get threshold() {
    return this.#threshold;
  }

  get ref() {
    return this.#ref;
  }
}

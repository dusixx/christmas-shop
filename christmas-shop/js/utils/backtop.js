import { elementExpected } from "./helpers.js";

const cls = {
  backtop: "backtop",
  backtopActive: "backtop--active",
};

export class Backtop {
  #ref;
  #threshold;
  #enabled;

  constructor(opts) {
    this.#ref = document.querySelector(`.${cls.backtop}`);
    elementExpected(this.ref, "a");

    this.threshold = opts?.threshold;
    this.enabled = opts?.enabled;
  }

  #handlePageScroll = e => {
    this.ref.classList.toggle(cls.backtopActive, pageYOffset > this.threshold);
  };

  set enabled(flag) {
    this.#enabled = flag;
    if (flag) {
      document.addEventListener("scroll", this.#handlePageScroll);
    } else {
      document.removeEventListener("scroll", this.#handlePageScroll);
    }
  }

  get enabled() {
    return this.#enabled;
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

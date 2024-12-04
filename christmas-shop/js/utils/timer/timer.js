import { elementExpected, isArray, msToDHMS } from "../helpers.js";
import { Countdown } from "./countdown.js";

const cls = {
  timer: "timer",
  timerNumber: "timer__number",
};

export class Timer {
  static #numRef = {};
  static #timeLeft;
  static #timerId;
  static #ref;

  static init(opts) {
    this.#ref = document.querySelector(`.${cls.timer}`);
    elementExpected(this.ref, "div");

    "dd-hh-mm-ss".split("-").forEach(key => {
      const ref = this.ref.querySelector(`.${cls.timerNumber}--${key}`);
      elementExpected(ref, "span");

      this.numRef[key] = ref;
    });

    if (opts?.futureDate) {
      this.setFutureDate(opts?.futureDate);
    }
    Countdown.onTick = this.#render.bind(this);

    return this;
  }

  static #render(timeLeft) {
    Object.entries(msToDHMS(timeLeft)).forEach(([key, value]) => {
      this.numRef[key].innerText = value;
    });
  }

  static start() {
    Countdown.start();
    return this;
  }

  static stop() {
    Countdown.stop();
    return this;
  }

  static setFutureDate(...args) {
    Countdown.setFutureDate(...args);
    // update timer values immediately
    this.#render(Countdown.timeLeft);

    return this;
  }

  static get numRef() {
    return this.#numRef;
  }

  static get ref() {
    return this.#ref;
  }
}

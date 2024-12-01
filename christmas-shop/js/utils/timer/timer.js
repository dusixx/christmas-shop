import { elementExpected, isArray, msToDDHHMMSS } from "../helpers.js";
import { Countdown } from "./countdown.js";

const cls = {
  timer: "timer",
  timerNumber: "timer__number",
};

export class Timer {
  static #instance;
  #numRef = {};
  #timeLeft;
  #timerId;
  #ref;

  constructor(opts) {
    if (Timer.#instance) {
      return Timer.#instance;
    }
    Timer.#instance = this;

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
    Countdown.onTick = this.#render;
  }

  #render = timeLeft => {
    Object.entries(msToDDHHMMSS(timeLeft)).forEach(([key, value]) => {
      this.numRef[key].innerText = value;
    });
  };

  start() {
    Countdown.start();
    return this;
  }

  stop() {
    Countdown.stop();
    return this;
  }

  setFutureDate(...args) {
    Countdown.setFutureDate(...args);
    // update timer values immediately
    this.#render(Countdown.timeLeft);

    return this;
  }

  get numRef() {
    return this.#numRef;
  }

  get ref() {
    return this.#ref;
  }
}

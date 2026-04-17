import { ClassName, msToDHMS } from "../common/index.js";
import { Countdown } from "./countdown.js";

export class Timer {
  static #instance;
  #numRef = {};
  #ref;

  constructor(opts) {
    if (Timer.#instance) {
      return Timer.#instance;
    }
    Timer.#instance = this;

    this.#ref = document.querySelector(`.${ClassName.Timer}`);

    "secs mins hours days".split(" ").forEach(key => {
      this.numRef[key] = this.ref.querySelector(`.${ClassName.TimerNumber}[data-${key}]`);
    });

    if (opts?.futureDate) {
      this.setFutureDate(opts?.futureDate);
    }
    Countdown.onTick = this.#render.bind(this);

    return this;
  }

  #render(timeLeft) {
    Object.entries(msToDHMS(timeLeft)).forEach(([key, value]) => {
      this.numRef[key].innerText = value;
    });
  }

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

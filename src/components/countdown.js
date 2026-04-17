import { elementExpected } from "../common/utils.js";

const TIMER_PERIOD = 1000;

export class Countdown {
  static #timeLeft;
  static #timerId;
  static #onTick;

  static #handleTimeTick = () => {
    if (this.#timeLeft < 0) {
      this.stop();
      return;
    }
    this.#onTick?.(this.#timeLeft);

    this.#timeLeft -= TIMER_PERIOD;
  };

  static start() {
    this.#timerId = setInterval(this.#handleTimeTick, TIMER_PERIOD);
    return this;
  }

  static stop() {
    clearInterval(this.#timerId);
    return this;
  }

  static setFutureDate(...args) {
    const dt = new Date(...args);
    elementExpected(dt, "date");

    if (dt - Date.now() <= 0) {
      throw Error("The date must be in the future");
    }
    this.#timeLeft = dt - Date.now();

    return this;
  }

  static get timeLeft() {
    return this.#timeLeft;
  }

  static set onTick(handler) {
    this.#onTick = handler;
  }
}

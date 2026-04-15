import { throttle } from "../../utils/helpers.js";
import { refs, cls } from "./refs.js";

const { track, content, controls, btnLeft, btnRight } = refs;

let stepLength;
let extremePosition;
let currentPosition;

export class Slider {
  static #instance;
  scrollWidth = 1989;

  constructor({ pollingTimeout = 250 } = {}) {
    if (Slider.#instance) {
      return Slider.#instance;
    }
    Slider.#instance = this;

    this.update();

    addEventListener("resize", throttle(this.update.bind(this), pollingTimeout));

    controls.addEventListener("click", e => {
      const btn = e.target.closest(`.${cls.sliderBtn}`);
      if (!btn) return;

      this.#calcParams();

      currentPosition += btn === btnRight ? -1 : 1;
      btnRight.disabled = Math.abs(currentPosition) === extremePosition;
      btnLeft.disabled = currentPosition === 0;
      content.style.transform = `translateX(${stepLength * currentPosition}px)`;
    });
  }

  #calcParams() {
    const contentIndent = parseFloat(getComputedStyle(content).left);
    const visibleArea = parseFloat(getComputedStyle(track).width);
    const distance = this.scrollWidth - visibleArea + contentIndent * 2;

    extremePosition = visibleArea > 768 ? 3 : 6;
    stepLength = distance / extremePosition;
  }

  reset() {
    currentPosition = 0;
    content.style.transform = null;
    btnRight.disabled = false;
    btnLeft.disabled = true;
  }

  update() {
    this.reset();
    this.#calcParams();
  }
}

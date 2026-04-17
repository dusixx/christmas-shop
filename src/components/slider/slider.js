import { ClassName, throttle } from "../../common/index.js";
import { refs } from "./refs.js";

const { track, content, controls, btnLeft, btnRight } = refs;

const TABLET_WIDTH = 768;
const TABLET_PRESSES = 6;
const DESKTOP_PRESSES = 3;

let stepLength;
let extremePosition;
let currentPosition;

export class Slider {
  static #instance;

  constructor({ pollingTimeout = 250 } = {}) {
    if (Slider.#instance) {
      return Slider.#instance;
    }
    Slider.#instance = this;

    this.update();

    addEventListener("resize", throttle(this.update.bind(this), pollingTimeout));

    controls.addEventListener("click", e => {
      const btn = e.target.closest(`.${ClassName.SliderBtn}`);
      if (!btn) {
        return;
      }
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
    const distance = content.scrollWidth - visibleArea + contentIndent * 2;

    extremePosition = visibleArea > TABLET_WIDTH ? DESKTOP_PRESSES : TABLET_PRESSES;
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

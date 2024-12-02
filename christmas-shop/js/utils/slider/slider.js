import { elementExpected, throttle } from "../helpers.js";
import { refs, cls } from "./refs.js";

const {
  sliderTrack: track,
  sliderContent: content,
  sliderControls: controls,
  sliderBtnLeft: btnLeft,
  sliderBtnRight: btnRight,
} = refs;

let stepLength;
let extremePosition;
let currentPosition;

export class Slider {
  static scrollWidth = 1989;

  static init({ pollingTimeout = 250 } = {}) {
    elementExpected(content, "div");
    elementExpected(controls, "div");
    elementExpected(track, "div");
    elementExpected(btnLeft, "button");
    elementExpected(btnRight, "button");

    // this.scrollWidth = content.scrollWidth;
    this.update();

    window.addEventListener("resize", throttle(this.update.bind(this), pollingTimeout));

    controls.addEventListener("click", e => {
      const btn = e.target.closest(`.${cls.sliderBtn}`);
      if (!btn) return;

      this.#calcParams();

      if (btn === btnRight) {
        currentPosition -= 1;
      } else {
        currentPosition += 1;
      }
      btnRight.disabled = Math.abs(currentPosition) === extremePosition;
      btnLeft.disabled = currentPosition === 0;
      content.style.transform = `translateX(${stepLength * currentPosition}px)`;
    });
  }

  static reset() {
    currentPosition = 0;
    content.style.transform = null;
    btnRight.disabled = false;
    btnLeft.disabled = true;
  }

  static #calcParams() {
    const contentIndent = parseFloat(getComputedStyle(content).left);
    const visibleArea = parseFloat(getComputedStyle(track).width);
    const distance = this.scrollWidth - visibleArea + contentIndent * 2;

    extremePosition = visibleArea > 768 ? 3 : 6;
    stepLength = distance / extremePosition;
  }

  static update() {
    this.reset();
    this.#calcParams();
  }
}

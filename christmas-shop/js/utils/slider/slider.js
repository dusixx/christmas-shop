import { elementExpected, throttle } from "../helpers.js";
import { refs, cls } from "./refs.js";

const {
  sliderContent: content,
  sliderControls: controls,
  sliderBtnLeft: btnLeft,
  sliderBtnRight: btnRight,
} = refs;

let stepLength;
let extremePosition;
let currentPosition;

export class Slider {
  static scrollWidth;

  static init({ pollingTimeout = 150 } = {}) {
    elementExpected(content, "div");
    elementExpected(controls, "div");
    elementExpected(btnLeft, "button");
    elementExpected(btnRight, "button");

    this.scrollWidth = content.scrollWidth;
    this.update();

    addEventListener("resize", throttle(this.update.bind(this), pollingTimeout));

    controls.addEventListener("click", e => {
      const btn = e.target.closest(`.${cls.sliderBtn}`);
      if (!btn) return;

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

  static update() {
    this.reset();

    const contentIndent = getComputedStyle(content).left;
    const visibleArea = screen.availWidth >= 1440 ? 1440 : screen.availWidth;
    const distance = this.scrollWidth - visibleArea + parseFloat(contentIndent) * 2;

    extremePosition = screen.availWidth > 768 ? 3 : 6;
    stepLength = distance / extremePosition;
  }
}

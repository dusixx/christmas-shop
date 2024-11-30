import { elementExpected, isFunc, wasKeyDown } from "../helpers.js";
import { Scroll } from "../scroll-lock.js";

const cls = {
  backdrop: "backdrop",
  backdropActive: "backdrop--active",
};

export class Backdrop {
  #ref;
  #onHide;
  #onShow;

  constructor() {
    this.#ref = document.querySelector(`.${cls.backdrop}`);
    elementExpected(this.ref, "div");

    this.#ref.addEventListener("click", e => {
      // catch the click directly on the backdrop
      if (e.target !== e.currentTarget) return;
      this.toggle(e);
    });
  }

  #handleEscKeydown = e => {
    if (wasKeyDown("Escape", e)) {
      this.toggle();
    }
  };

  toggle() {
    Scroll.toggleLock();
    const wasShown = this.ref.classList.toggle(cls.backdropActive);

    if (wasShown) {
      document.addEventListener("keydown", this.#handleEscKeydown, { once: true });
      if (isFunc(this.#onShow)) this.#onShow();
    } else {
      document.removeEventListener("keydown", this.#handleEscKeydown);
      if (isFunc(this.#onHide)) this.#onHide();
    }
    return wasShown;
  }

  set onHide(handler) {
    this.#onHide = handler;
  }

  set onShow(handler) {
    this.#onShow = handler;
  }

  get ref() {
    return this.#ref;
  }
}

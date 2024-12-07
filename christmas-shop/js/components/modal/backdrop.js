import { elementExpected, wasKeyDown } from "../../utils/helpers.js";
import { Scroll } from "../scroll-lock.js";
import { refs, cls } from "./refs.js";

export class Backdrop {
  static #instance;
  #ref;
  #onHide;
  #onShow;
  #opts;

  constructor(opts = { hideOnEscape: true, hideOnClick: true }) {
    if (Backdrop.#instance) {
      return Backdrop.#instance;
    }
    Backdrop.#instance = this;

    this.#ref = refs.backdrop;
    this.#opts = opts;

    if (opts?.hideOnClick) {
      this.#ref.addEventListener("click", e => {
        // catch the click directly on the backdrop
        if (e.target !== e.currentTarget) return;
        this.toggle(e);
      });
    }
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
      if (this.#opts?.hideOnEscape) {
        document.addEventListener("keydown", this.#handleEscKeydown, { once: true });
      }
      this.#onShow?.();
    } else {
      document.removeEventListener("keydown", this.#handleEscKeydown);
      this.#onHide?.();
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

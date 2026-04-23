import { ClassName, wasKeyDown } from "../../common";
import { Scroll } from "../scroll-lock.js";
import { refs } from "./refs.js";

export class Backdrop {
  static #instance;
  #ref;
  #onHide;
  #onShow;
  #hideOnEscape;

  constructor({ hideOnEscape, hideOnClick } = {}) {
    if (Backdrop.#instance) {
      return Backdrop.#instance;
    }
    Backdrop.#instance = this;

    this.#ref = refs.backdrop;
    this.#hideOnEscape = hideOnEscape;

    if (hideOnClick) {
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
    const wasShown = this.ref.classList.toggle(ClassName.BackdropActive);

    if (wasShown) {
      if (this.#hideOnEscape) {
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

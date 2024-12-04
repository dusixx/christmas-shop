import { elementExpected, isStr } from "../helpers.js";
import { Backdrop } from "./backdrop.js";

const cls = {
  modal: "modal",
  modalContent: "modal__content",
  modalCloseBtn: "modal__close-btn",
};

const backdrop = new Backdrop();
const root = document.documentElement;
const topOffset = "1px";

export class Modal {
  static #instance;
  #ref;
  #contentRef;
  #content;

  constructor() {
    if (Modal.#instance) {
      return Modal.#instance;
    }
    Modal.#instance = this;

    this.#ref = backdrop.ref.querySelector(`.${cls.modal}`);
    elementExpected(this.ref, "div");

    this.#contentRef = this.ref.querySelector(`.${cls.modalContent}`);
    elementExpected(this.#contentRef, "div");

    const closeBtn = this.ref.querySelector(`.${cls.modalCloseBtn}`);
    elementExpected(closeBtn, "button");

    closeBtn.addEventListener("click", () => backdrop.toggle());
  }

  #fitByHeight(topOffset) {
    const mediaMatcher = matchMedia(`(height <= ${this.height}px)`);
    const handleMatchMedia = e => {
      this.#ref.style.top = e?.matches ? topOffset : null;
    };
    backdrop.onHide = () => {
      mediaMatcher.removeEventListener("change", handleMatchMedia);
    };
    backdrop.onShow = () => {
      this.#ref.style.top = root.clientHeight <= this.height ? topOffset : null;
      mediaMatcher.addEventListener("change", handleMatchMedia);
    };
  }

  show({ content } = {}) {
    this.content = content ?? this.content;
    backdrop.toggle();
  }

  set content(markup) {
    this.#contentRef.innerHTML = this.#content = markup;
    this.#fitByHeight(topOffset);
  }

  get height() {
    return parseInt(getComputedStyle(this.#ref).height);
  }

  get ref() {
    return this.#ref;
  }
}

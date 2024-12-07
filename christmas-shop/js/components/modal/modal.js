import { elementExpected, isStr } from "../../utils/helpers.js";
import { Backdrop } from "./backdrop.js";
import { refs } from "./refs.js";

const TOP_OFFSET = "1px";

export class Modal {
  static #instance;
  #ref;
  #contentRef;
  #content;
  #backdrop;

  constructor() {
    if (Modal.#instance) {
      return Modal.#instance;
    }
    Modal.#instance = this;

    this.#backdrop = new Backdrop();
    this.#ref = refs.modal;
    this.#contentRef = refs.modalContent;

    refs.modalCloseBtn.addEventListener("click", () => this.#backdrop.toggle());
  }

  show({ content } = {}) {
    this.content = content ?? this.content;
    this.#backdrop.toggle();
  }

  set content(markup) {
    this.#contentRef.innerHTML = this.#content = markup;

    // fit modal by height
    this.ref.style.top = refs.root.clientHeight <= this.height ? TOP_OFFSET : null;
    matchMedia(`(height <= ${this.height}px)`).addEventListener("change", e => {
      this.ref.style.top = e?.matches ? TOP_OFFSET : null;
    });
  }

  get height() {
    return parseInt(getComputedStyle(this.ref).height);
  }

  get ref() {
    return this.#ref;
  }
}

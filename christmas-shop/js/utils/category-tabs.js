import { elementExpected } from "./helpers.js";

const cls = {
  category: "category",
  categoryInput: "category__input",
};

export class CategoryTabs {
  static #ref;
  static #onChange;

  static init(opts) {
    this.#ref = document.querySelector(`.${cls.category}`);
    elementExpected(this.#ref, "ul");

    const radioBtns = this.ref.querySelectorAll(`.${cls.categoryInput}`);
    elementExpected(radioBtns, "NodeList");

    radioBtns.forEach(itm =>
      itm.addEventListener("change", ({ target: { value } }) => {
        this.#onChange?.(value);
      }),
    );

    this.onChange = opts?.onChange;
  }

  static set onChange(handler) {
    this.#onChange = handler;
  }

  static get ref() {
    return this.#ref;
  }
}

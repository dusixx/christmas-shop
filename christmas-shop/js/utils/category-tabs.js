import { elementExpected } from "./helpers.js";

const cls = {
  category: "category",
  categoryInput: "category__input",
};

export class CategoryTabs {
  static #instance;
  #ref;
  #onChange;

  constructor(opts) {
    if (CategoryTabs.#instance) {
      return CategoryTabs.#instance;
    }
    CategoryTabs.#instance = this;

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

  set onChange(handler) {
    this.#onChange = handler;
  }

  get ref() {
    return this.#ref;
  }
}

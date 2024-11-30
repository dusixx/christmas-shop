import { elementExpected, isFunc } from "./helpers.js";

const cls = {
  category: "category",
  categoryInput: "category__input",
};

export class CategoryTabs {
  #ref;
  #onChange;

  constructor() {
    this.#ref = document.querySelector(`.${cls.category}`);
    elementExpected(this.#ref, "ul");

    const radioBtns = this.ref.querySelectorAll(`.${cls.categoryInput}`);
    elementExpected(radioBtns, "NodeList");

    radioBtns.forEach(itm =>
      itm.addEventListener("change", ({ target: { value } }) => {
        if (isFunc(this.#onChange)) this.#onChange(value);
      }),
    );
  }

  get ref() {
    return this.#ref;
  }

  set onChange(handler) {
    this.#onChange = handler;
  }
}

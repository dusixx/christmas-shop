import { ClassName, elementExpected } from "../common/index.js";
export class CategoryTabs {
  static #instance;
  #ref;
  #onChange;

  constructor(opts) {
    if (CategoryTabs.#instance) {
      return CategoryTabs.#instance;
    }
    CategoryTabs.#instance = this;

    this.#ref = document.querySelector(`.${ClassName.Category}`);
    const radioBtns = this.ref.querySelectorAll(`.${ClassName.CategoryInput}`);
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

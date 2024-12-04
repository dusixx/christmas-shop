import { giftsData } from "./gifts-data.js";
import { cls as classNames, makeGiftList } from "./markup.js";
import { getRandomElements, makeId, elementExpected, isFunc } from "../index.js";

const cls = {
  ...classNames,
  giftsContainer: "gifts-container",
};

export class GiftList {
  static #items = [];
  static #filtered = [];
  static #container;
  static #onClick;
  static #ref;

  static init(opts) {
    this.#container = document.querySelector(`.${cls.giftsContainer}`);
    elementExpected(this.#container, "div");

    this.onClick = opts?.onClick;

    return this;
  }

  static #handleGiftListClick({ target }) {
    if (!isFunc(this.#onClick)) return;

    const targetCard = target.closest(`.${cls.giftCard}`);
    if (!targetCard) return;

    const cardData = this.find(targetCard.id);
    this.#onClick(cardData, targetCard);
  }

  static set onClick(handler) {
    this.#onClick = handler;
  }

  static random(count) {
    this.#filtered = this.#items = getRandomElements(giftsData, count);
    return this;
  }

  static filter(category) {
    this.#filtered =
      makeId(category) === "all"
        ? this.#items
        : this.#items.filter(itm => makeId(itm.category) === makeId(category));

    return this;
  }

  static find(id) {
    return this.#filtered.find(({ name }) => makeId(name) === id);
  }

  static render() {
    this.#container.innerHTML = makeGiftList(this.#filtered);

    this.#ref = this.#container.querySelector(`.${cls.giftList}`);
    elementExpected(this.ref, "ul");

    this.ref.addEventListener("click", this.#handleGiftListClick.bind(this));

    return this;
  }

  static get items() {
    return [...this.#items];
  }

  static get filtered() {
    return [...this.#filtered];
  }

  static get ref() {
    return this.#ref;
  }
}

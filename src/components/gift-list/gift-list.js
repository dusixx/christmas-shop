import { getRandomElements, isFunc, makeId, ClassName } from "../../common/index.js";
import { giftsData } from "../../data/gifts-data.js";
import { makeGiftList } from "./markup.js";

export class GiftList {
  static #instance;
  #items = [];
  #filtered = [];
  #container;
  #onClick;
  #ref;

  constructor(opts) {
    if (GiftList.#instance) {
      return GiftList.#instance;
    }
    GiftList.#instance = this;

    this.#container = document.querySelector(`.${ClassName.GiftsContainer}`);
    this.onClick = opts?.onClick;
  }

  #handleGiftListClick({ target }) {
    if (!isFunc(this.#onClick)) return;

    const targetCard = target.closest(`.${ClassName.GiftCard}`);
    if (!targetCard) return;

    const cardData = this.find(targetCard.id);
    this.#onClick(cardData, targetCard);
  }

  set onClick(handler) {
    this.#onClick = handler;
  }

  random(count) {
    this.#filtered = this.#items = getRandomElements(giftsData, count);
    return this;
  }

  filter(category) {
    this.#filtered =
      makeId(category) === "all"
        ? this.#items
        : this.#items.filter(itm => makeId(itm.category) === makeId(category));

    return this;
  }

  find(id) {
    return this.#filtered.find(({ name }) => makeId(name) === id);
  }

  render() {
    this.#container.innerHTML = makeGiftList(this.#filtered);
    this.#ref = this.#container.querySelector(`.${ClassName.GiftList}`);
    this.#ref.addEventListener("click", this.#handleGiftListClick.bind(this));

    return this;
  }

  get items() {
    return [...this.#items];
  }

  get filtered() {
    return [...this.#filtered];
  }

  get ref() {
    return this.#ref;
  }
}

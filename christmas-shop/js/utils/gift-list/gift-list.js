import { giftsData } from "./gifts-data.js";
import { cls as classNames, makeGiftList } from "./markup.js";
import { getRandomElements, makeId, elementExpected, isFunc } from "../index.js";

const cls = {
  ...classNames,
  giftsContainer: "gifts-container",
};

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

    this.#container = document.querySelector(`.${cls.giftsContainer}`);
    elementExpected(this.#container, "div");

    this.onClick = opts?.onClick;
  }

  // arrow to avoid error when calling as event handler without binding
  #handleGiftListClick = ({ target }) => {
    if (!isFunc(this.#onClick)) return;

    const targetCard = target.closest(`.${cls.giftCard}`);
    if (!targetCard) return;

    const cardData = this.find(targetCard.id);
    this.#onClick(cardData, targetCard);
  };

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

    this.#ref = this.#container.querySelector(`.${cls.giftList}`);
    elementExpected(this.ref, "ul");

    this.ref.addEventListener("click", this.#handleGiftListClick);

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

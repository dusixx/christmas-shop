import { giftsData } from "./gifts-data.js";
import { cls, makeGiftList } from "./markup.js";
import { getRandomElements, makeId, elementExpected, isFunc } from "../helpers.js";

const containerSelector = ".gifts-container";

export class GiftList {
  #items = [];
  #filtered = [];
  #container;
  #onClick;
  #ref;

  constructor() {
    this.#container = document.querySelector(containerSelector);
    elementExpected(this.#container, "div");
  }

  // arrow to avoid error when calling as event handler without binding
  #handleGiftListClick = ({ target }) => {
    if (!isFunc(this.#onClick)) return;

    const targetCard = target.closest(`.${cls.giftCard}`);
    elementExpected(targetCard, "article");

    const cardData = this.find(targetCard.id);
    this.#onClick(cardData, targetCard);
  };

  #makeMarkup() {
    return makeGiftList(this.#filtered);
  }

  set onClick(handler) {
    this.#onClick = handler;
  }

  random(count) {
    this.#filtered = this.#items = getRandomElements(giftsData, count);
    return this;
  }

  select(start, end) {
    this.#filtered = this.#items = giftsData.slice(start, end);
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
    this.#container.innerHTML = this.markup;

    this.#ref = this.#container.querySelector(`.${cls.giftList}`);
    elementExpected(this.ref, "ul");

    this.ref.addEventListener("click", this.#handleGiftListClick);
  }

  get items() {
    return [...this.#items];
  }

  get filtered() {
    return [...this.#filtered];
  }

  get markup() {
    return this.#makeMarkup();
  }

  get ref() {
    return this.#ref;
  }
}

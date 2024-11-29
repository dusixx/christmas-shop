import { getRandomElements, makeId } from "./helpers.js";
import { gifts } from "./gifts-data.js";
import { refs } from "./refs.js";

const className = {
  giftsList: "gifts-list",
  giftCard: "gift-card",
};

export class GiftList {
  #items = [];
  #filtered = [];
  #container;

  constructor(container = refs.giftsListContainer) {
    if (container?.tagName.toLowerCase() !== "div") {
      throw TypeError("div container expected");
    }
    this.#container = container;
  }

  #makeMarkup() {
    const markup = this.#filtered
      .map(({ category, name }) => {
        const cardClassMod = `${className.giftCard}--${makeId(category)}`;
        return `
            <li class="${className.giftsList}__item">
                <a class="${className.giftCard} ${cardClassMod}" id="${makeId(name)}" href="javascript:;">
                <div class="${className.giftCard}__thumb"></div>
                <div class="${className.giftCard}__desc">
                    <h4 class="${className.giftCard}__tag">${category}</h4>
                    <h3 class="${className.giftCard}__title">${name}</h3>
                </div>
                </a>
            </li>`;
      })
      .join("");

    return `<ul class="${className.giftsList}">${markup}</ul>`;
  }

  random(count) {
    this.#filtered = this.#items = getRandomElements(gifts, count);
    return this;
  }

  select(start, end) {
    this.#filtered = this.#items = gifts.slice(start, end);
    return this;
  }

  filter(category) {
    this.#filtered =
      category.toLocaleLowerCase() === "all"
        ? this.#items
        : this.#items.filter(itm => makeId(itm.category) === makeId(category));

    return this;
  }

  render() {
    this.#container.innerHTML = this.markup;
  }

  get items() {
    return [...this.#filtered];
  }

  get markup() {
    return this.#makeMarkup();
  }
}

import { gifts } from "./gifts-data.js";
import { getRandomElements, makeId } from "./helpers.js";

const className = {
  giftsList: "gifts-list",
  giftCard: "gift-card",
};

export class GiftList {
  #items = [];
  #markup = "";

  #makeMarkup() {
    const markup = this.#items
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
    this.#items = getRandomElements(gifts, count);
    return this;
  }

  select(start, end) {
    this.#items = gifts.slice(start, end);
    return this;
  }

  filter(category) {
    this.#items.filter(itm => makeId(itm.category) === makeId(category));
    return this;
  }

  get items() {
    return [...this.#items];
  }

  get markup() {
    return this.#makeMarkup();
  }
}

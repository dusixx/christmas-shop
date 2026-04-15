import iconsUrl from "../../../images/icons.svg?url";
import { elementExpected, joinClasses, makeId } from "../../utils/helpers.js";

export const cls = {
  giftList: "gift-list",
  giftCard: "gift-card",
  giftCardDetailed: "gift-card--detailed",
  giftCardInteractive: "gift-card--interactive",
  giftSuperpowers: "gift-superpowers",
};

const makeSuperpowerIcons = points => {
  const totalCount = 5;
  let activeCount = parseInt(points) / 100;
  const activeStyle = `style="fill: var(--color-primary)"`;

  const markup = Array.from({ length: totalCount }, _ => {
    return ` 
        <li class="${cls.giftSuperpowers}__icon">
            <svg><use href="${iconsUrl}#icon-snowflake" ${
              --activeCount >= 0 ? activeStyle : ``
            }></use></svg>
        </li>
    `;
  }).join("");

  return `<ul class=${cls.giftSuperpowers}__icons>${markup}</ul>`;
};

const makeSuperpowerList = superpowers => {
  const markup = Object.entries(superpowers)
    .map(([name, points]) => {
      return `
        <li class="${cls.giftSuperpowers}__item">
            <p class="${cls.giftSuperpowers}__name">${name}</p>
            <div class="${cls.giftSuperpowers}__value">
                <p class="${cls.giftSuperpowers}__points">${points}</p>
                ${makeSuperpowerIcons(points)}
            </div>
        </li>
      `;
    })
    .join("");

  return `<ul class=${cls.giftSuperpowers}__list>${markup}</ul>`;
};

export const makeGiftCard = (
  { name, category, description, superpowers } = {},
  interactive = true,
  extraClasses = "",
) => {
  const classList = joinClasses(
    cls.giftCard,
    interactive && `${cls.giftCard}--interactive`,
    category && `${cls.giftCard}--${makeId(category)}`,
    ...extraClasses.split(/\s+/),
  );
  const desc = description ? `<p class="${cls.giftCard}__description">${description}</p>` : ``;
  const superpow = superpowers
    ? `
        <div class="${cls.giftSuperpowers}">
            <h4 class=${cls.giftSuperpowers}__title>Adds superpowers to:</h4>
            ${makeSuperpowerList(superpowers)}
        </div>`
    : ``;

  return `
    <article class="${classList}" id="${makeId(name)}">
        <div class="${cls.giftCard}__thumb"></div>
        <div class="${cls.giftCard}__desc">
            <div class="${cls.giftCard}__heading">
                <h4 class="${cls.giftCard}__tag">${category}</h4>
                <h3 class="${cls.giftCard}__title">${name}</h3>
                ${desc}
            </div>
            ${superpow}
        </div>
    </article>`;
};

export const makeDetailedGiftCard = cardData => {
  return makeGiftCard(cardData, false, cls.giftCardDetailed);
};

export const makeGiftList = items => {
  elementExpected(items, "array");

  const markup = items
    .map(
      ({ name, category }) =>
        `<li class="${cls.giftList}__item">${makeGiftCard({ name, category })}</li>`,
    )
    .join("");

  return `<ul class="${cls.giftList}">${markup}</ul>`;
};

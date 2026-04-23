import { ClassName, elementExpected, joinClasses, makeId } from "../../common";
import iconsUrl from "../../images/icons.svg";

const makeSuperpowerIcons = points => {
  const totalCount = 5;
  let activeCount = parseInt(points) / 100;
  const activeStyle = `style="fill: var(--color-primary)"`;

  const markup = Array.from({ length: totalCount }, _ => {
    return ` 
        <li class="${ClassName.GiftSuperpowers}__icon">
            <svg><use href="${iconsUrl}#icon-snowflake" ${
              --activeCount >= 0 ? activeStyle : ``
            }></use></svg>
        </li>
    `;
  }).join("");

  return `<ul class=${ClassName.GiftSuperpowers}__icons>${markup}</ul>`;
};

const makeSuperpowerList = superpowers => {
  const markup = Object.entries(superpowers)
    .map(([name, points]) => {
      return `
        <li class="${ClassName.GiftSuperpowers}__item">
            <p class="${ClassName.GiftSuperpowers}__name">${name}</p>
            <div class="${ClassName.GiftSuperpowers}__value">
                <p class="${ClassName.GiftSuperpowers}__points">${points}</p>
                ${makeSuperpowerIcons(points)}
            </div>
        </li>
      `;
    })
    .join("");

  return `<ul class=${ClassName.GiftSuperpowers}__list>${markup}</ul>`;
};

export const makeGiftCard = (
  { name, category, description, superpowers } = {},
  interactive = true,
  extraClasses = "",
) => {
  const classList = joinClasses(
    ClassName.GiftCard,
    interactive && `${ClassName.GiftCard}--interactive`,
    category && `${ClassName.GiftCard}--${makeId(category)}`,
    ...extraClasses.split(/\s+/),
  );
  const desc = description
    ? `<p class="${ClassName.GiftCard}__description">${description}</p>`
    : ``;
  const superpow = superpowers
    ? `
        <div class="${ClassName.GiftSuperpowers}">
            <h4 class=${ClassName.GiftSuperpowers}__title>Adds superpowers to:</h4>
            ${makeSuperpowerList(superpowers)}
        </div>`
    : ``;

  return `
    <article class="${classList}" id="${makeId(name)}">
        <div class="${ClassName.GiftCard}__thumb"></div>
        <div class="${ClassName.GiftCard}__desc">
            <div class="${ClassName.GiftCard}__heading">
                <h4 class="${ClassName.GiftCard}__tag">${category}</h4>
                <h3 class="${ClassName.GiftCard}__title">${name}</h3>
                ${desc}
            </div>
            ${superpow}
        </div>
    </article>`;
};

export const makeDetailedGiftCard = cardData => {
  return makeGiftCard(cardData, false, ClassName.GiftCardDetailed);
};

export const makeGiftList = items => {
  elementExpected(items, "array");

  const markup = items
    .map(
      ({ name, category }) =>
        `<li class="${ClassName.GiftList}__item">${makeGiftCard({ name, category })}</li>`,
    )
    .join("");

  return `<ul class="${ClassName.GiftList}">${markup}</ul>`;
};

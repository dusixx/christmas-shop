import "./utils/burger-menu.js";
import { GiftList } from "./utils/gift-list/gift-list.js";
import { Modal } from "./utils/modal/modal.js";
import { makeGiftCardWithDeatils } from "./utils/gift-list/markup.js";

const giftList = new GiftList();
const modal = new Modal();

giftList.random(4).render();

giftList.onClick = cardData => {
  modal.show({ content: makeGiftCardWithDeatils(cardData) });
};

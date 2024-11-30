import "./utils/burger-menu.js";
import { GiftList } from "./utils/gift-list/gift-list.js";
import { Modal } from "./utils/modal/modal.js";
import { CategoryTabs } from "./utils/category-tabs.js";
import { makeGiftCardWithDeatils } from "./utils/gift-list/markup.js";

const giftList = new GiftList();
const modal = new Modal();
const tabs = new CategoryTabs();

giftList.random().render();

giftList.onClick = cardData => {
  modal.show({ content: makeGiftCardWithDeatils(cardData) });
};

tabs.onChange = value => {
  giftList.filter(value).render();
};

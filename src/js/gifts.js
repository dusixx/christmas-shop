import { BurgerMenu, Modal, GiftList, makeDetailedGiftCard } from "./common.js";
import { CategoryTabs } from "./components/category-tabs.js";
import { Backtop } from "./components/backtop.js";

const modal = new Modal({
  hideOnEscape: true,
  hideOnBackdropClick: true,
});

const giftList = new GiftList({
  onClick(cardData) {
    modal.show({ content: makeDetailedGiftCard(cardData) });
  },
})
  .random()
  .render();

new Backtop({
  threshold: 300,
  pollingTimeout: 150,
});

new CategoryTabs({
  onChange(value) {
    giftList.filter(value).render();
  },
});

import { GiftList, makeDetailedGiftCard, Modal } from "./common.js";
import { Backtop } from "./components/backtop.js";
import { CategoryTabs } from "./components/category-tabs.js";

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

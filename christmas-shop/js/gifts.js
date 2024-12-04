import { Modal, CategoryTabs, GiftList, makeDetailedGiftCard, Backtop } from "./utils/index.js";

const modal = new Modal();

GiftList.init({
  onClick(cardData) {
    modal.show({ content: makeDetailedGiftCard(cardData) });
  },
})
  .random()
  .render();

Backtop.init({
  threshold: 300,
  pollingTimeout: 150,
});

CategoryTabs.init({
  onChange(value) {
    GiftList.filter(value).render();
  },
});

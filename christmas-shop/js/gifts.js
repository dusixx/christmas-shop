import { Modal, CategoryTabs, GiftList, makeGiftCardWithDetails, Backtop } from "./utils/index.js";

const modal = new Modal();

const giftList = new GiftList({
  onClick(cardData) {
    modal.show({ content: makeGiftCardWithDetails(cardData) });
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

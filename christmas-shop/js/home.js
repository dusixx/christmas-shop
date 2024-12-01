import { Modal, GiftList, makeGiftCardWithDetails } from "./utils/index.js";

const modal = new Modal();

new GiftList({
  onClick(cardData) {
    modal.show({ content: makeGiftCardWithDetails(cardData) });
  },
})
  .random(4)
  .render();

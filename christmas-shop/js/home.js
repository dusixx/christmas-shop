import { Modal, GiftList, makeGiftCardWithDetails, Timer } from "./utils/index.js";

const modal = new Modal();

new GiftList({
  onClick(cardData) {
    modal.show({ content: makeGiftCardWithDetails(cardData) });
  },
})
  .random(4)
  .render();

new Timer({
  futureDate: "01-01-2025 UTC+0",
}).start();

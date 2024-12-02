import { Modal, GiftList, makeDetailedGiftCard, Timer, Slider } from "./utils/index.js";

const modal = new Modal();

new GiftList({
  onClick(cardData) {
    modal.show({ content: makeDetailedGiftCard(cardData) });
  },
})
  .random(4)
  .render();

Slider.init({
  pollingTimeout: 150,
});

new Timer({
  futureDate: "01-01-2025 UTC+0",
}).start();

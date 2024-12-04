import { Modal, GiftList, makeDetailedGiftCard, Timer, Slider } from "./utils/index.js";

const modal = new Modal();

GiftList.init({
  onClick(cardData) {
    modal.show({ content: makeDetailedGiftCard(cardData) });
  },
})
  .random(4)
  .render();

Slider.init({
  pollingTimeout: 150,
});

Timer.init({
  futureDate: "01-01-2025 UTC+0",
}).start();

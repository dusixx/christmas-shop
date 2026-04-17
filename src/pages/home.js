import { GiftList, makeDetailedGiftCard, Modal, Slider, Timer } from "../components/index.js";

const modal = new Modal({
  hideOnEscape: true,
  hideOnBackdropClick: true,
});

new GiftList({
  onClick(cardData) {
    modal.show({ content: makeDetailedGiftCard(cardData) });
  },
})
  .random(4)
  .render();

new Slider({
  pollingTimeout: 150,
});

new Timer({
  futureDate: "2025 UTC+0",
}).start();

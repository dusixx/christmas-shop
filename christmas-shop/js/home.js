import { BurgerMenu, Modal, GiftList } from "./common.js";
import { Slider } from "./components/slider/slider.js";
import { Timer } from "./components/timer.js";
import { makeDetailedGiftCard } from "./components/gift-list/markup.js";

const modal = new Modal();

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

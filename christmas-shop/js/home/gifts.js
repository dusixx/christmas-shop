import { refs } from "../common/refs.js";
import { GiftList } from "../common/gift-list.js";

const { bestGiftsContainer } = refs;
const list = new GiftList();

bestGiftsContainer.insertAdjacentHTML("beforeend", list.random(4).markup);

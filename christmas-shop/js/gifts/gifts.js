import { refs } from "../common/refs.js";
import { GiftList } from "../common/gift-list.js";

const { giftsContainer } = refs;
const list = new GiftList();

giftsContainer.insertAdjacentHTML("beforeend", list.random().markup);

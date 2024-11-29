import { refs } from "../common/refs.js";
import { GiftList } from "../common/gift-list.js";

const list = new GiftList();

list.random().render();

refs.categoryInput.forEach(itm =>
  itm.addEventListener("change", ({ target: { value } }) => {
    list.filter(value).render();
  }),
);

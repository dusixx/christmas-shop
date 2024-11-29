const burgerMenu = document.querySelector(".burger-menu");
const gifts = document.querySelector(".gifts");
const category = gifts?.querySelector(".category");

export const refs = {
  burgerMenu,
  body: document.querySelector("body"),
  header: document.querySelector(".header"),
  burgerBtn: document.querySelector(".burger-btn"),
  menuItem: burgerMenu?.querySelectorAll(".site-nav__link"),
  categoryInput: category?.querySelectorAll(".category__input"),
  giftsListContainer: document.querySelector(".gifts-list__container"),
};

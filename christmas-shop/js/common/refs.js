const burgerMenu = document.querySelector(".burger-menu");

export const refs = {
  burgerMenu,
  body: document.querySelector("body"),
  header: document.querySelector(".header"),
  burgerBtn: document.querySelector(".burger-btn"),
  menuItem: burgerMenu.querySelectorAll(".site-nav__link"),
  bestGiftsContainer: document.querySelector(".best-gifts__container"),
  giftsContainer: document.querySelector(".gifts__container"),
};

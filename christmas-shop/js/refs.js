const burgerMenu = document.querySelector(".burger-menu");

export const refs = {
  body: document.querySelector("body"),
  header: document.querySelector(".header"),
  burgerBtn: document.querySelector(".burger-btn"),
  menuItem: burgerMenu.querySelectorAll(".site-nav__link"),
  burgerMenu,
};

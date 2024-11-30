const burgerMenu = document.querySelector(".burger-menu");
const gifts = document.querySelector(".gifts");
const giftListContainer = document.querySelector(".gifts-container");
const root = document.querySelector(":root");
const backdrop = document.querySelector(".backdrop");
const modal = backdrop?.querySelector(".modal");
const modalContent = modal?.querySelector(".modal__content");

export const refs = {
  root,
  burgerMenu,
  giftListContainer,
  backdrop,
  modal,
  modalContent,
  body: document.querySelector("body"),
  header: document.querySelector(".header"),
  burgerBtn: document.querySelector(".burger-btn"),
  menuItem: burgerMenu?.querySelectorAll(".site-nav__link"),
  modal: backdrop?.querySelector(".modal"),
  siteNav: document.querySelector(".site-nav"),
};

import { ClassName } from "../../common";

export const refs = {
  header: document.querySelector(`.${ClassName.Header}`),
  siteNav: document.querySelector(`.${ClassName.SiteNav}`),
  burgerBtn: document.querySelector(`.${ClassName.BurgerBtn}`),
  burgerMenu: document.querySelector(`.${ClassName.BurgerMenu}`),
};

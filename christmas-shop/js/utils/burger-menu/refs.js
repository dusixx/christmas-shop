export const cls = {
  header: "header",
  siteNav: "site-nav",
  siteNavLink: "site-nav__link",
  burgerMenu: "burger-menu",
  burgerBtn: "burger-btn",
  burgerMenuActive: "burger-menu--active",
  burgerBtnActive: "burger-btn--active",
};

export const refs = {
  header: document.querySelector(`.${cls.header}`),
  siteNav: document.querySelector(`.${cls.siteNav}`),
  burgerBtn: document.querySelector(`.${cls.burgerBtn}`),
  burgerMenu: document.querySelector(`.${cls.burgerMenu}`),
};

import { Scroll, elementExpected, wasKeyDown } from "./index.js";

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

const { header, siteNav, burgerBtn, burgerMenu } = refs;
const matchMediaTablet = matchMedia(`(width > 768px)`);

export class BurgerMenu {
  static #instance;
  #opts;

  constructor(opts) {
    if (BurgerMenu.#instance) {
      return BurgerMenu.#instance;
    }
    BurgerMenu.#instance = this;

    elementExpected(siteNav, "nav");
    elementExpected(burgerMenu, "aside");

    // grab site-nav markup
    burgerMenu.innerHTML = `<nav class="site-nav">${siteNav.innerHTML}</nav>`;
    const menuItem = burgerMenu.querySelectorAll(`.${cls.siteNavLink}`);

    elementExpected(menuItem, "NodeList");
    menuItem.forEach(itm => itm.addEventListener("click", () => this.toggle()));

    this.#opts = opts;
    this.toggler = opts?.toggler;
  }

  set toggler(obj) {
    try {
      obj.addEventListener("click", () => this.toggle());
    } catch {}
  }

  #toggleMenu = () => {
    // calc menu top
    burgerMenu.style.paddingBottom = burgerMenu.style.top = getComputedStyle(header).height;
    burgerBtn.classList.toggle(cls.burgerBtnActive);
    return burgerMenu.classList.toggle(cls.burgerMenuActive);
  };

  #handleEscKeydown = e => {
    if (wasKeyDown("Escape", e)) this.toggle();
  };

  #handleMatchMedia = e => {
    if (e.matches) this.toggle();
  };

  toggle() {
    Scroll.toggleLock();
    const wasShown = this.#toggleMenu();

    if (wasShown) {
      if (this.#opts?.hideOnEscape) {
        document.addEventListener("keydown", this.#handleEscKeydown, { once: true });
      }
      // hide at screen width > 768px
      matchMediaTablet.addEventListener("change", this.#handleMatchMedia, { once: true });
    } else {
      matchMediaTablet.removeEventListener("change", this.#handleMatchMedia);
      document.removeEventListener("keydown", this.#handleEscKeydown);
    }
    return wasShown;
  }
}

new BurgerMenu({
  toggler: burgerBtn,
  hideOnEscape: true,
});

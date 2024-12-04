import { Scroll, elementExpected, wasKeyDown } from "../index.js";
import { refs, cls } from "./refs.js";

const { header, siteNav, burgerBtn, burgerMenu } = refs;
const matchMediaTablet = matchMedia(`(width > 768px)`);

export class BurgerMenu {
  static #instance;
  #toggler;
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
    const menuItem = burgerMenu.querySelectorAll(`.${cls.siteNavItem}`);
    elementExpected(menuItem, "NodeList");

    // close menu on item click
    menuItem.forEach(itm =>
      itm.addEventListener("click", () => {
        this.toggle();
      }),
    );

    this.#opts = opts;
    this.toggler = opts?.toggler;
  }

  set toggler(obj) {
    obj?.addEventListener?.("click", this.#handleTogglerClick);

    if (obj == null || obj instanceof EventTarget) {
      this.#toggler?.removeEventListener?.("click", this.#handleTogglerClick);
      this.#toggler = obj;
    }
  }

  #handleTogglerClick = () => this.toggle();
  #handleEscKeydown = e => wasKeyDown("Escape", e) && this.toggle();
  #handleMatchMedia = e => e.matches && this.toggle();

  #calcBurgerMenuIndets = () => {
    burgerMenu.style.paddingBottom = burgerMenu.style.top = getComputedStyle(header).height;
  };

  #toggleMenu = () => {
    this.#calcBurgerMenuIndets();
    burgerBtn.classList.toggle(cls.burgerBtnActive);

    return burgerMenu.classList.toggle(cls.burgerMenuActive);
  };

  toggle() {
    Scroll.toggleLock({ toTop: true });
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

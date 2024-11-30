import { wasKeyDown } from "./helpers.js";
import { refs } from "./refs.js";
import { Scroll } from "./scroll-lock.js";

const { header, body, burgerMenu, menuItem, burgerBtn, siteNav } = refs;
const matchMediaTablet = matchMedia(`(width > 768px)`);

//burgerMenu.innerHTML = `<nav class="site-nav">${siteNav.innerHTML}</nav>`;
//const menuItem = burgerMenu?.querySelectorAll(".site-nav__link");

const _toggleMenu = () => {
  // calc menu top
  burgerMenu.style.paddingBottom = burgerMenu.style.top = getComputedStyle(header).height;
  burgerBtn.classList.toggle("burger-btn--active");

  return burgerMenu.classList.toggle("burger-menu--active");
};

const handleEscKeydown = e => {
  return wasKeyDown("Escape", e) && toggleMenu();
};

const handleMatchMedia = e => {
  if (e.matches) toggleMenu();
};

const toggleMenu = force => {
  Scroll.toggleLock();
  const wasShown = _toggleMenu();

  if (wasShown) {
    document.addEventListener("keydown", handleEscKeydown, { once: true });
    matchMediaTablet.addEventListener("change", handleMatchMedia, { once: true });
  } else {
    matchMediaTablet.removeEventListener("change", handleMatchMedia);
    document.removeEventListener("keydown", handleEscKeydown);
  }
  return wasShown;
};

burgerBtn.addEventListener("click", toggleMenu);
menuItem.forEach(itm => itm.addEventListener("click", toggleMenu));

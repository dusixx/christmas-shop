import { wasKeyDown } from "./helpers.js";
import { refs } from "./refs.js";

const { header, body, burgerMenu, menuItem, burgerBtn } = refs;
const matchMediaTablet = matchMedia(`(width > 768px)`);

const toggleBodyVScroll = () => {
  return body.classList.toggle("scroll-off");
};

const calcMenuTop = () => {
  return (burgerMenu.style.top = getComputedStyle(header).height);
};

const showMenu = () => {
  burgerBtn.classList.toggle("burger-btn--active");
  return burgerMenu.classList.toggle("burger-menu--active");
};

const handleEscKeydown = e => {
  return wasKeyDown("Escape", e) && toggleMenu();
};

const handleMatchMedia = e => {
  return e.matches && toggleMenu();
};

const toggleMenu = () => {
  calcMenuTop();
  toggleBodyVScroll();

  // was shown
  if (showMenu()) {
    document.addEventListener("keydown", handleEscKeydown, { once: true });
    matchMediaTablet.addEventListener("change", handleMatchMedia, { once: true });
    menuItem.forEach(itm => itm.addEventListener("click", toggleMenu, { once: true }));
    return true;
  } else {
    matchMediaTablet.removeEventListener("change", handleMatchMedia);
  }
};

burgerBtn.addEventListener("click", toggleMenu);

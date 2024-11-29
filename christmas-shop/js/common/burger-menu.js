import { wasKeyDown } from "./helpers.js";
import { refs } from "./refs.js";

const { header, body, burgerMenu, menuItem, burgerBtn } = refs;
const matchMediaTablet = matchMedia(`(width > 768px)`);

const toggleBodyVScroll = () => {
  return body.classList.toggle("scroll-off");
};

const showMenu = () => {
  // calc menu top
  burgerMenu.style.top = getComputedStyle(header).height;
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
  toggleBodyVScroll();
  const wasShown = showMenu();

  if (wasShown) {
    document.addEventListener("keydown", handleEscKeydown, { once: true });
    matchMediaTablet.addEventListener("change", handleMatchMedia, { once: true });
    menuItem.forEach(itm => itm.addEventListener("click", toggleMenu, { once: true }));
  } else {
    matchMediaTablet.removeEventListener("change", handleMatchMedia);
  }
  return wasShown;
};

burgerBtn.addEventListener("click", toggleMenu);

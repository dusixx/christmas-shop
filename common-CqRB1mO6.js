//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/js/utils/helpers.js
document.documentElement;
var toStr = Object.prototype.toString;
var lower = (v) => v?.toLocaleLowerCase?.() ?? v;
var isFunc = (v) => typeof v === "function";
var isStr = (v) => typeof v === "string";
var isTagEqual = (el, tag) => lower(el?.tagName) === lower(tag);
var getTypeName = (v) => toStr.call(v).slice(8, -1);
var makeId = (name) => lower(`${name}`.trim().replace(/\s+/g, "-"));
var wasKeyDown = (key, e) => {
	return e.key === key && !e.ctrlKey && !e.altKey && !e.shiftKey;
};
var elementExpected = (el, tag) => {
	if (!isTagEqual(el, tag) && lower(getTypeName(el)) !== lower(tag)) throw TypeError(`'${tag}' element expected`);
};
var rndInt = (min, max) => {
	return Math.floor(min + Math.random() * (max + 1 - min));
};
var getRandomElements = (arr, count = arr?.length) => {
	elementExpected(arr, "array");
	const a = [...arr];
	return Array.from({ length: Math.min(count, a.length) }, () => a.splice(rndInt(0, a.length - 1), 1)[0]);
};
var joinClasses = (...args) => {
	return args.map((v) => isStr(v) ? v.trim() : ``).filter((v) => v).join(" ");
};
function throttle(target, tio) {
	elementExpected(target, "function");
	let timerId;
	let lastArgs;
	let lastCtx;
	function throttled(...args) {
		if (timerId) {
			lastArgs = args;
			lastCtx = this;
			return;
		}
		target.apply(this, args);
		timerId = setTimeout(() => {
			timerId = 0;
			if (lastArgs) {
				throttled.apply(lastCtx, lastArgs);
				lastArgs = lastCtx = null;
			}
		}, tio);
	}
	return throttled;
}
var msToDHMS = (ms) => {
	const secs = ms / 1e3;
	return {
		secs: Math.floor(secs % 60),
		mins: Math.floor(secs / 60 % 60),
		hours: Math.floor(secs / 3600 % 24),
		days: Math.floor(secs / 3600 / 24)
	};
};
//#endregion
//#region src/js/utils/scroll-lock.js
var root$1 = document.documentElement;
var Scroll = class {
	static #locked;
	static #rootCss;
	static toTop() {
		scrollTo({ top: 0 });
	}
	static toggleLock({ toTop } = {}) {
		if (!this.#locked) {
			if (toTop) this.toTop();
			this.#rootCss = root$1.style.cssText;
			root$1.style.cssText = `overflow: hidden; scrollbar-gutter: stable;`;
		} else {
			root$1.style.cssText = this.#rootCss;
			this.#rootCss = null;
		}
		this.#locked = !this.#locked;
	}
};
//#endregion
//#region src/js/components/burger-menu/refs.js
var cls$3 = {
	header: "header",
	siteNav: "site-nav",
	siteNavItem: "site-nav__item",
	siteNavLink: "site-nav__link",
	burgerMenu: "burger-menu",
	burgerBtn: "burger-btn",
	burgerMenuActive: "burger-menu--active",
	burgerBtnActive: "burger-btn--active"
};
//#endregion
//#region src/js/components/burger-menu/burger-menu.js
var { header, siteNav, burgerBtn, burgerMenu } = {
	header: document.querySelector(`.${cls$3.header}`),
	siteNav: document.querySelector(`.${cls$3.siteNav}`),
	burgerBtn: document.querySelector(`.${cls$3.burgerBtn}`),
	burgerMenu: document.querySelector(`.${cls$3.burgerMenu}`)
};
var matchMediaTablet = matchMedia(`(width > 768px)`);
new class BurgerMenu {
	static #instance;
	#toggler;
	#opts;
	constructor(opts) {
		if (BurgerMenu.#instance) return BurgerMenu.#instance;
		BurgerMenu.#instance = this;
		burgerMenu.innerHTML = siteNav.outerHTML;
		const menuItem = burgerMenu.querySelectorAll(`.${cls$3.siteNavItem}`);
		elementExpected(menuItem, "NodeList");
		menuItem.forEach((itm) => itm.addEventListener("click", () => {
			this.toggle();
		}));
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
	#handleEscKeydown = (e) => wasKeyDown("Escape", e) && this.toggle();
	#handleMatchMedia = (e) => e.matches && this.toggle();
	#calcBurgerMenuIndets = () => {
		burgerMenu.style.paddingBottom = burgerMenu.style.top = getComputedStyle(header).height;
	};
	#toggleMenu = () => {
		this.#calcBurgerMenuIndets();
		burgerBtn.classList.toggle(cls$3.burgerBtnActive);
		return burgerMenu.classList.toggle(cls$3.burgerMenuActive);
	};
	toggle() {
		Scroll.toggleLock({ toTop: true });
		const wasShown = this.#toggleMenu();
		if (wasShown) {
			if (this.#opts?.hideOnEscape) document.addEventListener("keydown", this.#handleEscKeydown, { once: true });
			matchMediaTablet.addEventListener("change", this.#handleMatchMedia, { once: true });
		} else {
			matchMediaTablet.removeEventListener("change", this.#handleMatchMedia);
			document.removeEventListener("keydown", this.#handleEscKeydown);
		}
		return wasShown;
	}
}({
	toggler: burgerBtn,
	hideOnEscape: true
});
//#endregion
//#region src/js/components/modal/refs.js
var cls$2 = {
	backdrop: "backdrop",
	backdropActive: "backdrop--active",
	modal: "modal",
	modalContent: "modal__content",
	modalCloseBtn: "modal__close-btn"
};
var root = document.documentElement;
var backdrop = document.querySelector(`.${cls$2.backdrop}`);
var modal = backdrop?.querySelector(`.${cls$2.modal}`);
var refs = {
	root,
	backdrop,
	modal,
	modalContent: modal?.querySelector(`.${cls$2.modalContent}`),
	modalCloseBtn: modal?.querySelector(`.${cls$2.modalCloseBtn}`)
};
//#endregion
//#region src/js/components/modal/backdrop.js
var Backdrop = class Backdrop {
	static #instance;
	#ref;
	#onHide;
	#onShow;
	#hideOnEscape;
	constructor({ hideOnEscape, hideOnClick } = {}) {
		if (Backdrop.#instance) return Backdrop.#instance;
		Backdrop.#instance = this;
		this.#ref = refs.backdrop;
		this.#hideOnEscape = hideOnEscape;
		if (hideOnClick) this.#ref.addEventListener("click", (e) => {
			if (e.target !== e.currentTarget) return;
			this.toggle(e);
		});
	}
	#handleEscKeydown = (e) => {
		if (wasKeyDown("Escape", e)) this.toggle();
	};
	toggle() {
		Scroll.toggleLock();
		const wasShown = this.ref.classList.toggle(cls$2.backdropActive);
		if (wasShown) {
			if (this.#hideOnEscape) document.addEventListener("keydown", this.#handleEscKeydown, { once: true });
			this.#onShow?.();
		} else {
			document.removeEventListener("keydown", this.#handleEscKeydown);
			this.#onHide?.();
		}
		return wasShown;
	}
	set onHide(handler) {
		this.#onHide = handler;
	}
	set onShow(handler) {
		this.#onShow = handler;
	}
	get ref() {
		return this.#ref;
	}
};
//#endregion
//#region src/js/components/modal/modal.js
var TOP_OFFSET = "1px";
var Modal = class Modal {
	static #instance;
	#ref;
	#contentRef;
	#content;
	#backdrop;
	constructor({ hideOnBackdropClick: hideOnClick, hideOnEscape } = {}) {
		if (Modal.#instance) return Modal.#instance;
		Modal.#instance = this;
		this.#backdrop = new Backdrop({
			hideOnEscape,
			hideOnClick
		});
		this.#ref = refs.modal;
		this.#contentRef = refs.modalContent;
		refs.modalCloseBtn.addEventListener("click", () => this.#backdrop.toggle());
	}
	show({ content } = {}) {
		this.content = content ?? this.content;
		this.#backdrop.toggle();
	}
	set content(markup) {
		this.#contentRef.innerHTML = this.#content = markup;
		this.ref.style.top = refs.root.clientHeight <= this.height ? TOP_OFFSET : null;
		matchMedia(`(height <= ${this.height}px)`).addEventListener("change", (e) => {
			this.ref.style.top = e?.matches ? TOP_OFFSET : null;
		});
	}
	get height() {
		return parseInt(getComputedStyle(this.ref).height);
	}
	get ref() {
		return this.#ref;
	}
};
//#endregion
//#region src/data/gifts-data.js
var giftsData = [
	{
		name: "Bug Magnet",
		description: "Able to find bugs in code like they were placed there on purpose.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+200",
			dream: "+400"
		}
	},
	{
		name: "Console.log Guru",
		description: "Uses console.log like a crystal ball to find any issue.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+200",
			dream: "+400"
		}
	},
	{
		name: "Shortcut Cheater",
		description: "Knows every keyboard shortcut like they were born with them.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+400",
			dream: "+200"
		}
	},
	{
		name: "Merge Master",
		description: "Merges branches in Git without conflicts, like a wizard during an exam.",
		category: "For Work",
		superpowers: {
			live: "+200",
			create: "+500",
			love: "+200",
			dream: "+300"
		}
	},
	{
		name: "Async Tamer",
		description: "Handles asynchronous code and promises like well-trained pets.",
		category: "For Work",
		superpowers: {
			live: "+100",
			create: "+400",
			love: "+200",
			dream: "+300"
		}
	},
	{
		name: "CSS Tamer",
		description: "Can make Flexbox and Grid work together like they were always best friends.",
		category: "For Work",
		superpowers: {
			live: "+200",
			create: "+500",
			love: "+200",
			dream: "+300"
		}
	},
	{
		name: "Time Hacker",
		description: "Writes code at the last moment but always meets the deadline.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+500",
			dream: "+200"
		}
	},
	{
		name: "Layout Master",
		description: "Creates perfect layouts on the first try, like they can read the designer's mind.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+300",
			love: "+200",
			dream: "+200"
		}
	},
	{
		name: "Documentation Whisperer",
		description: "Understands cryptic documentation as if they wrote it themselves.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+200",
			dream: "+100"
		}
	},
	{
		name: "Feedback Master",
		description: "Accepts client revisions with the Zen calm of Buddha.",
		category: "For Work",
		superpowers: {
			live: "+300",
			create: "+500",
			love: "+300",
			dream: "+400"
		}
	},
	{
		name: "Code Minimalist",
		description: "Writes code so concise that one line does more than a whole file.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+500",
			dream: "+200"
		}
	},
	{
		name: "Pixel-Perfect Magician",
		description: "Aligns elements to the last pixel, even when the design looks abstract.",
		category: "For Work",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+400",
			dream: "+400"
		}
	},
	{
		name: "Posture Levitation",
		description: "Can sit for hours, but maintains perfect posture like a ballerina.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+500",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Step Master",
		description: "Gets 10,000 steps a day even while sitting at the computer.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+300",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Snack Resister",
		description: "Ignoring desktop snacks like a strict dietician.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+100",
			love: "+200",
			dream: "+400"
		}
	},
	{
		name: "Hydration Bot",
		description: "Drinks the recommended 2 liters of water a day like a health-programmed robot.",
		category: "For Health",
		superpowers: {
			live: "+500",
			create: "+300",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Sleep Overlord",
		description: "Sleeps 6 hours but feels like they had 10.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+500",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Break Guru",
		description: "Takes a stretch break every hour without forgetting, no matter how focused.",
		category: "For Health",
		superpowers: {
			live: "+300",
			create: "+300",
			love: "+300",
			dream: "+400"
		}
	},
	{
		name: "Eye Protector",
		description: "Can work all day at the monitor without feeling like their eyes are on fire.",
		category: "For Health",
		superpowers: {
			live: "+100",
			create: "+300",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Stress Dodger",
		description: "Masters meditation right at the keyboard.",
		category: "For Health",
		superpowers: {
			live: "+100",
			create: "+400",
			love: "+200",
			dream: "+400"
		}
	},
	{
		name: "Yoga Coder",
		description: "Easily switches from coding to yoga and back.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+400",
			love: "+400",
			dream: "+400"
		}
	},
	{
		name: "Healthy Snacker",
		description: "Always picks fruit, even when chocolate is within arm’s reach.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+300",
			love: "+200",
			dream: "+400"
		}
	},
	{
		name: "Chair Exerciser",
		description: "Manages to work out without leaving the chair.",
		category: "For Health",
		superpowers: {
			live: "+500",
			create: "+500",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Caffeine Filter",
		description: "Drinks coffee at night and still falls asleep with no problem.",
		category: "For Health",
		superpowers: {
			live: "+400",
			create: "+300",
			love: "+500",
			dream: "+200"
		}
	},
	{
		name: "Joy Charger",
		description: "Finds joy in the little things—even in a build that finishes unexpectedly fast.",
		category: "For Harmony",
		superpowers: {
			live: "+200",
			create: "+200",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Error Laugher",
		description: "Laughs at code errors like they’re jokes instead of getting angry.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Bug Acceptance Guru",
		description: "Accepts bugs as part of the journey to perfection — it’s just another task.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Spontaneous Coding Philosopher",
		description: "Philosophically accepts any client suggestion after a long refactor.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+500",
			dream: "+400"
		}
	},
	{
		name: "Deadline Sage",
		description: "Remains zen even when the deadline is close and the project manager is stressed.",
		category: "For Harmony",
		superpowers: {
			live: "+200",
			create: "+200",
			love: "+300",
			dream: "+500"
		}
	},
	{
		name: "Inspiration Maestro",
		description: "Finds inspiration on an empty screen as if masterpieces are already there.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+400",
			dream: "+100"
		}
	},
	{
		name: "Peace Keeper",
		description: "Maintains inner calm even in moments of intense crisis.",
		category: "For Harmony",
		superpowers: {
			live: "+200",
			create: "+200",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Empathy Guru",
		description: "Feels the team’s mood and can lift everyone’s spirits.",
		category: "For Harmony",
		superpowers: {
			live: "+500",
			create: "+200",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Laughter Generator",
		description: "Can lighten any tense situation with a joke that even bugs laugh at.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+200",
			dream: "+500"
		}
	},
	{
		name: "Pause Master",
		description: "Knows when to just step back from the keyboard and breathe.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+100",
			dream: "+100"
		}
	},
	{
		name: "Coder Healer",
		description: "Can support a colleague in their darkest hour, even if it’s a 500 error.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+500",
			dream: "+500"
		}
	},
	{
		name: "Music Code Curator",
		description: "Creates work playlists so good, even deadlines follow the rhythm.",
		category: "For Harmony",
		superpowers: {
			live: "+300",
			create: "+200",
			love: "+300",
			dream: "+200"
		}
	}
];
//#endregion
//#region src/images/icons.svg?url
var icons_default = "" + new URL("icons-Cv-m8OD5.svg", import.meta.url).href;
//#endregion
//#region src/js/components/gift-list/markup.js
var cls$1 = {
	giftList: "gift-list",
	giftCard: "gift-card",
	giftCardDetailed: "gift-card--detailed",
	giftCardInteractive: "gift-card--interactive",
	giftSuperpowers: "gift-superpowers"
};
var makeSuperpowerIcons = (points) => {
	const totalCount = 5;
	let activeCount = parseInt(points) / 100;
	const activeStyle = `style="fill: var(--color-primary)"`;
	const markup = Array.from({ length: totalCount }, (_) => {
		return ` 
        <li class="${cls$1.giftSuperpowers}__icon">
            <svg><use href="${icons_default}#icon-snowflake" ${--activeCount >= 0 ? activeStyle : ``}></use></svg>
        </li>
    `;
	}).join("");
	return `<ul class=${cls$1.giftSuperpowers}__icons>${markup}</ul>`;
};
var makeSuperpowerList = (superpowers) => {
	const markup = Object.entries(superpowers).map(([name, points]) => {
		return `
        <li class="${cls$1.giftSuperpowers}__item">
            <p class="${cls$1.giftSuperpowers}__name">${name}</p>
            <div class="${cls$1.giftSuperpowers}__value">
                <p class="${cls$1.giftSuperpowers}__points">${points}</p>
                ${makeSuperpowerIcons(points)}
            </div>
        </li>
      `;
	}).join("");
	return `<ul class=${cls$1.giftSuperpowers}__list>${markup}</ul>`;
};
var makeGiftCard = ({ name, category, description, superpowers } = {}, interactive = true, extraClasses = "") => {
	const classList = joinClasses(cls$1.giftCard, interactive && `${cls$1.giftCard}--interactive`, category && `${cls$1.giftCard}--${makeId(category)}`, ...extraClasses.split(/\s+/));
	const desc = description ? `<p class="${cls$1.giftCard}__description">${description}</p>` : ``;
	const superpow = superpowers ? `
        <div class="${cls$1.giftSuperpowers}">
            <h4 class=${cls$1.giftSuperpowers}__title>Adds superpowers to:</h4>
            ${makeSuperpowerList(superpowers)}
        </div>` : ``;
	return `
    <article class="${classList}" id="${makeId(name)}">
        <div class="${cls$1.giftCard}__thumb"></div>
        <div class="${cls$1.giftCard}__desc">
            <div class="${cls$1.giftCard}__heading">
                <h4 class="${cls$1.giftCard}__tag">${category}</h4>
                <h3 class="${cls$1.giftCard}__title">${name}</h3>
                ${desc}
            </div>
            ${superpow}
        </div>
    </article>`;
};
var makeDetailedGiftCard = (cardData) => {
	return makeGiftCard(cardData, false, cls$1.giftCardDetailed);
};
var makeGiftList = (items) => {
	elementExpected(items, "array");
	const markup = items.map(({ name, category }) => `<li class="${cls$1.giftList}__item">${makeGiftCard({
		name,
		category
	})}</li>`).join("");
	return `<ul class="${cls$1.giftList}">${markup}</ul>`;
};
//#endregion
//#region src/js/components/gift-list/gift-list.js
var cls = {
	...cls$1,
	giftsContainer: "gifts-container"
};
var GiftList = class GiftList {
	static #instance;
	#items = [];
	#filtered = [];
	#container;
	#onClick;
	#ref;
	constructor(opts) {
		if (GiftList.#instance) return GiftList.#instance;
		GiftList.#instance = this;
		this.#container = document.querySelector(`.${cls.giftsContainer}`);
		this.onClick = opts?.onClick;
	}
	#handleGiftListClick({ target }) {
		if (!isFunc(this.#onClick)) return;
		const targetCard = target.closest(`.${cls.giftCard}`);
		if (!targetCard) return;
		const cardData = this.find(targetCard.id);
		this.#onClick(cardData, targetCard);
	}
	set onClick(handler) {
		this.#onClick = handler;
	}
	random(count) {
		this.#filtered = this.#items = getRandomElements(giftsData, count);
		return this;
	}
	filter(category) {
		this.#filtered = makeId(category) === "all" ? this.#items : this.#items.filter((itm) => makeId(itm.category) === makeId(category));
		return this;
	}
	find(id) {
		return this.#filtered.find(({ name }) => makeId(name) === id);
	}
	render() {
		this.#container.innerHTML = makeGiftList(this.#filtered);
		this.#ref = this.#container.querySelector(`.${cls.giftList}`);
		this.#ref.addEventListener("click", this.#handleGiftListClick.bind(this));
		return this;
	}
	get items() {
		return [...this.#items];
	}
	get filtered() {
		return [...this.#filtered];
	}
	get ref() {
		return this.#ref;
	}
};
//#endregion
export { msToDHMS as a, elementExpected as i, makeDetailedGiftCard as n, throttle as o, Modal as r, GiftList as t };

import { i as elementExpected, n as makeDetailedGiftCard, o as throttle, r as Modal, t as GiftList } from "./common-r9ElQSAr.js";
//#region src/js/components/category-tabs.js
var cls$1 = {
	category: "category",
	categoryInput: "category__input"
};
var CategoryTabs = class CategoryTabs {
	static #instance;
	#ref;
	#onChange;
	constructor(opts) {
		if (CategoryTabs.#instance) return CategoryTabs.#instance;
		CategoryTabs.#instance = this;
		this.#ref = document.querySelector(`.${cls$1.category}`);
		const radioBtns = this.ref.querySelectorAll(`.${cls$1.categoryInput}`);
		elementExpected(radioBtns, "NodeList");
		radioBtns.forEach((itm) => itm.addEventListener("change", ({ target: { value } }) => {
			this.#onChange?.(value);
		}));
		this.onChange = opts?.onChange;
	}
	set onChange(handler) {
		this.#onChange = handler;
	}
	get ref() {
		return this.#ref;
	}
};
//#endregion
//#region src/js/components/backtop.js
var cls = {
	backtop: "backtop",
	backtopActive: "backtop--active"
};
var Backtop = class Backtop {
	static #instance;
	#ref;
	#threshold;
	#pollingTimeout;
	#handlePageScroll;
	constructor(opts) {
		if (Backtop.#instance) return Backtop.#instance;
		Backtop.#instance = this;
		this.#ref = document.querySelector(`.${cls.backtop}`);
		this.pollingTimeout = opts?.pollingTimeout;
		this.threshold = opts?.threshold;
	}
	set pollingTimeout(value) {
		this.#pollingTimeout = value;
		document.removeEventListener("scroll", this.#handlePageScroll);
		if (value < 0) return;
		this.#handlePageScroll = throttle(() => {
			this.ref.classList.toggle(cls.backtopActive, scrollY >= this.threshold);
		}, value);
		document.addEventListener("scroll", this.#handlePageScroll);
	}
	get pollingTimeout() {
		return this.#pollingTimeout;
	}
	set threshold(v) {
		this.#threshold = v;
	}
	get threshold() {
		return this.#threshold;
	}
	get ref() {
		return this.#ref;
	}
};
//#endregion
//#region src/js/gifts.js
var modal = new Modal({
	hideOnEscape: true,
	hideOnBackdropClick: true
});
var giftList = new GiftList({ onClick(cardData) {
	modal.show({ content: makeDetailedGiftCard(cardData) });
} }).random().render();
new Backtop({
	threshold: 300,
	pollingTimeout: 150
});
new CategoryTabs({ onChange(value) {
	giftList.filter(value).render();
} });
//#endregion

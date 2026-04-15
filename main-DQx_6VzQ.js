import { a as msToDHMS, i as elementExpected, n as makeDetailedGiftCard, o as throttle, r as Modal, t as GiftList } from "./common-0u9djRDx.js";
//#region src/js/components/slider/refs.js
var cls$1 = {
	slider: "slider",
	sliderTrack: "slider__track",
	sliderContent: "slider__content",
	sliderControls: "slider__controls",
	sliderBtn: "slider__btn"
};
var slider = document.querySelector(`.${cls$1.slider}`);
//#endregion
//#region src/js/components/slider/slider.js
var { track, content, controls, btnLeft, btnRight } = {
	slider,
	btnRight: slider?.querySelector(`.${cls$1.sliderBtn}[data-right]`),
	btnLeft: slider?.querySelector(`.${cls$1.sliderBtn}[data-left]`),
	content: slider?.querySelector(`.${cls$1.sliderContent}`),
	controls: slider?.querySelector(`.${cls$1.sliderControls}`),
	track: slider?.querySelector(`.${cls$1.sliderTrack}`)
};
var TABLET_WIDTH = 768;
var TABLET_PRESSES = 6;
var DESKTOP_PRESSES = 3;
var stepLength;
var extremePosition;
var currentPosition;
var Slider = class Slider {
	static #instance;
	constructor({ pollingTimeout = 250 } = {}) {
		if (Slider.#instance) return Slider.#instance;
		Slider.#instance = this;
		this.update();
		addEventListener("resize", throttle(this.update.bind(this), pollingTimeout));
		controls.addEventListener("click", (e) => {
			const btn = e.target.closest(`.${cls$1.sliderBtn}`);
			if (!btn) return;
			this.#calcParams();
			currentPosition += btn === btnRight ? -1 : 1;
			btnRight.disabled = Math.abs(currentPosition) === extremePosition;
			btnLeft.disabled = currentPosition === 0;
			content.style.transform = `translateX(${stepLength * currentPosition}px)`;
		});
	}
	#calcParams() {
		const contentIndent = parseFloat(getComputedStyle(content).left);
		const visibleArea = parseFloat(getComputedStyle(track).width);
		const distance = content.scrollWidth - visibleArea + contentIndent * 2;
		extremePosition = visibleArea > TABLET_WIDTH ? DESKTOP_PRESSES : TABLET_PRESSES;
		stepLength = distance / extremePosition;
	}
	reset() {
		currentPosition = 0;
		content.style.transform = null;
		btnRight.disabled = false;
		btnLeft.disabled = true;
	}
	update() {
		this.reset();
		this.#calcParams();
	}
};
//#endregion
//#region src/js/utils/countdown.js
var TIMER_PERIOD = 1e3;
var Countdown = class {
	static #timeLeft;
	static #timerId;
	static #onTick;
	static #handleTimeTick = () => {
		if (this.#timeLeft < 0) {
			this.stop();
			return;
		}
		this.#onTick?.(this.#timeLeft);
		this.#timeLeft -= TIMER_PERIOD;
	};
	static start() {
		this.#timerId = setInterval(this.#handleTimeTick, TIMER_PERIOD);
		return this;
	}
	static stop() {
		clearInterval(this.#timerId);
		return this;
	}
	static setFutureDate(...args) {
		const dt = new Date(...args);
		elementExpected(dt, "date");
		if (dt - Date.now() <= 0) throw Error("The date must be in the future");
		this.#timeLeft = dt - Date.now();
		return this;
	}
	static get timeLeft() {
		return this.#timeLeft;
	}
	static set onTick(handler) {
		this.#onTick = handler;
	}
};
//#endregion
//#region src/js/components/timer.js
var cls = {
	timer: "timer",
	timerNumber: "timer__number"
};
var Timer = class Timer {
	static #instance;
	#numRef = {};
	#ref;
	constructor(opts) {
		if (Timer.#instance) return Timer.#instance;
		Timer.#instance = this;
		this.#ref = document.querySelector(`.${cls.timer}`);
		"secs mins hours days".split(" ").forEach((key) => {
			this.numRef[key] = this.ref.querySelector(`.${cls.timerNumber}[data-${key}]`);
		});
		if (opts?.futureDate) this.setFutureDate(opts?.futureDate);
		Countdown.onTick = this.#render.bind(this);
		return this;
	}
	#render(timeLeft) {
		Object.entries(msToDHMS(timeLeft)).forEach(([key, value]) => {
			this.numRef[key].innerText = value;
		});
	}
	start() {
		Countdown.start();
		return this;
	}
	stop() {
		Countdown.stop();
		return this;
	}
	setFutureDate(...args) {
		Countdown.setFutureDate(...args);
		this.#render(Countdown.timeLeft);
		return this;
	}
	get numRef() {
		return this.#numRef;
	}
	get ref() {
		return this.#ref;
	}
};
//#endregion
//#region src/js/home.js
var modal = new Modal({
	hideOnEscape: true,
	hideOnBackdropClick: true
});
new GiftList({ onClick(cardData) {
	modal.show({ content: makeDetailedGiftCard(cardData) });
} }).random(4).render();
new Slider({ pollingTimeout: 150 });
new Timer({ futureDate: "2025 UTC+0" }).start();
//#endregion

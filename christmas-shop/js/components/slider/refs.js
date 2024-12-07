export const cls = {
  slider: "slider",
  sliderTrack: "slider__track",
  sliderContent: "slider__content",
  sliderControls: "slider__controls",
  sliderBtn: "slider__btn",
};

const slider = document.querySelector(`.${cls.slider}`);
const btnRight = slider?.querySelector(`.${cls.sliderBtn}[data-right]`);
const btnLeft = slider?.querySelector(`.${cls.sliderBtn}[data-left]`);
const content = slider?.querySelector(`.${cls.sliderContent}`);
const controls = slider?.querySelector(`.${cls.sliderControls}`);
const track = slider?.querySelector(`.${cls.sliderTrack}`);

export const refs = {
  slider,
  btnRight,
  btnLeft,
  content,
  controls,
  track,
};

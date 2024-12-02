export const cls = {
  slider: "slider",
  sliderContent: "slider__content",
  sliderControls: "slider__controls",
  sliderBtn: "slider__btn",
};

const slider = document.querySelector(`.${cls.slider}`);

export const refs = {
  slider,
  sliderBtnRight: slider?.querySelector(`.${cls.sliderBtn}[control-right]`),
  sliderBtnLeft: slider?.querySelector(`.${cls.sliderBtn}[control-left]`),
  sliderContent: slider?.querySelector(`.${cls.sliderContent}`),
  sliderControls: slider?.querySelector(`.${cls.sliderControls}`),
};

import { ClassName } from "../../common/constants.js";

const slider = document.querySelector(`.${ClassName.Slider}`);

export const refs = {
  slider,
  btnRight: slider?.querySelector(`.${ClassName.SliderBtn}[data-right]`),
  btnLeft: slider?.querySelector(`.${ClassName.SliderBtn}[data-left]`),
  content: slider?.querySelector(`.${ClassName.SliderContent}`),
  controls: slider?.querySelector(`.${ClassName.SliderControls}`),
  track: slider?.querySelector(`.${ClassName.SliderTrack}`),
};

import { ClassName } from "../../common/constants.js";

const root = document.documentElement;
const backdrop = document.querySelector(`.${ClassName.Backdrop}`);
const modal = backdrop?.querySelector(`.${ClassName.Modal}`);
const modalContent = modal?.querySelector(`.${ClassName.ModalContent}`);
const modalCloseBtn = modal?.querySelector(`.${ClassName.ModalCloseBtn}`);

export const refs = {
  root,
  backdrop,
  modal,
  modalContent,
  modalCloseBtn,
};

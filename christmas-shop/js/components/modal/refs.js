export const cls = {
  backdrop: "backdrop",
  backdropActive: "backdrop--active",
  modal: "modal",
  modalContent: "modal__content",
  modalCloseBtn: "modal__close-btn",
};

const root = document.documentElement;
const backdrop = document.querySelector(`.${cls.backdrop}`);
const modal = backdrop?.querySelector(`.${cls.modal}`);
const modalContent = modal?.querySelector(`.${cls.modalContent}`);
const modalCloseBtn = modal?.querySelector(`.${cls.modalCloseBtn}`);

export const refs = {
  root,
  backdrop,
  modal,
  modalContent,
  modalCloseBtn,
};

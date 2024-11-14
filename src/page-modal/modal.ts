import { refresh } from '../app.ts';

export function initModal(app: HTMLDivElement) {
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  app.appendChild(modalContainer);
}

export function getModalContainer(): HTMLDivElement {
  const modalContainer =
    document.querySelector<HTMLDivElement>('.modal-container');
  if (!modalContainer) {
    throw new Error('Error loading Modal Window');
  }

  const modalScreen = document.createElement('div');
  modalScreen.classList.add('modal-screen');
  const modal = document.createElement('div');
  modal.classList.add('modal');
  modalScreen.appendChild(modal);
  modalContainer.appendChild(modalScreen);

  return modal;
}

export function clearModalContainer(): void {
  const modalContainer =
    document.querySelector<HTMLDivElement>('.modal-container');
  if (modalContainer) {
    refresh(modalContainer);
  }
}

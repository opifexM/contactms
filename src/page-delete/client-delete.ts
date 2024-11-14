import { Client, deleteClient } from '../api/client.ts';
import { dashboard } from '../page-dashboard/dashboard.ts';
import { hideLoader, showLoader } from '../page-loader/loader.ts';
import { clearModalContainer } from '../page-modal/modal.ts';

function handleClickCloseModal(event: MouseEvent): void {
  event.preventDefault();
  clearModalContainer();
}

async function handleClickConfirmDeleteContact(
  event: MouseEvent,
  id: string,
): Promise<void> {
  event.preventDefault();
  const errorDiv = document.querySelector('#error');

  showLoader();
  try {
    await deleteClient(id);
    hideLoader();
    clearModalContainer();
    await dashboard();
  } catch (error) {
    hideLoader();
    if (errorDiv) {
      errorDiv.textContent =
        (error as Error).message || 'An unknown error occurred.';
    }
  }
}

export function createTitle(client: Client): HTMLDivElement {
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('header');

  const idSpan = document.createElement('span');
  idSpan.classList.add('id');
  idSpan.textContent = `ID: ${client.id}`;

  const title = document.createElement('h3');
  title.textContent = 'Delete Client ';
  title.appendChild(idSpan);

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-btn');
  titleDiv.append(title, closeButton);
  closeButton.addEventListener('click', (event) =>
    handleClickCloseModal(event),
  );

  return titleDiv;
}

export function createCancelButton(): HTMLButtonElement {
  const cancelButton = document.createElement('button');
  cancelButton.classList.add('cancel-btn');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', (event) =>
    handleClickCloseModal(event),
  );

  return cancelButton;
}

export function createConfirm(client: Client) {
  const confirmDiv = document.createElement('div');
  confirmDiv.classList.add('confirm');

  const nameSpan = document.createElement('span');
  nameSpan.textContent = `${client.name} ${client.lastName} ${client.surname}`;

  const textP = document.createElement('p');
  textP.classList.add('text');
  textP.textContent = 'Do you really want to delete? ';
  textP.appendChild(nameSpan);

  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error');
  const errorText = document.createElement('p');
  errorText.id = 'error';
  errorDiv.appendChild(errorText);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('confirm-delete');
  deleteButton.addEventListener('click', (event) =>
    handleClickConfirmDeleteContact(event, client.id),
  );

  confirmDiv.append(textP, errorDiv, deleteButton);

  return confirmDiv;
}

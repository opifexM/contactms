import {
  Client,
  Contact,
  createClient,
  updateClient,
  UpdateClient,
  UpdateClientSchema,
} from '../api/client.ts';
import { dashboard } from '../page-dashboard/dashboard.ts';
import { clientDelete } from '../page-delete/delete.ts';
import { hideLoader, showLoader } from '../page-loader/loader.ts';
import { clearModalContainer } from '../page-modal/modal.ts';
import {
  checkContactLimitAndDisable,
  createContactField,
  handleClickAddContact,
} from './contact-field.ts';

export function createCancelButton(): HTMLButtonElement {
  const cancelButton = document.createElement('button');
  cancelButton.classList.add('cancel-btn');
  cancelButton.textContent = 'Cancel';
  cancelButton.addEventListener('click', (event) =>
    handleClickCloseModal(event),
  );

  return cancelButton;
}

function handleClickCloseModal(event: MouseEvent): void {
  event.preventDefault();
  clearModalContainer();
}

export function createTitle(client: Client): HTMLDivElement {
  const titleDiv = document.createElement('div');
  titleDiv.classList.add('header');

  const idSpan = document.createElement('span');
  idSpan.classList.add('id');
  idSpan.textContent = client.id ? `ID: ${client.id}` : '';

  const title = document.createElement('h3');
  title.textContent = client.id ? 'Modify Data ' : 'New Client ';
  title.appendChild(idSpan);

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-btn');
  titleDiv.append(title, closeButton);
  closeButton.addEventListener('click', (event) =>
    handleClickCloseModal(event),
  );

  return titleDiv;
}

function extractClientData(event: SubmitEvent, id: string) {
  const formData = new FormData(event.target as HTMLFormElement);
  const contactTypes = formData.getAll('contactType');
  const contactValues = formData.getAll('contactValue');

  const formEntries: UpdateClient = {
    id: id,
    name: formData.get('name') as string,
    surname: formData.get('surname') as string,
    lastName: formData.get('lastName') as string,
    contacts: contactTypes.map(
      (type, index) =>
        ({
          type: type,
          value: contactValues[index],
        }) as Contact,
    ),
  };

  return formEntries;
}

async function handleClickSaveClient(
  event: SubmitEvent,
  id: string,
): Promise<void> {
  event.preventDefault();
  const errorDiv = document.querySelector('#error');
  const formEntries = extractClientData(event, id);

  const validationResult = UpdateClientSchema.safeParse(formEntries);
  if (!validationResult.success) {
    if (errorDiv) {
      const errorMessages = validationResult.error.errors
        .map((err) => err.message)
        .join(', ');
      errorDiv.textContent = `Validation error: ${errorMessages}`;
    }
    return;
  }

  showLoader();
  try {
    if (id) {
      await updateClient(formEntries);
    } else {
      await createClient(formEntries);
    }
    clearModalContainer();
    hideLoader();
    await dashboard();
  } catch (error) {
    hideLoader();
    if (errorDiv) {
      errorDiv.textContent =
        (error as Error).message || 'An unknown error occurred.';
    }
  }
}

function createClientFormFields(client: Client) {
  const lastNameSpan = document.createElement('span');
  lastNameSpan.classList.add('required');
  lastNameSpan.textContent = '*';
  const lastNameLabel = document.createElement('label');
  lastNameLabel.classList.add('required');
  lastNameLabel.textContent = 'Last Name';
  lastNameLabel.htmlFor = 'lastname';
  lastNameLabel.appendChild(lastNameSpan);
  const lastNameInput = document.createElement('input');
  lastNameInput.id = 'lastname';
  lastNameInput.type = 'text';
  lastNameInput.name = 'lastName';
  lastNameInput.value = client.lastName;
  const lastNameDiv = document.createElement('div');
  lastNameDiv.classList.add('form-group');
  lastNameDiv.append(lastNameLabel, lastNameInput);

  const firstNameSpan = document.createElement('span');
  firstNameSpan.classList.add('required');
  firstNameSpan.textContent = '*';
  const firstNameLabel = document.createElement('label');
  firstNameLabel.classList.add('required');
  firstNameLabel.textContent = 'First Name';
  firstNameLabel.htmlFor = 'firstname';
  firstNameLabel.appendChild(firstNameSpan);
  const firstNameInput = document.createElement('input');
  firstNameInput.id = 'firstname';
  firstNameInput.type = 'text';
  firstNameInput.name = 'name';
  firstNameInput.value = client.name;
  const firstNameDiv = document.createElement('div');
  firstNameDiv.classList.add('form-group');
  firstNameDiv.append(firstNameLabel, firstNameInput);

  const middleNameSpan = document.createElement('span');
  middleNameSpan.classList.add('required');
  middleNameSpan.textContent = '*';
  const middleNameLabel = document.createElement('label');
  middleNameLabel.classList.add('required');
  middleNameLabel.textContent = 'Middle Name';
  middleNameLabel.htmlFor = 'middle';
  middleNameLabel.appendChild(middleNameSpan);
  const middleNameInput = document.createElement('input');
  middleNameInput.id = 'middle';
  middleNameInput.type = 'text';
  middleNameInput.name = 'surname';
  middleNameInput.value = client.surname;
  const middleNameDiv = document.createElement('div');
  middleNameDiv.classList.add('form-group');
  middleNameDiv.append(middleNameLabel, middleNameInput);
  return { lastNameDiv, firstNameDiv, middleNameDiv };
}

export function createForm(client: Client): HTMLFormElement {
  const { lastNameDiv, firstNameDiv, middleNameDiv } =
    createClientFormFields(client);

  const form = document.createElement('form');
  form.classList.add('form');
  form.append(lastNameDiv, firstNameDiv, middleNameDiv);
  const contactSection = document.createElement('div');
  contactSection.classList.add('contact');
  const contactDiv = document.createElement('div');
  contactDiv.classList.add('field');
  client.contacts.forEach((contact) =>
    contactDiv.appendChild(createContactField(contact)),
  );
  contactSection.appendChild(contactDiv);

  const addContactButton = document.createElement('button');
  addContactButton.textContent = 'Add New Contact';
  addContactButton.classList.add('add-contact');
  addContactButton.addEventListener('click', (event) =>
    handleClickAddContact(event, contactDiv, form, addContactButton),
  );
  contactSection.appendChild(addContactButton);

  const errorDiv = document.createElement('div');
  errorDiv.classList.add('error');
  const errorText = document.createElement('p');
  errorText.id = 'error';
  errorDiv.appendChild(errorText);

  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.classList.add('save-contact');
  saveButton.type = 'submit';

  form.append(contactSection, errorDiv, saveButton);
  form.addEventListener('submit', (event) =>
    handleClickSaveClient(event, client.id),
  );
  checkContactLimitAndDisable(form, addContactButton);

  return form;
}

async function handleClickDeleteClient(
  event: MouseEvent,
  client: Client,
): Promise<void> {
  event.preventDefault();
  clientDelete(client);
}

export function createDeleteContact(client: Client): HTMLButtonElement {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Contact';
  deleteButton.classList.add('delete-contact');
  deleteButton.addEventListener('click', (event) =>
    handleClickDeleteClient(event, client),
  );

  return deleteButton;
}

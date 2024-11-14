import { Contact, ContactType } from '../api/client.ts';
import { MAX_CONTACT_FOR_USER } from '../const.ts';

export function createContactField(contact: Contact): HTMLDivElement {
  const contactSelect = document.createElement('select');
  contactSelect.name = 'contactType';
  Object.entries(ContactType).forEach(([_, value]) => {
    const option = document.createElement('option');
    option.textContent = value;
    if (value === contact.type) {
      option.selected = true;
    }
    contactSelect.appendChild(option);
  });

  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'contactValue';
  input.value = contact.value;

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove-btn');

  const contactDiv = document.createElement('div');
  contactDiv.classList.add('contact-field');
  contactDiv.append(contactSelect, input, removeButton);
  removeButton.addEventListener('click', (event) =>
    handleClearContactClick(event, contactDiv),
  );

  return contactDiv;
}

export function checkContactLimitAndDisable(
  form: HTMLFormElement,
  addContactButton: HTMLButtonElement,
) {
  const contactTypes = new FormData(form).getAll('contactType');
  addContactButton.disabled = contactTypes.length > MAX_CONTACT_FOR_USER;
  console.error(contactTypes.length > MAX_CONTACT_FOR_USER);
}

export function handleClickAddContact(
  event: MouseEvent,
  contactDiv: HTMLDivElement,
  form: HTMLFormElement,
  addContactButton: HTMLButtonElement,
): void {
  event.preventDefault();
  const newContact: Contact = {
    type: 'Phone',
    value: '',
  };
  contactDiv.appendChild(createContactField(newContact));
  checkContactLimitAndDisable(form, addContactButton);
}

function handleClearContactClick(
  event: MouseEvent,
  contactDiv: HTMLDivElement,
) {
  event.preventDefault();
  contactDiv.remove();
}

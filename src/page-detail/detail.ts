import { Client, fetchClient } from '../api/client.ts';
import { hideLoader, showLoader } from '../page-loader/loader.ts';
import { getModalContainer } from '../page-modal/modal.ts';
import {
  createCancelButton,
  createDeleteContact,
  createForm,
  createTitle,
} from './client-form.ts';

async function getClientById(id: string): Promise<Client> {
  showLoader();
  try {
    const client = await fetchClient(id);
    hideLoader();
    return client;
  } catch (error) {
    hideLoader();
    console.error((error as Error).message || 'An unknown error occurred.');
    throw error;
  }
}

export async function showClientDetails(id: string): Promise<void> {
  const client = await getClientById(id);
  const clientContainer = getModalContainer();
  const title = createTitle(client);
  const form = createForm(client);
  const deleteContact = createDeleteContact(client);
  clientContainer.append(title, form, deleteContact);
}

export function showNewClientForm() {
  const client: Client = {
    id: '',
    createdAt: '',
    updatedAt: '',
    name: '',
    surname: '',
    lastName: '',
    contacts: [],
  };
  const clientContainer = getModalContainer();
  const title = createTitle(client);
  const form = createForm(client);
  const cancelButton = createCancelButton();
  clientContainer.append(title, form, cancelButton);
}

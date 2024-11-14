import { Client } from '../api/client.ts';
import { getModalContainer } from '../page-modal/modal.ts';
import {
  createCancelButton,
  createConfirm,
  createTitle,
} from './client-delete.ts';

export function clientDelete(client: Client): void {
  if (!client.id) {
    console.error('No ID for client deleting');
    return;
  }

  const clientContainer = getModalContainer();
  const title = createTitle(client);
  const confirm = createConfirm(client);
  const cancelButton = createCancelButton();
  clientContainer.append(title, confirm, cancelButton);
}

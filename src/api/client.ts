import { z } from 'zod';
import { APIRoute, BACKEND_URL } from '../const.ts';

export const ContactTypeSchema = z.enum([
  'Phone',
  'Email',
  'Facebook',
  'VK',
  'Other',
]);
export const ContactType = ContactTypeSchema.options;

export const ContactSchema = z.object({
  type: ContactTypeSchema,
  value: z.string().min(1, 'Value for contact is required'),
});
export type Contact = z.infer<typeof ContactSchema>;

export const ClientSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  surname: z.string(),
  lastName: z.string(),
  contacts: z.array(ContactSchema),
});
export type Client = z.infer<typeof ClientSchema>;

export const UpdateClientSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  surname: z.string().min(1, 'Middle Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  contacts: z.array(ContactSchema),
});
export type UpdateClient = z.infer<typeof UpdateClientSchema>;

export async function fetchClientList(search: string): Promise<Client[]> {
  const url = search.length
    ? `${APIRoute.GetClientList}?search=${search}`
    : `${APIRoute.GetClientList}`;
  const response = await fetch(`${BACKEND_URL}${url}`);
  if (!response.ok) {
    throw new Error(
      `Client fetching error: ${response.status} - ${response.statusText}`,
    );
  }
  const data = await response.json();

  return z.array(ClientSchema).parse(data);
}

export async function updateClient(client: UpdateClient): Promise<Client> {
  const url = APIRoute.UpdateClient.replace(':clientId', client.id);
  const response = await fetch(`${BACKEND_URL}${url}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });
  if (!response.ok) {
    throw new Error(
      `Client ID: '${client.id}' updating error: ${response.status} - ${response.statusText}`,
    );
  }
  const data = await response.json();

  return ClientSchema.parse(data);
}

export async function createClient(client: UpdateClient): Promise<Client> {
  const response = await fetch(`${BACKEND_URL}${APIRoute.CreateClient}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });
  if (!response.ok) {
    throw new Error(
      `Client creating error: ${response.status} - ${response.statusText}`,
    );
  }
  const data = await response.json();

  return ClientSchema.parse(data);
}

export async function deleteClient(id: string): Promise<void> {
  const url = APIRoute.DeleteClient.replace(':clientId', id);
  const response = await fetch(`${BACKEND_URL}${url}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(
      `Client ID: '${id}' deleting error: ${response.status} - ${response.statusText}`,
    );
  }
}

export async function fetchClient(id: string): Promise<Client> {
  const url = APIRoute.GetClient.replace(':clientId', id);
  const response = await fetch(`${BACKEND_URL}${url}`);
  if (!response.ok) {
    throw new Error(
      `Client ID: '${id}' getting error: ${response.status} - ${response.statusText}`,
    );
  }
  const data = await response.json();

  return ClientSchema.parse(data);
}

import { Client } from '../api/client.ts';
import { MAX_CONTACT_ICON_FOR_SHOW } from '../const.ts';
import { clientDelete } from '../page-delete/delete.ts';
import { showClientDetails, showNewClientForm } from '../page-detail/detail.ts';
import { SortDirection, SortType } from '../util/sort.ts';
import {
  clientChangeDateSortClickHandler,
  clientCreateDateSortClickHandler,
  clientIdSortClickHandler,
  clientNameSortClickHandler,
} from './client-sort.ts';
import { dashboardState } from './dashboard.ts';

function handleClickNewClient(event: MouseEvent): void {
  event.preventDefault();
  showNewClientForm();
}

export function createTableContainer(clients: Client[]): HTMLDivElement {
  const title = document.createElement('h2');
  title.textContent = 'Clients';

  const emptyTable = createTable();
  const clientTable = renderClientTable(clients, emptyTable);

  const clientButton = document.createElement('button');
  clientButton.textContent = 'Add Client';
  clientButton.classList.add('add-client');
  clientButton.addEventListener('click', (event) =>
    handleClickNewClient(event),
  );

  const tableContainer = document.createElement('div');
  tableContainer.classList.add('table-container');
  tableContainer.append(title, clientTable, clientButton);

  return tableContainer;
}

export function createTable(): HTMLTableElement {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  const columnHeaders = [
    { text: 'ID', handler: clientIdSortClickHandler },
    { text: 'Name', handler: clientNameSortClickHandler },
    { text: 'Date', handler: clientCreateDateSortClickHandler },
    { text: 'Last Edit', handler: clientChangeDateSortClickHandler },
    { text: 'Contacts' },
    { text: 'Action' },
    { text: '' },
  ];
  columnHeaders.forEach((column) => {
    const th = document.createElement('th');
    th.textContent = column.text;

    let isSorted = false;
    if (
      (th.textContent === 'ID' &&
        dashboardState.currentSortType === SortType.BY_ID) ||
      (th.textContent === 'Name' &&
        dashboardState.currentSortType === SortType.BY_NAME) ||
      (th.textContent === 'Date' &&
        dashboardState.currentSortType === SortType.BY_CREATED_DATE) ||
      (th.textContent === 'Last Edit' &&
        dashboardState.currentSortType === SortType.BY_EDIT_DATE)
    ) {
      isSorted = true;
    }

    if (isSorted) {
      th.classList.add(
        dashboardState.currentSortDirection === SortDirection.ASC
          ? 'sorted-asc'
          : 'sorted-desc',
      );
    }

    if (column.handler) {
      th.addEventListener('click', column.handler);
      th.classList.add('sortable');
    }
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.appendChild(thead);

  return table;
}

export function getFullName(client: Client): string {
  return `${client.lastName} ${client.name} ${client.surname}`;
}

function handleClickEditClient(event: MouseEvent, client: Client): void {
  event.preventDefault();
  showClientDetails(client.id);
}

function handleClickDeleteClient(event: MouseEvent, client: Client): void {
  event.preventDefault();
  clientDelete(client);
}

function renderClientTable(
  clients: Client[],
  table: HTMLTableElement,
): HTMLTableElement {
  clients.forEach((client) => {
    const { id, updatedAt, createdAt, contacts } = client;
    const tr = document.createElement('tr');

    const idTd = document.createElement('td');
    idTd.textContent = id;
    idTd.classList.add('text-gray');

    const nameTd = document.createElement('td');
    nameTd.textContent = getFullName(client);

    const createAtTimeSpan = document.createElement('span');
    createAtTimeSpan.classList.add('text-gray');
    const createdAtTd = document.createElement('td');
    const createdAtDate = new Date(createdAt);
    createdAtTd.textContent = `${createdAtDate.toLocaleDateString()} - `;
    createAtTimeSpan.textContent = `${createdAtDate.toLocaleTimeString()}`;
    createdAtTd.appendChild(createAtTimeSpan);

    const updatedAtTimeSpan = document.createElement('span');
    updatedAtTimeSpan.classList.add('text-gray');
    const updatedAtTd = document.createElement('td');
    const updatedAtDate = new Date(updatedAt);
    updatedAtTd.textContent = `${updatedAtDate.toLocaleDateString()} - `;
    updatedAtTimeSpan.textContent = `${updatedAtDate.toLocaleTimeString()}`;
    updatedAtTd.appendChild(updatedAtTimeSpan);

    const contactTd = document.createElement('td');
    contactTd.classList.add('contacts');
    contacts.forEach((contact, index) => {
      if (index < MAX_CONTACT_ICON_FOR_SHOW) {
        const iconElement = document.createElement('div');
        iconElement.setAttribute('title', `${contact.type}: ${contact.value}`);
        iconElement.classList.add('icon', `icon-${contact.type.toLowerCase()}`);
        contactTd.appendChild(iconElement);
      } else if (index === MAX_CONTACT_ICON_FOR_SHOW) {
        const iconElement = document.createElement('div');
        iconElement.setAttribute('title', `Total ${contacts.length} contacts`);
        iconElement.classList.add('icon', 'icon-other6');
        contactTd.appendChild(iconElement);
      }
    });

    const editTd = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('button', 'edit');
    editTd.appendChild(editBtn);
    editBtn.addEventListener('click', (event) =>
      handleClickEditClient(event, client),
    );

    const deleteTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('button', 'delete');
    deleteTd.appendChild(deleteBtn);
    deleteTd.addEventListener('click', (event) =>
      handleClickDeleteClient(event, client),
    );

    tr.append(
      idTd,
      nameTd,
      createdAtTd,
      updatedAtTd,
      contactTd,
      editTd,
      deleteTd,
    );
    table.appendChild(tr);
  });

  return table;
}

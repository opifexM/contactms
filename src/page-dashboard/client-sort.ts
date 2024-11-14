import { Client } from '../api/client.ts';
import { SortDirection, SortType } from '../util/sort.ts';
import { getFullName } from './client-table.ts';
import { dashboard, dashboardState } from './dashboard.ts';

function sortById(clients: Client[]): Client[] {
  return clients.slice().sort((a, b) => a.id.localeCompare(b.id));
}

function sortByIdDesc(clients: Client[]): Client[] {
  return clients.slice().sort((a, b) => b.id.localeCompare(a.id));
}

function sortByName(clients: Client[]): Client[] {
  return clients
    .slice()
    .sort((a, b) => getFullName(a).localeCompare(getFullName(b)));
}

function sortByNameDesc(clients: Client[]): Client[] {
  return clients
    .slice()
    .sort((a, b) => getFullName(b).localeCompare(getFullName(a)));
}

function sortByCreatedDate(clients: Client[]): Client[] {
  return clients
    .slice()
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
}

function sortByCreatedDateDesc(clients: Client[]): Client[] {
  return clients
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

function sortByUpdatedDate(clients: Client[]): Client[] {
  return clients
    .slice()
    .sort(
      (a, b) =>
        new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
    );
}

function sortByUpdatedDateDesc(clients: Client[]): Client[] {
  return clients
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
}

export function sortClientList(clients: Client[]) {
  switch (dashboardState.currentSortType) {
    case SortType.BY_ID:
      return dashboardState.currentSortDirection === SortDirection.ASC
        ? sortById(clients)
        : sortByIdDesc(clients);
    case SortType.BY_NAME:
      return dashboardState.currentSortDirection === SortDirection.ASC
        ? sortByName(clients)
        : sortByNameDesc(clients);
    case SortType.BY_CREATED_DATE:
      return dashboardState.currentSortDirection === SortDirection.ASC
        ? sortByCreatedDate(clients)
        : sortByCreatedDateDesc(clients);
    case SortType.BY_EDIT_DATE:
      return dashboardState.currentSortDirection === SortDirection.ASC
        ? sortByUpdatedDate(clients)
        : sortByUpdatedDateDesc(clients);
    default:
      return clients;
  }
}

function toggleSortDirection() {
  dashboardState.currentSortDirection =
    dashboardState.currentSortDirection === SortDirection.ASC
      ? SortDirection.DESC
      : SortDirection.ASC;
}

export function clientIdSortClickHandler() {
  dashboardState.currentSortType = SortType.BY_ID;
  toggleSortDirection();
  dashboard();
}

export function clientNameSortClickHandler() {
  dashboardState.currentSortType = SortType.BY_NAME;
  toggleSortDirection();
  dashboard();
}

export function clientCreateDateSortClickHandler() {
  dashboardState.currentSortType = SortType.BY_CREATED_DATE;
  toggleSortDirection();
  dashboard();
}

export function clientChangeDateSortClickHandler() {
  dashboardState.currentSortType = SortType.BY_EDIT_DATE;
  toggleSortDirection();
  dashboard();
}

import { Client, fetchClientList } from '../api/client.ts';
import { refresh } from '../app.ts';
import { DEFAULT_SORT_DIRECTION, DEFAULT_SORT_TYPE } from '../const.ts';
import { hideLoader, showLoader } from '../page-loader/loader.ts';
import { SortDirection, SortType } from '../util/sort.ts';
import { createSearchContainer } from './client-search.ts';
import { sortClientList } from './client-sort.ts';
import { createTableContainer } from './client-table.ts';

interface DashboardStateType {
  currentSearchText: string;
  currentSortType: SortType;
  currentSortDirection: SortDirection;
}

export const dashboardState: DashboardStateType = {
  currentSortDirection: DEFAULT_SORT_DIRECTION,
  currentSortType: DEFAULT_SORT_TYPE,
  currentSearchText: '',
};

export function initDashboard(app: HTMLDivElement): void {
  const dashboardContainer = document.createElement('div');
  dashboardContainer.classList.add('dashboard-container');
  app.appendChild(dashboardContainer);
}

function getDashboardContainer(): HTMLDivElement {
  const dashboardContainer = document.querySelector<HTMLDivElement>(
    '.dashboard-container',
  );
  if (!dashboardContainer) {
    throw new Error('Error loading Dashboard');
  }

  return dashboardContainer;
}

async function getClientList(currentSearchText: string): Promise<Client[]> {
  showLoader();
  try {
    const clients = await fetchClientList(currentSearchText);
    hideLoader();
    return clients;
  } catch (error) {
    hideLoader();
    console.error((error as Error).message || 'An unknown error occurred.');
    throw error;
  }
}

export async function dashboard(): Promise<void> {
  const unsortedClients = await getClientList(dashboardState.currentSearchText);
  const clients = sortClientList(unsortedClients);
  const dashboardContainer = getDashboardContainer();
  const searchContainer = createSearchContainer();
  const tableContainer = createTableContainer(clients);
  refresh(dashboardContainer);
  dashboardContainer.append(searchContainer, tableContainer);
}

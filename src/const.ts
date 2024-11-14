import { SortDirection, SortType } from './util/sort.ts';

export const BACKEND_URL = 'http://localhost:3000/api/';

export const DEFAULT_SORT_TYPE = SortType.BY_ID;
export const DEFAULT_SORT_DIRECTION = SortDirection.ASC;
export const TIMEOUT_FOR_SEARCH = 300;
export const MAX_CONTACT_FOR_USER = 10;
export const MAX_CONTACT_ICON_FOR_SHOW = 5;

export const APIRoute = {
  GetClientList: 'clients',
  CreateClient: 'clients',
  GetClient: 'clients/:clientId',
  UpdateClient: 'clients/:clientId',
  DeleteClient: 'clients/:clientId',
} as const;

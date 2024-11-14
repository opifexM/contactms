import { TIMEOUT_FOR_SEARCH } from '../const.ts';
import { dashboard, dashboardState } from './dashboard.ts';

let debounceTimeout = 0;

function handleInputSearchText(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  dashboardState.currentSearchText = inputElement.value;
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(() => {
    dashboard();
  }, TIMEOUT_FOR_SEARCH);
}

export function createSearchContainer(): HTMLDivElement {
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('search-container');
  const logo = document.createElement('div');
  logo.classList.add('logo');

  const search = document.createElement('input');
  search.classList.add('search-input');
  search.type = 'text';
  search.placeholder = 'Input for search...';
  search.value = dashboardState.currentSearchText;
  search.addEventListener('input', (event) => handleInputSearchText(event));
  searchContainer.append(logo, search);
  return searchContainer;
}

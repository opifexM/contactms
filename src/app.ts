import { dashboard, initDashboard } from './page-dashboard/dashboard.ts';
import { initLoader } from './page-loader/loader.ts';
import { initModal } from './page-modal/modal.ts';

export function startApp() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) {
    throw new Error('Error loading app');
  }

  initLoader(app);
  initDashboard(app);
  initModal(app);
  dashboard();
}

export function refresh(contentContainer: HTMLDivElement) {
  contentContainer.innerHTML = '';
}

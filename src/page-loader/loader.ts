export function initLoader(app: HTMLDivElement) {
  const loaderContainer = document.createElement('div');
  loaderContainer.classList.add('loader-container');
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.textContent = 'Loading..';
  loaderContainer.appendChild(loader);
  app.appendChild(loaderContainer);
}

function getLoaderContainer(): HTMLDivElement {
  const loaderContainer =
    document.querySelector<HTMLDivElement>('.loader-container');
  if (!loaderContainer) {
    throw new Error('Error loading Loader Container');
  }

  return loaderContainer;
}

export function showLoader() {
  const loader = getLoaderContainer();
  loader.style.display = 'block';
}

export function hideLoader() {
  const loader = getLoaderContainer();
  loader.style.display = 'none';
}


import { APP_VERSION } from './cacheUtils';

/**
 * Create root element if it doesn't exist
 */
export const ensureRootElement = (): HTMLElement => {
  let rootElement = document.getElementById("root");
  if (!rootElement) {
    console.log("Creating new root element");
    const newRoot = document.createElement("div");
    newRoot.id = "root";
    document.body.appendChild(newRoot);
    rootElement = newRoot;
  }

  return rootElement;
};

/**
 * Add a visible version indicator in development mode
 */
export const addVersionIndicator = (): void => {
  if (import.meta.env.DEV) {
    const versionIndicator = document.createElement('div');
    versionIndicator.style.position = 'fixed';
    versionIndicator.style.bottom = '5px';
    versionIndicator.style.right = '5px';
    versionIndicator.style.backgroundColor = 'rgba(0,0,0,0.3)';
    versionIndicator.style.color = 'white';
    versionIndicator.style.padding = '3px 6px';
    versionIndicator.style.borderRadius = '4px';
    versionIndicator.style.fontSize = '10px';
    versionIndicator.innerText = `v${APP_VERSION}`;
    document.body.appendChild(versionIndicator);
  }
};

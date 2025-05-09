
/**
 * Initialize global error handlers
 */
export const setupErrorHandlers = (): void => {
  // Add global error handlers
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.message);
  });

  // Log when the app comes back online
  window.addEventListener('online', () => {
    console.log('App is back online');
  });
};

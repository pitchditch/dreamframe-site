
/**
 * Initialize global error handlers
 */
export const setupErrorHandlers = (): void => {
  // Add global error handlers
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.message);
    
    // For serious errors, try to recover by reloading
    if (event.message && (
      event.message.includes('SSL') || 
      event.message.includes('protocol') || 
      event.message.includes('network') ||
      event.message.includes('revert') ||
      event.message.includes('version')
    )) {
      console.error('Critical error detected, attempting recovery by reloading');
      window.location.reload();
    }
  });

  // Force reload when coming back online
  window.addEventListener('online', () => {
    console.log('App is online, reloading for fresh content');
    window.location.reload();
  });
};

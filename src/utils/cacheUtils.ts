
// Cache utility functions

// Generate a unique version identifier for this session
export const APP_VERSION = Date.now();

/**
 * Helper to add version parameter to URLs
 */
export const addVersionParam = (url: string): string => {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('v', APP_VERSION.toString());
    return urlObj.toString();
  } catch (error) {
    console.error('Error adding version param:', error);
    return url;
  }
};

/**
 * Generates deep links for booking with pre-filled data
 */

export interface DeepLinkParams {
  address?: string;
  source?: string;
  campaignId?: string;
  canvasserId?: string;
  phoneNumber?: string;
  email?: string;
  name?: string;
}

export function generateBookingLink(params: DeepLinkParams): string {
  const baseUrl = window.location.origin;
  const queryParams = new URLSearchParams();

  if (params.address) queryParams.append('address', params.address);
  if (params.source) queryParams.append('source', params.source);
  if (params.campaignId) queryParams.append('campaign', params.campaignId);
  if (params.canvasserId) queryParams.append('canvasser', params.canvasserId);
  if (params.phoneNumber) queryParams.append('phone', params.phoneNumber);
  if (params.email) queryParams.append('email', params.email);
  if (params.name) queryParams.append('name', params.name);

  return `${baseUrl}/calculator?${queryParams.toString()}`;
}

export function generateQuoteLink(params: DeepLinkParams): string {
  const baseUrl = window.location.origin;
  const queryParams = new URLSearchParams();

  if (params.address) queryParams.append('address', params.address);
  if (params.source) queryParams.append('source', params.source);
  if (params.campaignId) queryParams.append('campaign', params.campaignId);
  if (params.canvasserId) queryParams.append('canvasser', params.canvasserId);
  if (params.phoneNumber) queryParams.append('phone', params.phoneNumber);
  if (params.email) queryParams.append('email', params.email);
  if (params.name) queryParams.append('name', params.name);

  return `${baseUrl}/streamlined-calculator?${queryParams.toString()}`;
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  
  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.select();
  
  try {
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve();
  } catch (error) {
    document.body.removeChild(textArea);
    return Promise.reject(error);
  }
}

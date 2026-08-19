export interface D2DSyncStatus {
  online: boolean;
  pendingKeys: string[];
  lastSyncedAt?: string;
  lastError?: string;
}

const STORAGE_KEY = 'd2d-sync-status-v1';
const EVENT_NAME = 'bc-d2d-sync-status';

const browserOnline = () => typeof navigator === 'undefined' ? true : navigator.onLine;

const defaultStatus = (): D2DSyncStatus => ({
  online: browserOnline(),
  pendingKeys: [],
});

export const readD2DSyncStatus = (): D2DSyncStatus => {
  if (typeof window === 'undefined') return defaultStatus();
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!parsed || typeof parsed !== 'object') return defaultStatus();
    return {
      online: browserOnline(),
      pendingKeys: Array.isArray(parsed.pendingKeys)
        ? Array.from(new Set(parsed.pendingKeys.filter((value: unknown) => typeof value === 'string')))
        : [],
      lastSyncedAt: typeof parsed.lastSyncedAt === 'string' ? parsed.lastSyncedAt : undefined,
      lastError: typeof parsed.lastError === 'string' ? parsed.lastError : undefined,
    };
  } catch {
    return defaultStatus();
  }
};

const writeStatus = (status: D2DSyncStatus) => {
  if (typeof window === 'undefined') return status;
  const normalized: D2DSyncStatus = {
    ...status,
    online: browserOnline(),
    pendingKeys: Array.from(new Set(status.pendingKeys.filter(Boolean))),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent<D2DSyncStatus>(EVENT_NAME, { detail: normalized }));
  return normalized;
};

export const markD2DPending = (keys: string[] | string) => {
  const incoming = Array.isArray(keys) ? keys : [keys];
  const current = readD2DSyncStatus();
  return writeStatus({
    ...current,
    pendingKeys: [...current.pendingKeys, ...incoming.filter(Boolean)],
  });
};

export const clearD2DPending = () => writeStatus({
  ...readD2DSyncStatus(),
  pendingKeys: [],
  lastError: undefined,
  lastSyncedAt: new Date().toISOString(),
});

export const setD2DSyncOnline = (online: boolean) => writeStatus({
  ...readD2DSyncStatus(),
  online,
});

export const setD2DSyncError = (error: unknown) => writeStatus({
  ...readD2DSyncStatus(),
  lastError: error instanceof Error ? error.message : String(error || 'Sync failed'),
});

export const subscribeD2DSyncStatus = (listener: (status: D2DSyncStatus) => void) => {
  if (typeof window === 'undefined') return () => undefined;
  const handler = (event: Event) => listener((event as CustomEvent<D2DSyncStatus>).detail || readD2DSyncStatus());
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
};

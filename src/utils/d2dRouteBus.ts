import { RouteSession } from '@/components/house-tracking/types';

const UPSERT_EVENT = 'bc-d2d-route-upsert';
const DELETE_EVENT = 'bc-d2d-route-delete';

export const publishD2DRoute = (route: RouteSession) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<RouteSession>(UPSERT_EVENT, { detail: route }));
};

export const removeD2DRoute = (routeId: string) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<string>(DELETE_EVENT, { detail: routeId }));
};

export const subscribeD2DRoutes = (
  onUpsert: (route: RouteSession) => void,
  onDelete: (routeId: string) => void,
) => {
  if (typeof window === 'undefined') return () => undefined;

  const handleUpsert = (event: Event) => {
    const route = (event as CustomEvent<RouteSession>).detail;
    if (route?.id) onUpsert(route);
  };
  const handleDelete = (event: Event) => {
    const routeId = (event as CustomEvent<string>).detail;
    if (routeId) onDelete(routeId);
  };

  window.addEventListener(UPSERT_EVENT, handleUpsert);
  window.addEventListener(DELETE_EVENT, handleDelete);

  return () => {
    window.removeEventListener(UPSERT_EVENT, handleUpsert);
    window.removeEventListener(DELETE_EVENT, handleDelete);
  };
};

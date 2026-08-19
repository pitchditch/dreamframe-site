import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, MapPin, Calendar, Route, Clock, DollarSign, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HousePin, RouteSession } from './types';
import D2DReadinessCheck from './D2DReadinessCheck';

interface AnalyticsDashboardProps {
  pins: HousePin[];
}

const readRoutes = (): RouteSession[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem('routes') || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ pins }) => {
  const routes = useMemo(readRoutes, [pins.length]);
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const monthAgo = now - 30 * 24 * 60 * 60 * 1000;

  const d2dPins = pins.filter((pin) => pin.leadSource === 'door-to-door');
  const storefronts = d2dPins.filter((pin) => pin.isStorefront);
  const residential = d2dPins.filter((pin) => !pin.isStorefront);
  const interested = d2dPins.filter((pin) => ['interested', 'needs-quote', 'completed'].includes(pin.status));
  const quoteReady = d2dPins.filter((pin) => ['needs-quote', 'completed'].includes(pin.status));
  const completed = d2dPins.filter((pin) => pin.status === 'completed');
  const notInterested = d2dPins.filter((pin) => pin.status === 'not-interested');
  const followUps = pins.filter((pin) => pin.followUpDate && new Date(pin.followUpDate).getTime() <= now);
  const revenue = pins.reduce((sum, pin) => sum + (Number(pin.jobValue) || 0), 0);

  const fieldRoutes = routes.filter((route) => route.id.startsWith('field-'));
  const routeSeconds = fieldRoutes.reduce((sum, route) => sum + (Number(route.duration) || 0), 0);
  const routeHours = routeSeconds / 3600;
  const recordedVisits = fieldRoutes.reduce((sum, route) => sum + (Number(route.homesVisited) || 0), 0);
  const doorsPerHour = routeHours > 0 ? recordedVisits / routeHours : 0;

  const interestRate = d2dPins.length > 0 ? (interested.length / d2dPins.length) * 100 : 0;
  const quoteRate = d2dPins.length > 0 ? (quoteReady.length / d2dPins.length) * 100 : 0;
  const closeRate = quoteReady.length > 0 ? (completed.length / quoteReady.length) * 100 : 0;

  const thisWeek = pins.filter((pin) => new Date(pin.dateAdded).getTime() >= weekAgo).length;
  const thisMonth = pins.filter((pin) => new Date(pin.dateAdded).getTime() >= monthAgo).length;

  const statusRows = [
    ['Visited', d2dPins.filter((pin) => pin.status === 'visited').length],
    ['Interested', d2dPins.filter((pin) => pin.status === 'interested').length],
    ['Needs Quote', d2dPins.filter((pin) => pin.status === 'needs-quote').length],
    ['Not Interested', notInterested.length],
    ['Revisit Later', d2dPins.filter((pin) => pin.status === 'revisit-later').length],
    ['Completed', completed.length],
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">D2D Field Analytics</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Field activity only. Website analytics stays in the main CRM analytics dashboard.</p>
      </div>

      <D2DReadinessCheck />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="flex items-center justify-between text-sm font-medium">Doors<MapPin className="h-4 w-4 text-muted-foreground" /></CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{d2dPins.length}</div><p className="text-xs text-muted-foreground">{residential.length} homes · {storefronts.length} storefronts</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="flex items-center justify-between text-sm font-medium">Interest rate<Target className="h-4 w-4 text-muted-foreground" /></CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{interestRate.toFixed(1)}%</div><p className="text-xs text-muted-foreground">{interested.length} interested/quote/completed</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="flex items-center justify-between text-sm font-medium">Quote rate<TrendingUp className="h-4 w-4 text-muted-foreground" /></CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{quoteRate.toFixed(1)}%</div><p className="text-xs text-muted-foreground">{quoteReady.length} quote-ready/completed</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="flex items-center justify-between text-sm font-medium">Close rate<DollarSign className="h-4 w-4 text-muted-foreground" /></CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{closeRate.toFixed(1)}%</div><p className="text-xs text-muted-foreground">{completed.length} completed jobs</p></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><Route className="h-4 w-4" />Saved sessions</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{fieldRoutes.length}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4" />Field time</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{routeHours.toFixed(1)}h</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><TrendingUp className="h-4 w-4" />Doors / hour</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{doorsPerHour.toFixed(1)}</div><p className="text-xs text-muted-foreground">From saved field sessions</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4" />Recorded job value</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">${revenue.toLocaleString()}</div></CardContent></Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Status breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {statusRows.map(([label, count]) => (
              <div key={label} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                <span className="text-sm">{label}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Calendar className="h-4 w-4" />Activity & follow-ups</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between"><span className="text-sm">New records · 7 days</span><Badge variant="outline">{thisWeek}</Badge></div>
            <div className="flex items-center justify-between"><span className="text-sm">New records · 30 days</span><Badge variant="outline">{thisMonth}</Badge></div>
            <div className="flex items-center justify-between"><span className="text-sm">Follow-ups due</span><Badge variant={followUps.length > 0 ? 'destructive' : 'outline'}>{followUps.length}</Badge></div>
            <div className="flex items-center justify-between"><span className="text-sm">Not interested</span><Badge variant="outline">{notInterested.length}</Badge></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

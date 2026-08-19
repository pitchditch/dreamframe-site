import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ExternalLink, RefreshCw, Search, ShieldCheck, TriangleAlert } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type MetricSet = {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type KeywordRow = MetricSet & { query: string };
type PageRow = MetricSet & { page: string };
type DeviceRow = MetricSet & { device: string };

type GscReport = {
  connected: boolean;
  propertyUrl: string;
  connectedAt?: string;
  dateRange: { startDate: string; endDate: string; days: number };
  previousDateRange: { startDate: string; endDate: string; days: number };
  totals: MetricSet;
  previousTotals: MetricSet;
  keywords: KeywordRow[];
  pages: PageRow[];
  devices: DeviceRow[];
};

type GscStatus = {
  configured: boolean;
  connected: boolean;
  propertyUrl: string | null;
  connectedAt: string | null;
  updatedAt: string | null;
};

const formatNumber = (value: number) => new Intl.NumberFormat('en-CA').format(Math.round(value || 0));
const formatCtr = (value: number) => `${((value || 0) * 100).toFixed(1)}%`;
const formatPosition = (value: number) => value ? value.toFixed(1) : '—';

const changeLabel = (current: number, previous: number, lowerIsBetter = false) => {
  if (!previous && !current) return 'No change';
  const difference = current - previous;
  if (Math.abs(difference) < 0.01) return 'No change';
  const good = lowerIsBetter ? difference < 0 : difference > 0;
  const arrow = difference > 0 ? '↑' : '↓';
  return `${good ? 'Good' : 'Watch'} ${arrow}${Math.abs(difference).toFixed(lowerIsBetter ? 1 : 0)}`;
};

export default function SEO() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { toast } = useToast();
  const [status, setStatus] = useState<GscStatus | null>(null);
  const [report, setReport] = useState<GscReport | null>(null);
  const [days, setDays] = useState(28);
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [inspectUrl, setInspectUrl] = useState('https://bcpressurewashing.ca/');
  const [inspection, setInspection] = useState<any>(null);
  const [inspectLoading, setInspectLoading] = useState(false);

  const invoke = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke('ga4-report', { body });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const loadStatus = async () => {
    const data = await invoke({ action: 'gsc_status' });
    setStatus(data as GscStatus);
    return data as GscStatus;
  };

  const loadReport = async (selectedDays = days) => {
    setReportLoading(true);
    try {
      const data = await invoke({ action: 'gsc_report', days: selectedDays });
      setReport(data as GscReport);
    } catch (error) {
      toast({
        title: 'Search Console report failed',
        description: error instanceof Error ? error.message : 'Could not load Search Console data.',
        variant: 'destructive',
      });
    } finally {
      setReportLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const initialize = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          navigate('/crm', { replace: true });
          return;
        }

        const gscResult = searchParams.get('gsc');
        const message = searchParams.get('message');
        if (gscResult === 'connected') {
          toast({ title: 'Google Search Console connected', description: 'Google search performance data is now available.' });
          setSearchParams({}, { replace: true });
        } else if (gscResult === 'error') {
          toast({ title: 'Search Console connection failed', description: message || 'Google authorization did not complete.', variant: 'destructive' });
          setSearchParams({}, { replace: true });
        }

        const nextStatus = await loadStatus();
        if (!cancelled && nextStatus.connected) await loadReport(days);
      } catch (error) {
        if (!cancelled) {
          toast({
            title: 'SEO dashboard could not load',
            description: error instanceof Error ? error.message : 'Could not check Search Console connection.',
            variant: 'destructive',
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    initialize();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connect = async () => {
    setConnecting(true);
    try {
      const data = await invoke({ action: 'gsc_start' });
      if (!data?.url) throw new Error('Google authorization URL was not returned.');
      window.location.assign(data.url);
    } catch (error) {
      toast({
        title: 'Could not start Google connection',
        description: error instanceof Error ? error.message : 'Authorization could not start.',
        variant: 'destructive',
      });
      setConnecting(false);
    }
  };

  const inspect = async () => {
    setInspectLoading(true);
    setInspection(null);
    try {
      const data = await invoke({ action: 'gsc_inspect', url: inspectUrl });
      setInspection(data.inspection?.inspectionResult || null);
    } catch (error) {
      toast({
        title: 'URL inspection failed',
        description: error instanceof Error ? error.message : 'Could not inspect this URL.',
        variant: 'destructive',
      });
    } finally {
      setInspectLoading(false);
    }
  };

  const topKeywords = useMemo(() => report?.keywords?.slice(0, 25) || [], [report]);
  const topPages = useMemo(() => report?.pages?.slice(0, 25) || [], [report]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/20 p-4 sm:p-6">
        <div className="mx-auto flex max-w-7xl items-center justify-center py-24 text-muted-foreground">
          <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> Loading SEO data…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Button variant="ghost" size="sm" className="mb-2 -ml-2" onClick={() => navigate('/crm/analytics')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to analytics
            </Button>
            <h1 className="text-2xl font-bold sm:text-3xl">SEO & Google Search Console</h1>
            <p className="mt-1 text-sm text-muted-foreground">Google queries, rankings, impressions, clicks, pages and indexing for BC Pressure Washing.</p>
          </div>
          {status?.connected && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700">
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Connected
              </Badge>
              <Button variant="outline" onClick={() => loadReport(days)} disabled={reportLoading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${reportLoading ? 'animate-spin' : ''}`} /> Refresh
              </Button>
            </div>
          )}
        </div>

        {!status?.configured && (
          <Card className="border-amber-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TriangleAlert className="h-5 w-5 text-amber-600" /> Search Console secrets incomplete</CardTitle>
              <CardDescription>GSC_CLIENT_ID, GSC_CLIENT_SECRET and GSC_REDIRECT_URI must be present in Supabase Edge Function secrets.</CardDescription>
            </CardHeader>
          </Card>
        )}

        {status?.configured && !status.connected && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Search className="h-5 w-5" /> Connect Google Search Console</CardTitle>
              <CardDescription>Authorize the Google account that owns or has access to bcpressurewashing.ca. Only read-only Search Console access is requested.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={connect} disabled={connecting}>
                {connecting ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                Connect Google Search Console
              </Button>
            </CardContent>
          </Card>
        )}

        {status?.connected && report && (
          <>
            <Card>
              <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Google Search performance</CardTitle>
                  <CardDescription>{report.propertyUrl} · {report.dateRange.startDate} to {report.dateRange.endDate}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {[7, 28, 90].map((value) => (
                    <Button
                      key={value}
                      size="sm"
                      variant={days === value ? 'default' : 'outline'}
                      onClick={() => { setDays(value); loadReport(value); }}
                      disabled={reportLoading}
                    >
                      {value}d
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs text-muted-foreground">Google clicks</div>
                    <div className="mt-1 text-2xl font-bold">{formatNumber(report.totals.clicks)}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{changeLabel(report.totals.clicks, report.previousTotals.clicks)}</div>
                  </div>
                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs text-muted-foreground">Impressions</div>
                    <div className="mt-1 text-2xl font-bold">{formatNumber(report.totals.impressions)}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{changeLabel(report.totals.impressions, report.previousTotals.impressions)}</div>
                  </div>
                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs text-muted-foreground">CTR</div>
                    <div className="mt-1 text-2xl font-bold">{formatCtr(report.totals.ctr)}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Previous {formatCtr(report.previousTotals.ctr)}</div>
                  </div>
                  <div className="rounded-xl border bg-background p-4">
                    <div className="text-xs text-muted-foreground">Average position</div>
                    <div className="mt-1 text-2xl font-bold">{formatPosition(report.totals.position)}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{changeLabel(report.totals.position, report.previousTotals.position, true)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-5 xl:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Google queries</CardTitle>
                  <CardDescription>What people searched before your site appeared in Google.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left text-xs text-muted-foreground">
                        <tr className="border-b"><th className="pb-2 pr-3">Query</th><th className="pb-2 pr-3 text-right">Clicks</th><th className="pb-2 pr-3 text-right">Imp.</th><th className="pb-2 text-right">Pos.</th></tr>
                      </thead>
                      <tbody>
                        {topKeywords.map((row) => (
                          <tr key={row.query} className="border-b last:border-0">
                            <td className="max-w-[280px] py-2 pr-3 font-medium">{row.query}</td>
                            <td className="py-2 pr-3 text-right">{formatNumber(row.clicks)}</td>
                            <td className="py-2 pr-3 text-right">{formatNumber(row.impressions)}</td>
                            <td className="py-2 text-right">{formatPosition(row.position)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {!topKeywords.length && <p className="py-8 text-center text-sm text-muted-foreground">No query rows returned for this period.</p>}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top pages in Google</CardTitle>
                  <CardDescription>Landing pages receiving impressions and clicks from Google Search.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-left text-xs text-muted-foreground">
                        <tr className="border-b"><th className="pb-2 pr-3">Page</th><th className="pb-2 pr-3 text-right">Clicks</th><th className="pb-2 pr-3 text-right">Imp.</th><th className="pb-2 text-right">Pos.</th></tr>
                      </thead>
                      <tbody>
                        {topPages.map((row) => {
                          let label = row.page;
                          try { label = new URL(row.page).pathname || '/'; } catch { /* keep full value */ }
                          return (
                            <tr key={row.page} className="border-b last:border-0">
                              <td className="max-w-[280px] break-all py-2 pr-3 font-medium">{label}</td>
                              <td className="py-2 pr-3 text-right">{formatNumber(row.clicks)}</td>
                              <td className="py-2 pr-3 text-right">{formatNumber(row.impressions)}</td>
                              <td className="py-2 text-right">{formatPosition(row.position)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {!topPages.length && <p className="py-8 text-center text-sm text-muted-foreground">No page rows returned for this period.</p>}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Google URL inspection</CardTitle>
                <CardDescription>Check Google’s indexed version, crawl status and canonical for any BC Pressure Washing URL.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    value={inspectUrl}
                    onChange={(event) => setInspectUrl(event.target.value)}
                    className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm"
                    placeholder="https://bcpressurewashing.ca/services/window-cleaning"
                  />
                  <Button onClick={inspect} disabled={inspectLoading}>
                    {inspectLoading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />} Inspect URL
                  </Button>
                </div>

                {inspection?.indexStatusResult && (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">Verdict</div><div className="mt-1 font-semibold">{inspection.indexStatusResult.verdict || 'Unknown'}</div></div>
                    <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">Coverage</div><div className="mt-1 font-semibold">{inspection.indexStatusResult.coverageState || 'Unknown'}</div></div>
                    <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">Last crawl</div><div className="mt-1 font-semibold">{inspection.indexStatusResult.lastCrawlTime ? new Date(inspection.indexStatusResult.lastCrawlTime).toLocaleString() : '—'}</div></div>
                    <div className="rounded-xl border p-3"><div className="text-xs text-muted-foreground">Google canonical</div><div className="mt-1 break-all text-sm font-semibold">{inspection.indexStatusResult.googleCanonical || '—'}</div></div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

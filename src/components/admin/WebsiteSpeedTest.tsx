import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Gauge, Monitor, RefreshCw, Smartphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WEBSITE_URL = 'https://bcpressurewashing.ca/';
const PAGESPEED_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const STORAGE_KEY = 'bc-pressure-washing:website-speed-test:v1';

type Strategy = 'mobile' | 'desktop';

type SpeedResult = {
  strategy: Strategy;
  score: number | null;
  firstContentfulPaint: number | null;
  largestContentfulPaint: number | null;
  totalBlockingTime: number | null;
  cumulativeLayoutShift: number | null;
  speedIndex: number | null;
  testedAt: string;
};

type SpeedResults = Partial<Record<Strategy, SpeedResult>>;

type PageSpeedAudit = {
  numericValue?: number;
};

type PageSpeedResponse = {
  lighthouseResult?: {
    categories?: {
      performance?: {
        score?: number | null;
      };
    };
    audits?: Record<string, PageSpeedAudit | undefined>;
  };
  error?: {
    message?: string;
  };
};

const metricValue = (audits: Record<string, PageSpeedAudit | undefined>, key: string) => {
  const value = audits[key]?.numericValue;
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
};

const formatDuration = (value: number | null) => {
  if (value === null) return '—';
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}s`;
  return `${Math.round(value)}ms`;
};

const formatCls = (value: number | null) => (value === null ? '—' : value.toFixed(3));

const scoreLabel = (score: number | null) => {
  if (score === null) return 'No score';
  if (score >= 90) return 'Good';
  if (score >= 50) return 'Needs work';
  return 'Poor';
};

const scoreClasses = (score: number | null) => {
  if (score === null) return 'border-muted text-muted-foreground bg-muted/30';
  if (score >= 90) return 'border-emerald-500/35 text-emerald-700 bg-emerald-500/10 dark:text-emerald-400';
  if (score >= 50) return 'border-amber-500/35 text-amber-700 bg-amber-500/10 dark:text-amber-400';
  return 'border-destructive/35 text-destructive bg-destructive/10';
};

const badgeClasses = (score: number | null) => {
  if (score === null) return '';
  if (score >= 90) return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400';
  if (score >= 50) return 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400';
  return 'border-destructive/30 bg-destructive/10 text-destructive';
};

async function runPageSpeed(strategy: Strategy): Promise<SpeedResult> {
  const requestUrl = new URL(PAGESPEED_ENDPOINT);
  requestUrl.searchParams.set('url', WEBSITE_URL);
  requestUrl.searchParams.set('strategy', strategy);
  requestUrl.searchParams.set('category', 'performance');

  const optionalKey = import.meta.env.VITE_PAGESPEED_API_KEY;
  if (optionalKey) requestUrl.searchParams.set('key', optionalKey);

  const response = await fetch(requestUrl.toString());
  const data = (await response.json().catch(() => ({}))) as PageSpeedResponse;

  if (!response.ok) {
    throw new Error(data.error?.message || `PageSpeed returned HTTP ${response.status}`);
  }

  const performanceScore = data.lighthouseResult?.categories?.performance?.score;
  const audits = data.lighthouseResult?.audits || {};

  return {
    strategy,
    score: typeof performanceScore === 'number' ? Math.round(performanceScore * 100) : null,
    firstContentfulPaint: metricValue(audits, 'first-contentful-paint'),
    largestContentfulPaint: metricValue(audits, 'largest-contentful-paint'),
    totalBlockingTime: metricValue(audits, 'total-blocking-time'),
    cumulativeLayoutShift: metricValue(audits, 'cumulative-layout-shift'),
    speedIndex: metricValue(audits, 'speed-index'),
    testedAt: new Date().toISOString(),
  };
}

function ResultPanel({ strategy, result }: { strategy: Strategy; result?: SpeedResult }) {
  const Icon = strategy === 'mobile' ? Smartphone : Monitor;
  const title = strategy === 'mobile' ? 'Mobile' : 'Desktop';

  return (
    <div className="rounded-2xl border bg-background p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-muted p-2"><Icon className="h-4 w-4" /></div>
          <div>
            <div className="font-semibold">{title}</div>
            <div className="text-xs text-muted-foreground">Lighthouse performance</div>
          </div>
        </div>
        <Badge variant="outline" className={badgeClasses(result?.score ?? null)}>
          {scoreLabel(result?.score ?? null)}
        </Badge>
      </div>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-[9px] ${scoreClasses(result?.score ?? null)}`}>
          <div className="text-center">
            <div className="text-3xl font-bold leading-none">{result?.score ?? '—'}</div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-wide">/ 100</div>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
          <div className="rounded-xl bg-muted/50 p-3">
            <div className="text-[11px] text-muted-foreground">FCP</div>
            <div className="mt-1 font-semibold">{formatDuration(result?.firstContentfulPaint ?? null)}</div>
          </div>
          <div className="rounded-xl bg-muted/50 p-3">
            <div className="text-[11px] text-muted-foreground">LCP</div>
            <div className="mt-1 font-semibold">{formatDuration(result?.largestContentfulPaint ?? null)}</div>
          </div>
          <div className="rounded-xl bg-muted/50 p-3">
            <div className="text-[11px] text-muted-foreground">TBT</div>
            <div className="mt-1 font-semibold">{formatDuration(result?.totalBlockingTime ?? null)}</div>
          </div>
          <div className="rounded-xl bg-muted/50 p-3">
            <div className="text-[11px] text-muted-foreground">CLS</div>
            <div className="mt-1 font-semibold">{formatCls(result?.cumulativeLayoutShift ?? null)}</div>
          </div>
          <div className="rounded-xl bg-muted/50 p-3 sm:col-span-2">
            <div className="text-[11px] text-muted-foreground">Speed Index</div>
            <div className="mt-1 font-semibold">{formatDuration(result?.speedIndex ?? null)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebsiteSpeedTest() {
  const [results, setResults] = useState<SpeedResults>({});
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setResults(JSON.parse(stored) as SpeedResults);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const lastTested = useMemo(() => {
    const timestamps = [results.mobile?.testedAt, results.desktop?.testedAt].filter(Boolean) as string[];
    if (!timestamps.length) return null;
    return timestamps.sort().at(-1) || null;
  }, [results]);

  const runTest = async () => {
    if (running) return;
    setRunning(true);
    setError(null);

    const [mobile, desktop] = await Promise.allSettled([
      runPageSpeed('mobile'),
      runPageSpeed('desktop'),
    ]);

    const next: SpeedResults = { ...results };
    const failures: string[] = [];

    if (mobile.status === 'fulfilled') next.mobile = mobile.value;
    else failures.push(`Mobile: ${mobile.reason instanceof Error ? mobile.reason.message : 'test failed'}`);

    if (desktop.status === 'fulfilled') next.desktop = desktop.value;
    else failures.push(`Desktop: ${desktop.reason instanceof Error ? desktop.reason.message : 'test failed'}`);

    setResults(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Speed results still work for this session if storage is unavailable.
    }

    if (failures.length) setError(failures.join(' · '));
    setRunning(false);
  };

  return (
    <Card>
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-primary" /> Website Speed
          </CardTitle>
          <CardDescription className="mt-1">
            Real Google PageSpeed Insights test for the BC Pressure Washing homepage on mobile and desktop.
          </CardDescription>
        </div>
        <Button onClick={runTest} disabled={running} className="shrink-0">
          <RefreshCw className={`mr-2 h-4 w-4 ${running ? 'animate-spin' : ''}`} />
          {running ? 'Testing both…' : 'Run speed test'}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 xl:grid-cols-2">
          <ResultPanel strategy="mobile" result={results.mobile} />
          <ResultPanel strategy="desktop" result={results.desktop} />
        </div>

        <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{lastTested ? `Last tested ${new Date(lastTested).toLocaleString()}` : 'No speed test has been run on this browser yet.'}</span>
          <span className="truncate">Testing: {WEBSITE_URL}</span>
        </div>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

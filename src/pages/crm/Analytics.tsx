import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, TrendingUp, Users, MapPin, Clock, Calendar, Target, BarChart3 } from 'lucide-react';

interface SessionStats {
  totalSessions: number;
  totalProperties: number;
  totalContacts: number;
  averageSessionDuration: number;
  conversionRate: number;
  totalDistance: number;
}

interface RecentSession {
  id: string;
  employee_name: string;
  session_start: string;
  session_end: string;
  total_visits: number;
  successful_contacts: number;
  total_duration_minutes: number;
}

export default function Analytics() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<SessionStats>({
    totalSessions: 0,
    totalProperties: 0,
    totalContacts: 0,
    averageSessionDuration: 0,
    conversionRate: 0,
    totalDistance: 0
  });
  const [recentSessions, setRecentSessions] = useState<RecentSession[]>([]);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      const cutoffDate = new Date();
      if (timeRange === 'week') {
        cutoffDate.setDate(cutoffDate.getDate() - 7);
      } else if (timeRange === 'month') {
        cutoffDate.setMonth(cutoffDate.getMonth() - 1);
      }

      let sessionsQuery = supabase
        .from('employee_work_sessions')
        .select('*')
        .eq('session_status', 'completed')
        .order('session_start', { ascending: false });

      if (timeRange !== 'all') {
        sessionsQuery = sessionsQuery.gte('session_start', cutoffDate.toISOString());
      }

      const { data: sessions, error: sessionsError } = await sessionsQuery;
      if (sessionsError) throw sessionsError;

      let propertiesQuery = supabase
        .from('properties')
        .select('id, status, created_at');

      if (timeRange !== 'all') {
        propertiesQuery = propertiesQuery.gte('created_at', cutoffDate.toISOString());
      }

      const { data: properties, error: propertiesError } = await propertiesQuery;
      if (propertiesError) throw propertiesError;

      const totalSessions = sessions?.length || 0;
      const totalVisits = sessions?.reduce((sum, s) => sum + (s.total_visits || 0), 0) || 0;
      const totalContacts = sessions?.reduce((sum, s) => sum + (s.successful_contacts || 0), 0) || 0;
      const totalDuration = sessions?.reduce((sum, s) => sum + (s.total_duration_minutes || 0), 0) || 0;
      const avgDuration = totalSessions > 0 ? Math.round(totalDuration / totalSessions) : 0;
      const conversionRate = totalVisits > 0 ? Math.round((totalContacts / totalVisits) * 100) : 0;

      setStats({
        totalSessions,
        totalProperties: properties?.length || 0,
        totalContacts,
        averageSessionDuration: avgDuration,
        conversionRate,
        totalDistance: 0
      });

      setRecentSessions(sessions?.slice(0, 10) || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: 'Error',
        description: 'Failed to load analytics',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/crm')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to CRM
            </Button>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeRange === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('week')}
            >
              This Week
            </Button>
            <Button
              variant={timeRange === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('month')}
            >
              This Month
            </Button>
            <Button
              variant={timeRange === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange('all')}
            >
              All Time
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSessions}</div>
              <p className="text-xs text-muted-foreground">
                Canvassing sessions completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Properties Captured</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
              <p className="text-xs text-muted-foreground">
                Total properties added
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">
                Successful contacts made
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatDuration(stats.averageSessionDuration)}</div>
              <p className="text-xs text-muted-foreground">
                Per canvassing session
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
              <CardDescription>Latest completed canvassing sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {recentSessions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No sessions yet</p>
              ) : (
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{session.employee_name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(session.session_start).toLocaleDateString()} • {formatDuration(session.total_duration_minutes || 0)}
                        </div>
                      </div>
                      <div className="flex gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold">{session.total_visits || 0}</div>
                          <div className="text-xs text-muted-foreground">Visits</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">{session.successful_contacts || 0}</div>
                          <div className="text-xs text-muted-foreground">Contacts</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold">
                            {session.total_visits > 0 
                              ? Math.round((session.successful_contacts / session.total_visits) * 100)
                              : 0}%
                          </div>
                          <div className="text-xs text-muted-foreground">Rate</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Insights</CardTitle>
              <CardDescription>Key metrics and trends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Contacts</span>
                  <Badge variant="secondary">{stats.totalContacts}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <Badge 
                    variant={stats.conversionRate >= 50 ? 'default' : 'secondary'}
                    className={stats.conversionRate >= 50 ? 'bg-green-500' : ''}
                  >
                    {stats.conversionRate >= 50 ? 'High' : 'Moderate'}
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-start gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Growing Territory</p>
                    <p className="text-muted-foreground text-xs">
                      {stats.totalProperties} properties mapped
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-4" onClick={() => navigate('/crm/properties')}>
                View All Properties
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

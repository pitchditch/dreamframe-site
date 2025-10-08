import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Clock, Users, Calendar, Navigation } from 'lucide-react';

interface RouteSession {
  id: string;
  employee_name: string;
  session_start: string;
  session_end: string | null;
  start_latitude: number | null;
  start_longitude: number | null;
  end_latitude: number | null;
  end_longitude: number | null;
  total_visits: number;
  successful_contacts: number;
  total_duration_minutes: number | null;
  session_status: string;
}

export default function RouteHistory() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<RouteSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<RouteSession | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_work_sessions')
        .select('*')
        .order('session_start', { ascending: false })
        .limit(50);

      if (error) throw error;

      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load route history',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading route history...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/house-tracking?tab=crm')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to CRM
          </Button>
          <div className="flex items-center gap-2">
            <Navigation className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Route History</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {sessions.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No route history available yet.</p>
                <Button className="mt-4" onClick={() => navigate('/crm/canvasser')}>
                  Start First Session
                </Button>
              </Card>
            ) : (
              sessions.map((session) => (
                <Card 
                  key={session.id}
                  className={`cursor-pointer transition-all ${selectedSession?.id === session.id ? 'ring-2 ring-primary' : 'hover:shadow-lg'}`}
                  onClick={() => setSelectedSession(session)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <CardTitle className="text-lg">{session.employee_name}</CardTitle>
                          <Badge className={getStatusColor(session.session_status)}>
                            {session.session_status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(session.session_start).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(session.session_start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">{session.total_visits || 0}</div>
                        <div className="text-xs text-muted-foreground">Visits</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{session.successful_contacts || 0}</div>
                        <div className="text-xs text-muted-foreground">Contacts</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">
                          {session.total_visits > 0 
                            ? Math.round((session.successful_contacts / session.total_visits) * 100)
                            : 0}%
                        </div>
                        <div className="text-xs text-muted-foreground">Success</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{formatDuration(session.total_duration_minutes)}</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <div className="lg:col-span-1">
            {selectedSession ? (
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Session Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Canvasser</p>
                    <p className="text-sm text-muted-foreground">{selectedSession.employee_name}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Status</p>
                    <Badge className={getStatusColor(selectedSession.session_status)}>
                      {selectedSession.session_status}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Start Time</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedSession.session_start).toLocaleString()}
                    </p>
                  </div>

                  {selectedSession.session_end && (
                    <div>
                      <p className="text-sm font-medium mb-1">End Time</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedSession.session_end).toLocaleString()}
                      </p>
                    </div>
                  )}

                  {selectedSession.start_latitude && selectedSession.start_longitude && (
                    <div>
                      <p className="text-sm font-medium mb-1">Start Location</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedSession.start_latitude.toFixed(6)}, {selectedSession.start_longitude.toFixed(6)}
                      </p>
                    </div>
                  )}

                  {selectedSession.end_latitude && selectedSession.end_longitude && (
                    <div>
                      <p className="text-sm font-medium mb-1">End Location</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedSession.end_latitude.toFixed(6)}, {selectedSession.end_longitude.toFixed(6)}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Properties Visited</span>
                      <span className="font-medium">{selectedSession.total_visits || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Successful Contacts</span>
                      <span className="font-medium">{selectedSession.successful_contacts || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-medium">{formatDuration(selectedSession.total_duration_minutes)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-6">
                <CardContent className="py-12 text-center">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Select a session to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

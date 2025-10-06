import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Play, Square, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const CanvasserMode = () => {
  const navigate = useNavigate();
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionData, setSessionData] = useState({
    startTime: null as Date | null,
    propertiesVisited: 0,
    leadsGenerated: 0,
    distance: 0
  });

  const handleStartSession = () => {
    setSessionActive(true);
    setSessionData({
      startTime: new Date(),
      propertiesVisited: 0,
      leadsGenerated: 0,
      distance: 0
    });
    toast.success('Canvassing session started!');
  };

  const handleEndSession = async () => {
    if (!sessionData.startTime) return;

    const duration = Math.floor((new Date().getTime() - sessionData.startTime.getTime()) / 1000 / 60);
    
    toast.success(`Session ended! Duration: ${duration} minutes`);
    setSessionActive(false);
    setSessionData({
      startTime: null,
      propertiesVisited: 0,
      leadsGenerated: 0,
      distance: 0
    });
  };

  const formatDuration = () => {
    if (!sessionData.startTime) return '0:00';
    const seconds = Math.floor((new Date().getTime() - sessionData.startTime.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/crm')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Canvasser Mode</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Session Status */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Session Status</CardTitle>
                <CardDescription>
                  {sessionActive ? 'Currently canvassing' : 'No active session'}
                </CardDescription>
              </div>
              {sessionActive && (
                <Badge variant="default" className="animate-pulse">
                  Active
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!sessionActive ? (
              <Button onClick={handleStartSession} className="w-full" size="lg">
                <Play className="w-5 h-5 mr-2" />
                Start Canvassing Session
              </Button>
            ) : (
              <div className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {formatDuration()}
                  </div>
                  <p className="text-sm text-muted-foreground">Session Duration</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{sessionData.propertiesVisited}</div>
                    <p className="text-xs text-muted-foreground">Properties</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{sessionData.leadsGenerated}</div>
                    <p className="text-xs text-muted-foreground">Leads</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{sessionData.distance.toFixed(1)}</div>
                    <p className="text-xs text-muted-foreground">km</p>
                  </div>
                </div>

                <Button onClick={handleEndSession} variant="destructive" className="w-full" size="lg">
                  <Square className="w-5 h-5 mr-2" />
                  End Session
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {sessionActive && (
          <div className="space-y-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/crm/property-capture')}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Quick Capture</CardTitle>
                    <CardDescription>Add a new property</CardDescription>
                  </div>
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion Rate</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-medium">
                        {sessionData.propertiesVisited > 0 
                          ? ((sessionData.leadsGenerated / sessionData.propertiesVisited) * 100).toFixed(0)
                          : 0}%
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Avg. Time per Door</span>
                    <span className="font-medium">
                      {sessionData.propertiesVisited > 0 && sessionData.startTime
                        ? `${Math.floor((new Date().getTime() - sessionData.startTime.getTime()) / 1000 / 60 / sessionData.propertiesVisited)} min`
                        : '0 min'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Instructions for Non-Active Session */}
        {!sessionActive && (
          <Card>
            <CardHeader>
              <CardTitle>How to Use Canvasser Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <p>Start a session before you begin canvassing your territory</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <p>Capture property details and customer information as you go door-to-door</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <p>Track your progress with real-time statistics</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-primary">4</span>
                </div>
                <p>End your session when complete to view your results</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default CanvasserMode;

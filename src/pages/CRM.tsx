import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { MagicLinkLogin } from '@/components/auth/MagicLinkLogin';
import { WebsiteSpeedTest } from '@/components/admin/WebsiteSpeedTest';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Users, FileText, LogOut, BarChart3, Navigation, PhoneCall, ShieldCheck, Video, Receipt } from 'lucide-react';
import { toast } from 'sonner';

const CRM = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        if (!cancelled) {
          setIsAuthorized(false);
          setLoading(false);
        }
        return;
      }

      const { data: isAdmin, error } = await (supabase as any).rpc('is_admin', {});
      if (!cancelled) {
        setIsAuthorized(!error && isAdmin === true);
        setLoading(false);
      }
    };

    void checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }
      void checkAuth();
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">BC Admin</CardTitle>
            <CardDescription>Sign in with an authorized admin account</CardDescription>
          </CardHeader>
          <CardContent>
            <MagicLinkLogin />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">BC Admin</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Choose an action to get started</p>
        </div>

        <div className="mb-8">
          <WebsiteSpeedTest />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group border-primary/20" onClick={() => navigate('/crm/quotes')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Receipt className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Quotes & Sales</CardTitle>
              <CardDescription>Manage quotes, exact-record follow-ups, invoices, receipts, approvals and customer plans in one workspace.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Open Quotes & Sales</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/virtual-estimates')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Virtual Estimates</CardTitle>
              <CardDescription>Host live customer video estimates with AI translation and structured estimate notes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Open Virtual Estimates</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/call-desk')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <PhoneCall className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Human Call Desk</CardTitle>
              <CardDescription>Cold-call queue with AI prep, notes, callbacks, follow-ups, and caller performance tracking.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Open Call Desk</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/outbound-consent')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Outbound Consent</CardTitle>
              <CardDescription>Record SMS and monthly AI-call permission, review due contacts, and manage opt-outs without mixing consent types.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Manage Consent</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/clients')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Clients</CardTitle>
              <CardDescription>Add, edit, select, and delete multiple clients at once. Admin tests are labeled separately.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Manage Clients</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/canvasser')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Canvasser Mode</CardTitle>
              <CardDescription>Track door-to-door visits and capture leads in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Start Canvassing</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/property-capture')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Property Capture</CardTitle>
              <CardDescription>Add and manage property information with address lookup</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Add Property</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/properties')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>View Properties</CardTitle>
              <CardDescription>Browse and search all captured properties</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">View All</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/map')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Map View</CardTitle>
              <CardDescription>Visualize properties on an interactive map</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">Open Map</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/analytics')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View performance metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">View Dashboard</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => navigate('/crm/routes')}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Navigation className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Route History</CardTitle>
              <CardDescription>Review past canvassing sessions and routes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">View Routes</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CRM;

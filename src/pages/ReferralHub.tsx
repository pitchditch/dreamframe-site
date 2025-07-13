import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Gift, Users, TrendingUp, Eye, MousePointer, Share2, Calendar, Phone, Mail, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { trackEvent } from '@/lib/analytics-client';

interface Referral {
  id: string;
  referral_code: string;
  referrer_name: string;
  referrer_email: string;
  referrer_phone: string;
  friend_name: string;
  friend_email: string;
  friend_phone: string;
  status: string;
  created_at: string;
}

interface AnalyticsData {
  totalReferrals: number;
  pendingReferrals: number;
  completedReferrals: number;
  totalViews: number;
  totalClicks: number;
  conversionRate: number;
}

const ReferralHub = () => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalReferrals: 0,
    pendingReferrals: 0,
    completedReferrals: 0,
    totalViews: 0,
    totalClicks: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReferrals();
    fetchAnalytics();
    trackEvent('referral_hub_view');
  }, []);

  const fetchReferrals = async () => {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReferrals(data || []);
    } catch (error) {
      console.error('Error fetching referrals:', error);
      toast.error('Failed to load referrals');
    }
  };

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select('status');

      if (error) throw error;

      const totalReferrals = data?.length || 0;
      const pendingReferrals = data?.filter(r => r.status === 'pending').length || 0;
      const completedReferrals = data?.filter(r => r.status === 'completed').length || 0;

      // Mock analytics data - in a real app, you'd track these separately
      const totalViews = totalReferrals * 15; // Estimated views
      const totalClicks = totalReferrals * 8; // Estimated clicks
      const conversionRate = totalReferrals > 0 ? (completedReferrals / totalReferrals) * 100 : 0;

      setAnalytics({
        totalReferrals,
        pendingReferrals,
        completedReferrals,
        totalViews,
        totalClicks,
        conversionRate
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReferralStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('referrals')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      setReferrals(referrals.map(r => 
        r.id === id ? { ...r, status } : r
      ));

      toast.success('Referral status updated successfully');
      fetchAnalytics(); // Refresh analytics
    } catch (error) {
      console.error('Error updating referral:', error);
      toast.error('Failed to update referral status');
    }
  };

  const copyReferralCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success('Referral code copied to clipboard!');
    trackEvent('referral_code_copy', { code });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReferrals = referrals.filter(referral =>
    referral.referrer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.friend_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.referral_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Layout title="Referral Hub - Loading...">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-bc-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading referral data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout 
      title="Referral Hub - BC Pressure Washing Analytics"
      description="View and manage referral analytics, codes, and conversion data for BC Pressure Washing referral program."
    >
      <Helmet>
        <title>Referral Hub - Analytics & Management | BC Pressure Washing</title>
        <meta name="description" content="Comprehensive referral analytics dashboard with Google Analytics integration, conversion tracking, and referral code management." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Referral Hub</h1>
            <p className="text-gray-600">Analytics, tracking, and management for the referral program</p>
          </div>

          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                    <Gift className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.totalReferrals}</div>
                    <p className="text-xs text-muted-foreground">All time referrals</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.pendingReferrals}</div>
                    <p className="text-xs text-muted-foreground">Awaiting contact</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.completedReferrals}</div>
                    <p className="text-xs text-muted-foreground">Successful bookings</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <MousePointer className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.conversionRate.toFixed(1)}%</div>
                    <p className="text-xs text-muted-foreground">Pending to completed</p>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Traffic Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Estimated Page Views</span>
                      <span className="font-semibold">{analytics.totalViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Referral Button Clicks</span>
                      <span className="font-semibold">{analytics.totalClicks.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      * Estimated based on referral submissions
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Integration Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Google Analytics</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Meta Pixel</span>
                      <Badge variant="secondary">Pending Setup</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Database Logging</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Referrals Tab */}
            <TabsContent value="referrals" className="space-y-6">
              <div className="flex justify-between items-center">
                <Input
                  placeholder="Search referrals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
                <Button onClick={fetchReferrals} variant="outline">
                  Refresh Data
                </Button>
              </div>

              <div className="space-y-4">
                {filteredReferrals.map((referral) => (
                  <Card key={referral.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                              {referral.referral_code}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyReferralCode(referral.referral_code)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                              {formatDate(referral.created_at)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(referral.status)}>
                            {referral.status}
                          </Badge>
                          {referral.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => updateReferralStatus(referral.id, 'completed')}
                            >
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Referrer</h4>
                          <div className="space-y-1 text-sm">
                            <div>{referral.referrer_name}</div>
                            {referral.referrer_email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                <a 
                                  href={`mailto:${referral.referrer_email}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {referral.referrer_email}
                                </a>
                              </div>
                            )}
                            {referral.referrer_phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                <a 
                                  href={`tel:${referral.referrer_phone}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {referral.referrer_phone}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Friend</h4>
                          <div className="space-y-1 text-sm">
                            <div>{referral.friend_name}</div>
                            {referral.friend_email && (
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                <a 
                                  href={`mailto:${referral.friend_email}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {referral.friend_email}
                                </a>
                              </div>
                            )}
                            {referral.friend_phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                <a 
                                  href={`tel:${referral.friend_phone}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {referral.friend_phone}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredReferrals.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No referrals found</h3>
                      <p className="text-gray-600">
                        {searchTerm ? 'Try adjusting your search terms.' : 'Referrals will appear here when submitted.'}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Integrations Tab */}
            <TabsContent value="integrations" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      Google Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600">
                      Track referral form submissions and button clicks with Google Analytics.
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Active</Badge>
                      <span className="text-sm">GA4 Integration</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open('https://analytics.google.com/', '_blank')}
                    >
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      Meta Pixel
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600">
                      Track Facebook and Instagram ad conversions from referrals.
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Setup Required</Badge>
                      <span className="text-sm">Not Connected</span>
                    </div>
                    <Button variant="outline" className="w-full" disabled>
                      Setup Meta Pixel
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      Database Logging
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-sm text-gray-600">
                      All referral data is automatically stored in Supabase database.
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="default">Active</Badge>
                      <span className="text-sm">Real-time Sync</span>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => window.open('https://supabase.com/dashboard/project/uyyudsjqwspapmujvzmm', '_blank')}
                    >
                      View Database
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Integration Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600 mb-4">
                      Current tracking capabilities and integrations for the referral program.
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Form Submissions</span>
                        <Badge variant="default">Tracked</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Button Clicks</span>
                        <Badge variant="default">Tracked</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium">Referral Codes</span>
                        <Badge variant="default">Generated</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                        <span className="font-medium">Meta Pixel Events</span>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ReferralHub;
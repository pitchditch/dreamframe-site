
import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HousePin } from './types';

interface AnalyticsDashboardProps {
  pins: HousePin[];
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ pins }) => {
  const [analytics, setAnalytics] = useState({
    totalLeads: 0,
    facebookLeads: 0,
    doorToDoorLeads: 0,
    conversionRate: 0,
    completedJobs: 0,
    averageLeadScore: 0
  });

  useEffect(() => {
    const facebookLeads = pins.filter(pin => pin.leadSource === 'facebook').length;
    const doorToDoorLeads = pins.filter(pin => pin.leadSource === 'door-to-door').length;
    const completedJobs = pins.filter(pin => pin.status === 'completed').length;
    const totalLeads = pins.length;
    
    const leadScores = pins
      .filter(pin => pin.leadScore)
      .map(pin => {
        switch (pin.leadScore) {
          case 'high': return 3;
          case 'medium': return 2;
          case 'low': return 1;
          default: return 2;
        }
      });
    
    const averageLeadScore = leadScores.length > 0 
      ? leadScores.reduce((sum, score) => sum + score, 0) / leadScores.length
      : 0;

    setAnalytics({
      totalLeads,
      facebookLeads,
      doorToDoorLeads,
      conversionRate: totalLeads > 0 ? (completedJobs / totalLeads) * 100 : 0,
      completedJobs,
      averageLeadScore
    });
  }, [pins]);

  const openGoogleAnalytics = () => {
    window.open('https://analytics.google.com/', '_blank');
  };

  const thisWeekLeads = pins.filter(pin => {
    const pinDate = new Date(pin.dateAdded);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return pinDate >= weekAgo;
  }).length;

  const thisMonthLeads = pins.filter(pin => {
    const pinDate = new Date(pin.dateAdded);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    return pinDate >= monthAgo;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold">Analytics Dashboard</h2>
        </div>
        <Button 
          onClick={openGoogleAnalytics}
          className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Open Google Analytics
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              All time tracking data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Facebook Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{analytics.facebookLeads}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.totalLeads > 0 ? Math.round((analytics.facebookLeads / analytics.totalLeads) * 100) : 0}% of total leads
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.conversionRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {analytics.completedJobs} completed jobs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lead Quality</CardTitle>
            <MapPin className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{analytics.averageLeadScore.toFixed(1)}/3</div>
            <p className="text-xs text-muted-foreground">
              Average lead score
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lead Source Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Lead Sources Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Facebook Leads</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{analytics.facebookLeads}</Badge>
                <span className="text-sm text-gray-500">
                  {analytics.totalLeads > 0 ? Math.round((analytics.facebookLeads / analytics.totalLeads) * 100) : 0}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Door-to-Door</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{analytics.doorToDoorLeads}</Badge>
                <span className="text-sm text-gray-500">
                  {analytics.totalLeads > 0 ? Math.round((analytics.doorToDoorLeads / analytics.totalLeads) * 100) : 0}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <span>Other Sources</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{analytics.totalLeads - analytics.facebookLeads - analytics.doorToDoorLeads}</Badge>
                <span className="text-sm text-gray-500">
                  {analytics.totalLeads > 0 ? Math.round(((analytics.totalLeads - analytics.facebookLeads - analytics.doorToDoorLeads) / analytics.totalLeads) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>This Week</span>
              <Badge variant="outline">{thisWeekLeads} new leads</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>This Month</span>
              <Badge variant="outline">{thisMonthLeads} new leads</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Pending Follow-ups</span>
              <Badge variant="outline">
                {pins.filter(pin => pin.followUpDate && new Date(pin.followUpDate) <= new Date()).length} due
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Analytics Integration Info */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <BarChart3 className="w-5 h-5" />
            Google Analytics Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Your website is already connected to Google Analytics. You can view detailed website traffic, 
              conversion data, and user behavior analytics by clicking the button above.
            </p>
            <div className="text-sm">
              <p><strong>What you can track in Google Analytics:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                <li>Website visitors and page views</li>
                <li>Form submissions and quote requests</li>
                <li>Traffic sources (Google, Facebook, direct, etc.)</li>
                <li>User behavior and conversion funnels</li>
                <li>Geographic data of your visitors</li>
              </ul>
            </div>
            <Badge className="bg-green-100 text-green-800">
              ✓ Google Analytics Active
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;

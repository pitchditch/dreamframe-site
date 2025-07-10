import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Share2,
  Calendar,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import { useQuoteLog } from '@/hooks/useQuoteLog';
import { Helmet } from 'react-helmet-async';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(amount);
};

// Mock analytics data - in production, this would come from real APIs
const mockAnalyticsData = {
  overview: {
    totalRevenue: 45890,
    totalLeads: 156,
    conversionRate: 12.8,
    avgQuoteValue: 485
  },
  revenueData: [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 3800 },
    { month: 'Mar', revenue: 5200 },
    { month: 'Apr', revenue: 4900 },
    { month: 'May', revenue: 6100 },
    { month: 'Jun', revenue: 5400 }
  ],
  trafficSources: [
    { name: 'Google Ads', value: 45, color: '#4285f4' },
    { name: 'Facebook Ads', value: 25, color: '#1877f2' },
    { name: 'Meta Ads', value: 15, color: '#e60023' },
    { name: 'Organic Search', value: 10, color: '#34a853' },
    { name: 'Direct', value: 5, color: '#ff9800' }
  ],
  deviceData: [
    { device: 'Mobile', visits: 2240, percentage: 65 },
    { device: 'Desktop', visits: 980, percentage: 28 },
    { device: 'Tablet', visits: 245, percentage: 7 }
  ],
  topPages: [
    { page: '/quote-builder', views: 1240, conversions: 89 },
    { page: '/', views: 2100, conversions: 45 },
    { page: '/services', views: 890, conversions: 32 },
    { page: '/about', views: 560, conversions: 12 }
  ]
};

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getQuoteLogs } = useQuoteLog();

  const loadData = useCallback(async () => {
    console.log('Dashboard: Starting to load data...');
    try {
      const quoteData = await getQuoteLogs(50);
      console.log('Dashboard: Received quote data:', quoteData);
      setQuotes(quoteData || []);
    } catch (error) {
      console.error('Dashboard: Failed to load dashboard data:', error);
    } finally {
      console.log('Dashboard: Setting loading to false');
      setLoading(false);
    }
  }, [getQuoteLogs]);

  useEffect(() => {
    loadData();
  }, []);

  const getQuoteStats = () => {
    if (!quotes.length) return { totalValue: 0, count: 0, avgValue: 0 };
    
    const totalValue = quotes.reduce((sum, quote) => sum + (quote.total_amount || 0), 0);
    const count = quotes.length;
    const avgValue = count > 0 ? totalValue / count : 0;
    
    return { totalValue, count, avgValue };
  };

  const quoteStats = getQuoteStats();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Analytics Dashboard - BC Pressure Washing</title>
        <meta name="description" content="Track business performance with comprehensive analytics from Google, Facebook, and Meta." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-xl text-gray-600">
              Comprehensive view of your business performance across all platforms
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(mockAnalyticsData.overview.totalRevenue)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{mockAnalyticsData.overview.totalLeads}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">{mockAnalyticsData.overview.conversionRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Quote Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(quoteStats.avgValue)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
              <TabsTrigger value="quotes">Quote Analytics</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={mockAnalyticsData.revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Device Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAnalyticsData.deviceData.map((device, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {device.device === 'Mobile' && <Smartphone className="h-5 w-5 text-gray-600" />}
                            {device.device === 'Desktop' && <Monitor className="h-5 w-5 text-gray-600" />}
                            {device.device === 'Tablet' && <Monitor className="h-5 w-5 text-gray-600" />}
                            <span className="font-medium">{device.device}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{device.visits}</p>
                            <p className="text-sm text-gray-600">{device.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="traffic" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={mockAnalyticsData.trafficSources}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {mockAnalyticsData.trafficSources.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Pages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockAnalyticsData.topPages.map((page, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{page.page}</p>
                            <p className="text-sm text-gray-600">{page.views} views</p>
                          </div>
                          <Badge variant="outline">
                            {page.conversions} conversions
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quotes" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Calendar className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Quotes Sent</p>
                        <p className="text-2xl font-bold text-gray-900">{quoteStats.count}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <DollarSign className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Quote Value</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(quoteStats.totalValue)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Average Quote</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatCurrency(quoteStats.avgValue)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Quotes</CardTitle>
                </CardHeader>
                <CardContent>
                  {quotes.length > 0 ? (
                    <div className="space-y-3">
                      {quotes.slice(0, 5).map((quote) => (
                        <div key={quote.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{quote.customer_name}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(quote.sent_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">
                              {formatCurrency(quote.total_amount)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {quote.services?.length || 0} services
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-600 py-8">No quotes available yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Globe className="h-6 w-6 text-blue-600" />
                          <div>
                            <p className="font-medium">Google Analytics</p>
                            <p className="text-sm text-gray-600">Website traffic & behavior</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Share2 className="h-6 w-6 text-blue-800" />
                          <div>
                            <p className="font-medium">Facebook Ads</p>
                            <p className="text-sm text-gray-600">Ad performance & reach</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Eye className="h-6 w-6 text-red-600" />
                          <div>
                            <p className="font-medium">Meta Ads</p>
                            <p className="text-sm text-gray-600">Instagram & Facebook ads</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Connected
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Google Analytics
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Share2 className="h-4 w-4 mr-2" />
                        Open Facebook Ads Manager
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <MousePointer className="h-4 w-4 mr-2" />
                        Check Meta Business Suite
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        View Quote History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
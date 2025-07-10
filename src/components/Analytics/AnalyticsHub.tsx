
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, TrendingUp, Eye, MousePointer, Phone, Mail, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsData {
  totalQuotes: number;
  totalRevenue: number;
  avgQuoteValue: number;
  conversionRate: number;
  monthlyQuotes: number;
  weeklyQuotes: number;
}

const AnalyticsHub: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalQuotes: 0,
    totalRevenue: 0,
    avgQuoteValue: 0,
    conversionRate: 0,
    monthlyQuotes: 0,
    weeklyQuotes: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      // Fetch quote analytics
      const { data: quotes, error } = await supabase
        .from('quotes')
        .select('total_amount, created_at');

      if (error) {
        console.error('Error fetching analytics:', error);
        return;
      }

      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const totalQuotes = quotes?.length || 0;
      const totalRevenue = quotes?.reduce((sum, quote) => sum + Number(quote.total_amount), 0) || 0;
      const avgQuoteValue = totalQuotes > 0 ? totalRevenue / totalQuotes : 0;
      
      const weeklyQuotes = quotes?.filter(quote => 
        new Date(quote.created_at) >= oneWeekAgo
      ).length || 0;
      
      const monthlyQuotes = quotes?.filter(quote => 
        new Date(quote.created_at) >= oneMonthAgo
      ).length || 0;

      setAnalyticsData({
        totalQuotes,
        totalRevenue,
        avgQuoteValue,
        conversionRate: 0, // This would need additional tracking
        monthlyQuotes,
        weeklyQuotes,
      });
    } catch (error) {
      console.error('Analytics fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-8">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your business performance and customer interactions</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <BarChart3 className="w-5 h-5" />
                Total Quotes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">
                {isLoading ? '...' : analyticsData.totalQuotes}
              </div>
              <p className="text-sm text-gray-600 mt-1">All time quotes sent</p>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <TrendingUp className="w-5 h-5" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">
                {isLoading ? '...' : formatCurrency(analyticsData.totalRevenue)}
              </div>
              <p className="text-sm text-gray-600 mt-1">From all quotes</p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Users className="w-5 h-5" />
                Avg Quote Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-800">
                {isLoading ? '...' : formatCurrency(analyticsData.avgQuoteValue)}
              </div>
              <p className="text-sm text-gray-600 mt-1">Average per quote</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Calendar className="w-5 h-5" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-800">
                {isLoading ? '...' : analyticsData.monthlyQuotes}
              </div>
              <p className="text-sm text-gray-600 mt-1">Quotes this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Performance */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Recent Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{analyticsData.weeklyQuotes}</div>
                <div className="text-sm text-gray-600">Quotes This Week</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{analyticsData.monthlyQuotes}</div>
                <div className="text-sm text-gray-600">Quotes This Month</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">
                  {analyticsData.weeklyQuotes > 0 ? 
                    Math.round((analyticsData.weeklyQuotes / analyticsData.monthlyQuotes) * 100) : 0}%
                </div>
                <div className="text-sm text-gray-600">Weekly Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Setup */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-6 h-6" />
              Tracking & Analytics Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Google Analytics 4</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Track page views, form submissions, and user interactions
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-700">Active (G-XTJFNK4L59)</span>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Facebook Pixel</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Track conversions and optimize ad campaigns
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-700">Ready to configure</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={fetchAnalyticsData}
              className="w-full md:w-auto"
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh Analytics'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsHub;

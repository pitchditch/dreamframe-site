import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, DollarSign, FileText, Mail, Phone, Search, User } from 'lucide-react';
import { useQuoteLog } from '@/hooks/useQuoteLog';
import { Helmet } from 'react-helmet-async';

interface Quote {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  property_address: string | null;
  house_size: string | null;
  services: Array<{ name: string; price: number }>;
  products: Array<{ name: string; price: number }>;
  total_amount: number;
  sent_at: string;
  notes: string | null;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(amount);
};

const QuoteLog = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const { getQuoteLogs } = useQuoteLog();

  useEffect(() => {
    loadQuotes();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = quotes.filter(quote =>
        quote.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.property_address?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuotes(filtered);
    } else {
      setFilteredQuotes(quotes);
    }
  }, [searchTerm, quotes]);

  const loadQuotes = async () => {
    try {
      const data = await getQuoteLogs(100);
      if (data) {
        setQuotes(data.map(item => ({
          ...item,
          services: Array.isArray(item.services) ? item.services as Array<{ name: string; price: number }> : [],
          products: Array.isArray(item.products) ? item.products as Array<{ name: string; price: number }> : []
        })) as Quote[]);
      }
    } catch (error) {
      console.error('Failed to load quotes:', error);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };

  const getTotalValue = () => {
    return filteredQuotes.reduce((sum, quote) => sum + quote.total_amount, 0);
  };

  const getHouseSizeLabel = (size: string | null) => {
    if (!size) return 'Not specified';
    const sizeMap: { [key: string]: string } = {
      'small': 'Small (0-1,800 sqft)',
      'medium': 'Medium (1,800-2,800 sqft)',
      'large': 'Large (2,800-3,500 sqft)',
      'xlarge': 'X-Large (3,500+ sqft)'
    };
    return sizeMap[size] || size;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading quote history...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Quote Log - BC Pressure Washing</title>
        <meta name="description" content="View and manage sent quotes for BC Pressure Washing services." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Quote History
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Track and manage all sent quotes for BC Pressure Washing services.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredQuotes.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Value</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(getTotalValue())}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Average Quote</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {filteredQuotes.length > 0 ? formatCurrency(getTotalValue() / filteredQuotes.length) : '$0.00'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Search className="h-5 w-5 text-gray-400" />
                <div className="flex-1">
                  <Label htmlFor="search" className="sr-only">Search quotes</Label>
                  <Input
                    id="search"
                    placeholder="Search by customer name, email, or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                  disabled={!searchTerm}
                >
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quotes List */}
          <div className="space-y-4">
            {filteredQuotes.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
                  <p className="text-gray-600">
                    {searchTerm ? 'Try adjusting your search terms.' : 'No quotes have been sent yet.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredQuotes.map((quote) => (
                <Card key={quote.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <CardTitle className="text-lg">{quote.customer_name}</CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(quote.sent_at).toLocaleDateString()}</span>
                            </div>
                            {quote.house_size && (
                              <Badge variant="outline">
                                {getHouseSizeLabel(quote.house_size)}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(quote.total_amount)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {quote.services.length} service{quote.services.length !== 1 ? 's' : ''}
                          {quote.products.length > 0 && `, ${quote.products.length} product${quote.products.length !== 1 ? 's' : ''}`}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        {quote.property_address && (
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium w-20">Address:</span>
                            <span>{quote.property_address}</span>
                          </div>
                        )}
                        {quote.customer_email && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="h-4 w-4 mr-2" />
                            <span>{quote.customer_email}</span>
                          </div>
                        )}
                        {quote.customer_phone && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-4 w-4 mr-2" />
                            <span>{quote.customer_phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium text-gray-700">Services:</span>
                          <div className="mt-1 space-y-1">
                            {quote.services.slice(0, 3).map((service: any, index: number) => (
                              <div key={index} className="text-gray-600 text-sm">
                                • {service.name}
                              </div>
                            ))}
                            {quote.services.length > 3 && (
                              <div className="text-gray-500 text-sm">
                                ... and {quote.services.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {quote.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <span className="font-medium text-gray-700 text-sm">Notes:</span>
                        <p className="text-gray-600 text-sm mt-1">{quote.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuoteLog;
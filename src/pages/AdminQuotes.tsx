
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { AdminQuoteReview } from '../components/AdminQuoteReview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';

const AdminQuotes = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [testQuoteData, setTestQuoteData] = useState({
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    service: 'House Washing',
    address: '123 Main Street, Vancouver, BC',
    originalQuote: 450,
    propertySize: 2200,
    requestDetails: 'Customer requested full house washing with driveway cleaning. Property has vinyl siding and concrete driveway.'
  });

  const handleQuoteSent = () => {
    setShowQuoteForm(false);
    // In a real app, you'd refresh the quotes list here
  };

  return (
    <Layout>
      <Helmet>
        <title>Admin - Quote Management | BC Pressure Washing</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Quote Management
            </h1>
            <p className="text-gray-600">
              Review and send professional quotes to customers
            </p>
          </div>

          {!showQuoteForm ? (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Test Quote Sender</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Customer Name</Label>
                    <Input
                      value={testQuoteData.customerName}
                      onChange={(e) => setTestQuoteData(prev => ({...prev, customerName: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label>Customer Email</Label>
                    <Input
                      type="email"
                      value={testQuoteData.customerEmail}
                      onChange={(e) => setTestQuoteData(prev => ({...prev, customerEmail: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label>Service</Label>
                    <Input
                      value={testQuoteData.service}
                      onChange={(e) => setTestQuoteData(prev => ({...prev, service: e.target.value}))}
                    />
                  </div>
                  <div>
                    <Label>Original Quote ($)</Label>
                    <Input
                      type="number"
                      value={testQuoteData.originalQuote}
                      onChange={(e) => setTestQuoteData(prev => ({...prev, originalQuote: parseInt(e.target.value) || 0}))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Address</Label>
                  <Input
                    value={testQuoteData.address}
                    onChange={(e) => setTestQuoteData(prev => ({...prev, address: e.target.value}))}
                  />
                </div>
                <Button 
                  onClick={() => setShowQuoteForm(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Review & Send Quote
                </Button>
              </CardContent>
            </Card>
          ) : (
            <AdminQuoteReview 
              quoteData={testQuoteData}
              onQuoteSent={handleQuoteSent}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminQuotes;

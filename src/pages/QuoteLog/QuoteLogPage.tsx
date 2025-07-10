import React, { useEffect, useState, useCallback } from 'react';
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet-async';
import { useQuoteLog } from '@/hooks/useQuoteLog';
import QuoteStatsCards from './components/QuoteStatsCards';
import QuoteSearch from './components/QuoteSearch';
import QuoteList from './components/QuoteList';
import LoadingState from './components/LoadingState';
import type { Quote } from './types';

const QuoteLogPage = () => {
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

  const loadQuotes = useCallback(async () => {
    console.log('QuoteLog: Starting to load quotes...');
    try {
      const data = await getQuoteLogs(100);
      console.log('QuoteLog: Received data:', data);
      if (data) {
        setQuotes(data.map(item => ({
          ...item,
          services: Array.isArray(item.services) ? item.services as Array<{ name: string; price: number }> : [],
          products: Array.isArray(item.products) ? item.products as Array<{ name: string; price: number }> : []
        })) as Quote[]);
        console.log('QuoteLog: Set quotes successfully');
      } else {
        console.log('QuoteLog: No data received');
        setQuotes([]);
      }
    } catch (error) {
      console.error('QuoteLog: Failed to load quotes:', error);
      setQuotes([]);
    } finally {
      console.log('QuoteLog: Setting loading to false');
      setLoading(false);
    }
  }, [getQuoteLogs]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <Layout>
        <LoadingState />
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
          <QuoteStatsCards quotes={filteredQuotes} />

          {/* Search */}
          <QuoteSearch
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
          />

          {/* Quotes List */}
          <QuoteList quotes={filteredQuotes} searchTerm={searchTerm} />
        </div>
      </div>
    </Layout>
  );
};

export default QuoteLogPage;
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, FileText } from 'lucide-react';
import { formatCurrency } from '../utils';
import type { Quote } from '../types';

interface QuoteStatsCardsProps {
  quotes: Quote[];
}

const QuoteStatsCards: React.FC<QuoteStatsCardsProps> = ({ quotes }) => {
  const getTotalValue = () => {
    return quotes.reduce((sum, quote) => sum + quote.total_amount, 0);
  };

  const getAverageValue = () => {
    const totalValue = getTotalValue();
    return quotes.length > 0 ? totalValue / quotes.length : 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Quotes</p>
              <p className="text-2xl font-bold text-gray-900">{quotes.length}</p>
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
                {formatCurrency(getAverageValue())}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteStatsCards;
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, Phone, User } from 'lucide-react';
import { formatCurrency, getHouseSizeLabel } from '../utils';
import type { Quote } from '../types';

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
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
  );
};

export default QuoteCard;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { History, Search, Calendar, User, Phone, Mail, MapPin, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SavedQuote {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  property_address?: string;
  house_size?: string;
  services: Array<{ name: string; price: number }>;
  add_ons: Array<{ name: string; price: number }>;
  products: Array<{ name: string; price: number }>;
  services_subtotal: number;
  products_subtotal: number;
  gst_amount: number;
  pst_amount: number;
  total_amount: number;
  notes?: string;
  created_at: string;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(amount);
};

const QuoteLog: React.FC = () => {
  const [quotes, setQuotes] = useState<SavedQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuote, setExpandedQuote] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching quotes:', error);
        toast({
          title: "Error",
          description: "Failed to load quote log.",
          variant: "destructive"
        });
        return;
      }

      setQuotes(data || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast({
        title: "Error",
        description: "Failed to load quote log.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredQuotes = quotes.filter(quote =>
    quote.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.property_address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (quoteId: string) => {
    setExpandedQuote(expandedQuote === quoteId ? null : quoteId);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Quote Log
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Loading quotes...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Quote Log ({quotes.length} quotes)
        </CardTitle>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by customer name, email, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={fetchQuotes}>
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredQuotes.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {searchTerm ? 'No quotes found matching your search.' : 'No quotes saved yet.'}
          </p>
        ) : (
          <div className="space-y-4">
            {filteredQuotes.map((quote) => (
              <div key={quote.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <h3 className="font-semibold text-lg">{quote.customer_name}</h3>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {formatCurrency(quote.total_amount)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                      {quote.customer_email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {quote.customer_email}
                        </div>
                      )}
                      {quote.customer_phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {quote.customer_phone}
                        </div>
                      )}
                      {quote.property_address && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {quote.property_address}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(quote.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(quote.id)}
                  >
                    {expandedQuote === quote.id ? 'Hide Details' : 'Show Details'}
                  </Button>
                </div>

                {expandedQuote === quote.id && (
                  <div className="border-t pt-4 mt-4 space-y-4">
                    {/* Services */}
                    {quote.services.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Services:</h4>
                        <div className="space-y-1">
                          {quote.services.map((service, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{service.name}</span>
                              <span>{formatCurrency(service.price)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add-ons */}
                    {quote.add_ons.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Add-ons:</h4>
                        <div className="space-y-1">
                          {quote.add_ons.map((addon, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{addon.name}</span>
                              <span>{formatCurrency(addon.price)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Products */}
                    {quote.products.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Products:</h4>
                        <div className="space-y-1">
                          {quote.products.map((product, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{product.name}</span>
                              <span>{formatCurrency(product.price)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Pricing Breakdown */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Pricing Breakdown:
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Services Subtotal:</span>
                          <span>{formatCurrency(quote.services_subtotal)}</span>
                        </div>
                        {quote.products_subtotal > 0 && (
                          <div className="flex justify-between">
                            <span>Products Subtotal:</span>
                            <span>{formatCurrency(quote.products_subtotal)}</span>
                          </div>
                        )}
                        {quote.gst_amount > 0 && (
                          <div className="flex justify-between">
                            <span>GST:</span>
                            <span>{formatCurrency(quote.gst_amount)}</span>
                          </div>
                        )}
                        {quote.pst_amount > 0 && (
                          <div className="flex justify-between">
                            <span>PST:</span>
                            <span>{formatCurrency(quote.pst_amount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between font-semibold border-t pt-1 mt-2">
                          <span>Total:</span>
                          <span>{formatCurrency(quote.total_amount)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    {quote.notes && (
                      <div>
                        <h4 className="font-medium mb-2">Notes:</h4>
                        <p className="text-sm text-gray-600 bg-yellow-50 p-2 rounded">
                          {quote.notes}
                        </p>
                      </div>
                    )}

                    {quote.house_size && (
                      <div>
                        <h4 className="font-medium mb-2">House Size:</h4>
                        <Badge variant="secondary">{quote.house_size}</Badge>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuoteLog;

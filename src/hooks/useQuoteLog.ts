import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface QuoteData {
  customerName: string;
  address: string;
  phone: string;
  email: string;
  houseSize: string;
  services: string[];
  notes: string;
  addOns: string[];
}

interface QuoteResult {
  services: Array<{
    name: string;
    price: number;
  }>;
  addOns: Array<{
    name: string;
    price: number;
  }>;
  products: Array<{
    name: string;
    price: number;
  }>;
  servicesSubtotal: number;
  productsSubtotal: number;
  gst: number;
  pst: number;
  total: number;
}

export const useQuoteLog = () => {
  const [isLogging, setIsLogging] = useState(false);
  const { toast } = useToast();

  const logSentQuote = async (quoteData: QuoteData, quoteResult: QuoteResult) => {
    setIsLogging(true);
    
    try {
      const { data, error } = await supabase
        .from('quotes')
        .insert({
          customer_name: quoteData.customerName,
          customer_email: quoteData.email,
          customer_phone: quoteData.phone,
          property_address: quoteData.address,
          house_size: quoteData.houseSize,
          services: [...quoteResult.services, ...quoteResult.addOns],
          add_ons: quoteResult.addOns,
          products: quoteResult.products,
          services_subtotal: quoteResult.servicesSubtotal,
          products_subtotal: quoteResult.productsSubtotal,
          gst_amount: quoteResult.gst,
          pst_amount: quoteResult.pst,
          total_amount: quoteResult.total,
          notes: quoteData.notes,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Quote Logged Successfully",
        description: `Quote for ${quoteData.customerName} has been recorded in the system.`,
      });

      return data;
    } catch (error) {
      console.error('Error logging quote:', error);
      toast({
        title: "Error Logging Quote",
        description: "Failed to save quote to the database. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLogging(false);
    }
  };

  const getQuoteLogs = async (limit = 50) => {
    try {
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching quote logs:', error);
      toast({
        title: "Error Fetching Quotes",
        description: "Failed to load quote history.",
        variant: "destructive"
      });
      throw error;
    }
  };

  return {
    logSentQuote,
    getQuoteLogs,
    isLogging
  };
};

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface QuoteLogData {
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  propertyAddress?: string;
  houseSize?: string;
  services: Array<{ name: string; price: number }>;
  addOns: Array<{ name: string; price: number }>;
  products: Array<{ name: string; price: number }>;
  servicesSubtotal: number;
  productsSubtotal: number;
  gstAmount: number;
  pstAmount: number;
  totalAmount: number;
  notes?: string;
}

export const useQuoteLog = () => {
  const [isLogging, setIsLogging] = useState(false);
  const { toast } = useToast();

  const logQuote = async (quoteData: QuoteLogData) => {
    setIsLogging(true);
    try {
      const { error } = await supabase
        .from('quotes')
        .insert({
          customer_name: quoteData.customerName,
          customer_email: quoteData.customerEmail,
          customer_phone: quoteData.customerPhone,
          property_address: quoteData.propertyAddress,
          house_size: quoteData.houseSize,
          services: quoteData.services,
          add_ons: quoteData.addOns,
          products: quoteData.products,
          services_subtotal: quoteData.servicesSubtotal,
          products_subtotal: quoteData.productsSubtotal,
          gst_amount: quoteData.gstAmount,
          pst_amount: quoteData.pstAmount,
          total_amount: quoteData.totalAmount,
          notes: quoteData.notes
        });

      if (error) {
        console.error('Error logging quote:', error);
        toast({
          title: "Error",
          description: "Failed to save quote to log.",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Quote Saved",
        description: "Quote has been saved to your log.",
      });
      return true;
    } catch (error) {
      console.error('Error logging quote:', error);
      toast({
        title: "Error",
        description: "Failed to save quote to log.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLogging(false);
    }
  };

  return { logQuote, isLogging };
};

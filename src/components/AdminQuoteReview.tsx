
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, DollarSign, FileText, Clock, MapPin } from 'lucide-react';

interface QuoteData {
  customerName: string;
  customerEmail: string;
  service: string;
  address: string;
  originalQuote?: number;
  propertySize?: number;
  requestDetails?: string;
}

interface AdminQuoteReviewProps {
  quoteData: QuoteData;
  onQuoteSent?: () => void;
}

export const AdminQuoteReview: React.FC<AdminQuoteReviewProps> = ({ 
  quoteData, 
  onQuoteSent 
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    finalQuote: quoteData.originalQuote || 0,
    workDescription: `Professional ${quoteData.service} service for your property at ${quoteData.address}.`,
    estimatedCompletionTime: '1-2 business days',
    termsAndConditions: `• Payment due upon completion of work
• 100% satisfaction guarantee
• Fully insured and bonded service
• Weather-dependent scheduling
• 24-hour notice required for cancellations`
  });

  const handleInputChange = (field: string, value: string | number) => {
    setQuoteForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendQuote = async () => {
    if (!quoteForm.finalQuote || quoteForm.finalQuote <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Quote",
        description: "Please enter a valid quote amount."
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-quote-contract', {
        body: {
          customerEmail: quoteData.customerEmail,
          customerName: quoteData.customerName,
          service: quoteData.service,
          address: quoteData.address,
          finalQuote: quoteForm.finalQuote,
          workDescription: quoteForm.workDescription,
          estimatedCompletionTime: quoteForm.estimatedCompletionTime,
          termsAndConditions: quoteForm.termsAndConditions
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Quote Sent Successfully!",
        description: `Professional quote sent to ${quoteData.customerName} at ${quoteData.customerEmail}`,
      });

      onQuoteSent?.();
    } catch (error) {
      console.error('Error sending quote:', error);
      toast({
        variant: "destructive",
        title: "Error Sending Quote",
        description: "Failed to send the quote. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Quote Review - {quoteData.customerName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Customer</Label>
              <p className="font-medium">{quoteData.customerName}</p>
              <p className="text-sm text-gray-600">{quoteData.customerEmail}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Service & Location</Label>
              <p className="font-medium">{quoteData.service}</p>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {quoteData.address}
              </p>
            </div>
          </div>
          
          {quoteData.requestDetails && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <Label className="text-sm font-medium text-gray-600">Original Request</Label>
              <p className="text-sm mt-1">{quoteData.requestDetails}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quote Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Quote Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="finalQuote">Final Quote Amount ($)</Label>
              <Input
                id="finalQuote"
                type="number"
                value={quoteForm.finalQuote}
                onChange={(e) => handleInputChange('finalQuote', parseFloat(e.target.value) || 0)}
                className="text-lg font-bold"
              />
            </div>
            <div>
              <Label htmlFor="completionTime">Estimated Completion Time</Label>
              <Input
                id="completionTime"
                value={quoteForm.estimatedCompletionTime}
                onChange={(e) => handleInputChange('estimatedCompletionTime', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="workDescription">Work Description</Label>
            <Textarea
              id="workDescription"
              value={quoteForm.workDescription}
              onChange={(e) => handleInputChange('workDescription', e.target.value)}
              rows={4}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="terms">Terms & Conditions</Label>
            <Textarea
              id="terms"
              value={quoteForm.termsAndConditions}
              onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
              rows={6}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center">
        <Button
          onClick={handleSendQuote}
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending Quote...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Professional Quote
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

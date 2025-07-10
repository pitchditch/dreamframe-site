
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calculator, Send, Copy, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import QuoteMessagePreview from './QuoteMessagePreview';

const formSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email('Valid email is required'),
  services: z.string().min(1, 'Services are required'),
  totalAmount: z.number().min(0, 'Total amount must be positive'),
  notes: z.string().optional(),
  propertyAddress: z.string().optional(),
  houseSize: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface QuoteData extends FormData {
  bookingLink?: string;
}

const QuotingAssistant: React.FC = () => {
  const [generatedMessages, setGeneratedMessages] = useState<{
    email: string;
    sms: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSMS, setCopiedSMS] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      services: '',
      totalAmount: 0,
      notes: '',
      propertyAddress: '',
      houseSize: '',
    },
  });

  const generateMessages = (data: QuoteData) => {
    const bookingLink = data.bookingLink || 'https://bcpressurewashing.ca/book-now';
    
    const emailMessage = `Subject: Your Professional Quote from BC Pressure Washing

Hi ${data.customerName},

Thank you for your interest in BC Pressure Washing! I'm excited to provide you with a personalized quote for your property.

**Your Selected Services:**
${data.services}

**Total Investment: $${data.totalAmount.toFixed(2)}**
${data.notes ? `\n*${data.notes}*` : ''}

**Why Choose BC Pressure Washing?**
• I, Jayden Fisher, personally oversee every job to ensure exceptional quality
• Licensed & insured with full WCB coverage
• 5-star rated service with proven results
• Local to White Rock & Surrey with years of experience

${data.propertyAddress ? `**Property Address:** ${data.propertyAddress}` : ''}
${data.houseSize ? `**Property Size:** ${data.houseSize}` : ''}

**Ready to Get Started?**
Book your service today: ${bookingLink}

Or give me a call directly at (778) 808-7620 - I'm always happy to discuss your project and answer any questions you might have.

Looking forward to transforming your property!

Best regards,
Jayden Fisher
BC Pressure Washing
(778) 808-7620
info@bcpressurewashing.ca`;

    const smsMessage = `Hi ${data.customerName}! Your BC Pressure Washing quote: ${data.services} - $${data.totalAmount.toFixed(2)}. ${data.notes ? data.notes + ' ' : ''}Book now: ${bookingLink} or call (778) 808-7620. Text back if you have questions. – Jayden`;

    return { email: emailMessage, sms: smsMessage };
  };

  const handleGenerateQuote = async (data: FormData) => {
    setIsGenerating(true);
    try {
      const messages = generateMessages(data);
      setGeneratedMessages(messages);
      
      toast({
        title: "Quote Generated!",
        description: "Your personalized email and SMS messages are ready to review.",
      });
    } catch (error) {
      console.error('Error generating quote:', error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your quote messages.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const logQuoteToDatabase = async (data: FormData) => {
    try {
      const quoteData = {
        customer_name: data.customerName,
        customer_phone: data.customerPhone || null,
        customer_email: data.customerEmail,
        services: [data.services], // Store as array for consistency with existing schema
        services_subtotal: data.totalAmount,
        products: [],
        products_subtotal: 0,
        add_ons: [],
        gst_amount: 0,
        pst_amount: 0,
        total_amount: data.totalAmount,
        notes: data.notes || null,
        property_address: data.propertyAddress || null,
        house_size: data.houseSize || null,
      };

      const { data: insertedQuote, error } = await supabase
        .from('quotes')
        .insert([quoteData])
        .select()
        .single();

      if (error) {
        console.error('Error logging quote:', error);
        throw error;
      }

      console.log('Quote logged successfully:', insertedQuote);
      return insertedQuote;
    } catch (error) {
      console.error('Failed to log quote to database:', error);
      throw error;
    }
  };

  const handleSendQuote = async () => {
    if (!generatedMessages) return;

    setIsSending(true);
    try {
      const formData = form.getValues();
      
      // Log quote to database first
      await logQuoteToDatabase(formData);

      // Send confirmation emails/SMS using existing edge function
      const { data, error } = await supabase.functions.invoke('send-confirmations', {
        body: {
          email: formData.customerEmail,
          phone: formData.customerPhone,
          name: formData.customerName,
          service: formData.services,
          formType: 'Professional Quote',
          message: formData.notes,
          estimateTotal: formData.totalAmount,
          services: [formData.services],
          addOns: [],
          houseSize: formData.houseSize,
          address: formData.propertyAddress,
          notes: formData.notes,
        },
      });

      if (error) {
        console.error('Error sending quote:', error);
        throw error;
      }

      toast({
        title: "Quote Sent Successfully!",
        description: `Quote sent to ${formData.customerName} and logged to database.`,
      });

      // Reset form and messages after successful send
      form.reset();
      setGeneratedMessages(null);

    } catch (error) {
      console.error('Error sending quote:', error);
      toast({
        title: "Sending Failed",
        description: "There was an error sending your quote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const copyToClipboard = async (text: string, type: 'email' | 'sms') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedSMS(true);
        setTimeout(() => setCopiedSMS(false), 2000);
      }
      toast({
        title: "Copied!",
        description: `${type.toUpperCase()} message copied to clipboard.`,
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            BC Pressure Washing - Quoting Assistant
          </CardTitle>
          <p className="text-muted-foreground">
            Generate personalized quotes with professional email and SMS messages for your customers.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleGenerateQuote)} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Sarah Jones" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Email *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="sarah@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customerPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 604-555-1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Amount ($) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01"
                          placeholder="600.00" 
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="propertyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St, White Rock, BC" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="houseSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>House Size</FormLabel>
                      <FormControl>
                        <Input placeholder="Medium (1,500-2,500 sq ft)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="services"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Window Cleaning (outside only), Gutter Cleaning (inside only)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Includes discount for new customers"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isGenerating}
                className="w-full md:w-auto"
              >
                {isGenerating ? 'Generating...' : 'Generate Quote Messages'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedMessages && (
        <QuoteMessagePreview
          emailMessage={generatedMessages.email}
          smsMessage={generatedMessages.sms}
          onCopyEmail={() => copyToClipboard(generatedMessages.email, 'email')}
          onCopySMS={() => copyToClipboard(generatedMessages.sms, 'sms')}
          onSendQuote={handleSendQuote}
          copiedEmail={copiedEmail}
          copiedSMS={copiedSMS}
          isSending={isSending}
        />
      )}
    </div>
  );
};

export default QuotingAssistant;

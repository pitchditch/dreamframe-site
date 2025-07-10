
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calculator, Send, Copy, Check, Mail, MessageSquare, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import QuoteMessagePreview from './QuoteMessagePreview';

const formSchema = z.object({
  customerName: z.string().min(1, 'Customer name is required'),
  customerPhone: z.string().optional(),
  customerEmail: z.string().email('Valid email is required'),
  services: z.string().min(1, 'Services are required'),
  servicesAmount: z.number().min(0, 'Services amount must be positive'),
  notes: z.string().optional(),
  propertyAddress: z.string().optional(),
  houseSize: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface Product {
  id: string;
  name: string;
  cost: number;
}

interface QuoteData extends FormData {
  bookingLink?: string;
  products: Product[];
  productsSubtotal: number;
  gstAmount: number;
  pstAmount: number;
  totalAmount: number;
}

const QuotingAssistant: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCost, setNewProductCost] = useState(0);
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
      servicesAmount: 0,
      notes: '',
      propertyAddress: '',
      houseSize: '',
    },
  });

  const addProduct = () => {
    if (newProductName.trim() && newProductCost > 0) {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: newProductName.trim(),
        cost: newProductCost,
      };
      setProducts([...products, newProduct]);
      setNewProductName('');
      setNewProductCost(0);
    }
  };

  const removeProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const calculateTotals = (servicesAmount: number) => {
    const productsSubtotal = products.reduce((sum, product) => sum + product.cost, 0);
    const gstAmount = productsSubtotal * 0.05; // 5% GST on products only
    const pstAmount = productsSubtotal * 0.07; // 7% PST on products only
    const totalAmount = servicesAmount + productsSubtotal + gstAmount + pstAmount;
    
    return {
      productsSubtotal,
      gstAmount,
      pstAmount,
      totalAmount,
    };
  };

  const generateMessages = (data: QuoteData) => {
    const bookingLink = data.bookingLink || 'https://bcpressurewashing.ca/book-now';
    
    const productsHTML = data.products.length > 0 ? `
**Products:**
${data.products.map(p => `• ${p.name} - $${p.cost.toFixed(2)}`).join('\n')}
Products Subtotal: $${data.productsSubtotal.toFixed(2)}
GST (5%): $${data.gstAmount.toFixed(2)}
PST (7%): $${data.pstAmount.toFixed(2)}
` : '';

    const emailMessage = `Subject: Your Professional Quote from BC Pressure Washing

Hi ${data.customerName},

Thank you for your interest in BC Pressure Washing! I'm excited to provide you with a personalized quote for your property.

**Your Selected Services:**
${data.services} - $${data.servicesAmount.toFixed(2)}

${productsHTML}

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
      const totals = calculateTotals(data.servicesAmount);
      const quoteData: QuoteData = {
        ...data,
        products,
        ...totals,
      };
      
      const messages = generateMessages(quoteData);
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
      const totals = calculateTotals(data.servicesAmount);
      const quoteData = {
        customer_name: data.customerName,
        customer_phone: data.customerPhone || null,
        customer_email: data.customerEmail,
        services: [data.services],
        services_subtotal: data.servicesAmount,
        products: products.map(p => ({ name: p.name, cost: p.cost })),
        products_subtotal: totals.productsSubtotal,
        add_ons: [],
        gst_amount: totals.gstAmount,
        pst_amount: totals.pstAmount,
        total_amount: totals.totalAmount,
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
      const totals = calculateTotals(formData.servicesAmount);
      
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
          estimateTotal: totals.totalAmount,
          services: [formData.services],
          addOns: [],
          houseSize: formData.houseSize,
          address: formData.propertyAddress,
          notes: formData.notes,
          servicesSubtotal: formData.servicesAmount,
          products: products,
          productsSubtotal: totals.productsSubtotal,
          gstAmount: totals.gstAmount,
          pstAmount: totals.pstAmount,
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
      setProducts([]);

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

  const currentTotals = calculateTotals(form.watch('servicesAmount') || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-8">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Card className="border-primary/20 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary to-red-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calculator className="w-6 h-6" />
              BC Pressure Washing - Professional Quoting Assistant
            </CardTitle>
            <p className="text-blue-100">
              Generate personalized quotes with professional email and SMS messages for your customers.
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleGenerateQuote)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Customer Name *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Sarah Jones" 
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                            {...field} 
                          />
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
                        <FormLabel className="text-gray-700 font-semibold">Customer Email *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="sarah@email.com" 
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                            {...field} 
                          />
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
                        <FormLabel className="text-gray-700 font-semibold">Customer Phone</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+1 604-555-1234" 
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="servicesAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Services Amount ($) *</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            step="0.01"
                            placeholder="600.00" 
                            className="border-gray-300 focus:border-primary focus:ring-primary"
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
                        <FormLabel className="text-gray-700 font-semibold">Property Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123 Main St, White Rock, BC" 
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                            {...field} 
                          />
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
                        <FormLabel className="text-gray-700 font-semibold">House Size</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Medium (1,500-2,500 sq ft)" 
                            className="border-gray-300 focus:border-primary focus:ring-primary"
                            {...field} 
                          />
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
                      <FormLabel className="text-gray-700 font-semibold">Services *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Window Cleaning (outside only), Gutter Cleaning (inside only)"
                          className="border-gray-300 focus:border-primary focus:ring-primary min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Products Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Products (Optional)</h3>
                  
                  {/* Add Product Form */}
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <Input
                        placeholder="Product name"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <div className="w-32">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newProductCost || ''}
                        onChange={(e) => setNewProductCost(parseFloat(e.target.value) || 0)}
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={addProduct}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Products List */}
                  {products.length > 0 && (
                    <div className="space-y-2">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <span className="font-medium">{product.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600">${product.cost.toFixed(2)}</span>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => removeProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {/* Tax Summary */}
                      <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span>Products Subtotal:</span>
                          <span>${currentTotals.productsSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>GST (5%):</span>
                          <span>${currentTotals.gstAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>PST (7%):</span>
                          <span>${currentTotals.pstAmount.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total Amount:</span>
                          <span>${currentTotals.totalAmount.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Includes discount for new customers"
                          className="border-gray-300 focus:border-primary focus:ring-primary"
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
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-red-600 hover:from-primary/90 hover:to-red-600/90 text-white font-semibold py-3 px-8 text-lg"
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
    </div>
  );
};

export default QuotingAssistant;

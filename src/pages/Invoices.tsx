import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FileText, Mail, MessageSquare, Plus, Trash2, Calculator, Edit } from 'lucide-react';
import Layout from '@/components/Layout';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  gstRate: number;
  pstRate: number;
  gstAmount: number;
  pstAmount: number;
  total: number;
  notes: string;
  manualTotal: boolean;
}

const Invoices: React.FC = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  
  const [invoice, setInvoice] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    clientAddress: '',
    items: [{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }],
    subtotal: 0,
    gstRate: 5, // GST rate
    pstRate: 7, // PST rate
    gstAmount: 0,
    pstAmount: 0,
    total: 0,
    notes: '',
    manualTotal: false
  });

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0
    };
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (id: string) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoice(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate;
          }
          return updatedItem;
        }
        return item;
      });

      const subtotal = updatedItems.reduce((sum, item) => sum + item.amount, 0);
      const gstAmount = subtotal * (prev.gstRate / 100);
      const pstAmount = subtotal * (prev.pstRate / 100);
      const total = prev.manualTotal ? prev.total : subtotal + gstAmount + pstAmount;

      return {
        ...prev,
        items: updatedItems,
        subtotal,
        gstAmount,
        pstAmount,
        total
      };
    });
  };

  const updateTaxRates = (field: 'gstRate' | 'pstRate', value: number) => {
    setInvoice(prev => {
      const newInvoice = { ...prev, [field]: value };
      const gstAmount = prev.subtotal * (newInvoice.gstRate / 100);
      const pstAmount = prev.subtotal * (newInvoice.pstRate / 100);
      const total = prev.manualTotal ? prev.total : prev.subtotal + gstAmount + pstAmount;
      
      return {
        ...newInvoice,
        gstAmount,
        pstAmount,
        total
      };
    });
  };

  const toggleManualTotal = () => {
    setInvoice(prev => ({
      ...prev,
      manualTotal: !prev.manualTotal
    }));
  };

  const updateTotal = (value: number) => {
    setInvoice(prev => ({
      ...prev,
      total: value
    }));
  };

  const generateInvoiceHTML = () => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #dc2626; margin: 0;">BC Pressure Washing</h1>
          <p style="margin: 5px 0; color: #666;">Professional Cleaning Services</p>
          <p style="margin: 5px 0; color: #666;">Phone: (778) 808-7620 | Email: info@bcpressurewashing.ca</p>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div>
            <h2 style="color: #374151; margin-bottom: 10px;">Invoice</h2>
            <p><strong>Invoice #:</strong> ${invoice.invoiceNumber}</p>
            <p><strong>Date:</strong> ${new Date(invoice.date).toLocaleDateString()}</p>
            <p><strong>Due Date:</strong> ${new Date(invoice.dueDate).toLocaleDateString()}</p>
          </div>
          <div style="text-align: right;">
            <h3 style="color: #374151; margin-bottom: 10px;">Bill To:</h3>
            <p><strong>${invoice.clientName}</strong></p>
            ${invoice.clientAddress ? `<p>${invoice.clientAddress.replace(/\n/g, '<br>')}</p>` : ''}
            <p>${invoice.clientEmail}</p>
            ${invoice.clientPhone ? `<p>${invoice.clientPhone}</p>` : ''}
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Description</th>
              <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: center;">Qty</th>
              <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: right;">Rate</th>
              <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map(item => `
              <tr>
                <td style="border: 1px solid #e5e7eb; padding: 12px;">${item.description}</td>
                <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: center;">${item.quantity}</td>
                <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: right;">$${item.rate.toFixed(2)}</td>
                <td style="border: 1px solid #e5e7eb; padding: 12px; text-align: right;">$${item.amount.toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="text-align: right; margin-bottom: 30px;">
          <div style="display: inline-block; text-align: right;">
            <p><strong>Subtotal: $${invoice.subtotal.toFixed(2)}</strong></p>
            <p><strong>GST (${invoice.gstRate}%): $${invoice.gstAmount.toFixed(2)}</strong></p>
            <p><strong>PST (${invoice.pstRate}%): $${invoice.pstAmount.toFixed(2)}</strong></p>
            <div style="border-top: 2px solid #374151; padding-top: 10px; margin-top: 10px;">
              <h3 style="color: #dc2626; margin: 0;">Total: $${invoice.total.toFixed(2)}</h3>
            </div>
          </div>
        </div>

        ${invoice.notes ? `
          <div style="margin-top: 30px;">
            <h4 style="color: #374151;">Notes:</h4>
            <p style="color: #666;">${invoice.notes.replace(/\n/g, '<br>')}</p>
          </div>
        ` : ''}

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #666; font-size: 14px;">
          <p>Thank you for your business!</p>
          <p>Payment is due within 30 days. Please contact us if you have any questions.</p>
        </div>
      </div>
    `;
  };

  const handleSendInvoice = async (method: 'email' | 'sms' | 'both') => {
    if (!invoice.clientName || !invoice.clientEmail || invoice.items.some(item => !item.description)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before sending the invoice.",
        variant: "destructive",
      });
      return;
    }

    if ((method === 'sms' || method === 'both') && !invoice.clientPhone) {
      toast({
        title: "Phone Number Required",
        description: "Please provide a phone number to send via SMS.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);

    try {
      const invoiceHTML = generateInvoiceHTML();
      
      const smsMessage = `Invoice ${invoice.invoiceNumber} from BC Pressure Washing for $${invoice.total.toFixed(2)} is ready. Due: ${new Date(invoice.dueDate).toLocaleDateString()}. Full details sent via email. Questions? Call (778) 808-7620`;

      const response = await fetch(
        "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/send-confirmations",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: invoice.clientEmail,
            phone: method === 'sms' || method === 'both' ? invoice.clientPhone : undefined,
            name: invoice.clientName,
            formType: "invoice",
            customEmailSubject: `Invoice ${invoice.invoiceNumber} - BC Pressure Washing`,
            customEmailHTML: invoiceHTML,
            customSMSMessage: method === 'sms' || method === 'both' ? smsMessage : undefined,
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Invoice Sent!",
          description: `Invoice has been sent successfully via ${method === 'both' ? 'email and SMS' : method}.`,
        });
        
        // Reset form for new invoice
        setInvoice({
          invoiceNumber: `INV-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          clientAddress: '',
          items: [{ id: '1', description: '', quantity: 1, rate: 0, amount: 0 }],
          subtotal: 0,
          gstRate: 5,
          pstRate: 7,
          gstAmount: 0,
          pstAmount: 0,
          total: 0,
          notes: '',
          manualTotal: false
        });
      } else {
        throw new Error('Failed to send invoice');
      }
    } catch (error) {
      console.error('Error sending invoice:', error);
      toast({
        title: "Error",
        description: "Failed to send invoice. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout
      title="Invoice Management - BC Pressure Washing"
      description="Create and send professional invoices for your cleaning services"
    >
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Invoice Management</h1>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create professional invoices and send them directly to your customers via email or SMS
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Invoice Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="invoiceNumber">Invoice Number</Label>
                      <Input
                        id="invoiceNumber"
                        value={invoice.invoiceNumber}
                        onChange={(e) => setInvoice(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={invoice.date}
                        onChange={(e) => setInvoice(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={invoice.dueDate}
                      onChange={(e) => setInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="clientName">Client Name *</Label>
                    <Input
                      id="clientName"
                      value={invoice.clientName}
                      onChange={(e) => setInvoice(prev => ({ ...prev, clientName: e.target.value }))}
                      placeholder="Enter client name"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientEmail">Email Address *</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={invoice.clientEmail}
                        onChange={(e) => setInvoice(prev => ({ ...prev, clientEmail: e.target.value }))}
                        placeholder="client@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientPhone">Phone Number</Label>
                      <Input
                        id="clientPhone"
                        type="tel"
                        value={invoice.clientPhone}
                        onChange={(e) => setInvoice(prev => ({ ...prev, clientPhone: e.target.value }))}
                        placeholder="(778) 123-4567"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="clientAddress">Address</Label>
                    <Textarea
                      id="clientAddress"
                      value={invoice.clientAddress}
                      onChange={(e) => setInvoice(prev => ({ ...prev, clientAddress: e.target.value }))}
                      placeholder="Client's billing address"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Invoice Items</CardTitle>
                    <Button onClick={addItem} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {invoice.items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 items-end">
                      <div className="col-span-5">
                        <Label htmlFor={`desc-${item.id}`}>Description *</Label>
                        <Input
                          id={`desc-${item.id}`}
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          placeholder="Service description"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor={`qty-${item.id}`}>Qty</Label>
                        <Input
                          id={`qty-${item.id}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label htmlFor={`rate-${item.id}`}>Rate</Label>
                        <Input
                          id={`rate-${item.id}`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Amount</Label>
                        <div className="h-10 flex items-center px-3 bg-gray-50 border rounded-md">
                          ${item.amount.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-span-1">
                        {invoice.items.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tax Settings & Total</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="gstRate">GST Rate (%)</Label>
                      <Input
                        id="gstRate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={invoice.gstRate}
                        onChange={(e) => updateTaxRates('gstRate', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="pstRate">PST Rate (%)</Label>
                      <Input
                        id="pstRate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={invoice.pstRate}
                        onChange={(e) => updateTaxRates('pstRate', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-3">
                      <Label>Total Amount</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleManualTotal}
                        className="text-xs"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        {invoice.manualTotal ? 'Auto Calculate' : 'Manual Edit'}
                      </Button>
                    </div>
                    {invoice.manualTotal ? (
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={invoice.total}
                        onChange={(e) => updateTotal(parseFloat(e.target.value) || 0)}
                        placeholder="Enter total amount"
                        className="text-lg font-bold"
                      />
                    ) : (
                      <div className="h-12 flex items-center px-3 bg-gray-50 border rounded-md">
                        <span className="text-lg font-bold text-green-600">
                          ${invoice.total.toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={invoice.notes}
                      onChange={(e) => setInvoice(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Additional notes or terms"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Invoice Preview & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Invoice Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${invoice.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST ({invoice.gstRate}%):</span>
                      <span>${invoice.gstAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PST ({invoice.pstRate}%):</span>
                      <span>${invoice.pstAmount.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-green-600">${invoice.total.toFixed(2)}</span>
                      {invoice.manualTotal && (
                        <span className="text-xs text-gray-500 ml-2">(Manual)</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Send Invoice</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <Button
                      onClick={() => handleSendInvoice('email')}
                      disabled={sending}
                      className="w-full"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {sending ? 'Sending...' : 'Send via Email'}
                    </Button>
                    
                    <Button
                      onClick={() => handleSendInvoice('sms')}
                      disabled={sending}
                      variant="outline"
                      className="w-full"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {sending ? 'Sending...' : 'Send via SMS'}
                    </Button>
                    
                    <Button
                      onClick={() => handleSendInvoice('both')}
                      disabled={sending}
                      variant="outline"
                      className="w-full"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      <MessageSquare className="w-4 h-4 mr-2" />
                      {sending ? 'Sending...' : 'Send via Both'}
                    </Button>
                  </div>
                  
                  <div className="text-sm text-gray-500 text-center">
                    Invoice will be sent as a professional HTML email
                    {invoice.clientPhone && ' and/or SMS notification'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border rounded-lg p-4 text-sm">
                    <div className="text-center mb-4">
                      <h3 className="font-bold text-red-600">BC Pressure Washing</h3>
                      <p className="text-gray-600 text-xs">Professional Cleaning Services</p>
                    </div>
                    
                    <div className="flex justify-between mb-4 text-xs">
                      <div>
                        <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
                        <p><strong>Date:</strong> {new Date(invoice.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p><strong>{invoice.clientName || 'Client Name'}</strong></p>
                        <p>{invoice.clientEmail || 'client@email.com'}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-b py-2 mb-2">
                      {invoice.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span>{item.description || 'Service Description'}</span>
                          <span>${item.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-right text-xs space-y-1">
                      <div>Subtotal: ${invoice.subtotal.toFixed(2)}</div>
                      <div>GST: ${invoice.gstAmount.toFixed(2)}</div>
                      <div>PST: ${invoice.pstAmount.toFixed(2)}</div>
                      <div className="font-bold border-t pt-1">
                        Total: ${invoice.total.toFixed(2)}
                        {invoice.manualTotal && <span className="text-gray-500"> (Manual)</span>}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Invoices;

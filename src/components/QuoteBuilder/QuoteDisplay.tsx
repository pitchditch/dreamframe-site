import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Send, X, MessageSquare, Mail, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(amount);
};

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
    note?: string;
  }>;
  addOns: Array<{
    name: string;
    price: number;
  }>;
  subtotal: number;
  gst: number;
  pst: number;
  total: number;
}

interface QuoteDisplayProps {
  quoteData: QuoteData;
  quoteResult: QuoteResult;
  onClose: () => void;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ quoteData, quoteResult, onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('preview');

  const sendViaSupabase = async () => {
    try {
      const confirmationData = {
        email: quoteData.email,
        phone: quoteData.phone,
        name: quoteData.customerName,
        formType: 'Professional Quote',
        estimateTotal: quoteResult.total,
        services: quoteResult.services.map(s => s.name),
        addOns: quoteResult.addOns.map(a => a.name),
        houseSize: quoteData.houseSize,
        address: quoteData.address,
        notes: quoteData.notes
      };

      console.log('Sending confirmation data:', confirmationData);

      const { data, error } = await supabase.functions.invoke('send-confirmations', {
        body: confirmationData
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Confirmation sent successfully:', data);
      return data;
    } catch (error) {
      console.error('Error sending via Supabase:', error);
      throw error;
    }
  };

  const generateSMSText = () => {
    const servicesText = quoteResult.services.map(s => 
      s.note ? `• ${s.name}: ${s.note}` : `• ${s.name}: ${formatCurrency(s.price)}`
    ).join('\n');
    const addOnsText = quoteResult.addOns.length > 0 
      ? '\n\nAdd-ons:\n' + quoteResult.addOns.map(a => `• ${a.name}: ${formatCurrency(a.price)}`).join('\n')
      : '';
    
    const taxBreakdown = [];
    if (quoteResult.gst > 0) taxBreakdown.push(`GST (7%): ${formatCurrency(quoteResult.gst)}`);
    if (quoteResult.pst > 0) taxBreakdown.push(`PST: ${formatCurrency(quoteResult.pst)}`);
    
    return `Hi ${quoteData.customerName}! 

Here's your pressure washing quote for ${quoteData.address}:

${servicesText}${addOnsText}

Subtotal: ${formatCurrency(quoteResult.subtotal)}
${taxBreakdown.join('\n')}
TOTAL: ${formatCurrency(quoteResult.total)}

${quoteData.notes ? `Notes: ${quoteData.notes}\n\n` : ''}All work comes with our satisfaction guarantee!

Every job is personally checked by Jayden Fisher | BC Pressure Washing | bcpressurewashing.ca

Reply YES to book or call for questions!`;
  };

  const generateEmailHTML = () => {
    const servicesHTML = quoteResult.services.map(s => 
      s.note 
        ? `<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 16px 12px; font-size: 15px; color: #374151;">${s.name}</td><td style="padding: 16px 12px; text-align: right; color: #2563eb; font-style: italic; font-size: 15px;">${s.note}</td></tr>`
        : `<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 16px 12px; font-size: 15px; color: #374151;">${s.name}</td><td style="padding: 16px 12px; text-align: right; font-weight: bold; color: #059669; font-size: 16px;">${formatCurrency(s.price)}</td></tr>`
    ).join('');
    
    const addOnsHTML = quoteResult.addOns.length > 0 
      ? quoteResult.addOns.map(a => `<tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 16px 12px; font-size: 15px; color: #374151;">${a.name} <span style="color: #6b7280; font-size: 13px; background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">Add-on</span></td><td style="padding: 16px 12px; text-align: right; font-weight: bold; color: #059669; font-size: 16px;">${formatCurrency(a.price)}</td></tr>`).join('')
      : '';
    
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Professional Quote - BC Pressure Washing</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); padding: 20px;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0; box-shadow: 0 4px 20px rgba(220, 38, 38, 0.15);">
            <h1 style="color: white; margin: 0; font-size: 36px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.2); letter-spacing: -0.5px;">BC PRESSURE WASHING</h1>
            <p style="color: #fecaca; margin: 12px 0 0 0; font-size: 18px; font-weight: 500;">Professional Exterior Cleaning Services</p>
            <p style="color: #fecaca; margin: 8px 0 0 0; font-size: 15px; opacity: 0.9;">bcpressurewashing.ca</p>
          </div>

          <!-- Main Content -->
          <div style="background: white; padding: 40px 30px; border-radius: 0 0 16px 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
            
            <!-- Greeting -->
            <h2 style="color: #dc2626; margin: 0 0 25px 0; font-size: 32px; font-weight: bold;">Thank you, ${quoteData.customerName}!</h2>
            <p style="font-size: 17px; line-height: 1.7; color: #4b5563; margin-bottom: 35px;">
              We've prepared your professional pressure washing quote. Our team is ready to transform your property with our premium cleaning services.
            </p>

            <!-- Quote Total Banner -->
            <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 3px solid #059669; border-radius: 16px; padding: 30px; margin: 30px 0; text-align: center; box-shadow: 0 4px 15px rgba(5, 150, 105, 0.1);">
              <h3 style="color: #059669; margin: 0 0 12px 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Professional Quote</h3>
              <div style="font-size: 52px; font-weight: bold; color: #059669; margin: 12px 0; text-shadow: 0 1px 2px rgba(5, 150, 105, 0.1);">
                ${formatCurrency(quoteResult.total)}
              </div>
              <p style="color: #6b7280; margin: 12px 0 0 0; font-size: 15px;">*Final price confirmed after property inspection</p>
            </div>

            <!-- Property Details -->  
            <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #dc2626;">
              <h3 style="color: #374151; margin: 0 0 20px 0; font-size: 20px; font-weight: bold; color: #dc2626;">Property Details</h3>
              ${quoteData.address ? `<p style="margin: 12px 0; color: #4b5563; font-size: 16px;"><strong style="color: #374151;">Address:</strong> ${quoteData.address}</p>` : ''}
              <p style="margin: 12px 0; color: #4b5563; font-size: 16px;"><strong style="color: #374151;">Property Size:</strong> ${quoteData.houseSize.charAt(0).toUpperCase() + quoteData.houseSize.slice(1)}</p>
              ${quoteData.notes ? `<p style="margin: 12px 0; color: #4b5563; font-size: 16px;"><strong style="color: #374151;">Special Notes:</strong> ${quoteData.notes}</p>` : ''}
            </div>

            <!-- Services Table -->
            <h3 style="color: #374151; margin: 40px 0 20px 0; font-size: 22px; font-weight: bold;">Services Included</h3>
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
              <thead>
                <tr style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);">
                  <th style="padding: 20px 16px; text-align: left; font-weight: bold; color: #374151; border-bottom: 2px solid #e5e7eb; font-size: 16px;">Service Description</th>
                  <th style="padding: 20px 16px; text-align: right; font-weight: bold; color: #374151; border-bottom: 2px solid #e5e7eb; width: 140px; font-size: 16px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${servicesHTML}
                ${addOnsHTML}
              </tbody>
            </table>

            <!-- Pricing Breakdown -->
            <div style="margin: 35px 0; padding: 25px; background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border-radius: 12px; border: 1px solid #e5e7eb;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 17px;">
                <span style="color: #4b5563;">Subtotal:</span>
                <span style="font-weight: bold; color: #374151;">${formatCurrency(quoteResult.subtotal)}</span>
              </div>
              ${quoteResult.gst > 0 ? `<div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 17px;">
                <span style="color: #4b5563;">GST (7%):</span>
                <span style="font-weight: bold; color: #374151;">${formatCurrency(quoteResult.gst)}</span>
              </div>` : ''}
              ${quoteResult.pst > 0 ? `<div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 17px;">
                <span style="color: #4b5563;">PST:</span>
                <span style="font-weight: bold; color: #374151;">${formatCurrency(quoteResult.pst)}</span>
              </div>` : ''}
              <div style="display: flex; justify-content: space-between; font-size: 28px; font-weight: bold; color: #059669; border-top: 2px solid #d1d5db; padding-top: 20px;">
                <span>TOTAL:</span>
                <span>${formatCurrency(quoteResult.total)}</span>
              </div>
            </div>

            <!-- Call to Action -->
            <div style="text-align: center; margin: 40px 0;">
              <p style="font-size: 20px; color: #374151; margin-bottom: 25px; font-weight: bold;">
                Ready to book your service?
              </p>
              <div style="margin: 25px 0;">
                <a href="tel:7788087620" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 18px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 10px; font-size: 17px; box-shadow: 0 6px 15px rgba(220, 38, 38, 0.3); transition: all 0.3s ease;">
                  📞 Call (778) 808-7620
                </a>
                <a href="mailto:info@bcpressurewashing.ca?subject=Quote Follow-up for ${quoteData.customerName}" style="display: inline-block; background: linear-gradient(135deg, #374151 0%, #1f2937 100%); color: white; padding: 18px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 10px; font-size: 17px; box-shadow: 0 6px 15px rgba(55, 65, 81, 0.3); transition: all 0.3s ease;">
                  ✉️ Reply to Email
                </a>
              </div>
            </div>

          </div>
          
          <!-- Footer -->
          <div style="background: linear-gradient(135deg, #374151 0%, #1f2937 100%); padding: 30px; text-align: center; border-radius: 0 0 16px 16px; margin-top: 40px;">
            <p style="color: #d1d5db; margin: 0 0 12px 0; font-size: 18px; font-weight: bold;">
              Every job is personally checked by Jayden Fisher
            </p>
            <p style="color: #9ca3af; margin: 0; font-size: 15px; line-height: 1.6;">
              BC Pressure Washing | Professional Exterior Cleaning Services<br>
              White Rock, Surrey & Metro Vancouver<br>
              <a href="https://bcpressurewashing.ca" style="color: #fbbf24; text-decoration: none;">bcpressurewashing.ca</a> | Fully Insured & Bonded
            </p>
          </div>
        </body>
      </html>
    `;
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${type} quote copied to clipboard`,
      });
    });
  };

  const generatePDF = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Quote - ${quoteData.customerName}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              max-width: 800px; 
              margin: 0 auto;
              line-height: 1.6;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .company-name { 
              font-size: 28px; 
              font-weight: bold; 
              color: #d32f2f;
              margin: 0;
            }
            .company-tagline { 
              font-size: 14px; 
              color: #666; 
              margin: 5px 0;
            }
            .quote-details { 
              margin: 20px 0; 
              background: #f9f9f9;
              padding: 20px;
              border-radius: 5px;
            }
            .services-table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0; 
            }
            .services-table th, .services-table td { 
              border: 1px solid #ddd; 
              padding: 12px; 
              text-align: left; 
            }
            .services-table th { 
              background-color: #f2f2f2; 
              font-weight: bold;
            }
            .services-table .price { 
              text-align: right; 
              font-weight: bold;
            }
            .total-section { 
              margin-top: 20px; 
              text-align: right; 
              font-size: 16px;
            }
            .total-row { 
              margin: 5px 0; 
            }
            .final-total { 
              font-size: 20px; 
              font-weight: bold; 
              color: #d32f2f;
              border-top: 2px solid #333;
              padding-top: 10px;
              margin-top: 10px;
            }
            .notes { 
              margin-top: 20px; 
              background: #fff3cd;
              padding: 15px;
              border-radius: 5px;
              border-left: 4px solid #ffc107;
            }
            .signature { 
              margin-top: 40px; 
              border-top: 1px solid #ddd; 
              padding-top: 20px; 
              text-align: center;
              color: #666;
            }
            .guarantee { 
              background: #d4edda;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
              border-left: 4px solid #28a745;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="company-name">BC PRESSURE WASHING</h1>
            <p class="company-tagline">Professional Exterior Cleaning Services</p>
            <p class="company-tagline">bcpressurewashing.ca</p>
          </div>

          <div class="quote-details">
            <h2>Quote for: ${quoteData.customerName}</h2>
            ${quoteData.address ? `<p><strong>Address:</strong> ${quoteData.address}</p>` : ''}
            ${quoteData.phone ? `<p><strong>Phone:</strong> ${quoteData.phone}</p>` : ''}
            ${quoteData.email ? `<p><strong>Email:</strong> ${quoteData.email}</p>` : ''}
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <table class="services-table">
            <thead>
              <tr>
                <th>Service Description</th>
                <th style="width: 120px;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${quoteResult.services.map((service) => `
                <tr>
                  <td>${service.name}</td>
                  <td class="price">${service.note || formatCurrency(service.price)}</td>
                </tr>
              `).join('')}
              ${quoteResult.addOns.map((addOn) => `
                <tr>
                  <td>${addOn.name} (Add-on)</td>
                  <td class="price">${formatCurrency(addOn.price)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="total-section">
            <div class="total-row"><strong>Subtotal:</strong> ${formatCurrency(quoteResult.subtotal)}</div>
            ${quoteResult.gst > 0 ? `<div class="total-row"><strong>GST (7%):</strong> ${formatCurrency(quoteResult.gst)}</div>` : ''}
            ${quoteResult.pst > 0 ? `<div class="total-row"><strong>PST:</strong> ${formatCurrency(quoteResult.pst)}</div>` : ''}
            <div class="final-total">TOTAL: ${formatCurrency(quoteResult.total)}</div>
          </div>

          ${quoteData.notes ? `
            <div class="notes">
              <strong>Special Notes:</strong>
              <p>${quoteData.notes}</p>
            </div>
          ` : ''}

          <div class="guarantee">
            <strong>✅ What's Included:</strong>
            <ul>
              <li>Professional grade equipment</li>
              <li>Eco-friendly cleaning solutions</li>
              <li>Fully insured and bonded</li>
              <li>100% satisfaction guarantee</li>
            </ul>
          </div>

          <div class="signature">
            <p><strong>Every job is personally checked by Jayden Fisher</strong></p>
            <p>BC Pressure Washing | bcpressurewashing.ca</p>
            <p>Fully Insured & Bonded | 100% Satisfaction Guarantee</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const sendSMS = async () => {
    try {
      console.log('Sending quote via SMS...', {
        phone: quoteData.phone,
        name: quoteData.customerName
      });

      await sendViaSupabase();

      toast({
        title: "SMS Sent Successfully!",
        description: `Quote sent to ${quoteData.customerName} via SMS`,
      });
    } catch (error) {
      console.error('SMS send failed:', error);
      toast({
        title: "SMS Failed",
        description: "Could not send SMS. Please try copying the content instead.",
        variant: "destructive"
      });
    }
  };

  const sendEmail = async () => {
    try {
      console.log('Sending quote via email...', {
        email: quoteData.email,
        name: quoteData.customerName
      });

      await sendViaSupabase();

      toast({
        title: "Email Sent Successfully!",
        description: `Quote sent to ${quoteData.customerName} via email`,
      });
    } catch (error) {
      console.error('Email send failed:', error);
      toast({
        title: "Email Failed",
        description: "Could not send email. Please try copying the content instead.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Quote for {quoteData.customerName}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-4">
            <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-sm">
              <div className="text-center mb-6 border-b-2 border-red-600 pb-4">
                <h1 className="text-3xl font-bold text-red-600 mb-2">BC PRESSURE WASHING</h1>
                <p className="text-gray-600">Professional Exterior Cleaning Services</p>
                <p className="text-gray-600 text-sm">bcpressurewashing.ca</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-3">Quote for: {quoteData.customerName}</h2>
                {quoteData.address && <p><strong>Address:</strong> {quoteData.address}</p>}
                {quoteData.phone && <p><strong>Phone:</strong> {quoteData.phone}</p>}
                {quoteData.email && <p><strong>Email:</strong> {quoteData.email}</p>}
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>

              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left font-semibold">Service Description</th>
                      <th className="border border-gray-300 p-3 text-right font-semibold w-32">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quoteResult.services.map((service, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3">{service.name}</td>
                        <td className="border border-gray-300 p-3 text-right font-semibold">
                          {service.note ? <em className="text-blue-600">{service.note}</em> : formatCurrency(service.price)}
                        </td>
                      </tr>
                    ))}
                    {quoteResult.addOns.map((addOn, index) => (
                      <tr key={`addon-${index}`} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3">{addOn.name} (Add-on)</td>
                        <td className="border border-gray-300 p-3 text-right font-semibold">{formatCurrency(addOn.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-right text-lg mb-6">
                <div className="mb-2"><strong>Subtotal:</strong> {formatCurrency(quoteResult.subtotal)}</div>
                {quoteResult.gst > 0 && <div className="mb-2"><strong>GST (7%):</strong> {formatCurrency(quoteResult.gst)}</div>}
                {quoteResult.pst > 0 && <div className="mb-2"><strong>PST:</strong> {formatCurrency(quoteResult.pst)}</div>}
                <div className="text-xl font-bold text-red-600 border-t-2 border-gray-300 pt-2">
                  TOTAL: {formatCurrency(quoteResult.total)}
                </div>
              </div>

              {quoteData.notes && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <strong>Special Notes:</strong>
                  <p className="mt-1">{quoteData.notes}</p>
                </div>
              )}

              <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <strong>✅ What's Included:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• Professional grade equipment</li>
                  <li>• Eco-friendly cleaning solutions</li>
                  <li>• Fully insured and bonded</li>
                  <li>• 100% satisfaction guarantee</li>
                </ul>
              </div>

              <div className="text-center border-t border-gray-300 pt-4 text-gray-600">
                <p className="font-semibold">Every job is personally checked by Jayden Fisher</p>
                <p>BC Pressure Washing | bcpressurewashing.ca</p>
                <p>Fully Insured & Bonded | 100% Satisfaction Guarantee</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <pre className="whitespace-pre-wrap text-sm font-mono">{generateSMSText()}</pre>
            </div>
            <Button onClick={() => copyToClipboard(generateSMSText(), 'SMS')} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy SMS Text
            </Button>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="bg-white border rounded-lg overflow-hidden max-h-96 overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: generateEmailHTML() }} />
            </div>
            <Button onClick={() => copyToClipboard(generateEmailHTML(), 'Email HTML')} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy Email HTML
            </Button>
          </TabsContent>

          <TabsContent value="pdf" className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-gray-600">Generate a professional PDF quote that you can save or print.</p>
              <Button onClick={generatePDF} className="w-full">
                <Printer className="w-4 h-4 mr-2" />
                Generate & Print PDF
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" className="flex-1" onClick={sendSMS} disabled={!quoteData.phone}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Send SMS
          </Button>
          <Button variant="outline" className="flex-1" onClick={sendEmail} disabled={!quoteData.email}>
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteDisplay;

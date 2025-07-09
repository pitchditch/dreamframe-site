import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Send, X, MessageSquare, Mail, Printer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from './utils/quoteCalculations';

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
  tax: number;
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
  const [hasAutoSent, setHasAutoSent] = useState(false);

  // Auto-send quote when component loads
  useEffect(() => {
    if (!hasAutoSent && (quoteData.email || quoteData.phone)) {
      handleAutoSend();
      setHasAutoSent(true);
    }
  }, [quoteData, hasAutoSent]);

  const handleAutoSend = async () => {
    try {
      // Send confirmation email and SMS via Supabase function
      const response = await fetch('/functions/v1/send-confirmations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: quoteData.email,
          phone: quoteData.phone,
          name: quoteData.customerName,
          address: quoteData.address,
          houseSize: quoteData.houseSize,
          services: quoteResult.services.map(s => s.name),
          addOns: quoteResult.addOns.map(a => a.name),
          estimateTotal: quoteResult.total,
          notes: quoteData.notes,
          formType: 'Professional Quote'
        })
      });

      if (response.ok) {
        toast({
          title: "Quote Sent Successfully!",
          description: `Professional quote sent to ${quoteData.customerName}${quoteData.email ? ' via email' : ''}${quoteData.email && quoteData.phone ? ' and' : ''}${quoteData.phone ? ' via SMS' : ''}`,
        });
      }
    } catch (error) {
      console.error('Auto-send failed:', error);
      toast({
        title: "Quote Created",
        description: "Quote generated successfully. You can manually send it using the buttons below.",
      });
    }
  };

  const generateSMSText = () => {
    const servicesText = quoteResult.services.map(s => 
      s.note ? `• ${s.name}: ${s.note}` : `• ${s.name}: ${formatCurrency(s.price)}`
    ).join('\n');
    const addOnsText = quoteResult.addOns.length > 0 
      ? '\n\nAdd-ons:\n' + quoteResult.addOns.map(a => `• ${a.name}: ${formatCurrency(a.price)}`).join('\n')
      : '';
    
    return `Hi ${quoteData.customerName}! 

Here's your pressure washing quote for ${quoteData.address}:

${servicesText}${addOnsText}

Subtotal: ${formatCurrency(quoteResult.subtotal)}
Tax (12%): ${formatCurrency(quoteResult.tax)}
TOTAL: ${formatCurrency(quoteResult.total)}

${quoteData.notes ? `Notes: ${quoteData.notes}\n\n` : ''}All work comes with our satisfaction guarantee!

Every job is personally checked by Jayden Fisher | BC Pressure Washing | bcpressurewashing.ca

Reply YES to book or call for questions!`;
  };

  const generateEmailHTML = () => {
    const servicesHTML = quoteResult.services.map(s => 
      s.note 
        ? `<tr><td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${s.name}</td><td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #2563eb; font-style: italic;">${s.note}</td></tr>`
        : `<tr><td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${s.name}</td><td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">${formatCurrency(s.price)}</td></tr>`
    ).join('');
    
    const addOnsHTML = quoteResult.addOns.length > 0 
      ? quoteResult.addOns.map(a => `<tr><td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${a.name} <span style="color: #6b7280; font-size: 0.875rem;">(Add-on)</span></td><td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: bold;">${formatCurrency(a.price)}</td></tr>`).join('')
      : '';
    
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Professional Quote - BC Pressure Washing</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 32px 24px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">BC PRESSURE WASHING</h1>
            <p style="color: #fecaca; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">Professional Exterior Cleaning Services</p>
            <p style="color: #fecaca; margin: 4px 0 0 0; font-size: 14px;">bcpressurewashing.ca</p>
          </div>

          <!-- Main Content -->
          <div style="background: white; padding: 32px 24px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Greeting -->
            <h2 style="color: #dc2626; margin: 0 0 24px 0; font-size: 28px; font-weight: bold;">Thank you, ${quoteData.customerName}!</h2>
            <p style="font-size: 16px; line-height: 1.7; color: #4b5563; margin-bottom: 32px;">
              We've prepared your professional pressure washing quote. Our team is ready to transform your property with our premium cleaning services.
            </p>

            <!-- Quote Total Banner -->
            <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border: 2px solid #dc2626; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
              <h3 style="color: #dc2626; margin: 0 0 8px 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">Your Professional Quote</h3>
              <div style="font-size: 48px; font-weight: bold; color: #dc2626; margin: 8px 0;">
                ${formatCurrency(quoteResult.total)}
              </div>
              <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 14px;">*Includes 12% tax | Final price confirmed after property inspection</p>
            </div>

            <!-- Property Details -->  
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #dc2626;">
              <h3 style="color: #374151; margin: 0 0 16px 0; font-size: 18px; font-weight: bold;">Property Details</h3>
              ${quoteData.address ? `<p style="margin: 8px 0; color: #4b5563;"><strong>Address:</strong> ${quoteData.address}</p>` : ''}
              <p style="margin: 8px 0; color: #4b5563;"><strong>Property Size:</strong> ${quoteData.houseSize.charAt(0).toUpperCase() + quoteData.houseSize.slice(1)}</p>
              ${quoteData.notes ? `<p style="margin: 8px 0; color: #4b5563;"><strong>Special Notes:</strong> ${quoteData.notes}</p>` : ''}
            </div>

            <!-- Services Table -->
            <h3 style="color: #374151; margin: 32px 0 16px 0; font-size: 20px; font-weight: bold;">Services Included</h3>
            <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <thead>
                <tr style="background: #f9fafb;">
                  <th style="padding: 16px; text-align: left; font-weight: bold; color: #374151; border-bottom: 2px solid #e5e7eb;">Service Description</th>
                  <th style="padding: 16px; text-align: right; font-weight: bold; color: #374151; border-bottom: 2px solid #e5e7eb; width: 140px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${servicesHTML}
                ${addOnsHTML}
              </tbody>
            </table>

            <!-- Pricing Breakdown -->
            <div style="margin: 32px 0; padding: 20px; background: #f9fafb; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 16px;">
                <span style="color: #4b5563;">Subtotal:</span>
                <span style="font-weight: bold; color: #374151;">${formatCurrency(quoteResult.subtotal)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 16px; font-size: 16px; padding-bottom: 16px; border-bottom: 1px solid #d1d5db;">
                <span style="color: #4b5563;">Tax (12%):</span>
                <span style="font-weight: bold; color: #374151;">${formatCurrency(quoteResult.tax)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 24px; font-weight: bold; color: #dc2626;">
                <span>TOTAL:</span>
                <span>${formatCurrency(quoteResult.total)}</span>
              </div>
            </div>

            <!-- What's Included -->
            <div style="background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border: 1px solid #28a745; border-radius: 8px; padding: 24px; margin: 32px 0;">
              <h3 style="color: #155724; margin: 0 0 16px 0; font-size: 20px; font-weight: bold;">✅ What's Included</h3>
              <ul style="color: #155724; margin: 0; padding-left: 20px; list-style-type: none;">
                <li style="margin-bottom: 8px; position: relative; padding-left: 24px;">✓ Professional grade equipment</li>
                <li style="margin-bottom: 8px; position: relative; padding-left: 24px;">✓ Eco-friendly cleaning solutions</li>
                <li style="margin-bottom: 8px; position: relative; padding-left: 24px;">✓ Fully insured and bonded</li>
                <li style="margin-bottom: 8px; position: relative; padding-left: 24px;">✓ 100% satisfaction guarantee</li>
                <li style="margin-bottom: 0; position: relative; padding-left: 24px;">✓ Personal quality check by Jayden Fisher</li>
              </ul>
            </div>

            <!-- Call to Action -->
            <div style="text-align: center; margin: 32px 0;">
              <p style="font-size: 18px; color: #374151; margin-bottom: 20px; font-weight: bold;">
                Ready to book your service?
              </p>
              <div style="margin: 20px 0;">
                <a href="tel:7788087620" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 8px; font-size: 16px; box-shadow: 0 4px 6px rgba(220, 38, 38, 0.25);">
                  📞 Call (778) 808-7620
                </a>
                <a href="mailto:info@bcpressurewashing.ca?subject=Quote Follow-up for ${quoteData.customerName}" style="display: inline-block; background: linear-gradient(135deg, #374151 0%, #1f2937 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 8px; font-size: 16px; box-shadow: 0 4px 6px rgba(55, 65, 81, 0.25);">
                  ✉️ Reply to Email
                </a>
              </div>
            </div>

          </div>
          
          <!-- Footer -->
          <div style="background: #374151; padding: 24px; text-align: center; border-radius: 0 0 12px 12px; margin-top: 32px;">
            <p style="color: #d1d5db; margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">
              Every job is personally checked by Jayden Fisher
            </p>
            <p style="color: #9ca3af; margin: 0; font-size: 14px;">
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
            <div class="total-row"><strong>Tax (12%):</strong> ${formatCurrency(quoteResult.tax)}</div>
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

  const sendSMS = () => {
    const smsText = generateSMSText();
    const phoneNumber = quoteData.phone.replace(/\D/g, '');
    const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(smsText)}`;
    window.open(smsUrl, '_blank');
  };

  const sendEmail = () => {
    const smsText = generateSMSText(); // Use SMS text for plain text email body
    const subject = `Your Pressure Washing Quote - ${quoteData.customerName}`;
    const mailtoUrl = `mailto:${quoteData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(smsText)}`;
    window.open(mailtoUrl, '_blank');
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
                <div className="mb-2"><strong>Tax (12%):</strong> {formatCurrency(quoteResult.tax)}</div>
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
          <Button variant="outline" className="flex-1" onClick={() => window.open(`sms:${quoteData.phone?.replace(/\D/g, '')}?body=${encodeURIComponent(generateSMSText())}`, '_blank')} disabled={!quoteData.phone}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Send SMS
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => window.open(`mailto:${quoteData.email}?subject=${encodeURIComponent(`Your Professional Quote - ${quoteData.customerName}`)}&body=${encodeURIComponent(generateSMSText())}`, '_blank')} disabled={!quoteData.email}>
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteDisplay;


import React, { useState } from 'react';
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

  const generateEmailText = () => {
    const servicesHTML = quoteResult.services.map(s => 
      s.note 
        ? `<li>${s.name}: <em>${s.note}</em></li>`
        : `<li>${s.name}: <strong>${formatCurrency(s.price)}</strong></li>`
    ).join('');
    const addOnsHTML = quoteResult.addOns.length > 0 
      ? `<h3>Add-on Services:</h3><ul>${quoteResult.addOns.map(a => `<li>${a.name}: <strong>${formatCurrency(a.price)}</strong></li>`).join('')}</ul>`
      : '';
    
    return `Subject: Your Pressure Washing Quote - ${quoteData.customerName}

Dear ${quoteData.customerName},

Thank you for your interest in BC Pressure Washing! I've prepared a detailed quote for your property at ${quoteData.address}.

<h2>Services Included:</h2>
<ul>
${servicesHTML}
</ul>

${addOnsHTML}

<hr>
<h2>Quote Summary:</h2>
<p><strong>Subtotal:</strong> ${formatCurrency(quoteResult.subtotal)}</p>
<p><strong>Tax (12%):</strong> ${formatCurrency(quoteResult.tax)}</p>
<p><strong>TOTAL:</strong> ${formatCurrency(quoteResult.total)}</p>

${quoteData.notes ? `<h3>Special Notes:</h3><p>${quoteData.notes}</p>` : ''}

<h3>What's Included:</h3>
<ul>
<li>✅ Professional grade equipment</li>
<li>✅ Eco-friendly cleaning solutions</li>
<li>✅ Fully insured and bonded</li>
<li>✅ 100% satisfaction guarantee</li>
<li>✅ Personal quality check by Jayden Fisher</li>
</ul>

<p><strong>Ready to book?</strong> Reply to this email or call us directly!</p>

<p>Best regards,<br>
Jayden Fisher<br>
BC Pressure Washing<br>
📧 info@bcpressurewashing.ca<br>
🌐 bcpressurewashing.ca<br>
📱 ${quoteData.phone || '(604) XXX-XXXX'}</p>`;
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
    const emailContent = generateEmailText();
    const subject = `Your Pressure Washing Quote - ${quoteData.customerName}`;
    const mailtoUrl = `mailto:${quoteData.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent.replace(/<[^>]*>/g, ''))}`;
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
            <div className="bg-gray-50 p-4 rounded-lg border max-h-96 overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: generateEmailText().replace(/\n/g, '<br>') }} />
            </div>
            <Button onClick={() => copyToClipboard(generateEmailText(), 'Email')} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy Email Content
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

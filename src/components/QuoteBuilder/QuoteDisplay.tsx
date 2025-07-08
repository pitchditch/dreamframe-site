
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Send, X, MessageSquare, Mail } from 'lucide-react';
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
    const servicesText = quoteResult.services.map(s => `• ${s.name}: ${formatCurrency(s.price)}`).join('\n');
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
    const servicesHTML = quoteResult.services.map(s => `<li>${s.name}: <strong>${formatCurrency(s.price)}</strong></li>`).join('');
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

  const downloadAsPDF = () => {
    const printContent = document.getElementById('quote-print-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
      printWindow?.document.write(`
        <html>
          <head>
            <title>Quote - ${quoteData.customerName}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .quote-details { margin: 20px 0; }
              .services-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .services-table th, .services-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .services-table th { background-color: #f2f2f2; }
              .total-section { margin-top: 20px; text-align: right; }
              .signature { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  return (
    <Card className="w-full">
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
            <div id="quote-print-content">
              <div className="header">
                <h1>BC Pressure Washing</h1>
                <p>Professional Exterior Cleaning Services</p>
                <p>bcpressurewashing.ca</p>
              </div>

              <div className="quote-details">
                <h2>Quote for: {quoteData.customerName}</h2>
                {quoteData.address && <p><strong>Address:</strong> {quoteData.address}</p>}
                {quoteData.phone && <p><strong>Phone:</strong> {quoteData.phone}</p>}
                {quoteData.email && <p><strong>Email:</strong> {quoteData.email}</p>}
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>

              <table className="services-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteResult.services.map((service, index) => (
                    <tr key={index}>
                      <td>{service.name}</td>
                      <td>{formatCurrency(service.price)}</td>
                    </tr>
                  ))}
                  {quoteResult.addOns.map((addOn, index) => (
                    <tr key={`addon-${index}`}>
                      <td>{addOn.name} (Add-on)</td>
                      <td>{formatCurrency(addOn.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="total-section">
                <p><strong>Subtotal:</strong> {formatCurrency(quoteResult.subtotal)}</p>
                <p><strong>Tax (12%):</strong> {formatCurrency(quoteResult.tax)}</p>
                <p style={{ fontSize: '1.2em' }}><strong>TOTAL: {formatCurrency(quoteResult.total)}</strong></p>
              </div>

              {quoteData.notes && (
                <div style={{ marginTop: '20px' }}>
                  <strong>Notes:</strong>
                  <p>{quoteData.notes}</p>
                </div>
              )}

              <div className="signature">
                <p><strong>Every job is personally checked by Jayden Fisher</strong></p>
                <p>BC Pressure Washing | bcpressurewashing.ca</p>
                <p>Fully Insured & Bonded | 100% Satisfaction Guarantee</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{generateSMSText()}</pre>
            </div>
            <Button onClick={() => copyToClipboard(generateSMSText(), 'SMS')} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy SMS Text
            </Button>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
              <div dangerouslySetInnerHTML={{ __html: generateEmailText().replace(/\n/g, '<br>') }} />
            </div>
            <Button onClick={() => copyToClipboard(generateEmailText(), 'Email')} className="w-full">
              <Copy className="w-4 h-4 mr-2" />
              Copy Email Content
            </Button>
          </TabsContent>

          <TabsContent value="pdf" className="space-y-4">
            <div className="text-center space-y-4">
              <p>Click the button below to open a print-friendly version that you can save as PDF.</p>
              <Button onClick={downloadAsPDF} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Generate PDF
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Send SMS
          </Button>
          <Button variant="outline" className="flex-1">
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteDisplay;

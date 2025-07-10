
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, Download, Send, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import QuoteDisplay from './QuoteDisplay';
import { calculateQuotePrice, formatCurrency } from './utils/quoteCalculations';

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

const QuoteBuilderForm = () => {
  const { toast } = useToast();
  const [quoteData, setQuoteData] = useState<QuoteData>({
    customerName: '',
    address: '',
    phone: '',
    email: '',
    houseSize: '',
    services: [],
    notes: '',
    addOns: []
  });
  
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  const houseSizeOptions = [
    { value: 'small', label: '0-1,800 sqft (Small)' },
    { value: 'medium', label: '1,800-2,800 sqft (Medium)' },
    { value: 'large', label: '2,800-3,500 sqft (Large)' },
    { value: 'xlarge', label: '3,500+ sqft (X-Large)' }
  ];

  const serviceOptions = [
    { id: 'window-outside', label: 'Window Cleaning (Outside)' },
    { id: 'window-inside', label: 'Window Cleaning (Inside)' },
    { id: 'window-both', label: 'Window Cleaning (Both Sides)' },
    { id: 'house-wash', label: 'House Washing' },
    { id: 'house-wash-windows', label: 'House Wash + Windows' },
    { id: 'driveway', label: 'Driveway Washing' },
    { id: 'driveway-house', label: 'Driveway + House Washing' },
    { id: 'gutter-inside', label: 'Gutter Cleaning (Inside)' },
    { id: 'gutter-outside', label: 'Gutter Cleaning (Outside)' },
    { id: 'gutter-both', label: 'Gutter Cleaning (Both)' },
    { id: 'roof', label: 'Roof Cleaning' }
  ];

  const addOnOptions = [
    { id: 'deck-wash', label: 'Deck Washing', price: 250 },
    { id: 'fence-wash', label: 'Fence Washing', price: 200 },
    { id: 'garage-floor', label: 'Garage Floor Cleaning', price: 150 },
    { id: 'concrete-sealing', label: 'Concrete Sealing', price: 300 }
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setQuoteData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, serviceId]
        : prev.services.filter(s => s !== serviceId)
    }));
  };

  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    setQuoteData(prev => ({
      ...prev,
      addOns: checked 
        ? [...prev.addOns, addOnId]
        : prev.addOns.filter(a => a !== addOnId)
    }));
  };

  const calculateQuote = () => {
    if (!quoteData.customerName || !quoteData.houseSize || quoteData.services.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer name, house size, and select at least one service.",
        variant: "destructive"
      });
      return;
    }

    const result = calculateQuotePrice(quoteData.houseSize, quoteData.services, quoteData.addOns, addOnOptions);
    setQuoteResult(result);
    setShowQuote(true);
  };

  const resetForm = () => {
    setQuoteData({
      customerName: '',
      address: '',
      phone: '',
      email: '',
      houseSize: '',
      services: [],
      notes: '',
      addOns: []
    });
    setQuoteResult(null);
    setShowQuote(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Quote Builder - BC Pressure Washing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                value={quoteData.customerName}
                onChange={(e) => setQuoteData(prev => ({ ...prev, customerName: e.target.value }))}
                placeholder="John Smith"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={quoteData.phone}
                onChange={(e) => setQuoteData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(604) 123-4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Property Address</Label>
              <Input
                id="address"
                value={quoteData.address}
                onChange={(e) => setQuoteData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="123 Main St, White Rock, BC"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={quoteData.email}
                onChange={(e) => setQuoteData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* House Size Selection */}
          <div className="space-y-2">
            <Label>House Size *</Label>
            <Select value={quoteData.houseSize} onValueChange={(value) => setQuoteData(prev => ({ ...prev, houseSize: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select house size" />
              </SelectTrigger>
              <SelectContent>
                {houseSizeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Services Selection */}
          <div className="space-y-3">
            <Label>Services Required *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {serviceOptions.map(service => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={quoteData.services.includes(service.id)}
                    onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                  />
                  <Label htmlFor={service.id} className="text-sm">
                    {service.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons Selection */}
          <div className="space-y-3">
            <Label>Optional Add-ons</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {addOnOptions.map(addOn => (
                <div key={addOn.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={addOn.id}
                    checked={quoteData.addOns.includes(addOn.id)}
                    onCheckedChange={(checked) => handleAddOnChange(addOn.id, checked as boolean)}
                  />
                  <Label htmlFor={addOn.id} className="text-sm">
                    {addOn.label} (+{formatCurrency(addOn.price)})
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={quoteData.notes}
              onChange={(e) => setQuoteData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any special requirements, access notes, or additional details..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={calculateQuote} className="flex-1">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Quote
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quote Display */}
      {showQuote && quoteResult && (
        <QuoteDisplay
          quoteData={quoteData}
          quoteResult={quoteResult}
          onClose={() => setShowQuote(false)}
        />
      )}
    </div>
  );
};

export default QuoteBuilderForm;

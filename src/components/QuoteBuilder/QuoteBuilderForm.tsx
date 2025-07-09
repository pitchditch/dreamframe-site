
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

interface ServicePrice {
  id: string;
  name: string;
  price: number;
  selected: boolean;
}

interface AddOnPrice {
  id: string;
  name: string;
  price: number;
  selected: boolean;
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
  gst: number;
  pst: number;
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
  
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([
    { id: 'window-outside', name: 'Window Cleaning (Outside)', price: 300, selected: false },
    { id: 'window-inside', name: 'Window Cleaning (Inside)', price: 300, selected: false },
    { id: 'window-both', name: 'Window Cleaning (Both Sides)', price: 550, selected: false },
    { id: 'house-wash', name: 'House Washing', price: 400, selected: false },
    { id: 'house-wash-windows', name: 'House Wash + Windows', price: 650, selected: false },
    { id: 'driveway', name: 'Driveway Washing', price: 300, selected: false },
    { id: 'driveway-house', name: 'Driveway + House Washing', price: 650, selected: false },
    { id: 'gutter-inside', name: 'Gutter Cleaning (Inside)', price: 350, selected: false },
    { id: 'gutter-outside', name: 'Gutter Cleaning (Outside)', price: 200, selected: false },
    { id: 'gutter-both', name: 'Gutter Cleaning (Both)', price: 500, selected: false },
    { id: 'roof', name: 'Roof Cleaning', price: 800, selected: false }
  ]);

  const [addOnPrices, setAddOnPrices] = useState<AddOnPrice[]>([
    { id: 'deck-wash', name: 'Deck Washing', price: 250, selected: false },
    { id: 'fence-wash', name: 'Fence Washing', price: 200, selected: false },
    { id: 'garage-floor', name: 'Garage Floor Cleaning', price: 150, selected: false },
    { id: 'concrete-sealing', name: 'Concrete Sealing', price: 300, selected: false }
  ]);

  // Tax controls
  const [gstRate] = useState(7); // GST is always 7%
  const [applyPst, setApplyPst] = useState(false);
  const [pstRate, setPstRate] = useState(7); // Default PST rate for BC

  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  const houseSizeOptions = [
    { value: 'small', label: '0-1,800 sqft (Small)' },
    { value: 'medium', label: '1,800-2,800 sqft (Medium)' },
    { value: 'large', label: '2,800-3,500 sqft (Large)' },
    { value: 'xlarge', label: '3,500+ sqft (X-Large)' }
  ];

  const handleServiceToggle = (serviceId: string, checked: boolean) => {
    setServicePrices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, selected: checked }
          : service
      )
    );
  };

  const handleServicePriceChange = (serviceId: string, price: number) => {
    setServicePrices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, price: price || 0 }
          : service
      )
    );
  };

  const handleAddOnToggle = (addOnId: string, checked: boolean) => {
    setAddOnPrices(prev => 
      prev.map(addOn => 
        addOn.id === addOnId 
          ? { ...addOn, selected: checked }
          : addOn
      )
    );
  };

  const handleAddOnPriceChange = (addOnId: string, price: number) => {
    setAddOnPrices(prev => 
      prev.map(addOn => 
        addOn.id === addOnId 
          ? { ...addOn, price: price || 0 }
          : addOn
      )
    );
  };

  const calculateQuote = () => {
    if (!quoteData.customerName || !quoteData.houseSize) {
      toast({
        title: "Missing Information",
        description: "Please fill in customer name and house size.",
        variant: "destructive"
      });
      return;
    }

    const selectedServices = servicePrices.filter(service => service.selected);
    const selectedAddOns = addOnPrices.filter(addOn => addOn.selected);

    if (selectedServices.length === 0) {
      toast({
        title: "No Services Selected",
        description: "Please select at least one service.",
        variant: "destructive"
      });
      return;
    }

    // Calculate subtotal
    const subtotal = selectedServices.reduce((sum, service) => sum + service.price, 0) +
                    selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);

    // Calculate taxes
    const gst = subtotal * (gstRate / 100);
    const pst = applyPst ? subtotal * (pstRate / 100) : 0;
    const total = subtotal + gst + pst;

    const result: QuoteResult = {
      services: selectedServices.map(service => ({
        name: service.name,
        price: service.price
      })),
      addOns: selectedAddOns.map(addOn => ({
        name: addOn.name,
        price: addOn.price
      })),
      subtotal,
      gst,
      pst,
      total
    };

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
    setServicePrices(prev => prev.map(service => ({ ...service, selected: false })));
    setAddOnPrices(prev => prev.map(addOn => ({ ...addOn, selected: false })));
    setApplyPst(false);
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

          {/* Services Selection with Manual Pricing */}
          <div className="space-y-3">
            <Label>Services Required *</Label>
            <div className="space-y-3">
              {servicePrices.map(service => (
                <div key={service.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <Checkbox
                    id={service.id}
                    checked={service.selected}
                    onCheckedChange={(checked) => handleServiceToggle(service.id, checked as boolean)}
                  />
                  <Label htmlFor={service.id} className="flex-1 text-sm">
                    {service.name}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">$</Label>
                    <Input
                      type="number"
                      value={service.price}
                      onChange={(e) => handleServicePriceChange(service.id, parseFloat(e.target.value))}
                      className="w-20"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons Selection with Manual Pricing */}
          <div className="space-y-3">
            <Label>Optional Add-ons</Label>
            <div className="space-y-3">
              {addOnPrices.map(addOn => (
                <div key={addOn.id} className="flex items-center gap-4 p-3 border rounded-lg">
                  <Checkbox
                    id={addOn.id}
                    checked={addOn.selected}
                    onCheckedChange={(checked) => handleAddOnToggle(addOn.id, checked as boolean)}
                  />
                  <Label htmlFor={addOn.id} className="flex-1 text-sm">
                    {addOn.name}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">$</Label>
                    <Input
                      type="number"
                      value={addOn.price}
                      onChange={(e) => handleAddOnPriceChange(addOn.id, parseFloat(e.target.value))}
                      className="w-20"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tax Controls */}
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold">Tax Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GST (Always Applied)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={gstRate}
                    readOnly
                    className="w-20 bg-gray-100"
                  />
                  <Label className="text-sm">%</Label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="apply-pst"
                    checked={applyPst}
                    onCheckedChange={(checked) => setApplyPst(checked as boolean)}
                  />
                  <Label htmlFor="apply-pst">Apply PST</Label>
                </div>
                {applyPst && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={pstRate}
                      onChange={(e) => setPstRate(parseFloat(e.target.value) || 0)}
                      className="w-20"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <Label className="text-sm">%</Label>
                  </div>
                )}
              </div>
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

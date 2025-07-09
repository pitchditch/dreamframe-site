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

interface ServicePrice {
  serviceId: string;
  price: number;
}

interface AddOnPrice {
  addOnId: string;
  price: number;
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
  
  const [servicePrices, setServicePrices] = useState<ServicePrice[]>([]);
  const [addOnPrices, setAddOnPrices] = useState<AddOnPrice[]>([]);
  const [applyGST, setApplyGST] = useState(true);
  const [gstRate, setGstRate] = useState(7);
  const [applyPST, setApplyPST] = useState(false);
  const [pstRate, setPstRate] = useState(7);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  const houseSizeOptions = [
    { value: 'small', label: '0-1,800 sqft (Small)' },
    { value: 'medium', label: '1,800-2,800 sqft (Medium)' },
    { value: 'large', label: '2,800-3,500 sqft (Large)' },
    { value: 'xlarge', label: '3,500+ sqft (X-Large)' }
  ];

  const serviceOptions = [
    { id: 'window-outside', label: 'Window Cleaning (Outside)', defaultPrice: 300 },
    { id: 'window-inside', label: 'Window Cleaning (Inside)', defaultPrice: 300 },
    { id: 'window-both', label: 'Window Cleaning (Both Sides)', defaultPrice: 550 },
    { id: 'house-wash', label: 'House Washing', defaultPrice: 400 },
    { id: 'house-wash-windows', label: 'House Wash + Windows', defaultPrice: 650 },
    { id: 'driveway', label: 'Driveway Washing', defaultPrice: 300 },
    { id: 'driveway-house', label: 'Driveway + House Washing', defaultPrice: 650 },
    { id: 'gutter-inside', label: 'Gutter Cleaning (Inside)', defaultPrice: 300 },
    { id: 'gutter-outside', label: 'Gutter Cleaning (Outside)', defaultPrice: 200 },
    { id: 'gutter-both', label: 'Gutter Cleaning (Both)', defaultPrice: 450 },
    { id: 'roof', label: 'Roof Cleaning', defaultPrice: 500 }
  ];

  const addOnOptions = [
    { id: 'deck-wash', label: 'Deck Washing', defaultPrice: 250 },
    { id: 'fence-wash', label: 'Fence Washing', defaultPrice: 200 },
    { id: 'garage-floor', label: 'Garage Floor Cleaning', defaultPrice: 150 },
    { id: 'concrete-sealing', label: 'Concrete Sealing', defaultPrice: 300 }
  ];

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    if (checked) {
      setQuoteData(prev => ({
        ...prev,
        services: [...prev.services, serviceId]
      }));
      
      const service = serviceOptions.find(s => s.id === serviceId);
      if (service && !servicePrices.find(sp => sp.serviceId === serviceId)) {
        setServicePrices(prev => [...prev, { serviceId, price: service.defaultPrice }]);
      }
    } else {
      setQuoteData(prev => ({
        ...prev,
        services: prev.services.filter(s => s !== serviceId)
      }));
      
      setServicePrices(prev => prev.filter(sp => sp.serviceId !== serviceId));
    }
  };

  const handleAddOnChange = (addOnId: string, checked: boolean) => {
    if (checked) {
      setQuoteData(prev => ({
        ...prev,
        addOns: [...prev.addOns, addOnId]
      }));
      
      const addOn = addOnOptions.find(a => a.id === addOnId);
      if (addOn && !addOnPrices.find(ap => ap.addOnId === addOnId)) {
        setAddOnPrices(prev => [...prev, { addOnId, price: addOn.defaultPrice }]);
      }
    } else {
      setQuoteData(prev => ({
        ...prev,
        addOns: prev.addOns.filter(a => a !== addOnId)
      }));
      
      setAddOnPrices(prev => prev.filter(ap => ap.addOnId !== addOnId));
    }
  };

  const handleServicePriceChange = (serviceId: string, price: number) => {
    setServicePrices(prev => 
      prev.map(sp => sp.serviceId === serviceId ? { ...sp, price } : sp)
    );
  };

  const handleAddOnPriceChange = (addOnId: string, price: number) => {
    setAddOnPrices(prev => 
      prev.map(ap => ap.addOnId === addOnId ? { ...ap, price } : ap)
    );
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

    const services = quoteData.services.map(serviceId => {
      const service = serviceOptions.find(s => s.id === serviceId);
      const priceData = servicePrices.find(sp => sp.serviceId === serviceId);
      return {
        name: service?.label || serviceId,
        price: priceData?.price || 0
      };
    });

    const addOns = quoteData.addOns.map(addOnId => {
      const addOn = addOnOptions.find(a => a.id === addOnId);
      const priceData = addOnPrices.find(ap => ap.addOnId === addOnId);
      return {
        name: addOn?.label || addOnId,
        price: priceData?.price || 0
      };
    });

    const subtotal = services.reduce((sum, s) => sum + s.price, 0) + 
                    addOns.reduce((sum, a) => sum + a.price, 0);

    const gst = applyGST ? subtotal * (gstRate / 100) : 0;
    const pst = applyPST ? subtotal * (pstRate / 100) : 0;
    const total = subtotal + gst + pst;

    const result = {
      services,
      addOns,
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
    setServicePrices([]);
    setAddOnPrices([]);
    setApplyGST(true);
    setGstRate(7);
    setApplyPST(false);
    setPstRate(7);
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
            <div className="space-y-3">
              {serviceOptions.map(service => (
                <div key={service.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <Checkbox
                    id={service.id}
                    checked={quoteData.services.includes(service.id)}
                    onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={service.id} className="text-sm font-medium">
                      {service.label}
                    </Label>
                  </div>
                  {quoteData.services.includes(service.id) && (
                    <div className="flex items-center space-x-2">
                      <Label className="text-sm">Price:</Label>
                      <Input
                        type="number"
                        value={servicePrices.find(sp => sp.serviceId === service.id)?.price || service.defaultPrice}
                        onChange={(e) => handleServicePriceChange(service.id, parseFloat(e.target.value) || 0)}
                        className="w-24"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons Selection */}
          <div className="space-y-3">
            <Label>Optional Add-ons</Label>
            <div className="space-y-3">
              {addOnOptions.map(addOn => (
                <div key={addOn.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <Checkbox
                    id={addOn.id}
                    checked={quoteData.addOns.includes(addOn.id)}
                    onCheckedChange={(checked) => handleAddOnChange(addOn.id, checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={addOn.id} className="text-sm font-medium">
                      {addOn.label}
                    </Label>
                  </div>
                  {quoteData.addOns.includes(addOn.id) && (
                    <div className="flex items-center space-x-2">
                      <Label className="text-sm">Price:</Label>
                      <Input
                        type="number"
                        value={addOnPrices.find(ap => ap.addOnId === addOn.id)?.price || addOn.defaultPrice}
                        onChange={(e) => handleAddOnPriceChange(addOn.id, parseFloat(e.target.value) || 0)}
                        className="w-24"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tax Settings */}
          <div className="space-y-3">
            <Label>Tax Settings</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <Checkbox
                  id="gst"
                  checked={applyGST}
                  onCheckedChange={(checked) => setApplyGST(checked as boolean)}
                />
                <Label htmlFor="gst" className="text-sm flex-1">
                  Apply GST
                </Label>
                {applyGST && (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={gstRate}
                      onChange={(e) => setGstRate(parseFloat(e.target.value) || 0)}
                      className="w-16"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="text-sm">%</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <Checkbox
                  id="pst"
                  checked={applyPST}
                  onCheckedChange={(checked) => setApplyPST(checked as boolean)}
                />
                <Label htmlFor="pst" className="text-sm flex-1">
                  Apply PST
                </Label>
                {applyPST && (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={pstRate}
                      onChange={(e) => setPstRate(parseFloat(e.target.value) || 0)}
                      className="w-16"
                      min="0"
                      max="100"
                      step="0.1"
                    />
                    <span className="text-sm">%</span>
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

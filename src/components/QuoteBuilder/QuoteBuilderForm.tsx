import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, Download, Send, Copy, Plus, Trash2, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuoteLog } from '@/hooks/useQuoteLog';
import QuoteDisplay from './QuoteDisplay';
import QuoteLog from './QuoteLog';

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

interface CustomService {
  id: string;
  name: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
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
  products: Array<{
    name: string;
    price: number;
  }>;
  servicesSubtotal: number;
  productsSubtotal: number;
  gst: number;
  pst: number;
  total: number;
}

const QuoteBuilderForm = () => {
  const { toast } = useToast();
  const { logQuote, isLogging } = useQuoteLog();
  const [showQuoteLog, setShowQuoteLog] = useState(false);

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

  // Custom services state
  const [customServices, setCustomServices] = useState<CustomService[]>([]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

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

  const addCustomService = () => {
    if (!newServiceName.trim() || !newServicePrice) {
      toast({
        title: "Missing Information",
        description: "Please enter both service name and price.",
        variant: "destructive"
      });
      return;
    }

    const customService: CustomService = {
      id: `custom-${Date.now()}`,
      name: newServiceName.trim(),
      price: parseFloat(newServicePrice) || 0
    };

    setCustomServices(prev => [...prev, customService]);
    setNewServiceName('');
    setNewServicePrice('');

    toast({
      title: "Custom Service Added",
      description: `${customService.name} has been added to your services.`,
    });
  };

  const removeCustomService = (serviceId: string) => {
    setCustomServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const updateCustomServicePrice = (serviceId: string, price: number) => {
    setCustomServices(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, price: price || 0 }
          : service
      )
    );
  };

  const addProduct = () => {
    if (!newProductName.trim() || !newProductPrice) {
      toast({
        title: "Missing Information",
        description: "Please enter both product name and price.",
        variant: "destructive"
      });
      return;
    }

    const product: Product = {
      id: `product-${Date.now()}`,
      name: newProductName.trim(),
      price: parseFloat(newProductPrice) || 0
    };

    setProducts(prev => [...prev, product]);
    setNewProductName('');
    setNewProductPrice('');

    toast({
      title: "Product Added",
      description: `${product.name} has been added to your products.`,
    });
  };

  const removeProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const updateProductPrice = (productId: string, price: number) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, price: price || 0 }
          : product
      )
    );
  };

  const calculateQuote = async () => {
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

    if (selectedServices.length === 0 && customServices.length === 0 && products.length === 0) {
      toast({
        title: "No Items Selected",
        description: "Please select at least one service, add a custom service, or add a product.",
        variant: "destructive"
      });
      return;
    }

    // Calculate services and add-ons subtotal
    const servicesSubtotal = selectedServices.reduce((sum, service) => sum + service.price, 0) +
                            selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0) +
                            customServices.reduce((sum, service) => sum + service.price, 0);

    // Calculate products subtotal
    const productsSubtotal = products.reduce((sum, product) => sum + product.price, 0);

    // Calculate taxes
    // GST applies to both services and products
    const gst = (servicesSubtotal + productsSubtotal) * (gstRate / 100);
    
    // PST applies only to products (if enabled)
    const pst = applyPst ? productsSubtotal * (pstRate / 100) : 0;
    
    const total = servicesSubtotal + productsSubtotal + gst + pst;

    const result: QuoteResult = {
      services: [
        ...selectedServices.map(service => ({
          name: service.name,
          price: service.price
        })),
        ...customServices.map(service => ({
          name: service.name,
          price: service.price
        }))
      ],
      addOns: selectedAddOns.map(addOn => ({
        name: addOn.name,
        price: addOn.price
      })),
      products: products.map(product => ({
        name: product.name,
        price: product.price
      })),
      servicesSubtotal,
      productsSubtotal,
      gst,
      pst,
      total
    };

    // Log the quote to database
    const logData = {
      customerName: quoteData.customerName,
      customerEmail: quoteData.email || undefined,
      customerPhone: quoteData.phone || undefined,
      propertyAddress: quoteData.address || undefined,
      houseSize: quoteData.houseSize || undefined,
      services: result.services,
      addOns: result.addOns,
      products: result.products,
      servicesSubtotal: result.servicesSubtotal,
      productsSubtotal: result.productsSubtotal,
      gstAmount: result.gst,
      pstAmount: result.pst,
      totalAmount: result.total,
      notes: quoteData.notes || undefined
    };

    await logQuote(logData);

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
    setCustomServices([]);
    setProducts([]);
    setNewServiceName('');
    setNewServicePrice('');
    setNewProductName('');
    setNewProductPrice('');
    setApplyPst(false);
    setQuoteResult(null);
    setShowQuote(false);
  };

  if (showQuoteLog) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Quote Log</h2>
          <Button onClick={() => setShowQuoteLog(false)} variant="outline">
            Back to Quote Builder
          </Button>
        </div>
        <QuoteLog />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Quote Builder - BC Pressure Washing
            </div>
            <Button
              variant="outline"
              onClick={() => setShowQuoteLog(true)}
              className="flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              View Quote Log
            </Button>
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

          {/* Custom Services Section */}
          <div className="space-y-3">
            <Label>Custom Services</Label>
            
            {/* Add New Custom Service */}
            <div className="p-4 border rounded-lg bg-gray-50">
              <Label className="text-sm font-medium mb-3 block">Add Custom Service</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Enter custom service name"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Label className="text-sm">$</Label>
                    <Input
                      type="number"
                      placeholder="Price"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <Button onClick={addCustomService} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Display Custom Services */}
            {customServices.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Added Custom Services</Label>
                {customServices.map(service => (
                  <div key={service.id} className="flex items-center gap-4 p-3 border rounded-lg bg-blue-50">
                    <div className="flex-1 text-sm font-medium text-blue-700">
                      {service.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">$</Label>
                      <Input
                        type="number"
                        value={service.price}
                        onChange={(e) => updateCustomServicePrice(service.id, parseFloat(e.target.value))}
                        className="w-20"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeCustomService(service.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
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

          {/* Products Section */}
          <div className="space-y-3">
            <Label>Products</Label>
            
            {/* Add New Product */}
            <div className="p-4 border rounded-lg bg-green-50">
              <Label className="text-sm font-medium mb-3 block">Add Product</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                  <Input
                    placeholder="Enter product name"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <Label className="text-sm">$</Label>
                    <Input
                      type="number"
                      placeholder="Price"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <Button onClick={addProduct} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Display Products */}
            {products.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Added Products</Label>
                {products.map(product => (
                  <div key={product.id} className="flex items-center gap-4 p-3 border rounded-lg bg-green-50">
                    <div className="flex-1 text-sm font-medium text-green-700">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">$</Label>
                      <Input
                        type="number"
                        value={product.price}
                        onChange={(e) => updateProductPrice(product.id, parseFloat(e.target.value))}
                        className="w-20"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tax Controls */}
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold">Tax Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GST (Applied to Services & Products)</Label>
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
                  <Label htmlFor="apply-pst">Apply PST (Products Only)</Label>
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
            <Button onClick={calculateQuote} className="flex-1" disabled={isLogging}>
              <Calculator className="w-4 h-4 mr-2" />
              {isLogging ? 'Saving Quote...' : 'Calculate Quote'}
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

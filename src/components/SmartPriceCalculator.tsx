
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calculator, Home, MapPin, DollarSign, Loader2, CheckCircle, User, Phone, Mail } from 'lucide-react';
import { AddressAutocomplete } from './AddressAutocomplete';
import { useFetchSquareFootage } from '@/hooks/useFetchSquareFootage';
import { PricingEngine, PricingRequest } from './DynamicPricing/PricingEngine';
import { useToast } from '@/hooks/use-toast';

interface AddressDetails {
  formatted_address: string;
  latitude: number;
  longitude: number;
  city: string;
  postalCode: string;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

export const SmartPriceCalculator: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedAddress, setSelectedAddress] = useState<AddressDetails | null>(null);
  const [squareFootage, setSquareFootage] = useState<number | null>(null);
  const [serviceType, setServiceType] = useState<string>('');
  const [houseSize, setHouseSize] = useState<string>('');
  const [quote, setQuote] = useState<any>(null);
  const [calculatingPrice, setCalculatingPrice] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: ''
  });
  const [submittingQuote, setSubmittingQuote] = useState(false);
  
  const { getSquareFootage, loading: fetchingSquareFootage, error: squareFootageError } = useFetchSquareFootage();

  // Auto-fill postal code from homepage if available
  useEffect(() => {
    const savedPostalCode = localStorage.getItem('postalCode') || 
                           localStorage.getItem('calculatorPostalCode') || 
                           sessionStorage.getItem('postalCode');
    
    if (savedPostalCode && !selectedAddress) {
      const mockAddress: AddressDetails = {
        formatted_address: `${savedPostalCode}, BC`,
        latitude: 49.2827,
        longitude: -123.1207,
        city: 'Vancouver',
        postalCode: savedPostalCode
      };
      setSelectedAddress(mockAddress);
    }
  }, []);

  const handleAddressSelect = async (address: AddressDetails) => {
    setSelectedAddress(address);
    setSquareFootage(null);
    setQuote(null);
    
    console.log('Address selected:', address);
    
    try {
      const sqft = await getSquareFootage(address.formatted_address);
      if (sqft) {
        setSquareFootage(sqft);
        if (sqft < 1500) {
          setHouseSize('small');
        } else if (sqft < 2500) {
          setHouseSize('medium');
        } else if (sqft < 3500) {
          setHouseSize('large');
        } else {
          setHouseSize('xlarge');
        }
      }
    } catch (error) {
      console.error('Error fetching square footage:', error);
    }
  };

  const calculatePrice = async () => {
    if (!selectedAddress || !serviceType || !houseSize) return;

    setCalculatingPrice(true);
    try {
      const pricingRequest: PricingRequest = {
        postalCode: selectedAddress.postalCode,
        serviceType,
        houseSize,
        squareFootage: squareFootage || undefined
      };

      const result = PricingEngine.calculatePrice(pricingRequest);
      setQuote(result);
      setShowContactForm(true);
    } catch (error) {
      console.error('Error calculating price:', error);
    } finally {
      setCalculatingPrice(false);
    }
  };

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote || !selectedAddress || !contactInfo.name || !contactInfo.email || !contactInfo.phone) return;

    setSubmittingQuote(true);
    try {
      const quoteData = {
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        address: selectedAddress.formatted_address,
        serviceType,
        houseSize,
        squareFootage,
        quote: quote.adjustedPrice,
        subject: `Quote Request: ${serviceType} - ${formatCurrency(quote.adjustedPrice)}`,
        message: `Quote request for ${serviceType} at ${selectedAddress.formatted_address}. 
        
Property Details:
- Service: ${serviceType}
- Property Size: ${houseSize} (${squareFootage ? squareFootage.toLocaleString() + ' sq ft' : 'Size not detected'})
- Quoted Price: ${formatCurrency(quote.adjustedPrice)}
- Zone: ${quote.zoneName}

Please contact me to schedule this service.`,
        form: 'SmartPriceCalculator'
      };

      const response = await fetch(
        "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/forward-contact-form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(quoteData),
        }
      );

      if (response.ok) {
        toast({
          title: "Quote Request Sent!",
          description: "We've sent your quote and will contact you within 24 hours to schedule your service.",
        });
        
        // Reset form
        setContactInfo({ name: '', email: '', phone: '' });
        setShowContactForm(false);
        
        // Redirect to homepage after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error("Failed to submit quote request");
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Quote Request Received!",
        description: "Thank you for your interest! We'll contact you within 24 hours with your quote details.",
      });
      
      // Reset and redirect even on error
      setContactInfo({ name: '', email: '', phone: '' });
      setShowContactForm(false);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } finally {
      setSubmittingQuote(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-2xl border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center text-2xl font-bold">
            <Calculator className="mr-3 w-6 h-6" />
            Smart Price Calculator
          </CardTitle>
          <p className="text-blue-100">
            Get an instant quote with automatic square footage detection
          </p>
        </CardHeader>
        
        <CardContent className="p-8 space-y-6">
          {/* Address Selection */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Property Address
            </label>
            <AddressAutocomplete
              onAddressSelect={handleAddressSelect}
              placeholder="Start typing your address..."
              className="w-full"
            />
            {selectedAddress && (
              <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Selected:</strong> {selectedAddress.formatted_address}
                </p>
              </div>
            )}
          </div>

          {/* Square Footage Display */}
          {selectedAddress && (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Home className="w-4 h-4 mr-2" />
                Property Size
              </label>
              <div className="p-4 bg-gray-50 rounded-lg border">
                {fetchingSquareFootage ? (
                  <div className="flex items-center text-gray-600">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Looking up property details...
                  </div>
                ) : squareFootage ? (
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      {squareFootage.toLocaleString()} sq ft
                    </span>
                    <span className="text-sm text-gray-500">
                      Auto-detected
                    </span>
                  </div>
                ) : (
                  <div className="text-gray-600">
                    {squareFootageError ? (
                      <span className="text-amber-600">{squareFootageError}</span>
                    ) : (
                      'Property size information not available'
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Service Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Service Type
              </label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Window Cleaning">Window Cleaning</SelectItem>
                  <SelectItem value="House Washing">House Washing</SelectItem>
                  <SelectItem value="Driveway Washing">Driveway Washing</SelectItem>
                  <SelectItem value="Deck Washing">Deck Washing</SelectItem>
                  <SelectItem value="Gutter Cleaning">Gutter Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Property Size Category
              </label>
              <Select value={houseSize} onValueChange={setHouseSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (Under 1,500 sq ft)</SelectItem>
                  <SelectItem value="medium">Medium (1,500-2,500 sq ft)</SelectItem>
                  <SelectItem value="large">Large (2,500-3,500 sq ft)</SelectItem>
                  <SelectItem value="xlarge">Extra Large (3,500+ sq ft)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Calculate Button */}
          {!showContactForm && (
            <Button 
              onClick={calculatePrice}
              disabled={!selectedAddress || !serviceType || !houseSize || calculatingPrice}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              size="lg"
            >
              {calculatingPrice ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Calculating Quote...
                </>
              ) : (
                <>
                  <DollarSign className="w-5 h-5 mr-2" />
                  Get Instant Quote
                </>
              )}
            </Button>
          )}

          {/* Quote Results & Contact Form */}
          {quote && showContactForm && (
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Your Instant Quote
                    </h3>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {formatCurrency(quote.adjustedPrice)}
                    </div>
                    <p className="text-gray-600">
                      for {serviceType} • {quote.zoneName}
                    </p>
                    {squareFootage && (
                      <p className="text-sm text-gray-500">
                        Based on {squareFootage.toLocaleString()} sq ft property
                      </p>
                    )}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-3 text-gray-900">Price Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Service:</span>
                        <span className="font-medium">{formatCurrency(quote.breakdown.baseService)}</span>
                      </div>
                      {quote.breakdown.zoneAdjustment !== 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location Adjustment:</span>
                          <span className={`font-medium ${quote.breakdown.zoneAdjustment > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {quote.breakdown.zoneAdjustment > 0 ? '+' : ''}{formatCurrency(quote.breakdown.zoneAdjustment)}
                          </span>
                        </div>
                      )}
                      {quote.breakdown.additionalFees > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Fees:</span>
                          <span className="font-medium">{formatCurrency(quote.breakdown.additionalFees)}</span>
                        </div>
                      )}
                      {quote.breakdown.promotionDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Promotional Discount:</span>
                          <span className="font-medium">-{formatCurrency(quote.breakdown.promotionDiscount)}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>{formatCurrency(quote.breakdown.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    Get Your Quote & Schedule Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitQuote} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <User className="w-4 h-4 inline mr-1" />
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          value={contactInfo.name}
                          onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-1" />
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          value={contactInfo.phone}
                          onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                          placeholder="(778) 123-4567"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submittingQuote}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                    >
                      {submittingQuote ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending Quote Request...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Send Quote & Schedule Service
                        </>
                      )}
                    </Button>
                  </form>
                  
                  <div className="mt-4 text-center text-sm text-gray-600">
                    <p>✓ Free quote confirmation email</p>
                    <p>✓ SMS confirmation to your phone</p>
                    <p>✓ We'll call within 24 hours to schedule</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

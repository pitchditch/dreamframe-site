import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAddressAutocomplete } from '@/hooks/useAddressAutocomplete';
import { usePropertyEnrichment } from '@/hooks/usePropertyEnrichment';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MapPin, Loader2, Home } from 'lucide-react';
import { toast } from 'sonner';

const PropertyCapture = () => {
  const navigate = useNavigate();
  const { suggestions, loading: addressLoading, searchAddresses, clearSuggestions } = useAddressAutocomplete();
  const { fetchPropertyData, loading: enrichmentLoading } = usePropertyEnrichment();

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    customerName: '',
    phoneNumber: '',
    email: '',
    notes: '',
    status: 'interested',
    leadSource: 'door-to-door'
  });

  const [addressInput, setAddressInput] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [propertyData, setPropertyData] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAddressSearch = (value: string) => {
    setAddressInput(value);
    if (value.length >= 3) {
      searchAddresses(value);
    } else {
      clearSuggestions();
    }
  };

  const handleAddressSelect = async (suggestion: any) => {
    setFormData({
      ...formData,
      address: suggestion.street_address || suggestion.formatted_address,
      city: suggestion.city || '',
      postalCode: suggestion.postalCode || ''
    });
    setAddressInput(suggestion.formatted_address);
    setSelectedLocation({ lat: suggestion.latitude, lng: suggestion.longitude });
    clearSuggestions();

    // Fetch property enrichment data
    toast.info('Fetching property details...');
    const data = await fetchPropertyData(
      suggestion.formatted_address,
      suggestion.latitude,
      suggestion.longitude
    );

    if (data) {
      setPropertyData(data);
      toast.success('Property details loaded');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.address) {
      toast.error('Please enter a property address');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from('properties').insert({
        address: formData.address,
        city: formData.city,
        postal_code: formData.postalCode,
        latitude: selectedLocation?.lat,
        longitude: selectedLocation?.lng,
        customer_name: formData.customerName || null,
        phone_number: formData.phoneNumber || null,
        email: formData.email || null,
        notes: formData.notes || null,
        status: formData.status,
        lead_source: formData.leadSource,
        square_footage: propertyData?.squareFootage,
        year_built: propertyData?.yearBuilt,
        stories: propertyData?.stories,
        property_type: propertyData?.propertyType,
        lot_size: propertyData?.lotSize,
        bedrooms: propertyData?.bedrooms,
        bathrooms: propertyData?.bathrooms,
        property_data_source: propertyData?.source
      });

      if (error) throw error;

      toast.success('Property saved successfully!');
      navigate('/crm/properties');
    } catch (error: any) {
      console.error('Error saving property:', error);
      toast.error('Failed to save property: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/crm')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Property Capture</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Add New Property</CardTitle>
            <CardDescription>Enter property details and customer information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Address Search */}
              <div className="space-y-2">
                <Label htmlFor="addressSearch">Property Address *</Label>
                <div className="relative">
                  <Input
                    id="addressSearch"
                    value={addressInput}
                    onChange={(e) => handleAddressSearch(e.target.value)}
                    placeholder="Start typing address..."
                    className="w-full"
                  />
                  {addressLoading && (
                    <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
                
                {suggestions.length > 0 && (
                  <div className="border rounded-md bg-card shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleAddressSelect(suggestion)}
                        className="w-full text-left px-4 py-3 hover:bg-accent transition-colors flex items-start gap-2"
                      >
                        <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                        <span className="text-sm">{suggestion.formatted_address}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Property Data Display */}
              {propertyData && (
                <div className="p-4 bg-primary/5 rounded-lg space-y-2">
                  <h3 className="font-semibold text-sm">Property Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {propertyData.squareFootage && (
                      <div>
                        <span className="text-muted-foreground">Square Footage:</span>{' '}
                        <span className="font-medium">{propertyData.squareFootage} sq ft</span>
                      </div>
                    )}
                    {propertyData.yearBuilt && (
                      <div>
                        <span className="text-muted-foreground">Year Built:</span>{' '}
                        <span className="font-medium">{propertyData.yearBuilt}</span>
                      </div>
                    )}
                    {propertyData.propertyType && (
                      <div>
                        <span className="text-muted-foreground">Type:</span>{' '}
                        <span className="font-medium">{propertyData.propertyType}</span>
                      </div>
                    )}
                    {propertyData.bedrooms && (
                      <div>
                        <span className="text-muted-foreground">Bedrooms:</span>{' '}
                        <span className="font-medium">{propertyData.bedrooms}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Customer Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="(604) 555-1234"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Lead Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Lead Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger id="status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="interested">Interested</SelectItem>
                        <SelectItem value="not-interested">Not Interested</SelectItem>
                        <SelectItem value="needs-quote">Needs Quote</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="leadSource">Lead Source</Label>
                    <Select value={formData.leadSource} onValueChange={(value) => setFormData({ ...formData, leadSource: value })}>
                      <SelectTrigger id="leadSource">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="door-to-door">Door-to-Door</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Add any additional notes about this property or customer..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/crm')} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting || !formData.address} className="flex-1">
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Property'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PropertyCapture;

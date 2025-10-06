import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { HousePin } from '@/components/house-tracking/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Phone, Mail, Calendar, Star, Home, Ruler, Building } from 'lucide-react';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<HousePin | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    email: '',
    notes: '',
    status: 'interested',
    leadScore: 'medium',
    followUpDate: ''
  });

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      const prop: HousePin = {
        id: data.id,
        lat: data.lat,
        lng: data.lng,
        address: data.address_line1 || '',
        status: data.status as any || 'interested',
        notes: data.notes || '',
        dateAdded: data.created_at,
        customerName: data.customer_name,
        phoneNumber: data.phone_number,
        email: data.email,
        followUpDate: data.follow_up_date,
        leadScore: data.lead_score as any,
        squareFootage: data.living_sqft,
        leadSource: data.lead_source as any,
        yearBuilt: data.year_built,
        stories: data.stories,
        propertyType: data.type,
        lotSize: data.lot_size,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms
      };

      setProperty(prop);
      setFormData({
        customerName: prop.customerName || '',
        phoneNumber: prop.phoneNumber || '',
        email: prop.email || '',
        notes: prop.notes || '',
        status: prop.status,
        leadScore: prop.leadScore || 'medium',
        followUpDate: prop.followUpDate || ''
      });
    } catch (error) {
      console.error('Error fetching property:', error);
      toast({
        title: 'Error',
        description: 'Failed to load property details',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({
          customer_name: formData.customerName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          notes: formData.notes,
          status: formData.status,
          lead_score: formData.leadScore,
          follow_up_date: formData.followUpDate || null,
          last_contact_date: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Property updated successfully'
      });
      
      setEditing(false);
      fetchProperty();
    } catch (error) {
      console.error('Error updating property:', error);
      toast({
        title: 'Error',
        description: 'Failed to update property',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading property details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Property not found</p>
          <Button onClick={() => navigate('/crm/properties')}>Back to Properties</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/crm/properties')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </div>
          {!editing ? (
            <Button onClick={() => setEditing(true)}>Edit Property</Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-sm text-muted-foreground">{property.address}</p>
                </div>
              </div>
              
              {property.squareFootage && (
                <div className="flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Square Footage</p>
                    <p className="text-sm text-muted-foreground">{property.squareFootage} sq ft</p>
                  </div>
                </div>
              )}

              {property.propertyType && (
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Property Type</p>
                    <p className="text-sm text-muted-foreground">{property.propertyType}</p>
                  </div>
                </div>
              )}

              {property.yearBuilt && (
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">Year Built</p>
                    <p className="text-sm text-muted-foreground">{property.yearBuilt}</p>
                  </div>
                </div>
              )}

              {property.bedrooms && property.bathrooms && (
                <div>
                  <p className="font-semibold">Bed/Bath</p>
                  <p className="text-sm text-muted-foreground">
                    {property.bedrooms} bed, {property.bathrooms} bath
                  </p>
                </div>
              )}

              {property.lotSize && (
                <div>
                  <p className="font-semibold">Lot Size</p>
                  <p className="text-sm text-muted-foreground">{property.lotSize}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editing ? (
                <>
                  <div>
                    <Label>Customer Name</Label>
                    <Input
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </>
              ) : (
                <>
                  {property.customerName && (
                    <div>
                      <p className="font-semibold">Name</p>
                      <p className="text-sm text-muted-foreground">{property.customerName}</p>
                    </div>
                  )}
                  {property.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-sm text-muted-foreground">{property.phoneNumber}</p>
                      </div>
                    </div>
                  )}
                  {property.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-sm text-muted-foreground">{property.email}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Lead Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editing ? (
                <>
                  <div>
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visited">Visited</SelectItem>
                        <SelectItem value="interested">Interested</SelectItem>
                        <SelectItem value="not-interested">Not Interested</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="revisit-later">Revisit Later</SelectItem>
                        <SelectItem value="needs-quote">Needs Quote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Lead Score</Label>
                    <Select value={formData.leadScore} onValueChange={(value) => setFormData({...formData, leadScore: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Follow-up Date</Label>
                    <Input
                      type="date"
                      value={formData.followUpDate}
                      onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      rows={4}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <Badge>{property.status}</Badge>
                    {property.leadScore && (
                      <Badge variant="outline">
                        <Star className="h-3 w-3 mr-1" />
                        {property.leadScore} priority
                      </Badge>
                    )}
                  </div>
                  {property.followUpDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <div>
                        <p className="font-semibold">Follow-up Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(property.followUpDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}
                  {property.notes && (
                    <div>
                      <p className="font-semibold">Notes</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">{property.notes}</p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

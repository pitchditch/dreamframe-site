import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { HousePin } from '@/components/house-tracking/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Search, MapPin, Calendar, Phone, Mail, Star } from 'lucide-react';

export default function ViewProperties() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [properties, setProperties] = useState<HousePin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [leadScoreFilter, setLeadScoreFilter] = useState<string>('all');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProperties(data.map(prop => ({
        id: prop.id,
        lat: prop.lat,
        lng: prop.lng,
        address: prop.address_line1 || '',
        status: prop.status as any || 'interested',
        notes: prop.notes || '',
        dateAdded: prop.created_at,
        customerName: prop.customer_name,
        phoneNumber: prop.phone_number,
        email: prop.email,
        followUpDate: prop.follow_up_date,
        leadScore: prop.lead_score as any,
        squareFootage: prop.living_sqft,
        leadSource: prop.lead_source as any,
        yearBuilt: prop.year_built,
        stories: prop.stories,
        propertyType: prop.type,
        lotSize: prop.lot_size,
        bedrooms: prop.bedrooms,
        bathrooms: prop.bathrooms
      })));
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: 'Error',
        description: 'Failed to load properties',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesLeadScore = leadScoreFilter === 'all' || property.leadScore === leadScoreFilter;
    
    return matchesSearch && matchesStatus && matchesLeadScore;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'visited': 'bg-blue-500',
      'interested': 'bg-green-500',
      'not-interested': 'bg-gray-500',
      'completed': 'bg-purple-500',
      'revisit-later': 'bg-yellow-500',
      'needs-quote': 'bg-orange-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getLeadScoreColor = (score?: string) => {
    if (!score) return 'bg-gray-500';
    const colors: Record<string, string> = {
      'low': 'bg-gray-500',
      'medium': 'bg-yellow-500',
      'high': 'bg-green-500'
    };
    return colors[score] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading properties...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => navigate('/crm')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to CRM
          </Button>
          <h1 className="text-3xl font-bold">Properties</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by address or customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="visited">Visited</SelectItem>
              <SelectItem value="interested">Interested</SelectItem>
              <SelectItem value="not-interested">Not Interested</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="revisit-later">Revisit Later</SelectItem>
              <SelectItem value="needs-quote">Needs Quote</SelectItem>
            </SelectContent>
          </Select>
          <Select value={leadScoreFilter} onValueChange={setLeadScoreFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by lead score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Scores</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((property) => (
            <Card 
              key={property.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(`/crm/property/${property.id}`)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{property.address}</CardTitle>
                  <Badge className={getStatusColor(property.status)}>
                    {property.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {property.customerName && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{property.customerName}</span>
                  </div>
                )}
                {property.phoneNumber && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>{property.phoneNumber}</span>
                  </div>
                )}
                {property.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{property.email}</span>
                  </div>
                )}
                {property.followUpDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Follow-up: {new Date(property.followUpDate).toLocaleDateString()}</span>
                  </div>
                )}
                {property.leadScore && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <Badge className={getLeadScoreColor(property.leadScore)}>
                      {property.leadScore} priority
                    </Badge>
                  </div>
                )}
                {property.squareFootage && (
                  <div className="text-sm text-muted-foreground">
                    {property.squareFootage} sq ft
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No properties found matching your filters.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

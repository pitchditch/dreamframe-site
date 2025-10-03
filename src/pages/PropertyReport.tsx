import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Home, Clock, AlertCircle, CheckCircle, Bell } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PropertyReport = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  // Mock data for demo
  const property = {
    address: "123 Main Street, White Rock, BC",
    living_sqft: 2400,
    lot_sqft: 6500,
    year_built: 1995,
    stories: 2,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    elements: [
      {
        name: 'Roof',
        condition: 'good',
        lastService: '2024-03-15',
        nextRecommended: '2025-03-15'
      },
      {
        name: 'Siding',
        condition: 'needs-attention',
        lastService: '2023-01-10',
        nextRecommended: '2024-07-10'
      },
      {
        name: 'Windows',
        condition: 'good',
        lastService: '2024-08-20',
        nextRecommended: '2025-02-20'
      },
      {
        name: 'Gutters',
        condition: 'urgent',
        lastService: '2022-11-05',
        nextRecommended: '2023-11-05'
      },
      {
        name: 'Driveway',
        condition: 'good',
        lastService: '2024-05-12',
        nextRecommended: '2025-11-12'
      }
    ],
    services: [
      {
        date: '2024-08-20',
        type: 'Window Cleaning',
        technician: 'John Smith',
        notes: 'Complete interior and exterior window cleaning. All screens cleaned.',
        photos: []
      },
      {
        date: '2024-05-12',
        type: 'Pressure Washing - Driveway',
        technician: 'Mike Johnson',
        notes: 'Full driveway pressure wash with surface cleaner. Removed all stains.',
        photos: []
      }
    ]
  };

  const getConditionBadge = (condition: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive', icon: any }> = {
      'good': { variant: 'default', icon: CheckCircle },
      'needs-attention': { variant: 'secondary', icon: AlertCircle },
      'urgent': { variant: 'destructive', icon: AlertCircle },
      'unknown': { variant: 'secondary', icon: AlertCircle }
    };

    const config = variants[condition] || variants['unknown'];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {condition.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
      </Badge>
    );
  };

  const handleBookNow = () => {
    const encodedAddress = encodeURIComponent(property.address);
    window.open(`/calculator?address=${encodedAddress}&source=housetracker`, '_blank');
  };

  return (
    <Layout>
      <Helmet>
        <title>Home Health Report - {property.address} | BC Pressure Washing</title>
        <meta name="description" content={`View your home health report for ${property.address}. Track maintenance, service history, and schedule your next cleaning.`} />
      </Helmet>

      <div className="min-h-screen bg-muted/20 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mb-6">
            <Button variant="ghost" onClick={() => navigate('/house-tracking')} className="mb-4">
              ← Back to Search
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Home Health Report</h1>
            <p className="text-muted-foreground">
              We update this report after every visit. It helps time your maintenance and saves you money long-term.
            </p>
          </div>

          {/* Property Overview Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={property.image} 
                    alt={property.address}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="flex items-start gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h2 className="text-2xl font-semibold mb-1">{property.address}</h2>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Living Area</div>
                        <div className="font-semibold">{property.living_sqft.toLocaleString()} sq ft</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Lot Size</div>
                        <div className="font-semibold">{property.lot_sqft.toLocaleString()} sq ft</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Year Built</div>
                        <div className="font-semibold">{property.year_built}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Stories</div>
                        <div className="font-semibold">{property.stories}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleBookNow} size="lg" className="flex-1">
                      Book Now (Fast Quote)
                    </Button>
                    <Button variant="outline" size="lg">
                      <Bell className="h-4 w-4 mr-2" />
                      Set Reminder
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Elements Status */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Property Condition</CardTitle>
              <CardDescription>Current status of all elements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {property.elements.map((element) => (
                  <div key={element.name} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{element.name}</h3>
                        {getConditionBadge(element.condition)}
                      </div>
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Last: {new Date(element.lastService).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Next: {new Date(element.nextRecommended).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {element.condition === 'urgent' || element.condition === 'needs-attention' ? (
                      <Button size="sm" onClick={handleBookNow}>Book Now</Button>
                    ) : null}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service History Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Service History</CardTitle>
              <CardDescription>Complete timeline of all services performed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {property.services.map((service, index) => (
                  <div key={index} className="relative pl-8 pb-6 border-l-2 border-muted last:pb-0">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{service.type}</h4>
                        <span className="text-sm text-muted-foreground">
                          {new Date(service.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Technician: {service.technician}
                      </p>
                      <p className="text-sm">{service.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sticky Footer CTA */}
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg md:hidden">
            <div className="container mx-auto flex gap-2">
              <Button onClick={handleBookNow} className="flex-1">
                Book Now
              </Button>
              <Button variant="outline">
                Remind Me Later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyReport;

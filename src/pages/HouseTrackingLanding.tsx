import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Leaf, Star, MapPin, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { usePropertyData } from '@/hooks/usePropertyData';
import { useToast } from '@/hooks/use-toast';

const HouseTrackingLanding = () => {
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const { searchProperty, createProperty, loading } = usePropertyData();
  const { toast } = useToast();

  const handleCreateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    
    try {
      // First search if property exists
      let property = await searchProperty(address);
      
      // If not found, create it
      if (!property) {
        property = await createProperty(address);
      }
      
      if (property) {
        navigate(`/house-tracking/${property.id}`);
      } else {
        toast({
          title: 'Error',
          description: 'Could not create property report',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Track Your Home's Health - Free | BC Pressure Washing</title>
        <meta name="description" content="See your property size, condition, last clean, and next recommended service. Re-book in 1 tap. Free home health tracking for BC homeowners." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Track Your Home's Health—Free
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">
              See size, condition, last clean, and next recommended service. Re-book in 1 tap.
            </p>

            {/* Address Search */}
            <form onSubmit={handleCreateReport} className="max-w-2xl mx-auto mb-16">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your property address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="pl-10 h-14 text-lg"
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 text-lg" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create My Report'
                  )}
                </Button>
              </div>
            </form>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Locally Owned</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <span>Eco-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span>5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Auto-Detected Details</h3>
              <p className="text-muted-foreground">
                We automatically pull your property size, year built, and condition from public records—no manual entry needed.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Service History</h3>
              <p className="text-muted-foreground">
                Track every service with photos, notes, and dates. See exactly when you last cleaned your roof, windows, or gutters.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
              <p className="text-muted-foreground">
                Get notified when it's time for maintenance. Book your next service in seconds—no need to remember dates.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-primary/5 p-8 rounded-2xl text-center border border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Ready to track your home?</h2>
            <p className="text-muted-foreground mb-6">
              Enter your address above to create your free Home Health Report in seconds.
            </p>
            <Button size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HouseTrackingLanding;

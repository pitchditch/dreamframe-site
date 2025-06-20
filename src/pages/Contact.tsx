
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auto-fill form with booking data if available
  useEffect(() => {
    const bookingData = localStorage.getItem('bookingData');
    if (bookingData) {
      try {
        const data = JSON.parse(bookingData);
        const prefilledMessage = `Hi! I'm interested in ${data.service} for my property at ${data.address}. ${data.squareFootage ? `Property size: ${data.squareFootage.toLocaleString()} sq ft. ` : ''}${data.quote ? `Quote received: $${data.quote}. ` : ''}Please contact me to schedule this service.`;
        
        setFormData(prev => ({
          ...prev,
          service: data.service || '',
          message: prefilledMessage
        }));
        
        localStorage.removeItem('bookingData');
      } catch (error) {
        console.error('Error parsing booking data:', error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      // Send to Supabase edge function
      const response = await fetch(
        "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/forward-contact-form",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5eXVkc2pxd3NwYXBtdWp2em1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4Nzc4MDQsImV4cCI6MjA2NTQ1MzgwNH0.Fwq059rw1BlfRk_Qr-NdbTmo140o-YLzN6Qt0HupSlA'}`
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            subject: `New Contact Form Submission from ${formData.name}`,
            form: "ContactForm",
            save_to_tracking: true
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const result = await response.json();
      
      setSubmitStatus('success');
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours. A confirmation email has been sent to you.",
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2000);

    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again or call us directly at (778) 808-7620",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact Us - Free Quotes | BC Pressure Washing</title>
        <meta name="description" content="Get your free quote today! Contact BC Pressure Washing for professional cleaning services in White Rock, Surrey, and Metro Vancouver. Call (778) 808-7620." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 pt-28 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Your Free Quote
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to transform your property? Contact us today for a free, no-obligation quote.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Send us a message
                </CardTitle>
                {submitStatus === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent! Redirecting to homepage...</span>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="w-5 h-5" />
                    <span>Failed to send message. Please try again or call us directly.</span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a service</option>
                      <option value="Window Cleaning">Window Cleaning</option>
                      <option value="House Washing">House Washing</option>
                      <option value="Pressure Washing">Pressure Washing</option>
                      <option value="Gutter Cleaning">Gutter Cleaning</option>
                      <option value="Deck Cleaning">Deck Cleaning</option>
                      <option value="Roof Cleaning">Roof Cleaning</option>
                      <option value="Multiple Services">Multiple Services</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project, property size, and any specific requirements..."
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : submitStatus === 'success' ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Sent Successfully!
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-semibold">(778) 808-7620</p>
                        <p className="text-sm text-gray-600">Call or text anytime</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-semibold">info@bcpressurewashing.ca</p>
                        <p className="text-sm text-gray-600">We reply within 24 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-semibold">White Rock & Surrey, BC</p>
                        <p className="text-sm text-gray-600">Serving Metro Vancouver</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-semibold">Mon-Sat: 7AM-7PM</p>
                        <p className="text-sm text-gray-600">Emergency service available</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-semibold">Free Estimates</p>
                        <p className="text-sm text-gray-600">No hidden fees or surprises</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-semibold">Fully Insured</p>
                        <p className="text-sm text-gray-600">Licensed and bonded professionals</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-semibold">Satisfaction Guaranteed</p>
                        <p className="text-sm text-gray-600">100% satisfaction or we'll make it right</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-semibold">Same-Day Service</p>
                        <p className="text-sm text-gray-600">Often available for urgent needs</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Service Areas</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p>• White Rock</p>
                    <p>• Surrey</p>
                    <p>• Langley</p>
                    <p>• Delta</p>
                    <p>• Richmond</p>
                    <p>• Burnaby</p>
                    <p>• Vancouver</p>
                    <p>• New Westminster</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    Don't see your city? Contact us - we may still be able to help!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

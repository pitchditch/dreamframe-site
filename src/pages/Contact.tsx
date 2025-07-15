import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import emailjs from 'emailjs-com';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    try {
      await emailjs.send(
        'service_bc_pressure',
        'template_contact',
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY'
      );

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        variant: "destructive",
        title: "Error sending message",
        description: "Please try again or call us directly.",
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
        <title>Contact BC Pressure Washing | Free Quote in Metro Vancouver</title>
        <meta
          name="description"
          content="Get in touch for a free quote on professional pressure washing, window cleaning, and property maintenance in Surrey, White Rock, and Metro Vancouver."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="BC Pressure Washing" />
        <meta property="og:title" content="Contact BC Pressure Washing | Free Quote" />
        <meta property="og:description" content="Contact us for pressure washing and exterior cleaning quotes in Metro Vancouver." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bcpressurewashing.ca/contact" />
        <meta property="og:image" content="https://bcpressurewashing.ca/og-banner.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact BC Pressure Washing | Get Your Free Quote" />
        <meta name="twitter:description" content="Free pressure washing and cleaning quotes in Surrey, White Rock, and Vancouver." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 pt-[100px] pb-12">
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
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Tell us about your project, property size, and any specific requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info, Why Choose Us, and Service Areas */}
            <div className="space-y-8">
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
                        <p className="font-semibold">Mon–Sat: 7AM–7PM</p>
                        <p className="text-sm text-gray-600">Emergency service available</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                  <div className="space-y-3">
                    {[
                      ['Free Estimates', 'No hidden fees or surprises'],
                      ['Fully Insured', 'Licensed and bonded professionals'],
                      ['Satisfaction Guaranteed', "100% satisfaction or we'll make it right"],
                      ['Same-Day Service', 'Often available for urgent needs'],
                    ].map(([title, desc], idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                        <div>
                          <p className="font-semibold">{title}</p>
                          <p className="text-sm text-gray-600">{desc}</p>
                        </div>
                      </div>
                    ))}
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
                    Don't see your city? Contact us – we may still be able to help!
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

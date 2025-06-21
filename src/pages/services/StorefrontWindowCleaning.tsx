import Layout from '../../components/Layout';
import ServiceHeader from '@/components/ServiceHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Building, CheckCircle, Star, Phone, Clock, Users, Calendar, Mail } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const StorefrontWindowCleaning = () => {
  const { toast } = useToast();
  const [consultForm, setConsultForm] = useState({
    businessName: '',
    contactName: '',
    phone: '',
    email: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send form data to edge function
      const response = await fetch(
        "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/forward-contact-form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...consultForm,
            subject: "Storefront Window Cleaning Consultation Request",
            form: "StorefrontConsultation",
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Consultation Request Sent!",
          description: "We'll contact you within 2 hours to schedule your free consultation.",
        });
        
        // Reset form
        setConsultForm({
          businessName: '',
          contactName: '',
          phone: '',
          email: '',
          preferredTime: '',
          message: ''
        });

        // Redirect to homepage after 2 seconds
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send consultation request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      title: "Increase Walk-Ins by Up to 40%",
      description: "Clean, sparkling windows create an inviting storefront that draws customers inside",
      icon: <Users className="w-6 h-6 text-bc-red" />
    },
    {
      title: "Professional First Impressions",
      description: "Your storefront is your first marketing tool - make it count with crystal-clear windows",
      icon: <Building className="w-6 h-6 text-bc-red" />
    },
    {
      title: "Zero Business Disruption",
      description: "We work around your hours - early morning, after hours, or weekends available",
      icon: <Clock className="w-6 h-6 text-bc-red" />
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen, White Rock Coffee Co.",
      text: "Our foot traffic increased noticeably after BC Pressure Washing started maintaining our windows. Professional, reliable, and worth every penny.",
      rating: 5,
      business: "Coffee Shop"
    },
    {
      name: "Mike Torres, Pacific Art Gallery",
      text: "They work around our gallery hours and always leave our windows spotless. Our art looks even better behind clean glass!",
      rating: 5,
      business: "Art Gallery"
    },
    {
      name: "Lisa Park, Marine Drive Boutique",
      text: "Fast, efficient, and our storefront has never looked better. Customers comment on how bright and welcoming our shop looks.",
      rating: 5,
      business: "Retail Store"
    }
  ];

  const trustedBy = [
    "White Rock Coffee Co.",
    "Pacific Art Gallery",
    "Marine Drive Boutique",
    "Seaside Pharmacy",
    "Ocean View Deli"
  ];

  return (
    <Layout 
      title="Professional Storefront Window Cleaning | White Rock Business Services" 
      description="Increase foot traffic with professional storefront window cleaning in White Rock. Eco-friendly, insured, flexible scheduling. Free consultation for retailers."
    >
      {/* Hero Section */}
      <ServiceHeader 
        title="Professional Storefront Window Cleaning for White Rock Retailers" 
        description="Sparkling, streak-free windows that invite customers inside—fast, reliable, insured service that works around your business hours." 
        imagePath="/lovable-uploads/598eb62a-290d-41ec-8c69-abae60a5a757.png" 
        icon={<Building size={36} />} 
        showButton={false}
        darkOverlay={true}
      />

      {/* Value Proposition Cards */}
      <section className="py-16 bg-white -mt-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="ml-2 text-xl font-bold">4.9/5</span>
            </div>
            <p className="text-gray-600">Based on 47+ commercial service reviews</p>
          </div>

          {/* Trusted By */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-6">Trusted by White Rock Businesses</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {trustedBy.map((business, index) => (
                <span 
                  key={index}
                  className="bg-white px-4 py-2 rounded-full shadow-sm text-gray-700 font-medium"
                >
                  {business}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-gray-700 mb-4 italic">
                    "{testimonial.text}"
                  </blockquote>
                  <footer>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.business}</div>
                  </footer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Free Consultation Section */}
      <section className="py-16 bg-white" id="consult">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Free 15-Minute Storefront Consultation</h2>
              <p className="text-xl text-gray-600">
                Not sure exactly what you need? Book a short call and we'll walk you through your options—no obligation.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Consultation Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-bc-red" />
                    Schedule Your Free Consultation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleConsultSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Name *</label>
                      <Input
                        type="text"
                        value={consultForm.businessName}
                        onChange={(e) => setConsultForm({...consultForm, businessName: e.target.value})}
                        placeholder="Your Business Name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Contact Name *</label>
                      <Input
                        type="text"
                        value={consultForm.contactName}
                        onChange={(e) => setConsultForm({...consultForm, contactName: e.target.value})}
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <Input
                          type="tel"
                          value={consultForm.phone}
                          onChange={(e) => setConsultForm({...consultForm, phone: e.target.value})}
                          placeholder="(778) 555-0123"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          value={consultForm.email}
                          onChange={(e) => setConsultForm({...consultForm, email: e.target.value})}
                          placeholder="you@business.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Preferred Call Time</label>
                      <select 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red"
                        value={consultForm.preferredTime}
                        onChange={(e) => setConsultForm({...consultForm, preferredTime: e.target.value})}
                      >
                        <option value="">Select preferred time</option>
                        <option value="morning">Morning (8AM-11AM)</option>
                        <option value="afternoon">Afternoon (12PM-4PM)</option>
                        <option value="evening">Evening (5PM-7PM)</option>
                        <option value="flexible">I'm flexible</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Brief Message (Optional)</label>
                      <Textarea
                        value={consultForm.message}
                        onChange={(e) => setConsultForm({...consultForm, message: e.target.value})}
                        placeholder="Tell us about your storefront, number of windows, any specific concerns..."
                        rows={3}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-bc-red hover:bg-red-700 text-white py-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Book Free Consultation'}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Quick Contact Options */}
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Prefer to Talk Now?</h3>
                    <div className="space-y-4">
                      <a 
                        href="tel:7788087620"
                        className="flex items-center p-4 bg-bc-red text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Phone className="w-5 h-5 mr-3" />
                        <div>
                          <div className="font-semibold">Call Now: (778) 808-7620</div>
                          <div className="text-sm opacity-90">We answer 7AM-7PM, Mon-Sat</div>
                        </div>
                      </a>
                      
                      <a 
                        href="mailto:bcpressurewashing.ca@gmail.com?subject=Storefront Window Cleaning Consultation"
                        className="flex items-center p-4 border-2 border-bc-red text-bc-red rounded-lg hover:bg-bc-red hover:text-white transition-colors"
                      >
                        <Mail className="w-5 h-5 mr-3" />
                        <div>
                          <div className="font-semibold">Email Us</div>
                          <div className="text-sm">Quick response within 2 hours</div>
                        </div>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>15-minute phone consultation about your needs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Free on-site estimate within 24 hours</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Flexible scheduling around your business hours</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>Same-day service often available</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <p className="text-gray-600 mb-4">Want an instant estimate?</p>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/calculator">Get Quick Quote</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">See the Difference</h2>
            <p className="text-gray-600">Real White Rock storefronts we've transformed</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <img 
                  src="/lovable-uploads/6fed146a-76ba-45a2-b2e9-e14badedae9e.png" 
                  alt="Before and after storefront window cleaning"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Retail Storefront</h3>
                  <p className="text-sm text-gray-600">Marine Drive, White Rock</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <img 
                  src="/lovable-uploads/3794e9ea-1675-4129-baec-0aa974323e86.png" 
                  alt="Commercial window cleaning results"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Coffee Shop</h3>
                  <p className="text-sm text-gray-600">Johnston Road, White Rock</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardContent className="p-0">
                <img 
                  src="/lovable-uploads/4a9921b9-2dd2-42b8-ade9-61bbeeb18898.png" 
                  alt="Restaurant window cleaning"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Restaurant</h3>
                  <p className="text-sm text-gray-600">West Beach, White Rock</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <a 
          href="tel:7788087620"
          className="bg-bc-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        >
          <Phone className="w-6 h-6" />
        </a>
      </div>
    </Layout>
  );
};

export default StorefrontWindowCleaning;

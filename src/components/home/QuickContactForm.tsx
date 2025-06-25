
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { services } from './ServiceSelectionSection/serviceData';
import { Download, Phone, Mail, MapPin, MessageCircle, Star, Shield, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RateLimiter, sanitizeFormData, createHoneypot, detectBot, sanitizeLogData } from '@/utils/security';

const QuickContactForm = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: '',
    message: ''
  });

  useEffect(() => {
    const handleServiceSelected = (event: CustomEvent) => {
      const serviceId = event.detail.serviceId;
      const service = services.find(s => s.id === serviceId);
      if (service) {
        setSelectedService(service.title);
        setFormData(prev => ({ ...prev, service: service.title }));
      }
    };

    window.addEventListener('serviceSelected', handleServiceSelected as EventListener);
    
    const preSelected = sessionStorage.getItem('selectedService');
    if (preSelected) {
      const service = services.find(s => s.id === preSelected);
      if (service) {
        setSelectedService(service.title);
        setFormData(prev => ({ ...prev, service: service.title }));
      }
      sessionStorage.removeItem('selectedService');
    }

    return () => {
      window.removeEventListener('serviceSelected', handleServiceSelected as EventListener);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      // Rate limiting check
      const identifier = formData.email || 'anonymous';
      if (!RateLimiter.canSubmit(identifier)) {
        const remainingTime = RateLimiter.getRemainingTime(identifier);
        const minutes = Math.ceil(remainingTime / (1000 * 60));
        toast({
          title: t("Too Many Requests"),
          description: t(`Please wait ${minutes} minutes before submitting again.`),
          variant: "destructive",
        });
        return;
      }

      // Bot detection
      const formElement = e.target as HTMLFormElement;
      const formDataObj = new FormData(formElement);
      if (detectBot(formDataObj)) {
        console.warn('Bot submission detected and blocked');
        return;
      }

      // Sanitize form data
      const sanitizedData = sanitizeFormData(formData);

      setIsSubmitting(true);

      // Call Supabase Edge Function for forwarding
      const response = await fetch(
        "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/forward-contact-form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...sanitizedData,
            subject: "Website Quote Request",
            form: "QuickContactForm",
          }),
        }
      );

      if (response.ok) {
        // Send confirmations (email + SMS)
        const confirmationResponse = await fetch(
          "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/send-confirmations",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: sanitizedData.email,
              phone: sanitizedData.phone,
              name: sanitizedData.name,
              service: sanitizedData.service,
              formType: "quote request",
              message: sanitizedData.message,
            }),
          }
        );

        if (confirmationResponse.ok) {
          toast({
            title: t("Quote Request Sent!"),
            description: t("We'll contact you within 24 hours with your free quote. Check your email and phone for confirmation."),
          });
        } else {
          toast({
            title: t("Quote Request Sent!"),
            description: t("We'll contact you within 24 hours with your free quote."),
          });
        }
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          service: "",
          message: "",
        });
        setSelectedService("");
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error (sanitized):", error instanceof Error ? error.message : "Unknown error");
      toast({
        title: t("Error"),
        description: t("Failed to send quote request. Please try again."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadContactCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:BC Pressure Washing
ORG:BC Pressure Washing
TEL:+1-778-808-7620
EMAIL:info@bcpressurewashing.ca
URL:https://bcpressurewashing.ca
ADR:;;White Rock;BC;;Canada
NOTE:Professional pressure washing and window cleaning services in Surrey, White Rock & Greater Vancouver
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BC-Pressure-Washing-Contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section className="py-20 bg-gray-50" data-contact-form>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">{t("Get Your Free Quote Today")}</h2>
            <p className="text-xl text-gray-600 mb-6">
              {t("Professional exterior cleaning in Surrey & White Rock")}
            </p>
            <p className="text-lg text-gray-500">
              {t("We'll text or call you back within 1 business day")}
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12 text-sm font-medium text-gray-700">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <Shield className="w-4 h-4 mr-2 text-green-600" />
              Fully Insured
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              5-Star Google Rated
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              Same-Day Availability
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Quote Form */}
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {createHoneypot()}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Your Name"
                        className="pl-4 h-12 border-gray-300 focus:border-bc-red"
                        maxLength={100}
                      />
                    </div>
                    <div className="relative">
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Email Address"
                        className="pl-4 h-12 border-gray-300 focus:border-bc-red"
                        maxLength={100}
                      />
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <Input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="Phone Number"
                        className="pl-4 h-12 border-gray-300 focus:border-bc-red"
                        maxLength={20}
                      />
                      <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    <div>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({...formData, service: value})}
                        required
                      >
                        <SelectTrigger className="h-12 border-gray-300 focus:border-bc-red">
                          <SelectValue placeholder="Select Service Needed" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.title}>
                              {t(service.title)}
                            </SelectItem>
                          ))}
                          <SelectItem value="Multiple Services">{t("Multiple Services")}</SelectItem>
                          <SelectItem value="Other">{t("Other")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="relative">
                    <Input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Property Address (for accurate pricing)"
                      className="pl-4 h-12 border-gray-300 focus:border-bc-red"
                      maxLength={200}
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>

                  <div>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Tell us more about your project..."
                      className="h-24 border-gray-300 focus:border-bc-red resize-none"
                      maxLength={500}
                    />
                  </div>

                  <div className="text-xs text-gray-500">
                    By submitting this form, you consent to being contacted by BC Pressure Washing. 
                    View our <a href="/privacy" className="text-bc-red hover:underline">Privacy Policy</a>.
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-bc-red hover:bg-red-700 text-white h-14 text-lg font-semibold rounded-lg shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <span className="flex items-center justify-center">
                        🧼 Get My Free Quote
                      </span>
                    )}
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600 mt-2">
                    Response within 1 business day
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Contact Options & Trust Elements */}
            <div className="space-y-8">
              {/* Primary Contact Methods */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Or reach out directly:</h3>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-bc-red hover:bg-red-700 text-white flex-1 h-14 text-lg font-semibold"
                    asChild
                  >
                    <a href="tel:7788087620">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Us Now
                    </a>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-bc-red text-bc-red hover:bg-bc-red hover:text-white flex-1 h-14 text-lg font-semibold"
                    asChild
                  >
                    <a href="#chat">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Chat With Us
                    </a>
                  </Button>
                </div>
              </div>

              {/* Download Contact Card - Less Prominent */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Save Our Contact Info</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Download our contact card to your phone for quick access
                  </p>
                  <Button 
                    onClick={downloadContactCard}
                    variant="outline" 
                    className="text-gray-700 border-gray-300 hover:bg-gray-50"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Contact Info
                  </Button>
                </div>
              </div>

              {/* Trust Stats */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Trusted by 500+ Homeowners in BC
                  </p>
                  <div className="flex justify-center items-center text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on Google Reviews & Customer Testimonials
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContactForm;

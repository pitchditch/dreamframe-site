
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { trackFormSubmission } from '@/utils/analytics';
import { useTranslation } from '@/hooks/use-translation';

const QuickContactForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Listen for service selection
  useEffect(() => {
    const handleServiceSelection = (event: CustomEvent) => {
      const serviceId = event.detail.serviceId;
      const serviceNames: Record<string, string> = {
        'house-washing': 'House Washing',
        'window-cleaning': 'Window Cleaning',
        'driveway-cleaning': 'Driveway Cleaning',
        'roof-cleaning': 'Roof Cleaning',
        'gutter-cleaning': 'Gutter Cleaning',
        'commercial': 'Commercial Services',
        'custom': 'Custom Service'
      };
      
      const serviceName = serviceNames[serviceId] || serviceId;
      setFormData(prev => ({
        ...prev,
        service: serviceName,
        message: `I'm interested in ${serviceName}. Please provide me with a free quote.`
      }));
    };

    // Check for stored service selection
    const storedService = sessionStorage.getItem('selectedService');
    if (storedService) {
      handleServiceSelection({ detail: { serviceId: storedService } } as CustomEvent);
      sessionStorage.removeItem('selectedService');
    }

    window.addEventListener('serviceSelected', handleServiceSelection as EventListener);
    return () => {
      window.removeEventListener('serviceSelected', handleServiceSelection as EventListener);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Track submission
    trackFormSubmission('homepage_quick_contact', formData);
    
    // Prepare email data
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      message: formData.message,
      service: formData.service,
      subject: `Quick Contact Form - ${formData.service || 'General Inquiry'}`,
      form_type: 'Homepage Quick Contact'
    };

    try {
      await emailjs.send(
        'service_xrk4vas',
        'template_cpivz2k',
        templateParams,
        'MMzAmk5eWrjFgC_nP'
      );
      
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: '', email: '', phone: '', message: '', service: '' });
    } catch (error) {
      console.error("Failed to send email:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white" data-contact-form>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {t("Get Your Free Quote Today")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("Ready to transform your property? Contact us now for a personalized quote and expert advice.")}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {t("Contact Information")}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="text-bc-red" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">(778) 808-7620</p>
                      <p className="text-sm text-gray-600">{t("Call us anytime")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-bc-red" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">bcpressurewashing.ca@gmail.com</p>
                      <p className="text-sm text-gray-600">{t("Email us your questions")}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-bc-red to-red-600 p-6 rounded-xl text-white">
                <h4 className="font-bold text-lg mb-2">{t("Special Offer!")}</h4>
                <p className="text-red-100">
                  {t("Mention you've seen our red car around White Rock for 10% off your first service!")}
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-4">
                {formData.service && (
                  <div className="bg-bc-red/10 border border-bc-red/20 rounded-lg p-3 mb-4">
                    <p className="text-sm text-bc-red font-medium">
                      {t("Selected Service")}: {formData.service}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("Your Name")} *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={t("Enter your name")}
                      required
                      className="border-gray-300 focus:border-bc-red focus:ring-bc-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("Phone Number")}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder={t("Your phone number")}
                      className="border-gray-300 focus:border-bc-red focus:ring-bc-red"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("Email Address")} *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={t("your.email@example.com")}
                    required
                    className="border-gray-300 focus:border-bc-red focus:ring-bc-red"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("Message")} *
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={t("Tell us about your project or ask any questions...")}
                    rows={4}
                    required
                    className="border-gray-300 focus:border-bc-red focus:ring-bc-red resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-bc-red hover:bg-red-700 text-white font-bold py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>{t("Sending...")}</span>
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      {t("Send Message")}
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  {t("We'll respond within 24 hours!")}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickContactForm;

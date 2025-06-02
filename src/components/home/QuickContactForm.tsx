
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { services } from './ServiceSelectionSection/serviceData';
import { Download, Phone, Mail, MapPin } from 'lucide-react';

const QuickContactForm = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState('');
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
    
    // Check for pre-selected service
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
    
    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData);
      
      toast({
        title: t("Quote Request Sent!"),
        description: t("We'll contact you within 24 hours with your free quote."),
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        service: '',
        message: ''
      });
      setSelectedService('');
    } catch (error) {
      toast({
        title: t("Error"),
        description: t("Failed to send quote request. Please try again."),
        variant: "destructive",
      });
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
    <section className="py-20 bg-gradient-to-br from-bc-red to-red-700 text-white" data-contact-form>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{t("Get Your Free Quote Today")}</h2>
            <p className="text-xl text-red-100">
              {t("Fill out the form below and we'll get back to you within 24 hours")}
            </p>
          </div>

          {/* Download Contact Card Section */}
          <div className="mb-12 bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <Download className="h-12 w-12 mx-auto mb-4 text-white/90" />
                <h3 className="text-2xl font-bold mb-3">Save Our Contact Info</h3>
                <p className="text-lg mb-6 text-white/90">
                  Download our contact card to your phone for quick access to our services
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center justify-center bg-white/10 rounded-lg p-3">
                  <Phone className="h-5 w-5 mr-2" />
                  <span className="font-semibold">778-808-7620</span>
                </div>
                <div className="flex items-center justify-center bg-white/10 rounded-lg p-3">
                  <Mail className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Quick Response</span>
                </div>
                <div className="flex items-center justify-center bg-white/10 rounded-lg p-3">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Surrey & White Rock</span>
                </div>
              </div>
              
              <Button 
                onClick={downloadContactCard}
                variant="outline" 
                className="bg-white text-bc-red hover:bg-gray-100 border-white font-bold shadow-lg"
                size="lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Contact Card
              </Button>
              
              <p className="text-sm mt-4 text-white/75">
                Compatible with iPhone, Android, and all modern devices
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-2xl text-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t("Name")} *</label>
                <Input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t("Email")} *</label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t("Phone")} *</label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t("Service Needed")} *</label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({...formData, service: value})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("Select a service")} />
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

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">{t("Property Address")}</label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder={t("Enter your address for accurate pricing")}
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">{t("Additional Details")}</label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder={t("Tell us more about your project...")}
                className="w-full h-32"
              />
            </div>

            <Button type="submit" className="w-full bg-bc-red hover:bg-red-700 text-white py-3 text-lg font-semibold">
              {t("Get My Free Quote")}
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              {t("We'll respond within 24 hours with your personalized quote")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuickContactForm;

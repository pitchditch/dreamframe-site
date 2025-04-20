
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Check, Home, Building2, Warehouse } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  formData: any;
  updateFormData: (data: any) => void;
  onComplete?: () => void;
}

const PriceCalculatorForm: React.FC<{onComplete?: () => void}> = ({ onComplete }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    propertyType: '',
    propertySize: '',
    services: [] as string[],
    name: '',
    phone: '',
    email: '',
    address: '',
    postalCode: sessionStorage.getItem('userZipCode') || '',
    date: '',
  });
  
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: any) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Quote request submitted!",
        description: "We'll contact you shortly with your personalized quote.",
      });
      
      if (onComplete) {
        onComplete();
      }
    }, 1500);
  };

  return (
    <div className="price-calculator-form">
      {step === 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Select your property type</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { type: 'residential', icon: Home, label: 'Residential' },
              { type: 'commercial', icon: Building2, label: 'Commercial' },
              { type: 'strata', icon: Warehouse, label: 'Strata' }
            ].map((option) => {
              const Icon = option.icon;
              return (
                <Card 
                  key={option.type}
                  className={`p-4 cursor-pointer transition-all hover:border-blue-500 ${formData.propertyType === option.type ? 'border-2 border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => updateFormData({ propertyType: option.type })}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-3 rounded-full ${formData.propertyType === option.type ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Icon className={`h-6 w-6 ${formData.propertyType === option.type ? 'text-blue-500' : 'text-gray-500'}`} />
                    </div>
                    <span className="mt-2 font-medium">{option.label}</span>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleNext} 
              disabled={!formData.propertyType}
              className="flex items-center"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Select property size</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { size: 'small', label: 'Small', description: 'Up to 1,500 sq ft' },
              { size: 'medium', label: 'Medium', description: '1,500 - 2,500 sq ft' },
              { size: 'large', label: 'Large', description: '2,500+ sq ft' }
            ].map((option) => (
              <Card 
                key={option.size}
                className={`p-4 cursor-pointer transition-all hover:border-blue-500 ${formData.propertySize === option.size ? 'border-2 border-blue-500 bg-blue-50' : ''}`}
                onClick={() => updateFormData({ propertySize: option.size })}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-sm text-gray-500">{option.description}</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!formData.propertySize}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Select services needed</h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'windows', title: 'Window Cleaning', price: formData.propertySize === 'small' ? '$199' : formData.propertySize === 'medium' ? '$249' : '$299' },
              { id: 'gutters', title: 'Gutter Cleaning', price: formData.propertySize === 'small' ? '$199' : formData.propertySize === 'medium' ? '$249' : '$299' },
              { id: 'pressure', title: 'Pressure Washing', price: formData.propertySize === 'small' ? '$250' : formData.propertySize === 'medium' ? '$350' : '$450' },
              { id: 'roof', title: 'Roof Cleaning', price: formData.propertySize === 'small' ? '$350' : formData.propertySize === 'medium' ? '$450' : '$550' }
            ].map((service) => (
              <Card 
                key={service.id}
                className={`p-4 cursor-pointer transition-all hover:border-blue-500 ${formData.services.includes(service.id) ? 'border-2 border-blue-500 bg-blue-50' : ''}`}
                onClick={() => {
                  const updatedServices = formData.services.includes(service.id)
                    ? formData.services.filter((id: string) => id !== service.id)
                    : [...formData.services, service.id];
                  updateFormData({ services: updatedServices });
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.services.includes(service.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                      {formData.services.includes(service.id) && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className="ml-3 font-medium">{service.title}</span>
                  </div>
                  <span className="font-bold text-blue-600">{service.price}</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={formData.services.length === 0}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Phone number"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Postal Code</label>
                <input 
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData({ postalCode: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Postal code"
                  required
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.phone || !formData.email || !formData.postalCode}
              >
                {isSubmitting ? 'Submitting...' : 'Get Your Quote'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PriceCalculatorForm;

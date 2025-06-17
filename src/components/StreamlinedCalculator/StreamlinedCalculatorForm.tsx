
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, MapPin, Home, Wrench, Droplets, Wind, Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  address: string;
  propertySize: string;
  serviceType: string;
}

const StreamlinedCalculatorForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    address: '',
    propertySize: '',
    serviceType: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalSteps = 3;

  const propertyOptions = [
    { value: 'small', label: 'Small (1-2 story, under 2,000 sq ft)', price: 'Starting at $150' },
    { value: 'medium', label: 'Medium (2-3 story, 2,000-3,500 sq ft)', price: 'Starting at $250' },
    { value: 'large', label: 'Large (3+ story, 3,500-5,000 sq ft)', price: 'Starting at $350' },
    { value: 'xlarge', label: 'X-Large (5,000+ sq ft or complex)', price: 'Starting at $450' }
  ];

  const serviceOptions = [
    { value: 'window', label: 'Window Cleaning', icon: Droplets, description: 'Interior & exterior cleaning' },
    { value: 'gutter', label: 'Gutter Cleaning', icon: Home, description: 'Complete cleaning & inspection' },
    { value: 'pressure', label: 'Pressure Washing', icon: Wind, description: 'Driveways, siding, decks' },
    { value: 'roof', label: 'Roof Cleaning', icon: Home, description: 'Moss removal & soft washing' },
    { value: 'soft', label: 'Soft Washing', icon: Droplets, description: 'Gentle cleaning for delicate surfaces' },
    { value: 'house', label: 'House Washing', icon: Home, description: 'Complete exterior house cleaning' }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1 && !formData.address.trim()) {
      newErrors.address = 'Please enter a valid service address';
    }
    if (step === 2 && !formData.propertySize) {
      newErrors.propertySize = 'Please select your property size';
    }
    if (step === 3 && !formData.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/forward-contact-form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            subject: "Streamlined Quote Request",
            form: "StreamlinedCalculator",
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Quote Request Sent!",
          description: "We'll contact you within 24 hours with your free quote.",
        });
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast({
        title: "Quote Request Received!",
        description: "Thank you for your interest! We'll contact you within 24 hours with your free quote.",
      });
    } finally {
      setIsSubmitting(false);
      // Reset form
      setFormData({ address: '', propertySize: '', serviceType: '' });
      setCurrentStep(1);
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <MapPin className="w-6 h-6" />;
      case 2: return <Home className="w-6 h-6" />;
      case 3: return <Wrench className="w-6 h-6" />;
      default: return null;
    }
  };

  const getButtonText = () => {
    if (currentStep === 1) return "Next: Select Property Size";
    if (currentStep === 2) return "Next: Choose Service";
    return isSubmitting ? "Sending..." : "Get My Free Quote";
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Service Address";
      case 2: return "Property Size";
      case 3: return "Service Type";
      default: return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Where would you like us to provide service?";
      case 2: return "What size is your property? (approximate)";
      case 3: return "What service do you need?";
      default: return "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Red Car Discount Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl mb-8 shadow-xl border-4 border-red-400">
        <div className="flex items-center justify-center text-center">
          <div className="bg-white text-red-600 rounded-full p-3 mr-4 flex-shrink-0">
            <Car className="w-8 h-8" />
          </div>
          <div>
            <div className="font-bold text-2xl mb-1">10% OFF!</div>
            <div className="text-lg opacity-90">Spotted our red car on Marine Drive?</div>
            <div className="text-sm opacity-80 mt-1">Mention this when we call for your discount!</div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step <= currentStep 
                  ? 'bg-bc-red text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-2 mx-4 rounded-full transition-all ${
                  step < currentStep ? 'bg-bc-red' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-800">Step {currentStep} of {totalSteps}</div>
          <div className="text-sm text-gray-600">Quick quote in just 3 simple steps</div>
        </div>
      </div>

      <Card className="shadow-2xl border-0 bg-white">
        <CardContent className="p-10">
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full">
                {getStepIcon(currentStep)}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{getStepTitle()}</h2>
            <p className="text-lg text-gray-600">{getStepDescription()}</p>
          </div>

          {/* Step 1: Address */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Service Address *
                </label>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="e.g. 123 Main St, White Rock, BC"
                  className="h-16 text-lg border-2 border-gray-300 focus:border-bc-red rounded-lg"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-2">{errors.address}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Property Size */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                {propertyOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`block p-6 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                      formData.propertySize === option.value
                        ? 'border-bc-red bg-red-50 ring-4 ring-bc-red ring-opacity-20'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="propertySize"
                      value={option.value}
                      checked={formData.propertySize === option.value}
                      onChange={(e) => setFormData({...formData, propertySize: e.target.value})}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-lg text-gray-900">{option.label}</div>
                        <div className="text-bc-red font-medium text-lg">{option.price}</div>
                      </div>
                      {formData.propertySize === option.value && (
                        <CheckCircle className="w-6 h-6 text-bc-red" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
              {errors.propertySize && (
                <p className="text-red-500 text-sm">{errors.propertySize}</p>
              )}
            </div>
          )}

          {/* Step 3: Service Type */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <label
                      key={option.value}
                      className={`block p-6 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                        formData.serviceType === option.value
                          ? 'border-bc-red bg-red-50 ring-4 ring-bc-red ring-opacity-20'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceType"
                        value={option.value}
                        checked={formData.serviceType === option.value}
                        onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                        className="sr-only"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IconComponent className="w-8 h-8 text-bc-red mr-4" />
                          <div>
                            <div className="font-semibold text-lg text-gray-900">{option.label}</div>
                            <div className="text-sm text-gray-500">{option.description}</div>
                          </div>
                        </div>
                        {formData.serviceType === option.value && (
                          <CheckCircle className="w-6 h-6 text-bc-red" />
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors.serviceType && (
                <p className="text-red-500 text-sm">{errors.serviceType}</p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 space-y-4">
            <Button
              onClick={handleNext}
              disabled={isSubmitting}
              className="w-full bg-bc-red hover:bg-red-700 text-white h-16 text-xl font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              {getButtonText()}
            </Button>
            
            {currentStep > 1 && (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="w-full h-12 text-gray-700 border-2 border-gray-300 hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Back
              </Button>
            )}
          </div>

          {/* Support Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-lg">
              No obligations – see your price instantly
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Free estimates • Same-day availability • 100% satisfaction guaranteed
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreamlinedCalculatorForm;

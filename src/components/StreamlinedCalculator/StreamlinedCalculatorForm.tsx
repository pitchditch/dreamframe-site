
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, MapPin, Home, Wrench } from 'lucide-react';
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
  const { toast } = useToast();

  const totalSteps = 3;

  const propertyOptions = [
    { value: 'small', label: 'Small (1-2 story, under 2,000 sq ft)', price: 'Starting at $150' },
    { value: 'medium', label: 'Medium (2-3 story, 2,000-3,500 sq ft)', price: 'Starting at $250' },
    { value: 'large', label: 'Large (3+ story, 3,500-5,000 sq ft)', price: 'Starting at $350' },
    { value: 'xlarge', label: 'X-Large (5,000+ sq ft or complex)', price: 'Starting at $450' }
  ];

  const serviceOptions = [
    { value: 'window', label: 'Window Cleaning', icon: '🪟', description: 'Interior & exterior cleaning' },
    { value: 'gutter', label: 'Gutter Cleaning', icon: '🏠', description: 'Complete cleaning & inspection' },
    { value: 'pressure', label: 'Pressure Washing', icon: '💧', description: 'Driveways, siding, decks' },
    { value: 'roof', label: 'Roof Cleaning', icon: '🏠', description: 'Moss removal & soft washing' }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1 && !formData.address.trim()) {
      newErrors.address = 'Please enter a valid address';
    }
    if (step === 2 && !formData.propertySize) {
      newErrors.propertySize = 'Please select a property size';
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
        // Reset form
        setFormData({ address: '', propertySize: '', serviceType: '' });
        setCurrentStep(1);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <MapPin className="w-5 h-5" />;
      case 2: return <Home className="w-5 h-5" />;
      case 3: return <Wrench className="w-5 h-5" />;
      default: return null;
    }
  };

  const getButtonText = () => {
    if (currentStep === 1) return "Next: Select Size";
    if (currentStep === 2) return "Next: Choose Service";
    return "Get My Free Quote";
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Red Car Discount Banner */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg mb-6 shadow-lg">
        <div className="flex items-center justify-center text-center">
          <div className="bg-white text-red-600 rounded-full p-2 mr-3 flex-shrink-0">
            🚗
          </div>
          <div>
            <div className="font-bold text-lg">10% OFF!</div>
            <div className="text-sm opacity-90">Spotted our red car on Marine Drive?</div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? 'bg-bc-red text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step < currentStep ? 'bg-bc-red' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center text-sm text-gray-600">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      <Card className="shadow-xl border-0">
        <CardContent className="p-8">
          {/* Step 1: Address */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    {getStepIcon(1)}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Address</h2>
                <p className="text-gray-600">Where would you like us to provide service?</p>
              </div>
              
              <div>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="123 Main St, White Rock, BC"
                  className="h-14 text-lg border-gray-300 focus:border-bc-red"
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
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    {getStepIcon(2)}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Size</h2>
                <p className="text-gray-600">What size is your property? (approximate)</p>
              </div>
              
              <div className="space-y-3">
                {propertyOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`block p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                      formData.propertySize === option.value
                        ? 'border-bc-red bg-red-50 ring-2 ring-bc-red ring-opacity-20'
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
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-sm text-bc-red font-medium">{option.price}</div>
                      </div>
                      {formData.propertySize === option.value && (
                        <CheckCircle className="w-5 h-5 text-bc-red" />
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
              <div className="text-center mb-6">
                <div className="flex justify-center mb-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    {getStepIcon(3)}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Type</h2>
                <p className="text-gray-600">What service do you need?</p>
              </div>
              
              <div className="space-y-3">
                {serviceOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`block p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                      formData.serviceType === option.value
                        ? 'border-bc-red bg-red-50 ring-2 ring-bc-red ring-opacity-20'
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
                        <span className="text-2xl mr-3">{option.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                      </div>
                      {formData.serviceType === option.value && (
                        <CheckCircle className="w-5 h-5 text-bc-red" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
              {errors.serviceType && (
                <p className="text-red-500 text-sm">{errors.serviceType}</p>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 space-y-4">
            <Button
              onClick={handleNext}
              className="w-full bg-bc-red hover:bg-red-700 text-white h-14 text-lg font-semibold rounded-lg shadow-lg"
            >
              {getButtonText()}
            </Button>
            
            {currentStep > 1 && (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="w-full h-12 text-gray-700 border-gray-300"
              >
                Back
              </Button>
            )}
          </div>

          {/* Support Text */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              No obligations – see your price instantly
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreamlinedCalculatorForm;

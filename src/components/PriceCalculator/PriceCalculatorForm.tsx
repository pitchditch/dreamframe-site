
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import StepService from './steps/StepService';
import StepSize from './steps/StepSize';
import StepContact from './steps/StepContact';
import StepReview from './steps/StepReview';
import StepPropertyType from './steps/StepPropertyType';
import StepAddress from './steps/StepAddress';
import StepAddons from './steps/StepAddons';
import ProgressSteps from './ProgressSteps';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Percent } from 'lucide-react';
import { trackFormSubmission } from '@/utils/analytics';

interface PriceCalculatorFormProps {
  onComplete?: () => void;
}

const formSchema = z.object({
  services: z.array(z.string()).min(1, "Please select at least one service"),
  size: z.string(),
  propertyType: z.string(),
  cleaning_options: z.object({
    window_cleaning: z.string().optional(),
    gutter_cleaning: z.string().optional(),
    pressure_washing: z.array(z.string()).optional(),
  }).optional(),
  addons: z.array(z.string()).optional(),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.date(),
  address: z.string().min(5),
  notes: z.string().optional(),
});

const PriceCalculatorForm = ({ onComplete }: PriceCalculatorFormProps) => {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isSpringSale, setIsSpringSale] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      propertyType: 'residential',
      cleaning_options: {
        window_cleaning: '',
        gutter_cleaning: '',
        pressure_washing: [],
      },
      addons: []
    },
  });

  // Check if there's a selected package in sessionStorage on mount
  useEffect(() => {
    const packageData = sessionStorage.getItem('selectedPackage');
    if (packageData) {
      try {
        const parsedPackage = JSON.parse(packageData);
        setSelectedPackage(parsedPackage);
        
        // Check if this is a spring sale package
        if (parsedPackage.isSpringSale) {
          setIsSpringSale(true);
        }
        
        // Prefill form with package services
        if (parsedPackage.services && parsedPackage.services.length > 0) {
          form.setValue('services', parsedPackage.services);
          
          // Set default options for services
          if (parsedPackage.services.includes('window-cleaning')) {
            form.setValue('cleaning_options.window_cleaning', 'both');
          }
          
          if (parsedPackage.services.includes('gutter-cleaning')) {
            form.setValue('cleaning_options.gutter_cleaning', 'both');
          }
          
          if (parsedPackage.services.includes('pressure-washing')) {
            form.setValue('cleaning_options.pressure_washing', ['house-washing']);
          }
          
          if (parsedPackage.services.includes('driveway-washing')) {
            form.setValue('cleaning_options.pressure_washing', 
              [...(form.getValues('cleaning_options.pressure_washing') || []), 'driveway-washing']
            );
          }
          
          // For package selections, we'll show the address step directly
          setStep(0);
        }
      } catch (e) {
        console.error('Error parsing selected package', e);
      }
    }
  }, [form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    
    // Track the form submission in Google Analytics
    trackFormSubmission('price_calculator', {
      form_type: 'price_calculator',
      service_type: data.services.join(','),
      property_type: data.propertyType,
      spring_sale: isSpringSale
    });
    
    // Here you would typically send the data to your backend
    alert("Your quote request has been submitted! We'll contact you shortly.");
    if (onComplete) {
      onComplete();
    }
  };

  const nextStep = () => setStep(prev => {
    if (selectedPackage && prev === 0) {
      // If coming from address step with a package selected, jump to review
      return 6;
    }
    return Math.min(prev + 1, 6);
  });
  
  const prevStep = () => setStep(prev => {
    if (selectedPackage && prev === 6) {
      // If going back from review step with a package selected, go to address
      return 0;
    }
    return Math.max(prev - 1, selectedPackage ? 0 : 1);
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Price Calculator</h1>
          <p className="text-gray-600">
            Get an instant estimate for your service needs
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
          <Avatar className="h-12 w-12 border-2 border-blue-500">
            <AvatarImage 
              src="/lovable-uploads/f69ce980-a64c-43c2-9d3b-7a93c47e127b.png" 
              alt="Jayden Fisher" 
              className="object-cover"
            />
            <AvatarFallback>JF</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">Jayden Fisher</p>
            <p className="text-xs text-gray-500">Every job is checked by me personally</p>
          </div>
        </div>
      </div>

      {/* Spring Sale Banner */}
      {isSpringSale && (
        <div className="bg-yellow-100 p-4 rounded-lg mb-6 border border-yellow-300">
          <div className="flex items-center mb-2">
            <Percent className="text-yellow-600 mr-2" size={20} />
            <h3 className="text-lg font-semibold text-yellow-800">Spring Sale: 20% Off!</h3>
          </div>
          <p className="text-sm text-yellow-700">
            You've selected a service with our Spring Sale discount. Your 20% discount will be applied automatically to your quote.
          </p>
        </div>
      )}

      {selectedPackage && step !== 0 && step !== 6 && !isSpringSale && (
        <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
          <div className="flex items-center mb-2">
            <Check className="text-green-600 mr-2" size={20} />
            <h3 className="text-lg font-semibold text-green-800">{selectedPackage.title} Selected</h3>
          </div>
          <p className="text-sm text-green-700">
            You've selected our {selectedPackage.title}. We just need your address details to provide a personalized quote with savings of ${selectedPackage.savings}.
          </p>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg mb-8">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/c15cdd73-8e52-4372-9bce-100fe07cf035.png" 
              alt="Built on Trust and Quality" 
              className="h-32 w-auto rounded-lg object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-blue-800 mb-1">Built on Trust and Quality</p>
            <p className="text-sm mb-2">
              Leave your address and we can send you a quick estimate based on Google Maps, or contact us for an on-site estimate.
            </p>
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={16} />
              <p className="text-sm text-gray-700">No obligation quotes</p>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={16} />
              <p className="text-sm text-gray-700">Competitive pricing</p>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={16} />
              <p className="text-sm text-gray-700">Fully insured professional service</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <ProgressSteps 
          currentStep={step} 
          totalSteps={selectedPackage ? 2 : 6} 
          customLabels={selectedPackage ? ['Address', 'Review'] : ['Services', 'Property Type', 'Size', 'Add-ons', 'Contact', 'Review']}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 0 && <StepAddress form={form} onNext={nextStep} selectedPackage={selectedPackage} />}
          {step === 1 && <StepService form={form} onNext={nextStep} />}
          {step === 2 && <StepPropertyType form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 3 && <StepSize form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 4 && <StepAddons form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 5 && <StepContact form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 6 && <StepReview form={form} onBack={prevStep} selectedPackage={selectedPackage} isSpringSale={isSpringSale} />}
        </form>
      </Form>
    </div>
  );
};

export default PriceCalculatorForm;

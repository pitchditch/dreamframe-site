
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import StepService from './steps/StepService';
import StepSize from './steps/StepSize';
import StepAddons from './steps/StepAddons';
import StepContact from './steps/StepContact';
import StepReview from './steps/StepReview';
import StepPropertyType from './steps/StepPropertyType';
import ProgressSteps from './ProgressSteps';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  service: z.string(),
  size: z.string(),
  propertyType: z.string(),
  addons: z.array(z.string()),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.date(),
  address: z.string().min(5),
  notes: z.string().optional(),
});

const PriceCalculatorForm = () => {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addons: [],
      propertyType: 'residential',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Here you would typically send the data to your backend
    alert("Your quote request has been submitted! We'll contact you shortly.");
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Price Calculator</h1>
          <p className="text-gray-600">
            Get an instant estimate for your service needs. Follow the steps
            below to receive a customized quote.
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
          <Avatar className="h-12 w-12 border-2 border-bc-red">
            <AvatarImage src="/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png" alt="Jayden Fisher" />
            <AvatarFallback>JF</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">Jayden Fisher</p>
            <p className="text-xs text-gray-500">Every job is checked by me personally</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-8 text-sm">
        <p className="mb-2">
          <strong>Note:</strong> Leave your address and we can send you a quick estimate based on Google Maps. Contact us for an on-site estimate.
        </p>
        <p>
          All of our prices are competitive with other companies, including Shackshine, Men in Kilts, and we are fully insured.
        </p>
      </div>

      <ProgressSteps currentStep={step} totalSteps={6} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && <StepService form={form} onNext={nextStep} />}
          {step === 2 && <StepPropertyType form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 3 && <StepSize form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 4 && <StepAddons form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 5 && <StepContact form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 6 && <StepReview form={form} onBack={prevStep} />}
        </form>
      </Form>
    </div>
  );
};

export default PriceCalculatorForm;

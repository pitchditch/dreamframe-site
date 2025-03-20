
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import StepService from './steps/StepService';
import StepSize from './steps/StepSize';
import StepAddons from './steps/StepAddons';
import StepContact from './steps/StepContact';
import StepReview from './steps/StepReview';
import ProgressSteps from './ProgressSteps';

const formSchema = z.object({
  service: z.string(),
  size: z.string(),
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
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Price Calculator</h1>
      <p className="text-gray-600 mb-8">
        Get an instant estimate for your service needs. Follow the steps
        below to receive a customized quote.
      </p>

      <ProgressSteps currentStep={step} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && <StepService form={form} onNext={nextStep} />}
          {step === 2 && <StepSize form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 3 && <StepAddons form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 4 && <StepContact form={form} onNext={nextStep} onBack={prevStep} />}
          {step === 5 && <StepReview form={form} onBack={prevStep} />}
        </form>
      </Form>
    </div>
  );
};

export default PriceCalculatorForm;

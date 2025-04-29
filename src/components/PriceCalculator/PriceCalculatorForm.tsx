
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import ProgressSteps from './ProgressSteps';
import StepPropertyType from './steps/StepPropertyType';
import StepService from './steps/StepService';
import StepSize from './steps/StepSize';
import StepAddons from './steps/StepAddons';
import StepAddress from './steps/StepAddress';
import StepContact from './steps/StepContact';
import StepReview from './steps/StepReview';

interface PriceCalculatorFormProps {
  onComplete?: () => void;
}

const formSchema = z.object({
  propertyType: z.string().min(1, {
    message: "Please select a property type.",
  }),
  service: z.string().min(1, {
    message: "Please select a service.",
  }),
  serviceOption: z.string().optional(),
  size: z.object({
    width: z.string().optional(),
    height: z.string().optional(),
    stories: z.string().optional(),
    sqft: z.string().optional(),
    windows: z.string().optional(),
  }).optional(),
  addons: z.array(z.string()).optional(),
  address: z.object({
    street: z.string().min(1, { message: "Street address is required." }),
    city: z.string().min(1, { message: "City is required." }),
    postalCode: z.string().min(6, { message: "Valid postal code required." }),
  }).optional(),
  contact: z.object({
    fullName: z.string().min(1, { message: "Full name is required." }),
    email: z.string().email({ message: "Valid email is required." }),
    phone: z.string().min(10, { message: "Valid phone number is required." }),
    preferredContact: z.string().default("email"),
  }).optional(),
  notes: z.string().optional(),
  date: z.string().optional(),
});

const PriceCalculatorForm: React.FC<PriceCalculatorFormProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const totalSteps = 7;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: "",
      service: "",
      serviceOption: "",
      size: {
        width: "",
        height: "",
        stories: "",
        sqft: "",
        windows: "",
      },
      addons: [],
      address: {
        street: "",
        city: "",
        postalCode: "",
      },
      contact: {
        fullName: "",
        email: "",
        phone: "",
        preferredContact: "email",
      },
      notes: "",
      date: "",
    },
  });

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    // Show success toast
    toast({
      title: "Quote request submitted!",
      description: "We'll be in touch with you shortly.",
    });

    // Call onComplete callback if provided
    if (onComplete) {
      onComplete();
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <StepPropertyType form={form} onNext={handleNext} />;
      case 2:
        return <StepService form={form} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <StepSize form={form} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <StepAddons form={form} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <StepAddress form={form} onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <StepContact form={form} onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <StepReview form={form} onBack={handleBack} onSubmit={onSubmit} />;
      default:
        return <StepPropertyType form={form} onNext={handleNext} />;
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <ProgressSteps currentStep={step} totalSteps={totalSteps} />
        {renderStepContent()}
      </form>
    </Form>
  );
};

export default PriceCalculatorForm;

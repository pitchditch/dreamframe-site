
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
import { useChatFormData } from '@/hooks/use-chat-form-data';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';

const formSchema = z.object({
  services: z.array(z.string()).min(1, "Please select at least one service"),
  size: z.string(),
  propertyType: z.string(),
  addons: z.array(z.string()),
  cleaning_options: z.object({
    window_cleaning: z.string().optional(),
    gutter_cleaning: z.string().optional(),
    pressure_washing: z.array(z.string()).optional(),
  }).optional(),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  date: z.date(),
  address: z.string().min(5),
  notes: z.string().optional(),
});

const PriceCalculatorForm = () => {
  const [step, setStep] = useState(1);
  const { formData, clearFormData } = useChatFormData();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      services: [],
      addons: [],
      propertyType: 'residential',
      cleaning_options: {
        window_cleaning: '',
        gutter_cleaning: '',
        pressure_washing: [],
      }
    },
  });

  // Apply chat data to form when available
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      // Apply each field from formData to the form
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'services' && Array.isArray(value) && value.length > 0) {
          form.setValue('services', value);
          toast({
            title: t("Information Applied"),
            description: t("We've pre-filled your service selection based on your chat."),
            duration: 5000,
          });
        } 
        else if (key === 'propertyType' && value) {
          form.setValue('propertyType', value as string);
        }
        else if (key === 'size' && value) {
          form.setValue('size', value as string);
        }
        else if (key === 'fullName' && value) {
          form.setValue('fullName', value as string);
        }
        else if (key === 'email' && value) {
          form.setValue('email', value as string);
        }
        else if (key === 'phone' && value) {
          form.setValue('phone', value as string);
        }
        else if (key === 'address' && value) {
          form.setValue('address', value as string);
        }
        else if (key === 'notes' && value) {
          form.setValue('notes', value as string);
        }
      });
      
      // Clear chat form data after applying to prevent duplicate applications
      clearFormData();
    }
  }, [formData, form.setValue, clearFormData, toast, t]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Here you would typically send the data to your backend
    alert(t("Your quote request has been submitted! We'll contact you shortly."));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("Price Calculator")}</h1>
          <p className="text-gray-600">
            {t("Get an instant estimate for your service needs")}
          </p>
        </div>
        <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
          <Avatar className="h-12 w-12 border-2 border-blue-500">
            <AvatarImage src="/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png" alt="Jayden Fisher" />
            <AvatarFallback>JF</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{t("Jayden Fisher")}</p>
            <p className="text-xs text-gray-500">{t("Every job is checked by me personally")}</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg mb-8 text-sm">
        <p className="mb-2">
          {t("Leave your address and we can send you a quick estimate based on Google Maps, or contact us for an on-site estimate.")}
        </p>
        <p>
          {t("All of our prices are competitive with other companies, including Shackshine, Men in Kilts, and we are fully insured.")}
        </p>
      </div>
      
      <div className="mb-6">
        <ProgressSteps currentStep={step} totalSteps={6} />
      </div>

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

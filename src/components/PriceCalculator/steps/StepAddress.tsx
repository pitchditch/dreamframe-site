
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';

// Define the StepProps interface locally instead of importing it
interface StepProps {
  onNext: () => void;
  onBack: () => void;
  formData: any;
  updateFormData: (data: any) => void;
  form?: any;
  selectedPackage?: any;
}

const formSchema = z.object({
  street: z.string().min(3, { message: "Street address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  postalCode: z.string().min(5, { message: "Postal code is required" }),
});

type AddressFormValues = z.infer<typeof formSchema>;

export default function StepAddress({ onNext, onBack, formData, updateFormData, form: parentForm, selectedPackage }: StepProps) {
  // Load saved zip code if available
  const [storedZipCode, setStoredZipCode] = useState('');
  
  useEffect(() => {
    const userZipCode = sessionStorage.getItem('userZipCode');
    if (userZipCode) {
      setStoredZipCode(userZipCode);
      updateFormData({ ...formData, address: { ...formData.address, postalCode: userZipCode } });
    }
  }, []);
  
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: formData.address?.street || '',
      city: formData.address?.city || '',
      postalCode: formData.address?.postalCode || storedZipCode || '',
    },
  });

  const onSubmit = (values: AddressFormValues) => {
    updateFormData({
      ...formData,
      address: values,
    });
    onNext();
  };
  
  // Update form when stored ZIP code changes
  useEffect(() => {
    if (storedZipCode) {
      form.setValue('postalCode', storedZipCode);
    }
  }, [storedZipCode, form]);

  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <MapPin className="text-red-600 mr-2" />
        <h3 className="text-xl font-medium">Where do you need service?</h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Vancouver" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="V1A 1A1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={onBack}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button type="submit" className="flex items-center">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

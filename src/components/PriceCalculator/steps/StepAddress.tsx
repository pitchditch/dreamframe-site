
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
  email: z.string().email({ message: "Valid email is required" }).optional(),
});

type AddressFormValues = z.infer<typeof formSchema>;

export default function StepAddress({ onNext, onBack, formData, updateFormData, form: parentForm, selectedPackage }: StepProps) {
  // Load saved postal code and email if available
  const [storedPostalCode, setStoredPostalCode] = useState('');
  const [storedEmail, setStoredEmail] = useState('');
  
  useEffect(() => {
    const userPostalCode = sessionStorage.getItem('userPostalCode') || localStorage.getItem('userPostalCode');
    const userEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
    
    if (userPostalCode) {
      setStoredPostalCode(userPostalCode);
      updateFormData({ ...formData, address: { ...formData.address, postalCode: userPostalCode } });
    }
    
    if (userEmail) {
      setStoredEmail(userEmail);
      updateFormData({ ...formData, contact: { ...formData.contact, email: userEmail } });
    }
  }, []);
  
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: formData.address?.street || '',
      city: formData.address?.city || '',
      postalCode: formData.address?.postalCode || storedPostalCode || '',
      email: formData.contact?.email || storedEmail || '',
    },
  });

  const onSubmit = (values: AddressFormValues) => {
    // Store the collected information in both session and local storage
    if (values.postalCode) {
      sessionStorage.setItem('userPostalCode', values.postalCode);
      localStorage.setItem('userPostalCode', values.postalCode);
    }
    
    if (values.email) {
      sessionStorage.setItem('userEmail', values.email);
      localStorage.setItem('userEmail', values.email);
    }
    
    updateFormData({
      ...formData,
      address: {
        street: values.street,
        city: values.city,
        postalCode: values.postalCode,
      },
      contact: {
        ...formData.contact,
        email: values.email,
      }
    });
    
    onNext();
  };
  
  // Update form when stored values change
  useEffect(() => {
    if (storedPostalCode) {
      form.setValue('postalCode', storedPostalCode);
    }
    
    if (storedEmail) {
      form.setValue('email', storedEmail);
    }
  }, [storedPostalCode, storedEmail, form]);

  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <MapPin className="text-red-600 mr-2" />
        <h3 className="text-xl font-medium">What's your address?</h3>
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
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (Optional)</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
                <p className="text-xs text-gray-500 mt-1">So we can send you your quote even if you don't complete the form</p>
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

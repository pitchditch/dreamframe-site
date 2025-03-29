import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  contactName: z.string().min(2, {
    message: "Contact name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  numberOfWindows: z.string().transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Please enter a valid number of windows.",
    }),
  address: z.string().min(5, {
    message: "Please enter your business address.",
  }),
  additionalInfo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const MaintenanceProgramForm = () => {
  const { toast } = useToast();
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      contactName: "",
      email: "",
      phone: "",
      numberOfWindows: "",
      address: "",
      additionalInfo: "",
    },
  });

  const calculateEstimate = (numWindows: number) => {
    return numWindows * 10; // $10 per window
  };

  const handleNumberOfWindowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numWindows = parseInt(e.target.value, 10);
    if (!isNaN(numWindows) && numWindows > 0) {
      setEstimatedPrice(calculateEstimate(numWindows));
    } else {
      setEstimatedPrice(null);
    }
  };

  const onSubmit = (data: FormValues) => {
    toast({
      title: "Application Submitted",
      description: `Thank you for your interest in our monthly maintenance program. We'll contact you soon to verify the price and schedule your service.`,
      duration: 5000,
    });
    
    console.log("Form submitted:", data);
    form.reset();
    setEstimatedPrice(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex items-center mb-6">
        <Building className="text-bc-red mr-2" size={24} />
        <h3 className="text-2xl font-bold">Monthly Window Cleaning Maintenance Program</h3>
      </div>
      
      <p className="text-gray-600 mb-6">
        Our monthly maintenance program ensures your commercial property's windows always look their best. 
        Sign up below for regular scheduled cleaning at just $10 per window per month.
        <span className="block mt-2 font-medium text-bc-red">
          Note: Final pricing will be verified during an in-person assessment.
        </span>
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact person's name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="numberOfWindows"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Windows</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter the number of windows" 
                      min="1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleNumberOfWindowsChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your business address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any special requirements or information about your property" 
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {estimatedPrice !== null && (
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium">Estimated Monthly Price: <span className="text-bc-red font-bold">${estimatedPrice}</span></p>
              <p className="text-sm text-gray-500">Final price will be verified during an in-person assessment.</p>
            </div>
          )}
          
          <Button type="submit" className="bg-bc-red hover:bg-red-700 w-full">
            Submit Application
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MaintenanceProgramForm;

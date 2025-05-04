
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface StepAddressProps {
  form: any;
}

const StepAddress: React.FC<StepAddressProps> = ({ form }) => {
  useEffect(() => {
    // Pre-fill postal code from session storage if available
    const savedPostalCode = sessionStorage.getItem('postalCode') || localStorage.getItem('postalCode');
    if (savedPostalCode) {
      form.setValue('postalCode', savedPostalCode);
    }
  }, [form]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Property Address</h2>
      
      <Form {...form}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="V4B 1J6" {...field} />
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
                  <Input placeholder="White Rock" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="mt-4">
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
        </div>
      </Form>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Your address helps us provide an accurate quote for our services in your area.</p>
      </div>
    </div>
  );
};

export default StepAddress;

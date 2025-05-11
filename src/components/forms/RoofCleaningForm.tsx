
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { trackFormSubmission } from '@/utils/analytics';

interface RoofCleaningFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  roofType: string;
  roofSize: string;
  message: string;
}

const RoofCleaningForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const form = useForm<RoofCleaningFormData>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      roofType: '',
      roofSize: '',
      message: '',
    },
  });

  const onSubmit = async (data: RoofCleaningFormData) => {
    setIsSubmitting(true);
    
    try {
      // Track form submission in analytics
      trackFormSubmission('roof_cleaning_form', data);
      
      // Send email using EmailJS
      await emailjs.send(
        'service_xrk4vas', // Service ID
        'template_cpivz2k', // Template ID
        {
          from_name: data.name,
          phone: data.phone,
          email: data.email,
          service_address: data.address,
          roof_type: data.roofType,
          roof_size: data.roofSize,
          message: data.message,
          subject: 'Roof Cleaning Inquiry',
          form_type: 'Roof Cleaning Form',
        },
        'MMzAmk5eWrjFgC_nP' // Public Key
      );
      
      setIsSuccess(true);
      form.reset();
      
      toast({
        title: "Request submitted successfully!",
        description: "We'll be in touch with you shortly.",
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold mb-6 text-center">Request a Free Roof Cleaning Quote</h3>
      
      {isSuccess ? (
        <div className="text-center p-6 bg-green-50 rounded-lg">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="text-green-600" size={24} />
          </div>
          <h4 className="text-lg font-bold text-green-800 mb-2">Quote Request Received!</h4>
          <p className="text-green-700 mb-4">
            Thank you for your interest in our roof cleaning services. We'll contact you shortly to discuss your needs.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsSuccess(false)}
            className="bg-white border-green-300 text-green-700 hover:bg-green-50"
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                rules={{ required: 'Phone number is required' }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                rules={{ 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              rules={{ required: 'Address is required' }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Property address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roofType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roof Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select roof type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="asphalt">Asphalt Shingles</SelectItem>
                        <SelectItem value="metal">Metal Roof</SelectItem>
                        <SelectItem value="tile">Tile Roof</SelectItem>
                        <SelectItem value="cedar">Cedar Shake</SelectItem>
                        <SelectItem value="flat">Flat Roof</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="roofSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Approximate Roof Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small">Small (under 1,500 sq ft)</SelectItem>
                        <SelectItem value="medium">Medium (1,500-2,500 sq ft)</SelectItem>
                        <SelectItem value="large">Large (2,500-3,500 sq ft)</SelectItem>
                        <SelectItem value="x-large">Extra Large (3,500+ sq ft)</SelectItem>
                        <SelectItem value="unsure">Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about the moss/algae situation, any specific concerns, or questions you may have."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Request Free Quote'
              )}
            </Button>
          </form>
        </Form>
      )}
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <div>
            <h4 className="font-semibold">Need Help?</h4>
            <p className="text-sm text-gray-500">Call us directly</p>
          </div>
          <a href="tel:7788087620" className="text-bc-red font-bold hover:underline">
            778-808-7620
          </a>
        </div>
      </div>
    </div>
  );
};

export default RoofCleaningForm;

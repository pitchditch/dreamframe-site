import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmission } from "@/utils/analytics";
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Please enter your address.",
  }),
  cleaningType: z.enum(["interior", "exterior", "both"], {
    required_error: "Please select where you need cleaning.",
  }),
  homeSize: z.string({
    required_error: "Please select your home size.",
  }),
  windowCount: z.string().optional(),
  storyCount: z.enum(["1", "2", "3+"]).optional(),
  message: z.string().optional(),
});

const WindowCleaningForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      cleaningType: "both",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Submitting form with values:", values);
    
    // Track form submission
    trackFormSubmission('window_cleaning_form', {
      form_type: 'service',
      service_type: 'window_cleaning',
      cleaning_type: values.cleaningType
    });
    
    // Prepare the data for email
    const templateParams = {
      from_name: values.fullName,
      from_email: values.email,
      phone: values.phone,
      address: values.address,
      service_type: 'Window Cleaning',
      cleaning_type: values.cleaningType,
      home_size: values.homeSize,
      window_count: values.windowCount || 'Not specified',
      story_count: values.storyCount || 'Not specified',
      message: values.message || 'None',
      subject: 'New Window Cleaning Quote Request'
    };
    
    // Send email using EmailJS
    emailjs.send(
      'service_xrk4vas',
      'template_cpivz2k',
      templateParams,
      'MMzAmk5eWrjFgC_nP'
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
      toast({
        title: "Request Submitted!",
        description: "We'll contact you shortly about your window cleaning quote.",
      });
      form.reset();
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your request. Please try again.",
        variant: "destructive"
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Request Window Cleaning Quote</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(604) 555-1234" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, White Rock, BC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cleaningType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Windows to Clean</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="interior" id="interior" />
                      <FormLabel htmlFor="interior" className="font-normal">Interior Only</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="exterior" id="exterior" />
                      <FormLabel htmlFor="exterior" className="font-normal">Exterior Only</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <FormLabel htmlFor="both" className="font-normal">Both Interior & Exterior</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="homeSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Size</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select home size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="small">Small (&lt; 1,500 sq ft)</SelectItem>
                      <SelectItem value="medium">Medium (1,500 - 2,500 sq ft)</SelectItem>
                      <SelectItem value="large">Large (2,500 - 3,500 sq ft)</SelectItem>
                      <SelectItem value="xlarge">Extra Large (&gt; 3,500 sq ft)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="storyCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Stories</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stories" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Story</SelectItem>
                      <SelectItem value="2">2 Stories</SelectItem>
                      <SelectItem value="3+">3+ Stories</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="windowCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approximate Window Count (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 15" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any specific details or questions..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            variant="bc-red"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Get Your Free Quote'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default WindowCleaningForm;

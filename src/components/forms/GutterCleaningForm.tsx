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
  cleaningType: z.enum(["inside", "outside", "both"], {
    required_error: "Please select where you need cleaning.",
  }),
  storyCount: z.enum(["1", "2", "3+"], {
    required_error: "Please select your home's height.",
  }),
  roofAccessNotes: z.string().optional(),
  message: z.string().optional(),
});

const GutterCleaningForm = () => {
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
      storyCount: "1",
      roofAccessNotes: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Submitting form with values:", values);
    
    // Track form submission
    trackFormSubmission('gutter_cleaning_form', {
      form_type: 'service',
      service_type: 'gutter_cleaning',
      cleaning_type: values.cleaningType,
      story_count: values.storyCount
    });
    
    // Prepare the data for email
    const templateParams = {
      from_name: values.fullName,
      from_email: values.email,
      phone: values.phone,
      address: values.address,
      service_type: 'Gutter Cleaning',
      cleaning_type: values.cleaningType,
      story_count: values.storyCount,
      roof_access_notes: values.roofAccessNotes || 'None',
      message: values.message || 'None',
      subject: 'New Gutter Cleaning Quote Request'
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
        description: "We'll contact you shortly about your gutter cleaning quote.",
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
      <h3 className="text-xl font-bold mb-4">Request Gutter Cleaning Quote</h3>
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
                <FormLabel>Gutters to Clean</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="inside" id="inside" />
                      <FormLabel htmlFor="inside" className="font-normal">Inside Only</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outside" id="outside" />
                      <FormLabel htmlFor="outside" className="font-normal">Outside Only</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <FormLabel htmlFor="both" className="font-normal">Both Inside & Outside</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="storyCount"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Home Height</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="one-story" />
                      <FormLabel htmlFor="one-story" className="font-normal">1 Story</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="two-story" />
                      <FormLabel htmlFor="two-story" className="font-normal">2 Story</FormLabel>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3+" id="three-plus-story" />
                      <FormLabel htmlFor="three-plus-story" className="font-normal">3+ Story</FormLabel>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="roofAccessNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roof Access Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Please describe any access issues or concerns (steep roof, difficult access points, etc.)"
                    className="resize-none"
                    {...field}
                  />
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
                  <Textarea 
                    placeholder="Any specific details or questions..."
                    className="resize-none"
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

export default GutterCleaningForm;

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
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, CheckCircle } from "lucide-react";
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
  surfaceType: z.string({
    required_error: "Please select your surface type.",
  }),
  squareFootage: z.string().optional(),
  addDriveway: z.boolean().default(false).optional(),
  addDeck: z.boolean().default(false).optional(),
  message: z.string().optional(),
});

const PressureWashingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      squareFootage: "",
      addDriveway: false,
      addDeck: false,
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Submitting form with values:", values);
    
    // Track form submission
    trackFormSubmission('pressure_washing_form', {
      form_type: 'service',
      service_type: 'pressure_washing',
      surface_type: values.surfaceType
    });
    
    // Get additional services
    const additionalServices = [];
    if (values.addDriveway) additionalServices.push('Driveway Cleaning');
    if (values.addDeck) additionalServices.push('Deck/Patio Cleaning');
    
    // Prepare the data for email to business
    const templateParams = {
      from_name: values.fullName,
      from_email: values.email,
      phone: values.phone,
      address: values.address,
      service_type: 'Pressure Washing',
      surface_type: values.surfaceType,
      square_footage: values.squareFootage || 'Not specified',
      additional_services: additionalServices.join(', ') || 'None',
      message: values.message || 'None',
      subject: 'New Pressure Washing Quote Request'
    };
    
    // Send email to business using EmailJS
    emailjs.send(
      'service_xrk4vas',
      'template_cpivz2k',
      templateParams,
      'MMzAmk5eWrjFgC_nP'
    )
    .then((response) => {
      console.log('Business email sent successfully:', response);
      
      // Send confirmation email to customer
      const customerTemplateParams = {
        to_email: values.email,
        to_name: values.fullName,
        service_type: 'Pressure Washing',
        subject: 'Quote Request Received - BC Pressure Washing',
        message: `Hi ${values.fullName},\n\nThank you for requesting a pressure washing quote! We've received your request and will contact you shortly with a personalized quote.\n\nService Details:\n- Service: Pressure Washing\n- Surface Type: ${values.surfaceType}\n- Address: ${values.address}\n- Additional Services: ${additionalServices.join(', ') || 'None'}\n\nWe'll be in touch within 24 hours.\n\nBest regards,\nJayden Fisher\nBC Pressure Washing\n(604) 357-2936`,
        business_email: 'bcpressurewashing.ca@gmail.com'
      };
      
      return emailjs.send(
        'service_xrk4vas',
        'template_cpivz2k',
        customerTemplateParams,
        'MMzAmk5eWrjFgC_nP'
      );
    })
    .then((response) => {
      console.log('Customer confirmation email sent successfully:', response);
      toast({
        title: "Request Submitted!",
        description: "We'll contact you shortly about your pressure washing quote. Check your email for confirmation.",
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
    <div className="p-6 bg-white rounded-lg shadow-md relative">
      {/* Animated elements */}
      <div className="absolute -top-12 -right-12 w-20 h-20 animate-spin-slow opacity-80 hidden md:block">
        <img src="/lovable-uploads/21056867-9ce1-48a7-8503-3d9f1efdf36e.png" alt="BC Pressure Washing" className="w-full h-full object-contain drop-shadow-md" />
      </div>
      <div className="absolute -top-14 left-6 bg-white p-2 rounded-lg shadow-md transform rotate-6 animate-bounce-slow hidden md:block">
        <MessageCircle className="text-bc-red h-6 w-6" />
        <div className="absolute w-3 h-3 bg-white transform rotate-45 -bottom-1.5 left-5"></div>
      </div>
      
      <h3 className="text-xl font-bold mb-4">Request Pressure Washing Quote</h3>
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
            name="surfaceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surface Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select surface type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="vinyl">Vinyl Siding</SelectItem>
                    <SelectItem value="stucco">Stucco</SelectItem>
                    <SelectItem value="brick">Brick</SelectItem>
                    <SelectItem value="hardieboard">Hardie Board</SelectItem>
                    <SelectItem value="wood">Wood</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="squareFootage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approximate Square Footage</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Additional Services</h4>
            
            <FormField
              control={form.control}
              name="addDriveway"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Include driveway cleaning</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="addDeck"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Include deck/patio cleaning</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Input placeholder="Any specific details or questions..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="p-3 bg-gray-50 rounded-lg mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
            <p className="text-sm text-gray-600">Final quote confirmed by Jayden. You'll receive an email confirmation.</p>
          </div>
          
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

export default PressureWashingForm;

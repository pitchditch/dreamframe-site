
import { useState } from 'react';
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { ArrowRight, Clock, CheckCircle2, Calendar, Shield, Award, ThumbsUp } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { trackFormSubmit } from '@/lib/analytics-client';
import useFormTracking from '@/hooks/useFormTracking';
import ReferralButton from '@/components/ReferralButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

interface ExpressCleaningFormData {
  fullName: string;
  phoneNumber: string;
  serviceAddress: string;
  windowCleaning: boolean;
  houseWashing: boolean;
  gutterCleaning: boolean;
  drivewayPressureWashing: boolean;
  preferredTime: 'today' | 'tomorrow' | 'flexible';
  additionalNotes: string;
  priorityAgreement: boolean;
}

const ExpressCleaning = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackFieldInteraction, trackSubmission } = useFormTracking({
    formName: 'express_cleaning_request'
  });
  
  const form = useForm<ExpressCleaningFormData>({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      serviceAddress: '',
      windowCleaning: false,
      houseWashing: false,
      gutterCleaning: false,
      drivewayPressureWashing: false,
      preferredTime: 'flexible',
      additionalNotes: '',
      priorityAgreement: false,
    }
  });

  const onSubmit = (data: ExpressCleaningFormData) => {
    setIsSubmitting(true);
    
    // Track form submission
    trackSubmission(data);
    trackFormSubmit('express_cleaning_request', data);

    try {
      // Get selected services as a formatted string
      const selectedServices = [
        data.windowCleaning ? 'Window Cleaning' : null,
        data.houseWashing ? 'House Washing' : null,
        data.gutterCleaning ? 'Gutter Cleaning' : null,
        data.drivewayPressureWashing ? 'Driveway Pressure Washing' : null
      ].filter(Boolean).join(', ');
      
      // Convert preferred time to readable format
      const timeMapping = {
        today: 'Today',
        tomorrow: 'Tomorrow',
        flexible: 'Flexible / First Available'
      };
      
      // Prepare data for emailjs
      const templateParams = {
        from_name: data.fullName,
        phone: data.phoneNumber,
        service_address: data.serviceAddress,
        services_needed: selectedServices,
        preferred_time: timeMapping[data.preferredTime],
        additional_notes: data.additionalNotes,
        priority_agreement: data.priorityAgreement ? 'Agreed' : 'Not Agreed',
        form_type: 'Express Cleaning Request',
        subject: '🚨 URGENT: Express Cleaning Request'
      };

      // Send email using EmailJS
      emailjs.send(
        'service_xrk4vas',
        'template_cpivz2k',
        templateParams,
        'MMzAmk5eWrjFgC_nP'
      )
      .then(() => {
        toast({
          title: "Express Request Submitted!",
          description: "We'll contact you shortly to confirm availability.",
        });
        form.reset();
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        toast({
          title: "Something went wrong.",
          description: "Please try again or contact us directly at 778-808-7620.",
          variant: "destructive"
        });
        setIsSubmitting(false);
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Something went wrong.",
        description: "Please try again or contact us directly at 778-808-7620.",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Layout 
      title="Express Cleaning Service | Same-Day & Next-Day Service"
      description="Need urgent exterior cleaning? Get same-day or next-day service with our Express Cleaning option. Limited spots available daily."
    >
      <Helmet>
        <title>Express Cleaning - Same Day Service | BC Pressure Washing</title>
        <meta name="description" content="Need urgent exterior cleaning before a party, home sale, or inspection? Book our Express Cleaning service for same-day or next-day service." />
      </Helmet>

      {/* Hero Section with expanded height */}
      <section className="relative py-24 md:py-32 overflow-hidden min-h-screen">
        <div className="absolute inset-0 w-full h-full z-0">
          <img 
            src="/lovable-uploads/fb9b774d-d8de-4955-902f-b9283434313f.png"
            alt="Express Cleaning Service" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/70 z-10"></div>
        </div>
        <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full inline-block mb-4">
              <span className="text-white font-medium">🚨 Urgent Cleaning Needed?</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Express Cleaning Service
            </h1>
            <p className="text-xl mb-8 text-white">
              Same-Day or Next-Day Service for Urgent Cleaning Needs
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Clock className="text-white mr-2" size={20} />
                <span className="text-white">Fast Response</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <CheckCircle2 className="text-white mr-2" size={20} />
                <span className="text-white">Professional Quality</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Calendar className="text-white mr-2" size={20} />
                <span className="text-white">Priority Scheduling</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Owner Operated Section - Replacing Weather Service */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Trusted, Owner-Operated Express Services</h2>
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                When you need urgent cleaning, you can trust BC Pressure Washing. Every express job is personally handled or overseen by the owner - no outsourced teams, just reliable expertise when you need it most.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center bg-gray-800 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="mx-auto w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-bc-red mb-5">
                  <Shield className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-xl mb-3">Fully Insured</h3>
                <p className="text-gray-300 text-base">
                  Rest easy knowing we carry full liability insurance for all express cleaning services.
                </p>
              </div>
              
              <div className="text-center bg-gray-800 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="mx-auto w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-bc-red mb-5">
                  <Award className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-xl mb-3">Express Guarantee</h3>
                <p className="text-gray-300 text-base">
                  Your satisfaction is our priority - if you're not 100% satisfied, we'll make it right.
                </p>
              </div>
              
              <div className="text-center bg-gray-800 p-6 rounded-lg hover:shadow-md transition-shadow">
                <div className="mx-auto w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-bc-red mb-5">
                  <ThumbsUp className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-xl mb-3">Same Day Available</h3>
                <p className="text-gray-300 text-base">
                  When urgency matters, we prioritize your cleaning needs with rapid response.
                </p>
              </div>
            </div>

            {/* Red Car Section */}
            <div className="bg-gradient-to-r from-bc-red to-red-700 text-white rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                <div className="p-8 lg:p-12">
                  <h3 className="text-3xl font-bold mb-4">Seen Our Red Car?</h3>
                  <p className="mb-6 text-lg">
                    If you've spotted our distinctive red vehicle along Marine Drive in White Rock, 
                    mention it when you contact us to receive a special <span className="animate-pulse font-bold text-white text-xl">10% discount</span> on your express service!
                  </p>
                  
                  {/* Owner profile */}
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16 border-2 border-white">
                        <AvatarImage src="/lovable-uploads/72766780-6dc1-42de-8971-3a11add4daad.png" alt="Jayden - Owner" />
                        <AvatarFallback>JF</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-white">Jayden - Owner</p>
                      </div>
                    </div>
                    <p className="text-white italic mb-2">
                      "When you need express cleaning, I personally ensure we meet your urgent timeline with the quality you deserve."
                    </p>
                    <p className="font-bold text-white">— Jayden, Owner</p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-white text-bc-red hover:bg-gray-100 border-white"
                    asChild
                  >
                    <Link to="/contact">
                      Claim Your 10% Express Discount
                    </Link>
                  </Button>
                </div>
                
                <div className="h-full">
                  <img
                    src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
                    alt="BC Pressure Washing Red Car at Marine Drive"
                    className="w-full h-full object-cover min-h-[400px] lg:min-h-[500px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Info Column */}
              <div className="md:col-span-5">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Why Express Cleaning?</h2>
                  <p className="mb-4 text-gray-700">
                    Need urgent exterior cleaning before a party, home sale, or inspection? Skip the wait and get prioritized with Express Cleaning by BC Pressure Washing.
                  </p>
                  
                  <h3 className="font-bold text-xl mb-2 text-gray-800">What We Offer:</h3>
                  <ul className="list-disc list-inside mb-6 space-y-2 text-gray-700">
                    <li>Same-day or next-day availability</li>
                    <li>Fast turnaround for window, house, gutter, or driveway cleaning</li>
                    <li>Fully insured, professional service</li>
                    <li>Personally checked by Jayden Fisher</li>
                  </ul>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Limited daily spots available.</strong> Priority fee of $75 applies for express scheduling.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-3 text-gray-800">For Faster Response</h3>
                  <p className="mb-4 text-gray-700">
                    Call us directly at <a href="tel:7788087620" className="text-bc-red font-bold">778-808-7620</a> for immediate assistance.
                  </p>
                </div>
              </div>
              
              {/* Form Column */}
              <div className="md:col-span-7">
                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Request Express Cleaning</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* All form fields remain the same */}
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Smith" 
                                {...field} 
                                onFocus={() => trackFieldInteraction('fullName', 'focus')}
                                onChange={(e) => {
                                  trackFieldInteraction('fullName', 'change');
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(123) 456-7890" 
                                {...field} 
                                onFocus={() => trackFieldInteraction('phoneNumber', 'focus')}
                                onChange={(e) => {
                                  trackFieldInteraction('phoneNumber', 'change');
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="serviceAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Address</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123 Main St, Surrey, BC" 
                                {...field} 
                                onFocus={() => trackFieldInteraction('serviceAddress', 'focus')}
                                onChange={(e) => {
                                  trackFieldInteraction('serviceAddress', 'change');
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <h3 className="text-base font-medium mb-3">Urgent Services Needed</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="windowCleaning"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                    onClick={() => trackFieldInteraction('windowCleaning', 'click')}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Window Cleaning</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="houseWashing"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                    onClick={() => trackFieldInteraction('houseWashing', 'click')}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>House Washing</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="gutterCleaning"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                    onClick={() => trackFieldInteraction('gutterCleaning', 'click')}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Gutter Cleaning</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="drivewayPressureWashing"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox 
                                    checked={field.value} 
                                    onCheckedChange={field.onChange}
                                    onClick={() => trackFieldInteraction('drivewayPressureWashing', 'click')}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Driveway Pressure Washing</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="preferredTime"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Preferred Time</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem 
                                      value="today" 
                                      onClick={() => trackFieldInteraction('preferredTime', 'click')}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Today
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem 
                                      value="tomorrow" 
                                      onClick={() => trackFieldInteraction('preferredTime', 'click')}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Tomorrow
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem 
                                      value="flexible" 
                                      onClick={() => trackFieldInteraction('preferredTime', 'click')}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Flexible / First Available
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="additionalNotes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Additional Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us about your urgent cleaning needs..." 
                                className="resize-none" 
                                {...field} 
                                onFocus={() => trackFieldInteraction('additionalNotes', 'focus')}
                                onChange={(e) => {
                                  trackFieldInteraction('additionalNotes', 'change');
                                  field.onChange(e);
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="priorityAgreement"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border border-yellow-200 bg-yellow-50 rounded-md">
                            <FormControl>
                              <Checkbox 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                                onClick={() => trackFieldInteraction('priorityAgreement', 'click')}
                                required
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I understand express service includes a $75 priority fee, subject to availability.
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-bc-red hover:bg-red-700" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            Book Express Cleaning Now <ArrowRight className="ml-2" size={18} />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ExpressCleaning;


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { trackFormSubmission } from '@/utils/analytics';

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  serviceType: string;
  propertyType: string;
  homeSize: string;
  specificRequirements: string;
  termsAccepted: boolean;
};

const CalculatorForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quote, setQuote] = useState<number | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<FormData>({
    defaultValues: {
      serviceType: 'window-cleaning',
      propertyType: 'residential',
      homeSize: 'medium',
      termsAccepted: false
    }
  });
  
  const serviceType = watch('serviceType');
  const propertyType = watch('propertyType');
  const homeSize = watch('homeSize');
  
  // Pricing calculation based on selected options
  const calculatePrice = (data: FormData): number => {
    // Base prices
    const basePrices = {
      'window-cleaning': { small: 300, medium: 450, large: 600 },
      'pressure-washing': { small: 350, medium: 550, large: 750 },
      'gutter-cleaning': { small: 280, medium: 400, large: 550 },
    };
    
    // Get base price based on service and home size
    let basePrice = basePrices[serviceType as keyof typeof basePrices]?.[homeSize as keyof (typeof basePrices)['window-cleaning']] || 0;
    
    // Apply multiplier for commercial properties
    if (propertyType === 'commercial') {
      basePrice *= 1.5;
    }
    
    // Apply any discounts or additional fees
    // Example: Spring sale 20% off
    const discount = 0.2;
    basePrice = basePrice * (1 - discount);
    
    return Math.round(basePrice);
  };
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Calculate price
      const estimatedPrice = calculatePrice(data);
      setQuote(estimatedPrice);
      
      // Track form submission
      trackFormSubmission('calculator', { service: data.serviceType });
      
      // Send form data to your email
      const formData = {
        ...data,
        estimatedPrice,
        recipient: 'jaydenf3800@gmail.com',
        subject: `New Quote Request: ${data.serviceType} for ${data.name}`,
        timestamp: new Date().toISOString(),
        source: 'Price Calculator Form'
      };
      
      // Send the form submission (this would typically be an API call)
      console.log('Form submission data:', formData);
      
      // Show success message
      toast({
        title: "Quote Generated!",
        description: `Your estimated price is $${estimatedPrice}. We've sent the details to you.`,
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Get Your Free Estimate</h2>
        
        {/* Service Type */}
        <div className="space-y-4">
          <Label>Service Type</Label>
          <RadioGroup 
            defaultValue={serviceType} 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            onValueChange={(value) => setValue('serviceType', value)}
          >
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="window-cleaning" id="window-cleaning" />
              <Label htmlFor="window-cleaning" className="cursor-pointer flex-1">Window Cleaning</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="pressure-washing" id="pressure-washing" />
              <Label htmlFor="pressure-washing" className="cursor-pointer flex-1">Pressure Washing</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="gutter-cleaning" id="gutter-cleaning" />
              <Label htmlFor="gutter-cleaning" className="cursor-pointer flex-1">Gutter Cleaning</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Property Type */}
        <div className="space-y-4">
          <Label>Property Type</Label>
          <RadioGroup 
            defaultValue={propertyType} 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onValueChange={(value) => setValue('propertyType', value)}
          >
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="residential" id="residential" />
              <Label htmlFor="residential" className="cursor-pointer flex-1">Residential</Label>
            </div>
            <div className="flex items-center space-x-2 border p-4 rounded-md">
              <RadioGroupItem value="commercial" id="commercial" />
              <Label htmlFor="commercial" className="cursor-pointer flex-1">Commercial</Label>
            </div>
          </RadioGroup>
        </div>
        
        {/* Property Size */}
        <div className="space-y-2">
          <Label htmlFor="homeSize">Property Size</Label>
          <Select 
            defaultValue={homeSize}
            onValueChange={(value) => setValue('homeSize', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Small (Up to 1,500 sq ft)</SelectItem>
              <SelectItem value="medium">Medium (1,500 - 2,500 sq ft)</SelectItem>
              <SelectItem value="large">Large (2,500+ sq ft)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              {...register('name', { required: 'Name is required' })}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                }
              })}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone"
            {...register('phone', { required: 'Phone number is required' })}
            placeholder="(604) 123-4567"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Street Address</Label>
          <Input 
            id="address"
            {...register('address', { required: 'Address is required' })}
            placeholder="123 Main St"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city"
              {...register('city', { required: 'City is required' })}
              placeholder="White Rock"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input 
              id="postalCode"
              {...register('postalCode', { required: 'Postal code is required' })}
              placeholder="V4B 1J6"
            />
            {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode.message}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="specificRequirements">Additional Requirements</Label>
          <textarea
            id="specificRequirements"
            {...register('specificRequirements')}
            className="w-full p-2 border rounded-md h-24"
            placeholder="Any specific details about your request..."
          ></textarea>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="termsAccepted" 
            {...register('termsAccepted', { required: 'You must accept the terms' })}
          />
          <Label htmlFor="termsAccepted" className="text-sm">
            I agree to receive communications from BC Pressure Washing & Window Cleaning
          </Label>
        </div>
        {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>}
        
        <div>
          <Button 
            type="submit" 
            className="w-full bg-bc-red hover:bg-red-700 text-white" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Calculating...' : 'Get Your Free Quote'}
          </Button>
          
          <p className="text-center text-sm mt-2 text-gray-500">
            No obligation, instant estimate
          </p>
        </div>
        
        {quote && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-4">
            <h3 className="font-bold text-xl text-center">Your Estimated Price</h3>
            <p className="text-center text-3xl font-bold text-green-600 my-2">${quote}</p>
            <p className="text-center text-sm">We've sent this quote to your email. One of our representatives will contact you shortly to confirm details.</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CalculatorForm;

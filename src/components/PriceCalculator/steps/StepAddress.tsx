
import React, { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Package2 } from 'lucide-react';

interface StepAddressProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  selectedPackage?: any;
}

declare global {
  interface Window {
    google: any;
    initAutocomplete: () => void;
  }
}

const StepAddress = ({ form, onNext, selectedPackage }: StepAddressProps) => {
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  
  useEffect(() => {
    // Define the initialize function for Google Places Autocomplete
    window.initAutocomplete = () => {
      if (addressInputRef.current && window.google) {
        // Create the autocomplete object
        const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'ca' }, // Restrict to Canada addresses
        });
        
        // When the user selects an address from the dropdown
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          
          if (place.geometry) {
            // Update the form with the selected address
            form.setValue('address', place.formatted_address);
            
            // Try to extract the property size from the place details
            try {
              // This is a simplified example, in reality you'd need to integrate with
              // a property data API to get the square footage based on the address
              // For now, we're just setting a dummy value for demonstration
              const dummySquareFootage = Math.floor(Math.random() * 3000) + 1000;
              form.setValue('square_footage', dummySquareFootage.toString());
              
              // Automatically select the property size based on square footage
              if (dummySquareFootage <= 1500) {
                form.setValue('size', 'small');
              } else if (dummySquareFootage <= 2500) {
                form.setValue('size', 'medium');
              } else if (dummySquareFootage <= 3500) {
                form.setValue('size', 'large');
              } else {
                form.setValue('size', 'x-large');
              }
            } catch (error) {
              console.error("Error getting property details", error);
            }
          }
        });
      }
    };
    
    // Load the Google Maps script if it's not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initAutocomplete`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      
      return () => {
        // Clean up the script when component unmounts
        document.head.removeChild(script);
      };
    } else if (window.google && window.google.maps && window.google.maps.places) {
      // If Google Maps is already loaded, initialize autocomplete directly
      window.initAutocomplete();
    }
  }, [form]);

  const handleContinue = () => {
    form.trigger('address').then((isValid) => {
      if (isValid) {
        onNext();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Where is your property located?</h2>
        <p className="text-gray-600">We serve Surrey, White Rock, and Metro Vancouver areas</p>
      </div>

      {selectedPackage && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 flex items-start space-x-3">
          <Package2 className="text-green-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-green-800">{selectedPackage.title} Selected</h3>
            <p className="text-sm text-green-700">
              You'll save ${selectedPackage.savings} with this package! 
              We just need your address to continue.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What's your address?</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="123 Marine Dr, White Rock, BC" 
                    className="pl-10"
                    {...field} 
                    ref={(e) => {
                      field.ref(e);
                      addressInputRef.current = e;
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Hidden field for square footage */}
        <FormField
          control={form.control}
          name="square_footage"
          render={({ field }) => (
            <input type="hidden" {...field} />
          )}
        />
      </div>

      <div className="pt-4">
        <Button 
          type="button" 
          onClick={handleContinue} 
          className="bg-bc-red hover:bg-red-700 w-full"
        >
          {selectedPackage ? "Continue to Review" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default StepAddress;

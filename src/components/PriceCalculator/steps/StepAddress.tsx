
import React, { useEffect, useRef, useState } from 'react';
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
import { MapPin, Package2, Loader2 } from 'lucide-react';
import { toast } from "sonner";

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
  const [loading, setLoading] = useState(false);
  
  const fetchPropertyData = async (address: string) => {
    setLoading(true);
    try {
      // Format the address for the API
      const formattedAddress = encodeURIComponent(address);
      
      // Make a request to the Estated API
      const response = await fetch(`https://apis.estated.com/v4/property?token=1c2a4f7ff24fae49491027617b66e88c&address=${formattedAddress}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch property data');
      }
      
      const data = await response.json();
      console.log('Estated API response:', data);
      
      // Check if we have valid property data
      if (data.data && data.data.structure && data.data.structure.size_sqft) {
        const squareFootage = data.data.structure.size_sqft;
        form.setValue('square_footage', squareFootage.toString());
        
        // Automatically select the property size based on square footage
        if (squareFootage <= 1500) {
          form.setValue('size', 'small');
        } else if (squareFootage <= 2500) {
          form.setValue('size', 'medium');
        } else if (squareFootage <= 3500) {
          form.setValue('size', 'large');
        } else {
          form.setValue('size', 'x-large');
        }
        
        toast.success(`Found property: ${squareFootage} sq ft`);
        return squareFootage;
      } else {
        throw new Error('No property size data available');
      }
    } catch (error) {
      console.error("Error getting property details", error);
      toast.error("Could not retrieve property size. Using estimate instead.");
      
      // Fallback to a random size if API fails
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
      
      return dummySquareFootage;
    } finally {
      setLoading(false);
    }
  };
  
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
        autocomplete.addListener('place_changed', async () => {
          const place = autocomplete.getPlace();
          
          if (place.geometry) {
            // Update the form with the selected address
            form.setValue('address', place.formatted_address);
            
            // Try to fetch property size from Estated API
            await fetchPropertyData(place.formatted_address);
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
        if (script.parentNode) {
          document.head.removeChild(script);
        }
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
                  {loading && (
                    <Loader2 className="absolute right-3 top-3 h-4 w-4 text-blue-500 animate-spin" />
                  )}
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

        {form.watch('square_footage') && (
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-blue-700">
              Property size: {form.watch('square_footage')} sq ft
            </p>
          </div>
        )}
      </div>

      <div className="pt-4">
        <Button 
          type="button" 
          onClick={handleContinue} 
          className="bg-bc-red hover:bg-red-700 w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching property data...
            </>
          ) : (
            selectedPackage ? "Continue to Review" : "Continue"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepAddress;

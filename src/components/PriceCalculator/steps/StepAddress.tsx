
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

const StepAddress = ({ form, onNext, selectedPackage }: StepAddressProps) => {
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
              <FormLabel>Service Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="123 Marine Dr, White Rock, BC" 
                    defaultValue="Marine Dr, White Rock, BC"
                    className="pl-10"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="pt-4">
        <Button 
          type="button" 
          onClick={handleContinue} 
          className="bg-bc-red hover:bg-red-700 w-full"
        >
          {selectedPackage ? "Continue to Review" : "Continue to Quote"}
        </Button>
      </div>
    </div>
  );
};

export default StepAddress;

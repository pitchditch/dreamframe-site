
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface StepAddonsProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

const StepAddons = ({ form, onNext, onBack }: StepAddonsProps) => {
  const service = form.watch('service');

  // Different addons based on selected service
  const getAddons = () => {
    const commonAddons = [
      {
        id: 'moss-treatment',
        label: 'Moss Treatment',
        price: '+$75',
      },
      {
        id: 'gutter-guards',
        label: 'Gutter Guards',
        price: '+$150',
      },
      {
        id: 'window-seals',
        label: 'Window Seals',
        price: '+$100',
      },
      {
        id: 'exterior-wax',
        label: 'Exterior Wax',
        price: '+$125',
      },
    ];

    // Service specific add-ons
    if (service === 'pressure-washing') {
      return [
        {
          id: 'house-washing',
          label: 'House Washing',
          price: 'Varies by size',
        },
        {
          id: 'driveway-washing',
          label: 'Driveway Washing',
          price: 'Varies by size',
        },
        {
          id: 'deck-washing',
          label: 'Deck Washing',
          price: '+$300',
        },
        {
          id: 'window-cleaning',
          label: 'Window Cleaning',
          price: 'Varies by size',
        },
        ...commonAddons
      ];
    }

    return commonAddons;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Add-ons</h2>
        <p className="text-gray-600">Choose any additional services you would like</p>
      </div>

      <FormField
        control={form.control}
        name="addons"
        render={({ field }) => (
          <FormItem>
            <div className="grid gap-4">
              {getAddons().map((addon) => {
                // Get the current values safely
                const currentValues = field.value || [];
                const isChecked = Array.isArray(currentValues) && currentValues.includes(addon.id);
                
                return (
                  <label
                    key={addon.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:border-bc-red"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const newValues = checked
                            ? [...currentValues, addon.id]
                            : currentValues.filter((value: string) => value !== addon.id);
                          field.onChange(newValues);
                        }}
                      />
                      <span className="font-medium">{addon.label}</span>
                    </div>
                    <span className="text-bc-red">{addon.price}</span>
                  </label>
                );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline">
          Back
        </Button>
        <Button type="button" onClick={onNext} className="bg-bc-red hover:bg-red-700">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepAddons;

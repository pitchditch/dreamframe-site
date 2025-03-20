
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface StepAddonsProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

const StepAddons = ({ form, onNext, onBack }: StepAddonsProps) => {
  const addons = [
    {
      id: 'moss-treatment',
      title: 'Moss Treatment',
      description: 'Apply moss prevention treatment',
      price: '+$75',
    },
    {
      id: 'gutter-guards',
      title: 'Gutter Guards',
      description: 'Install gutter guards to prevent debris',
      price: '+$150',
    },
    {
      id: 'window-seals',
      title: 'Window Seals',
      description: 'Apply sealant to window edges',
      price: '+$100',
    },
    {
      id: 'exterior-wax',
      title: 'Exterior Wax',
      description: 'Apply protective wax coating',
      price: '+$125',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Add-ons</h2>
        <p className="text-gray-600">Choose any additional services you'd like</p>
      </div>

      <FormField
        control={form.control}
        name="addons"
        render={() => (
          <FormItem>
            <div className="grid gap-4">
              {addons.map((addon) => (
                <FormField
                  key={addon.id}
                  control={form.control}
                  name="addons"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={addon.id}
                        className="flex flex-row space-x-3 space-y-0 p-4 border rounded-lg hover:border-bc-red"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(addon.id)}
                            onCheckedChange={(checked) => {
                              const currentValues = field.value || [];
                              return checked
                                ? field.onChange([...currentValues, addon.id])
                                : field.onChange(
                                    currentValues.filter((value: string) => value !== addon.id)
                                  );
                            }}
                          />
                        </FormControl>
                        <div className="flex flex-col">
                          <FormLabel className="text-lg font-semibold cursor-pointer">
                            {addon.title}
                          </FormLabel>
                          <div className="text-gray-600">{addon.description}</div>
                          <div className="text-bc-red font-medium mt-1">{addon.price}</div>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              ))}
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

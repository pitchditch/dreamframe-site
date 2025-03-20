
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

interface StepSizeProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

const StepSize = ({ form, onNext, onBack }: StepSizeProps) => {
  const sizes = [
    {
      id: 'small',
      title: 'Small',
      description: 'Up to 1,500 sq. ft.',
      price: '+$0',
    },
    {
      id: 'medium',
      title: 'Medium',
      description: '1,500 - 2,500 sq. ft.',
      price: '+$50',
    },
    {
      id: 'large',
      title: 'Large',
      description: '2,500 - 3,500 sq. ft.',
      price: '+$100',
    },
    {
      id: 'x-large',
      title: 'Extra Large',
      description: '3,500+ sq. ft.',
      price: '+$150',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select Property Size</h2>
        <p className="text-gray-600">Choose the size of your property</p>
      </div>

      <FormField
        control={form.control}
        name="size"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid gap-4"
              >
                {sizes.map((size) => (
                  <div key={size.id} className="relative">
                    <RadioGroupItem
                      value={size.id}
                      id={size.id}
                      className="peer sr-only"
                    />
                    <FormLabel
                      htmlFor={size.id}
                      className="flex flex-col p-4 border rounded-lg cursor-pointer hover:border-bc-red peer-data-[state=checked]:border-bc-red"
                    >
                      <span className="text-lg font-semibold">{size.title}</span>
                      <span className="text-gray-600">{size.description}</span>
                      <span className="text-bc-red font-medium mt-2">{size.price}</span>
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
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

export default StepSize;

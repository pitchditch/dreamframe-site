
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

interface StepServiceProps {
  form: UseFormReturn<any>;
  onNext: () => void;
}

const StepService = ({ form, onNext }: StepServiceProps) => {
  const services = [
    {
      id: 'window-cleaning',
      title: 'Window Cleaning',
      description: 'Professional window cleaning with streak-free results',
      price: 'Starting at $200',
    },
    {
      id: 'gutter-cleaning',
      title: 'Gutter Cleaning',
      description: 'Thorough gutter cleaning to prevent damage',
      price: 'Starting at $200',
    },
    {
      id: 'pressure-washing',
      title: 'Pressure Washing',
      description: 'High-pressure cleaning for stubborn dirt and grime',
      price: 'Starting at $250',
    },
    {
      id: 'roof-cleaning',
      title: 'Roof Cleaning',
      description: 'Gentle roof cleaning to remove moss and algae',
      price: 'Starting at $350',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Select a Service</h2>
        <p className="text-gray-600">Choose the service that best fits your needs</p>
      </div>

      <FormField
        control={form.control}
        name="service"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid gap-4"
              >
                {services.map((service) => (
                  <div key={service.id} className="relative">
                    <RadioGroupItem
                      value={service.id}
                      id={service.id}
                      className="peer sr-only"
                    />
                    <FormLabel
                      htmlFor={service.id}
                      className="flex flex-col p-4 border rounded-lg cursor-pointer hover:border-bc-red peer-data-[state=checked]:border-bc-red"
                    >
                      <span className="text-lg font-semibold">{service.title}</span>
                      <span className="text-gray-600">{service.description}</span>
                      <span className="text-bc-red font-medium mt-2">{service.price}</span>
                    </FormLabel>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-end">
        <Button type="button" onClick={onNext} className="bg-bc-red hover:bg-red-700">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepService;


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
import { Card } from '@/components/ui/card';

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
    },
    {
      id: 'medium',
      title: 'Medium',
      description: '1,500 - 2,500 sq. ft.',
    },
    {
      id: 'large',
      title: 'Large',
      description: '2,500 - 3,500 sq. ft.',
    },
    {
      id: 'x-large',
      title: 'Extra Large',
      description: '3,500+ sq. ft.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-left">
        <h2 className="text-3xl font-bold mb-2">Choose your property size</h2>
        <p className="text-gray-600 mb-4">This helps us estimate the right price for your needs</p>
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
                className="space-y-2"
              >
                {sizes.map((size) => (
                  <Card key={size.id} className={`p-0 overflow-hidden ${field.value === size.id ? 'border-2 border-blue-500' : 'border border-gray-200'}`}>
                    <FormLabel
                      htmlFor={size.id}
                      className="flex items-center p-4 cursor-pointer w-full"
                    >
                      <div className="flex items-center justify-center w-6 h-6 mr-3">
                        {field.value === size.id ? (
                          <div className="rounded-full w-5 h-5 bg-blue-500 flex items-center justify-center">
                            <div className="rounded-full w-2 h-2 bg-white"></div>
                          </div>
                        ) : (
                          <div className="rounded-full w-5 h-5 border-2 border-gray-300"></div>
                        )}
                        <RadioGroupItem
                          value={size.id}
                          id={size.id}
                          className="sr-only"
                        />
                      </div>
                      <div>
                        <span className="font-medium">{size.title}</span>
                        <p className="text-sm text-gray-500">{size.description}</p>
                      </div>
                    </FormLabel>
                  </Card>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline" className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          Back
        </Button>
        <Button 
          type="button" 
          onClick={onNext} 
          className="bg-blue-500 hover:bg-blue-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepSize;


import React from 'react';
import { Sparkles } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';

interface ServiceOption {
  id: string;
  label: string;
}

interface ServiceOptionsProps {
  serviceId: string;
  options: ServiceOption[];
  form: UseFormReturn<any>;
  multiSelect?: boolean;
  info?: string;
}

const ServiceOptions = ({ serviceId, options, form, multiSelect = false, info }: ServiceOptionsProps) => {
  const fieldName = getFieldName(serviceId);

  // Use memoized callbacks to prevent unnecessary re-renders
  const handleMultiChange = React.useCallback((optionId: string, checked: boolean, currentValues: string[]) => {
    if (checked) {
      return [...currentValues, optionId];
    } else {
      return currentValues.filter((value: string) => value !== optionId);
    }
  }, []);

  return (
    <div className="bg-gray-50 p-4 border-t">
      <p className="font-medium mb-3">What would you like cleaned?</p>
      
      {multiSelect ? (
        <FormField
          control={form.control}
          name={fieldName}
          render={() => (
            <div className="space-y-3">
              {options.map((option) => (
                <FormField
                  key={option.id}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => {
                    // Create a stable checked value
                    const currentValue = field.value || [];
                    const isChecked = Array.isArray(currentValue) && currentValue.includes(option.id);
                    
                    return (
                      <FormItem
                        key={option.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(checked) => {
                              const newValue = handleMultiChange(
                                option.id, 
                                checked === true, 
                                Array.isArray(currentValue) ? [...currentValue] : []
                              );
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          )}
        />
      ) : (
        <FormField
          control={form.control}
          name={fieldName}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="space-y-3"
                >
                  {options.map((option) => (
                    <FormItem
                      key={option.id}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.id} />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">{option.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      {info && (
        <div className="mt-4 bg-blue-50 p-3 rounded-md flex items-start space-x-2">
          <Sparkles size={18} className="text-blue-500 mt-1 flex-shrink-0" />
          <p className="text-sm">{info}</p>
        </div>
      )}
    </div>
  );
};

// Helper function to get the field name based on service ID
const getFieldName = (serviceId: string) => {
  switch (serviceId) {
    case 'window-cleaning':
      return 'cleaning_options.window_cleaning';
    case 'gutter-cleaning':
      return 'cleaning_options.gutter_cleaning';
    case 'pressure-washing':
      return 'cleaning_options.pressure_washing';
    default:
      return '';
  }
};

export default ServiceOptions;

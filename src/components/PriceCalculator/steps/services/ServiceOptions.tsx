
import React from 'react';
import { Sparkles, Home, Droplets, Zap } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { UseFormReturn } from 'react-hook-form';

interface ServiceOption {
  id: string;
  label: string;
  description?: string;
  price?: number;
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

  // Window cleaning specific options
  const windowCleaningOptions = [
    { id: 'interior', label: 'Interior Only', description: 'Clean inside windows only', price: 0.8 },
    { id: 'exterior', label: 'Exterior Only', description: 'Clean outside windows only', price: 1.0 },
    { id: 'both', label: 'Interior & Exterior', description: 'Complete window cleaning', price: 1.5 }
  ];

  const windowAccessibility = [
    { id: 'ground', label: 'Ground Floor Only', price: 1.0 },
    { id: 'second', label: 'Up to 2 Stories', price: 1.3 },
    { id: 'third', label: '3+ Stories', price: 1.6 }
  ];

  const windowCondition = [
    { id: 'standard', label: 'Standard Clean', description: 'Regular maintenance cleaning', price: 1.0 },
    { id: 'dirty', label: 'Extra Dirty', description: 'Heavy buildup, requires extra time', price: 1.4 }
  ];

  // Pressure washing specific options
  const surfaceTypes = [
    { id: 'siding', label: 'House Siding', description: 'Vinyl, wood, or fiber cement', price: 1.0 },
    { id: 'deck', label: 'Deck/Patio', description: 'Wood or composite decking', price: 1.2 },
    { id: 'driveway', label: 'Driveway/Walkway', description: 'Concrete or pavement', price: 0.8 },
    { id: 'fence', label: 'Fence', description: 'Wood or vinyl fencing', price: 0.9 }
  ];

  const surfaceCondition = [
    { id: 'light', label: 'Light Cleaning', description: 'Regular maintenance', price: 1.0 },
    { id: 'moderate', label: 'Moderate Buildup', description: 'Some staining/buildup', price: 1.3 },
    { id: 'heavy', label: 'Heavy Buildup', description: 'Significant staining/growth', price: 1.6 }
  ];

  const handleMultiChange = React.useCallback((optionId: string, checked: boolean, currentValues: string[]) => {
    if (checked) {
      return [...currentValues, optionId];
    } else {
      return currentValues.filter((value: string) => value !== optionId);
    }
  }, []);

  if (serviceId === 'window-cleaning') {
    return (
      <div className="bg-gray-50 p-6 border-t space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-lg">Window Cleaning Options</h3>
        </div>

        {/* Cleaning Type */}
        <FormField
          control={form.control}
          name={`${fieldName}.type`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">What would you like cleaned?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-3"
                >
                  {windowCleaningOptions.map((option) => (
                    <FormItem key={option.id} className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-blue-50">
                      <FormControl>
                        <RadioGroupItem value={option.id} />
                      </FormControl>
                      <div className="flex-1">
                        <FormLabel className="font-medium cursor-pointer">{option.label}</FormLabel>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Window Accessibility */}
        <FormField
          control={form.control}
          name={`${fieldName}.accessibility`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Building Height</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select building height" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {windowAccessibility.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Window Condition */}
        <FormField
          control={form.control}
          name={`${fieldName}.condition`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Window Condition</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-3"
                >
                  {windowCondition.map((option) => (
                    <FormItem key={option.id} className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-blue-50">
                      <FormControl>
                        <RadioGroupItem value={option.id} />
                      </FormControl>
                      <div className="flex-1">
                        <FormLabel className="font-medium cursor-pointer">{option.label}</FormLabel>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Additional Services */}
        <div className="space-y-3">
          <FormLabel className="text-base font-medium">Additional Services</FormLabel>
          
          <FormField
            control={form.control}
            name={`${fieldName}.screen_cleaning`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-3 border rounded-lg">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium">Screen Cleaning</FormLabel>
                  <p className="text-sm text-gray-600">Clean window screens (+$2 per window)</p>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`${fieldName}.track_cleaning`}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-3 border rounded-lg">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium">Track & Sill Cleaning</FormLabel>
                  <p className="text-sm text-gray-600">Deep clean window tracks and sills (+$3 per window)</p>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    );
  }

  if (serviceId === 'pressure-washing') {
    return (
      <div className="bg-gray-50 p-6 border-t space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold text-lg">Pressure Washing Details</h3>
        </div>

        {/* Surface Type */}
        <FormField
          control={form.control}
          name={`${fieldName}.surface_type`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">What surface needs cleaning?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-3"
                >
                  {surfaceTypes.map((option) => (
                    <FormItem key={option.id} className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-green-50">
                      <FormControl>
                        <RadioGroupItem value={option.id} />
                      </FormControl>
                      <div className="flex-1">
                        <FormLabel className="font-medium cursor-pointer">{option.label}</FormLabel>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Surface Area */}
        <FormField
          control={form.control}
          name={`${fieldName}.surface_area`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                Surface Area (sq ft): {field.value || 500}
              </FormLabel>
              <FormControl>
                <div className="px-2">
                  <Slider
                    min={100}
                    max={5000}
                    step={50}
                    value={[field.value || 500]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>100 sq ft</span>
                    <span>5,000 sq ft</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Surface Condition */}
        <FormField
          control={form.control}
          name={`${fieldName}.condition`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">Surface Condition</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-3"
                >
                  {surfaceCondition.map((option) => (
                    <FormItem key={option.id} className="flex items-center space-x-3 space-y-0 p-3 border rounded-lg hover:bg-green-50">
                      <FormControl>
                        <RadioGroupItem value={option.id} />
                      </FormControl>
                      <div className="flex-1">
                        <FormLabel className="font-medium cursor-pointer">{option.label}</FormLabel>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cleaning Frequency */}
        <FormField
          control={form.control}
          name={`${fieldName}.frequency`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-medium">How often do you clean?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cleaning frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="first-time">First time cleaning (most thorough)</SelectItem>
                  <SelectItem value="annual">Annual cleaning</SelectItem>
                  <SelectItem value="bi-annual">Every 6 months</SelectItem>
                  <SelectItem value="regular">Regular maintenance (quarterly)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  // Default rendering for other services
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

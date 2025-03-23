
import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface StepServiceProps {
  form: UseFormReturn<any>;
  onNext: () => void;
}

const StepService = ({ form, onNext }: StepServiceProps) => {
  const { t } = useTranslation();
  const [selectedServices, setSelectedServices] = useState<string[]>(form.getValues('services') || []);

  // Update form when selectedServices change
  useEffect(() => {
    form.setValue('services', selectedServices, { shouldValidate: true });
  }, [selectedServices, form]);

  const services = [
    {
      id: 'window-cleaning',
      title: t('Window Cleaning'),
      description: t('Professional window cleaning with streak-free results'),
      hasOptions: true,
      options: [
        { id: 'outside', label: t('Outside') },
        { id: 'inside', label: t('Inside') },
        { id: 'both', label: t('Both') }
      ]
    },
    {
      id: 'gutter-cleaning',
      title: t('Gutter Cleaning'),
      description: t('Thorough gutter cleaning to prevent damage'),
      hasOptions: true,
      options: [
        { id: 'inside', label: t('Inside the gutter') },
        { id: 'outside', label: t('Outside the gutter') },
        { id: 'both', label: t('Both') }
      ]
    },
    {
      id: 'pressure-washing',
      title: t('Pressure Washing'),
      description: t('High-pressure cleaning for stubborn dirt and grime'),
      hasOptions: true,
      options: [
        { id: 'house-washing', label: t('House washing') },
        { id: 'driveway-washing', label: t('Driveway washing') },
        { id: 'deck-washing', label: t('Deck washing') }
      ],
      multiSelect: true
    },
    {
      id: 'roof-cleaning',
      title: t('Roof Cleaning'),
      description: t('Gentle roof cleaning to remove moss and algae'),
      hasOptions: false
    },
  ];

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices(prev => {
      const isSelected = prev.includes(serviceId);
      return isSelected 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId];
    });
  };

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

  return (
    <div className="space-y-6">
      <div className="text-left">
        <h2 className="text-3xl font-bold mb-2">{t('Choose your services')}</h2>
        <p className="text-gray-600 mb-4">{t('Select one or more services you need')}</p>
      </div>

      <div className="space-y-6">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          const fieldName = getFieldName(service.id);
          
          return (
            <div key={service.id} className="space-y-2">
              <Card 
                className={`p-0 overflow-hidden ${isSelected ? 'border-2 border-blue-500' : 'border border-gray-200'}`}
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => toggleServiceSelection(service.id)}
                >
                  <div className="flex items-center mb-2">
                    <div className="flex items-center justify-center w-6 h-6 mr-3">
                      <Checkbox 
                        checked={isSelected}
                        // Don't use onCheckedChange here to avoid duplicate state updates
                        className="data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
                      />
                    </div>
                    <span className="font-semibold text-lg">{service.title}</span>
                  </div>
                  <p className="text-gray-600 ml-9">{service.description}</p>
                </div>

                {isSelected && service.hasOptions && (
                  <div className="bg-gray-50 p-4 border-t">
                    <p className="font-medium mb-3">{t('What would you like cleaned?')}</p>
                    
                    {service.multiSelect ? (
                      <FormField
                        control={form.control}
                        name={fieldName}
                        render={() => (
                          <div className="space-y-3">
                            {service.options.map((option) => (
                              <FormField
                                key={option.id}
                                control={form.control}
                                name={fieldName}
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={option.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(option.id)}
                                          onCheckedChange={(checked) => {
                                            const currentValue = field.value || [];
                                            const newValue = checked
                                              ? [...currentValue, option.id]
                                              : currentValue.filter(
                                                  (value: string) => value !== option.id
                                                );
                                            field.onChange(newValue);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
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
                                value={field.value}
                                className="space-y-3"
                              >
                                {service.options.map((option) => (
                                  <FormItem
                                    key={option.id}
                                    className="flex items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <RadioGroupItem value={option.id} />
                                    </FormControl>
                                    <FormLabel className="font-normal">{option.label}</FormLabel>
                                  </FormItem>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {service.id === 'window-cleaning' && (
                      <div className="mt-4 bg-blue-50 p-3 rounded-md flex items-start space-x-2">
                        <Sparkles size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                        <p className="text-sm">
                          {t('Our water purification technology ensures that windows are spot free and streak free.')}
                        </p>
                      </div>
                    )}
                    
                    {service.id === 'gutter-cleaning' && (
                      <div className="mt-4 bg-blue-50 p-3 rounded-md flex items-start space-x-2">
                        <Sparkles size={18} className="text-blue-500 mt-1 flex-shrink-0" />
                        <p className="text-sm">
                          {t('With our equipment and professional training, we\'ll take the worry out of cleaning your gutters.')}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button 
          type="button" 
          onClick={onNext} 
          disabled={selectedServices.length === 0} 
          className="bg-blue-500 hover:bg-blue-600"
        >
          {t('Continue')}
        </Button>
      </div>
    </div>
  );
};

export default StepService;

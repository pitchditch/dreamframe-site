
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import ServiceCard from './services/ServiceCard';
import ServiceOptions from './services/ServiceOptions';
import { services } from './services/serviceData';

interface StepServiceProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

const StepService = ({ form, onNext, onBack, formData, updateFormData }: StepServiceProps) => {
  // Get initial services from form, defaulting to empty array
  const initialServices = form.getValues('services') || [];
  const [selectedServices, setSelectedServices] = useState<string[]>(initialServices);

  const toggleServiceSelection = (serviceId: string) => {
    // Create a new array (don't mutate state directly)
    const newSelection = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];
    
    // Update local state
    setSelectedServices(newSelection);
    
    // Update form value
    form.setValue('services', newSelection, { shouldValidate: true });
    updateFormData({ ...formData, services: newSelection });
  };

  return (
    <div className="space-y-6">
      <div className="text-left">
        <h2 className="text-3xl font-bold mb-2">Choose your services</h2>
        <p className="text-gray-600 mb-4">Select one or more services you need</p>
      </div>

      <div className="space-y-6">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          
          return (
            <ServiceCard 
              key={service.id}
              service={service}
              isSelected={isSelected}
              onToggle={toggleServiceSelection}
            >
              {service.options && (
                <ServiceOptions
                  serviceId={service.id}
                  options={service.options}
                  form={form}
                  multiSelect={service.multiSelect}
                  info={service.info}
                />
              )}
            </ServiceCard>
          );
        })}
      </div>

      <div className="flex justify-between">
        <Button 
          type="button" 
          onClick={onBack} 
          variant="outline"
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={onNext} 
          disabled={selectedServices.length === 0} 
          className="bg-blue-500 hover:bg-blue-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepService;

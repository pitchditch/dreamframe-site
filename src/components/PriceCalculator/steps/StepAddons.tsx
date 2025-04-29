
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem, FormControl, FormLabel } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Tag, Info } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface StepAddonsProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

const addonData = {
  'window-cleaning': [
    { id: 'window-seals', label: 'Window Seal Cleaning', price: 100, tooltip: 'Remove dirt and grime from window seals and tracks for better operation' },
    { id: 'screen-cleaning', label: 'Screen Cleaning', price: 75, tooltip: 'Deep clean all window screens to remove dust and debris' },
    { id: 'hard-water-removal', label: 'Hard Water Stain Removal', price: 125, tooltip: 'Special treatment to remove stubborn water stains from glass' }
  ],
  'gutter-cleaning': [
    { id: 'gutter-guards', label: 'Gutter Guards Installation', price: 150, tooltip: 'Prevent future clogs with protective mesh guards' },
    { id: 'downspout-flush', label: 'Downspout Flushing', price: 75, tooltip: 'Clear blockages and ensure proper water flow in downspouts' },
    { id: 'gutter-repairs', label: 'Minor Gutter Repairs', price: 100, tooltip: 'Fix small holes, secure loose brackets, and seal leaks' }
  ],
  'pressure-washing': [
    { id: 'mildew-treatment', label: 'Anti-Mildew Treatment', price: 85, tooltip: 'Specialized solution to prevent mildew return for up to 6 months' },
    { id: 'exterior-wax', label: 'Protective Sealant Application', price: 125, tooltip: 'Apply protective coating to maintain clean surfaces longer' },
    { id: 'concrete-sealing', label: 'Concrete Sealing', price: 200, tooltip: 'Seal concrete surfaces to prevent staining and water damage' }
  ],
  'roof-cleaning': [
    { id: 'moss-treatment', label: 'Moss Prevention Treatment', price: 75, tooltip: 'Treatment that prevents moss regrowth for 12-24 months' },
    { id: 'gutter-guard-installation', label: 'Gutter Guard Installation', price: 150, tooltip: 'Prevent debris buildup in gutters with protective mesh' },
    { id: 'roof-inspection', label: 'Detailed Roof Inspection', price: 90, tooltip: 'Professional inspection to identify potential roof issues' }
  ]
};

const StepAddons = ({ form, onNext, onBack, formData, updateFormData }: StepAddonsProps) => {
  const selectedServices = formData.services || form.getValues().services || [];
  const addons = formData.addons || [];
  
  // Only show add-ons for the services that were selected
  const relevantAddons = selectedServices.reduce((acc: any[], service: string) => {
    const serviceAddons = addonData[service] || [];
    return [...acc, ...serviceAddons];
  }, []);

  const handleAddonChange = (addonId: string, checked: boolean) => {
    const currentAddons = [...(formData.addons || [])];
    const newAddons = checked
      ? [...currentAddons, addonId]
      : currentAddons.filter(id => id !== addonId);
    
    updateFormData({ ...formData, addons: newAddons });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2">Enhance Your Service</h2>
        <p className="text-gray-600 mb-6">
          Choose from our recommended add-ons for your selected services to enhance results and add value.
        </p>
      </div>

      {relevantAddons.length > 0 ? (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-blue-500" />
            <h3 className="text-xl font-medium">Recommended Add-ons</h3>
          </div>
          
          <Separator className="mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relevantAddons.map((addon) => (
              <div key={addon.id} className="flex items-start space-x-3 p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">
                <FormField
                  control={form.control}
                  name="addons"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(addon.id)}
                            onCheckedChange={(checked) => {
                              const currentValue = [...(field.value || [])];
                              if (checked) {
                                field.onChange([...currentValue, addon.id]);
                                handleAddonChange(addon.id, true);
                              } else {
                                field.onChange(currentValue.filter((value) => value !== addon.id));
                                handleAddonChange(addon.id, false);
                              }
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <div className="flex items-center gap-1">
                            <FormLabel className="font-medium cursor-pointer">
                              {addon.label}
                            </FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info size={14} className="text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-[200px]">
                                <p>{addon.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <p className="text-sm text-blue-600 font-medium">+${addon.price}</p>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              All add-ons are applied after the main service for optimal results. Add-ons are priced per service and may vary based on property size.
            </p>
          </div>
        </Card>
      ) : (
        <div className="bg-gray-50 p-6 rounded-md text-center">
          <p className="text-gray-600">No additional services available for your selection.</p>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button 
          type="button" 
          onClick={onBack} 
          variant="outline" 
          className="flex items-center"
        >
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default StepAddons;

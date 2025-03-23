
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
import { Building, Home } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface StepPropertyTypeProps {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

const StepPropertyType = ({ form, onNext, onBack }: StepPropertyTypeProps) => {
  const { t } = useTranslation();
  
  const propertyTypes = [
    {
      id: 'residential',
      title: t('Residential'),
      description: t('Home, apartment, or residential property'),
      icon: <Home className="h-6 w-6 text-bc-red" />,
    },
    {
      id: 'commercial',
      title: t('Commercial'),
      description: t('Office, storefront, or business property'),
      icon: <Building className="h-6 w-6 text-bc-red" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{t("Property Type")}</h2>
        <p className="text-gray-600">{t("Select the type of property for the service")}</p>
      </div>

      <FormField
        control={form.control}
        name="propertyType"
        render={({ field }) => (
          <FormItem className="space-y-4">
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid gap-4"
              >
                {propertyTypes.map((type) => (
                  <div key={type.id} className="relative">
                    <RadioGroupItem
                      value={type.id}
                      id={type.id}
                      className="peer sr-only"
                    />
                    <FormLabel
                      htmlFor={type.id}
                      className="flex p-4 border rounded-lg cursor-pointer hover:border-bc-red peer-data-[state=checked]:border-bc-red"
                    >
                      <div className="mr-4 flex items-center justify-center">
                        {type.icon}
                      </div>
                      <div>
                        <span className="text-lg font-semibold block">{type.title}</span>
                        <span className="text-gray-600">{type.description}</span>
                      </div>
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
          {t("Back")}
        </Button>
        <Button type="button" onClick={onNext} className="bg-bc-red hover:bg-red-700">
          {t("Continue")}
        </Button>
      </div>
    </div>
  );
};

export default StepPropertyType;



import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';

interface StepReviewProps {
  form: UseFormReturn<any>;
  onBack: () => void;
}

const serviceLabels: Record<string, string> = {
  'window-cleaning': 'Window Cleaning',
  'gutter-cleaning': 'Gutter Cleaning',
  'pressure-washing': 'Pressure Washing',
  'roof-cleaning': 'Roof Cleaning',
};

const sizeLabels: Record<string, { label: string, price: number }> = {
  'small': { label: 'Small (Up to 1,500 sq. ft.)', price: 0 },
  'medium': { label: 'Medium (1,500 - 2,500 sq. ft.)', price: 50 },
  'large': { label: 'Large (2,500 - 3,500 sq. ft.)', price: 100 },
  'x-large': { label: 'Extra Large (3,500+ sq. ft.)', price: 150 },
};

const addonLabels: Record<string, { label: string, price: number }> = {
  'moss-treatment': { label: 'Moss Treatment', price: 75 },
  'gutter-guards': { label: 'Gutter Guards', price: 150 },
  'window-seals': { label: 'Window Seals', price: 100 },
  'exterior-wax': { label: 'Exterior Wax', price: 125 },
};

const baseServicePrices: Record<string, number> = {
  'window-cleaning': 200,
  'gutter-cleaning': 200,
  'pressure-washing': 250,
  'roof-cleaning': 350,
};

const StepReview = ({ form, onBack }: StepReviewProps) => {
  const formValues = form.getValues();
  
  const basePrice = baseServicePrices[formValues.service] || 0;
  const sizePrice = sizeLabels[formValues.size]?.price || 0;
  
  const addonsTotal = (formValues.addons || []).reduce(
    (total: number, addon: string) => total + (addonLabels[addon]?.price || 0),
    0
  );
  
  const totalPrice = basePrice + sizePrice + addonsTotal;

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not specified';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Review Your Order</h2>
        <p className="text-gray-600">Please review your information before submitting</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">Selected Service</h3>
            <p>{serviceLabels[formValues.service] || 'Not selected'}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold">Property Size</h3>
            <p>{sizeLabels[formValues.size]?.label || 'Not selected'}</p>
          </div>
          
          {formValues.addons && formValues.addons.length > 0 && (
            <div>
              <h3 className="text-lg font-bold">Add-ons</h3>
              <ul className="list-disc list-inside">
                {formValues.addons.map((addon: string) => (
                  <li key={addon}>{addonLabels[addon]?.label}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-bold">Contact Information</h3>
            <p><span className="font-medium">Name:</span> {formValues.fullName}</p>
            <p><span className="font-medium">Email:</span> {formValues.email}</p>
            <p><span className="font-medium">Phone:</span> {formValues.phone}</p>
            <p><span className="font-medium">Service Date:</span> {formatDate(formValues.date)}</p>
            <p><span className="font-medium">Address:</span> {formValues.address}</p>
            {formValues.notes && (
              <p><span className="font-medium">Notes:</span> {formValues.notes}</p>
            )}
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-bold">Price Breakdown</h3>
            <div className="flex justify-between">
              <p>Base Price ({serviceLabels[formValues.service]})</p>
              <p>${basePrice}</p>
            </div>
            <div className="flex justify-between">
              <p>Size ({sizeLabels[formValues.size]?.label})</p>
              <p>+${sizePrice}</p>
            </div>
            {formValues.addons && formValues.addons.length > 0 && (
              <>
                <p className="font-medium">Add-ons:</p>
                {formValues.addons.map((addon: string) => (
                  <div key={addon} className="flex justify-between pl-4">
                    <p>{addonLabels[addon]?.label}</p>
                    <p>+${addonLabels[addon]?.price}</p>
                  </div>
                ))}
              </>
            )}
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
              <p>Total Estimated Price</p>
              <p>${totalPrice}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" onClick={onBack} variant="outline">
          Back
        </Button>
        <Button type="submit" className="bg-bc-red hover:bg-red-700">
          Submit Request
        </Button>
      </div>
    </div>
  );
};

export default StepReview;

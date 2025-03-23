
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

const propertyLabels: Record<string, string> = {
  'residential': 'Residential',
  'commercial': 'Commercial',
};

const sizeLabels: Record<string, { label: string }> = {
  'small': { label: 'Small (Up to 1,500 sq. ft.)' },
  'medium': { label: 'Medium (1,500 - 2,500 sq. ft.)' },
  'large': { label: 'Large (2,500 - 3,500 sq. ft.)' },
  'x-large': { label: 'Extra Large (3,500+ sq. ft.)' },
};

const addonLabels: Record<string, { label: string, price: number }> = {
  'moss-treatment': { label: 'Moss Treatment', price: 75 },
  'gutter-guards': { label: 'Gutter Guards', price: 150 },
  'window-seals': { label: 'Window Seals', price: 100 },
  'exterior-wax': { label: 'Exterior Wax', price: 125 },
};

// Pricing structure for different services and property sizes
const pricingData = {
  'window-cleaning': {
    'small': { outside: 300, inside: 300, both: 547.20 },
    'medium': { outside: 357.30, inside: 411.30, both: 768.60 },
    'large': { outside: 431.10, inside: 521.10, both: 952.20 },
    'x-large': { message: 'Please contact us for an on-site estimate.' }
  },
  'gutter-cleaning': {
    'small': { inside: 300, outside: 154, both: 454 },
    'medium': { inside: 386.10, outside: 300, both: 682.20 },
    'large': { inside: 465.30, outside: 357.30, both: 822.60 },
    'x-large': { message: 'Please contact us for an on-site estimate.' }
  },
  'pressure-washing': {
    'small': { 
      house: 414.30, 
      driveway: 300, 
      deck: 300,
      houseWithWindows: 664.20,
      driveWithHouse: 635.40
    },
    'medium': { 
      house: 627.30, 
      driveway: 314.10, 
      deck: 300,
      houseWithWindows: 984.60,
      driveWithHouse: 941.10
    },
    'large': { 
      house: 888.30, 
      driveway: 384.30, 
      deck: 300,
      houseWithWindows: 1319.40,
      driveWithHouse: 1272.60
    },
    'x-large': { message: 'Please contact us for an on-site estimate.' }
  },
  'roof-cleaning': {
    message: 'All roof cleaning prices require an on-site estimate, as prices vary based on condition, size and slope of roof.'
  }
};

const StepReview = ({ form, onBack }: StepReviewProps) => {
  const formValues = form.getValues();
  
  // Determine pricing based on service, size, and options
  const getServicePrice = () => {
    const { service, size, addons = [] } = formValues;
    
    // Special case for roof cleaning
    if (service === 'roof-cleaning') {
      return {
        subtotal: 0,
        totalPrice: 0,
        priceNote: pricingData['roof-cleaning'].message
      };
    }
    
    // For extra large properties
    if (size === 'x-large') {
      return {
        subtotal: 0,
        totalPrice: 0,
        priceNote: pricingData[service][size].message
      };
    }
    
    // For window cleaning
    if (service === 'window-cleaning') {
      return {
        basePrice: pricingData[service][size].both,
        subtotal: pricingData[service][size].both,
        totalPrice: pricingData[service][size].both * (formValues.propertyType === 'commercial' ? 1.5 : 1.0),
        priceBreakdown: {
          outsideWindows: pricingData[service][size].outside,
          insideWindows: pricingData[service][size].inside
        }
      };
    }
    
    // For gutter cleaning
    if (service === 'gutter-cleaning') {
      return {
        basePrice: pricingData[service][size].both,
        subtotal: pricingData[service][size].both,
        totalPrice: pricingData[service][size].both * (formValues.propertyType === 'commercial' ? 1.5 : 1.0),
        priceBreakdown: {
          insideGutters: pricingData[service][size].inside,
          outsideGutters: pricingData[service][size].outside
        }
      };
    }
    
    // For pressure washing
    if (service === 'pressure-washing') {
      // Check if additional services were selected as addons
      const hasHouseWashing = addons.includes('house-washing');
      const hasWindowCleaning = addons.includes('window-cleaning');
      const hasDrivewayWashing = addons.includes('driveway-washing');
      const hasDeckWashing = addons.includes('deck-washing');
      
      let basePrice = 0;
      const priceBreakdown: Record<string, number> = {};
      
      if (hasHouseWashing) {
        basePrice += hasWindowCleaning 
          ? pricingData[service][size].houseWithWindows 
          : pricingData[service][size].house;
        
        priceBreakdown["House Washing"] = hasWindowCleaning 
          ? pricingData[service][size].houseWithWindows 
          : pricingData[service][size].house;
      }
      
      if (hasDrivewayWashing) {
        const drivewayPrice = hasHouseWashing 
          ? pricingData[service][size].driveWithHouse - pricingData[service][size].house
          : pricingData[service][size].driveway;
        
        basePrice += drivewayPrice;
        priceBreakdown["Driveway Washing"] = drivewayPrice;
      }
      
      if (hasDeckWashing) {
        basePrice += pricingData[service][size].deck;
        priceBreakdown["Deck Washing"] = pricingData[service][size].deck;
      }
      
      return {
        basePrice,
        subtotal: basePrice,
        totalPrice: basePrice * (formValues.propertyType === 'commercial' ? 1.5 : 1.0),
        priceBreakdown
      };
    }
    
    // Default return
    return {
      subtotal: 0,
      totalPrice: 0,
      priceNote: "Please contact us for a detailed quote."
    };
  };
  
  const pricing = getServicePrice();
  const propertyMultiplier = formValues.propertyType === 'commercial' ? 1.5 : 1.0;
  
  // Add on prices
  const addonsTotal = (formValues.addons || []).reduce(
    (total: number, addon: string) => {
      // Skip service-specific addons that were handled in getServicePrice
      if (['house-washing', 'window-cleaning', 'driveway-washing', 'deck-washing'].includes(addon)) {
        return total;
      }
      return total + (addonLabels[addon]?.price || 0);
    },
    0
  );
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not specified';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Review Your Quote</h2>
        <p className="text-gray-600">Please review your information before submitting</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold">Selected Service</h3>
            <p>{serviceLabels[formValues.service] || 'Not selected'}</p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold">Property Type</h3>
            <p>{propertyLabels[formValues.propertyType] || 'Not selected'}</p>
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
                  <li key={addon}>{addonLabels[addon]?.label || addon}</li>
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
            
            {pricing.priceNote ? (
              <div className="p-3 bg-yellow-50 rounded-lg my-2">
                <p>{pricing.priceNote}</p>
              </div>
            ) : (
              <>
                {pricing.priceBreakdown && Object.entries(pricing.priceBreakdown).length > 0 && (
                  <>
                    {Object.entries(pricing.priceBreakdown).map(([service, price]) => (
                      <div key={service} className="flex justify-between">
                        <p>{service}</p>
                        <p>${formatPrice(price)}</p>
                      </div>
                    ))}
                  </>
                )}
                
                {addonsTotal > 0 && formValues.addons && (
                  <>
                    <p className="font-medium mt-2">Add-ons:</p>
                    {formValues.addons.filter(addon => !['house-washing', 'window-cleaning', 'driveway-washing', 'deck-washing'].includes(addon)).map((addon: string) => (
                      <div key={addon} className="flex justify-between pl-4">
                        <p>{addonLabels[addon]?.label}</p>
                        <p>+${addonLabels[addon]?.price}</p>
                      </div>
                    ))}
                  </>
                )}
                
                <div className="flex justify-between pt-2">
                  <p>Subtotal</p>
                  <p>${formatPrice(pricing.subtotal + addonsTotal)}</p>
                </div>
                
                {formValues.propertyType === 'commercial' && (
                  <div className="flex justify-between">
                    <p>Commercial Property (1.5x)</p>
                    <p>×1.5</p>
                  </div>
                )}
                
                <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                  <p>Total Estimated Price</p>
                  <p>${formatPrice((pricing.subtotal + addonsTotal) * propertyMultiplier)}</p>
                </div>
              </>
            )}
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

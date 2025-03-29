
import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tag } from 'lucide-react';

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
  'small': { label: 'Small (Up to 1,800 sq. ft.)' },
  'medium': { label: 'Medium (1,800 - 2,800 sq. ft.)' },
  'large': { label: 'Large (2,800 - 3,500 sq. ft.)' },
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
  const cleaningOptions = formValues.cleaning_options || {};
  const services = formValues.services || [];
  const [packageDiscount, setPackageDiscount] = useState<{
    applied: boolean;
    percent: number;
    packageName: string;
  }>({
    applied: false,
    percent: 0,
    packageName: ''
  });
  
  useEffect(() => {
    // Check if a package was selected from the packages page
    const selectedPackage = sessionStorage.getItem('selectedPackage');
    if (selectedPackage) {
      try {
        const packageData = JSON.parse(selectedPackage);
        if (packageData.discountApplied) {
          setPackageDiscount({
            applied: true,
            percent: packageData.discountPercent || 10,
            packageName: packageData.title || 'Selected Package'
          });
        }
      } catch (e) {
        console.error('Error parsing selected package', e);
      }
    }
  }, []);
  
  // Determine pricing based on services, size, and options
  const calculateServicePrices = () => {
    const { size, addons = [] } = formValues;
    const hasWindowCleaning = services.includes('window-cleaning');
    const hasGutterCleaning = services.includes('gutter-cleaning');
    const hasPressureWashing = services.includes('pressure-washing');
    const hasRoofCleaning = services.includes('roof-cleaning');
    
    let totalPrice = 0;
    let totalMessage = '';
    const priceBreakdown: Record<string, number> = {};
    
    // Special case for x-large properties
    if (size === 'x-large') {
      return {
        subtotal: 0,
        totalPrice: 0,
        priceNote: 'Please contact us for an on-site estimate for properties larger than 3,500 sq. ft.'
      };
    }
    
    // Calculate window cleaning price
    if (hasWindowCleaning) {
      const option = cleaningOptions.window_cleaning || 'both';
      const price = pricingData['window-cleaning'][size][option];
      
      totalPrice += price;
      priceBreakdown[`Window Cleaning (${option === 'outside' ? 'Outside Only' : option === 'inside' ? 'Inside Only' : 'Inside & Outside'})`] = price;
    }
    
    // Calculate gutter cleaning price
    if (hasGutterCleaning) {
      const option = cleaningOptions.gutter_cleaning || 'both';
      const price = pricingData['gutter-cleaning'][size][option];
      
      totalPrice += price;
      priceBreakdown[`Gutter Cleaning (${option === 'inside' ? 'Inside Only' : option === 'outside' ? 'Outside Only' : 'Inside & Outside'})`] = price;
    }
    
    // Calculate pressure washing price
    if (hasPressureWashing) {
      const options = cleaningOptions.pressure_washing || [];
      const hasHouseWashing = options.includes('house-washing');
      const hasDrivewayWashing = options.includes('driveway-washing');
      const hasDeckWashing = options.includes('deck-washing');
      
      if (hasHouseWashing) {
        // Check if window cleaning is also selected
        const price = hasWindowCleaning && cleaningOptions.window_cleaning === 'outside'
          ? pricingData['pressure-washing'][size].houseWithWindows
          : pricingData['pressure-washing'][size].house;
        
        totalPrice += price;
        priceBreakdown[`House Washing${hasWindowCleaning && cleaningOptions.window_cleaning === 'outside' ? ' (with window cleaning)' : ''}`] = price;
      }
      
      if (hasDrivewayWashing) {
        // If house washing is also selected, use the combined price
        if (hasHouseWashing) {
          const combinedPrice = pricingData['pressure-washing'][size].driveWithHouse;
          // Subtract the house price we already added
          const housePriceAlone = hasWindowCleaning && cleaningOptions.window_cleaning === 'outside'
            ? pricingData['pressure-washing'][size].houseWithWindows
            : pricingData['pressure-washing'][size].house;
          
          const drivePrice = combinedPrice - housePriceAlone;
          totalPrice += drivePrice;
          priceBreakdown["Driveway Washing (with house washing)"] = drivePrice;
        } else {
          totalPrice += pricingData['pressure-washing'][size].driveway;
          priceBreakdown["Driveway Washing"] = pricingData['pressure-washing'][size].driveway;
        }
      }
      
      if (hasDeckWashing) {
        totalPrice += pricingData['pressure-washing'][size].deck;
        priceBreakdown["Deck Washing"] = pricingData['pressure-washing'][size].deck;
      }
    }
    
    // Special message for roof cleaning
    if (hasRoofCleaning) {
      totalMessage = pricingData['roof-cleaning'].message;
    }
    
    // Add addon prices
    const addonsTotal = (formValues.addons || []).reduce(
      (total: number, addon: string) => {
        // Skip service-specific addons that were handled in getServicePrice
        if (['house-washing', 'window-cleaning', 'driveway-washing', 'deck-washing'].includes(addon)) {
          return total;
        }
        const addonPrice = addonLabels[addon]?.price || 0;
        if (addonPrice > 0) {
          priceBreakdown[addonLabels[addon]?.label || addon] = addonPrice;
        }
        return total + addonPrice;
      },
      0
    );
    
    totalPrice += addonsTotal;
    
    // Apply commercial property multiplier
    const propertyMultiplier = formValues.propertyType === 'commercial' ? 1.5 : 1.0;
    
    // Apply package discount if applicable
    const discountAmount = packageDiscount.applied ? (totalPrice * (packageDiscount.percent / 100)) : 0;
    
    return {
      subtotal: totalPrice,
      discount: discountAmount,
      totalPrice: (totalPrice - discountAmount) * propertyMultiplier,
      priceBreakdown,
      priceNote: totalMessage
    };
  };
  
  const pricing = calculateServicePrices();
  const propertyMultiplier = formValues.propertyType === 'commercial' ? 1.5 : 1.0;
  
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
      <div className="text-left">
        <h2 className="text-3xl font-bold mb-2">Review your details</h2>
        <p className="text-gray-600 mb-4">Please review your information before submitting</p>
      </div>

      <Card className="p-6 border border-gray-200">
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Your estimated price:</h3>
          <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center border-b border-gray-200">
            <span className="text-lg font-medium">Total</span>
            {pricing.priceNote ? (
              <span className="text-lg font-bold">{pricing.priceNote}</span>
            ) : (
              <span className="text-xl font-bold">${formatPrice(pricing.totalPrice)}</span>
            )}
          </div>
          
          {packageDiscount.applied && (
            <div className="mt-2 flex items-center gap-2 text-green-600">
              <Tag size={16} />
              <span className="text-sm font-medium">
                {packageDiscount.percent}% discount applied from {packageDiscount.packageName}
              </span>
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-3">
            Your final price will be confirmed before your appointment and there is no need to pay until the job is complete.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2">Service Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Services:</span>
                <span className="text-right">
                  {services.map(service => serviceLabels[service]).join(', ') || 'Not selected'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Property type:</span>
                <span>{propertyLabels[formValues.propertyType] || 'Not selected'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Property size:</span>
                <span>{sizeLabels[formValues.size]?.label || 'Not selected'}</span>
              </div>
              
              {services.includes('window-cleaning') && cleaningOptions.window_cleaning && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Window cleaning option:</span>
                  <span>{cleaningOptions.window_cleaning === 'both' ? 'Inside & Outside' : 
                         cleaningOptions.window_cleaning === 'inside' ? 'Inside Only' : 'Outside Only'}</span>
                </div>
              )}
              
              {services.includes('gutter-cleaning') && cleaningOptions.gutter_cleaning && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Gutter cleaning option:</span>
                  <span>{cleaningOptions.gutter_cleaning === 'both' ? 'Inside & Outside' : 
                         cleaningOptions.gutter_cleaning === 'inside' ? 'Inside Only' : 'Outside Only'}</span>
                </div>
              )}
              
              {services.includes('pressure-washing') && cleaningOptions.pressure_washing && cleaningOptions.pressure_washing.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Areas to clean:</span>
                  <span className="text-right">
                    {cleaningOptions.pressure_washing.map((option: string) => 
                      option === 'house-washing' ? 'House' : 
                      option === 'driveway-washing' ? 'Driveway' : 
                      option === 'deck-washing' ? 'Deck' : option
                    ).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {formValues.addons && formValues.addons.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Add-ons</h3>
              <ul className="list-disc list-inside text-gray-700">
                {formValues.addons.filter((addon: string) => 
                  !['house-washing', 'driveway-washing', 'deck-washing'].includes(addon)
                ).map((addon: string) => (
                  <li key={addon}>{addonLabels[addon]?.label || addon}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span>{formValues.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="break-all">{formValues.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span>{formValues.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span>{formatDate(formValues.date)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="text-right break-words max-w-[60%]">{formValues.address}</span>
              </div>
              {formValues.notes && (
                <div className="flex flex-col">
                  <span className="text-gray-600 mb-1">Additional notes:</span>
                  <span className="text-sm bg-gray-50 p-2 rounded">{formValues.notes}</span>
                </div>
              )}
            </div>
          </div>
          
          {!pricing.priceNote && pricing.priceBreakdown && Object.entries(pricing.priceBreakdown).length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Price Breakdown</h3>
              <div className="border rounded-md overflow-hidden">
                {Object.entries(pricing.priceBreakdown).map(([service, price]) => (
                  <div key={service} className="flex justify-between px-4 py-2 border-b">
                    <p>{service}</p>
                    <p>${formatPrice(price)}</p>
                  </div>
                ))}
                
                <div className="flex justify-between px-4 py-2 border-b bg-gray-50">
                  <p>Subtotal</p>
                  <p>${formatPrice(pricing.subtotal)}</p>
                </div>
                
                {packageDiscount.applied && (
                  <div className="flex justify-between px-4 py-2 border-b bg-green-50 text-green-700">
                    <p>{packageDiscount.packageName} Discount ({packageDiscount.percent}%)</p>
                    <p>-${formatPrice(pricing.discount || 0)}</p>
                  </div>
                )}
                
                {formValues.propertyType === 'commercial' && (
                  <div className="flex justify-between px-4 py-2 border-b bg-gray-50">
                    <p>Commercial Property Factor</p>
                    <p>×1.5</p>
                  </div>
                )}
                
                <div className="flex justify-between px-4 py-2 bg-gray-100 font-semibold">
                  <p>Total Estimated Price</p>
                  <p>${formatPrice(pricing.totalPrice)}</p>
                </div>
              </div>
              
              {packageDiscount.applied && (
                <div className="mt-2 bg-green-50 text-green-800 p-2 rounded-md border border-green-200 flex items-center">
                  <Badge variant="success" className="mr-2 bg-green-600">SAVINGS</Badge>
                  <p className="text-sm">
                    You're saving ${formatPrice(pricing.discount || 0)} with your {packageDiscount.packageName} discount!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      <div className="flex justify-between">
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
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600"
        >
          Submit Request
        </Button>
      </div>
    </div>
  );
};

export default StepReview;

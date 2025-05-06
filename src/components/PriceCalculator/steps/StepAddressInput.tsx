
import React from 'react';
import { trackFormFieldInteraction } from '@/utils/analytics';

interface StepAddressInputProps {
  address: string;
  setAddress: (address: string) => void;
  contact: {
    name: string;
    phone: string;
    email: string;
    referredBy: string;
    notes: string;
  };
  setContact: (contact: any) => void;
  onNextStep: () => void;
}

const StepAddressInput: React.FC<StepAddressInputProps> = ({
  address,
  setAddress,
  contact,
  setContact,
  onNextStep,
}) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Step 1: Where do you need service?</h3>
      <p className="mb-4 text-gray-600">
        Enter your address to get a customized quote for your property.
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Street Address</label>
          <input 
            type="text" 
            value={address} 
            onChange={e => {
              setAddress(e.target.value);
              trackFormFieldInteraction('PriceCalculator', 'Street Address', 'change');
            }} 
            onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Street Address', 'focus')}
            onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Street Address', 'blur')}
            className="w-full border p-3 rounded-lg" 
            placeholder="1234 Main St" 
            autoFocus 
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input 
              type="text" 
              value={contact.name || ''} 
              onChange={e => {
                setContact({...contact, name: e.target.value});
                trackFormFieldInteraction('PriceCalculator', 'City', 'change');
              }} 
              onFocus={() => trackFormFieldInteraction('PriceCalculator', 'City', 'focus')}
              onBlur={() => trackFormFieldInteraction('PriceCalculator', 'City', 'blur')}
              className="w-full border p-3 rounded-lg" 
              placeholder="Vancouver" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input 
              type="text" 
              value={contact.phone || ''} 
              onChange={e => {
                setContact({...contact, phone: e.target.value});
                trackFormFieldInteraction('PriceCalculator', 'Postal Code', 'change');
              }} 
              onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Postal Code', 'focus')}
              onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Postal Code', 'blur')}
              className="w-full border p-3 rounded-lg" 
              placeholder="V1A 1A1" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email (Optional)</label>
          <input 
            type="email" 
            value={contact.email || ''} 
            onChange={e => {
              setContact({...contact, email: e.target.value});
              trackFormFieldInteraction('PriceCalculator', 'Email', 'change');
              // Store email in session storage
              if (e.target.value) {
                sessionStorage.setItem('userEmail', e.target.value);
              }
            }} 
            onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Email', 'focus')}
            onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Email', 'blur')}
            className="w-full border p-3 rounded-lg" 
            placeholder="you@example.com" 
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll send your quote here, even if you don't complete the form
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button 
          onClick={onNextStep} 
          disabled={!address.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepAddressInput;

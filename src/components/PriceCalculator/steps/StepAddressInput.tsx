
import React from 'react';
import { trackFormFieldInteraction } from '@/utils/analytics';
import { ContactInfo } from '../types/calculatorTypes';

interface StepAddressInputProps {
  address: string;
  setAddress: (address: string) => void;
  contact: ContactInfo;
  setContact: (contact: ContactInfo) => void;
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
          <label className="block text-sm font-medium mb-1">Address</label>
          <input 
            type="text" 
            value={address} 
            onChange={e => {
              setAddress(e.target.value);
              trackFormFieldInteraction('PriceCalculator', 'Address', 'change');
            }} 
            onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Address', 'focus')}
            onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Address', 'blur')}
            className="w-full border p-3 rounded-lg" 
            placeholder="1234 Main St, Vancouver, BC V1A 1A1" 
            autoFocus 
          />
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

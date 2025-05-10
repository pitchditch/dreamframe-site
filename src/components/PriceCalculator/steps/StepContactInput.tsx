
import React from 'react';
import { Button } from '@/components/ui/button';
import { trackFormFieldInteraction } from '@/utils/analytics';
import { useToast } from '@/components/ui/use-toast';

interface Contact {
  name: string;
  phone: string;
  email: string;
  referredBy: string;
  notes: string;
}

interface StepContactInputProps {
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const StepContactInput: React.FC<StepContactInputProps> = ({
  contact,
  setContact,
  onNextStep,
  onPrevStep
}) => {
  const { toast } = useToast();
  
  const handleNextStep = () => {
    if (!contact.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    if (!contact.phone.trim()) {
      toast({
        title: "Phone Required",
        description: "Please enter your phone number to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    onNextStep();
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Step 4: Contact Info</h3>
      <p className="mb-4 text-gray-600">Please provide your contact details so we can follow up with your quote.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <input 
            type="text" 
            className="border p-3 rounded-lg" 
            placeholder="Name *" 
            value={contact.name} 
            onChange={e => {
              setContact(v => ({...v, name: e.target.value}));
              trackFormFieldInteraction('PriceCalculator', 'Name', 'change');
            }}
            onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Name', 'focus')}
            onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Name', 'blur')}
            required 
          />
          {!contact.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
        </div>
        <div className="flex flex-col">
          <input 
            type="tel" 
            className="border p-3 rounded-lg" 
            placeholder="Phone Number *" 
            value={contact.phone} 
            onChange={e => {
              setContact(v => ({...v, phone: e.target.value}));
              trackFormFieldInteraction('PriceCalculator', 'Phone', 'change');
            }}
            onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Phone', 'focus')}
            onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Phone', 'blur')}
            required 
          />
          {!contact.phone && <span className="text-red-500 text-xs mt-1">Phone number is required</span>}
        </div>
        <input 
          type="email" 
          className="border p-3 rounded-lg" 
          placeholder="Email (optional)" 
          value={contact.email} 
          onChange={e => {
            setContact(v => ({...v, email: e.target.value}));
            trackFormFieldInteraction('PriceCalculator', 'Email', 'change');
          }}
          onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Email', 'focus')}
          onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Email', 'blur')}
        />
        <input 
          type="text" 
          className="border p-3 rounded-lg" 
          placeholder="Referral Name (optional)" 
          value={contact.referredBy} 
          onChange={e => {
            setContact(v => ({...v, referredBy: e.target.value}));
            trackFormFieldInteraction('PriceCalculator', 'Referral', 'change');
          }}
          onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Referral', 'focus')}
          onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Referral', 'blur')}
        />
      </div>
      <textarea 
        className="border w-full min-h-[60px] max-h-32 p-3 rounded-lg" 
        placeholder="Any other info you'd like to share? (optional)" 
        value={contact.notes} 
        onChange={e => {
          setContact(v => ({...v, notes: e.target.value}));
          trackFormFieldInteraction('PriceCalculator', 'Notes', 'change');
        }}
        onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Notes', 'focus')}
        onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Notes', 'blur')}
      />
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrevStep}>Back</Button>
        <Button onClick={handleNextStep} disabled={!contact.name || !contact.phone}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepContactInput;

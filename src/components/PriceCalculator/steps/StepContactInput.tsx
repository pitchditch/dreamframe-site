
import React from 'react';
import { Button } from '@/components/ui/button';
import { trackFormFieldInteraction } from '@/utils/analytics';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
      
      <div className="space-y-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="contactName" className="font-medium">Full Name*</Label>
          <Input 
            id="contactName"
            type="text" 
            className="w-full" 
            placeholder="Enter your full name" 
            value={contact.name} 
            onChange={e => {
              setContact(v => ({...v, name: e.target.value}));
              trackFormFieldInteraction('PriceCalculator', 'Name', 'change');
            }}
            onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Name', 'focus')}
            onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Name', 'blur')}
            required 
          />
          {!contact.name && <span className="text-red-500 text-xs">Name is required</span>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactPhone" className="font-medium">Phone Number*</Label>
          <Input 
            id="contactPhone"
            type="tel" 
            className="w-full" 
            placeholder="(123) 456-7890" 
            value={contact.phone} 
            onChange={e => {
              setContact(v => ({...v, phone: e.target.value}));
              trackFormFieldInteraction('PriceCalculator', 'Phone', 'change');
            }}
            onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Phone', 'focus')}
            onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Phone', 'blur')}
            required 
          />
          {!contact.phone && <span className="text-red-500 text-xs">Phone number is required</span>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactEmail" className="font-medium">Email (optional)</Label>
          <Input 
            id="contactEmail"
            type="email" 
            className="w-full" 
            placeholder="your@email.com" 
            value={contact.email} 
            onChange={e => {
              setContact(v => ({...v, email: e.target.value}));
              trackFormFieldInteraction('PriceCalculator', 'Email', 'change');
            }}
            onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Email', 'focus')}
            onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Email', 'blur')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactReferral" className="font-medium">Referral Name (optional)</Label>
          <Input 
            id="contactReferral"
            type="text" 
            className="w-full" 
            placeholder="Who referred you to us?" 
            value={contact.referredBy} 
            onChange={e => {
              setContact(v => ({...v, referredBy: e.target.value}));
              trackFormFieldInteraction('PriceCalculator', 'Referral', 'change');
            }}
            onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Referral', 'focus')}
            onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Referral', 'blur')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactNotes" className="font-medium">Additional Notes (optional)</Label>
          <textarea 
            id="contactNotes"
            className="w-full min-h-[100px] border rounded-md p-3" 
            placeholder="Any other information you'd like to share?" 
            value={contact.notes} 
            onChange={e => {
              setContact(v => ({...v, notes: e.target.value}));
              trackFormFieldInteraction('PriceCalculator', 'Notes', 'change');
            }}
            onFocus={() => trackFormFieldInteraction('PriceCalculator', 'Notes', 'focus')}
            onBlur={() => trackFormFieldInteraction('PriceCalculator', 'Notes', 'blur')}
          />
        </div>
      </div>
      
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


import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExternalLink } from 'lucide-react';

interface ReviewOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const services = [
  'Window Cleaning',
  'Gutter Cleaning',
  'Roof Cleaning',
  'Pressure Washing',
  'Storefront Window Cleaning',
  'Commercial Window Cleaning'
];

const ReviewOverlay = ({ isOpen, onClose, onContinue }: ReviewOverlayProps) => {
  const [zipCode, setZipCode] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setZipCode(value);
    validateForm(value, selectedService);
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
    validateForm(zipCode, value);
  };

  const validateForm = (zip: string, service: string) => {
    // Simple validation - both fields must be filled
    setIsValid(zip.length > 0 && service.length > 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      // Save to localStorage if needed
      localStorage.setItem('reviewZipCode', zipCode);
      localStorage.setItem('reviewService', selectedService);
      
      // Proceed to Google review
      onContinue();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Before you leave a review</DialogTitle>
          <DialogDescription>
            Please provide the following information about the service you received.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-medium">
              Service Completed
            </label>
            <Select value={selectedService} onValueChange={handleServiceChange}>
              <SelectTrigger id="service">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="zipCode" className="text-sm font-medium">
              Your Zip Code
            </label>
            <Input
              id="zipCode"
              placeholder="Enter your zip code"
              value={zipCode}
              onChange={handleZipCodeChange}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!isValid}
              className="bg-bc-red hover:bg-red-700 text-white"
            >
              Continue to Google Review <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewOverlay;

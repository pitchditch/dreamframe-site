import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { trackFormStep, trackFormSubmission } from '@/utils/analytics';
import emailjs from '@emailjs/browser';
import { getPricing } from '../utils/pricingUtils';
import { ADD_ONS } from '../data/constants';

export interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  referredBy: string;
  notes: string;
}

export const usePriceCalculatorForm = (initialStep = 0, onComplete?: () => void) => {
  const [step, setStep] = useState(initialStep);
  const [size, setSize] = useState<string>('');
  const [services, setServices] = useState<string[]>([]);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState<ContactInfo>({
    name: '',
    phone: '',
    email: '',
    referredBy: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [estimateTotal, setEstimateTotal] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedPostalCode = sessionStorage.getItem('postalCode') || localStorage.getItem('postalCode');
    if (savedPostalCode) {
      setContact(prev => ({
        ...prev,
        phone: savedPostalCode
      }));
    }
  }, []);

  useEffect(() => {
    trackFormStep(
      'PriceCalculator',
      step + 1,
      step === 0 ? 'Address' :
      step === 1 ? 'Property Size' :
      step === 2 ? 'Services Selection' :
      step === 3 ? 'Contact Info' :
      step === 4 ? 'Summary' :
      'Thank You'
    );
  }, [step]);

  const calculateEstimateTotal = () => {
    let estTotal = 0;

    if (size

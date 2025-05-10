import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trackPageView } from '@/utils/analytics';
import { getPricing, formatCurrency } from '../utils/pricingUtils';
import { ADD_ONS } from '../data/constants';

interface StepSummaryProps {
  size: string;
  services: string[];
  addOns: string[];
  contact: {
    name: string;
    phone: string;
    email: string;
    referredBy: string;
    notes: string;
  };
  address: string;
  onPrevStep: () => void;
  onSubmit: () => void;
  submitting: boolean;
  estimateTotal: number | null;
}

const StepSummary: React.FC<StepSummaryProps> = ({
  size,
  services,
  addOns,
  contact,
  address,
  onPrevStep,
  onSubmit,
  submitting,
  estimateTotal
}) => {
  // Bundle discount
  const eligibleBundleDiscount = services.filter(s => s !== 'Roof Cleaning').length >= 3;
  
  // Calculate estimate summary
  let estimateSummary: Record<string, number | null> = {};
  let estTotal = 0;
  
  // Only calculate if size is not xlarge
  if (size !== 'xlarge') {
    // Add service prices
    for (const s of services) {
      const p = getPricing(size, s);
      estimateSummary[s] = p;
      if (typeof p === 'number') estTotal += p;
    }

    // Add selected add-ons to the total
    addOns.forEach(addonId => {
      const addon = ADD_ONS.find(a => a.id === addonId);
      if (addon) {
        estimateSummary[addon.name] = addon.price;
        estTotal += addon.price;
      }
    });
    
    // Apply bundle discount if eligible
    if (eligibleBundleDiscount) {
      estTotal -= 200;
      estimateSummary['Bundle Discount'] = -200;
    }
  }

  // Handle call button click
  const handleCallClick = () => {
    trackPageView('/virtual/phone-call-button');
  };

  // Handle submit button click
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('🚀 Submitting quote request...');
    onSubmit();
  };
  
  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-bold mb-2">Step 5: Estimate Summary</h3>
      <p className="mb-4 text-gray-600">
        Here's your custom quote summary. We'll confirm final pricing based on your home layout and needs.
      </p>
      <div className="bg-gray-50 px-4 py-4 rounded-lg mb-4">
        {Object.entries(estimateSummary).map(([name, val]) => (
          <div className="flex justify-between py-1 border-b last:border-none" key={name}>
            <span className="font-medium">{name}</span>
            <span className={`font-bold ${val && val < 0 ? 'text-green-700' : 'text-bc-red'}`}>
              {typeof val === 'number' && val < 0 ? `- $${Math.abs(val)}` : formatCurrency(val)}
            </span>
          </div>
        ))}
        <div className="flex justify-between pt-3 mt-3 border-t text-lg font-bold">
          <span>Final Total Estimate</span>
          <span className="text-bc-red">{formatCurrency(estTotal)}</span>
        </div>
        <div className="mt-2 text-xs text-gray-500 leading-relaxed">
          All prices are starting estimates. Your quote may vary based on home layout and condition—<br />
          we'll confirm before booking. <span className="font-semibold">Final quote confirmed by Jayden.</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <Button 
          className="w-full" 
          onClick={handleSubmit} 
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Get My Custom Quote"}
        </Button>
        <a 
          href="tel:7788087620" 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg text-center font-semibold shadow"
          onClick={handleCallClick}
        >
          Call Jayden Now
        </a>
      </div>
      <div className="text-sm text-gray-500 mt-5">
        You'll hear back from Jayden or the team shortly.<br />
        Want to talk to someone now? Call us at <span className="underline">778-808-7620</span>.<br />
        No spam, no pressure—just a clear and honest quote.
      </div>
    </div>
  );
};

export default StepSummary;

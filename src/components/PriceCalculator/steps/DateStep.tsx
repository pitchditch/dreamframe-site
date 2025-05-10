
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface DateStepProps {
  preferredDate?: Date;
  setPreferredDate: (date: Date | undefined) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

const DateStep: React.FC<DateStepProps> = ({
  preferredDate,
  setPreferredDate,
  onPrevStep,
  onNextStep,
}) => {
  // Calculate the date range for the next 90 days
  const today = new Date();
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(today.getMonth() + 3);
  
  // Function to get unavailable dates (for example, past dates)
  const getDisabledDates = (date: Date) => {
    // Disable dates in the past
    return date < today;
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Step 4: Choose a Preferred Date</h3>
      <p className="mb-4 text-gray-600">Select a preferred date for your service. We'll do our best to accommodate your schedule.</p>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
        <p className="mb-4 text-sm text-gray-600">
          Select a date from the calendar below. If you're flexible, you can continue without selecting a date.
        </p>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={preferredDate}
            onSelect={setPreferredDate}
            disabled={getDisabledDates}
            fromDate={today}
            toDate={threeMonthsFromNow}
          />
        </div>
        {preferredDate && (
          <p className="mt-4 text-center text-green-600">
            You've selected: <span className="font-semibold">{format(preferredDate, 'EEEE, MMMM d, yyyy')}</span>
          </p>
        )}
        <p className="mt-4 text-center text-sm text-gray-500">
          * Final scheduling will be confirmed by our team when they contact you.
        </p>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevStep}>
          Back
        </Button>
        <Button onClick={onNextStep}>
          {preferredDate ? 'Continue with Selected Date' : 'Continue without Date'}
        </Button>
      </div>
    </div>
  );
};

export default DateStep;

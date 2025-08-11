
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarDays, Clock } from 'lucide-react';

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

  // Available time slots
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const [selectedTime, setSelectedTime] = React.useState<string>('');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <CalendarDays className="w-8 h-8 text-blue-600 mr-3" />
          <h3 className="text-2xl font-bold text-gray-900">Schedule Your Service</h3>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select your preferred date and time for the service. We'll do our best to accommodate your schedule.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <CalendarDays className="w-5 h-5 mr-2 text-blue-600" />
            Choose a Date
          </h4>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={preferredDate}
              onSelect={setPreferredDate}
              disabled={getDisabledDates}
              fromDate={today}
              toDate={threeMonthsFromNow}
              className="rounded-lg border shadow-sm"
            />
          </div>
          {preferredDate && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-center text-green-800 font-medium">
                Selected: {format(preferredDate, 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
          )}
        </div>

        {/* Time Selection Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h4 className="font-semibold text-lg mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            Preferred Time
          </h4>
          {preferredDate ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Available times for {format(preferredDate, 'MMMM d')}:
              </p>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 text-sm rounded-lg border transition-colors ${
                      selectedTime === time
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {selectedTime && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-center text-blue-800 font-medium">
                    Preferred time: {selectedTime}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Select a date first to see available times</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h5 className="text-sm font-medium text-blue-800">Scheduling Notes</h5>
            <div className="mt-1 text-sm text-blue-700">
              <ul className="list-disc list-inside space-y-1">
                <li>Final scheduling will be confirmed when we contact you</li>
                <li>We offer flexible scheduling to accommodate your needs</li>
                <li>Weather-dependent services may need to be rescheduled</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevStep} className="px-6">
          Back
        </Button>
        <Button onClick={onNextStep} className="px-6 bg-blue-600 hover:bg-blue-700">
          {preferredDate ? `Continue with ${format(preferredDate, 'MMM d')}${selectedTime ? ` at ${selectedTime}` : ''}` : 'Continue without Date'}
        </Button>
      </div>
    </div>
  );
};

export default DateStep;

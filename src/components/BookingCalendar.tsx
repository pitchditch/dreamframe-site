
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, Check } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface TimeSlot {
  time: string;
  available: boolean;
}

const BookingCalendar = () => {
  const { t } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Mock available time slots - in a real app, these would come from an API
  const generateTimeSlots = (date?: Date): TimeSlot[] => {
    if (!date) return [];
    
    // Generate different availability based on day of week
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Weekends have fewer slots
    if (day === 0) {
      return []; // No availability on Sundays
    }
    
    if (day === 6) {
      // Saturday - limited hours
      return [
        { time: "9:00 AM", available: true },
        { time: "10:00 AM", available: true },
        { time: "11:00 AM", available: false },
        { time: "12:00 PM", available: true },
        { time: "1:00 PM", available: true },
      ];
    }
    
    // Weekdays - more availability
    return [
      { time: "8:00 AM", available: true },
      { time: "9:00 AM", available: true },
      { time: "10:00 AM", available: day % 2 === 0 }, // alternating availability
      { time: "11:00 AM", available: true },
      { time: "12:00 PM", available: true },
      { time: "1:00 PM", available: day % 3 === 0 },
      { time: "2:00 PM", available: true },
      { time: "3:00 PM", available: true },
      { time: "4:00 PM", available: day % 2 !== 0 },
      { time: "5:00 PM", available: true },
    ];
  };
  
  const timeSlots = generateTimeSlots(date);
  
  const handleSubmit = () => {
    if (date && selectedTime) {
      // In a real app, this would send the booking to an API
      console.log("Booking submitted:", {
        date: date.toLocaleDateString(),
        time: selectedTime
      });
      
      setIsSubmitted(true);
    }
  };
  
  const handleReset = () => {
    setDate(undefined);
    setSelectedTime(null);
    setIsSubmitted(false);
  };
  
  // Only allow booking dates in the future
  const disabledDates = {
    before: new Date()
  };
  
  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto text-center p-6">
        <CardContent>
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">{t("Booking Confirmed!")}</h2>
          
          <div className="mb-6 text-gray-700">
            <p>{t("Your appointment has been scheduled for:")}</p>
            <p className="font-semibold mt-2">
              {date?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="font-semibold">{selectedTime}</p>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">
            {t("You'll receive a confirmation email shortly with all the details. Our team will contact you to confirm all service details before your appointment.")}
          </p>
          
          <Button onClick={handleReset} variant="outline" className="mt-4">
            {t("Schedule Another Service")}
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="max-w-4xl mx-auto p-4">
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CalendarIcon className="mr-2 h-5 w-5" /> {t("Select a Date")}
            </h3>
            
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={disabledDates}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5" /> {t("Select a Time")}
            </h3>
            
            {date ? (
              timeSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className={`${
                        selectedTime === slot.time ? "bg-bc-red hover:bg-bc-red/90" : ""
                      } ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded-md">
                  <p className="text-yellow-800">{t("No availability on this date. Please select another date.")}</p>
                </div>
              )
            ) : (
              <div className="bg-gray-50 p-4 rounded-md flex items-center justify-center h-48">
                <p className="text-gray-500">{t("Please select a date first")}</p>
              </div>
            )}
            
            <div className="mt-6">
              <Button
                onClick={handleSubmit}
                disabled={!date || !selectedTime}
                className="w-full bg-bc-red hover:bg-bc-red/90"
              >
                {t("Book This Time Slot")}
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                {t("You'll have a chance to provide service details after booking.")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;

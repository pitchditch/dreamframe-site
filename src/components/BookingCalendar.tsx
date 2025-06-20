
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MapPin, DollarSign, User, Phone, Mail, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';

interface BookingData {
  service: string;
  address: string;
  squareFootage?: number;
  quote?: number;
}

const BookingCalendar: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available time slots
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  useEffect(() => {
    const savedBookingData = localStorage.getItem('bookingData');
    if (savedBookingData) {
      try {
        const data = JSON.parse(savedBookingData);
        setBookingData(data);
      } catch (error) {
        console.error('Error parsing booking data:', error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields and select a date and time.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare booking data for submission
      const bookingSubmissionData = {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        service: bookingData?.service || 'Service Booking',
        message: `Booking Request Details:
- Service: ${bookingData?.service || 'Not specified'}
- Address: ${bookingData?.address || 'Not provided'}
- Preferred Date: ${format(selectedDate, 'EEEE, MMMM d, yyyy')}
- Preferred Time: ${selectedTime}
- Property Size: ${bookingData?.squareFootage ? `${bookingData.squareFootage.toLocaleString()} sq ft` : 'Not specified'}
- Quote: ${bookingData?.quote ? `$${bookingData.quote}` : 'Not provided'}
- Additional Notes: ${customerInfo.notes || 'None'}`,
        subject: "New Service Booking Request",
        form: "BookingForm",
        save_to_tracking: true,
        // Include booking-specific data
        booking_date: format(selectedDate, 'yyyy-MM-dd'),
        booking_time: selectedTime,
        property_address: bookingData?.address || '',
        property_size: bookingData?.squareFootage || 0,
        estimated_quote: bookingData?.quote || 0
      };

      // Submit to the same endpoint as contact form
      await fetch(
        "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/forward-contact-form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingSubmissionData),
        }
      );

      toast({
        title: "Booking Request Submitted!",
        description: "We'll contact you within 24 hours to confirm your appointment. A confirmation email has been sent to you.",
      });

      // Clear the booking data
      localStorage.removeItem('bookingData');
      
      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error submitting your booking. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center p-8">
            <p className="text-gray-600 mb-4">No booking information found.</p>
            <Button onClick={() => navigate('/calculator')} className="bg-blue-600 hover:bg-blue-700">
              Get a Quote First
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Schedule your {bookingData.service} service at a convenient time
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Service Summary */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Service Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">{bookingData.service}</h3>
                <div className="flex items-center text-sm text-blue-700 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {bookingData.address}
                </div>
                {bookingData.squareFootage && (
                  <div className="text-sm text-blue-700 mb-2">
                    Property size: {bookingData.squareFootage.toLocaleString()} sq ft
                  </div>
                )}
                {bookingData.quote && (
                  <div className="flex items-center text-lg font-bold text-green-600">
                    <DollarSign className="w-5 h-5 mr-1" />
                    {formatCurrency(bookingData.quote)}
                  </div>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <p>✓ Free estimate included</p>
                <p>✓ Fully insured service</p>
                <p>✓ 100% satisfaction guarantee</p>
                <p>✓ Professional equipment</p>
              </div>
            </CardContent>
          </Card>

          {/* Calendar and Time Selection */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <CalendarDays className="w-5 h-5 mr-2 text-blue-600" />
                Select Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Choose a date:</h4>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-lg border shadow-sm"
                />
              </div>

              {selectedDate && (
                <div>
                  <h4 className="font-medium mb-3">
                    Available times for {format(selectedDate, 'EEEE, MMMM d')}:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 text-sm rounded-lg border transition-colors ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        <Clock className="w-4 h-4 inline mr-1" />
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Information Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions (Optional)
                  </label>
                  <Textarea
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Any specific requirements or notes..."
                    className="w-full"
                  />
                </div>

                {selectedDate && selectedTime && (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-900 mb-2">Booking Summary:</h4>
                    <p className="text-sm text-green-800">
                      {format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
                    </p>
                    <p className="text-sm text-green-800">
                      Service: {bookingData.service}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !selectedDate || !selectedTime}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  * We'll contact you within 24 hours to confirm your appointment
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;

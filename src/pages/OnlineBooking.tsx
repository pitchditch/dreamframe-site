
import React from 'react';
import Layout from '@/components/Layout';
import BookingCalendar from '@/components/BookingCalendar';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Clock, Calendar, PhoneCall } from 'lucide-react';

const OnlineBooking = () => {
  const { t } = useTranslation();
  
  return (
    <Layout
      title="Book Online | BC Pressure Washing"
      description="Book your pressure washing, window cleaning, gutter cleaning or roof cleaning service online. Quick and easy scheduling for homes in White Rock, Surrey and Metro Vancouver."
    >
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("Book Your Service Online")}</h1>
          <p className="text-xl max-w-3xl mx-auto">
            {t("Schedule your exterior cleaning service in just a few clicks. Choose a date and time that works for you.")}
          </p>
        </div>
      </div>
      
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">{t("How It Works")}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-bc-red/10 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-bc-red" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{t("1. Select a Date & Time")}</h3>
                  <p className="text-gray-600 text-sm">
                    {t("Choose from our available appointment slots that fit your schedule.")}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-bc-red/10 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-bc-red" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{t("2. Receive Confirmation")}</h3>
                  <p className="text-gray-600 text-sm">
                    {t("Get an instant confirmation email with your appointment details.")}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-bc-red/10 rounded-full flex items-center justify-center">
                      <PhoneCall className="h-6 w-6 text-bc-red" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{t("3. Service Details")}</h3>
                  <p className="text-gray-600 text-sm">
                    {t("We'll contact you to confirm service details before your appointment.")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <BookingCalendar />
          
          <div className="mt-16 max-w-2xl mx-auto">
            <h3 className="font-semibold text-xl mb-4 text-center">{t("Booking FAQs")}</h3>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">{t("Can I reschedule my appointment?")}</h4>
                <p className="text-gray-700">
                  {t("Yes, you can reschedule up to 24 hours before your appointment. Simply call our office or reply to your confirmation email.")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">{t("How long will my service take?")}</h4>
                <p className="text-gray-700">
                  {t("Service duration varies depending on the size of your property and services selected. We'll provide an estimated timeframe when we confirm your appointment details.")}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">{t("Do I need to be home during the service?")}</h4>
                <p className="text-gray-700">
                  {t("For most exterior services, you don't need to be home. We can discuss access requirements when confirming your appointment.")}
                </p>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-600">
                {t("Prefer to book by phone? Call us at ")}
                <a href="tel:7788087620" className="text-bc-red font-semibold">778-808-7620</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OnlineBooking;

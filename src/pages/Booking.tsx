
import React from 'react';
import Layout from '../components/Layout';
import BookingCalendar from '../components/BookingCalendar';
import { Helmet } from 'react-helmet-async';

const Booking = () => {
  return (
    <Layout>
      <Helmet>
        <title>Book Your Service - Schedule Appointment | BC Pressure Washing</title>
        <meta name="description" content="Schedule your pressure washing service with BC Pressure Washing. Choose your preferred date and time for professional cleaning in White Rock, Surrey and Metro Vancouver." />
      </Helmet>
      
      <BookingCalendar />
    </Layout>
  );
};

export default Booking;

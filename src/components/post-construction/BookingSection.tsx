
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const BookingSection: React.FC = () => {
  return (
    <section id="booking" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Get a Post-Construction Window Cleaning Estimate</h2>
          <p className="text-center mb-8 text-gray-600">
            Every job is checked personally by Jayden Fisher. We're fully insured and trusted by local builders.
          </p>
          
          <div className="text-center">
            <Link to="/contact">
              <Button variant="bc-red" size="lg">
                Get Your Free Estimate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;

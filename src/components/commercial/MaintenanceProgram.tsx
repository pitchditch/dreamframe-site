
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, BarChart, Clock } from 'lucide-react';

const MaintenanceProgram = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Commercial Maintenance Programs</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Keep your commercial property looking its best year-round with our customized maintenance programs.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <Calendar className="text-bc-red" />
          </div>
          <h3 className="text-xl font-bold mb-3">Regular Scheduling</h3>
          <p className="text-gray-600 mb-4">
            Establish a cleaning schedule that works for your business—monthly, quarterly, or custom intervals based on your needs.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <BarChart className="text-bc-red" />
          </div>
          <h3 className="text-xl font-bold mb-3">Budget Friendly</h3>
          <p className="text-gray-600 mb-4">
            Maintenance program customers receive preferred pricing and predictable costs for easier budgeting.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <Clock className="text-bc-red" />
          </div>
          <h3 className="text-xl font-bold mb-3">Priority Service</h3>
          <p className="text-gray-600 mb-4">
            Maintenance customers receive priority scheduling and responsive service when unexpected cleaning needs arise.
          </p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Button asChild variant="bc-red" size="lg">
          <Link to="/contact">Request a Maintenance Quote</Link>
        </Button>
      </div>
    </section>
  );
};

export default MaintenanceProgram;

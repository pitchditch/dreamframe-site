
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface RemovalItemsSectionProps {
  items: string[];
}

const RemovalItemsSection: React.FC<RemovalItemsSectionProps> = ({ items }) => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">What We Remove</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex items-start">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-bc-red mr-4 mt-1">
                <CheckCircle size={20} />
              </div>
              <p className="text-lg font-medium">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <img 
            src="/lovable-uploads/d924d396-955b-42cd-b850-83ba524d524e.png"
            alt="Window with construction tape and debris" 
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default RemovalItemsSection;

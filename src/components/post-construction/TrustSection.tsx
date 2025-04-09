
import React from 'react';
import { Shield, Construction, Award } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const TrustSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Trusted By Builders & Homeowners</h2>
        
        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
            <Shield className="text-bc-red mr-2" size={24} />
            <span className="font-medium">Fully Insured</span>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
            <Construction className="text-bc-red mr-2" size={24} />
            <span className="font-medium">Builder Friendly</span>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-sm">
            <Award className="text-bc-red mr-2" size={24} />
            <span className="font-medium">100% Satisfaction Guarantee</span>
          </div>
        </div>
        
        {/* Testimonial */}
        <Card className="bg-white p-8 shadow-md max-w-3xl mx-auto">
          <CardContent className="pt-4">
            <p className="text-lg italic mb-6">
              "BC Pressure Washing did an excellent job cleaning all our windows after construction. They removed all the paint splatter and construction debris, leaving the windows spotless. Highly recommend!"
            </p>
            <div className="font-bold">— John Wilson, Local Builder</div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TrustSection;

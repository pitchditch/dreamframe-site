
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GutterSticks = () => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-4">Gutter Sticks - Revolutionary Gutter Protection</h3>
      <p className="text-gray-600 mb-6">
        Gutter Sticks are an innovative and cost-effective way to keep debris out of your gutters while allowing water to flow freely. These perforated devices fit perfectly in your gutters to prevent clogging without the high cost of full gutter guards.
      </p>
      
      <Tabs defaultValue="how-it-works" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>
        <TabsContent value="how-it-works" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src="/lovable-uploads/6c46b1c6-d454-4f21-9a94-93b485c538e7.png" 
                alt="Gutter Stick installation demonstration" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Simple & Effective Design</h4>
              <p className="text-gray-600 mb-4">
                Gutter Sticks feature a perforated design that allows water to flow through while blocking leaves, pine needles, and other debris. The holes are specifically sized to optimize water flow while preventing clogs.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Easy to install in minutes</li>
                <li>No special tools required</li>
                <li>Fits most standard residential gutters</li>
                <li>Prevents downspout clogging</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="installation" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src="/lovable-uploads/0333148c-cc86-4aa7-bb18-de2d88ea40f5.png" 
                alt="Gutter Stick installed in gutter" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3">Professional Installation</h4>
              <p className="text-gray-600 mb-4">
                While Gutter Sticks are designed for easy DIY installation, our team can professionally install them for you, ensuring perfect fit and optimal performance. We recommend installing Gutter Sticks after a thorough gutter cleaning service.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>We measure and custom-fit each Gutter Stick</li>
                <li>Professional installation ensures proper water flow</li>
                <li>We check and adjust all downspouts</li>
                <li>Quick installation with minimal disruption</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="benefits" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xl font-semibold mb-3">Why Choose Gutter Sticks?</h4>
              <ul className="list-disc list-inside space-y-3">
                <li>
                  <span className="font-medium">Affordable Protection</span>
                  <p className="text-sm text-gray-600 ml-5">Fraction of the cost of traditional gutter guards</p>
                </li>
                <li>
                  <span className="font-medium">Reduces Maintenance</span>
                  <p className="text-sm text-gray-600 ml-5">Fewer cleanings required each year</p>
                </li>
                <li>
                  <span className="font-medium">Prevents Clogs</span>
                  <p className="text-sm text-gray-600 ml-5">Keeps leaves, pine needles, and debris out</p>
                </li>
                <li>
                  <span className="font-medium">UV Resistant</span>
                  <p className="text-sm text-gray-600 ml-5">Durable material that won't degrade in sunlight</p>
                </li>
                <li>
                  <span className="font-medium">Easy Maintenance</span>
                  <p className="text-sm text-gray-600 ml-5">Simply lift out to clean when needed</p>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h5 className="text-lg font-semibold text-blue-800 mb-2">Customer Satisfaction</h5>
                <p className="italic text-gray-700">
                  "Since installing Gutter Sticks last year, I haven't had to clean my gutters once. They've kept all the big debris out while allowing water to flow perfectly."
                </p>
                <p className="text-right text-sm text-gray-600 mt-2">- John D., White Rock</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GutterSticks;

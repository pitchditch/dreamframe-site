
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const OptimizedQuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Quote form submitted:', formData);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Get Your Free Quote Today</h2>
            <p className="text-xl text-gray-600">
              Professional Surrey pressure washing & White Rock house washing services
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ✓ Fully Insured
              </span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                ⭐ 5-Star Google Rated
              </span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                🚀 Same-Day Availability
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Name</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="(778) 123-4567"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Service Needed</label>
              <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="window-cleaning">Window Cleaning</SelectItem>
                  <SelectItem value="gutter-cleaning">Gutter Cleaning</SelectItem>
                  <SelectItem value="house-washing">House Soft Wash</SelectItem>
                  <SelectItem value="roof-cleaning">Roof Cleaning</SelectItem>
                  <SelectItem value="pressure-washing">Pressure Washing</SelectItem>
                  <SelectItem value="commercial">Commercial Services</SelectItem>
                  <SelectItem value="multiple">Multiple Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Property Address</label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Enter address for accurate pricing"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-bc-red hover:bg-red-700 text-lg py-3">
              🧼 Get My Free Quote
            </Button>
            
            <p className="text-center text-sm text-gray-500 mt-3">
              Response within 1 business day
            </p>
            
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-3">Or reach out directly:</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="outline">
                  <a href="tel:778-808-7620">Call Us Now</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="sms:778-808-7620">Text Us</a>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OptimizedQuoteForm;

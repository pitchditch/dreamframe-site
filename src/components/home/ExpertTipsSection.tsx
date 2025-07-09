
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExpertTipsSection = () => {
  const tips = [
    {
      id: 1,
      date: '1/4/2024',
      title: 'Essential Pressure Washing Tips for Vancouver Patios',
      description: "Learn how to maintain your patio's beauty with proper pressure washing techniques specific to White Rock's coastal climate.",
      image: '/lovable-uploads/3e5f8b04-aa1a-4af8-96cc-10e35dcf235e.png',
      category: 'Maintenance Tips',
      categoryColor: 'bg-red-500'
    },
    {
      id: 2,
      date: '1/8/2024',
      title: 'Why Surrey Driveways Need Regular Professional Cleaning',
      description: 'Discover the unique challenges Surrey driveways face and how professional pressure washing extends their lifespan.',
      image: '/lovable-uploads/b9f231f3-cc6b-4aaf-9d08-a21f909193c7.png',
      category: 'Local Insights',
      categoryColor: 'bg-blue-500'
    },
    {
      id: 3,
      date: '1/6/2024',
      title: 'Seasonal House Washing Guide for Metro Vancouver',
      description: "Your complete guide to maintaining your home's exterior throughout Metro Vancouver's changing seasons.",
      image: '/lovable-uploads/fab1dca8-e069-4b89-b783-35419cda9478.png',
      category: 'Seasonal Care',
      categoryColor: 'bg-green-500'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Expert Cleaning Tips & Local Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get professional advice on maintaining your property in White Rock, Surrey, and Metro Vancouver
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img 
                  src={tip.image} 
                  alt={tip.title}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 left-4 ${tip.categoryColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {tip.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {tip.date}
                </div>
                
                <h3 className="text-lg font-bold mb-3 text-gray-900">
                  {tip.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {tip.description}
                </p>
                
                <Button variant="outline" className="text-bc-red border-bc-red hover:bg-bc-red hover:text-white">
                  Read More →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertTipsSection;

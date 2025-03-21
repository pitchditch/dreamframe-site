
import { useState } from 'react';

interface RoofType {
  id: number;
  name: string;
  description: string;
  image: string;
}

const roofTypes: RoofType[] = [
  {
    id: 1,
    name: 'Metal Roofs',
    description: 'Durable and long-lasting metal roofs that resist moss and algae better than other materials but still require periodic cleaning to maintain their appearance.',
    image: '/lovable-uploads/0584525b-5b98-41a0-90fc-e7d10ceb4719.png'
  },
  {
    id: 2,
    name: 'Asphalt Shingle Roofs',
    description: 'The most common roof type in North America, asphalt shingles are prone to algae and moss growth, especially in shaded areas.',
    image: '/lovable-uploads/80872337-8941-44c9-90ee-232105beafa9.png'
  },
  {
    id: 3,
    name: 'Tile Roofs',
    description: 'Tile roofs require careful cleaning to remove moss, algae, and debris without damaging the tiles. Our specialized techniques ensure thorough cleaning without harm.',
    image: '/lovable-uploads/87b9cb70-2013-4e2d-a9e0-973c098850f1.png'
  },
  {
    id: 4,
    name: 'Cedar Shake Roofs',
    description: 'Cedar shake roofs are particularly susceptible to moss, mildew, and algae growth. Regular cleaning extends their lifespan and maintains their natural beauty.',
    image: '/lovable-uploads/a4bca134-26f3-4466-a6b2-aedb8317dbe9.png'
  }
];

const RoofTypeGallery = () => {
  const [activeType, setActiveType] = useState<RoofType>(roofTypes[0]);
  
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-6 text-center">Roof Types We Clean</h3>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        {roofTypes.map(type => (
          <button
            key={type.id}
            className={`p-2 text-center text-sm md:text-base rounded-md transition-all ${
              activeType.id === type.id 
                ? 'bg-bc-red text-white font-medium' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setActiveType(type)}
          >
            {type.name}
          </button>
        ))}
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <img 
              src={activeType.image} 
              alt={activeType.name} 
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h4 className="text-xl font-bold mb-4">{activeType.name}</h4>
            <p className="text-gray-600">{activeType.description}</p>
            <div className="mt-6">
              <p className="text-sm text-gray-500 italic">Our cleaning methods are tailored to each roof type, ensuring the best results without causing damage to your roofing materials.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoofTypeGallery;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const beforeAfterImages = [
  {
    id: 1,
    before: '/lovable-uploads/71774b2f-cb36-4a10-b158-2f0020a06f53.png',
    after: '/lovable-uploads/fbe20623-3e28-4bfe-a9d4-7c89c9d07b54.png',
    service: 'windows',
    title: 'Window Cleaning',
    location: 'White Rock'
  },
  {
    id: 2,
    before: '/lovable-uploads/a97882ea-1822-4b97-bef4-2a7f2849c3ef.png',
    after: '/lovable-uploads/d70857b1-984a-4dce-87fa-690c954e90f6.png',
    service: 'roofs',
    title: 'Roof Cleaning',
    location: 'Surrey'
  },
  {
    id: 3,
    before: '/lovable-uploads/0504c9c4-ec85-41e2-a922-fa02e9b21d45.png',
    after: '/lovable-uploads/0ac145eb-946d-47cc-8d1f-cf0f63a4716c.png',
    service: 'driveways',
    title: 'Driveway Cleaning',
    location: 'Langley'
  },
  {
    id: 4,
    before: '/lovable-uploads/5c37b82a-d3f9-4c54-9c51-1c8c5383f7d2.png',
    after: '/lovable-uploads/30ed280f-ee6f-48b6-ba03-45fe47441dbf.png',
    service: 'gutters',
    title: 'Gutter Cleaning',
    location: 'Burnaby'
  },
  {
    id: 5,
    before: '/lovable-uploads/b0a17518-4844-4334-b0ac-0dd62b5baff1.png',
    after: '/lovable-uploads/63a1c6a7-8585-4825-9b95-aaf922a4fb3b.png',
    service: 'driveways',
    title: 'Patio Cleaning',
    location: 'Richmond'
  }
];

const FilterableBeforeAfterGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredImages = activeFilter === 'all' 
    ? beforeAfterImages 
    : beforeAfterImages.filter(img => img.service === activeFilter);

  const filters = [
    { value: 'all', label: 'All Services' },
    { value: 'windows', label: 'Windows' },
    { value: 'roofs', label: 'Roofs' },
    { value: 'driveways', label: 'Driveways' },
    { value: 'gutters', label: 'Gutters' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">See The Amazing Results</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real before and after photos from our recent projects across Metro Vancouver
          </p>
          
          {/* Filter Buttons */}
          <ToggleGroup 
            type="single" 
            value={activeFilter} 
            onValueChange={(value) => value && setActiveFilter(value)}
            className="justify-center flex-wrap gap-2"
          >
            {filters.map((filter) => (
              <ToggleGroupItem 
                key={filter.value} 
                value={filter.value}
                className="data-[state=on]:bg-bc-red data-[state=on]:text-white hover:bg-bc-red/10 border border-gray-300"
              >
                {filter.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image) => (
            <div key={image.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img 
                      src={image.before} 
                      alt="Before cleaning"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      BEFORE
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src={image.after} 
                      alt="After cleaning"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      AFTER
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{image.title}</h3>
                <p className="text-gray-600 text-sm">{image.location}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No results found for the selected filter.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterableBeforeAfterGallery;

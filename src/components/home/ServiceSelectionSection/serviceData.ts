
import { Home, Droplets, Car, Building, Truck, Sparkles } from 'lucide-react';
import { testimonials } from '@/data/testimonials';

export interface Service {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  image: string;
  slideImages: string[];
  videoId: string;
  description: string;
  customIcon?: string;
}

// Filter testimonial images by service type
const windowCleaningImages = testimonials
  .filter(t => t.service === 'window-cleaning' && t.beforeAfterImage)
  .map(t => t.beforeAfterImage as string);

const houseWashingImages = testimonials
  .filter(t => t.service === 'pressure-washing' && t.beforeAfterImage)
  .map(t => t.beforeAfterImage as string);

const gutterCleaningImages = testimonials
  .filter(t => t.service === 'gutter-cleaning' && t.beforeAfterImage)
  .map(t => t.beforeAfterImage as string);

const roofCleaningImages = testimonials
  .filter(t => t.service === 'roof-cleaning' && t.beforeAfterImage)
  .map(t => t.beforeAfterImage as string);

export const services: Service[] = [
  {
    id: 'house-washing',
    title: 'House Soft Wash',
    icon: Home,
    image: '/lovable-uploads/8fd22796-68ae-4cb7-a6f3-4743b0d93a37.png',
    slideImages: houseWashingImages,
    videoId: 'lYnXijewxCM',
    description: 'Gentle exterior house cleaning'
  },
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    icon: Sparkles,
    customIcon: '/lovable-uploads/7d3b55a8-280b-4668-8ab8-eeaa0861eec2.png',
    image: '/lovable-uploads/104fb195-8227-4f8c-af68-5406acc5388a.png',
    slideImages: windowCleaningImages,
    videoId: 'bbHnt4UNPcU',
    description: 'Crystal clear window cleaning'
  },
  {
    id: 'driveway-cleaning',
    title: 'Driveway Cleaning',
    icon: Car,
    image: '/lovable-uploads/4bc56646-a50c-4c86-aeeb-997bd1c1c579.png',
    slideImages: ['/lovable-uploads/80972bf0-3700-43b0-8983-d5861531bf57.png', '/lovable-uploads/ff861e81-c504-47c8-aae7-5319b9ad2ab4.png'],
    videoId: 'lYnXijewxCM',
    description: 'Remove stains and restore surfaces'
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning',
    icon: Building,
    customIcon: '/lovable-uploads/62be5586-79d1-4d39-a633-9d38f9026170.png',
    image: '/lovable-uploads/0c0d106e-85ea-4490-9176-1d36821732c1.png',
    slideImages: roofCleaningImages,
    videoId: 'eQSgdx9ujcc',
    description: 'Safe moss and algae removal'
  },
  {
    id: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    icon: Droplets,
    customIcon: '/lovable-uploads/dcfcefef-7a4b-4c84-8853-dfac2f5eae1d.png',
    image: '/lovable-uploads/4f0a7bbd-e220-49bd-80ec-c83bb961b38f.png',
    slideImages: gutterCleaningImages,
    videoId: 'EdMlx1sYJDc',
    description: 'Complete gutter system cleaning'
  },
  {
    id: 'commercial',
    title: 'Commercial Services',
    icon: Building,
    customIcon: '/lovable-uploads/6a911f6a-da7a-47ee-a80f-ace836d398fc.png',
    image: '/lovable-uploads/b5f7b3b1-4a41-4e10-963f-72eef95a03c4.png',
    slideImages: ['/lovable-uploads/b5f7b3b1-4a41-4e10-963f-72eef95a03c4.png', '/lovable-uploads/481b70c0-733d-4cc9-9629-3628731d87e4.png'],
    videoId: 'lYnXijewxCM',
    description: 'Professional commercial cleaning'
  }
];

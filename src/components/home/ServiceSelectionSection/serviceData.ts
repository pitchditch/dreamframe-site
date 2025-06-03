
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
    id: 'window-cleaning',
    title: 'Window Cleaning',
    icon: Sparkles,
    customIcon: '/lovable-uploads/a11ecd57-90a2-4b79-b739-f1ab64f746c2.png',
    image: '/lovable-uploads/889d6b89-1db3-48dd-8f3d-7ef518215095.png',
    slideImages: windowCleaningImages,
    videoId: 'bbHnt4UNPcU',
    description: 'Crystal clear window cleaning'
  },
  {
    id: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    icon: Droplets,
    customIcon: '/lovable-uploads/aefe3f09-83f5-40b4-8a79-66169717666a.png',
    image: '/lovable-uploads/fc77240e-210d-48ab-95b1-279c84686768.png',
    slideImages: gutterCleaningImages,
    videoId: 'EdMlx1sYJDc',
    description: 'Complete gutter system cleaning'
  },
  {
    id: 'house-washing',
    title: 'House Soft Wash',
    icon: Home,
    customIcon: '/lovable-uploads/cb64ce5d-7150-4ada-9931-6f6f16ed9a88.png',
    image: '/lovable-uploads/1506ac4e-54db-4e14-b30f-42311bfee2be.png',
    slideImages: houseWashingImages,
    videoId: 'lYnXijewxCM',
    description: 'Gentle exterior house cleaning'
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning',
    icon: Building,
    customIcon: '/lovable-uploads/91c813e8-d9e9-429e-a959-d9ead83ce6b6.png',
    image: '/lovable-uploads/2156e2bb-05d0-4809-93c4-d6e0d97b96aa.png',
    slideImages: roofCleaningImages,
    videoId: 'eQSgdx9ujcc',
    description: 'Safe moss and algae removal'
  },
  {
    id: 'driveway-cleaning',
    title: 'Driveway Cleaning',
    icon: Car,
    customIcon: '/lovable-uploads/5f62bf7c-303e-456d-8438-f69479508411.png',
    image: '/lovable-uploads/4bc56646-a50c-4c86-aeeb-997bd1c1c579.png',
    slideImages: ['/lovable-uploads/80972bf0-3700-43b0-8983-d5861531bf57.png', '/lovable-uploads/ff861e81-c504-47c8-aae7-5319b9ad2ab4.png'],
    videoId: 'lYnXijewxCM',
    description: 'Remove stains and restore surfaces'
  },
  {
    id: 'fence-washing',
    title: 'Fence Washing',
    icon: Building,
    customIcon: '/lovable-uploads/db2d8d0c-21a4-47e8-a7d1-b6a7e95c13e9.png',
    image: '/lovable-uploads/28c30244-2e20-4f95-8702-35310699deb3.png',
    slideImages: ['/lovable-uploads/28c30244-2e20-4f95-8702-35310699deb3.png'],
    videoId: 'lYnXijewxCM',
    description: 'Professional fence cleaning and restoration'
  }
];

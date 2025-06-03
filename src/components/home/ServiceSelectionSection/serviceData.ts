
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
    customIcon: '/lovable-uploads/24028a5c-e998-4412-9030-9797dc94876f.png',
    image: '/lovable-uploads/889d6b89-1db3-48dd-8f3d-7ef518215095.png',
    slideImages: windowCleaningImages,
    videoId: 'bbHnt4UNPcU',
    description: 'Crystal clear window cleaning'
  },
  {
    id: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    icon: Droplets,
    customIcon: '/lovable-uploads/359904d3-b6f0-4310-a4de-3adfbca02d76.png',
    image: '/lovable-uploads/fc77240e-210d-48ab-95b1-279c84686768.png',
    slideImages: gutterCleaningImages,
    videoId: 'EdMlx1sYJDc',
    description: 'Complete gutter system cleaning'
  },
  {
    id: 'house-washing',
    title: 'House Soft Wash',
    icon: Home,
    customIcon: '/lovable-uploads/6bd84878-173c-4ff0-9666-2efaf78fc294.png',
    image: '/lovable-uploads/1506ac4e-54db-4e14-b30f-42311bfee2be.png',
    slideImages: houseWashingImages,
    videoId: 'lYnXijewxCM',
    description: 'Gentle exterior house cleaning'
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning',
    icon: Building,
    customIcon: '/lovable-uploads/a8981dbd-e4c9-4c27-ab55-571723c7f27b.png',
    image: '/lovable-uploads/2156e2bb-05d0-4809-93c4-d6e0d97b96aa.png',
    slideImages: roofCleaningImages,
    videoId: 'eQSgdx9ujcc',
    description: 'Safe moss and algae removal'
  },
  {
    id: 'driveway-cleaning',
    title: 'Driveway Cleaning',
    icon: Car,
    customIcon: '/lovable-uploads/dcb3166b-537e-416a-92ee-a66978a646ab.png',
    image: '/lovable-uploads/4bc56646-a50c-4c86-aeeb-997bd1c1c579.png',
    slideImages: ['/lovable-uploads/80972bf0-3700-43b0-8983-d5861531bf57.png', '/lovable-uploads/ff861e81-c504-47c8-aae7-5319b9ad2ab4.png'],
    videoId: 'lYnXijewxCM',
    description: 'Remove stains and restore surfaces'
  },
  {
    id: 'commercial',
    title: 'Commercial Services',
    icon: Building,
    customIcon: '/lovable-uploads/5b1d271e-15e2-4bf4-87ce-4ad9e9aadc75.png',
    image: '/lovable-uploads/5b1d271e-15e2-4bf4-87ce-4ad9e9aadc75.png',
    slideImages: ['/lovable-uploads/5b1d271e-15e2-4bf4-87ce-4ad9e9aadc75.png', '/lovable-uploads/481b70c0-733d-4cc9-9629-3628731d87e4.png'],
    videoId: 'lYnXijewxCM',
    description: 'Professional commercial cleaning'
  }
];

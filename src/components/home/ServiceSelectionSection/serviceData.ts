
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
    customIcon: '/lovable-uploads/00d7b436-b2b5-4231-99d0-df1a09cb68ae.png',
    image: '/lovable-uploads/8fd22796-68ae-4cb7-a6f3-4743b0d93a37.png',
    slideImages: houseWashingImages,
    videoId: 'lYnXijewxCM',
    description: 'Gentle exterior house cleaning'
  },
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    icon: Sparkles,
    customIcon: '/lovable-uploads/0c6a9ec0-eaa2-4aa8-816e-d9cf88afac7d.png',
    image: '/lovable-uploads/104fb195-8227-4f8c-af68-5406acc5388a.png',
    slideImages: windowCleaningImages,
    videoId: 'bbHnt4UNPcU',
    description: 'Crystal clear window cleaning'
  },
  {
    id: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    icon: Droplets,
    customIcon: '/lovable-uploads/af9b8f9c-8fc9-4a88-8768-17283cac5213.png',
    image: '/lovable-uploads/4f0a7bbd-e220-49bd-80ec-c83bb961b38f.png',
    slideImages: gutterCleaningImages,
    videoId: 'EdMlx1sYJDc',
    description: 'Complete gutter system cleaning'
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning',
    icon: Building,
    customIcon: '/lovable-uploads/e1b8e784-b329-4db1-b413-c3a9abdfee7d.png',
    image: '/lovable-uploads/0c0d106e-85ea-4490-9176-1d36821732c1.png',
    slideImages: roofCleaningImages,
    videoId: 'eQSgdx9ujcc',
    description: 'Safe moss and algae removal'
  },
  {
    id: 'commercial',
    title: 'Commercial Services',
    icon: Building,
    customIcon: '/lovable-uploads/f80b484b-5931-4960-9e9f-a3dfe308b905.png',
    image: '/lovable-uploads/b5f7b3b1-4a41-4e10-963f-72eef95a03c4.png',
    slideImages: ['/lovable-uploads/b5f7b3b1-4a41-4e10-963f-72eef95a03c4.png', '/lovable-uploads/481b70c0-733d-4cc9-9629-3628731d87e4.png'],
    videoId: 'lYnXijewxCM',
    description: 'Professional commercial cleaning'
  },
  {
    id: 'driveway-cleaning',
    title: 'Driveway Cleaning',
    icon: Car,
    image: '/lovable-uploads/4bc56646-a50c-4c86-aeeb-997bd1c1c579.png',
    slideImages: ['/lovable-uploads/80972bf0-3700-43b0-8983-d5861531bf57.png', '/lovable-uploads/ff861e81-c504-47c8-aae7-5319b9ad2ab4.png'],
    videoId: 'lYnXijewxCM',
    description: 'Remove stains and restore surfaces'
  }
];

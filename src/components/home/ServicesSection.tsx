import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Home, Wind, Warehouse } from 'lucide-react';
import { Button } from '@/components/ui/button';
const ServicesSection = () => {
  const services = [{
    icon: <Droplets className="text-blue-500" size={32} />,
    title: "Window Cleaning",
    description: "Crystal clear windows for residential and commercial properties. We use professional-grade equipment for spotless results.",
    link: "/services/window-cleaning",
    image: "/lovable-uploads/5d9b60f7-561a-4672-acdf-29948d260793.png"
  }, {
    icon: <Home className="text-bc-red" size={32} />,
    title: "Pressure Washing",
    description: "Revitalize your property with our powerful yet safe pressure washing services for driveways, siding, decks, and more.",
    link: "/services/pressure-washing",
    image: "/lovable-uploads/e76ecfc1-a3a8-44d8-9a4a-5e1bf7c32282.png"
  }, {
    icon: <Wind className="text-green-500" size={32} />,
    title: "Gutter Cleaning",
    description: "Prevent water damage with our thorough gutter cleaning. We remove debris and check for proper drainage.",
    link: "/services/gutter-cleaning",
    image: "/lovable-uploads/ff0fc949-bae9-4f8b-a408-2322698b8479.png"
  }, {
    icon: <Warehouse className="text-amber-600" size={32} />,
    title: "Commercial Services",
    description: "Specialized cleaning solutions for businesses, including storefronts, office buildings, and multi-unit properties.",
    link: "/services/commercial-pressure-washing",
    image: "/lovable-uploads/d9f3e980-9bd8-4f15-afb2-6df7cb095002.png"
  }];
  return;
};
export default ServicesSection;
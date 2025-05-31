
import { Droplets, Home, Building, Sparkles, Zap, Wrench } from 'lucide-react';
import type { Service } from './types';

export const createServicesData = (t: (key: string) => string): Service[] => [
  {
    id: 1,
    image: "/lovable-uploads/22119baa-45d3-413c-8428-4d12f4f3eb7e.png",
    title: t("Window Cleaning"),
    description: t("Professional window cleaning using advanced water-fed pole systems for crystal clear results."),
    features: [
      t("Pure water cleaning system"),
      t("Streak-free results guaranteed"),
      t("Eco-friendly cleaning solutions"),
      t("Interior and exterior cleaning")
    ],
    icon: Home,
    overlayImage: "/lovable-uploads/99b31681-3d1a-4e50-bd80-48d57fa01dcb.png",
    overlayTitle: "Water-Fed Pole System",
    overlayDescription: "Professional telescopic pole system for reaching high windows safely from ground level",
    pricing: {
      small: "$150-250",
      medium: "$250-400", 
      large: "$400-650"
    }
  },
  {
    id: 2,
    image: "/lovable-uploads/d7632e40-fcbf-4871-86cc-d9377ccf301a.png",
    title: t("Gutter Cleaning"),
    description: t("Complete gutter system cleaning and maintenance to protect your property from water damage."),
    features: [
      t("Full debris removal"),
      t("Downspout clearing and testing"),
      t("Gutter face exterior cleaning"),
      t("Before and after documentation")
    ],
    icon: Droplets,
    pricing: {
      small: "$200-300",
      medium: "$300-500",
      large: "$500-800"
    }
  },
  {
    id: 3,
    image: "/lovable-uploads/45e58228-57ce-4faf-8406-a1cc77718e98.png",
    title: t("Roof Cleaning"),
    description: t("Safe soft washing techniques to remove moss, algae, and restore your roof's appearance."),
    features: [
      t("Soft washing techniques"),
      t("Moss and algae removal"),
      t("Eco-friendly cleaning solutions"),
      t("Roof protection and preservation")
    ],
    icon: Building,
    overlayImage: "/lovable-uploads/73365ffd-fbd1-45ab-beac-f6a2f696291a.png",
    overlayTitle: "Sodium Hypochlorite",
    overlayDescription: "Primary product used in roof cleaning to kill moss and algae growth, preventing regrowth for up to 2 years",
    pricing: {
      small: "$400-600",
      medium: "$600-1000",
      large: "$1000-1800"
    }
  },
  {
    id: 4,
    image: "/lovable-uploads/6927869c-13f2-40f7-bb49-af45df1067d1.png",
    title: t("Pressure Washing with Surface Cleaner"),
    description: t("High-efficiency surface cleaning for driveways, patios, and large commercial areas."),
    features: [
      t("Even pressure distribution"),
      t("Fast and efficient cleaning"),
      t("No streaking or zebra marks"),
      t("Perfect for large surface areas")
    ],
    icon: Sparkles,
    overlayImage: "/lovable-uploads/4af8c28d-371b-4fca-a70e-90e7563198c4.png",
    overlayTitle: "Surface Cleaner",
    overlayDescription: "Rotating surface cleaner attachment that provides even pressure distribution for streak-free cleaning of large flat surfaces",
    pricing: {
      small: "$300-500",
      medium: "$500-800",
      large: "$800-1500"
    }
  },
  {
    id: 5,
    image: "/lovable-uploads/0d0aad7b-e90f-4f4a-93f1-1b788e88263b.png",
    title: t("Extendable Pole Pressure Washing"),
    description: t("Reach high areas safely with our extendable pole pressure washing systems."),
    features: [
      t("Reach up to 3 stories high"),
      t("Safe ground-based operation"),
      t("Precise pressure control"),
      t("Ideal for high exterior walls")
    ],
    icon: Zap,
    overlayImage: "/lovable-uploads/a3f73a45-5f25-4203-bf0b-27417e2ecc35.png",
    overlayTitle: "Professional Pressure Washer",
    overlayDescription: "Industrial-grade pressure washing equipment for powerful and efficient cleaning",
    pricing: {
      small: "$250-400",
      medium: "$400-700",
      large: "$700-1200"
    }
  },
  {
    id: 6,
    image: "/lovable-uploads/b5f7b3b1-4a41-4e10-963f-72eef95a03c4.png",
    title: t("Water Fed Pole System"),
    description: t("Advanced pure water cleaning system for windows and building facades up to 5 stories."),
    features: [
      t("Pure water technology"),
      t("No chemicals needed"),
      t("Spot-free drying"),
      t("Reaches extreme heights safely")
    ],
    icon: Wrench,
    pricing: {
      small: "$200-350",
      medium: "$350-600",
      large: "$600-1000"
    }
  }
];

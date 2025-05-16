
import React from 'react';
import { LucideProps } from 'lucide-react';
import { 
  Home as LucideHome,
  Check as LucideCheck,
  Calendar as LucideCalendar,
  MapPin as LucideMapPin,
  Phone as LucidePhone,
  Star as LucideStar,
  ArrowRight as LucideArrowRight
} from 'lucide-react';

// We're creating wrapper components for Lucide icons to have consistent styling
// This also helps us create our own custom icons that match Lucide's styling

export const House = (props: LucideProps) => {
  return <LucideHome {...props} />;
};

export const WindowCleaning = (props: LucideProps) => {
  // Custom window cleaning icon
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
      <path d="M15 16c.5-2 2-3 2-3s1.5 1 2 3" />
    </svg>
  );
};

export const DrivewayCleaning = (props: LucideProps) => {
  // Custom driveway cleaning icon
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M3 7v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
      <polyline points="5 9 12 15 19 9" />
      <rect x="4" y="4" width="16" height="3" />
    </svg>
  );
};

export const HousePlus = (props: LucideProps) => {
  // Custom house plus icon
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M3 10.5V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3.5" />
      <polyline points="12 4 2 10 12 16 22 10 12 4" />
      <circle cx="12" cy="18" r="0.5" />
    </svg>
  );
};

export const GutterCleaning = (props: LucideProps) => {
  // Custom gutter cleaning icon
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M22 11V7a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v4" />
      <path d="M3 11v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1" />
      <path d="M6 18h12" />
      <path d="M6 18v-6" />
      <path d="M18 18v-6" />
      <path d="M10 14v1" />
      <path d="M14 14v1" />
    </svg>
  );
};

export const RoofCleaning = (props: LucideProps) => {
  // Custom roof cleaning icon
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <polygon points="12 3 20 12 4 12" />
      <rect x="6" y="12" width="12" height="8" />
      <path d="M10 16v4" />
    </svg>
  );
};

export const MapPin = (props: LucideProps) => {
  return <LucideMapPin {...props} />;
};

export const Phone = (props: LucideProps) => {
  return <LucidePhone {...props} />;
};

export const Star = (props: LucideProps) => {
  return <LucideStar {...props} />;
};

export const ArrowRight = (props: LucideProps) => {
  return <LucideArrowRight {...props} />;
};

export const Check = (props: LucideProps) => {
  return <LucideCheck {...props} />;
};

export const Calendar = (props: LucideProps) => {
  return <LucideCalendar {...props} />;
};

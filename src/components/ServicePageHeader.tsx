import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface ServicePageHeaderProps {
  isOverVideo?: boolean;
}

export const ServicePageHeader = ({ isOverVideo = true }: ServicePageHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="fixed top-4 left-4 z-[1000] flex items-center gap-3">
      <Button
        onClick={() => navigate('/')}
        variant={isOverVideo ? "outline" : "secondary"}
        size="sm"
        className={`transition-all duration-300 hover:scale-105 font-semibold ${
          isOverVideo 
            ? 'border-white bg-white/10 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm' 
            : 'bg-white text-gray-900 hover:bg-gray-100'
        }`}
      >
        <Home className="w-4 h-4 mr-2" />
        Home
      </Button>
      
      <Button
        onClick={handleBackClick}
        variant={isOverVideo ? "outline" : "secondary"}
        size="sm"
        className={`transition-all duration-300 hover:scale-105 font-semibold ${
          isOverVideo 
            ? 'border-white bg-white/10 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm' 
            : 'bg-white text-gray-900 hover:bg-gray-100'
        }`}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>
    </div>
  );
};

export default ServicePageHeader;
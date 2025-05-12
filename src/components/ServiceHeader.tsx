
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceHeaderProps {
  title: string;
  description: string;
  youtubeId?: string;
  mobileYoutubeId?: string;
  imagePath?: string;
  darkOverlay?: boolean;
  buttonPosition?: 'top' | 'bottom';
  showButton?: boolean;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({
  title,
  description,
  youtubeId,
  mobileYoutubeId,
  imagePath,
  darkOverlay = false,
  buttonPosition = 'top',
  showButton = true
}) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;
  const videoId = isMobile && mobileYoutubeId ? mobileYoutubeId : youtubeId;
  
  const renderHeaderContent = () => (
    <div className="text-center relative z-10">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">{title}</h1>
      <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
        {description}
      </p>
      {buttonPosition === 'top' && showButton && (
        <Button 
          onClick={() => navigate('/calculator')}
          size="lg" 
          variant="bc-red"
          className="font-semibold px-6 py-6 text-lg"
        >
          Get A Quote <ArrowRight className="ml-2" size={18} />
        </Button>
      )}
    </div>
  );
  
  return (
    <div className={`relative ${youtubeId || imagePath ? 'h-[70vh] md:h-[60vh]' : 'py-24 bg-gray-800'}`}>
      {youtubeId ? (
        <>
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-black opacity-50 z-[1]"></div>
            <iframe 
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}`}
              title="Background video"
              className="absolute w-full h-full object-cover"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ pointerEvents: 'none' }}
            ></iframe>
          </div>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center">
            {renderHeaderContent()}
          </div>
        </>
      ) : imagePath ? (
        <>
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={imagePath} 
              alt={title} 
              className="w-full h-full object-cover" 
            />
            {darkOverlay && <div className="absolute inset-0 bg-black opacity-50"></div>}
          </div>
          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center">
            {renderHeaderContent()}
          </div>
        </>
      ) : (
        <div className="container mx-auto px-4 flex flex-col justify-center items-center">
          {renderHeaderContent()}
        </div>
      )}
      
      {buttonPosition === 'bottom' && showButton && (
        <div className="absolute bottom-10 left-0 right-0 text-center z-10">
          <Button 
            onClick={() => navigate('/calculator')}
            size="lg" 
            variant="bc-red"
            className="font-semibold px-6 py-6 text-lg"
          >
            Get A Quote <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServiceHeader;

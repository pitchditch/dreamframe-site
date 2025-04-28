
import { ReactNode, useEffect } from 'react';

interface ServiceHeaderProps {
  title: ReactNode;
  description: string;
  icon?: ReactNode;
  imagePath?: string;
  videoUrl?: string;
  darkOverlay?: boolean;
}

const ServiceHeader = ({
  title,
  description,
  icon,
  imagePath,
  videoUrl,
  darkOverlay = false
}: ServiceHeaderProps) => {
  useEffect(() => {
    if (videoUrl) {
      document.body.classList.add('has-video-header');
      return () => {
        document.body.classList.remove('has-video-header');
      };
    }

    // Add similar behavior as home page for navbar transition
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('navbar-scrolled', 'bg-white', 'text-gray-900');
          navbar.classList.remove('bg-transparent', 'text-white');
        } else {
          navbar.classList.remove('navbar-scrolled', 'bg-white', 'text-gray-900');
          navbar.classList.add('bg-transparent', 'text-white');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [videoUrl]);

  return (
    <div className="relative w-full h-screen hero-section">
      {videoUrl ? (
        <>
          <video
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center p-4 max-w-xl mx-auto z-10">
              {icon && <div className="inline-block text-bc-red mb-2">{icon}</div>}
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">{title}</h1>
              <p className="text-lg md:text-xl text-gray-200">{description}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <img 
            src={imagePath}
            alt={typeof title === 'string' ? title : 'Service header image'}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${darkOverlay ? 'from-black/80 to-black/60' : 'from-black/70 to-black/50'}`} />
          <div className="relative h-full container mx-auto px-4 flex items-center justify-center z-10">
            <div className="text-center max-w-4xl">
              {icon && <div className="inline-block text-bc-red mb-4">{icon}</div>}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">{title}</h1>
              <p className="text-lg md:text-xl text-white text-shadow-sm">{description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceHeader;

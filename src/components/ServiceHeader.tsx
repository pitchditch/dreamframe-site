
import { ReactNode, useEffect } from 'react';

interface ServiceHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  imagePath?: string;
  videoUrl?: string;
}

const ServiceHeader = ({ title, description, icon, imagePath, videoUrl }: ServiceHeaderProps) => {
  useEffect(() => {
    if (videoUrl) {
      document.body.classList.add('has-video-header');
      return () => {
        document.body.classList.remove('has-video-header');
      };
    }
  }, [videoUrl]);

  return (
    <div className="relative bg-black text-white mb-16">
      {videoUrl ? (
        <div className="relative pt-[56.25%] w-full">
          <iframe 
            className="absolute inset-0 w-full h-full"
            src={`${videoUrl.replace('watch?v=', 'embed/')}?autoplay=1&mute=1&loop=1&playlist=${videoUrl.split('v=')[1]}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center p-6 max-w-3xl mx-auto z-10">
              {icon && <div className="inline-block text-bc-red mb-4">{icon}</div>}
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">{description}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${imagePath})` }}
          />
          <div className="relative container mx-auto px-4 py-24 text-center">
            {icon && <div className="inline-block text-bc-red mb-4">{icon}</div>}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">{description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceHeader;

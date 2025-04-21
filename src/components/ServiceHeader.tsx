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
  }, [videoUrl]);

  return (
    <div className="relative bg-black text-white mb-10">
      {videoUrl ? (
        <>
          <div className="relative w-full h-[80vw] md:h-[560px]">
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                objectFit: 'cover'
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center p-4 max-w-xl mx-auto z-10">
                {icon && <div className="inline-block text-bc-red mb-2">{icon}</div>}
                <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
                <p className="text-lg md:text-xl text-gray-200">{description}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: `url(${imagePath})` }}
          />
          <div className={`absolute inset-0 bg-gradient-to-b ${darkOverlay ? 'from-black/80 to-black/60' : 'from-black/70 to-black/50'}`} />
          <div className="relative container mx-auto px-4 py-16 md:py-24 text-center z-10">
            {icon && <div className="inline-block text-bc-red mb-4">{icon}</div>}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-shadow">{title}</h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 text-shadow-sm">{description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ServiceHeader;

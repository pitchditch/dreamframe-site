
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FullscreenImageViewerProps {
  children: React.ReactNode;
  imageSrc: string;
  altText?: string;
}

const FullscreenImageViewer: React.FC<FullscreenImageViewerProps> = ({ 
  children, 
  imageSrc, 
  altText = "Image" 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <div onClick={openFullscreen} className="cursor-pointer relative">
        {children}
        <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">Click to enlarge</span>
        </div>
      </div>

      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button 
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
            onClick={closeFullscreen}
          >
            <X size={24} />
          </button>
          <img 
            src={imageSrc} 
            alt={altText} 
            className="max-h-[90vh] max-w-[90vw] object-contain" 
          />
        </div>
      )}
    </>
  );
};

export default FullscreenImageViewer;


import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ServiceVideoOverlayProps {
  videoId: string;
  isHovering: boolean;
  onClose: () => void;
}

const ServiceVideoOverlay: React.FC<ServiceVideoOverlayProps> = ({ videoId, isHovering, onClose }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovering) {
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 1000); // Reduced from 1500ms to 1000ms for faster loading
      setHoverTimer(timer);
    } else {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
        setHoverTimer(null);
      }
      setShowVideo(false);
    }

    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [isHovering]);

  const handleClose = () => {
    setShowVideo(false);
    onClose();
  };

  if (!showVideo) return null;

  // Get video dimensions and zoom settings based on video ID
  const getVideoSettings = (id: string) => {
    switch (id) {
      case 'bbHnt4UNPcU': // Window cleaning
      case 'lYnXijewxCM': // House washing  
      case 'eQSgdx9ujcc': // Roof cleaning
        return {
          transform: 'scale(1.5)', // Increased zoom to remove black bars
          transformOrigin: 'center center'
        };
      case 'EdMlx1sYJDc': // Gutter cleaning (shorts format)
        return {
          transform: 'scale(2.2)', // More zoom for vertical video to remove side bars
          transformOrigin: 'center center'
        };
      default:
        return {
          transform: 'scale(1.3)',
          transformOrigin: 'center center'
        };
    }
  };

  const videoSettings = getVideoSettings(videoId);

  return (
    <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center rounded-2xl overflow-hidden">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-60 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      
      <div className="w-full h-full relative overflow-hidden rounded-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&fs=0&cc_load_policy=0&start=0&end=0&loop=0&disablekb=1`}
          className="w-full h-full object-cover"
          style={{ 
            border: 'none', 
            outline: 'none',
            ...videoSettings
          }}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          loading="eager"
        />
      </div>
    </div>
  );
};

export default ServiceVideoOverlay;

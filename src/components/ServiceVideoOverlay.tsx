
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
      }, 3000);
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

  return (
    <div className="absolute inset-0 z-50 bg-black/90 flex items-center justify-center rounded-2xl">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-60 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>
      
      <div className="w-full h-full relative overflow-hidden rounded-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
          className="w-full h-full object-cover"
          style={{ border: 'none', outline: 'none' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default ServiceVideoOverlay;

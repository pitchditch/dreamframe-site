
import { useState, useRef, useEffect } from 'react';

interface VideoHoverPlayerProps {
  videoIds: string[];
  thumbnailUrl: string;
  altText: string;
}

const VideoHoverPlayer = ({ videoIds, thumbnailUrl, altText }: VideoHoverPlayerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Clean up timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Switch to the next video after the current one finishes
  const handleVideoEnd = () => {
    const nextIndex = (currentVideoIndex + 1) % videoIds.length;
    setCurrentVideoIndex(nextIndex);
  };

  // Handle mouse enter/leave events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset to first video after a delay when mouse leaves
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = window.setTimeout(() => {
      setCurrentVideoIndex(0);
    }, 300);
  };

  return (
    <div 
      ref={playerRef}
      className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail image (shown when not hovering) */}
      {!isHovered && (
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={thumbnailUrl} 
            alt={altText}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-bc-red ml-1"></div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube iframe (shown when hovering) */}
      {isHovered && (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoIds[currentVideoIndex]}?autoplay=1&mute=1&modestbranding=1&rel=0&controls=0&showinfo=0&enablejsapi=1`}
          title={`YouTube video player ${currentVideoIndex + 1}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onEnded={handleVideoEnd}
        ></iframe>
      )}

      {/* Video label */}
      <div className="absolute bottom-4 right-4 bg-bc-red text-white px-2 py-1 rounded">
        Window Cleaning
      </div>
    </div>
  );
};

export default VideoHoverPlayer;

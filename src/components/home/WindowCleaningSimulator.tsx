
import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const WindowCleaningSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const dirtyImageRef = useRef<HTMLImageElement | null>(null);
  const cleanImageRef = useRef<HTMLImageElement | null>(null);
  const isMobile = useIsMobile();
  const touchRadius = isMobile ? 30 : 40;
  
  // Initialize canvas when component mounts
  useEffect(() => {
    const dirtyImg = new Image();
    const cleanImg = new Image();
    
    // Using placeholder images for dirty and clean windows
    dirtyImg.src = 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=800&h=600&fit=crop'; // Dirty glass building
    cleanImg.src = 'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=800&h=600&fit=crop'; // Clean glass roof
    
    dirtyImageRef.current = dirtyImg;
    cleanImageRef.current = cleanImg;

    // When dirty image loads, set up the canvas
    dirtyImg.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Set canvas dimensions based on image dimensions
      // but maintain responsive sizing
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const aspectRatio = dirtyImg.height / dirtyImg.width;
        canvas.width = Math.min(containerWidth, 350); // Reduced for better mobile fit
        canvas.height = canvas.width * aspectRatio;
      } else {
        canvas.width = Math.min(dirtyImg.width, 350);
        canvas.height = Math.min(dirtyImg.height, 350);
      }
      
      // Initial draw
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(dirtyImg, 0, 0, canvas.width, canvas.height);
      }
    };
    
    // When both images are loaded, we're ready to enable the interaction
    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === 2) setImagesLoaded(true);
    };
    
    dirtyImg.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const aspectRatio = dirtyImg.height / dirtyImg.width;
        canvas.width = Math.min(containerWidth, 350); // Reduced for better mobile fit
        canvas.height = canvas.width * aspectRatio;
      } else {
        canvas.width = Math.min(dirtyImg.width, 350);
        canvas.height = Math.min(dirtyImg.height, 350);
      }
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(dirtyImg, 0, 0, canvas.width, canvas.height);
      }
      
      checkLoaded();
    };
    
    cleanImg.onload = checkLoaded;
    
    // Handle window resize for responsive canvas
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !dirtyImageRef.current) return;
      
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const aspectRatio = dirtyImageRef.current.height / dirtyImageRef.current.width;
        canvas.width = Math.min(containerWidth, 350); // Reduced for better mobile fit
        canvas.height = canvas.width * aspectRatio;
      }
      
      // Redraw the canvas after resize
      const ctx = canvas.getContext('2d');
      if (ctx && dirtyImageRef.current) {
        ctx.drawImage(dirtyImageRef.current, 0, 0, canvas.width, canvas.height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Reveal clean window where the user interacts
  const reveal = (clientX: number, clientY: number) => {
    if (!isDrawing || !imagesLoaded) return;
    
    const canvas = canvasRef.current;
    const cleanImg = cleanImageRef.current;
    if (!canvas || !cleanImg) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    // Draw the clean image inside a circular mask
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, touchRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(cleanImg, 0, 0, canvas.width, canvas.height);
    ctx.restore();
  };
  
  // Mouse events
  const handleMouseDown = () => setIsDrawing(true);
  const handleMouseUp = () => setIsDrawing(false);
  const handleMouseMove = (e: React.MouseEvent) => reveal(e.clientX, e.clientY);
  
  // Touch events
  const handleTouchStart = () => setIsDrawing(true);
  const handleTouchEnd = () => setIsDrawing(false);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches && e.touches[0]) {
      reveal(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative w-full flex justify-center">
        <canvas 
          ref={canvasRef}
          className="border-2 border-gray-300 rounded-lg max-w-full"
          style={{
            cursor: isMobile ? 'default' : 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'><circle cx=\'16\' cy=\'16\' r=\'8\' fill=\'%234A90E2\' opacity=\'0.7\'/><circle cx=\'16\' cy=\'16\' r=\'12\' stroke=\'%234A90E2\' stroke-width=\'2\' fill=\'none\'/></svg>") 16 16, crosshair'
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onTouchMove={handleTouchMove}
        />
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg">
            <div className="loader animate-spin border-4 border-t-bc-red border-gray-200 rounded-full h-10 w-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WindowCleaningSimulator;

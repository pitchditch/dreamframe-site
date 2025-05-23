
import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const BeforeAfterAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const dirtyImageRef = useRef<HTMLImageElement | null>(null);
  const cleanImageRef = useRef<HTMLImageElement | null>(null);
  const isMobile = useIsMobile();
  const touchRadius = isMobile ? 25 : 35;
  
  // Initialize canvas when component mounts
  useEffect(() => {
    const dirtyImg = new Image();
    const cleanImg = new Image();
    
    // Set image sources
    dirtyImg.src = '/lovable-uploads/fba99b3e-4c8b-48f2-9ed7-2abe842008f1.png';
    cleanImg.src = '/lovable-uploads/31236a35-bb3b-4d03-99fd-ea6454acd26e.png';
    
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
        canvas.width = Math.min(containerWidth, 600);
        canvas.height = canvas.width * aspectRatio;
      } else {
        canvas.width = Math.min(dirtyImg.width, 600);
        canvas.height = Math.min(dirtyImg.height, 600);
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
        canvas.width = Math.min(containerWidth, 600);
        canvas.height = canvas.width * aspectRatio;
      } else {
        canvas.width = Math.min(dirtyImg.width, 600);
        canvas.height = Math.min(dirtyImg.height, 600);
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
        canvas.width = Math.min(containerWidth, 600);
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
  
  // Reveal clean image where the user interacts
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
    <div className="w-full max-w-2xl mx-auto my-8">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
          Pressure Washing Simulator
        </h3>
        <p className="text-gray-600 text-center mb-4">
          {isMobile ? "Drag your finger" : "Click and drag your mouse"} across the image to clean it!
        </p>
        <div className="relative w-full">
          <canvas 
            ref={canvasRef}
            className="mx-auto border-2 border-gray-300 rounded-lg"
            style={{
              cursor: isMobile ? 'default' : `url('/lovable-uploads/479553d0-b664-48ff-81cf-a171c9e73d8c.png') 16 16, crosshair`
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
        <div className="mt-3 text-center text-sm text-gray-500">
          See the difference professional pressure washing can make!
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterAnimation;

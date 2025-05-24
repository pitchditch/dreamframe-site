
import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const PressureWashingSimulator = () => {
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
    
    // Using pressure washing before/after images
    dirtyImg.src = '/lovable-uploads/bac07608-1eeb-4905-b5db-79aa9ad91672.png'; // Dirty driveway
    cleanImg.src = '/lovable-uploads/89515ed3-256d-4840-a9ed-2049bb5d0d1f.png'; // Clean driveway
    
    dirtyImageRef.current = dirtyImg;
    cleanImageRef.current = cleanImg;

    // When dirty image loads, set up the canvas
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
    };
    
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
  
  // Reveal clean surface where the user interacts
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
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="relative w-full">
        <canvas 
          ref={canvasRef}
          className="mx-auto border-2 border-gray-300 rounded-lg"
          style={{
            cursor: isMobile ? 'default' : `url("/lovable-uploads/f46e5017-7ff2-47da-801c-4ef68108a6b1.png") 16 16, crosshair`
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
        Experience our high-pressure cleaning power - remove years of buildup!
      </div>
    </div>
  );
};

export default PressureWashingSimulator;

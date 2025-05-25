
import { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const EnhancedWindowCleaningSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [cleanedPixels, setCleanedPixels] = useState(0);
  const [progress, setProgress] = useState(0);
  const dirtyImageRef = useRef<HTMLImageElement | null>(null);
  const cleanImageRef = useRef<HTMLImageElement | null>(null);
  const isMobile = useIsMobile();
  const touchRadius = isMobile ? 30 : 40;
  const totalPixelsRef = useRef(0);
  
  // Initialize canvas when component mounts
  useEffect(() => {
    const dirtyImg = new Image();
    const cleanImg = new Image();
    
    // Using the new uploaded images
    dirtyImg.src = '/lovable-uploads/16331103-22f8-48d7-a74e-cce38b2e0dfc.png'; // Dirty window
    cleanImg.src = '/lovable-uploads/b10d2aad-ec60-45cc-b95d-12422ee20ba0.png'; // Clean window
    
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
        canvas.width = Math.min(containerWidth, 400);
        canvas.height = canvas.width * aspectRatio;
      } else {
        canvas.width = Math.min(dirtyImg.width, 400);
        canvas.height = Math.min(dirtyImg.height, 400);
      }
      
      totalPixelsRef.current = canvas.width * canvas.height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(dirtyImg, 0, 0, canvas.width, canvas.height);
        createDroplets();
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
        canvas.width = Math.min(containerWidth, 400);
        canvas.height = canvas.width * aspectRatio;
      } else {
        canvas.width = Math.min(dirtyImg.width, 400);
        canvas.height = Math.min(dirtyImg.height, 400);
      }
      
      totalPixelsRef.current = canvas.width * canvas.height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(dirtyImg, 0, 0, canvas.width, canvas.height);
        createDroplets();
      }
      
      checkLoaded();
    };
    
    cleanImg.onload = checkLoaded;
    
    const createDroplets = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const droplets = [];
      for (let i = 0; i < 10; i++) {
        droplets.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 1 + Math.random() * 2,
          length: 10 + Math.random() * 20
        });
      }

      const animateDroplets = () => {
        if (!dirtyImageRef.current || !canvas) return;
        
        ctx.drawImage(dirtyImageRef.current, 0, 0, canvas.width, canvas.height);

        droplets.forEach(drop => {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(50, 50, 50, 0.3)';
          ctx.lineWidth = 2;
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x, drop.y + drop.length);
          ctx.stroke();

          drop.y += drop.speed;
          if (drop.y > canvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * canvas.width;
          }
        });

        requestAnimationFrame(animateDroplets);
      };

      animateDroplets();
    };
    
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !dirtyImageRef.current) return;
      
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const aspectRatio = dirtyImageRef.current.height / dirtyImageRef.current.width;
        canvas.width = Math.min(containerWidth, 400);
        canvas.height = canvas.width * aspectRatio;
      }
      
      totalPixelsRef.current = canvas.width * canvas.height;
      
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
  
  // Reveal clean window where the user interacts and track progress
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
    
    // Get image data to track cleaned pixels
    const imageData = ctx.getImageData(x - touchRadius, y - touchRadius, touchRadius * 2, touchRadius * 2);
    let cleared = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] > 0) { // alpha > 0
        imageData.data[i + 3] = 0; // make transparent
        cleared++;
      }
    }

    // Draw the clean image inside a circular mask
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, touchRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(cleanImg, 0, 0, canvas.width, canvas.height);
    ctx.restore();
    
    // Update progress
    const newCleanedPixels = cleanedPixels + cleared;
    setCleanedPixels(newCleanedPixels);
    const newProgress = Math.min((newCleanedPixels / totalPixelsRef.current) * 100, 100);
    setProgress(newProgress);
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
    <div className="w-full max-w-lg mx-auto">
      <div className="relative w-full flex justify-center">
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="border-2 border-gray-300 rounded-lg max-w-full"
            style={{
              cursor: isMobile ? 'default' : `url("/lovable-uploads/7a1fa53a-508b-41ed-b552-449e7fb224ea.png") 16 16, crosshair`
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
          
          {/* Progress Bar */}
          <div className="absolute bottom-3 left-3 right-3 h-5 bg-gray-200 border border-gray-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress Text */}
          <div className="absolute bottom-8 left-3 text-white text-sm font-semibold bg-black bg-opacity-50 px-2 py-1 rounded">
            {Math.round(progress)}% Clean
          </div>
          
          {!imagesLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg">
              <div className="loader animate-spin border-4 border-t-bc-red border-gray-200 rounded-full h-10 w-10" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedWindowCleaningSimulator;

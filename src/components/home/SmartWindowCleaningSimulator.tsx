
import React, { useEffect, useRef, useState } from 'react';

const SmartWindowCleaningSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentPhase, setCurrentPhase] = useState<'dirty' | 'cleaning' | 'clean'>('dirty');
  const [squeegeePosition, setSqueegeePosition] = useState({ x: 0, y: 0 });
  const [animationProgress, setAnimationProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const cleanImageRef = useRef<HTMLImageElement | null>(null);
  const dirtyImageRef = useRef<HTMLImageElement | null>(null);
  const squeegeeImageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const cleanImg = new Image();
    const dirtyImg = new Image();
    const squeegeeImg = new Image();
    
    // Using the uploaded images
    cleanImg.src = '/lovable-uploads/8c96522a-388a-492d-86cc-6270855975ca.png'; // Clean beach scene
    dirtyImg.src = '/lovable-uploads/a20542e3-f544-4cee-9d54-8956c57ac0f3.png'; // Dirty beach scene with rain
    squeegeeImg.src = '/lovable-uploads/fa54dbe5-2d16-4455-9c46-96926e3ce036.png'; // Squeegee tool
    
    cleanImageRef.current = cleanImg;
    dirtyImageRef.current = dirtyImg;
    squeegeeImageRef.current = squeegeeImg;

    let loadedCount = 0;
    const checkLoaded = () => {
      loadedCount++;
      if (loadedCount === 3) {
        setImagesLoaded(true);
        initializeCanvas();
      }
    };
    
    cleanImg.onload = checkLoaded;
    dirtyImg.onload = checkLoaded;
    squeegeeImg.onload = checkLoaded;

    const initializeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas || !dirtyImg) return;
      
      const container = canvas.parentElement;
      if (container) {
        const containerWidth = container.clientWidth;
        const aspectRatio = dirtyImg.height / dirtyImg.width;
        canvas.width = Math.min(containerWidth, 400);
        canvas.height = canvas.width * aspectRatio;
      }
      
      drawCurrentState();
    };

    return () => {
      cleanImg.onload = null;
      dirtyImg.onload = null;
      squeegeeImg.onload = null;
    };
  }, []);

  const drawCurrentState = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentPhase === 'dirty') {
      // Draw dirty image
      if (dirtyImageRef.current) {
        ctx.drawImage(dirtyImageRef.current, 0, 0, canvas.width, canvas.height);
      }
    } else if (currentPhase === 'clean') {
      // Draw clean image
      if (cleanImageRef.current) {
        ctx.drawImage(cleanImageRef.current, 0, 0, canvas.width, canvas.height);
      }
    } else if (currentPhase === 'cleaning') {
      // Draw cleaning animation
      if (dirtyImageRef.current && cleanImageRef.current) {
        // Draw dirty image as base
        ctx.drawImage(dirtyImageRef.current, 0, 0, canvas.width, canvas.height);
        
        // Create cleaning effect based on squeegee position
        const cleanHeight = (animationProgress / 100) * canvas.height;
        
        if (cleanHeight > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(0, 0, canvas.width, cleanHeight);
          ctx.clip();
          ctx.drawImage(cleanImageRef.current, 0, 0, canvas.width, canvas.height);
          ctx.restore();
        }
        
        // Draw squeegee
        if (squeegeeImageRef.current && animationProgress < 100) {
          const squeegeeSize = 60;
          const squeegeeX = canvas.width / 2 - squeegeeSize / 2;
          const squeegeeY = cleanHeight - squeegeeSize / 2;
          
          ctx.drawImage(
            squeegeeImageRef.current,
            squeegeeX,
            squeegeeY,
            squeegeeSize,
            squeegeeSize
          );
        }
      }
    }
  };

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      if (currentPhase === 'dirty') {
        setCurrentPhase('cleaning');
        setAnimationProgress(0);
      } else if (currentPhase === 'cleaning') {
        setAnimationProgress(prev => {
          const newProgress = prev + 2;
          if (newProgress >= 100) {
            setTimeout(() => setCurrentPhase('clean'), 500);
            return 100;
          }
          return newProgress;
        });
      } else if (currentPhase === 'clean') {
        setTimeout(() => {
          setCurrentPhase('dirty');
          setAnimationProgress(0);
        }, 2000);
      }
    }, currentPhase === 'cleaning' ? 50 : 3000);

    return () => clearInterval(interval);
  }, [currentPhase, imagesLoaded]);

  useEffect(() => {
    drawCurrentState();
  }, [currentPhase, animationProgress, imagesLoaded]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative w-full flex justify-center">
        <div className="relative">
          <canvas 
            ref={canvasRef}
            className="border-4 border-amber-800 rounded-lg max-w-full shadow-2xl"
            style={{
              background: 'linear-gradient(45deg, #8B4513, #A0522D)',
              padding: '8px'
            }}
          />
          {!imagesLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg">
              <div className="animate-spin border-4 border-t-bc-red border-gray-200 rounded-full h-10 w-10" />
            </div>
          )}
          
          {/* Phase indicator */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-white px-3 py-1 rounded-full shadow-md text-sm font-medium">
              {currentPhase === 'dirty' && '💧 Dirty Window'}
              {currentPhase === 'cleaning' && '🧽 Cleaning...'}
              {currentPhase === 'clean' && '✨ Crystal Clear!'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartWindowCleaningSimulator;

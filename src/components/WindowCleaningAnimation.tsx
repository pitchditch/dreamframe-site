
import React, { useState } from 'react';

const WindowCleaningAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStartAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Reset animation after it completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">See Our Window Cleaning in Action</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Click to watch our professional window cleaning process transform dirty windows into crystal clear perfection
          </p>
        </div>

        <div className="flex justify-center">
          <div 
            className="window-clean-animation cursor-pointer"
            onClick={handleStartAnimation}
          >
            <img 
              src="/lovable-uploads/fba99b3e-4c8b-48f2-9ed7-2abe842008f1.png" 
              alt="Dirty window before cleaning"
              className="dirty-window" 
            />
            <img 
              src="/lovable-uploads/31236a35-bb3b-4d03-99fd-ea6454acd26e.png" 
              alt="Clean window after cleaning"
              className={`clean-window ${isAnimating ? 'animate' : ''}`}
            />
            <div className={`squeegee ${isAnimating ? 'animate' : ''}`}></div>
            
            {!isAnimating && (
              <div className="play-overlay">
                <div className="play-button">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.9)" stroke="#dc2626" strokeWidth="2"/>
                    <polygon points="10,8 16,12 10,16" fill="#dc2626"/>
                  </svg>
                </div>
                <p className="mt-4 text-white font-semibold bg-black bg-opacity-50 px-4 py-2 rounded">
                  Click to see the transformation!
                </p>
              </div>
            )}
          </div>
        </div>

        <style jsx>{`
          .window-clean-animation {
            position: relative;
            width: 600px;
            height: 400px;
            overflow: hidden;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.3s ease;
          }

          .window-clean-animation:hover {
            transform: scale(1.02);
          }

          .window-clean-animation img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .clean-window {
            clip-path: inset(0 100% 0 0);
            transition: clip-path 3s ease-in-out;
          }

          .clean-window.animate {
            clip-path: inset(0 0 0 0);
          }

          .squeegee {
            position: absolute;
            width: 60px;
            height: 200px;
            background: url('/lovable-uploads/479553d0-b664-48ff-81cf-a171c9e73d8c.png') no-repeat center center;
            background-size: contain;
            top: 100px;
            left: -60px;
            transform: rotate(10deg);
            transition: left 3s ease-in-out;
            z-index: 10;
          }

          .squeegee.animate {
            left: 550px;
          }

          .play-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 5;
          }

          .play-button {
            animation: pulse 2s infinite;
          }

          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }

          @media (max-width: 768px) {
            .window-clean-animation {
              width: 90vw;
              max-width: 500px;
              height: 300px;
            }
            
            .squeegee.animate {
              left: calc(90vw - 120px);
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default WindowCleaningAnimation;

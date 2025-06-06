
import React from 'react';

const FloatingBubbles = () => {
  // Generate random bubble positions and animation delays
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10, // 10-30px
    left: Math.random() * 100, // 0-100%
    animationDelay: Math.random() * 5, // 0-5s delay
    animationDuration: Math.random() * 3 + 4, // 4-7s duration
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden md:hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white/20 backdrop-blur-sm animate-float-up"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            bottom: '-50px',
            animationDelay: `${bubble.animationDelay}s`,
            animationDuration: `${bubble.animationDuration}s`,
            boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;

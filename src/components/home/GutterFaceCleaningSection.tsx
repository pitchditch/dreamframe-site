
import React, { useEffect, useRef, useState } from 'react';

const GutterFaceCleaningSection = () => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When section becomes visible
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Effect to play the video when it becomes visible
  useEffect(() => {
    if (isVisible && videoRef.current) {
      // Force reload the iframe to make sure autoplay works
      const currentSrc = videoRef.current.src;
      videoRef.current.src = '';
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.src = currentSrc;
        }
      }, 100);
    }
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Gutter Guard Installation</h2>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe
              ref={videoRef}
              className="w-full h-[400px]" 
              src={`https://www.youtube.com/embed/OICbIRmx-80?autoplay=${isVisible ? '1' : '0'}&mute=1&controls=1&loop=1&playlist=OICbIRmx-80&showinfo=0&rel=0`}
              title="Gutter Guard Installation"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-bc-red">Keep Your Gutters Protected</h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Tired of cleaning gutters?</strong> Our professional gutter guard installation services can help reduce maintenance and prevent clogging.
              </p>
              <p className="text-gray-700">
                Gutter guards create a barrier that allows water to flow freely while blocking leaves, pine needles, and debris that cause clogs and water damage to your home.
              </p>
              <div className="mt-6">
                <a 
                  href="/calculator" 
                  className="bg-bc-red hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium inline-block transition-all"
                >
                  Get a Free Quote Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GutterFaceCleaningSection;

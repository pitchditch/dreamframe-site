
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const HeroSection = () => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Updated seasonal images - fall/winter focused
  const backgroundImages = [
    '/lovable-uploads/b95d1627-279e-41d5-877b-865a57c88997.png', // Winter street scene (new)
    'https://images.unsplash.com/photo-1472396961693-142e6e269027', // Fall deer scene
    'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9', // Winter pine trees
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05', // Winter foggy mountain
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-on-scroll">
          {t("Premium Exterior Cleaning Solutions")}
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-on-scroll">
          {t("Professional pressure washing, window cleaning, and exterior maintenance services across Metro Vancouver")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-on-scroll">
          <Button asChild size="lg" className="bg-bc-red hover:bg-red-700 text-white px-8 py-4 text-lg">
            <Link to="/contact">{t("Get Free Estimate")}</Link>
          </Button>
        </div>
      </div>
      
      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

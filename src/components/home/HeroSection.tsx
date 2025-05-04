import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/use-translation';

const HeroSection = () => {
  const [postalCode, setPostalCode] = useState('');
  const [ghostText, setGhostText] = useState('Enter your postal code');
  const [isPaused, setIsPaused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const ghostTexts = [
      t('Enter your postal code'),
      t('Your postal code'),
      t('Postal code'),
      t('Enter postal code')
    ];
    let index = 0;
    let intervalId: NodeJS.Timeout;

    if (!isPaused) {
      intervalId = setInterval(() => {
        setGhostText(ghostTexts[index]);
        index = (index + 1) % ghostTexts.length;
      }, 1500);
    }

    return () => clearInterval(intervalId);
  }, [isPaused, t]);

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value.toUpperCase());
  };

  const handlePostalCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postalCode.length === 6) {
      navigate(`/calculator?postalCode=${postalCode}`);
    } else {
      inputRef?.current?.focus();
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          id="hero-video"
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source 
            src="https://hp-media-usa.s3.us-west-1.amazonaws.com/BCPressureWashing+Hero+Video.mp4" 
            type="video/mp4"
          /> 
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* White curved shape at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg 
            className="relative block w-full h-20" 
            data-name="Layer 1" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10 text-white pt-36 sm:pt-28 md:pt-0">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-bc-red/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4 animate-on-scroll">
            <span className="text-white font-medium text-sm md:text-base">Professional Exterior Cleaning Services</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
            Professional Window <br className="hidden sm:block"/> & Pressure Washing
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-shadow">
            Serving Surrey, White Rock & the Greater Vancouver area with 5-star service and exceptional results.
          </p>
          
          {/* Postal Code Lookup Form */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handlePostalCodeSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={postalCode} 
                  onChange={handlePostalCodeChange}
                  onFocus={() => setIsPaused(true)} 
                  onBlur={() => setIsPaused(false)}
                  placeholder="Enter your postal code" 
                  className="w-full px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-bc-red"
                />
                {!postalCode && (
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="postal-code-ghost">{ghostText}</span>
                  </div>
                )}
              </div>
              <button 
                type="submit" 
                className="bg-bc-red hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-all sm:flex-shrink-0"
              >
                GET A QUOTE
              </button>
            </form>
            <p className="mt-3 text-sm text-shadow">
              Free quotes, No obligation, Instant results
            </p>
          </div>
          
          {/* Badges Section */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 items-center">
            <img src="/lovable-uploads/3a5d6770-e34e-4a72-b310-07de41af1c93.png" alt="4.9 Star Google Rating" className="h-14 md:h-16" />
            <img src="/lovable-uploads/82d69edb-6210-433b-a762-4610f454fc2c.png" alt="BBB Accredited Business" className="h-14 md:h-16" />
            <img src="/lovable-uploads/bba21852-c38f-4adc-a87a-cd27a5a26d86.png" alt="Fully Insured" className="h-14 md:h-16" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

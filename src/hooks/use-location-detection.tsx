
import { useState, useEffect } from 'react';
import { getCityBySlug } from '@/data/cities';
import type { CityData } from '@/data/cities';

interface LocationData {
  city: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  detectedCity?: CityData;
}

export const useLocationDetection = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const detectCityFromLocation = (cityName: string): CityData | null => {
    // Normalize city name for better matching
    const normalizedCity = cityName.toLowerCase().replace(/\s+/g, '-');
    
    // Try exact match first
    let detectedCity = getCityBySlug(normalizedCity);
    
    // If no exact match, try partial matching
    if (!detectedCity) {
      const cities = [
        { name: "Vancouver", slug: "vancouver" },
        { name: "Surrey", slug: "surrey" },
        { name: "Burnaby", slug: "burnaby" },
        { name: "Richmond", slug: "richmond" },
        { name: "Coquitlam", slug: "coquitlam" },
        { name: "Langley", slug: "langley-city" },
        { name: "Delta", slug: "delta" },
        { name: "New Westminster", slug: "new-westminster" },
        { name: "Port Coquitlam", slug: "port-coquitlam" },
        { name: "Port Moody", slug: "port-moody" },
        { name: "Maple Ridge", slug: "maple-ridge" },
        { name: "Pitt Meadows", slug: "pitt-meadows" },
        { name: "White Rock", slug: "white-rock" },
        { name: "Kelowna", slug: "kelowna" }
      ];
      
      // Check if city name contains any of our service cities
      for (const city of cities) {
        if (cityName.toLowerCase().includes(city.name.toLowerCase()) || 
            city.name.toLowerCase().includes(cityName.toLowerCase())) {
          detectedCity = getCityBySlug(city.slug);
          break;
        }
      }
    }
    
    return detectedCity;
  };

  const getLocationByGeolocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Use reverse geocoding to get city name
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            
            if (response.ok) {
              const data = await response.json();
              const cityName = data.city || data.locality || 'Unknown';
              const detectedCity = detectCityFromLocation(cityName);
              
              resolve({
                city: cityName,
                region: data.principalSubdivision || 'BC',
                country: data.countryCode || 'CA',
                lat: latitude,
                lon: longitude,
                detectedCity
              });
            } else {
              // Fallback to IP-based location
              resolve(await getLocationByIP());
            }
          } catch (err) {
            // Fallback to IP-based location
            resolve(await getLocationByIP());
          }
        },
        async () => {
          // User denied location access, fallback to IP
          resolve(await getLocationByIP());
        },
        { timeout: 10000 }
      );
    });
  };

  const getLocationByIP = async (): Promise<LocationData> => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const cityName = data.city || 'White Rock';
      const detectedCity = detectCityFromLocation(cityName);
      
      return {
        city: cityName,
        region: data.region || 'BC',
        country: data.country_code || 'CA',
        lat: data.latitude || 49.0259,
        lon: data.longitude || -122.8034,
        detectedCity
      };
    } catch (err) {
      // Ultimate fallback to White Rock, BC
      const detectedCity = getCityBySlug('white-rock');
      return {
        city: 'White Rock',
        region: 'BC',
        country: 'CA',
        lat: 49.0259,
        lon: -122.8034,
        detectedCity
      };
    }
  };

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try geolocation first, then fallback to IP
        const locationData = await getLocationByGeolocation();
        setLocation(locationData);
        
        // Store detected location in localStorage for future visits
        localStorage.setItem('detectedLocation', JSON.stringify(locationData));
        
        console.log('Detected location:', locationData);
      } catch (err) {
        console.error('Location detection error:', err);
        setError('Failed to detect location');
        
        // Check if we have a previously detected location
        const storedLocation = localStorage.getItem('detectedLocation');
        if (storedLocation) {
          try {
            setLocation(JSON.parse(storedLocation));
          } catch (parseErr) {
            console.error('Error parsing stored location:', parseErr);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  return {
    location,
    loading,
    error,
    detectedCity: location?.detectedCity || null
  };
};

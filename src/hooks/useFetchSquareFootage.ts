
import { useState } from "react";

// Simulated fetch function for square footage;
// Replace this logic with a real API fetch later!
async function fetchSquareFootageFromAPI(address: string): Promise<number | null> {
  // Simulate API delay
  await new Promise((r) => setTimeout(r, 1200));
  // Fake data: Random reasonable square footage per address hash
  if (!address) return null;
  // Using last char's char code to simulate variability for demo
  const fakeVal = 1500 + (address.charCodeAt(address.length - 1) % 2000);
  return fakeVal;
}

export function useFetchSquareFootage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getSquareFootage(address: string): Promise<number | null> {
    setLoading(true);
    setError(null);
    try {
      const sqft = await fetchSquareFootageFromAPI(address);
      setLoading(false);
      return sqft;
    } catch (err) {
      setError("Could not fetch square footage");
      setLoading(false);
      return null;
    }
  }

  return { getSquareFootage, loading, error };
}

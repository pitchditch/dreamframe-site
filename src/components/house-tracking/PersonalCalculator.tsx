
import React, { useState, useEffect } from 'react';
import { HousePin } from './types';
import { useFetchSquareFootage } from '@/hooks/useFetchSquareFootage';

interface PersonalCalculatorProps {
  selectedPin: HousePin | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdatePin: (id: string, updates: Partial<HousePin>) => void;
}

const PersonalCalculator: React.FC<PersonalCalculatorProps> = ({
  selectedPin,
  isOpen,
  onClose,
  onUpdatePin
}) => {
  const [personalSqftRate, setPersonalSqftRate] = useState(0.18);
  const [personalStart, setPersonalStart] = useState('White Rock, BC');
  const [personalKmRate, setPersonalKmRate] = useState(0.7);
  const [personalTravelKms, setPersonalTravelKms] = useState<number|null>(null);
  const [personalTravelErr, setPersonalTravelErr] = useState<string>('');
  const [editSqft, setEditSqft] = useState(0);

  const { getSquareFootage, loading: fetchingSqft, error: sqftError } = useFetchSquareFootage();

  useEffect(() => {
    setEditSqft(selectedPin?.squareFootage ?? 0);
  }, [selectedPin]);

  const estimate = Math.round((editSqft || 0) * personalSqftRate * 100) / 100;
  const travelCost = personalTravelKms !== null ? Math.round(personalTravelKms * personalKmRate * 100) / 100 : 0;

  const handleSaveSqft = () => {
    if (selectedPin && editSqft !== selectedPin.squareFootage) {
      onUpdatePin(selectedPin.id, { squareFootage: +editSqft });
    }
  };

  const getLatLngFromAddress = async (address: string) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
    const resp = await fetch(url);
    const data = await resp.json();
    if (data && data.length) {
      return { lat: +data[0].lat, lng: +data[0].lon };
    }
    throw new Error('Address not found');
  };

  const haversine = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const toRad = (v: number) => v * Math.PI / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const handleCalcTravel = async () => {
    setPersonalTravelErr('');
    setPersonalTravelKms(null);
    if (!personalStart.trim() || !selectedPin) return;
    try {
      const from = await getLatLngFromAddress(personalStart.trim());
      const dist = haversine(from.lat, from.lng, selectedPin.lat, selectedPin.lng);
      setPersonalTravelKms(dist);
    } catch (e) {
      setPersonalTravelErr('Could not geocode start address');
    }
  };

  if (!isOpen || !selectedPin) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-40 px-8 py-6 border-l-2 overflow-y-auto">
      <button 
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-800" 
        onClick={onClose}
      >
        ×
      </button>
      <h3 className="text-2xl font-bold mb-4">Personal Estimate Calculator</h3>
      <div className="mb-2">
        <div className="font-semibold text-lg">{selectedPin.address}</div>
        <div className="text-xs text-gray-500">({selectedPin.lat.toFixed(5)}, {selectedPin.lng.toFixed(5)})</div>
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium text-gray-700">Square Footage</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={editSqft}
            min={0}
            className="border rounded px-2 py-1 w-32"
            onChange={e => setEditSqft(+e.target.value)}
            disabled={fetchingSqft}
          />
          <button
            onClick={handleSaveSqft}
            className="bg-blue-600 text-white px-3 py-1 rounded font-bold hover:bg-blue-700"
            disabled={editSqft === (selectedPin.squareFootage ?? 0) || fetchingSqft}
            title="Save sqft to this pin"
          >
            Save
          </button>
          {fetchingSqft && (
            <span className="ml-2 animate-pulse text-blue-500 text-xs">Getting sqft…</span>
          )}
          {sqftError && (
            <span className="ml-2 text-red-500 text-xs">{sqftError}</span>
          )}
        </div>
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-medium text-gray-700">Your Per Sqft Rate ($)</label>
        <input
          type="number"
          value={personalSqftRate}
          min={0}
          step="0.01"
          className="border rounded px-2 py-1 w-32"
          onChange={e => setPersonalSqftRate(+e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-1 font-semibold text-lg">Estimate</label>
        <div className="text-2xl font-mono font-bold">${estimate?.toLocaleString()}</div>
      </div>
      <hr className="mb-6"/>
      <h4 className="font-semibold mb-2">Travel Cost Calculator</h4>
      <label className="block mb-1">From (start address or postal code)</label>
      <input
        type="text"
        value={personalStart}
        className="border rounded px-2 py-1 w-full mb-2"
        onChange={e => setPersonalStart(e.target.value)}
      />
      <label className="block mb-1">Travel Rate ($/km)</label>
      <input
        type="number"
        value={personalKmRate}
        step="0.01"
        min={0}
        className="border rounded px-2 py-1 w-32 mb-2"
        onChange={e => setPersonalKmRate(+e.target.value)}
      />
      <button 
        onClick={handleCalcTravel} 
        className="bg-green-600 text-white px-3 py-1 rounded font-semibold hover:bg-green-700 mb-2"
      >
        Calculate Distance
      </button>
      {personalTravelKms !== null && (
        <div className="mb-2">
          <div className="text-xs text-gray-500">Distance: <span className="font-bold">{personalTravelKms.toFixed(2)} km</span></div>
          <div className="text-xl font-bold">${travelCost.toLocaleString()} <span className="text-xs text-gray-500 font-normal">(travel)</span></div>
        </div>
      )}
      {personalTravelErr && <div className="text-red-600 text-xs">{personalTravelErr}</div>}
      <hr className="my-4"/>
      <div className="flex gap-2">
        <button className="bg-gray-100 px-4 py-2 rounded" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PersonalCalculator;

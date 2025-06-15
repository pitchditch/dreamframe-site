import React, { useEffect, useState } from "react";
import { HousePin } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Calculator, MapPin } from "lucide-react";

type Props = {
  pin: HousePin;
  onSaveSqft: (pinId: string, newSqft: number) => void;
  onClose: () => void;
  isOpen: boolean;
};

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Minimal address to lat/lng stub for now (user must type manually):
async function getLatLngFromAddress(address: string): Promise<{ lat: number; lng: number; }> {
  // In production, hook up your address geocoding service/API.
  // For now, throw if it's empty.
  if (!address.trim()) throw new Error("Start address required");
  // This stub just returns a location near the city center (change to Google Maps API etc as desired).
  return { lat: 49.0477, lng: -122.2856 }; // Langley, BC centroid as default.
}

const DEFAULT_RATE = 0.18; // Example: $0.18 per square foot
const DEFAULT_TRAVEL_RATE_PER_KM = 1.0; // $1 per km for travel

const PersonalHouseEstimatorSidebar: React.FC<Props> = ({
  pin,
  onSaveSqft,
  onClose,
  isOpen,
}) => {
  // UI state
  const [editSqft, setEditSqft] = useState<number>(pin.squareFootage ?? 0);
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [showEditRate, setShowEditRate] = useState(false);

  // Travel cost
  const [startAddress, setStartAddress] = useState<string>("");
  const [travelDistance, setTravelDistance] = useState<number | null>(null);
  const [travelRate, setTravelRate] = useState(DEFAULT_TRAVEL_RATE_PER_KM);
  const [travelLoading, setTravelLoading] = useState(false);
  const [travelError, setTravelError] = useState<string | null>(null);

  // Update sqft input when the pin changes
  useEffect(() => {
    setEditSqft(pin.squareFootage ?? 0);
  }, [pin]);

  // Input handling
  const handleSaveSqft = () => {
    if (editSqft !== pin.squareFootage) {
      onSaveSqft(pin.id, editSqft);
    }
  };

  const handleTravelCalc = async () => {
    setTravelLoading(true);
    setTravelError(null);
    try {
      const from = await getLatLngFromAddress(startAddress.trim());
      const dist = haversine(from.lat, from.lng, pin.lat, pin.lng);
      setTravelDistance(dist);
    } catch (e: any) {
      setTravelError(e.message || "Geocode error");
    }
    setTravelLoading(false);
  };

  if (!isOpen) return null;

  return (
    <aside
      className="fixed top-0 right-0 w-full max-w-sm sm:max-w-md h-full bg-white border-l z-30 shadow-lg overflow-y-auto"
      style={{ transition: "transform 0.2s" }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b px-5 py-4 bg-gray-50">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-amber-500" />
            <CardTitle className="text-lg font-semibold">Estimate for</CardTitle>
          </div>
          <Button size="icon" variant="ghost" onClick={onClose}><X /></Button>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 px-5 py-4 gap-4">
          <div>
            <div className="font-medium text-gray-700 truncate flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-500"/> {pin.address}
            </div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Sqft:
            </label>
            <div className="flex gap-2 items-end mb-2">
              <Input
                type="number"
                min={0}
                className="w-24"
                value={editSqft}
                onChange={e => setEditSqft(Number(e.target.value))}
                onBlur={handleSaveSqft}
              />
              <Button size="sm" className="h-8 px-3" onClick={handleSaveSqft} disabled={editSqft === pin.squareFootage}>
                Save
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-xs text-gray-500">Per sqft rate:</span>
              {!showEditRate ? (
                <>
                  <span>${rate.toFixed(2)}</span>
                  <Button variant="ghost" className="h-6 px-2 text-xs" size="sm" onClick={() => setShowEditRate(true)}>Edit</Button>
                </>
              ) : (
                <>
                  <Input
                    className="w-20"
                    type="number"
                    min="0"
                    step="0.01"
                    value={rate}
                    onChange={e => setRate(Number(e.target.value))}
                  />
                  <Button size="sm" className="h-8 px-2" onClick={() => setShowEditRate(false)}>Done</Button>
                </>
              )}
            </div>
            <div className="text-sm text-gray-700 mb-2">
              Estimate: <span className="font-semibold">${(editSqft * rate).toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-3 pb-2 border-t pt-3">
            <div className="font-bold text-amber-700 mb-2 flex items-center gap-2">
              Travel Cost Calculator
            </div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              Start Address:
            </label>
            <div className="flex gap-2 mb-2">
              <Input
                type="text"
                placeholder="Type your start address"
                value={startAddress}
                onChange={e => setStartAddress(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleTravelCalc} className="h-8">
                Calc
              </Button>
            </div>
            <div className="flex gap-2 items-end mb-2">
              <label className="text-xs font-semibold text-gray-500">$/km:</label>
              <Input
                className="w-20"
                type="number"
                min="0"
                step="0.01"
                value={travelRate}
                onChange={e => setTravelRate(Number(e.target.value))}
              />
            </div>
            {travelDistance !== null && !travelError && (
              <div className="text-sm text-green-700 mb-1">
                Distance: {travelDistance.toFixed(1)} km<br />
                Travel cost: <span className="font-semibold">${(travelDistance * travelRate).toFixed(2)}</span>
              </div>
            )}
            {travelError && (
              <div className="text-xs text-red-500 mb-1">{travelError}</div>
            )}
            <div className="text-xs text-gray-500 pb-2">
              (Note: For precise estimates, hook up a real geocoder!)
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

export default PersonalHouseEstimatorSidebar;

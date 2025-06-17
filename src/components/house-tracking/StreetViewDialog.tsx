
import React from 'react';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HousePin } from './types';

interface StreetViewDialogProps {
  pin: HousePin | null;
  onClose: () => void;
}

const StreetViewDialog: React.FC<StreetViewDialogProps> = ({
  pin,
  onClose
}) => {
  const isOpen = !!pin;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-4xl w-full h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Street View: {pin?.address}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full h-full">
          {pin ? (
            <div className="w-full h-full">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!4v1234567890!6m8!1m7!1s${pin.lat},${pin.lng}!2m2!1d${pin.lat}!2d${pin.lng}!3f0!4f0!5f0.7820865974627469`}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Street View: ${pin.address}`}
              />
              <div className="mt-2 text-center">
                <a
                  href={`https://www.google.com/maps/@${pin.lat},${pin.lng},19z`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No location selected</p>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-gray-600">
            {pin && (
              <>
                Coordinates: {pin.lat.toFixed(6)}, {pin.lng.toFixed(6)}
                {pin.customerName && (
                  <span className="ml-4">Customer: {pin.customerName}</span>
                )}
              </>
            )}
          </div>
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StreetViewDialog;

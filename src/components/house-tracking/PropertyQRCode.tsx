import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { HousePin } from './types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';

interface PropertyQRCodeProps {
  pin: HousePin;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyQRCode: React.FC<PropertyQRCodeProps> = ({ pin, isOpen, onClose }) => {
  const baseUrl = window.location.origin;
  const qrData = JSON.stringify({
    id: pin.id,
    address: pin.address,
    lat: pin.lat,
    lng: pin.lng,
    url: `${baseUrl}/property/${pin.id}`
  });

  const downloadQR = () => {
    const svg = document.getElementById(`qr-${pin.id}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR_${pin.address.replace(/\s+/g, '_')}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Property QR Code',
          text: `QR Code for ${pin.address}`,
          url: `${baseUrl}/property/${pin.id}`
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Property QR Code</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 p-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeSVG
              id={`qr-${pin.id}`}
              value={qrData}
              size={256}
              level="H"
              includeMargin={true}
            />
          </div>
          
          <div className="text-center space-y-1">
            <p className="font-medium">{pin.address}</p>
            <p className="text-sm text-muted-foreground">
              Scan to view property details
            </p>
          </div>

          <div className="flex gap-2 w-full">
            <Button onClick={downloadQR} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            {navigator.share && (
              <Button onClick={shareQR} variant="outline" className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyQRCode;

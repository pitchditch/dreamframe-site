
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StepPhotosProps {
  photos: File[];
  setPhotos: (photos: File[]) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

const StepPhotos: React.FC<StepPhotosProps> = ({
  photos,
  setPhotos,
  onPrevStep,
  onNextStep
}) => {
  const [dragOver, setDragOver] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const validFiles: File[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    Array.from(files).forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload only JPG, PNG, or WebP images.',
          variant: 'destructive'
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: 'File too large',
          description: 'Please upload images smaller than 10MB.',
          variant: 'destructive'
        });
        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setPhotos([...photos, ...validFiles].slice(0, 8)); // Max 8 photos
      if (validFiles.length > 0) {
        toast({
          title: 'Photos uploaded',
          description: `${validFiles.length} photo(s) added successfully.`
        });
      }
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Step 3: Add Photos (Optional)</h3>
      <p className="mb-4 text-gray-600">
        Upload photos of your property to help us provide a more accurate quote. This is optional but recommended.
      </p>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          dragOver 
            ? 'border-bc-red bg-red-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium mb-2">Upload Property Photos</p>
        <p className="text-gray-500 mb-4">
          Drag and drop images here, or click to select files
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          id="photo-upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('photo-upload')?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Select Photos
        </Button>
        <p className="text-xs text-gray-400 mt-2">
          Max 8 photos, 10MB each. JPG, PNG, WebP supported.
        </p>
      </div>

      {/* Photo Preview Grid */}
      {photos.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-3">Uploaded Photos ({photos.length}/8)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(photo)}
                  alt={`Property photo ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Helpful Tips */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium mb-2 text-blue-800">Photo Tips:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Take photos of all sides of your property</li>
          <li>• Include windows, siding, driveways, and any problem areas</li>
          <li>• Photos in good lighting work best</li>
          <li>• Close-up shots of specific areas needing attention are helpful</li>
        </ul>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onPrevStep}>
          Back
        </Button>
        <Button onClick={onNextStep} className="bg-bc-red hover:bg-red-700 text-white">
          Continue
        </Button>
      </div>
    </div>
  );
};

export default StepPhotos;


import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export interface ClientSuccessStoryProps {
  clientName: string;
  location: string;
  service: string;
  challenge: string;
  solution: string;
  testimonial: string;
  rating: number;
  profileImage?: string;
  beforeAfterImages?: string[];
  videoUrl?: string;
}

const ClientSuccessStory = ({ 
  clientName, 
  location, 
  service, 
  challenge, 
  solution, 
  testimonial, 
  rating, 
  profileImage,
  beforeAfterImages,
  videoUrl
}: ClientSuccessStoryProps) => {
  const { t } = useTranslation();
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Images section */}
          {beforeAfterImages && beforeAfterImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
              {beforeAfterImages.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={index === 0 ? `${clientName}'s property before` : `${clientName}'s property after`}
                  className="w-full h-48 object-cover rounded"
                />
              ))}
            </div>
          )}
          
          {/* Content section */}
          <div className="p-6">
            {/* Client profile */}
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 mr-4">
                {profileImage ? (
                  <AvatarImage src={profileImage} alt={clientName} />
                ) : null}
                <AvatarFallback>{clientName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">{clientName}</h3>
                <p className="text-sm text-gray-500">{location}</p>
                <div className="flex mt-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                  {[...Array(5 - rating)].map((_, i) => (
                    <Star key={i + rating} className="w-4 h-4 text-gray-300" />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Service info */}
            <div className="mb-4">
              <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">{service}</span>
            </div>
            
            {/* Challenge & Solution */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-semibold text-bc-red">{t("The Challenge")}:</h4>
                <p className="text-gray-700">{challenge}</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-600">{t("Our Solution")}:</h4>
                <p className="text-gray-700">{solution}</p>
              </div>
            </div>
            
            {/* Testimonial */}
            <div className="bg-gray-50 p-4 rounded-md italic border-l-4 border-bc-red">
              <p className="text-gray-700">"{testimonial}"</p>
            </div>
            
            {/* Video testimonial if available */}
            {videoUrl && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">{t("Video Testimonial")}:</h4>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src={videoUrl} 
                    title={`${clientName}'s testimonial`}
                    className="w-full h-64"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientSuccessStory;

import React from 'react';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';
const DoorToDoorSection = () => {
  const {
    t
  } = useTranslation();
  const isMobile = useIsMobile();
  return <section className="py-16 bg-gray-50">
      
    </section>;
};
export default DoorToDoorSection;
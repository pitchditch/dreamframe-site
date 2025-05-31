
export interface Service {
  id: number;
  image: string;
  title: string;
  description: string;
  features: string[];
  icon: any;
  overlayImage?: string;
  overlayTitle?: string;
  overlayDescription?: string;
  pricing?: {
    small: string;
    medium: string;
    large: string;
  };
}

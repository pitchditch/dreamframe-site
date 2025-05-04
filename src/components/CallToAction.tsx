import { Link } from 'react-router-dom';
import PriceCalculatorOverlay from './PriceCalculatorOverlay';
interface CallToActionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
  backgroundImage?: string;
  hideImage?: boolean;
}
const CallToAction = ({
  title = "Ready to Transform Your Property?",
  subtitle = "Contact us today to schedule a service or request a free, no-obligation quote.",
  primaryButtonText = "Check Prices & Availability",
  secondaryButtonText = "Contact Us",
  primaryButtonLink = "/contact",
  secondaryButtonLink = "/contact",
  backgroundImage = "/lovable-uploads/1d7d3c0f-21a5-4ae2-80c7-7f156797449f.png",
  hideImage = false
}: CallToActionProps) => {
  return;
};
export default CallToAction;
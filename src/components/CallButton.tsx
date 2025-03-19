
import { Phone } from "lucide-react";
import { Button } from "./ui/button";

const CallButton = () => {
  return (
    <a 
      href="tel:+12345678900" 
      className="fixed bottom-6 right-6 z-50 animate-bounce"
    >
      <Button 
        className="h-14 w-14 rounded-full bg-bc-red hover:bg-red-700 shadow-lg"
        aria-label="Call now"
      >
        <Phone className="h-6 w-6 text-white" />
      </Button>
    </a>
  );
};

export default CallButton;

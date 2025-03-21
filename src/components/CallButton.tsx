
import { Phone } from "lucide-react";
import { Button } from "./ui/button";

const CallButton = () => {
  return (
    <a 
      href="tel:+17788087620" 
      className="fixed bottom-24 right-6 z-30"
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

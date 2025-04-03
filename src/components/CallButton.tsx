
import { Phone } from "lucide-react";
import { Button } from "./ui/button";

const CallButton = () => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 text-sm md:text-base px-2 md:px-3 py-1 md:py-2"
      onClick={() => window.location.href = 'tel:7788087620'}
    >
      <Phone className="mr-2 h-4 w-4" />
      <span>778 808 7620</span>
    </Button>
  );
};

export default CallButton;

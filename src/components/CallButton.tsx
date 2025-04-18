
import { Phone } from "lucide-react";
import { Button } from "./ui/button";

const CallButton = () => {
  return (
    <a 
      href="tel:7788087620"
      className="fixed bottom-24 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      aria-label="Call us"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
};

export default CallButton;


import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FounderSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <img
              src="/lovable-uploads/9dc6484c-91bb-4ae3-994d-f6cfefbf7c63.png" 
              alt="BC Pressure Washing Red Car at Marine Drive"
              className="rounded-lg shadow-xl border-4 border-gray-800"
              width={500}
              height={400}
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-red-500">Seen Our Red Car?</h2>
            <p className="mb-6 text-lg text-gray-300">
              If you've spotted our distinctive red vehicle along Marine Drive in White Rock, 
              mention it when you contact us to receive a special <span className="animate-pulse font-bold text-red-500 text-xl">10% discount</span> on your service!
            </p>
            <p className="mb-8 text-gray-300">
              As a locally owned and operated business, we're proud to be an active part of the White Rock 
              and Surrey communities. We're not just a service provider - we're your neighbors, 
              committed to keeping our local properties looking their best.
            </p>
            <Button 
              variant="bc-red" 
              size="lg" 
              className="group"
              asChild
            >
              <Link to="/contact">
                Claim Your Discount
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;

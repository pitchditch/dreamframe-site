
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
              src="/lovable-uploads/9773afa1-26cf-4788-ade6-2da27716dd3d.png"
              alt="BC Pressure Washing Founder"
              className="rounded-lg shadow-xl border-4 border-gray-800"
              width={500}
              height={400}
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-red-500">Meet Our Founder</h2>
            <p className="mb-6 text-lg text-gray-300">
              Hi, I'm Nicholas, the founder of BC Pressure Washing. With over 10 years in the industry, 
              I started this company with a simple mission: to provide the highest quality exterior 
              cleaning services with unmatched attention to detail.
            </p>
            <p className="mb-8 text-gray-300">
              As a family-owned business based in White Rock, we take pride in serving our local 
              community and building lasting relationships with our customers. My team and I are 
              committed to excellence in every project we undertake.
            </p>
            <Button 
              variant="bc-red" 
              size="lg" 
              className="group"
              asChild
            >
              <Link to="/about">
                Learn More About Us
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

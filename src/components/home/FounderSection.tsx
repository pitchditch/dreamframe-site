
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FounderSection = () => {
  return (
    <section className="py-16 md:py-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-2">
              <div className="relative">
                <img
                  src="/lovable-uploads/6b523ca7-33dc-43ab-afe5-188976a36dc2.png"
                  alt="Jayden Fisher - BC Pressure Washing Owner"
                  className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-5 -right-5 bg-bc-red text-white p-4 rounded-lg shadow-lg hidden md:block">
                  <p className="font-bold">Owner & Operator</p>
                  <p>Since 2021</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet the Owner</h2>
              <h3 className="text-xl md:text-2xl font-semibold text-bc-red mb-4">Exterior Cleaning Is My Passion</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  Hi, I'm Jayden — owner and operator of BC Pressure Washing. I founded this company with a clear mission: to deliver premium exterior cleaning services with the care, precision, and accountability you can only get from someone who does the work themselves.
                </p>
                <p>
                  I grew up in White Rock and went to Semiahmoo Secondary up to Grade 10 before moving to Abbotsford. Now I'm back living along Marine Drive and proudly serving the White Rock and South Surrey communities once again.
                </p>
                <p>
                  Unlike other companies that send random crews, I personally complete every service — from start to finish. With over 3 years of hands-on experience, I use only professional-grade equipment and treat every home like it's my own. You'll always know exactly who's showing up, and that the job will be done right.
                </p>

                <p className="flex items-center font-medium mt-8">
                  <span className="mr-2">👉</span> 
                  <Link to="/why-us" className="text-bc-red hover:underline">
                    Learn more about our story
                  </Link>
                </p>
                <p className="flex items-center font-medium">
                  <span className="mr-2">👉</span> 
                  <Link to="/why-us#equipment" className="text-bc-red hover:underline">
                    See our professional equipment
                  </Link>
                </p>
              </div>

              <div className="mt-8">
                <Button asChild className="bg-bc-red hover:bg-red-700">
                  <Link to="/contact" className="flex items-center">
                    Work With Me <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;

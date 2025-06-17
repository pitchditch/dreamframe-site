
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Gift, Users, Star, DollarSign } from 'lucide-react';

const ReferralButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-r from-bc-red to-red-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Gift className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Refer a Friend & Both Save $50!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Know someone who needs our services? When you refer them and they book, 
              you both get $50 off your next service!
            </p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-white text-bc-red hover:bg-gray-100 text-xl font-bold px-8 py-4 mb-8"
              >
                <Gift className="mr-2 h-6 w-6" />
                Refer a Friend Now
              </Button>
            </DialogTrigger>
            
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center mb-6">
                  How It Works
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      1
                    </div>
                    <Users className="w-8 h-8 text-bc-red mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Tell Your Friend</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Share our contact info with someone who needs exterior cleaning services
                    </p>
                  </div>
                  
                  <div className="text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      2
                    </div>
                    <Star className="w-8 h-8 text-bc-red mb-3" />
                    <h3 className="font-semibold text-lg mb-2">They Book Service</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Your friend mentions your name when booking their first service with us
                    </p>
                  </div>
                  
                  <div className="text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      3
                    </div>
                    <DollarSign className="w-8 h-8 text-bc-red mb-3" />
                    <h3 className="font-semibold text-lg mb-2">You Both Save</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Both you and your friend get $50 off your next service - it's a win-win!
                    </p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3 text-center">Ready to Refer?</h4>
                  <p className="text-gray-600 text-center mb-4">
                    Just have your friend mention your name when they call or book online!
                  </p>
                  <div className="text-center">
                    <a 
                      href="tel:7788087620" 
                      className="inline-block bg-bc-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Call (778) 808-7620
                    </a>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default ReferralButton;

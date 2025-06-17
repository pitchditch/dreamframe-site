
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Users, Gift } from 'lucide-react';

const OptimizedReferralSection = () => {
  const [referralData, setReferralData] = useState({
    friendName: '',
    friendEmail: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Referral sent:', referralData);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-bc-red to-red-700 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Left Column - Refer & Save */}
          <div>
            <div className="flex items-center mb-4">
              <Gift className="mr-3" size={32} />
              <h2 className="text-3xl font-bold">Refer & Save 50%</h2>
            </div>
            <p className="text-xl mb-6 text-white/90">
              Love our service? Share it with friends and family to earn huge savings on your next cleaning!
            </p>
            
            <div className="bg-white/10 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Happy Customers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">50%</div>
                  <div className="text-sm text-white/80">Discount Per Referral</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-white/80">Satisfaction Guaranteed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - How It Works */}
          <div>
            <h3 className="text-2xl font-bold mb-6">How It Works</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="bg-white text-bc-red rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 mt-1">1</div>
                <div>
                  <h4 className="font-bold mb-1">Share Our Service</h4>
                  <p className="text-white/90 text-sm">Tell friends, family, or neighbors about BC Pressure Washing</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-bc-red rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 mt-1">2</div>
                <div>
                  <h4 className="font-bold mb-1">They Book & Mention You</h4>
                  <p className="text-white/90 text-sm">When they book, they mention your name or use your referral link</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white text-bc-red rounded-full w-8 h-8 flex items-center justify-center font-bold mr-3 mt-1">3</div>
                <div>
                  <h4 className="font-bold mb-1">You Both Save!</h4>
                  <p className="text-white/90 text-sm">You get 50% off your next service, they get great cleaning!</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="text"
                placeholder="Friend's name"
                value={referralData.friendName}
                onChange={(e) => setReferralData({...referralData, friendName: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder-white/60"
              />
              <Input
                type="email"
                placeholder="Friend's email"
                value={referralData.friendEmail}
                onChange={(e) => setReferralData({...referralData, friendEmail: e.target.value})}
                className="bg-white/10 border-white/20 text-white placeholder-white/60"
              />
              <Button type="submit" className="w-full bg-white text-bc-red hover:bg-gray-100">
                Send Referral
              </Button>
            </form>
            
            <div className="text-center mt-4">
              <p className="text-white/80 text-sm">Or call us at (778) 808-7620</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 pt-8 border-t border-white/20">
          <p className="text-sm text-white/70">
            *Terms and conditions apply. Referral discount applies to window cleaning services only. 
            Your friend must complete their first service before your discount can be applied.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OptimizedReferralSection;

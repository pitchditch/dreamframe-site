
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Users, Gift, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { useIsMobile } from '@/hooks/use-mobile';

const ReferralProgramSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');

  const referralLink = "https://www.bcpressurewashing.ca?ref=customer";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copied!",
      description: "Share this link with friends to start earning rewards.",
    });
  };

  const handleSendReferral = () => {
    if (!friendName || !friendEmail) {
      toast({
        title: "Missing information",
        description: "Please enter both name and email.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send an email
    toast({
      title: "Referral sent!",
      description: `We'll reach out to ${friendName} soon.`,
    });
    setFriendName('');
    setFriendEmail('');
  };

  const handleCallReferral = () => {
    window.location.href = 'tel:7788087620';
  };

  return (
    <section className="py-16 bg-gradient-to-br from-bc-red to-red-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Gift className="h-8 w-8" />
              <h2 className="text-3xl md:text-4xl font-bold">
                Refer a Friend & Save 50%
              </h2>
            </div>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Love our service? Share it with friends and family to earn huge savings on your next cleaning!
            </p>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Our Service</h3>
              <p className="text-red-100">Tell friends, family, or neighbors about BC Pressure Washing</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">They Book & Mention You</h3>
              <p className="text-red-100">When they book, they mention your name or use your referral link</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">You Both Save!</h3>
              <p className="text-red-100">You get 50% off your next service, they get great cleaning!</p>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="bg-white/10 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-400 text-yellow-900 rounded-full p-2">
                💡
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Pro Tip:</h4>
                <p className="text-red-100">
                  The more friends you refer, the more you save! Each successful referral earns you another 50% discount.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Share */}
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Copy className="h-5 w-5" />
                Quick Share
              </h3>
              <div className="flex gap-2">
                <Input
                  value={referralLink}
                  readOnly
                  className="bg-white/20 border-white/30 text-white placeholder-white/70"
                />
                <Button 
                  onClick={copyToClipboard}
                  variant="outline"
                  className="bg-white text-bc-red hover:bg-gray-100"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Refer Someone Specific */}
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Refer Someone Specific
              </h3>
              <div className="space-y-3">
                <Input
                  placeholder="Friend's name"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-white/70"
                />
                <Input
                  type="email"
                  placeholder="Friend's email"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder-white/70"
                />
                <Button 
                  onClick={handleSendReferral}
                  className="w-full bg-white text-bc-red hover:bg-gray-100"
                >
                  Send Referral
                </Button>
              </div>
            </div>
          </div>

          {/* Call to Refer */}
          <div className="text-center mt-8">
            <div className="bg-white/10 rounded-lg p-6 inline-block">
              <h3 className="text-xl font-semibold mb-2">Call to Refer</h3>
              <p className="text-red-100 mb-4">Prefer to talk? Call us and we'll handle everything for you.</p>
              <Button 
                onClick={handleCallReferral}
                variant="outline"
                className="bg-white text-bc-red hover:bg-gray-100"
              >
                Call (778) 808-7620
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 text-center">
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-red-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">50%</div>
              <div className="text-red-100">Discount Per Referral</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-red-100">Satisfaction Guaranteed</div>
            </div>
          </div>

          {/* Terms */}
          <p className="text-sm text-red-200 text-center mt-8 max-w-3xl mx-auto">
            *Terms and conditions apply. Referral discount applies to window cleaning services only. Your friend must complete their first service before your discount can be applied. Cannot be combined with other offers. Valid for existing customers only.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgramSection;

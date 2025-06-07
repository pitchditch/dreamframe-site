
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Share2, Gift, Users, Phone, Mail, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReferralProgramSection = () => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { toast } = useToast();

  const referralLink = "https://www.bcpressurewashing.ca?ref=customer";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopiedLink(true);
      toast({
        title: "Link Copied!",
        description: "Share this link with friends to get your discount.",
      });
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmitReferral = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the referral data to your backend
    toast({
      title: "Referral Submitted!",
      description: "We'll contact your friend and apply your discount when they book.",
    });
    setEmail('');
    setName('');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-bc-red to-red-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 rounded-full p-4">
              <Gift className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4">Refer a Friend & Save 50%</h2>
          <p className="text-xl mb-8 text-red-100">
            Love our service? Share it with friends and family to earn huge savings on your next cleaning!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* How It Works */}
          <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Users className="w-6 h-6 mr-2" />
              How It Works
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Share Our Service</h4>
                  <p className="text-red-100">Tell friends, family, or neighbors about BC Pressure Washing</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-1">They Book & Mention You</h4>
                  <p className="text-red-100">When they book, they mention your name or use your referral link</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-yellow-400 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-1">You Both Save!</h4>
                  <p className="text-red-100">You get 50% off your next service, they get great cleaning!</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/20 rounded-lg">
              <p className="text-sm font-medium mb-2">💡 Pro Tip:</p>
              <p className="text-sm text-red-100">
                The more friends you refer, the more you save! Each successful referral earns you another 50% discount.
              </p>
            </div>
          </div>

          {/* Referral Actions */}
          <div className="space-y-8">
            {/* Share Link */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Quick Share
              </h3>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-red-200"
                />
                <Button 
                  onClick={handleCopyLink}
                  variant="secondary"
                  className="bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Referral Form */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Refer Someone Specific
              </h3>
              <form onSubmit={handleSubmitReferral} className="space-y-4">
                <input
                  type="text"
                  placeholder="Friend's name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-red-200"
                  required
                />
                <input
                  type="email"
                  placeholder="Friend's email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-red-200"
                  required
                />
                <Button 
                  type="submit"
                  className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold"
                >
                  Send Referral
                </Button>
              </form>
            </div>

            {/* Call Option */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Call to Refer
              </h3>
              <p className="text-red-100 mb-4">
                Prefer to talk? Call us and we'll handle everything for you.
              </p>
              <a href="tel:778-808-7620">
                <Button className="w-full bg-white text-bc-red hover:bg-gray-100 font-semibold">
                  Call (778) 808-7620
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
            <div className="text-red-100">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">50%</div>
            <div className="text-red-100">Discount Per Referral</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">100%</div>
            <div className="text-red-100">Satisfaction Guaranteed</div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-12 text-center">
          <p className="text-xs text-red-200 max-w-2xl mx-auto">
            *Terms and conditions apply. Referral discount applies to window cleaning services only. 
            Your friend must complete their first service before your discount can be applied. 
            Cannot be combined with other offers. Valid for existing customers only.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgramSection;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Gift, Users, Star, DollarSign, Phone, Mail, MessageCircle, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ReferralOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralOverlay = ({ isOpen, onClose }: ReferralOverlayProps) => {
  const [friendName, setFriendName] = useState('');
  const [friendEmail, setFriendEmail] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [yourName, setYourName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle referral submission logic here
    console.log('Referral submitted:', { friendName, friendEmail, friendPhone, yourName, message });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-3xl font-bold text-center mb-6 text-bc-red">
            <Gift className="inline-block mr-3 h-8 w-8" />
            Refer a Friend & Both Save $50!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-8">
          {/* How It Works Section */}
          <div className="bg-gradient-to-r from-bc-red/10 to-red-100 p-6 rounded-xl">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  1
                </div>
                <Users className="w-8 h-8 text-bc-red mb-4" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">Share Details</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Fill out the form below with your friend's contact information
                  </p>
                </div>
              </div>
              
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  2
                </div>
                <Star className="w-8 h-8 text-bc-red mb-4" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">We Reach Out</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We'll contact your friend with a special offer and mention you referred them
                  </p>
                </div>
              </div>
              
              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-bc-red text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                  3
                </div>
                <DollarSign className="w-8 h-8 text-bc-red mb-4" />
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg">You Both Save</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    When they book, you both get $50 off your next service!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Your Information */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Your Information</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <Input
                    type="text"
                    value={yourName}
                    onChange={(e) => setYourName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Friend's Information */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-gray-800 border-b pb-2">Friend's Information</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Friend's Name *</label>
                  <Input
                    type="text"
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                    placeholder="Enter friend's full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Friend's Email *</label>
                  <Input
                    type="email"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    placeholder="friend@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Friend's Phone</label>
                  <Input
                    type="tel"
                    value={friendPhone}
                    onChange={(e) => setFriendPhone(e.target.value)}
                    placeholder="(778) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Optional Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Personal Message (Optional)</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a personal note about why they should try BC Pressure Washing..."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button 
                type="submit"
                size="lg" 
                className="bg-bc-red hover:bg-red-700 text-white font-bold text-xl px-8 py-4"
              >
                <Gift className="mr-2 h-6 w-6" />
                Send Referral & Earn $50
              </Button>
            </div>
          </form>

          {/* Contact Options */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-lg mb-4 text-center">Prefer to Refer Directly?</h4>
            <div className="flex justify-center space-x-6">
              <a 
                href="tel:7788087620" 
                className="flex items-center gap-2 bg-bc-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a 
                href="mailto:bcpressurewashing.ca@gmail.com" 
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralOverlay;

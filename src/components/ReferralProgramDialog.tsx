
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Share2, Gift, Users, Phone, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface ReferralProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReferralProgramDialog = ({ open, onOpenChange }: ReferralProgramDialogProps) => {
  const [copiedLink, setCopiedLink] = useState(false);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Gift className="w-6 h-6 mr-2 text-bc-red" />
            Refer a Friend & Save 50%
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <Share2 className="w-4 h-4 mr-2" />
                Quick Share
              </h3>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-white border rounded px-2 py-1 text-sm"
                />
                <Button 
                  onClick={handleCopyLink}
                  size="sm"
                  variant="outline"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Call to Refer
              </h3>
              <a href="tel:778-808-7620">
                <Button size="sm" className="w-full bg-bc-red hover:bg-red-700">
                  Call (778) 808-7620
                </Button>
              </a>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              How It Works
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="bg-bc-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                <span>Share our service with friends</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-bc-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                <span>They book and mention your name</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="bg-bc-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                <span>You both save money!</span>
              </div>
            </div>
          </div>

          {/* Full Program Link */}
          <div className="text-center">
            <Button asChild variant="outline" className="w-full">
              <Link to="/#referral-program" onClick={() => onOpenChange(false)}>
                <ExternalLink className="w-4 h-4 mr-2" />
                View Full Referral Program
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReferralProgramDialog;

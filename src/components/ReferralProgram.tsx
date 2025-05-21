
import React, { useState } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Share2, Users } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ReferralProgram = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [referralEmail, setReferralEmail] = useState('');
  const [referralName, setReferralName] = useState('');
  const [yourName, setYourName] = useState('');
  const [yourEmail, setYourEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const handleReferFriend = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the referral info to an API
    console.log('Referring:', { referralName, referralEmail, yourName, yourEmail });
    
    toast({
      title: "Referral Sent Successfully!",
      description: `We've sent an invitation to ${referralName} with your referral.`,
    });
    
    // Reset the form
    setReferralName('');
    setReferralEmail('');
  };

  const handleCheckStatus = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would check the referral status with an API
    console.log('Checking referral code:', referralCode);
    
    toast({
      title: "Referral Status",
      description: "Your referral is pending. We'll notify you when it's completed!",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">{t("Refer a Friend & Earn Rewards")}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("Share the gift of a sparkling clean home. Refer your friends and you'll both receive $25 off your next service!")}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-bc-red/10 rounded-full flex items-center justify-center">
                <Share2 className="h-6 w-6 text-bc-red" />
              </div>
            </div>
            <h3 className="font-semibold text-center mb-2">{t("1. Share With Friends")}</h3>
            <p className="text-gray-600 text-sm text-center">
              {t("Refer friends using the form below or share your unique referral link.")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-bc-red/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-bc-red" />
              </div>
            </div>
            <h3 className="font-semibold text-center mb-2">{t("2. Friend Books Service")}</h3>
            <p className="text-gray-600 text-sm text-center">
              {t("When your friend books and completes their first service, your referral is complete.")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-bc-red/10 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-bc-red" />
              </div>
            </div>
            <h3 className="font-semibold text-center mb-2">{t("3. Both Get Rewarded")}</h3>
            <p className="text-gray-600 text-sm text-center">
              {t("You both receive $25 off your next service. No limit to how many friends you can refer!")}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="refer" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="refer">{t("Refer a Friend")}</TabsTrigger>
          <TabsTrigger value="share">{t("Share Link")}</TabsTrigger>
          <TabsTrigger value="status">{t("Check Status")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="refer">
          <Card>
            <CardHeader>
              <CardTitle>{t("Send a Referral Invitation")}</CardTitle>
              <CardDescription>
                {t("Fill out the form below to send your friend an email invitation with your referral.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReferFriend} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="your-name">{t("Your Name")}</Label>
                    <Input 
                      id="your-name"
                      placeholder={t("Enter your name")}
                      value={yourName}
                      onChange={(e) => setYourName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="your-email">{t("Your Email")}</Label>
                    <Input 
                      id="your-email"
                      type="email"
                      placeholder={t("Enter your email")}
                      value={yourEmail}
                      onChange={(e) => setYourEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="friend-name">{t("Friend's Name")}</Label>
                    <Input 
                      id="friend-name"
                      placeholder={t("Enter your friend's name")}
                      value={referralName}
                      onChange={(e) => setReferralName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="friend-email">{t("Friend's Email")}</Label>
                    <Input 
                      id="friend-email"
                      type="email"
                      placeholder={t("Enter your friend's email")}
                      value={referralEmail}
                      onChange={(e) => setReferralEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-bc-red hover:bg-bc-red/90">
                  {t("Send Referral")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="share">
          <Card>
            <CardHeader>
              <CardTitle>{t("Share Your Unique Referral Link")}</CardTitle>
              <CardDescription>
                {t("Copy your personal referral link and share it with friends via text, social media, or email.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    value="https://bcpressurewashing.ca/r/YourUniqueCode" 
                    readOnly
                    className="bg-gray-50"
                  />
                  <Button 
                    onClick={() => {
                      navigator.clipboard.writeText("https://bcpressurewashing.ca/r/YourUniqueCode");
                      toast({
                        title: "Link Copied!",
                        description: "Referral link copied to clipboard.",
                      });
                    }}
                    variant="outline"
                  >
                    {t("Copy")}
                  </Button>
                </div>
                
                <div className="flex space-x-4 justify-center mt-6">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://bcpressurewashing.ca/r/YourUniqueCode")}`, '_blank');
                    }}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                    </svg>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("Get $25 off your first service with BC Pressure Washing! Use my referral link:")}&url=${encodeURIComponent("https://bcpressurewashing.ca/r/YourUniqueCode")}`, '_blank');
                    }}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.192 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                    </svg>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      window.location.href = `mailto:?subject=${encodeURIComponent("$25 off BC Pressure Washing Services")}&body=${encodeURIComponent("I thought you might be interested in BC Pressure Washing's services. Use my referral link to get $25 off your first service: https://bcpressurewashing.ca/r/YourUniqueCode")}`;
                    }}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>{t("Check Your Referral Status")}</CardTitle>
              <CardDescription>
                {t("Enter your referral code to see how many successful referrals you've made and rewards earned.")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCheckStatus} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="referral-code">{t("Your Referral Code")}</Label>
                  <Input 
                    id="referral-code"
                    placeholder={t("Enter your referral code")}
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-bc-red hover:bg-bc-red/90">
                  {t("Check Status")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-xl mb-4">{t("Referral Program FAQs")}</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">{t("How does the referral program work?")}</h4>
            <p className="text-gray-600">
              {t("When you refer a friend and they complete their first service, both you and your friend receive $25 off your next service.")}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">{t("Is there a limit to how many people I can refer?")}</h4>
            <p className="text-gray-600">
              {t("No! You can refer as many friends as you like. Each successful referral earns you a $25 discount.")}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">{t("When do I receive my reward?")}</h4>
            <p className="text-gray-600">
              {t("Your $25 discount will be automatically applied to your next service after your friend's service is completed.")}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">{t("Can I combine multiple referral discounts?")}</h4>
            <p className="text-gray-600">
              {t("Yes! If you refer multiple friends, you can stack your discounts up to 50% off your next service.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;

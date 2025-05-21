
import React from 'react';
import Layout from '@/components/Layout';
import ReferralProgram from '@/components/ReferralProgram';
import { useTranslation } from '@/hooks/use-translation';

const Referrals = () => {
  const { t } = useTranslation();
  
  return (
    <Layout
      title="Referral Program | BC Pressure Washing"
      description="Refer friends to BC Pressure Washing and earn $25 off your next service. Our referral program rewards both you and your friends with discounts on our professional cleaning services."
    >
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("Referral Program")}</h1>
          <p className="text-xl max-w-3xl mx-auto">
            {t("Refer friends and earn rewards. It's our way of saying thank you for spreading the word about BC Pressure Washing.")}
          </p>
        </div>
      </div>
      
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ReferralProgram />
        </div>
      </div>
    </Layout>
  );
};

export default Referrals;

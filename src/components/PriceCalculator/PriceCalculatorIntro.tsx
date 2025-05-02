import React from "react";
const PriceCalculatorIntro = () => {
  return <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8 p-6 rounded-xl bg-gradient-to-r from-blue-100 via-blue-50 to-white shadow-lg relative">
      {/* Profile section */}
      <div className="absolute right-6 top-6 hidden sm:block">
        <img alt="Jayden Fisher – Owner & Operator" className="h-28 w-28 rounded-full border-4 border-blue-200 object-cover shadow-md" src="/lovable-uploads/78b42700-b641-45cf-a11e-fb68f4124509.jpg" />
      </div>
      {/* Text block with fallback image for mobile */}
      <div className="flex-1 min-w-0 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-4 mb-2">
          <img src="/lovable-uploads/0349dfb1-14e8-4659-bd93-89bc41c2fd53.png" alt="Jayden Fisher profile" className="h-16 w-16 sm:hidden rounded-full border-2 border-blue-200 object-cover shadow" />
          <div>
            <span className="font-bold text-lg">Jayden Fisher – Owner & Operator</span>
            <div className="text-blue-700 font-medium text-sm">
              "Every job is checked by me personally."
            </div>
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">Get a Custom Price Estimate in Seconds</h2>
        <div className="text-base sm:text-lg text-gray-700 mb-2">
          Leave your address and we'll use Google Maps to send you a fast quote.
          All jobs are fully insured. For roofs and larger homes, we offer on-site estimates for the most accurate pricing.
        </div>
        <div className="text-sm text-gray-500">
          <strong>Local?</strong> First-time customers can call or message for special pricing.<br />
          We offer flexible, competitive rates with premium service and attention to detail.
        </div>
      </div>
    </div>;
};
export default PriceCalculatorIntro;
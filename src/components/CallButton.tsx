const CallButton = () => {
  return (
    <a 
      href="tel:7788087620"
      className="fixed bottom-24 left-6 z-50 bg-bc-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors md:hidden"
      aria-label="Call us"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
};

export default CallButton;

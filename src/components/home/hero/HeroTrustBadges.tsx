
const HeroTrustBadges = () => {
  return (
    <div className="flex items-center justify-center gap-6 mt-8 opacity-80">
      <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
        <span className="text-white text-sm font-medium">✓ Fully Insured</span>
      </div>
      <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
        <span className="text-white text-sm font-medium">✓ 5-Star Rated</span>
      </div>
      <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
        <span className="text-white text-sm font-medium">✓ Local Experts</span>
      </div>
    </div>
  );
};

export default HeroTrustBadges;

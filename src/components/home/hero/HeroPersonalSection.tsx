
const HeroPersonalSection = () => {

  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto border border-white/20">
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/069112d9-e61f-4def-94ed-7f1c34172bfd.png"
          alt="Jayden Fisher - Owner" 
          className="w-12 h-12 rounded-full border-2 border-white shadow-md mr-3 flex-shrink-0"
        />
        <div className="text-left">
          <p className="font-bold text-white text-sm leading-tight drop-shadow-md">
            "Every Job is Personally Checked by Me."
          </p>
          <p className="text-white font-medium text-xs mt-1">
            — Jayden Fisher, Owner
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroPersonalSection;

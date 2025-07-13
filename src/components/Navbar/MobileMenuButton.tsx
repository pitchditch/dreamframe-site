
interface MobileMenuButtonProps {
  isOverVideo: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const MobileMenuButton = ({ 
  isOverVideo, 
  isMenuOpen, 
  toggleMenu 
}: MobileMenuButtonProps) => {
  return (
    <button
      type="button"
      className={`md:hidden p-2 rounded-md transition-colors ${isOverVideo ? 'text-white hover:text-bc-red' : 'text-black hover:text-bc-red'}`}
      onClick={toggleMenu}
    >
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {isMenuOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );
};


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
      className={`md:hidden ${isOverVideo ? 'text-white' : 'text-gray-700'} hover:text-bc-red`}
      onClick={toggleMenu}
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {isMenuOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  );
};

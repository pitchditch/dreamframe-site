import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Calculator,
  CalendarCheck,
  Car,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ContactRound,
  Droplets,
  HardHat,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Truck,
  Wrench,
} from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import LanguageSelector from '../LanguageSelector';

interface NavbarMobileProps {
  isMenuOpen: boolean;
  isServicesMenuOpen: boolean;
  setIsServicesMenuOpen: (isOpen: boolean) => void;
}

const iconWrap = 'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-800';
const rowClass = 'flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left font-semibold text-gray-900 transition-colors hover:bg-gray-50 hover:text-bc-red';
const subRowClass = 'flex min-h-12 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-white hover:text-bc-red';

export const NavbarMobile = ({ isMenuOpen, isServicesMenuOpen, setIsServicesMenuOpen }: NavbarMobileProps) => {
  const { t } = useTranslation();
  const [isCommercialOpen, setIsCommercialOpen] = useState(false);
  const [isAreasOpen, setIsAreasOpen] = useState(false);

  return (
    <div
      className={`md:hidden fixed left-0 right-0 z-40 overflow-hidden bg-white transition-[max-height,box-shadow] duration-300 top-28 ${
        isMenuOpen ? 'max-h-[calc(100dvh-7rem)] shadow-2xl' : 'max-h-0'
      }`}
    >
      <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-contain pb-[max(1rem,env(safe-area-inset-bottom))]">
        <nav aria-label="Mobile navigation" className="divide-y divide-gray-200">
          <div className="bg-gray-50 px-4 py-3 text-center text-sm font-medium text-gray-600">
            Locally Owned <span aria-hidden="true">•</span> Owner-Checked on Every Job
          </div>

          <div className="bg-bc-red px-4 py-4">
            <Link
              to="/calculator"
              className="flex min-h-16 items-center justify-center gap-3 rounded-2xl bg-white px-4 text-lg font-bold text-bc-red shadow-sm transition-transform active:scale-[0.99]"
            >
              <Calculator className="h-6 w-6" />
              <span>{t('Get Instant Estimate')}</span>
            </Link>
            <p className="mt-2 text-center text-xs font-medium text-white/90">Takes about 30 seconds — no visit required</p>
          </div>

          <Link to="/" className={rowClass}>
            <span className={iconWrap}><Home className="h-5 w-5" /></span>
            <span className="flex-1">{t('Home')}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
              className={rowClass}
              aria-expanded={isServicesMenuOpen}
              aria-controls="mobile-services-menu"
            >
              <span className={iconWrap}><Wrench className="h-5 w-5" /></span>
              <span className="flex-1">{t('Services')}</span>
              {isServicesMenuOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <div
              id="mobile-services-menu"
              className={`overflow-hidden bg-gray-50 transition-[max-height,padding] duration-300 ${
                isServicesMenuOpen ? 'max-h-[520px] px-4 pb-4' : 'max-h-0 px-4'
              }`}
            >
              <div className="grid gap-1 pt-1">
                <Link to="/services/window-cleaning" className={subRowClass}><Sparkles className="h-5 w-5 text-bc-red" />Window Cleaning</Link>
                <Link to="/services/gutter-cleaning" className={subRowClass}><Droplets className="h-5 w-5 text-bc-red" />Gutter Cleaning</Link>
                <Link to="/services/roof-cleaning" className={subRowClass}><Home className="h-5 w-5 text-bc-red" />Roof Cleaning</Link>
                <Link to="/services/house-washing" className={subRowClass}><ShieldCheck className="h-5 w-5 text-bc-red" />House Washing</Link>
                <Link to="/services/pressure-washing" className={subRowClass}><Wrench className="h-5 w-5 text-bc-red" />Pressure Washing</Link>
                <Link to="/services/pressure-washing" className={subRowClass}><Car className="h-5 w-5 text-bc-red" />Driveways &amp; Concrete</Link>
                <Link to="/services" className="mt-1 flex items-center justify-between rounded-xl bg-white px-3 py-3 text-sm font-bold text-bc-red shadow-sm">
                  View All Services <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setIsCommercialOpen(!isCommercialOpen)}
              className={rowClass}
              aria-expanded={isCommercialOpen}
              aria-controls="mobile-commercial-menu"
            >
              <span className={iconWrap}><Building2 className="h-5 w-5" /></span>
              <span className="flex-1">{t('Commercial')}</span>
              {isCommercialOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <div
              id="mobile-commercial-menu"
              className={`overflow-hidden bg-gray-50 transition-[max-height,padding] duration-300 ${
                isCommercialOpen ? 'max-h-[400px] px-4 pb-4' : 'max-h-0 px-4'
              }`}
            >
              <div className="grid gap-1 pt-1">
                <Link to="/services/storefront-window-cleaning" className={subRowClass}><Store className="h-5 w-5 text-bc-red" />Storefront Cleaning</Link>
                <Link to="/services/fleet-washing" className={subRowClass}><Truck className="h-5 w-5 text-bc-red" />Fleet Washing</Link>
                <Link to="/services/commercial-pressure-washing" className={subRowClass}><Building2 className="h-5 w-5 text-bc-red" />Commercial Pressure Washing</Link>
                <Link to="/services/post-construction-window-cleaning" className={subRowClass}><HardHat className="h-5 w-5 text-bc-red" />Post-Construction Cleaning</Link>
                <Link to="/contact" className={subRowClass}><ContactRound className="h-5 w-5 text-bc-red" />Property Managers</Link>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setIsAreasOpen(!isAreasOpen)}
              className={rowClass}
              aria-expanded={isAreasOpen}
              aria-controls="mobile-service-areas-menu"
            >
              <span className={iconWrap}><MapPin className="h-5 w-5" /></span>
              <span className="flex-1">{t('Service Areas')}</span>
              {isAreasOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <div
              id="mobile-service-areas-menu"
              className={`overflow-hidden bg-gray-50 transition-[max-height,padding] duration-300 ${
                isAreasOpen ? 'max-h-[430px] px-4 pb-4' : 'max-h-0 px-4'
              }`}
            >
              <div className="grid grid-cols-2 gap-1 pt-1">
                <Link to="/white-rock" className={subRowClass}>White Rock</Link>
                <Link to="/surrey" className={subRowClass}>Surrey</Link>
                <Link to="/delta" className={subRowClass}>Delta</Link>
                <Link to="/langley-city" className={subRowClass}>Langley</Link>
                <Link to="/vancouver" className={subRowClass}>Vancouver</Link>
                <Link to="/coquitlam" className={subRowClass}>Coquitlam</Link>
                <Link to="/new-westminster" className={subRowClass}>New Westminster</Link>
                <Link to="/burnaby" className={subRowClass}>Burnaby</Link>
              </div>
              <Link to="/surrey" className="mt-2 flex items-center justify-between rounded-xl bg-white px-3 py-3 text-sm font-bold text-bc-red shadow-sm">
                View Service Areas <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <Link to="/testimonials" className={rowClass}>
            <span className={iconWrap}><Star className="h-5 w-5" /></span>
            <span className="flex-1">{t('Reviews & Results')}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link to="/maintenance-memberships" className={rowClass}>
            <span className={iconWrap}><CalendarCheck className="h-5 w-5" /></span>
            <span className="flex-1">{t('Maintenance Plans')}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link to="/why-us" className={rowClass}>
            <span className={iconWrap}><ShieldCheck className="h-5 w-5" /></span>
            <span className="flex-1">{t('Why Choose Us')}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link to="/contact" className={rowClass}>
            <span className={iconWrap}><ContactRound className="h-5 w-5" /></span>
            <span className="flex-1">{t('Contact')}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <div className="bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-3">
              <a
                href="tel:7788087620"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gray-950 px-3 font-bold text-white transition-colors hover:bg-gray-800"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a
                href="sms:7788087620"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-3 font-bold text-gray-950 transition-colors hover:bg-gray-100"
              >
                <MessageCircle className="h-5 w-5" />
                Text Us
              </a>
            </div>
            <div className="mt-4">
              <LanguageSelector />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavbarMobile;

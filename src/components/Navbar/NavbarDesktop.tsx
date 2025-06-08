
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Logo } from './Logo';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

interface NavbarDesktopProps {
  isOverVideo: boolean;
}

const NavbarDesktop = ({ isOverVideo }: NavbarDesktopProps) => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("Window Cleaning"),
      href: "/services/window-cleaning",
      description: "Crystal clear windows inside and out",
      icon: "/lovable-uploads/c0750156-e7a2-4f23-bffc-fa6aadabc8af.png"
    },
    {
      title: t("Gutter Cleaning"),
      href: "/services/gutter-cleaning", 
      description: "Complete gutter cleaning and maintenance",
      icon: "/lovable-uploads/09259a98-7e2b-4244-b338-ffb0d146e979.png"
    },
    {
      title: t("Roof Cleaning"),
      href: "/services/roof-cleaning",
      description: "Safe moss removal and roof washing", 
      icon: "/lovable-uploads/1365dd51-01ea-4a4a-be27-dadd88cf8a5c.png"
    },
    {
      title: t("House Washing"),
      href: "/services/house-washing",
      description: "Complete exterior house cleaning",
      icon: "/lovable-uploads/c0750156-e7a2-4f23-bffc-fa6aadabc8af.png"
    },
    {
      title: t("Driveway Pressure Washing"),
      href: "/services/driveway-pressure-washing",
      description: "Remove stains and restore your driveway",
      icon: "/lovable-uploads/09259a98-7e2b-4244-b338-ffb0d146e979.png"
    },
    {
      title: t("Fence Washing"),
      href: "/services/fence-washing",
      description: "Clean and restore all fence types",
      icon: "/lovable-uploads/1365dd51-01ea-4a4a-be27-dadd88cf8a5c.png"
    }
  ];

  const commercialServices = [
    {
      title: t("Commercial Window Cleaning"),
      href: "/services/commercial-window-cleaning",
      description: "Professional window cleaning for businesses",
      icon: "/lovable-uploads/c0750156-e7a2-4f23-bffc-fa6aadabc8af.png"
    },
    {
      title: t("Commercial Pressure Washing"),
      href: "/services/commercial-pressure-washing", 
      description: "Large-scale pressure washing services",
      icon: "/lovable-uploads/09259a98-7e2b-4244-b338-ffb0d146e979.png"
    },
    {
      title: t("Post-Construction Cleaning"),
      href: "/services/post-construction-cleaning",
      description: "Complete post-construction cleanup",
      icon: "/lovable-uploads/1365dd51-01ea-4a4a-be27-dadd88cf8a5c.png"
    }
  ];

  const moreLinks = [
    {
      title: t("Compare Services"),
      href: "/compare-prices",
      description: "Compare our services and pricing",
      icon: "/lovable-uploads/c0750156-e7a2-4f23-bffc-fa6aadabc8af.png"
    },
    {
      title: t("See All Services"),
      href: "/services",
      description: "View our complete service list",
      icon: "/lovable-uploads/09259a98-7e2b-4244-b338-ffb0d146e979.png"
    },
    {
      title: t("Our Equipment"),
      href: "/equipment",
      description: "Professional-grade cleaning equipment",
      icon: "/lovable-uploads/1365dd51-01ea-4a4a-be27-dadd88cf8a5c.png"
    },
    {
      title: t("Leave a Review"),
      href: "/testimonials",
      description: "Share your experience with us",
      icon: "/lovable-uploads/c0750156-e7a2-4f23-bffc-fa6aadabc8af.png"
    }
  ];

  const textColor = isOverVideo ? 'text-white' : 'text-gray-900';
  const hoverTextColor = isOverVideo ? 'hover:text-gray-200' : 'hover:text-bc-red';

  return (
    <div className="hidden lg:flex items-center justify-between w-full">
      <Logo isOverVideo={isOverVideo} />
      
      <NavigationMenu className="z-50">
        <NavigationMenuList className="space-x-2">
          <NavigationMenuItem>
            <Link 
              to="/" 
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                textColor,
                hoverTextColor,
                "focus:outline-none focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              )}
            >
              {t("Home")}
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link 
              to="/why-us" 
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                textColor,
                hoverTextColor,
                "focus:outline-none focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              )}
            >
              {t("Why Us")}
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn("bg-transparent", textColor, hoverTextColor)}>
              {t("Services")}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg">
              <div className="grid w-[800px] gap-3 p-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">Residential Services</h4>
                  <div className="space-y-1">
                    {services.map((service) => (
                      <NavigationMenuLink key={service.href} asChild>
                        <Link
                          to={service.href}
                          className="group flex items-center space-x-3 rounded-md p-3 text-sm leading-none text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          <img src={service.icon} alt="" className="w-6 h-6" />
                          <div>
                            <div className="font-medium">{service.title}</div>
                            <div className="text-xs text-gray-500">{service.description}</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">Commercial Services</h4>
                  <div className="space-y-1">
                    {commercialServices.map((service) => (
                      <NavigationMenuLink key={service.href} asChild>
                        <Link
                          to={service.href}
                          className="group flex items-center space-x-3 rounded-md p-3 text-sm leading-none text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          <img src={service.icon} alt="" className="w-6 h-6" />
                          <div>
                            <div className="font-medium">{service.title}</div>
                            <div className="text-xs text-gray-500">{service.description}</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn("bg-transparent", textColor, hoverTextColor)}>
              {t("More")}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg">
              <div className="w-[400px] p-4">
                <div className="space-y-1">
                  {moreLinks.map((link) => (
                    <NavigationMenuLink key={link.href} asChild>
                      <Link
                        to={link.href}
                        className="group flex items-center space-x-3 rounded-md p-3 text-sm leading-none text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <img src={link.icon} alt="" className="w-6 h-6" />
                        <div>
                          <div className="font-medium">{link.title}</div>
                          <div className="text-xs text-gray-500">{link.description}</div>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link 
              to="/contact" 
              className={cn(
                "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                textColor,
                hoverTextColor,
                "focus:outline-none focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
              )}
            >
              {t("Contact")}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center space-x-3">
        <a href="tel:778-808-7620">
          <Button 
            variant={isOverVideo ? "secondary" : "outline"} 
            size="sm"
            className={cn(
              "text-sm",
              isOverVideo ? "bg-white/90 text-gray-900 hover:bg-white" : "border-bc-red text-bc-red hover:bg-bc-red hover:text-white"
            )}
          >
            <Phone className="mr-2 h-4 w-4" />
            {t("Call (778) 808-7620")}
          </Button>
        </a>

        <Button asChild size="sm" variant="bc-red">
          <Link to="/calculator">
            {t("Get Free Quote Online")}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NavbarDesktop;

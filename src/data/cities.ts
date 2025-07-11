
export interface City {
  name: string;
  slug: string;
  population: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  neighborhoods: string[];
  description: string;
  keyServices: string[];
  localTips: string[];
  demographics: {
    averageIncome: string;
    homeOwnership: string;
    averageHomeValue: string;
  };
  hideFromNavigation?: boolean;
}

export const cities: City[] = [
  {
    name: "White Rock",
    slug: "white-rock",
    population: 20072,
    coordinates: { lat: 49.0258, lng: -122.8030 },
    neighborhoods: ["West Beach", "East Beach", "Hillside", "Centennial Park", "Five Corners"],
    description: "Beautiful beachfront city known for its pristine waterfront properties and upscale homes requiring premium exterior cleaning services.",
    keyServices: ["Luxury home washing", "Oceanfront window cleaning", "Salt residue removal", "Deck and patio cleaning"],
    localTips: [
      "Salt air requires more frequent exterior cleaning",
      "Spring cleaning is essential after winter storms",
      "UV protection treatments recommended for south-facing surfaces"
    ],
    demographics: {
      averageIncome: "$65,000",
      homeOwnership: "75%",
      averageHomeValue: "$1,100,000"
    }
  },
  {
    name: "Surrey",
    slug: "surrey",
    population: 568322,
    coordinates: { lat: 49.1913, lng: -122.8490 },
    neighborhoods: ["Guildford", "Fleetwood", "Newton", "Cloverdale", "South Surrey", "Whalley"],
    description: "BC's second-largest city with diverse housing from condos to luxury estates, all requiring professional maintenance.",
    keyServices: ["Multi-unit building services", "Residential pressure washing", "Commercial window cleaning", "Gutter maintenance"],
    localTips: [
      "High-rise buildings need specialized equipment",
      "Diverse weather patterns require year-round services",
      "Growing tech sector means busy homeowners need reliable service"
    ],
    demographics: {
      averageIncome: "$58,000",
      homeOwnership: "68%",
      averageHomeValue: "$920,000"
    }
  },
  {
    name: "Vancouver",
    slug: "vancouver",
    population: 695263,
    coordinates: { lat: 49.2827, lng: -123.1207 },
    neighborhoods: ["Downtown", "West End", "Kitsilano", "Point Grey", "Commercial Drive", "Gastown"],
    description: "Canada's premier west coast city with high-end condos and heritage homes requiring expert exterior care.",
    keyServices: ["High-rise window cleaning", "Heritage home restoration cleaning", "Condo building maintenance", "Commercial storefront cleaning"],
    localTips: [
      "Frequent rain requires mold and algae prevention",
      "Urban pollution needs regular building washing",
      "Historic buildings need gentle, specialized cleaning"
    ],
    demographics: {
      averageIncome: "$72,000",
      homeOwnership: "64%",
      averageHomeValue: "$1,200,000"
    }
  },
  {
    name: "Burnaby",
    slug: "burnaby",
    population: 249125,
    coordinates: { lat: 49.2488, lng: -122.9805 },
    neighborhoods: ["Brentwood", "Metrotown", "Deer Lake", "Capitol Hill", "Heights"],
    description: "Modern city with mix of high-rises and family homes, known for its mountain views and green spaces.",
    keyServices: ["Condo tower cleaning", "Suburban home maintenance", "Deck and fence cleaning", "Commercial plaza services"],
    localTips: [
      "Mountain proximity means more debris and organic growth",
      "Mixed residential types require flexible service options",
      "Growing density creates opportunities for building maintenance"
    ],
    demographics: {
      averageIncome: "$63,000",
      homeOwnership: "70%",
      averageHomeValue: "$1,050,000"
    }
  },
  {
    name: "Richmond",
    slug: "richmond",
    population: 209937,
    coordinates: { lat: 49.1666, lng: -123.0713 },
    neighborhoods: ["Steveston", "City Centre", "Hamilton", "Seafair", "Thompson"],
    description: "Island city with unique challenges from river proximity and international community with high property maintenance standards.",
    keyServices: ["Waterfront property cleaning", "Multi-cultural community service", "Luxury home maintenance", "Marina and dock cleaning"],
    localTips: [
      "River proximity increases moisture and algae issues",
      "International community values premium service quality",
      "Island location creates unique weather cleaning challenges"
    ],
    demographics: {
      averageIncome: "$67,000",
      homeOwnership: "72%",
      averageHomeValue: "$1,150,000"
    }
  },
  {
    name: "Coquitlam",
    slug: "coquitlam",
    population: 148625,
    coordinates: { lat: 49.2838, lng: -122.7932 },
    neighborhoods: ["Town Centre", "Westwood Plateau", "Burke Mountain", "Maillardville", "Ranch Park"],
    description: "Growing suburban city with new developments and established neighborhoods requiring comprehensive exterior maintenance.",
    keyServices: ["New home cleaning services", "Established neighborhood maintenance", "Hillside property access", "Community facility cleaning"],
    localTips: [
      "Rapid growth means many new construction cleaning needs",
      "Hillside locations require specialized equipment access",
      "Mix of new and established homes needs varied approaches"
    ],
    demographics: {
      averageIncome: "$71,000",
      homeOwnership: "73%",
      averageHomeValue: "$980,000"
    }
  },
  {
    name: "Langley City",
    slug: "langley-city",
    population: 28963,
    coordinates: { lat: 49.0977, lng: -122.6604 },
    neighborhoods: ["Downtown Langley", "Nicomekl", "Douglas Park", "Yorkson"],
    description: "Historic city center with charming older homes and growing modern developments.",
    keyServices: ["Heritage building cleaning", "Downtown commercial services", "Residential maintenance", "Historic preservation cleaning"],
    localTips: [
      "Historic buildings require gentle cleaning methods",
      "Compact city allows for efficient service routes",
      "Mix of old and new architecture needs specialized approaches"
    ],
    demographics: {
      averageIncome: "$55,000",
      homeOwnership: "58%",
      averageHomeValue: "$750,000"
    }
  },
  {
    name: "Township of Langley",
    slug: "township-of-langley",
    population: 132389,
    coordinates: { lat: 49.1636, lng: -122.6006 },
    neighborhoods: ["Willoughby", "Walnut Grove", "Fort Langley", "Murrayville", "Aldergrove"],
    description: "Large suburban township with family homes, rural properties, and historic Fort Langley.",
    keyServices: ["Suburban home cleaning", "Rural property maintenance", "Large lot services", "Heritage site cleaning"],
    localTips: [
      "Large properties may need extensive cleaning services",
      "Rural areas have unique access and equipment needs",
      "Family-focused community values reliable, trustworthy service"
    ],
    demographics: {
      averageIncome: "$78,000",
      homeOwnership: "85%",
      averageHomeValue: "$850,000"
    },
    hideFromNavigation: true
  },
  {
    name: "Delta",
    slug: "delta",
    population: 108455,
    coordinates: { lat: 49.0955, lng: -123.0593 },
    neighborhoods: ["Ladner", "Tsawwassen", "North Delta", "Burns Bog"],
    description: "Agricultural and residential community with waterfront properties and rural estates requiring specialized cleaning.",
    keyServices: ["Waterfront property maintenance", "Rural estate cleaning", "Agricultural building services", "Ferry terminal area commercial cleaning"],
    localTips: [
      "Agricultural area means more organic debris and staining",
      "Waterfront properties need salt and moisture management",
      "Large properties often require extended service times"
    ],
    demographics: {
      averageIncome: "$68,000",
      homeOwnership: "78%",
      averageHomeValue: "$890,000"
    }
  },
  {
    name: "New Westminster",
    slug: "new-westminster",
    population: 78916,
    coordinates: { lat: 49.2057, lng: -122.9110 },
    neighborhoods: ["Queen's Park", "Uptown", "Downtown", "West End", "Connaught Heights"],
    description: "Historic Royal City with heritage buildings and modern developments along the Fraser River.",
    keyServices: ["Historic building cleaning", "High-rise maintenance", "Riverfront property care", "Heritage preservation services"],
    localTips: [
      "Heritage buildings need specialized gentle cleaning",
      "River proximity creates humidity and algae challenges",
      "Compact urban setting allows efficient service delivery"
    ],
    demographics: {
      averageIncome: "$61,000",
      homeOwnership: "65%",
      averageHomeValue: "$825,000"
    }
  },
  {
    name: "Port Coquitlam",
    slug: "port-coquitlam",
    population: 61498,
    coordinates: { lat: 49.2654, lng: -122.7691 },
    neighborhoods: ["Central Poco", "Citadel Heights", "Riverwood", "Mary Hill"],
    description: "Family-oriented community with mix of older homes and new developments in a scenic river valley setting.",
    keyServices: ["Family home maintenance", "Valley property cleaning", "Community facility services", "Riverfront property care"],
    localTips: [
      "River valley location creates unique moisture conditions",
      "Family community values reliable, safe service practices",
      "Mix of home ages requires varied cleaning approaches"
    ],
    demographics: {
      averageIncome: "$69,000",
      homeOwnership: "74%",
      averageHomeValue: "$875,000"
    }
  },
  {
    name: "Port Moody",
    slug: "port-moody",
    population: 33551,
    coordinates: { lat: 49.2834, lng: -122.8317 },
    neighborhoods: ["Heritage Woods", "College Park", "Glenayre", "Moody Centre"],
    description: "Scenic city at the head of Burrard Inlet with waterfront properties and mountain views.",
    keyServices: ["Waterfront home cleaning", "Mountain view property maintenance", "Inlet proximity salt management", "Scenic property enhancement"],
    localTips: [
      "Inlet location means salt air and marine conditions",
      "Mountain backdrop creates debris and organic growth",
      "Scenic properties require premium appearance maintenance"
    ],
    demographics: {
      averageIncome: "$75,000",
      homeOwnership: "76%",
      averageHomeValue: "$950,000"
    }
  },
  {
    name: "Pitt Meadows",
    slug: "pitt-meadows",
    population: 19146,
    coordinates: { lat: 49.2312, lng: -122.6870 },
    neighborhoods: ["Harris Road", "Meadowbrook", "South Bonson", "Osprey Village"],
    description: "Rural community with large properties, equestrian facilities, and mountain proximity.",
    keyServices: ["Large property maintenance", "Equestrian facility cleaning", "Rural home services", "Agricultural building cleaning"],
    localTips: [
      "Large rural properties need extended service capabilities",
      "Agricultural use creates unique cleaning challenges",
      "Mountain proximity increases organic debris"
    ],
    demographics: {
      averageIncome: "$72,000",
      homeOwnership: "82%",
      averageHomeValue: "$800,000"
    }
  },
  {
    name: "Maple Ridge",
    slug: "maple-ridge",
    population: 90990,
    coordinates: { lat: 49.2197, lng: -122.6746 },
    neighborhoods: ["Haney", "Hammond", "Silver Valley", "Albion", "Webster's Corners"],
    description: "Growing community balancing rural charm with urban amenities, featuring diverse property types from farms to subdivisions.",
    keyServices: ["Suburban development cleaning", "Rural property maintenance", "Mountain foothill services", "Mixed residential cleaning"],
    localTips: [
      "Rapid growth creates demand for new home cleaning",
      "Rural-urban mix requires flexible service options",
      "Mountain location means seasonal debris challenges"
    ],
    demographics: {
      averageIncome: "$66,000",
      homeOwnership: "79%",
      averageHomeValue: "$820,000"
    }
  }
];

export const getCityBySlug = (slug: string): City | undefined => {
  return cities.find(city => city.slug === slug);
};

// Filter cities for navigation - exclude hidden ones
export const getNavigationCities = (): City[] => {
  return cities.filter(city => !city.hideFromNavigation);
};

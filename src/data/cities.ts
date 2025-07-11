
export interface CityData {
  name: string;
  slug: string;
  postalCodePrefix: string;
  nearbyAreas: string[];
  testimonials: Array<{
    text: string;
    author: string;
    rating: number;
  }>;
}

export const cities: CityData[] = [
  {
    name: "Vancouver",
    slug: "vancouver",
    postalCodePrefix: "V5K, V5L, V5M, V5N, V5P, V5R, V5S, V5T, V5V, V5W, V5X, V5Y, V5Z, V6A, V6B, V6C, V6E, V6G, V6H, V6J, V6K, V6L, V6M, V6N, V6P, V6R, V6S, V6T, V6V, V6W, V6X, V6Y, V6Z, V7A, V7B, V7C, V7E, V7G, V7H, V7J, V7K, V7L, V7M, V7N, V7P, V7R, V7S, V7T, V7V, V7W, V7X, V7Y",
    nearbyAreas: ["Downtown", "West End", "Kitsilano", "Mount Pleasant", "Commercial Drive", "Yaletown", "Coal Harbour"],
    testimonials: [
      {
        text: "Outstanding service! They cleaned our downtown condo windows perfectly and the pressure washing made our patio look brand new.",
        author: "Sarah M., Downtown Vancouver",
        rating: 5
      },
      {
        text: "Professional team, fair pricing, and excellent results. Our Kitsilano home looks amazing after their complete exterior cleaning.",
        author: "Mike T., Kitsilano",
        rating: 5
      },
      {
        text: "Best window cleaning service in Vancouver! They've been maintaining our office building for over a year now.",
        author: "Jennifer L., Yaletown",
        rating: 5
      }
    ]
  },
  {
    name: "Surrey",
    slug: "surrey",
    postalCodePrefix: "V3R, V3S, V3T, V3V, V3W, V3X, V3Y, V3Z, V4A, V4B, V4N, V4P",
    nearbyAreas: ["Guildford", "Fleetwood", "Newton", "Cloverdale", "South Surrey", "Whalley", "Fraser Heights"],
    testimonials: [
      {
        text: "BC Pressure Washing transformed our Surrey home! The driveway and siding look like new. Highly recommend their services.",
        author: "David K., Guildford",
        rating: 5
      },
      {
        text: "Reliable, professional, and thorough. They cleaned our gutters and windows - everything looks spotless!",
        author: "Lisa R., Fleetwood",
        rating: 5
      },
      {
        text: "Great value for money. Our Newton home's exterior cleaning exceeded our expectations.",
        author: "James P., Newton",
        rating: 5
      }
    ]
  },
  {
    name: "Burnaby",
    slug: "burnaby", 
    postalCodePrefix: "V3J, V3N, V5A, V5B, V5C, V5E, V5G, V5H, V5J",
    nearbyAreas: ["Brentwood", "Metrotown", "Deer Lake", "Capitol Hill", "Sperling", "Willingdon Heights"],
    testimonials: [
      {
        text: "Excellent window cleaning service for our Metrotown condo. Professional and reliable team.",
        author: "Anna S., Metrotown",
        rating: 5
      },
      {
        text: "They pressure washed our deck and it looks incredible. Will definitely use them again!",
        author: "Robert M., Brentwood",
        rating: 5
      },
      {
        text: "Top-notch gutter cleaning service. Our Burnaby home is well-maintained thanks to their regular visits.",
        author: "Patricia W., Capitol Hill",
        rating: 5
      }
    ]
  },
  {
    name: "Richmond",
    slug: "richmond",
    postalCodePrefix: "V6V, V6W, V6X, V6Y, V6Z, V7A, V7B, V7C, V7E",
    nearbyAreas: ["Steveston", "Richmond Centre", "Brighouse", "Terra Nova", "Hamilton", "Seafair"],
    testimonials: [
      {
        text: "Outstanding pressure washing service! Our Richmond driveway and walkways look brand new.",
        author: "Kevin L., Steveston",
        rating: 5
      },
      {
        text: "Professional window cleaning team. Our home in Terra Nova has never looked better!",
        author: "Maria G., Terra Nova",
        rating: 5
      },
      {
        text: "Reliable and thorough gutter cleaning. Highly recommend for Richmond homeowners.",
        author: "Tom H., Brighouse",
        rating: 5
      }
    ]
  },
  {
    name: "Coquitlam",
    slug: "coquitlam",
    postalCodePrefix: "V3B, V3C, V3E, V3H, V3J, V3K",
    nearbyAreas: ["Port Coquitlam", "Port Moody", "Westwood Plateau", "Burke Mountain", "Town Centre", "River Springs"],
    testimonials: [
      {
        text: "BC Pressure Washing did an amazing job on our Coquitlam home. The exterior looks fantastic!",
        author: "Michelle D., Town Centre",
        rating: 5
      },
      {
        text: "Great service for our Burke Mountain home. Professional team and excellent results.",
        author: "Andrew C., Burke Mountain", 
        rating: 5
      },
      {
        text: "Window cleaning service was perfect. Our Westwood Plateau home sparkles now!",
        author: "Sandra K., Westwood Plateau",
        rating: 5
      }
    ]
  },
  {
    name: "Langley City",
    slug: "langley-city",
    postalCodePrefix: "V1M, V2Y, V2Z, V3A",
    nearbyAreas: ["Langley Township", "Walnut Grove", "Fort Langley", "Murrayville", "Brookswood", "Fernridge"],
    testimonials: [
      {
        text: "Excellent pressure washing service in Langley! Our driveway and patio look amazing.",
        author: "Chris B., Langley City",
        rating: 5
      },
      {
        text: "Professional window cleaning team. Our Fort Langley home looks pristine!",
        author: "Rachel T., Fort Langley",
        rating: 5
      },
      {
        text: "Outstanding gutter cleaning service. Highly recommend for Langley residents.",
        author: "Paul M., Walnut Grove",
        rating: 5
      }
    ]
  },
  {
    name: "Township of Langley",
    slug: "township-of-langley",
    postalCodePrefix: "V1M, V2Y, V2Z, V3A",
    nearbyAreas: ["Walnut Grove", "Fort Langley", "Murrayville", "Brookswood", "Fernridge", "Aldergrove"],
    testimonials: [
      {
        text: "Great pressure washing service for our Walnut Grove home. Everything looks brand new!",
        author: "Nancy F., Walnut Grove",
        rating: 5
      },
      {
        text: "Professional and thorough window cleaning. Our Murrayville home sparkles!",
        author: "Steve L., Murrayville",
        rating: 5
      },
      {
        text: "Excellent gutter cleaning service. Our Brookswood property is well-maintained.",
        author: "Karen W., Brookswood",
        rating: 5
      }
    ]
  },
  {
    name: "Delta",
    slug: "delta",
    postalCodePrefix: "V4C, V4E, V4K, V4L, V4M",
    nearbyAreas: ["Ladner", "Tsawwassen", "North Delta", "Boundary Bay", "Burns Bog", "Sunshine Hills"],
    testimonials: [
      {
        text: "Amazing pressure washing service in Tsawwassen! Our home's exterior looks incredible.",
        author: "Gary H., Tsawwassen",
        rating: 5
      },
      {
        text: "Professional window cleaning team. Our Ladner home has never looked better!",
        author: "Diane R., Ladner",
        rating: 5
      },
      {
        text: "Excellent gutter cleaning service. Highly recommend for Delta residents.",
        author: "Mark S., North Delta",
        rating: 5
      }
    ]
  },
  {
    name: "New Westminster",
    slug: "new-westminster",
    postalCodePrefix: "V3L, V3M",
    nearbyAreas: ["Queensborough", "Uptown", "Downtown", "West End", "Connaught Heights", "Brow of the Hill"],
    testimonials: [
      {
        text: "Outstanding pressure washing service! Our New Westminster home looks fantastic.",
        author: "Linda J., Uptown",
        rating: 5
      },
      {
        text: "Great window cleaning service. Our Queensborough condo windows are spotless!",
        author: "Rick D., Queensborough",
        rating: 5
      },
      {
        text: "Professional gutter cleaning team. Our downtown property is well-maintained.",
        author: "Carol P., Downtown",
        rating: 5
      }
    ]
  },
  {
    name: "Port Coquitlam",
    slug: "port-coquitlam",
    postalCodePrefix: "V3B, V3C",
    nearbyAreas: ["Coquitlam", "Port Moody", "Pitt Meadows", "Mary Hill", "Birchland Manor", "Citadel Heights"],
    testimonials: [
      {
        text: "Excellent pressure washing service in Port Coquitlam! Our driveway looks brand new.",
        author: "Jason K., Mary Hill",
        rating: 5
      },
      {
        text: "Professional window cleaning team. Our Citadel Heights home sparkles!",
        author: "Amanda L., Citadel Heights",
        rating: 5
      },
      {
        text: "Great gutter cleaning service. Highly recommend for Port Coquitlam residents.",
        author: "Terry N., Birchland Manor",
        rating: 5
      }
    ]
  },
  {
    name: "Port Moody",
    slug: "port-moody",
    postalCodePrefix: "V3H",
    nearbyAreas: ["Coquitlam", "Port Coquitlam", "Anmore", "Belcarra", "Heritage Woods", "College Park"],
    testimonials: [
      {
        text: "Amazing pressure washing service! Our Port Moody home's exterior looks incredible.",
        author: "Brian T., Heritage Woods",
        rating: 5
      },
      {
        text: "Professional window cleaning service. Our College Park home has crystal clear windows!",
        author: "Jennifer M., College Park",
        rating: 5
      },
      {
        text: "Excellent gutter cleaning team. Our Port Moody property is perfectly maintained.",
        author: "Doug R., Port Moody",
        rating: 5
      }
    ]
  },
  {
    name: "Maple Ridge",
    slug: "maple-ridge",
    postalCodePrefix: "V2W, V2X, V4R",
    nearbyAreas: ["Pitt Meadows", "Mission", "Haney", "Hammond", "Silver Valley", "Albion"],
    testimonials: [
      {
        text: "Outstanding pressure washing service in Maple Ridge! Our home looks fantastic.",
        author: "Susan C., Haney",
        rating: 5
      },
      {
        text: "Great window cleaning team. Our Silver Valley home windows are spotless!",
        author: "Mike P., Silver Valley",
        rating: 5
      },
      {
        text: "Professional gutter cleaning service. Highly recommend for Maple Ridge residents.",
        author: "Lisa H., Hammond",
        rating: 5
      }
    ]
  },
  {
    name: "Pitt Meadows",
    slug: "pitt-meadows",
    postalCodePrefix: "V3Y",
    nearbyAreas: ["Maple Ridge", "Port Coquitlam", "Coquitlam", "Surrey", "Meadowtown", "Harris Landing"],
    testimonials: [
      {
        text: "Excellent pressure washing service! Our Pitt Meadows home looks amazing.",
        author: "Dan W., Meadowtown",
        rating: 5
      },
      {
        text: "Professional window cleaning team. Our Harris Landing home sparkles!",
        author: "Kelly F., Harris Landing",
        rating: 5
      },
      {
        text: "Great gutter cleaning service. Our Pitt Meadows property is well-maintained.",
        author: "Greg L., Pitt Meadows",
        rating: 5
      }
    ]
  },
  {
    name: "White Rock",
    slug: "white-rock",
    postalCodePrefix: "V4B",
    nearbyAreas: ["South Surrey", "Ocean Park", "Crescent Beach", "Elgin", "Five Corners", "Semiahmoo"],
    testimonials: [
      {
        text: "BC Pressure Washing exceeded our expectations! Our White Rock home's exterior cleaning was perfect.",
        author: "John D., White Rock",
        rating: 5
      },
      {
        text: "Professional window cleaning service. Our ocean view windows are crystal clear now!",
        author: "Mary S., Crescent Beach",
        rating: 5
      },
      {
        text: "Outstanding gutter cleaning and maintenance. Highly recommend for White Rock residents!",
        author: "Robert L., Five Corners",
        rating: 5
      }
    ]
  },
  {
    name: "Kelowna",
    slug: "kelowna",
    postalCodePrefix: "V1V, V1W, V1X, V1Y, V1Z, V4T, V4V",
    nearbyAreas: ["West Kelowna", "Peachland", "Summerland", "Penticton", "Rutland", "Glenmore", "Mission"],
    testimonials: [
      {
        text: "Outstanding pressure washing service! Our Kelowna home's driveway and deck look brand new after their thorough cleaning.",
        author: "Jennifer M., Glenmore",
        rating: 5
      },
      {
        text: "Professional window cleaning team with amazing results. Our lake view windows are crystal clear - the view is spectacular!",
        author: "Michael K., Mission",
        rating: 5
      },
      {
        text: "Excellent gutter cleaning and soft wash service. Our Rutland home looks pristine and well-maintained year-round.",
        author: "Sarah P., Rutland",
        rating: 5
      }
    ]
  }
];

export const getCityBySlug = (slug: string): CityData | null => {
  return cities.find(city => city.slug === slug) || null;
};

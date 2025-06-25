
export interface CityData {
  name: string;
  slug: string;
  postalCodePrefix: string;
  nearbyAreas: string[];
  testimonials: {
    text: string;
    author: string;
    rating: number;
  }[];
}

export const cities: CityData[] = [
  {
    name: "Vancouver",
    slug: "vancouver",
    postalCodePrefix: "V5, V6",
    nearbyAreas: ["West End", "Kitsilano", "Mount Pleasant", "Commercial Drive"],
    testimonials: [
      {
        text: "Excellent service! My driveway looks brand new after their pressure washing.",
        author: "Jennifer M., Vancouver",
        rating: 5
      },
      {
        text: "Professional window cleaning that left our home sparkling. Highly recommend!",
        author: "David L., Vancouver", 
        rating: 5
      },
      {
        text: "Fast, reliable service in Vancouver. They transformed our deck completely.",
        author: "Sarah K., Vancouver",
        rating: 5
      }
    ]
  },
  {
    name: "Surrey",
    slug: "surrey",
    postalCodePrefix: "V3R, V3S, V3T, V3V, V3W, V3X, V4A, V4N, V4P",
    nearbyAreas: ["Guildford", "Fleetwood", "Newton", "Cloverdale", "South Surrey"],
    testimonials: [
      {
        text: "Outstanding pressure washing service! Our Surrey home's siding looks amazing.",
        author: "Michael R., Surrey",
        rating: 5
      },
      {
        text: "Crystal clear windows and professional service. Worth every penny!",
        author: "Lisa T., Surrey",
        rating: 5
      },
      {
        text: "Transformed our patio and driveway. Excellent work in Surrey!",
        author: "Robert H., Surrey",
        rating: 5
      }
    ]
  },
  {
    name: "Burnaby",
    slug: "burnaby", 
    postalCodePrefix: "V5A, V5B, V5C, V5E, V5G, V5H, V5J",
    nearbyAreas: ["Metrotown", "Brentwood", "Lougheed", "Heights"],
    testimonials: [
      {
        text: "Professional team cleaned our windows perfectly. Great service in Burnaby!",
        author: "Karen W., Burnaby",
        rating: 5
      },
      {
        text: "Amazing pressure washing results on our deck and walkway.",
        author: "James P., Burnaby",
        rating: 5
      },
      {
        text: "Reliable and thorough service. Our Burnaby home looks fantastic!",
        author: "Amanda C., Burnaby",
        rating: 5
      }
    ]
  },
  {
    name: "Richmond",
    slug: "richmond",
    postalCodePrefix: "V6V, V6W, V6X, V6Y, V7A, V7B, V7C, V7E",
    nearbyAreas: ["Steveston", "Terra Nova", "City Centre", "Hamilton"],
    testimonials: [
      {
        text: "Exceptional window cleaning service! Our Richmond office building sparkles.",
        author: "Thomas L., Richmond",
        rating: 5
      },
      {
        text: "Great pressure washing work on our driveway and house exterior.",
        author: "Maria S., Richmond",
        rating: 5
      },
      {
        text: "Professional and punctual. Highly recommend for Richmond properties!",
        author: "Kevin D., Richmond",
        rating: 5
      }
    ]
  },
  {
    name: "Coquitlam",
    slug: "coquitlam",
    postalCodePrefix: "V3B, V3C, V3E, V3J, V3K",
    nearbyAreas: ["Burke Mountain", "Westwood Plateau", "Maillardville", "Town Centre"],
    testimonials: [
      {
        text: "Fantastic pressure washing service! Our Coquitlam deck looks brand new.",
        author: "Patricia B., Coquitlam",
        rating: 5
      },
      {
        text: "Professional window cleaning with attention to detail. Very satisfied!",
        author: "Steven G., Coquitlam",
        rating: 5
      },
      {
        text: "Excellent work on our home's exterior. Great service in Coquitlam!",
        author: "Michelle F., Coquitlam",
        rating: 5
      }
    ]
  },
  {
    name: "Langley City",
    slug: "langley-city",
    postalCodePrefix: "V1M, V2Y, V3A",
    nearbyAreas: ["Douglas", "Nicomekl", "City Centre"],
    testimonials: [
      {
        text: "Outstanding window cleaning service in Langley City. Highly professional!",
        author: "Daniel M., Langley City",
        rating: 5
      },
      {
        text: "Amazing pressure washing results. Our property looks incredible!",
        author: "Nicole J., Langley City",
        rating: 5
      },
      {
        text: "Reliable service and great results. Perfect for Langley City homes!",
        author: "Christopher K., Langley City",
        rating: 5
      }
    ]
  },
  {
    name: "Township of Langley",
    slug: "township-of-langley",
    postalCodePrefix: "V1M, V2Y, V2Z, V3A, V4W",
    nearbyAreas: ["Walnut Grove", "Willoughby", "Murrayville", "Brookswood", "Fort Langley"],
    testimonials: [
      {
        text: "Excellent pressure washing service! Our Langley Township home looks amazing.",
        author: "Rebecca A., Township of Langley",
        rating: 5
      },
      {
        text: "Professional window cleaning with fantastic results. Very impressed!",
        author: "Mark T., Township of Langley",
        rating: 5
      },
      {
        text: "Great service throughout Langley Township. Highly recommend!",
        author: "Jennifer L., Township of Langley",
        rating: 5
      }
    ]
  },
  {
    name: "Delta",
    slug: "delta",
    postalCodePrefix: "V4C, V4E, V4K, V4L, V4M",
    nearbyAreas: ["Ladner", "North Delta", "Tsawwassen", "Burns Bog"],
    testimonials: [
      {
        text: "Fantastic pressure washing work in Delta. Our driveway is spotless!",
        author: "Andrew H., Delta",
        rating: 5
      },
      {
        text: "Professional window cleaning service. Our Delta home sparkles!",
        author: "Susan R., Delta",
        rating: 5
      },
      {
        text: "Excellent service across all Delta communities. Very satisfied!",
        author: "Jason W., Delta",
        rating: 5
      }
    ]
  },
  {
    name: "New Westminster",
    slug: "new-westminster",
    postalCodePrefix: "V3L, V3M",
    nearbyAreas: ["Queens Park", "Uptown", "Downtown", "Queensborough"],
    testimonials: [
      {
        text: "Outstanding pressure washing service in New Westminster. Highly professional!",
        author: "Catherine P., New Westminster",
        rating: 5
      },
      {
        text: "Amazing window cleaning results. Our heritage home looks beautiful!",
        author: "Richard C., New Westminster",
        rating: 5
      },
      {
        text: "Reliable and thorough service. Perfect for New Westminster properties!",
        author: "Elizabeth D., New Westminster",
        rating: 5
      }
    ]
  },
  {
    name: "Port Coquitlam",
    slug: "port-coquitlam",
    postalCodePrefix: "V3B, V3C",
    nearbyAreas: ["Mary Hill", "Citadel Heights", "Riverwood", "Cedar Drive"],
    testimonials: [
      {
        text: "Excellent pressure washing service! Our Port Coquitlam deck is like new.",
        author: "Brian S., Port Coquitlam",
        rating: 5
      },
      {
        text: "Professional window cleaning with great attention to detail.",
        author: "Diane M., Port Coquitlam",
        rating: 5
      },
      {
        text: "Fantastic service in Port Coquitlam. Our home exterior looks amazing!",
        author: "Timothy R., Port Coquitlam",
        rating: 5
      }
    ]
  },
  {
    name: "Port Moody",
    slug: "port-moody",
    postalCodePrefix: "V3H",
    nearbyAreas: ["Heritage Woods", "College Park", "Klahanie", "Suter Brook"],
    testimonials: [
      {
        text: "Outstanding window cleaning service in Port Moody. Highly recommend!",
        author: "Sandra L., Port Moody",
        rating: 5
      },
      {
        text: "Amazing pressure washing results on our driveway and patio.",
        author: "Paul N., Port Moody",
        rating: 5
      },
      {
        text: "Professional service and excellent results in Port Moody!",
        author: "Monica V., Port Moody",
        rating: 5
      }
    ]
  },
  {
    name: "Maple Ridge",
    slug: "maple-ridge",
    postalCodePrefix: "V2W, V2X, V4R",
    nearbyAreas: ["Silver Valley", "Thornhill", "Hammond", "Webster's Corners"],
    testimonials: [
      {
        text: "Fantastic pressure washing service! Our Maple Ridge home looks incredible.",
        author: "Gregory T., Maple Ridge",
        rating: 5
      },
      {
        text: "Professional window cleaning with exceptional results.",
        author: "Heather J., Maple Ridge",
        rating: 5
      },
      {
        text: "Excellent service throughout Maple Ridge. Very satisfied!",
        author: "Douglas F., Maple Ridge",
        rating: 5
      }
    ]
  },
  {
    name: "Pitt Meadows",
    slug: "pitt-meadows",
    postalCodePrefix: "V3Y",
    nearbyAreas: ["South Meadows", "Harris Road", "Airport Way"],
    testimonials: [
      {
        text: "Outstanding pressure washing service in Pitt Meadows. Highly professional!",
        author: "Cheryl K., Pitt Meadows",
        rating: 5
      },
      {
        text: "Amazing window cleaning results. Our home sparkles!",
        author: "Frank B., Pitt Meadows",
        rating: 5
      },
      {
        text: "Reliable service and great results in Pitt Meadows!",
        author: "Janet S., Pitt Meadows",
        rating: 5
      }
    ]
  },
  {
    name: "White Rock",
    slug: "white-rock",
    postalCodePrefix: "V4B",
    nearbyAreas: ["East Beach", "West Beach", "Five Corners", "Hillside"],
    testimonials: [
      {
        text: "Excellent pressure washing service! Our White Rock home looks amazing.",
        author: "Patricia G., White Rock",
        rating: 5
      },
      {
        text: "Professional window cleaning with fantastic ocean views restored!",
        author: "William E., White Rock",
        rating: 5
      },
      {
        text: "Great service in White Rock. Our beachside property sparkles!",
        author: "Margaret H., White Rock",
        rating: 5
      }
    ]
  }
];

export const getCityBySlug = (slug: string): CityData | undefined => {
  return cities.find(city => city.slug === slug);
};

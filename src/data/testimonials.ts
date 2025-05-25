
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  quote: string;
  service: "roof-cleaning" | "window-cleaning" | "pressure-washing" | "gutter-cleaning";
  beforeAfterImage?: string;
  profileImage?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah M.",
    location: "White Rock, BC",
    rating: 5,
    quote: "BC Pressure Washing saved me from a $4,000 roof repair! What I thought was roof damage turned out to be just severe moss and algae buildup. Jayden's thorough cleaning revealed that my roof was actually in perfect condition underneath. His expertise and honest assessment saved me thousands. I can't recommend them enough!",
    service: "roof-cleaning",
    beforeAfterImage: "/lovable-uploads/deea00c1-1c27-44fd-b409-09d0f3ff0afa.png",
    profileImage: "/lovable-uploads/72766780-6dc1-42de-8971-3a11add4daad.png"
  },
  {
    id: 2,
    name: "Mike Thompson",
    location: "Surrey, BC",
    rating: 5,
    quote: "Excellent service from start to finish. My windows are crystal clear and the team was professional and punctual.",
    service: "window-cleaning",
    beforeAfterImage: "/lovable-uploads/1a1f8b2e-bcc7-4d88-ae7c-ed4024c70ae4.png"
  },
  {
    id: 3,
    name: "Jennifer L.",
    location: "Delta, BC",
    rating: 5,
    quote: "Amazing pressure washing service! My driveway looks brand new. Highly recommend BC Pressure Washing.",
    service: "pressure-washing",
    beforeAfterImage: "/lovable-uploads/fa3b438e-d980-439e-9d0f-e829e376fcf7.png"
  },
  {
    id: 4,
    name: "Robert K.",
    location: "Langley, BC",
    rating: 5,
    quote: "Professional gutter cleaning service. They removed years of buildup and my gutters are flowing perfectly now.",
    service: "gutter-cleaning"
  },
  {
    id: 5,
    name: "Amanda S.",
    location: "Richmond, BC",
    rating: 5,
    quote: "The team did an incredible job cleaning our commercial building. Very professional and thorough work.",
    service: "pressure-washing"
  },
  {
    id: 6,
    name: "David Chen",
    location: "Vancouver, BC",
    rating: 5,
    quote: "Outstanding window cleaning service. They pay attention to every detail and the results are always perfect.",
    service: "window-cleaning"
  },
  {
    id: 7,
    name: "Lisa R.",
    location: "Burnaby, BC",
    rating: 5,
    quote: "Great experience with BC Pressure Washing. They transformed our dirty siding and made our house look new again.",
    service: "pressure-washing"
  },
  {
    id: 8,
    name: "Mark Johnson",
    location: "Coquitlam, BC",
    rating: 5,
    quote: "Reliable and efficient roof cleaning service. They removed all the moss and debris safely and professionally.",
    service: "roof-cleaning"
  }
];

export const testimonialsWithImages = testimonials.filter(t => t.beforeAfterImage);

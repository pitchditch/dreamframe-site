
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: number;
  profileImage?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Thompson",
    location: "White Rock",
    quote: "Great service in White Rock! Professional and thorough.",
    rating: 5,
    profileImage: "/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png"
  },
  {
    id: 2,
    name: "Michael Johnson",
    location: "Surrey",
    quote: "Best window cleaning service we've used. Highly recommend!",
    rating: 5,
    profileImage: "/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png"
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    location: "South Surrey",
    quote: "Friendly team, fair prices, excellent results.",
    rating: 5,
    profileImage: "/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png"
  }
];


export interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: number;
  profileImage?: string;
  beforeAfterImage?: string;
  service?: "gutter-cleaning" | "window-cleaning" | "pressure-washing" | "roof-cleaning";
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Thompson",
    location: "White Rock",
    quote: "Great service in White Rock! Professional and thorough.",
    rating: 5,
    profileImage: "/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png",
    beforeAfterImage: "/lovable-uploads/481b70c0-733d-4cc9-9629-3628731d87e4.png",
    service: "window-cleaning"
  },
  {
    id: 2,
    name: "Michael Johnson",
    location: "Surrey",
    quote: "Best window cleaning service we've used. Highly recommend!",
    rating: 5,
    profileImage: "/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png",
    beforeAfterImage: "/lovable-uploads/ff861e81-c504-47c8-aae7-5319b9ad2ab4.png",
    service: "pressure-washing"
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    location: "South Surrey",
    quote: "Friendly team, fair prices, excellent results.",
    rating: 5,
    profileImage: "/lovable-uploads/9ab5a05b-8db4-45b1-b31f-73f16bbc49a0.png",
    beforeAfterImage: "/lovable-uploads/29932697-b24f-4d93-9212-f1913cd47193.png",
    service: "gutter-cleaning"
  }
];

export const testimonialsWithImages = testimonials.filter(t => t.beforeAfterImage);

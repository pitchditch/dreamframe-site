interface Testimonial {
  id: number;
  service: 'gutter-cleaning' | 'window-cleaning' | 'pressure-washing' | 'roof-cleaning';
  rating: number;
  quote: string;
  name: string;
  location: string;
  beforeAfterImage?: string;
  profileImage?: string;
  gender?: 'male' | 'female';
}

// Profile image mapping based on gender and names
const maleProfileImages = [
  "/lovable-uploads/8ec60224-266f-4baa-8981-a7a129bfdf53.png",
  "/lovable-uploads/3ffb245d-3cf6-4b70-8571-3f688b385317.png"
];

const femaleProfileImages = [
  "/lovable-uploads/c829be0a-027f-441b-bcd7-03ceec15bb29.png",
  "/lovable-uploads/e296434c-e6d4-4206-a9ec-819213394091.png",
  "/lovable-uploads/48389c8e-2b9b-41b0-ba1f-4a9149180c4a.png",
  "/lovable-uploads/eb5ca3d6-8d6e-4d9c-b779-e2f2ec8ddd9b.png",
  "/lovable-uploads/10807731-675a-47ff-9d4d-aacdd946581e.png"
];

// Helper function to determine gender based on name
const determineGender = (name: string): 'male' | 'female' => {
  // Common female names in the testimonials
  const femaleNames = ['Sarah', 'Emily', 'Jennifer', 'Lisa', 'Michelle', 'Olivia', 'Jessica', 'Karen', 'Amanda', 'Stephanie', 'Emma', 'Patricia'];
  
  // Extract first name
  const firstName = name.split(' ')[0];
  
  // Check if it's in female names list
  return femaleNames.includes(firstName) ? 'female' : 'male';
};

// Full testimonials collection
const allTestimonials: Testimonial[] = [
  {
    id: 1,
    service: 'pressure-washing',
    rating: 5,
    quote: "I was amazed by how clean my house looks now! The pressure washing service was incredible. The team was professional and thorough, and the results speak for themselves.",
    name: "Michael Johnson",
    location: "Surrey, BC",
    beforeAfterImage: "/lovable-uploads/ef45fd36-a81d-41a3-8184-d3a91694f5ca.png",
    gender: 'male',
    profileImage: maleProfileImages[0]
  },
  {
    id: 2,
    service: 'pressure-washing',
    rating: 5,
    quote: "Outstanding pressure washing service! My siding was covered in dirt and grime, but now it looks brand new. Highly recommend their services!",
    name: "Sarah Thompson",
    location: "Langley, BC",
    beforeAfterImage: "/lovable-uploads/148003bb-352d-4ff8-af0b-2637eabaf9eb.png",
    gender: 'female',
    profileImage: femaleProfileImages[0]
  },
  {
    id: 3,
    service: 'pressure-washing',
    rating: 5,
    quote: "The transformation of my house exterior is incredible! The pressure washing team did an amazing job. Very satisfied with the results.",
    name: "David Wilson",
    location: "Richmond, BC",
    beforeAfterImage: "/lovable-uploads/6485c6c5-3c65-46de-b9f2-c054c708124b.png",
    gender: 'male',
    profileImage: maleProfileImages[1]
  },
  {
    id: 4,
    service: 'roof-cleaning',
    rating: 5,
    quote: "I didn't realize how dirty my roof had gotten until these guys came out! They were quick, careful, and did a great job removing moss and debris. My roof looks so much better now.",
    name: "Emily Johnson",
    location: "White Rock, BC",
    beforeAfterImage: "/lovable-uploads/d7fad83e-0097-44d1-8343-f62f754321ba.png",
    gender: 'female',
    profileImage: femaleProfileImages[1]
  },
  {
    id: 5,
    service: 'gutter-cleaning',
    rating: 5,
    quote: "Had my gutters cleaned today, and I couldn't be happier with the service. They showed up on time, cleaned everything thoroughly, and even pointed out some things I should keep an eye on.",
    name: "David Miller",
    location: "Coquitlam, BC",
    beforeAfterImage: "/lovable-uploads/a5671627-3791-4cbe-8df1-e571b18508d5.png",
    gender: 'male',
    profileImage: maleProfileImages[0]
  },
  {
    id: 6,
    service: 'window-cleaning',
    rating: 5,
    quote: "I'm so happy with how my windows turned out! They were a little streaky before, but now they're spotless. The crew was really friendly, and they took care not to make a mess inside.",
    name: "Jennifer Davis",
    location: "Burnaby, BC",
    beforeAfterImage: "/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png",
    gender: 'female',
    profileImage: femaleProfileImages[2]
  },
  {
    id: 7,
    service: 'pressure-washing',
    rating: 5,
    quote: "I thought my deck was beyond saving, but these guys proved me wrong. After pressure washing, it looks amazing—like new! They worked quickly, but didn't rush, and made sure to get every corner.",
    name: "Robert Anderson",
    location: "North Vancouver, BC",
    gender: 'male',
    profileImage: maleProfileImages[1]
  },
  {
    id: 8,
    service: 'roof-cleaning',
    rating: 5,
    quote: "I was worried about the condition of my roof, and they came through! The team cleaned it up, removed moss, and left it looking like new. They were professional, polite, and got the job done right.",
    name: "Lisa Martinez",
    location: "Richmond, BC",
    beforeAfterImage: "/lovable-uploads/9d9ccd18-e160-4e9f-b928-bd8314763a7a.png",
    gender: 'female',
    profileImage: femaleProfileImages[3]
  },
  {
    id: 9,
    service: 'gutter-cleaning',
    rating: 5,
    quote: "Great service! My gutters were overflowing, and these guys came in and cleaned them out quickly. They also took care of the mess and left everything spotless. Highly recommend!",
    name: "Thomas Clark",
    location: "Delta, BC",
    beforeAfterImage: "/lovable-uploads/80ecf163-0140-4688-86f4-213a4bfaa5bd.png",
    gender: 'male',
    profileImage: maleProfileImages[0]
  },
  {
    id: 10,
    service: 'window-cleaning',
    rating: 5,
    quote: "Wow, what a difference! My windows have never been this clean. They showed up on time, were super polite, and the job was done right. My whole house looks brighter.",
    name: "Amanda White",
    location: "Maple Ridge, BC",
    gender: 'female',
    profileImage: femaleProfileImages[1]
  },
  {
    id: 11,
    service: 'pressure-washing',
    rating: 5,
    quote: "These guys pressure washed my house, and it looks amazing! The exterior was covered in dirt and mold, and now it's sparkling clean. They were on time, respectful, and got the job done quickly.",
    name: "Daniel Lewis",
    location: "Port Coquitlam, BC",
    gender: 'male',
    profileImage: maleProfileImages[1]
  },
  {
    id: 12,
    service: 'roof-cleaning',
    rating: 5,
    quote: "I had a lot of moss buildup on my roof, and these professionals came out and cleaned it all off. They were careful with the process and made sure everything was spotless.",
    name: "Karen Walker",
    location: "New Westminster, BC",
    beforeAfterImage: "/lovable-uploads/788b3744-e48b-4db6-ae93-e540cf78b4e3.png",
    gender: 'female',
    profileImage: femaleProfileImages[4]
  },
  {
    id: 13,
    service: 'gutter-cleaning',
    rating: 5,
    quote: "I'm so relieved to have my gutters cleaned before the rain hits! The team showed up right on time, cleaned everything efficiently, and didn't leave a mess. Very happy with the service!",
    name: "Jason Brown",
    location: "Langley, BC",
    beforeAfterImage: "/lovable-uploads/8e7a598a-83f9-4c2b-bfaa-21091b96ffcf.png",
    gender: 'male',
    profileImage: maleProfileImages[0]
  },
  {
    id: 14,
    service: 'window-cleaning',
    rating: 5,
    quote: "I've had a few window cleaning services before, but none were as thorough as this one. They really took their time and cleaned every corner. I can see out of my windows perfectly now!",
    name: "Stephanie Scott",
    location: "Surrey, BC",
    gender: 'female',
    profileImage: femaleProfileImages[2]
  },
  {
    id: 15,
    service: 'pressure-washing',
    rating: 5,
    quote: "I'm beyond impressed with the pressure washing on my driveway and sidewalks. It was covered in dirt and stains, but now it looks brand new. The team was super friendly, and the results were definitely worth it.",
    name: "Eric Turner",
    location: "Abbotsford, BC",
    gender: 'male',
    profileImage: maleProfileImages[1]
  },
  {
    id: 16,
    service: 'roof-cleaning',
    rating: 5,
    quote: "I had no idea my roof was in such bad shape until these guys cleaned it! They did an excellent job removing moss and debris. My roof looks so much better, and I feel much more confident about it now.",
    name: "Michelle Taylor",
    location: "White Rock, BC",
    beforeAfterImage: "/lovable-uploads/67b32856-04c4-4832-9c20-9a0e56c5c2b8.png",
    gender: 'female',
    profileImage: femaleProfileImages[3]
  },
  {
    id: 17,
    service: 'gutter-cleaning',
    rating: 5,
    quote: "These guys were awesome. I called them when I noticed my gutters were clogged, and they came out right away. They did a great job cleaning everything and even gave me tips on keeping them clear.",
    name: "Peter Harris",
    location: "Coquitlam, BC",
    beforeAfterImage: "/lovable-uploads/aa926c91-97fb-4f9f-bab5-77cb342a2b38.png",
    gender: 'male',
    profileImage: maleProfileImages[1]
  },
  {
    id: 18,
    service: 'window-cleaning',
    rating: 5,
    quote: "My windows look incredible! They were very dirty and streaky before, but now they're spotless. The team was quick, polite, and made sure to take care around my furniture.",
    name: "Olivia Robinson",
    location: "Burnaby, BC",
    gender: 'female',
    profileImage: femaleProfileImages[4]
  },
  {
    id: 19,
    service: 'pressure-washing',
    rating: 5,
    quote: "I had my fence and patio pressure washed, and the difference is night and day. They removed years of dirt and stains in no time. The crew was polite and efficient.",
    name: "Christopher Lee",
    location: "North Vancouver, BC",
    gender: 'male',
    profileImage: maleProfileImages[0]
  },
  {
    id: 20,
    service: 'roof-cleaning',
    rating: 5,
    quote: "My roof looks so much better now after they cleaned it! They took their time, worked carefully, and made sure everything was perfect. Super happy with the results.",
    name: "Jessica Martin",
    location: "Richmond, BC",
    beforeAfterImage: "/lovable-uploads/e6fbc792-e8b4-40f8-8a66-042b53317347.png",
    gender: 'female',
    profileImage: femaleProfileImages[1]
  },
  {
    id: 21,
    service: 'pressure-washing',
    rating: 5,
    quote: "My vinyl siding was covered in green mold and dirt. After their pressure washing service, it looks like a completely different house! Neighbors have been asking who did the work.",
    name: "Richard Brooks",
    location: "Surrey, BC",
    beforeAfterImage: "/lovable-uploads/43002110-e9f7-4e22-826e-a90e5dc6687e.png",
    gender: 'male',
    profileImage: maleProfileImages[0]
  },
  {
    id: 22,
    service: 'pressure-washing',
    rating: 5,
    quote: "The green mildew on my house siding was embarrassing. Their team came in and completely transformed it! Amazing how much brighter and cleaner the whole house looks now.",
    name: "Patricia Chen",
    location: "Langley, BC",
    beforeAfterImage: "/lovable-uploads/55261385-ad80-4322-9551-dbc3392a881c.png",
    gender: 'female',
    profileImage: femaleProfileImages[3]
  },
  {
    id: 23,
    service: 'pressure-washing',
    rating: 5,
    quote: "I couldn't believe the difference in my house siding after their pressure washing service. The before and after is incredible! It looks like we painted the house, but it's just clean now.",
    name: "James Peterson",
    location: "Surrey, BC",
    beforeAfterImage: "/lovable-uploads/0ed0aa87-882b-4618-8a15-18d4ed7e4838.png",
    gender: 'male',
    profileImage: maleProfileImages[1]
  },
  {
    id: 24,
    service: 'pressure-washing',
    rating: 5,
    quote: "My house had years of dirt and mildew buildup on the siding. These guys did an amazing job restoring it to like-new condition. Their attention to detail around windows and fixtures was impressive!",
    name: "Emma Rodriguez",
    location: "Langley, BC",
    beforeAfterImage: "/lovable-uploads/3dd77762-89a1-4273-ae3e-1c6fbc9894aa.png",
    gender: 'female',
    profileImage: femaleProfileImages[2]
  }
];

// Export all testimonials instead of filtering
export const testimonials = allTestimonials;

// Also export a filtered version for components that specifically need testimonials with images
export const testimonialsWithImages = allTestimonials.filter(testimonial => testimonial.beforeAfterImage);

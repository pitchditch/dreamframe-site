export interface Testimonial {
  id: number;
  service: 'gutter-cleaning' | 'window-cleaning' | 'pressure-washing' | 'roof-cleaning';
  rating: number;
  quote: string;
  name: string;
  location: string;
  beforeAfterImage?: string;
  profileImage?: string;
}

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
    profileImage: "/lovable-uploads/041945aa-f58d-4820-9af6-0202a0b9b726.png"
  },
  {
    id: 2,
    service: 'pressure-washing',
    rating: 5,
    quote: "Outstanding pressure washing service! My siding was covered in dirt and grime, but now it looks brand new. Highly recommend their services!",
    name: "James Thompson",
    location: "Langley, BC",
    beforeAfterImage: "/lovable-uploads/148003bb-352d-4ff8-af0b-2637eabaf9eb.png",
    profileImage: "/lovable-uploads/7950561a-0da2-4ea2-9881-59e5b3ae27f0.png"
  },
  {
    id: 3,
    service: 'pressure-washing',
    rating: 5,
    quote: "The transformation of my house exterior is incredible! The pressure washing team did an amazing job. Very satisfied with the results.",
    name: "David Wilson",
    location: "Richmond, BC",
    beforeAfterImage: "/lovable-uploads/6485c6c5-3c65-46de-b9f2-c054c708124b.png",
    profileImage: "/lovable-uploads/3e2ccffc-4b8a-4ad3-a5d5-8181d964327b.png"
  },
  {
    id: 4,
    service: 'roof-cleaning',
    rating: 5,
    quote: "I didn't realize how dirty my roof had gotten until these guys came out! They were quick, careful, and did a great job removing moss and debris. My roof looks so much better now.",
    name: "Vikram Patel",
    location: "White Rock, BC",
    beforeAfterImage: "/lovable-uploads/d7fad83e-0097-44d1-8343-f62f754321ba.png",
    profileImage: "/lovable-uploads/f2f477ea-73e2-465a-99af-3c4b9ba6bf87.png"
  },
  {
    id: 5,
    service: 'gutter-cleaning',
    rating: 5,
    quote: "Had my gutters cleaned today, and I couldn't be happier with the service. They showed up on time, cleaned everything thoroughly, and even pointed out some things I should keep an eye on.",
    name: "Raj Singh",
    location: "Coquitlam, BC",
    beforeAfterImage: "/lovable-uploads/a5671627-3791-4cbe-8df1-e571b18508d5.png",
    profileImage: "/lovable-uploads/830ffd22-58bc-4cc2-a4e3-e6ddb4eda92a.png"
  },
  {
    id: 6,
    service: 'window-cleaning',
    rating: 5,
    quote: "I'm so happy with how my windows turned out! They were a little streaky before, but now they're spotless. The crew was really friendly, and they took care not to make a mess inside.",
    name: "Robert Davis",
    location: "Burnaby, BC",
    beforeAfterImage: "/lovable-uploads/76968d4f-c862-4989-a3e3-b74ac31968e2.png",
    profileImage: "/lovable-uploads/ee8cd4ce-caec-47f0-9a41-dd4f9e1eb510.png"
  },
  {
    id: 7,
    service: 'pressure-washing',
    rating: 5,
    quote: "I thought my deck was beyond saving, but these guys proved me wrong. After pressure washing, it looks amazing—like new! They worked quickly, but didn't rush, and made sure to get every corner.",
    name: "William Anderson",
    location: "North Vancouver, BC",
    profileImage: "/lovable-uploads/597df814-4a19-4822-a469-bebfb9a79713.png"
  },
  {
    id: 8,
    service: 'roof-cleaning',
    rating: 5,
    quote: "I was worried about the condition of my roof, and they came through! The team cleaned it up, removed moss, and left it looking like new. They were professional, polite, and got the job done right.",
    name: "Thomas Clark",
    location: "Richmond, BC",
    beforeAfterImage: "/lovable-uploads/9d9ccd18-e160-4e9f-b928-bd8314763a7a.png",
    profileImage: "/lovable-uploads/6d0c64f5-f9ca-4a4c-8a22-3f98058ecfa0.png"
  },
  {
    id: 9,
    service: 'gutter-cleaning',
    rating: 5,
    quote: "Great service! My gutters were overflowing, and these guys came in and cleaned them out quickly. They also took care of the mess and left everything spotless. Highly recommend!",
    name: "Anand Kumar",
    location: "Delta, BC",
    beforeAfterImage: "/lovable-uploads/80ecf163-0140-4688-86f4-213a4bfaa5bd.png",
    profileImage: "/lovable-uploads/9ad4b64d-6ec6-446e-9400-79614015b8d2.png"
  },
  {
    id: 10,
    service: 'window-cleaning',
    rating: 5,
    quote: "Wow, what a difference! My windows have never been this clean. They showed up on time, were super polite, and the job was done right. My whole house looks brighter.",
    name: "Amanda White",
    location: "Maple Ridge, BC",
    profileImage: "/lovable-uploads/ccaa263f-f131-406c-a2ec-1800b26a8d03.png"
  },
  {
    id: 11,
    service: 'pressure-washing',
    rating: 5,
    quote: "These guys pressure washed my house, and it looks amazing! The exterior was covered in dirt and mold, and now it's sparkling clean. They were on time, respectful, and got the job done quickly.",
    name: "Catherine Lewis",
    location: "Port Coquitlam, BC",
    profileImage: "/lovable-uploads/503b00c5-22d2-4045-9e7a-722629b6af5a.png"
  },
  {
    id: 12,
    service: 'roof-cleaning',
    rating: 5,
    quote: "I had a lot of moss buildup on my roof, and these professionals came out and cleaned it all off. They were careful with the process and made sure everything was spotless.",
    name: "Sarah Walker",
    location: "New Westminster, BC",
    beforeAfterImage: "/lovable-uploads/788b3744-e48b-4db6-ae93-e540cf78b4e3.png",
    profileImage: "/lovable-uploads/e904d57b-299a-40a6-a866-ad1f7807fa38.png"
  },
  {
    id: 13,
    service: 'gutter-cleaning',
    rating: 5,
    quote: "I'm so relieved to have my gutters cleaned before the rain hits! The team showed up right on time, cleaned everything efficiently, and didn't leave a mess. Very happy with the service!",
    name: "Sanjay Brown",
    location: "Langley, BC",
    beforeAfterImage: "/lovable-uploads/8e7a598a-83f9-4c2b-bfaa-21091b96ffcf.png",
    profileImage: "/lovable-uploads/14321f23-f0ec-4250-867f-d7d1bfa75b78.png"
  },
  {
    id: 14,
    service: 'window-cleaning',
    rating: 5,
    quote: "I've had a few window cleaning services before, but none were as thorough as this one. They really took their time and cleaned every corner. I can see out of my windows perfectly now!",
    name: "Priya Scott",
    location: "Surrey, BC",
    profileImage: "/lovable-uploads/7ee6d411-bb49-49f8-8396-c78ad61cd871.png"
  },
  {
    id: 15,
    service: 'roof-cleaning',
    rating: 5,
    quote: "BC Pressure Washing saved me $4,000 in roof repairs! When they cleaned my roof, they discovered the moss damage wasn't as extensive as I thought. The professional cleaning and treatment they provided has extended my roof's life significantly. I was quoted $4,000 for repairs by another company, but their thorough cleaning solved the problem completely.",
    name: "Elizabeth Turner",
    location: "Abbotsford, BC",
    beforeAfterImage: "/lovable-uploads/deea00c1-1c27-44fd-b409-09d0f3ff0afa.png",
    profileImage: "/lovable-uploads/781d0a19-3b5f-4860-af2b-ffe54366a5f7.png"
  },
  {
    id: 16,
    service: 'roof-cleaning',
    rating: 5,
    quote: "I had no idea my roof was in such bad shape until these guys cleaned it! They did an excellent job removing moss and debris. My roof looks so much better, and I feel much more confident about it now.",
    name: "Jennifer Taylor",
    location: "White Rock, BC",
    beforeAfterImage: "/lovable-uploads/67b32856-04c4-4832-9c20-9a0e56c5c2b8.png",
    profileImage: "/lovable-uploads/3a5d6770-e34e-4a72-b310-07de41af1c93.png"
  },
  {
    id: 17,
    service: 'gutter-cleaning',
    rating: 5,
    quote: "These guys were awesome. I called them when I noticed my gutters were clogged, and they came out right away. They did a great job cleaning everything and even gave me tips on keeping them clear.",
    name: "Margaret Harris",
    location: "Coquitlam, BC",
    beforeAfterImage: "/lovable-uploads/aa926c91-97fb-4f9f-bab5-77cb342a2b38.png",
    profileImage: "/lovable-uploads/750b883e-0b12-487f-b71a-b9332417de1e.png"
  },
  {
    id: 18,
    service: 'window-cleaning',
    rating: 5,
    quote: "My windows look incredible! They were very dirty and streaky before, but now they're spotless. The team was quick, polite, and made sure to take care around my furniture.",
    name: "Patricia Robinson",
    location: "Burnaby, BC",
    profileImage: "/lovable-uploads/a016d664-a269-4c32-acd4-bf111652854f.png"
  },
  {
    id: 19,
    service: 'pressure-washing',
    rating: 5,
    quote: "I had my fence and patio pressure washed, and the difference is night and day. They removed years of dirt and stains in no time. The crew was polite and efficient.",
    name: "Laura Lee",
    location: "North Vancouver, BC",
    profileImage: "/lovable-uploads/5a861af8-fd16-402e-bb94-198b855dfb45.png"
  },
  {
    id: 20,
    service: 'roof-cleaning',
    rating: 5,
    quote: "My roof looks so much better now after they cleaned it! They took their time, worked carefully, and made sure everything was perfect. Super happy with the results.",
    name: "Jessica Martin",
    location: "Richmond, BC",
    beforeAfterImage: "/lovable-uploads/e6fbc792-e8b4-40f8-8a66-042b53317347.png",
    profileImage: "/lovable-uploads/1c54cae9-1687-43f7-aba3-911779e08e47.png"
  },
  {
    id: 21,
    service: 'pressure-washing',
    rating: 5,
    quote: "My vinyl siding was covered in green mold and dirt. After their pressure washing service, it looks like a completely different house! Neighbors have been asking who did the work.",
    name: "Richard Brooks",
    location: "Surrey, BC",
    beforeAfterImage: "/lovable-uploads/43002110-e9f7-4e22-826e-a90e5dc6687e.png"
  },
  {
    id: 22,
    service: 'pressure-washing',
    rating: 5,
    quote: "The green mildew on my house siding was embarrassing. Their team came in and completely transformed it! Amazing how much brighter and cleaner the whole house looks now.",
    name: "Patricia Chen",
    location: "Langley, BC",
    beforeAfterImage: "/lovable-uploads/55261385-ad80-4322-9551-dbc3392a881c.png"
  },
  {
    id: 23,
    service: 'pressure-washing',
    rating: 5,
    quote: "I couldn't believe the difference in my house siding after their pressure washing service. The before and after is incredible! It looks like we painted the house, but it's just clean now.",
    name: "James Peterson",
    location: "Surrey, BC",
    beforeAfterImage: "/lovable-uploads/0ed0aa87-882b-4618-8a15-18d4ed7e4838.png"
  },
  {
    id: 24,
    service: 'pressure-washing',
    rating: 5,
    quote: "My house had years of dirt and mildew buildup on the siding. These guys did an amazing job restoring it to like-new condition. Their attention to detail around windows and fixtures was impressive!",
    name: "Emma Rodriguez",
    location: "Langley, BC",
    beforeAfterImage: "/lovable-uploads/3dd77762-89a1-4273-ae3e-1c6fbc9894aa.png"
  }
];

// Export all testimonials instead of filtering
export const testimonials = allTestimonials;

// Also export a filtered version for components that specifically need testimonials with images
export const testimonialsWithImages = allTestimonials.filter(testimonial => testimonial.beforeAfterImage);

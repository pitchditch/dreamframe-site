
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Why Roof Cleaning is Important for Home Maintenance',
    slug: 'why-roof-cleaning-is-important',
    excerpt: 'Regular roof cleaning is a crucial aspect of home maintenance that many homeowners overlook. Learn why keeping your roof clean is essential for protecting your investment.',
    content: `
      <p class="mb-4">Your roof is one of the most significant investments in your home, providing essential protection from the elements. However, many homeowners overlook the importance of regular roof cleaning as part of their home maintenance routine.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-6">The Hidden Dangers of Neglecting Your Roof</h2>
      
      <p class="mb-4">Over time, Pacific Northwest weather conditions cause organic growth like moss, algae, and lichen to establish themselves on your roof, particularly in shaded areas. This growth not only creates unsightly black streaks and discoloration but can cause serious damage by:</p>
      
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Lifting shingles, creating potential entry points for water</li>
        <li class="mb-2">Retaining moisture against roofing materials, accelerating deterioration</li>
        <li class="mb-2">Blocking proper water drainage, leading to pooling and potential leaks</li>
        <li class="mb-2">Reducing the overall lifespan of your roofing system</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 mt-6">Benefits of Professional Roof Cleaning</h2>
      
      <p class="mb-4">Regular professional roof cleaning offers numerous benefits:</p>
      
      <ol class="list-decimal pl-6 mb-4">
        <li class="mb-2"><strong>Extended Roof Lifespan:</strong> Remove moss, algae, and lichen that can deteriorate shingles and roofing materials, adding years to your roof's life.</li>
        <li class="mb-2"><strong>Prevent Costly Damage:</strong> Regular cleaning prevents organic growth from lifting shingles and creating leaks that can lead to expensive repairs.</li>
        <li class="mb-2"><strong>Improved Energy Efficiency:</strong> A clean roof reflects heat better, potentially reducing cooling costs during hot summer months.</li>
        <li class="mb-2"><strong>Enhanced Curb Appeal:</strong> Remove unsightly black streaks and stains, instantly improving your home's appearance and potential resale value.</li>
        <li class="mb-2"><strong>Protect Your Warranty:</strong> Many roofing manufacturers require regular cleaning to maintain warranty coverage for your roofing materials.</li>
      </ol>
      
      <h2 class="text-2xl font-bold mb-4 mt-6">How Often Should You Clean Your Roof?</h2>
      
      <p class="mb-4">In the White Rock and Lower Mainland areas, we recommend having your roof professionally cleaned every 2-3 years. However, this can vary depending on:</p>
      
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">The amount of tree coverage around your home</li>
        <li class="mb-2">The pitch and orientation of your roof</li>
        <li class="mb-2">The type of roofing material</li>
        <li class="mb-2">Local climate conditions</li>
      </ul>
      
      <p class="mb-4">Our professional team can assess your specific situation and recommend an appropriate cleaning schedule to protect your investment.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-6">DIY vs. Professional Roof Cleaning</h2>
      
      <p class="mb-4">While some homeowners attempt DIY roof cleaning, we strongly recommend hiring professionals for several reasons:</p>
      
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2"><strong>Safety:</strong> Roof work is inherently dangerous, with falls being one of the leading causes of home improvement injuries.</li>
        <li class="mb-2"><strong>Proper Equipment:</strong> Professional roof cleaners have specialized equipment designed to clean effectively without damaging roofing materials.</li>
        <li class="mb-2"><strong>Expertise:</strong> Professionals know which cleaning methods and solutions are appropriate for different roof types and conditions.</li>
        <li class="mb-2"><strong>Prevention:</strong> Experts can identify potential roofing issues during cleaning, potentially saving you from costly repairs down the line.</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 mt-6">Conclusion</h2>
      
      <p class="mb-4">Regular roof cleaning is an essential part of home maintenance that protects your investment, extends your roof's lifespan, and maintains your home's appearance and value. By scheduling regular professional cleanings, you'll save money in the long run by avoiding costly repairs and premature roof replacement.</p>
      
      <p class="mt-6">Ready to protect your roof investment? <a href="/contact" class="text-bc-red hover:underline">Contact us today</a> for a free roof cleaning quote.</p>
    `,
    date: '2024-03-15',
    author: 'BC Pressure Washing Team',
    image: '/lovable-uploads/213a6c8e-3ff9-45fd-8a16-20b91f45d9aa.png',
    tags: ['roof cleaning', 'home maintenance', 'property value', 'White Rock', 'Surrey']
  },
  {
    id: '2',
    title: 'How Often Should You Pressure Wash Your Home?',
    slug: 'how-often-pressure-wash-home',
    excerpt: 'Wondering about the ideal frequency for pressure washing your home? This guide breaks down the recommended schedule for different exterior surfaces.',
    content: `
      <p class="mb-4">Pressure washing is one of the most effective ways to maintain your home's exterior and protect your investment. But how often should you schedule this important maintenance task? The answer varies depending on several factors, including your location, the specific surface, and environmental conditions.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-6">General Guidelines for Pressure Washing Frequency</h2>
      
      <p class="mb-4">Here in White Rock and the Lower Mainland, we generally recommend the following schedule for different exterior surfaces:</p>
      
      <h3 class="text-xl font-bold mb-3 mt-5">House Siding: Every 1-2 Years</h3>
      
      <p class="mb-4">Your home's siding collects dirt, pollen, and organic growth over time. In our mild but damp Pacific Northwest climate, algae and mold can begin to form on siding within a year, especially on north-facing walls that receive less sunlight. Annual or biennial cleaning helps prevent these contaminants from causing permanent staining or damage to your siding.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-5">Driveways and Walkways: Every 1-2 Years</h3>
      
      <p class="mb-4">Concrete surfaces like driveways and walkways are constantly exposed to vehicle traffic, foot traffic, and the elements. Oil stains, tire marks, moss growth, and accumulated dirt not only detract from your home's appearance but can also create slipping hazards. We recommend cleaning these surfaces every 1-2 years, though high-traffic areas may benefit from annual cleaning.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-5">Decks and Patios: Every 2-3 Years</h3>
      
      <p class="mb-4">Wooden decks and stone patios should be pressure washed every 2-3 years, depending on usage and exposure. For wooden decks, gentle pressure washing followed by resealing helps extend the life of the wood and maintains its appearance. Stone patios benefit from regular cleaning to prevent moss growth and staining.</p>
      
      <h3 class="text-xl font-bold mb-3 mt-5">Roofs: Every 2-3 Years</h3>
      
      <p class="mb-4">In the Pacific Northwest, roof cleaning is particularly important due to our wet climate that promotes moss and algae growth. We recommend cleaning your roof every 2-3 years to prevent these organisms from damaging your roofing materials and potentially causing leaks.</p>
      
      <h2 class="text-2xl font-bold mb-4 mt-6">Factors That May Affect Cleaning Frequency</h2>
      
      <p class="mb-4">Several factors might lead you to adjust your pressure washing schedule:</p>
      
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2"><strong>Tree Coverage:</strong> Homes surrounded by trees typically require more frequent cleaning due to increased pollen, sap, and organic debris.</li>
        <li class="mb-2"><strong>Proximity to Water:</strong> Properties near the ocean or large bodies of water often develop salt residue and experience accelerated algae growth.</li>
        <li class="mb-2"><strong>Climate Conditions:</strong> Particularly wet seasons can accelerate mold and mildew growth, potentially necessitating more frequent cleaning.</li>
        <li class="mb-2"><strong>Home Orientation:</strong> North-facing surfaces that receive less sunlight tend to develop mold and algae more quickly than sun-exposed areas.</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 mt-6">Signs It's Time for Pressure Washing</h2>
      
      <p class="mb-4">Regardless of your regular maintenance schedule, watch for these signs that indicate it's time for pressure washing:</p>
      
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2">Visible green or black streaks on siding, indicating algae or mold growth</li>
        <li class="mb-2">Discoloration on concrete surfaces</li>
        <li class="mb-2">Slippery walkways due to moss growth</li>
        <li class="mb-2">Roof shingles lifting or showing signs of organic growth</li>
        <li class="mb-2">Buildup of spider webs and insect nests around eaves and windows</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 mt-6">Professional vs. DIY Pressure Washing</h2>
      
      <p class="mb-4">While some homeowners attempt to pressure wash their properties themselves, professional service offers several advantages:</p>
      
      <ul class="list-disc pl-6 mb-4">
        <li class="mb-2"><strong>Proper Equipment:</strong> Professionals use commercial-grade equipment with appropriate pressure levels for different surfaces, preventing damage.</li>
        <li class="mb-2"><strong>Expertise:</strong> Trained technicians know which cleaning solutions and techniques are best for each surface and type of contaminant.</li>
        <li class="mb-2"><strong>Safety:</strong> Professionals have the proper equipment and training to safely clean elevated areas like second stories and roofs.</li>
        <li class="mb-2"><strong>Time Savings:</strong> A professional team can complete in hours what might take a homeowner an entire weekend.</li>
      </ul>
      
      <h2 class="text-2xl font-bold mb-4 mt-6">Conclusion</h2>
      
      <p class="mb-4">Regular pressure washing is an essential part of home maintenance that protects your investment and maintains your property's appearance and value. By following the recommended cleaning schedule for different exterior surfaces, you'll prevent costly damage and keep your home looking its best year-round.</p>
      
      <p class="mt-6">Ready to establish a regular maintenance schedule for your home? <a href="/contact" class="text-bc-red hover:underline">Contact us today</a> for a free pressure washing quote.</p>
    `,
    date: '2024-03-20',
    author: 'BC Pressure Washing Team',
    image: '/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png',
    tags: ['pressure washing', 'home maintenance', 'property care', 'exterior cleaning', 'White Rock']
  }
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPostId: string, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPostId)
    .slice(0, limit);
};

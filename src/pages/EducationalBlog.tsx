
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, BookOpen, Droplets, Home, Car, Building } from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
}

const EducationalBlog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const articles: BlogArticle[] = [
    {
      id: '1',
      title: 'Complete Guide to Pressure Washing Your Home',
      excerpt: 'Learn the proper techniques, equipment, and safety measures for effective home pressure washing.',
      category: 'Home Cleaning',
      readTime: '8 min read',
      date: '2024-03-20',
      image: '/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png',
      content: `
        <h2>Why Pressure Washing is Essential for Home Maintenance</h2>
        <p>Regular pressure washing is one of the most effective ways to maintain your home's exterior and protect your investment. It removes dirt, grime, mold, and mildew that can cause permanent damage to your siding, deck, and other surfaces.</p>
        
        <h3>Equipment You'll Need</h3>
        <ul>
          <li>Pressure washer (1500-3000 PSI for most home applications)</li>
          <li>Various nozzle tips (0°, 15°, 25°, 40°, and soap nozzle)</li>
          <li>Cleaning detergents appropriate for your surface</li>
          <li>Safety equipment (goggles, non-slip shoes)</li>
        </ul>
        
        <h3>Step-by-Step Process</h3>
        <ol>
          <li><strong>Preparation:</strong> Clear the area, cover plants and electrical outlets</li>
          <li><strong>Choose the right nozzle:</strong> Start with a wider spray pattern (40°) and adjust as needed</li>
          <li><strong>Test in an inconspicuous area:</strong> Always test pressure and technique first</li>
          <li><strong>Work from top to bottom:</strong> Let gravity help with rinsing</li>
          <li><strong>Maintain proper distance:</strong> Keep 12-18 inches from the surface</li>
        </ol>
        
        <h3>Common Mistakes to Avoid</h3>
        <p>Never use high pressure on delicate surfaces like windows, painted wood, or soft materials. Always maintain a consistent distance and overlapping pattern to avoid streaking.</p>
      `
    },
    {
      id: '2',
      title: 'Window Cleaning Like a Professional',
      excerpt: 'Master the techniques professionals use to achieve streak-free, crystal-clear windows.',
      category: 'Window Care',
      readTime: '6 min read',
      date: '2024-03-18',
      image: '/lovable-uploads/213a6c8e-3ff9-45fd-8a16-20b91f45d9aa.png',
      content: `
        <h2>Professional Window Cleaning Techniques</h2>
        <p>Achieving streak-free windows requires the right tools, technique, and timing. Here's how professionals get perfect results every time.</p>
        
        <h3>Essential Tools</h3>
        <ul>
          <li>Squeegee with high-quality rubber blade</li>
          <li>Microfiber or chamois cloth</li>
          <li>Professional window cleaning solution</li>
          <li>Scrubber or sponge applicator</li>
          <li>Extension pole for high windows</li>
        </ul>
        
        <h3>The Professional Method</h3>
        <ol>
          <li><strong>Pre-rinse:</strong> Remove loose dirt and debris</li>
          <li><strong>Apply solution:</strong> Use a scrubber to apply cleaning solution evenly</li>
          <li><strong>Squeegee technique:</strong> Start at the top corner and pull down in a straight line</li>
          <li><strong>Wipe the blade:</strong> Clean squeegee after each stroke</li>
          <li><strong>Detail the edges:</strong> Use a clean cloth for final touches</li>
        </ol>
        
        <h3>Weather Considerations</h3>
        <p>Avoid cleaning windows in direct sunlight or on very hot days. The cleaning solution will dry too quickly, leaving streaks. Overcast days or early morning are ideal.</p>
      `
    },
    {
      id: '3',
      title: 'Roof Cleaning: Safety and Effectiveness',
      excerpt: 'Safe methods for removing moss, algae, and debris from your roof without causing damage.',
      category: 'Roof Maintenance',
      readTime: '10 min read',
      date: '2024-03-15',
      image: '/lovable-uploads/213a6c8e-3ff9-45fd-8a16-20b91f45d9aa.png',
      content: `
        <h2>Why Roof Cleaning is Critical</h2>
        <p>In the Pacific Northwest, moss and algae growth on roofs is a serious concern. These organisms retain moisture and can cause shingles to lift, leading to leaks and expensive repairs.</p>
        
        <h3>Safety First</h3>
        <ul>
          <li>Never walk on a wet or steep roof</li>
          <li>Use proper safety equipment including harnesses</li>
          <li>Consider hiring professionals for steep or high roofs</li>
          <li>Check weather conditions - avoid windy days</li>
        </ul>
        
        <h3>Cleaning Methods</h3>
        <h4>Soft Wash Method (Recommended)</h4>
        <p>Uses low pressure and specialized cleaning solutions to kill moss and algae without damaging shingles.</p>
        
        <h4>Manual Removal</h4>
        <p>For heavy moss buildup, careful manual removal may be necessary, followed by treatment to prevent regrowth.</p>
        
        <h3>Prevention Tips</h3>
        <ul>
          <li>Install zinc or copper strips to prevent moss growth</li>
          <li>Keep gutters clean to ensure proper drainage</li>
          <li>Trim overhanging branches to reduce shade and debris</li>
          <li>Schedule regular inspections and cleaning</li>
        </ul>
      `
    },
    {
      id: '4',
      title: 'Gutter Maintenance and Cleaning Guide',
      excerpt: 'Protect your home from water damage with proper gutter maintenance and cleaning techniques.',
      category: 'Home Maintenance',
      readTime: '7 min read',
      date: '2024-03-12',
      image: '/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png',
      content: `
        <h2>The Importance of Clean Gutters</h2>
        <p>Clogged gutters can cause water to overflow, leading to foundation damage, basement flooding, and exterior damage to your home.</p>
        
        <h3>When to Clean Gutters</h3>
        <ul>
          <li>At least twice a year (spring and fall)</li>
          <li>After major storms</li>
          <li>When you notice overflow during rain</li>
          <li>If you see plants growing in gutters</li>
        </ul>
        
        <h3>Cleaning Process</h3>
        <ol>
          <li><strong>Safety setup:</strong> Use a stable ladder and have someone spot you</li>
          <li><strong>Remove debris:</strong> Start at the downspout and work your way out</li>
          <li><strong>Flush with water:</strong> Use a hose to check for proper flow</li>
          <li><strong>Check downspouts:</strong> Ensure water flows freely</li>
          <li><strong>Inspect for damage:</strong> Look for loose brackets or leaks</li>
        </ol>
        
        <h3>Signs You Need Professional Help</h3>
        <ul>
          <li>Gutters are pulling away from the house</li>
          <li>Multiple leaks or rust spots</li>
          <li>Improper slope preventing drainage</li>
          <li>Hard-to-reach or dangerous areas</li>
        </ul>
      `
    },
    {
      id: '5',
      title: 'Driveway and Patio Cleaning Essentials',
      excerpt: 'Restore your outdoor surfaces with the right cleaning methods for different materials.',
      category: 'Outdoor Cleaning',
      readTime: '9 min read',
      date: '2024-03-10',
      image: '/lovable-uploads/761663e4-04b5-48f6-8d47-235fbec8008d.png',
      content: `
        <h2>Different Surfaces, Different Approaches</h2>
        <p>Concrete, brick, stone, and asphalt all require different cleaning methods and pressure settings for optimal results without damage.</p>
        
        <h3>Concrete Driveways</h3>
        <ul>
          <li>Use 2500-3000 PSI for concrete surfaces</li>
          <li>Apply degreaser for oil stains before pressure washing</li>
          <li>Use a surface cleaner attachment for even results</li>
          <li>Work in sections to prevent streaking</li>
        </ul>
        
        <h3>Brick and Stone Patios</h3>
        <ul>
          <li>Lower pressure (1500-2000 PSI) to avoid mortar damage</li>
          <li>Use appropriate nozzle (25-40 degree)</li>
          <li>Apply fungicide for moss and algae</li>
          <li>Seal after cleaning for protection</li>
        </ul>
        
        <h3>Stain Removal Tips</h3>
        <h4>Oil Stains</h4>
        <p>Apply dish soap or commercial degreaser, let sit for 30 minutes, then pressure wash with hot water if possible.</p>
        
        <h4>Rust Stains</h4>
        <p>Use oxalic acid-based cleaners specifically designed for rust removal on concrete.</p>
        
        <h3>Maintenance Schedule</h3>
        <p>Clean driveways and patios annually, or more frequently in areas with heavy use or organic growth.</p>
      `
    },
    {
      id: '6',
      title: 'Seasonal Cleaning Calendar for Your Home',
      excerpt: 'Stay on top of maintenance with our comprehensive seasonal cleaning schedule.',
      category: 'Home Maintenance',
      readTime: '5 min read',
      date: '2024-03-08',
      image: '/lovable-uploads/213a6c8e-3ff9-45fd-8a16-20b91f45d9aa.png',
      content: `
        <h2>Year-Round Maintenance Schedule</h2>
        <p>Proper timing of cleaning tasks ensures maximum effectiveness and prevents costly repairs.</p>
        
        <h3>Spring (March - May)</h3>
        <ul>
          <li>Pressure wash exterior surfaces</li>
          <li>Clean and inspect gutters</li>
          <li>Window cleaning (inside and out)</li>
          <li>Roof inspection and cleaning</li>
          <li>Deck and patio deep clean</li>
        </ul>
        
        <h3>Summer (June - August)</h3>
        <ul>
          <li>Monthly window maintenance</li>
          <li>Driveway and walkway cleaning</li>
          <li>Outdoor furniture cleaning</li>
          <li>Gutter guards inspection</li>
        </ul>
        
        <h3>Fall (September - November)</h3>
        <ul>
          <li>Final gutter cleaning before winter</li>
          <li>Leaf removal from all surfaces</li>
          <li>Preparation for winter weather</li>
          <li>Equipment winterization</li>
        </ul>
        
        <h3>Winter (December - February)</h3>
        <ul>
          <li>Interior window cleaning</li>
          <li>Equipment maintenance and storage</li>
          <li>Planning for spring cleaning</li>
          <li>Emergency cleaning after storms</li>
        </ul>
      `
    }
  ];

  const categories = ['All', 'Home Cleaning', 'Window Care', 'Roof Maintenance', 'Home Maintenance', 'Outdoor Cleaning'];

  const filteredArticles = selectedCategory && selectedCategory !== 'All'
    ? articles.filter(article => article.category === selectedCategory)
    : articles;

  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  return (
    <Layout
      title="Educational Blog | BC Pressure Washing - Cleaning Tips & Guides"
      description="Learn professional cleaning techniques, maintenance tips, and best practices for pressure washing, window cleaning, and home care from the experts at BC Pressure Washing."
    >
      <Helmet>
        <meta name="keywords" content="cleaning tips, pressure washing guide, window cleaning techniques, roof maintenance, home cleaning, DIY cleaning" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-bc-red text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen size={64} className="mx-auto mb-6 text-white" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Educational Resource Center
            </h1>
            <p className="text-xl mb-8">
              Master the art of exterior cleaning with our comprehensive guides and expert tips
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  (selectedCategory === category) || (selectedCategory === null && category === 'All')
                    ? 'bg-bc-red text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={16} className="mr-1" />
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <Clock size={16} className="mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                  <span className="inline-block bg-bc-red text-white text-xs px-2 py-1 rounded mb-3">
                    {article.category}
                  </span>
                  <h2 className="text-xl font-bold mb-3 text-gray-800">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <button
                    onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
                    className="text-bc-red hover:underline font-medium"
                  >
                    {expandedArticle === article.id ? 'Show Less' : 'Read Full Article'}
                  </button>
                  
                  {expandedArticle === article.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div 
                        className="prose prose-gray max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Professional Help?</h2>
          <p className="text-xl mb-8 text-gray-300">
            While these guides help with DIY maintenance, some jobs require professional expertise and equipment.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-bc-red hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all"
          >
            Get Professional Service
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default EducationalBlog;

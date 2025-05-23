
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Calendar, Tag, Clock, ArrowRight, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const educationalPosts = [
  {
    id: 1,
    title: "The Complete Guide to Seasonal Property Maintenance",
    excerpt: "Learn when and how to maintain your property throughout the year for optimal results and cost savings.",
    image: "/lovable-uploads/1a670391-99fd-4a8c-9df5-df800ab8755f.png",
    category: "Maintenance",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    content: "Seasonal maintenance guide content..."
  },
  {
    id: 2,
    title: "Understanding Different Window Cleaning Methods",
    excerpt: "Discover the pros and cons of traditional squeegee vs. water-fed pole systems for crystal clear windows.",
    image: "/lovable-uploads/8a7d4e73-fa89-44ab-8814-ecaed5b1d23c.png",
    category: "Window Cleaning",
    readTime: "6 min read",
    date: "Dec 10, 2024",
    content: "Window cleaning methods content..."
  },
  {
    id: 3,
    title: "Pressure Washing Safety: What Every Homeowner Should Know",
    excerpt: "Essential safety tips and best practices for pressure washing around your home and property.",
    image: "/lovable-uploads/53939952-27dd-42b6-92d3-7ab137a3b788.png",
    category: "Pressure Washing",
    readTime: "5 min read",
    date: "Dec 5, 2024",
    content: "Pressure washing safety content..."
  },
  {
    id: 4,
    title: "Gutter Maintenance: Preventing Costly Water Damage",
    excerpt: "Learn how proper gutter cleaning and maintenance can save you thousands in water damage repairs.",
    image: "/lovable-uploads/656f9aff-1471-4489-a9e7-be6ef850c592.png",
    category: "Gutter Cleaning",
    readTime: "7 min read",
    date: "Nov 30, 2024",
    content: "Gutter maintenance content..."
  },
  {
    id: 5,
    title: "Roof Cleaning: When and Why It's Necessary",
    excerpt: "Understanding the importance of roof cleaning for home maintenance and curb appeal.",
    image: "/lovable-uploads/fd4676df-c7bc-4aa1-b7e7-b3e918a5940e.png",
    category: "Roof Cleaning",
    readTime: "6 min read",
    date: "Nov 25, 2024",
    content: "Roof cleaning content..."
  },
  {
    id: 6,
    title: "Eco-Friendly Cleaning Solutions for Your Home",
    excerpt: "Discover environmentally safe cleaning methods that protect your family and landscaping.",
    image: "/lovable-uploads/900edb87-48fb-4dd7-af20-11d55e376439.png",
    category: "Eco-Friendly",
    readTime: "4 min read",
    date: "Nov 20, 2024",
    content: "Eco-friendly cleaning content..."
  }
];

const EducationalBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Maintenance', 'Window Cleaning', 'Pressure Washing', 'Gutter Cleaning', 'Roof Cleaning', 'Eco-Friendly'];

  const filteredPosts = educationalPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout
      title="Educational Blog | BC Pressure Washing"
      description="Learn expert tips and techniques for maintaining your property with our comprehensive guides on pressure washing, window cleaning, and seasonal maintenance."
    >
      <div className="bg-gradient-to-b from-gray-900 to-bc-red/90 py-24 relative">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/5cf3e54d-fec2-4532-9db7-d8f4d5436808.png')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Educational Resources</h1>
            <p className="text-xl text-white/90 mb-8">Expert guides and tips for maintaining your property</p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-bc-red hover:bg-red-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar size={16} className="mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock size={16} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-bc-red transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      <Tag size={12} className="mr-1" />
                      {post.category}
                    </span>
                    <Button variant="link" className="text-bc-red p-0 h-auto">
                      Read More <ArrowRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 bg-bc-red hover:bg-red-700"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Need Professional Help?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              While these guides are helpful, nothing beats professional service. Contact us for expert pressure washing, 
              window cleaning, and property maintenance services.
            </p>
            <Button size="lg" className="bg-bc-red hover:bg-red-700" asChild>
              <Link to="/contact">Get Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EducationalBlog;


import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const blogPosts = [
  {
    id: 1,
    title: "Essential Pressure Washing Tips for White Rock Patios",
    excerpt: "Learn how to maintain your patio's beauty with proper pressure washing techniques specific to White Rock's coastal climate.",
    date: "2024-01-15",
    image: "/lovable-uploads/11d2ce8e-f100-4e46-bae2-65a680e35f6a.png",
    category: "Maintenance Tips"
  },
  {
    id: 2,
    title: "Why Surrey Driveways Need Regular Professional Cleaning",
    excerpt: "Discover the unique challenges Surrey driveways face and how professional pressure washing extends their lifespan.",
    date: "2024-01-10",
    image: "/lovable-uploads/b1293556-33dc-4f41-9c80-d51929a93087.png",
    category: "Local Insights"
  },
  {
    id: 3,
    title: "Seasonal House Washing Guide for Metro Vancouver",
    excerpt: "Your complete guide to maintaining your home's exterior throughout Metro Vancouver's changing seasons.",
    date: "2024-01-05",
    image: "/lovable-uploads/238e19b2-0414-4987-b525-b41c73d7b641.png",
    category: "Seasonal Care"
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert Cleaning Tips & Local Insights</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get professional advice on maintaining your property in White Rock, Surrey, and Metro Vancouver
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-bc-red text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar size={16} className="mr-2" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <CardTitle className="text-xl group-hover:text-bc-red transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-bc-red font-semibold hover:text-red-700 transition-colors"
                >
                  Read More <ArrowRight size={16} className="ml-2" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

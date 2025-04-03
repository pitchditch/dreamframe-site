
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { blogPosts } from '../data/blogPosts';
import { Helmet } from 'react-helmet';
import { Calendar, Tag, Clock, ArrowRight } from 'lucide-react';
import { trackFormSubmission } from '@/utils/analytics';

const Blog = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get all unique tags from blog posts
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  ).sort();

  // Filter posts by selected tag
  const filteredPosts = selectedTag
    ? blogPosts.filter(post => post.tags.includes(selectedTag))
    : blogPosts;

  // Track blog page view
  useState(() => {
    trackFormSubmission('blog_page_view');
  });

  return (
    <Layout>
      <Helmet>
        <title>Blog | BC Pressure Washing & Window Cleaning White Rock</title>
        <meta 
          name="description" 
          content="Expert tips and advice on pressure washing, window cleaning, roof cleaning, and property maintenance in White Rock and Lower Mainland." 
        />
        <meta 
          name="keywords" 
          content="pressure washing blog, window cleaning tips, roof maintenance, exterior cleaning advice, White Rock property care"
        />
      </Helmet>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Expert tips, advice, and insights about pressure washing, window cleaning, 
            and maintaining your property's exterior in White Rock and the Lower Mainland.
          </p>
        </div>

        {/* Tag filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button 
            className={`px-4 py-2 rounded-full ${
              selectedTag === null ? 'bg-bc-red text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition duration-300`}
            onClick={() => setSelectedTag(null)}
          >
            All Topics
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              className={`px-4 py-2 rounded-full ${
                selectedTag === tag ? 'bg-bc-red text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } transition duration-300`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          ))}
        </div>

        {/* Blog post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100">
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={16} className="mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <Clock size={16} className="mr-1" />
                    <span>5 min read</span>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="block">
                    <h2 className="text-xl font-bold mb-3 hover:text-bc-red transition-colors duration-300">{post.title}</h2>
                  </Link>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTag(tag);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="inline-flex items-center text-bc-red hover:underline font-medium"
                  >
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts found for the selected tag.</p>
              <button 
                className="mt-4 px-6 py-2 bg-bc-red text-white rounded-full hover:bg-red-700 transition"
                onClick={() => setSelectedTag(null)}
              >
                View All Posts
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

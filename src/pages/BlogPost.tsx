
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from '../data/blogPosts';
import { Helmet } from 'react-helmet';
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { trackFormSubmission } from '@/utils/analytics';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = getBlogPostBySlug(slug || '');
  const relatedPosts = post ? getRelatedPosts(post.id, 3) : [];
  
  useEffect(() => {
    // If post not found, redirect to blog listing
    if (!post && slug) {
      navigate('/blog');
    }
    
    // Track blog post view
    if (post) {
      trackFormSubmission('blog_post_view', { post_title: post.title });
    }
    
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [post, slug, navigate]);
  
  if (!post) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <Helmet>
        <title>{post.title} | BC Pressure Washing Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
      </Helmet>
      
      <div className="relative w-full h-[300px] md:h-[400px] bg-gray-900">
        <img 
          src={post.image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center max-w-3xl">
            <Link to="/blog" className="inline-flex items-center text-white mb-4 hover:underline">
              <ArrowLeft size={16} className="mr-2" /> Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap justify-center items-center text-white gap-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <article className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <Link 
                key={tag}
                to={`/blog?tag=${tag}`}
                className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
              >
                <Tag size={14} className="mr-1" />
                {tag}
              </Link>
            ))}
          </div>
          
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold mb-6">Share This Article</h3>
            <div className="flex space-x-4">
              <button 
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Share on Facebook
              </button>
              <button 
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`, '_blank')}
                className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
              >
                Share on Twitter
              </button>
              <button 
                onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${post.title}`, '_blank')}
                className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
              >
                Share on LinkedIn
              </button>
            </div>
          </div>
        </div>
      </article>
      
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(related => (
                <article key={related.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
                  <Link to={`/blog/${related.slug}`} className="block">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={related.image} 
                        alt={related.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 hover:text-bc-red transition">{related.title}</h3>
                      <p className="text-gray-600 line-clamp-2">{related.excerpt}</p>
                      <div className="mt-4 flex items-center text-bc-red font-medium">
                        Read Article <ArrowRight size={16} className="ml-1" />
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default BlogPost;

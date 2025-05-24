
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet-async';
import { QrCode, Star, ThumbsUp, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Review = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks for subscribing! We'll contact you next season.");
      setEmail('');
    }, 1000);
  };

  return (
    <Layout
      title="Leave a Review | BC Pressure Washing"
      description="Share your experience with BC Pressure Washing. Your feedback helps us improve our services and helps others find quality pressure washing services in Surrey & White Rock."
    >
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="bg-gradient-to-b from-gray-900 to-bc-red/90 py-24 relative">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/53939952-27dd-42b6-92d3-7ab137a3b788.png')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
              <Star className="text-yellow-500" size={36} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Love Our Service?</h1>
            <p className="text-xl text-white/90 mb-8">Your review helps others find quality services and helps us grow!</p>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Google Review Section */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-full h-full">
                      <path fill="#4285f4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                      <path fill="#34a853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                      <path fill="#fbbc05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                      <path fill="#ea4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-3">Google Review</h2>
                  <p className="mb-4 text-gray-600 text-sm">
                    Share your experience on Google to help others find our services.
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="text-yellow-400" fill="#FBBF24" size={20} />
                      ))}
                    </div>
                  </div>
                  <a 
                    href="https://g.page/r/CYzbfURLs5MCEAI/review" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-all inline-flex items-center text-sm"
                  >
                    <ThumbsUp className="mr-2" size={16} />
                    Review on Google
                  </a>
                </div>
              </div>

              {/* Yelp Review Section */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <path fill="#d32323" d="M12.271,8.717c0,0-4.414-2.047-5.028-2.352c-0.614-0.305-1.115-0.395-1.437,0.047 c-0.322,0.442-0.295,0.954,0.095,1.448c0.39,0.494,2.458,2.764,2.458,2.764L12.271,8.717z M11.987,2.138 c0.601-0.056,1.081,0.234,1.186,0.695c0.105,0.461-0.237,1.002-0.874,1.471c-0.637,0.469-3.588,2.619-3.588,2.619 s2.066-4.442,2.235-4.785C10.951,2.128,11.387,2.194,11.987,2.138z M15.649,11.252c0,0-3.171-3.305-3.563-3.71 c-0.392-0.405-0.469-0.91-0.074-1.292c0.395-0.382,0.906-0.325,1.384,0.135c0.478,0.46,2.253,2.433,2.253,2.433V11.252z M17.158,13.211c0,0-4.452-0.564-5.074-0.642c-0.622-0.078-1.095,0.105-1.25,0.548c-0.155,0.443,0.059,0.951,0.592,1.324 c0.533,0.373,3.182,2.242,3.182,2.242L17.158,13.211z M13.821,19.467c-0.568,0.169-1.069-0.068-1.236-0.567 c-0.167-0.499,0.096-1.078,0.678-1.548c0.582-0.47,3.476-2.769,3.476-2.769s-2.318,4.715-2.518,5.054 C14.221,19.637,14.388,19.298,13.821,19.467z"/>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-3">Yelp Review</h2>
                  <p className="mb-4 text-gray-600 text-sm">
                    Help others discover our services on Yelp with your honest review.
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="text-yellow-400" fill="#FBBF24" size={20} />
                      ))}
                    </div>
                  </div>
                  <a 
                    href="https://www.yelp.com/writeareview/biz/bc-pressure-washing-white-rock" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-all inline-flex items-center text-sm"
                  >
                    <ThumbsUp className="mr-2" size={16} />
                    Review on Yelp
                  </a>
                </div>
              </div>

              {/* BBB Review Section */}
              <div className="bg-gray-100 p-6 rounded-xl shadow-md">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center bg-blue-800 rounded-full">
                    <span className="text-white font-bold text-xs">BBB</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3">BBB Review</h2>
                  <p className="mb-4 text-gray-600 text-sm">
                    Rate our business with the Better Business Bureau.
                  </p>
                  <div className="flex justify-center mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="text-yellow-400" fill="#FBBF24" size={20} />
                      ))}
                    </div>
                  </div>
                  <a 
                    href="https://www.bbb.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg font-bold transition-all inline-flex items-center text-sm"
                  >
                    <ThumbsUp className="mr-2" size={16} />
                    Review on BBB
                  </a>
                </div>
              </div>
            </div>

            {/* Join Mailing List Section */}
            <div className="bg-gray-900 p-8 rounded-xl shadow-md text-white">
              <div className="flex flex-col items-center text-center">
                <Mail className="text-white mb-6" size={80} />
                <h2 className="text-2xl font-bold mb-4">Stay In Touch</h2>
                <p className="mb-6 text-gray-300">
                  Subscribe to our mailing list and we'll reach out next season to help keep your property looking its best.
                </p>
                
                <form onSubmit={handleEmailSubmit} className="w-full max-w-sm">
                  <div className="flex flex-col gap-4">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                    <Button 
                      type="submit" 
                      className="bg-white hover:bg-gray-200 text-gray-900"
                      disabled={submitting}
                    >
                      {submitting ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                </form>
                
                <p className="mt-6 text-sm text-gray-400">
                  We respect your privacy and will never share your information with third parties.
                </p>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-6 text-center">What Others Are Saying</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Sarah Johnson",
                    comment: "Jayden did an amazing job on our house! The siding looks brand new and our windows sparkle. Highly recommend!",
                    location: "White Rock"
                  },
                  {
                    name: "Mike Thompson",
                    comment: "Professional, thorough, and reasonably priced. BC Pressure Washing is now our go-to for all exterior cleaning.",
                    location: "Surrey"
                  },
                  {
                    name: "Lisa Chen",
                    comment: "Our gutters were a mess but now they're spotless. The team was careful with our landscaping and cleaned up perfectly afterwards.",
                    location: "Langley"
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="text-yellow-400" fill="#FBBF24" size={16} />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{testimonial.name}</span>
                      <span className="text-sm text-gray-500">{testimonial.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Review;

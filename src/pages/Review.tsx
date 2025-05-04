
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
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Google Review Section */}
              <div className="bg-gray-100 p-8 rounded-xl shadow-md">
                <div className="flex flex-col items-center text-center">
                  <QrCode className="text-bc-red mb-6" size={120} />
                  <h2 className="text-2xl font-bold mb-4">Leave a Google Review</h2>
                  <p className="mb-6 text-gray-600">
                    Scan this QR code with your phone's camera to go directly to our Google Business page and share your experience.
                  </p>
                  <div className="flex justify-center mb-6">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="text-yellow-400" fill="#FBBF24" size={24} />
                      ))}
                    </div>
                  </div>
                  <a 
                    href="https://g.page/r/CYzbfURLs5MCEAI/review" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-bc-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all inline-flex items-center"
                  >
                    <ThumbsUp className="mr-2" size={18} />
                    Write a Review
                  </a>
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

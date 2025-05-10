
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../components/Layout';

const PostConstructionWindowCleaning = () => {
  return (
    <Layout>
      <Helmet>
        <title>Post Construction Window Cleaning - BC Pressure Washing</title>
        <meta name="description" content="Professional post construction window cleaning services to ensure your windows are spotless and free of construction debris, fingerprints, and dust." />
        <meta name="keywords" content="post construction window cleaning, window cleaning services, construction cleanup, new home window cleaning, residential window cleaning, Vancouver window cleaning" />
      </Helmet>

      <header className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Post Construction Window Cleaning Services</h1>
          <p className="text-xl">Your windows deserve the best care after construction. Get rid of dust, debris, and smudges with our expert cleaning services.</p>
        </div>
      </header>

      <section id="intro" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Why Choose Our Post Construction Window Cleaning?</h2>
          <p className="text-lg text-gray-700 mb-6">
            After the dust settles and the construction is complete, the last thing you need is to worry about cleaning your windows. 
            Our specialized post construction window cleaning service ensures that your windows are spotless and free from construction debris, smudges, or dust.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Remove construction dust, dirt, and debris</li>
            <li>Professional streak-free finish</li>
            <li>Safe and efficient cleaning methods</li>
            <li>Serving Metro Vancouver, Surrey, and White Rock</li>
          </ul>
        </div>
      </section>

      <section id="how-it-works" className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">How Our Service Works</h2>
          <ol className="list-decimal pl-6 space-y-4 text-gray-700">
            <li>Schedule your appointment by contacting us through our website or phone.</li>
            <li>Our team arrives on-site and inspects the windows to determine the best cleaning methods.</li>
            <li>We use eco-friendly products and advanced tools to clean your windows thoroughly.</li>
            <li>After cleaning, we double-check for streaks, dust, and debris to ensure a perfect finish.</li>
            <li>Enjoy your sparkling windows and the satisfaction of a job well done!</li>
          </ol>
        </div>
      </section>

      <section id="testimonial" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"BC Pressure Washing did an amazing job cleaning our windows after our new home construction. The windows were spotless, and the crew was professional!"</p>
              <cite className="font-bold">— Sarah L., Surrey</cite>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="italic mb-4">"Fantastic service! They made sure every window was cleaned perfectly. Highly recommend them!"</p>
              <cite className="font-bold">— Michael P., White Rock</cite>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="py-12 bg-bc-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Your Windows Clean?</h2>
          <p className="text-xl mb-8">Contact us today to schedule your post-construction window cleaning service. We're here to make your home shine!</p>
          <a href="/contact" className="bg-white text-bc-red px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors">Get a Free Quote</a>
        </div>
      </section>
    </Layout>
  );
};

export default PostConstructionWindowCleaning;

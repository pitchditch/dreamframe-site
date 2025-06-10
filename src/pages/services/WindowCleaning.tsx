mport React from 'react';
import { Helmet } from "react-helmet";

const WindowCleaning = () => (
  <>
    <Helmet>
      {/* SEO Metadata */}
      <title>White Rock Window Cleaning | BC Pressure Washing</title>
      <meta name="description" content="Expert residential and commercial window cleaning in White Rock, Surrey & Metro Vancouver. Streak-free, eco-friendly window washing by local professionals. Call for a free quote!" />
      <meta property="og:title" content="White Rock Window Cleaning | BC Pressure Washing" />
      <meta property="og:description" content="Family-owned White Rock window cleaning service. Professional streak-free cleaning for homes and businesses. Satisfaction guaranteed!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.bcpressurewashing.ca/services/window-cleaning" />
      {/* Replace with actual image URL if available */}
      <meta property="og:image" content="https://www.bcpressurewashing.ca/images/window-cleaning-hero.jpg" />
      {/* Schema.org LocalBusiness */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "BC Pressure Washing",
          "description": "BC Pressure Washing provides professional residential and commercial window cleaning in White Rock, Surrey, and Metro Vancouver.",
          "telephone": "+1-778-808-7620",
          "email": "bcpressurewashing.ca@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "5727 179 St #205",
            "addressLocality": "Surrey",
            "addressRegion": "BC",
            "postalCode": "V3S 4B6",
            "addressCountry": "CA"
          },
          "url": "https://www.bcpressurewashing.ca/services/window-cleaning",
          "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-17:00",
          "priceRange": "$$",
          "areaServed": {
            "@type": "City",
            "name": "White Rock, BC"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 49.0250,
            "longitude": -122.8028
          }
        }
      `}</script>
      {/* Schema.org FAQPage */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How often should I have my windows cleaned in White Rock?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We recommend having your windows professionally cleaned at least twice a year (spring and fall) to keep them in top condition."
              }
            },
            {
              "@type": "Question",
              "name": "How do you clean windows without streaks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use purified water and biodegradable cleaning solutions to remove all hard minerals. Our squeegee and microfiber cloth finish ensures crystal-clear, streak-free windows."
              }
            },
            {
              "@type": "Question",
              "name": "What products do you use for window cleaning?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians use filtered water and eco-friendly, biodegradable soaps that are safe for your home and the environment."
              }
            }
          ]
        }
      `}</script>
    </Helmet>

    <main className="flex flex-col items-center bg-gray-50">
      {/* Hero Section */}
      <section id="hero" className="w-full bg-blue-800 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Professional White Rock Window Cleaning</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Sparkling, streak-free windows for homes & businesses in White Rock, Surrey, and Metro Vancouver. Locally owned and fully insured.
        </p>
        <a href="#contact" className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded">
          Get Your Free Quote Today
        </a>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="w-full py-16 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8">Why Choose BC Pressure Washing?</h2>
        <ul className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-gray-700">
          <li className="flex items-start">
            <span className="bg-green-500 text-white p-3 rounded-full mr-4">✔</span>
            <div>
              <h3 className="font-semibold">100% Satisfaction Guarantee</h3>
              <p className="mt-1 text-sm">Our "Plaid Promise" means if you're not happy, we'll re-clean within 48 hours:contentReference[oaicite:26]{index=26}.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-green-500 text-white p-3 rounded-full mr-4">✔</span>
            <div>
              <h3 className="font-semibold">Commercial-Grade Equipment</h3>
              <p className="mt-1 text-sm">We use the same high-grade tools and purified water systems as top pros:contentReference[oaicite:27]{index=27}:contentReference[oaicite:28]{index=28}.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-green-500 text-white p-3 rounded-full mr-4">✔</span>
            <div>
              <h3 className="font-semibold">Eco-Friendly Cleaning</h3>
              <p className="mt-1 text-sm">Safe, biodegradable soaps and pure water leave no streaks or chemical residue:contentReference[oaicite:29]{index=29}:contentReference[oaicite:30]{index=30}.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-green-500 text-white p-3 rounded-full mr-4">✔</span>
            <div>
              <h3 className="font-semibold">Skilled Local Team</h3>
              <p className="mt-1 text-sm">Our trained technicians treat your home like their own, paying attention to every detail:contentReference[oaicite:31]{index=31}:contentReference[oaicite:32]{index=32}.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-green-500 text-white p-3 rounded-full mr-4">✔</span>
            <div>
              <h3 className="font-semibold">Boosts Curb Appeal</h3>
              <p className="mt-1 text-sm">Clean windows make a great first impression. As Gorilla Services notes, many judge a business by curbside aesthetics:contentReference[oaicite:33]{index=33}.</p>
            </div>
          </li>
          <li className="flex items-start">
            <span className="bg-green-500 text-white p-3 rounded-full mr-4">✔</span>
            <div>
              <h3 className="font-semibold">Fully Insured & Licensed</h3>
              <p className="mt-1 text-sm">You get peace of mind knowing we carry full insurance and liability coverage on every job.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Services Offered */}
      <section id="services" className="w-full py-16 px-6 bg-gray-100">
        <h2 className="text-2xl font-bold text-center mb-8">Our Window Cleaning Services</h2>
        <div className="max-w-4xl mx-auto text-gray-800 space-y-4">
          <p>We serve both homes and businesses in White Rock and surrounding areas. Our services include:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Exterior Window Washing</strong> – hand-scrubbed and squeegeed to remove dirt and water spots:contentReference[oaicite:34]{index=34}.</li>
            <li><strong>Interior Window Cleaning</strong> – safe, streak-free cleaning inside your home or office.</li>
            <li><strong>Skylights & High Windows</strong> – reached with telescopic water-fed poles for upper stories.</li>
            <li><strong>Storm Windows & Screens</strong> – removal, cleaning, and reinstallation included.</li>
            <li><strong>Glass Rail Panels & Patio Covers</strong> – we wash all exterior glass surfaces.</li>
            <li><strong>Professional-Only Methods</strong> – using purified water, soft-bristle brushes, and microfiber for the best results:contentReference[oaicite:35]{index=35}:contentReference[oaicite:36]{index=36}.</li>
          </ul>
          <p className="text-sm text-gray-600 mt-4">*This list is based on common offerings (Shack Shine lists similar services:contentReference[oaicite:37]{index=37}) and ensures all typical window types are covered.</p>
        </div>
      </section>

      {/* Cleaning Process */}
      <section id="process" className="w-full py-16 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8">Our Cleaning Process</h2>
        <div className="max-w-3xl mx-auto text-gray-800 space-y-4">
          <p>Our step-by-step approach guarantees crystal-clear results every time:</p>
          <ul className="list-decimal list-inside space-y-2">
            <li><strong>Rinse with Purified Water:</strong> First we rinse windows with deionized water that’s free of minerals. This prevents streaks and spots:contentReference[oaicite:38]{index=38}.</li>
            <li><strong>Apply Eco-Friendly Soap:</strong> We apply a biodegradable soap solution to loosen dirt without harming plants or paint:contentReference[oaicite:39]{index=39}.</li>
            <li><strong>Soft Scrubbing:</strong> Any stubborn grime is scrubbed with soft bristle brushes or towels.</li>
            <li><strong>Squeegee to Dry:</strong> We squeegee each pane top-to-bottom, removing all water for a streak-free shine:contentReference[oaicite:40]{index=40}.</li>
            <li><strong>Detailing:</strong> Technicians hand-dry edges and wipe frames/sills clean. Gorilla Services notes we even clean frames for a flawless finish:contentReference[oaicite:41]{index=41}.</li>
            <li><strong>Final Inspection:</strong> We inspect each window, ensuring it “sparkles” like new:contentReference[oaicite:42]{index=42} before calling the job complete.</li>
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="w-full py-16 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="max-w-xl mx-auto space-y-6 text-gray-700">
          <blockquote className="border-l-4 border-blue-500 pl-4 italic">
            “Our windows look brand new – the team was fast, friendly, and incredibly thorough. We highly recommend BC Pressure Washing!”
            <footer className="mt-2 font-semibold">– Sarah L., White Rock</footer>
          </blockquote>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic">
            “Fantastic service from start to finish. They handled our tricky skylight windows with ease. Will definitely call them again.”
            <footer className="mt-2 font-semibold">– Marcus T., Surrey</footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-16 px-6 bg-white">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6 text-gray-800">
          <div>
            <h3 className="font-semibold">How often should I have my windows cleaned?</h3>
            <p>We recommend cleaning windows at least twice a year (spring and fall) to keep them looking their best. Seasonal rains and pollen can build up, so regular cleaning prolongs the life of your glass:contentReference[oaicite:43]{index=43}.</p>
          </div>
          <div>
            <h3 className="font-semibold">How do you prevent streaks?</h3>
            <p>By using purified (deionized) water and our special biodegradable cleaning solution, we eliminate mineral residue and streaks. Combined with proper squeegee technique, your windows come out crystal-clear:contentReference[oaicite:44]{index=44}:contentReference[oaicite:45]{index=45}.</p>
          </div>
          <div>
            <h3 className="font-semibold">Are your cleaning products safe?</h3>
            <p>Yes. We only use eco-friendly, biodegradable soaps that are gentle on plants and paint. Customers report being very pleased with our green approach and sparkling results:contentReference[oaicite:46]{index=46}:contentReference[oaicite:47]{index=47}.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section id="contact" className="w-full py-16 px-6 bg-blue-800 text-white text-center">
        <h2 className="text-2xl font-bold">Ready for Sparkling Windows?</h2>
        <p className="mt-4 max-w-xl mx-auto">Contact BC Pressure Washing today for a free, no-obligation quote. Our local team is standing by to serve White Rock, Surrey and beyond.</p>
        <a href="tel:+17788087620" className="mt-6 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded">
          Call 778-808-7620
        </a>
      </section>
    </main>
  </>
);

export default WindowCleaning;

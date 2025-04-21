
import { Helmet } from "react-helmet-async";
import Layout from '../components/Layout';
import FeatureRow from '../components/home/FeatureRow';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ServiceAreaMap from '../components/ServiceAreaMap';
import FloatingChatBot from '../components/FloatingChatBot';
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Only show chat bot floating button for desktop
  useEffect(() => {
    // No-op: The floating chat is static in this layout,
    // could implement open/close logic here.
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>BC Pressure Washing - #1 Window & Pressure Washing Services in Surrey & White Rock</title>
        <meta name="description" content="Professional pressure washing, window cleaning, roof & gutter cleaning services in Surrey, White Rock & Metro Vancouver. Top-rated local cleaning experts." />
        <meta property="og:image" content="/open.png" />
      </Helmet>

      <section className="min-h-[30vh] flex items-center justify-center py-8 bg-white">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold shadow"
          onClick={() => navigate("/calculator")}
        >
          Check Prices &amp; Availability
        </button>
      </section>

      {/* Commitment headline */}
      <section className="bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Locally Owned & Personally Committed
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Every job is personally handled or overseen by Jayden, the founder — no shortcuts, no subpar results.
          </p>
          <FeatureRow />
        </div>
      </section>

      <TestimonialsSection />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Pressure Washing", link: "/services/pressure-washing" },
              { title: "Window Cleaning", link: "/services/window-cleaning" },
              { title: "Gutter Cleaning", link: "/services/gutter-cleaning" },
              { title: "Roof Cleaning", link: "/services/roof-cleaning" },
            ].map((svc) => (
              <a
                key={svc.title}
                href={svc.link}
                className="text-charcoal border border-gray-200 rounded-lg p-6 flex flex-col items-center hover:bg-gray-50 shadow-sm hover:shadow transition"
              >
                <span className="font-semibold text-lg mb-2">{svc.title}</span>
                <span className="text-blue-600 font-medium">Learn More &#8594;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <ServiceAreaMap />

      {/* Floating Chatbot (desktop) */}
      {!isMobile && <FloatingChatBot onClick={() => { window.location.href = "/contact" }} />}
    </Layout>
  );
};

export default Index;


import Layout from '../components/Layout';

const Index = () => {
  return (
    <Layout
      title="BC Pressure Washing - #1 White Rock, Surrey & Metro Vancouver Exterior Cleaning"
      description="Professional pressure washing, window cleaning & house washing in White Rock, Surrey, Langley & Metro Vancouver. ⭐ 5-Star Local Service | Free Quotes | Same-Day Availability"
    >
      <section className="hero-section relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-900 to-gray-900">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-start relative z-10 text-white">
          <div className="max-w-4xl text-left">
            <div className="inline-block bg-bc-red text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              #1 Rated in White Rock & Surrey
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg">
              Professional Pressure Washing
              <span className="block text-bc-red">& Window Cleaning</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-shadow-sm max-w-2xl">
              Transform your property with our premium exterior cleaning services. Trusted by thousands across Metro Vancouver.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/quote"
                className="btn-primary inline-flex items-center justify-center"
              >
                Get Free Quote
              </a>
              <a
                href="tel:7788087620"
                className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 inline-flex items-center justify-center"
              >
                Call (778) 808-7620
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Professional Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive exterior cleaning solutions for residential and commercial properties
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="service-card text-center">
              <h3 className="text-xl font-bold mb-4">Window Cleaning</h3>
              <p className="text-gray-600">Crystal clear, streak-free windows using purified water systems</p>
            </div>
            <div className="service-card text-center">
              <h3 className="text-xl font-bold mb-4">Pressure Washing</h3>
              <p className="text-gray-600">Deep cleaning for driveways, patios, and exterior surfaces</p>
            </div>
            <div className="service-card text-center">
              <h3 className="text-xl font-bold mb-4">Gutter Cleaning</h3>
              <p className="text-gray-600">Complete gutter maintenance and debris removal</p>
            </div>
            <div className="service-card text-center">
              <h3 className="text-xl font-bold mb-4">Roof Cleaning</h3>
              <p className="text-gray-600">Safe moss removal and roof maintenance services</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { trackFormSubmission } from '@/utils/analytics';
import FloatingChatBot from '../components/FloatingChatBot';

const CONTACT_BG = "/lovable-uploads/cb9644f5-1226-40ea-90d3-e0f97cb08e45.png";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Window Cleaning',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track the contact form submission
    trackFormSubmission('contact_form', {
      form_type: 'contact',
      service_type: formData.service
    });
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We've received your message and will get back to you shortly.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Window Cleaning',
        message: ''
      });
    }, 1500);
  };

  // Remove floating call and chat buttons, use our avatar chat only on mobile & desktop for this page
  return (
    <Layout>
      <Helmet>
        <title>Contact BC Pressure Washing | Window Cleaning & Pressure Washing Services in White Rock</title>
        <meta name="description" content="Get in touch with BC Pressure Washing for professional window cleaning, pressure washing, roof cleaning, and gutter cleaning services in White Rock, Surrey, and Metro Vancouver." />
      </Helmet>
      <div
        className="relative bg-bc-red/90 text-white min-h-[320px] flex flex-col justify-center"
        style={{
          background: `linear-gradient( rgba(0,0,0,0.7), rgba(220,38,38,0.80) ), url('${CONTACT_BG}') center/cover no-repeat`,
        }}
      >
        <div className="container mx-auto px-4 py-16 text-center z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <div className="flex justify-center mb-2">
            <FloatingChatBot />
          </div>
          <p>
            15501 Marine Dr, White Rock, BC &nbsp; | &nbsp; <a href="tel:7788087620" className="underline text-white">778-808-7620</a> &nbsp; | &nbsp;
            <a href="mailto:info@bcpressurewashing.ca" className="underline text-white">info@bcpressurewashing.ca</a>
          </p>
        </div>
      </div>
      <section className="py-10 bg-bc-red/90" style={{ background: `linear-gradient(rgba(220,38,38,0.90),rgba(220,38,38,0.85)),url('${CONTACT_BG}') center/cover no-repeat` }}>
        <div className="container mx-auto px-4 flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6 bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl mx-auto">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red mb-2"
              placeholder="Your Name"
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red mb-2"
              placeholder="Your Email"
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red mb-2"
              placeholder="Your Phone"
            />
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red mb-2"
            >
              <option value="Window Cleaning">Window Cleaning</option>
              <option value="Pressure Washing">Pressure Washing</option>
              <option value="Roof Cleaning">Roof Cleaning</option>
              <option value="Gutter Cleaning">Gutter Cleaning</option>
              <option value="Commercial Services">Commercial Services</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red mb-2"
              placeholder="Please provide details about your project or questions..."
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-bc-red text-white px-8 py-3 rounded-md font-medium inline-flex items-center justify-center w-full transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

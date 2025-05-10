import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { trackFormSubmission } from '@/utils/analytics';
import ChatAssistant from '@/components/ChatAssistant';

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

    trackFormSubmission('contact_form', {
      form_type: 'contact',
      service_type: formData.service
    });

    const serviceId = 'service_xrk4vas';
    const templateId = 'template_b2y5ak4';
    const publicKey = 'MMzAmk5eWrjFgC_nP';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        toast({
          title: "Message Sent!",
          description: "We've received your message and will get back to you shortly.",
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Window Cleaning',
          message: ''
        });

        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        toast({
          title: "Something went wrong.",
          description: "Please try again later or contact us directly.",
          variant: "destructive"
        });
        setIsSubmitting(false);
      });
  };

  return (
    <Layout>
      <Helmet>
        <title>Contact BC Pressure Washing | Window Cleaning & Pressure Washing Services in White Rock</title>
        <meta name="description" content="Get in touch with BC Pressure Washing for professional window cleaning, pressure washing, roof cleaning, and gutter cleaning services in White Rock, Surrey, and Metro Vancouver." />
      </Helmet>

      <div className="relative bg-black text-white h-screen">
        <img 
          src="/lovable-uploads/53939952-27dd-42b6-92d3-7ab137a3b788.png"
          alt="Contact Us Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
      </div>

      {/* Chat bot visible floating right */}
      <div className="hidden md:block fixed right-8 bottom-8 z-50">
        <ChatAssistant />
      </div>
      <div className="md:hidden fixed right-5 bottom-5 z-50 flex flex-row gap-4">
        <ChatAssistant />
      </div>

      <section className="py-16 -mt-32 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-white">Get In Touch</h2>
              <p className="text-gray-200 mb-8">
                Fill out the form below and we'll get back to you as soon as possible. If you need an immediate response, please call us directly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red focus:border-transparent"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-gray-700 font-medium mb-2">Service Interested In *</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red focus:border-transparent"
                    >
                      <option value="Window Cleaning">Window Cleaning</option>
                      <option value="Pressure Washing">Pressure Washing</option>
                      <option value="Roof Cleaning">Roof Cleaning</option>
                      <option value="Gutter Cleaning">Gutter Cleaning</option>
                      <option value="Commercial Services">Commercial Services</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bc-red focus:border-transparent"
                    placeholder="Please provide details about your project or questions..."
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-bc-red text-white px-8 py-3 rounded-md font-medium inline-flex items-center transition-all hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-75"
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
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg h-fit">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="text-bc-red mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold">Phone</h4>
                    <p className="text-gray-600 mt-1">
                      <a href="tel:7788087620" className="hover:text-bc-red transition-colors">778-808-7620</a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Sat: 8am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="text-bc-red mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p className="text-gray-600 mt-1">
                      <a href="mailto:info@bcpressurewashing.ca" className="hover:text-bc-red transition-colors">info@bcpressurewashing.ca</a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="text-bc-red mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold">Location</h4>
                    <p className="text-gray-600 mt-1">Marine Dr<br />White Rock, BC</p>
                    <p className="text-sm text-gray-500 mt-1">Serving Surrey, White Rock & Metro Vancouver</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="text-bc-red mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold">Business Hours</h4>
                    <div className="text-gray-600 mt-1">
                      <p>Monday - Friday: 8am - 6pm</p>
                      <p>Saturday: 9am - 5pm</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

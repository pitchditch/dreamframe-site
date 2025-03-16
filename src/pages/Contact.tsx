
import { useState } from "react";
import Layout from "@/components/Layout";
import { MapPin, Phone, Mail, Send, User, MessageSquare } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  serviceInterest: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      serviceInterest: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Here you would normally send the form data to your backend
    // For now we'll just simulate a successful submission
    console.log("Form data:", data);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you shortly.",
    });
    
    form.reset();
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-black to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Have questions or ready to schedule a service? 
            Get in touch with our team for exceptional pressure washing solutions.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-bc-red mr-4 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-gray-400">Langley, BC, Canada</p>
                    <p className="text-gray-400">Serving the Fraser Valley and surrounding areas</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-bc-red mr-4 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-400">778 808 7620</p>
                    <p className="text-gray-400">Monday-Friday: 8AM - 6PM</p>
                    <p className="text-gray-400">Saturday: 9AM - 5PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-bc-red mr-4 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-400">info@bcpressurewashing.ca</p>
                    <p className="text-gray-400">We typically respond within 24 hours</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-black/30 rounded-lg">
                <h3 className="text-xl font-medium mb-4">Service Areas</h3>
                <p className="text-gray-400 mb-2">
                  We proudly serve residential and commercial clients throughout:
                </p>
                <ul className="list-disc pl-5 text-gray-400 space-y-1">
                  <li>Langley</li>
                  <li>Surrey</li>
                  <li>Abbotsford</li>
                  <li>White Rock</li>
                  <li>Maple Ridge</li>
                  <li>Burnaby</li>
                  <li>And surrounding communities</li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                              placeholder="John Doe"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <Input
                                placeholder="your.email@example.com"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <Input
                                placeholder="(123) 456-7890"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                            <Textarea
                              placeholder="Tell us about your needs..."
                              className="min-h-[120px] pl-10 resize-none"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <p className="text-sm font-medium mb-3">Services you're interested in:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {["Window Cleaning", "Gutter Cleaning", "Roof Cleaning", "House Washing", "Commercial Services"].map((service) => (
                        <div className="flex items-center space-x-2" key={service}>
                          <Checkbox
                            id={service.toLowerCase().replace(/\s+/g, '-')}
                            onCheckedChange={(checked) => {
                              const serviceInterest = form.getValues().serviceInterest || [];
                              if (checked) {
                                form.setValue('serviceInterest', [...serviceInterest, service]);
                              } else {
                                form.setValue(
                                  'serviceInterest',
                                  serviceInterest.filter((s) => s !== service)
                                );
                              }
                            }}
                          />
                          <label
                            htmlFor={service.toLowerCase().replace(/\s+/g, '-')}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                          >
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-bc-red hover:bg-red-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2" size={16} />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="mt-16 max-w-6xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">Do you offer free quotes?</h3>
                  <p className="text-gray-400">Yes, we provide free, no-obligation quotes for all our services. Contact us to schedule an assessment.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">What areas do you serve?</h3>
                  <p className="text-gray-400">We serve Langley, Surrey, Abbotsford, White Rock, Maple Ridge, Burnaby, and surrounding areas in BC.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">How often should I have my gutters cleaned?</h3>
                  <p className="text-gray-400">We recommend cleaning gutters at least twice a year, typically in spring and fall, to prevent clogs and water damage.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">Are your cleaning products eco-friendly?</h3>
                  <p className="text-gray-400">Yes, we use environmentally-friendly cleaning solutions that effectively remove dirt and grime without harming plants or wildlife.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">How long does a typical service take?</h3>
                  <p className="text-gray-400">Service times vary depending on the size of your property and the specific service. Most residential jobs are completed within a few hours.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">Do you offer any guarantees?</h3>
                  <p className="text-gray-400">Yes, we stand behind our work with a satisfaction guarantee. If you're not satisfied, we'll return to address any issues.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;

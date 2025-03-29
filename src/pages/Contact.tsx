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
import ChatAssistant from "@/components/ChatAssistant";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LanguageSelector from "@/components/LanguageSelector";
import { useTranslation } from "@/hooks/use-translation";

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
  const { t } = useTranslation();

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
      title: t("Message Sent!"),
      description: t("Thank you for reaching out. We'll get back to you shortly."),
    });
    
    form.reset();
  };

  return (
    <Layout>
      {/* Hero section with background image */}
      <div 
        className="relative bg-cover bg-center py-20" 
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/lovable-uploads/9fa4bf3e-6a32-47a0-aca1-6e202ab78527.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="absolute top-4 right-4">
            <LanguageSelector />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">{t("Contact Us")}</h1>
          <p className="text-gray-200 text-center max-w-2xl mx-auto mb-12">
            {t("Have questions or ready to schedule a service? Get in touch with our team for exceptional pressure washing solutions.")}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
              <h2 className="text-2xl font-bold mb-6 text-white">{t("Get In Touch")}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-bc-red mr-4 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-medium mb-1 text-white">{t("Location")}</h3>
                    <p className="text-gray-300">{t("Langley, BC, Canada")}</p>
                    <p className="text-gray-300">{t("Serving the Fraser Valley and surrounding areas")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-bc-red mr-4 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-medium mb-1 text-white">{t("Phone")}</h3>
                    <p className="text-gray-300">778 808 7620</p>
                    <p className="text-gray-300">{t("Monday-Friday: 8AM - 6PM")}</p>
                    <p className="text-gray-300">{t("Saturday: 9AM - 5PM")}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-bc-red mr-4 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-medium mb-1 text-white">{t("Email")}</h3>
                    <p className="text-gray-300">info@bcpressurewashing.ca</p>
                    <p className="text-gray-300">{t("We typically respond within 24 hours")}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gray-900/60 rounded-lg">
                <h3 className="text-xl font-medium mb-4 text-white">{t("Service Areas")}</h3>
                <p className="text-gray-300 mb-2">
                  {t("We proudly serve residential and commercial clients throughout:")}
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  <li>{t("Langley")}</li>
                  <li>{t("Surrey")}</li>
                  <li>{t("Abbotsford")}</li>
                  <li>{t("White Rock")}</li>
                  <li>{t("Maple Ridge")}</li>
                  <li>{t("Burnaby")}</li>
                  <li>{t("And surrounding communities")}</li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-gray-700 hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
              <h2 className="text-2xl font-bold mb-6 text-white text-center">{t("Send Us a Message")}</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t("Your Name")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                              placeholder={t("John Doe")}
                              className="pl-10 bg-gray-800/70 border-gray-700 text-white"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t("Email Address")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <Input
                                placeholder={t("your.email@example.com")}
                                className="pl-10 bg-gray-800/70 border-gray-700 text-white"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t("Phone Number")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                              <Input
                                placeholder={t("(123) 456-7890")}
                                className="pl-10 bg-gray-800/70 border-gray-700 text-white"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">{t("Your Message")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                            <Textarea
                              placeholder={t("Tell us about your needs...")}
                              className="min-h-[120px] pl-10 resize-none bg-gray-800/70 border-gray-700 text-white"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <p className="text-sm font-medium mb-3 text-white">{t("Services you're interested in:")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        t("Window Cleaning"), 
                        t("Gutter Cleaning"), 
                        t("Roof Cleaning"), 
                        t("House Washing"), 
                        t("Commercial Services")
                      ].map((service) => {
                        const serviceId = service.toLowerCase().replace(/\s+/g, '-');
                        const serviceInterest = form.getValues().serviceInterest || [];
                        const isChecked = serviceInterest.includes(service);
                        
                        return (
                          <div className="flex items-center space-x-2" key={service}>
                            <Checkbox
                              id={serviceId}
                              className="border-gray-600 data-[state=checked]:bg-bc-red data-[state=checked]:border-bc-red"
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const currentInterests = [...serviceInterest];
                                if (checked) {
                                  form.setValue('serviceInterest', [...currentInterests, service]);
                                } else {
                                  form.setValue(
                                    'serviceInterest',
                                    currentInterests.filter((s) => s !== service)
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={serviceId}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                            >
                              {service}
                            </label>
                          </div>
                        );
                      })}
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
                        {t("Sending...")}
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2" size={16} />
                        {t("Send Message")}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-center">{t("Frequently Asked Questions")}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">{t("Do you offer free quotes?")}</h3>
                  <p className="text-gray-700">{t("Yes, we provide free, no-obligation quotes for all our services. Contact us to schedule an assessment.")}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">{t("What areas do you serve?")}</h3>
                  <p className="text-gray-700">{t("We serve Langley, Surrey, Abbotsford, White Rock, Maple Ridge, Burnaby, and surrounding areas in BC.")}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">{t("How often should I have my gutters cleaned?")}</h3>
                  <p className="text-gray-700">{t("We recommend cleaning gutters at least twice a year, typically in spring and fall, to prevent clogs and water damage.")}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">{t("Are your cleaning products eco-friendly?")}</h3>
                  <p className="text-gray-700">{t("Yes, we use environmentally-friendly cleaning solutions that effectively remove dirt and grime without harming plants or wildlife.")}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">{t("How long does a typical service take?")}</h3>
                  <p className="text-gray-700">{t("Service times vary depending on the size of your property and the specific service. Most residential jobs are completed within a few hours.")}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2 text-bc-red">{t("Do you offer any guarantees?")}</h3>
                  <p className="text-gray-700">{t("Yes, we stand behind our work with a satisfaction guarantee. If you're not satisfied, we'll return to address any issues.")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add the ChatAssistant component */}
      <ChatAssistant />
    </Layout>
  );
};

export default Contact;

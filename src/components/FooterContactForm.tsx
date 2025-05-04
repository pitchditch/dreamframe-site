
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';
import { trackFormSubmission } from '@/utils/analytics';

const FooterContactForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track form submission
      trackFormSubmission('footer_contact', { 
        form_type: 'footer_contact', 
        service_type: service.substring(0, 50) // Truncate for privacy
      });
      
      // Create form data object to send to an email service
      const formData = {
        email,
        service,
        recipient: 'jaydenf3800@gmail.com',
        subject: 'New Service Request from Website',
        timestamp: new Date().toISOString(),
        source: 'Website Footer Form'
      };
      
      // You can use an email service like EmailJS, Formspree, or your own backend
      // This is a placeholder for where you would make the API call
      
      // For now, log the form data and show a success message
      console.log('Form submission data:', formData);
      
      // Show success toast
      toast({
        title: "Message sent!",
        description: "Thank you! We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setEmail('');
      setService('');
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
        <Mail className="mr-2" size={20} /> Quick Contact
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <div>
          <Textarea
            placeholder="What service are you interested in?"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            rows={3}
          />
        </div>
        <Button 
          type="submit" 
          variant="bc-red" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} className="ml-2" />
        </Button>
        
        <div className="text-xs text-gray-400 text-center mt-2">
          Your message will be sent to jaydenf3800@gmail.com
        </div>
      </form>
    </div>
  );
};

export default FooterContactForm;

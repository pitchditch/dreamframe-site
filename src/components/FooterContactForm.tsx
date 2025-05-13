
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';
import { trackFormSubmission } from '@/utils/analytics';
import { Link } from 'react-router-dom';

const FooterContactForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track the form submission
    trackFormSubmission('footer_contact_form', {
      form_type: 'quick_contact',
      service_interest: service
    });
    
    // Prepare the data for email
    const templateParams = {
      from_email: email,
      service_interest: service,
      subject: 'Quick Contact Form Submission',
      form_type: 'Footer Quick Contact'
    };
    
    // Send email using EmailJS
    emailjs.send(
      'service_xrk4vas',
      'template_cpivz2k',
      templateParams,
      'MMzAmk5eWrjFgC_nP'
    )
    .then((response) => {
      console.log('Email sent successfully:', response);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible."
      });
      setEmail('');
      setService('');
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };
  
  return (
    <div className="space-y-6">
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
              onChange={e => setEmail(e.target.value)} 
              required 
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
            />
          </div>
          <div>
            <Textarea 
              placeholder="What service are you interested in?" 
              value={service} 
              onChange={e => setService(e.target.value)} 
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
            {isSubmitting ? 'Sending...' : (
              <>
                Send Message <Send size={16} className="ml-2" />
              </>
            )}
          </Button>
          
          <div className="text-center mt-3">
            <Button 
              variant="outline" 
              className="bg-transparent hover:bg-gray-800 text-white border-gray-600 w-full"
              asChild
            >
              <Link to="/contact">View All Contact Options</Link>
            </Button>
          </div>
          
          <div className="mt-3 bg-gray-800 p-3 rounded-lg border border-gray-700">
            <p className="text-yellow-300 text-sm text-center">
              Mention you've seen our car on Marine Drive for 10% off!
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FooterContactForm;

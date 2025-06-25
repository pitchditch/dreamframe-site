
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { trackFormSubmission } from '@/utils/analytics';
import { RateLimiter, sanitizeFormData, createHoneypot, detectBot, sanitizeLogData } from '@/utils/security';
import { Link } from 'react-router-dom';

const FooterContactForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      // Rate limiting check
      const identifier = email || 'anonymous';
      if (!RateLimiter.canSubmit(identifier)) {
        const remainingTime = RateLimiter.getRemainingTime(identifier);
        const minutes = Math.ceil(remainingTime / (1000 * 60));
        toast({
          title: "Too Many Requests",
          description: `Please wait ${minutes} minutes before submitting again.`,
          variant: "destructive",
        });
        return;
      }

      // Bot detection
      const formElement = e.target as HTMLFormElement;
      const formDataObj = new FormData(formElement);
      if (detectBot(formDataObj)) {
        console.warn('Bot submission detected and blocked');
        return;
      }

      // Sanitize form data
      const sanitizedData = sanitizeFormData({ email, phone, service });

      setIsSubmitting(true);

      // Track the form submission
      trackFormSubmission('footer_contact_form', {
        form_type: 'quick_contact',
        service_interest: sanitizedData.service
      });

      // Log sanitized data (no sensitive info)
      console.log('Footer contact form submission:', sanitizeLogData(sanitizedData));

      // Send email using Supabase Edge Function + Resend
      console.log('Calling forward-contact-form function...');
      const response = await fetch(
        "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/forward-contact-form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...sanitizedData,
            subject: "Website Footer Quick Contact",
            form: "FooterContactForm",
          }),
        }
      );

      if (response.ok) {
        console.log('Forward-contact-form successful, now sending confirmations...');
        // Send confirmations (email + SMS)
        const confirmationResponse = await fetch(
          "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/send-confirmations",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: sanitizedData.email,
              phone: sanitizedData.phone,
              name: "Valued Customer",
              service: sanitizedData.service,
              formType: "quick contact",
              message: sanitizedData.service,
            }),
          }
        );

        console.log('Confirmation response status:', confirmationResponse.status);
        
        if (confirmationResponse.ok) {
          const confirmationResult = await confirmationResponse.json();
          console.log('Confirmation result:', confirmationResult);
          
          toast({
            title: "Message Sent!",
            description: "We'll get back to you as soon as possible. Check your email and phone for confirmation.",
          });
        } else {
          const confirmationError = await confirmationResponse.text();
          console.error('Confirmation error:', confirmationError);
          
          toast({
            title: "Message Sent!",
            description: "We'll get back to you as soon as possible.",
          });
        }
        
        setEmail('');
        setPhone('');
        setService('');
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to send message");
      }
    } catch (error) {
      console.error('Form submission error (sanitized):', error instanceof Error ? error.message : 'Unknown error');
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
          <Mail className="mr-2" size={20} /> Quick Contact
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {createHoneypot()}
          
          <div>
            <Input 
              type="email" 
              placeholder="Your Email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              maxLength={100}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
            />
          </div>
          <div>
            <Input 
              type="tel" 
              placeholder="Your Phone (for SMS confirmation)" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              maxLength={20}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
            />
          </div>
          <div>
            <Textarea 
              placeholder="What service are you interested in?" 
              value={service} 
              onChange={e => setService(e.target.value)} 
              required 
              maxLength={500}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
              rows={3} 
            />
          </div>
          
          <div className="text-xs text-gray-400">
            By submitting, you consent to being contacted. View our{' '}
            <a href="/privacy" className="text-bc-red hover:underline">Privacy Policy</a>.
          </div>
          
          <Button 
            type="submit" 
            variant="bc-red" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
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

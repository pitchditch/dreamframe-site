
import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

const FooterContactForm = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto URL with form data
    const mailtoLink = `mailto:jaydenf3800@gmail.com?subject=Website Inquiry: ${encodeURIComponent(service)}&body=${encodeURIComponent(`I'm interested in discussing ${service}.\n\nMy email: ${email}`)}`;
    
    // Attempt to open email client
    window.location.href = mailtoLink;
    
    // Show toast
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    setEmail('');
    setService('');
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
        <Button type="submit" variant="bc-red" className="w-full">
          Send Message <Send size={16} className="ml-2" />
        </Button>
      </form>
    </div>
  );
};

export default FooterContactForm;

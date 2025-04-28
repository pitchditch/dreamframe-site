
import React, { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
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
    
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success toast
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
      <div className="flex items-center mb-4">
        <div className="mr-3">
          <img 
            src="/lovable-uploads/7bdca265-04f1-4e31-b06e-c5b5dbb5f141.png" 
            alt="Jayden Fisher" 
            className="w-10 h-10 rounded-full object-cover border border-bc-red"
          />
        </div>
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Mail className="mr-2" size={20} /> Quick Contact
        </h3>
      </div>
      
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
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Check size={14} className="text-green-400" />
          <span>Personally reviewed by Jayden</span>
        </div>
      </form>
    </div>
  );
};

export default FooterContactForm;

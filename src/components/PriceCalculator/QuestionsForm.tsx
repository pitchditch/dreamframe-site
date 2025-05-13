
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackFormSubmission, trackFormFieldInteraction } from '@/utils/analytics';
import emailjs from '@emailjs/browser';

const QuestionsForm = () => {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [sawRedCar, setSawRedCar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !question) {
      toast({
        title: "Error",
        description: "Please fill out all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Track submission and send email
    trackFormSubmission('question_form', { 
      email, 
      question,
      form_type: 'question',
      saw_red_car: sawRedCar
    });
    
    // Prepare the data for email
    const templateParams = {
      from_email: email,
      message: question,
      subject: sawRedCar ? 'New Question About Services (10% RED CAR DISCOUNT)' : 'New Question About Services',
      form_type: 'Calculator Questions Form',
      discount_eligible: sawRedCar ? 'YES - 10% RED CAR DISCOUNT' : 'No'
    };

    // Send email using EmailJS with updated template ID
    try {
      console.log("Sending question to BC Pressure Washing");
      await emailjs.send(
        'service_xrk4vas', 
        'template_cpivz2k', 
        templateParams, 
        'MMzAmk5eWrjFgC_nP'
      );
      
      // Send confirmation email to customer
      const confirmationParams = {
        to_email: email,
        subject: 'Your Question Has Been Received - BC Pressure Washing',
        message: `Thank you for contacting BC Pressure Washing! We have received your question and will get back to you as soon as possible. For reference, here's a copy of your message:\n\n"${question}"\n\nBest regards,\nJayden Fisher\nBC Pressure Washing`,
        business_email: 'bcpressurewashing.ca@gmail.com'
      };
      
      await emailjs.send(
        'service_xrk4vas',
        'template_cpivz2k',
        confirmationParams,
        'MMzAmk5eWrjFgC_nP'
      );
      
      toast({
        title: "Question Submitted",
        description: "We'll get back to you as soon as possible! Final quote confirmed by Jayden.",
      });
      
      setEmail('');
      setQuestion('');
      setSawRedCar(false);
    } catch (error) {
      console.error("Failed to send email:", error);
      toast({
        title: "Error",
        description: "Failed to submit your question. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
    if (fieldName === 'email') {
      setEmail(e.target.value);
    } else if (fieldName === 'question') {
      setQuestion(e.target.value);
    }
    
    // Track field interaction
    trackFormFieldInteraction('question_form', fieldName, 'change');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Have a Question?</h2>
      <p className="text-gray-600 mb-6">
        Need more information about our services? Send us your question and we'll get back to you shortly.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Your Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => handleInputChange(e, 'email')}
            onFocus={() => trackFormFieldInteraction('question_form', 'email', 'focus')}
            onBlur={() => trackFormFieldInteraction('question_form', 'email', 'blur')}
            placeholder="Enter your email address"
            className="w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
            Your Question
          </label>
          <Textarea
            id="question"
            value={question}
            onChange={(e) => handleInputChange(e, 'question')}
            onFocus={() => trackFormFieldInteraction('question_form', 'question', 'focus')}
            onBlur={() => trackFormFieldInteraction('question_form', 'question', 'blur')}
            placeholder="What would you like to know about our services?"
            className="w-full min-h-[100px]"
            required
          />
        </div>
        
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="sawRedCar" 
            checked={sawRedCar} 
            onChange={(e) => setSawRedCar(e.target.checked)}
            className="w-4 h-4 text-bc-red border-gray-300 rounded focus:ring-bc-red"
          />
          <label htmlFor="sawRedCar" className="text-sm font-medium text-gray-700">
            I spotted the red car on Marine Drive (10% discount!)
          </label>
        </div>
        
        <div className="text-sm text-gray-600 italic mb-4">
          Mention you've seen our car on Marine Drive for 10% off
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-bc-red hover:bg-red-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Question'}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default QuestionsForm;

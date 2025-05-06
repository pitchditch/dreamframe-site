
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackFormSubmission, trackFormFieldInteraction } from '@/utils/analytics';

const QuestionsForm = () => {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
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
      form_type: 'question'
    });
    
    toast({
      title: "Question Submitted",
      description: "We'll get back to you as soon as possible! Final quote confirmed by Jayden.",
    });
    
    setEmail('');
    setQuestion('');
    setIsSubmitting(false);
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
        
        <div className="text-sm text-gray-600 italic mb-4">
          Final quote will be personally reviewed and confirmed by Jayden
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

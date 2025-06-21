
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackFormSubmission, trackFormFieldInteraction } from '@/utils/analytics';

const QuestionsForm = () => {
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [sawRedCar, setSawRedCar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

    // Prepare data to send to Edge Function
    const body = {
      email,
      name: 'Question Submitter',
      message: question,
      subject: sawRedCar ? "New Question About Services (10% RED CAR DISCOUNT)" : "New Question About Services",
      form: "QuestionsForm",
      discount_eligible: sawRedCar ? "YES - 10% RED CAR DISCOUNT" : "No"
    };

    try {
      const response = await fetch(
        "https://uyyudsjqwspapmujvzmm.supabase.co/functions/v1/forward-contact-form",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Question Submitted Successfully!",
          description: "We've sent you a confirmation email and will get back to you as soon as possible!",
        });
        
        // Reset form after showing success
        setTimeout(() => {
          setEmail('');
          setQuestion('');
          setSawRedCar(false);
          setIsSubmitted(false);
        }, 3000);
      } else {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit your question");
      }
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

  if (isSubmitted) {
    return (
      <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Question Submitted!</h2>
          <p className="text-green-700 mb-4">
            Thank you for your question! We've sent you a confirmation email and will get back to you shortly.
          </p>
          <p className="text-sm text-green-600">
            ✓ Confirmation email sent<br/>
            ✓ We'll respond within 24 hours
          </p>
        </div>
      </div>
    );
  }

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
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              Submit Question
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default QuestionsForm;

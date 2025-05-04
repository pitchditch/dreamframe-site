
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  question: z.string().min(10, { message: "Your question must be at least 10 characters." }),
});

type QuestionFormValues = z.infer<typeof formSchema>;

export const QuestionsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      question: '',
    },
  });

  const onSubmit = async (data: QuestionFormValues) => {
    setIsSubmitting(true);
    
    // Simulate submission
    try {
      // In a real app, you would send this data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Question Submitted",
        description: "We'll get back to you soon at " + data.email,
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <div className="mb-6 flex items-center">
        <Mail className="text-bc-red mr-3" size={24} />
        <h3 className="text-2xl font-bold">Have Questions? We're Here to Help!</h3>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Question</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="I'm wondering about..." 
                    className="resize-none min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
            variant="bc-red"
          >
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Submit Your Question"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuestionsForm;

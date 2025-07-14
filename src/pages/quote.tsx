import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const QuotePage = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const { data, error } = await supabase
        .from('quotes')
        .select('quote, author')
        .order('id', { random: true })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching quote:', error);
      } else {
        setQuote(data.quote);
        setAuthor(data.author);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div>
      <h1>Random Quote</h1>
      <blockquote>
        <p>{quote}</p>
        <cite>- {author}</cite>
      </blockquote>
    </div>
  );
};

export default QuotePage;

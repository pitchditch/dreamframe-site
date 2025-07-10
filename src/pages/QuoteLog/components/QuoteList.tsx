import React from 'react';
import QuoteCard from './QuoteCard';
import EmptyState from './EmptyState';
import type { Quote } from '../types';

interface QuoteListProps {
  quotes: Quote[];
  searchTerm: string;
}

const QuoteList: React.FC<QuoteListProps> = ({ quotes, searchTerm }) => {
  if (quotes.length === 0) {
    return <EmptyState searchTerm={searchTerm} />;
  }

  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
    </div>
  );
};

export default QuoteList;
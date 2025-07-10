import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

interface QuoteSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

const QuoteSearch: React.FC<QuoteSearchProps> = ({ 
  searchTerm, 
  onSearchChange, 
  onClearSearch 
}) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Search className="h-5 w-5 text-gray-400" />
          <div className="flex-1">
            <Label htmlFor="search" className="sr-only">Search quotes</Label>
            <Input
              id="search"
              placeholder="Search by customer name, email, or address..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={onClearSearch}
            disabled={!searchTerm}
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteSearch;
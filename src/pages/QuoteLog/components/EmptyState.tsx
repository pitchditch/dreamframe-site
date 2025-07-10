import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm }) => {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No quotes found</h3>
        <p className="text-gray-600">
          {searchTerm ? 'Try adjusting your search terms.' : 'No quotes have been sent yet.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyState;
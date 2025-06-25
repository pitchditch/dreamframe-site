
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useAddressAutocomplete } from '@/hooks/useAddressAutocomplete';

interface AddressDetails {
  formatted_address: string;
  latitude: number;
  longitude: number;
  city: string;
  postalCode: string;
}

interface AddressAutocompleteProps {
  onAddressSelect: (address: AddressDetails) => void;
  placeholder?: string;
  className?: string;
}

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onAddressSelect,
  placeholder = "Enter your address...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { suggestions, loading, searchAddresses } = useAddressAutocomplete();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length >= 3) {
      searchAddresses(query);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query, searchAddresses]);

  const handleAddressSelect = (address: AddressDetails) => {
    setQuery(address.formatted_address);
    setShowSuggestions(false);
    onAddressSelect(address);
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((address, index) => (
            <button
              key={index}
              onClick={() => handleAddressSelect(address)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
            >
              <div className="font-medium">{address.formatted_address}</div>
              <div className="text-sm text-gray-500">{address.city}</div>
            </button>
          ))}
        </div>
      )}
      
      {loading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};


import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      toast({
        title: "Searching",
        description: `Looking up: "${query}"`,
      });
      
      // Navigate to landmark cases with the search query
      navigate(`/landmark-cases?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input 
        type="search" 
        placeholder="Search cases, judgments..." 
        className="pl-9 bg-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button 
        type="submit" 
        variant="ghost" 
        size="sm" 
        className="absolute right-0 top-0 h-full px-2"
      >
        <span className="sr-only">Search</span>
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default SearchBar;

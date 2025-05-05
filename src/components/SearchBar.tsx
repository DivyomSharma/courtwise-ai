
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { searchCases } from '@/utils/caseHelpers';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Search for cases using our helper function
      const results = await searchCases(query);
      
      // Store search results in local storage for the explore page to use
      localStorage.setItem('lastSearchResults', JSON.stringify(results || []));
      localStorage.setItem('lastSearchQuery', query);
      
      toast({
        title: "Searching",
        description: `Looking up: "${query}"`,
      });
      
      // Navigate to explore page with the search query
      navigate(`/explore?q=${encodeURIComponent(query)}`);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
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
        disabled={isSearching}
      />
      <Button 
        type="submit" 
        variant="ghost" 
        size="sm" 
        className="absolute right-0 top-0 h-full px-2"
        disabled={isSearching}
      >
        {isSearching ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
};

export default SearchBar;

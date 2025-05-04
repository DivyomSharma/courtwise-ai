
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
      // Search for cases in Supabase using full text search
      // This is a basic implementation - could be enhanced with more advanced search features
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .or(`title.ilike.%${query}%,summary.ilike.%${query}%,full_text.ilike.%${query}%`)
        .limit(20);
      
      if (error) {
        console.error('Search error:', error);
        toast({
          title: "Search failed",
          description: "An error occurred while searching. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Store search results in local storage for the landmark cases page to use
      localStorage.setItem('lastSearchResults', JSON.stringify(data || []));
      localStorage.setItem('lastSearchQuery', query);
      
      toast({
        title: "Searching",
        description: `Looking up: "${query}"`,
      });
      
      // Navigate to landmark cases with the search query
      navigate(`/landmark-cases?q=${encodeURIComponent(query)}`);
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


import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { searchIndianKanoon, searchCases } from '@/utils/caseHelpers';

interface IndianKanoonSearchProps {
  onSearchResults: (results: any[]) => void;
  onSearchLoading: (isLoading: boolean) => void;
}

const IndianKanoonSearch: React.FC<IndianKanoonSearchProps> = ({
  onSearchResults,
  onSearchLoading
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    setIsSearching(true);
    onSearchLoading(true);
    
    try {
      // Search in our local database first
      const results = await searchCases(query);
      onSearchResults(results);
      
      toast({
        title: "Search complete",
        description: `Found ${results.length} results for "${query}"`,
      });
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search error",
        description: "An unexpected error occurred during search.",
        variant: "destructive",
      });
      onSearchResults([]);
    } finally {
      setIsSearching(false);
      onSearchLoading(false);
    }
  };

  const handleExternalSearch = () => {
    if (!query.trim()) return;
    
    toast({
      title: "External Search",
      description: `Opening Indian Kanoon to search for "${query}"`,
    });
    
    searchIndianKanoon(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search cases on Indian Kanoon..." 
          className="pl-9 pr-32 bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
        <div className="absolute right-1.5 top-1.5 flex gap-1">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleExternalSearch}
            disabled={isSearching || !query.trim()}
          >
            <ArrowRight className="h-3 w-3 mr-1" />
            External
          </Button>
          <Button 
            type="submit" 
            size="sm" 
            disabled={isSearching || !query.trim()}
          >
            <Search className="h-3 w-3 mr-1" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default IndianKanoonSearch;


import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { searchCases } from '@/utils/caseHelpers';

interface CaseSearchProps {
  onSearchResults: (results: any[]) => void;
  onSearchLoading: (isLoading: boolean) => void;
}

const CaseSearch: React.FC<CaseSearchProps> = ({
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
      // Search in our local database
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

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search cases..." 
          className="pl-9 pr-20 bg-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isSearching}
        />
        <div className="absolute right-1.5 top-1.5">
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

export default CaseSearch;

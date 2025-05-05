import React, { useState } from 'react';
import { Search, ArrowUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { searchCases, searchIndianKanoon } from '@/utils/caseHelpers';

const PromptSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoggedIn } = useUser();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    try {
      toast({
        title: "Search initiated",
        description: `Searching for: "${searchQuery}"`,
      });
      
      // Search local database first
      const results = await searchCases(searchQuery);
      
      // Store search results
      localStorage.setItem('lastSearchResults', JSON.stringify(results || []));
      localStorage.setItem('lastSearchQuery', searchQuery);
      
      // If the query is specific and we have results, go to results page
      if (results.length > 0) {
        navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
        return;
      }
      
      // If query is complex, try AI search
      if (searchQuery.length > 10 || searchQuery.split(' ').length >= 3) {
        const { data, error } = await supabase.functions.invoke('ai-search', {
          body: { query: searchQuery }
        });
        
        if (error) throw error;
        
        if (data && data.results) {
          // If AI found specific cases, navigate to the first one
          if (data.results.specificCase) {
            navigate(`/case/${data.results.specificCase}`);
          } else {
            // Otherwise navigate to explore with AI-enhanced params
            navigate(`/explore?q=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(data.results.suggestedCategory || '')}`);
          }
          return;
        }
      }
      
      // If no results or no AI enhancement, use indiankanoon.org as backup
      toast({
        title: "External search",
        description: "Searching Indian Kanoon for more comprehensive results.",
      });
      
      searchIndianKanoon(searchQuery);
      
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search error",
        description: "There was a problem processing your search. Using regular search instead.",
        variant: "destructive"
      });
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    } finally {
      setIsSearching(false);
    }
  };
  
  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    toast({
      title: "Quick search selected",
      description: `Searching for: "${term}"`,
    });
    navigate(`/explore?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative rounded-xl shadow-md bg-background">
          <Input
            className="pl-12 pr-24 py-6 text-base md:text-lg h-16 rounded-xl border-2 focus-visible:ring-primary"
            placeholder={isLoggedIn ? "What case or judgment are you looking for?" : "Search for landmark cases..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <div className="flex items-center bg-secondary rounded-md px-2 py-1">
              <span className="text-sm text-muted-foreground">Courtwise AI</span>
            </div>
            
            <Button 
              type="submit" 
              size="sm" 
              className="h-10 w-10 rounded-full p-0 flex items-center justify-center"
              disabled={isSearching}
            >
              {isSearching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <ArrowUp className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {['Research', 'Latest Cases', 'Supreme Court', 'Criminal Law', 'Constitutional'].map((item) => (
          <Button 
            key={item} 
            variant="outline" 
            size="sm"
            className="rounded-full bg-secondary/50"
            onClick={() => handleQuickSearch(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PromptSearch;

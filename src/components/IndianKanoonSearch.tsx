
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { searchCases, CaseSearchResult } from '@/utils/caseHelpers';
import { Loader2, Search as SearchIcon } from 'lucide-react';
import { checkIndianKanoonApiKey, searchIndianKanoon } from '@/utils/indianKanoonApi';

const searchFormSchema = z.object({
  query: z.string().min(3, "Search query must be at least 3 characters")
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

interface CaseSearchProps {
  onSearchResults: (results: CaseSearchResult[]) => void;
  onSearchLoading: (isLoading: boolean) => void;
}

const CaseSearch: React.FC<CaseSearchProps> = ({ onSearchResults, onSearchLoading }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [kanoonApiEnabled, setKanoonApiEnabled] = useState(false);
  
  useEffect(() => {
    const checkKanoonApiConfig = async () => {
      const isConfigured = await checkIndianKanoonApiKey();
      setKanoonApiEnabled(isConfigured);
    };
    
    checkKanoonApiConfig();
  }, []);
  
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (data: SearchFormValues) => {
    setLoading(true);
    
    if (onSearchLoading) {
      onSearchLoading(true);
    }
    
    try {
      const results = await searchCases(data.query);
      
      if (onSearchResults) {
        onSearchResults(results);
      }
      
      // Store the search results and query in localStorage for page refresh persistence
      localStorage.setItem('lastSearchQuery', data.query);
      localStorage.setItem('lastSearchResults', JSON.stringify(results));
      
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
      
      if (onSearchLoading) {
        onSearchLoading(false);
      }
    }
  };
  
  const handleKanoonSearch = () => {
    const query = form.getValues('query');
    if (query && query.length >= 3) {
      navigate(`/kanoon?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input 
                        placeholder="Search cases..." 
                        className="pl-9"
                        {...field} 
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="ml-2"
                    >
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Search Database
                    </Button>
                  </div>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        
        {kanoonApiEnabled && (
          <div className="flex justify-end">
            <Button 
              type="button" 
              variant="outline"
              onClick={handleKanoonSearch}
            >
              Search Indian Kanoon
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default CaseSearch;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, AlertCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { checkIndianKanoonApiKey, searchIndianKanoon, IKSearchResult, IKDocument } from '@/utils/indianKanoonApi';
import IndianKanoonSearchResult from '@/components/IndianKanoonSearchResult';

const KanoonSearch = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IKSearchResult | null>(null);
  const [apiConfigured, setApiConfigured] = useState<boolean>(false);
  const [docType, setDocType] = useState<string>('judgments');
  
  // Get query params
  const queryParams = new URLSearchParams(location.search);
  const q = queryParams.get('q');
  
  useEffect(() => {
    // Check if API key is configured
    const checkApiKey = async () => {
      const isConfigured = await checkIndianKanoonApiKey();
      setApiConfigured(isConfigured);
      
      if (!isConfigured) {
        toast({
          title: 'API Key Not Configured',
          description: 'Indian Kanoon API key is not configured. Please contact the administrator.',
          variant: 'destructive'
        });
      }
    };
    
    checkApiKey();
    
    // If query param exists, set the search query and perform search
    if (q) {
      setSearchQuery(q);
      performSearch(q);
    }
  }, []);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: 'Search query required',
        description: 'Please enter a search query',
        variant: 'destructive'
      });
      return;
    }
    
    // Update URL
    navigate(`/kanoon?q=${encodeURIComponent(searchQuery)}`);
    
    // Perform search
    performSearch(searchQuery);
  };
  
  const performSearch = async (query: string) => {
    if (!apiConfigured) {
      toast({
        title: 'API Key Not Configured',
        description: 'Indian Kanoon API key is not configured. Please contact the administrator.',
        variant: 'destructive'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const results = await searchIndianKanoon(query, {
        doctypes: docType,
        maxcites: 5
      });
      
      setResults(results);
      
      if (!results || results.docs.length === 0) {
        toast({
          title: 'No results found',
          description: `No results found for "${query}"`,
          variant: 'default'
        });
      }
    } catch (error) {
      console.error('Error performing search:', error);
      toast({
        title: 'Search error',
        description: 'An error occurred while searching. Please try again later.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDocTypeChange = (value: string) => {
    setDocType(value);
    
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 bg-background">
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div>
                <h1 className="text-xl md:text-2xl font-serif font-bold">Indian Kanoon Search</h1>
              </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-6">
            <Card className="p-6 mb-6">
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search Indian Kanoon..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Select value={docType} onValueChange={handleDocTypeChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Document Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="judgments">Judgments</SelectItem>
                        <SelectItem value="supremecourt">Supreme Court</SelectItem>
                        <SelectItem value="highcourts">High Courts</SelectItem>
                        <SelectItem value="tribunals">Tribunals</SelectItem>
                        <SelectItem value="laws">Laws</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button type="submit" disabled={loading || !apiConfigured}>
                      {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                      Search
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
            
            {!apiConfigured ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                  <div>
                    <h3 className="font-medium">API Key Not Configured</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Indian Kanoon API key has not been configured. Real-time searches will not work.
                      Please contact the administrator to set up the API key.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : results ? (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-medium">
                    {results.found} results for "{results.formInput}"
                  </h2>
                </div>
                
                {/* Categories */}
                {results.categories && results.categories.length > 0 && (
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.categories.map((category, index) => (
                      <Card key={index} className="p-4">
                        <h3 className="font-medium mb-2">{category[0]}</h3>
                        <div className="space-y-1">
                          {category[1].map((subcategory, subIndex) => (
                            <div key={subIndex}>
                              <Button 
                                variant="link" 
                                className="p-0 text-sm h-auto"
                                onClick={() => {
                                  setSearchQuery(subcategory.formInput);
                                  navigate(`/kanoon?q=${encodeURIComponent(subcategory.formInput)}`);
                                  performSearch(subcategory.formInput);
                                }}
                              >
                                {subcategory.value}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                
                {/* Results */}
                <div className="space-y-4">
                  {results.docs.map((doc: IKDocument) => (
                    <IndianKanoonSearchResult 
                      key={doc.tid} 
                      document={doc}
                      query={results.formInput}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default KanoonSearch;

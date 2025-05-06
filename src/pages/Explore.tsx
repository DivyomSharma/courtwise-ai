
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { MenuIcon, ArrowLeft } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import { Separator } from '@/components/ui/separator';
import CaseSearch from '@/components/IndianKanoonSearch';
import CaseCategories from '@/components/CaseCategories';
import CaseResultsList from '@/components/CaseResultsList';
import { CaseSearchResult, fetchCasesByCategory, fetchAllCases } from '@/utils/caseHelpers';

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<CaseSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  
  // Parse query params
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  const categoryParam = queryParams.get('category');
  
  useEffect(() => {
    // Handle initial category from URL
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    // Handle initial search from URL or localStorage
    if (searchQuery) {
      setLoading(true);
      // Check if we have cached results
      const cachedResults = localStorage.getItem('lastSearchResults');
      const cachedQuery = localStorage.getItem('lastSearchQuery');
      
      if (cachedResults && cachedQuery === searchQuery) {
        try {
          setSearchResults(JSON.parse(cachedResults));
          setLoading(false);
        } catch (e) {
          // If parsing fails, load from category or all cases
          loadInitialResults();
        }
      } else {
        // No cached results, load by category or all cases
        loadInitialResults();
      }
    } else {
      // No search query, load by category or all cases
      loadInitialResults();
    }
  }, [searchQuery, categoryParam]);
  
  // Load initial results - either from category or all cases
  const loadInitialResults = async () => {
    setLoading(true);
    try {
      let results;
      if (selectedCategory) {
        results = await fetchCasesByCategory(selectedCategory);
      } else {
        results = await fetchAllCases();
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Error loading initial results:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Load results when category changes
  useEffect(() => {
    // Update URL
    if (selectedCategory) {
      const newParams = new URLSearchParams(location.search);
      newParams.set('category', selectedCategory);
      navigate(`${location.pathname}?${newParams.toString()}`);
    } else {
      const newParams = new URLSearchParams(location.search);
      newParams.delete('category');
      navigate(`${location.pathname}?${newParams.toString()}`);
    }
    
    loadCategoryResults(selectedCategory);
  }, [selectedCategory]);
  
  const loadCategoryResults = async (category?: string) => {
    setLoading(true);
    try {
      let results;
      if (category) {
        results = await fetchCasesByCategory(category);
      } else {
        results = await fetchAllCases();
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Error loading category results:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category || undefined);
  };
  
  const handleSearchResults = (results: CaseSearchResult[]) => {
    setSearchResults(results);
  };
  
  const handleSearchLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="md:hidden">
                  <SidebarTrigger>
                    <Button variant="ghost" size="icon">
                      <MenuIcon className="h-5 w-5" />
                    </Button>
                  </SidebarTrigger>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="mr-2"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
                
                <h1 className="text-xl md:text-2xl font-serif font-bold">
                  Explore Cases
                </h1>
              </div>
              
              <div className="hidden md:block">
                <LiveDateTime />
              </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-6">
            <div className="mb-6">
              <CaseSearch 
                onSearchResults={handleSearchResults}
                onSearchLoading={handleSearchLoading}
              />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Search our comprehensive case database
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <aside className="lg:col-span-1">
                <CaseCategories 
                  onSelectCategory={handleCategorySelect}
                  selectedCategory={selectedCategory}
                />
              </aside>
              
              <div className="lg:col-span-3">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-lg font-medium">
                    {searchQuery ? 
                      `Search Results: "${searchQuery}"` : 
                      selectedCategory ? 
                        `${selectedCategory} Cases` : 
                        'All Cases'
                    }
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {searchResults.length} results
                  </span>
                </div>
                
                <Separator className="mb-4" />
                
                <CaseResultsList 
                  cases={searchResults}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Explore;

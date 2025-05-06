
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import { CaseSearchResult, fetchCasesByCategory, fetchAllCases } from '@/utils/caseHelpers';
import { useToast } from '@/hooks/use-toast';

// Imported refactored components
import ExploreHeader from '@/components/explore/ExploreHeader';
import ExploreSearchSection from '@/components/explore/ExploreSearchSection';
import ExploreResultsSection from '@/components/explore/ExploreResultsSection';

const Explore = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<CaseSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
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
      
      if (results.length === 0) {
        toast({
          title: "No cases found",
          description: "We couldn't find any cases. Sample data has been generated.",
        });
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Error loading initial results:', error);
      toast({
        title: "Error loading cases",
        description: "There was an error loading the cases. Sample data has been generated.",
        variant: "destructive",
      });
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
      toast({
        title: "Error loading cases",
        description: "There was an error loading cases for this category. Sample data has been generated.",
        variant: "destructive",
      });
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
          <ExploreHeader />
          
          <div className="container mx-auto px-4 py-6">
            <ExploreSearchSection 
              onSearchResults={handleSearchResults}
              onSearchLoading={handleSearchLoading}
            />
            
            <ExploreResultsSection 
              searchResults={searchResults}
              loading={loading}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Explore;

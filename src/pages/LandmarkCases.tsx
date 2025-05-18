
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';
import { LANDMARK_CASES } from '@/utils/landmarkCasesData';
import AppSidebar from '@/components/AppSidebar';
import LandmarkPageHeader from '@/components/landmark/LandmarkPageHeader';
import LandmarkCaseSearch from '@/components/landmark/LandmarkCaseSearch';
import LandmarkCaseFilter from '@/components/landmark/LandmarkCaseFilter';
import LandmarkCaseResults from '@/components/landmark/LandmarkCaseResults';

const LandmarkCases = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredCases, setFilteredCases] = useState(LANDMARK_CASES);
  const [loading, setLoading] = useState(false);
  
  // Get unique categories for the tab filters
  const uniqueCategories = [...new Set(LANDMARK_CASES.map(c => c.category))];
  
  // Filter cases by search and category
  const handleFilterCases = () => {
    setLoading(true);
    
    try {
      let filtered = [...LANDMARK_CASES];
      
      // Filter by category if not 'all'
      if (activeCategory !== 'all') {
        filtered = filtered.filter(c => c.category.toLowerCase() === activeCategory.toLowerCase());
      }
      
      // Filter by search query if provided
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        filtered = filtered.filter(c => 
          c.title.toLowerCase().includes(lowerQuery) ||
          c.summary.toLowerCase().includes(lowerQuery) ||
          c.court.toLowerCase().includes(lowerQuery) ||
          c.category.toLowerCase().includes(lowerQuery)
        );
      }
      
      setFilteredCases(filtered);
    } catch (error) {
      console.error('Error filtering cases:', error);
      toast({
        title: "Error",
        description: "Failed to filter cases. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    // Reset filtered cases when changing categories
    let filtered = [...LANDMARK_CASES];
    if (category !== 'all') {
      filtered = filtered.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    
    setFilteredCases(filtered);
  };

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterCases();
    
    toast({
      title: "Search Results",
      description: searchQuery ? `Showing results for "${searchQuery}"` : "Showing all landmark cases",
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setFilteredCases(LANDMARK_CASES);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 bg-background">
          <LandmarkPageHeader />
          
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg md:text-xl font-serif mb-1">Significant Indian Judgments</h2>
                <p className="text-sm text-muted-foreground">Historic and influential court rulings that shaped Indian law</p>
              </div>
              
              <div className="w-full md:w-64">
                <LandmarkCaseSearch 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSearchSubmit={handleSearch}
                />
              </div>
            </div>
            
            <LandmarkCaseFilter 
              activeCategory={activeCategory}
              uniqueCategories={uniqueCategories}
              onCategoryChange={handleCategoryChange}
            />
            
            <LandmarkCaseResults 
              loading={loading}
              filteredCases={filteredCases}
              searchQuery={searchQuery}
              activeCategory={activeCategory}
              onResetFilters={handleResetFilters}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LandmarkCases;

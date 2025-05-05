
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MenuIcon, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { LANDMARK_CASES } from '@/utils/landmarkCasesData';

const LandmarkCases = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredCases, setFilteredCases] = useState(LANDMARK_CASES);
  
  // Get unique categories for the tab filters
  const uniqueCategories = [...new Set(LANDMARK_CASES.map(c => c.category))];
  
  const filterCases = (query: string, category: string) => {
    let filtered = [...LANDMARK_CASES];
    
    // Filter by category if not 'all'
    if (category !== 'all') {
      filtered = filtered.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    
    // Filter by search query if provided
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(lowerQuery) ||
        c.summary.toLowerCase().includes(lowerQuery) ||
        c.court.toLowerCase().includes(lowerQuery) ||
        c.category.toLowerCase().includes(lowerQuery)
      );
    }
    
    setFilteredCases(filtered);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    filterCases(searchQuery, category);
  };

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterCases(searchQuery, activeCategory);
    
    toast({
      title: "Search Results",
      description: searchQuery ? `Showing results for "${searchQuery}"` : "Showing all landmark cases",
    });
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
                  <SidebarTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MenuIcon className="h-5 w-5" />
                    </Button>
                  </SidebarTrigger>
                </div>
                
                <h1 className="text-xl md:text-2xl font-serif font-bold">Landmark Cases</h1>
              </div>
              
              <div className="hidden md:block">
                <LiveDateTime />
              </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg md:text-xl font-serif mb-1">Significant Indian Judgments</h2>
                <p className="text-sm text-muted-foreground">Historic and influential court rulings that shaped Indian law</p>
              </div>
              
              <div className="w-full md:w-64">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search landmark cases..." 
                    className="pl-9 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>
            
            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Categories</TabsTrigger>
                {uniqueCategories.map(category => (
                  <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-2">
                {filteredCases.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredCases.map((caseData) => (
                      <Card key={caseData.id} className="overflow-hidden">
                        <div className="h-1.5 bg-primary"></div>
                        <CardContent className="p-4">
                          <div className="mb-3">
                            <h3 className="font-serif font-semibold text-lg">{caseData.title}</h3>
                            <p className="text-xs text-muted-foreground">{caseData.citation}</p>
                          </div>
                          
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-xs">
                              <span className="text-muted-foreground">{caseData.court}</span>
                              <span className="mx-1.5">•</span>
                              <span className="text-muted-foreground">{caseData.date}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">{caseData.category}</Badge>
                          </div>
                          
                          <p className="text-sm">{caseData.summary}</p>
                          
                          <div className="mt-4 flex justify-end">
                            <Button size="sm" asChild>
                              <Link to={`/case/${caseData.id}`}>View Full Case</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium mb-2">No cases found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery 
                        ? `No results found for "${searchQuery}" in ${activeCategory === 'all' ? 'any category' : `the ${activeCategory} category`}` 
                        : `No cases found in the ${activeCategory} category`}
                    </p>
                    <Button variant="outline" onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                      setFilteredCases(LANDMARK_CASES);
                    }}>
                      View All Cases
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LandmarkCases;

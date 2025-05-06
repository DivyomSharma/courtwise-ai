
import React, { useState, useEffect, useMemo } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MenuIcon, Search, Loader2, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { LANDMARK_CASES } from '@/utils/landmarkCasesData';
import { getLandmarkCasesForHome, CaseSearchResult } from '@/utils/caseHelpers';

const LandmarkCases = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredCases, setFilteredCases] = useState<CaseSearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Get landmark cases - either from predefined data or generated
  const landmarkCases = useMemo(() => {
    // If we have less than 50 predefined cases, supplement with generated ones
    return LANDMARK_CASES.length >= 50 
      ? LANDMARK_CASES 
      : [...LANDMARK_CASES, ...getLandmarkCasesForHome(50 - LANDMARK_CASES.length)];
  }, []);
  
  // Get unique categories for the tab filters
  const uniqueCategories = useMemo(() => {
    return [...new Set(landmarkCases.map(c => c.category))];
  }, [landmarkCases]);
  
  // Initialize with all cases
  useEffect(() => {
    setFilteredCases(landmarkCases);
    setLoading(false);
  }, [landmarkCases]);

  const filterCases = (query: string, category: string) => {
    setLoading(true);
    
    try {
      let filtered = [...landmarkCases];
      
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
        
        <main className="flex-1 bg-background">
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
                
                <Button 
                  variant="ghost" 
                  className="mr-2"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-5 w-5 mr-1" />
                  <span className="hidden sm:inline">Back</span>
                </Button>
                
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
              <div className="overflow-x-auto">
                <TabsList className="mb-4 inline-flex w-max">
                  <TabsTrigger value="all">All Categories</TabsTrigger>
                  {uniqueCategories.map(category => (
                    <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <TabsContent value={activeCategory} className="mt-2">
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredCases.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredCases.map((caseData) => (
                      <Card key={caseData.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                          
                          <p className="text-sm line-clamp-3">{caseData.summary}</p>
                          
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
                      setFilteredCases(landmarkCases);
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

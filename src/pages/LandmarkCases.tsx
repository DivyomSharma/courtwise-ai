
import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MenuIcon, Search } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Case {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  category: string;
  summary: string;
  importance?: string;
}

const LandmarkCases = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch cases on mount
  useEffect(() => {
    fetchCases();
  }, []);

  // Parse search query from URL on component mount
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      setSearchQuery(query);
      filterCases(query, activeCategory);
    }
  }, [location.search]);

  const fetchCases = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        const formattedCases = data.map(caseItem => {
          // Format date if it's a valid date string
          let formattedDate;
          try {
            formattedDate = new Date(caseItem.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
          } catch (e) {
            formattedDate = caseItem.date || 'Unknown date';
          }

          return {
            ...caseItem,
            date: formattedDate,
            importance: caseItem.key_points && caseItem.key_points.length > 3 ? 'High' : 'Medium'
          };
        });
        setCases(formattedCases);
        filterCases(searchQuery, activeCategory, formattedCases);
      }
    } catch (error) {
      console.error('Error fetching cases:', error);
      toast({
        title: "Error",
        description: "Failed to load landmark cases. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter cases based on search query and category
  const filterCases = (query: string, category: string, casesArray = cases) => {
    let filtered = [...casesArray];
    
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
    
    setCases(filtered);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    filterCases(searchQuery, category);
    
    // Update URL without triggering a page reload
    const params = new URLSearchParams(location.search);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    navigate(`${location.pathname}?${params.toString()}`);
  };

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterCases(searchQuery, activeCategory);
    
    // Update URL with search query
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    navigate(`${location.pathname}?${params.toString()}`);
    
    toast({
      title: "Search Results",
      description: searchQuery ? `Showing results for "${searchQuery}"` : "Showing all cases",
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
                    placeholder="Search cases..." 
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
                <TabsTrigger value="Constitutional">Constitutional</TabsTrigger>
                <TabsTrigger value="Criminal">Criminal</TabsTrigger>
                <TabsTrigger value="Environmental">Environmental</TabsTrigger>
                <TabsTrigger value="Family">Family</TabsTrigger>
                <TabsTrigger value="Labour">Labour</TabsTrigger>
                <TabsTrigger value="Administrative">Administrative</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-2">
                {isLoading ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Loading cases...</p>
                  </div>
                ) : cases.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {cases.map((caseData) => (
                      <Card key={caseData.id} className="overflow-hidden">
                        <div className={`h-1.5 ${caseData.importance === 'High' ? 'bg-primary' : 'bg-muted'}`}></div>
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
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs">{caseData.category}</Badge>
                              <Badge variant={caseData.importance === 'High' ? 'default' : 'outline'} className="text-xs">
                                {caseData.importance}
                              </Badge>
                            </div>
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
                      fetchCases();
                      navigate('/landmark-cases');
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

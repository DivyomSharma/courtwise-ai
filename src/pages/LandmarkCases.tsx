
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
import SearchBar from '@/components/SearchBar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const landmarkCases = [
  {
    id: "kesavananda-bharati",
    title: "Kesavananda Bharati vs State of Kerala",
    citation: "AIR 1973 SC 1461",
    court: "Supreme Court",
    date: "April 24, 1973",
    category: "Constitutional",
    summary: "The Supreme Court established the doctrine of the 'basic structure' of the Constitution, ruling that Parliament cannot amend the Constitution in a way that destroys its basic or essential features.",
    importance: "High"
  },
  {
    id: "maneka-gandhi",
    title: "Maneka Gandhi vs Union of India",
    citation: "AIR 1978 SC 597",
    court: "Supreme Court",
    date: "January 25, 1978",
    category: "Constitutional",
    summary: "The court interpreted the 'right to life' under Article 21 as not merely physical existence but as the right to live with human dignity, expanding the scope of fundamental rights significantly.",
    importance: "High"
  },
  {
    id: "vishaka",
    title: "Vishaka vs State of Rajasthan",
    citation: "AIR 1997 SC 3011",
    court: "Supreme Court",
    date: "August 13, 1997",
    category: "Labor & Employment",
    summary: "This landmark judgment laid down guidelines to prevent sexual harassment of women at workplaces, which later formed the basis for the Sexual Harassment of Women at Workplace Act, 2013.",
    importance: "Medium"
  },
  {
    id: "olga-tellis",
    title: "Olga Tellis vs Bombay Municipal Corporation",
    citation: "AIR 1986 SC 180",
    court: "Supreme Court",
    date: "July 10, 1985",
    category: "Constitutional",
    summary: "The court recognized that the right to livelihood is included within the 'right to life' under Article 21, noting that evicting a person from a pavement or slum affects their livelihood.",
    importance: "Medium"
  },
  {
    id: "puttaswamy",
    title: "Justice K.S. Puttaswamy vs Union of India",
    citation: "AIR 2017 SC 4161",
    court: "Supreme Court",
    date: "August 24, 2017",
    category: "Constitutional",
    summary: "The Supreme Court recognized the right to privacy as a fundamental right under Article 21 of the Indian Constitution, with significant implications for data protection and personal liberty.",
    importance: "High"
  },
  {
    id: "shah-bano",
    title: "Mohd. Ahmed Khan vs Shah Bano Begum",
    citation: "AIR 1985 SC 945",
    court: "Supreme Court",
    date: "April 23, 1985",
    category: "Family",
    summary: "The court ruled that a Muslim woman has the right to maintenance under Section 125 of CrPC after divorce, which led to significant political debate and the passage of the Muslim Women (Protection of Rights on Divorce) Act, 1986.",
    importance: "High"
  },
  {
    id: "navtej-johar",
    title: "Navtej Singh Johar vs Union of India",
    citation: "AIR 2018 SC 4321",
    court: "Supreme Court",
    date: "September 6, 2018",
    category: "Criminal",
    summary: "The Supreme Court decriminalized consensual homosexual acts by declaring Section 377 of the Indian Penal Code unconstitutional insofar as it criminalized consensual sexual conduct between adults of the same sex.",
    importance: "High"
  },
  {
    id: "mc-mehta",
    title: "M.C. Mehta vs Union of India",
    citation: "AIR 1987 SC 1086",
    court: "Supreme Court",
    date: "December 20, 1986",
    category: "Environmental",
    summary: "This case established the principle of absolute liability for industries engaged in hazardous activities, holding that such industries must ensure safety and cannot claim exemptions based on traditional defenses.",
    importance: "Medium"
  }
];

const LandmarkCases = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredCases, setFilteredCases] = useState(landmarkCases);

  // Parse search query from URL on component mount
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      setSearchQuery(query);
      filterCases(query, activeCategory);
    }
  }, [location.search]);

  // Filter cases based on search query and category
  const filterCases = (query: string, category: string) => {
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
                  <SidebarTrigger />
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
                <TabsTrigger value="constitutional">Constitutional</TabsTrigger>
                <TabsTrigger value="criminal">Criminal</TabsTrigger>
                <TabsTrigger value="environmental">Environmental</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeCategory} className="mt-2">
                {filteredCases.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredCases.map((caseData) => (
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
                      filterCases('', 'all');
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

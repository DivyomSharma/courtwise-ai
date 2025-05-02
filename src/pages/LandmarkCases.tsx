
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MenuIcon } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import SearchBar from '@/components/SearchBar';

const landmarkCases = [
  {
    id: 1,
    title: "Kesavananda Bharati vs State of Kerala",
    citation: "AIR 1973 SC 1461",
    court: "Supreme Court",
    date: "April 24, 1973",
    category: "Constitutional",
    summary: "The Supreme Court established the doctrine of the 'basic structure' of the Constitution, ruling that Parliament cannot amend the Constitution in a way that destroys its basic or essential features.",
    importance: "High"
  },
  {
    id: 2,
    title: "Maneka Gandhi vs Union of India",
    citation: "AIR 1978 SC 597",
    court: "Supreme Court",
    date: "January 25, 1978",
    category: "Constitutional",
    summary: "The court interpreted the 'right to life' under Article 21 as not merely physical existence but as the right to live with human dignity, expanding the scope of fundamental rights significantly.",
    importance: "High"
  },
  {
    id: 3,
    title: "Vishaka vs State of Rajasthan",
    citation: "AIR 1997 SC 3011",
    court: "Supreme Court",
    date: "August 13, 1997",
    category: "Labor & Employment",
    summary: "This landmark judgment laid down guidelines to prevent sexual harassment of women at workplaces, which later formed the basis for the Sexual Harassment of Women at Workplace Act, 2013.",
    importance: "Medium"
  },
  {
    id: 4,
    title: "Olga Tellis vs Bombay Municipal Corporation",
    citation: "AIR 1986 SC 180",
    court: "Supreme Court",
    date: "July 10, 1985",
    category: "Constitutional",
    summary: "The court recognized that the right to livelihood is included within the 'right to life' under Article 21, noting that evicting a person from a pavement or slum affects their livelihood.",
    importance: "Medium"
  },
  {
    id: 5,
    title: "Justice K.S. Puttaswamy vs Union of India",
    citation: "AIR 2017 SC 4161",
    court: "Supreme Court",
    date: "August 24, 2017",
    category: "Constitutional",
    summary: "The Supreme Court recognized the right to privacy as a fundamental right under Article 21 of the Indian Constitution, with significant implications for data protection and personal liberty.",
    importance: "High"
  },
  {
    id: 6,
    title: "Mohd. Ahmed Khan vs Shah Bano Begum",
    citation: "AIR 1985 SC 945",
    court: "Supreme Court",
    date: "April 23, 1985",
    category: "Family",
    summary: "The court ruled that a Muslim woman has the right to maintenance under Section 125 of CrPC after divorce, which led to significant political debate and the passage of the Muslim Women (Protection of Rights on Divorce) Act, 1986.",
    importance: "High"
  }
];

const LandmarkCases = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden mr-2">
                    <MenuIcon className="h-5 w-5" />
                  </Button>
                </SidebarTrigger>
                
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
                <SearchBar />
              </div>
            </div>
            
            <Tabs defaultValue="constitutional" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="constitutional">Constitutional</TabsTrigger>
                <TabsTrigger value="criminal">Criminal</TabsTrigger>
                <TabsTrigger value="civil">Civil</TabsTrigger>
                <TabsTrigger value="all">All Categories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="constitutional" className="mt-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {landmarkCases
                    .filter(c => c.category === "Constitutional")
                    .map((caseData) => (
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
                            <Badge variant={caseData.importance === 'High' ? 'default' : 'outline'} className="text-xs">
                              {caseData.importance}
                            </Badge>
                          </div>
                          
                          <p className="text-sm">{caseData.summary}</p>
                          
                          <div className="mt-4 flex justify-end">
                            <Button size="sm">View Full Case</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="criminal" className="mt-2">
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No landmark criminal cases found in this view.</p>
                  <Button variant="outline" className="mt-4">View All Cases</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="civil" className="mt-2">
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No landmark civil cases found in this view.</p>
                  <Button variant="outline" className="mt-4">View All Cases</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="all" className="mt-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {landmarkCases.map((caseData) => (
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
                          <Button size="sm">View Full Case</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default LandmarkCases;

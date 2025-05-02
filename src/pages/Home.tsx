import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { MenuIcon, Search, ArrowUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import SearchBar from '@/components/SearchBar';
import LatestCases from '@/components/LatestCases';
import LegalNews from '@/components/LegalNews';
import PromptSearch from '@/components/PromptSearch';

const Home = () => {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="md:hidden">
                <SidebarTrigger />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary mx-auto">Courtwise AI</h1>
              
              <div className="hidden md:block">
                <LiveDateTime />
              </div>
            </div>
          </header>
          
          <div className="flex flex-1">
            <div className="w-full lg:w-3/4 p-4 md:p-6">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-serif mb-2">Welcome to Courtwise AI</h2>
                <p className="text-muted-foreground mb-8">Access a comprehensive library of Indian court cases and judgments with professional case notes and export capabilities.</p>
                
                <PromptSearch />
              </div>
              
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
                    </div>
                    <h3 className="text-lg font-serif font-semibold mb-2">Fast Search</h3>
                    <p className="text-sm text-muted-foreground">Search across all Indian court cases and judgments by categories, keywords, and more.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 17h6"/><path d="M9 13h6"/></svg>
                    </div>
                    <h3 className="text-lg font-serif font-semibold mb-2">Exportable Case Notes</h3>
                    <p className="text-sm text-muted-foreground">Create and export professional case notes in various formats for your reference.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-border flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><path d="M12 8v4l2 2"/></svg>
                    </div>
                    <h3 className="text-lg font-serif font-semibold mb-2">Real-time Updates</h3>
                    <p className="text-sm text-muted-foreground">Stay informed with the latest case updates and personalized legal news.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-serif">Featured Landmark Cases</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Kesavananda Bharati vs State of Kerala",
                      citation: "AIR 1973 SC 1461",
                      court: "Supreme Court",
                      date: "April 24, 1973",
                      category: "Constitutional",
                      summary: "The Supreme Court established the doctrine of the 'basic structure' of the Constitution, ruling that Parliament cannot amend the Constitution in a way that destroys its basic or essential features."
                    },
                    {
                      title: "Vishaka vs State of Rajasthan",
                      citation: "AIR 1997 SC 3011",
                      court: "Supreme Court",
                      date: "August 13, 1997",
                      category: "Labor & Employment",
                      summary: "This landmark judgment laid down guidelines to prevent sexual harassment of women at workplaces, which later formed the basis for the Sexual Harassment of Women at Workplace Act, 2013."
                    },
                    {
                      title: "Justice K.S. Puttaswamy vs Union of India",
                      citation: "AIR 2017 SC 4161",
                      court: "Supreme Court",
                      date: "August 24, 2017",
                      category: "Constitutional",
                      summary: "The Supreme Court recognized the right to privacy as a fundamental right under Article 21 of the Indian Constitution, with significant implications for data protection and personal liberty."
                    }
                  ].map((caseData, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-border p-4">
                      <div className="mb-3">
                        <h3 className="font-serif font-semibold">{caseData.title}</h3>
                        <p className="text-xs text-muted-foreground">{caseData.citation}</p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-xs">
                          <span className="text-muted-foreground">{caseData.court}</span>
                          <span className="mx-1">•</span>
                          <span className="text-muted-foreground">{caseData.date}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{caseData.category}</Badge>
                      </div>
                      <p className="text-sm line-clamp-3">{caseData.summary}</p>
                      <div className="mt-4">
                        <Button size="sm" variant="default" className="w-full">View Case</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className={`lg:w-1/4 bg-secondary border-l border-border transition-all duration-300 ${rightSidebarOpen ? 'block' : 'hidden'}`}>
              <div className="p-4 sticky top-0">
                <div className="md:hidden mb-4">
                  <LiveDateTime />
                </div>
                
                <div className="mb-6">
                  <SearchBar />
                </div>
                
                <div className="space-y-6">
                  <LatestCases />
                  <LegalNews />
                </div>
                
                <div className="lg:hidden mt-4 text-center">
                  <Button
                    variant="ghost" 
                    size="sm"
                    onClick={() => setRightSidebarOpen(false)}
                  >
                    Close Sidebar
                  </Button>
                </div>
              </div>
            </div>
            
            {!rightSidebarOpen && (
              <div className="hidden lg:hidden fixed bottom-4 right-4">
                <Button 
                  className="rounded-full h-12 w-12 shadow-lg" 
                  onClick={() => setRightSidebarOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M15 9h.01"/><path d="M15 15h.01"/><path d="M9 9h.01"/><path d="M9 15h.01"/></svg>
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Home;

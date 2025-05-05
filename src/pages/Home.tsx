
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
import LandmarkCasesSection from '@/components/LandmarkCasesSection';
import { useUser } from '@/context/UserContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const { isLoggedIn, userRole } = useUser();
  const [showPromptFocus, setShowPromptFocus] = useState(false);

  // Handle animation for prompt search focus
  const handlePromptFocus = () => {
    setShowPromptFocus(true);
  };

  const handlePromptBlur = () => {
    setShowPromptFocus(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col">
          <header className="sticky top-0 z-30 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
              <div className="md:hidden">
                <SidebarTrigger>
                  <Button variant="ghost" size="icon">
                    <MenuIcon className="h-5 w-5" />
                  </Button>
                </SidebarTrigger>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary mx-auto">Courtwise AI</h1>
              
              <div className="hidden md:block">
                <LiveDateTime />
              </div>
            </div>
          </header>
          
          <div className="flex flex-1">
            <div className="w-full p-4 md:p-6 transition-all duration-300">
              <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-serif mb-2">Welcome to Courtwise AI</h2>
                <p className="text-muted-foreground mb-8">Access a comprehensive library of Indian court cases and judgments with professional case notes and export capabilities.</p>
                
                <div 
                  onFocus={handlePromptFocus} 
                  onBlur={handlePromptBlur}
                >
                  <PromptSearch />
                </div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-serif">Landmark Cases</h2>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-border p-4">
                    <p className="text-sm mb-4">
                      Explore significant court cases that have shaped legal precedent and jurisprudence in India. 
                      These landmark judgments represent pivotal moments in legal history.
                    </p>
                    <Button className="w-full" onClick={() => {
                      const element = document.getElementById('landmark-cases');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}>
                      View Landmark Cases
                    </Button>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-serif">Explore Cases</h2>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/explore">View All</Link>
                    </Button>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border border-border p-4">
                    <p className="text-sm mb-4">
                      Browse through our extensive collection of regular court cases organized by categories. 
                      Search the database or access external sources via Indian Kanoon integration.
                    </p>
                    <Button className="w-full" asChild>
                      <Link to="/explore">Explore Case Database</Link>
                    </Button>
                  </div>
                </div>
              </div>
              
              <LandmarkCasesSection />
            </div>
            
            {rightSidebarOpen && (
              <div className="hidden lg:block lg:w-1/4 bg-secondary border-l border-border transition-all duration-300">
                <div className="p-4 sticky top-0">
                  <div className="mb-6">
                    <SearchBar />
                  </div>
                  
                  <div className="space-y-6">
                    <LatestCases />
                    <LegalNews />
                  </div>
                </div>
              </div>
            )}
            
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

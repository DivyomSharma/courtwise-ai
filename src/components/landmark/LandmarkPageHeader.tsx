
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MenuIcon } from 'lucide-react';
import LiveDateTime from '@/components/LiveDateTime';

const LandmarkPageHeader = () => {
  const navigate = useNavigate();
  
  return (
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
  );
};

export default LandmarkPageHeader;

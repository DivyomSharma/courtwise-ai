
import React, { useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MenuIcon, Loader2 } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import { useUser } from '@/context/UserContext';
import { useNavigate } from 'react-router-dom';

// Import the new component files
import UserAccountCard from '@/components/profile/UserAccountCard';
import ProfessionalInfoForm from '@/components/profile/ProfessionalInfoForm';
import SubscriptionPlanCards from '@/components/profile/SubscriptionPlanCards';

const UserProfile = () => {
  const { isLoggedIn, user, loading } = useUser();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn && !loading) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate, loading]);

  if (loading || !isLoggedIn || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
                
                <h1 className="text-xl md:text-2xl font-serif font-bold">Your Profile</h1>
              </div>
              
              <div className="hidden md:block">
                <LiveDateTime />
              </div>
            </div>
          </header>
          
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* User account details card */}
              <div className="lg:col-span-1">
                <UserAccountCard />
              </div>
              
              {/* Professional information form */}
              <div className="lg:col-span-2">
                <ProfessionalInfoForm />
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Subscription plans */}
            <SubscriptionPlanCards />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UserProfile;

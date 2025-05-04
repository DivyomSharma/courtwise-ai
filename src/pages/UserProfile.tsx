
import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MenuIcon, Edit2, CreditCard, LogOut, Loader2, CheckCircle } from 'lucide-react';
import AppSidebar from '@/components/AppSidebar';
import LiveDateTime from '@/components/LiveDateTime';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const UserProfile = () => {
  const { isLoggedIn, user, profile, userRole, userName, logout } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const [isManageSubscriptionLoading, setIsManageSubscriptionLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
    }
  }, [isLoggedIn, navigate]);
  
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCheckout = async (plan: 'subscriber' | 'admin') => {
    setIsSubscriptionLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan }
      });
      
      if (error || !data.url) {
        throw new Error(error || 'Failed to create checkout session');
      }
      
      window.location.href = data.url;
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: "There was a problem starting the checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscriptionLoading(false);
    }
  };
  
  const handleManageSubscription = async () => {
    if (userRole === 'free') return;
    
    setIsManageSubscriptionLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error || !data.url) {
        throw new Error(error || 'Failed to create customer portal session');
      }
      
      window.location.href = data.url;
    } catch (error) {
      console.error('Customer portal error:', error);
      toast({
        title: "Failed to open subscription manager",
        description: "There was a problem accessing your subscription details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsManageSubscriptionLoading(false);
    }
  };

  if (!isLoggedIn || !user) {
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
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">User Profile</CardTitle>
                  <CardDescription>Your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-medium">{userName}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Account Type</span>
                      <Badge variant={userRole === 'admin' ? 'default' : userRole === 'subscriber' ? 'secondary' : 'outline'}>
                        {userRole === 'admin' ? 'Admin' : userRole === 'subscriber' ? 'Premium' : 'Free'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Member Since</span>
                      <span className="text-sm">
                        {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
                    View Dashboard
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleSignOut} 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing Out...
                      </>
                    ) : (
                      <>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Subscription Plans</CardTitle>
                  <CardDescription>Manage your subscription and payment details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Free Plan */}
                    <Card className={`border ${userRole === 'free' ? 'border-primary ring-1 ring-primary' : ''}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg font-serif">Free</CardTitle>
                          {userRole === 'free' && (
                            <Badge variant="outline" className="bg-primary/10 text-xs">Your Plan</Badge>
                          )}
                        </div>
                        <CardDescription>Basic access</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2 pb-4">
                        <div className="font-bold text-2xl mb-4">$0<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            1 case note per day
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            Basic search
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    {/* Premium Plan */}
                    <Card className={`border ${userRole === 'subscriber' ? 'border-primary ring-1 ring-primary' : ''}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg font-serif">Premium</CardTitle>
                          {userRole === 'subscriber' && (
                            <Badge variant="outline" className="bg-primary/10 text-xs">Your Plan</Badge>
                          )}
                        </div>
                        <CardDescription>Full access</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2 pb-4">
                        <div className="font-bold text-2xl mb-4">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            Unlimited case notes
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            Advanced search
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            Export in all formats
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        {userRole === 'subscriber' ? (
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={handleManageSubscription}
                            disabled={isManageSubscriptionLoading}
                          >
                            {isManageSubscriptionLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                              </>
                            ) : (
                              <>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Manage Subscription
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button 
                            className="w-full" 
                            onClick={() => handleCheckout('subscriber')}
                            disabled={isSubscriptionLoading}
                          >
                            {isSubscriptionLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Subscribe Now"
                            )}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                    
                    {/* Admin Plan */}
                    <Card className={`border ${userRole === 'admin' ? 'border-primary ring-1 ring-primary' : ''}`}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg font-serif">Admin</CardTitle>
                          {userRole === 'admin' && (
                            <Badge variant="outline" className="bg-primary/10 text-xs">Your Plan</Badge>
                          )}
                        </div>
                        <CardDescription>Full control</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2 pb-4">
                        <div className="font-bold text-2xl mb-4">$29.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            All Premium features
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            Admin dashboard
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            Content management
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter>
                        {userRole === 'admin' ? (
                          <Button 
                            variant="outline" 
                            className="w-full" 
                            onClick={handleManageSubscription}
                            disabled={isManageSubscriptionLoading}
                          >
                            {isManageSubscriptionLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Loading...
                              </>
                            ) : (
                              <>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Manage Subscription
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button 
                            className="w-full"
                            onClick={() => handleCheckout('admin')}
                            disabled={isSubscriptionLoading}
                          >
                            {isSubscriptionLoading ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Get Admin Access"
                            )}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </div>
                  
                  {(userRole === 'subscriber' || userRole === 'admin') && (
                    <div className="bg-muted p-4 rounded-md">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-medium">Current Subscription</h4>
                          <p className="text-sm text-muted-foreground">Manage your billing and payment details</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={handleManageSubscription}
                          disabled={isManageSubscriptionLoading}
                        >
                          {isManageSubscriptionLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Loading...
                            </>
                          ) : (
                            <>
                              <CreditCard className="mr-2 h-4 w-4" />
                              Manage Payment
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Separator className="my-8" />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-serif">Account Settings</CardTitle>
                <CardDescription>Update your profile and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-sm mb-2">Personal Information</h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p>{profile?.full_name || userName || 'Not set'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email Address</p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-sm mb-2">Email Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="marketing" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                        <label htmlFor="marketing" className="text-sm">Receive marketing emails</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="updates" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                        <label htmlFor="updates" className="text-sm">Receive product updates</label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-sm mb-2">Communication Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="email" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                      <label htmlFor="email" className="text-sm">Email notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="browser" className="rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                      <label htmlFor="browser" className="text-sm">Browser notifications</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="mobile" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <label htmlFor="mobile" className="text-sm">Mobile notifications</label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" disabled>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Update Settings
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default UserProfile;

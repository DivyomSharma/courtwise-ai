
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SubscriptionPlanCards = () => {
  const { userRole } = useUser();
  const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(false);
  const [isManageSubscriptionLoading, setIsManageSubscriptionLoading] = useState(false);
  const { toast } = useToast();

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

  return (
    <Card className="mb-8">
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
  );
};

export default SubscriptionPlanCards;

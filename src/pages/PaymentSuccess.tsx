
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoggedIn } = useUser();
  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth');
      return;
    }
    
    const checkSubscription = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) {
          console.error('Error checking subscription:', error);
          return;
        }
        
        if (data.subscribed) {
          toast({
            title: "Subscription confirmed",
            description: `Your ${data.role} access has been activated.`,
          });
        }
      } catch (err) {
        console.error('Error checking subscription status:', err);
      }
    };
    
    checkSubscription();
  }, [isLoggedIn, navigate, toast]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl font-serif">Payment Successful!</CardTitle>
          <CardDescription>Your subscription has been processed successfully.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            Thank you for subscribing to Courtwise AI. Your account has been upgraded and you now have access to premium features.
          </p>
          <div className="bg-muted/50 p-4 rounded-md my-2">
            <h4 className="font-medium">Your Premium Benefits:</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• Unlimited case notes access</li>
              <li>• Export to multiple formats</li>
              <li>• Advanced search features</li>
              <li>• Priority support</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => navigate('/profile')}
          >
            View Your Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess;

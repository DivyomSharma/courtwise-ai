
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertCircle, Check } from 'lucide-react';
import { checkIndianKanoonApiKey } from '@/utils/indianKanoonApi';

interface IndianKanoonApiSetupProps {
  onSetupComplete?: () => void;
}

const IndianKanoonApiSetup: React.FC<IndianKanoonApiSetupProps> = ({ onSetupComplete }) => {
  const [loading, setLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);
  
  useEffect(() => {
    const checkApiConfig = async () => {
      try {
        setLoading(true);
        const configured = await checkIndianKanoonApiKey();
        setIsConfigured(configured);
        
        if (configured && onSetupComplete) {
          onSetupComplete();
        }
      } catch (error) {
        console.error('Error checking API configuration:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkApiConfig();
  }, [onSetupComplete]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Indian Kanoon API Setup</CardTitle>
        <CardDescription>
          Configure the Indian Kanoon API integration to access real court cases
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : isConfigured ? (
          <Alert className="bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-700" />
            <AlertTitle className="text-green-700">API Configured</AlertTitle>
            <AlertDescription>
              Indian Kanoon API is properly configured and ready to use.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <Alert className="bg-yellow-50 border-yellow-200 mb-4">
              <AlertCircle className="h-4 w-4 text-yellow-700" />
              <AlertTitle className="text-yellow-700">API Key Required</AlertTitle>
              <AlertDescription>
                To access real Indian court cases via Indian Kanoon, you need to configure an API key.
                Please contact Indian Kanoon to get your API key and then set it up below.
              </AlertDescription>
            </Alert>
            
            <div className="text-sm space-y-2">
              <p>To set up the Indian Kanoon API key:</p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Contact Indian Kanoon to obtain an API key</li>
                <li>Configure the key in your Supabase secrets with the name <code>INDIAN_KANOON_API_TOKEN</code></li>
                <li>Restart your Supabase Edge Functions</li>
              </ol>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <a 
            href="http://api.indiankanoon.org/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Indian Kanoon API Docs
          </a>
        </Button>
        
        {!loading && !isConfigured && (
          <Button>Configure API Key</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default IndianKanoonApiSetup;

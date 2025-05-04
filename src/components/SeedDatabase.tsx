
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const SeedDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSeedDatabase = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('seed-data', {
        body: { secretKey: 'courtwise-seed-key' }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Database Seeded",
        description: data.message,
      });
    } catch (error: any) {
      console.error('Seed error:', error);
      toast({
        title: "Seeding Failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Initialize Database</CardTitle>
        <CardDescription>
          Populate the database with sample cases to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Click the button below to add sample case data to your database. This will add 
          landmark cases like Kesavananda Bharati, Maneka Gandhi, Vishaka, and more.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSeedDatabase} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Seeding Database...
            </>
          ) : (
            "Seed Database with Sample Cases"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SeedDatabase;

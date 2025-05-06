
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface CaseUpdate {
  id: string;
  title: string;
  court: string;
  date: string;
  category: string;
  url?: string;
}

const LatestCases = () => {
  const [caseUpdates, setCaseUpdates] = useState<CaseUpdate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestCases();
    
    // Set up real-time subscription for live updates
    const channel = supabase
      .channel('public:cases')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'cases' 
        }, 
        (payload) => {
          fetchLatestCases();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLatestCases = async () => {
    try {
      // First try to fetch from our database
      let { data, error } = await supabase
        .from('cases')
        .select('id, title, court, date, category')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setCaseUpdates(data);
      } else {
        // If no recent cases in our database, fetch from LiveLaw.in via edge function
        const { data: liveCases, error: liveError } = await supabase.functions.invoke('fetch-news', {
          body: { source: 'livelaw', type: 'cases' }
        });
        
        if (liveError) throw liveError;
        
        if (liveCases && liveCases.cases) {
          setCaseUpdates(liveCases.cases);
          
          // Store fetched cases in our database for future access
          if (liveCases.cases.length > 0) {
            // Convert to the format our database expects
            const casesForStorage = liveCases.cases.map((item: any) => ({
              title: item.title,
              court: item.court || 'Unknown Court',
              date: item.date || new Date().toISOString().split('T')[0],
              category: item.category || 'General',
              summary: item.summary || item.title,
              citation: item.citation || '',
              url: item.url
            }));
            
            await supabase.from('cases').insert(casesForStorage);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching latest cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif">Latest Cases</CardTitle>
        <CardDescription>Recently updated judgments from LiveLaw.in</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : caseUpdates.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-2">No recent case updates</p>
        ) : (
          caseUpdates.map((item) => (
            <div key={item.id} className="border-b pb-2 last:border-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div>
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group">
                      <p className="font-medium text-sm group-hover:text-primary transition-colors">{item.title}</p>
                    </a>
                  ) : (
                    <Link to={`/case/${item.id}`} className="group">
                      <p className="font-medium text-sm group-hover:text-primary transition-colors">{item.title}</p>
                    </Link>
                  )}
                  <p className="text-xs text-muted-foreground">{item.court} • {formatDate(item.date)}</p>
                </div>
                <Badge variant="outline" className="text-xs">{item.category}</Badge>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default LatestCases;

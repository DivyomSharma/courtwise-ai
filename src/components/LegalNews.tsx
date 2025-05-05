
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  published_date: string;
  url?: string;
}

const LegalNews = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLegalNews();
    
    // Set up real-time subscription for live updates
    const channel = supabase
      .channel('public:legal_news')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'legal_news' 
        }, 
        (payload) => {
          fetchLegalNews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLegalNews = async () => {
    try {
      const { data, error } = await supabase
        .from('legal_news')
        .select('id, title, source, published_date, url')
        .order('published_date', { ascending: false })
        .limit(3);
      
      if (error) {
        throw error;
      }

      if (data) {
        setNewsItems(data);
      }
    } catch (error) {
      console.error('Error fetching legal news:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'Recently';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif">Legal News</CardTitle>
        <CardDescription>Personalized for you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : newsItems.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-2">No recent news</p>
        ) : (
          newsItems.map((item) => (
            <div key={item.id} className="border-b pb-2 last:border-0 last:pb-0">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="group">
                  <p className="font-medium text-sm group-hover:text-primary transition-colors">{item.title}</p>
                </a>
              ) : (
                <p className="font-medium text-sm">{item.title}</p>
              )}
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-muted-foreground">{item.source}</span>
                <span className="text-xs text-muted-foreground">{getTimeAgo(item.published_date)}</span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default LegalNews;

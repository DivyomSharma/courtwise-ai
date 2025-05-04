
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  content?: string;
  url?: string;
  published_date: string;
  created_at: string;
}

const BreakingNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBreakingNews();
    
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
          fetchBreakingNews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchBreakingNews = async () => {
    try {
      const { data, error } = await supabase
        .from('legal_news')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(10);
      
      if (error) {
        console.error('Error fetching breaking news:', error);
        return;
      }
      
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching breaking news:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="flex justify-between mt-2">
                <div className="h-3 bg-muted rounded w-1/4"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground">No breaking news at the moment</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-150px)]">
      <div className="flex items-center mb-2">
        <Badge variant="destructive" className="animate-pulse mr-2">LIVE</Badge>
        <p className="text-sm text-muted-foreground">Updates in real-time</p>
      </div>
      
      {news.map((item, index) => (
        <Card key={item.id} className={index === 0 ? "border-red-500" : ""}>
          <CardContent className="p-4">
            {index === 0 && (
              <div className="flex items-center gap-1 mb-1">
                <AlertTriangle size={14} className="text-red-500" />
                <span className="text-xs font-medium text-red-500">BREAKING</span>
              </div>
            )}
            
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="group">
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </a>
            ) : (
              <h3 className="font-medium">{item.title}</h3>
            )}
            
            {item.content && (
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {item.content}
              </p>
            )}
            
            <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
              <span>{item.source}</span>
              <span>{formatDate(item.published_date)}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BreakingNews;

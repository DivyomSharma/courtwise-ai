
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  published_date: string;
  url?: string;
}

interface CaseItem {
  id: string;
  title: string;
  court: string;
  date: string;
  category: string;
  url?: string;
}

serve(async (req) => {
  try {
    const { source, type = 'news' } = await req.json();
    
    // Currently only supporting LiveLaw.in
    if (source !== 'livelaw') {
      return new Response(JSON.stringify({ error: 'Source not supported' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    // Different URL based on the type
    const url = type === 'cases' 
      ? 'https://www.livelaw.in/cj-stories/supreme-court-judgments/'
      : 'https://www.livelaw.in/top-stories/';

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch from LiveLaw.in: ${response.status}`);
    }

    const html = await response.text();
    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');

    if (!document) {
      throw new Error('Failed to parse HTML');
    }

    if (type === 'cases') {
      // Parse cases
      const caseArticles = document.querySelectorAll('article.item-list');
      const cases: CaseItem[] = Array.from(caseArticles).slice(0, 5).map((article, index) => {
        const titleElement = article.querySelector('h2.post-title a');
        const dateElement = article.querySelector('.date');
        
        let court = 'Supreme Court';
        if (url.includes('high-court')) {
          court = 'High Court';
        }
        
        const articleUrl = titleElement?.getAttribute('href') || '';
        
        return {
          id: `livelaw-case-${index}`,
          title: titleElement?.textContent?.trim() || `Case Update ${index + 1}`,
          court,
          date: dateElement?.textContent?.trim() || new Date().toISOString().split('T')[0],
          category: 'Judgment',
          url: articleUrl,
        };
      });

      return new Response(JSON.stringify({ cases }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      // Parse news
      const newsArticles = document.querySelectorAll('article.item-list');
      const news: NewsItem[] = Array.from(newsArticles).slice(0, 5).map((article, index) => {
        const titleElement = article.querySelector('h2.post-title a');
        const dateElement = article.querySelector('.date');
        const articleUrl = titleElement?.getAttribute('href') || '';
        
        return {
          id: `livelaw-news-${index}`,
          title: titleElement?.textContent?.trim() || `News Update ${index + 1}`,
          source: 'LiveLaw.in',
          published_date: dateElement?.textContent?.trim() || new Date().toISOString(),
          url: articleUrl,
        };
      });

      return new Response(JSON.stringify({ news }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in fetch-news function:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch news',
      details: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

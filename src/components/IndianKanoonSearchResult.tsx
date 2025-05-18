
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { IKDocument } from '@/utils/indianKanoonApi';

interface IndianKanoonSearchResultProps {
  document: IKDocument;
  query: string;
}

const IndianKanoonSearchResult: React.FC<IndianKanoonSearchResultProps> = ({ document, query }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="mb-2">
        <h3 className="font-serif font-semibold text-lg line-clamp-2" 
            dangerouslySetInnerHTML={{ __html: document.title }} />
      </div>
      
      <div className="mb-2 text-sm">
        <span className="text-muted-foreground">{document.docsource}</span>
        {document.docsize && (
          <>
            <span className="mx-1.5">•</span>
            <span className="text-muted-foreground">
              Document size: {Math.round(document.docsize / 1000)}K chars
            </span>
          </>
        )}
      </div>
      
      <div className="mb-3">
        <div 
          className="text-sm line-clamp-3" 
          dangerouslySetInnerHTML={{ __html: document.headline }} 
        />
      </div>
      
      <div className="flex justify-between items-center">
        <Badge variant="outline">Indian Kanoon</Badge>
        <div className="space-x-2">
          {document.url ? (
            <Button size="sm" variant="outline" asChild>
              <a href={document.url} target="_blank" rel="noopener noreferrer">
                View Original
              </a>
            </Button>
          ) : null}
          
          <Button size="sm" asChild>
            <Link to={`/kanoon/doc/${document.tid}?q=${encodeURIComponent(query)}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default IndianKanoonSearchResult;

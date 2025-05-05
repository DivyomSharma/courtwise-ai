
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CaseSearchResult, formatCaseDate } from '@/utils/caseHelpers';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ExternalLink } from 'lucide-react';

interface CaseResultsListProps {
  cases: CaseSearchResult[];
  loading: boolean;
}

const CaseResultsList: React.FC<CaseResultsListProps> = ({ cases, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>
              <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-medium mb-2">No cases found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or select a different category.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {cases.map((caseItem) => (
        <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between">
              <div>
                <h3 className="font-serif font-medium mb-1">
                  <Link 
                    to={`/case/${caseItem.id}`} 
                    className="hover:text-primary transition-colors"
                  >
                    {caseItem.title}
                  </Link>
                </h3>
                <p className="text-xs text-muted-foreground mb-1">{caseItem.citation}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-muted-foreground">{caseItem.court}</span>
                  <span className="text-xs">•</span>
                  <span className="text-xs text-muted-foreground">{formatCaseDate(caseItem.date)}</span>
                </div>
              </div>
              
              <Badge 
                variant="outline" 
                className="self-start md:self-auto mt-2 md:mt-0"
              >
                {caseItem.category}
              </Badge>
            </div>
            
            <p className="text-sm mb-3 line-clamp-2">{caseItem.summary}</p>
            
            <div className="flex items-center justify-end space-x-2 mt-2">
              <Button variant="outline" size="sm" asChild>
                <a href={`https://indiankanoon.org/doc/${caseItem.id.split('-')[0]}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Source
                </a>
              </Button>
              
              <Button size="sm" asChild>
                <Link to={`/case/${caseItem.id}`}>
                  <FileText className="h-3 w-3 mr-1" />
                  View Details
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CaseResultsList;

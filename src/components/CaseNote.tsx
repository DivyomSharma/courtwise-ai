
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Star } from 'lucide-react';

interface CaseNoteProps {
  id?: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  category: string;
  summary: string;
}

const CaseNote = ({ 
  id = 'default-case',
  title, 
  citation, 
  court, 
  date, 
  category, 
  summary 
}: CaseNoteProps) => {
  // Generate a URL-friendly ID from the title if none is provided
  const caseId = id === 'default-case' 
    ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    : id;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-serif font-semibold line-clamp-2">{title}</h3>
          <p className="text-xs text-muted-foreground">{citation}</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-500">
          <Star className="h-4 w-4" />
          <span className="sr-only">Favorite</span>
        </Button>
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs">
          <span className="text-muted-foreground">{court}</span>
          <span className="mx-1">•</span>
          <span className="text-muted-foreground">{date}</span>
        </div>
        <Badge variant="outline" className="text-xs">{category}</Badge>
      </div>
      
      <p className="text-sm line-clamp-3 mb-4">{summary}</p>
      
      <div className="flex items-center justify-between">
        <Button size="sm" variant="outline" className="text-xs">
          <FileText className="h-3 w-3 mr-1" />
          Export Note
        </Button>
        
        <Button 
          size="sm" 
          variant="default" 
          asChild
          className="text-xs"
        >
          <Link to={`/case/${caseId}`}>View Case</Link>
        </Button>
      </div>
    </div>
  );
};

export default CaseNote;

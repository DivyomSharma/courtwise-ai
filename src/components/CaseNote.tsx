
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

interface CaseNoteProps {
  title: string;
  citation: string;
  court: string;
  date: string;
  category: string;
  summary: string;
}

const CaseNote = ({ title, citation, court, date, category, summary }: CaseNoteProps) => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-serif">{title}</CardTitle>
            <CardDescription className="text-sm">{citation}</CardDescription>
          </div>
          <Badge className="ml-2">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs mb-3 flex items-center">
          <span className="text-muted-foreground">{court}</span>
          <span className="mx-1.5">•</span>
          <span className="text-muted-foreground">{date}</span>
        </div>
        <p className="text-sm line-clamp-3">{summary}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button size="sm" variant="outline" className="text-xs ml-auto">
          <FileDown className="mr-1 h-3 w-3" />
          Export Notes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CaseNote;

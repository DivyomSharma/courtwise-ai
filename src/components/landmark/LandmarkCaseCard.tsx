
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LandmarkCase } from '@/utils/landmarkCasesData';

interface LandmarkCaseCardProps {
  caseData: LandmarkCase;
}

const LandmarkCaseCard = ({ caseData }: LandmarkCaseCardProps) => {
  return (
    <Card key={caseData.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-1.5 bg-primary"></div>
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-serif font-semibold text-lg">{caseData.title}</h3>
          <p className="text-xs text-muted-foreground">{caseData.citation}</p>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs">
            <span className="text-muted-foreground">{caseData.court}</span>
            <span className="mx-1.5">•</span>
            <span className="text-muted-foreground">{caseData.date}</span>
          </div>
          <Badge variant="outline" className="text-xs">{caseData.category}</Badge>
        </div>
        
        <p className="text-sm line-clamp-3">{caseData.summary}</p>
        
        <div className="mt-4 flex justify-end">
          <Button size="sm" asChild>
            <Link to={`/case/${caseData.id}`}>View Full Case</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LandmarkCaseCard;

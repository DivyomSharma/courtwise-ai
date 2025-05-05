
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LANDMARK_CASES } from '@/utils/landmarkCasesData';

const FeaturedCases = () => {
  // Use the first 3 landmark cases as featured cases
  const featuredCases = LANDMARK_CASES.slice(0, 3);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif">Featured Cases</h2>
        <Button variant="link" asChild>
          <Link to="/landmark-cases">View All Landmark Cases</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuredCases.map((caseData) => (
          <Card key={caseData.id} className="bg-white rounded-lg shadow-sm border border-border p-4">
            <div className="mb-3">
              <h3 className="font-serif font-semibold">{caseData.title}</h3>
              <p className="text-xs text-muted-foreground">{caseData.citation}</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs">
                <span className="text-muted-foreground">{caseData.court}</span>
                <span className="mx-1">•</span>
                <span className="text-muted-foreground">{caseData.date}</span>
              </div>
              <Badge variant="outline" className="text-xs">{caseData.category}</Badge>
            </div>
            <p className="text-sm line-clamp-3">{caseData.summary}</p>
            <div className="mt-4">
              <Button size="sm" variant="default" className="w-full" asChild>
                <Link to={`/case/${caseData.id}`}>View Case</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCases;

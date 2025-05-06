
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { LANDMARK_CASES } from '@/utils/landmarkCasesData';
import { Loader2 } from 'lucide-react';

const LandmarkCasesSection = () => {
  const [loading, setLoading] = useState(false);
  // Display only first 6 cases on home page
  const displayCases = LANDMARK_CASES.slice(0, 6);

  return (
    <div id="landmark-cases" className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-serif font-bold mb-2">Landmark Cases</h2>
            <p className="text-muted-foreground">Historic and influential court rulings that shaped Indian law</p>
          </div>
          <Button variant="default" asChild>
            <Link to="/landmark-cases">View All Cases</Link>
          </Button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCases.map((caseData) => (
              <Card key={caseData.id} className="overflow-hidden">
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
                      <Link to={`/case/${caseData.id}`}>View Case</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandmarkCasesSection;


import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { LANDMARK_CASES } from '@/utils/landmarkCasesData';
import { Loader2 } from 'lucide-react';
import { getLandmarkCasesForHome } from '@/utils/caseHelpers';

const LandmarkCasesSection = () => {
  const [loading, setLoading] = useState(false);
  
  // Get landmark cases - either from predefined data or generated
  // Display first 50 cases on home page
  const displayCases = useMemo(() => {
    // If we have less than 50 predefined cases, supplement with generated ones
    return LANDMARK_CASES.length >= 50 
      ? LANDMARK_CASES.slice(0, 50) 
      : [...LANDMARK_CASES, ...getLandmarkCasesForHome(50 - LANDMARK_CASES.length)];
  }, []);

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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCases.slice(0, 6).map((caseData) => (
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
                        <Link to={`/case/${caseData.id}`}>View Case</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            {displayCases.length > 6 && (
              <div className="mt-8 text-center">
                <Button variant="outline" asChild>
                  <Link to="/landmark-cases">View All {displayCases.length} Landmark Cases</Link>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LandmarkCasesSection;

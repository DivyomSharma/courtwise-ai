
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LandmarkCaseCard from './LandmarkCaseCard';
import { LandmarkCase } from '@/utils/landmarkCasesData';

interface LandmarkCaseResultsProps {
  loading: boolean;
  filteredCases: LandmarkCase[];
  searchQuery: string;
  activeCategory: string;
  onResetFilters: () => void;
}

const LandmarkCaseResults = ({ 
  loading, 
  filteredCases, 
  searchQuery, 
  activeCategory, 
  onResetFilters 
}: LandmarkCaseResultsProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (filteredCases.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">No cases found</h3>
        <p className="text-muted-foreground mb-6">
          {searchQuery 
            ? `No results found for "${searchQuery}" in ${activeCategory === 'all' ? 'any category' : `the ${activeCategory} category`}` 
            : `No cases found in the ${activeCategory} category`}
        </p>
        <Button variant="outline" onClick={onResetFilters}>
          View All Cases
        </Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {filteredCases.map((caseData) => (
        <LandmarkCaseCard key={caseData.id} caseData={caseData} />
      ))}
    </div>
  );
};

export default LandmarkCaseResults;

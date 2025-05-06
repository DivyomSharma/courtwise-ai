
import React from 'react';
import CaseSearch from '@/components/IndianKanoonSearch';
import { CaseSearchResult } from '@/utils/caseHelpers';

interface ExploreSearchSectionProps {
  onSearchResults: (results: CaseSearchResult[]) => void;
  onSearchLoading: (isLoading: boolean) => void;
}

const ExploreSearchSection: React.FC<ExploreSearchSectionProps> = ({ 
  onSearchResults, 
  onSearchLoading 
}) => {
  return (
    <div className="mb-6">
      <CaseSearch 
        onSearchResults={onSearchResults}
        onSearchLoading={onSearchLoading}
      />
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Search our comprehensive case database
      </p>
    </div>
  );
};

export default ExploreSearchSection;

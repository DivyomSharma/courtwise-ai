
import React from 'react';
import { Separator } from '@/components/ui/separator';
import CaseResultsList from '@/components/CaseResultsList';
import CaseCategories from '@/components/CaseCategories';
import { CaseSearchResult } from '@/utils/caseHelpers';

interface ExploreResultsSectionProps {
  searchResults: CaseSearchResult[];
  loading: boolean;
  searchQuery: string | null;
  selectedCategory: string | undefined;
  onCategorySelect: (category: string) => void;
}

const ExploreResultsSection: React.FC<ExploreResultsSectionProps> = ({
  searchResults,
  loading,
  searchQuery,
  selectedCategory,
  onCategorySelect
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <CaseCategories 
          onSelectCategory={onCategorySelect}
          selectedCategory={selectedCategory}
        />
      </aside>
      
      <div className="lg:col-span-3">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-medium">
            {searchQuery ? 
              `Search Results: "${searchQuery}"` : 
              selectedCategory ? 
                `${selectedCategory} Cases` : 
                'All Cases'
            }
          </h2>
          <span className="text-sm text-muted-foreground">
            {searchResults.length} results
          </span>
        </div>
        
        <Separator className="mb-4" />
        
        <CaseResultsList 
          cases={searchResults}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ExploreResultsSection;


import React from 'react';
import { Button } from '@/components/ui/button';

interface LandmarkCaseFilterProps {
  activeCategory: string;
  uniqueCategories: string[];
  onCategoryChange: (category: string) => void;
}

const LandmarkCaseFilter = ({ 
  activeCategory, 
  uniqueCategories, 
  onCategoryChange 
}: LandmarkCaseFilterProps) => {
  return (
    <div className="mb-6 space-y-2">
      <h3 className="text-sm font-medium">Filter by category:</h3>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('all')}
        >
          All Categories
        </Button>
        {uniqueCategories.map(category => (
          <Button 
            key={category} 
            variant={activeCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LandmarkCaseFilter;

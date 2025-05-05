
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchCaseCategories, CaseCategory } from '@/utils/caseHelpers';

interface CaseCategoriesProps {
  onSelectCategory: (category: string) => void;
  selectedCategory?: string;
}

const CaseCategories: React.FC<CaseCategoriesProps> = ({ 
  onSelectCategory, 
  selectedCategory 
}) => {
  const [categories, setCategories] = useState<CaseCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      const data = await fetchCaseCategories();
      setCategories(data);
      setLoading(false);
    };
    
    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="space-y-2">
        <h3 className="text-lg font-medium mb-2">Categories</h3>
        <div className="flex flex-col gap-2">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-8 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium mb-2">Categories</h3>
      <div className="space-y-1">
        <Button 
          variant={selectedCategory === undefined ? "secondary" : "ghost"}
          className="justify-start w-full"
          onClick={() => onSelectCategory('')}
        >
          All Cases
          <Badge variant="outline" className="ml-auto">
            {categories.reduce((acc, cat) => acc + (cat.count || 0), 0)}
          </Badge>
        </Button>
        
        {categories.map((category) => (
          <Button 
            key={category.id} 
            variant={selectedCategory === category.name ? "secondary" : "ghost"}
            className="justify-start w-full"
            onClick={() => onSelectCategory(category.name)}
          >
            {category.name}
            <Badge variant="outline" className="ml-auto">
              {category.count || 0}
            </Badge>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CaseCategories;

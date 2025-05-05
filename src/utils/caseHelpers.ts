
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface CaseCategory {
  id: string;
  name: string;
  description: string | null;
  count: number | null;
}

export interface CaseSearchResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  category: string;
  summary: string;
  is_landmark: boolean;
}

// Helper to fetch categories with case counts
export const fetchCaseCategories = async (): Promise<CaseCategory[]> => {
  try {
    const { data, error } = await supabase.rpc('get_categories_with_counts');
    
    if (error) {
      console.error('Error fetching case categories:', error);
      toast({
        title: "Failed to load categories",
        description: "There was a problem retrieving case categories.",
        variant: "destructive",
      });
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchCaseCategories:', error);
    return [];
  }
};

// Helper to fetch cases by category
export const fetchCasesByCategory = async (category: string): Promise<CaseSearchResult[]> => {
  try {
    const { data, error } = await supabase.rpc('get_cases_by_category', {
      category_name: category
    });
    
    if (error) {
      console.error('Error fetching cases by category:', error);
      toast({
        title: "Failed to load cases",
        description: "There was a problem retrieving cases for this category.",
        variant: "destructive",
      });
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchCasesByCategory:', error);
    return [];
  }
};

// Helper to search for cases
export const searchCases = async (query: string): Promise<CaseSearchResult[]> => {
  try {
    const { data, error } = await supabase.rpc('search_cases', {
      search_query: query
    });
    
    if (error) {
      console.error('Error searching cases:', error);
      toast({
        title: "Search failed",
        description: "There was a problem with your search. Please try again.",
        variant: "destructive",
      });
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in searchCases:', error);
    return [];
  }
};

// Format date to readable format
export const formatCaseDate = (dateString: string) => {
  if (!dateString) return 'N/A';
  
  try {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (error) {
    return dateString;
  }
};

// Open Indian Kanoon search in new tab
export const searchIndianKanoon = (query: string) => {
  const encodedQuery = encodeURIComponent(query);
  window.open(`https://indiankanoon.org/search/?formInput=${encodedQuery}`, '_blank');
};

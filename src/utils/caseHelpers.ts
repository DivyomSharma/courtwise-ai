
import { supabase } from '@/integrations/supabase/client';
import { LANDMARK_CASES } from './landmarkCasesData';

export interface CaseSearchResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  category: string;
  summary: string;
}

export interface CaseCategory {
  id: string;
  name: string;
  description: string;
  count: number;
}

export const searchCases = async (query: string): Promise<CaseSearchResult[]> => {
  try {
    console.log('Searching cases with query:', query);
    
    // First try with the search_cases function which has better performance
    const { data: functionData, error: functionError } = await supabase
      .rpc('search_cases', { search_query: query });
    
    if (!functionError && functionData && functionData.length > 0) {
      console.log('Found cases using function:', functionData.length);
      return functionData;
    }
    
    // Fall back to direct query if function fails or returns no results
    const { data, error } = await supabase
      .from('regular_cases')
      .select('id, title, citation, court, date, category, summary')
      .ilike('title', `%${query}%`)
      .limit(100);
    
    if (error) {
      console.error('Search error:', error);
      // Fall back to searching in our landmark cases
      const landmarkResults = LANDMARK_CASES.filter(caseItem => 
        caseItem.title.toLowerCase().includes(query.toLowerCase()) ||
        caseItem.summary.toLowerCase().includes(query.toLowerCase())
      );
      return landmarkResults;
    }
    
    if (data && data.length > 0) {
      console.log('Found cases using direct query:', data.length);
      return data;
    }
    
    // If no results from database, search in our landmark cases
    const landmarkResults = LANDMARK_CASES.filter(caseItem => 
      caseItem.title.toLowerCase().includes(query.toLowerCase()) ||
      caseItem.summary.toLowerCase().includes(query.toLowerCase())
    );
    
    return landmarkResults;
  } catch (error) {
    console.error('Search error:', error);
    // Fall back to searching in our landmark cases
    const landmarkResults = LANDMARK_CASES.filter(caseItem => 
      caseItem.title.toLowerCase().includes(query.toLowerCase()) ||
      caseItem.summary.toLowerCase().includes(query.toLowerCase())
    );
    return landmarkResults;
  }
};

// Function to format case dates
export const formatCaseDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

// Function to fetch case categories
export const fetchCaseCategories = async (): Promise<CaseCategory[]> => {
  try {
    const { data, error } = await supabase
      .from('case_categories')
      .select('id, name, description, count')
      .order('name');
    
    if (error) {
      console.error('Error fetching case categories:', error);
      // Generate categories from landmark cases
      const categories = [...new Set(LANDMARK_CASES.map(c => c.category))];
      return categories.map((name, index) => ({
        id: `cat-${index}`,
        name,
        description: `Cases related to ${name}`,
        count: LANDMARK_CASES.filter(c => c.category === name).length
      }));
    }
    
    console.log('Fetched categories:', data?.length);
    return data || [];
  } catch (error) {
    console.error('Error fetching case categories:', error);
    // Generate categories from landmark cases
    const categories = [...new Set(LANDMARK_CASES.map(c => c.category))];
    return categories.map((name, index) => ({
      id: `cat-${index}`,
      name,
      description: `Cases related to ${name}`,
      count: LANDMARK_CASES.filter(c => c.category === name).length
    }));
  }
};

// Function to fetch all cases - using landmark cases from our data
export const fetchAllCases = async (): Promise<CaseSearchResult[]> => {
  try {
    console.log('Fetching all cases');
    
    // Try to fetch from regular_cases
    const { data, error } = await supabase
      .from('regular_cases')
      .select('id, title, citation, court, date, category, summary')
      .order('date', { ascending: false })
      .limit(100);
    
    if (error) {
      console.error('Error fetching all cases:', error);
      return LANDMARK_CASES; // Return our real landmark cases instead
    }
    
    console.log('Fetched cases from DB:', data?.length);
    
    // If no data in database, return landmark cases
    if (!data || data.length === 0) {
      console.log('No data in database, using landmark cases');
      return LANDMARK_CASES;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching all cases:', error);
    return LANDMARK_CASES; // Return our real landmark cases instead
  }
};

export const fetchCasesByCategory = async (category: string): Promise<CaseSearchResult[]> => {
  try {
    console.log('Fetching cases by category:', category);
    
    const { data, error } = await supabase
      .from('regular_cases')
      .select('id, title, citation, court, date, category, summary')
      .eq('category', category)
      .order('date', { ascending: false })
      .limit(100);
    
    if (error) {
      console.error(`Error fetching cases by category ${category}:`, error);
      // Filter landmark cases by category
      return LANDMARK_CASES.filter(c => c.category === category);
    }
    
    console.log('Fetched cases by category:', data?.length);
    
    // If no data in database, filter landmark cases by category
    if (!data || data.length === 0) {
      console.log('No data for category in database, filtering landmark cases');
      return LANDMARK_CASES.filter(c => c.category === category);
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching cases by category ${category}:`, error);
    // Filter landmark cases by category
    return LANDMARK_CASES.filter(c => c.category === category);
  }
};

// Remove sample case generation and replace with direct use of landmark cases
export const getLandmarkCasesForHome = (count: number = 50): CaseSearchResult[] => {
  return LANDMARK_CASES.slice(0, count);
};

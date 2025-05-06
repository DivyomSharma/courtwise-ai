
import { supabase } from '@/integrations/supabase/client';

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
    const { data, error } = await supabase
      .from('regular_cases')
      .select('id, title, citation, court, date, category, summary')
      .ilike('title', `%${query}%`)
      .limit(100);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Search error:', error);
    return [];
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
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching case categories:', error);
    return [];
  }
};

// Add new function to fetch all cases - increased to 100 cases
export const fetchAllCases = async (): Promise<CaseSearchResult[]> => {
  try {
    const { data, error } = await supabase
      .from('regular_cases')
      .select('id, title, citation, court, date, category, summary')
      .order('date', { ascending: false })
      .limit(100);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all cases:', error);
    return [];
  }
};

export const fetchCasesByCategory = async (category: string): Promise<CaseSearchResult[]> => {
  try {
    const { data, error } = await supabase
      .from('regular_cases')
      .select('id, title, citation, court, date, category, summary')
      .eq('category', category)
      .order('date', { ascending: false })
      .limit(100);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching cases by category ${category}:`, error);
    return [];
  }
};

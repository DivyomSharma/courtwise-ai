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

export const searchCases = async (query: string): Promise<CaseSearchResult[]> => {
  try {
    const { data, error } = await supabase
      .from('regular_cases')
      .select('id, title, citation, court, date, category, summary')
      .ilike('title', `%${query}%`)
      .limit(50);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

// Add new function to fetch all cases
export const fetchAllCases = async (): Promise<CaseSearchResult[]> => {
  try {
    const { data, error } = await supabase
      .from('regular_cases')
      .select('id, title, citation, court, date, category, summary')
      .order('date', { ascending: false })
      .limit(50);
    
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
      .limit(50);
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error(`Error fetching cases by category ${category}:`, error);
    return [];
  }
};

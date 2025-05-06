
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
      return [];
    }
    
    console.log('Found cases using direct query:', data?.length);
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
    
    if (error) {
      console.error('Error fetching case categories:', error);
      return [];
    }
    
    console.log('Fetched categories:', data?.length);
    return data || [];
  } catch (error) {
    console.error('Error fetching case categories:', error);
    return [];
  }
};

// Function to fetch all cases - increased to 100 cases
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
      return generateSampleCases(100); // Fallback to sample cases
    }
    
    console.log('Fetched cases from DB:', data?.length);
    
    // If no data in database, return sample cases
    if (!data || data.length === 0) {
      console.log('No data in database, generating sample cases');
      return generateSampleCases(100);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching all cases:', error);
    return generateSampleCases(100); // Fallback to sample cases
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
      return generateSampleCases(50, category); // Fallback to sample cases with the category
    }
    
    console.log('Fetched cases by category:', data?.length);
    
    // If no data in database, return sample cases filtered by category
    if (!data || data.length === 0) {
      console.log('No data for category in database, generating sample cases');
      return generateSampleCases(50, category);
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching cases by category ${category}:`, error);
    return generateSampleCases(50, category); // Fallback to sample cases with the category
  }
};

// Function to generate sample cases when database has no data
export const generateSampleCases = (count: number = 100, filterCategory?: string): CaseSearchResult[] => {
  console.log('Generating sample cases:', count, filterCategory ? `for category ${filterCategory}` : '');
  
  const categories = [
    'Constitutional Law', 'Criminal Law', 'Civil Law', 'Family Law',
    'Corporate Law', 'Taxation', 'Intellectual Property', 'Environmental Law',
    'Human Rights', 'Labor Law', 'Banking Law', 'Administrative Law'
  ];
  
  const courts = [
    'Supreme Court of India', 'Delhi High Court', 'Bombay High Court', 
    'Madras High Court', 'Calcutta High Court', 'Karnataka High Court',
    'Allahabad High Court', 'Gujarat High Court', 'Patna High Court'
  ];
  
  const sampleCases: CaseSearchResult[] = [];
  
  for (let i = 0; i < count; i++) {
    const category = filterCategory || categories[Math.floor(Math.random() * categories.length)];
    const court = courts[Math.floor(Math.random() * courts.length)];
    const year = 2000 + Math.floor(Math.random() * 23); // Years 2000-2023
    const month = 1 + Math.floor(Math.random() * 12);
    const day = 1 + Math.floor(Math.random() * 28);
    const caseNumber = 100 + Math.floor(Math.random() * 9000);
    
    sampleCases.push({
      id: `sample-${i}-${Date.now()}`,
      title: `${category} Case No. ${caseNumber}/${year}`,
      citation: `(${year}) ${court.slice(0, 3).toUpperCase()} ${caseNumber}`,
      court: court,
      date: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`,
      category: category,
      summary: `This sample case addresses important ${category} principles. The judgment provides significant insights into legal precedents related to ${category.toLowerCase()} matters in India.`
    });
  }
  
  return sampleCases;
};

// Function to get landmark cases for home page (sample data)
export const getLandmarkCasesForHome = (count: number = 50): CaseSearchResult[] => {
  const landmarkCases = generateSampleCases(count);
  
  // Make these cases more "landmark" by modifying some attributes
  return landmarkCases.map((caseItem, index) => ({
    ...caseItem,
    id: `landmark-${index}-${Date.now()}`,
    title: `Landmark ${caseItem.title}`,
    summary: `LANDMARK CASE: ${caseItem.summary}`,
  }));
};

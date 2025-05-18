
import { supabase } from '@/integrations/supabase/client';

interface SearchResults {
  found: number;
  docs: any[];
  categories: any[];
}

interface DocumentResult {
  doc: string;
  title: string;
  [key: string]: any;
}

interface DocumentFragmentResult {
  title: string;
  fragments: string[];
  [key: string]: any;
}

// Check if the API key is configured in Supabase
export const checkIndianKanoonApiKey = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('check-indian-kanoon-api', {
      method: 'POST',
    });
    
    if (error) {
      console.error('Error checking API key:', error);
      return false;
    }
    
    return data?.configured || false;
  } catch (error) {
    console.error('Error checking API key:', error);
    return false;
  }
};

// Search Indian Kanoon API
export const searchIndianKanoon = async (query: string, page: number = 0): Promise<SearchResults | null> => {
  try {
    if (!query) {
      return null;
    }
    
    const queryParams = new URLSearchParams();
    queryParams.append('formInput', query);
    queryParams.append('pagenum', page.toString());

    const params = queryParams.toString();
    
    const { data, error } = await supabase.functions.invoke('indian-kanoon-search', {
      method: 'POST',
      body: { params },
    });
    
    if (error) {
      console.error('Error searching Indian Kanoon:', error);
      throw error;
    }
    
    return data as SearchResults;
    
  } catch (error) {
    console.error('Error searching Indian Kanoon:', error);
    throw error;
  }
};

// Get document from Indian Kanoon API
export const getIndianKanoonDocument = async (docId: string): Promise<DocumentResult | null> => {
  try {
    if (!docId) {
      return null;
    }
    
    const { data, error } = await supabase.functions.invoke('indian-kanoon-document', {
      method: 'POST',
      body: { docId },
    });
    
    if (error) {
      console.error('Error fetching Indian Kanoon document:', error);
      throw error;
    }
    
    return data as DocumentResult;
  } catch (error) {
    console.error('Error fetching Indian Kanoon document:', error);
    throw error;
  }
};

// Get document fragments from Indian Kanoon API
export const getIndianKanoonDocumentFragments = async (docId: string, query: string): Promise<DocumentFragmentResult | null> => {
  try {
    if (!docId || !query) {
      return null;
    }
    
    const { data, error } = await supabase.functions.invoke('indian-kanoon-document-fragment', {
      method: 'POST',
      body: { docId, formInput: query },
    });
    
    if (error) {
      console.error('Error fetching Indian Kanoon document fragments:', error);
      throw error;
    }
    
    return data as DocumentFragmentResult;
  } catch (error) {
    console.error('Error fetching Indian Kanoon document fragments:', error);
    throw error;
  }
};

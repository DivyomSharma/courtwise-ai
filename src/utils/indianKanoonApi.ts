
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Types for Indian Kanoon API responses
export interface IKSearchResult {
  docs: IKDocument[];
  categories: IKCategory[];
  found: string;
  encodedformInput: string;
  formInput: string;
}

export interface IKDocument {
  tid: string; // Document ID
  title: string;
  headline: string;
  docsource: string;
  url?: string;
  docsize?: number;
}

export interface IKCategory {
  0: string; // Category name
  1: { value: string; formInput: string }[]; // Subcategories
}

export interface IKDocumentDetail {
  doc: string; // HTML content
  tid: string;
  title: string;
}

export interface IKDocumentFragment {
  tid: string;
  formInput: string;
  title: string;
  headline: string;
  fragments: string[];
}

/**
 * Search for cases using Indian Kanoon API
 * Note: This requires a valid API key stored in Supabase secrets
 */
export const searchIndianKanoon = async (
  query: string,
  options: {
    pagenum?: number;
    doctypes?: string;
    fromdate?: string;
    todate?: string;
    title?: string;
    cite?: string;
    author?: string;
    bench?: string;
    maxcites?: number;
  } = {}
): Promise<IKSearchResult | null> => {
  try {
    console.log('Searching Indian Kanoon with query:', query);
    
    // Build query parameters
    const params = new URLSearchParams({
      formInput: query,
      pagenum: (options.pagenum || 0).toString(),
      ...Object.entries(options).reduce((acc, [key, value]) => {
        if (value !== undefined) acc[key] = value.toString();
        return acc;
      }, {} as Record<string, string>)
    });
    
    // Use Edge Function to proxy the request to Indian Kanoon API
    const { data, error } = await supabase.functions.invoke('indian-kanoon-search', {
      body: {
        params: params.toString()
      }
    });
    
    if (error) {
      throw new Error(`Error invoking Indian Kanoon API: ${error.message}`);
    }
    
    return data as IKSearchResult;
  } catch (error) {
    console.error('Error searching Indian Kanoon:', error);
    toast({
      title: 'API Error',
      description: 'Failed to search Indian Kanoon. Please try again later.',
      variant: 'destructive'
    });
    return null;
  }
};

/**
 * Fetch document details from Indian Kanoon API
 */
export const getIndianKanoonDocument = async (docId: string): Promise<IKDocumentDetail | null> => {
  try {
    console.log('Fetching document from Indian Kanoon:', docId);
    
    // Use Edge Function to proxy the request to Indian Kanoon API
    const { data, error } = await supabase.functions.invoke('indian-kanoon-document', {
      body: {
        docId
      }
    });
    
    if (error) {
      throw new Error(`Error invoking Indian Kanoon API: ${error.message}`);
    }
    
    return data as IKDocumentDetail;
  } catch (error) {
    console.error('Error fetching Indian Kanoon document:', error);
    toast({
      title: 'API Error',
      description: 'Failed to fetch document details. Please try again later.',
      variant: 'destructive'
    });
    return null;
  }
};

/**
 * Fetch document fragments from Indian Kanoon API
 */
export const getIndianKanoonDocumentFragments = async (
  docId: string, 
  query: string
): Promise<IKDocumentFragment | null> => {
  try {
    console.log('Fetching document fragments from Indian Kanoon:', docId, query);
    
    // Use Edge Function to proxy the request to Indian Kanoon API
    const { data, error } = await supabase.functions.invoke('indian-kanoon-document-fragment', {
      body: {
        docId,
        formInput: query
      }
    });
    
    if (error) {
      throw new Error(`Error invoking Indian Kanoon API: ${error.message}`);
    }
    
    return data as IKDocumentFragment;
  } catch (error) {
    console.error('Error fetching Indian Kanoon document fragments:', error);
    toast({
      title: 'API Error',
      description: 'Failed to fetch document fragments. Please try again later.',
      variant: 'destructive'
    });
    return null;
  }
};

// Check if Indian Kanoon API key is configured
export const checkIndianKanoonApiKey = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('check-indian-kanoon-api', {});
    
    if (error || !data?.configured) {
      console.error('Indian Kanoon API key not configured');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking Indian Kanoon API configuration:', error);
    return false;
  }
};

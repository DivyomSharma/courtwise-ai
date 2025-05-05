
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Helper for handling standard errors from Supabase
export const handleSupabaseError = (error: any, customMessage?: string) => {
  console.error('Supabase error:', error);
  
  toast({
    title: "Error",
    description: customMessage || error.message || "An unexpected error occurred",
    variant: "destructive",
  });
  
  return null;
};

// Helper to fetch case details by ID (works for both landmark and regular cases)
export const fetchCaseById = async (caseId: string) => {
  try {
    // First try to get from landmark cases
    let { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', caseId)
      .maybeSingle();
    
    if (error) {
      return handleSupabaseError(error, 'Failed to fetch case details');
    }
    
    if (data) {
      return { ...data, is_landmark: true };
    }
    
    // If not found in landmark cases, try regular cases
    const { data: regularCase, error: regularError } = await supabase
      .from('regular_cases')
      .select('*')
      .eq('id', caseId)
      .maybeSingle();
    
    if (regularError) {
      return handleSupabaseError(regularError, 'Failed to fetch case details');
    }
    
    return regularCase;
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Helper to fetch all cases with optional filtering
export const fetchCases = async (options: {
  limit?: number;
  searchQuery?: string;
  category?: string;
  orderBy?: string;
  ascending?: boolean;
  includeLandmark?: boolean;
  includeRegular?: boolean;
} = {}) => {
  try {
    // Default to include both types if not specified
    const includeLandmark = options.includeLandmark !== false;
    const includeRegular = options.includeRegular !== false;
    
    // Initialize arrays to hold results
    let landmarkCases: any[] = [];
    let regularCases: any[] = [];
    
    // Function to build the query based on options
    const buildQuery = (queryBuilder: any, options: any) => {
      // Apply search filter if provided
      if (options.searchQuery) {
        queryBuilder = queryBuilder.or(
          `title.ilike.%${options.searchQuery}%,summary.ilike.%${options.searchQuery}%,full_text.ilike.%${options.searchQuery}%`
        );
      }
      
      // Apply category filter if provided
      if (options.category) {
        queryBuilder = queryBuilder.eq('category', options.category);
      }
      
      // Apply ordering
      const orderField = options.orderBy || 'date';
      const ascending = options.ascending !== undefined ? options.ascending : false;
      queryBuilder = queryBuilder.order(orderField, { ascending });
      
      // Apply limit if provided
      if (options.limit) {
        queryBuilder = queryBuilder.limit(options.limit);
      }
      
      return queryBuilder;
    };
    
    // Fetch landmark cases if requested
    if (includeLandmark) {
      let query = supabase.from('cases').select('*');
      query = buildQuery(query, options);
      
      const { data, error } = await query;
      
      if (error) {
        return handleSupabaseError(error, 'Failed to fetch landmark cases');
      }
      
      landmarkCases = data?.map(c => ({ ...c, is_landmark: true })) || [];
    }
    
    // Fetch regular cases if requested
    if (includeRegular) {
      let query = supabase.from('regular_cases').select('*');
      query = buildQuery(query, options);
      
      const { data, error } = await query;
      
      if (error) {
        return handleSupabaseError(error, 'Failed to fetch regular cases');
      }
      
      regularCases = data?.map(c => ({ ...c, is_landmark: false })) || [];
    }
    
    // Combine and sort results
    const allCases = [...landmarkCases, ...regularCases];
    
    // Sort combined results
    const orderField = options.orderBy || 'date';
    const ascending = options.ascending !== undefined ? options.ascending : false;
    
    allCases.sort((a, b) => {
      if (ascending) {
        return a[orderField] > b[orderField] ? 1 : -1;
      } else {
        return a[orderField] < b[orderField] ? 1 : -1;
      }
    });
    
    // Apply global limit if needed
    if (options.limit && allCases.length > options.limit) {
      return allCases.slice(0, options.limit);
    }
    
    return allCases;
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Helper to save case note
export const saveCaseNote = async (userId: string, caseId: string, content: string) => {
  try {
    const { data, error } = await supabase
      .from('case_notes')
      .insert({
        user_id: userId,
        case_id: caseId,
        note_content: content
      })
      .select();
    
    if (error) {
      return handleSupabaseError(error, 'Failed to save note');
    }
    
    return data;
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Helper to update user profile
export const updateUserProfile = async (
  userId: string, 
  updates: { 
    username?: string; 
    full_name?: string; 
    avatar_url?: string; 
    role?: 'free' | 'subscriber' | 'admin';
  }
) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select();
    
    if (error) {
      return handleSupabaseError(error, 'Failed to update profile');
    }
    
    return data;
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Helper to fetch user usage stats
export const fetchUserUsage = async (userId: string, date?: string) => {
  try {
    const today = date || new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('user_usage')
      .select('*')
      .eq('user_id', userId)
      .eq('usage_date', today)
      .maybeSingle();
    
    if (error) {
      return handleSupabaseError(error, 'Failed to fetch usage data');
    }
    
    return data;
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Helper to fetch case notes for a specific case
export const fetchCaseNotes = async (caseId: string, userId?: string) => {
  try {
    let query = supabase
      .from('case_notes')
      .select('*')
      .eq('case_id', caseId)
      .order('created_at', { ascending: false });
    
    // If user ID is provided, filter by user
    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      return handleSupabaseError(error, 'Failed to fetch case notes');
    }
    
    return data || [];
  } catch (error) {
    return handleSupabaseError(error);
  }
};

// Export case as PDF helper
export const exportCaseToPDF = async (caseId: string, format: string = 'pdf') => {
  // In a real application, this would generate a PDF or other format
  // For now, we'll just return a success message
  
  toast({
    title: `Export initiated`,
    description: `Exporting case in ${format.toUpperCase()} format...`,
  });
  
  // Simulate a delay
  return new Promise(resolve => {
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: `Case has been exported in ${format.toUpperCase()} format.`,
      });
      resolve(true);
    }, 1500);
  });
};

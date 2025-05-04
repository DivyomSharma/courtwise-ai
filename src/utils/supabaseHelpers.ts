
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

// Helper to fetch case details by ID
export const fetchCaseById = async (caseId: string) => {
  try {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', caseId)
      .maybeSingle();
    
    if (error) {
      return handleSupabaseError(error, 'Failed to fetch case details');
    }
    
    return data;
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
} = {}) => {
  try {
    let query = supabase
      .from('cases')
      .select('*');
    
    // Apply search filter if provided
    if (options.searchQuery) {
      query = query.or(
        `title.ilike.%${options.searchQuery}%,summary.ilike.%${options.searchQuery}%,full_text.ilike.%${options.searchQuery}%`
      );
    }
    
    // Apply category filter if provided
    if (options.category) {
      query = query.eq('category', options.category);
    }
    
    // Apply ordering
    const orderField = options.orderBy || 'date';
    const ascending = options.ascending !== undefined ? options.ascending : false;
    query = query.order(orderField, { ascending });
    
    // Apply limit if provided
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) {
      return handleSupabaseError(error, 'Failed to fetch cases');
    }
    
    return data || [];
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

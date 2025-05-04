
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.32.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the admin key
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Get the case ID from the query string
    const url = new URL(req.url);
    const caseId = url.searchParams.get('id');
    
    if (!caseId) {
      return new Response(
        JSON.stringify({ error: 'Case ID is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // First try to fetch by UUID
    let caseDetails = null;
    let error = null;
    
    // Try to fetch by UUID first
    const { data: uuidData, error: uuidError } = await supabase
      .from('cases')
      .select('*')
      .eq('id', caseId)
      .maybeSingle();
    
    if (!uuidError && uuidData) {
      caseDetails = uuidData;
    } else {
      // If UUID fetch fails, try to fetch by string id (for sample cases)
      const { data: stringIdData, error: stringIdError } = await supabase
        .from('cases')
        .select('*')
        .ilike('title', `%${caseId.replace(/-/g, ' ')}%`)
        .maybeSingle();
      
      if (stringIdError) {
        error = stringIdError;
      } else if (stringIdData) {
        caseDetails = stringIdData;
      }
    }
    
    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Database error fetching case details' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    if (!caseDetails) {
      return new Response(
        JSON.stringify({ error: 'Case not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }

    // Return the case details
    return new Response(
      JSON.stringify({ caseDetails }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

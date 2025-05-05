
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    const { query } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Search query is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Simple AI logic to parse the query - in production this would use a real AI model
    const lowerQuery = query.toLowerCase();
    
    // Check for case indicators
    let specificCase = null;
    let suggestedCategory = null;
    
    // Check for named cases in the query
    if (lowerQuery.includes('kesavananda') || lowerQuery.includes('basic structure')) {
      specificCase = 'kesavananda-bharati';
    } else if (lowerQuery.includes('vishaka') || lowerQuery.includes('sexual harassment')) {
      specificCase = 'vishaka';
    } else if (lowerQuery.includes('puttaswamy') || lowerQuery.includes('privacy')) {
      specificCase = 'puttaswamy';
    }
    
    // Determine category based on keywords
    if (lowerQuery.includes('constitution') || lowerQuery.includes('fundamental right')) {
      suggestedCategory = 'Constitutional';
    } else if (lowerQuery.includes('criminal') || lowerQuery.includes('offence') || lowerQuery.includes('offense')) {
      suggestedCategory = 'Criminal';
    } else if (lowerQuery.includes('employment') || lowerQuery.includes('workplace') || lowerQuery.includes('worker')) {
      suggestedCategory = 'Labor & Employment';
    } else if (lowerQuery.includes('environment') || lowerQuery.includes('pollution')) {
      suggestedCategory = 'Environmental';
    }
    
    // Fetch relevant cases from the database
    const { data: cases, error } = await supabase
      .from('cases')
      .select('id, title, summary')
      .or(`title.ilike.%${query}%,summary.ilike.%${query}%`)
      .limit(5);
    
    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Database error while searching' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }
    
    // If we found exact matches, use the first one
    if (cases && cases.length > 0 && !specificCase) {
      specificCase = cases[0].id;
    }

    return new Response(
      JSON.stringify({ 
        results: {
          specificCase,
          suggestedCategory,
          matchingCases: cases || []
        }
      }),
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

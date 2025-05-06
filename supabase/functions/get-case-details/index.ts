
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Function to check if input is a UUID 
function isValidUUID(str: string) {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(str);
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );
    
    // Get case ID from request
    const { id } = await req.json();
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: "Case ID is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    console.log(`Searching for case with ID: ${id}`);
    
    // Try to fetch from different tables based on the ID format
    let caseDetails = null;
    
    // First try to find by UUID if it looks like a UUID
    if (isValidUUID(id)) {
      // Try landmark cases first
      const { data: landmarkCase, error: landmarkError } = await supabaseClient
        .from('cases')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (landmarkError) {
        console.error("Error fetching landmark case:", landmarkError);
      } else {
        console.log("Landmark case lookup result:", landmarkCase ? "found" : "none");
      }
      
      if (landmarkCase) {
        caseDetails = { ...landmarkCase, is_landmark: true };
      } else {
        // Try regular cases if not found
        const { data: regularCase, error: regularError } = await supabaseClient
          .from('regular_cases')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (regularError) {
          console.error("Error fetching regular case:", regularError);
        } else {
          console.log("Regular case lookup result:", regularCase ? "found" : "none");
        }
        
        if (regularCase) {
          caseDetails = { ...regularCase, is_landmark: false };
        }
      }
    } else {
      // Try to find by special slug/identifier if not a UUID
      console.log("Looking for case by title/slug:", id);
      
      // This is for cases with special identifiers from landmarkCasesData
      // In a real app, we'd have a slugs table or similar to handle this
      const { data: slugCase, error: slugError } = await supabaseClient
        .from('regular_cases')
        .select('*')
        .ilike('title', `%${id.replace(/-/g, ' ')}%`)
        .limit(1)
        .maybeSingle();
      
      if (slugError) {
        console.error("Error fetching by slug:", slugError);
      } else {
        console.log("Slug lookup result:", slugCase ? "found" : "none");
      }
      
      if (slugCase) {
        caseDetails = { ...slugCase, is_landmark: false };
      }
    }
    
    if (!caseDetails) {
      return new Response(
        JSON.stringify({ error: "Case not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }
    
    return new Response(
      JSON.stringify({ caseDetails }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
    
  } catch (error) {
    console.error("Error in get-case-details function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

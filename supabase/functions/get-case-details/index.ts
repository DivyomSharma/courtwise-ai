
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
      console.log("UUID lookup result:");
      // Try landmark cases first
      const { data: landmarkCase, error: landmarkError } = await supabaseClient
        .from('cases')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (landmarkError) {
        console.error("Error fetching landmark case:", landmarkError);
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
        }
        
        if (regularCase) {
          caseDetails = { ...regularCase, is_landmark: false };
        }
      }
      console.log(caseDetails ? "found" : "none", landmarkError || "No error");
    }
    
    // If not found by UUID, try by title/slug (for pre-defined cases like 'kesavananda-bharati')
    if (!caseDetails) {
      console.log("Title lookup result:");
      const { data: titleCase, error: titleError } = await supabaseClient
        .from('cases')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (titleError) {
        console.error("Error fetching by title:", titleError);
      }
      
      if (titleCase) {
        caseDetails = { ...titleCase, is_landmark: true };
      }
      console.log(titleCase ? "found" : "none", titleError || "No error");
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
      JSON.stringify({ error: "Internal server error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

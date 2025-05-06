
// Enable Realtime features for the database
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  try {
    // Create Supabase client with admin privileges
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
    
    // Enable full replica identity for these tables to get complete row data on changes
    const tables = [
      'legal_news',
      'cases',
      'regular_cases',
      'case_notes'
    ];
    
    const results = [];
    
    for (const table of tables) {
      const { data, error } = await supabaseAdmin.rpc('alter_table_set_replica_identity_full', { 
        target_table: table 
      });
      
      results.push({
        table,
        success: !error,
        error: error?.message
      });
    }

    return new Response(
      JSON.stringify({ 
        message: "Realtime features enabled",
        results: results
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
    
  } catch (error) {
    console.error("Error enabling realtime:", error);
    return new Response(
      JSON.stringify({ error: "Failed to enable realtime features", details: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

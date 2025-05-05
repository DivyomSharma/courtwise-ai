
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Use the service role key for admin-level operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const results = [];
    
    // Execute SQL to enable real-time on legal_news table
    await supabaseAdmin.rpc('set_table_realtime', {
      table: 'legal_news',
      value: true
    });
    results.push("Enabled realtime for legal_news table");
    
    // Execute SQL to enable real-time on cases table
    await supabaseAdmin.rpc('set_table_realtime', {
      table: 'cases',
      value: true
    });
    results.push("Enabled realtime for cases table");

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Realtime enabled for tables",
      details: results
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

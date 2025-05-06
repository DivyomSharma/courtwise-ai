
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  try {
    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Check if columns already exist, if not, add them
    const { data: existingColumns, error: columnsError } = await supabaseAdmin
      .rpc('schema_helpers', { _table: 'profiles' });
      
    if (columnsError) {
      throw new Error(`Failed to get existing columns: ${columnsError.message}`);
    }
    
    // List of new columns we want to add
    const requiredColumns = [
      { name: 'profession_type', type: 'text' },
      { name: 'qualification', type: 'text' },
      { name: 'experience_years', type: 'text' },
      { name: 'specialization', type: 'text' },
      { name: 'bio', type: 'text' }
    ];
    
    // Add columns that don't exist yet
    for (const column of requiredColumns) {
      if (!existingColumns.includes(column.name)) {
        const { error } = await supabaseAdmin
          .rpc('add_column', { 
            _table: 'profiles',
            _column: column.name,
            _type: column.type,
            _nullable: true
          });
          
        if (error) {
          throw new Error(`Failed to add column ${column.name}: ${error.message}`);
        }
      }
    }
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Profile schema updated successfully' 
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in update-profile-schema function:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to update profile schema',
      details: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});

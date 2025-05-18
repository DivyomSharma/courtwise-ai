
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiToken = Deno.env.get('INDIAN_KANOON_API_TOKEN')
    const configured = !!apiToken

    return new Response(
      JSON.stringify({
        configured,
        message: configured 
          ? 'Indian Kanoon API token is configured' 
          : 'Indian Kanoon API token is not configured'
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error('Error checking Indian Kanoon API config:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to check Indian Kanoon API configuration' 
      }),
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    )
  }
})

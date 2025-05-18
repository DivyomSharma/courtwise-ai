
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const INDIAN_KANOON_API_URL = 'https://api.indiankanoon.org/doc'
const INDIAN_KANOON_API_TOKEN = Deno.env.get('INDIAN_KANOON_API_TOKEN') // Get from Supabase secrets

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!INDIAN_KANOON_API_TOKEN) {
      throw new Error('Indian Kanoon API token not configured')
    }

    const { docId } = await req.json()
    
    const apiUrl = `${INDIAN_KANOON_API_URL}/${docId}/`
    console.log(`Requesting Indian Kanoon document API: ${apiUrl}`)

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Token ${INDIAN_KANOON_API_TOKEN}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Indian Kanoon API returned ${response.status}: ${await response.text()}`)
    }

    const data = await response.json()
    
    return new Response(JSON.stringify(data), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error in Indian Kanoon document function:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to fetch document from Indian Kanoon API' 
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

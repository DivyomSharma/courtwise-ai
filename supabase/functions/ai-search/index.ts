
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

// Function to simulate AI-powered categorization
function suggestCategory(query: string) {
  // In a real system, this would use AI to determine the legal category
  // For now, we'll use a simple keyword matching approach
  const keywords: Record<string, string[]> = {
    "Constitutional": ["constitution", "fundamental rights", "amendment", "article", "basic structure"],
    "Criminal": ["murder", "theft", "criminal", "accused", "bail", "sentence"],
    "Civil": ["contract", "property", "damages", "agreement", "civil dispute"],
    "Family": ["divorce", "marriage", "custody", "maintenance", "adoption"],
    "Labor & Employment": ["worker", "employment", "labor", "workplace", "industrial"],
    "Environmental": ["environment", "pollution", "forest", "wildlife", "climate"],
    "Tax": ["tax", "income tax", "gst", "revenue", "assessment"],
    "Corporate": ["company", "director", "shareholder", "corporate", "board"],
    "Intellectual Property": ["patent", "copyright", "trademark", "ip", "design"],
    "Human Rights": ["human rights", "dignity", "equality", "discrimination"]
  };
  
  // Convert query to lowercase for case-insensitive matching
  const lowercaseQuery = query.toLowerCase();
  
  // Count matches for each category
  const matches: Record<string, number> = {};
  
  Object.entries(keywords).forEach(([category, words]) => {
    matches[category] = words.reduce((count, word) => {
      return lowercaseQuery.includes(word.toLowerCase()) ? count + 1 : count;
    }, 0);
  });
  
  // Find category with most matches
  let bestMatch = "";
  let highestScore = 0;
  
  Object.entries(matches).forEach(([category, score]) => {
    if (score > highestScore) {
      highestScore = score;
      bestMatch = category;
    }
  });
  
  return highestScore > 0 ? bestMatch : "Constitutional";
}

// Function to search for specific cases
async function searchSpecificCase(supabaseClient: any, query: string) {
  try {
    // First check if query mentions a specific case citation
    const citationRegex = /AIR\s+(\d{4})\s+SC\s+(\d+)/i;
    const match = query.match(citationRegex);
    
    if (match) {
      const year = match[1];
      const number = match[2];
      const citation = `AIR ${year} SC ${number}`;
      
      // Search for this specific citation
      let { data, error } = await supabaseClient
        .from('cases')
        .select('id')
        .ilike('citation', citation)
        .maybeSingle();
        
      if (data) {
        return data.id;
      }
      
      // Try regular cases if not found in landmark cases
      const { data: regularData, error: regularError } = await supabaseClient
        .from('regular_cases')
        .select('id')
        .ilike('citation', citation)
        .maybeSingle();
        
      if (regularData) {
        return regularData.id;
      }
    }
    
    // If no citation match, try known landmark case names
    const landmarkCases = [
      { keywords: ["kesavananda", "bharati", "basic structure"], id: "kesavananda-bharati" },
      { keywords: ["vishaka", "sexual harassment", "workplace"], id: "vishaka" },
      { keywords: ["puttaswamy", "privacy", "aadhaar"], id: "puttaswamy" },
      // Add more known landmark cases here
    ];
    
    const lowercaseQuery = query.toLowerCase();
    for (const landmarkCase of landmarkCases) {
      const matches = landmarkCase.keywords.filter(keyword => 
        lowercaseQuery.includes(keyword.toLowerCase())
      );
      
      if (matches.length >= 2) {
        return landmarkCase.id;
      }
    }
    
    // No specific case found
    return null;
  } catch (error) {
    console.error("Error searching for specific case:", error);
    return null;
  }
}

// Main handler function
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
    
    // Get request data
    const { query } = await req.json();
    
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: "Invalid query parameter" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }
    
    // Process the query to extract insights
    // This would ideally use an AI model but we'll simulate some intelligence
    
    // 1. Try to find if the query refers to a specific case
    const specificCaseId = await searchSpecificCase(supabaseClient, query);
    
    // 2. If no specific case, suggest a category
    const suggestedCategory = suggestCategory(query);
    
    // Return AI search results
    const aiResults = {
      originalQuery: query,
      specificCase: specificCaseId,
      suggestedCategory: suggestedCategory,
      enhancedQuery: query,
      confidence: 0.85 // Mock confidence score
    };
    
    return new Response(
      JSON.stringify({ results: aiResults }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
    
  } catch (error) {
    console.error("Error in AI search function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

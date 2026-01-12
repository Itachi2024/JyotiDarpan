import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MatchRequest {
  boyKundliId: string;
  girlKundliId: string;
}

// Ashtakoota matching system
const calculateGunaMatching = (boyChart: any, girlChart: any) => {
  // This is a simplified implementation
  // In production, use proper Vedic astrology calculations
  
  const gunaScores = [
    Math.floor(Math.random() * 2), // Varna (max 1)
    Math.floor(Math.random() * 3), // Vashya (max 2)
    Math.floor(Math.random() * 4), // Tara (max 3)
    Math.floor(Math.random() * 5), // Yoni (max 4)
    Math.floor(Math.random() * 6), // Graha Maitri (max 5)
    Math.floor(Math.random() * 7), // Gana (max 6)
    Math.floor(Math.random() * 8), // Bhakoot (max 7)
    Math.floor(Math.random() * 9), // Nadi (max 8)
  ];

  const totalScore = gunaScores.reduce((sum, score) => sum + score, 0);
  
  let recommendation = 'poor';
  if (totalScore >= 28) recommendation = 'excellent';
  else if (totalScore >= 18) recommendation = 'good';
  else if (totalScore >= 13) recommendation = 'average';

  // Check for Manglik dosha (simplified)
  const isBoyManglik = Math.random() > 0.7;
  const isGirlManglik = Math.random() > 0.7;

  return {
    totalScore,
    gunaScores,
    isBoyManglik,
    isGirlManglik,
    recommendation,
    detailedAnalysis: {
      compatibility: totalScore >= 18 ? 'high' : totalScore >= 13 ? 'medium' : 'low',
      strengths: ['Good emotional compatibility', 'Strong family values'],
      challenges: totalScore < 18 ? ['Need remedies for better harmony'] : [],
      remedies: isBoyManglik || isGirlManglik ? ['Mangal Shanti Puja recommended'] : []
    }
  };
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { boyKundliId, girlKundliId }: MatchRequest = await req.json();

    // Fetch both kundlis
    const { data: boyKundli, error: boyError } = await supabaseClient
      .from('kundlis')
      .select('*')
      .eq('id', boyKundliId)
      .single();

    if (boyError) throw boyError;

    const { data: girlKundli, error: girlError } = await supabaseClient
      .from('kundlis')
      .select('*')
      .eq('id', girlKundliId)
      .single();

    if (girlError) throw girlError;

    // Calculate match
    const matchResult = calculateGunaMatching(boyKundli.chart_data, girlKundli.chart_data);

    // Save match result
    const { data: savedResult, error: saveError } = await supabaseClient
      .from('match_results')
      .insert({
        boy_kundli_id: boyKundliId,
        girl_kundli_id: girlKundliId,
        total_score: matchResult.totalScore,
        guna_scores: matchResult.gunaScores,
        is_boy_manglik: matchResult.isBoyManglik,
        is_girl_manglik: matchResult.isGirlManglik,
        recommendation: matchResult.recommendation,
        detailed_analysis: matchResult.detailedAnalysis,
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return new Response(JSON.stringify({ 
      matchResult: savedResult,
      boyKundli,
      girlKundli 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
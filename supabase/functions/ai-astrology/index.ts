import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    // Use OpenAI-compatible API (you can use free alternatives like Groq, Together AI, etc.)
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (!OPENAI_API_KEY) {
      // Fallback to rule-based responses for demo
      const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let response = "";
      
      if (lastMessage.includes("राशिफल") || lastMessage.includes("horoscope")) {
        response = "🙏 नमस्ते! आपका राशिफल जानने के लिए कृपया अपनी जन्म तिथि बताएं। आज का दिन आपके लिए शुभ है और नई शुरुआत के लिए उत्तम समय है।";
      } else if (lastMessage.includes("कुंडली") || lastMessage.includes("kundli")) {
        response = "आपकी कुंडली बनाने के लिए मुझे आपकी जन्म तिथि, समय और स्थान की जानकारी चाहिए। कुंडली आपके जीवन की सभी घटनाओं का खाका है।";
      } else if (lastMessage.includes("मुहूर्त") || lastMessage.includes("muhurat")) {
        response = "शुभ मुहूर्त के लिए आज सुबह 6:30 से 8:00 बजे तक का समय उत्तम है। विवाह, गृह प्रवेश या नया काम शुरू करने के लिए यह समय अच्छा है।";
      } else if (lastMessage.includes("उपाय") || lastMessage.includes("remedy")) {
        response = "ग्रह दोष निवारण के लिए: 1) सूर्योदय के समय जल चढ़ाएं 2) हनुमान चालीसा का पाठ करें 3) तुलसी का पौधा लगाएं। नियमित रूप से करने से लाभ होगा।";
      } else {
        response = "🙏 नमस्ते! मैं आपका AI ज्योतिष सहायक हूं। आप मुझसे राशिफल, कुंडली, मुहूर्त, उपाय या किसी भी ज्योतिष संबंधी प्रश्न पूछ सकते हैं। कैसे मदद कर सकता हूं?";
      }
      
      return new Response(JSON.stringify({ content: response }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are an expert Vedic astrologer AI assistant named "JyotishGuru AI". You help users with:
- Daily, weekly, monthly horoscopes (Rashifal) for all 12 zodiac signs
- Kundli (birth chart) interpretation and analysis
- Muhurat (auspicious timing) suggestions for events like marriage, business, travel
- Panchang information (Tithi, Nakshatra, Yoga, Karana)
- Remedies (Upay) for planetary doshas
- Match making (Kundli Milan) guidance
- General astrology questions

Guidelines:
1. Always respond in a mix of Hindi and English (Hinglish) to cater to Indian users
2. Be respectful and use appropriate honorifics
3. Provide practical and actionable advice
4. When discussing predictions, be positive and encouraging
5. For specific birth chart analysis, politely ask for birth details if not provided
6. Include relevant mantras, gemstones, or remedies when appropriate
7. Always mention that for detailed personalized analysis, users should consult a professional astrologer

Start responses with "🙏 नमस्ते!" when appropriate.`;

    // Use OpenAI API or compatible service
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Unable to generate response";

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    
    // Fallback response
    const fallbackResponse = "🙏 नमस्ते! मैं आपका AI ज्योतिष सहायक हूं। कृपया अपना प्रश्न दोबारा पूछें। आप राशिफल, कुंडली, मुहूर्त या उपाय के बारे में पूछ सकते हैं।";
    
    return new Response(JSON.stringify({ content: fallbackResponse }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

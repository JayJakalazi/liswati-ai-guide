import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voiceId } = await req.json();

    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "text is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    // Try ElevenLabs first when a key is configured
    if (ELEVENLABS_API_KEY) {
      const selectedVoice = voiceId || "EXAVITQu4vr4xnSDxMaL";
      const el = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: {
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            model_id: "eleven_turbo_v2_5",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              style: 0.4,
              use_speaker_boost: true,
            },
          }),
        }
      );

      if (el.ok) {
        return new Response(await el.arrayBuffer(), {
          headers: { ...corsHeaders, "Content-Type": "audio/mpeg" },
        });
      }

      console.error("ElevenLabs failed, falling back:", el.status, await el.text());
    }

    // Fallback: Lovable AI Gateway text-to-speech (no external key needed)
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "No TTS provider configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const gw = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-preview-tts",
        input: text,
        voice: "Kore",
        response_format: "mp3",
      }),
    });

    if (!gw.ok) {
      const errText = await gw.text();
      console.error("Gateway TTS error:", gw.status, errText);
      return new Response(
        JSON.stringify({ error: "TTS generation failed", status: gw.status, details: errText }),
        { status: gw.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(await gw.arrayBuffer(), {
      headers: { ...corsHeaders, "Content-Type": "audio/mpeg" },
    });
  } catch (e) {
    console.error("TTS error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

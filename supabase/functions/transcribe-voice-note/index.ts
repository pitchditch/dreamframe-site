import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const jsonHeaders = { ...corsHeaders, 'Content-Type': 'application/json' };
const MAX_AUDIO_BASE64_LENGTH = 16_000_000;

const SERVICES = [
  'window_cleaning', 'gutter_cleaning', 'roof_cleaning', 'house_wash', 'pressure_washing',
  'driveway_cleaning', 'patio_cleaning', 'deck_cleaning', 'storefront_window_cleaning', 'other',
] as const;
const pricingInputKeys = [
  'stories', 'window_count', 'pane_count', 'interior_windows', 'exterior_windows', 'screens', 'tracks',
  'gutter_length_ft', 'gutter_guards', 'downspout_count', 'roof_material', 'roof_pitch', 'moss_level',
  'area_sqft', 'surface_type', 'frequency', 'storefront_size', 'access_notes', 'condition_notes',
  'service_date_preference', 'customer_mentioned_price',
] as const;

type Speaker = 'customer' | 'agent';
type JsonRecord = Record<string, unknown>;
type Analysis = {
  source_language: string;
  translated_text: string;
  services: string[];
  pricing_inputs: Record<string, string | number | boolean | null>;
  keywords: string[];
  missing_questions: string[];
  summary: string;
  confidence: number;
};

const respond = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: jsonHeaders });
const extensionForMime = (mimeType: string) => {
  const normalized = (mimeType || '').toLowerCase().split(';')[0].trim();
  if (normalized.includes('mpeg') || normalized.includes('mp3')) return 'mp3';
  if (normalized.includes('wav')) return 'wav';
  if (normalized.includes('mp4') || normalized.includes('m4a')) return 'm4a';
  if (normalized.includes('ogg')) return 'ogg';
  return 'webm';
};
const decodeAudio = (audio: string) => {
  const binary = atob(audio);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
};
const uniqueStrings = (...values: unknown[]) => {
  const result = new Set<string>();
  for (const value of values) {
    if (!Array.isArray(value)) continue;
    for (const item of value) if (typeof item === 'string' && item.trim()) result.add(item.trim());
  }
  return [...result];
};
const mergePricingInputs = (previous: unknown, current: unknown) => {
  const merged: JsonRecord = {};
  if (previous && typeof previous === 'object' && !Array.isArray(previous)) Object.assign(merged, previous);
  if (current && typeof current === 'object' && !Array.isArray(current)) {
    for (const [key, value] of Object.entries(current)) if (value !== null && value !== '' && value !== undefined) merged[key] = value;
  }
  return merged;
};
const extractResponseText = (payload: any) => {
  if (typeof payload?.output_text === 'string') return payload.output_text;
  const chunks: string[] = [];
  for (const item of payload?.output || []) {
    for (const content of item?.content || []) if (content?.type === 'output_text' && typeof content?.text === 'string') chunks.push(content.text);
  }
  return chunks.join('\n');
};

const analysisSchema = {
  type: 'object', additionalProperties: false,
  properties: {
    source_language: { type: 'string' },
    translated_text: { type: 'string' },
    services: { type: 'array', items: { type: 'string', enum: [...SERVICES] } },
    pricing_inputs: {
      type: 'object', additionalProperties: false,
      properties: Object.fromEntries(pricingInputKeys.map((key) => [key, { type: ['string', 'number', 'boolean', 'null'] }])),
      required: [...pricingInputKeys],
    },
    keywords: { type: 'array', items: { type: 'string' } },
    missing_questions: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
    confidence: { type: 'number', minimum: 0, maximum: 1 },
  },
  required: ['source_language', 'translated_text', 'services', 'pricing_inputs', 'keywords', 'missing_questions', 'summary', 'confidence'],
} as const;

const getServerClient = () => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
};

const isAdminRequest = async (req: Request, supabase: ReturnType<typeof createClient>) => {
  const authorization = req.headers.get('authorization') || '';
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;
  const jwt = match[1].trim();
  if (!jwt) return false;
  const { data: userData, error: userError } = await supabase.auth.getUser(jwt);
  if (userError || !userData.user) return false;
  const { data: isAdmin, error } = await supabase.rpc('is_admin', { user_id: userData.user.id });
  return !error && isAdmin === true;
};

const handleLegacyTranscription = async (body: any, openAiKey: string) => {
  const audio = typeof body?.audio === 'string' ? body.audio : '';
  const mimeType = typeof body?.mimeType === 'string' ? body.mimeType : 'audio/webm';
  if (!audio) return respond({ error: 'audio (base64) is required' }, 400);
  if (audio.length > MAX_AUDIO_BASE64_LENGTH) return respond({ error: 'Audio clip is too large' }, 413);
  const normalizedMime = mimeType.split(';')[0].trim() || 'audio/webm';
  const formData = new FormData();
  formData.append('file', new Blob([decodeAudio(audio)], { type: normalizedMime }), `audio.${extensionForMime(normalizedMime)}`);
  formData.append('model', 'whisper-1');
  formData.append('language', 'en');
  const resp = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST', headers: { Authorization: `Bearer ${openAiKey}` }, body: formData,
  });
  if (!resp.ok) {
    const detail = await resp.text();
    console.error('Whisper error', resp.status, detail);
    return respond({ error: `Transcription failed: ${resp.status}` }, 502);
  }
  const data = await resp.json();
  return respond({ text: data.text || '' });
};

const handleVirtualEstimate = async (req: Request, body: any, openAiKey: string) => {
  const action = typeof body?.action === 'string' ? body.action : 'state';
  const sessionId = typeof body?.sessionId === 'string' ? body.sessionId.trim() : '';
  const inviteToken = typeof body?.inviteToken === 'string' ? body.inviteToken.trim() : '';
  if (!sessionId) return respond({ error: 'Missing virtual estimate session id' }, 400);
  const supabase = getServerClient();
  if (!supabase) return respond({ error: 'Server configuration is incomplete' }, 500);
  const adminAction = action === 'state_admin' || action === 'process_agent_audio';
  if (adminAction && !(await isAdminRequest(req, supabase))) return respond({ error: 'Admin access required' }, 403);
  if (!adminAction && !inviteToken) return respond({ error: 'Missing virtual estimate session credentials' }, 400);
  let sessionQuery = supabase
    .from('virtual_estimate_sessions')
    .select('id, session_id, invite_token, invite_expires_at, status, ai_assistant_enabled, ai_consent_at, ai_summary')
    .eq('session_id', sessionId);
  if (!adminAction) sessionQuery = sessionQuery.eq('invite_token', inviteToken);
  const { data: session, error: sessionError } = await sessionQuery.maybeSingle();
  if (sessionError) throw sessionError;
  if (!session) return respond({ error: adminAction ? 'Virtual estimate session not found.' : 'This virtual estimate invite is invalid.' }, 403);
  if (!adminAction && session.invite_expires_at && new Date(session.invite_expires_at).getTime() < Date.now()) {
    return respond({ error: 'This virtual estimate invite has expired.' }, 403);
  }
  if (['closed', 'cancelled', 'canceled', 'completed'].includes(String(session.status || '').toLowerCase())) {
    return respond({ error: 'This virtual estimate session is no longer active.' }, 409);
  }

  if (action === 'enable') {
    const consentAt = new Date().toISOString();
    const { error } = await supabase.from('virtual_estimate_sessions')
      .update({ ai_assistant_enabled: true, ai_consent_at: consentAt, ai_last_updated_at: consentAt }).eq('id', session.id);
    if (error) throw error;
    return respond({ enabled: true, consentAt, summary: session.ai_summary || {} });
  }
  if (action === 'disable') {
    const { error } = await supabase.from('virtual_estimate_sessions')
      .update({ ai_assistant_enabled: false, ai_last_updated_at: new Date().toISOString() }).eq('id', session.id);
    if (error) throw error;
    return respond({ enabled: false, summary: session.ai_summary || {} });
  }
  if (action === 'state' || action === 'state_admin') {
    const { data: events, error } = await supabase.from('virtual_estimate_transcripts')
      .select('sequence_number, speaker, source_language, original_text, translated_text, services, pricing_inputs, keywords, missing_questions, summary, confidence, created_at')
      .eq('virtual_estimate_session_id', session.id).order('created_at', { ascending: false }).limit(16);
    if (error) throw error;
    return respond({ enabled: Boolean(session.ai_assistant_enabled), consentAt: session.ai_consent_at, summary: session.ai_summary || {}, events: events || [] });
  }

  const speaker: Speaker = action === 'process_agent_audio' ? 'agent' : 'customer';
  if (!['process_audio', 'process_agent_audio'].includes(action)) return respond({ error: 'Unsupported action' }, 400);
  if (!session.ai_assistant_enabled || !session.ai_consent_at) return respond({ error: 'AI transcription has not been enabled by the customer.' }, 403);
  const audio = typeof body?.audio === 'string' ? body.audio : '';
  const mimeType = typeof body?.mimeType === 'string' ? body.mimeType : 'audio/webm';
  const sequenceNumber = Number(body?.sequenceNumber);
  if (!audio || !Number.isInteger(sequenceNumber) || sequenceNumber < 1) return respond({ error: 'audio and a positive sequenceNumber are required' }, 400);
  if (audio.length > MAX_AUDIO_BASE64_LENGTH) return respond({ error: 'Audio clip is too large' }, 413);
  const normalizedMime = mimeType.split(';')[0].trim() || 'audio/webm';
  const formData = new FormData();
  formData.append('file', new Blob([decodeAudio(audio)], { type: normalizedMime }), `virtual-estimate-${speaker}.${extensionForMime(normalizedMime)}`);
  formData.append('model', 'gpt-4o-mini-transcribe');
  formData.append('prompt', 'This is a BC Pressure Washing virtual estimate. Expect exterior cleaning terms such as window cleaning, panes, screens, tracks, gutters, downspouts, gutter guards, roof moss, soft wash, house wash, driveway, patio, deck, pressure washing, storefront glass, storeys, square feet, and service frequency.');
  const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST', headers: { Authorization: `Bearer ${openAiKey}` }, body: formData,
  });
  if (!transcriptionResponse.ok) {
    const detail = await transcriptionResponse.text();
    console.error('virtual estimate transcription failed', transcriptionResponse.status, detail);
    return respond({ error: `Transcription failed (${transcriptionResponse.status})` }, 502);
  }
  const transcription = await transcriptionResponse.json();
  const originalText = typeof transcription?.text === 'string' ? transcription.text.trim() : '';
  if (originalText.length < 2) return respond({ ignored: true, summary: session.ai_summary || {} });

  const speakerInstructions = speaker === 'customer'
    ? 'The speaker is the CUSTOMER. Extract property/service facts they explicitly state. If they mention a dollar amount, place it only in customer_mentioned_price; it is not a calculated quote.'
    : 'The speaker is JAYDEN, the estimator. Use his speech for context, service keywords, and property facts he explicitly confirms. Do not treat a price Jayden proposes as customer_mentioned_price and never convert his sales language into a customer fact.';
  const analysisResponse = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST', headers: { Authorization: `Bearer ${openAiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'gpt-5-mini',
      input: [
        { role: 'system', content: [{ type: 'input_text', text: `You are an estimate-note extractor for BC Pressure Washing. ${speakerInstructions} Translate the speech to clear English and extract only facts explicitly stated. Never invent measurements, quantities, service scope, or prices. Do not calculate a final price. Use null for pricing inputs not stated. missing_questions should contain only useful unanswered questions needed to price the detected services. Keep keywords short and operational. If the source is already English, translated_text should be a lightly cleaned English version of the transcript.` }] },
        { role: 'user', content: [{ type: 'input_text', text: originalText }] },
      ],
      text: { format: { type: 'json_schema', name: 'virtual_estimate_analysis', strict: true, schema: analysisSchema } },
    }),
  });
  if (!analysisResponse.ok) {
    const detail = await analysisResponse.text();
    console.error('virtual estimate analysis failed', analysisResponse.status, detail);
    return respond({ error: `Estimate analysis failed (${analysisResponse.status})` }, 502);
  }
  const analysisPayload = await analysisResponse.json();
  const rawAnalysis = extractResponseText(analysisPayload);
  let analysis: Analysis;
  try { analysis = JSON.parse(rawAnalysis) as Analysis; }
  catch { console.error('invalid structured estimate output', rawAnalysis); return respond({ error: 'Estimate analysis returned invalid structured data' }, 502); }
  const services = uniqueStrings(analysis.services).filter((service) => SERVICES.includes(service as any));
  const keywords = uniqueStrings(analysis.keywords);
  const missingQuestions = uniqueStrings(analysis.missing_questions);
  const pricingInputs = mergePricingInputs({}, analysis.pricing_inputs);
  if (speaker === 'agent') delete pricingInputs.customer_mentioned_price;
  const translatedText = (analysis.translated_text || originalText).trim();
  const sourceLanguage = (analysis.source_language || 'Unknown').trim();
  const confidence = Math.max(0, Math.min(1, Number(analysis.confidence) || 0));
  const { data: inserted, error: insertError } = await supabase.from('virtual_estimate_transcripts').upsert({
    virtual_estimate_session_id: session.id, sequence_number: sequenceNumber, speaker, source_language: sourceLanguage,
    original_text: originalText, translated_text: translatedText, services, pricing_inputs: pricingInputs, keywords,
    missing_questions: missingQuestions, summary: analysis.summary || '', confidence,
  }, { onConflict: 'virtual_estimate_session_id,speaker,sequence_number' })
    .select('sequence_number, speaker, source_language, original_text, translated_text, services, pricing_inputs, keywords, missing_questions, summary, confidence, created_at').single();
  if (insertError) throw insertError;
  const { count } = await supabase.from('virtual_estimate_transcripts')
    .select('id', { head: true, count: 'exact' }).eq('virtual_estimate_session_id', session.id);
  const previousSummary = session.ai_summary && typeof session.ai_summary === 'object' ? session.ai_summary as JsonRecord : {};
  const rollingSummary = {
    ...previousSummary,
    sourceLanguage,
    services: uniqueStrings(previousSummary.services, services),
    pricingInputs: mergePricingInputs(previousSummary.pricingInputs, pricingInputs),
    keywords: uniqueStrings(previousSummary.keywords, keywords),
    missingQuestions,
    latestSummary: analysis.summary || '',
    lastOriginalText: originalText,
    lastTranslatedText: translatedText,
    lastSpeaker: speaker,
    transcriptCount: count ?? Number(previousSummary.transcriptCount || 0) + 1,
    confidence,
  };
  const { error: updateError } = await supabase.from('virtual_estimate_sessions')
    .update({ ai_summary: rollingSummary, ai_last_updated_at: new Date().toISOString() }).eq('id', session.id);
  if (updateError) throw updateError;
  return respond({ event: inserted, summary: rollingSummary });
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return respond({ error: 'Method not allowed' }, 405);
  try {
    const body = await req.json();
    const openAiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAiKey) return respond({ error: 'OPENAI_API_KEY not configured' }, 500);
    if (typeof body?.action === 'string' && ['state', 'state_admin', 'enable', 'disable', 'process_audio', 'process_agent_audio'].includes(body.action)) {
      return await handleVirtualEstimate(req, body, openAiKey);
    }
    return await handleLegacyTranscription(body, openAiKey);
  } catch (error) {
    console.error('transcribe-voice-note error', error);
    return respond({ error: error instanceof Error ? error.message : 'Unknown error' }, 500);
  }
});
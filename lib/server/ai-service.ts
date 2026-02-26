import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: process.env.AI_URL,
  apiKey: process.env.AI_KEY,
  defaultHeaders: {
    'HTTP-Referer': process.env.APP_URL || 'http://localhost:3000',
    'X-Title': 'Ailex',
  },
});

function parseResponseToJSON(responseText: string): unknown {
  if (!responseText || typeof responseText !== 'string') {
    throw new Error('Invalid response text');
  }

  let cleaned = responseText
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  const firstJsonChar = cleaned.search(/[{[]/);
  const lastBrace = cleaned.lastIndexOf('}');
  const lastBracket = cleaned.lastIndexOf(']');
  const lastJsonChar = Math.max(lastBrace, lastBracket);

  if (firstJsonChar !== -1 && lastJsonChar !== -1) {
    cleaned = cleaned.substring(firstJsonChar, lastJsonChar + 1);
  }

  try {
    return JSON.parse(cleaned);
  } catch {
    try {
      return JSON.parse(cleaned.replace(/,(\s*[}\]])/g, '$1'));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Failed JSON parse:', cleaned.substring(0, 200));
      throw new Error(`JSON parse error: ${msg}`);
    }
  }
}

async function callAI(
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  options: { temperature?: number; max_tokens?: number; model?: string } = {}
): Promise<unknown> {
  const model = options.model || process.env.AI_MODEL;

  if (!process.env.AI_URL || !process.env.AI_KEY || !model) {
    throw new Error('Missing required AI environment variables');
  }

  const response = await client.chat.completions.create({
    model,
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens ?? 800,
    response_format: { type: 'json_object' },
  });

  const rawContent = response.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error('AI returned empty response');
  }

  const parsed = parseResponseToJSON(rawContent);

  if (parsed === null) {
    throw new Error('Failed to parse AI response to valid JSON');
  }

  return parsed;
}

export async function callChatCompletion(
  userMessage: string,
  systemPrompt: string,
  history: { role: 'user' | 'assistant'; content: string }[] = []
) {
  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: userMessage },
  ];

  return callAI(messages, { temperature: 0.3, max_tokens: 500 });
}

export async function callPdfAnalysis(textContent: string, systemPrompt: string) {
  const messages: { role: 'system' | 'user'; content: string }[] = [
    { role: 'system', content: systemPrompt },
    {
      role: 'user',
      content: `Please analyze the following document/contract text for compliance issues:\n\n${textContent}`,
    },
  ];

  return callAI(messages, { temperature: 0.2, max_tokens: 2000 });
}

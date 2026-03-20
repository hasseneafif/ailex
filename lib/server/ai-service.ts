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

const RISKS_DELIMITER = '<<<RISKS>>>';
const STREAMING_PROMPT_SUFFIX = `

IMPORTANT: Structure your response using this exact format:
1. Write your answer as plain text — keep it to 1-2 sentences maximum, no more.
2. On a new line write exactly: <<<RISKS>>>
3. Then write a JSON array of risks: [{"type":"string","severity":"low|medium|high","law_reference":"string","explanation":"string"}] — use [] if none.
Do not use any other format or markdown fences.`;

export async function* streamChatCompletion(
  userMessage: string,
  systemPrompt: string,
  history: { role: 'user' | 'assistant'; content: string }[] = []
): AsyncGenerator<{ type: 'chunk'; text: string } | { type: 'risks'; risks: unknown[] }> {
  const model = process.env.AI_MODEL;

  if (!process.env.AI_URL || !process.env.AI_KEY || !model) {
    throw new Error('Missing required AI environment variables');
  }

  const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
    { role: 'system', content: systemPrompt + STREAMING_PROMPT_SUFFIX },
    ...history,
    { role: 'user', content: userMessage },
  ];

  const stream = await client.chat.completions.create({
    model,
    messages,
    temperature: 0.3,
    max_tokens: 500,
    stream: true,
  });

  let buffer = '';
  let delimiterFound = false;

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || '';
    if (!text) continue;

    buffer += text;

    if (delimiterFound) continue;

    const delimIdx = buffer.indexOf(RISKS_DELIMITER);
    if (delimIdx !== -1) {
      delimiterFound = true;
      const answerPart = buffer.substring(0, delimIdx);
      if (answerPart) yield { type: 'chunk', text: answerPart };
      buffer = buffer.substring(delimIdx + RISKS_DELIMITER.length);
    } else {
      // Yield safe portion, keeping enough to detect the delimiter
      const safeLen = Math.max(0, buffer.length - RISKS_DELIMITER.length);
      if (safeLen > 0) {
        yield { type: 'chunk', text: buffer.substring(0, safeLen) };
        buffer = buffer.substring(safeLen);
      }
    }
  }

  if (!delimiterFound) {
    if (buffer) yield { type: 'chunk', text: buffer };
    yield { type: 'risks', risks: [] };
  } else {
    let risks: unknown[] = [];
    const risksText = buffer.trim();
    if (risksText) {
      try {
        const parsed = JSON.parse(risksText);
        risks = Array.isArray(parsed) ? parsed : [];
      } catch {
        risks = [];
      }
    }
    yield { type: 'risks', risks };
  }
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

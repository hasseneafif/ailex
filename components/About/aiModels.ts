export interface AIModel {
  label: string;
  value: string; 
}

export const AI_MODELS: AIModel[] = [
  { label: "LLama", value: "llama" },
  { label: "GPT-3.5", value: "gpt-3.5" },
  { label: "GPT-4", value: "gpt-4" },
  { label: "Gemini-2.5", value: "gemini-2.5" },

];

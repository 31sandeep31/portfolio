/**
 * Client-safe UI strings for the chat widget.
 *
 * Everything here ends up in the browser bundle, so keep it public.
 * The assistant's knowledge/prompt lives in config/assistant-knowledge.ts,
 * which is server-only.
 */
export const assistantConfig = {
  name: "Sandeep's assistant",
  greeting:
    "Ask me about Sandeep, his work, or anything on this site. I'll keep it short.",
  suggestions: [
    "Who is Sandeep?",
    "What's his work experience?",
    "How do I get his CV?",
    "How can I contact him?",
  ],
  placeholder: "Ask a question…",
};

import type { NextRequest } from "next/server";

import { systemPrompt } from "@/config/assistant-knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_MESSAGES = 16;
const MAX_MESSAGE_CHARS = 4000;
const MAX_OUTPUT_TOKENS = 1500;
const RATE_LIMIT = { windowMs: 60_000, max: 12 };

type ChatMessage = { role: "user" | "assistant"; content: string };

const buckets = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();

  if (buckets.size > 1000) {
    buckets.forEach((value, key) => {
      if (value.resetAt <= now) buckets.delete(key);
    });
  }

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT.windowMs });

    return false;
  }

  bucket.count += 1;

  return bucket.count > RATE_LIMIT.max;
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== "object" || body === null) return null;

  const raw = (body as { messages?: unknown }).messages;

  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) {
    return null;
  }

  const messages: ChatMessage[] = [];

  for (const item of raw) {
    if (typeof item !== "object" || item === null) return null;

    const { role, content } = item as { role?: unknown; content?: unknown };

    if (
      (role !== "user" && role !== "assistant") ||
      typeof content !== "string"
    ) {
      return null;
    }

    const text = content.trim();

    if (!text || text.length > MAX_MESSAGE_CHARS) return null;

    messages.push({ role, content: text });
  }

  return messages;
}

/** Reasoning effort per model family. Gemini 3 uses thinkingLevel, 2.x uses thinkingBudget. */
function thinkingConfig(model: string): Record<string, unknown> {
  if (model.startsWith("gemini-2.")) {
    return { thinkingConfig: { thinkingBudget: 0 } };
  }

  if (model.startsWith("gemini-3")) {
    // 3.7/3.8 dropped the `minimal` level.
    const level =
      model.includes("3.7") || model.includes("3.8") ? "low" : "minimal";

    return { thinkingConfig: { thinkingLevel: level } };
  }

  return {};
}

function errorResponse(status: number, message: string): Response {
  return Response.json({ error: message }, { status });
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return errorResponse(
      503,
      "The assistant is not configured yet. Add GEMINI_API_KEY to the environment.",
    );
  }

  const host = req.headers.get("host");
  const origin = req.headers.get("origin");

  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return errorResponse(403, "Cross-origin requests are not allowed.");
      }
    } catch {
      return errorResponse(403, "Invalid origin.");
    }
  }

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(clientIp)) {
    return errorResponse(429, "Too many messages. Please wait a moment.");
  }

  let parsed: ChatMessage[] | null = null;

  try {
    parsed = parseMessages(await req.json());
  } catch {
    parsed = null;
  }

  if (!parsed) {
    return errorResponse(400, "Invalid message payload.");
  }

  const model = process.env.GEMINI_MODEL?.trim() || "gemini-3.5-flash";
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}` +
    ":streamGenerateContent?alt=sse";

  let upstream: Response;

  try {
    upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: parsed.map(({ role, content }) => ({
          role: role === "assistant" ? "model" : "user",
          parts: [{ text: content }],
        })),
        systemInstruction: { parts: [{ text: systemPrompt }] },
        generationConfig: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          ...thinkingConfig(model),
        },
      }),
      cache: "no-store",
    });
  } catch {
    return errorResponse(502, "Could not reach the assistant service.");
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");

    console.error(
      "Gemini request failed",
      upstream.status,
      detail.slice(0, 500),
    );

    if (upstream.status === 429) {
      return errorResponse(
        429,
        "The assistant is busy right now. Try again soon.",
      );
    }

    return errorResponse(
      502,
      "The assistant returned an error. Please try again.",
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";

      try {
        for (;;) {
          const { done, value } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");

          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();

            if (!trimmed.startsWith("data:")) continue;

            const payload = trimmed.slice(5).trim();

            if (!payload || payload === "[DONE]") continue;

            try {
              const chunk = JSON.parse(payload) as {
                candidates?: { content?: { parts?: { text?: string }[] } }[];
              };

              const text = chunk.candidates?.[0]?.content?.parts
                ?.map((part) => part.text ?? "")
                .join("");

              if (text) controller.enqueue(encoder.encode(text));
            } catch {
              // Ignore malformed SSE fragments.
            }
          }
        }
      } catch (error) {
        console.error("Stream interrupted", error);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

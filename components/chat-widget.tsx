"use client";

import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";

import { assistantConfig } from "@/config/assistant";

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
}

type Status = "idle" | "sending" | "streaming";

const ChatIcon = () => (
  <svg
    aria-hidden
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.7"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" />
  </svg>
);

const CloseIcon = () => (
  <svg
    aria-hidden
    fill="none"
    height="18"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="18"
  >
    <path d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const SendIcon = () => (
  <svg
    aria-hidden
    fill="none"
    height="18"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="18"
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

let counter = 0;
const nextId = () => `m-${Date.now()}-${counter++}`;

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const busy = status !== "idle";

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent | globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const el = scrollRef.current;

    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, error, isOpen]);

  const dropReply = useCallback((id: string) => {
    setMessages((prev) =>
      prev.filter((m) => m.id !== id || m.content.length > 0),
    );
  }, []);

  const send = useCallback(
    async (rawText: string) => {
      const content = rawText.trim();

      if (!content || busy) return;

      setError(null);
      setInput("");

      if (inputRef.current) inputRef.current.style.height = "auto";

      const history: Message[] = [
        ...messages,
        { id: nextId(), role: "user", content },
      ];
      const replyId = nextId();

      setMessages([
        ...history,
        { id: replyId, role: "assistant", content: "" },
      ]);
      setStatus("sending");

      const controller = new AbortController();

      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map(({ role, content: text }) => ({
              role,
              content: text,
            })),
          }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as {
            error?: string;
          } | null;

          throw new Error(
            data?.error ?? "Something went wrong. Please try again.",
          );
        }

        if (!res.body) {
          throw new Error("The assistant returned an empty response.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";

        for (;;) {
          const { done, value } = await reader.read();

          if (done) break;

          acc += decoder.decode(value, { stream: true });
          setStatus("streaming");
          setMessages((prev) =>
            prev.map((m) => (m.id === replyId ? { ...m, content: acc } : m)),
          );
        }

        if (!acc.trim()) {
          throw new Error(
            "The assistant returned an empty reply. Please try again.",
          );
        }

        setAnnouncement(`Assistant replied: ${acc.slice(0, 200)}`);
      } catch (err) {
        const aborted =
          err instanceof DOMException && err.name === "AbortError";

        dropReply(replyId);

        if (aborted) {
          setAnnouncement("Reply stopped.");
        } else {
          const message =
            err instanceof Error
              ? err.message
              : "Something went wrong. Please try again.";

          setError(message);
          setAnnouncement(message);
        }
      } finally {
        abortRef.current = null;
        setStatus("idle");
      }
    },
    [busy, dropReply, messages],
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void send(input);
  };

  const onInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);

    const el = event.target;

    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  };

  const toggle = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      <p aria-live="polite" className="sr-only" role="status">
        {announcement}
      </p>

      <button
        aria-controls="site-assistant-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close site assistant" : "Open site assistant"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-95"
        type="button"
        onClick={toggle}
      >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </button>

      {isOpen && (
        <div
          aria-label={assistantConfig.name}
          className="fixed bottom-24 right-4 z-50 flex max-h-[min(32rem,calc(100dvh-7rem))] w-[min(23rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-default-200 bg-background/95 shadow-2xl backdrop-blur-xl sm:right-5"
          id="site-assistant-panel"
          role="dialog"
        >
          <div className="flex items-center justify-between gap-3 border-b border-default-200 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                <svg
                  aria-hidden
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  {assistantConfig.name}
                </p>
                <p className="text-xs text-default-500">
                  {busy ? "Replying…" : "Answers about Sandeep and this site"}
                </p>
              </div>
            </div>

            <Button
              isIconOnly
              aria-label="Close assistant"
              size="sm"
              variant="light"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </Button>
          </div>

          <div
            ref={scrollRef}
            aria-label="Conversation"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            role="log"
          >
            {messages.length === 0 && (
              <div className="space-y-3">
                <div className="max-w-[90%] rounded-2xl rounded-bl-md bg-default-100 px-3.5 py-2.5 text-sm leading-relaxed text-default-700">
                  {assistantConfig.greeting}
                </div>

                <div className="flex flex-wrap gap-2">
                  {assistantConfig.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      className="rounded-full border border-default-200 px-3 py-1.5 text-xs text-default-600 transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
                      disabled={busy}
                      type="button"
                      onClick={() => void send(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    message.role === "user"
                      ? "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground"
                      : "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-bl-md bg-default-100 px-3.5 py-2.5 text-sm leading-relaxed text-default-700"
                  }
                >
                  {message.content || (busy ? <Spinner size="sm" /> : null)}
                  {message.role === "assistant" &&
                    message.content.length > 0 &&
                    status === "streaming" && (
                      <span
                        aria-hidden
                        className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-current align-middle"
                      />
                    )}
                </div>
              </div>
            ))}

            {error && (
              <p
                className="rounded-lg bg-danger/10 px-3 py-2 text-xs text-danger"
                role="alert"
              >
                {error}
              </p>
            )}
          </div>

          <form
            className="flex items-end gap-2 border-t border-default-200 px-3 py-3"
            onSubmit={onSubmit}
          >
            <textarea
              ref={inputRef}
              aria-label="Message"
              className="max-h-24 min-h-10 flex-1 resize-none rounded-xl border border-default-200 bg-default-50 px-3 py-2.5 text-sm text-foreground placeholder:text-default-500 focus:border-primary focus:outline-none"
              disabled={busy}
              placeholder={assistantConfig.placeholder}
              rows={1}
              value={input}
              onChange={onInput}
              onKeyDown={onKeyDown}
            />

            <Button
              isIconOnly
              aria-label={busy ? "Sending" : "Send message"}
              className="shrink-0"
              color="primary"
              isDisabled={busy || !input.trim()}
              size="sm"
              type="submit"
            >
              <SendIcon />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

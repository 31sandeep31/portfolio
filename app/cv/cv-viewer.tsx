"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

const LockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    height="22"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="22"
  >
    <rect height="11" rx="2" width="18" x="3" y="11" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const BlurredCvPreview = ({ children }: { children: React.ReactNode }) => (
  <div
    className="relative h-[28rem] sm:h-[34rem] w-full rounded-2xl overflow-hidden ring-1 ring-default-200 bg-default-50 select-none"
  >
    <div aria-hidden className="absolute inset-0 p-8 sm:p-12 flex flex-col gap-4 blur-md opacity-70">
      <div className="h-8 w-2/3 rounded bg-default-300" />
      <div className="h-3 w-1/2 rounded bg-default-200" />
      <div className="h-3 w-1/3 rounded bg-default-200" />
      <div className="h-px w-full bg-default-200 my-2" />
      <div className="h-5 w-1/4 rounded bg-default-300" />
      <div className="h-3 w-full rounded bg-default-200" />
      <div className="h-3 w-5/6 rounded bg-default-200" />
      <div className="h-3 w-4/6 rounded bg-default-200" />
      <div className="h-5 w-1/4 rounded bg-default-300 mt-3" />
      <div className="h-3 w-full rounded bg-default-200" />
      <div className="h-3 w-5/6 rounded bg-default-200" />
      <div className="h-3 w-2/3 rounded bg-default-200" />
      <div className="h-5 w-1/4 rounded bg-default-300 mt-3" />
      <div className="grid grid-cols-3 gap-2">
        <div className="h-3 rounded bg-default-200" />
        <div className="h-3 rounded bg-default-200" />
        <div className="h-3 rounded bg-default-200" />
        <div className="h-3 rounded bg-default-200" />
        <div className="h-3 rounded bg-default-200" />
        <div className="h-3 rounded bg-default-200" />
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background/60" />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl bg-background/85 backdrop-blur-md ring-1 ring-default-200 shadow-lg">
        <div className="h-12 w-12 rounded-full bg-primary/15 text-primary flex items-center justify-center">
          <LockIcon />
        </div>
        <p className="text-sm font-semibold tracking-wide uppercase text-default-600">
          Private document
        </p>
        {children}
      </div>
    </div>
  </div>
);


export const CvViewer = () => {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);

        setError(data?.error ?? "Something went wrong.");

        return;
      }
      setPdfUrl(URL.createObjectURL(await res.blob()));
      setKey("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (pdfUrl) {
    return (
      <div className="flex flex-col gap-3">
        <iframe
          className="h-[28rem] sm:h-[34rem] w-full rounded-2xl ring-1 ring-default-200 bg-default-50"
          src={pdfUrl}
          title="Sandeep Kafle CV"
        />
        <Button
          as="a"
          className="w-fit"
          download="Sandeep_Kafle_CV.pdf"
          href={pdfUrl}
          variant="flat"
        >
          Download PDF
        </Button>
      </div>
    );
  }

  return (
    <BlurredCvPreview>
      <form
        className="flex flex-col items-center gap-2 w-56"
        onSubmit={submit}
      >
        <Input
          aria-label="Access key"
          autoComplete="off"
          errorMessage={error}
          inputMode="numeric"
          isInvalid={!!error}
          placeholder="Enter access key"
          size="sm"
          type="password"
          value={key}
          onValueChange={setKey}
        />
        <Button
          fullWidth
          color="primary"
          isDisabled={!key.trim()}
          isLoading={loading}
          size="sm"
          type="submit"
        >
          Unlock CV
        </Button>
      </form>
    </BlurredCvPreview>
  );
};

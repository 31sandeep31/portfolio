import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";

import { MailIcon } from "@/components/icons";

export const metadata = {
  title: "CV access request",
  description:
    "Sandeep Kafle's CV is private. Request access to preview the full document.",
};

const REQUEST_EMAIL = "sandeepkafle31@gmail.com";
const mailtoHref = `mailto:${REQUEST_EMAIL}?subject=${encodeURIComponent(
  "CV access request",
)}&body=${encodeURIComponent(
  [
    "Hi Sandeep,",
    "",
    "I'd like to request access to your CV. A short note about who I am and why I'd like to view it:",
    "",
    "[ Your name ]",
    "[ Your organization / role ]",
    "[ Reason for the request ]",
    "",
    "Thank you,",
  ].join("\n"),
)}`;

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
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const BlurredCvPreview = () => (
  <div
    aria-hidden
    className="relative h-[28rem] sm:h-[34rem] w-full rounded-2xl overflow-hidden ring-1 ring-default-200 bg-default-50 select-none"
  >
    <div className="absolute inset-0 p-8 sm:p-12 flex flex-col gap-4 blur-md opacity-70">
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
      </div>
    </div>
  </div>
);

export default function CvAccessPage() {
  return (
    <section className="flex flex-col gap-8 py-8 md:py-10 max-w-3xl mx-auto">
      <div className="flex flex-col gap-3">
        <Chip color="warning" variant="flat">
          Access required
        </Chip>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          My CV is private
        </h1>
        <p className="text-default-600">
          I share my CV one-to-one. If you&apos;d like to view it, please send a
          short request and I&apos;ll get back to you with a copy.
        </p>
      </div>

      <BlurredCvPreview />

      <Card>
        <CardBody className="gap-4 p-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Request access</h2>
            <p className="text-default-600 text-sm">
              Email me with a brief note about who you are and why you&apos;d
              like to see my CV. I usually reply within a day or two.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              as={Link}
              color="primary"
              href={mailtoHref}
              startContent={<MailIcon size={18} />}
              variant="shadow"
            >
              Request via email
            </Button>
            <Link
              className="text-sm font-mono text-default-600 hover:text-primary"
              href={`mailto:${REQUEST_EMAIL}`}
            >
              {REQUEST_EMAIL}
            </Link>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

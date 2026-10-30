import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";

import { CvViewer } from "./cv-viewer";

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

      <CvViewer />

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

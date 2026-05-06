import Image from "next/image";
import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/card";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { RotatingText } from "@/components/rotating-text";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  DownloadIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { getGalleries } from "./gallery/galleryData";

import SnapshotsPreview from "./SnapshotsPreview";

const stats = [
  { value: "97322", label: "NEC Reg. No." },
  { value: "2025", label: "B.E. Civil & Rural, PoU" },
  { value: "2024+", label: "EWB Nepal volunteer" },
  { value: "Waling", label: "Syangja, Nepal" },
];

const capabilities = [
  {
    title: "Field engineering",
    body: "Post disaster assessments, structural analysis, and survey camps across Kaski, Jajarkot, and Darchula.",
  },
  {
    title: "Community projects",
    body: "Volunteer with the EWB Nepal student chapter on workshops in 3D printing, robotics, and design thinking.",
  },
  {
    title: "Tools I work with",
    body: "AutoCAD, SketchUp, SAP2000, ArcGIS Pro, and DaVinci Resolve for documenting field work.",
  },
];

const socials = [
  { label: "Email", href: siteConfig.links.email, Icon: MailIcon },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedinIcon },
  { label: "Facebook", href: siteConfig.links.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: InstagramIcon },
  { label: "X", href: siteConfig.links.x, Icon: XIcon },
  { label: "WhatsApp", href: siteConfig.links.whatsapp, Icon: WhatsAppIcon },
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon },
];

export default function Home() {
  const galleries = getGalleries();
  const allImages = galleries.flatMap((g) => g.images);

  return (
    <section className="flex flex-col gap-12 sm:gap-16 md:gap-20 pt-2 pb-12 sm:pb-16 md:pb-24">
      {/* HERO */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
        >
          <div className="absolute -top-24 -left-32 h-[26rem] w-[26rem] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 h-[24rem] w-[24rem] rounded-full bg-secondary/20 blur-[120px]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-10 items-start">
          <div className="md:col-span-7 flex flex-col gap-4 sm:gap-5">
            <span className="inline-flex items-center gap-2 text-sm text-default-500 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-success/60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Available for collaborations
            </span>

            <div className="flex flex-col gap-2 sm:gap-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
                Hi, I&apos;m
              </h1>

              <div className="inline-flex items-center gap-3 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 ring-1 ring-primary/30 shadow-sm w-fit max-w-full">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shrink-0"
                />
                <RotatingText
                  className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent leading-[1.15]"
                  words={["Sandeep Kafle", "Civil Engineer"]}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-2">
              <Link
                className={buttonStyles({
                  color: "primary",
                  radius: "full",
                  variant: "shadow",
                  size: "lg",
                })}
                href="/about"
              >
                About me
              </Link>
              <Link
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                  size: "lg",
                })}
                href="/gallery"
              >
                View gallery
              </Link>
              <Link
                className={buttonStyles({
                  variant: "flat",
                  radius: "full",
                  size: "lg",
                })}
                href={siteConfig.links.cv}
              >
                <DownloadIcon size={18} />
                Download CV
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  isExternal
                  aria-label={label}
                  className="text-default-500 hover:text-primary transition-colors"
                  href={href}
                  title={label}
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/40 via-secondary/30 to-transparent blur-3xl opacity-80" />
              <div className="relative h-64 w-64 sm:h-72 sm:w-72 md:h-96 md:w-96 rounded-[2rem] overflow-hidden ring-1 ring-default-200/60 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  fill
                  priority
                  alt="Sandeep Kafle"
                  className="object-cover"
                  sizes="(max-width: 768px) 18rem, 24rem"
                  src="/profile/sandeep.jpg"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent p-4">
                  <p className="text-white text-xs uppercase tracking-widest opacity-80">
                    Pokhara, Kaski
                  </p>
                  <p className="text-white text-base font-semibold">
                    Civil Engineer
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-background/80 backdrop-blur-md ring-1 ring-default-200 shadow-lg">
                <span className="text-xs text-default-500">NEC</span>
                <span className="font-mono font-semibold text-sm">97322</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="bg-default-50/60 hover:bg-default-100 transition-colors"
            shadow="none"
          >
            <CardBody className="gap-1 py-5">
              <p className="text-2xl md:text-3xl font-bold tracking-tight">
                {s.value}
              </p>
              <p className="text-default-500 text-xs md:text-sm uppercase tracking-wider">
                {s.label}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* CAPABILITIES */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">
            What I do
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2">
            Engineering rooted in community
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {capabilities.map((c) => (
            <Card
              key={c.title}
              className="bg-default-50/60 hover:-translate-y-1 transition-transform duration-300"
            >
              <CardBody className="gap-3 p-6">
                <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-semibold">
                  {c.title.charAt(0)}
                </div>
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-default-600 text-sm leading-relaxed">
                  {c.body}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* GALLERY PREVIEW */}
      {allImages.length > 0 ? (
        <div className="flex flex-col gap-6">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-widest">
                Snapshots
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2">
                A few moments from the field
              </h2>
            </div>
            <Link
              className="text-sm font-medium text-primary hover:underline"
              href="/gallery"
            >
              View all photos →
            </Link>
          </div>

          <SnapshotsPreview images={allImages} />
        </div>
      ) : null}

      {/* CTA */}
      <Card className="bg-gradient-to-br from-primary/15 via-secondary/10 to-transparent">
        <CardBody className="p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Have a project in mind?
            </h2>
            <p className="text-default-600 mt-2 max-w-xl">
              Open to freelance work, community engineering collaborations,
              and student mentorship.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              isExternal
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "shadow",
              })}
              href={siteConfig.links.email}
            >
              <MailIcon size={18} />
              Get in touch
            </Link>
            <Link
              isExternal
              className={buttonStyles({
                variant: "bordered",
                radius: "full",
              })}
              href={siteConfig.links.whatsapp}
            >
              <WhatsAppIcon size={18} />
              WhatsApp
            </Link>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

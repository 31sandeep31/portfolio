import Image from "next/image";
import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/card";
import { button as buttonStyles } from "@heroui/theme";

import { getGalleries } from "./gallery/galleryData";
import SnapshotsPreview from "./SnapshotsPreview";

import { siteConfig } from "@/config/site";
import { RotatingText } from "@/components/rotating-text";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  WhatsAppIcon,
} from "@/components/icons";

const LockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    height="18"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="18"
  >
    <rect height="11" rx="2" width="18" x="3" y="11" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const stats = [
  { value: "2026", label: "NEC registered engineer" },
  { value: "2025", label: "B.E. Civil & Rural, PoU" },
  { value: "2024", label: "Joined EWB Nepal" },
  { value: "Waling", label: "Syangja, Nepal" },
];

const capabilities = [
  {
    title: "Field engineering",
    body: "Post-disaster assessments, structural analysis and survey camps in the field.",
    tags: ["Kaski", "Jajarkot", "Darchula"],
  },
  {
    title: "Community projects",
    body: "Volunteering with the EWB Nepal student chapter, running hands-on workshops in schools.",
    tags: ["3D printing", "Robotics", "Design thinking"],
  },
  {
    title: "Day-to-day software",
    body: "From structural analysis to mapping and documenting field work.",
    tags: ["AutoCAD", "SketchUp", "SAP2000", "ArcGIS Pro", "DaVinci Resolve"],
  },
];


const toolActions: Record<string, string> = {
  "Date Converter": "Convert a date",
  "Valuation Report Generator": "Create a report",
  "Water Supply M&E (KPI)": "Track a project",
  Kundali: "Generate a chart",
  "Engineering Calculator": "Run a calculation",
  HydroMAP: "Explore the map",
  Maps: "Explore Nepal's map",
  "Rivers of Nepal": "Explore the rivers",
};

const wave = (y: number) =>
  `M2 ${y}c.6.5 1.2 1 2.5 1C7 ${y + 1} 7 ${y - 1} 9.5 ${y - 1}c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1`;

const toolIcons: Record<string, string[]> = {
  "Date Converter": [
    "M5 4h14a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    "M16 2v4M8 2v4M3 10h18",
  ],
  "Valuation Report Generator": [
    "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
    "M14 2v6h6M8 13h8M8 17h5",
  ],
  "Water Supply M&E (KPI)": ["M3 3v18h18", "M7 14l4-4 3 3 5-6"],
  Kundali: [
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z",
  ],
  "Engineering Calculator": [
    "M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z",
    "M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h8",
  ],
  HydroMAP: ["M12 2.7s7 7.3 7 12.3a7 7 0 0 1-14 0c0-5 7-12.3 7-12.3z"],
  Maps: ["M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z", "M9 3v15M15 6v15"],
  "Rivers of Nepal": [wave(6), wave(12), wave(18)],
};

const ToolIcon = ({ name, className }: { name: string; className?: string }) => (
  <svg
    aria-hidden
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    {(toolIcons[name] ?? ["M5 12h14M13 6l6 6-6 6"]).map((d) => (
      <path key={d} d={d} />
    ))}
  </svg>
);

const socials = [
  { label: "Email", href: siteConfig.links.email, Icon: MailIcon },
  { label: "LinkedIn", href: siteConfig.links.linkedin, Icon: LinkedinIcon },
  { label: "Facebook", href: siteConfig.links.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: InstagramIcon },
  { label: "X", href: siteConfig.links.x, Icon: XIcon },
  { label: "WhatsApp", href: siteConfig.links.whatsapp, Icon: WhatsAppIcon },
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon },
];

const projectItems = [
  ...siteConfig.tools.map((tool) => ({
    label: tool.label,
    href: tool.href,
    description: tool.description,
    external: tool.external,
  })),
  {
    label: siteConfig.maps.label,
    href: siteConfig.maps.href,
    description: siteConfig.maps.title,
    external: true,
  },
  {
    label: siteConfig.rivers.label,
    href: siteConfig.rivers.href,
    description: "Explore the river systems of Nepal.",
    external: true,
  },
];

export default function Home() {
  const galleries = getGalleries();
  const allImages = galleries.flatMap((g) => g.images);

  return (
    <section className="flex flex-col gap-8 sm:gap-10 md:gap-12 pt-0 pb-10 sm:pb-12 md:pb-16">
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
          <div className="md:col-span-7 flex flex-col gap-4 sm:gap-5 md:self-center">
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
                className={`${buttonStyles({
                  color: "primary",
                  radius: "full",
                  variant: "shadow",
                  size: "lg",
                })} active:scale-[0.98]`}
                href="/about"
              >
                About me
              </Link>
              <Link
                className={`${buttonStyles({
                  variant: "bordered",
                  radius: "full",
                  size: "lg",
                })} active:scale-[0.98]`}
                href="/gallery"
              >
                View gallery
              </Link>
              <Link
                className={`${buttonStyles({
                  variant: "flat",
                  radius: "full",
                  size: "lg",
                })} active:scale-[0.98]`}
                href={siteConfig.links.cv}
              >
                <LockIcon />
                Request CV
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

        <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-default-200 border-t border-default-200">
          {capabilities.map((c) => (
            <div
              key={c.title}
              className="flex flex-col gap-4 py-6 md:py-8 md:px-8 first:md:pl-0 last:md:pr-0 border-b md:border-b-0 border-default-200 last:border-b-0"
            >
              <h3 className="font-semibold text-xl">{c.title}</h3>
              <p className="text-default-600 leading-relaxed">{c.body}</p>
              <ul className="flex flex-wrap gap-2 mt-auto">
                {c.tags.map((t) => (
                  <li
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-default-100 text-default-700 text-xs font-medium"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* TOOLS & PROJECTS */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">
            Things I build
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2">
            Tools &amp; projects
          </h2>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectItems.map((item) => (
            <li key={item.label} className="[perspective:1000px]">
              <Link
                className="group block h-48 w-full outline-none"
                href={item.href}
                {...(item.external ? { isExternal: true } : {})}
              >
                <span className="relative block h-full w-full transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]">
                  {/* front */}
                  <span className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-2xl border border-default-200 bg-default-50 p-6 text-foreground [backface-visibility:hidden]">
                    <span className="flex items-start justify-between">
                      <ToolIcon
                        className="h-9 w-9 text-primary"
                        name={item.label}
                      />
                      <span className="text-default-400 text-sm">↗</span>
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-semibold text-lg leading-snug">
                        {item.label}
                      </span>
                      <span className="text-default-500 text-sm leading-snug">
                        {item.description}
                      </span>
                    </span>
                  </span>
                  {/* back */}
                  <span className="absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-primary to-secondary p-6 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="text-xs uppercase tracking-widest opacity-80">
                      Try it now
                    </span>
                    <span className="flex items-end justify-between gap-3">
                      <span className="text-2xl font-semibold leading-tight">
                        {toolActions[item.label] ?? "Open it"}
                      </span>
                      <span
                        aria-hidden
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-lg"
                      >
                        →
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
              Let&apos;s grab a coffee?
            </h2>
            <p className="text-default-600 mt-2 max-w-xl">
              Come say hi, meet up for a chat, or just leave me a message.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              isExternal
              className={`${buttonStyles({
                color: "primary",
                radius: "full",
                variant: "shadow",
              })} active:scale-[0.98]`}
              href={siteConfig.links.email}
            >
              <MailIcon size={18} />
              Get in touch
            </Link>
            <Link
              isExternal
              className={`${buttonStyles({
                variant: "bordered",
                radius: "full",
              })} active:scale-[0.98]`}
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

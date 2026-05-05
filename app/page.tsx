import Image from "next/image";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import { Card, CardBody } from "@heroui/card";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
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

const highlights = [
  { label: "Civil & Rural Engineer" },
  { label: "Pokhara University, 2025" },
  { label: "NEC Reg. No. 97322" },
  { label: "EWB Nepal volunteer" },
];

export default function Home() {
  return (
    <section className="flex flex-col gap-16 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3 flex flex-col gap-5">
          <Chip color="primary" variant="flat">
            Civil and Rural Engineer · Waling, Syangja
          </Chip>

          <div>
            <span className={title()}>Hi, I&apos;m&nbsp;</span>
            <span className={title({ color: "violet" })}>Sandeep Kafle</span>
            <span className={title()}>.</span>
          </div>

          <p className={subtitle({ class: "max-w-xl mt-0" })}>
            I&apos;m a Civil and Rural Engineer from Pokhara University. I work
            on community engineering projects across Nepal.
          </p>

          <div className="flex flex-wrap gap-2">
            {highlights.map((h) => (
              <Chip
                key={h.label}
                className="bg-default-100"
                size="sm"
                variant="flat"
              >
                {h.label}
              </Chip>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-2">
            <Link
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "shadow",
              })}
              href="/about"
            >
              About me
            </Link>
            <Link
              className={buttonStyles({
                variant: "bordered",
                radius: "full",
              })}
              href="/gallery"
            >
              View gallery
            </Link>
            <Link
              className={buttonStyles({
                variant: "flat",
                radius: "full",
              })}
              href={siteConfig.links.cv}
            >
              <DownloadIcon size={18} />
              Download CV
            </Link>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              isExternal
              aria-label="Email"
              className="text-default-500 hover:text-primary"
              href={siteConfig.links.email}
              title="Email"
            >
              <MailIcon />
            </Link>
            <Link
              isExternal
              aria-label="LinkedIn"
              className="text-default-500 hover:text-primary"
              href={siteConfig.links.linkedin}
              title="LinkedIn"
            >
              <LinkedinIcon />
            </Link>
            <Link
              isExternal
              aria-label="Facebook"
              className="text-default-500 hover:text-primary"
              href={siteConfig.links.facebook}
              title="Facebook"
            >
              <FacebookIcon />
            </Link>
            <Link
              isExternal
              aria-label="Instagram"
              className="text-default-500 hover:text-primary"
              href={siteConfig.links.instagram}
              title="Instagram"
            >
              <InstagramIcon />
            </Link>
            <Link
              isExternal
              aria-label="X"
              className="text-default-500 hover:text-primary"
              href={siteConfig.links.x}
              title="X"
            >
              <XIcon />
            </Link>
            <Link
              isExternal
              aria-label="WhatsApp"
              className="text-default-500 hover:text-primary"
              href={siteConfig.links.whatsapp}
              title="WhatsApp"
            >
              <WhatsAppIcon />
            </Link>
            <Link
              isExternal
              aria-label="GitHub"
              className="text-default-500 hover:text-primary"
              href={siteConfig.links.github}
              title="GitHub"
            >
              <GithubIcon />
            </Link>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-2xl" />
            <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden ring-4 ring-default-100 shadow-2xl">
              <Image
                fill
                priority
                alt="Sandeep Kafle"
                className="object-cover"
                sizes="(max-width: 768px) 16rem, 20rem"
                src="/profile/sandeep.jpg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-default-50">
          <CardBody className="gap-2">
            <h3 className="font-semibold">Field engineering</h3>
            <p className="text-default-600 text-sm">
              Post disaster assessments, structural analysis, and survey
              camp work across Kaski, Jajarkot, and Darchula districts.
            </p>
          </CardBody>
        </Card>
        <Card className="bg-default-50">
          <CardBody className="gap-2">
            <h3 className="font-semibold">Community projects</h3>
            <p className="text-default-600 text-sm">
              Volunteer with EWB Nepal student chapter on workshops in 3D
              printing, robotics, and design thinking.
            </p>
          </CardBody>
        </Card>
        <Card className="bg-default-50">
          <CardBody className="gap-2">
            <h3 className="font-semibold">Tools I work with</h3>
            <p className="text-default-600 text-sm">
              AutoCAD, SketchUp, SAP2000, ArcGIS Pro, and DaVinci Resolve
              for documenting field work.
            </p>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

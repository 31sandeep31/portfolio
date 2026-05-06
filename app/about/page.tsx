import Image from "next/image";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { DownloadIcon, MailIcon, LinkedinIcon } from "@/components/icons";

export const metadata = {
  title: "About",
  description:
    "About Sandeep Kafle. Civil and Rural Engineer, EWB Nepal volunteer, Pokhara University.",
};

const education = [
  {
    title: "Bachelor of Civil and Rural Engineering",
    org: "School of Engineering, Pokhara University",
    year: "2025",
  },
  {
    title: "Higher Secondary (10+2)",
    org: "Tilottama Secondary School, Tilottama",
  },
  {
    title: "Secondary (SEE)",
    org: "Kalika Secondary School, Butwal",
  },
];

const experience = [
  {
    role: "President",
    org: "Engineers Without Borders Nepal, Pokhara University Chapter",
    period: "2024 to 2025",
    points: [
      "Led formation of a new student cohort and managed a smooth leadership transition.",
      "Coordinated collaborations including the PoU and Harvard initiative and local community engagement.",
      "Organized 3D printing and robotics workshops and student-led projects.",
    ],
  },
];

const projects = [
  {
    title: "Post Earthquake Impact Assessment, Jajarkot 2023",
    description:
      "Field assessment of damaged structures and community impact following the 2023 Jajarkot earthquake.",
  },
  {
    title:
      "Dynamics of Land Use and Land Cover Change in Pokhara Metropolitan, Kaski",
    description:
      "Undergraduate research on LULC change patterns in the Pokhara metropolitan area using GIS techniques.",
  },
];

const volunteering = [
  "Students Accelerator Program, Darchula (2024 and 2025). iLAB and iJATRA, Design Thinking Workshop.",
  "Karyashala Workshop (2024 and 2025).",
  "Engineers Without Borders Nepal, since 2024.",
];

const skills = [
  "AutoCAD",
  "SketchUp",
  "SAP2000",
  "ArcGIS Pro",
  "Post disaster assessment",
  "Structural analysis",
  "MS Office",
  "DaVinci Resolve",
  "Canva",
];

export default function AboutPage() {
  return (
    <section className="flex flex-col gap-10 py-8 md:py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1 flex md:block justify-center">
          <div className="relative h-56 w-56 rounded-2xl overflow-hidden ring-1 ring-default-200 shadow-lg">
            <Image
              fill
              alt="Sandeep Kafle"
              className="object-cover"
              sizes="14rem"
              src="/profile/sandeep.jpg"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-4">
          <h1 className={title()}>About me</h1>
          <p className={subtitle({ class: "mt-0" })}>
            I&apos;m a Civil Engineer from Waling, Syangja. I have practical
            experience in community projects and volunteer with Engineers
            Without Borders Nepal. I work well independently and stay
            deadline oriented.
          </p>

          <div className="flex flex-wrap gap-2">
            <Chip color="primary" variant="flat">
              NEC Reg. No. 97322
            </Chip>
            <Chip variant="flat">Waling, Syangja</Chip>
            <Chip variant="flat">Pokhara University, 2025</Chip>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <Link
              className={buttonStyles({
                color: "primary",
                radius: "full",
                variant: "shadow",
              })}
              href={siteConfig.links.cv}
            >
              <DownloadIcon size={18} />
              Download CV
            </Link>
            <Link
              isExternal
              className={buttonStyles({
                variant: "bordered",
                radius: "full",
              })}
              href={siteConfig.links.email}
            >
              <MailIcon size={18} />
              Email me
            </Link>
            <Link
              isExternal
              className={buttonStyles({
                variant: "flat",
                radius: "full",
              })}
              href={siteConfig.links.linkedin}
            >
              <LinkedinIcon size={18} />
              LinkedIn
            </Link>
          </div>
        </div>
      </div>

      <Divider />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Education</h2>
          </CardHeader>
          <CardBody className="gap-4">
            {education.map((e) => (
              <div key={e.title}>
                <p className="font-medium">{e.title}</p>
                <p className="text-default-600 text-sm">
                  {e.org}
                  {e.year ? `, ${e.year}` : ""}
                </p>
              </div>
            ))}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Experience</h2>
          </CardHeader>
          <CardBody className="gap-4">
            {experience.map((x) => (
              <div key={x.org}>
                <p className="font-medium">{x.role}</p>
                <p className="text-default-600 text-sm">{x.org}</p>
                <p className="text-default-500 text-xs mt-0.5">
                  {x.period}
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm text-default-700 space-y-1">
                  {x.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Undergraduate projects</h2>
        </CardHeader>
        <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-default-200 p-4"
            >
              <p className="font-medium">{p.title}</p>
              <p className="text-default-600 text-sm mt-1">
                {p.description}
              </p>
            </div>
          ))}
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">
              Volunteering and affiliations
            </h2>
          </CardHeader>
          <CardBody>
            <ul className="list-disc pl-5 text-sm text-default-700 space-y-2">
              {volunteering.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Skills</h2>
          </CardHeader>
          <CardBody className="flex flex-row flex-wrap gap-2">
            {skills.map((s) => (
              <Chip key={s} variant="flat">
                {s}
              </Chip>
            ))}
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

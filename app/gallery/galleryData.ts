import fs from "node:fs";
import path from "node:path";

export type GalleryCategory = {
  key: string;
  label: string;
  description: string;
  folder: string;
  images: string[];
};

const categoryConfig: Omit<GalleryCategory, "images">[] = [
  {
    key: "convocation",
    folder: "convocation",
    label: "Convocation and Graduation",
    description:
      "Convocation ceremony and graduation moments at Pokhara University, 2025.",
  },
  {
    key: "ewb",
    folder: "ewb",
    label: "With EWB",
    description:
      "Workshops, community visits, and field work with Engineers Without Borders Nepal.",
  },
  {
    key: "engineering",
    folder: "engineering",
    label: "Engineering Projects",
    description:
      "Site visits, structural assessments, and project documentation.",
  },
  {
    key: "survey-camp",
    folder: "survey-camp",
    label: "Survey Camp 2081",
    description:
      "Survey camp from the Civil and Rural Engineering programme at Pokhara University, 2081 BS.",
  },
];

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function readFolder(folder: string): string[] {
  const dir = path.join(process.cwd(), "public", "gallery", folder);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => `/gallery/${folder}/${f}`);
}

export function getGalleries(): GalleryCategory[] {
  return categoryConfig
    .map((c) => ({ ...c, images: readFolder(c.folder) }))
    .filter((c) => c.images.length > 0);
}

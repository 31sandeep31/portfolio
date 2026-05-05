import { title, subtitle } from "@/components/primitives";

import GalleryCarousel from "./GalleryCarousel";
import { getGalleries } from "./galleryData";

export const metadata = {
  title: "Gallery",
  description:
    "Photo gallery. EWB Nepal, engineering projects, survey camp, and convocation.",
};

export default function GalleryPage() {
  const galleries = getGalleries();

  return (
    <section className="flex flex-col gap-12 py-8 md:py-10">
      <div>
        <h1 className={title()}>Gallery</h1>
        <p className={subtitle({ class: "mt-2 max-w-2xl" })}>
          A collection of moments from field work, EWB Nepal projects,
          survey camp, and graduation. Each section auto plays. Hover to
          pause and click any photo to view it full size.
        </p>
      </div>

      {galleries.map((cat) => (
        <GalleryCarousel key={cat.key} category={cat} />
      ))}
    </section>
  );
}

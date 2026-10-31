import GalleryCarousel from "./GalleryCarousel";
import { getGalleries } from "./galleryData";

import { title, subtitle } from "@/components/primitives";

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
          Moments from field work, EWB Nepal projects, survey camp, and
          graduation.
        </p>
      </div>

      {galleries.map((cat) => (
        <GalleryCarousel key={cat.key} category={cat} />
      ))}
    </section>
  );
}

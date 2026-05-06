"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { AnimatePresence, motion } from "framer-motion";

import type { GalleryCategory } from "./galleryData";

const AUTO_INTERVAL_MS = 3000;

export default function GalleryCarousel({
  category,
}: {
  category: GalleryCategory;
}) {
  const [[active, direction], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);
  const total = category.images.length;
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const goTo = (i: number) => {
    const target = ((i % total) + total) % total;

    setState(([current]) => [target, target > current ? 1 : -1]);
  };
  const next = () => setState(([i]) => [(i + 1) % total, 1]);
  const prev = () => setState(([i]) => [(i - 1 + total) % total, -1]);

  useEffect(() => {
    if (paused || isOpen || total < 2) return;

    timer.current = setInterval(() => {
      setState(([i]) => [(i + 1) % total, 1]);
    }, AUTO_INTERVAL_MS);

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, isOpen, total]);

  useEffect(() => {
    const container = thumbsRef.current;
    const target = container?.querySelector<HTMLElement>(
      `[data-thumb-index="${active}"]`,
    );

    if (!container || !target) return;

    // Scroll only the thumbnail strip horizontally, never the page.
    const targetCenter = target.offsetLeft + target.offsetWidth / 2;
    const desired = targetCenter - container.clientWidth / 2;
    const max = container.scrollWidth - container.clientWidth;
    const clamped = Math.max(0, Math.min(desired, max));

    container.scrollTo({ left: clamped, behavior: "smooth" });
  }, [active]);

  if (total === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {category.label}
          </h2>
          <p className="text-default-600 text-sm max-w-2xl mt-1">
            {category.description}
          </p>
        </div>
        <span className="text-default-500 text-xs tabular-nums">
          {active + 1} / {total}
        </span>
      </div>

      <div
        aria-label={`${category.label} slideshow`}
        className="group relative w-full overflow-hidden rounded-3xl bg-default-100 ring-1 ring-default-200 shadow-lg"
        role="region"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full">
          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <motion.button
              key={category.images[active]}
              animate={{ x: 0, opacity: 1 }}
              aria-label={`Open photo ${active + 1}`}
              className="absolute inset-0"
              custom={direction}
              exit={{
                x: direction > 0 ? "-30%" : "30%",
                opacity: 0,
              }}
              initial={{
                x: direction > 0 ? "30%" : "-30%",
                opacity: 0,
              }}
              transition={{
                x: { type: "spring", stiffness: 260, damping: 32 },
                opacity: { duration: 0.4 },
              }}
              type="button"
              onClick={onOpen}
            >
              <Image
                fill
                alt={`${category.label} photo ${active + 1}`}
                className="object-cover"
                priority={active === 0}
                sizes="(max-width: 1024px) 100vw, 80vw"
                src={category.images[active]}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.button>
          </AnimatePresence>
        </div>

        {total > 1 ? (
          <>
            <Button
              isIconOnly
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              radius="full"
              variant="flat"
              onPress={prev}
            >
              <svg
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
                width="20"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Button>
            <Button
              isIconOnly
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              radius="full"
              variant="flat"
              onPress={next}
            >
              <svg
                fill="none"
                height="20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                viewBox="0 0 24 24"
                width="20"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md">
              {category.images.map((src, i) => (
                <button
                  key={`${src}-dot`}
                  aria-label={`Go to photo ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "bg-white w-6"
                      : "bg-white/50 w-1.5 hover:bg-white/80"
                  }`}
                  type="button"
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {total > 1 ? (
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
        >
          {category.images.map((src, i) => (
            <button
              key={`${src}-thumb`}
              aria-label={`Show photo ${i + 1}`}
              className={`relative shrink-0 snap-start h-16 w-24 md:h-20 md:w-28 rounded-xl overflow-hidden ring-1 transition-all ${
                i === active
                  ? "ring-2 ring-primary scale-[1.03]"
                  : "ring-default-200 opacity-70 hover:opacity-100"
              }`}
              data-thumb-index={i}
              type="button"
              onClick={() => goTo(i)}
            >
              <Image
                fill
                alt=""
                className="object-cover"
                loading="lazy"
                sizes="112px"
                src={src}
              />
            </button>
          ))}
        </div>
      ) : null}

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        scrollBehavior="inside"
        size="5xl"
        onClose={onClose}
      >
        <ModalContent>
          {() => (
            <ModalBody className="p-0">
              <div className="relative w-full bg-black">
                <div className="relative w-full h-[80vh]">
                  <Image
                    fill
                    alt={`${category.label} photo ${active + 1}`}
                    className="object-contain"
                    sizes="100vw"
                    src={category.images[active]}
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                  <Button
                    isIconOnly
                    aria-label="Previous"
                    className="pointer-events-auto bg-black/40 text-white"
                    radius="full"
                    variant="flat"
                    onPress={prev}
                  >
                    ‹
                  </Button>
                  <Button
                    isIconOnly
                    aria-label="Next"
                    className="pointer-events-auto bg-black/40 text-white"
                    radius="full"
                    variant="flat"
                    onPress={next}
                  >
                    ›
                  </Button>
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 text-white text-xs px-3 py-1">
                  {active + 1} / {total}
                </div>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}

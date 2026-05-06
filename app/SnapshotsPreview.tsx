"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@heroui/link";

const COUNT = 6;

function pickRandom(images: string[], count: number): string[] {
  if (images.length <= count) return [...images];

  const pool = [...images];
  const out: string[] = [];

  for (let i = 0; i < count && pool.length > 0; i += 1) {
    const idx = Math.floor(Math.random() * pool.length);

    out.push(pool[idx]);
    pool.splice(idx, 1);
  }

  return out;
}

export default function SnapshotsPreview({ images }: { images: string[] }) {
  // Deterministic on server + first client render so hydration matches.
  const [picked, setPicked] = useState<string[]>(() =>
    images.slice(0, COUNT),
  );

  // After mount, shuffle for a fresh selection on every page load.
  useEffect(() => {
    setPicked(pickRandom(images, COUNT));
  }, [images]);

  if (picked.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
      {picked.map((src, i) => (
        <Link
          key={`${src}-${i}`}
          className={`relative aspect-square rounded-2xl overflow-hidden ring-1 ring-default-200 hover:ring-primary transition group ${
            i === 0 ? "md:col-span-2 md:row-span-2 md:aspect-auto" : ""
          }`}
          href="/gallery"
        >
          <Image
            fill
            alt=""
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 16vw"
            src={src}
          />
        </Link>
      ))}
    </div>
  );
}

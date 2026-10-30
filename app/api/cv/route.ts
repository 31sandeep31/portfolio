import { timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CV_BLOB = "Sandeep_Kafle_CV.pdf";
const CV_PATH = path.join(process.cwd(), "private", "Sandeep_Kafle_CV.pdf");

const safeEqual = (a: string, b: string) => {
  const x = new Uint8Array(Buffer.from(a));
  const y = new Uint8Array(Buffer.from(b));

  return x.length === y.length && timingSafeEqual(x, y);
};

export async function POST(req: Request) {
  const expected = process.env.CV_ACCESS_KEY;

  if (!expected) {
    return NextResponse.json(
      { error: "CV access is not configured." },
      { status: 503 },
    );
  }

  const origin = req.headers.get("origin");

  if (origin && origin !== new URL(req.url).origin) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  let key = "";

  try {
    const body = await req.json();

    key = typeof body?.key === "string" ? body.key.trim() : "";
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  if (!key || !safeEqual(key, expected)) {
    return NextResponse.json({ error: "Incorrect key." }, { status: 401 });
  }

  const headers = {
    "Content-Type": "application/pdf",
    "Content-Disposition": 'inline; filename="Sandeep_Kafle_CV.pdf"',
    "Cache-Control": "no-store",
  };

  try {
    return new Response(new Uint8Array(await readFile(CV_PATH)), { headers });
  } catch {
    // not on disk (e.g. Vercel): fall back to the private Blob store
  }

  try {
    const blob = await get(CV_BLOB, { access: "private" });

    if (blob?.statusCode === 200) {
      return new Response(blob.stream, { headers });
    }
  } catch {
    // fall through to 404
  }

  return NextResponse.json(
    { error: "The CV file is not available on this server." },
    { status: 404 },
  );
}

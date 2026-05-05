"use client";

import { useState } from "react";
import NepaliDate from "nepali-date-converter";

function pad(num: number) {
  return String(num).padStart(2, "0");
}

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export default function DateConverterPage() {
  const [adDate, setAdDate] = useState(() => toIsoDate(new Date()));
  const [bsDate, setBsDate] = useState("");
  const [convertedBs, setConvertedBs] = useState("");
  const [convertedAd, setConvertedAd] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdDateChange = (value: string) => {
    setError(null);
    setAdDate(value);
  };

  const handleBsDateChange = (value: string) => {
    setError(null);
    setBsDate(value);
  };

  const handleConvert = () => {
    if (!adDate && !bsDate) {
      setError("Please provide at least one date to convert.");
      return;
    }

    setError(null);

    if (adDate) {
      try {
        const jsDate = new Date(adDate);
        if (Number.isNaN(jsDate.getTime())) throw new Error("Invalid AD date");
        const nd = new NepaliDate(jsDate);
        const bs = nd.getBS();
        setConvertedBs(`${bs.year}-${pad(bs.month + 1)}-${pad(bs.date)}`);
      } catch {
        setConvertedBs("");
        setError("Unable to convert the English (AD) date. Please check the value.");
      }
    }

    if (bsDate) {
      try {
        const nd = new NepaliDate(bsDate);
        const jsDate = nd.toJsDate();
        if (Number.isNaN(jsDate.getTime())) throw new Error("Invalid BS date");
        setConvertedAd(toIsoDate(jsDate));
      } catch {
        setConvertedAd("");
        setError((prev) => prev || "Unable to convert the Nepali (BS) date. Please check the value.");
      }
    }
  };

  return (
    <section className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-semibold">Date Converter</h1>
      <p className="mt-2 text-default-500">
        Convert between English (AD) and Nepali (BS) dates.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium">English Date (AD)</label>
          <input
            className="w-full rounded-lg border border-default-200 bg-default-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            type="date"
            value={adDate}
            onChange={(event) => handleAdDateChange(event.target.value)}
          />
          <p className="text-sm text-default-500">
            Nepali (BS): <span className="font-medium">{convertedBs || "—"}</span>
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Nepali Date (BS)</label>
          <input
            className="w-full rounded-lg border border-default-200 bg-default-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="2051-05-24"
            value={bsDate}
            onChange={(event) => handleBsDateChange(event.target.value)}
          />
          <p className="text-sm text-default-500">
            English (AD): <span className="font-medium">{convertedAd || "—"}</span>
          </p>
        </div>
      </div>

      {error ? (
        <p className="mt-6 text-sm text-danger">{error}</p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
          onClick={handleConvert}
          type="button"
        >
          Convert
        </button>
        <button
          className="inline-flex items-center justify-center rounded-full border border-default-200 bg-transparent px-5 py-2 text-sm font-semibold text-default-700 hover:bg-default-100"
          onClick={() => {
            setAdDate(toIsoDate(new Date()));
            setBsDate("");
            setConvertedBs("");
            setConvertedAd("");
            setError(null);
          }}
          type="button"
        >
          Reset
        </button>
      </div>

      <div className="mt-10 rounded-xl border border-default-200 bg-default-50 p-5">
        <h2 className="text-lg font-medium">How it works</h2>
        <p className="mt-2 text-sm text-default-500">
          This tool uses <code>nepali-date-converter</code> to translate between
          Nepali (Bikram Sambat) and English (Anno Domini) calendars.
        </p>
      </div>
    </section>
  );
}

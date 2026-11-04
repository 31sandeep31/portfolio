"use client";

import { useEffect } from "react";
import Script from "next/script";
import { Analytics, track } from "@vercel/analytics/react";

/**
 * Page views (with referrer, country, device) come from <Analytics />.
 * The click listener below adds custom events for outbound links, mailto,
 * and CV actions. Never send message text or personal data in event props.
 */
export function SiteAnalytics() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.("a");

      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";

      try {
        if (href.startsWith("mailto:")) {
          track("email_click", { from: location.pathname });
        } else if (/^https?:/i.test(href)) {
          const url = new URL(href);

          if (url.host !== location.host) {
            track("outbound_click", {
              host: url.host.replace(/^www\./, ""),
              from: location.pathname,
            });
          }
        }
      } catch {
        /* analytics must never break navigation */
      }
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      <Analytics />
      {clarityId ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(clarityId)});`}
        </Script>
      ) : null}
    </>
  );
}

export function trackEvent(
  name: string,
  props?: Record<string, string | number | boolean>,
) {
  try {
    track(name, props);
  } catch {
    /* ignore */
  }
}

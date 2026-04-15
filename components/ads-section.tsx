"use client";

import { useEffect, useMemo, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdsSection() {
  const adRef = useRef<HTMLElement | null>(null);
  const hasRequestedAdRef = useRef(false);

  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adsenseSlot = process.env.NEXT_PUBLIC_ADSENSE_FOOTER_SLOT;
  const canRenderAds = Boolean(adsenseClient && adsenseSlot);

  const placeholderText = useMemo(() => {
    if (process.env.NODE_ENV !== "production") {
      return "Ad preview (shown in production only)";
    }

    if (!canRenderAds) {
      return "Ad is disabled. Set AdSense env vars to enable.";
    }

    return null;
  }, [canRenderAds]);

  useEffect(() => {
    if (!canRenderAds || hasRequestedAdRef.current || !adRef.current) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      hasRequestedAdRef.current = true;
    } catch (error) {
      console.error("AdSense init error:", error);
    }
  }, [canRenderAds]);

  return (
    <section aria-label="Advertisement" className="mb-4 w-full">
      <div className="w-full min-h-24 rounded-xl border border-border bg-muted/20 p-4 sm:min-h-28 sm:p-5">
        {placeholderText ? (
          <div className="flex min-h-14 w-full items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 sm:min-h-16">
            <p className="text-sm text-muted-foreground">{placeholderText}</p>
          </div>
        ) : (
          <ins
            ref={adRef}
            className="adsbygoogle block min-h-14 w-full sm:min-h-16"
            data-ad-client={adsenseClient}
            data-ad-format="auto"
            data-ad-slot={adsenseSlot}
            data-full-width-responsive="true"
            style={{ display: "block" }}
          />
        )}
      </div>
    </section>
  );
}

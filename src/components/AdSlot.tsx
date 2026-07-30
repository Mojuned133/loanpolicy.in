"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a real Google AdSense unit when NEXT_PUBLIC_ADSENSE_CLIENT_ID and
 * a slot id are configured. Falls back to a visible placeholder box in dev
 * (or if env vars are missing) so layout doesn't jump when ads load.
 *
 * Get a slot id: AdSense dashboard → Ads → By ad unit → Display ads → Create.
 */
export default function AdSlot({ slot }: { slot?: string }) {
  const insRef = useRef<HTMLModElement>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adSlot = slot || process.env.NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT;

  useEffect(() => {
    if (!clientId || !adSlot) return;
    try {
      // @ts-expect-error - adsbygoogle is injected by the external script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [clientId, adSlot]);

  return (
    <div className="my-8 flex flex-col items-center gap-2">
      <span className="text-xs tracking-wide text-neutral-400">ADVERTISEMENT</span>

      {clientId && adSlot ? (
        <ins
          ref={insRef}
          className="adsbygoogle block w-full max-w-3xl"
          style={{ display: "block" }}
          data-ad-client={clientId}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex h-24 w-full max-w-3xl items-center justify-center rounded-md border border-dashed border-neutral-300 text-xs text-neutral-300">
          Ad space (set NEXT_PUBLIC_ADSENSE_CLIENT_ID + slot to go live)
        </div>
      )}
    </div>
  );
}
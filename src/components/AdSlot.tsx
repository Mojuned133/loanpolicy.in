"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdSlotProps = {
  slot?: string;
};

export default function AdSlot({ slot }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adSlot =
    slot || process.env.NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT;

  useEffect(() => {
    if (!clientId || !adSlot) return;

    const adElement = insRef.current;

    if (!adElement) return;

    // Prevent AdSense from initializing the same ad twice.
    // This is especially important with React Strict Mode
    // and Next.js development mode.
    if (adElement.getAttribute("data-adsbygoogle-status")) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [clientId, adSlot]);

  // Don't render an empty ad unit if configuration is missing.
  if (!clientId || !adSlot) {
    return null;
  }

  return (
    <div className="my-8 flex w-full flex-col items-center gap-2">
      <span className="text-xs tracking-wide text-neutral-400">
        ADVERTISEMENT
      </span>

      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
        }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={clientId}
        data-ad-slot={adSlot}
      />
    </div>
  );
}

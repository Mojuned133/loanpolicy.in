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
  const adRef = useRef<HTMLModElement>(null);
  const initializedRef = useRef(false);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adSlot =
    slot || process.env.NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT;

  useEffect(() => {
    if (!clientId || !adSlot) {
      return;
    }

    const adElement = adRef.current;

    if (!adElement) {
      return;
    }

    // Prevent duplicate initialization
    if (initializedRef.current) {
      return;
    }

    // AdSense has already processed this element
    if (adElement.getAttribute("data-adsbygoogle-status")) {
      initializedRef.current = true;
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];

      window.adsbygoogle.push({});

      initializedRef.current = true;
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [clientId, adSlot]);

  if (!clientId || !adSlot) {
    return null;
  }

  return (
    <div className="my-8 w-full">
      <div className="mb-2 text-center text-xs tracking-wide text-neutral-400">
        ADVERTISEMENT
      </div>

      <div className="w-full min-w-0">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minHeight: "100px",
            textAlign: "center",
          }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client={clientId}
          data-ad-slot={adSlot}
        />
      </div>
    </div>
  );
}
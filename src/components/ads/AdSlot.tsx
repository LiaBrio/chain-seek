"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  client: string; // e.g., ca-pub-XXXXXXXXXXXX
  slot: string;   // data-ad-slot id from AdSense
  className?: string;
  style?: React.CSSProperties;
  layout?: "display" | "in-article" | "in-feed";
  format?: string; // e.g., "auto"
  fullWidthResponsive?: boolean;
}

export default function AdSlot({
  client,
  slot,
  className,
  style,
  layout = "display",
  format = "auto",
  fullWidthResponsive = true,
}: AdSlotProps) {
  const adRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle is injected by AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore
    }
  }, [slot]);

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={style || { display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        data-ad-layout={layout}
      />
    </div>
  );
}

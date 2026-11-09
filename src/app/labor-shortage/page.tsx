import type { Metadata } from "next";
import LaborShortageExplorer from "./LaborShortageExplorer";

export const metadata: Metadata = {
  title: "Global Occupation Shortage Lists & Labour-Market Sources | ChainSeek",
  description: "Explore official occupation shortage lists and labour-market signals from 12 major destinations. Compare source types, representative roles and government links.",
  keywords: ["occupation shortage list", "skills shortage", "labour market shortages", "in-demand occupations", "visa occupation lists", "global jobs"],
  alternates: { canonical: "https://chainseek.top/labor-shortage" },
  openGraph: {
    title: "Global Occupation Shortage Lists & Labour-Market Sources | ChainSeek",
    description: "A bilingual, source-led guide to official occupation shortage lists and labour-market signals from major destinations.",
    type: "website",
    url: "https://chainseek.top/labor-shortage",
    siteName: "ChainSeek"
  }
};

export default function LaborShortagePage() {
  return <LaborShortageExplorer />;
}

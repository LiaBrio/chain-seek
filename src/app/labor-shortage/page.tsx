import type { Metadata } from "next";
import LaborShortageExplorer from "./LaborShortageExplorer";

export const metadata: Metadata = {
  title: "How to Move Abroad: Study, Work & Visitor Visa Routes | ChainSeek",
  description: "Compare study, visitor, work and other lawful visa routes across 13 destinations, with eligibility, language and funds thresholds, fees, work limits, official sources and public applicant experiences.",
  keywords: ["study visa requirements", "visitor visa funds", "work visa routes", "working holiday visas", "proof of funds", "foreign worker visa", "Hong Kong visa", "global visa guide"],
  alternates: { canonical: "https://chainseek.top/labor-shortage" },
  openGraph: {
    title: "How to Move Abroad: Study, Work & Visitor Visa Routes | ChainSeek",
    description: "A bilingual guide to study, visitor, work and other lawful visa routes, with official requirements separated from applicant anecdotes.",
    type: "website",
    url: "https://chainseek.top/labor-shortage",
    siteName: "ChainSeek"
  }
};

export default function LaborShortagePage() {
  return <LaborShortageExplorer />;
}

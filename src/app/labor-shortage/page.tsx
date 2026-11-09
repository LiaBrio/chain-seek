import type { Metadata } from "next";
import LaborShortageExplorer from "./LaborShortageExplorer";

export const metadata: Metadata = {
  title: "Work Visas & Working Holiday Routes for Foreign Workers | ChainSeek",
  description: "Compare official work-permit and working-holiday routes, residence thresholds and cited applicant experiences across 13 destinations. Government rules and anecdotes are clearly distinguished.",
  keywords: ["work visa occupations", "work permit requirements", "immigration thresholds", "permanent residence routes", "foreign worker visa", "employer-sponsored visa", "Hong Kong work visa", "global work visas"],
  alternates: { canonical: "https://chainseek.top/labor-shortage" },
  openGraph: {
    title: "Work Visas & Working Holiday Routes for Foreign Workers | ChainSeek",
    description: "A bilingual guide to official work-permit, working-holiday and long-term residence rules, with public applicant reports clearly labeled as anecdotal.",
    type: "website",
    url: "https://chainseek.top/labor-shortage",
    siteName: "ChainSeek"
  }
};

export default function LaborShortagePage() {
  return <LaborShortageExplorer />;
}

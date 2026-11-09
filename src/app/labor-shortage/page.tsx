import type { Metadata } from "next";
import LaborShortageExplorer from "./LaborShortageExplorer";

export const metadata: Metadata = {
  title: "Work Visas for Foreign Workers: Eligible Occupations & Routes | ChainSeek",
  description: "Explore official occupation lists and verified work-permit routes for foreign nationals across 13 destinations, with employer, salary, qualification and program limits linked to government sources.",
  keywords: ["work visa occupations", "work permit jobs", "foreign worker visa", "employer-sponsored visa", "eligible occupation list", "Hong Kong work visa", "global work visas"],
  alternates: { canonical: "https://chainseek.top/labor-shortage" },
  openGraph: {
    title: "Work Visas for Foreign Workers: Eligible Occupations & Routes | ChainSeek",
    description: "A bilingual, government-sourced guide to work-permit occupation lists and pathways for foreign nationals in 13 destinations.",
    type: "website",
    url: "https://chainseek.top/labor-shortage",
    siteName: "ChainSeek"
  }
};

export default function LaborShortagePage() {
  return <LaborShortageExplorer />;
}

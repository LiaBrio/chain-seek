import type { Metadata } from "next";
import LaborShortageExplorer from "./LaborShortageExplorer";

export const metadata: Metadata = {
  title: "Work Visas & Immigration Thresholds for Foreign Workers | ChainSeek",
  description: "Compare official work-permit routes, long-term residence thresholds and cited public applicant experiences across 13 destinations. Government rules and forum anecdotes are clearly distinguished.",
  keywords: ["work visa occupations", "work permit requirements", "immigration thresholds", "permanent residence routes", "foreign worker visa", "employer-sponsored visa", "Hong Kong work visa", "global work visas"],
  alternates: { canonical: "https://chainseek.top/labor-shortage" },
  openGraph: {
    title: "Work Visas & Immigration Thresholds for Foreign Workers | ChainSeek",
    description: "A bilingual guide to official work-permit and long-term residence requirements, with public applicant reports clearly labeled as anecdotal.",
    type: "website",
    url: "https://chainseek.top/labor-shortage",
    siteName: "ChainSeek"
  }
};

export default function LaborShortagePage() {
  return <LaborShortageExplorer />;
}

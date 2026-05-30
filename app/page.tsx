/**
 * Arena Boxing - Landing Page (Root)
 * Simple video immersion entry point
 */

import LandingMockG from "@/components/LandingMockG";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arena Boxing Bondi | Enter The Arena",
  description: "Those who dare. Enter the arena.",
};

export default function LandingPage() {
  return <LandingMockG />;
}

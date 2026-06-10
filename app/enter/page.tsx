import type { Metadata } from "next";
import LandingMockG from "@/components/LandingMockG";

export const metadata: Metadata = {
  title: "Enter | Arena Boxing Bondi",
  description: "Enter the Arena Boxing Bondi intro.",
};

export default function EnterPage() {
  return <LandingMockG mode="route" exitHref="/" />;
}

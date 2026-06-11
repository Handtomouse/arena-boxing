import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Us",
  description: "123 Campbell Parade, Bondi Beach NSW. Get directions, hours, transport options, and contact details for Arena Boxing Bondi.",
};

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership & Pricing",
  description: "Join Arena Boxing Bondi. Flexible membership options for all commitment levels. No lock-in contracts, just results.",
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import "./membership.css";

export const metadata: Metadata = {
  title: "Membership & Pricing",
  description:
    "Three tiers — drop-in $35, unlimited $220/mo, 10-pack $300. No lock-in. Cancel anytime in your account. 15% student discount. 3-month freeze if you're travelling.",
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

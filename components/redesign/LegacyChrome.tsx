"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/ui/Navigation";
import StickyBottomCTA from "@/components/ui/StickyBottomCTA";

/**
 * Renders the legacy global chrome (old burgundy Navigation + sticky bottom
 * CTA) on every route EXCEPT the redesign-rollout preview routes, where the
 * skinned SkinNav owns the top bar. This is the "redesign the global nav
 * (layout.tsx)" deliverable done without editing the locked reference file:
 * the old nav simply doesn't mount on skinned routes, killing the top-edge
 * bleed. Footer stays global (composes with the skin by design).
 *
 * Scoped to the branch — at promotion this flips to render SkinNav globally.
 */

const REDESIGN_PREFIXES = [
  "/home-redesign",
  "/programs",
  "/start-here",
  "/timetable-redesign",
  "/membership-redesign",
  "/about-redesign",
  "/location-redesign",
];

function isRedesignRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return REDESIGN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export default function LegacyChrome() {
  const pathname = usePathname();
  if (isRedesignRoute(pathname)) return null;
  return (
    <>
      <Navigation />
      <StickyBottomCTA />
    </>
  );
}

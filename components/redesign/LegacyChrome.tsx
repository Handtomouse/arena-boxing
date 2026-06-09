"use client";

import { usePathname } from "next/navigation";
import Navigation from "@/components/ui/Navigation";
import StickyBottomCTA from "@/components/ui/StickyBottomCTA";
import SkinNav from "./SkinNav";

/**
 * Global top-chrome switch, rendered once from app/layout.tsx.
 *
 * On the promoted canonical routes (home, programs, start-here, timetable,
 * membership, about, location) the skinned SkinNav owns the top bar. This is
 * the header-promotion deliverable: SkinNav is defined here, not per page, so
 * one definition serves every redesign route. Every other route (booking, faq,
 * api, ...) keeps the legacy burgundy Navigation + sticky bottom CTA until it
 * is migrated too.
 */

const REDESIGN_PREFIXES = [
  "/",
  "/programs",
  "/start-here",
  "/timetable",
  "/membership",
  "/about",
  "/location",
];

function isRedesignRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return REDESIGN_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export default function LegacyChrome() {
  const pathname = usePathname();
  if (isRedesignRoute(pathname)) return <SkinNav />;
  return (
    <>
      <Navigation />
      <StickyBottomCTA />
    </>
  );
}

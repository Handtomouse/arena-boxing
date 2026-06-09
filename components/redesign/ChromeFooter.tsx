"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/sections/Footer";
import SkinFooter from "./SkinFooter";

/**
 * Route-scoped footer switch — the dark skinned footer on the promoted
 * canonical routes, the legacy site footer everywhere else. Mirrors
 * LegacyChrome's prefix logic so the two switches stay in lockstep.
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

export default function ChromeFooter() {
  const pathname = usePathname();
  if (isRedesignRoute(pathname)) return <SkinFooter />;
  return <Footer />;
}

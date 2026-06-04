"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/sections/Footer";
import SkinFooter from "./SkinFooter";

/**
 * Route-scoped footer switch — the dark skinned footer on the redesign-rollout
 * routes, the shipped site footer everywhere else. Mirrors LegacyChrome's
 * prefix logic so the two switches stay in lockstep. The live site footer is
 * left untouched.
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

export default function ChromeFooter() {
  const pathname = usePathname();
  if (isRedesignRoute(pathname)) return <SkinFooter />;
  return <Footer />;
}

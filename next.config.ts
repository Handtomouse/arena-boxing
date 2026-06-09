import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Promotion redirects: the *-redesign preview URLs and the retired /home now
  // resolve to their canonical paths. `permanent: true` emits HTTP 308 (the
  // method-preserving permanent redirect; 301's modern successor), which
  // preserves shared preview links and the right SEO signal.
  async redirects() {
    return [
      { source: "/home-redesign", destination: "/", permanent: true },
      { source: "/about-redesign", destination: "/about", permanent: true },
      { source: "/membership-redesign", destination: "/membership", permanent: true },
      { source: "/timetable-redesign", destination: "/timetable", permanent: true },
      { source: "/location-redesign", destination: "/location", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;

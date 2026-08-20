import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Frozen/generated project material is not part of the root app lint target.
    ".claude/**",
    "proposal-deck/**",
  ]),
  {
    // Raw <img> is the correct element for the static SVG wordmark and icon:
    // next/image does not optimise SVG, so <Image> would add runtime cost for
    // no benefit. Scoped to these files so new raster <img> is still caught.
    files: [
      "app/error.tsx",
      "app/not-found.tsx",
      "components/Landing.tsx",
      "components/LandingMockG.tsx",
      "components/redesign/SkinFooter.tsx",
      "components/redesign/SkinNav.tsx",
      "components/sections/Footer.tsx",
      "components/sections/HeroBanner.tsx",
      "components/ui/StrokeAnimatedIcon.tsx",
    ],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    // TODO(phase2): dead components — no route mounts either of these (verified
    // 20 Aug 2026). Their raster <img> needs next/image if they are revived;
    // otherwise delete them. Suppressed here so lint stays green meanwhile.
    files: [
      "components/sections/GoogleMapsEmbed.tsx",
      "components/sections/TrainersModule.tsx",
    ],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;

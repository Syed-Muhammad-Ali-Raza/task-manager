import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts"]),
  {
    rules: {
      // Board state is intentionally mirrored from server props for optimistic drag-and-drop.
      "react-hooks/set-state-in-effect": "off",
      // The fetch helper is framework-agnostic and has no router instance.
      "@next/next/no-location-assign-relative-destination": "off",
    },
  },
]);

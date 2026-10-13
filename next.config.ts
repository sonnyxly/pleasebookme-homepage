import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // English and Vietnamese each have their own root layout, so unmatched URLs
    // need a global 404 (app/global-not-found.tsx).
    globalNotFound: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // The dashboard design mockups are plain HTML in public/dashboard, copied in
  // by scripts/sync-dashboard.mjs. These give each page a clean address:
  // /dashboard, /dashboard/bookings and so on. A page that has no mockup yet
  // falls through to the 404.
  async rewrites() {
    return [
      { source: "/dashboard", destination: "/dashboard/index.html" },
      { source: "/dashboard/:page", destination: "/dashboard/:page/index.html" },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

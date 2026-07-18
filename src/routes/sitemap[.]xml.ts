import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { planets } from "@/lib/planets-data";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/planets", changefreq: "weekly", priority: "0.9" },
          { path: "/galaxies", changefreq: "weekly", priority: "0.8" },
          { path: "/stars", changefreq: "weekly", priority: "0.8" },
          { path: "/black-holes", changefreq: "weekly", priority: "0.8" },
          { path: "/missions", changefreq: "weekly", priority: "0.8" },
          { path: "/timeline", changefreq: "monthly", priority: "0.7" },
          { path: "/map", changefreq: "weekly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          ...planets.map((p) => ({ path: `/planets/${p.slug}`, changefreq: "monthly", priority: "0.7" })),
        ];

        const urls = entries.map((e) =>
          `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
